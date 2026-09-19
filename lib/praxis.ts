/**
 * Stammdaten der Praxis — die einzige Stelle, an der sie stehen.
 * Kopf, Fuß, Termin-Leiste, JSON-LD, sitemap und llms.txt lesen von hier.
 *
 * Nur belegte Angaben (siehe CLAUDE.md, „Belegte Fakten").
 */
export const praxis = {
  name: "Groß & Groß",
  vollerName: "Zahnarztpraxis Groß & Groß",
  telefon: "0331 960926",
  telefonHref: "tel:+49331960926",
  strasse: "Schopenhauerstraße 37",
  plz: "14467",
  stadt: "Potsdam",
  ort: "14467 Potsdam",
  eingang: "Eingang auf der Rückseite des Gebäudes",
  gegruendet: 1991,
  behandlungszimmer: 5,
  domain: "https://www.zahnmedizin-potsdam.de",
} as const;
