import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotfallLeiste from "@/components/NotfallLeiste";
import Sprechzeiten from "@/components/Sprechzeiten";
import Fragen from "@/components/Fragen";
import Bild from "@/components/Bild";
import { praxis } from "@/lib/praxis";

/*
  /bausteine — lebende Übersicht des Designsystems. Nur in der Entwicklung
  (`npm run dev`); im Produktions-Build liefert die Route 404.

  Tokens werden bei jedem Aufruf aus den CSS-Dateien gelesen, Bausteine sind
  die echten Komponenten und Klassen. Die Seite kann deshalb nicht veralten:
  sie zeigt immer, was gerade gilt.
*/

export const metadata: Metadata = { title: "Bausteine – Designsystem", robots: { index: false, follow: false } };

function tokens(datei: string, praefix: RegExp) {
  const css = fs.readFileSync(path.join(process.cwd(), "app", datei), "utf8");
  const gefunden = new Map<string, string>();
  for (const [, name, wert] of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    if (praefix.test(name) && !gefunden.has(name)) gefunden.set(name, wert.trim());
  }
  return [...gefunden];
}

const Abschnitt = ({ titel, children }: { titel: string; children: React.ReactNode }) => (
  <section className="abschnitt" style={{ borderBottom: "1px solid var(--color-divider)" }}>
    <div className="ueberzeile">Designsystem</div>
    <h2 className="titel-3">{titel}</h2>
    {children}
  </section>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: "ui-monospace, Consolas, monospace", fontSize: "13px", color: "var(--color-accent-700)" }}>
    {children}
  </code>
);

export default function Bausteine() {
  if (process.env.NODE_ENV === "production") notFound();

  const farben = tokens("classical.css", /^--color-/);
  const schriftgrade = [...tokens("site.css.original", /^--fs-/)];
  const formen = tokens("classical.css", /^--(space|radius|shadow)-/);
  const ebenen = tokens("site.css.original", /^--ebene-/);

  return (
    <>
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">Intern · nur Entwicklung</div>
          <h1 className="seitentitel">Bausteine</h1>
        </div>
        <p className="fliesstext fliesstext--gross">
          Tokens aus <Code>app/classical.css</Code> und <Code>app/site.css.original</Code>, Bausteine aus{" "}
          <Code>app/bausteine.css</Code> und <Code>components/</Code>. Neue Seiten setzen sich aus diesen Teilen
          zusammen — Werte nie als Rohzahl, immer als Token oder Klasse.
        </p>
      </div>

      <Abschnitt titel="Farben">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
          {farben.map(([name, wert]) => (
            <div key={name} style={{ border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <div style={{ height: "56px", background: `var(${name})` }} />
              <div style={{ padding: "8px 10px", fontSize: "12px" }}>
                <Code>{name}</Code>
                <div style={{ color: "var(--color-neutral-700)" }}>{wert}</div>
              </div>
            </div>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt titel="Schriftgrade">
        {schriftgrade.map(([name, wert]) => (
          <div key={name} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid var(--color-divider)" }}>
            <span>
              <Code>{name}</Code>
              <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>{wert}</div>
            </span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: `var(${name})`, lineHeight: 1.1 }}>Zahnmedizin in Potsdam</span>
          </div>
        ))}
      </Abschnitt>

      <Abschnitt titel="Abstände, Radien, Schatten, Ebenen">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px 24px" }}>
          {[...formen, ...ebenen, ["--rand", "64 / 24 / 18 px (Desktop / ≤1000 / ≤640)"]].map(([name, wert]) => (
            <div key={name} style={{ padding: "8px 0", borderBottom: "1px solid var(--color-divider)", fontSize: "13px" }}>
              <Code>{name}</Code> <span style={{ color: "var(--color-neutral-700)" }}>{wert}</span>
            </div>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt titel="Typografie-Klassen">
        <div className="ueberzeile">.ueberzeile</div>
        <h2 className="titel-2 breite-26">.titel-2 — Zahnersatz aus dem eigenen Labor.</h2>
        <h3 className="titel-3">.titel-3 — Was Patienten fragen</h3>
        <h4 className="titel-5">.titel-5 — Tut das weh?</h4>
        <p className="fliesstext fliesstext--absatz" style={{ maxWidth: "62ch", marginTop: "16px" }}>
          .fliesstext — Blocksatz mit Silbentrennung, mobil linksbündig. Planung, Implantation, Zahnersatz und Nachsorge
          in derselben Praxis, bei denselben Behandlern, mit dem Zahnlabor eine Tür weiter.
        </p>
        <p className="text-15">.text-15 — kleinerer Begleittext in Karten und Listen.</p>
      </Abschnitt>

      <Abschnitt titel="Knöpfe">
        <div className="knopfreihe">
          <a className="btn btn-primary knopf-gross" href="#">.btn .btn-primary .knopf-gross</a>
          <a className="btn btn-secondary knopf-gross" href="#">.btn-secondary</a>
        </div>
      </Abschnitt>

      <section>
        <div className="abschnitt"><div className="ueberzeile">Baustein</div><h2 className="titel-3">NotfallLeiste</h2></div>
        <NotfallLeiste />
      </section>

      <section className="abschluss">
        <div className="ueberzeile ueberzeile--hell">.abschluss</div>
        <h2 className="abschluss__titel">Erst der Befund, dann der Plan.</h2>
        <p className="abschluss__text">Dunkles Band am Seitenende. Antwort auf Ihre Anfrage {praxis.antwortzeit}.</p>
        <div className="knopfreihe knopfreihe--mitte">
          <a className="btn knopf-band knopf-band--voll" href="#">.knopf-band--voll</a>
          <a className="btn knopf-band knopf-band--rahmen" href="#">.knopf-band--rahmen</a>
        </div>
      </section>

      <Abschnitt titel="Sprechzeiten (aus lib/praxis.ts)">
        <div style={{ maxWidth: "520px" }}>
          <Sprechzeiten />
        </div>
      </Abschnitt>

      <Abschnitt titel="Bild (next/image, Maße aus lib/bildmasse.json)">
        <div style={{ maxWidth: "520px" }}>
          <Bild className="plate" src="/images/Zahnlabor.jpg" alt="Beispielbild" style={{ width: "100%", height: "auto" }} />
        </div>
      </Abschnitt>

      <section>
        <div className="abschnitt"><div className="ueberzeile">Baustein</div><h2 className="titel-3">Fragen (Liste + FAQPage-JSON-LD)</h2></div>
        <Fragen pfad="/bausteine" eintraege={[{ q: "Beispielfrage?", a: "Beispielantwort — erscheint sichtbar und im JSON-LD." }]} />
      </section>
    </>
  );
}
