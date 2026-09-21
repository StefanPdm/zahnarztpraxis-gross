import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { seitenMetadaten } from "@/lib/seiten";
import Bild from "@/components/Bild";
import Karte from "@/components/Karte";
import strukturierteDaten from "./jsonld.json";
import NotfallLeiste from "@/components/NotfallLeiste";
import Fragen from "@/components/Fragen";

export const metadata = seitenMetadaten("/anfahrt-parken");

const weg = [
        { no: "01", title: "Schopenhauerstraße 37", text: "Die gelbe Fassade mit den hohen Sprossenfenstern ist die Straßenseite. Hier stehen Sie richtig — aber noch nicht am Eingang." },
        { no: "02", title: "Links am Gebäude vorbei", text: "Gehen Sie links am Gebäude vorbei nach hinten. Hinter dem Haus öffnet sich ein gepflasterter Hof." },
        { no: "03", title: "Gläserne Tür in der Mitte", text: "Auf der Rückseite führt eine gläserne Doppeltür ins Haus. Von dort erreichen Sie unsere Anmeldung." }
      ];

const faq = [
        { q: "Wo genau ist der Eingang?", a: "Auf der Rückseite des Gebäudes, nicht an der Schopenhauerstraße. Gehen Sie links am Gebäude vorbei nach hinten in den Hof — dort ist eine gläserne Doppeltür." },
        { q: "Kann ich direkt an der Praxis parken?", a: "An der Hofseite gibt es Kurzzeit-Parkplätze. Sind sie belegt, finden Sie weitere Stellplätze in der Zeppelinstraße, wenige Gehminuten entfernt." },
        { q: "Wie komme ich mit öffentlichen Verkehrsmitteln?", a: "Mit den Tramlinien 91, 94 und 98 bis Luisenplatz-Süd oder den Buslinien 605, 606 und 695 bis Luisenplatz. Von dort sind es etwa vier Minuten zu Fuß." },
        { q: "Ist die Praxis barrierefrei?", a: "Nein. Die Praxis liegt im 1. Stock und ist nur über das Treppenhaus erreichbar, einen Aufzug gibt es nicht. Sagen Sie bei der Terminvereinbarung kurz Bescheid, wenn Sie Unterstützung beim Zugang brauchen — dann finden wir gemeinsam eine Lösung." },
        { q: "Mein Navi führt mich an die Straßenseite — was jetzt?", a: "Das ist normal, die Adresse liegt an der Straße. Stellen Sie das Auto ab und gehen Sie links am Gebäude vorbei nach hinten in den Hof; dort ist der Eingang." }
      ];

