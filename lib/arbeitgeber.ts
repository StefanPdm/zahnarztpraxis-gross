import { praxis } from "@/lib/praxis";

/**
 * hiringOrganization für die JobPosting-Daten (/karriere/zahntechniker,
 * /ausbildung) — nur serverseitig, wie lib/praxis.ts.
 *
 * Google erwartet hier den Typ „Organization", nicht „Dentist", und
 * meldet sonst einen Fehler: Die Stelle erscheint dann nicht in der
 * Google-Jobsuche (Search Console, November 2026).
 *
 * Bewusst ohne „@id" der Praxis (…/#praxis): lib/strukturierteDaten.ts
 * erkennt den Knoten an dieser @id und mischt alle Praxisfakten hinein —
 * Sprechzeiten, Behandler, medicalSpecialty. Für eine Organization sind
 * das unzulässige Eigenschaften.
 */
export const arbeitgeber = {
  "@type": "Organization",
  name: praxis.vollerName,
  url: `${praxis.domain}/`,
  sameAs: `${praxis.domain}/`,
  logo: `${praxis.domain}/apple-touch-icon.png`,
  telephone: praxis.telefonIntl,
};

/** Betrag in Euro für den Fließtext: 1050 → „1.050 €". */
export function euro(betrag: number): string {
  return `${betrag.toLocaleString("de-DE")} €`;
}

/**
 * baseSalary für das JobPosting: ein fester Monatsbetrag oder eine Spanne
 * (Ausbildung: erstes bis letztes Ausbildungsjahr).
 */
export function monatsverguetung(von: number, bis?: number) {
  return {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: {
      "@type": "QuantitativeValue",
      ...(bis === undefined || bis === von ? { value: von } : { minValue: von, maxValue: bis }),
      unitText: "MONTH",
    },
  };
}
