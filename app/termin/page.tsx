import { Fragment } from "react";
import JsonLd from "@/components/JsonLd";
import Bild from "@/components/Bild";
import TerminFormular from "@/components/TerminFormular";
import strukturierteDaten from "./jsonld.json";
import { seitenMetadaten } from "@/lib/seiten";
import NotfallLeiste from "@/components/NotfallLeiste";

export const metadata = seitenMetadaten("/termin");

const steps = [
  {
    no: '01',
    title: 'Anfrage senden',
    text: 'Zwei Wunschzeiten, Ihr Anliegen und wie wir Sie erreichen.',
  },
  {
    no: '02',
    title: 'Bestätigung',
    text: 'Rückmeldung innerhalb von 24 Stunden — telefonisch oder per E-Mail.',
  },
  { no: '03', title: 'Ihr Termin', text: 'Mit der Zeit, die Ihr Anliegen tatsächlich braucht.' },
];

export default function Termin() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className="seitenkopf">
        <div>
          <div className="ueberzeile">
            Online-Terminanfrage
          </div>
          <h1 className="seitentitel">
            Zwei Wunsch-
            <br />
            zeiten genügen.
          </h1>
        </div>
        <p className="fliesstext fliesstext--gross">
          Diese Anfrage ist noch keine feste Buchung: wir prüfen Ihre Wunschzeit und bestätigen
          innerhalb von 24 Stunden telefonisch oder per E-Mail. Bei akuten Schmerzen rufen Sie bitte
          direkt an —{" "}
          <a
            href='tel:+49331960926'
            style={{ fontFeatureSettings: "'tnum'" }}>
            0331 960926
          </a>
          .
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        {steps.map((s, sI) => (
          <Fragment key={sI}>
            <div style={{ padding: '34px 64px', borderLeft: '1px solid var(--color-divider)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13px',
                  letterSpacing: '0.14em',
                  color: 'var(--color-accent-700)',
                  fontFeatureSettings: "'tnum'",
                }}>
                {s.no}
              </div>
              <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h5)', margin: '10px 0 6px' }}>
                {s.title}
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--color-neutral-800)',
                  margin: '0',
                }}>
                {s.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        id='formular'
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '72px',
          padding: '80px 64px',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div>
          <h2
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-h2-sm)',
              lineHeight: '1.08',
              margin: '0 0 18px',
            }}>
            Ihre Anfrage
          </h2>
          <p style={{ textAlign: 'justify', hyphens: 'auto', color: 'var(--color-neutral-800)' }}>
            Je genauer Ihr Anliegen, desto passender der Termin: eine Kontrolle braucht 20 Minuten,
            eine Implantatberatung deutlich mehr. Neue Patienten planen wir bewusst länger ein.
          </p>
          <hr className='hr' />
          <div
            style={{
              display: 'grid',
              gap: '12px',
              fontSize: '14px',
              color: 'var(--color-neutral-800)',
            }}>
            <span style={{ borderTop: '1px solid var(--color-divider)', paddingTop: '10px' }}>
              Bestätigung innerhalb von 24 Stunden
            </span>
            <span style={{ borderTop: '1px solid var(--color-divider)', paddingTop: '10px' }}>
              Schmerztermine täglich am Morgen
            </span>
            <span style={{ borderTop: '1px solid var(--color-divider)', paddingTop: '10px' }}>
              Gesetzlich und privat versichert
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h3)',
              margin: '28px 0 0',
            }}>
            <a
              href='tel:+49331960926'
              style={{ fontFeatureSettings: "'tnum'" }}>
              0331 960926
            </a>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--color-neutral-800)', margin: '6px 0 0' }}>
            Schopenhauerstraße 37 · 14467 Potsdam
          </p>
        </div>
        <TerminFormular />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '0',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div style={{ padding: '70px 64px' }}>
          <div className="ueberzeile">
            Was danach passiert
          </div>
          <h2 className="titel-3 titel-3--eng">
            Eine kurze Rückmeldung, kein Automat.
          </h2>
          <p className="fliesstext">
            Wir sehen uns Ihre Anfrage im Team an und melden uns mit einem konkreten Vorschlag —
            inklusive der Dauer, die wir für Ihr Anliegen einplanen. Wenn ein früherer Termin frei
            wird, fragen wir, ob er Ihnen passt.
          </p>
        </div>
        <Bild
          className='plate'
          src='/uploads/photos-1786974468276-pkt8.jpg'
          alt='Wartebereich'
          style={{
            width: '100%',
            height: '100%',
            minHeight: '380px',
            objectFit: 'cover',
            borderWidth: '0',
            outline: '0',
          }}
        />
      </div>
    </>
  );
}
