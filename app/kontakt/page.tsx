import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Bild from '@/components/Bild';
import Karte from '@/components/Karte';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import Sprechzeiten from '@/components/Sprechzeiten';
import NotfallLeiste from '@/components/NotfallLeiste';

export const metadata = seitenMetadaten('/kontakt');

export default function Kontakt() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className='seitenkopf'>
        <div>
          <div className='ueberzeile'>Kontakt</div>
          <h1 className='seitentitel'>
            Schopenhauer-
            <br />
            straße 37,
            <br />
            Potsdam Mitte.
          </h1>
        </div>
        <p className='fliesstext fliesstext--gross'>
          Rufen Sie an, schreiben Sie eine E-Mail oder senden Sie eine Terminanfrage — wir antworten
          innerhalb von 24 Stunden. Für akute Beschwerden halten wir jeden Morgen Termine frei;
          melden Sie sich in diesem Fall bitte telefonisch.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div style={{ padding: '44px 64px 44px 64px' }}>
          <div className='ueberzeile'>Telefon</div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', margin: '14px 0 0' }}>
            <a
              href='tel:+49331960926'
              style={{ fontFeatureSettings: "'tnum'" }}>
              0331 960926
            </a>
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-neutral-700)',
              margin: '8px 0 0',
              fontFeatureSettings: "'tnum'",
            }}>
            Telefax 0331 5811 3230
          </p>
        </div>
        <div style={{ padding: '44px 64px', borderLeft: '1px solid var(--color-divider)' }}>
          <div className='ueberzeile'>E-Mail</div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h5)',
              margin: '14px 0 0',
            }}>
            <a href='mailto:zahnarztgross.gross@outlook.de'>zahnarztgross.gross@outlook.de</a>
          </p>
        </div>
        <div style={{ padding: '44px 64px', borderLeft: '1px solid var(--color-divider)' }}>
          <div className='ueberzeile'>Adresse</div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h5)',
              lineHeight: '1.35',
              margin: '14px 0 0',
            }}>
            Schopenhauerstraße 37
            <br />
            14467 Potsdam
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div style={{ padding: '70px 64px' }}>
          <div className='ueberzeile'>Öffnungszeiten</div>
          <Sprechzeiten />
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '16px' }}>
            Und nach Vereinbarung. Sprechstunde nur mit Termin — so entstehen keine Wartezeiten im
            Wartezimmer.
          </p>
        </div>
        <div style={{ padding: '70px 64px', borderLeft: '1px solid var(--color-divider)' }}>
          <div className='ueberzeile'>Anfahrt &amp; Parken</div>
          <p
            style={{
              fontSize: '14.5px',
              lineHeight: '1.6',
              margin: '18px 0 0',
              padding: '14px 16px',
              borderLeft: '2px solid var(--color-accent)',
              background: 'var(--color-accent-100)',
              color: 'var(--color-neutral-900)',
            }}>
            Der Praxiseingang liegt auf der{' '}
            <strong style={{ fontWeight: '400' }}>Rückseite des Gebäudes</strong> — gehen Sie links
            am Gebäude vorbei nach hinten in den Hof, dort ist eine gläserne Doppeltür.{' '}
            <Link href='/anfahrt-parken'>Wegbeschreibung mit Fotos</Link>
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '12px 20px',
              fontSize: '14px',
              marginTop: '22px',
              color: 'var(--color-neutral-800)',
            }}>
            <span style={{ color: 'var(--color-neutral-700)' }}>Tram</span>
            <span>91, 94, 98 — Haltestelle Luisenplatz-Süd, etwa 4 Minuten zu Fuß</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Bus</span>
            <span>605, 606, 695 — Luisenplatz</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Auto</span>
            <span>Kurzzeit-Parkplätze an der Hofseite, weitere in der Zeppelinstraße</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Zugang</span>
            <span>Im 1. Stock, über das Treppenhaus erreichbar — kein Aufzug</span>
          </div>
          <div
            style={{
              marginTop: '26px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-divider)',
              overflow: 'hidden',
            }}>
            <Karte
              hoehe={320}
              grau
            />
          </div>
          <a
            href='https://www.openstreetmap.org/?mlat=52.3976&mlon=13.0484#map=17/52.3976/13.0484'
            style={{
              display: 'inline-block',
              marginTop: '10px',
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>
            Route planen
          </a>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2px',
          background: 'var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <Bild
          className='plate'
          src='/images/photos-1786974467268-lgux.jpg'
          alt='Wartebereich der Praxis'
          style={{
            width: '100%',
            height: '480px',
            objectFit: 'cover',
            borderWidth: '0',
            outline: '0',
          }}
        />
        <Bild
          className='plate'
          src='/images/photos-1786974467256-ovyq.jpg'
          alt='Behandlungszimmer'
          style={{
            width: '100%',
            height: '480px',
            objectFit: 'cover',
            borderWidth: '0',
            outline: '0',
          }}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          padding: '80px 64px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div>
          <div className='ueberzeile'>Akute Schmerzen</div>
          <h2 className='titel-3 titel-3--eng'>Rufen Sie morgens ab 8:00 an.</h2>
          <p className='fliesstext'>
            Wir halten täglich Termine für Schmerzfälle frei. Sagen Sie am Telefon kurz, wo und seit
            wann es weh tut — dann können wir einschätzen, wie dringend es ist. Außerhalb unserer
            Zeiten hilft der zahnärztliche Notdienst der Kassenzahnärztlichen Vereinigung
            Brandenburg.
          </p>
        </div>
        <div>
          <div className='ueberzeile'>Erster Besuch</div>
          <h2 className='titel-3 titel-3--eng'>Was Sie mitbringen sollten.</h2>
          <ul className='strichliste'>
            <li>Versichertenkarte oder Angaben zur privaten Versicherung</li>
            <li>Bonusheft, falls vorhanden</li>
            <li>Liste der Medikamente, die Sie einnehmen</li>
            <li>Vorhandene Röntgenbilder oder Befunde</li>
          </ul>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '56px',
          alignItems: 'center',
          padding: '70px 64px',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div>
          <h2
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-h2-sm)',
              lineHeight: '1.1',
              margin: '0 0 12px',
            }}>
            Lieber schriftlich?
          </h2>
          <p style={{ color: 'var(--color-neutral-800)', margin: '0', maxWidth: '56ch' }}>
            Senden Sie uns zwei Wunschzeiten und Ihr Anliegen — wir bestätigen innerhalb von 24
            Stunden.
          </p>
        </div>
        <Link
          className='btn btn-primary knopf-gross'
          href='/#termin'>
          Termin anfragen
        </Link>
      </div>
    </>
  );
}
