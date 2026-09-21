import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild, { VOLL } from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/leistungen");

const behandlungen = [
        { no: "01", title: "Prophylaxe & professionelle Zahnreinigung", text: "Reinigung, Fluoridierung und Anleitung zur Pflege zu Hause — mit Zahnseide, Interdentalbürste oder Munddusche, je nachdem, was zu Ihren Zwischenräumen passt. Den Kontrollrhythmus legen wir nach Ihrem Risiko fest, nicht nach Kalender." },
        { no: "02", title: "Weisheitszahn-Entfernung", text: "Oft ist im Kiefer nicht genug Platz: die Weisheitszähne wachsen schief, drücken auf Nachbarzähne und verursachen Schmerzen. Anhand von Untersuchung und Röntgenbild von Ober- und Unterkiefer bestimmen wir die Lage und planen den Eingriff entsprechend." },
        { no: "03", title: "Parodontologie", text: "Bakterieller Belag am Zahnfleischsaum verhärtet zu Zahnstein, das Zahnfleisch entzündet sich, blutet und es entstehen Taschen — unbehandelt baut der Kieferknochen ab. Wir reinigen die Taschen, unterstützen mit Laser und halten das Ergebnis über ein festes Recall-Programm." },
        { no: "04", title: "Schienentherapie bei Zähneknirschen", text: "Knirschen (Bruxismus) passiert meist nachts und unbewusst: die Kaumuskulatur verkrampft, Zahnsubstanz wird abgeschliffen, dazu kommen Spannungskopfschmerzen. Wir fertigen eine individuell angepasste Knirscherschiene für die Nacht." },
        { no: "05", title: "Laserbehandlung", text: "Wir setzen den Laser in der Parodontosebehandlung, zur Keimreduktion und bei der Fissurenversiegelung ein. Die Vorteile: weniger Wundschmerz, längere Schmerzfreiheit und geringere Anästhesiemengen." },
        { no: "06", title: "Angstpatienten", text: "Fünf bis zehn Prozent der Menschen meiden den Zahnarzt aus Angst — und riskieren damit ihre Zahngesundheit. Bei uns gibt es längere Termine, ein vereinbartes Handzeichen für Pausen, keine Behandlung ohne Ankündigung und auf Wunsch Musik oder einen Film über den Deckenmonitor." },
        { no: "07", title: "Kinderzahnheilkunde", text: "Damit Kinder gar keine Angst entwickeln: erst zeigen, dann erklären, dann behandeln. Hygienekontrollen, Putzanleitung, Fluoridierung und Fissurenversiegelung beugen früh vor — und auch Eltern sollten vor und während einer Schwangerschaft auf ihre Mundflora achten." },
        { no: "08", title: "Bleaching & ästhetische Korrekturen", text: "Aufhellung, zahnfarbene Füllungen und Veneers für die Frontzähne — dezent dosiert, damit das Ergebnis nicht auffällt, sondern passt." }
      ];

const ablauf = [
        { no: "01", title: "Beratung", text: "Befund, Röntgen wenn nötig, und eine Erklärung ohne Fachlatein." },
        { no: "02", title: "Planung", text: "Behandlungsplan mit Kostenaufstellung — inklusive der Alternativen." },
        { no: "03", title: "Ausführung", text: "In Etappen, die Sie mitbestimmen. Zahnersatz entsteht parallel im Labor." },
        { no: "04", title: "Nachsorge", text: "Kontrolle, Feinkorrektur und ein Recall-Intervall, das zu Ihren Zähnen passt — auf Wunsch erinnern wir Sie per E-Mail, SMS, Post oder Anruf." }
      ];

