"use client";

import { useState, type ReactNode } from "react";

/*
  Die Porträtkarte, die sich zum Werdegang dreht.

  Vorher war sie ein <div tabIndex={0}>, das sich allein über :hover und
  :focus-within drehte. Zwei Probleme: Auf Touch-Geräten gibt es keinen
  Hover — der Werdegang war dort nicht zu erreichen. Und der Tab-Stopp
  kündigte sich nicht an, weil dem Element Rolle und Name fehlten.

  Jetzt ist es eine Schaltfläche: Klick, Tipp, Enter und Leertaste drehen die
  Karte, `aria-expanded` sagt den Zustand an. Der Hover bleibt zusätzlich
  erhalten (site.css), damit sich am Verhalten mit der Maus nichts ändert.
*/
export default function Flipkarte({
  name,
  hoehe,
  children,
}: {
  /** Für den Namen der Schaltfläche: „Werdegang von … " */
  name: string;
  hoehe: string;
  children: ReactNode;
}) {
  const [gedreht, setGedreht] = useState(false);

  return (
    <div
      className={gedreht ? "flipcard gedreht" : "flipcard"}
      role="button"
      tabIndex={0}
      aria-expanded={gedreht}
      aria-label={`Werdegang von ${name} ${gedreht ? "ausblenden" : "anzeigen"}`}
      onClick={() => setGedreht((g) => !g)}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault(); // Leertaste scrollt sonst die Seite
        setGedreht((g) => !g);
      }}
      style={{
        position: "relative",
        height: hoehe,
        borderRadius: "var(--radius-md)",
        outlineOffset: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}
