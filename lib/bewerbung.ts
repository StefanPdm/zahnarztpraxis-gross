/**
 * Regeln für das Bewerbungsformular — gelesen vom Formular im Browser
 * (components/BewerbungsDialog) und von der Route (app/api/bewerbung).
 * Hier steht nichts, was nicht in den Browser darf.
 */

/** Höchstzahl der Anhänge. */
export const MAX_ANHAENGE = 3;

/*
  Alle Anhänge zusammen. Nicht höher setzen: Netlify nimmt in einer
  Function höchstens 6 MB Anfrage an, und Dateien kommen dort
  Base64-kodiert an — ein Drittel größer als auf der Platte.
*/
export const MAX_ANHANG_BYTES = 4 * 1024 * 1024;
export const MAX_ANHANG_TEXT = "4 MB";

/** Endung → erlaubte Dateitypen. Lebenslauf, Zeugnisse, ein Foto. */
export const ANHANG_TYPEN: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

/** Für das `accept`-Attribut des Dateifelds. */
export const ANHANG_ACCEPT = Object.keys(ANHANG_TYPEN)
  .map((e) => `.${e}`)
  .join(",");

/** Eine Wahl im Feld „Worum geht es?" — vom Server als Prop übergeben. */
export type Interesse = { wert: string; label: string };

/**
 * Zusage für Bewerbungen (Auftraggeber, 15.10.2026). Bewusst länger als
 * die 24 Stunden für Terminanfragen (`praxis.antwortzeit`) — die gelten
 * für Patienten und bleiben.
 */
export const RUECKMELDUNG_BEWERBUNG_STUNDEN = 48;
export const RUECKMELDUNG_BEWERBUNG = `innerhalb von ${RUECKMELDUNG_BEWERBUNG_STUNDEN} Stunden`;

/** Wert für die Initiativbewerbung; die übrigen Werte sind die Pfade der Stellen. */
export const INITIATIV = "initiativ";