export default function Leistungen() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Leistungen
          </div>
          <h1 className="seitentitel">
            Zahnmedizin
            <br />
            und Zahntechnik
            <br />
            unter einem Dach.
          </h1>
        </div>
        <p className="fliesstext fliesstext--gross">
          Neben der allgemeinen Zahnheilkunde setzen wir Schwerpunkte: Implantologie und Prothetik, ästhetische Zahnmedizin, Parodontologie, Kinderbehandlung und Chirurgie. Weil unser Zahnlabor in derselben Praxis sitzt, entstehen Kronen, Inlays und Veneers dort, wo sie auch eingesetzt werden — kurze Wege, schnelle Korrekturen.
        </p>
      </div>
      <div style={{ position: "relative", overflow: "hidden", height: "560px" }}>
        <Bild sizes={VOLL} vorrang className="parallax-img" src="/images/photos-1786974461785-ksjv.jpg" alt="Behandlungseinheit" />
        <svg viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-1px", width: "100%", height: "30px", display: "block", pointerEvents: "none" }}>
          <path d="M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z" style={{ fill: "var(--color-bg)" }} />
        </svg>
        <svg viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "0", bottom: "-1px", width: "100%", height: "30px", display: "block", pointerEvents: "none" }}>
          <g transform="translate(0,36) scale(1,-1)">
            <path d="M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z" style={{ fill: "var(--color-bg)" }} />
          </g>
        </svg>
      </div>
      <div id="behandlungen" style={{ padding: "80px 64px", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "40px", alignItems: "baseline", marginBottom: "52px" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", margin: "0" }}>
            Zahnbehandlungen
          </h2>
          <span style={{ height: "1px", background: "var(--color-divider)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px 72px" }}>
          {behandlungen.map((b, bI) => (
            <Fragment key={bI}>
              <div style={{ borderTop: "1px solid var(--color-accent-300)", paddingTop: "20px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "13px", letterSpacing: "0.14em", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                  {b.no}
                </div>
                <h3 style={{ margin: "10px 0 12px", fontSize: "30px", fontWeight: "400", lineHeight: "1.14" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: "1.62", color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto", margin: "0" }}>
                  {b.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <Bild className="plate" src="/images/photos-1786974479454-rmck.jpg" alt="Behandlungsraum mit Technik" style={{ width: "100%", height: "520px", objectFit: "cover", borderWidth: "0", outline: "0" }} />
        <Bild className="plate" src="/images/photos-1786974461803-v5uo.jpg" alt="Behandlungszimmer" style={{ width: "100%", height: "520px", objectFit: "cover", borderWidth: "0", outline: "0" }} />
      </div>
      <div style={{ position: "relative", overflow: "hidden", height: "540px" }}>
        <Bild sizes={VOLL} className="parallax-img" src="/images/photos-1786974461834-65xv.jpg" alt="Behandlungszimmer mit Arbeitsfläche" />
        <svg viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "0", top: "-1px", width: "100%", height: "30px", display: "block", pointerEvents: "none" }}>
          <path d="M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z" style={{ fill: "var(--color-bg)" }} />
        </svg>
        <svg viewBox="0 0 1200 36" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", left: "0", bottom: "-1px", width: "100%", height: "30px", display: "block", pointerEvents: "none" }}>
          <g transform="translate(0,36) scale(1,-1)">
            <path d="M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z" style={{ fill: "var(--color-bg)" }} />
          </g>
        </svg>
      </div>
      <div id="zahnlabor" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", padding: "70px 64px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <div className="ueberzeile">
            Eigenes Zahnlabor
          </div>
          <h2 className="titel-3 titel-3--eng">
            Der Zahntechniker sitzt direkt in der Praxis.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 24px" }}>
            Präzisionsabformungen, Modelle, Provisorien, Schienen und Keramikarbeiten entstehen im Labor der Praxis. Farbe und Passung prüfen wir direkt am Stuhl, Korrekturen laufen oft am selben Tag — statt über Wochen und Wege zu einem externen Labor.
          </p>
          <Link className="btn btn-primary knopf-gross" href="/zahnlabor">
            Zum eigenen Zahnlabor
          </Link>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", height: "340px", margin: "0", borderRadius: "var(--radius-md)" }}>
          <Bild src="/images/Zahnlabor.jpg" alt="Arbeitsplatz im praxiseigenen Zahnlabor mit Gipsmodellen und Zahnfarbmustern" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </figure>
      </div>
      <div style={{ padding: "80px 64px", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "40px", alignItems: "baseline", marginBottom: "44px" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", margin: "0" }}>
            Wie eine Behandlung abläuft
          </h2>
          <span style={{ height: "1px", background: "var(--color-divider)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "44px" }}>
          {ablauf.map((a, aI) => (
            <Fragment key={aI}>
              <div style={{ borderTop: "1px solid var(--color-accent-300)", paddingTop: "18px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "13px", letterSpacing: "0.14em", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                  {a.no}
                </div>
                <h3 style={{ margin: "10px 0 8px", fontSize: "var(--fs-h5)", fontWeight: "400" }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-neutral-800)", margin: "0" }}>
                  {a.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center", padding: "70px 64px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "0 0 12px" }}>
            Nicht sicher, was Sie brauchen?
          </h2>
          <p style={{ color: "var(--color-neutral-800)", margin: "0", maxWidth: "56ch" }}>
            Beschreiben Sie kurz Ihr Anliegen — wir sagen Ihnen, welcher Termin dafür der richtige ist, und wie lange er dauert.
          </p>
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          <Link className="btn btn-primary knopf-gross" href="/#termin">
            Termin anfragen
          </Link>
          <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
            0331 960926
          </a>
        </div>
      </div>
    </>
  );
}
