"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/*
  Kleines Spiel: GROSSELINO springt über Süßigkeiten. Eingesetzt auf der
  Fehlerseite und auf /kinderzahnheilkunde.

  Das Spielfeld (eigener Canvas-Code, keine Bibliothek) wird geladen, sobald
  der Abschnitt in die Nähe des Bildschirms kommt — wer oben bleibt, lädt
  nichts. Vor dem Start zeigt es schon die Szene, damit klar ist, worauf man
  sich einlässt. Keine Anfrage an Dritte, nichts im Browser gespeichert (der
  Bestwert gilt, solange die Seite offen ist — siehe Datenschutz in CLAUDE.md).
*/
const Spielfeld = dynamic(() => import("./GrosselinoSpielfeld"), {
  ssr: false,
  loading: () => <div className="spiel__feld" aria-hidden="true" />,
});

const STANDARD_TITEL = (
  <>
    Hilf <span className="versal">Grosselino</span> über die Süßigkeiten.
  </>
);

/**
 * `linie`: Trennlinie oben — aus, wo der Abschnitt davor schon mit einer endet.
 */
export function GrosselinoSpiel({
  ueberzeile = "Kleine Pause",
  titel = STANDARD_TITEL,
  text,
  linie = true,
}: {
  ueberzeile?: string;
  titel?: ReactNode;
  text?: ReactNode;
  linie?: boolean;
}) {
  const huelle = useRef<HTMLDivElement>(null);
  const [nah, setNah] = useState(false);

  useEffect(() => {
    const el = huelle.current;
    if (!el) return;
    const beobachter = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNah(true);
        beobachter.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  return (
    <section className={linie ? "abschnitt spiel spiel--linie" : "abschnitt spiel"} aria-labelledby="spiel-titel">
      <div className="ueberzeile">{ueberzeile}</div>
      <h2 id="spiel-titel" className="titel-3 titel-3--eng">
        {titel}
      </h2>
      {text && <p className="fliesstext fliesstext--gross breite-62 spiel__text">{text}</p>}
      <div ref={huelle}>{nah ? <Spielfeld /> : <div className="spiel__feld" aria-hidden="true" />}</div>
    </section>
  );
}
