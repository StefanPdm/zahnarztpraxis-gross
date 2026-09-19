"use client";

import { useState } from "react";

/*
  „Worum geht es?" — Auswahl auf der Startseite.

  Die Auswahl färbt den Knopf und hängt sie als Parameter an den Termin-Link,
  damit das Formular vorbelegt werden kann. Markup und Werte 1:1 aus dem
  Übergabepaket; aus `this.state.reason` ist useState geworden.
*/

const anliegen = [
  { label: "Kontrolle", value: "kontrolle" },
  { label: "Schmerzen", value: "schmerzen" },
  { label: "Beratung", value: "beratung" },
];

export default function AnliegenWahl() {
  const [gewaehlt, setGewaehlt] = useState<string | null>(null);

  const ziel = gewaehlt
    ? `/termin?anliegen=${encodeURIComponent(gewaehlt)}`
    : "/termin";

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
          {anliegen.map((a) => {
            const aktiv = gewaehlt === a.value;
            return (
              <button
                key={a.value}
                type="button"
                className="reasonchip"
                aria-pressed={aktiv}
                onClick={() => setGewaehlt(aktiv ? null : a.value)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--fs-body-lg)",
                  padding: "9px 22px",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  background: aktiv ? "var(--color-accent-100)" : "transparent",
                  color: aktiv ? "var(--color-accent-800)" : "var(--color-text)",
                  border: `1px solid ${aktiv ? "var(--color-accent)" : "var(--color-divider)"}`,
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "28px" }}>
        <a className="btn btn-primary" href={ziel} style={{ padding: "12px 26px", fontSize: "15px" }}>
          Termin vereinbaren
        </a>
        <a className="btn btn-secondary" href="tel:+49331960926" style={{ padding: "12px 26px", fontSize: "15px" }}>
          0331 960926
        </a>
      </div>
    </>
  );
}
