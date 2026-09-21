import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import { Grosselino, GrosselinoMobil } from "@/components/Grosselino";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";
import Fragen from "@/components/Fragen";

export const metadata = seitenMetadaten("/kinderzahnheilkunde");

const regel = [
        { no: "1", title: "Zeigen", icon: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 9a3 3 0 100 6 3 3 0 000-6z", text: "Spiegel, Licht, Stuhl, Sauger: alles darf angeschaut und angefasst werden, bevor es benutzt wird." },
        { no: "2", title: "Erklären", icon: "M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z", text: "In Worten, die ein Kind versteht — ohne Fachbegriffe und ohne Sätze, die harmloser klingen sollen, als sie sind." },
        { no: "3", title: "Behandeln", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z", text: "Erst wenn klar ist, was passiert. Und mit dem Recht, jederzeit die Hand zu heben und Pause zu machen." }
      ];

const prophylaxe = [
        { title: "Regelmäßige Hygienekontrolle", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", text: "Zwei Kontrollen im Jahr genügen meistens, um kleine Stellen zu finden, solange sie noch klein sind." },
        { title: "Putzanleitung, die haftet", icon: "M12 20h9M3 20l4-1 9.5-9.5a2.1 2.1 0 00-3-3L4 16l-1 4z", text: "Wir zeigen dem Kind selbst, wo die Bürste hinkommt — nicht nur den Eltern. Das hält länger als jeder Vortrag." },
        { title: "Fluoridierung", icon: "M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z", text: "Härtet den Zahnschmelz und macht ihn widerstandsfähiger gegen Säure. Schnell, schmerzfrei, ohne Bohrer." },
        { title: "Fissurenversiegelung", icon: "M4 7h16M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M9 11h6", text: "Die feinen Rillen der Backenzähne werden verschlossen, bevor sich dort Bakterien einnisten können." }
      ];

const faq = [
        { q: "Ab welchem Alter soll mein Kind zum Zahnarzt?", a: "Sobald die ersten Zähne da sind, spätestens im Rahmen der Vorsorgeuntersuchungen. Beim ersten Besuch geht es ohnehin nur ums Kennenlernen — je früher der stattfindet, desto normaler ist der Zahnarzt für Ihr Kind." },
        { q: "Was passiert beim ersten Termin?", a: "Ihr Kind darf den Behandlungsstuhl ausprobieren, das Licht anschauen und den Spiegel halten. Wir zählen die Zähne, wenn es möchte. Behandelt wird an diesem Tag nichts." },
        { q: "Darf ich als Elternteil dabeibleiben?", a: "Ja, so lange Sie und Ihr Kind es möchten. Manche Kinder sind ohne Publikum mutiger — das merken wir gemeinsam." },
        { q: "Was ist, wenn mein Kind nicht mitmacht?", a: "Dann machen wir Schluss und probieren es beim nächsten Termin wieder. Niemand wird überredet oder festgehalten; ein abgebrochener Termin ist besser als ein schlechtes erstes Erlebnis." },
        { q: "Was kostet die Prophylaxe für Kinder?", a: "Die zahnärztlichen Vorsorgeuntersuchungen und die Individualprophylaxe für Kinder und Jugendliche sind Leistungen der gesetzlichen Krankenkassen. Was darüber hinausgeht, sagen wir Ihnen vorher." },
        { q: "Kann ich Kariesbakterien auf mein Kind übertragen?", a: "Ja, das ist möglich — über gemeinsam benutzte Löffel oder den abgeleckten Schnuller. Deshalb lohnt es sich, gerade vor und während einer Schwangerschaft die eigene Mundgesundheit im Blick zu haben." }
      ];

export default function Kinderzahnheilkunde() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <Grosselino />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "56px", alignItems: "center", padding: "80px 64px 70px", background: "var(--kid-ground)", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11" />
            </svg>
            <div className="ueberzeile">
              Kinderzahnheilkunde
            </div>
          </div>
          <h1 className="seitentitel">
            Kinderzahnarzt
            <br />
            in Potsdam.
          </h1>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "26px 0 0", maxWidth: "52ch" }}>
            Unsere kleinen Patienten behandeln wir mit viel Einfühlungsvermögen: Kinder sind bei uns ausdrücklich willkommen — nicht nebenbei, sondern als eigene Patienten mit eigenem Tempo. Unser Ziel ist einfach: dass Ihr Kind gar keine Angst vor dem Zahnarzt entwickelt. Dafür nehmen wir uns beim ersten Mal Zeit für nichts als Kennenlernen.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "28px" }}>
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Kindertermin anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
        <figure style={{ position: "relative", margin: "0" }}>
          <Bild vorrang src="/images/grosselino-kinderzahnheilkunde.jpg" alt="Grosselino, ein Teddybär im weißen Kittel, hält einen lachenden Zahn und eine Zahnbürste" style={{ display: "block", width: "100%", height: "auto", borderRadius: "18px", border: "1px solid var(--color-accent-200)" }} />
          <figcaption id="gr-caption" style={{ margin: "12px 2px 0", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Grosselino, unser Bär, winkt euch auf dieser Seite zu
          </figcaption>
        </figure>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Unsere Grundregel
        </div>
        <h2 className="titel-2 breite-26">
          Erst zeigen. Dann erklären. Dann behandeln.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "60ch", textWrap: "pretty" }}>
          In dieser Reihenfolge, ohne Ausnahme. Was ein Kind vorher gesehen und verstanden hat, macht ihm hinterher weniger Angst.
        </p>
      </div>
      <GrosselinoMobil />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "22px", margin: "40px 64px 96px" }}>
        {regel.map((r, rI) => (
          <Fragment key={rI}>
            <div style={{ border: "1px solid var(--color-accent-200)", borderRadius: "18px", background: "var(--kid-ground)", padding: "32px 30px 34px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "999px", border: "1px solid var(--color-accent-300)", background: "#fffdf8" }}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={r.icon} />
                </svg>
              </span>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-700)", marginTop: "22px" }}>
                Schritt {r.no}
              </div>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.12", margin: "10px 0 10px" }}>
                {r.title}
              </h3>
              <p className="text-15">
                {r.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Der erste Besuch
          </div>
          <h2 className="titel-2 titel-2--luft">
            Hinsetzen, hochfahren, staunen.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Beim ersten Termin darf Ihr Kind den Stuhl ausprobieren, das Licht anschauen und den Spiegel selbst halten. Wir zählen die Zähne, wenn es das möchte — und wenn nicht, dann eben nicht. Niemand wird überredet.
          </p>
          <p className="fliesstext">
            Sie dürfen dabeibleiben, so lange Sie und Ihr Kind es möchten. Was wir sehen, erklären wir beiden: dem Kind in seinen Worten, Ihnen in Ihren.
          </p>
          <blockquote style={{ margin: "32px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Ich behandle viele Kinder. Sie brauchen dasselbe wie Erwachsene, die lange nicht da waren: Ruhe und eine ehrliche Ansage.“
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Chantal Groß, Zahnärztin
            </cite>
          </blockquote>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "560px", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild className="parallax-img" src="/images/photos-1786974461824-wn8d.jpg" alt="Helles Behandlungszimmer mit Tageslicht in der Zahnarztpraxis Groß & Groß Potsdam" />
        </div>
      </div>
      <div style={{ padding: "96px 64px 0", background: "var(--kid-ground)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="ueberzeile">
          Vorsorge &amp; Prophylaxe
        </div>
        <h2 className="titel-2 breite-26">
          Damit Karies gar nicht erst anfängt.
        </h2>
        <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "20px 0 0", maxWidth: "62ch" }}>
          Eine individuelle Prophylaxe ist auch bei Kindern äußerst wichtig — damit sich karies- und parodontitisverursachende Bakterien gar nicht erst im Mundraum einnisten. Diese vier Bausteine beugen schon bei den kleinsten Patienten Karies und Entzündungen vor und schaffen die Voraussetzung für dauerhafte Mundgesundheit.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px", margin: "36px 0 0", paddingBottom: "20px" }}>
          {prophylaxe.map((p, pI) => (
            <Fragment key={pI}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px", padding: "24px 0", borderTop: "1px solid var(--color-accent-200)" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: "5px" }}>
                  <path d={p.icon} />
                </svg>
                <div>
                  <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "0 0 7px" }}>
                    {p.title}
                  </h3>
                  <p className="text-15">
                    {p.text}
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderBottom: "1px solid var(--color-divider)" }}>
        {/* Kein Parallax-Rahmen: die Figur steht rechts im Bild, der Überstand
            von 140 % würde sie anschneiden. Der Ausschnitt liegt deshalb
            rechts, links bleibt die helle Fläche. */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "480px" }}>
          <Bild
            sizes="(max-width: 1000px) 100vw, 50vw"
            src="/images/zahnarzt-figur-kinderzahnheilkunde.jpg"
            alt="Sammelfigur einer Zahnärztin mit Röntgenbild und Gebiss auf einem Tresen"
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "72% 50%" }}
          />
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Für Eltern
          </div>
          <h2 className="titel-3">
            Eine feste Anlaufstelle — auch für Sie.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Sie müssen für Ihr Kind nicht in eine andere Praxis fahren: Kontrolle, Prophylaxe und Behandlung laufen hier, bei denselben Behandlern, die auch Sie kennen. Das macht Termine planbar und den Weg kurz.
          </p>
          <p className="fliesstext">
            Ein Hinweis, der oft überrascht: Karies- und Parodontitisbakterien können von Eltern auf das Kind übertragen werden. Auf die eigene Mundgesundheit zu achten — gerade vor und während einer Schwangerschaft — schützt also beide.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "28px" }}>
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Termin anfragen
            </Link>
            <Link className="btn btn-secondary knopf-gross" href="/angstpatienten">
              Für Angstpatienten
            </Link>
          </div>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Was Eltern uns am häufigsten fragen.
        </h2>
      </div>
      <Fragen eintraege={faq} pfad="/kinderzahnheilkunde" />
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Erster Kindertermin
        </div>
        <h2 className="abschluss__titel">
          Beim ersten Mal wird nur geschaut.
        </h2>
        <p className="abschluss__text">
          Wählen Sie bei der Anfrage „Kinderbehandlung“ — wir planen den Termin so, dass Zeit zum Kennenlernen bleibt. Antwort innerhalb von 24 Stunden.
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
