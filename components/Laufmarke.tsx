"use client";

import { useEffect, useRef, useState } from "react";

/*
  Zeigt am linken Rand den aktuellen Abschnitt.
  Markup und Werte 1:1 aus layout/runhead.html.

  Die Abschnitte werden über ihre Kapitel-Kolophone erkannt (.colophon).
  Falls die Startseite anders ausgezeichnet wird, hier den Selektor ändern.
*/
export default function Laufmarke() {
  const [label, setLabel] = useState("");
  const [anteil, setAnteil] = useState(0);
  const wurzel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const abschnitte = Array.from(
      document.querySelectorAll<HTMLElement>("[data-abschnitt], .colophon"),
    );

    let angefordert = false;
    const pruefe = () => {
      angefordert = false;
      const y = window.scrollY + window.innerHeight * 0.4;

      let aktuell: HTMLElement | null = null;
      for (const a of abschnitte) {
        if (a.offsetTop <= y) aktuell = a;
      }
      setLabel(
        aktuell
          ? (aktuell.dataset.abschnitt ?? aktuell.textContent?.trim().slice(0, 40) ?? "")
          : "",
      );

      const gesamt = document.body.scrollHeight - window.innerHeight;
      setAnteil(gesamt > 0 ? Math.min(1, window.scrollY / gesamt) : 0);
    };

    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(pruefe);
    };

    pruefe();
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  return (
    <div
      id="runhead"
      ref={wurzel}
      style={{
        position: "fixed",
        left: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "50",
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
            height: `${Math.round(anteil * 120)}px`,
            background: "var(--color-accent)",
          }}
        />
      </span>
    </div>
  );
}
