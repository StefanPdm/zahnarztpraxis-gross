/**
 * Wunschtermine im Formular: frühestens morgen, gerechnet in Potsdamer Zeit.
 *
 * Heute ist ausgeschlossen, weil die Praxis Anfragen innerhalb von 24 Stunden
 * beantwortet — ein Termin für heute wäre bis dahin verstrichen. Für akute
 * Beschwerden verweist das Formular aufs Telefon.
 *
 * Genutzt im Browser (`min` am Datumsfeld, components/TerminFormular) und auf
 * dem Server (app/api/termin), damit die Regel auch gilt, wenn jemand das
 * Feld umgeht. Keine Stammdaten — darf in eine Client-Komponente.
 */

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
 * Ein Datumsfeld liefert „JJJJ-MM-TT"; in diesem Format ist der
 * Zeichenkettenvergleich zugleich ein Datumsvergleich.
 */
export function istZulaessigerWunschtermin(wert: string, jetzt: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(wert)) return false;
  const [j, m, t] = wert.split("-").map(Number);
  const d = new Date(Date.UTC(j, m - 1, t));
  // Kalendarisch gültig? (fängt z. B. den 31.02. ab)
  if (d.getUTCFullYear() !== j || d.getUTCMonth() !== m - 1 || d.getUTCDate() !== t) return false;
  return wert >= fruehesterWunschtermin(jetzt);
}
