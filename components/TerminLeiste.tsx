"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { praxis } from "@/lib/navigation";

/*
  Fährt unten ein, sobald der Termin-Abschnitt außer Sicht ist.
  Markup und Werte 1:1 aus layout/stickycta.html; nur das `transform`
  wird vom Zustand gesteuert statt von site.css.
*/
export default function TerminLeiste() {
  const [sichtbar, setSichtbar] = useState(false);
  const leiste = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ziel =
      document.getElementById("termin") ?? document.getElementById("1b-termin");
    if (!ziel) return;

    const beobachter = new IntersectionObserver(
      ([eintrag]) => setSichtbar(!eintrag.isIntersecting && window.scrollY > 400),
      { rootMargin: "0px 0px -20% 0px" },
    );
    beobachter.observe(ziel);
    return () => beobachter.disconnect();
  }, []);

  // Höhe für den Zurück-nach-oben-Knopf bereitstellen.
  useEffect(() => {
    const hoehe = sichtbar ? (leiste.current?.offsetHeight ?? 0) : 0;
    document.documentElement.style.setProperty("--terminleiste-hoehe", `${hoehe}px`);
  }, [sichtbar]);

  return (
    <div
      id="stickycta"
      ref={leiste}
      style={{
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "60",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px 26px",
        flexWrap: "wrap",
        padding: "13px 24px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        borderTop: "1px solid var(--color-divider)",
        transform: sichtbar ? "translateY(0)" : "translateY(110%)",
        transition: "transform .5s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body-lg)" }}>
        Termin frei? Wir melden uns innerhalb von 24 Stunden.
      </span>
      <span style={{ display: "flex", gap: "10px" }}>
        <Link className="btn btn-primary" href="/termin" style={{ padding: "9px 22px", fontSize: "13px" }}>
          Termin anfragen
        </Link>
        <a className="btn btn-secondary" href={praxis.telefonHref} style={{ padding: "9px 22px", fontSize: "13px" }}>
          Anrufen
        </a>
      </span>
    </div>
  );
}
