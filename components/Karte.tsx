"use client";

import { useState } from "react";
import Link from "next/link";
import { praxis } from "@/lib/praxis";
import Bild from "@/components/Bild";

/*
  Karte mit Zwei-Klick-Lösung.

  Bis zum Klick steht ein Standbild aus dem eigenen Server da (Kartendaten
  © OpenStreetMap-Mitwirkende, ODbL) — kein Aufruf bei Dritten. Erst nach
  „Karte laden" wird der OpenStreetMap-Rahmen eingesetzt; dabei gehen
  IP-Adresse und Browserdaten an die OpenStreetMap Foundation.
*/

const EINBETTUNG =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.0414%2C52.3941%2C13.0554%2C52.4011&layer=mapnik&marker=52.3976%2C13.0484";

export default function Karte({ hoehe, grau = false }: { hoehe: number; grau?: boolean }) {
  const [geladen, setGeladen] = useState(false);
  const titel = `Karte ${praxis.strasse}, ${praxis.stadt}`;
  const flaeche = {
    width: "100%",
    height: `${hoehe}px`,
    border: "0",
    display: "block",
    ...(grau ? { filter: "grayscale(0.35) contrast(1.02)" } : {}),
  };

  if (geladen) {
    return <iframe className="karte" title={titel} src={EINBETTUNG} style={flaeche} />;
  }

  return (
    <div className="karte karte-vorschau" style={flaeche}>
      <Bild src="/images/karte-schopenhauerstrasse.webp" alt="" />
      <div className="karte-hinweis">
        <button type="button" className="btn btn-primary" onClick={() => setGeladen(true)}>
          Interaktive Karte laden
        </button>
        <p>
          Dabei werden Daten an OpenStreetMap übertragen.{" "}
          <Link href="/impressum-datenschutz#datenschutz">Datenschutz</Link>
        </p>
      </div>
      <span className="karte-quelle">© OpenStreetMap-Mitwirkende</span>
    </div>
  );
}
