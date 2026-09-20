import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import { sprechzeitGruppen, tageKurz, zeitenKurz } from "@/lib/praxis";
import Fragen from "@/components/Fragen";

export const metadata = seitenMetadaten("/zahnschmerzen");

const zeiten = [
  ...sprechzeitGruppen().map((g) => ({ tag: tageKurz(g), zeit: zeitenKurz(g) })),
  { tag: "Notfälle", zeit: "Morgens ab 8:00 anrufen" },
];

const hilft = [
        { title: "Kühlen — von außen", text: "Ein feuchtes, kühles Tuch auf die Wange, mehrmals für einige Minuten. Nicht direkt mit Eis, das reizt die Haut." },
        { title: "Aufrecht bleiben", text: "Im Liegen steigt der Druck im Kopf und der Schmerz nimmt zu. Nachts hilft ein höheres Kopfkissen." },
        { title: "Mit lauwarmem Wasser spülen", text: "Vorsichtig ausspülen, wenn Essensreste in einem Loch oder einer Zahnlücke stecken. Nicht mit hohem Druck." },
        { title: "Schmerzmittel nach Packungsangabe", text: "Ein Mittel, das Sie kennen und verträgt, in der angegebenen Dosis. Sagen Sie uns im Termin, was und wann Sie es genommen haben." }
      ];

const nicht = [
        { title: "Wärme auflegen", text: "Wärmflasche oder Rotlicht können eine Entzündung verstärken und die Schwellung größer machen." },
        { title: "Aspirin bei Blutungen oder vor einem Eingriff", text: "Acetylsalicylsäure hemmt die Blutgerinnung. Bei blutender Wunde oder anstehender Behandlung besser ein anderes Mittel." },
        { title: "Alkohol oder Hausmittel in die Wunde", text: "Hochprozentiges, Nelkenöl direkt aufs Zahnfleisch oder eine Aspirintablette auf den Zahn legen — alles davon verätzt das Gewebe." },
        { title: "Abwarten, bis es von allein aufhört", text: "Wenn der Schmerz nachlässt, ohne dass etwas passiert ist, kann der Nerv abgestorben sein. Die Entzündung läuft dann still weiter." }
      ];

const ursachen = [
        { dringend: "Sofort anrufen", schmerz: "Pochender Dauerschmerz, Schwellung, Fieber", text: "Deutliche Zeichen einer Entzündung, die sich ausbreitet. Hier zählt der gleiche Tag." },
        { dringend: "Sofort anrufen", schmerz: "Zahn abgebrochen oder ausgeschlagen", text: "Bruchstück oder Zahn feucht aufbewahren, am besten in Milch oder Kochsalzlösung, und mitbringen." },
        { dringend: "Heute", schmerz: "Anhaltender Schmerz nach Süßem, Kaltem oder Heißem", text: "Häufig eine tiefe Karies oder ein gereizter Zahnnerv. Wird schnell schlimmer, wenn man wartet." },
        { dringend: "Bald", schmerz: "Kurzes Ziehen bei Kälte, das gleich vorbei ist", text: "Oft freiliegende Zahnhälse oder eine kleine undichte Stelle an einer Füllung. Kein Notfall, aber ein Termin." },
        { dringend: "Bald", schmerz: "Druckgefühl und blutendes Zahnfleisch", text: "Meist eine Zahnfleischentzündung. Wichtig ist, dass daraus keine Parodontitis wird." }
      ];

const ablauf = [
        { no: "01", title: "Schmerz einordnen", text: "Kurzes Gespräch, Untersuchung und, wenn nötig, ein Röntgenbild. Wir sagen Ihnen, was wir sehen und was jetzt ansteht." },
        { no: "02", title: "Schmerz nehmen", text: "In örtlicher Betäubung behandeln wir die Ursache oder verschaffen zunächst Erleichterung, wenn die endgültige Versorgung mehr Zeit braucht." },
        { no: "03", title: "Weiteres besprechen", text: "Erst wenn Sie schmerzfrei sind, reden wir über den Rest — schriftlicher Plan, Alternativen, Kosten. Entscheiden müssen Sie nicht an diesem Tag." }
      ];

