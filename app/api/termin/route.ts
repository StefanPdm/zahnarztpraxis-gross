import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { praxis } from '@/lib/praxis';
import { bestaetigungHtml, bestaetigungText } from '@/lib/mailvorlage';

/*
  Termin-Anfrage.

  Datenschutz: Die Angabe zur Zahnarztangst ist ein Gesundheitsdatum. Sie geht
  ausschließlich in die Mail an die Praxis — sie wird nicht protokolliert,
  nicht gespeichert und nicht an Dritte weitergegeben. Auch im Fehlerfall
  landet kein Feldinhalt im Log.
*/

export const runtime = 'nodejs';

/** Einzeilige Felder: keine Steuerzeichen — der Name landet im Mail-Betreff. */
const einzeilig = /^[^\u0000-\u001f\u007f]*$/;

const Anfrage = z
  .object({
    name: z.string().trim().min(2).max(120).regex(einzeilig),
    // Pflicht: die Praxis meldet sich in der Regel telefonisch zurück.
    tel: z.string().trim().min(5).max(60).regex(einzeilig),
    // Pflicht: ohne Adresse gäbe es keine Bestätigung an die Patientin/den Patienten.
    mail: z.string().trim().email().max(180),
    geburt: z.string().trim().max(40).optional().or(z.literal('')),
    termin1: z.string().trim().min(1).max(60),
    termin2: z.string().trim().max(60).optional().or(z.literal('')),
    tageszeit: z.enum(['Vormittag', 'Nachmittag']).optional(),
    status: z.enum(['Neu', 'Bestandspatient']).optional(),
    versicherung: z.enum(['Gesetzlich', 'Privat']).optional(),
    angst: z.enum(['Nein', 'Ja — Angstpatient/in', 'Erstmal nur ein Gespräch']).optional(),
    anliegen: z.string().trim().min(1).max(120).regex(einzeilig),
    nachricht: z.string().trim().max(4000).optional().or(z.literal('')),
    einverstaendnis: z.literal(true),
    // Spamschutz
    website: z.string().max(0), // Honeypot: muss leer bleiben
    gestartet: z.number(),
  });

/** Einfache Begrenzung pro IP. Reicht für eine Praxisseite. */
const zugriffe = new Map<string, number[]>();
const FENSTER = 10 * 60 * 1000;
const MAXIMUM = 5;
/** Größer ist keine echte Anfrage: alle Felder zusammen bleiben weit darunter. */
const MAX_BYTES = 16 * 1024;

function zuHaeufig(ip: string): boolean {
  const jetzt = Date.now();
  // Abgelaufene Einträge anderer IPs mit aufräumen, damit die Liste nicht wächst.
  if (zugriffe.size > 1000) {
    for (const [schluessel, zeiten] of zugriffe) {
      if (zeiten.every((z) => jetzt - z >= FENSTER)) zugriffe.delete(schluessel);
    }
  }
  const bisher = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < FENSTER);
  bisher.push(jetzt);
  zugriffe.set(ip, bisher);
  return bisher.length > MAXIMUM;
}

/**
 * Nur Anfragen von der eigenen Seite annehmen (Schutz vor fremden Formularen).
 * Verglichen wird mit dem Host der Anfrage — hinter einem Proxy steht der
 * öffentliche Name in x-forwarded-host — und mit der Praxis-Domain samt und
 * ohne www.
 */
function vonEigenerSeite(request: Request): boolean {
  const herkunft = request.headers.get("origin");
  if (!herkunft) return false;
  const praxisHost = new URL(praxis.domain).host;
  const erlaubt = new Set(
    [
      new URL(request.url).host,
      request.headers.get("host"),
      request.headers.get("x-forwarded-host")?.split(",")[0].trim(),
      praxisHost,
      praxisHost.replace(/^www./, ""),
    ].filter(Boolean),
  );
  try {
    return erlaubt.has(new URL(herkunft).host);
  } catch {
    return false;
  }
}

