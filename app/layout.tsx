import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Lora } from "next/font/google";

// Reihenfolge ist nicht optional: zuerst die Tokens, dann die Ergänzungen.
import "./classical.css";
import "./site.css";
import "./bausteine.css";
import "./schriften.css"; // zuletzt: hängt die next/font-Familien in die Tokens

import Kopfzeile from "@/components/Kopfzeile";
import Fusszeile from "@/components/Fusszeile";
import TerminLeiste from "@/components/TerminLeiste";
import ZurueckNachOben from "@/components/ZurueckNachOben";
import ScrollEffekte from "@/components/ScrollEffekte";
import { praxis } from "@/lib/praxis";

/*
  Die drei Familien des Design-Systems, über next/font self-hosted:
  kein Request an Google zur Laufzeit (bei einer Arztpraxis kein Nebenthema)
  und kein Layout-Shift. Die Variablen hängen an <html>, damit --font-heading,
  --font-body und --font-ui in classical.css und site.css weiter greifen.
*/
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-lora",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL(praxis.domain),
  title: {
    default: "Zahnarzt Potsdam Mitte — Zahnarztpraxis Groß & Groß, familiengeführt seit 1991",
    template: "%s",
  },
  description:
    "Familiengeführte Zahnarztpraxis in Potsdam Mitte, seit 1991. Fünf Behandlungszimmer, eigenes Zahnlabor im Haus.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: `Zahnarztpraxis ${praxis.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${lora.variable} ${jost.variable}`}>
      <body>
        <a className="sprunglink" href="#inhalt">
          Zum Inhalt springen
        </a>
        {/*
          Der äußere Rahmen stand bisher in allen 17 Dateien. Er gehört
          genau einmal hierher — siehe docs/arbeitsanweisung-original.md,
          Schritt 3.
        */}
        <div
          style={{
            maxWidth: "1440px",
            margin: "0px auto",
            background: "var(--color-bg)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Kopfzeile />
          {/* tabIndex -1: Ziel für Sprunglink und „Zurück nach oben", ohne Tab-Stopp. */}
          <main id="inhalt" tabIndex={-1}>
            {children}
          </main>
          <Fusszeile />
        </div>
        <TerminLeiste />
        <ZurueckNachOben />
        <ScrollEffekte />
      </body>
    </html>
  );
}
