"use client";

import { useRef } from "react";
import { useBeimScrollen } from "@/lib/useBeimScrollen";
import HeroStern from "@/components/HeroStern";

/*
  Der Leitstern des Winterkapitels (lib/winterkapitel.ts), nur Startseite.

  Es ist der große Stern unter dem Slogan selbst, der sich auf den Weg macht:
  Am Anfang liegt dieser Stern genau über seinem Platz in der Hero (der
  Platzhalter dort wird unsichtbar, html.mit-leitstern). Beim Scrollen löst er
  sich, gleitet zum Rand und wird dabei kleiner — aus der Linienzeichnung wird
  ein funkelnder Goldstern mit Schweif. Am Rand wandert er mit dem
  Lesefortschritt nach unten und pendelt dabei hin und her; der Schweif neigt
  sich gegen die Flugrichtung (--neigung). Dazu schwebt er sacht auf der
  Stelle (CSS, .ist-unterwegs). Kommt das Terminformular ins Bild,
  verschwindet er und „landet" dort (#leitstern-ziel bekommt .ist-angekommen).

  Rand: Desktop rechts zwischen Inhalt und Karriere-Fahne, mobil links.

  Lage und Größe schreibt die Messung direkt ins Element (transform, --g,
  --flug) — ohne React-Zustand. Sonst rendert React den Stern beim Scrollen
  bis zu 60-mal pro Sekunde neu, was auf schwachen Handys ruckelt.

  Client-Komponente, weil er der Scroll-Position folgt. Rein schmückend,
  darum aria-hidden. Aussehen in app/saison.css. Bis zur ersten Messung ist
  er unsichtbar (.ist-wartend).
*/

const GROSS = 58; // Größe des Sterns in der Hero (components/HeroStern)

const zwischen = (a: number, b: number, t: number) => a + (b - a) * t;
const sanft = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const begrenzt = (t: number) => Math.min(1, Math.max(0, t));

export default function Leitstern() {
  const stern = useRef<HTMLDivElement>(null);

  useBeimScrollen(() => {
    const el = stern.current;
    const platz = document.querySelector("#hero .hero-stern");
    const ziel = document.getElementById("leitstern-ziel");
    if (!el || !platz || !ziel) return;
    document.documentElement.classList.add("mit-leitstern");

    const breite = window.innerWidth;
    const hoehe = window.innerHeight;
    const mobil = window.matchMedia("(max-width: 1000px)").matches;
    const klein = mobil ? 22 : 32;
    // Pendeln am Rand: weit ausholend, gern auch über den Inhalt (Wunsch des
    // Auftraggebers) — er ist rein schmückend und fängt keine Klicks ab.
    const ausschlag = mobil ? 16 : 34;
    const randX = mobil ? 6 + ausschlag + klein / 2 : breite - 30 - ausschlag - klein / 2;
    const [obenVh, spanneVh] = mobil ? [0.18, 0.44] : [0.16, 0.54];

    // 1. Flug aus der Hero an den Rand: in den ersten 60 % einer Bildschirmhöhe.
    const flugweg = hoehe * 0.6;
    const flug = sanft(begrenzt(window.scrollY / flugweg));

    // 2. Weg am Rand: vom Ende des Flugs bis das Formular ins Bild kommt.
    const z = ziel.getBoundingClientRect();
    const ankunft = z.top + window.scrollY - hoehe * 0.6;
    const weg = ankunft > flugweg ? begrenzt((window.scrollY - flugweg) / (ankunft - flugweg)) : 0;
    const angekommen = z.top < hoehe * 0.6;
    ziel.classList.toggle("ist-angekommen", angekommen);

    // Drei Bögen auf dem Weg nach unten; der Ausschlag wächst mit dem Flug.
    const winkel = weg * Math.PI * 2 * 3;
    const pendel = Math.sin(winkel) * ausschlag * flug;
    const neigung = -Math.cos(winkel) * 28 * flug;

    const p = platz.getBoundingClientRect();
    let x = zwischen(p.left + p.width / 2, randX, flug) + pendel;
    const y = zwischen(p.top + p.height / 2, hoehe * (obenVh + weg * spanneVh), flug);
    const groesse = zwischen(GROSS, klein, flug);

    // Desktop: Auf Höhe der Karriere-Fahne weicht er nach links aus — weich
    // über 60 px Annäherung, damit er nicht springt.
    const fahne = mobil ? null : document.querySelector(".karrierefahne")?.getBoundingClientRect();
    if (fahne) {
      const abstand = Math.max(0, fahne.top - (y + groesse / 2), y - groesse / 2 - fahne.bottom);
      const zuWeit = x - (fahne.left - 6 - groesse / 2);
      if (zuWeit > 0) x -= zuWeit * sanft(1 - begrenzt(abstand / 60));
    }

    el.style.setProperty("--g", `${groesse}px`);
    el.style.setProperty("--flug", String(flug));
    el.style.setProperty("--neigung", `${neigung.toFixed(1)}deg`);
    el.style.transform = `translate(${x - groesse / 2}px, ${y - groesse / 2}px)`;
    el.classList.toggle("ist-gelandet", angekommen);
    el.classList.toggle("ist-unterwegs", flug > 0.98);
    el.classList.remove("ist-wartend");
  });

  return (
    <div ref={stern} className="leitstern ist-wartend" aria-hidden="true">
      <span className="leitstern__schweif" />
      <span className="leitstern__schein" />
      <span className="leitstern__zeichnung">
        <HeroStern />
      </span>
      <span className="leitstern__stern" />
    </div>
  );
}
