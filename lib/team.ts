/**
 * Die Behandler — eine Quelle für Startseite, /praxis-team und JSON-LD.
 *
 * Vorher standen die Angaben doppelt und liefen auseinander (Studienort
 * Chantal Groß: Halle vs. Greifswald). Belegt vom Auftraggeber am 19.09.2026:
 * Chantal und Matthias Groß haben beide in Halle/Saale studiert —
 * Schreibweise immer „Halle/Saale".
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
  /** Für JSON-LD (alumniOf). Halle/Saale: einzige Hochschule mit Zahnmedizin am Ort. */
  hochschule: string;
  fakten: Fakt[];
  schwerpunkte: string;
};

export const team: Behandler[] = [
  {
    name: 'Chantal Groß',
    rolle: 'Zahnärztin',
    foto: '/uploads/portrait-chantal-gross.jpg',
    alt: 'Porträt von Chantal Groß, Zahnärztin bei Groß & Groß in Potsdam',
    zitat:
      '„Ich behandle viele Kinder und Menschen, die lange keinen Zahnarzt gesehen haben. Beide brauchen dasselbe: Ruhe, eine liebesvolle Atmospäre und viel Verständnis“',
    bio: 'Nach dem Studium und der Assistenzzeit habe ich mich auf ästhetische und konservierende Zahnheilkunde spezialisiert — und darauf, Kinder zu behandeln, ohne sie zu überfahren. Regelmäßige Fortbildungen gehören für mich dazu, weil sich in der Zahnmedizin ständig etwas ändert.',
    werdegang:
      'Studium in Halle/Saale, Assistenzzeit in Berlin-Mitte. Curriculum Kinderzahnheilkunde und Parodontologie, jährlich rund 60 Fortbildungsstunden.',
    hochschule: 'Martin-Luther-Universität Halle-Wittenberg',
    fakten: [
      { label: 'Studium', value: 'Halle/Saale' },
      { label: 'Schwerpunkt', value: 'Kinder · Ästhetik' },
      { label: 'Zertifikate', value: 'Curriculum Paro (DG PARO)' },
      { label: 'Hobby', value: 'Backen, Sport' },
      { label: 'Besonderheit', value: 'Großes Herz aus dem Ruhrpott' },
    ],
    schwerpunkte:
      'Ästhetische Zahnmedizin · Konservierende Zahnheilkunde · Kinderzahnheilkunde · Parodontologie',
  },
  {
    name: 'Matthias Groß',
    rolle: 'Zahnarzt',
    foto: '/uploads/portrait-matthias-gross.jpg',
    alt: 'Porträt von Matthias Groß, Zahnarzt und Implantologe bei Groß & Groß in Potsdam',
    zitat:
      '„Beim Zahnersatz entscheidet der halbe Millimeter. Deshalb arbeite ich mit unserem eigenen Meisterlabor direkt in der Praxis.“',
    bio: 'Vor dem Studium habe ich Zahntechniker gelernt. Ich kenne die Arbeit deshalb aus beiden Welten — vom Behandlungsstuhl und von der Werkbank. Mein Schwerpunkt liegt auf Implantologie und Prothetik, dazu chirurgische Eingriffe aus der MKG-Erfahrung. Weil unser Labor im Haus sitzt, kann ich Passung und Farbe direkt am Patienten prüfen, statt auf eine Lieferung zu warten.',
    werdegang:
      'Ausbildung zum Zahntechniker, danach Studium in Halle/Saale und vier Jahre MKG-Chirurgie am Klinikum. Tätigkeitsschwerpunkt Implantologie.',
    hochschule: 'Martin-Luther-Universität Halle-Wittenberg',
    fakten: [
      { label: 'Studium', value: 'Halle/Saale' },
      { label: 'Schwerpunkt', value: 'Implantologie · Prothetik' },
      { label: 'Erfahrung', value: '2.000+ Implantate' },
      { label: 'Hobbys', value: 'Wassersport, Angeln' },
      { label: 'Besonderheit', value: 'Echter Potsdamer' },
    ],
    schwerpunkte: 'Implantologie · Prothetik · Chirurgie · Zahnersatz aus dem eigenen Labor',
  },
];
