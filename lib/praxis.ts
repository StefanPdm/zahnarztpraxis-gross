import { kontakt } from "./kontakt";

/**
 * Stammdaten der Praxis — die einzige Stelle, an der sie stehen.
 * Kopf, Fuß, Seiten, JSON-LD (lib/strukturierteDaten.ts), sitemap und
 * llms.txt lesen von hier. Wer eine Angabe ändert, ändert sie überall.
 *
 * Nur belegte Angaben (siehe CLAUDE.md, „Belegte Fakten").
 *
 * Telefon und Anschrift stehen in lib/kontakt.ts und werden hier
 * eingesetzt — sie sind die einzigen Angaben, die eine Client-Komponente
 * braucht. Dort steht auch, warum die Trennung nötig ist. **Diese Datei
 * gehört nicht in eine Datei mit `"use client"`.**
 */
export const praxis = {
  ...kontakt,
  name: "Groß & Groß",
  vollerName: "Zahnarztpraxis Groß & Groß",
  /* Die Adresse auf der eigenen Domain, nicht das alte Outlook-Konto
     (Auftraggeber, 21.09.2026). Sie stand vorher an drei Stellen fest im
     Markup, zwei davon veraltet — deshalb jetzt nur noch von hier. */
  email: "praxis@zahnmedizin-potsdam.de",
  eingang: "Eingang auf der Rückseite des Gebäudes",
  /* Zugang: Die Praxis ist **nicht** barrierefrei (Auftraggeber, 21.09.2026).
     Die Angabe stand auf drei Seiten unterschiedlich — einmal „Erdgeschoss,
     barrierefrei", einmal „1. Stock über Treppe". Wer sich darauf verlässt,
     steht sonst vor einer Treppe. Deshalb hier, an einer Stelle. */
  zugang: "1. Stock, über das Treppenhaus",
  /* Die Stecknadel des Google-Eintrags der Praxis (aus dem Maps-Link der
     alten Website, 27.09.2026). Vorher standen hier gerundete Werte, rund
     40 m daneben — Google gleicht Website und Eintrag auch über den Ort ab. */
  geo: { breite: 52.39726, laenge: 13.04823 },
  gegruendet: 1991,
  behandlungszimmer: 5,
  implantate: "über 2.500",
  antwortzeit: "innerhalb von 24 Stunden",
  domain: "https://www.zahnmedizin-potsdam.de",
  /* Eintrag der Praxis bei Google. Öffentlich — sie steht in jedem
     Maps-Link und im Quelltext der Bewertungssektion. Sie stand vorher
     in einer Umgebungsvariable; Netlify prüft deren Werte gegen das
     Build-Ergebnis und brach den Build ab, weil der Wert dort auftaucht.
     Als Stammdatum gehört sie ohnehin hierher, nicht in die Umgebung. */
  googlePlaceId: "ChIJl7tfQs71qEcRzhoT541HJqw",
  /* Name des Google-Eintrags, wie er in Maps steht (per Places API gelesen,
     27.09.2026). Er weicht vom Namen der Website ab; im JSON-LD steht er
     deshalb als alternateName, damit Google und KI-Suchen Website und
     Eintrag als dieselbe Praxis erkennen. Ändert die Praxis den Namen im
     Profil, hier nachziehen. */
  googleName: "Zahnarztpraxis für Ästhetik Groß & Groß",
  /* Profile der Praxis im Netz — im JSON-LD als `sameAs`. Beide stammen von
     der alten Website (27.09.2026). Kommt ein Profil dazu (jameda, Doctolib,
     Instagram …), hier ergänzen. */
  profile: [
    "https://maps.google.com/?cid=12404680898431359694",
    "https://www.facebook.com/zahnarzt.in.potsdam/",
  ],
} as const;

/* ── Sprechzeiten ─────────────────────────────────────────────────────────── */

type Tag = "Mo" | "Di" | "Mi" | "Do" | "Fr";
type Zeitraum = readonly [von: string, bis: string];

