import { praxis, schemaTage, schliesstage, sprechzeitGruppen, sprechzeiten } from "@/lib/praxis";
import { team } from "@/lib/team";
import { istFeiertag, KURZTAGE } from "@/lib/oeffnungsstatus";
import { kalendertag } from "@/lib/winterkapitel";

/**
 * Feiertage und Schließtage der nächsten acht Wochen, an denen sonst
 * Sprechstunde wäre — als Sonderöffnungszeit „geschlossen" (opens = closes
 * = 00:00, so beschreibt schema.org einen geschlossenen Tag). Google zeigt
 * dann an Heiligabend nicht „geöffnet". Die Seiten werden stündlich neu
 * berechnet (app/layout.tsx), die Liste wandert also mit.
 */
function geschlosseneTage() {
  const [j, m, t] = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" })
    .format(new Date())
    .split("-")
    .map(Number);
  const tage = [];
  for (let i = 0; i < 56; i++) {
    const tag = kalendertag(j, m, t + i);
    if (!sprechzeiten[KURZTAGE[tag.wochentag] as keyof typeof sprechzeiten]) continue;
    if (!istFeiertag(tag.iso) && !schliesstage.includes(tag.iso)) continue;
    tage.push({
      "@type": "OpeningHoursSpecification",
      opens: "00:00",
      closes: "00:00",
      validFrom: tag.iso,
      validThrough: tag.iso,
    });
  }
  return tage;
}

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
    alternateName: [praxis.vollerName, praxis.googleName],
    sameAs: [...praxis.profile],
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
    isAcceptingNewPatients: praxis.nimmtNeuePatienten,
    specialOpeningHoursSpecification: geschlosseneTage(),
    // Pediatric: Kinderbehandlung als Fachgebiet (/kinderzahnheilkunde).
    medicalSpecialty: ["https://schema.org/Dentistry", "https://schema.org/Pediatric"],
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
