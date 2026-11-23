/**
 * Das Winterkapitel — saisonale Ausgabe der Website, eine Datei für alles:
 * Schalter, Zeitraum und sämtliche Texte. Für das nächste Jahr genügt es,
 * die Texte hier zu prüfen; Daten (Adventssonntage, Feiertage, Sprechzeiten
 * zwischen den Jahren) rechnen sich selbst.
 *
 * Was es zeigt (nur Server-Komponenten, kein Skript dazu):
 *   - Startseite: Kerzenlicht und Stern in der Hero, abgewandelter Slogan,
 *     „Kapitel 0 · Die stille Zeit" mit Sprechzeiten zwischen den Jahren,
 *     „Die vier Tafeln des Advents", andere Überschriften an drei Stellen
 *   - Kopfzeile: einmal ein Goldschimmer am Monogramm (nur CSS)
 *   - Kinderseite: GROSSELINO mit Schal
 *   - Terminbestätigung per Mail: ein Gruß zum Fest
 * Aussehen in app/saison.css, alles unter :root[data-saison].
 *
 * Zwei Phasen: „advent" von BEGINN (vor dem ersten Advent) bis 31. Dezember,
 * „neujahr" vom 1. Januar bis ENDE. Danach ist die Website wieder genau wie
 * vorher. Beide Werte stehen unter dem Schalter.
 *
 * Die Seiten werden stündlich neu berechnet (`revalidate` in app/layout.tsx).
 * Deshalb schaltet sich das Kapitel ohne neuen Build ein und aus.
 */

/* ── Der Schalter ────────────────────────────────────────────────────────────
   "automatisch"  nach Datum (Normalfall)
   "aus"          nie, auch nicht im Dezember
   "advent" / "neujahr"
                  immer diese Phase — zum Ansehen außerhalb der Saison.
                  Außerhalb des Zeitraums tut die Seite dann so, als wäre
                  der 20. Dezember bzw. der 2. Januar: alle Tafeln offen.
   "an"           zum Testen: alles auf einmal sichtbar — Adventsfassung,
                  Tafeln I–III offen und IV geschlossen (beide Zustände),
                  die Tabelle „Zwischen den Jahren" vollständig, egal
                  welches Datum.
                  Nicht so veröffentlichen.
   Für eine Vorschau ohne Code-Änderung: Umgebungsvariable WINTERKAPITEL
   (z. B. in einem Netlify-Branch-Deploy) überschreibt diesen Wert. */
export const WINTERKAPITEL: Schalter = 'automatisch'; // 'automatisch' | 'aus' | 'advent' | 'neujahr' | 'an'

/* ── Der Zeitraum (gilt für "automatisch") ───────────────────────────────────
   BEGINN: so viele Tage vor dem ersten Advent geht das Winterkapitel an.
   Der erste Advent liegt jedes Jahr zwischen dem 27. November und dem
   3. Dezember — darum relativ zu ihm statt eines festen Datums.
   7 = eine Woche vorher (2026: ab Sonntag, 22. November). 0 = ab dem
   ersten Advent. Bis zum ersten Advent sind alle vier Türchen geschlossen.
   ENDE: letzter Tag im Januar (6 = Heilige Drei Könige). */
export const BEGINN_TAGE_VOR_DEM_ERSTEN_ADVENT = 7;
export const ENDE_TAG_IM_JANUAR = 6;

type Schalter = 'automatisch' | 'aus' | 'advent' | 'neujahr' | 'an';
export type Phase = 'advent' | 'neujahr';

export type Kalendertag = {
  jahr: number;
  monat: number;
  tag: number;
  iso: string;
  wochentag: number;
};

export type Winterkapitel = {
  phase: Phase;
  /** „Heute" in Potsdam — oder der vorgetäuschte Tag einer Vorschau. */
  heute: Kalendertag;
  /** Schalter "an": alles zeigen, unabhängig vom Datum (nur zum Testen). */
  alles?: boolean;
};

function schalter(): Schalter {
  const umgebung = process.env.WINTERKAPITEL;
  return umgebung === 'automatisch' ||
    umgebung === 'aus' ||
    umgebung === 'advent' ||
    umgebung === 'neujahr' ||
    umgebung === 'an'
    ? umgebung
    : WINTERKAPITEL;
}

export function kalendertag(jahr: number, monat: number, tag: number): Kalendertag {
  const d = new Date(Date.UTC(jahr, monat - 1, tag));
  return {
    jahr: d.getUTCFullYear(),
    monat: d.getUTCMonth() + 1,
    tag: d.getUTCDate(),
    iso: d.toISOString().slice(0, 10),
    wochentag: d.getUTCDay(),
  };
}

