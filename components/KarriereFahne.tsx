"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

/*
  Karriere-Fahne am rechten Fensterrand — statt eines fünften Menüpunkts.
  Aussehen in app/bausteine.css (.karrierefahne).

  Desktop: steht fest auf halber Höhe im Seitenrand, über keinem Text.
  Die Klasse --eingezogen wirkt dort nicht (bausteine.css).

  Mobil, im oberen Drittel (Auftraggeber, 15.10.2026):
    - beim Aufruf eingezogen, nur die goldene Kante — der erste Anblick
      bleibt ruhig;
    - sobald man zu scrollen beginnt, fährt sie heraus;
    - nach etwa einer Bildschirmhöhe zieht sie sich beim Weiterlesen
      wieder zurück und kommt beim Hochscrollen erneut.
  Über einem Formular bleibt sie eingezogen, damit sie kein Eingabefeld
  verdeckt.

  Die Zahl der offenen Stellen kommt als Zahl vom Server (app/layout.tsx,
  lib/karriere.ts); ist sie 0, gibt es keine Fahne.
*/

/** Seiten, auf denen die Fahne nichts zu suchen hat: die Ziele selbst und das Kontaktformular. */
const OHNE_FAHNE = ["/karriere", "/ausbildung", "/kontakt"];

/** Bis hierher (px) bleibt sie eingezogen — der ruhige erste Anblick. */
const OBEN = 40;
/** Bis zu diesem Anteil der Fensterhöhe steht sie nach dem ersten Scrollen ganz da. */
const ZEIGEN_BIS = 0.9;
/** Scrollweg in eine Richtung, ab dem sie reagiert — kleines Zittern zählt nicht. */
const SCHWELLE = 8;

export default function KarriereFahne({ anzahl }: { anzahl: number }) {
  const pfad = usePathname();
  const fahne = useRef<HTMLAnchorElement>(null);
  const letztesY = useRef(0);
  // Eingezogen ab dem ersten Bild, schon im Server-HTML — sonst blitzte sie
  // mobil kurz auf, bevor die erste Messung läuft.
  const [eingezogen, setEingezogen] = useState(true);

  const ausgeblendet = anzahl === 0 || OHNE_FAHNE.some((p) => pfad === p || pfad.startsWith(`${p}/`));

  useBeimScrollen(() => {
    if (ausgeblendet) return;
    const y = window.scrollY;
    const weg = y - letztesY.current;

    const r = fahne.current?.getBoundingClientRect();
    const ueberFormular =
      !!r &&
      [...document.querySelectorAll("main form")].some((f) => {
        const b = f.getBoundingClientRect();
        return b.top < r.bottom && b.bottom > r.top;
      });

    if (ueberFormular) setEingezogen(true);
    else if (y < OBEN) setEingezogen(true);
    else if (y < window.innerHeight * ZEIGEN_BIS) setEingezogen(false);
    else if (weg > SCHWELLE) setEingezogen(true);
    else if (weg < -SCHWELLE) setEingezogen(false);
    else return; // Weg zu kurz: Stand und Bezugspunkt bleiben

    letztesY.current = y;
  }, pfad);

  if (ausgeblendet) return null;

  const ansage = `Karriere: ${anzahl} ${anzahl === 1 ? "offene Stelle" : "offene Stellen"}`;

  return (
    <Link
      ref={fahne}
      href="/karriere"
      className={`karrierefahne${eingezogen ? " karrierefahne--eingezogen" : ""}`}
      aria-label={ansage}
    >
      <span className="karrierefahne__zahl" aria-hidden="true">
        {anzahl}
      </span>
      <span className="karrierefahne__wort" aria-hidden="true">
        Karriere
      </span>
    </Link>
  );
}
