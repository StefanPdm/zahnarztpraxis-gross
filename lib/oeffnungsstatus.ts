/**
 * „Jetzt geöffnet" / „Geschlossen · wieder morgen ab 8:00" — gerechnet in
 * Potsdamer Zeit, egal wo der Besucher sitzt.
 *
 * Reine Rechnung ohne Stammdaten: Die Zeiten kommen als Argument herein
 * (aus lib/praxis.ts, über eine Server-Komponente). Deshalb darf diese Datei
 * in eine Client-Komponente — lib/praxis.ts darf das nicht (CLAUDE.md).
 *
 * Gesetzliche Feiertage in Brandenburg sind eingerechnet. Das Terminformular
 * nutzt dieselben Feiertage und Wochentage (lib/wunschtermin.ts). Betriebsferien
 * kennt die Rechnung nur, wenn sie in `schliesstage` (lib/praxis.ts)
 * eingetragen sind — sonst stünde im Urlaub „Jetzt geöffnet".
 */

export type Zeitraum = readonly [von: string, bis: string];
export type Wochenplan = Partial<Record<Kurztag, readonly Zeitraum[]>>;
export type Oeffnungsstatus = { offen: boolean; kurz: string; lang: string };

export type Kurztag = "So" | "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa";
/** Index = Wochentag wie `Date.getUTCDay()`: 0 = Sonntag. */
export const KURZTAGE: Kurztag[] = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const TAGNAMEN = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

const minuten = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
/** „08:00" → „8:00" */
const uhrzeit = (hhmm: string) => hhmm.replace(/^0/, "");

/** Datum, Wochentag und Uhrzeit in Europe/Berlin. */
function potsdamerZeit(jetzt: Date) {
  const teile = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(jetzt)
      .map((t) => [t.type, t.value]),
  );
  return {
    jahr: Number(teile.year),
    monat: Number(teile.month),
    tag: Number(teile.day),
    minute: Number(teile.hour) * 60 + Number(teile.minute),
  };
}

/** Kalendertag `abstand` Tage nach dem angegebenen — als ISO-Datum und Wochentag. */
function kalendertag(jahr: number, monat: number, tag: number, abstand: number) {
  const d = new Date(Date.UTC(jahr, monat - 1, tag + abstand));
  return { iso: d.toISOString().slice(0, 10), wochentag: d.getUTCDay(), jahr: d.getUTCFullYear() };
}

/** Ostersonntag nach der Gaußschen Osterformel (anonymer gregorianischer Algorithmus). */
function ostersonntag(jahr: number) {
  const a = jahr % 19;
  const b = Math.floor(jahr / 100);
  const c = jahr % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31);
  const tag = ((h + l - 7 * m + 114) % 31) + 1;
  return { monat, tag };
}

const feiertagsCache = new Map<number, Set<string>>();

/** Gesetzliche Feiertage in Brandenburg (Oster- und Pfingstsonntag eingeschlossen). */
function feiertage(jahr: number) {
  const vorhanden = feiertagsCache.get(jahr);
  if (vorhanden) return vorhanden;
  const ostern = ostersonntag(jahr);
  const relativ = (abstand: number) => kalendertag(jahr, ostern.monat, ostern.tag, abstand).iso;
  const fest = (monat: number, tag: number) =>
    `${jahr}-${String(monat).padStart(2, "0")}-${String(tag).padStart(2, "0")}`;
  const menge = new Set([
    fest(1, 1), // Neujahr
    relativ(-2), // Karfreitag
    relativ(0), // Ostersonntag
    relativ(1), // Ostermontag
    fest(5, 1), // Tag der Arbeit
    relativ(39), // Christi Himmelfahrt
    relativ(49), // Pfingstsonntag
    relativ(50), // Pfingstmontag
    fest(10, 3), // Tag der Deutschen Einheit
    fest(10, 31), // Reformationstag
    fest(12, 25),
    fest(12, 26),
  ]);
  feiertagsCache.set(jahr, menge);
  return menge;
}

/** Gesetzlicher Feiertag in Brandenburg? `iso` als „JJJJ-MM-TT". */
export function istFeiertag(iso: string): boolean {
  return feiertage(Number(iso.slice(0, 4))).has(iso);
}

export function oeffnungsstatus(
  plan: Wochenplan,
  schliesstage: readonly string[],
  jetzt: Date = new Date(),
): Oeffnungsstatus {
  const z = potsdamerZeit(jetzt);
  const zu = new Set(schliesstage);
  const zeitenAm = (abstand: number) => {
    const t = kalendertag(z.jahr, z.monat, z.tag, abstand);
    if (zu.has(t.iso) || feiertage(t.jahr).has(t.iso)) return { ...t, zeiten: [] as readonly Zeitraum[] };
    return { ...t, zeiten: plan[KURZTAGE[t.wochentag]] ?? [] };
  };

  const heute = zeitenAm(0);
  for (const [von, bis] of heute.zeiten) {
    if (z.minute >= minuten(von) && z.minute < minuten(bis)) {
      return { offen: true, kurz: "Jetzt geöffnet", lang: `Jetzt geöffnet · bis ${uhrzeit(bis)}` };
    }
  }

  const spaeterHeute = heute.zeiten.find(([von]) => minuten(von) > z.minute);
  if (spaeterHeute) {
    const vorher = heute.zeiten.some(([, bis]) => minuten(bis) <= z.minute);
    return {
      offen: false,
      kurz: "Jetzt geschlossen",
      lang: `${vorher ? "Mittagspause" : "Geschlossen"} · heute ab ${uhrzeit(spaeterHeute[0])}`,
    };
  }

  // Nächster Tag mit Sprechzeit; zwei Wochen reichen über jeden Brückentag.
  for (let abstand = 1; abstand <= 14; abstand++) {
    const tag = zeitenAm(abstand);
    if (!tag.zeiten.length) continue;
    const wann = abstand === 1 ? "morgen" : `am ${TAGNAMEN[tag.wochentag]}`;
    return {
      offen: false,
      kurz: "Jetzt geschlossen",
      lang: `Geschlossen · wieder ${wann} ab ${uhrzeit(tag.zeiten[0][0])}`,
    };
  }
  return { offen: false, kurz: "Jetzt geschlossen", lang: "Geschlossen" };
}
