import JsonLd from "@/components/JsonLd";
import { praxis } from "@/lib/praxis";

/*
  Häufige Fragen — sichtbare Liste und strukturierte Daten aus einer Quelle.

  Google verlangt, dass jede Frage im FAQPage-JSON-LD auch sichtbar auf der
  Seite steht. Vorher stand der Text doppelt (Seite + jsonld.json) und
  konnte auseinanderlaufen; jetzt erzeugt diese Komponente beides.
*/

export type Frage = { q: string; a: string };

export default function Fragen({
  eintraege,
  pfad,
  ebene: Ueberschrift = "h3",
}: {
  eintraege: Frage[];
  /** Pfad der Seite, für die @id des FAQ-Knotens */
  pfad: string;
  /** Überschriftenebene der Fragen — passend zur Gliederung der Seite */
  ebene?: "h3" | "h4";
}) {
  return (
    <>
      <JsonLd
        daten={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${praxis.domain}${pfad}#faq`,
          inLanguage: "de-DE",
          mainEntity: eintraege.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="fragen">
        {eintraege.map((f) => (
          <div className="frage" key={f.q}>
            <Ueberschrift className="titel-5">{f.q}</Ueberschrift>
            <p className="frage__antwort">{f.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
