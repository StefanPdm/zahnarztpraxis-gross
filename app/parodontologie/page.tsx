import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/parodontologie");

const zeichen = [
        "Das Zahnfleisch blutet beim Zähneputzen oder bei der Zahnseide.",
        "Es ist dunkelrot und geschwollen statt blassrosa und fest.",
        "Mundgeruch, der nach dem Putzen zurückkommt.",
        "Die Zähne wirken länger — das Zahnfleisch geht zurück, Zahnhälse liegen frei.",
        "Ein Zahn fühlt sich locker an oder hat seine Stellung leicht verändert.",
        "Empfindliche Zahnhälse bei Kälte, Süßem oder Berührung."
      ];

const ablauf = [
        { no: "01", title: "Befund und Messung", text: "Wir messen die Tiefe der Zahnfleischtaschen an jedem Zahn und beurteilen mit Untersuchung und Röntgenbild, wie weit der Knochen betroffen ist." },
        { no: "02", title: "Vorbehandlung", text: "Zuerst kommen die Beläge oberhalb des Zahnfleischs weg, und Sie erfahren, wie Sie die kritischen Stellen zu Hause erreichen. Ohne diesen Schritt hält das Ergebnis nicht." },
        { no: "03", title: "Taschen reinigen", text: "Die Wurzeloberflächen unterhalb des Zahnfleischsaums werden gereinigt und geglättet, unterstützt durch den Laser zur Keimreduktion. In örtlicher Betäubung, meist in zwei Sitzungen." },
        { no: "04", title: "Kontrolle und Recall", text: "Nach einigen Wochen messen wir erneut. Danach halten wir das Ergebnis über ein festes Recall-Programm mit kurzen Abständen." }
      ];

const faq = [
        { q: "Woran merke ich, dass ich Parodontitis habe?", a: "Am häufigsten an blutendem Zahnfleisch beim Putzen. Weitere Zeichen sind dunkelrotes, geschwollenes Zahnfleisch, wiederkehrender Mundgeruch, zurückgehendes Zahnfleisch und im späteren Verlauf lockere Zähne." },
        { q: "Tut die Behandlung weh?", a: "Die Reinigung der Taschen findet in örtlicher Betäubung statt. Danach kann das Zahnfleisch einige Tage empfindlich sein — durch den Laser fällt der Wundschmerz in der Regel geringer aus." },
        { q: "Wie viele Termine brauche ich?", a: "Meist Befund, Vorbehandlung, zwei Sitzungen für die Taschenreinigung und eine Kontrolle nach einigen Wochen. Danach folgt das Recall-Programm dauerhaft." },
        { q: "Zahlt die Krankenkasse die Parodontitis-Behandlung?", a: "Die Parodontitis-Therapie ist bei entsprechendem Befund eine Leistung der gesetzlichen Krankenkassen; einzelne Zusatzleistungen können privat sein. Sie bekommen den Plan vorher schriftlich." },
        { q: "Kann der abgebaute Knochen wieder aufgebaut werden?", a: "Verlorener Kieferknochen wächst nicht von selbst zurück. Deshalb ist das Ziel, den Abbau zu stoppen — je früher wir behandeln, desto mehr bleibt erhalten." },
        { q: "Wird Parodontitis wieder auftreten?", a: "Die Bakterien kommen zurück, das ist normal. Mit regelmäßiger Nachsorge und guter Pflege zu Hause bleibt die Erkrankung aber unter Kontrolle." }
      ];

