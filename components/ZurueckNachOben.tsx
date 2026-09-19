"use client";

import { useEffect, useState } from "react";

/*
  Erscheint ab 0,9 Bildschirmhöhen und weicht der Termin-Leiste aus
  (deren Höhe steht als --terminleiste-hoehe auf <html>).
  Im alten site.v2.js per Skript erzeugt — hier eine echte Komponente.
*/
export default function ZurueckNachOben() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    let angefordert = false;
    const pruefe = () => {
      angefordert = false;
      setSichtbar(window.scrollY > window.innerHeight * 0.9);
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

  const nachOben = () => {
    const sanft = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: sanft ? "smooth" : "auto" });
  };

  return (
    <button
      id="totop"
      type="button"
      onClick={nachOben}
      aria-label="Zurück nach oben"
      style={{
        position: "fixed",
        right: "22px",
        bottom: "calc(22px + var(--terminleiste-hoehe, 0px) + 14px)",
        zIndex: "55",
        width: "42px",
        height: "42px",
        display: "grid",
        placeItems: "center",
        border: "1px solid var(--color-divider)",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        cursor: "pointer",
        color: "var(--color-accent-700)",
        opacity: sichtbar ? "1" : "0",
        visibility: sichtbar ? "visible" : "hidden",
        transition: "opacity .3s ease, visibility .3s ease, bottom .4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
