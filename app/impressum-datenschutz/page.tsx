import { Fragment } from "react";
import Link from "next/link";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/impressum-datenschutz");

const haftung = [
        { title: "Inhalte", text: "Für eigene Inhalte auf diesen Seiten sind wir als Diensteanbieter nach den allgemeinen Gesetzen verantwortlich. Trotz sorgfältiger Kontrolle können wir keine Gewähr für Aktualität und Vollständigkeit übernehmen. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Inhalte umgehend." },
        { title: "Externe Links", text: "Unser Angebot enthält Links zu Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar; eine dauerhafte Kontrolle ist ohne konkreten Anlass nicht zumutbar." },
        { title: "Urheberrecht", text: "Texte, Bilder und Gestaltung dieser Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen unserer schriftlichen Zustimmung. Downloads sind für den privaten, nicht kommerziellen Gebrauch gestattet." }
      ];

const datenschutz = [
        { no: "01", title: "Verantwortliche Stelle", text: "Verantwortlich für die Datenverarbeitung auf dieser Website ist die Zahnärztliche Gemeinschaftspraxis Chantal Groß und Matthias Groß, Schopenhauerstraße 37, 14467 Potsdam. Sie erreichen uns telefonisch unter 0331 / 96 09 26 oder per E-Mail." },
        { no: "02", title: "Terminanfrage & Kontaktformular", text: "Ihre Angaben aus dem Formular — Name, Kontaktdaten, Wunschtermin und Ihr Anliegen — speichern wir zur Bearbeitung der Anfrage und für mögliche Anschlussfragen. Rechtsgrundlage ist Ihre Einwilligung sowie die Anbahnung des Behandlungsvertrags. Wir geben diese Daten nicht an Dritte weiter." },
        { no: "03", title: "Gesundheitsdaten", text: "Angaben zu Beschwerden, Medikamenten oder Ängsten sind besonders schützenswert. Bitte senden Sie nur, was für die Terminvergabe nötig ist; Details klären wir im Gespräch. In der Praxis unterliegen Ihre Behandlungsdaten der zahnärztlichen Schweigepflicht und den gesetzlichen Aufbewahrungsfristen." },
        { no: "04", title: "Server-Logdateien", text: "Unser Hoster erhebt automatisch Zugriffsdaten wie Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit und gekürzte IP-Adresse. Diese Daten dienen dem sicheren, störungsfreien Betrieb und werden nicht mit anderen Datenquellen zusammengeführt." },
        { no: "05", title: "Cookies", text: "Technisch notwendige Cookies ermöglichen den Betrieb der Seite und werden nach Ihrem Besuch gelöscht. Cookies für Statistik oder eingebettete Karten setzen wir nur mit Ihrer Einwilligung; Sie können diese jederzeit widerrufen und Cookies in Ihrem Browser blockieren oder löschen." },
        { no: "06", title: "Kartenanbieter", text: "Für die Anfahrt kann eine Kartendarstellung eines externen Anbieters eingebettet sein. Dabei wird Ihre IP-Adresse an dessen Server übertragen. Die Karte lädt erst, wenn Sie sie ausdrücklich aktivieren." },
        { no: "07", title: "SSL-Verschlüsselung", text: "Diese Seite überträgt Daten verschlüsselt. Eine gesicherte Verbindung erkennen Sie am „https://“ in der Adresszeile und am Schloss-Symbol Ihres Browsers." },
        { no: "08", title: "Ihre Rechte", text: "Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, deren Herkunft und Zweck, sowie auf Berichtigung, Einschränkung, Löschung und Datenübertragbarkeit. Zudem können Sie sich bei der zuständigen Aufsichtsbehörde beschweren. Der Nutzung unserer Kontaktdaten für unverlangte Werbung widersprechen wir ausdrücklich." }
      ];

