import type { Metadata } from "next";
// Relativ, nicht "@/…": next.config.ts lädt diese Datei, und dort gilt der Pfad-Alias nicht.
import { praxis } from "./praxis";

/**
 * Alle Seiten der Website — eine Quelle für Metadaten, Sitemap,
 * Weiterleitungen, llms.txt und Brotkrumen.
 *
 * Regeln für Suchmaschinen:
 *   titel         ≤ 60 Zeichen (Google kürzt danach), Marke am Ende
 *   beschreibung  ≤ 160 Zeichen, nur belegte Aussagen (CLAUDE.md)
 * `npm run pruefen:seo` meldet Verstöße.
 */

export type Seite = {
  pfad: string;
  /** Kurzname für Navigation, Brotkrumen und llms.txt */
  name: string;
  titel: string;
  beschreibung: string;
  /** Rubrik in llms.txt */
  rubrik: "Praxis" | "Behandlungen" | "Besondere Anliegen" | "Service" | "Rechtliches";
};

export const seiten: Seite[] = [
  {
    pfad: "/",
    name: "Startseite",
    rubrik: "Praxis",
    titel: "Zahnarzt in Potsdam Mitte seit 1991 | Groß & Groß",
    beschreibung:
      "Familiengeführte Zahnarztpraxis in Potsdam Mitte seit 1991: Implantologie, ästhetische Zahnmedizin, eigenes Zahnlabor. Behutsam mit Angstpatienten und Kindern.",
  },
  {
    pfad: "/praxis-team",
    name: "Praxis & Team",
    rubrik: "Praxis",
    titel: "Praxis & Team – seit 1991 in Potsdam | Groß & Groß",
    beschreibung:
      "Die Menschen hinter der Praxis: Behandler, Praxisteam und Zahntechnik. Familiengeführt seit 1991, fünf Behandlungszimmer, eigenes Zahnlabor im Haus.",
  },
  {
    pfad: "/angstpatienten",
    name: "Angstpatienten",
    rubrik: "Besondere Anliegen",
    titel: "Zahnarzt für Angstpatienten in Potsdam | Groß & Groß",
    beschreibung:
      "Erster Termin auf Wunsch nur zum Gespräch, vereinbartes Handzeichen, Behandlung in Etappen: Zahnarzt für Angstpatienten in Potsdam Mitte.",
  },
  {
    pfad: "/kinderzahnheilkunde",
    name: "Kinderzahnheilkunde",
    rubrik: "Besondere Anliegen",
    titel: "Kinderzahnarzt in Potsdam | Groß & Groß",
    beschreibung:
      "Kinderzahnheilkunde in Potsdam: erst zeigen, dann erklären, dann behandeln. Behutsames Kennenlernen, Prophylaxe, Fluoridierung, Fissurenversiegelung.",
  },
  {
    pfad: "/leistungen",
    name: "Leistungen",
    rubrik: "Behandlungen",
    titel: "Leistungen der Zahnarztpraxis in Potsdam | Groß & Groß",
    beschreibung:
      "Prophylaxe, Parodontologie, Implantologie, Zahnersatz aus dem eigenen Labor, Ästhetik, Weisheitszähne, Kinder und Angstpatienten – alle Leistungen.",
  },
  {
    pfad: "/zahnschmerzen",
    name: "Zahnschmerzen & Notfall",
    rubrik: "Behandlungen",
    titel: "Zahnschmerzen in Potsdam? Schnell zum Termin | Groß & Groß",
    beschreibung:
      "Akute Zahnschmerzen? Rufen Sie morgens ab 8:00 an – Montag bis Freitag halten wir Notfalltermine frei. Mit Tipps für die Zeit bis zum Termin.",
  },
  {
    pfad: "/prophylaxe",
    name: "Prophylaxe & Zahnreinigung",
    rubrik: "Behandlungen",
    titel: "Professionelle Zahnreinigung in Potsdam | Groß & Groß",
    beschreibung:
      "Professionelle Zahnreinigung und Prophylaxe in Potsdam: Beläge entfernen, Zahnfleisch schützen, Karies vorbeugen – im Rhythmus nach Ihrem Risiko.",
  },
  {
    pfad: "/parodontologie",
    name: "Parodontitis-Behandlung",
    rubrik: "Behandlungen",
    titel: "Parodontitis-Behandlung in Potsdam | Groß & Groß",
    beschreibung:
      "Parodontitis behandeln in Potsdam: Zahnfleischtaschen reinigen, Entzündung stoppen, Knochenabbau aufhalten – mit Laser und festem Recall-Programm.",
  },
  {
    pfad: "/weisheitszaehne-chirurgie",
    name: "Weisheitszähne & Chirurgie",
    rubrik: "Behandlungen",
    titel: "Weisheitszähne entfernen in Potsdam | Groß & Groß",
    beschreibung:
      "Weisheitszähne entfernen in Potsdam: Lage per Röntgenbild bestimmen, Eingriff in örtlicher Betäubung, chirurgische Erfahrung aus der MKG.",
  },
  {
    pfad: "/implantologie",
    name: "Zahnimplantate",
    rubrik: "Behandlungen",
    titel: "Zahnimplantate in Potsdam | Groß & Groß",
    beschreibung:
      "Zahnimplantate in Potsdam: über 1.200 gesetzte Implantate. Planung, Implantation, Zahnersatz und Nachsorge in einer Praxis – mit eigenem Zahnlabor.",
  },
  {
    pfad: "/aesthetische-zahnmedizin",
    name: "Ästhetische Zahnmedizin",
    rubrik: "Behandlungen",
    titel: "Ästhetische Zahnmedizin in Potsdam | Groß & Groß",
    beschreibung:
      "Veneers, Bleaching, Keramik-Inlays und Vollkeramikkronen in Potsdam. Zahnfarbe direkt am Stuhl bestimmt, Arbeiten aus dem eigenen Zahnlabor.",
  },
  {
    pfad: "/zahnlabor",
    name: "Eigenes Zahnlabor",
    rubrik: "Behandlungen",
    titel: "Eigenes Zahnlabor in der Praxis, Potsdam | Groß & Groß",
    beschreibung:
      "Kronen, Brücken, Inlays, Veneers und Prothesen entstehen im Haus. Zahnfarbe und Korrekturen direkt vor Ort – ohne Umweg über ein Fremdlabor.",
  },
  {
    pfad: "/moderne-technik",
    name: "Moderne Technik",
    rubrik: "Behandlungen",
    titel: "Laser & CAD/CAM – moderne Technik, Potsdam | Groß & Groß",
    beschreibung:
      "Laserbehandlung für weniger Wundschmerz, CAD/CAM-Fertigung im eigenen Labor, digitale Modelle, Röntgendiagnostik und Monitore am Behandlungsstuhl.",
  },
  {
    pfad: "/anfahrt-parken",
    name: "Anfahrt & Parken",
    rubrik: "Service",
    titel: "Anfahrt & Parken – Schopenhauerstr. 37 | Groß & Groß",
    beschreibung:
      "Schopenhauerstraße 37, Potsdam. Wichtig: Der Praxiseingang liegt auf der Rückseite des Gebäudes. Anfahrt mit Tram, Bus und Auto, Parken, Zugang.",
  },
  {
    pfad: "/kontakt",
    name: "Kontakt",
    rubrik: "Service",
    titel: "Kontakt & Öffnungszeiten | Zahnarzt Groß & Groß Potsdam",
    beschreibung:
      "Telefon 0331 960926, Öffnungszeiten und Adresse: Schopenhauerstraße 37, Potsdam – Eingang auf der Rückseite. Antwort auf Anfragen innerhalb von 24 Stunden.",
  },
  {
    pfad: "/termin",
    name: "Termin anfragen",
    rubrik: "Service",
    titel: "Termin online anfragen | Zahnarzt Groß & Groß Potsdam",
    beschreibung:
      "Zwei Wunschzeiten senden, Bestätigung innerhalb von 24 Stunden. Auch für Angstpatienten und Kinder – mit extra Zeit im Terminplan.",
  },
  {
    pfad: "/impressum-datenschutz",
    name: "Impressum & Datenschutz",
    rubrik: "Rechtliches",
    titel: "Impressum & Datenschutz | Zahnarztpraxis Groß & Groß",
    beschreibung:
      "Impressum und Datenschutzerklärung der Zahnarztpraxis Groß & Groß, Schopenhauerstraße 37, 14467 Potsdam.",
  },
];

export function seite(pfad: string): Seite {
  const s = seiten.find((x) => x.pfad === pfad);
  if (!s) throw new Error(`lib/seiten.ts: keine Seite ${pfad}`);
  return s;
}

/** Vollständige Metadaten einer Seite: Titel, Beschreibung, kanonische URL, Vorschau für soziale Netze. */
export function seitenMetadaten(pfad: string): Metadata {
  const s = seite(pfad);
  const url = `${praxis.domain}${pfad === "/" ? "" : pfad}`;
  return {
    title: s.titel,
    description: s.beschreibung,
    alternates: { canonical: pfad },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: praxis.vollerName,
      title: s.titel,
      description: s.beschreibung,
      url,
    },
    twitter: { card: "summary_large_image", title: s.titel, description: s.beschreibung },
  };
}
