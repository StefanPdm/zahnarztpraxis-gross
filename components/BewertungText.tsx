"use client";

import { useState, useSyncExternalStore } from "react";

/*
  Der Text einer Google-Bewertung, bei Bedarf auf vier Zeilen gekürzt.

  Eigene Client-Komponente, damit die Sektion ringsum Server-Komponente
  bleibt: Nur das Aufklappen braucht JavaScript. Der Text selbst wird nie
  verändert — Google verlangt Bewertungen wortgleich, samt Tippfehlern. Die
  Kürzung macht allein CSS (`line-clamp`), das vollständige Wortlaut steht
  immer im Markup und ist für Suchmaschinen lesbar.

  Ohne JavaScript steht der Text ungekürzt da: Ein Knopf, der nichts tut,
  wäre eine Sackgasse. Deshalb greift die Kürzung erst, wenn React übernommen
  hat — bis dahin gibt es nichts zu kürzen und nichts zu klicken.
*/

const nichts = () => () => {};

export default function BewertungText({
  text,
  lang,
  verfasser,
}: {
  text: string;
  lang: boolean;
  verfasser: string;
}) {
  const bereit = useSyncExternalStore(nichts, () => true, () => false);
  const [offen, setOffen] = useState(false);
  const gekuerzt = bereit && lang && !offen;

  return (
    <>
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--fs-h5)",
          lineHeight: "1.45",
          margin: "16px 0 0",
          textWrap: "pretty",
          ...(gekuerzt
            ? {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical" as const,
                WebkitLineClamp: 4,
                overflow: "hidden",
              }
            : {}),
        }}
      >
        {`„${text}“`}
      </p>
      {bereit && lang ? (
        <button
          type="button"
          onClick={() => setOffen((o) => !o)}
          aria-expanded={offen}
          /* Vier gleich beschriftete Knöpfe nebeneinander sind in der
             Elementliste eines Screenreaders nicht auseinanderzuhalten —
             der Name nennt deshalb die Bewertung, um die es geht. */
          aria-label={`Bewertung von ${verfasser} ${offen ? "wieder kürzen" : "vollständig lesen"}`}
          style={{
            alignSelf: "flex-start",
            margin: "10px 0 0",
            padding: "0",
            border: "0",
            background: "none",
            cursor: "pointer",
            fontFamily: "var(--font-ui)",
            fontSize: "11.5px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-accent-700)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {offen ? "Weniger" : "Mehr lesen"}
        </button>
      ) : null}
    </>
  );
}
