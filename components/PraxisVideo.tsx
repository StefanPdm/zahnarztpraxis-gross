"use client";

import { useEffect, useRef, useState } from "react";

/*
  Stummes Video in Schleife — der Rundflug durch die Praxis (Startseite,
  #videoband) und der Blick vom Behandlungsstuhl (Startseite Tafel VI,
  /angstpatienten). Dateien unter public/video/<name>-1280|960.webm|mp4.

  - Vier Fassungen: WebM/VP9 zuerst (kleiner), MP4/H.264 für Safari < 17.4;
    mobil die 960er-Fassung. Browser ohne media-Attribut nehmen die erste
    passende Quelle — das ist die kleine, also nie zu viel.
  - `hochformat`: Handys im Hochformat bekommen davor eine eigene Fassung
    (<name>-hoch, 486 × 540, Ausschnitt aus der Bildmitte). Das Band ist
    dort schmal und hoch; vom Querformat bliebe nur ein Streifen in der
    Mitte stehen, der Rest würde mitgeladen und abgeschnitten.
  - Lädt erst, wenn das Band ins Bild kommt und die Seite fertig geladen
    ist, und pausiert außerhalb. Vorher steht das Standbild da (auch ohne
    Skript). Mobil liegt der Rundflug im ersten Bildschirm — ohne das
    Warten konkurrierte er mit Schriften und Bildern des Seitenaufbaus.
  - Bei „Bewegung reduzieren" startet es nicht von selbst.
  - Anhalten-Knopf: Bewegung, die länger als 5 s läuft, muss sich stoppen
    lassen (WCAG 2.2.2).

  `klasse` geht an das <video>: Beim Rundflug ist das `parallax-img` —
  site.css und der Parallax hängen daran.
*/

/* Das Band ist mobil 62vh hoch, das Video darin 140 % davon. Bis zum
   Seitenverhältnis 3:4 deckt der Ausschnitt (9:10) es ab; darüber, etwa
   beim Tablet quer, gilt weiter die 960er-Fassung. */
const HOCHFORMAT = "(max-width: 1000px) and (max-aspect-ratio: 3/4)";

const quellen = (name: string, desktop: number, hochformat: boolean) => [
  ...(hochformat
    ? [
        { src: `/video/${name}-hoch.webm`, type: 'video/webm; codecs="vp9"', media: HOCHFORMAT },
        { src: `/video/${name}-hoch.mp4`, type: "video/mp4", media: HOCHFORMAT },
      ]
    : []),
  { src: `/video/${name}-960.webm`, type: 'video/webm; codecs="vp9"', media: "(max-width: 1000px)" },
  { src: `/video/${name}-960.mp4`, type: "video/mp4", media: "(max-width: 1000px)" },
  { src: `/video/${name}-${desktop}.webm`, type: 'video/webm; codecs="vp9"' },
  { src: `/video/${name}-${desktop}.mp4`, type: "video/mp4" },
];

type Eigenschaften = {
  /** Dateiname ohne Breite und Endung, z. B. "praxisflug" */
  name: string;
  standbild: string;
  /** Was zu sehen ist — für Screenreader */
  beschreibung: string;
  klasse?: string;
  /** Breite der Desktop-Fassung — 1920 für Videos über die ganze Inhaltsbreite */
  desktop?: 1280 | 1920;
  /** Es gibt eine Hochformat-Fassung <name>-hoch.webm|mp4 für Handys */
  hochformat?: boolean;
};

export default function PraxisVideo({
  name,
  standbild,
  beschreibung,
  klasse,
  desktop = 1280,
  hochformat = false,
}: Eigenschaften) {
  const video = useRef<HTMLVideoElement>(null);
  // null = automatisch (sichtbar → läuft), true/false = vom Besucher gewählt
  const [gewaehlt, setGewaehlt] = useState<boolean | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wunsch = gewaehlt ?? !ruhig;
    // Wer selbst auf Abspielen drückt, muss nicht auf den Seitenaufbau warten.
    let geladen = document.readyState === "complete" || gewaehlt === true;
    let sichtbar = false;
    const pruefen = () => {
      if (sichtbar && wunsch && geladen) v.play().catch(() => {});
      else v.pause();
    };
    const nachDemLaden = () => {
      geladen = true;
      pruefen();
    };
    if (!geladen) window.addEventListener("load", nachDemLaden, { once: true });

    const beobachter = new IntersectionObserver(
      ([e]) => {
        sichtbar = e.isIntersecting;
        pruefen();
      },
      { rootMargin: "200px 0px" },
    );
    beobachter.observe(v);
    return () => {
      beobachter.disconnect();
      window.removeEventListener("load", nachDemLaden);
    };
  }, [gewaehlt]);

  return (
    <>
      <video
        ref={video}
        className={klasse}
        poster={standbild}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={beschreibung}
        onPlay={() => setLaeuft(true)}
        onPause={() => setLaeuft(false)}
      >
        {quellen(name, desktop, hochformat).map((q) => (
          <source key={q.src} src={q.src} type={q.type} media={q.media} />
        ))}
      </video>
      <button
        type="button"
        className="videoschalter"
        onClick={() => setGewaehlt(!laeuft)}
        aria-label={laeuft ? "Video anhalten" : "Video abspielen"}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          {laeuft ? (
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
          ) : (
            <path d="M8 5.5v13l11-6.5z" />
          )}
        </svg>
      </button>
    </>
  );
}
