"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

/*
  Ein Türchen der Adventstafeln (components/AdventTafeln) mit Rolltor.

  Drei Zustände:
    gesperrt — Rolltor unten, geschlossenes Schloss: Der Sonntag kommt noch.
    bereit   — Rolltor unten, offenes Schloss, sanftes Leuchten: Tippen öffnet.
    offen    — die Kachel nimmt die ganze Zeile ein, das Rolltor fährt nach
               oben und gibt den Inhalt frei.

  Öffnen in zwei Schritten: Zuerst wächst die Kachel samt Rolltor auf volle
  Breite (View Transition — die anderen Türchen gleiten mit), dann rollt das
  Tor hoch. Ohne View Transitions springt die Kachel und das Tor rollt
  trotzdem; mit „Bewegung reduzieren" ist sie sofort offen.

  Nichts wird gespeichert: Nach dem Neuladen sind alle wieder zu. Das
  Ereignis `tafeln-aufsperren` (components/TafelnVorschau) macht gesperrte
  Türchen bereit — für die Vorschau.
*/

type Zustand = "gesperrt" | "bereit" | "offen";
type Tor = "unten" | "rollt" | "oben";

const bewegungErlaubt = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function mitUebergang(aenderung: () => void): Promise<void> {
  const doc = document as Document & {
    startViewTransition?: (f: () => void) => { finished: Promise<void> };
  };
  if (!doc.startViewTransition || !bewegungErlaubt()) {
    aenderung();
    return Promise.resolve();
  }
  // Nur für diesen Wechsel: Die übrige Seite blendet nicht über (app/saison.css).
  const wurzel = document.documentElement;
  wurzel.classList.add("tafel-wechsel");
  const lauf = doc.startViewTransition(() => flushSync(aenderung));
  return lauf.finished.finally(() => wurzel.classList.remove("tafel-wechsel"));
}

export default function TafelTuer({
  nummer,
  gesperrt,
  deckel,
  hinweisGesperrt,
  children,
}: {
  nummer: number;
  gesperrt: boolean;
  /** Ziffer und Datum auf dem Rolltor */
  deckel: ReactNode;
  hinweisGesperrt: string;
  children: ReactNode;
}) {
  const [zustand, setZustand] = useState<Zustand>(gesperrt ? "gesperrt" : "bereit");
  const [tor, setTor] = useState<Tor>("unten");
  const kachel = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const aufsperren = () => setZustand((z) => (z === "gesperrt" ? "bereit" : z));
    window.addEventListener("tafeln-aufsperren", aufsperren);
    return () => window.removeEventListener("tafeln-aufsperren", aufsperren);
  }, []);

  async function oeffnen() {
    if (zustand !== "bereit") return;
    if (!bewegungErlaubt()) {
      setZustand("offen");
      setTor("oben");
      return;
    }
    await mitUebergang(() => setZustand("offen"));
    setTor("rollt");
  }

  async function schliessen() {
    await mitUebergang(() => {
      setZustand("bereit");
      setTor("unten");
    });
    kachel.current?.querySelector<HTMLElement>(".tafel__tor")?.focus();
  }

  const inhaltId = `tafel-inhalt-${nummer}`;

  return (
    <li ref={kachel} className={`tafel tafel--${zustand}`}>
      {zustand === "offen" && (
        <div id={inhaltId} className="tafel__offen">
          {children}
          <button type="button" className="tafel__zu-knopf" onClick={schliessen}>
            Tafel schließen
          </button>
        </div>
      )}
      {tor !== "oben" && (
        <button
          type="button"
          className={`tafel__tor tafel__tor--${tor}`}
          onClick={oeffnen}
          disabled={zustand === "gesperrt"}
          aria-expanded={zustand === "offen"}
          aria-controls={zustand === "offen" ? inhaltId : undefined}
          tabIndex={zustand === "offen" ? -1 : undefined}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) setTor("oben");
          }}
        >
          <span className="tafel__lamellen" aria-hidden="true" />
          {deckel}
          <span className="tafel__schloss" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <rect x="5" y="11" width="14" height="10" rx="1.5" />
              {/* Bügel: offen nach links gekippt, geschlossen eingerastet */}
              {zustand === "gesperrt" ? (
                <path d="M8 11 V8 a4 4 0 0 1 8 0 V11" />
              ) : (
                <path d="M8 11 V8 a4 4 0 0 1 7.6 -1.6" />
              )}
              <path d="M12 15 v2.5" />
            </svg>
          </span>
          <span className="tafel__aufforderung">
            {zustand === "gesperrt" ? hinweisGesperrt : "Türchen öffnen"}
          </span>
        </button>
      )}
    </li>
  );
}
