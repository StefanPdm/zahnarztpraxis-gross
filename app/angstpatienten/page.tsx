import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { seitenMetadaten } from "@/lib/seiten";
import Bild from "@/components/Bild";
import AngstRegler from "@/components/AngstRegler";
import strukturierteDaten from "./jsonld.json";
import NotfallLeiste from "@/components/NotfallLeiste";
import Fragen from "@/components/Fragen";

/*
 * ACHTUNG — diese Seite hatte in der Übergabe Zustand und Handler
 * (this.state / setState). Der interaktive Teil ist hier NICHT abgebildet
 * und muss als Client-Komponente ergänzt werden. Siehe docs/MIGRATION-STATUS.md.
 */

export const metadata = seitenMetadaten("/angstpatienten");

const zusagen = [
        { no: "01", title: "Erster Termin nur zum Kennenlernen", text: "Auf Wunsch ohne jede Behandlung. Sie sehen die Praxis, wir hören zu, und Sie entscheiden danach, ob und wann es weitergeht." },
        { no: "02", title: "Kein Rechtfertigen", text: "Wir fragen nicht, warum Sie so lange nicht da waren, und kommentieren den Zustand Ihrer Zähne nicht. Wir schauen nach vorn." },
        { no: "03", title: "Jeder Schritt wird vorher erklärt", text: "Was wir tun, warum, wie lange es dauert und was Sie dabei spüren — bevor es passiert, nicht währenddessen." },
        { no: "04", title: "Ein vereinbartes Handzeichen", text: "Hand heben heißt: sofort unterbrechen. Wir halten uns daran, ohne Diskussion und ohne „nur noch schnell“." },
        { no: "05", title: "Pausen, so oft Sie wollen", text: "Kurz durchatmen, aufsetzen, Mund ausspülen. Eine Pause ist kein Abbruch und kostet Sie keinen Termin." },
        { no: "06", title: "Behandlung in Etappen", text: "Große Vorhaben teilen wir in mehrere kurze Termine auf. Sie bestimmen das Tempo, wir planen die Reihenfolge medizinisch sinnvoll." },
        { no: "07", title: "Ablenkung am Behandlungsstuhl", text: "Monitor am Platz: Sie können Musik oder einen Film mitbringen und während der Behandlung hören oder ansehen." }
      ];

const etappen = [
        { no: "01", title: "Gespräch", text: "Nur reden. Sie sagen, was geht und was nicht. Wenn Sie möchten, schauen wir kurz nach — mehr passiert an diesem Tag nicht." },
        { no: "02", title: "Plan", text: "Befund, Reihenfolge und Kosten schriftlich. Wir fangen mit dem an, was am dringendsten ist, oder mit dem, was Ihnen am leichtesten fällt." },
        { no: "03", title: "Termine", text: "So kurz und so viele, wie Sie brauchen. Nach jedem Termin wissen Sie, was beim nächsten Mal ansteht." }
      ];

const faq = [
        { q: "Kann ich zuerst nur zum Gespräch kommen?", a: "Ja. Sagen Sie bei der Anfrage, dass Sie ein Erstgespräch möchten — dann ist der Termin ein Gespräch und keine Behandlung." },
        { q: "Muss ich erklären, warum ich lange nicht beim Zahnarzt war?", a: "Nein. Das ist für die Behandlung nicht wichtig und wir fragen nicht danach." },
        { q: "Was passiert, wenn ich mitten in der Behandlung nicht mehr kann?", a: "Sie heben die Hand — das Zeichen legen wir vorher fest — und wir unterbrechen sofort. Danach entscheiden Sie, ob wir weitermachen, pausieren oder aufhören." },
        { q: "Kann eine größere Behandlung auf mehrere Termine verteilt werden?", a: "Ja. Wir teilen sie in kürzere Etappen auf und besprechen vorher, was an welchem Termin dran ist." },
        { q: "Darf ich Musik oder einen Film mitbringen?", a: "Gern. An den Behandlungsplätzen gibt es Monitore; Musik oder Film laufen während der Behandlung." },
        { q: "Wie sage ich Ihnen vorab, dass ich Angst habe?", a: "Bei der Online-Terminanfrage wählen Sie „Angstpatient/in“ aus, oder sagen es am Telefon. Wir planen dann mehr Zeit ein." }
      ];

