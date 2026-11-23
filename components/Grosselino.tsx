"use client";

import { useEffect, useRef, useState } from "react";
import { useBeimScrollen } from "@/lib/useBeimScrollen";
import type { SpielMeldung } from "./GrosselinoSpielfeld";

/*
  GROSSELINO, der Begleiter auf /kinderzahnheilkunde. Verhalten nach
  site.v2.js, Abschnitt 4.

  Desktop (#grosselino): läuft am linken Rand mit dem Lesefortschritt mit
  (18 % → 66 % der Fensterhöhe), bewegt beim Scrollen die Beine und wechselt
  seinen Zuspruch. Per Tastatur erreichbar; der Spruch erscheint dann über
  :focus-within (site.css).

  Mobil (#grosselino-mobil): feste Karte im Text; die Sprechblase blendet
  ein, sobald die Karte zu gut einem Drittel im Bild ist (.inview).

  Die IDs der Figur bleiben wie im Design — site.css animiert darüber.
*/

const SPRUECHE: [bis: number, text: string][] = [
  [0.1, "Hallo, ich bin Grosselino!"],
  [0.28, "Beim ersten Mal wird nur geschaut."],
  [0.48, "Zähne zählen darfst du selbst."],
  [0.66, "Hand heben heißt: Pause."],
  [0.86, "Du machst das ganz super."],
  [1.01, "Bis gleich in der Praxis!"],
];

/*
  Der Name wird als Versalie gezeigt, steht im Text aber gemischt: So liest
  ein Screenreader „Grosselino“ als Wort, statt es zu buchstabieren, und das
  Auge sieht trotzdem GROSSELINO. Die Versalien macht text-transform.
*/
function mitName(text: string) {
  return text.split("Grosselino").flatMap((teil, i) =>
    i === 0
      ? [teil]
      : [
          <span
            key={i}
            style={{ textTransform: "uppercase" }}
          >
            Grosselino
          </span>,
          teil,
        ],
  );
}

export const HELL = "#fffdf8";
const TINTE = "var(--color-text)";

/** Die Bärenfigur. `praefix` hält die IDs der beiden Fassungen auseinander. */
function Baer({ praefix, groesse, beine }: { praefix: "gr" | "gr2"; groesse: number; beine: boolean }) {
  return (
    <svg
      id={`${praefix}-svg`}
      width={groesse}
      height={groesse}
      viewBox="0 0 100 100"
      fill="none"
      stroke="var(--color-accent-700)"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {beine ? (
        <>
          <g id={`${praefix}-leg-l`}>
            <ellipse cx="41" cy="88" rx="7.5" ry="5.5" fill={HELL} />
          </g>
          <g id={`${praefix}-leg-r`}>
            <ellipse cx="59" cy="88" rx="7.5" ry="5.5" fill={HELL} />
          </g>
        </>
      ) : (
        <>
          <ellipse cx="41" cy="88" rx="7.5" ry="5.5" fill={HELL} />
          <ellipse cx="59" cy="88" rx="7.5" ry="5.5" fill={HELL} />
        </>
      )}
      <ellipse cx="50" cy="71" rx="17" ry="16" fill={HELL} />
      <ellipse cx="50" cy="73.5" rx="9" ry="8" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
      <path id={beine ? `${praefix}-arm-l` : undefined} d="M35 64 L23 60" />
      <g id={`${praefix}-arm-r`}>
        <path d="M66 64 L79 57" />
      </g>
      <circle cx="31" cy="25" r="10" fill={HELL} />
      <circle cx="69" cy="25" r="10" fill={HELL} />
      <circle cx="31" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
      <circle cx="69" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
      <circle cx="50" cy="37" r="21" fill={HELL} />
      <ellipse cx="50" cy="45" rx="10" ry="7.5" fill={HELL} stroke="var(--color-accent-300)" strokeWidth="2" />
      <circle cx="41" cy="33" r="2.6" fill={TINTE} stroke="none" />
      <circle cx="59" cy="33" r="2.6" fill={TINTE} stroke="none" />
      <ellipse cx="50" cy="41.5" rx="3.2" ry="2.4" fill={TINTE} stroke="none" />
      <path d="M44 47.5 Q50 52.5 56 47.5" stroke={TINTE} strokeWidth="2.4" />
      {/* Mütze und Schal fürs Winterkapitel — sichtbar nur mit data-saison
          (app/saison.css). Kräftiges Gold, damit man sie auch bei 36 px erkennt. */}
      <g className="grosselino-winter" strokeWidth="2.4">
        <path d="M57 60 L59.5 74 L66 72.5 L62.5 59 Z" fill="var(--color-accent-500)" />
        <path d="M58.6 67.2 L64.6 65.8" stroke={HELL} strokeWidth="2" />
        <path
          d="M31 53 Q50 63 69 53 Q71.5 55.7 69 58.5 Q50 69 31 58.5 Q28.5 55.7 31 53 Z"
          fill="var(--color-accent-500)"
        />
        <path d="M33 22 Q36 5 55 4 Q66 5 71 13 L67.5 21 Q50 13.5 33 22 Z" fill="var(--color-accent-500)" />
        <path d="M30 22.5 Q50 12 70 22.5 Q71.5 26 69 27.5 Q50 18 31 27.5 Q28.5 26 30 22.5 Z" fill={HELL} />
        <circle cx="72" cy="12" r="5" fill={HELL} />
      </g>
    </svg>
  );
}

/*
  An der Spielecke (GrosselinoSpiel) lädt GROSSELINO zum Spielen ein und
  reagiert auf den Spielstand; während einer Runde schweigt er, damit die
  Sprechblase nicht über dem Spielfeld liegt.
*/
const SPIEL_SPRUECHE: Record<SpielMeldung, string | null> = {
  bereit: "Komm, spiel mit mir!",
  laeuft: null,
  vorbei: "Nochmal? Ich glaub an dich!",
  geschafft: "Juhu, alle Zähne gerettet!",
};

