import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild, { VOLL } from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/moderne-technik");

const laser = [
        { title: "Parodontosebehandlung", text: "Der Laser erreicht die entzündeten Zahnfleischtaschen, ohne sie mechanisch aufzuarbeiten." },
        { title: "Keimreduktion", text: "Bakterien werden gezielt reduziert — die Wunde heilt ruhiger und die Schmerzfreiheit hält länger an." },
        { title: "Fissurenversiegelung", text: "Vor allem bei Kindern: die feinen Rillen der Backenzähne werden schonend versiegelt." }
      ];

const digital = [
        { no: "01", title: "Modell einscannen", text: "Das Modell Ihres Kiefers wird digital erfasst. Daraus entsteht am Rechner ein exaktes dreidimensionales Abbild." },
        { no: "02", title: "Am Rechner konstruieren", text: "Krone, Brücke oder Inlay werden auf dem digitalen Modell konstruiert — Passung und Kontaktpunkte lassen sich vorher prüfen." },
        { no: "03", title: "CAD/CAM fertigen", text: "Vollkeramik und Cerkon entstehen im 3D-Verfahren, an Ihre Zahnfarbe angepasst — ohne Gipsversand ans Fremdlabor." }
      ];

const faq = [
        { q: "Tut die Laserbehandlung weh?", a: "Sie ist in der Regel schonender als das klassische Vorgehen. Der Vorteil liegt vor allem danach: weniger Wundschmerz und eine längere Schmerzfreiheit." },
        { q: "Brauche ich beim Laser überhaupt eine Spritze?", a: "Oft genügt weniger Betäubungsmittel als sonst. Ob und wie viel nötig ist, entscheiden wir zusammen mit Ihnen — je nach Eingriff und Ihrer Empfindlichkeit." },
        { q: "Was heißt CAD/CAM für mich als Patient?", a: "Ihr Zahnersatz wird am Rechner konstruiert und im 3D-Verfahren gefertigt, hier im Haus. Das macht die Passung genauer und spart die Wartezeit, die der Versand an ein Fremdlabor kostet." },
        { q: "Wie oft wird geröntgt?", a: "Nur, wenn ein Bild eine Behandlungsentscheidung trägt — etwa bei Weisheitszähnen, vor einem Implantat oder bei tiefer Entzündung. Wir sagen Ihnen vorher, warum." },
        { q: "Kann ich mir die Geräte ansehen?", a: "Ja. Fragen Sie im Termin danach — wir zeigen Ihnen, was bei Ihnen zum Einsatz kommt, und erklären, was es tut." }
      ];

