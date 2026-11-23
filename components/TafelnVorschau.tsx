"use client";

import { useRef } from "react";

/*
  Verstecktes Öffnen der Adventstafeln (components/AdventTafeln): Wer in der
  Überschrift viermal schnell auf „vier" klickt, kann alle Tafeln öffnen —
  gedacht, damit die Praxis den Kalender vorab ansehen und absegnen kann,
  ohne Testschalter und ohne eigene Vorschau-Adresse.

  Die Inhalte gesperrter Tafeln stehen dafür schon im HTML; hier wird nur
  das Ereignis `tafeln-aufsperren` ausgelöst. Nichts wird gespeichert — nach dem Neuladen ist
  alles wieder nach Datum.

  Absichtlich kein Knopf: Für Tastatur und Screenreader bleibt es ein Wort
  der Überschrift, das Ganze ist ein Werkzeug, kein Angebot an Besucher.
*/

const KLICKS = 4;
const HOECHSTENS_MS = 1500; // Abstand zwischen zwei Klicks

export default function TafelnVorschau({ wort }: { wort: string }) {
  const zaehler = useRef({ anzahl: 0, zuletzt: 0 });

  function geklickt() {
    const jetzt = Date.now();
    const z = zaehler.current;
    z.anzahl = jetzt - z.zuletzt < HOECHSTENS_MS ? z.anzahl + 1 : 1;
    z.zuletzt = jetzt;
    if (z.anzahl < KLICKS) return;
    z.anzahl = 0;

    // Gesperrte Türchen werden bereit (components/TafelTuer) — geöffnet
    // wird dann jedes einzeln, mit dem Rolltor.
    window.dispatchEvent(new Event("tafeln-aufsperren"));
  }

  return (
    <span className="tafeln__vier" onClick={geklickt}>
      {wort}
    </span>
  );
}
