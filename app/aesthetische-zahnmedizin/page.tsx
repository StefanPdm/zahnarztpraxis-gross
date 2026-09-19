import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { seitenMetadaten } from "@/lib/seiten";
import Bild from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/aesthetische-zahnmedizin");

const wege = [
        { title: "Veneers", icon: "M4 6h16v5a8 8 0 01-8 8 8 8 0 01-8-8V6z", text: "Dünne Keramikschalen werden auf die Frontzähne geklebt und korrigieren Form und Farbe. Sie entstehen in unserem eigenen Labor und werden an Ihre Nachbarzähne angeglichen.", fit: "Bei Form, Farbe und kleinen Kanten" },
        { title: "Bleaching", icon: "M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z", text: "Die professionelle Aufhellung hellt eigene Zähne um mehrere Nuancen auf. Kronen und Füllungen bleiben, wie sie sind — deshalb klären wir vorher, ob am Ende alles zusammenpasst.", fit: "Bei nachgedunkelten eigenen Zähnen" },
        { title: "Keramik-Inlays", icon: "M4 7h16M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M9 11h6", text: "Passgenaue Einlagefüllungen aus Keramik nach Präzisionsabdruck, in Form, Kontur und Zahnfarbe angepasst. Die Klebetechnik gibt schwacher Restsubstanz ihre Festigkeit zurück.", fit: "Als Ersatz alter Amalgamfüllungen" },
        { title: "Vollkeramikkronen", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z", text: "Aus Vollkeramik oder Cerkon, im 3D-Verfahren mit CAD/CAM gefertigt. Metallfrei und in der Zahnfarbe so abgestimmt, dass man den überkronten Zahn nicht vom eigenen unterscheidet.", fit: "Wenn keine Füllung mehr hält" }
      ];

const faq = [
        { q: "Sieht man, dass etwas gemacht wurde?", a: "Wenn wir es richtig machen, nicht. Deshalb arbeiten wir mit natürlichen Farben und geben der Form ihre Unregelmäßigkeiten — eine völlig gleichmäßige, sehr weiße Reihe verrät sich sofort." },
        { q: "Wie lange hält ein Veneer?", a: "Bei guter Pflege viele Jahre. Entscheidend sind gesundes Zahnfleisch, regelmäßige Kontrolle und, falls Sie nachts knirschen, eine Schiene — sonst leidet die Keramik." },
        { q: "Wird Ästhetik von der Kasse bezahlt?", a: "In der Regel nicht, weil sie medizinisch nicht notwendig ist. Sie bekommen vorher einen schriftlichen Kostenplan; wo es eine Kassenvariante gibt, steht sie zum Vergleich daneben." },
        { q: "Bleaching oder Veneers — was ist besser?", a: "Das hängt davon ab, was stört. Sind die eigenen Zähne gesund und nur nachgedunkelt, reicht meist das Bleaching. Geht es um Form, Kanten oder einzelne auffällige Zähne, führt Bleaching nicht weiter." },
        { q: "Werden meine Zähne dafür beschliffen?", a: "Für Veneers und Kronen ja, in unterschiedlichem Maß — bei Veneers nur minimal an der Vorderfläche. Wir erklären Ihnen vorher genau, was an Substanz abgetragen wird, denn das ist nicht umkehrbar." },
        { q: "Kann ich mir das Ergebnis vorher ansehen?", a: "Farbmuster und Materialien zeigen wir Ihnen im Beratungstermin in der Hand. Bei größeren Frontzahnarbeiten besprechen wir Form und Farbe zusammen mit dem Zahntechniker, der hier im Haus arbeitet." }
      ];

export default function AesthetischeZahnmedizin() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Ästhetische Zahnmedizin
          </div>
          <h1 className="seitentitel">
            Damit man
            <br />
            nichts sieht.
          </h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross">
            Gute ästhetische Zahnmedizin fällt nicht auf. Kein zu weißes Weiß, keine gleichförmige Reihe — sondern Zähne, die zu Ihrem Gesicht und Ihrem Alter passen und von denen niemand vermutet, dass daran gearbeitet wurde. Material und Technik erlauben heute Ergebnisse, die man als solche nicht erkennt.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/termin">
              Beratung anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href="tel:+49331960926">
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Unsere Haltung
          </div>
          <h2 className="titel-2 titel-2--luft">
            Dezent dosiert, nicht maximal.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Wir raten von dem ab, was auffällt. Ein Frontzahn darf eine Kante haben, die Farbe darf natürlich sein — was zählt, ist dass die Arbeit im Gesicht verschwindet. Deshalb steht am Anfang keine Materialliste, sondern die Frage, was Sie an Ihren Zähnen eigentlich stört und was Sie an ihnen mögen.
          </p>
          <p className="fliesstext">
            Vor jedem Eingriff kommt die Gesundheit: Karies, Zahnfleischentzündungen und lockere Füllungen werden zuerst behandelt. Ästhetik auf kranke Zähne zu setzen hält nicht — weder medizinisch noch optisch.
          </p>
          <blockquote style={{ margin: "32px 0 0", padding: "0 0 0 22px", borderLeft: "1px solid var(--color-accent-300)", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--fs-h5)", lineHeight: "1.45", color: "var(--color-neutral-900)" }}>
            „Das schönste Ergebnis ist das, bei dem niemand fragt, was Sie machen ließen.“
            <cite style={{ display: "block", marginTop: "14px", fontFamily: "var(--font-ui)", fontStyle: "normal", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
              Chantal Groß, Zahnärztin
            </cite>
          </blockquote>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "580px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild vorrang className="parallax-img" src="/uploads/scanner-labor.jpg" alt="Digitales Kiefermodell im Labor der Zahnarztpraxis Groß & Groß in Potsdam" />
          <figcaption style={{ position: "absolute", left: "20px", bottom: "18px", display: "flex", gap: "14px", padding: "9px 16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.92)", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
            Zahnfarbe und Form · im Haus konstruiert
          </figcaption>
        </figure>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Die Möglichkeiten
        </div>
        <h2 className="titel-2 breite-26">
          Vier Wege, je nachdem was stört.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "62ch", textWrap: "pretty" }}>
          Welcher davon in Frage kommt, hängt vom Zustand der Zähne ab — nicht vom Wunsch allein. Im Beratungstermin sagen wir Ihnen offen, was Ihr Fall hergibt.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {wege.map((w, wI) => (
          <Fragment key={wI}>
            <div style={{ padding: "30px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={w.icon} />
                </svg>
                <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "0" }}>
                  {w.title}
                </h3>
              </div>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15.5px", lineHeight: "1.64", margin: "12px 0 0" }}>
                {w.text}
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "14px 0 0" }}>
                {w.fit}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "520px", margin: "0" }}>
          <Bild className="parallax-img" src="/uploads/Zahnlabor.jpg" alt="Zahnfarbmuster und Modelle im praxiseigenen Zahnlabor" />
        </figure>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Warum das hier besser gelingt
          </div>
          <h2 className="titel-2 titel-2--luft">
            Die Zahnfarbe entsteht nicht per Post.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Bei Ästhetik entscheidet die Farbe alles — und Farbe lässt sich nicht auf einem Auftragszettel übermitteln. Sitzt der Zahntechniker im Fremdlabor, arbeitet er nach einem Code und einem Foto. Sitzt er in derselben Praxis, sieht er Ihren Zahn im gleichen Licht wie wir.
          </p>
          <p className="fliesstext">
            Genau das ist bei uns der Fall: Veneers, Keramik-Inlays und Vollkeramikkronen entstehen im eigenen Labor, die Farbe wird am Stuhl bestimmt, und eine Nuance zu hell wird noch am selben Tag korrigiert.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-secondary knopf-gross" href="/zahnlabor">
              Zum eigenen Zahnlabor
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
        <h2 className="titel-2 breite-24">
          Was Patienten zur Ästhetik fragen.
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
          Beratung
        </div>
        <h2 className="abschluss__titel">
          Sagen Sie uns, was Sie stört.
        </h2>
        <p className="abschluss__text abschluss__text--breit">
          Im Beratungstermin schauen wir gemeinsam, was möglich ist und was nicht — mit Farbmustern in der Hand und einem schriftlichen Kostenplan. Antwort auf Ihre Anfrage innerhalb von 24 Stunden.
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