/** Datum in Europe/Berlin, egal wo der Server steht. */
function heuteInPotsdam(jetzt: Date): Kalendertag {
  const [jahr, monat, tag] = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(jetzt)
    .split('-')
    .map(Number);
  return kalendertag(jahr, monat, tag);
}

/** Erster Tag des Winterkapitels in einem Jahr: BEGINN Tage vor dem ersten Advent. */
export function winterBeginn(jahr: number): Kalendertag {
  const erster = adventssonntage(jahr)[0];
  return kalendertag(erster.jahr, erster.monat, erster.tag - BEGINN_TAGE_VOR_DEM_ERSTEN_ADVENT);
}

function phaseNachDatum(t: Kalendertag): Phase | null {
  if (t.monat === 1 && t.tag <= ENDE_TAG_IM_JANUAR) return 'neujahr';
  if (t.iso >= winterBeginn(t.jahr).iso && t.monat >= 10) return 'advent';
  return null;
}

/** Ist das Winterkapitel gerade an? `null` heißt: Website wie immer. */
export function winterkapitel(jetzt: Date = new Date()): Winterkapitel | null {
  const s = schalter();
  if (s === 'aus') return null;
  const heute = heuteInPotsdam(jetzt);
  const nachDatum = phaseNachDatum(heute);
  if (s === 'automatisch') return nachDatum ? { phase: nachDatum, heute } : null;
  const jahr = heute.monat === 1 ? heute.jahr - 1 : heute.jahr;
  if (s === 'an') return { phase: 'advent', heute: kalendertag(jahr, 12, 20), alles: true };
  // Fest eingestellt: im passenden Zeitraum das echte Datum, sonst ein vorgetäuschtes.
  if (nachDatum === s) return { phase: s, heute };
  return {
    phase: s,
    heute: s === 'advent' ? kalendertag(jahr, 12, 20) : kalendertag(jahr + 1, 1, 2),
  };
}

/** Die vier Adventssonntage eines Jahres — der vierte ist der letzte Sonntag vor dem 25. Dezember. */
export function adventssonntage(jahr: number): Kalendertag[] {
  const heiligabend = kalendertag(jahr, 12, 24);
  const vierter = 24 - heiligabend.wochentag;
  return [21, 14, 7, 0].map((abstand) => kalendertag(jahr, 12, vierter - abstand));
}

/**
 * Wie viele Adventssonntage schon waren — so viele Türchen sind offen und so
 * viele Kerzen brennen in der Laufmarke. Testschalter "an": drei, damit
 * beide Zustände zu sehen sind.
 */
export function vergangeneAdvente(winter: Winterkapitel): number {
  if (winter.alles) return 3;
  return adventssonntage(winter.heute.jahr).filter((s) => winter.heute.iso >= s.iso).length;
}

/** Text am Landeplatz des Leitsterns, beim Terminformular. */
export const LEITSTERN_ZIEL = 'Ihr Weg zu uns';

/* ── Texte ───────────────────────────────────────────────────────────────────
   Rezept, Lieblingsorte und Grußworte hat Claude auf Wunsch des
   Auftraggebers frei formuliert (23.11.2026), die Unterschriften sind
   nachgestellt. Ausnahme von „Nichts erfinden" (CLAUDE.md), beschränkt auf
   diese Datei; die Praxis passt sie bei Bedarf an. */

/** Slogan der Hero: „Ruhig behandeln." + goldenes Wort + Rest. */
export const SLOGAN: Record<Phase, { gold: string; rest: string }> = {
  advent: { gold: 'Entspannt', rest: 'feiern.' },
  neujahr: { gold: 'Neu', rest: 'beginnen.' },
};

export const STILLE_ZEIT = {
  kapitel: 'Kapitel 0 · Die stille Zeit',
  advent: {
    titel: ['Zwischen den', 'Jahren'],
    text: 'Zum Jahresende wird es auch bei uns ruhiger. Hier sehen Sie, wann wir an den Tagen um Weihnachten und Neujahr für Sie da sind – und wer hilft, wenn wir geschlossen haben.',
  },
  neujahr: {
    titel: ['Ein neues Jahr,', 'ruhig begonnen'],
    text: 'Ein guter Vorsatz, der leichtfällt: einmal im Jahr zur professionellen Zahnreinigung.',
  },
  notdienst:
    'An Feiertagen und am Wochenende hilft der zahnärztliche Notdienst der Kassenzahnärztlichen Vereinigung Land Brandenburg.',
  gruss: {
    advent:
      'Danke für Ihr Vertrauen in diesem Jahr. Wir wünschen Ihnen ruhige Feiertage, Zeit für die Menschen, die Ihnen wichtig sind, und einen guten Start ins neue Jahr.',
    neujahr: 'Wir wünschen Ihnen ein gesundes neues Jahr und freuen uns darauf, Sie wiederzusehen.',
  },
  unterschriften: ['Chantal Groß', 'Matthias Groß'],
};

