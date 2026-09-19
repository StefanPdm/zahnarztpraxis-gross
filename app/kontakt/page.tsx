import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import Karte from "@/components/Karte";
import strukturierteDaten from "./jsonld.json";

export const metadata: Metadata = {
  title: "Kontakt — Zahnarztpraxis Groß & Groß, Schopenhauerstraße 37 Potsdam",
  description: "Kontakt zur Zahnarztpraxis Groß & Groß in Potsdam: Telefon 0331 960926, Öffnungszeiten, Adresse Schopenhauerstraße 37. Der Eingang liegt auf der Rückseite des Gebäudes. Antwort auf Anfragen innerhalb von 24 Stunden.",
  alternates: { canonical: "/kontakt" },
};

const hours = [
        { day: "Montag – Dienstag", time: "08:00 – 13:00 · 14:00 – 17:30" },
        { day: "Mittwoch", time: "08:00 – 13:00" },
        { day: "Donnerstag", time: "08:00 – 12:00" },
        { day: "Freitag", time: "08:00 – 12:00" }
      ];

export default function Kontakt() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px 16px", padding: "14px", borderBottom: "1px solid var(--color-divider)", fontSize: "14px", color: "var(--color-neutral-800)" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "11.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Akute Zahnschmerzen?
        </span>
        <span style={{ width: "1px", height: "18px", background: "var(--color-divider)" }} />
        <span>
          Rufen Sie uns morgens ab 8:00 an — Montag bis Freitag halten wir{" "}
          <Link href="/zahnschmerzen">
            Notfalltermine
          </Link>{" "}
          frei.
        </span>
        <a href="tel:+49331960926" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body)", fontFeatureSettings: "'tnum'" }}>
          0331 960926
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 60px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Kontakt
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Schopenhauer-
            <br />
            straße 37,
            <br />
            Potsdam West.
          </h1>
        </div>
        <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "0" }}>
          Rufen Sie an, schreiben Sie eine E-Mail oder senden Sie eine Terminanfrage — wir antworten innerhalb von 24 Stunden. Für akute Beschwerden halten wir jeden Morgen Termine frei; melden Sie sich in diesem Fall bitte telefonisch.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "44px 64px 44px 64px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Telefon
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "30px", margin: "14px 0 0" }}>
            <a href="tel:+49331960926" style={{ fontFeatureSettings: "'tnum'" }}>
              0331 960926
            </a>
          </p>
          <p style={{ fontSize: "13px", color: "var(--color-neutral-700)", margin: "8px 0 0", fontFeatureSettings: "'tnum'" }}>
            Telefax 0331 5811 3230
          </p>
        </div>
        <div style={{ padding: "44px 64px", borderLeft: "1px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            E-Mail
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h5)", margin: "14px 0 0" }}>
            <a href="mailto:zahnarztgross.gross@outlook.de">
              zahnarztgross.gross@outlook.de
            </a>
          </p>
        </div>
        <div style={{ padding: "44px 64px", borderLeft: "1px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Adresse
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h5)", lineHeight: "1.35", margin: "14px 0 0" }}>
            Schopenhauerstraße 37
            <br />
            14467 Potsdam
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "70px 64px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Öffnungszeiten
          </div>
          <div style={{ display: "grid", marginTop: "22px", fontFeatureSettings: "'tnum'" }}>
            {hours.map((h, hI) => (
              <Fragment key={hI}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "20px", alignItems: "baseline", padding: "13px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body)" }}>
                    {h.day}
                  </span>
                  <span style={{ textAlign: "right", color: "var(--color-neutral-800)" }}>
                    {h.time}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "var(--color-neutral-700)", marginTop: "16px" }}>
            Und nach Vereinbarung. Sprechstunde nur mit Termin — so entstehen keine Wartezeiten im Wartezimmer.
          </p>
        </div>
        <div style={{ padding: "70px 64px", borderLeft: "1px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Anfahrt &amp; Parken
          </div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.6", margin: "18px 0 0", padding: "14px 16px", borderLeft: "2px solid var(--color-accent)", background: "var(--color-accent-100)", color: "var(--color-neutral-900)" }}>
            Der Praxiseingang liegt auf der{" "}
            <strong style={{ fontWeight: "400" }}>
              Rückseite des Gebäudes
            </strong>{" "}
            — gehen Sie links am Gebäude vorbei nach hinten in den Hof, dort ist eine gläserne Doppeltür.{" "}
            <Link href="/anfahrt-parken">
              Wegbeschreibung mit Fotos
            </Link>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 20px", fontSize: "14px", marginTop: "22px", color: "var(--color-neutral-800)" }}>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Tram
            </span>
            <span>
              91, 94, 98 — Haltestelle Luisenplatz-Süd, etwa 4 Minuten zu Fuß
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Bus
            </span>
            <span>
              605, 606, 695 — Luisenplatz
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Auto
            </span>
            <span>
              Kurzzeit-Parkplätze an der Hofseite, weitere in der Zeppelinstraße
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Zugang
            </span>
            <span>
              Erdgeschoss, barrierefrei erreichbar
            </span>
          </div>
          <div style={{ marginTop: "26px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)", overflow: "hidden" }}>
            <Karte hoehe={320} grau />
          </div>
          <a href="https://www.openstreetmap.org/?mlat=52.3976&mlon=13.0484#map=17/52.3976/13.0484" style={{ display: "inline-block", marginTop: "10px", fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Route planen
          </a>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <Bild className="plate" src="/uploads/photos-1786974467268-lgux.jpg" alt="Wartebereich der Praxis" style={{ width: "100%", height: "480px", objectFit: "cover", borderWidth: "0", outline: "0" }} />
        <Bild className="plate" src="/uploads/photos-1786974467256-ovyq.jpg" alt="Behandlungszimmer" style={{ width: "100%", height: "480px", objectFit: "cover", borderWidth: "0", outline: "0" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", padding: "80px 64px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Akute Schmerzen
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 14px" }}>
            Rufen Sie morgens ab 8:00 an.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Wir halten täglich Termine für Schmerzfälle frei. Sagen Sie am Telefon kurz, wo und seit wann es weh tut — dann können wir einschätzen, wie dringend es ist. Außerhalb unserer Zeiten hilft der zahnärztliche Notdienst der Kassenzahnärztlichen Vereinigung Brandenburg.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Erster Besuch
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 14px" }}>
            Was Sie mitbringen sollten.
          </h2>
          <div style={{ display: "grid", gap: "12px", fontSize: "15px", color: "var(--color-neutral-800)" }}>
            <span style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "10px" }}>
              Versichertenkarte oder Angaben zur privaten Versicherung
            </span>
            <span style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "10px" }}>
              Bonusheft, falls vorhanden
            </span>
            <span style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "10px" }}>
              Liste der Medikamente, die Sie einnehmen
            </span>
            <span style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "10px" }}>
              Vorhandene Röntgenbilder oder Befunde
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center", padding: "70px 64px", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "0 0 12px" }}>
            Lieber schriftlich?
          </h2>
          <p style={{ color: "var(--color-neutral-800)", margin: "0", maxWidth: "56ch" }}>
            Senden Sie uns zwei Wunschzeiten und Ihr Anliegen — wir bestätigen innerhalb von 24 Stunden.
          </p>
        </div>
        <Link className="btn btn-primary" href="/termin" style={{ padding: "12px 26px", fontSize: "15px" }}>
          Termin anfragen
        </Link>
      </div>
    </>
  );
}
