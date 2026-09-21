import Link from "next/link";
import { praxis } from "@/lib/praxis";

/* Fußzeile — Markup 1:1 aus layout/footer.html.
   Telefon, Adresse und Jahreszahl standen hier fest im Text und gingen bei
   einer Änderung in lib/praxis.ts nicht mit. Jetzt lesen sie von dort. */

export default function Fusszeile() {
  return (
      <footer style={{ borderTop: "1px solid var(--color-divider)", padding: "64px 64px 0px", fontSize: "14px", lineHeight: "1.7", color: "var(--color-neutral-800)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.15fr", gap: "40px 48px" }}>
          <div>
            <span style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-ui)", fontWeight: "500", fontSize: "34px", lineHeight: "0.86", color: "var(--color-accent-700)" }}>
              <span style={{ display: "block", transform: "scaleX(-1)", marginRight: "-0.3em" }}>
                G
              </span>
              <span style={{ display: "block", color: "var(--color-text)" }}>
                G
              </span>
            </span>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "21px", letterSpacing: "0.05em", marginTop: "10px", color: "var(--color-text)" }}>
              GROSS &amp; GROSS
            </div>
            <p style={{ margin: "14px 0 0", maxWidth: "36ch" }}>
              Familiengeführte Zahnarztpraxis in Potsdam Mitte, seit 1991. Fünf Behandlungszimmer, eigenes Zahnlabor in der Praxis.
            </p>
            <a href={praxis.telefonHref} style={{ display: "inline-block", marginTop: "18px", fontFamily: "var(--font-heading)", fontSize: "26px", letterSpacing: "0.01em", fontFeatureSettings: "'tnum'" }}>
              {praxis.telefon}
            </a>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neutral-700)", marginTop: "6px" }}>
              Rückmeldung {praxis.antwortzeit}
            </div>
          </div>
          {/* Echte Liste statt einer Reihe von Links: Der Screenreader kündigt
              damit „Liste mit fünf Einträgen" an. Die Optik trägt .fussliste
              in bausteine.css, deshalb hier kein Inline-Stil mehr. */}
          <nav aria-label="Praxis">
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "4px" }}>
              Praxis
            </div>
            <ul className="fussliste">
              <li>
                <Link href="/">Startseite</Link>
              </li>
              <li>
                <Link href="/praxis-team">Praxis &amp; Team</Link>
              </li>
              <li>
                <Link href="/moderne-technik">Moderne Technik</Link>
              </li>
              <li>
                <Link href="/anfahrt-parken">Anfahrt &amp; Parken</Link>
              </li>
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Behandlungen">
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "4px" }}>
              Behandlungen
            </div>
            <ul className="fussliste">
              <li>
                <Link href="/prophylaxe">Prophylaxe &amp; Zahnreinigung</Link>
              </li>
              <li>
                <Link href="/parodontologie">Parodontitis-Behandlung</Link>
              </li>
              <li>
                <Link href="/implantologie">Zahnimplantate</Link>
              </li>
              <li>
                <Link href="/aesthetische-zahnmedizin">Ästhetische Zahnmedizin</Link>
              </li>
              <li>
                <Link href="/zahnlabor">Eigenes Zahnlabor</Link>
              </li>
              <li>
                <Link href="/weisheitszaehne-chirurgie">Weisheitszähne &amp; Chirurgie</Link>
              </li>
              <li>
                <Link href="/leistungen">Alle Leistungen</Link>
              </li>
            </ul>
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "4px" }}>
              Besondere Anliegen
            </div>
            <Link href="/zahnschmerzen">
              Akute Zahnschmerzen
            </Link>
            <Link href="/angstpatienten">
              Angstpatienten
            </Link>
            <Link href="/kinderzahnheilkunde">
              Kinderzahnheilkunde
            </Link>
            <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--color-divider)" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: "8px" }}>
                Adresse
              </div>
              {praxis.strasse}
              <br />
              {praxis.ort}
              <br />
              <span style={{ color: "var(--color-neutral-700)" }}>
                {praxis.eingang} · {praxis.zugang}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "14px 32px", marginTop: "52px", padding: "20px 0px 40px", borderTop: "1px solid var(--color-divider)", fontSize: "12.5px", color: "var(--color-neutral-700)" }}>
          <span>
            © {new Date().getFullYear()} {praxis.vollerName}, {praxis.stadt}
          </span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", alignItems: "center" }}>
            <Link href="/impressum-datenschutz">
              Impressum
            </Link>
            <Link href="/impressum-datenschutz#datenschutz">
              Datenschutz
            </Link>
            <Link href="/#termin">
              Termin vereinbaren
            </Link>
          </span>
          <span style={{ color: "var(--color-neutral-700)" }}>
            Konzept und Umsetzung{" "}
            <a className="textlink" href="https://www.heinemann.berlin" target="_blank" rel="noopener" style={{ color: "var(--color-neutral-800)" }}>
              Stefan Heinemann
            </a>
          </span>
        </div>
      </footer>
  );
}
