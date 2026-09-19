import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { praxis } from '@/lib/praxis';

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
    tel: z.string().trim().max(60).regex(einzeilig).optional().or(z.literal('')),
    mail: z.string().trim().email().max(180).optional().or(z.literal('')),
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
  })
  .refine((d) => Boolean(d.tel) || Boolean(d.mail), {
    message: 'Bitte Telefonnummer oder E-Mail angeben.',
    path: ['tel'],
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
    `Neue Terminanfrage über die Website\n\n` +
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
    `\n—\nZusage an die Patientin/den Patienten: Rückmeldung innerhalb von 24 Stunden.\n`;

  const anAbsender =
    `Guten Tag ${d.name},\n\n` +
    `vielen Dank für Ihre Terminanfrage. Wir melden uns innerhalb von ` +
    `24 Stunden bei Ihnen.\n\n` +
    `Ihre Angaben:\n` +
    zeile('Wunschtermin 1', d.termin1) +
    zeile('Wunschtermin 2', d.termin2) +
    zeile('Tageszeit', d.tageszeit) +
    `\nWenn es dringend ist, erreichen Sie uns telefonisch unter 0331 960926.\n\n` +
    `Mit freundlichen Grüßen\n` +
    `Zahnarztpraxis Groß & Groß\n` +
    `Schopenhauerstraße 37, 14467 Potsdam\n` +
    `Eingang auf der Rückseite des Gebäudes\n`;

  try {
    await versand.sendMail({
      from: SMTP_FROM,
      to: PRAXIS_MAIL,
      replyTo: d.mail || undefined,
      subject: `Terminanfrage: ${d.name}`,
      text: anPraxis,
    });

    if (d.mail) {
      await versand.sendMail({
        from: SMTP_FROM,
        to: d.mail,
        subject: 'Ihre Terminanfrage bei Groß & Groß',
        text: anAbsender,
      });
    }
  } catch (fehler) {
    console.error('SMTP-Versand fehlgeschlagen:', (fehler as Error).message);
    return NextResponse.json(
      { fehler: 'Versand fehlgeschlagen. Bitte rufen Sie uns an: 0331 960926.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
