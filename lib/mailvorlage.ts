import { praxis, sprechzeitGruppen, tageLang, zeitenLang } from "@/lib/praxis";
import { RUECKMELDUNG_BEWERBUNG, RUECKMELDUNG_BEWERBUNG_STUNDEN } from "@/lib/bewerbung";

/**
 * Bestätigungsmail an die Patientin oder den Patienten.
 *
 * Gestaltung nach den Regeln für E-Mail, nicht für Browser: Tabellenlayout,
 * Stile direkt am Element, feste Hexwerte statt CSS-Variablen, Breite 600 px.
 * Die Farben und die Anmutung stammen aus app/classical.css.
 *
 * Datenschutz: **keine externen Bilder, kein Zählpixel, keine Links zu
 * Dritten.** Ein Bild aus dem Netz würde beim Öffnen der Mail eine Anfrage
 * auslösen und verraten, wann jemand sie liest. Deshalb ist alles Typografie.
 *
 * Wiederholt werden nur die Wunschzeiten. Die Angabe zur Zahnarztangst ist
 * ein Gesundheitsdatum und steht bewusst **nicht** in dieser Mail: sie ginge
 * unverschlüsselt über fremde Mailserver, ohne dass es jemandem nützt.
 */

const FARBEN = {
  grund: "#f3f2f2",
  karte: "#ffffff",
  text: "#201f1d",
  leise: "#605d5d",
  akzent: "#7d5411",
  linie: "#dcd9d9",
  band: "#faf7f2",
} as const;

const SERIFE = "Georgia, 'Times New Roman', Times, serif";
const GROTESK = "'Segoe UI', Helvetica, Arial, sans-serif";

/** Nutzereingaben landen im HTML — alles maskieren, was dort Bedeutung hat. */
function esc(wert: string): string {
  return wert
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type Bestaetigung = {
  name: string;
  termin1: string;
  tageszeit1?: string;
  termin2?: string;
  tageszeit2?: string;
};

const WOCHENTAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

/** „2026-09-24" → „Donnerstag, 24.09.2026"; alles andere unverändert zurück. */
function datum(wert: string): string {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})$/.exec(wert);
  if (!treffer) return wert;
  const [, j, m, t] = treffer;
  const tag = WOCHENTAGE[new Date(Date.UTC(Number(j), Number(m) - 1, Number(t))).getUTCDay()];
  return `${tag}, ${t}.${m}.${j}`;
}

/**
 * Ein Wunschtermin mit seiner Tageszeit: „Montag, 12.10.2026 · Nachmittag".
 * Auch für die Mail an die Praxis (app/api/termin). Leer ohne Datum.
 */
export function wunschtermin(termin?: string, tageszeit?: string): string {
  if (!termin) return "";
  const zeit = tageszeit === "Egal" ? "Tageszeit egal" : tageszeit;
  return zeit ? `${datum(termin)} · ${zeit}` : datum(termin);
}

