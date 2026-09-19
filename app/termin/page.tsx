import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TerminFormular from "@/components/TerminFormular";
import strukturierteDaten from "./jsonld.json";

export const metadata: Metadata = {
  title: 'Termin vereinbaren — Zahnarztpraxis Groß & Groß Potsdam',
  description:
    'Termin in der Zahnarztpraxis Groß & Groß in Potsdam anfragen: zwei Wunschzeiten senden, Bestätigung innerhalb von 24 Stunden. Auch für Angstpatienten und Kinder, mit extra Zeit im Terminplan.',
  alternates: { canonical: '/termin' },
};

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

/** Vorbelegung aus /termin?anliegen=… (AnliegenWahl auf der Startseite). */
const anliegenAusLink: Record<string, string> = {
  kontrolle: "Kontrolle & Prophylaxe",
  schmerzen: "Schmerzen / akutes Problem",
};

export default async function Termin({
  searchParams,
}: {
  searchParams: Promise<{ anliegen?: string | string[] }>;
}) {
  const { anliegen } = await searchParams;
  const vorwahl = typeof anliegen === "string" ? anliegenAusLink[anliegen] : undefined;

  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px 16px',
          padding: '14px',
          borderBottom: '1px solid var(--color-divider)',
          fontSize: '14px',
          color: 'var(--color-neutral-800)',
        }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11.5px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-700)',
          }}>
          Akute Zahnschmerzen?
        </span>
        <span style={{ width: '1px', height: '18px', background: 'var(--color-divider)' }} />
        <span>
          Rufen Sie uns morgens ab 8:00 an — Montag bis Freitag halten wir{" "}
          <Link href='/zahnschmerzen'>Notfalltermine</Link>{" "}
          frei.
        </span>
        <a
          href='tel:+49331960926'
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--fs-body)',
            fontFeatureSettings: "'tnum'",
          }}>
          0331 960926
        </a>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'end',
          padding: '96px 64px 60px',
        }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-700)',
            }}>
            Online-Terminanfrage
          </div>
          <h1
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-hero)',
              lineHeight: '1.0',
              letterSpacing: '-0.025em',
              margin: '22px 0 0',
            }}>
            Zwei Wunsch-
            <br />
            zeiten genügen.
          </h1>
        </div>
        <p
          style={{
            textAlign: 'justify',
            hyphens: 'auto',
            color: 'var(--color-neutral-800)',
            fontSize: 'var(--fs-body-lg)',
            margin: '0',
          }}>
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
              <h3 style={{ fontWeight: '400', fontSize: 'var(--fs-h5)', margin: '10px 0 6px' }}>
                {s.title}
              </h3>
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
        <TerminFormular anliegen={vorwahl} />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '0',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div style={{ padding: '70px 64px' }}>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-700)',
            }}>
            Was danach passiert
          </div>
          <h2
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-h2-sm)',
              lineHeight: '1.1',
              margin: '16px 0 14px',
            }}>
            Eine kurze Rückmeldung, kein Automat.
          </h2>
          <p
            style={{
              textAlign: 'justify',
              hyphens: 'auto',
              color: 'var(--color-neutral-800)',
              margin: '0',
            }}>
            Wir sehen uns Ihre Anfrage im Team an und melden uns mit einem konkreten Vorschlag —
            inklusive der Dauer, die wir für Ihr Anliegen einplanen. Wenn ein früherer Termin frei
            wird, fragen wir, ob er Ihnen passt.
          </p>
        </div>
        <img
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
