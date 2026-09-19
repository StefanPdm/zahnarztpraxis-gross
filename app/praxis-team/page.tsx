import { Fragment } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import { team } from "@/lib/team";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/praxis-team");

const zahlen = [
        { value: "1991", label: "Familiengeführt in Potsdam" },
        { value: "5", label: "Behandlungszimmer mit Tageslicht" },
        { value: "1.200+", label: "Gesetzte Implantate" },
        { value: "1", label: "Eigenes Labor im Haus" }
      ];

const personal = [
        { bereich: "Anmeldung", title: "Ihr erster Kontakt", text: "Terminvergabe, Rückfragen zu Kostenplänen und die Recall-Erinnerung per E-Mail, SMS, Post oder Anruf." },
        { bereich: "Prophylaxe", title: "Zahnreinigung und Vorsorge", text: "Professionelle Zahnreinigung, Fluoridierung, Fissurenversiegelung und die Anleitung zur Pflege zu Hause — für Erwachsene und Kinder." },
        { bereich: "Zahntechnik", title: "Das Labor im Haus", text: "Kronen, Brücken, Inlays, Veneers, Prothesen und Schienen entstehen hier. Die Zahnfarbe wird direkt am Behandlungsstuhl bestimmt." }
      ];

const historie = [
        { jahr: "1991", title: "Gründung", text: "Die Praxis nimmt in Potsdam ihre Arbeit auf und bleibt seither in Familienhand. (Gründungsdetails bitte ergänzen.)" },
        { jahr: "····", title: "Zweite Generation", text: "Chantal und Matthias Groß kommen in die Praxis und übernehmen sie später gemeinsam. (Jahre bitte ergänzen.)" },
        { jahr: "····", title: "Eigenes Zahnlabor", text: "Die Zahntechnik zieht in die Praxis — seither entstehen Kronen, Brücken und Prothesen im Haus. (Jahr bitte ergänzen.)" }
      ];

const zertifikate = [
        { title: "Tätigkeitsschwerpunkt Implantologie", wer: "Matthias Groß" },
        { title: "Curriculum Parodontologie (DG PARO)", wer: "Chantal Groß" },
        { title: "Curriculum Kinderzahnheilkunde", wer: "Chantal Groß" },
        { title: "Regelmäßige Fortbildung, rund 60 Stunden im Jahr", wer: "Beide" }
      ];

const raeume = [
        { src: "/uploads/zahnarzt-potsdam-praxis-gross-und-gross-1030x687-1.jpg", alt: "Behandlungszimmer mit Deckenmonitor und Röntgenbild am Bildschirm", no: "I", cap: "Deckenmonitor und Röntgenbild" },
        { src: "/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-10-1.jpg", alt: "Behandlung mit Assistenz am Stuhl in der Zahnarztpraxis Groß & Groß", no: "II", cap: "Behandlung mit Assistenz" },
        { src: "/uploads/dr-zahnarzt-praxis-potsdam-gross-und-gross-1030x687.jpg", alt: "Zahnarzt bei der Untersuchung eines Patienten im Behandlungszimmer", no: "III", cap: "Untersuchung am Stuhl" },
        { src: "/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-5-1-1030x687-1.jpg", alt: "Praxisflur mit beleuchtetem Groß-&-Groß-Logo an der Wand", no: "IV", cap: "Flur, hinter dem Empfang" },
        { src: "/uploads/Zahnlabor.jpg", alt: "Arbeitsplatz im praxiseigenen Zahnlabor", no: "V", cap: "Das Labor, eine Tür weiter" },
        { src: "/uploads/photos-1786974461824-wn8d.jpg", alt: "Behandlungszimmer mit Tageslicht in der Zahnarztpraxis Groß & Groß", no: "VI", cap: "Behandlungszimmer, Südlicht" }
      ];

const verweise = [
        { href: "/angstpatienten", kicker: "Angstpatienten", title: "Erst reden, dann behandeln", text: "Handzeichen, Pausen und ein erster Termin ohne Behandlung." },
        { href: "/kinderzahnheilkunde", kicker: "Kinder", title: "Erst zeigen, dann erklären", text: "Beim ersten Mal wird nur geschaut. Prophylaxe von Anfang an." },
        { href: "/moderne-technik", kicker: "Technik", title: "Laser, CAD/CAM, Röntgen", text: "Was in unseren Räumen steht und was es für Sie ändert." }
      ];

