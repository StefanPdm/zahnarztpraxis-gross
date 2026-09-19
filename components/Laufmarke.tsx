"use client";

import { useState } from "react";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

/*
  Seitliche Laufmarke — nur Startseite, nur ab 1001 px (site.css).
  Markup und Werte 1:1 aus layout/runhead.html.

  Abschnitte melden sich über data-abschnitt="…". Rein dekorativ: die
  Kapitelüberschriften stehen ohnehin im Text, darum aria-hidden.
*/
export default function Laufmarke() {
  const [label, setLabel] = useState("");
  const [anteil, setAnteil] = useState(0);

  useBeimScrollen(() => {
    const linie = window.scrollY + window.innerHeight * 0.4;
    let aktuell = "";
    for (const a of document.querySelectorAll<HTMLElement>("[data-abschnitt]")) {
      if (a.getBoundingClientRect().top + window.scrollY <= linie) aktuell = a.dataset.abschnitt ?? "";
    }
    setLabel(aktuell);
    const gesamt = document.documentElement.scrollHeight - window.innerHeight;
    setAnteil(gesamt > 0 ? Math.min(1, window.scrollY / gesamt) : 0);
  });

  return (
    <div
      id="runhead"
      aria-hidden="true"
      style={{
        position: "fixed",
        left: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "var(--ebene-figur)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        opacity: label ? "1" : "0",
        transition: "opacity .5s ease",
        pointerEvents: "none",
      }}
    >
      <span
        id="runheadLabel"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-ui)",
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--color-neutral-700)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          width: "1px",
          height: "120px",
          background: "var(--color-accent-300)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          id="runheadBar"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "1px",
            height: "120px",
            background: "var(--color-accent)",
            transformOrigin: "top",
            transform: `scaleY(${anteil})`,
          }}
        />
      </span>
    </div>
  );
}