export default function AnfahrtParken() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 48px" }}>
        <div>
          <div className="ueberzeile">
            Anfahrt &amp; Parken
          </div>
          <h1 className="seitentitel">
            So finden
            <br />
            Sie uns.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Schopenhauerstraße 37, mitten in Potsdam. Ein Hinweis vorweg, der Ihnen den Umweg erspart:{" "}
            <strong style={{ fontWeight: "400", borderBottom: "1px solid var(--color-accent)" }}>
              Der Praxiseingang liegt nicht an der Straße, sondern auf der Rückseite des Gebäudes.
            </strong>{" "}
            Von der Schopenhauerstraße gehen Sie links am Gebäude vorbei nach hinten in den Hof — dort führt eine gläserne Eingangstür ins Haus.
          </p>
          <div className="knopfreihe">
            <a className="btn btn-primary knopf-gross" href="https://www.openstreetmap.org/?mlat=52.3976&mlon=13.0484#map=18/52.3976/13.0484" target="_blank" rel="noopener">
              Route öffnen
            </a>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div className="photopair" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <figure style={{ margin: "0", padding: "34px 34px 30px 64px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Straßenseite
            </span>
            <span style={{ flex: "1", height: "1px", background: "var(--color-divider)" }} />
          </div>
          <div style={{ position: "relative", borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)", overflow: "hidden" }}>
            <Bild vorrang className="wegbild" src="/images/schopenhauer-vorn.jpg" alt="Gebäudeansicht von der Schopenhauerstraße: gelbe Fassade mit hohen Sprossenfenstern und Straßenbäumen" style={{ display: "block", width: "100%", height: "300px", objectFit: "cover" }} />
            <svg viewBox="0 0 1909 824" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}>
              <defs>
                <marker id="wayarrow" viewBox="0 0 12 12" refX="7" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M1 1 L11 6 L1 11 Z" fill="#f7f5f0" />
                </marker>
              </defs>
              <path d="M1180 700 C820 690 560 660 400 590 C330 560 300 500 305 430" fill="none" stroke="rgba(23,21,15,0.35)" strokeWidth="16" strokeLinecap="round" />
              <path d="M1180 700 C820 690 560 660 400 590 C330 560 300 500 305 430" fill="none" stroke="#f7f5f0" strokeWidth="7" strokeLinecap="round" strokeDasharray="30 26" markerEnd="url(#wayarrow)" />
            </svg>
            <span style={{ position: "absolute", right: "16px", top: "14px", padding: "7px 13px", borderRadius: "var(--radius-md)", background: "rgba(23,21,15,0.78)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f7f5f0" }}>
              Links am Gebäude vorbei
            </span>
          </div>
          <figcaption style={{ fontSize: "14.5px", lineHeight: "1.6", color: "var(--color-neutral-800)", margin: "16px 0 0" }}>
            Das ist die Ansicht, die Sie von der Straße sehen — gelbe Fassade, hohe Sprossenfenster, Bäume davor. Hier ist{" "}
            <strong style={{ fontWeight: "400" }}>
              kein Praxiseingang.
            </strong>{" "}
            Gehen Sie{" "}
            <strong style={{ fontWeight: "400" }}>
              links
            </strong>{" "}
            am Gebäude vorbei nach hinten.
          </figcaption>
        </figure>
        <figure style={{ margin: "0", padding: "34px 64px 30px 34px", borderLeft: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
              Hier hinein · Rückseite
            </span>
            <span style={{ flex: "1", height: "1px", background: "var(--color-accent-300)" }} />
          </div>
          {/* Kein `vorrang`: Das Bild steht weit unter der Falz. Zwei
              vorgeladene Bilder konkurrieren sonst um dieselbe Leitung, und
              das obere — das tatsächlich sichtbare — kommt später. */}
          <Bild src="/images/Schopenhauer_Str_37_hinten_cropped.webp" alt="Rückseite des Gebäudes Schopenhauerstraße 37 mit der gläsernen Eingangstür zur Zahnarztpraxis und gepflastertem Hof" style={{ display: "block", width: "100%", height: "300px", objectFit: "cover", borderRadius: "var(--radius-md)", border: "1px solid var(--color-accent-300)" }} />
          <figcaption style={{ fontSize: "14.5px", lineHeight: "1.6", color: "var(--color-neutral-800)", margin: "16px 0 0" }}>
            Auf der Rückseite liegt der Eingang: die gläserne Doppeltür in der Mitte, erreichbar über den gepflasterten Hof. Von hier kommen Sie zu uns.
          </figcaption>
        </figure>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Der letzte Weg
        </div>
        <h2 className="titel-2 breite-26">
          Drei Schritte von der Straße zur Anmeldung.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {weg.map((w, wI) => (
          <Fragment key={wI}>
            <div style={{ padding: "32px 28px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {w.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {w.title}
              </h3>
              <p className="text-15">
                {w.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Mit Bus und Tram
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 22px" }}>
            Vier Minuten vom Luisenplatz.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "16px 24px", fontSize: "15px", color: "var(--color-neutral-800)", borderTop: "1px solid var(--color-divider)", paddingTop: "22px" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              Tram
            </span>
            <span>
              Linien 91, 94 und 98 bis{" "}
              <strong style={{ fontWeight: "400" }}>
                Luisenplatz-Süd
              </strong>
              , dann etwa vier Minuten zu Fuß.
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              Bus
            </span>
            <span>
              Linien 605, 606 und 695 bis{" "}
              <strong style={{ fontWeight: "400" }}>
                Luisenplatz
              </strong>
              .
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              Zu Fuß
            </span>
            <span>
              Vom Luisenplatz die Schopenhauerstraße hinein — die Praxis liegt auf der linken Seite, Eingang im Hof hinter dem Haus.
            </span>
          </div>
        </div>
        <div style={{ padding: "80px 64px", borderLeft: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
          <div className="ueberzeile">
            Mit dem Auto
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 22px" }}>
            Parken im Hof und in der Umgebung.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "16px 24px", fontSize: "15px", color: "var(--color-neutral-800)", borderTop: "1px solid var(--color-divider)", paddingTop: "22px" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              Direkt
            </span>
            <span>
              Kurzzeit-Parkplätze unmittelbar an der Praxis, auf der Hofseite des Gebäudes.
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              In der Nähe
            </span>
            <span>
              Weitere Stellplätze in der Zeppelinstraße, wenige Gehminuten entfernt.
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "3px" }}>
              Navigation
            </span>
            <span>
              Geben Sie{" "}
              <strong style={{ fontWeight: "400" }}>
                Schopenhauerstraße 37, 14467 Potsdam
              </strong>{" "}
              ein. Das Navi führt Sie an die Straßenseite — der Eingang liegt dahinter im Hof.
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Zugang
          </div>
          <h2 className="titel-3">
            Im 1. Stock, über die Treppe.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 20px" }}>
            Die Praxis liegt im 1. Stock und ist über das Treppenhaus erreichbar. Einen Aufzug gibt es nicht — die Räume sind damit nicht barrierefrei. Wenn Sie mit Rollstuhl, Rollator oder Kinderwagen kommen oder Treppen für Sie schwierig sind, sagen Sie es bitte vor dem Termin: Wir besprechen dann, wie wir Ihnen weiterhelfen können.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)", fontSize: "15px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)", paddingTop: "3px" }}>
                Adresse
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-lead)" }}>
                Schopenhauerstraße 37
                <br />
                14467 Potsdam
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)", paddingTop: "3px" }}>
                Telefon
              </span>
              <a href="tel:+49331960926" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-lead)", fontFeatureSettings: "'tnum'" }}>
                0331 960926
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)", paddingTop: "3px" }}>
                Eingang
              </span>
              <span>
                Rückseite des Gebäudes, über den Hof
              </span>
            </div>
          </div>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Termin anfragen
            </Link>
            <Link className="btn btn-secondary knopf-gross" href="/kontakt">
              Öffnungszeiten
            </Link>
          </div>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)", overflow: "hidden" }}>
            <Karte hoehe={480} />
          </div>
          <a href="https://www.openstreetmap.org/?mlat=52.3976&mlon=13.0484#map=18/52.3976/13.0484" target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Größere Karte öffnen
          </a>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Fragen zur Anfahrt.
        </h2>
      </div>
      <Fragen eintraege={faq} pfad="/anfahrt-parken" />
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Termin
        </div>
        <h2 className="abschluss__titel">
          Wir erwarten Sie im Hof.
        </h2>
        <p className="abschluss__text">
          Senden Sie zwei Wunschzeiten — wir bestätigen innerhalb von 24 Stunden. Wenn Sie den Eingang nicht finden, rufen Sie einfach an.
        </p>
        <div className="knopfreihe knopfreihe--mitte">
          <Link className="btn knopf-band knopf-band--voll" href="/#termin">
            Termin anfragen
          </Link>
          <a className="btn knopf-band knopf-band--rahmen" href="tel:+49331960926">
            0331 960926
          </a>
        </div>
      </div>
    </>
  );
}