/** Namen der Tage in der Tabelle „Zwischen den Jahren" (Schlüssel: MM-TT). */
export const FESTTAGE: Record<string, string> = {
  '12-24': 'Heiligabend',
  '12-25': '1. Weihnachtsfeiertag',
  '12-26': '2. Weihnachtsfeiertag',
  '12-31': 'Silvester',
  '01-01': 'Neujahr',
};

/** Zeitraum der Tabelle: vom 22. Dezember bis zum 2. Januar. */
export const ZWISCHEN_DEN_JAHREN = { von: [12, 22] as const, bis: [1, 2] as const };

export type Tafelinhalt =
  | { art: 'liste'; eintraege: { titel: string; text: string }[] }
  | { art: 'rezept'; zutaten: string[]; schritte: string[]; randnotiz: string }
  | { art: 'text'; absaetze: string[]; link?: { href: string; text: string } };

export type Tafel = { titel: string; kurz: string; inhalt: Tafelinhalt };

/** Je Adventssonntag eine Tafel; sie öffnet sich an diesem Sonntag und bleibt offen. */
export const ADVENTSTAFELN: Tafel[] = [
  {
    titel: 'Zahnfreundlich durch den Advent',
    kurz: 'Drei kleine Gewohnheiten, mit denen Plätzchen, Glühwein und Nüsse ihren Schrecken verlieren.',
    inhalt: {
      art: 'liste',
      eintraege: [
        {
          titel: 'Nach dem Glühwein: erst Wasser, dann warten',
          text: 'Säure und Zucker machen den Zahnschmelz kurz weich. Ein Glas Wasser spült beides ab; mit dem Zähneputzen warten Sie danach besser eine halbe Stunde.',
        },
        {
          titel: 'Lieber auf einmal als den ganzen Tag',
          text: 'Nicht die Menge Zucker schadet am meisten, sondern wie oft er kommt. Ein paar Plätzchen zum Kaffee sind besser als eine Zuckerstange, an der man den ganzen Nachmittag lutscht.',
        },
        {
          titel: 'Nüsse gehören in den Nussknacker',
          text: 'Walnüsse mit den Zähnen zu knacken, kostet jedes Jahr Ecken an Zähnen und Kronen. Der Nussknacker steht ohnehin schon auf dem Tisch.',
        },
      ],
    },
  },
  {
    titel: 'Aus Chantals Küche: Zimtsterne',
    kurz: 'Das Rezept, das bei uns jedes Jahr zuerst gebacken wird – mit einer Anmerkung der Zahnärztin am Rand.',
    inhalt: {
      art: 'rezept',
      zutaten: [
        '2 Eiweiß',
        '1 Prise Salz',
        '200 g Puderzucker',
        '250 g gemahlene Mandeln',
        '2 TL Zimt',
        '1 Spritzer Zitronensaft',
      ],
      schritte: [
        'Eiweiß mit dem Salz steif schlagen, den Puderzucker nach und nach einrieseln lassen und weiterschlagen, bis die Masse glänzt. Drei Esslöffel davon für den Guss beiseitestellen.',
        'Mandeln, Zimt und Zitronensaft unter den Rest heben. Den Teig eine Stunde kalt stellen.',
        'Zwischen zwei Lagen Backpapier knapp einen Zentimeter dick ausrollen, Sterne ausstechen und mit dem beiseitegestellten Eischnee bestreichen.',
        'Bei 140 °C Umluft etwa zehn Minuten backen. Der Guss soll weiß bleiben, die Sterne innen weich.',
      ],
      randnotiz:
        'Am Rand notiert: Mandeln statt Mehl und kein klebriger Karamell – Zimtsterne gehören zu den freundlicheren Plätzchen für die Zähne. Danach trotzdem ein Glas Wasser. — Chantal Groß',
    },
  },
  {
    titel: "Matthias' Potsdam im Winter",
    kurz: 'Drei Orte, die Matthias Groß als echter Potsdamer im Dezember jedem empfiehlt.',
    inhalt: {
      art: 'liste',
      eintraege: [
        {
          titel: 'Das Holländische Viertel am Abend',
          text: 'Wenn es früh dunkel wird und in den roten Backsteinhäusern die Fenster leuchten, ist das Viertel am schönsten. Am besten ohne Ziel, einfach durch die Gassen.',
        },
        {
          titel: 'Der Pfingstberg an einem klaren Tag',
          text: 'Oben liegt die ganze Stadt vor einem, im Winter ohne Laub dazwischen. Der Weg hinauf wärmt, die Aussicht lohnt ihn.',
        },
        {
          titel: 'Sanssouci am frühen Morgen',
          text: 'Bevor die Besucher kommen, gehört der Park den Spaziergängern. Mit Raureif auf den Weinbergterrassen ist er so still wie sonst nie.',
        },
      ],
    },
  },
  {
    titel: 'Kaminfeuer an der Decke',
    kurz: 'Über jedem Behandlungsstuhl hängt ein Monitor. Im Dezember dürfen Sie sich dort auch ein knisterndes Feuer wünschen.',
    inhalt: {
      art: 'text',
      absaetze: [
        'Wer zu uns kommt, kann über den Monitor an der Decke Musik hören oder einen beliebigen Film sehen. In der Adventszeit wählen viele etwas Ruhigeres: ein Kaminfeuer, das leise knistert, während wir arbeiten.',
        'Sagen Sie es einfach beim Hinsetzen. Gerade wer ungern zum Zahnarzt geht, merkt oft, wie viel ein ruhiges Bild ausmacht.',
      ],
      link: { href: '/angstpatienten', text: 'Wie wir mit Zahnarztangst umgehen' },
    },
  },
];