export default function Parodontologie() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Parodontologie
          </div>
          <h1 className="seitentitel">
            Wenn das
            <br />
            Zahnfleisch
            <br />
            blutet.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Parodontitis tut lange nicht weh — das ist ihr Problem. Bakterieller Belag am Zahnfleischsaum verhärtet zu Zahnstein, das Zahnfleisch entzündet sich und blutet, es entstehen Taschen. Unbehandelt baut der Kieferknochen ab, und die Zähne verlieren ihren Halt. Deshalb ist blutendes Zahnfleisch kein Schönheitsfehler, sondern ein Termingrund.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Zahnfleisch prüfen lassen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 64px 96px" }}>
        <div className="ueberzeile">
          Warnzeichen
        </div>
        <h2 className="titel-2 breite-26">
          Sechs Anzeichen, die Sie ernst nehmen sollten.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px", margin: "36px 0 0", borderTop: "1px solid var(--color-divider)" }}>
          {zeichen.map((z, zI) => (
            <Fragment key={zI}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px", padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginTop: "4px" }}>
                  <path d="M12 9v4M12 17h.01M10.3 3.9L2.6 17a1.6 1.6 0 001.4 2.4h16a1.6 1.6 0 001.4-2.4L13.7 3.9a1.6 1.6 0 00-2.8 0z" />
                </svg>
                <span style={{ fontSize: "var(--fs-body)", lineHeight: "1.55", color: "var(--color-neutral-800)" }}>
                  {z}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
        <p style={{ fontSize: "15px", color: "var(--color-neutral-800)", margin: "24px 0 0", maxWidth: "66ch", textWrap: "pretty" }}>
          Eines dieser Zeichen genügt für einen Termin. Je früher wir schauen, desto weniger muss behandelt werden — verlorener Kieferknochen wächst nicht zurück.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Die Behandlung
          </div>
          <h2 className="titel-2 titel-2--luft">
            Taschen reinigen, Entzündung stoppen.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 22px" }}>
            Der Kern der Behandlung ist immer derselbe: die Bakterien müssen aus den Zahnfleischtaschen heraus. Wir reinigen die Wurzeloberflächen unterhalb des Zahnfleischsaums — dort, wo weder Zahnbürste noch normale Reinigung hinkommen — und unterstützen mit dem Laser zur Keimreduktion.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {ablauf.map((a, aI) => (
              <Fragment key={aI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'", paddingTop: "4px" }}>
                    {a.no}
                  </span>
                  <div>
                    <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.16", margin: "0 0 6px" }}>
                      {a.title}
                    </h3>
                    <p className="text-15 text-15--dicht">
                      {a.text}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "640px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild className="parallax-img" src="/uploads/zahnfleischblutung.jpg" alt="Untersuchung des Zahnfleischs mit Mundspiegel: gerötetes, blutendes Zahnfleisch am Zahnfleischsaum" />
          <span className="ai-badge">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG-Kennzeichnung, nichts zu optimieren */}
            <img src="/uploads/ai-generated-badge.svg" alt="KI-generiertes Bild" />
          </span>
        </figure>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Laserunterstützt
          </div>
          <h2 className="titel-3">
            Weniger Wundschmerz, weniger Betäubung.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Der Laser erreicht die entzündeten Taschen und reduziert die Bakterien dort gezielt, ohne sie mechanisch aufzuarbeiten. Für Sie heißt das weniger Wundschmerz, eine längere Schmerzfreiheit nach dem Termin und geringere Mengen an Betäubungsmittel.
          </p>
          <p className="fliesstext">
            Gerade wenn Sie ungern zum Zahnarzt gehen, ist das ein Unterschied, den man merkt.{" "}
            <Link href="/moderne-technik">
              Mehr zur Lasertechnik
            </Link>
          </p>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Danach
          </div>
          <h2 className="titel-3">
            Parodontitis ist kein Termin, sondern ein Programm.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Die Bakterien kommen zurück — das ist normal. Entscheidend ist, dass sie nicht wieder in die Tiefe gelangen. Deshalb folgt auf die Behandlung ein festes Recall-Programm mit kürzeren Abständen als bei gesundem Zahnfleisch.
          </p>
          <p className="fliesstext">
            Auf Wunsch erinnern wir Sie an jeden Termin — per E-Mail, SMS, Post oder Anruf.{" "}
            <Link href="/prophylaxe">
              Mehr zur Prophylaxe
            </Link>
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "460px", margin: "0" }}>
          <Bild className="parallax-img" src="/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-10-1.jpg" alt="Behandlung am Stuhl mit Assistenz in der Zahnarztpraxis Groß & Groß Potsdam" />
        </figure>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Was auf dem Spiel steht
          </div>
          <h2 className="titel-3">
            Der häufigste Grund für Zahnverlust.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Die meisten Zähne gehen im Erwachsenenalter nicht durch Karies verloren, sondern weil der Knochen, der sie hält, abgebaut wurde. Dieser Abbau verläuft schleichend und schmerzfrei — deshalb kommen viele erst, wenn ein Zahn schon wackelt.
          </p>
          <p className="fliesstext">
            Was verloren ist, ersetzen wir mit Implantaten oder Zahnersatz aus dem eigenen Labor. Besser ist es, bis dahin nicht zu kommen.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Termin anfragen
            </Link>
            <Link className="btn btn-secondary knopf-gross" href="/implantologie">
              Zu den Implantaten
            </Link>
          </div>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Fragen zur Parodontitis.
        </h2>
      </div>
      <div className="fragen">
        {faq.map((f, fI) => (
          <Fragment key={fI}>
            <div className="frage">
              <h3 className="titel-5">
                {f.q}
              </h3>
              <p className="frage__antwort">
                {f.a}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Termin
        </div>
        <h2 className="abschluss__titel">
          Je früher, desto weniger.
        </h2>
        <p className="abschluss__text abschluss__text--breit">
          Lassen Sie Ihr Zahnfleisch anschauen, bevor Taschen entstehen. Senden Sie zwei Wunschzeiten — wir bestätigen innerhalb von 24 Stunden.
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