const faq = [
        { q: "Ich bin kein Patient bei Ihnen. Kann ich trotzdem kommen?", a: "Ja. Rufen Sie an und sagen Sie, dass Sie akute Schmerzen haben — wir versuchen, Sie noch am gleichen Tag unterzubringen." },
        { q: "Wann rufe ich am besten an?", a: "Morgens ab 8:00. Dann ist der Tag noch nicht verplant und die Chance auf einen Termin am selben Tag am größten." },
        { q: "Was mache ich am Wochenende oder nachts?", a: "Dann hilft die Notdienstsuche der Kassenzahnärztlichen Vereinigung Land Brandenburg unter kzvlb.de. Bei Atemnot, starker Schwellung oder Kreislaufproblemen rufen Sie den Rettungsdienst unter 112." },
        { q: "Der Schmerz ist über Nacht verschwunden. Muss ich noch kommen?", a: "Ja. Wenn Schmerz plötzlich aufhört, ohne dass behandelt wurde, kann der Nerv abgestorben sein — die Entzündung läuft dann ohne Warnsignal weiter." },
        { q: "Mir ist ein Stück Zahn abgebrochen. Was tun?", a: "Bruchstück feucht aufbewahren, am besten in Milch oder Kochsalzlösung, und zum Termin mitbringen. Rufen Sie gleich an, auch wenn es nicht wehtut." },
        { q: "Wird beim Schmerztermin gleich alles gemacht?", a: "Nein. Zuerst geht es darum, dass Sie schmerzfrei sind. Was darüber hinaus nötig ist, besprechen wir danach in Ruhe und mit schriftlichem Kostenplan." }
      ];

