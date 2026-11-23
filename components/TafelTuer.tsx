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

  Zu früh geklickt: Ein gesperrtes Tor ist kein `disabled`-Knopf, sondern
  `aria-disabled` — so kommt der Klick an. Das Tor ruckelt kurz, der
  Weihnachtsmann sagt in einer Sprechblase einen Spruch (lib/winterkapitel.ts,
  WEIHNACHTSMANN) und spricht ihn, wenn es eine Aufnahme gibt. Die Blase
  steht in einer Live-Region, Screenreader lesen sie vor. Nach dem Ton (oder
  nach der Lesezeit) verschwindet sie wieder. Es spricht immer nur ein
  Türchen zugleich.
*/

type Zustand = "gesperrt" | "bereit" | "offen";
type Tor = "unten" | "rollt" | "oben";
type Spruch = { text: string; ton?: string };

const bewegungErlaubt = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LESEZEIT_MS = 7000; // Blase ohne Ton
const NACHKLANG_MS = 1500; // Blase nach dem Ton
const LAUTSTAERKE = 0.8;

// Für alle Türchen gemeinsam: Die Sprüche kommen der Reihe nach, damit sich
// beim mehrmaligen Klicken keiner wiederholt; der Start ist zufällig.
let naechsterSpruch = -1;
let laufenderTon: HTMLAudioElement | null = null;

/** Der Weihnachtsmann als Goldstrich — Mütze mit Bommel, Bart, Schnurrbart. */
function Weihnachtsmann() {
  return (
    <svg className="tafel__figur" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19 C13 11 20 6 28 7 C33 8 37 11 39 16" />
      <circle cx="40" cy="18.5" r="2.6" />
      <rect x="10" y="19" width="26" height="5" rx="2.5" />
      <circle cx="19" cy="29" r="0.9" fill="currentColor" />
      <circle cx="27" cy="29" r="0.9" fill="currentColor" />
      <path d="M11 25 C10 34 15 42 23 44 C31 42 36 34 35 25" />
      <path d="M17.5 35 C19.5 32.5 22 33 23 34.5 C24 33 26.5 32.5 28.5 35" />
    </svg>
  );
}

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
  weihnachtsmann,
  children,
}: {
  nummer: number;
  gesperrt: boolean;
  /** Ziffer und Datum auf dem Rolltor */
  deckel: ReactNode;
  hinweisGesperrt: string;
  /** Nur für gesperrte Türchen: Sprüche und Countdown fürs Zu-früh-Klicken */
  weihnachtsmann?: { sprueche: Spruch[]; nochSchlafen: string };
  children: ReactNode;
}) {
  const [zustand, setZustand] = useState<Zustand>(gesperrt ? "gesperrt" : "bereit");
  const [tor, setTor] = useState<Tor>("unten");
  const [blase, setBlase] = useState<{ text: string; nr: number } | null>(null);
  const kachel = useRef<HTMLLIElement>(null);
  const meinTon = useRef<HTMLAudioElement | null>(null);
  const ausblenden = useRef<number | undefined>(undefined);

  useEffect(() => {
    const aufsperren = () => {
      setZustand((z) => (z === "gesperrt" ? "bereit" : z));
      // Vorschau: Wer gerade spricht, verstummt, die Blase verschwindet.
      window.clearTimeout(ausblenden.current);
      meinTon.current?.pause();
      meinTon.current = null;
      setBlase(null);
    };
    window.addEventListener("tafeln-aufsperren", aufsperren);
    return () => {
      window.removeEventListener("tafeln-aufsperren", aufsperren);
      window.clearTimeout(ausblenden.current);
      meinTon.current?.pause();
    };
  }, []);

  function spaeterAusblenden(ms: number) {
    window.clearTimeout(ausblenden.current);
    ausblenden.current = window.setTimeout(() => setBlase(null), ms);
  }

  function zuFrueh() {
    if (!weihnachtsmann) return;
    const { sprueche } = weihnachtsmann;
    if (naechsterSpruch < 0) naechsterSpruch = Math.floor(Math.random() * sprueche.length);
    const nr = naechsterSpruch % sprueche.length;
    naechsterSpruch = nr + 1;
    const spruch = sprueche[nr];
    setBlase({ text: spruch.text, nr });

    // Das Tor ruckelt, als hätte jemand daran gezogen.
    const knopf = kachel.current?.querySelector<HTMLElement>(".tafel__tor");
    if (knopf && bewegungErlaubt()) {
      knopf.animate(
        [0, -6, 5, -3, 2, 0].map((x) => ({ transform: `translateX(${x}px)` })),
        { duration: 420, easing: "ease-in-out" },
      );
    }

    // Wer gerade spricht — dieses oder ein anderes Türchen —, verstummt.
    meinTon.current = null;
    laufenderTon?.pause();
    if (!spruch.ton) {
      spaeterAusblenden(LESEZEIT_MS);
      return;
    }
    const ton = new Audio(spruch.ton);
    ton.volume = LAUTSTAERKE;
    meinTon.current = ton;
    laufenderTon = ton;
    // „pause" kommt auch am Ende des Tons und wenn ein anderes Türchen
    // übernimmt. Gilt nur, solange dieser Ton der aktuelle des Türchens ist.
    ton.addEventListener("pause", () => {
      if (meinTon.current === ton) spaeterAusblenden(NACHKLANG_MS);
    });
    spaeterAusblenden(LESEZEIT_MS + 8000); // falls der Ton hängt
    ton.play().catch(() => {
      if (meinTon.current === ton) spaeterAusblenden(LESEZEIT_MS);
    });
  }

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
          onClick={zustand === "gesperrt" ? zuFrueh : oeffnen}
          aria-disabled={zustand === "gesperrt" || undefined}
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
      {weihnachtsmann && (
        <div className="tafel__zufrueh" aria-live="polite">
          {blase && (
            <div key={blase.nr} className="tafel__blase">
              <Weihnachtsmann />
              <p>
                {blase.text}{" "}
                <span className="tafel__countdown">{weihnachtsmann.nochSchlafen}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
