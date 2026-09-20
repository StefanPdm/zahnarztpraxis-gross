"use client";

import { useEffect, useRef, useState } from "react";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

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

const HELL = "#fffdf8";
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
    </svg>
  );
}

export function Grosselino() {
  const [oben, setOben] = useState(18);
  const [spruch, setSpruch] = useState(SPRUECHE[0][1]);
  const [laeuft, setLaeuft] = useState(false);
  const [spricht, setSpricht] = useState(false);
  const stopp = useRef<ReturnType<typeof setTimeout>>(undefined);
  const schweigen = useRef<ReturnType<typeof setTimeout>>(undefined);
  const erstesMal = useRef(true);

  useBeimScrollen(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const fortschritt = Math.max(0, Math.min(1, window.scrollY / max));
    setOben(18 + fortschritt * 48);
    setSpruch((SPRUECHE.find(([bis]) => fortschritt <= bis) ?? SPRUECHE[SPRUECHE.length - 1])[1]);

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

  const klassen = [laeuft && "walking", spricht && "talking"].filter(Boolean).join(" ") || undefined;

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
          width: "50px",
          height: "50px",
          borderRadius: "999px",
          background: HELL,
          border: "1px solid var(--color-accent-300)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <Baer praefix="gr" groesse={36} beine />
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
        {mitName(spruch)}
      </span>
    </div>
  );
}

export function GrosselinoMobil() {
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
      className={imBild ? "inview" : undefined}
      style={{
        alignItems: "center",
        gap: "16px",
        margin: "40px 64px 0",
        padding: "20px 22px",
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
          Hallo, ich bin Grosselino
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
          Beim ersten Mal wird nur geschaut. Und Hand heben heißt immer: Pause.
        </span>
      </span>
    </div>
  );
}
