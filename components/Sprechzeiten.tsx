import { sprechzeitGruppen, tageLang, zeitenLang } from "@/lib/praxis";

/*
  Sprechzeiten — Startseite und /kontakt.
  Daten aus lib/praxis.ts; Optik und Werte wie im Design.

  Als Beschreibungsliste statt als Reihe von <div>: Tag und Zeit gehören
  zusammen, vorher standen sie als vier lose Textstücke nebeneinander. Der
  Screenreader kündigt jetzt „Liste mit … Einträgen" an und liest jeden Tag
  mit seiner Zeit. Die Gitterzeile bleibt ein <div> — das ist in einer <dl>
  ausdrücklich erlaubt und hält die Optik unverändert.
*/
export default function Sprechzeiten() {
  return (
    <dl style={{ display: "grid", margin: "22px 0 0", fontFeatureSettings: "'tnum'" }}>
      {sprechzeitGruppen().map((g) => (
        <div
          key={g.tage.join()}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "20px",
            alignItems: "baseline",
            padding: "13px 0",
            borderBottom: "1px solid var(--color-divider)",
          }}
        >
          <dt style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body)", margin: "0" }}>
            {tageLang(g)}
          </dt>
          <dd style={{ textAlign: "right", color: "var(--color-neutral-800)", margin: "0" }}>
            {zeitenLang(g)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
