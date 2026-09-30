import { istFeiertag, KURZTAGE, TAGNAMEN, type Kurztag, type Wochenplan } from "@/lib/oeffnungsstatus";

/**
 * Wunschtermine im Formular: nur Tage, an denen die Praxis Sprechstunde hat.
 *
 * - frühestens morgen (Potsdamer Zeit): Die Praxis antwortet innerhalb von
 *   24 Stunden, ein Termin für heute wäre bis dahin verstrichen. Für akute
 *   Beschwerden verweist das Formular aufs Telefon.
 * - kein Wochenende, kein gesetzlicher Feiertag in Brandenburg, keine
 *   Betriebsferien (`schliesstage` in lib/praxis.ts)
 * - „Nachmittag" nur an Tagen mit Nachmittagssprechstunde oder mit
 *   Nachmittag nach Vereinbarung
 *
 * Das Datumsfeld des Browsers kann nur einen frühesten Tag sperren (`min`),
 * keine einzelnen Tage. Ein gesperrter Tag lässt sich also auswählen — das
 * Formular meldet es sofort am Feld und lässt sich so nicht absenden.
 *
 * Genutzt im Browser (components/TerminFormular) und auf dem Server
 * (app/api/termin), damit die Regel auch gilt, wenn jemand das Feld umgeht.
 * Sprechzeiten und Schließtage kommen als Argument herein (aus lib/praxis.ts,
 * über eine Server-Komponente) — diese Datei darf in eine Client-Komponente.
 */

export type Sprechzeitregeln = {
  plan: Wochenplan;
  schliesstage: readonly string[];
  /** Tage, an denen nachmittags nach Vereinbarung behandelt wird. */
  nachVereinbarung?: readonly Kurztag[];
};

export type Wunschterminfehler =
  | "ungueltig"
  | "zu-frueh"
  | "wochenende"
  | "feiertag"
  | "betriebsferien"
  | "keine-sprechstunde";

/** Was am Feld steht, wenn ein Datum nicht passt. */
export const WUNSCHTERMIN_HINWEIS: Record<Wunschterminfehler, string> = {
  ungueltig: "Bitte geben Sie ein gültiges Datum ein.",
  "zu-frueh": "Bitte wählen Sie einen Tag ab morgen.",
  wochenende:
    "Samstags und sonntags ist die Praxis geschlossen. Bitte wählen Sie einen Tag von Montag bis Freitag.",
  feiertag: "An diesem Tag ist ein gesetzlicher Feiertag, die Praxis ist geschlossen. Bitte wählen Sie einen anderen Tag.",
  betriebsferien: "An diesem Tag ist die Praxis geschlossen (Betriebsferien). Bitte wählen Sie einen anderen Tag.",
  "keine-sprechstunde": "An diesem Tag hat die Praxis keine Sprechstunde. Bitte wählen Sie einen anderen Tag.",
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

/** Wochentag (0 = Sonntag) eines kalendarisch gültigen „JJJJ-MM-TT", sonst null. */
function wochentag(wert: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(wert)) return null;
  const [j, m, t] = wert.split("-").map(Number);
  const d = new Date(Date.UTC(j, m - 1, t));
  // fängt z. B. den 31.02. ab
  if (d.getUTCFullYear() !== j || d.getUTCMonth() !== m - 1 || d.getUTCDate() !== t) return null;
  return d.getUTCDay();
}

/**
 * `null`, wenn das Datum passt, sonst der Grund. In „JJJJ-MM-TT" ist der
 * Zeichenkettenvergleich zugleich ein Datumsvergleich.
 */
export function pruefeWunschtermin(
  wert: string,
  { plan, schliesstage }: Sprechzeitregeln,
  jetzt: Date = new Date(),
): Wunschterminfehler | null {
  const tag = wochentag(wert);
  if (tag === null) return "ungueltig";
  if (wert < fruehesterWunschtermin(jetzt)) return "zu-frueh";
  if (tag === 0 || tag === 6) return "wochenende";
  if (istFeiertag(wert)) return "feiertag";
  if (schliesstage.includes(wert)) return "betriebsferien";
  if (!plan[KURZTAGE[tag]]?.length) return "keine-sprechstunde";
  return null;
}

/** Hat die Sprechzeit an diesem Wochentag einen Teil nach 13 Uhr? */
function hatNachmittag(plan: Wochenplan, tag: number): boolean {
  return (plan[KURZTAGE[tag]] ?? []).some(([, bis]) => bis > "13:00");
}

/** Nachmittag mit Sprechstunde oder nach Vereinbarung? */
function nachmittagMoeglich({ plan, nachVereinbarung = [] }: Sprechzeitregeln, tag: number): boolean {
  return hatNachmittag(plan, tag) || nachVereinbarung.includes(KURZTAGE[tag]);
}

/** „montags, dienstags und donnerstags" — aus dem Plan, damit der Text nie veraltet. */
function aufzaehlung(tage: number[]): string {
  const namen = tage.map((t) => `${TAGNAMEN[t].toLowerCase()}s`);
  return namen.length > 1 ? `${namen.slice(0, -1).join(", ")} und ${namen.at(-1)}` : (namen[0] ?? "");
}

/**
 * Passt „Nachmittag" zu den gewählten Tagen? Geprüft werden nur Tage, die
 * für sich zulässig sind — sonst stünden zwei Meldungen für denselben Fehler.
 * Gibt den Hinweis zurück oder `null`.
 */
export function pruefeTageszeit(
  tageszeit: string | undefined,
  termine: readonly string[],
  regeln: Sprechzeitregeln,
  jetzt: Date = new Date(),
): string | null {
  if (tageszeit !== "Nachmittag") return null;
  const ohne = termine.filter(
    (w) => w && !pruefeWunschtermin(w, regeln, jetzt) && !nachmittagMoeglich(regeln, wochentag(w)!),
  );
  if (!ohne.length) return null;
  const werktage = [1, 2, 3, 4, 5];
  const offen = aufzaehlung(werktage.filter((t) => hatNachmittag(regeln.plan, t)));
  const vereinbart = aufzaehlung(werktage.filter((t) => !hatNachmittag(regeln.plan, t) && nachmittagMoeglich(regeln, t)));
  const zusatz = vereinbart ? `, ${vereinbart} nach Vereinbarung` : "";
  return offen
    ? `Nachmittags ist die Praxis nur ${offen} geöffnet${zusatz}. Bitte wählen Sie „Vormittag“ oder einen passenden Tag.`
    : `Nachmittags hat die Praxis keine Sprechstunde. Bitte wählen Sie „Vormittag“.`;
}
