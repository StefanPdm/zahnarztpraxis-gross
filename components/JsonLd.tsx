/*
  Strukturierte Daten. Die Inhalte stammen unverändert aus den jsonld.json
  der Übergabe und sind inhaltlich geprüft — nicht kürzen.
*/
export default function JsonLd({ daten }: { daten: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
    />
  );
}