export default function Zahnschmerzen() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "56px", alignItems: "center", padding: "70px 64px", background: "#17150f", color: "#f7f5f0" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-400)" }}>
            Akute Zahnschmerzen
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero-sm)", lineHeight: "1.02", letterSpacing: "-0.025em", margin: "20px 0 0", color: "#f7f5f0" }}>
            Rufen Sie an.
            <br />
            Nicht schreiben.
          </h1>
          <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", margin: "22px 0 0", maxWidth: "52ch", color: "rgba(243,242,242,0.78)" }}>
            Bei Schmerzen ist das Telefon der schnellste Weg. Montag bis Freitag halten wir Termine für akute Fälle frei — rufen Sie morgens ab 8:00 an, dann finden wir am ehesten noch einen Platz für denselben Tag. Über das Formular dauert es bis zu 24 Stunden, das ist bei Schmerzen zu lang.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", padding: "34px 36px", border: "1px solid rgba(182,130,53,0.5)", borderRadius: "var(--radius-md)", background: "rgba(247,245,240,0.05)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-400)" }}>
            Direkt anrufen
          </div>
          <a href="tel:+49331960926" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-phone)", lineHeight: "1", letterSpacing: "-0.01em", color: "#f7f5f0", fontFeatureSettings: "'tnum'" }}>
            0331 960926
          </a>
          <div style={{ display: "grid", gap: "10px", paddingTop: "18px", borderTop: "1px solid rgba(182,130,53,0.35)", fontSize: "14.5px", color: "rgba(243,242,242,0.78)" }}>
            {zeiten.map((z, zI) => (
              <Fragment key={zI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px" }}>
                  <span style={{ minWidth: "74px", fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent-400)", paddingTop: "2px" }}>
                    {z.tag}
                  </span>
                  <span style={{ fontFeatureSettings: "'tnum'" }}>
                    {z.zeit}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ fontSize: "13px", lineHeight: "1.55", margin: "6px 0 0", color: "rgba(243,242,242,0.6)" }}>
            Außerhalb der Sprechzeiten: zahnärztlicher Bereitschaftsdienst der{" "}
            <a href="https://www.kzvlb.de/patienten/notdienstsuche" target="_blank" rel="noopener" style={{ color: "var(--color-accent-400)", textDecoration: "underline" }}>
              Kassenzahnärztlichen Vereinigung Land Brandenburg
            </a>
            . Bei Atemnot, starker Schwellung oder Kreislaufproblemen den Rettungsdienst unter 112.
          </p>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Bis zum Termin
        </div>
        <h2 className="titel-2 breite-26">
          Was hilft — und was Sie besser lassen.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px", margin: "40px 64px 96px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "11px", paddingBottom: "14px", borderBottom: "1px solid var(--color-accent-300)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: "400", fontSize: "11.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "0" }}>
              Das hilft
            </h3>
          </div>
          {hilft.map((h, hI) => (
            <Fragment key={hI}>
              <div style={{ padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <h4 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.18", margin: "0 0 6px" }}>
                  {h.title}
                </h4>
                <p className="text-15 text-15--dicht">
                  {h.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "11px", paddingBottom: "14px", borderBottom: "1px solid var(--color-divider)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-700)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: "400", fontSize: "11.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)", margin: "0" }}>
              Das besser nicht
            </h3>
          </div>
          {nicht.map((n, nI) => (
            <Fragment key={nI}>
              <div style={{ padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <h4 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.18", margin: "0 0 6px" }}>
                  {n.title}
                </h4>
                <p className="text-15 text-15--dicht">
                  {n.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Woran es liegen kann
          </div>
          <h2 className="titel-2 titel-2--luft">
            Der Schmerz sagt etwas über die Ursache.
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0 0 24px" }}>
            Wie ein Zahn wehtut, ist ein Hinweis — keine Diagnose. Die stellen wir im Termin. Für Ihre Einschätzung, wie dringend es ist, hilft die Unterscheidung aber weiter.
          </p>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)" }}>
            {ursachen.map((u, uI) => (
              <Fragment key={uI}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "20px", padding: "20px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ minWidth: "118px", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingTop: "5px", whiteSpace: "nowrap" }}>
                    {u.dringend}
                  </span>
                  <div>
                    <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h5)", lineHeight: "1.18", margin: "0 0 6px" }}>
                      {u.schmerz}
                    </h3>
                    <p className="text-15 text-15--dicht">
                      {u.text}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "540px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild src="/uploads/behandlungszimmer-bereit-zahnarztpraxis-potsdam.jpg" alt="Vorbereitetes Behandlungszimmer in der Zahnarztpraxis Groß & Groß in Potsdam" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </figure>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Im Termin
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "28ch" }}>
          Zuerst der Schmerz, dann der Rest.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "64ch", textWrap: "pretty" }}>
          Ein Schmerztermin ist kein Sanierungstermin. Wir bringen Sie aus den Schmerzen heraus und besprechen danach in Ruhe, was langfristig zu tun ist — mit schriftlichem Kostenplan, nicht unter Druck.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", margin: "40px 64px 96px", borderTop: "1px solid var(--color-divider)" }}>
        {ablauf.map((a, aI) => (
          <Fragment key={aI}>
            <div style={{ padding: "32px 28px 34px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {a.no}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3)", lineHeight: "1.14", margin: "14px 0 10px" }}>
                {a.title}
              </h3>
              <p className="text-15">
                {a.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="abschnitt">
          <div className="ueberzeile">
            Auch wenn Sie Angst haben
          </div>
          <h2 className="titel-3">
            Kommen Sie trotzdem.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Viele, die uns mit akuten Schmerzen anrufen, waren jahrelang nicht beim Zahnarzt. Wir fragen nicht, warum, und kommentieren den Zustand nicht. Sagen Sie am Telefon, dass Sie Angst haben — dann planen wir mehr Zeit ein und erklären jeden Schritt vorher.
          </p>
          <p className="fliesstext">
            Das Handzeichen gilt auch im Schmerztermin: Hand heben, und wir unterbrechen sofort.
          </p>
          <Link className="btn btn-secondary" href="/angstpatienten" style={{ display: "inline-block", marginTop: "24px", padding: "12px 26px", fontSize: "15px" }}>
            Für Angstpatienten
          </Link>
        </div>
        <div className="abschnitt abschnitt--linie">
          <div className="ueberzeile">
            Danach
          </div>
          <h2 className="titel-3">
            Damit es nicht wiederkommt.
          </h2>
          <p className="fliesstext fliesstext--absatz">
            Akute Schmerzen sind fast immer das Ende einer längeren Entwicklung. Wenn der Schmerz weg ist, lohnt der Blick auf den Rest: eine professionelle Zahnreinigung, der Zustand des Zahnfleischs, und ein Kontrollrhythmus, der zu Ihrem Risiko passt.
          </p>
          <p className="fliesstext">
            Der zweite Termin ist der, der die nächsten Schmerzen verhindert.
          </p>
          <Link className="btn btn-secondary" href="/prophylaxe" style={{ display: "inline-block", marginTop: "24px", padding: "12px 26px", fontSize: "15px" }}>
            Zur Prophylaxe
          </Link>
        </div>
      </div>
      <div className="abschnitt-oben">
        <div className="ueberzeile">
          Häufige Fragen
        </div>
        <h2 className="titel-2 breite-24">
          Fragen bei akuten Schmerzen.
        </h2>
      </div>
      <Fragen eintraege={faq} pfad="/zahnschmerzen" />
      <div className="abschluss">
        <div className="ueberzeile ueberzeile--hell">
          Jetzt
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "20ch", color: "#f7f5f0" }}>
          Warten macht es nicht besser.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "50ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Ein Zahn, der wehtut, heilt nicht von allein. Rufen Sie an — auch wenn Sie noch nie bei uns waren.
        </p>
        <div className="knopfreihe knopfreihe--mitte">
          <a className="btn" href="tel:+49331960926" style={{ padding: "15px 38px", fontSize: "var(--fs-body)", border: "1px solid var(--color-accent-400)", color: "#17150f", background: "var(--color-accent-400)", fontFeatureSettings: "'tnum'" }}>
            0331 960926
          </a>
          <Link className="btn knopf-band knopf-band--rahmen" href="/anfahrt-parken">
            So finden Sie uns
          </Link>
        </div>
      </div>
    </>
  );
}
