"use client";

import { useState, type ReactNode } from "react";

/*
  Die Porträtkarte, die sich zum Werdegang dreht.

  Vorher war sie ein <div tabIndex={0}>, das sich allein über :hover und
  :focus-within drehte. Zwei Probleme: Auf Touch-Geräten gibt es keinen
  Hover — der Werdegang war dort nicht zu erreichen. Und der Tab-Stopp
  kündigte sich nicht an, weil dem Element Rolle und Name fehlten.

  Jetzt liegt eine durchsichtige Schaltfläche über der ganzen Karte: Klick,
  Tipp, Enter und Leertaste drehen sie, `aria-expanded` sagt den Zustand an.
  Bewusst nicht die Karte selbst als Schaltfläche: Deren Name müsste den
  ganzen sichtbaren Text enthalten, Werdegang samt Fakten (WCAG 2.5.3), und
  die Rolle „button" verbirgt den Inhalt vor Screenreadern. So bleibt der
  Werdegang lesbar, und die Schaltfläche hat einen kurzen Namen. Der Hover
  bleibt zusätzlich erhalten (site.css).
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
      style={{ position: "relative", height: hoehe, borderRadius: "var(--radius-md)" }}
    >
      {children}
      <button
        type="button"
        className="flipcard__knopf"
        aria-expanded={gedreht}
        aria-label={`Werdegang von ${name} ${gedreht ? "ausblenden" : "anzeigen"}`}
        onClick={() => setGedreht((g) => !g)}
      />
    </div>
  );
}
