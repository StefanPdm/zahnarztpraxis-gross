import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { praxis } from '@/lib/praxis';
import { interessen } from '@/lib/karriere';
import {
  bewerbungBetreff,
  bewerbungHtml,
  bewerbungMeldung,
  bewerbungText,
  praxisHtml,
  praxisText,
} from '@/lib/mailvorlage';
import { fehlercode, meldeAdmin } from '@/lib/adminmeldung';
import { absenderIp, ALLE, begrenzung, NAME_HINWEIS, nameUnverdaechtig, vonEigenerSeite } from '@/lib/formularschutz';
import {
  ANHANG_TYPEN,
  MAX_ANHAENGE,
  MAX_ANHANG_BYTES,
  MAX_ANHANG_TEXT,
} from '@/lib/bewerbung';

/*
  Bewerbung — Kurzformular auf /karriere, /karriere/zahntechniker und
  /ausbildung (components/BewerbungsDialog). Es soll nur den Kontakt
  herstellen; alles Weitere im persönlichen Gespräch (Auftraggeber,
  15.10.2026).

  Datenschutz: Bewerbungsunterlagen sind personenbezogene Daten, manchmal
  mit Angaben zur Gesundheit (etwa eine Schwerbehinderung). Sie gehen
  ausschließlich per Mail an die Praxis — nichts wird gespeichert, nichts
  protokolliert, auch im Fehlerfall kein Feldinhalt und kein Dateiname.
  Die Anhänge liegen nur für die Dauer des Versands im Arbeitsspeicher.
*/

export const runtime = 'nodejs';

const einzeilig = /^[^\u0000-\u001f\u007f]*$/;
const erlaubteInteressen = interessen.map((i) => i.wert) as [string, ...string[]];

const Bewerbung = z.object({
  name: z.string().trim().min(2).max(120).regex(einzeilig),
  mail: z.string().trim().email().max(180),
  tel: z.string().trim().max(60).regex(einzeilig).optional().or(z.literal('')),
  interesse: z.enum(erlaubteInteressen),
  nachricht: z.string().trim().max(2000).optional().or(z.literal('')),
  anrede: z.enum(['du', 'sie']),
  // Spamschutz
  website: z.string().max(0), // Honeypot: muss leer bleiben
  gestartet: z.coerce.number(),
});

/** Höchstens 3 Bewerbungen je IP in 10 Minuten. */
const zuHaeufig = begrenzung(3, 10 * 60 * 1000);
/**
 * Höchstens 10 Bestätigungen in der Stunde, über alle Absender. Darüber
 * bekommt die Praxis die Bewerbung weiter, nur die Bestätigung entfällt —
 * Schutz davor, das Formular als Verteiler für Werbung zu missbrauchen.
 */
const zuVieleBestaetigungen = begrenzung(10, 60 * 60 * 1000);
/** Anhänge plus Felder und Trennzeilen des Formulars. */
const MAX_ANFRAGE = MAX_ANHANG_BYTES + 64 * 1024;

/** Die ersten Bytes jeder erlaubten Dateiart — der Inhalt muss zur Endung passen. */
const KENNUNG: Record<string, number[]> = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  jpg: [0xff, 0xd8, 0xff],
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  docx: [0x50, 0x4b, 0x03, 0x04], // ZIP
  doc: [0xd0, 0xcf, 0x11, 0xe0], // altes Office-Format
};

type Anhang = { filename: string; content: Buffer; contentType: string };

/**
 * Prüft die hochgeladenen Dateien und gibt sie versandfertig zurück —
 * oder einen Satz, der sagt, was nicht stimmt.
 */
async function pruefeAnhaenge(dateien: File[]): Promise<Anhang[] | string> {
  if (dateien.length > MAX_ANHAENGE) return `Bitte höchstens ${MAX_ANHAENGE} Dateien anhängen.`;
  const gesamt = dateien.reduce((s, d) => s + d.size, 0);
  if (gesamt > MAX_ANHANG_BYTES) return `Die Anhänge sind zusammen größer als ${MAX_ANHANG_TEXT}.`;

  const anhaenge: Anhang[] = [];
  for (const [i, datei] of dateien.entries()) {
    const endung = datei.name.split('.').pop()?.toLowerCase() ?? '';
    const typ = ANHANG_TYPEN[endung];
    if (!typ) return 'Bitte nur PDF, JPG, PNG oder Word-Dateien anhängen.';
    const inhalt = Buffer.from(await datei.arrayBuffer());
    if (!KENNUNG[endung].every((b, j) => inhalt[j] === b)) {
      return 'Eine Datei ließ sich nicht lesen. Bitte als PDF anhängen.';
    }
    // Dateiname für die Mail: nur Buchstaben, Ziffern und wenige Zeichen —
    // er landet in einem Mail-Header.
    const stamm = datei.name
      .slice(0, -(endung.length + 1))
      .normalize('NFC')
      .replace(/[^\p{L}\p{N} ._-]/gu, '')
      .trim()
      .slice(0, 80);
    anhaenge.push({
      filename: `${stamm || `Anhang-${i + 1}`}.${endung}`,
      content: inhalt,
      contentType: typ[0],
    });
  }
  return anhaenge;
}

