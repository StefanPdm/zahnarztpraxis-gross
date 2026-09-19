import Link from "next/link";

export default function NichtGefunden() {
  return (
    <div style={{ padding: "116px 64px", borderBottom: "1px solid var(--color-divider)" }}>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-accent-700)",
        }}
      >
        Fehler 404
      </div>
      <h1
        style={{
          fontWeight: "400",
          fontSize: "var(--fs-hero)",
          lineHeight: "1.0",
          letterSpacing: "-0.025em",
          margin: "22px 0 24px",
        }}
      >
        Diese Seite gibt es nicht.
      </h1>
      <p style={{ maxWidth: "56ch", color: "var(--color-neutral-800)" }}>
        Möglicherweise wurde die Adresse geändert. Über die Navigation oben
        finden Sie alle Seiten, oder rufen Sie uns einfach an.
      </p>
      <div style={{ display: "flex", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
        <Link className="btn btn-primary" href="/" style={{ padding: "12px 26px" }}>
          Zur Startseite
        </Link>
        <a className="btn btn-secondary" href="tel:+49331960926" style={{ padding: "12px 26px" }}>
          0331 960926
        </a>
      </div>
    </div>
  );
}