function zeile(bezeichnung: string, wert?: string): string {
  if (!wert) return "";
  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid ${FARBEN.linie};font-family:${GROTESK};font-size:13px;color:${FARBEN.leise};">${esc(bezeichnung)}</td>
      <td style="padding:11px 0;border-bottom:1px solid ${FARBEN.linie};font-family:${GROTESK};font-size:14px;color:${FARBEN.text};text-align:right;">${esc(wert)}</td>
    </tr>`;
}

export function bestaetigungText(d: Bestaetigung): string {
  const zeilen = [
    `Guten Tag ${d.name},`,
    "",
    "vielen Dank für Ihre Terminanfrage. Wir melden uns innerhalb von 24 Stunden",
    "mit einem konkreten Vorschlag — telefonisch oder per E-Mail.",
    "",
    "Ihre Wunschzeiten:",
    `- Wunschtermin 1: ${wunschtermin(d.termin1, d.tageszeit1)}`,
    d.termin2 ? `- Wunschtermin 2: ${wunschtermin(d.termin2, d.tageszeit2)}` : "",
    "",
    `Wenn es dringend ist oder Sie Schmerzen haben, rufen Sie uns bitte direkt an: ${praxis.telefon}.`,
    "",
    "Mit freundlichen Grüßen",
    praxis.vollerName,
    `${praxis.strasse}, ${praxis.ort}`,
    praxis.eingang,
    praxis.telefon,
  ];
  return zeilen.filter((z) => z !== "").join("\n") + "\n";
}

export function bestaetigungHtml(d: Bestaetigung): string {
  const zeiten = sprechzeitGruppen()
    .map((g) => `${tageLang(g)}: ${zeitenLang(g)}`)
    .join("<br>");

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Ihre Terminanfrage bei ${esc(praxis.name)}</title>
</head>
<body style="margin:0;padding:0;background:${FARBEN.grund};">
<!-- Vorschautext in der Liste des Mailprogramms, im Text selbst unsichtbar -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.grund};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${FARBEN.karte};border:1px solid ${FARBEN.linie};">

        <tr>
          <td style="padding:36px 40px 0;">
            <div style="font-family:${SERIFE};font-size:27px;letter-spacing:-0.4px;color:${FARBEN.text};">${esc(praxis.name)}</div>
            <div style="margin-top:7px;font-family:${GROTESK};font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${FARBEN.akzent};">Zahnarztpraxis in Potsdam</div>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <div style="height:1px;background:${FARBEN.linie};line-height:1px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px 0;">
            <h1 style="margin:0;font-family:${SERIFE};font-size:30px;line-height:1.2;font-weight:normal;color:${FARBEN.text};">Ihre Anfrage ist angekommen.</h1>
            <p style="margin:18px 0 0;font-family:${GROTESK};font-size:15px;line-height:1.65;color:${FARBEN.text};">
              Guten Tag ${esc(d.name)},<br><br>
              vielen Dank für Ihre Terminanfrage. Wir sehen sie uns im Team an und melden uns
              <strong style="font-weight:600;">innerhalb von 24 Stunden</strong> mit einem konkreten Vorschlag —
              telefonisch oder per E-Mail. Diese Nachricht ist die Eingangsbestätigung, noch keine feste Buchung.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${FARBEN.akzent};">Ihre Wunschzeiten</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-top:1px solid ${FARBEN.linie};">
              ${zeile("Wunschtermin 1", wunschtermin(d.termin1, d.tageszeit1))}
              ${zeile("Wunschtermin 2", wunschtermin(d.termin2, d.tageszeit2))}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.band};border:1px solid ${FARBEN.linie};">
              <tr>
                <td style="padding:20px 22px;font-family:${GROTESK};font-size:14px;line-height:1.6;color:${FARBEN.text};">
                  Wenn es dringend ist oder Sie Schmerzen haben, warten Sie bitte nicht auf unsere Antwort, sondern rufen Sie an:
                  <a href="tel:${esc(praxis.telefonIntl)}" style="color:${FARBEN.akzent};font-weight:600;text-decoration:none;">${esc(praxis.telefon)}</a>.
                  Für akute Beschwerden halten wir jeden Morgen Termine frei.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px 36px;">
            <div style="height:1px;background:${FARBEN.linie};line-height:1px;font-size:0;">&nbsp;</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;">
              <tr>
                <td valign="top" style="font-family:${GROTESK};font-size:13px;line-height:1.7;color:${FARBEN.leise};">
                  <span style="color:${FARBEN.text};">${esc(praxis.vollerName)}</span><br>
                  ${esc(praxis.strasse)}<br>
                  ${esc(praxis.ort)}<br>
                  <span style="color:${FARBEN.akzent};">${esc(praxis.eingang)}</span>
                </td>
                <td valign="top" style="font-family:${GROTESK};font-size:13px;line-height:1.7;color:${FARBEN.leise};text-align:right;">
                  ${zeiten}
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <div style="width:600px;max-width:100%;margin-top:16px;font-family:${GROTESK};font-size:11px;line-height:1.6;color:${FARBEN.leise};text-align:center;">
        Sie erhalten diese Nachricht, weil über ${esc(praxis.domain.replace(/^https?:\/\//, ""))} eine Terminanfrage mit Ihrer Adresse gesendet wurde.<br>
        Wenn Sie das nicht waren, antworten Sie bitte kurz auf diese Mail — dann löschen wir die Anfrage.
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ── Bewerbung ────────────────────────────────────────────────────────────── */

/**
 * Eingangsbestätigung an Bewerberinnen und Bewerber (app/api/bewerbung).
 * Gleiche Gestaltung wie die Terminbestätigung. Wiederholt wird nur, worum
 * es ging — keine Nachricht, keine Anhänge.
 *
 * `du`: Die Ausbildungsseite duzt, also auch ihre Bestätigung.
 */
export type Bewerbungseingang = { name: string; interesse: string; du: boolean };

function bewerbungsSaetze(d: Bewerbungseingang) {
  return d.du
    ? {
        anrede: `Hallo ${d.name},`,
        dank: "danke für deine Bewerbung — schön, dass du dich für uns interessierst.",
        weiter: `Wir sehen sie uns an und melden uns ${RUECKMELDUNG_BEWERBUNG} bei dir, um ein persönliches Gespräch zu vereinbaren. Vorbereiten musst du dafür nichts.`,
        frage: "Wenn du vorher eine Frage hast, ruf einfach an:",
        titel: "Deine Bewerbung",
        hinweis: "Du erhältst diese Nachricht, weil",
        nichtIch: "Wenn du das nicht warst, antworte bitte kurz auf diese Mail — dann löschen wir sie.",
      }
    : {
        anrede: `Guten Tag ${d.name},`,
        dank: "vielen Dank für Ihre Bewerbung und Ihr Interesse an unserer Praxis.",
        weiter: `Wir sehen sie uns an und melden uns ${RUECKMELDUNG_BEWERBUNG} bei Ihnen, um ein persönliches Gespräch zu vereinbaren. Alles Weitere besprechen wir dann.`,
        frage: "Wenn Sie vorher eine Frage haben, rufen Sie uns gern an:",
        titel: "Ihre Bewerbung",
        hinweis: "Sie erhalten diese Nachricht, weil",
        nichtIch: "Wenn Sie das nicht waren, antworten Sie bitte kurz auf diese Mail — dann löschen wir sie.",
      };
}

export function bewerbungText(d: Bewerbungseingang): string {
  const s = bewerbungsSaetze(d);
  return (
    [
      s.anrede,
      "",
      s.dank,
      "",
      `Worum es geht: ${d.interesse}`,
      "",
      s.weiter,
      "",
      `${s.frage} ${praxis.telefon}.`,
      "",
      "Viele Grüße",
      praxis.vollerName,
      `${praxis.strasse}, ${praxis.ort}`,
      praxis.eingang,
      praxis.telefon,
    ].join("\n") + "\n"
  );
}

export function bewerbungHtml(d: Bewerbungseingang): string {
  const s = bewerbungsSaetze(d);
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(s.titel)} bei ${esc(praxis.name)}</title>
</head>
<body style="margin:0;padding:0;background:${FARBEN.grund};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Angekommen. Wir melden uns ${esc(RUECKMELDUNG_BEWERBUNG)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.grund};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${FARBEN.karte};border:1px solid ${FARBEN.linie};">

        <tr>
          <td style="padding:36px 40px 0;">
            <div style="font-family:${SERIFE};font-size:27px;letter-spacing:-0.4px;color:${FARBEN.text};">${esc(praxis.name)}</div>
            <div style="margin-top:7px;font-family:${GROTESK};font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${FARBEN.akzent};">Zahnarztpraxis in Potsdam</div>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <div style="height:1px;background:${FARBEN.linie};line-height:1px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px 0;">
            <h1 style="margin:0;font-family:${SERIFE};font-size:30px;line-height:1.2;font-weight:normal;color:${FARBEN.text};">${esc(s.titel)} ist angekommen.</h1>
            <p style="margin:18px 0 0;font-family:${GROTESK};font-size:15px;line-height:1.65;color:${FARBEN.text};">
              ${esc(s.anrede)}<br><br>
              ${esc(s.dank)}<br><br>
              ${esc(s.weiter)}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${FARBEN.linie};">
              ${zeile("Worum es geht", d.interesse)}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.band};border:1px solid ${FARBEN.linie};">
              <tr>
                <td style="padding:20px 22px;font-family:${GROTESK};font-size:14px;line-height:1.6;color:${FARBEN.text};">
                  ${esc(s.frage)}
                  <a href="tel:${esc(praxis.telefonIntl)}" style="color:${FARBEN.akzent};font-weight:600;text-decoration:none;">${esc(praxis.telefon)}</a>.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px 36px;">
            <div style="height:1px;background:${FARBEN.linie};line-height:1px;font-size:0;">&nbsp;</div>
            <div style="margin-top:22px;font-family:${GROTESK};font-size:13px;line-height:1.7;color:${FARBEN.leise};">
              <span style="color:${FARBEN.text};">${esc(praxis.vollerName)}</span><br>
              ${esc(praxis.strasse)}<br>
              ${esc(praxis.ort)}<br>
              <span style="color:${FARBEN.akzent};">${esc(praxis.eingang)}</span>
            </div>
          </td>
        </tr>

      </table>

      <div style="width:600px;max-width:100%;margin-top:16px;font-family:${GROTESK};font-size:11px;line-height:1.6;color:${FARBEN.leise};text-align:center;">
        ${esc(s.hinweis)} über ${esc(praxis.domain.replace(/^https?:\/\//, ""))} eine Bewerbung mit dieser Adresse gesendet wurde.<br>
        ${esc(s.nichtIch)}
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Betreff der Eingangsbestätigung. */
export function bewerbungBetreff(d: Bewerbungseingang): string {
  return `${bewerbungsSaetze(d).titel} bei ${praxis.name}`;
}

/* ── Mails an die Praxis ──────────────────────────────────────────────────── */

/**
 * Meldung an die Praxis über eine Terminanfrage oder eine Bewerbung —
 * gestaltet wie die Mails nach außen (Auftraggeber, 15.10.2026), dazu eine
 * Textfassung. Oben steht immer die Zusage, die der Absender bekommen hat,
 * mit ausgerechneter Frist: Wer die Mail öffnet, sieht sofort, bis wann
 * geantwortet werden muss.
 *
 * Beide Fassungen entstehen aus derselben Beschreibung (`Praxismeldung`),
 * damit Text und HTML nie auseinanderlaufen. Gebaut wird sie von
 * `terminMeldung` und `bewerbungMeldung`; die Routen und ein Testversand
 * rufen dieselben Funktionen auf.
 */
export type Praxismeldung = {
  betreff: string;
  /** Vorschauzeile im Posteingang */
  vorschau: string;
  ueberzeile: string;
  titel: string;
  /** Zugesagte Antwortzeit in Stunden und wofür */
  stunden: number;
  wofuer: string;
  /** Wer hinter „Antworten" steht: „die Patientin oder den Patienten" */
  absender: string;
  name: string;
  mail: string;
  tel?: string;
  /** Angaben in Gruppen; leere Werte fallen weg */
  gruppen: { titel: string; zeilen: [string, string | undefined][] }[];
  nachricht?: string;
  anhaenge?: string[];
  /** Zusätzlicher Hinweis unten, z. B. zur Löschfrist */
  hinweis?: string;
};

/** Zeitpunkt, bis zu dem die Zusage gilt: „Freitag, 17.10.2026, 14:30 Uhr" (Berliner Zeit). */
function frist(stunden: number, ab: Date): string {
  const bis = new Date(ab.getTime() + stunden * 60 * 60 * 1000);
  const text = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(bis);
  return `${text} Uhr`;
}

export function praxisText(m: Praxismeldung, eingang = new Date()): string {
  const zeilen: string[] = [
    `ZUGESAGT: Rückmeldung innerhalb von ${m.stunden} Stunden ${m.wofuer}`,
    `— also bis ${frist(m.stunden, eingang)}.`,
    "",
    "Hallo liebes Praxisteam,",
    "",
    `über die Website ist eine neue ${m.ueberzeile} eingegangen.`,
  ];
  for (const g of m.gruppen) {
    const gefuellt = g.zeilen.filter(([, w]) => w);
    if (!gefuellt.length) continue;
    zeilen.push("", `${g.titel}:`, ...gefuellt.map(([b, w]) => `  ${b}: ${w}`));
  }
  if (m.nachricht) zeilen.push("", "Nachricht:", m.nachricht);
  if (m.anhaenge) zeilen.push("", m.anhaenge.length ? `Anhänge: ${m.anhaenge.join(", ")}` : "Keine Anhänge.");
  zeilen.push(
    "",
    "—",
    "",
    `Eine Eingangsbestätigung ist bereits an ${m.mail} gegangen.`,
    `Ein „Antworten“ auf diese Mail geht direkt an ${m.absender}.`,
  );
  if (m.hinweis) zeilen.push("", m.hinweis);
  zeilen.push("", "Viel Erfolg", "Dein Webmaster");
  return zeilen.join("\n") + "\n";
}

/** Knopf, der in Outlook, Apple Mail und Gmail gleich aussieht: Tabelle statt CSS-Box. */
function knopf(href: string, text: string, voll: boolean): string {
  return `<td style="padding:0 10px 10px 0;">
              <a href="${esc(href)}" style="display:inline-block;padding:12px 22px;border:1px solid ${FARBEN.akzent};background:${voll ? FARBEN.akzent : FARBEN.karte};color:${voll ? FARBEN.karte : FARBEN.akzent};font-family:${GROTESK};font-size:13px;letter-spacing:1.4px;text-transform:uppercase;text-decoration:none;">${esc(text)}</a>
            </td>`;
}

export function praxisHtml(m: Praxismeldung, eingang = new Date()): string {
  const gruppen = m.gruppen
    .map((g) => {
      const zeilen = g.zeilen.map(([b, w]) => zeile(b, w)).join("");
      if (!zeilen.trim()) return "";
      return `
        <tr>
          <td style="padding:26px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${FARBEN.akzent};">${esc(g.titel)}</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-top:1px solid ${FARBEN.linie};">
              ${zeilen}
            </table>
          </td>
        </tr>`;
    })
    .join("");

  // Zeilenumbrüche der Nachricht erhalten, alles andere maskieren.
  const nachricht = m.nachricht
    ? `
        <tr>
          <td style="padding:26px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${FARBEN.akzent};">Nachricht</div>
            <div style="margin-top:10px;padding:16px 18px;border-left:2px solid ${FARBEN.akzent};background:${FARBEN.band};font-family:${SERIFE};font-size:16px;line-height:1.6;color:${FARBEN.text};">${esc(m.nachricht).replace(/\r?\n/g, "<br>")}</div>
          </td>
        </tr>`
    : "";

  const anhaenge = m.anhaenge
    ? `
        <tr>
          <td style="padding:26px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:${FARBEN.akzent};">Anhänge</div>
            <div style="margin-top:10px;font-family:${GROTESK};font-size:14px;line-height:1.7;color:${m.anhaenge.length ? FARBEN.text : FARBEN.leise};">
              ${m.anhaenge.length ? m.anhaenge.map((a) => esc(a)).join("<br>") : "Keine Anhänge."}
            </div>
          </td>
        </tr>`
    : "";

  const knoepfe = [
    knopf(`mailto:${m.mail}?subject=${encodeURIComponent(`Ihre ${m.ueberzeile} bei ${praxis.name}`)}`, "Per E-Mail antworten", true),
    m.tel ? knopf(`tel:${m.tel.replace(/[^\d+]/g, "")}`, `Anrufen: ${m.tel}`, false) : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(m.betreff)}</title>
</head>
<body style="margin:0;padding:0;background:${FARBEN.grund};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(m.vorschau)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.grund};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${FARBEN.karte};border:1px solid ${FARBEN.linie};">

        <tr>
          <td style="padding:20px 40px;background:${FARBEN.akzent};font-family:${GROTESK};font-size:14px;line-height:1.55;color:${FARBEN.karte};">
            <span style="font-size:11px;letter-spacing:2.2px;text-transform:uppercase;">Zugesagt</span><br>
            <strong style="font-weight:600;font-size:16px;">Rückmeldung innerhalb von ${m.stunden} Stunden</strong> ${esc(m.wofuer)}<br>
            also bis <strong style="font-weight:600;">${esc(frist(m.stunden, eingang))}</strong>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${FARBEN.akzent};">${esc(m.ueberzeile)} über die Website</div>
            <h1 style="margin:10px 0 0;font-family:${SERIFE};font-size:28px;line-height:1.2;font-weight:normal;color:${FARBEN.text};">${esc(m.titel)}</h1>
          </td>
        </tr>
${gruppen}${nachricht}${anhaenge}
        <tr>
          <td style="padding:28px 40px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${knoepfe}</tr></table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px 36px;">
            <div style="height:1px;background:${FARBEN.linie};line-height:1px;font-size:0;">&nbsp;</div>
            <p style="margin:18px 0 0;font-family:${GROTESK};font-size:13px;line-height:1.65;color:${FARBEN.leise};">
              Eine Eingangsbestätigung ist bereits an ${esc(m.mail)} gegangen.
              Ein „Antworten“ auf diese Mail geht direkt an ${esc(m.absender)}.${m.hinweis ? `<br><br><span style="color:${FARBEN.text};">${esc(m.hinweis)}</span>` : ""}
            </p>
          </td>
        </tr>

      </table>

      <div style="width:600px;max-width:100%;margin-top:16px;font-family:${GROTESK};font-size:11px;line-height:1.6;color:${FARBEN.leise};text-align:center;">
        Automatisch erzeugt von ${esc(praxis.domain.replace(/^https?:\/\//, ""))} — nur für das Praxisteam.
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** Terminanfrage → Meldung an die Praxis (app/api/termin). */
export type Terminmeldung = {
  name: string;
  tel: string;
  mail: string;
  geburt?: string;
  termin1: string;
  tageszeit1?: string;
  termin2?: string;
  tageszeit2?: string;
  status?: string;
  versicherung?: string;
  angst?: string;
  anliegen: string;
  nachricht?: string;
};

export function terminMeldung(d: Terminmeldung): Praxismeldung {
  return {
    betreff: `Terminanfrage: ${d.name}`,
    vorschau: `${d.anliegen} · ${wunschtermin(d.termin1, d.tageszeit1)} · Rückmeldung innerhalb von ${praxis.antwortStunden} Stunden zugesagt`,
    ueberzeile: "Terminanfrage",
    titel: `${d.name} möchte einen Termin.`,
    stunden: praxis.antwortStunden,
    wofuer: "mit einem Terminvorschlag",
    absender: "die Patientin oder den Patienten",
    name: d.name,
    mail: d.mail,
    tel: d.tel,
    gruppen: [
      {
        titel: "Wunschtermine",
        zeilen: [
          ["Wunschtermin 1", wunschtermin(d.termin1, d.tageszeit1)],
          ["Wunschtermin 2", wunschtermin(d.termin2, d.tageszeit2)],
        ],
      },
      {
        titel: "Anliegen",
        zeilen: [
          ["Anliegen", d.anliegen],
          ["Zahnarztangst", d.angst],
          ["Status", d.status],
          ["Versicherung", d.versicherung],
        ],
      },
      {
        titel: "Kontakt",
        zeilen: [
          ["Name", d.name],
          ["Telefon", d.tel],
          ["E-Mail", d.mail],
          ["Geburtsdatum", d.geburt ? datum(d.geburt).replace(/^\w+, /, "") : undefined],
        ],
      },
    ],
    nachricht: d.nachricht,
  };
}

/** Bewerbung → Meldung an die Praxis (app/api/bewerbung). */
export type Bewerbungsmeldung = {
  interesse: string;
  name: string;
  mail: string;
  tel?: string;
  nachricht?: string;
  anhaenge: string[];
};

export function bewerbungMeldung(d: Bewerbungsmeldung): Praxismeldung {
  return {
    betreff: `Bewerbung: ${d.interesse} – ${d.name}`,
    vorschau: `${d.name} · ${d.anhaenge.length ? `${d.anhaenge.length} Anhang/Anhänge` : "ohne Anhänge"} · Rückmeldung ${RUECKMELDUNG_BEWERBUNG} zugesagt`,
    ueberzeile: "Bewerbung",
    titel: `${d.name} bewirbt sich: ${d.interesse}`,
    stunden: RUECKMELDUNG_BEWERBUNG_STUNDEN,
    wofuer: "für ein persönliches Gespräch",
    absender: "die Bewerberin oder den Bewerber",
    name: d.name,
    mail: d.mail,
    tel: d.tel,
    gruppen: [
      {
        titel: "Kontakt",
        zeilen: [
          ["Worum es geht", d.interesse],
          ["Name", d.name],
          ["E-Mail", d.mail],
          ["Telefon", d.tel],
        ],
      },
    ],
    nachricht: d.nachricht,
    anhaenge: d.anhaenge,
    hinweis:
      "Kommt es nicht zu einer Einstellung, die Mail samt Anhängen bitte spätestens sechs Monate nach der Absage löschen — so steht es in der Datenschutzerklärung (Abschnitt 05).",
  };
}

/* ── Info an den Admin ──────────────────────────────────────────────────────
   Kurze Nachricht an ADMIN_MAIL, sobald ein Formular abgeschickt wurde.
   Datenschutz: **kein einziger Inhalt aus dem Formular** — kein Name, keine
   Adresse, keine Angabe zur Zahnarztangst, kein Dateiname. Nur Art,
   Zeitpunkt und ob der Versand geklappt hat. Die Inhalte gehen allein an
   die Praxis (CLAUDE.md, Datenschutz). */

export type Adminmeldung = {
  /** „Terminanfrage" oder „Bewerbung" */
  formular: string;
  zeitpunkt: Date;
  /** Ergebnis je Mail; undefined = nicht versucht, weil vorher abgebrochen */
  praxis: boolean;
  bestaetigung?: boolean;
};

function zeitpunktText(wann: Date): string {
  const text = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(wann);
  return `${text} Uhr`;
}

function adminZeilen(m: Adminmeldung): [string, string, boolean][] {
  const status = (ok: boolean | undefined) => (ok === undefined ? "nicht versucht" : ok ? "zugestellt" : "fehlgeschlagen");
  return [
    ["Mail an die Praxis", status(m.praxis), m.praxis],
    ["Bestätigung an den Absender", status(m.bestaetigung), m.bestaetigung === true],
  ];
}

export function adminBetreff(m: Adminmeldung): string {
  const ok = m.praxis && m.bestaetigung === true;
  return ok ? `Website: ${m.formular} eingegangen` : `Website: ${m.formular} — Versand fehlgeschlagen`;
}

export function adminText(m: Adminmeldung): string {
  return [
    `${m.formular} über die Website, ${zeitpunktText(m.zeitpunkt)}.`,
    "",
    ...adminZeilen(m).map(([b, w]) => `${b}: ${w}`),
    "",
    m.praxis
      ? "Die Inhalte stehen nur in der Mail an die Praxis."
      : "Die Praxis hat diese Anfrage NICHT erhalten. Bitte den Mailversand prüfen (SMTP-Zugang in Netlify).",
    "",
    "—",
    `Automatisch erzeugt von ${praxis.domain.replace(/^https?:\/\//, "")}. Bewusst ohne Formularinhalte.`,
  ].join("\n") + "\n";
}

export function adminHtml(m: Adminmeldung): string {
  const zeilen = adminZeilen(m)
    .map(
      ([b, w, ok]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid ${FARBEN.linie};font-family:${GROTESK};font-size:14px;color:${FARBEN.leise};">${esc(b)}</td>
                <td align="right" style="padding:10px 0;border-bottom:1px solid ${FARBEN.linie};font-family:${GROTESK};font-size:14px;font-weight:600;color:${ok ? FARBEN.text : FARBEN.akzent};">${esc(w)}</td>
              </tr>`,
    )
    .join("");
  const hinweis = m.praxis
    ? "Die Inhalte stehen nur in der Mail an die Praxis."
    : "Die Praxis hat diese Anfrage <strong>nicht</strong> erhalten. Bitte den Mailversand prüfen (SMTP-Zugang in Netlify).";

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(adminBetreff(m))}</title>
</head>
<body style="margin:0;padding:0;background:${FARBEN.grund};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBEN.grund};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${FARBEN.karte};border:1px solid ${FARBEN.linie};">
        <tr>
          <td style="padding:30px 40px 0;">
            <div style="font-family:${GROTESK};font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${FARBEN.akzent};">Info für den Webmaster</div>
            <h1 style="margin:10px 0 0;font-family:${SERIFE};font-size:26px;line-height:1.2;font-weight:normal;color:${FARBEN.text};">${esc(m.formular)} eingegangen</h1>
            <p style="margin:8px 0 0;font-family:${GROTESK};font-size:14px;color:${FARBEN.leise};">${esc(zeitpunktText(m.zeitpunkt))}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${FARBEN.linie};">${zeilen}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 34px;">
            <p style="margin:0;font-family:${GROTESK};font-size:13px;line-height:1.65;color:${m.praxis ? FARBEN.leise : FARBEN.text};">${hinweis}</p>
          </td>
        </tr>
      </table>
      <div style="width:600px;max-width:100%;margin-top:16px;font-family:${GROTESK};font-size:11px;line-height:1.6;color:${FARBEN.leise};text-align:center;">
        Automatisch erzeugt von ${esc(praxis.domain.replace(/^https?:\/\//, ""))} — bewusst ohne Formularinhalte.
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}
