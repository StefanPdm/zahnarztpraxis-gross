import { mitStammdaten } from "@/lib/strukturierteDaten";

/*
  Strukturierte Daten. Beschreibungen, Leistungen und FAQ stammen aus den
  jsonld.json der Seiten; Stammdaten (Telefon, Adresse, Sprechzeiten,
  Behandler) setzt lib/strukturierteDaten.ts aus lib/praxis.ts und
  lib/team.ts ein — sie können hier nicht veralten.

  „<" wird maskiert, damit kein Text im JSON ein </script> bilden kann.
*/
export default function JsonLd({ daten }: { daten: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mitStammdaten(daten)).replace(/</g, "\u003c") }}
    />
  );
}
