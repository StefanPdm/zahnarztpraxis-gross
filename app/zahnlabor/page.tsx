import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild, { VOLL } from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";
import Fragen from "@/components/Fragen";

export const metadata = seitenMetadaten("/zahnlabor");

const proof = [
        { value: "Im Haus", label: "Zahntechniker in der Praxis" },
        { value: "Vor Ort", label: "Zahnfarbe am Behandlungsstuhl" },
        { value: "CAD/CAM", label: "Kronen im 3D-Verfahren" },
        { value: "1991", label: "Familiengeführt in Potsdam Mitte" }
      ];

const vorteile = [
        { no: "01", title: "Kurze Wege", text: "Kein Postweg, kein Fremdlabor, keine Wartezeit dazwischen. Ihr Zahnersatz entsteht in demselben Haus, in dem er eingesetzt wird." },
        { no: "02", title: "Zahnfarbe direkt vor Ort", text: "Der Techniker bestimmt die Farbe an Ihrem Zahn, im gleichen Licht — nicht nach einer Notiz und einem Farbschlüssel-Code auf dem Auftragszettel." },
        { no: "03", title: "Korrekturen ohne Umwege", text: "Sitzt eine Krone einen Hauch zu hoch, wird sie angepasst, während Sie da sind. Sonst wären dafür ein weiterer Termin und eine Woche Wartezeit fällig." },
        { no: "04", title: "Direkte Abstimmung", text: "Zahnärztin und Zahntechniker sprechen über Ihren Fall, nicht über ein Formular. Bei aufwendigen Versorgungen ist das der Unterschied zwischen passend und wirklich passend." }
      ];

const arbeiten = [
        { title: "Kronen", text: "Vollkeramik oder Cerkon, im 3D-Verfahren mit CAD/CAM gefertigt und an Ihre Zahnfarbe angepasst." },
        { title: "Brücken", text: "Festsitzender Ersatz für Lücken, passgenau an Pfeilerzähne und Zahnfleischform gearbeitet." },
        { title: "Inlays", text: "Keramik-Inlays nach Präzisionsabdruck — die ästhetische Alternative zur alten Amalgamfüllung." },
        { title: "Veneers", text: "Dünne Verblendungen für die Frontzähne, wenn Form oder Farbe verbessert werden sollen." },
        { title: "Prothesen", text: "Von der Interimsprothese bis zur endgültigen Versorgung, inklusive Anpassungen und Reparaturen." },
        { title: "Implantatgetragener Zahnersatz", text: "Kronen, Brücken und Prothesen auf Implantaten — geplant zusammen mit der Implantation." },
        { title: "Schienen", text: "Knirscherschienen bei Bruxismus, individuell angepasst und im Haus nachgearbeitet." },
        { title: "Provisorien", text: "Mittels Tiefziehschienen gefertigt, damit Sie in der Zwischenzeit nicht mit einer Lücke leben müssen." }
      ];

const faq = [
        { q: "Merke ich als Patient überhaupt einen Unterschied?", a: "Vor allem bei Terminen und Korrekturen. Anpassungen passieren oft im laufenden Termin statt in einer zweiten Sitzung Wochen später — und bei der Farbe stimmt das Ergebnis häufiger auf Anhieb." },
        { q: "Wird mein Zahnersatz wirklich hier gefertigt?", a: "Ja, das Labor ist Teil der Praxis. Sie können sich die Arbeitsschritte zeigen lassen, wenn Sie möchten." },
        { q: "Wie lange dauert eine Krone?", a: "Das hängt vom Fall ab. Wichtiger ist: die Zwischenzeit überbrücken wir mit einem Provisorium, und für Anpassungen brauchen wir keine Versandwoche." },
        { q: "Kann ich mir Materialien vorher ansehen?", a: "Im Beratungstermin zeigen wir Ihnen Muster und erklären die Unterschiede zwischen den Materialien — auch preislich, im schriftlichen Kostenplan." },
        { q: "Was kostet Zahnersatz aus dem eigenen Labor?", a: "Sie erhalten vor jeder Behandlung einen Kostenplan mit dem Kassenzuschuss und Ihrem Eigenanteil. Wenn es eine günstigere Alternative gibt, steht sie mit darin." }
      ];