export default function Angstpatienten() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Angstpatienten
          </div>
          <h1 className="seitentitel">
            Zahnarzt für
            <br />
            Angstpatienten
            <br />
            in Potsdam.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Fünf bis zehn Prozent der Menschen meiden den Zahnarzt aus Angst. Die Folge ist meistens dieselbe: Kontrollen werden verschoben, aus kleinen Problemen werden große, und der Weg zurück fühlt sich mit jedem Jahr schwerer an. Wir behandeln viele Patienten, die lange nicht da waren — und fangen dort an, wo es für Sie machbar ist.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Erstgespräch anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Der erste Termin
          </div>
          <h2 className="titel-2 titel-2--luft">
            Nur reden. Ohne Behandlung.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Wenn Sie möchten, ist der erste Termin ein Gespräch und nichts weiter: Sie erzählen, was Ihnen Sorgen macht, wir sehen uns nur an, was Sie uns zeigen möchten, und Sie gehen wieder. Kein Bohrer, keine Spritze, keine Entscheidung an diesem Tag.
          </p>
          <p className="fliesstext">
            Am Ende wissen Sie, was ansteht, in welcher Reihenfolge und was es kostet. Wann Sie damit anfangen, entscheiden Sie.
          </p>
          <blockquote style={{ margin: "32px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Ich behandle viele Menschen, die lange keinen Zahnarzt gesehen haben. Sie brauchen dasselbe wie Kinder: Ruhe und eine ehrliche Ansage.“
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Chantal Groß, Zahnärztin
            </cite>
          </blockquote>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "560px" }}>
          <Bild vorrang className="parallax-img" src="/uploads/photos-1786974461849-vuwz.jpg" alt="Ruhiger Wartebereich der Zahnarztpraxis Groß & Groß in Potsdam" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start", padding: "96px 64px", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <div className="ueberzeile">
            Sagen Sie uns, wo Sie stehen
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 18px" }}>
            Wie nervös sind Sie wirklich?
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Angst ist keine Ja-oder-Nein-Frage. Zwischen „ungern, aber es geht“ und „ich habe seit Jahren abgesagt“ liegt ein weiter Weg — und wir planen den Termin unterschiedlich, je nachdem wo Sie stehen.
          </p>
          <p className="fliesstext">
            Schieben Sie den Regler dorthin, wo es für Sie stimmt. Rechts sehen Sie, wie wir dann vorgehen würden.
          </p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h5)", lineHeight: "1.45", margin: "28px 0 0" }}>
            Und wenn Sie ganz rechts landen: genau dafür ist diese Praxis gemacht.
          </p>
        </div>
        <AngstRegler start={8} />
      </div>
      <div style={{ padding: "96px 64px 40px" }}>
        <div className="ueberzeile">
          Was Sie von uns erwarten können
        </div>
        <h2 className="titel-2 breite-24">
          Sieben Zusagen, die im Behandlungszimmer gelten.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", margin: "0 64px 96px" }}>
        {zusagen.map((z, zI) => (
          <Fragment key={zI}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "30px 34px 30px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'", paddingTop: "5px" }}>
                {z.no}
              </span>
              <div>
                <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "0 0 8px" }}>
                  {z.title}
                </h3>
                <p className="text-15">
                  {z.text}
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "520px" }}>
          <Bild className="parallax-img" src="/uploads/photos-1786974461752-m532.jpg" alt="Behandlungszimmer mit Monitor über dem Behandlungsstuhl" />
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Das Handzeichen
          </div>
          <h2 className="titel-2 titel-2--luft">
            Ein Zeichen, und wir hören auf.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Wer im Behandlungsstuhl liegt, kann nicht reden — das ist für viele der schlimmste Teil. Deshalb legen wir vor jeder Behandlung ein Handzeichen fest: Hand heben. Sobald Sie es geben, unterbrechen wir sofort. Nicht „gleich“, nicht „nur noch dieser eine Schritt“.
          </p>
          <p className="fliesstext">
            Danach entscheiden Sie, ob wir weitermachen, eine Pause einlegen oder für heute Schluss ist. Das gilt bei jedem Termin, auch beim zwanzigsten.
          </p>
          <hr className="hr" />
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-lead)", lineHeight: "1.5", margin: "0", color: "var(--color-neutral-900)" }}>
            Und wir erklären jeden Schritt, bevor er passiert — was wir tun, wie lange es dauert, was Sie spüren werden.
          </p>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          In Etappen
        </div>
        <h2 className="titel-2 breite-26">
          Alles auf einmal muss niemand durchhalten.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {etappen.map((e, eI) => (
          <Fragment key={eI}>
            <div style={{ padding: "34px 30px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {e.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {e.title}
              </h3>
              <p className="text-15">
                {e.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Ablenkung
          </div>
          <h2 className="titel-3 titel-3--eng">
            Musik, Film, oder einfach Kopfhörer.
          </h2>
          <p className="fliesstext">
            An unseren Behandlungsplätzen gibt es Monitore. Sie können Musik oder einen Film mitbringen und während der Behandlung hören oder ansehen — für viele Patienten ist genau das der Unterschied zwischen „geht nicht“ und „geht schon“.
          </p>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Sanfter behandeln
          </div>
          <h2 className="titel-3 titel-3--eng">
            Laser statt Schmerzmittel-Reflex.
          </h2>
          <p className="fliesstext">
            Wo es möglich ist, arbeiten wir mit dem Laser — in der Parodontosebehandlung, zur Keimreduktion und bei der Fissurenversiegelung. Der Vorteil für Sie: weniger Wundschmerz, längere Schmerzfreiheit und geringere Mengen Betäubungsmittel.
          </p>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Was Angstpatienten uns am häufigsten fragen.
        </h2>
      </div>
      <Fragen eintraege={faq} pfad="/angstpatienten" />
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Der erste Schritt
        </div>
        <h2 className="abschluss__titel">
          Sagen Sie einfach, dass Sie Angst haben.
        </h2>
        <p className="abschluss__text">
          Bei der Online-Anfrage wählen Sie „Angstpatient/in“ — dann planen wir mehr Zeit ein und beginnen mit einem Gespräch. Wir melden uns innerhalb von 24 Stunden.
        </p>
        <div className="knopfreihe knopfreihe--mitte">
          <Link className="btn knopf-band knopf-band--voll" href="/termin">
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
