import Link from "next/link";
import { GrosselinoSpiel } from "@/components/GrosselinoSpiel";
import { kontakt } from "@/lib/kontakt";
import { seite } from "@/lib/seiten";

/*
  Fehlerseite für unbekannte Adressen. Bewusst mit Status 404 statt einer
  Umleitung auf die Startseite: Google wertet pauschale Umleitungen als
  „Soft 404", tote Adressen blieben länger im Index, und kaputte Links
  fielen in der Search Console nicht mehr auf. Alte Adressen, die Besucher
  bringen, bekommen eine gezielte Weiterleitung in next.config.ts.
*/

/** Die Ziele, nach denen die meisten Besucher suchen. Namen aus lib/seiten.ts. */
const WEGE: { pfad: string; hinweis: string }[] = [
  { pfad: "/zahnschmerzen", hinweis: "Notfalltermine Montag bis Freitag" },
  { pfad: "/leistungen", hinweis: "Alle Behandlungen im Überblick" },
  { pfad: "/angstpatienten", hinweis: "Behutsam, in Ihrem Tempo" },
  { pfad: "/kinderzahnheilkunde", hinweis: "Für die Kleinen" },
  { pfad: "/praxis-team", hinweis: "Familiengeführt seit 1991" },
  { pfad: "/anfahrt-parken", hinweis: "Eingang auf der Rückseite" },
];

export default function NichtGefunden() {
  return (
    <>
      <div className="seitenkopf abschnitt--linie-unten">
        <div>
          <div className="ueberzeile">Fehler 404</div>
          <h1 className="seitentitel">Diese Seite gibt es nicht.</h1>
        </div>
        <div>
          <p className="fliesstext fliesstext--gross breite-62">
            Vielleicht hat sich die Adresse geändert. Unten finden Sie die
            häufigsten Ziele. Sie können uns auch einfach anrufen.
          </p>
          <div className="knopfreihe">
            <Link className="btn btn-primary knopf-gross" href="/#termin">
              Termin anfragen
            </Link>
            <a className="btn btn-secondary knopf-gross" href={kontakt.telefonHref}>
              {kontakt.telefon}
            </a>
          </div>
        </div>
      </div>

      <nav className="abschnitt" aria-label="Häufige Ziele">
        <ul className="wegweiser">
          {WEGE.map(({ pfad, hinweis }) => (
            <li key={pfad}>
              <Link className="wegweiser__ziel" href={pfad}>
                <span className="titel-5">{seite(pfad).name}</span>
                <span className="wegweiser__hinweis">{hinweis}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link className="wegweiser__ziel" href="/">
              <span className="titel-5">{seite("/").name}</span>
              <span className="wegweiser__hinweis">Zurück zum Anfang</span>
            </Link>
          </li>
        </ul>
      </nav>

      <GrosselinoSpiel />
    </>
  );
}
