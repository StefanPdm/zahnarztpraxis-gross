/*
  Sieben feine goldene Sterne in der Winterabend-Hero (lib/winterkapitel.ts).
  Jeder funkelt in seinem eigenen, langsamen Takt — kein Schneefall, kein
  Glitzer. Lage, Größe und Takt stehen in app/saison.css (nth-child), damit
  das Markup ohne Inline-Styles auskommt. Rein schmückend.
*/
export default function HeroSterne() {
  return (
    <div className="hero-sterne" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
