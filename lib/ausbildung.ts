/**
 * Der Ausbildungsplatz — Eckdaten an einer Stelle.
 * Gelesen von /ausbildung, dem Hinweis auf der Startseite und dem
 * JobPosting-JSON-LD. Alle Angaben vom Auftraggeber, 21.09.2026.
 *
 * ACHTUNG, Pflicht gegenüber Google: Ein JobPosting muss verschwinden,
 * sobald die Stelle besetzt ist. Dafür `offen` auf false setzen — dann
 * entfallen das Markup und die Bewerbungsaufforderung, die Seite bleibt
 * als Information über den Beruf bestehen. Eine Anzeige, die nach der
 * Besetzung weiterläuft, wertet Google als irreführend ab.
 */
export const ausbildung = {
  /** Steht die Stelle noch offen? Steuert Markup und Aufforderung. */
  offen: true,
  stellen: 1,
  beruf: "Zahnmedizinische Fachangestellte",
  kuerzel: "ZFA",
  /* Festes Datum, kein `new Date()`: Sonst trüge das JSON-LD bei jedem
     Deploy ein neues Veröffentlichungsdatum, und Google läse jede
     Neuveröffentlichung der Website als neu ausgeschriebene Stelle. */
  veroeffentlicht: "2026-09-21",
  /** ISO-Datum für das JSON-LD */
  beginn: "2027-08-01",
  beginnLang: "1. August 2027",
  dauerJahre: 3,
  /* Bis wann die Anzeige gelten soll. Kein Datum vom Auftraggeber —
     gesetzt auf den Tag vor Ausbildungsbeginn, weil eine Bewerbung bis
     dahin theoretisch möglich bleibt. Sobald eine echte Frist feststeht,
     hier ändern. */
  gueltigBis: "2027-07-31",
} as const;
