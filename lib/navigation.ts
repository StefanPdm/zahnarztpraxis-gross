/**
 * Navigation — einmalig hier, nicht in den Komponenten.
 * Reihenfolge und Beschriftungen sind aus layout/header.html übernommen.
 */

export type Eintrag = { label: string; href: string };

/** Links vom Logo. „Behandlungen" ist kein Link, sondern ein Aufklapp-Label. */
export const navLinks: Eintrag[] = [
  { label: "Praxis", href: "/praxis-team" },
  { label: "Angst", href: "/angstpatienten" },
  { label: "Kinder", href: "/kinderzahnheilkunde" },
];

/** Untermenü hinter „Behandlungen". */
export const behandlungen: Eintrag[] = [
  { label: "Alle Leistungen", href: "/leistungen" },
  { label: "Zahnschmerzen & Notfall", href: "/zahnschmerzen" },
  { label: "Prophylaxe & Zahnreinigung", href: "/prophylaxe" },
  { label: "Parodontitis-Behandlung", href: "/parodontologie" },
  { label: "Weisheitszähne & Chirurgie", href: "/weisheitszaehne-chirurgie" },
  { label: "Zahnimplantate", href: "/implantologie" },
  { label: "Ästhetische Zahnmedizin", href: "/aesthetische-zahnmedizin" },
  { label: "Eigenes Zahnlabor", href: "/zahnlabor" },
  { label: "Moderne Technik", href: "/moderne-technik" },
];

/** Rechts vom Logo, ohne „Home" (das kommt nur auf Unterseiten dazu). */
export const navRechts: Eintrag[] = [
  { label: "Kontakt", href: "/kontakt" },
  { label: "Anfahrt", href: "/anfahrt-parken" },
];

export const praxis = {
  name: "Groß & Groß",
  telefon: "0331 960926",
  telefonHref: "tel:+49331960926",
  strasse: "Schopenhauerstraße 37",
  ort: "14467 Potsdam",
  domain: "https://www.zahnmedizin-potsdam.de",
} as const;