export const TAFELN_KOPF = {
  ueberzeile: 'Advent',
  titel: 'Die vier Tafeln des Advents.',
  text: 'An jedem Adventssonntag öffnet sich eine neue Tafel – und bleibt bis Weihnachten offen.',
};

/** Kleine Änderungen an bestehenden Stellen der Startseite. */
export const UEBERSCHRIFTEN: Record<
  Phase,
  { bewertungen: string; abschluss: [string, string]; decke?: string }
> = {
  advent: {
    bewertungen: 'Was uns dieses Jahr geschenkt wurde',
    abschluss: ['Der erste Termin im neuen Jahr ist oft nur ein', 'Gespräch'],
    decke: 'Im Dezember auf Wunsch auch ein Kaminfeuer.',
  },
  neujahr: {
    bewertungen: 'Bewertungen',
    abschluss: ['Der erste Termin im neuen Jahr ist oft nur ein', 'Gespräch'],
  },
};

/** Ein Satz in der Terminbestätigung per Mail. */
export const MAILGRUSS: Record<Phase, string> = {
  advent: 'Wir wünschen Ihnen ruhige Feiertage.',
  neujahr: 'Wir wünschen Ihnen ein gutes neues Jahr.',
};

/** Das Band unter der Kopfzeile, auf jeder Seite. Führt zu „Die stille Zeit". */
export const WINTERBAND: Record<Phase, { marke: string; link: string }> = {
  advent: { marke: 'Winterkapitel', link: 'Sprechzeiten zwischen den Jahren' },
  neujahr: { marke: 'Ein gutes neues Jahr', link: 'Wann wir für Sie da sind' },
};

/** GROSSELINO auf der Kinderseite: Sprüche im Winter (Aufbau wie in components/Grosselino.tsx). */
export const GROSSELINO_WINTER: Record<
  Phase,
  { sprueche: [bis: number, text: string][]; mobil: { zeile: string; text: string } }
> = {
  advent: {
    sprueche: [
      [0.1, 'Hallo, ich bin Grosselino! Schöne Adventszeit!'],
      [0.28, 'Beim ersten Mal wird nur geschaut.'],
      [0.48, 'Nach dem Plätzchen: ein Schluck Wasser!'],
      [0.66, 'Hand heben heißt: Pause.'],
      [0.86, 'Du machst das ganz super.'],
      [1.01, 'Frohe Weihnachten – bis bald in der Praxis!'],
    ],
    mobil: {
      zeile: 'Hallo, ich bin Grosselino',
      text: 'Schöne Adventszeit! Beim ersten Mal wird nur geschaut. Und nach dem Plätzchen gibt es einen Schluck Wasser.',
    },
  },
  neujahr: {
    sprueche: [
      [0.1, 'Hallo, ich bin Grosselino! Frohes neues Jahr!'],
      [0.28, 'Beim ersten Mal wird nur geschaut.'],
      [0.48, 'Zähne zählen darfst du selbst.'],
      [0.66, 'Hand heben heißt: Pause.'],
      [0.86, 'Du machst das ganz super.'],
      [1.01, 'Bis bald in der Praxis!'],
    ],
    mobil: {
      zeile: 'Hallo, ich bin Grosselino',
      text: 'Frohes neues Jahr! Beim ersten Mal wird nur geschaut. Und Hand heben heißt immer: Pause.',
    },
  },
};
