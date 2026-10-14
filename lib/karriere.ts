import { INITIATIV, type Interesse } from "./bewerbung";
import { ausbildung } from "./ausbildung";

/**
 * Offene Stellen — eine Quelle für die Karriere-Fahne, das Band auf der
 * Startseite, die Hinweise auf /praxis-team und /zahnlabor, die
 * Karriereseite und das JobPosting-JSON-LD.
 *
 * Ist eine Stelle besetzt: `offen: false`. Dann verschwinden ihr Markup für
 * Google und ihre Hinweise; steht keine Stelle mehr offen, auch die Fahne.
 * Die Seiten selbst bleiben bestehen.
 *
 * Darf in Client-Komponenten nicht importiert werden — nicht, weil hier
 * etwas Geheimes stünde, sondern damit die Zahl der offenen Stellen auf dem
 * Server entsteht und nur als Zahl hinübergeht (app/layout.tsx).
 */

/*
  Zahntechniker — die Stellenbeschreibung hat der Auftraggeber am
  15.10.2026 ausdrücklich freigegeben, sie selbst zu formulieren, nach dem
  Muster üblicher Ausschreibungen. Ausnahme von „Nichts erfinden"
  (CLAUDE.md), auf diese eine Anzeige beschränkt. Vom Auftraggeber noch zu
  bestätigen: Arbeitszeit, Beginn, Leistungen, Gehalt (bewusst weggelassen,
  kommt später). Siehe docs/STAND.md.
*/
export const zahntechnik = {
  offen: true,
  stellen: 1,
  beruf: "Zahntechniker",
  /* Geschlechtszusatz nach dem AGG — wie bei der Ausbildung. */
  zusatz: "(w/m/d)",
  beginnLang: "ab sofort",
  umfang: "Vollzeit oder Teilzeit",
  /* Festes Datum, kein `new Date()` — Begründung in lib/ausbildung.ts. */
  veroeffentlicht: "2026-10-15",
  /* Keine Frist vom Auftraggeber. Sechs Monate, danach prüfen und
     verlängern — Google wertet abgelaufene Anzeigen ohne Datum schlechter
     als solche mit einem ehrlichen. */
  gueltigBis: "2027-04-15",
} as const;

export type Stelle = {
  pfad: string;
  offen: boolean;
  /** Kurzform für Fahne, Band und Karten */
  kurz: string;
  /** Wann es losgeht, als Wortgruppe: „ab sofort", „ab 1. August 2027" */
  beginn: string;
};

export const stellen: Stelle[] = [
  {
    pfad: "/karriere/zahntechniker",
    offen: zahntechnik.offen,
    kurz: `${zahntechnik.beruf} ${zahntechnik.zusatz}`,
    beginn: zahntechnik.beginnLang,
  },
  {
    pfad: "/ausbildung",
    offen: ausbildung.offen,
    kurz: `Ausbildung ${ausbildung.kuerzel} ${ausbildung.zusatz}`,
    beginn: `ab ${ausbildung.beginnLang}`,
  },
];

export const offeneStellen = stellen.filter((s) => s.offen);

/**
 * Wahl „Worum geht es?" im Bewerbungsformular: die offenen Stellen und die
 * Initiativbewerbung. Das Formular bekommt die Liste als Prop, die Route
 * (app/api/bewerbung) nimmt nur diese Werte an.
 */
export const interessen: Interesse[] = [
  ...offeneStellen.map((s) => ({ wert: s.pfad, label: s.kurz })),
  { wert: INITIATIV, label: "Initiativbewerbung" },
];