/** `sprueche`: andere Sprüche, etwa im Winterkapitel — kommt von der Seite (Server). */
export function Grosselino({ sprueche = SPRUECHE }: { sprueche?: [bis: number, text: string][] }) {
  const [oben, setOben] = useState(18);
  const [spruch, setSpruch] = useState(sprueche[0][1]);
  const [laeuft, setLaeuft] = useState(false);
  const [spricht, setSpricht] = useState(false);
  const stopp = useRef<ReturnType<typeof setTimeout>>(undefined);
  const schweigen = useRef<ReturnType<typeof setTimeout>>(undefined);
  const erstesMal = useRef(true);

  useBeimScrollen(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const fortschritt = Math.max(0, Math.min(1, window.scrollY / max));
    setOben(18 + fortschritt * 48);
    setSpruch((sprueche.find(([bis]) => fortschritt <= bis) ?? sprueche[sprueche.length - 1])[1]);

    // Der erste Aufruf ist die Anfangsmessung, kein Scrollen — dann nicht losgehen.
    if (erstesMal.current) {
      erstesMal.current = false;
      return;
    }
    setLaeuft(true);
    setSpricht(true);
    clearTimeout(stopp.current);
    clearTimeout(schweigen.current);
    stopp.current = setTimeout(() => {
      setLaeuft(false);
      schweigen.current = setTimeout(() => setSpricht(false), 1400);
    }, 220);
  });

  useEffect(
    () => () => {
      clearTimeout(stopp.current);
      clearTimeout(schweigen.current);
    },
    [],
  );

  const [spielImBlick, setSpielImBlick] = useState(false);
  const [spielStand, setSpielStand] = useState<SpielMeldung>("bereit");
  useEffect(() => {
    const melden = (e: Event) => setSpielStand((e as CustomEvent<SpielMeldung>).detail);
    window.addEventListener("grosselino-spiel", melden);
    const spiel = document.querySelector(".spiel");
    const beobachter = new IntersectionObserver(([e]) => setSpielImBlick(e.isIntersecting), { threshold: 0.35 });
    if (spiel) beobachter.observe(spiel);
    return () => {
      window.removeEventListener("grosselino-spiel", melden);
      beobachter.disconnect();
    };
  }, []);
  const spielSpruch = spielImBlick ? SPIEL_SPRUECHE[spielStand] : null;
  const sprichtJetzt = spielImBlick ? spielSpruch !== null : spricht;

  const klassen = [laeuft && "walking", sprichtJetzt && "talking"].filter(Boolean).join(" ") || undefined;

  return (
    <div
      id="grosselino"
      className={klassen}
      style={{
        position: "fixed",
        left: "5px",
        top: `${oben}%`,
        zIndex: "var(--ebene-figur)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        pointerEvents: "none",
        transition: "top .35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        tabIndex={0}
        role="img"
        aria-label="Grosselino, unser Begleiter für Kinder"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
          width: "68px",
          height: "68px",
          borderRadius: "999px",
          background: HELL,
          border: "1px solid var(--color-accent-300)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <Baer praefix="gr" groesse={50} beine />
      </div>
      <span
        id="gr-bubble"
        aria-hidden="true"
        style={{
          width: "max-content",
          maxWidth: "20ch",
          padding: "8px 13px",
          borderRadius: "14px 14px 14px 3px",
          background: HELL,
          border: "1px solid var(--color-accent-200)",
          boxShadow: "var(--shadow-md)",
          fontFamily: "var(--font-heading)",
          fontSize: "13.5px",
          lineHeight: "1.3",
          color: "var(--color-neutral-900)",
        }}
      >
        {mitName(spielSpruch ?? spruch)}
      </span>
    </div>
  );
}

/** `gruss`: anderer Text in der Karte, etwa im Winterkapitel — kommt von der Seite (Server). */
export function GrosselinoMobil({
  gruss = {
    zeile: "Hallo, ich bin Grosselino",
    text: "Beim ersten Mal wird nur geschaut. Und Hand heben heißt immer: Pause.",
  },
}: {
  gruss?: { zeile: string; text: string };
}) {
  const karte = useRef<HTMLDivElement>(null);
  const [imBild, setImBild] = useState(false);

  useEffect(() => {
    const el = karte.current;
    if (!el) return;
    const beobachter = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setImBild(true);
        beobachter.disconnect();
      },
      { threshold: 0.35 },
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  return (
    <div
      id="grosselino-mobil"
      ref={karte}
      className={imBild ? "rand rand-aussen inview" : "rand rand-aussen"}
      style={{
        alignItems: "center",
        gap: "16px",
        marginTop: "40px",
        marginBottom: "0",
        paddingTop: "20px",
        paddingBottom: "20px",
        "--rand-links": "22px",
        "--rand-rechts": "22px",
        border: "1px solid var(--color-accent-200)",
        borderRadius: "18px",
        background: "var(--kid-ground)",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
          width: "64px",
          height: "64px",
          borderRadius: "999px",
          background: HELL,
          border: "1px solid var(--color-accent-300)",
        }}
      >
        <Baer praefix="gr2" groesse={46} beine={false} />
      </span>
      <span id="gr2-bubble" style={{ display: "block" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-ui)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-accent-700)",
          }}
        >
          {gruss.zeile}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-lead)",
            lineHeight: "1.35",
            color: "var(--color-neutral-900)",
            marginTop: "6px",
          }}
        >
          {gruss.text}
        </span>
      </span>
    </div>
  );
}
