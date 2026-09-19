"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

/*
  Zurück nach oben. Aussehen komplett aus site.css (#totop, .show) — hier
  nur Zustand und Klick. Erscheint ab 0,9 Bildschirmhöhen; weicht der
  Termin-Leiste über --terminleiste-abstand aus.
*/
export default function ZurueckNachOben() {
  const pfad = usePathname();
  const [sichtbar, setSichtbar] = useState(false);

  useBeimScrollen(() => setSichtbar(window.scrollY > window.innerHeight * 0.9), pfad);

  const nachOben = () => {
    const sanft = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: sanft ? "smooth" : "auto" });
    // Fokus an den Seitenanfang, damit Tastaturnutzer nicht am Knopf hängen bleiben.
    document.getElementById("inhalt")?.focus({ preventScroll: true });
  };

  return (
    <button
      id="totop"
      type="button"
      className={sichtbar ? "show" : undefined}
      onClick={nachOben}
      aria-label="Zurück nach oben"
      tabIndex={sichtbar ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
