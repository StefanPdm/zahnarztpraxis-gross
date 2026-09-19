/**
 * Die Behandler — eine Quelle für Startseite, /praxis-team und JSON-LD.
 *
 * Vorher standen die Angaben doppelt und liefen auseinander (Studienort
 * Chantal Groß: Halle vs. Greifswald). Belegt vom Auftraggeber am 19.09.2026:
 * Chantal Groß hat in Halle studiert.
 */

export type Fakt = { label: string; value: string };

export type Behandler = {
  name: string;
  rolle: string;
  foto: string;
  alt: string;
  zitat: string;
  bio: string;
  /** Kurzer Werdegang, erscheint auf der Rückseite der Porträtkarte. */
  werdegang: string;
  fakten: Fakt[];
  schwerpunkte: string;
};

export const team: Behandler[] = [
  {
    name: "Chantal Groß",
    rolle: "Zahnärztin",
    foto: "/uploads/portrait-chantal-gross.jpg",
    alt: "Porträt von Chantal Groß, Zahnärztin bei Groß & Groß in Potsdam",
    zitat:
      "„Ich behandle viele Kinder und Menschen, die lange keinen Zahnarzt gesehen haben. Beide brauchen dasselbe: Ruhe und eine ehrliche Ansage.“",
    bio: "Nach dem Studium und der Assistenzzeit habe ich mich auf ästhetische und konservierende Zahnheilkunde spezialisiert — und darauf, Kinder zu behandeln, ohne sie zu überfahren. Regelmäßige Fortbildungen gehören für mich dazu, weil sich in der Zahnmedizin ständig etwas ändert.",
    werdegang:
      "Studium in Halle, Assistenzzeit in Berlin-Mitte. Curriculum Kinderzahnheilkunde und Parodontologie, jährlich rund 60 Fortbildungsstunden.",
    fakten: [
      { label: "Studium", value: "Halle" },
      { label: "Schwerpunkt", value: "Kinder · Ästhetik" },
      { label: "Zertifikate", value: "Curriculum Paro (DG PARO)" },
    ],
    schwerpunkte:
      "Ästhetische Zahnmedizin · Konservierende Zahnheilkunde · Kinderzahnheilkunde · Parodontologie",
  },
  {
    name: "Matthias Groß",
    rolle: "Zahnarzt",
    foto: "/uploads/portrait-matthias-gross.jpg",
    alt: "Porträt von Matthias Groß, Zahnarzt und Implantologe bei Groß & Groß in Potsdam",
    zitat:
      "„Beim Zahnersatz entscheidet der halbe Millimeter. Deshalb arbeite ich mit unserem eigenen Meisterlabor direkt in der Praxis.“",
    bio: "Mein Schwerpunkt liegt auf Implantologie und Prothetik, dazu chirurgische Eingriffe aus der MKG-Erfahrung. Weil unser Labor im Haus sitzt, kann ich Passung und Farbe direkt am Patienten prüfen, statt auf eine Lieferung zu warten.",
    werdegang:
      "Studium in Rostock, vier Jahre MKG-Chirurgie am Klinikum. Tätigkeitsschwerpunkt Implantologie, über 1.200 gesetzte Implantate.",
    fakten: [
      { label: "Studium", value: "Rostock" },
      { label: "Schwerpunkt", value: "Implantologie · Prothetik" },
      { label: "Erfahrung", value: "1.200+ Implantate" },
    ],
    schwerpunkte: "Implantologie · Prothetik · Chirurgie · Zahnersatz aus dem eigenen Labor",
  },
];
