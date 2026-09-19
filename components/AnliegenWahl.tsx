import Link from "next/link";
import { praxis } from "@/lib/praxis";

/*
  „Worum geht es?" — Einstieg auf der Startseite.

  Jeder Knopf führt direkt zum Formular auf /termin; das Formular wählt das
  Anliegen anhand von ?anliegen=… selbst aus (components/TerminFormular,
  ANLIEGEN_AUS_LINK). Neue Knöpfe dort mit eintragen.
*/

const anliegen = [
  { label: "Kontrolle", value: "kontrolle" },
  { label: "Schmerzen", value: "schmerzen" },
  { label: "Beratung", value: "beratung" },
];

export default function AnliegenWahl() {
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
            <Link
              key={a.value}
              href={`/termin?anliegen=${a.value}#formular`}
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
            </Link>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: "14px", justifyContent: "center", marginTop: "28px" }}>
        <Link className="btn btn-primary knopf-gross" href="/termin">
          Termin vereinbaren
        </Link>
        <a className="btn btn-secondary knopf-gross" href={praxis.telefonHref}>
          {praxis.telefon}
        </a>
      </div>
    </>
  );
}
