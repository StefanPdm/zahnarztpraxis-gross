import { Fragment } from "react";
import { sprechzeitGruppen, tageLang, zeitenLang } from "@/lib/praxis";

/*
  Sprechzeiten als Tabelle — Startseite und /kontakt.
  Daten aus lib/praxis.ts; Markup und Werte wie im Design.
*/
export default function Sprechzeiten() {
  return (
    <div style={{ display: "grid", marginTop: "22px", fontFeatureSettings: "'tnum'" }}>
      {sprechzeitGruppen().map((g) => (
        <Fragment key={g.tage.join()}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "20px",
              alignItems: "baseline",
              padding: "13px 0",
              borderBottom: "1px solid var(--color-divider)",
            }}
          >
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body)" }}>{tageLang(g)}</span>
            <span style={{ textAlign: "right", color: "var(--color-neutral-800)" }}>{zeitenLang(g)}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
