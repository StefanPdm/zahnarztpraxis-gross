import Link from "next/link";
import { Mrs_Saint_Delafield } from "next/font/google";
import { praxis, schliesstage, sprechzeiten } from "@/lib/praxis";
import { istPraxisFeiertag, KURZTAGE, SONDERZEITEN, TAGNAMEN } from "@/lib/oeffnungsstatus";
import {
  FESTTAGE,
  kalendertag,
  STILLE_ZEIT,
  ZWISCHEN_DEN_JAHREN,
  type Kalendertag,
  type Winterkapitel,
} from "@/lib/winterkapitel";

/*
  „Kapitel 0 · Die stille Zeit" — die dunkle Sektion des Winterkapitels
  direkt unter der Hero (lib/winterkapitel.ts). Nützlich vor schön: wann die
  Praxis zwischen den Jahren offen hat und wer an Feiertagen hilft.

  Die Tabelle rechnet sich selbst aus Sprechzeiten, gesetzlichen Feiertagen
  und Schließtagen (lib/praxis.ts) — nächstes Jahr ohne Änderung richtig.
  Vergangene Tage fallen weg; die Seite wird stündlich neu berechnet.

  Unterschriften: eine Schreibschrift statt echter Signaturen (nachgestellt,
  Auftraggeber 23.11.2026). preload: false — die Datei lädt der Browser erst,
  wenn die Sektion zu sehen ist, also nur im Dezember und Januar.
*/
const handschrift = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", display: "swap", preload: false });

const uhr = (hhmm: string) => hhmm.replace(/^0/, "");
const datumKurz = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", timeZone: "UTC" });

type Zeile = { tag: Kalendertag; name?: string; zeiten: string[] | null };

function zwischenDenJahren(winter: Winterkapitel): Zeile[] {
  const jahr = winter.phase === "advent" ? winter.heute.jahr : winter.heute.jahr - 1;
  const [vonM, vonT] = ZWISCHEN_DEN_JAHREN.von;
  const [bisM, bisT] = ZWISCHEN_DEN_JAHREN.bis;
  const ende = kalendertag(jahr + 1, bisM, bisT).iso;
  const zeilen: Zeile[] = [];
  for (let i = 0; ; i++) {
    const t = kalendertag(jahr, vonM, vonT + i);
    if (t.iso > ende) break;
    if (t.iso < winter.heute.iso && !winter.alles) continue;
    const sonder = SONDERZEITEN[t.iso];
    const plan = sonder?.zeiten ?? sprechzeiten[KURZTAGE[t.wochentag] as keyof typeof sprechzeiten];
    if (!plan) continue; // Wochenende: immer geschlossen, nicht eigens aufgeführt
    const festtag = FESTTAGE[t.iso.slice(5)];
    const name = [festtag, sonder?.hinweis].filter(Boolean).join(" · ") || undefined;
    const zu = istPraxisFeiertag(t.iso) || schliesstage.includes(t.iso);
    zeilen.push({ tag: t, name, zeiten: zu ? null : plan.map(([v, b]) => `${uhr(v)} – ${uhr(b)}`) });
  }
  return zeilen;
}

export default function StilleZeit({ winter }: { winter: Winterkapitel }) {
  const texte = STILLE_ZEIT[winter.phase];
  const zeilen = zwischenDenJahren(winter);

  return (
    // Bewusst ohne data-abschnitt: Die Laufmarke zeigte „Kapitel 0" sonst bis
    // zum Kapitel I, also auch über Zahlen, Fotos und Team.
    // id: Ziel des Winterbands unter der Kopfzeile (components/Winterband).
    <section id="stille-zeit" className="stillezeit" aria-labelledby="stillezeit-titel">
      <span className="stillezeit__ziffer" aria-hidden="true">
        0
      </span>
      <div className="stillezeit__kopf">
        <div className="ueberzeile ueberzeile--hell">{STILLE_ZEIT.kapitel}</div>
        <h2 id="stillezeit-titel" className="stillezeit__titel">
          {texte.titel[0]} <em>{texte.titel[1]}</em>.
        </h2>
        <p className="stillezeit__text">
          {texte.text}
          {winter.phase === "neujahr" && (
            <>
              {" "}
              Bei uns kostet sie {praxis.preisZahnreinigung} €.{" "}
              <Link href="/prophylaxe">Mehr zur Zahnreinigung</Link>
            </>
          )}
        </p>
      </div>

      <div className="stillezeit__spalten">
        {zeilen.length > 0 && (
          <div>
            <div className="ueberzeile ueberzeile--hell">Sprechzeiten zwischen den Jahren</div>
            <table className="stillezeit__tabelle">
              <tbody>
                {zeilen.map((z) => (
                  <tr key={z.tag.iso} className={z.zeiten ? undefined : "ist-zu"}>
                    <th scope="row">
                      {TAGNAMEN[z.tag.wochentag]}, {datumKurz.format(new Date(`${z.tag.iso}T00:00:00Z`))}
                      {z.name && <span className="stillezeit__festtag">{z.name}</span>}
                    </th>
                    <td>
                      {z.zeiten
                        ? z.zeiten.map((zeit) => (
                            <span key={zeit} className="stillezeit__zeit">
                              {zeit}
                            </span>
                          ))
                        : "geschlossen"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="stillezeit__rechts">
          <div className="stillezeit__notdienst">
            <div className="ueberzeile ueberzeile--hell">Wenn wir geschlossen haben</div>
            <p>
              {STILLE_ZEIT.notdienst}{" "}
              <a href="https://www.kzvlb.de/patienten/notdienstsuche" target="_blank" rel="noopener">
                Zur Notdienstsuche
              </a>
              . Bei Atemnot, starker Schwellung oder Kreislaufproblemen: <a href="tel:112">112</a>.
            </p>
          </div>
          <figure className="stillezeit__gruss">
            <blockquote>{STILLE_ZEIT.gruss[winter.phase]}</blockquote>
            <figcaption>
              {STILLE_ZEIT.unterschriften.map((name) => (
                <span key={name} className="stillezeit__unterschrift">
                  <span className={`stillezeit__signatur ${handschrift.className}`} aria-hidden="true">
                    {name}
                  </span>
                  <span className="stillezeit__name">{name}</span>
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
