/**
 * Wunschtermine im Formular: frühestens morgen (Potsdamer Zeit) und nur
 * Montag bis Freitag.
 *
 * Heute ist ausgeschlossen, weil die Praxis Anfragen innerhalb von 24 Stunden
 * beantwortet — ein Termin für heute wäre bis dahin verstrichen. Für akute
 * Beschwerden verweist das Formular aufs Telefon. Am Wochenende ist die
 * Praxis geschlossen.
 *
 * Das Datumsfeld des Browsers kann nur einen frühesten Tag sperren (`min`),
 * keine Wochentage. Ein Wochenende lässt sich also auswählen — das Formular
 * meldet es sofort am Feld und lässt sich so nicht absenden.
 *
 * Genutzt im Browser (components/TerminFormular) und auf dem Server
 * (app/api/termin), damit die Regel auch gilt, wenn jemand das Feld umgeht.
 * Keine Stammdaten — darf in eine Client-Komponente.
 */

export type Wunschterminfehler = "ungueltig" | "zu-frueh" | "wochenende";

/** Was am Feld steht, wenn ein Datum nicht passt. */
export const WUNSCHTERMIN_HINWEIS: Record<Wunschterminfehler, string> = {
  ungueltig: "Bitte geben Sie ein gültiges Datum ein.",
  "zu-frueh": "Bitte wählen Sie einen Tag ab morgen.",
  wochenende:
    "Samstags und sonntags ist die Praxis geschlossen. Bitte wählen Sie einen Tag von Montag bis Freitag.",
};

/** Kalenderdatum in Europe/Berlin als „JJJJ-MM-TT", `abstand` Tage nach `jetzt`. */
function potsdamerDatum(jetzt: Date, abstand: number): string {
  const heute = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(jetzt); // en-CA liefert genau JJJJ-MM-TT
  const [j, m, t] = heute.split("-").map(Number);
  return new Date(Date.UTC(j, m - 1, t + abstand)).toISOString().slice(0, 10);
}

/** Frühestes zulässiges Datum: morgen in Potsdam. */
export function fruehesterWunschtermin(jetzt: Date = new Date()): string {
  return potsdamerDatum(jetzt, 1);
}

/**
 * `null`, wenn das Datum passt, sonst der Grund. Ein Datumsfeld liefert
 * „JJJJ-MM-TT"; in diesem Format ist der Zeichenkettenvergleich zugleich ein
 * Datumsvergleich.
 */
export function pruefeWunschtermin(wert: string, jetzt: Date = new Date()): Wunschterminfehler | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(wert)) return "ungueltig";
  const [j, m, t] = wert.split("-").map(Number);
  const d = new Date(Date.UTC(j, m - 1, t));
  // Kalendarisch gültig? (fängt z. B. den 31.02. ab)
  if (d.getUTCFullYear() !== j || d.getUTCMonth() !== m - 1 || d.getUTCDate() !== t) return "ungueltig";
  if (wert < fruehesterWunschtermin(jetzt)) return "zu-frueh";
  const wochentag = d.getUTCDay(); // 0 = Sonntag, 6 = Samstag
  if (wochentag === 0 || wochentag === 6) return "wochenende";
  return null;
}
