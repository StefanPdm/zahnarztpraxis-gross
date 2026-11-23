import { Mrs_Saint_Delafield } from "next/font/google";
import Link from "next/link";
import Bild from "@/components/Bild";
import TafelTuer from "@/components/TafelTuer";
import TafelnVorschau from "@/components/TafelnVorschau";
import {
  ADVENTSTAFELN,
  adventssonntage,
  nochSchlafen,
  TAFELN_KOPF,
  vergangeneAdvente,
  WEIHNACHTSMANN,
  type Tafel,
  type Tafelinhalt,
  type Winterkapitel,
} from "@/lib/winterkapitel";

/*
  „Die vier Tafeln des Advents" — an jedem Adventssonntag wird eine Tafel
  freigegeben (lib/winterkapitel.ts). Freigegeben heißt: Das Rolltor trägt
  ein offenes Schloss und lässt sich öffnen (components/TafelTuer); die
  übrigen bleiben gesperrt. Entschieden wird über das Datum auf dem Server,
  nichts wird im Browser gespeichert.

  Der Inhalt steht für jede Tafel im HTML, auch für gesperrte — sonst ginge
  die Vorschau per viermal „vier" (components/TafelnVorschau) nicht.
*/

const ROEMISCH = ["I", "II", "III", "IV"];
// Dieselbe Schreibschrift wie in „Die stille Zeit" (components/StilleZeit).
const handschrift = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const SCHNEEFLOCKEN = 16;

/** Bild im geöffneten Türchen — beim Gruß mit rieselndem Goldschnee. */
function TafelBild({ bild, schnee }: { bild: NonNullable<Tafel["bild"]>; schnee?: boolean }) {
  return (
    <figure className="tafel__bildrahmen">
      <Bild src={bild.src} alt={bild.alt} className="tafel__bild" sizes="(max-width: 1000px) 100vw, 50vw" />
      {schnee && (
        <span className="tafel__schnee" aria-hidden="true">
          {Array.from({ length: SCHNEEFLOCKEN }, (_, i) => (
            <span key={i} />
          ))}
        </span>
      )}
      {bild.ki && (
        <span className="ai-badge">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG-Kennzeichnung, nichts zu optimieren */}
          <img src="/images/ai-generated-badge.svg" alt="KI-generiertes Bild" />
        </span>
      )}
    </figure>
  );
}
const datumLang = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", timeZone: "UTC" });

function Inhalt({ inhalt }: { inhalt: Tafelinhalt }) {
  if (inhalt.art === "liste") {
    return (
      <dl className="tafel__liste">
        {inhalt.eintraege.map((e) => (
          <div key={e.titel}>
            <dt className="titel-5">{e.titel}</dt>
            <dd className="text-15">{e.text}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (inhalt.art === "rezept") {
    return (
      <div className="tafel__rezept">
        <div>
          <div className="ueberzeile">Zutaten für ein Blech</div>
          <ul className="strichliste">
            {inhalt.zutaten.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="ueberzeile">So geht es</div>
          <ol className="tafel__schritte text-15">
            {inhalt.schritte.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <p className="tafel__randnotiz">{inhalt.randnotiz}</p>
      </div>
    );
  }
  if (inhalt.art === "gruss") {
    return (
      <figure className="tafel__gruss">
        <blockquote>
          {inhalt.absaetze.map((a) => (
            <p key={a} className="text-15">
              {a}
            </p>
          ))}
        </blockquote>
        <figcaption>
          <span className="tafel__unterschriften">
            {inhalt.unterschriften.map((name) => (
              <span key={name} className="tafel__unterschrift">
                <span className={`tafel__signatur ${handschrift.className}`} aria-hidden="true">
                  {name}
                </span>
                <span className="tafel__name">{name}</span>
              </span>
            ))}
          </span>
          <span className="tafel__zusatz">{inhalt.zusatz}</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="tafel__text">
      {inhalt.absaetze.map((a) => (
        <p key={a} className="text-15">
          {a}
        </p>
      ))}
      {inhalt.link && (
        <Link className="btn btn-ghost" href={inhalt.link.href}>
          {inhalt.link.text}
        </Link>
      )}
    </div>
  );
}

export default function AdventTafeln({ winter }: { winter: Winterkapitel }) {
  const sonntage = adventssonntage(winter.heute.jahr);
  const [vorVier, nachVier] = TAFELN_KOPF.titel.split("vier");

  return (
    <section className="tafeln rand" aria-labelledby="tafeln-titel">
      <div className="ueberzeile">{TAFELN_KOPF.ueberzeile}</div>
      <h2 id="tafeln-titel" className="titel-2">
        {vorVier}
        <TafelnVorschau wort="vier" />
        {nachVier}
      </h2>
      <p className="text-15 tafeln__einleitung">{TAFELN_KOPF.text}</p>
      <ol className="tafeln__raster">
        {ADVENTSTAFELN.map((t, i) => {
          const sonntag = sonntage[i];
          const offen = i < vergangeneAdvente(winter);
          // Zwei Teile, damit mobil „1. Advent" und das Datum sauber untereinander stehen.
          const wann = (
            <div className="tafel__wann">
              <span>{i + 1}. Advent</span>{" "}
              <span className="tafel__datum">{datumLang.format(new Date(`${sonntag.iso}T00:00:00Z`))}</span>
            </div>
          );
          return (
            <TafelTuer
              key={t.titel}
              nummer={i + 1}
              gesperrt={!offen}
              hinweisGesperrt={`Öffnet sich am ${i + 1}. Advent`}
              weihnachtsmann={
                offen
                  ? undefined
                  : { sprueche: WEIHNACHTSMANN, nochSchlafen: nochSchlafen(winter.heute, sonntag, i + 1) }
              }
              deckel={
                <>
                  <span className="tafel__ziffer">{ROEMISCH[i]}</span>
                  {wann}
                </>
              }
            >
              {t.inhalt.art === "gruss" ? (
                // Der Gruß: Foto groß links, Text und Unterschriften rechts.
                <div className="tafel__spalten tafel__spalten--gruss">
                  {t.bild && <TafelBild bild={t.bild} schnee />}
                  <div>
                    {wann}
                    <h3 className="tafel__titel">{t.titel}</h3>
                    <p className="text-15 tafel__kurz">{t.kurz}</p>
                    <Inhalt inhalt={t.inhalt} />
                  </div>
                </div>
              ) : (
                <div className="tafel__spalten">
                  <div>
                    {wann}
                    <h3 className="tafel__titel">{t.titel}</h3>
                    <p className="text-15 tafel__kurz">{t.kurz}</p>
                    {t.bild && <TafelBild bild={t.bild} />}
                  </div>
                  <Inhalt inhalt={t.inhalt} />
                </div>
              )}
            </TafelTuer>
          );
        })}
      </ol>
    </section>
  );
}
