import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import strukturierteDaten from "./jsonld.json";

export const metadata: Metadata = {
  title: "Kinderzahnarzt Potsdam — Kinderzahnheilkunde | Groß & Groß",
  description: "Kinderzahnarzt in Potsdam: behutsames Kennenlernen, kindgerechte Erklärung, Prophylaxe, Fluoridierung und Fissurenversiegelung. Erst zeigen, dann erklären, dann behandeln — Groß & Groß, Potsdam Mitte.",
  alternates: { canonical: "/kinderzahnheilkunde" },
};

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
      <div id="grosselino" aria-hidden="true" style={{ position: "fixed", left: "5px", top: "18%", zIndex: "55", display: "flex", alignItems: "center", gap: "10px", pointerEvents: "none", transition: "top .35s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", width: "50px", height: "50px", borderRadius: "999px", background: "#fffdf8", border: "1px solid var(--color-accent-300)", boxShadow: "var(--shadow-sm)" }}>
          <svg id="gr-svg" width="36" height="36" viewBox="0 0 100 100" fill="none" stroke="var(--color-accent-700)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <g id="gr-leg-l">
              <ellipse cx="41" cy="88" rx="7.5" ry="5.5" fill="#fffdf8" />
            </g>
            <g id="gr-leg-r">
              <ellipse cx="59" cy="88" rx="7.5" ry="5.5" fill="#fffdf8" />
            </g>
            <ellipse cx="50" cy="71" rx="17" ry="16" fill="#fffdf8" />
            <ellipse cx="50" cy="73.5" rx="9" ry="8" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <path id="gr-arm-l" d="M35 64 L23 60" />
            <g id="gr-arm-r">
              <path d="M66 64 L79 57" />
            </g>
            <circle cx="31" cy="25" r="10" fill="#fffdf8" />
            <circle cx="69" cy="25" r="10" fill="#fffdf8" />
            <circle cx="31" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="69" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="50" cy="37" r="21" fill="#fffdf8" />
            <ellipse cx="50" cy="45" rx="10" ry="7.5" fill="#fffdf8" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="41" cy="33" r="2.6" fill="#201f1d" stroke="none" />
            <circle cx="59" cy="33" r="2.6" fill="#201f1d" stroke="none" />
            <ellipse cx="50" cy="41.5" rx="3.2" ry="2.4" fill="#201f1d" stroke="none" />
            <path d="M44 47.5 Q50 52.5 56 47.5" stroke="#201f1d" strokeWidth="2.4" />
          </svg>
        </div>
        <span id="gr-bubble" style={{ width: "max-content", maxWidth: "14ch", padding: "8px 13px", borderRadius: "14px 14px 14px 3px", background: "#fffdf8", border: "1px solid var(--color-accent-200)", boxShadow: "var(--shadow-md)", fontFamily: "var(--font-heading)", fontSize: "13.5px", lineHeight: "1.3", color: "var(--color-neutral-900)" }}>
          Hallo, ich bin Großelino!
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px 16px", padding: "14px", borderBottom: "1px solid var(--color-divider)", fontSize: "14px", color: "var(--color-neutral-800)" }}>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: "11.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Akute Zahnschmerzen?
        </span>
        <span style={{ width: "1px", height: "18px", background: "var(--color-divider)" }} />
        <span>
          Rufen Sie uns morgens ab 8:00 an — Montag bis Freitag halten wir
          <Link href="/zahnschmerzen">
            Notfalltermine
          </Link>
          frei.
        </span>
        <a href="tel:+49331960926" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-body)", fontFeatureSettings: "'tnum'" }}>
          0331 960926
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "56px", alignItems: "center", padding: "80px 64px 70px", background: "var(--kid-ground)", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11" />
            </svg>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
              Kinderzahnheilkunde
            </div>
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Kinderzahnarzt
            <br />
            in Potsdam.
          </h1>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "26px 0 0", maxWidth: "52ch" }}>
            Unsere kleinen Patienten behandeln wir mit viel Einfühlungsvermögen: Kinder sind bei uns ausdrücklich willkommen — nicht nebenbei, sondern als eigene Patienten mit eigenem Tempo. Unser Ziel ist einfach: dass Ihr Kind gar keine Angst vor dem Zahnarzt entwickelt. Dafür nehmen wir uns beim ersten Mal Zeit für nichts als Kennenlernen.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "28px" }}>
            <Link className="btn btn-primary" href="/termin" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Kindertermin anfragen
            </Link>
            <a className="btn btn-secondary" href="tel:+49331960926" style={{ padding: "12px 26px", fontSize: "15px" }}>
              0331 960926
            </a>
          </div>
        </div>
        <figure style={{ position: "relative", margin: "0" }}>
          <img src="/uploads/kinder-motiv.jpg" alt="Illustration: lächelnder Zahn mit Sternen — Kinderzahnheilkunde bei Groß & Groß in Potsdam" style={{ display: "block", width: "100%", height: "auto", borderRadius: "18px", border: "1px solid var(--color-accent-200)" }} />
          <figcaption id="gr-caption" style={{ margin: "12px 2px 0", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Großelino, unser Bär, winkt euch auf dieser Seite zu
          </figcaption>
        </figure>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Unsere Grundregel
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Erst zeigen. Dann erklären. Dann behandeln.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "60ch", textWrap: "pretty" }}>
          In dieser Reihenfolge, ohne Ausnahme. Was ein Kind vorher gesehen und verstanden hat, macht ihm hinterher weniger Angst.
        </p>
      </div>
      <div id="grosselino-mobil" style={{ alignItems: "center", gap: "16px", margin: "40px 64px 0", padding: "20px 22px", border: "1px solid var(--color-accent-200)", borderRadius: "18px", background: "var(--kid-ground)" }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", width: "64px", height: "64px", borderRadius: "999px", background: "#fffdf8", border: "1px solid var(--color-accent-300)" }}>
          <svg id="gr2-svg" width="46" height="46" viewBox="0 0 100 100" fill="none" stroke="var(--color-accent-700)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <ellipse cx="41" cy="88" rx="7.5" ry="5.5" fill="#fffdf8" />
            <ellipse cx="59" cy="88" rx="7.5" ry="5.5" fill="#fffdf8" />
            <ellipse cx="50" cy="71" rx="17" ry="16" fill="#fffdf8" />
            <ellipse cx="50" cy="73.5" rx="9" ry="8" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <path d="M35 64 L23 60" />
            <g id="gr2-arm-r">
              <path d="M66 64 L79 57" />
            </g>
            <circle cx="31" cy="25" r="10" fill="#fffdf8" />
            <circle cx="69" cy="25" r="10" fill="#fffdf8" />
            <circle cx="31" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="69" cy="25" r="4" fill="none" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="50" cy="37" r="21" fill="#fffdf8" />
            <ellipse cx="50" cy="45" rx="10" ry="7.5" fill="#fffdf8" stroke="var(--color-accent-300)" strokeWidth="2" />
            <circle cx="41" cy="33" r="2.6" fill="#201f1d" stroke="none" />
            <circle cx="59" cy="33" r="2.6" fill="#201f1d" stroke="none" />
            <ellipse cx="50" cy="41.5" rx="3.2" ry="2.4" fill="#201f1d" stroke="none" />
            <path d="M44 47.5 Q50 52.5 56 47.5" stroke="#201f1d" strokeWidth="2.4" />
          </svg>
        </span>
        <span id="gr2-bubble" style={{ display: "block" }}>
          <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Hallo, ich bin Großelino
          </span>
          <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "var(--fs-lead)", lineHeight: "1.35", color: "var(--color-neutral-900)", marginTop: "6px" }}>
            Beim ersten Mal wird nur geschaut. Und Hand heben heißt immer: Pause.
          </span>
        </span>
      </div>
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
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                {r.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "80px 64px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Der erste Besuch
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 20px" }}>
            Hinsetzen, hochfahren, staunen.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 16px" }}>
            Beim ersten Termin darf Ihr Kind den Stuhl ausprobieren, das Licht anschauen und den Spiegel selbst halten. Wir zählen die Zähne, wenn es das möchte — und wenn nicht, dann eben nicht. Niemand wird überredet.
          </p>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Sie dürfen dabeibleiben, so lange Sie und Ihr Kind es möchten. Was wir sehen, erklären wir beiden: dem Kind in seinen Worten, Ihnen in Ihren.
          </p>
          <blockquote style={{ margin: "32px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Ich behandle viele Kinder. Sie brauchen dasselbe wie Erwachsene, die lange nicht da waren: Ruhe und eine ehrliche Ansage."
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Chantal Groß, Zahnärztin
            </cite>
          </blockquote>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "560px", borderLeft: "1px solid var(--color-divider)" }}>
          <img className="parallax-img" src="/uploads/photos-1786974461824-wn8d.jpg" alt="Helles Behandlungszimmer mit Tageslicht in der Zahnarztpraxis Groß & Groß Potsdam" style={{ position: "absolute", left: "0", top: "-20%", width: "100%", height: "140%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <div style={{ padding: "96px 64px 0", background: "var(--kid-ground)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Vorsorge &amp; Prophylaxe
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
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
                  <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                    {p.text}
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "480px" }}>
          <img className="parallax-img" src="/uploads/photos-1786974468276-pkt8.jpg" alt="Wartebereich der Zahnarztpraxis Groß & Groß in Potsdam Mitte" style={{ position: "absolute", left: "0", top: "-20%", width: "100%", height: "140%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ padding: "80px 64px", borderLeft: "1px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Für Eltern
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 16px" }}>
            Eine feste Anlaufstelle — auch für Sie.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 16px" }}>
            Sie müssen für Ihr Kind nicht in eine andere Praxis fahren: Kontrolle, Prophylaxe und Behandlung laufen hier, bei denselben Behandlern, die auch Sie kennen. Das macht Termine planbar und den Weg kurz.
          </p>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Ein Hinweis, der oft überrascht: Karies- und Parodontitisbakterien können von Eltern auf das Kind übertragen werden. Auf die eigene Mundgesundheit zu achten — gerade vor und während einer Schwangerschaft — schützt also beide.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "28px" }}>
            <Link className="btn btn-primary" href="/termin" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Termin anfragen
            </Link>
            <Link className="btn btn-secondary" href="/angstpatienten" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Für Angstpatienten
            </Link>
          </div>
        </div>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Häufige Fragen
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "24ch" }}>
          Was Eltern uns am häufigsten fragen.
        </h2>
      </div>
      <div style={{ margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {faq.map((f, fI) => (
          <Fragment key={fI}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "40px", padding: "28px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.2", margin: "0" }}>
                {f.q}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body)", lineHeight: "1.66", margin: "0" }}>
                {f.a}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ padding: "104px 64px", textAlign: "center", background: "#17150f" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent-400)" }}>
          Erster Kindertermin
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "22ch", color: "#f7f5f0" }}>
          Beim ersten Mal wird nur geschaut.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "52ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Wählen Sie bei der Anfrage „Kinderbehandlung" — wir planen den Termin so, dass Zeit zum Kennenlernen bleibt. Antwort innerhalb von 24 Stunden.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
          <Link className="btn" href="/termin" style={{ padding: "15px 38px", fontSize: "var(--fs-body)", border: "1px solid var(--color-accent-400)", color: "#17150f", background: "var(--color-accent-400)" }}>
            Termin anfragen
          </Link>
          <a className="btn" href="tel:+49331960926" style={{ padding: "15px 38px", fontSize: "var(--fs-body)", border: "1px solid rgba(243,242,242,0.35)", color: "#f3f2f2" }}>
            0331 960926
          </a>
        </div>
      </div>
    </>
  );
}
