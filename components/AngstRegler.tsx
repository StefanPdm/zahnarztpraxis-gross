"use client";

import { useState } from "react";
import Link from "next/link";

/*
  Angst-Regler.

  Steht auf der Startseite und auf /angstpatienten — dort mit einem anderen
  Startwert (5 bzw. 8). Markup und Werte 1:1 aus dem Übergabepaket; aus
  `this.state.fear` ist useState geworden.
*/

type Stufe = { min: number; max: number; label: string; icon: string; text: string };

const stufen: Stufe[] = [
  {
    min: 1,
    max: 3,
    label: "Routine",
    icon: "M20 6L9 17l-5-5",
    text: "Dann halten wir es kurz: Kontrolle, Reinigung, klare Ansage — und ein Recall-Intervall, das zu Ihren Zähnen passt statt zum Kalender.",
  },
  {
    min: 4,
    max: 7,
    label: "Mit Ansage",
    icon: "M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z",
    text: "Wir erklären jeden Schritt, bevor er kommt, und legen Pausen ein, wenn Sie es brauchen. Betäubung besprechen wir vorher, nicht erst am Stuhl.",
  },
  {
    min: 8,
    max: 10,
    label: "Ohne Behandlung beginnen",
    icon: "M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z",
    text: "Erster Termin: nur Gespräch, wenn Sie möchten ohne Blick in den Mund. Danach vereinbaren wir ein Handzeichen, blocken einen längeren Termin und stellen Musik oder einen Film über den Deckenmonitor ein.",
  },
];

export default function AngstRegler({ start = 8 }: { start?: number }) {
  const [fear, setFear] = useState(start);
  const stufe = stufen.find((t) => fear >= t.min && fear <= t.max) ?? stufen[1];

  return (
    <div
      style={{
        border: "1px solid var(--color-accent-300)",
        borderRadius: "var(--radius-md)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 9%, #ffffff) 0%, #ffffff 62%)",
        padding: "34px 36px 36px",
      }}
    >
      <label
        htmlFor="fearRange"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          fontFamily: "var(--font-ui)",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-neutral-800)",
        }}
      >
        Wie nervös sind Sie vor einem Zahnarzttermin?
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-display)",
            lineHeight: "0.9",
            color: "var(--color-accent-700)",
            letterSpacing: "-0.02em",
            textTransform: "none",
            fontFeatureSettings: "'tnum'",
          }}
        >
          {fear}
        </span>
      </label>

      <input
        id="fearRange"
        type="range"
        min="1"
        max="10"
        step="1"
        value={fear}
        onChange={(e) => setFear(Number(e.target.value))}
        aria-valuetext={`${fear} von 10 — ${stufe.label}`}
        style={{ margin: "26px 0 10px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-ui)",
          fontSize: "10.5px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-neutral-700)",
        }}
      >
        <span>entspannt</span>
        <span>panisch</span>
      </div>

      <div
        aria-live="polite"
        style={{
          marginTop: "30px",
          borderTop: "1px solid var(--color-accent-300)",
          paddingTop: "26px",
          minHeight: "190px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--color-accent-700)" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={stufe.icon} />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Unser Vorgehen
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(24px,2.4vw,32px)",
            lineHeight: "1.16",
            letterSpacing: "-0.015em",
            margin: "16px 0 0",
          }}
        >
          {stufe.label}
        </p>
        <p
          style={{
            fontSize: "var(--fs-body-lg)",
            lineHeight: "1.6",
            margin: "14px 0 0",
            color: "var(--color-neutral-800)",
            textWrap: "pretty",
          }}
        >
          {stufe.text}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "28px",
          paddingTop: "24px",
          borderTop: "1px solid var(--color-accent-300)",
        }}
      >
        <Link className="btn btn-primary" href="/termin" style={{ padding: "12px 24px", fontSize: "14px" }}>
          Termin anfragen
        </Link>
        <a className="btn btn-secondary" href="tel:+49331960926" style={{ padding: "12px 24px", fontSize: "14px" }}>
          0331 960926
        </a>
      </div>
    </div>
  );
}