function zeile(bezeichnung: string, wert?: string) {
  return wert ? `${bezeichnung}: ${wert}\n` : '';
}

export async function POST(request: Request) {
  if (!vonEigenerSeite(request)) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 415 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unbekannt';

  if (zuHaeufig(ip)) {
    return NextResponse.json(
      { fehler: 'Zu viele Anfragen. Bitte rufen Sie uns an: 0331 960926.' },
      { status: 429 },
    );
  }

  let roh: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BYTES) {
      return NextResponse.json({ fehler: 'Anfrage zu groß.' }, { status: 413 });
    }
    roh = JSON.parse(text);
  } catch {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const geprueft = Anfrage.safeParse(roh);
  if (!geprueft.success) {
    // Bewusst keine Feldinhalte ins Log — es sind Patientendaten.
    return NextResponse.json({ fehler: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 422 });
  }

  const d = geprueft.data;

  // Formular in unter 3 Sekunden ausgefüllt → mit hoher Wahrscheinlichkeit ein Bot.
  if (Date.now() - d.gestartet < 3000) {
    return NextResponse.json({ ok: true });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, PRAXIS_MAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !PRAXIS_MAIL) {
    console.error('SMTP-Konfiguration unvollständig — siehe .env.example');
    return NextResponse.json(
      { fehler: 'Versand derzeit nicht möglich. Bitte rufen Sie uns an: 0331 960926.' },
      { status: 500 },
    );
  }

  const versand = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const anPraxis =
    `Hallo liebes Praxisteam,\n\n` +
    `über die Website ist eine neue Terminanfrage eingegangen:\n\n` +
    zeile('Name', d.name) +
    zeile('Telefon', d.tel) +
    zeile('E-Mail', d.mail) +
    zeile('Geburtsdatum', d.geburt) +
    `\n` +
    zeile('Wunschtermin 1', d.termin1) +
    zeile('Wunschtermin 2', d.termin2) +
    zeile('Tageszeit', d.tageszeit) +
    `\n` +
    zeile('Status', d.status) +
    zeile('Versicherung', d.versicherung) +
    zeile('Zahnarztangst', d.angst) +
    zeile('Anliegen', d.anliegen) +
    (d.nachricht ? `\nNachricht:\n${d.nachricht}\n` : '') +
    `\n—\n\n` +
    `Eine Eingangsbestätigung ist bereits an ${d.mail} gegangen, mit der Zusage:\n` +
    `Rückmeldung innerhalb von 24 Stunden. Ein „Antworten“ auf diese Mail geht\n` +
    `direkt an die Patientin oder den Patienten.\n\n` +
    `Viel Erfolg\n` +
    `Dein Webmaster\n`;

  // Bestätigung an die Patientin/den Patienten: gestaltete HTML-Fassung plus
  // Textfassung für Programme, die kein HTML anzeigen (lib/mailvorlage.ts).
  const bestaetigung = {
    name: d.name,
    termin1: d.termin1,
    termin2: d.termin2 || undefined,
    tageszeit: d.tageszeit,
  };

  try {
    await versand.sendMail({
      from: SMTP_FROM,
      to: PRAXIS_MAIL,
      replyTo: d.mail || undefined,
      subject: `Terminanfrage: ${d.name}`,
      text: anPraxis,
    });

    // Die Adresse ist Pflichtfeld, die Bestätigung geht also immer raus.
    await versand.sendMail({
      from: SMTP_FROM,
      to: d.mail,
      replyTo: PRAXIS_MAIL,
      subject: `Ihre Terminanfrage bei ${praxis.name}`,
      text: bestaetigungText(bestaetigung),
      html: bestaetigungHtml(bestaetigung),
    });
  } catch (fehler) {
    console.error('SMTP-Versand fehlgeschlagen:', (fehler as Error).message);
    return NextResponse.json(
      { fehler: 'Versand fehlgeschlagen. Bitte rufen Sie uns an: 0331 960926.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
