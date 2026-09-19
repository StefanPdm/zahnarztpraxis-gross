import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/weisheitszaehne-chirurgie");

const gruende = [
        "Der Zahn liegt schief und drückt gegen den Nachbarzahn.",
        "Er kommt nur teilweise durch — unter dem Zahnfleischrand entstehen Entzündungen, die immer wiederkehren.",
        "Er lässt sich nicht putzen, weil er zu weit hinten oder halb bedeckt liegt. Karies ist dann eine Frage der Zeit.",
        "Es gibt wiederkehrende Schmerzen oder Schwellungen in der Region.",
        "Der Platz wird für eine geplante Versorgung gebraucht."
      ];

const ablauf = [
        { no: "01", title: "Röntgen und Befund", text: "Anhand von Untersuchung und Röntgenbild von Ober- und Unterkiefer bestimmen wir die Lage jedes Weisheitszahns und planen den Eingriff entsprechend." },
        { no: "02", title: "Aufklärung", text: "Sie erfahren vorher, was gemacht wird, wie lange es dauert, welche Risiken bestehen und was es kostet — schriftlich, mit Zeit zum Nachdenken." },
        { no: "03", title: "Der Eingriff", text: "In örtlicher Betäubung. Sie spüren Druck, aber keinen Schmerz. Je nach Lage werden ein Zahn oder mehrere in einer Sitzung entfernt." },
        { no: "04", title: "Nachsorge", text: "Kontrolle der Wunde und, wenn genäht wurde, Fäden ziehen nach etwa einer Woche. Bei Beschwerden dazwischen rufen Sie an." }
      ];

const danach = [
        { wann: "Sofort", text: "Kühlen Sie von außen mit einem kühlen Tuch, mehrmals für einige Minuten — nicht mit Eis direkt auf der Haut." },
        { wann: "Heute", text: "Nichts essen, solange die Betäubung wirkt. Danach weiche, lauwarme Kost auf der anderen Seite kauen." },
        { wann: "48 h", text: "Kein Sport, keine schwere körperliche Arbeit, keine Sauna, kein heißes Bad — alles davon fördert Nachblutungen." },
        { wann: "48 h", text: "Kein Alkohol, kein Kaffee, kein Nikotin. Rauchen verzögert die Wundheilung deutlich." },
        { wann: "Erste Tage", text: "Nicht mit der Zunge in der Wunde spielen und nicht kräftig spülen — das Blutgerinnsel muss dort bleiben." },
        { wann: "Immer", text: "Weiterputzen, aber die Wunde aussparen. Ein sauberer Mund heilt besser." }
      ];

const weitere = [
        { title: "Zahnentfernung", text: "Wenn ein Zahn nicht erhalten werden kann, entfernen wir ihn so schonend wie möglich — und besprechen gleich, wie die Lücke später versorgt wird." },
        { title: "Implantation", text: "Das Setzen von Zahnimplantaten ist ein chirurgischer Eingriff. Planung, Implantation und Zahnersatz laufen bei uns in einer Hand." },
        { title: "Freilegung und Zahnfleischkorrektur", text: "Kleinere Eingriffe am Zahnfleisch, etwa im Rahmen einer Implantatversorgung oder einer Parodontitis-Behandlung." }
      ];

const faq = [
        { q: "Muss ich meine Weisheitszähne entfernen lassen?", a: "Nicht zwingend. Wenn sie gerade stehen, im Biss sind und sich putzen lassen, können sie bleiben. Entfernt wird, wenn sie Schaden anrichten oder absehbar anrichten werden — das entscheidet die Lage im Kiefer, nicht das Alter." },
        { q: "Tut die Entfernung weh?", a: "Der Eingriff findet in örtlicher Betäubung statt; Sie spüren Druck, aber keinen Schmerz. Danach ist die Stelle einige Tage empfindlich — was Sie dagegen nehmen können, besprechen wir vorher." },
        { q: "Werden alle vier auf einmal entfernt?", a: "Das hängt von der Lage und von Ihnen ab. Manchmal ist eine Sitzung sinnvoll, manchmal zwei — dann ist immer eine Seite zum Kauen frei." },
        { q: "Wie lange bin ich danach ausgefallen?", a: "Rechnen Sie mit zwei bis drei Tagen, in denen Sie es ruhig angehen sollten. Planen Sie den Termin so, dass danach kein wichtiger Anlass steht." },
        { q: "Wie stark schwillt es an?", a: "Eine Schwellung ist normal und erreicht meist am zweiten Tag ihren Höhepunkt. Konsequentes Kühlen in den ersten Stunden hält sie klein." },
        { q: "Wann muss ich mich melden?", a: "Wenn Schmerz oder Schwellung nach dem dritten Tag zunehmen statt abzunehmen, bei Fieber oder bei einer Blutung, die nicht aufhört. Rufen Sie dann an." },
        { q: "Zahlt die Krankenkasse die Entfernung?", a: "Wenn die Entfernung medizinisch notwendig ist, ist sie eine Leistung der gesetzlichen Krankenkassen. Was in Ihrem Fall gilt, sagen wir Ihnen vor dem Eingriff." }
      ];

