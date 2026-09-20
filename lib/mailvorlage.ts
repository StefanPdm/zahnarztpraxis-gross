import { praxis, sprechzeitGruppen, tageLang, zeitenLang } from "@/lib/praxis";

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
  termin2?: string;
  tageszeit?: string;
};

/** „2026-09-24" → „24.09.2026"; alles andere unverändert zurück. */
function datum(wert: string): string {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})$/.exec(wert);
  return treffer ? `${treffer[3]}.${treffer[2]}.${treffer[1]}` : wert;
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
    `- Wunschtermin 1: ${datum(d.termin1)}`,
    d.termin2 ? `- Wunschtermin 2: ${datum(d.termin2)}` : "",
    d.tageszeit ? `- Tageszeit: ${d.tageszeit}` : "",
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
              ${zeile("Wunschtermin 1", datum(d.termin1))}
              ${zeile("Wunschtermin 2", d.termin2 ? datum(d.termin2) : "")}
              ${zeile("Tageszeit", d.tageszeit)}
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
