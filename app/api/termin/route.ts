import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { nachmittagNachVereinbarung, praxis, schliesstage, sprechzeiten } from '@/lib/praxis';
import { bestaetigungHtml, bestaetigungText, praxisHtml, praxisText, terminMeldung } from '@/lib/mailvorlage';
import { fehlercode, meldeAdmin } from '@/lib/adminmeldung';
import { absenderIp, begrenzung, vonEigenerSeite } from '@/lib/formularschutz';
import { pruefeTageszeit, pruefeWunschtermin, TAGESZEITEN, WUNSCHTERMIN_HINWEIS } from '@/lib/wunschtermin';

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
    tageszeit1: z.enum(TAGESZEITEN).optional(),
    termin2: z.string().trim().max(60).optional().or(z.literal('')),
    tageszeit2: z.enum(TAGESZEITEN).optional(),
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

/** Höchstens 5 Anfragen je IP in 10 Minuten (lib/formularschutz.ts). */
const zuHaeufig = begrenzung(5, 10 * 60 * 1000);
/** Größer ist keine echte Anfrage: alle Felder zusammen bleiben weit darunter. */
const MAX_BYTES = 16 * 1024;

export async function POST(request: Request) {
  if (!vonEigenerSeite(request)) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 403 });
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 415 });
  }

  const ip = absenderIp(request);

  if (zuHaeufig(ip)) {
    return NextResponse.json(
      { fehler: `Zu viele Anfragen. Bitte rufen Sie uns an: ${praxis.telefon}.` },
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

  // Wunschtermine nur an Sprechtagen ab morgen, „Nachmittag“ je Termin nur
  // mit Nachmittag an diesem Tag (lib/wunschtermin.ts). Das Formular prüft das schon
  // im Browser; hier gilt es auch für umgangene Felder und für den, der das
  // Formular vor Mitternacht öffnet und danach absendet.
  const regeln = { plan: sprechzeiten, schliesstage, nachVereinbarung: nachmittagNachVereinbarung };
  const terminfehler =
    pruefeWunschtermin(d.termin1, regeln) ?? (d.termin2 ? pruefeWunschtermin(d.termin2, regeln) : null);
  const tageszeitfehler =
    pruefeTageszeit(d.tageszeit1, d.termin1, regeln) ?? pruefeTageszeit(d.tageszeit2, d.termin2 ?? '', regeln);
  const grund = terminfehler ? WUNSCHTERMIN_HINWEIS[terminfehler] : tageszeitfehler;
  if (grund) {
    return NextResponse.json(
      { fehler: `${grund} Bei akuten Beschwerden rufen Sie uns bitte an: ${praxis.telefon}.` },
      { status: 422 },
    );
  }

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

  // Meldung an die Praxis: gestaltet wie die Mails nach außen, mit der
  // zugesagten Frist ganz oben (lib/mailvorlage.ts).
  const meldung = terminMeldung({
    name: d.name,
    tel: d.tel,
    mail: d.mail,
    geburt: d.geburt,
    termin1: d.termin1,
    tageszeit1: d.tageszeit1,
    termin2: d.termin2,
    tageszeit2: d.termin2 ? d.tageszeit2 : undefined,
    status: d.status,
    versicherung: d.versicherung,
    angst: d.angst,
    anliegen: d.anliegen,
    nachricht: d.nachricht,
  });
  const eingang = new Date();

  // Bestätigung an die Patientin/den Patienten: gestaltete HTML-Fassung plus
  // Textfassung für Programme, die kein HTML anzeigen (lib/mailvorlage.ts).
  const bestaetigung = {
    name: d.name,
    termin1: d.termin1,
    tageszeit1: d.tageszeit1,
    termin2: d.termin2 || undefined,
    tageszeit2: d.termin2 ? d.tageszeit2 : undefined,
  };

  // Für die Info an den Admin: welche der beiden Mails ist angekommen?
  let anPraxis = false;
  let bestaetigt: boolean | undefined;
  try {
    await versand.sendMail({
      from: SMTP_FROM,
      to: PRAXIS_MAIL,
      replyTo: d.mail || undefined,
      subject: meldung.betreff,
      text: praxisText(meldung, eingang),
      html: praxisHtml(meldung, eingang),
    });
    anPraxis = true;
    bestaetigt = false;

    // Die Adresse ist Pflichtfeld, die Bestätigung geht also immer raus.
    await versand.sendMail({
      from: SMTP_FROM,
      to: d.mail,
      replyTo: PRAXIS_MAIL,
      subject: `Ihre Terminanfrage bei ${praxis.name}`,
      text: bestaetigungText(bestaetigung),
      html: bestaetigungHtml(bestaetigung),
    });
    bestaetigt = true;
  } catch (fehler) {
    console.error('SMTP-Versand fehlgeschlagen:', fehlercode(fehler));
    await meldeAdmin(versand, SMTP_FROM, { formular: 'Terminanfrage', zeitpunkt: eingang, praxis: anPraxis, bestaetigung: bestaetigt });
    return NextResponse.json(
      { fehler: 'Versand fehlgeschlagen. Bitte rufen Sie uns an: 0331 960926.' },
      { status: 502 },
    );
  }

  await meldeAdmin(versand, SMTP_FROM, { formular: 'Terminanfrage', zeitpunkt: eingang, praxis: true, bestaetigung: true });
  return NextResponse.json({ ok: true });
}
