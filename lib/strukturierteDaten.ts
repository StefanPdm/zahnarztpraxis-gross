import { praxis, schemaTage, sprechzeitGruppen } from "@/lib/praxis";
import { team } from "@/lib/team";

/**
 * Hält die strukturierten Daten (JSON-LD) mit den Stammdaten im Einklang.
 *
 * Die jsonld.json der Seiten liefern Beschreibungen, Leistungen und FAQ.
 * Die Fakten — Name, Telefon, Adresse, Sprechzeiten, Behandler — kommen
 * immer aus lib/praxis.ts und lib/team.ts und überschreiben, was in den
 * Dateien steht. So kann keine Seite Google eine veraltete Nummer melden.
 */

const basis = praxis.domain;
const personId = (name: string) => `${basis}/#${name.toLowerCase().replace(/ß/g, "ss").replace(/\s+/g, "-")}`;

function praxisFakten() {
  return {
    name: `${praxis.name} Zahnmedizin Potsdam`,
    alternateName: praxis.vollerName,
    url: `${basis}/`,
    telephone: praxis.telefonIntl,
    email: praxis.email,
    foundingDate: String(praxis.gegruendet),
    address: {
      "@type": "PostalAddress",
      streetAddress: praxis.strasse,
      postalCode: praxis.plz,
      addressLocality: praxis.stadt,
      addressRegion: praxis.region,
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: praxis.geo.breite, longitude: praxis.geo.laenge },
    openingHoursSpecification: sprechzeitGruppen().flatMap((g) =>
      g.zeiten.map(([opens, closes]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaTage(g),
        opens,
        closes,
      })),
    ),
    employee: team.map((m) => ({ "@id": personId(m.name) })),
  };
}

function personFakten(id: string) {
  const m = team.find((x) => personId(x.name) === id);
  if (!m) return null;
  return {
    "@type": "Person",
    name: m.name,
    jobTitle: m.rolle,
    image: `${basis}${m.foto}`,
    url: `${basis}/praxis-team`,
    worksFor: { "@id": `${basis}/#praxis` },
    alumniOf: { "@type": "CollegeOrUniversity", name: m.hochschule },
  };
}

type Knoten = Record<string, unknown>;

function abgleichen(wert: unknown): unknown {
  if (Array.isArray(wert)) return wert.map(abgleichen);
  if (!wert || typeof wert !== "object") return wert;
  const k = Object.fromEntries(Object.entries(wert as Knoten).map(([s, v]) => [s, abgleichen(v)])) as Knoten;
  const id = typeof k["@id"] === "string" ? k["@id"] : "";
  // Nur vollständige Knoten ergänzen, keine reinen Verweise { "@id": … }.
  if (Object.keys(k).length > 1) {
    if (id === `${basis}/#praxis`) return { ...k, ...praxisFakten() };
    const person = personFakten(id);
    if (person) {
      // medicalSpecialty gilt nur für Organisationen, nicht für Personen.
      const rest = { ...k };
      delete rest.medicalSpecialty;
      return { ...rest, ...person };
    }
  }
  return k;
}

export function mitStammdaten(daten: unknown): unknown {
  return abgleichen(daten);
}