export async function POST(request: Request) {
  if (!vonEigenerSeite(request)) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data')) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 415 });
  }
  // Vor dem Lesen: Die Länge muss angegeben sein und passen. Sonst läse
  // formData() beliebig viel in den Speicher.
  const laenge = Number(request.headers.get('content-length'));
  if (!laenge) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 411 });
  }
  if (laenge > MAX_ANFRAGE) {
    return NextResponse.json(
      { fehler: `Die Anhänge sind zusammen größer als ${MAX_ANHANG_TEXT}.` },
      { status: 413 },
    );
  }

  if (zuHaeufig(absenderIp(request))) {
    return NextResponse.json(
      { fehler: `Zu viele Anfragen. Bitte rufen Sie uns an: ${praxis.telefon}.` },
      { status: 429 },
    );
  }

  let formular: FormData;
  try {
    formular = await request.formData();
  } catch {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const text = (name: string) => {
    const wert = formular.get(name);
    return typeof wert === 'string' ? wert : undefined;
  };
  const geprueft = Bewerbung.safeParse({
    name: text('name'),
    mail: text('mail'),
    tel: text('tel'),
    interesse: text('interesse'),
    nachricht: text('nachricht'),
    anrede: text('anrede'),
    website: text('website') ?? '',
    gestartet: text('gestartet'),
  });
  if (!geprueft.success) {
    // Bewusst keine Feldinhalte ins Log.
    return NextResponse.json({ fehler: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 422 });
  }
  const d = geprueft.data;
  if (!nameUnverdaechtig(d.name)) {
    return NextResponse.json({ fehler: NAME_HINWEIS }, { status: 422 });
  }

  const dateien = formular
    .getAll('anhang')
    .filter((d): d is File => d instanceof File && d.size > 0);
  const anhaenge = await pruefeAnhaenge(dateien);
  if (typeof anhaenge === 'string') {
    return NextResponse.json({ fehler: anhaenge }, { status: 422 });
  }

  // In unter 3 Sekunden ausgefüllt → mit hoher Wahrscheinlichkeit ein Bot.
  if (Date.now() - d.gestartet < 3000) {
    return NextResponse.json({ ok: true });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, PRAXIS_MAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !PRAXIS_MAIL) {
    console.error('SMTP-Konfiguration unvollständig — siehe .env.example');
    return NextResponse.json(
      { fehler: `Versand derzeit nicht möglich. Bitte rufen Sie uns an: ${praxis.telefon}.` },
      { status: 500 },
    );
  }

  const versand = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const interesse = interessen.find((i) => i.wert === d.interesse)!.label;

  const zeitpunkt = new Date();
  const meldung = bewerbungMeldung({
    interesse,
    name: d.name,
    mail: d.mail,
    tel: d.tel,
    nachricht: d.nachricht,
    anhaenge: anhaenge.map((a) => a.filename),
  });

  const eingang = { name: d.name, interesse, du: d.anrede === 'du' };

  // Für die Info an den Admin: welche der beiden Mails ist angekommen?
  let anPraxis = false;
  let bestaetigt: boolean | undefined;
  let gedrosselt = false;
  try {
    await versand.sendMail({
      from: SMTP_FROM,
      to: PRAXIS_MAIL,
      replyTo: d.mail,
      subject: meldung.betreff,
      text: praxisText(meldung, zeitpunkt),
      html: praxisHtml(meldung, zeitpunkt),
      attachments: anhaenge,
    });
    anPraxis = true;
    gedrosselt = zuVieleBestaetigungen(ALLE);
    if (!gedrosselt) {
      bestaetigt = false;
      await versand.sendMail({
        from: SMTP_FROM,
        to: d.mail,
        replyTo: PRAXIS_MAIL,
        subject: bewerbungBetreff(eingang),
        text: bewerbungText(eingang),
        html: bewerbungHtml(eingang),
      });
      bestaetigt = true;
    }
  } catch (fehler) {
    console.error('SMTP-Versand fehlgeschlagen:', fehlercode(fehler));
    await meldeAdmin(versand, SMTP_FROM, { formular: 'Bewerbung', zeitpunkt, praxis: anPraxis, bestaetigung: bestaetigt });
    // Die Praxis hat die Bewerbung, nur die Bestätigung kam nicht an: kein
    // Fehler melden — sonst bewirbt sich derjenige doppelt.
    if (anPraxis) return NextResponse.json({ ok: true, ohneBestaetigung: true });
    return NextResponse.json(
      { fehler: `Versand fehlgeschlagen. Bitte rufen Sie uns an: ${praxis.telefon}.` },
      { status: 502 },
    );
  }

  await meldeAdmin(versand, SMTP_FROM, { formular: 'Bewerbung', zeitpunkt, praxis: true, bestaetigung: bestaetigt, gedrosselt });
  return NextResponse.json(bestaetigt ? { ok: true } : { ok: true, ohneBestaetigung: true });
}