export default function PraxisTeam() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", padding: "96px 64px 56px" }}>
        <div>
          <div className="ueberzeile">
            Praxis &amp; Team
          </div>
          <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
            Familiengeführt
            <br />
            seit 1991.
          </h1>
        </div>
        <div>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "0" }}>
            Eine Praxis, die seit über drei Jahrzehnten in denselben Händen liegt, arbeitet anders als eine, die alle paar Jahre den Betreiber wechselt. Wir kennen viele unserer Patienten über zwei Generationen — und weil Zahnärztin, Zahnarzt und Zahntechniker hier zusammen unter einem Dach arbeiten, entscheidet nicht der Kalender, sondern der Fall.
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
      <div className="statbar" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        {zahlen.map((z, zI) => (
          <Fragment key={zI}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", padding: "30px 20px", textAlign: "center", borderLeft: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-sm)", lineHeight: "1", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {z.value}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
                {z.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      <div id="team" style={{ padding: "96px 64px 0" }}>
        <div className="ueberzeile">
          Ihre Behandler
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Wer Sie behandelt — und woher das Können kommt.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "62ch", textWrap: "pretty" }}>
          Bewegen Sie den Zeiger über ein Porträt, um Studium, Erfahrung und Zertifikate zu sehen.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", margin: "40px 64px 0", paddingBottom: "96px" }}>
        {team.map((m, mI) => (
          <Fragment key={mI}>
            <div>
              <div className="flipcard" tabIndex={0} style={{ position: "relative", height: "520px", borderRadius: "var(--radius-md)", outlineOffset: "4px" }}>
                <div className="fliphint" style={{ position: "absolute", right: "14px", bottom: "14px", zIndex: "2", display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.9)", border: "1px solid var(--color-divider)", fontFamily: "var(--font-ui)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", pointerEvents: "none", transition: "opacity .4s ease" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12a9 9 0 11-3.2-6.9" />
                    <path d="M21 3v5h-5" />
                  </svg>
                  Werdegang
                </div>
                <div className="flipinner" style={{ width: "100%", height: "100%" }}>
                  <div className="flipface portraitframe" style={{ width: "100%", height: "100%" }}>
                    <Bild className="plate portrait" src={m.foto} alt={m.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%", borderRadius: "var(--radius-md)", mixBlendMode: "multiply" }} />
                  </div>
                  <div className="flipface flipback" style={{ border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", background: "linear-gradient(165deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, #ffffff 100%)", padding: "38px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                      Werdegang
                    </div>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h4)", lineHeight: "1.42", margin: "0" }}>
                      {m.werdegang}
                    </p>
                    <div style={{ display: "grid", gap: "0", fontSize: "14px", color: "var(--color-neutral-800)" }}>
                      {m.fakten.map((f, fI) => (
                        <Fragment key={fI}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "18px", borderTop: "1px solid var(--color-divider)", padding: "10px 0" }}>
                            <span style={{ color: "var(--color-neutral-700)" }}>
                              {f.label}
                            </span>
                            <span style={{ textAlign: "right" }}>
                              {f.value}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h3-xl)", margin: "26px 0 6px" }}>
                {m.name}
              </h3>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "11.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent-700)", margin: "0 0 18px" }}>
                {m.rolle}
              </p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h5)", lineHeight: "1.42", color: "var(--color-text)", margin: "0 0 16px" }}>
                {m.zitat}
              </p>
              <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto", margin: "0 0 16px" }}>
                {m.bio}
              </p>
              <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "var(--color-neutral-700)", borderTop: "1px solid var(--color-divider)", paddingTop: "14px", margin: "0" }}>
                {m.schwerpunkte}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ padding: "80px 64px", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="ueberzeile">
          Das Praxisteam
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "28ch" }}>
          Die Menschen, die Sie am Telefon und am Stuhl treffen.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "62ch", textWrap: "pretty" }}>
          Unser Praxispersonal ist bestens ausgebildet und arbeitet mit den neuesten Techniken — Fortbildungen und Schulungen sind hier selbstverständlich, nicht die Ausnahme. Am Empfang, in der Prophylaxe und im Labor.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0 48px", margin: "40px 0 0" }}>
          {personal.map((p, pI) => (
            <Fragment key={pI}>
              <div style={{ borderTop: "1px solid var(--color-accent-300)", padding: "22px 0" }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                  {p.bereich}
                </div>
                <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "10px 0 8px" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                  {p.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="todo" style={{ marginTop: "20px" }}>
          <b>
            Von der Praxis zu ergänzen
          </b>{" "}
          Namen und Funktionen der Mitarbeiterinnen und Mitarbeiter (Vorname genügt), damit an dieser Stelle echte Menschen stehen statt Bereiche — inklusive des Zahntechnikers im Labor. Fotos sind nicht nötig, wirken aber deutlich stärker.
        </div>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div className="ueberzeile">
          Praxisgeschichte
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "24ch" }}>
          Drei Jahrzehnte, eine Familie.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", margin: "40px 64px 0", borderTop: "1px solid var(--color-divider)" }}>
        {historie.map((h, hI) => (
          <Fragment key={hI}>
            <div style={{ padding: "30px 28px 32px 0", borderBottom: "1px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3-xl)", lineHeight: "1", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                {h.jahr}
              </span>
              <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", lineHeight: "1.16", margin: "14px 0 9px" }}>
                {h.title}
              </h3>
              <p style={{ color: "var(--color-neutral-800)", fontSize: "15px", lineHeight: "1.62", margin: "0" }}>
                {h.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div style={{ padding: "34px 64px 96px" }}>
        <div className="todo">
          <b>
            Von der Praxis zu ergänzen
          </b>{" "}
          Die Eckdaten der Praxisgeschichte: Wer hat 1991 gegründet? Wann kamen Chantal und Matthias Groß dazu, wann folgte die Übernahme? Wann entstand das eigene Labor? Diese Angaben ersetzen die Platzhalter oben — die Familientradition ist laut Briefing ein zentrales Vertrauenssignal und gehört belegt, nicht behauptet.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "80px 64px" }}>
          <div className="ueberzeile">
            Fortbildung
          </div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "16px 0 18px" }}>
            Mitgliedschaften und Zertifikate.
          </h2>
          <div style={{ display: "grid", gap: "0", borderTop: "1px solid var(--color-divider)", fontSize: "15px" }}>
            {zertifikate.map((z, zI) => (
              <Fragment key={zI}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", padding: "14px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ color: "var(--color-neutral-800)" }}>
                    {z.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent-700)", whiteSpace: "nowrap" }}>
                    {z.wer}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="todo" style={{ marginTop: "24px" }}>
            <b>
              Zu prüfen
            </b>{" "}
            Bitte die vollständige Liste der Mitgliedschaften und Zertifikate bestätigen oder korrigieren — falsche Verbandsangaben sind berufsrechtlich heikel.
          </div>
        </div>
        <figure style={{ position: "relative", overflow: "hidden", minHeight: "620px", margin: "0", borderLeft: "1px solid var(--color-divider)" }}>
          <Bild className="parallax-img" src="/uploads/photos-1786974461849-vuwz.jpg" alt="Wartebereich der Zahnarztpraxis Groß & Groß in Potsdam" style={{ position: "absolute", left: "0", top: "-20%", width: "100%", height: "140%", objectFit: "cover", display: "block" }} />
        </figure>
      </div>
      <div style={{ padding: "96px 64px 0" }}>
        <div className="ueberzeile">
          Die Räume
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "16px 0 0", maxWidth: "26ch" }}>
          Fünf Behandlungszimmer mit Tageslicht.
        </h2>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "var(--fs-body-lg)", margin: "18px 0 0", maxWidth: "62ch", textWrap: "pretty" }}>
          Die Praxis liegt im Erdgeschoss eines Altbaus, barrierefrei erreichbar. Fünf Behandlungszimmer, ein Wartebereich, in dem man sitzen mag — und das eigene Zahnlabor eine Tür weiter.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", margin: "40px 64px 96px" }}>
        {raeume.map((r, rI) => (
          <Fragment key={rI}>
            <figure style={{ margin: "0" }}>
              <Bild sizes="(max-width: 1000px) 100vw, 30vw" className="plate" src={r.src} alt={r.alt} style={{ display: "block", width: "100%", height: "240px", objectFit: "cover", borderRadius: "var(--radius-md)" }} />
              <figcaption style={{ display: "flex", gap: "12px", padding: "11px 2px 0", fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
                <span style={{ color: "var(--color-accent-700)" }}>
                  {r.no}
                </span>
                <span>
                  {r.cap}
                </span>
              </figcaption>
            </figure>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        {verweise.map((v, vI) => (
          <Fragment key={vI}>
            <a href={v.href} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "44px 40px", borderLeft: "1px solid var(--color-divider)", color: "var(--color-text)", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                {v.kicker}
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3)", lineHeight: "1.16" }}>
                {v.title}
              </span>
              <span style={{ fontSize: "14.5px", lineHeight: "1.6", color: "var(--color-neutral-800)" }}>
                {v.text}
              </span>
            </a>
          </Fragment>
        ))}
      </div>
      <div style={{ padding: "104px 64px", textAlign: "center", background: "#17150f" }}>
        <div className="ueberzeile ueberzeile--hell">
          Termin
        </div>
        <h2 style={{ fontWeight: "400", fontSize: "var(--fs-display)", lineHeight: "1.04", letterSpacing: "-0.03em", margin: "24px auto 0", maxWidth: "22ch", color: "#f7f5f0" }}>
          Lernen Sie uns kennen.
        </h2>
        <p style={{ fontSize: "var(--fs-lead)", lineHeight: "1.6", maxWidth: "52ch", margin: "24px auto 0", color: "rgba(243,242,242,0.72)" }}>
          Senden Sie zwei Wunschzeiten und Ihr Anliegen — wir bestätigen innerhalb von 24 Stunden.
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
