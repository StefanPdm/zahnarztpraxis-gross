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
  geo: { breite: 52.3976, laenge: 13.0484 },
  gegruendet: 1991,
  behandlungszimmer: 5,
  implantate: "über 2.000",
  antwortzeit: "innerhalb von 24 Stunden",
  domain: "https://www.zahnmedizin-potsdam.de",
  /* Eintrag der Praxis bei Google. Öffentlich — sie steht in jedem
     Maps-Link und im Quelltext der Bewertungssektion. Sie stand vorher
     in einer Umgebungsvariable; Netlify prüft deren Werte gegen das
     Build-Ergebnis und brach den Build ab, weil der Wert dort auftaucht.
     Als Stammdatum gehört sie ohnehin hierher, nicht in die Umgebung. */
  googlePlaceId: "ChIJl7tfQs71qEcRzhoT541HJqw",
} as const;

/* ── Sprechzeiten ─────────────────────────────────────────────────────────── */

type Tag = "Mo" | "Di" | "Mi" | "Do" | "Fr";
type Zeitraum = readonly [von: string, bis: string];

/** Je Tag die Zeiträume. Nach Vereinbarung auch außerhalb. */
export const sprechzeiten: Record<Tag, readonly Zeitraum[]> = {
  Mo: [["08:00", "13:00"], ["14:00", "17:30"]],
  Di: [["08:00", "13:00"], ["14:00", "17:30"]],
  Mi: [["08:00", "13:00"]],
  Do: [["08:00", "12:00"]],
  Fr: [["08:00", "12:00"]],
};

const TAGNAME: Record<Tag, { lang: string; schema: string }> = {
  Mo: { lang: "Montag", schema: "Monday" },
  Di: { lang: "Dienstag", schema: "Tuesday" },
  Mi: { lang: "Mittwoch", schema: "Wednesday" },
  Do: { lang: "Donnerstag", schema: "Thursday" },
  Fr: { lang: "Freitag", schema: "Friday" },
};

export type Sprechzeitgruppe = { tage: Tag[]; zeiten: readonly Zeitraum[] };

/** Aufeinanderfolgende Tage mit gleichen Zeiten zusammengefasst: Mo–Di, Mi, Do–Fr. */
export function sprechzeitGruppen(): Sprechzeitgruppe[] {
  const gruppen: Sprechzeitgruppe[] = [];
  for (const [tag, zeiten] of Object.entries(sprechzeiten) as [Tag, readonly Zeitraum[]][]) {
    const letzte = gruppen.at(-1);
    if (letzte && JSON.stringify(letzte.zeiten) === JSON.stringify(zeiten)) letzte.tage.push(tag);
    else gruppen.push({ tage: [tag], zeiten });
  }
  return gruppen;
}

/** „Montag – Dienstag" */
export const tageLang = (g: Sprechzeitgruppe) =>
  g.tage.length > 1 ? `${TAGNAME[g.tage[0]].lang} – ${TAGNAME[g.tage.at(-1)!].lang}` : TAGNAME[g.tage[0]].lang;

/** „Mo, Di" */
export const tageKurz = (g: Sprechzeitgruppe) => g.tage.join(", ");

/** „08:00 – 13:00 · 14:00 – 17:30" */
export const zeitenLang = (g: Sprechzeitgruppe) => g.zeiten.map(([v, b]) => `${v} – ${b}`).join(" · ");

/** „8:00–13:00 und 14:00–17:30" */
export const zeitenKurz = (g: Sprechzeitgruppe) =>
  g.zeiten.map(([v, b]) => `${v.replace(/^0/, "")}–${b.replace(/^0/, "")}`).join(" und ");

/** Für JSON-LD (schema.org OpeningHoursSpecification). */
export const schemaTage = (g: Sprechzeitgruppe) => g.tage.map((t) => TAGNAME[t].schema);
