"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kontakt } from "@/lib/kontakt";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

/*
  Mitlaufende Termin-Leiste. Markup und Werte 1:1 aus layout/stickycta.html,
  Verhalten nach site.v2.js: erscheint ab 620 px Scrollweg und verschwindet,
  sobald die Fußzeile ins Bild kommt. Ihr Knopf führt auf /#termin, also zum
  Formular auf der Startseite (die frühere Seite /termin ist dort aufgegangen).

  Ihre Höhe plus 14 px steht als --terminleiste-abstand auf <html>; der
  Zurück-nach-oben-Knopf weicht ihr darüber aus.
*/
const AB_SCROLLWEG = 620;

export default function TerminLeiste() {
  const pfad = usePathname();
  const [sichtbar, setSichtbar] = useState(false);
  const leiste = useRef<HTMLDivElement>(null);

  useBeimScrollen(() => {
    const fuss = document.querySelector("footer");
    const zeigen =
      window.scrollY > AB_SCROLLWEG &&
      !(fuss && fuss.getBoundingClientRect().top < window.innerHeight);
    setSichtbar(zeigen);
    const abstand = zeigen ? (leiste.current?.offsetHeight ?? 0) + 14 : 0;
    document.documentElement.style.setProperty("--terminleiste-abstand", `${abstand}px`);
  }, pfad);

  return (
    <div
      id="stickycta"
      ref={leiste}
      // Ausgefahren nicht per Tab erreichbar und für Screenreader stumm.
      inert={!sichtbar}
      style={{
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "var(--ebene-leiste)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px 26px",
        flexWrap: "wrap",
        padding: "13px 24px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        borderTop: "1px solid var(--color-divider)",
        transform: sichtbar ? "translateY(0)" : "translateY(110%)",
        transition: "transform .5s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body-lg)" }}>
        Termin frei? Wir melden uns innerhalb von 24 Stunden.
      </span>
      <span style={{ display: "flex", gap: "10px" }}>
        <Link className="btn btn-primary" href="/#termin" style={{ padding: "9px 22px", fontSize: "13px" }}>
          Termin anfragen
        </Link>
        <a className="btn btn-secondary" href={kontakt.telefonHref} style={{ padding: "9px 22px", fontSize: "13px" }}>
          Anrufen
        </a>
      </span>
    </div>
  );
}
