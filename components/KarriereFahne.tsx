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
/** Von Hand herausgeholt: so viel Scrollweg, bevor sie sich wieder zurückzieht. */
const HERAUSGEHOLT_WEG = 160;
/** Unterhalb davon gilt die Mobilfassung mit eingezogener Kante (wie in bausteine.css). */
const MOBIL = "(max-width: 1000px)";

export default function KarriereFahne({ anzahl }: { anzahl: number }) {
  const pfad = usePathname();
  const fahne = useRef<HTMLAnchorElement>(null);
  const letztesY = useRef(0);
  /* Fensterhöhe, einmal gemessen und nur bei neuer Breite (Drehen) neu.
     innerHeight selbst ändert sich auf dem Handy mit der Adressleiste —
     die Grenze wanderte mit, und die Fahne fuhr nahe der Grenze rein und
     raus. */
  const fenster = useRef({ breite: 0, hoehe: 0 });
  /** Scrollstand, an dem sie per Tipp herausgeholt wurde — sonst null. */
  const herausgeholtBei = useRef<number | null>(null);
  // Eingezogen ab dem ersten Bild, schon im Server-HTML — sonst blitzte sie
  // mobil kurz auf, bevor die erste Messung läuft.
  const [eingezogen, setEingezogen] = useState(true);

  const ausgeblendet = anzahl === 0 || OHNE_FAHNE.some((p) => pfad === p || pfad.startsWith(`${p}/`));

  useBeimScrollen(() => {
    if (ausgeblendet) return;
    if (window.innerWidth !== fenster.current.breite) {
      fenster.current = { breite: window.innerWidth, hoehe: window.innerHeight };
    }
    const y = window.scrollY;
    // Von Hand herausgeholt: stehen lassen, bis spürbar weitergescrollt
    // wurde — sonst zöge sie sich beim nächsten Zittern gleich wieder ein.
    if (herausgeholtBei.current !== null) {
      if (Math.abs(y - herausgeholtBei.current) < HERAUSGEHOLT_WEG) return;
      herausgeholtBei.current = null;
    }
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
    else if (y < fenster.current.hoehe * ZEIGEN_BIS) setEingezogen(false);
    else if (weg > SCHWELLE) setEingezogen(true);
    else if (weg < -SCHWELLE) setEingezogen(false);
    else return; // Weg zu kurz: Stand und Bezugspunkt bleiben

    letztesY.current = y;
  }, pfad);

  if (ausgeblendet) return null;

  const ansage = `Karriere: ${anzahl} ${anzahl === 1 ? "offene Stelle" : "offene Stellen"}`;

  /*
    Mobil, eingezogen: Der erste Tipp auf die Kante holt die Fahne heraus,
    erst der zweite führt zur Karriereseite. Kein Wischen — der Rand gehört
    dem Betriebssystem (Android: Zurück, Safari: Vorwärts).
    Per Tastatur ausgelöst (detail 0) geht es direkt weiter: Der Fokus
    zeigt die Fahne ohnehin ganz (bausteine.css).
  */
  const beimTippen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!eingezogen || e.detail === 0 || !window.matchMedia(MOBIL).matches) return;
    e.preventDefault();
    herausgeholtBei.current = window.scrollY;
    letztesY.current = window.scrollY;
    setEingezogen(false);
  };

  return (
    <Link
      ref={fahne}
      href="/karriere"
      className={`karrierefahne${eingezogen ? " karrierefahne--eingezogen" : ""}`}
      aria-label={ansage}
      onClick={beimTippen}
    >
      {/* Griff: nur eingezogen sichtbar, zeigt, dass sich hier etwas herausziehen lässt. */}
      <span className="karrierefahne__griff" aria-hidden="true">
        <svg viewBox="0 0 8 14" width="6" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 1 1 7l5 6" />
        </svg>
      </span>
      <span className="karrierefahne__zahl" aria-hidden="true">
        {anzahl}
      </span>
      <span className="karrierefahne__wort" aria-hidden="true">
        Karriere
      </span>
    </Link>
  );
}