export default function ImpressumDatenschutz() {
  return (
    <>
      <NotfallLeiste />
      <div style={{ padding: "96px 64px 56px", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="ueberzeile">
          Rechtliches
        </div>
        <h1 style={{ fontWeight: "400", fontSize: "var(--fs-hero)", lineHeight: "1.0", letterSpacing: "-0.025em", margin: "22px 0 0" }}>
          Impressum &amp;
          <br />
          Datenschutz
        </h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ padding: "70px 64px" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h3-xl)", margin: "0 0 24px" }}>
            Impressum
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px 28px", fontSize: "15px", color: "var(--color-neutral-800)" }}>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Praxis
            </span>
            <span>
              Chantal Groß | Matthias Groß
              <br />
              Zahnärztliche Gemeinschaftspraxis
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Anschrift
            </span>
            <span>
              Schopenhauerstraße 37
              <br />
              14467 Potsdam
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Telefon
            </span>
            <span style={{ fontFeatureSettings: "'tnum'" }}>
              <a href="tel:+49331960926">
                0331 / 96 09 26
              </a>
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Telefax
            </span>
            <span style={{ fontFeatureSettings: "'tnum'" }}>
              0331 / 58 11 32 30
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              E-Mail
            </span>
            <span>
              <a href="mailto:zahnarztgross.gross@outlook.de">
                zahnarztgross.gross@outlook.de
              </a>
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Berufsbezeichnung
            </span>
            <span>
              Zahnärztin / Zahnarzt, verliehen in der Bundesrepublik Deutschland
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Kammer
            </span>
            <span>
              Landeszahnärztekammer Brandenburg
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Aufsicht
            </span>
            <span>
              Kassenzahnärztliche Vereinigung Land Brandenburg
            </span>
            <span style={{ color: "var(--color-neutral-700)" }}>
              Verantwortlich
            </span>
            <span>
              Chantal Groß und Matthias Groß, Anschrift wie oben
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--color-neutral-700)", marginTop: "26px", maxWidth: "52ch" }}>
            Platzhalter zur Prüfung: Kammer, Aufsichtsbehörde, Berufsordnung und Umsatzsteuer-ID bitte vor Veröffentlichung durch die Praxis bestätigen lassen.
          </p>
        </div>
        <div style={{ padding: "70px 64px", borderLeft: "1px solid var(--color-divider)" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h3-xl)", margin: "0 0 24px" }}>
            Haftung &amp; Urheberrecht
          </h2>
          {haftung.map((h, hI) => (
            <Fragment key={hI}>
              <div style={{ borderTop: "1px solid var(--color-divider)", padding: "18px 0 0", marginBottom: "18px" }}>
                <h3 style={{ fontWeight: "400", fontSize: "20px", margin: "0 0 8px" }}>
                  {h.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.62", color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto", margin: "0" }}>
                  {h.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div id="datenschutz" style={{ padding: "80px 64px", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "end", marginBottom: "52px" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", lineHeight: "1.08", margin: "0" }}>
            Datenschutzerklärung
          </h2>
          <p style={{ textAlign: "justify", hyphens: "auto", color: "var(--color-neutral-800)", margin: "0" }}>
            Als Zahnarztpraxis arbeiten wir täglich mit sensiblen Daten. Auf dieser Website erheben wir so wenig wie möglich: Sie können sie nutzen, ohne personenbezogene Daten anzugeben. Nur wenn Sie uns eine Terminanfrage senden, verarbeiten wir Ihre Angaben — ausschließlich dafür.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "44px 72px" }}>
          {datenschutz.map((d, dI) => (
            <Fragment key={dI}>
              <div style={{ borderTop: "1px solid var(--color-accent-300)", paddingTop: "18px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "13px", letterSpacing: "0.14em", color: "var(--color-accent-700)", fontFeatureSettings: "'tnum'" }}>
                  {d.no}
                </div>
                <h3 style={{ fontWeight: "400", fontSize: "var(--fs-h4)", margin: "10px 0 10px" }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.62", color: "var(--color-neutral-800)", textAlign: "justify", hyphens: "auto", margin: "0" }}>
                  {d.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-neutral-700)", margin: "44px 0 0", maxWidth: "70ch" }}>
          Stand dieser Erklärung: Entwurf. Vor der Veröffentlichung sollte ein Datenschutzbeauftragter oder eine Anwaltskanzlei den Text auf die tatsächlich eingesetzten Dienste (Hosting, Karten, Statistik, Terminsystem) abstimmen.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "56px", alignItems: "center", padding: "70px 64px", borderBottom: "1px solid var(--color-divider)" }}>
        <div>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2-sm)", lineHeight: "1.1", margin: "0 0 12px" }}>
            Fragen zu Ihren Daten?
          </h2>
          <p style={{ color: "var(--color-neutral-800)", margin: "0", maxWidth: "60ch" }}>
            Auskunft, Berichtigung oder Löschung: eine kurze Nachricht an die Praxis genügt.
          </p>
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          <a className="btn btn-secondary" href="mailto:zahnarztgross.gross@outlook.de" style={{ padding: "12px 26px", fontSize: "15px" }}>
            E-Mail schreiben
          </a>
          <Link className="btn btn-primary" href="/kontakt" style={{ padding: "12px 26px", fontSize: "15px" }}>
            Kontakt
          </Link>
        </div>
      </div>
    </>
  );
}