export default function WeisheitszaehneChirurgie() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 60px" }}>
        <div>
          <div className="ueberzeile">
            Weisheitszähne &amp; Chirurgie
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Vier Zähne,
            <br />
            für die kein
            <br />
            Platz ist.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Bei den meisten Menschen ist im Kiefer nicht genug Platz für die Weisheitszähne: sie wachsen schief, drücken auf die Nachbarzähne und verursachen Schmerzen. Ob sie raus müssen, entscheidet ihre Lage im Kiefer — und die sieht man nicht von außen. Deshalb steht am Anfang immer ein Röntgenbild, nicht eine Empfehlung.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Beurteilung anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Raus oder drin?
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 18px" }}>
            Nicht jeder Weisheitszahn muss weg.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 20px" }}>
            Wenn ein Weisheitszahn gerade durchgebrochen ist, sauber im Biss steht und sich putzen lässt, kann er bleiben. Entfernt wird er, wenn er Schaden anrichtet oder absehbar anrichten wird. Diese Gründe sprechen dafür:
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {gruende.map((g, gI) => (
              <Fragment key={gI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px", padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: "4px" }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-neutral-800)" }}>
                    {g}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Erfahrung
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 18px" }}>
            Chirurgie aus der Klinik, in der Praxis.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Matthias Groß hat vier Jahre in der Mund-, Kiefer- und Gesichtschirurgie am Klinikum gearbeitet. Diese Erfahrung kommt bei chirurgischen Eingriffen in unserer Praxis zum Tragen — Sie müssen für eine Weisheitszahn-Entfernung nicht an eine andere Adresse überwiesen werden.
          </p>
          <p className="fliesstext">
            Was wir nicht selbst machen können, sagen wir Ihnen offen und verweisen weiter. Auch das gehört zur Erfahrung.
          </p>
          <blockquote style={{ margin: "28px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Bei einem Eingriff zählt vor allem, dass man vorher weiß, was man vor sich hat.“
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Matthias Groß, Zahnarzt
            </cite>
          </blockquote>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Der Ablauf
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Vom Röntgenbild bis zum Fädenziehen.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {ablauf.map((a, aI) => (
          <Fragment key={aI}>
            <div style={{ padding: "32px 26px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {a.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3-sm)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {a.title}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                {a.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "540px", margin: "0" }}>
          <Bild src="/uploads/zahnarzt-potsdam-praxis-gross-und-gross-1030x687-1.jpg" alt="Behandlungszimmer mit Röntgenbild am Bildschirm in der Zahnarztpraxis Groß & Groß Potsdam" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </figure>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Nach dem Eingriff
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 20px" }}>
            Die ersten zwei Tage entscheiden.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 22px" }}>
            Wie gut die Wunde heilt, hängt vor allem davon ab, was Sie in den ersten 48 Stunden tun. Sie bekommen die Hinweise schriftlich mit — hier die wichtigsten:
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {danach.map((d, dI) => (
              <Fragment key={dI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px", padding: "15px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ minWidth: "80px", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "4px" }}>
                    {d.wann}
                  </span>
                  <span style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-neutral-800)" }}>
                    {d.text}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ fontSize: "13.5px", color: "var(--color-neutral-700)", margin: "18px 0 0" }}>
            Wenn Schmerz oder Schwellung nach dem dritten Tag zunehmen statt abzunehmen: rufen Sie an.
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Auch chirurgisch
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 16px" }}>
            Weitere Eingriffe.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 20px" }}>
            Neben den Weisheitszähnen führen wir weitere chirurgische Eingriffe durch — vor allem im Zusammenhang mit Implantaten und dem Erhalt von Zähnen.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {weitere.map((w, wI) => (
              <Fragment key={wI}>
                <div style={{ padding: "18px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.16", margin: "0 0 6px" }}>
                    {w.title}
                  </h3>
                  <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.6", margin: "0" }}>
                    {w.text}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Wenn Sie Angst haben
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 16px" }}>
            Ein Eingriff ist genau der Moment dafür.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Sagen Sie vorher, dass Sie Angst haben — dann planen wir mehr Zeit ein, erklären jeden Schritt bevor er passiert und vereinbaren das Handzeichen. Hand heben heißt: wir unterbrechen sofort, auch mitten im Eingriff.
          </p>
          <p className="fliesstext">
            Auf Wunsch läuft Musik oder ein Film über den Monitor am Behandlungsplatz.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
            <Link className="btn btn-secondary knopf-gross" href="/angstpatienten">
              Für Angstpatienten
            </Link>
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Termin anfragen
            </Link>
          </div>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "24ch" }}>
          Fragen zur Weisheitszahn-Entfernung.
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
        <div className="ueberzeile ueberzeile--hell">
          Beurteilung
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "22ch", color: "#f7f5f0" }}>
          Erst schauen, dann entscheiden.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "54ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Im Beratungstermin sehen wir anhand des Röntgenbildes, wie Ihre Weisheitszähne liegen — und sagen Ihnen offen, ob überhaupt etwas gemacht werden muss. Antwort auf Ihre Anfrage innerhalb von 24 Stunden.
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