export default function Zahnlabor() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Eigenes Zahnlabor
          </div>
          <h1 className="seitentitel">
            Zahnarzt und
            <br />
            Zahntechniker
            <br />
            unter einem Dach.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            In den meisten Praxen wandert Ihr Zahnersatz per Post in ein Fremdlabor und Wochen später zurück. Bei uns geht er eine Tür weiter. Der Zahntechniker arbeitet im Haus — er kann Sie sehen, Ihre Zahnfarbe im Tageslicht bestimmen und eine Korrektur machen, während Sie im Stuhl sitzen.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Beratung anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <figure style={{ position: "relative", overflow: "hidden", height: "620px", margin: "0", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <Bild sizes={VOLL} vorrang className="parallax-img" src="/images/Zahnlabor.jpg" alt="Arbeitsplatz im praxiseigenen Zahnlabor: Gipsmodelle, Zahnfarbmuster und Werkzeug unter der Arbeitsleuchte" />
        <figcaption style={{ position: "absolute", left: "24px", bottom: "20px", display: "flex", gap: "14px", padding: "10px 18px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.92)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
          Der Labortisch · eine Tür neben dem Behandlungszimmer
        </figcaption>
      </figure>
      <div className="statbar" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid var(--color-divider)" }}>
        {proof.map((p, pI) => (
          <Fragment key={pI}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", padding: "30px 20px", textAlign: "center", borderLeft: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3-xl)", lineHeight: "1.1", color: "var(--color-accent-700)" }}>
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
          Was das für Sie ändert
        </div>
        <h2 className="titel-2 breite-26">
          Kurze Wege, direkte Abstimmung.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {vorteile.map((v, vI) => (
          <Fragment key={vI}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "26px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'", paddingTop: "5px" }}>
                {v.no}
              </span>
              <div>
                <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "0 0 8px" }}>
                  {v.title}
                </h3>
                <p className="text-15">
                  {v.text}
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Handwerk und Digitaltechnik
          </div>
          <h2 className="titel-2 titel-2--luft">
            Gips und CAD/CAM, je nach Fall.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Manches lässt sich am Bildschirm besser lösen, manches nur mit der Hand. Kronen aus Vollkeramik oder Cerkon entstehen im 3D-Verfahren mit CAD/CAM-Technologie und werden an Ihre Zahnfarbe angepasst — so genau, dass man den überkronten Zahn nicht vom eigenen unterscheidet.
          </p>
          <p className="fliesstext fliesstext--absatz">
            Daneben bleibt das klassische Handwerk im Einsatz: Präzisionsabformungen und Modellherstellung, die Präparation von Zähnen für Keramikverblendkronen und Keramikverblendbrücken, Interimsprothesen, Schienen und Provisorien mittels Tiefziehschienen. Für die digitale Strecke wird das Modell eingescannt und der Zahnersatz am Rechner konstruiert.
          </p>
          <p className="fliesstext fliesstext--absatz">
            Dahinter steht ein bestens ausgebildetes Praxisteam, das mit den neuesten Techniken arbeitet — Fortbildungen und Schulungen sind hier selbstverständlich, nicht die Ausnahme.
          </p>
          <blockquote style={{ margin: "28px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Zahnärztliche Leistungen von höchster Qualität bieten wir Ihnen auch beim Zahnersatz und bei aufwendigen zahntechnischen Versorgungen.“
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Chantal Groß, Zahnärztin
            </cite>
          </blockquote>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "620px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          {/* Kein Parallax-Rahmen: Der zeigt das Bild auf 140 % Höhe und
              nähme 43 % der Breite weg — Monitor und Scanner stünden nur
              noch halb im Bild. So füllt es den Rahmen und bleibt ganz. */}
          <Bild sizes="(max-width: 1000px) 100vw, 50vw" src="/images/zahnlabor-modellscanner-zahnarztpraxis-potsdam.jpg" alt="Modellscanner im Zahnlabor mit dem digitalen Kiefermodell auf dem Monitor" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          <figcaption style={{ position: "absolute", left: "20px", bottom: "18px", display: "flex", gap: "14px", padding: "9px 16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.92)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Modellscan · digitale Konstruktion
          </figcaption>
        </figure>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Was hier entsteht
        </div>
        <h2 className="titel-2 breite-26">
          Vom Inlay bis zur ganzen Versorgung.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0 48px", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {arbeiten.map((a, aI) => (
          <Fragment key={aI}>
            <div style={{ padding: "24px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "0 0 7px" }}>
                {a.title}
              </h3>
              <p className="text-15">
                {a.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ position: "relative", overflow: "hidden", minHeight: "480px" }}>
          <Bild className="parallax-img" src="/images/photos-1786974461834-65xv.jpg" alt="Behandlungszimmer mit Arbeitsfläche in der Zahnarztpraxis Groß & Groß Potsdam" />
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Zusammen mit der Implantologie
          </div>
          <h2 className="titel-3">
            Implantat, Zahnersatz, Nachsorge — ein Haus.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Der größte Nutzen entsteht, wenn beides zusammenkommt: Wir setzen das Implantat und fertigen den Zahn darauf im eigenen Labor. Sie müssen nicht zwischen Chirurg, Zahnarzt und Fremdlabor vermitteln, und bei einer Anpassung sitzen alle Beteiligten im selben Haus.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "24px" }}>
            <Link className="btn btn-secondary knopf-gross" href="/implantologie">
              Zu den Implantaten
            </Link>
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Termin anfragen
            </Link>
          </div>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Was Patienten zum Labor fragen.
        </h2>
      </div>
      <Fragen eintraege={faq} pfad="/zahnlabor" />
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Zahnersatz
        </div>
        <h2 className="abschluss__titel">
          Lassen Sie sich zeigen, was möglich ist.
        </h2>
        <p className="abschluss__text abschluss__text--breit">
          Im Beratungstermin sehen Sie Materialien und Farbmuster in der Hand, nicht auf einem Prospekt — und bekommen den Kostenplan schriftlich. Antwort auf Ihre Anfrage innerhalb von 24 Stunden.
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
