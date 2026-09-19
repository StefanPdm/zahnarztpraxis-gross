import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { seitenMetadaten } from "@/lib/seiten";
import Bild from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/implantologie");

const proof = [
        { value: "1.200+", label: "Gesetzte Implantate" },
        { value: "DGI", label: "Tätigkeitsschwerpunkt Implantologie" },
        { value: "1", label: "Praxis für OP, Zahnersatz und Nachsorge" },
        { value: "1991", label: "Familiengeführt in Potsdam Mitte" }
      ];

const ablauf = [
        { no: "01", title: "Befund und Planung", text: "Untersuchung und Röntgen zeigen, wie viel Knochen vorhanden ist und wo das Implantat sitzen kann. Sie bekommen den Plan mit Alternativen und Kosten schriftlich." },
        { no: "02", title: "Implantation", text: "Der Eingriff findet in örtlicher Betäubung statt und dauert bei einem Einzelzahn meist unter einer Stunde. Danach setzen wir, wenn nötig, ein Provisorium ein." },
        { no: "03", title: "Einheilen und Zahnersatz", text: "Das Implantat wächst über einige Monate im Knochen fest. Danach entsteht der sichtbare Zahn im eigenen Labor — Farbe und Form direkt mit Ihnen abgestimmt." },
        { no: "04", title: "Nachsorge", text: "Implantate brauchen Pflege wie eigene Zähne. Wir kontrollieren regelmäßig und reinigen professionell, damit das Zahnfleisch rund um das Implantat gesund bleibt." }
      ];

const aufbau = [
        { no: "A", title: "Implantatkörper", text: "Aus Titan, wird im Kieferknochen verankert und übernimmt die Aufgabe der natürlichen Zahnwurzel." },
        { no: "B", title: "Aufbau", text: "Das Verbindungsstück zwischen Implantat und sichtbarem Zahn — es trägt die Krone, Brücke oder Prothese." },
        { no: "C", title: "Sichtbarer Zahn", text: "Krone, Brücke oder Prothese aus dem eigenen Labor, an Ihre Zahnfarbe angepasst." }
      ];

const faelle = [
        { title: "Ein fehlender Zahn", text: "Ein Einzelzahnimplantat mit Krone. Der große Vorteil gegenüber einer Brücke: die Nachbarzähne bleiben unangetastet und müssen nicht beschliffen werden." },
        { title: "Mehrere fehlende Zähne", text: "Mehrere Implantate tragen eine Brücke und schließen die Lücke, ohne dass gesunde Zähne als Pfeiler herhalten müssen." },
        { title: "Größere Lücken und lockerer Zahnersatz", text: "Implantatgetragener Zahnersatz gibt einer Prothese festen Halt — sie sitzt, ohne zu wackeln, und belastet den Kiefer gleichmäßiger." }
      ];

const faq = [
        { q: "Tut das Einsetzen weh?", a: "Der Eingriff findet in örtlicher Betäubung statt; Sie spüren Druck, aber keinen Schmerz. Danach kann die Stelle einige Tage empfindlich sein — was Sie dagegen nehmen können, besprechen wir vorher." },
        { q: "Wie lange dauert es, bis der neue Zahn fertig ist?", a: "Mit dem Einheilen im Knochen sind es in der Regel mehrere Monate. Für die Zeit dazwischen gibt es, wenn nötig, ein Provisorium — Sie laufen nicht mit einer Lücke herum." },
        { q: "Ist ein Implantat für mich überhaupt möglich?", a: "Das entscheidet vor allem der Knochen an der betreffenden Stelle. Wir prüfen das im Beratungstermin mit Untersuchung und Röntgenbild und sagen Ihnen offen, wenn eine andere Lösung sinnvoller ist." },
        { q: "Was kostet ein Implantat?", a: "Das hängt von der Zahl der Implantate und der Art des Zahnersatzes ab. Sie bekommen vor jeder Behandlung einen schriftlichen Kostenplan — auch mit der Alternative ohne Implantat, damit Sie vergleichen können." },
        { q: "Übernimmt die Krankenkasse etwas?", a: "Gesetzliche Kassen bezahlen in der Regel einen Festzuschuss für den Zahnersatz, nicht für das Implantat selbst. Was in Ihrem Fall gilt, steht im Kostenplan." },
        { q: "Wie lange hält ein Implantat?", a: "Bei guter Pflege und regelmäßiger Kontrolle viele Jahre. Entscheidend ist das Zahnfleisch rund um das Implantat — deshalb gehört die professionelle Reinigung zur Nachsorge dazu." }
      ];