/** Je Tag die Zeiträume (Auftraggeber, 30.09.2026). Nach Vereinbarung auch außerhalb. */
export const sprechzeiten: Record<Tag, readonly Zeitraum[]> = {
  Mo: [["08:00", "13:00"], ["14:00", "18:30"]],
  Di: [["08:00", "13:00"], ["14:00", "18:30"]],
  Mi: [["08:00", "13:00"]],
  Do: [["08:00", "14:00"]],
  Fr: [["08:00", "12:00"]],
};

/**
 * Tage mit Nachmittag „nach Vereinbarung" (Auftraggeber, 30.09.2026).
 * Keine Sprechstunde: Der Öffnungsstatus zeigt dann „geschlossen", und im
 * JSON-LD steht nichts dazu. Das Terminformular lässt „Nachmittag" an diesen
 * Tagen zu — eine Anfrage ist genau die Vereinbarung.
 */
export const nachmittagNachVereinbarung: readonly Tag[] = ["Fr"];

/**
 * Tage, an denen die Praxis zusätzlich zu den gesetzlichen Feiertagen
 * geschlossen ist (Betriebsferien, Brückentage) — als ISO-Datum,
 * z. B. "2026-12-28". Der Öffnungsstatus („Jetzt geöffnet") liest von hier;
 * fehlt ein Urlaub, stünde dort in den Ferien „geöffnet".
 */
export const schliesstage: readonly string[] = [];

const TAGNAME: Record<Tag, { lang: string; schema: string }> = {
  Mo: { lang: "Montag", schema: "Monday" },
  Di: { lang: "Dienstag", schema: "Tuesday" },
  Mi: { lang: "Mittwoch", schema: "Wednesday" },
  Do: { lang: "Donnerstag", schema: "Thursday" },
  Fr: { lang: "Freitag", schema: "Friday" },
};

export type Sprechzeitgruppe = { tage: Tag[]; zeiten: readonly Zeitraum[]; vereinbarung: boolean };

/**
 * Jeder Tag als eigene Zeile — auch bei gleichen Zeiten nicht zusammengefasst
 * (Auftraggeber, 30.09.2026).
 */
export function sprechzeitGruppen(): Sprechzeitgruppe[] {
  return (Object.entries(sprechzeiten) as [Tag, readonly Zeitraum[]][]).map(([tag, zeiten]) => ({
    tage: [tag],
    zeiten,
    vereinbarung: nachmittagNachVereinbarung.includes(tag),
  }));
}

/** „Montag – Dienstag" */
export const tageLang = (g: Sprechzeitgruppe) =>
  g.tage.length > 1 ? `${TAGNAME[g.tage[0]].lang} – ${TAGNAME[g.tage.at(-1)!].lang}` : TAGNAME[g.tage[0]].lang;

/** „Mo, Di" */
export const tageKurz = (g: Sprechzeitgruppe) => g.tage.join(", ");

/** „08:00 – 13:00 · 14:00 – 18:30", „08:00 – 12:00 · nachmittags nach Vereinbarung" */
export const zeitenLang = (g: Sprechzeitgruppe) =>
  [...g.zeiten.map(([v, b]) => `${v} – ${b}`), ...(g.vereinbarung ? ["nachmittags nach Vereinbarung"] : [])].join(
    " · ",
  );

/** „8:00–13:00 und 14:00–18:30", „8:00–12:00, nachmittags nach Vereinbarung" */
export const zeitenKurz = (g: Sprechzeitgruppe) =>
  g.zeiten.map(([v, b]) => `${v.replace(/^0/, "")}–${b.replace(/^0/, "")}`).join(" und ") +
  (g.vereinbarung ? ", nachmittags nach Vereinbarung" : "");

/** Für JSON-LD (schema.org OpeningHoursSpecification). */
export const schemaTage = (g: Sprechzeitgruppe) => g.tage.map((t) => TAGNAME[t].schema);
