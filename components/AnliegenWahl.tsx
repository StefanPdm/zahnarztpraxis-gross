"use client";

import Link from "next/link";
import { praxis } from "@/lib/praxis";
import { anliegen, TERMIN_ANKER } from "@/lib/anliegen";

/*
  „Worum geht es?" — Einstieg auf der Startseite.

  Das Formular steht seit dem Zusammenlegen der Termin-Seite weiter unten auf
  derselben Seite. Ein Klick setzt das Anliegen deshalb direkt im Feld und
  gleitet dorthin — ohne Neuladen. Ohne JavaScript bleibt der Link als solcher
  bestehen: /?anliegen=…#termin lädt die Seite, das Formular liest den
  Parameter dann selbst (components/TerminFormular).
*/

export default function AnliegenWahl() {
  function waehle(event: React.MouseEvent<HTMLAnchorElement>, feldwert: string) {
    const feld = document.getElementById("t-anliegen") as HTMLSelectElement | null;
    const ziel = document.getElementById(TERMIN_ANKER);
    if (!feld || !ziel) return; // Formular nicht auf der Seite: normaler Link
    event.preventDefault();
    feld.value = feldwert;
    const sanft = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ziel.scrollIntoView({ behavior: sanft ? "smooth" : "auto", block: "start" });
  }

  return (
    <>
      <div id="worum" style={{ scrollMarginTop: "110px" }}>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "10.5px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-neutral-700)",
          }}
        >
          Worum geht es?
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
          {anliegen.map((a) => (
            <a
              key={a.schluessel}
              href={`/?anliegen=${a.schluessel}#${TERMIN_ANKER}`}
              onClick={(event) => waehle(event, a.feldwert)}
              className="reasonchip"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--fs-body-lg)",
                padding: "9px 22px",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text)",
                border: "1px solid var(--color-divider)",
              }}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "28px" }}>
        <Link className="btn btn-primary knopf-gross" href={`/#${TERMIN_ANKER}`}>
          Termin vereinbaren
        </Link>
        <a className="btn btn-secondary knopf-gross" href={praxis.telefonHref}>
          {praxis.telefon}
        </a>
      </div>
    </>
  );
}
