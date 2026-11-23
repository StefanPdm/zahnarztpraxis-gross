import Link from "next/link";
import {
  ADVENTSTAFELN,
  adventssonntage,
  TAFELN_KOPF,
  vergangeneAdvente,
  type Tafelinhalt,
  type Winterkapitel,
} from "@/lib/winterkapitel";

/*
  „Die vier Tafeln des Advents" — an jedem Adventssonntag öffnet sich eine
  Tafel (lib/winterkapitel.ts). Freigeschaltet wird nur über das Datum auf
  dem Server: Nichts wird im Browser gespeichert, und es gibt kein Skript —
  Aufklappen erledigt <details>. Eine noch geschlossene Tafel verrät ihren
  Inhalt auch im Quelltext nicht.
*/

const ROEMISCH = ["I", "II", "III", "IV"];
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

  return (
    <section className="tafeln rand" aria-labelledby="tafeln-titel">
      <div className="ueberzeile">{TAFELN_KOPF.ueberzeile}</div>
      <h2 id="tafeln-titel" className="titel-2">
        {TAFELN_KOPF.titel}
      </h2>
      <p className="text-15 tafeln__einleitung">{TAFELN_KOPF.text}</p>
      <ol className="tafeln__raster">
        {ADVENTSTAFELN.map((t, i) => {
          const sonntag = sonntage[i];
          const offen = i < vergangeneAdvente(winter);
          // Zwei Teile, damit mobil „1. Advent" und das Datum sauber untereinander stehen.
          const wann = (
            <>
              <span>{i + 1}. Advent</span>{" "}
              <span className="tafel__datum">{datumLang.format(new Date(`${sonntag.iso}T00:00:00Z`))}</span>
            </>
          );
          return (
            <li key={t.titel} className={offen ? "tafel" : "tafel tafel--zu"}>
              <span className="tafel__ziffer" aria-hidden="true">
                {ROEMISCH[i]}
              </span>
              <div className="tafel__wann">{wann}</div>
              {offen ? (
                <>
                  <h3 className="tafel__titel">{t.titel}</h3>
                  <p className="text-15">{t.kurz}</p>
                  <details className="tafel__mehr">
                    <summary>
                      <span className="tafel__oeffnen">Tafel öffnen</span>
                      <span className="tafel__schliessen">Tafel schließen</span>
                    </summary>
                    <Inhalt inhalt={t.inhalt} />
                  </details>
                </>
              ) : (
                <>
                  <h3 className="tafel__titel">Noch verschlossen</h3>
                  <p className="tafel__hinweis">Dieses Türchen öffnet sich am {i + 1}. Advent.</p>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
