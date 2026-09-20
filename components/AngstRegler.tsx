"use client";

import { useState } from "react";
import Link from "next/link";
import { praxis } from "@/lib/praxis";

/*
  Angst-Regler.

  Steht auf der Startseite und auf /angstpatienten, mit Startwert 5 bzw. 8.
  Markup und Werte 1:1 aus dem Übergabepaket; aus `this.state.fear` ist
  useState geworden. Die Startseite hat im Design eine eigene Fassung
  (.fearcard: Abstand oben, Lesetext größer, ohne Knopfzeile — die Knöpfe
  stehen dort direkt darunter im Seitentext).
*/

type Stufe = { min: number; max: number; label: string; icon: string };

/* Drei Vorgehensweisen — sie geben der Antwort Überschrift und Zeichen. */
const stufen: Stufe[] = [
  { min: 1, max: 3, label: "Routine", icon: "M20 6L9 17l-5-5" },
  {
    min: 4,
    max: 7,
    label: "Mit Ansage",
    icon: "M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z",
  },
  {
    min: 8,
    max: 10,
    label: "Ohne Behandlung beginnen",
    icon: "M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z",
  },
];

/*
  Ein eigener Text je Reglerwert 1–10 (Index 0 = Wert 1). Sie sind bewusst
  ähnlich lang: die Antwortfläche hat eine feste Höhe, damit weder die Karte
  noch das Bild daneben bei jedem Schieben springt. Wer hier ändert, bleibt
  bei rund 150 Zeichen. Inhaltlich nur, was die Praxis belegt anbietet —
  Gespräch, Pausen, Handzeichen, Zeitpuffer, Musik oder Film über den
  Deckenmonitor.
*/
const texte: string[] = [
  "Für Sie ist das ein Termin wie jeder andere. Dann halten wir ihn kurz: Kontrolle, Reinigung, klare Ansage — und ein Recall, das zu Ihren Zähnen passt.",
  "Ein mulmiges Gefühl im Wartezimmer kennt fast jeder. Sagen Sie es ruhig beim Hinsetzen, dann erklären wir jeden Schritt, bevor wir ihn tun.",
  "Sie sind gelassen, mögen aber keine Überraschungen. Deshalb hören Sie vorher, was ansteht, wie lange es dauert und was es kostet.",
  "Der Termin steht im Kalender und macht sich bemerkbar. Wir nehmen das ernst: kurze Ansage vor jedem Schritt — und Sie bestimmen das Tempo.",
  "Unangenehm, aber machbar: so beschreiben es die meisten. Wir legen Pausen ein, sobald Sie es brauchen, und erklären, was als Nächstes kommt.",
  "Vor allem die Geräusche gehen Ihnen nahe. Auf Wunsch läuft Musik oder ein Film über den Monitor an der Decke, während wir arbeiten.",
  "Sie schieben Termine eher auf. Die Betäubung besprechen wir vorher, nicht erst am Stuhl, und wir blocken genug Zeit, damit nichts hetzt.",
  "Der Gedanke allein kostet Sie Schlaf. Der erste Termin kann ein reines Gespräch sein — wenn Sie möchten, ohne jeden Blick in den Mund.",
  "Sie waren lange nicht mehr da und rechnen mit Vorwürfen. Die gibt es hier nicht. Wir fangen dort an, wo Sie heute stehen, in Ihrem Tempo.",
  "Panik ist kein Makel, sondern ein Grund, anders vorzugehen: ein Handzeichen, das sofort stoppt, ein längerer Termin, kein Schritt ohne Ihr Ja.",
];

export default function AngstRegler({
  start = 8,
  variante = "seite",
}: {
  start?: number;
  variante?: "start" | "seite";
}) {
  const aufStart = variante === "start";
  const [fear, setFear] = useState(start);
  const stufe = stufen.find((t) => fear >= t.min && fear <= t.max) ?? stufen[1];
  const text = texte[fear - 1] ?? texte[4];

  return (
    <div
      className={aufStart ? "rv fearcard" : undefined}
      style={{
        ...(aufStart ? { marginTop: "44px" } : {}),
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
        className="angst-antwort"
        style={{
          marginTop: "30px",
          borderTop: "1px solid var(--color-accent-300)",
          paddingTop: "26px",
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
            fontSize: "clamp(20px,1.8vw,25px)",
            lineHeight: "1.18",
            letterSpacing: "-0.015em",
            margin: "14px 0 0",
          }}
        >
          {stufe.label}
        </p>
        <p
          style={{
            fontSize: "var(--fs-body)",
            lineHeight: "1.6",
            margin: "12px 0 0",
            color: "var(--color-neutral-800)",
            textWrap: "pretty",
          }}
        >
          {text}
        </p>
      </div>

      {!aufStart && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "28px",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-accent-300)",
          }}
        >
          <Link className="btn btn-primary" href="/#termin" style={{ padding: "12px 24px", fontSize: "14px" }}>
            Termin anfragen
          </Link>
          <a className="btn btn-secondary" href={praxis.telefonHref} style={{ padding: "12px 24px", fontSize: "14px" }}>
            {praxis.telefon}
          </a>
        </div>
      )}
    </div>
  );
}