export default function ModerneTechnik() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 60px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Moderne Technik
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Technik, die
            <br />
            Sie merken.
          </h1>
        </div>
        <div>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "0" }}>
            Geräte sind kein Selbstzweck. Wir schaffen an, was für Sie einen Unterschied macht: weniger Wundschmerz, weniger Betäubungsmittel, weniger Termine, genauere Passung. Was Sie hier lesen, steht auch wirklich in unseren Behandlungsräumen — und wir zeigen es Ihnen gern, wenn Sie fragen.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
            <Link className="btn btn-primary" href="/termin" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Termin anfragen
            </Link>
            <a className="btn btn-secondary" href="tel:+49331960926" style={{ padding: "12px 26px", fontSize: "15px" }}>
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div style={{ padding: "80px 64px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Laserbehandlung
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 20px" }}>
            Weniger Wundschmerz, weniger Betäubung.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 20px" }}>
            Wir setzen den Laser dort ein, wo er dem klassischen Instrument voraus ist: in der Parodontosebehandlung, zur Keimreduktion und bei der Fissurenversiegelung. Für Sie heißt das weniger Wundschmerz, eine längere Schmerzfreiheit nach der Behandlung und geringere Mengen an Betäubungsmittel.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {laser.map((l, lI) => (
              <Fragment key={lI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "18px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: "4px" }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.18", margin: "0 0 5px" }}>
                      {l.title}
                    </h3>
                    <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.6", margin: "0" }}>
                      {l.text}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ fontSize: "14px", color: "var(--color-neutral-700)", margin: "20px 0 0" }}>
            Besonders für{" "}
            <Link href="/angstpatienten">
              Angstpatienten
            </Link>{" "}
            und{" "}
            <Link href="/kinderzahnheilkunde">
              Kinder
            </Link>{" "}
            ist die geringere Menge Betäubungsmittel ein echter Gewinn.
          </p>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "620px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild vorrang className="parallax-img" src="/uploads/photos-1786974479454-rmck.jpg" alt="Behandlungsraum mit moderner Ausstattung in der Zahnarztpraxis Groß & Groß Potsdam" style={{ position: "absolute", left: "0", top: "-20%", width: "100%", height: "140%", objectFit: "cover", display: "block" }} />
        </figure>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Digitale Fertigung
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "28ch" }}>
          Vom Scan zum fertigen Zahn — im Haus.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "64ch", textWrap: "pretty" }}>
          Der digitale Weg spart nicht nur Zeit, er ist auch genauer als jede Handarbeit am Gipsmodell allein. Bei uns läuft er komplett in der Praxis ab, weil das Zahnlabor eine Tür weiter liegt.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", margin: "40px 64px 0", borderTop: "1px solid var(--color-divider)" }}>
        {digital.map((d, dI) => (
          <Fragment key={dI}>
            <div style={{ padding: "32px 28px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {d.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {d.title}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                {d.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <figure style={{ position: "relative", overflow: "hidden", height: "560px", margin: "0 64px 96px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-divider)" }}>
        <Bild sizes={VOLL} className="parallax-img" src="/uploads/scanner-labor.jpg" alt="Modellscanner im praxiseigenen Zahnlabor: das Gebissmodell im Gerät, das digitale Kiefermodell auf dem Monitor" style={{ position: "absolute", left: "0", top: "-20%", width: "100%", height: "140%", objectFit: "cover", display: "block" }} />
        <figcaption style={{ position: "absolute", left: "20px", bottom: "18px", padding: "9px 16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.92)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
          Modellscan und digitale Konstruktion · im eigenen Labor
        </figcaption>
      </figure>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "80px 64px" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Diagnostik
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 16px" }}>
            Röntgen, wo es die Entscheidung trägt.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 16px" }}>
            Röntgenbilder machen wir nicht routinemäßig, sondern wenn sie eine Frage beantworten: Wie liegen die Weisheitszähne, reicht der Knochen für ein Implantat, wie tief geht eine Entzündung. Vorher sagen wir Ihnen, warum wir ein Bild brauchen und was wir darauf suchen.
          </p>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Bei Weisheitszähnen zum Beispiel entscheidet die Lage im Kiefer darüber, ob und wie entfernt wird — das sieht man nicht von außen.
          </p>
        </div>
        <div style={{ padding: "80px 64px", borderLeft: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
            Am Behandlungsstuhl
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 16px" }}>
            Monitor, Musik, Kopfhörer.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 16px" }}>
            An unseren Behandlungsplätzen gibt es Monitore. Sie können Musik oder einen Film mitbringen und während der Behandlung hören oder ansehen — für viele Patienten ist genau das der Unterschied zwischen „geht nicht“ und „geht schon“.
          </p>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Dieselben Monitore nutzen wir, um Ihnen zu zeigen, worüber wir sprechen: ein Befund am Bildschirm ist verständlicher als jede Erklärung mit Worten.
          </p>
          <Link className="btn btn-secondary" href="/angstpatienten" style={{ display: "inline-block", marginTop: "24px", padding: "12px 26px", fontSize: "15px" }}>
            Für Angstpatienten
          </Link>
        </div>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Was uns wichtiger ist als Geräte
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Fortbildung, nicht nur Anschaffung.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "56px", margin: "40px 64px 96px", paddingTop: "32px", borderTop: "1px solid var(--color-divider)" }}>
        <blockquote style={{ margin: "0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h4)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
          „Das beste Gerät nützt nichts, wenn niemand weiß, wann man es besser weglässt.“
          <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Chantal Groß, Zahnärztin
          </cite>
        </blockquote>
        <div>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 16px" }}>
            Unser Praxispersonal ist bestens ausgebildet und arbeitet mit den neuesten Techniken — Fortbildungen und Schulungen sind hier selbstverständlich, nicht die Ausnahme. Das gilt für die Behandlung ebenso wie für die zahntechnischen Arbeiten im eigenen Labor.
          </p>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Genauso wichtig ist die Zurückhaltung: Nicht jede Behandlung braucht das neueste Verfahren. Wir sagen Ihnen offen, wenn die einfachere Lösung die bessere ist — auch wenn sie weniger spektakulär klingt.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "26px" }}>
            <Link className="btn btn-secondary" href="/zahnlabor" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Zum eigenen Zahnlabor
            </Link>
            <Link className="btn btn-secondary" href="/praxis-team#team" style={{ padding: "12px 26px", fontSize: "15px" }}>
              Das Team
            </Link>
          </div>
        </div>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
          Häufige Fragen
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "24ch" }}>
          Fragen zur Technik.
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
          Termin
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "22ch", color: "#f7f5f0" }}>
          Lassen Sie es sich zeigen.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "52ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Fragen Sie im Termin einfach nach — wir erklären jedes Gerät, das bei Ihnen zum Einsatz kommt. Antwort auf Ihre Anfrage innerhalb von 24 Stunden.
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