export default function Implantologie() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 60px" }}>
        <div>
          <div className="ueberzeile">
            Implantologie
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Zahnimplantate
            <br />
            in Potsdam.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Planung, Implantation, Zahnersatz und Nachsorge — alles in derselben Praxis, bei denselben Behandlern, mit dem Zahnlabor eine Tür weiter. Sie müssen für Ihr Implantat nicht zwischen Chirurg, Zahnarzt und Labor pendeln, und niemand schiebt die Verantwortung weiter.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Beratung anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div className="statbar" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        {proof.map((p, pI) => (
          <Fragment key={pI}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", padding: "30px 20px", textAlign: "center", borderLeft: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-sm)", lineHeight: "1", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {p.value}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
                {p.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Der Weg zum Implantat
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Vier Etappen, die Sie vorher kennen.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "62ch", textWrap: "pretty" }}>
          Zwischen dem ersten Gespräch und dem fertigen Zahn liegen mehrere Monate — die meisten davon vergehen, ohne dass Sie etwas tun müssen. So sieht der Ablauf aus.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {ablauf.map((s, sI) => (
          <Fragment key={sI}>
            <div style={{ padding: "32px 28px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {s.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3-sm)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                {s.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Was ein Implantat ist
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 20px" }}>
            Eine künstliche Wurzel, nichts Mystisches.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 22px" }}>
            Ein Implantat ersetzt nicht den ganzen Zahn, sondern zuerst nur seine Wurzel: ein kleiner Körper aus Titan wird im Kieferknochen verankert und wächst dort fest ein. Titan wird auch von empfindlichen Menschen sehr gut vertragen. Darauf kommt der sichtbare Teil — je nach Fall eine Krone, eine Brücke oder eine Prothese.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {aufbau.map((a, aI) => (
              <Fragment key={aI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "5px" }}>
                    {a.no}
                  </span>
                  <div>
                    <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.16", margin: "0 0 6px" }}>
                      {a.title}
                    </h3>
                    <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.6", margin: "0" }}>
                      {a.text}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "600px", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild className="parallax-img" src="/uploads/photos-1786974479454-rmck.jpg" alt="Behandlungsraum mit moderner Technik in der Zahnarztpraxis Groß & Groß in Potsdam" />
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Wann welche Lösung
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Ein Zahn, mehrere Zähne, ganzer Kiefer.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {faelle.map((f, fI) => (
          <Fragment key={fI}>
            <div style={{ padding: "32px 28px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "0 0 12px" }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.64", margin: "0" }}>
                {f.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "520px", margin: "0" }}>
          <Bild className="parallax-img" src="/uploads/scanner-labor.jpg" alt="Digitaler Scanner im praxiseigenen Zahnlabor: Gebissmodell im Scanner, das digitale Kiefermodell auf dem Monitor" />
          <figcaption style={{ position: "absolute", left: "20px", bottom: "18px", display: "flex", gap: "14px", padding: "9px 16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.92)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Digitales Modell · Labor im Haus
          </figcaption>
        </figure>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Der Unterschied
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 20px" }}>
            Implantat und Zahnersatz aus einer Hand.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Der aufwendigste Teil einer Implantatversorgung ist selten die Operation — es ist die Abstimmung danach. Farbe, Form, Biss: Wenn Zahnarzt und Zahntechniker in verschiedenen Häusern sitzen, geht jede Korrektur mit Post und Wartezeit einher.
          </p>
          <p className="fliesstext fliesstext--absatz">
            Bei uns sitzt der Zahntechniker in derselben Praxis. Die Zahnfarbe wird direkt am Stuhl bestimmt, Anpassungen passieren am selben Tag, und Kronen entstehen im 3D-Verfahren mit CAD/CAM-Technologie dort, wo sie auch eingesetzt werden.
          </p>
          <p className="fliesstext">
            Das Modell Ihres Kiefers wird dafür digital eingescannt (Bild links): Aus dem Scan entsteht am Rechner ein exaktes dreidimensionales Abbild, auf dem Krone oder Brücke konstruiert werden — ohne den Umweg über Gipsmodelle, die per Post zwischen Praxis und Fremdlabor reisen.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "24px" }}>
            <Link className="btn btn-secondary knopf-gross" href="/zahnlabor">
              Zum Zahnlabor
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
          Was Patienten vor einem Implantat fragen.
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
          Beratung
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "22ch", color: "#f7f5f0" }}>
          Erst der Befund, dann der Plan.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "54ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Im Beratungstermin klären wir, ob ein Implantat für Sie infrage kommt, welche Alternativen es gibt und was beides kostet — schriftlich, vor jeder Entscheidung. Antwort auf Ihre Anfrage innerhalb von 24 Stunden.
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
