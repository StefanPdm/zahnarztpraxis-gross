import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import AngstRegler from '@/components/AngstRegler';
import AnliegenWahl from '@/components/AnliegenWahl';
import strukturierteDaten from './jsonld.json';

/*
 * ACHTUNG — diese Seite hatte in der Übergabe Zustand und Handler
 * (this.state / setState). Der interaktive Teil ist hier NICHT abgebildet
 * und muss als Client-Komponente ergänzt werden. Siehe docs/MIGRATION-STATUS.md.
 */

export const metadata: Metadata = {
  title: 'Zahnarzt Potsdam Mitte — Zahnarztpraxis Groß & Groß, familiengeführt seit 1991',
  description:
    'Zahnarztpraxis in Potsdam Mitte, familiengeführt seit 1991: Implantologie, ästhetische Zahnmedizin, eigenes Zahnlabor im Haus. Behutsam mit Angstpatienten und Kindern. Termin online anfragen, Antwort innerhalb von 24 Stunden.',
  alternates: { canonical: '/' },
};

const showReviews = true;

const proof = [
  { value: '5', to: 5, decimals: 0, suffix: '', label: 'Behandlungszimmer' },
  { value: '1991', to: 1991, decimals: 0, suffix: '', label: 'Familiengeführt in Potsdam' },
  { value: '1.200', to: 1200, decimals: 0, suffix: '', label: 'Gesetzte Implantate' },
  { value: '24', to: 24, decimals: 0, suffix: ' h', label: 'Bis zur Antwort' },
];

const services = [
  {
    no: '01',
    title: 'Prophylaxe',
    text: 'Professionelle Reinigung und Kontrolle im Rhythmus, der zu Ihren Zähnen passt.',
    icon: 'M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.2 3 6.3 5 4 7.7 4c1.5 0 2.6.6 4.3.6S14.8 4 16.3 4C19 4 21 6.3 21 9.2c0 2.8-1.5 4.8-3.4 4.8-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z',
  },
  {
    no: '02',
    title: 'Ästhetische Zahnmedizin',
    text: 'Veneers, Bleaching und Füllungen, die man nicht sieht.',
    icon: 'M12 3l1.9 4.9L19 9.8l-4.4 3.2 1.4 5.2L12 15.4 8 18.2l1.4-5.2L5 9.8l5.1-.9L12 3z',
  },
  {
    no: '03',
    title: 'Implantologie',
    text: 'Planung, Setzen und Versorgung des Implantats aus einer Hand.',
    icon: 'M9 3h6M9 6h6M10 9h4M12 9v11M10.5 13h3M10.5 16.5h3',
  },
  {
    no: '04',
    title: 'Prothetik',
    text: 'Kronen, Brücken und Zahnersatz — gefertigt im eigenen Labor.',
    icon: 'M3 17l2-9 4 4 3-6 3 6 4-4 2 9H3z',
  },
  {
    no: '05',
    title: 'Weisheitszähne & MKG',
    text: 'Chirurgische Eingriffe mit eigener Erfahrung aus der MKG-Chirurgie.',
    icon: 'M14 4l6 6-9.5 9.5H4v-6.5L14 4zM11.5 6.5l6 6',
  },
  {
    no: '06',
    title: 'Kinderzahnheilkunde',
    text: 'Erst zeigen, dann erklären, dann behandeln — im Tempo des Kindes.',
    icon: 'M12 21a8 8 0 100-16 8 8 0 000 16zM9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8',
  },
  {
    no: '07',
    title: 'Angstpatienten',
    text: 'Längere Termine, Pausen auf Zeichen, jeder Schritt vorher angekündigt.',
    icon: 'M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z',
  },
  {
    no: '08',
    title: 'Parodontologie',
    text: 'Behandlung von Zahnfleischentzündungen, Schienentherapie und Laser.',
    icon: 'M4 15c2-1 3-3 3-6M20 15c-2-1-3-3-3-6M4 15c0 3 3.6 5 8 5s8-2 8-5M8 9h8',
  },
];

const team = [
  {
    name: 'Chantal Groß',
    role: 'Zahnärztin',
    photo: 'uploads/portrait-chantal-gross.jpg',
    personal:
      'Studium in Greifswald, Assistenzzeit in Berlin-Mitte. Curriculum Kinderzahnheilkunde und Parodontologie, jährlich rund 60 Fortbildungsstunden.',
    facts: [
      { label: 'Studium', value: 'Halle' },
      { label: 'Schwerpunkt', value: 'Kinder & Prophylaxe' },
      { label: 'Zertifikate', value: 'Curriculum Paro (DG PARO)' },
    ],
    quote:
      '„Ich behandle viele Kinder und Menschen, die lange keinen Zahnarzt gesehen haben. Beide brauchen dasselbe: Ruhe und eine ehrliche Ansage.\u201c',
    focus:
      'Ästhetische Zahnmedizin · Konservierende Zahnheilkunde · Kinderzahnheilkunde · Parodontologie',
    bio: 'Nach dem Studium und der Assistenzzeit habe ich mich auf ästhetische und konservierende Zahnheilkunde spezialisiert — und darauf, Kinder zu behandeln, ohne sie zu überfahren. Regelmäßige Fortbildungen in Parodontologie und Kinderzahnheilkunde gehören für mich zum Beruf, nicht zur Kür.',
  },
  {
    name: 'Matthias Groß',
    role: 'Zahnarzt',
    photo: 'uploads/portrait-matthias-gross.jpg',
    personal:
      'Studium in Rostock, vier Jahre MKG-Chirurgie am Klinikum. Tätigkeitsschwerpunkt Implantologie, über 1.200 gesetzte Implantate.',
    facts: [
      { label: 'Studium', value: 'Halle' },
      { label: 'Schwerpunkt', value: 'Implantologie & Prothetik' },
      { label: 'Zertifikate', value: 'Tätigkeitsschwerpunkt Implantologie (DGI)' },
    ],
    quote:
      '„Beim Zahnersatz entscheidet der halbe Millimeter. Deshalb arbeite ich mit unserem eigenen Meisterlabor direkt in der Praxis.\u201c',
    focus: 'Implantologie · Prothetik · Chirurgie',
    bio: 'Mein Schwerpunkt liegt auf Implantologie und Prothetik, dazu chirurgische Eingriffe aus der MKG-Erfahrung. Weil unser Labor im Haus sitzt, kann ich Passung und Farbe direkt am Patienten prüfen — das ist der Grund, warum ich diese Praxis so aufgebaut habe.',
  },
];

const behandlungen = [
  {
    no: '01',
    title: 'Prophylaxe & Zahnreinigung',
    text: 'Professionelle Reinigung, Fluoridierung und ein Kontrollrhythmus, der zu Ihrem Risiko passt — nicht zum Kalender.',
  },
  {
    no: '02',
    title: 'Füllungen & Zahnerhalt',
    text: 'Zahnfarbene Komposit-Füllungen und Keramik-Inlays unter Lupenbrille, um den eigenen Zahn so lange wie möglich zu erhalten.',
  },
  {
    no: '03',
    title: 'Parodontologie',
    text: 'Behandlung von Zahnfleischentzündung und Knochenabbau, unterstützt durch Laser und ein festes Recall-Programm.',
  },
  {
    no: '04',
    title: 'Weisheitszähne & Chirurgie',
    text: 'Entfernung von Weisheitszähnen und kleinere chirurgische Eingriffe mit Erfahrung aus der MKG-Chirurgie.',
  },
  {
    no: '05',
    title: 'Kinderbehandlung',
    text: 'Erst zeigen, dann erklären, dann behandeln. Der erste Termin ist bei uns oft nur ein Kennenlernen.',
  },
  {
    no: '06',
    title: 'Angstpatienten',
    text: 'Längere Termine, ein vereinbartes Handzeichen für Pausen und keine Behandlung ohne Ankündigung.',
  },
  {
    no: '07',
    title: 'Schienentherapie',
    text: 'Knirscher- und Aufbissschienen gegen Verspannungen, Kopfschmerzen und abgeriebene Zahnflächen.',
  },
  {
    no: '08',
    title: 'Bleaching & Ästhetik',
    text: 'Aufhellung und ästhetische Korrekturen — dezent dosiert, damit das Ergebnis nicht auffällt, sondern passt.',
  },
];

const labor = [
  { no: '01', title: 'Zahnkronen', text: 'Vollkeramik-Kronen, Farbe direkt am Stuhl abgestimmt.' },
  { no: '02', title: 'Inlays', text: 'Passgenaue Einlagefüllungen statt großflächiger Füllungen.' },
  { no: '03', title: 'Veneers', text: 'Dünne Keramikschalen für Form und Farbe der Frontzähne.' },
  { no: '04', title: 'Implantate', text: 'Planung, Setzen und Versorgung aus einer Hand.' },
  {
    no: '05',
    title: 'Brücken & Prothetik',
    text: 'Fester und herausnehmbarer Zahnersatz, im Haus gefertigt.',
  },
  {
    no: '06',
    title: 'Reparatur & Recall',
    text: 'Kurze Wege bei Reparaturen — meist am selben Tag.',
  },
];

const angst = [
  {
    no: '01',
    text: 'Längere Termine, damit niemand das Gefühl hat, im Takt abgearbeitet zu werden.',
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2',
  },
  {
    no: '02',
    text: 'Ein vereinbartes Handzeichen — bei dem wir sofort aufhören, nicht „gleich“.',
    icon: 'M9 11V5.5a1.5 1.5 0 013 0V11m0-1.5a1.5 1.5 0 013 0V12m0-1a1.5 1.5 0 013 0v4.5A5.5 5.5 0 0112.5 21H11a5 5 0 01-4.2-2.3L4.4 15a1.6 1.6 0 012.4-2l2.2 2',
  },
  {
    no: '03',
    text: 'Jeder Schritt wird vorher angekündigt und erklärt, auch der unangenehme.',
    icon: 'M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z',
  },
  {
    no: '04',
    text: 'Musik oder ein Film über den Deckenmonitor, wenn Ablenkung hilft.',
    icon: 'M9 18V6l10-2v12M9 18a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19 16a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
  },
];

const ablauf = [
  {
    no: '01',
    title: 'Anfrage',
    text: 'Sie senden zwei Wunschzeiten und Ihr Anliegen. Wir bestätigen innerhalb von 24 Stunden.',
    icon: 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  },
  {
    no: '02',
    title: 'Erstgespräch',
    text: 'Befund, Röntgen wenn nötig, und eine Erklärung ohne Fachlatein — inklusive Kostenplan.',
    icon: 'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4',
  },
  {
    no: '03',
    title: 'Behandlung',
    text: 'In Etappen, die Sie mitbestimmen. Zahnersatz entsteht parallel im eigenen Labor.',
    icon: 'M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.2 3 6.3 5 4 7.7 4c1.5 0 2.6.6 4.3.6S14.8 4 16.3 4C19 4 21 6.3 21 9.2c0 2.8-1.5 4.8-3.4 4.8-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z',
  },
  {
    no: '04',
    title: 'Nachsorge',
    text: 'Kontrolle, Feinkorrektur und ein Recall-Intervall, das zu Ihren Zähnen passt.',
    icon: 'M21 12a9 9 0 11-3.2-6.9M21 3v5h-5',
  },
];

const reviews = [
  {
    quote:
      '„Mir wurde vorher genau erklärt, was gemacht wird — das nimmt einem die halbe Angst.\u201c',
    who: 'Platzhalter · Google',
  },
  {
    quote: '„Krone in derselben Woche fertig, weil das Labor im Haus ist. Sehr angenehm.\u201c',
    who: 'Platzhalter · Google',
  },
  {
    quote: '„Termin am Telefon in zwei Minuten, keine Wartezeit im Wartezimmer.\u201c',
    who: 'Platzhalter · Google',
  },
];

const hours = [
  { day: 'Montag – Dienstag', time: '08:00 – 13:00 · 14:00 – 17:30' },
  { day: 'Mittwoch', time: '08:00 – 13:00' },
  { day: 'Donnerstag', time: '08:00 – 12:00' },
  { day: 'Freitag', time: '08:00 – 12:00' },
];

export default function Index() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <section style={{ fontFamily: 'var(--font-body)' }}>
        <div
          id='1b'
          style={{ maxWidth: '1440px', margin: '0 auto', background: 'transparent' }}>
          <div
            id='hero'
            style={{ padding: '132px 64px 0px', textAlign: 'center', overflow: 'hidden' }}>
            <div id='heroInner'>
              <div className='herofold'>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '11px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-700)',
                  }}>
                  Praxis für ästhetische Zahnmedizin &amp; Implantologie
                </div>
                <h1
                  style={{
                    fontWeight: '400',
                    fontSize: 'clamp(48px,8.4vw,124px)',
                    lineHeight: '0.94',
                    letterSpacing: '-0.035em',
                    margin: 'clamp(30px,4.6vh,56px) 0 0',
                    textWrap: 'balance',
                  }}>
                  Ruhig behandeln.
                  <br />
                  <span style={{ fontStyle: 'italic', color: 'var(--color-accent-700)' }}>
                    Präzise&nbsp;
                  </span>
                  arbeiten.
                </h1>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    justifyContent: 'center',
                    margin: 'clamp(34px,5vh,58px) auto 0',
                    maxWidth: '70ch',
                  }}>
                  <span style={{ flex: '1', height: '1px', background: 'var(--color-divider)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontStyle: 'italic',
                      fontSize: '15px',
                      color: 'var(--color-accent-700)',
                    }}>
                    seit 1991 familiengeführt in Potsdam Mitte
                  </span>
                  <span style={{ flex: '1', height: '1px', background: 'var(--color-divider)' }} />
                </div>
                <p
                  style={{
                    fontSize: 'var(--fs-h5)',
                    lineHeight: '1.62',
                    maxWidth: '56ch',
                    margin: '26px auto 0',
                    color: 'var(--color-neutral-800)',
                    textWrap: 'pretty',
                  }}>
                  Zwei Zahnärzte, ein eigenes Labor und eine Praxis, in der Termine nicht im
                  Minutentakt vergeben werden.
                </p>
                <a
                  className='scrollcue'
                  href='#worum'
                  aria-label='Weiter nach unten'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '34px auto 0',
                    width: '44px',
                    height: '44px',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    color: 'var(--color-accent-700)',
                  }}>
                  <svg
                    viewBox='0 0 24 30'
                    width='17'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M12 2 V26' />
                    <path d='M5 19 L12 26 L19 19' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div
            id='worumband'
            style={{
              padding: 'clamp(38px,5.4vh,58px) 64px 88px',
              textAlign: 'center',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <AnliegenWahl />
          </div>
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
              Rufen Sie uns morgens ab 8:00 an — Montag bis Freitag halten wir
              <Link href='/zahnschmerzen'>Notfalltermine</Link>
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
            className='statbar'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '0',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            {proof.map((p, pI) => (
              <Fragment key={pI}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '26px 20px',
                    textAlign: 'center',
                  }}>
                  <span
                    className='countup'
                    data-to={p.to}
                    data-suffix={p.suffix}
                    data-decimals={p.decimals}
                    data-static={p.value}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(30px,3.2vw,44px)',
                      lineHeight: '1',
                      color: 'var(--color-accent-700)',
                      fontFeatureSettings: "'tnum'",
                    }}>
                    {p.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '10.5px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-neutral-700)',
                    }}>
                    {p.label}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div id='videoband'>
            <div style={{ position: 'relative', overflow: 'hidden', height: '720px' }}>
              <video
                className='parallax-img'
                src='/uploads/Praxisflug.webm'
                poster='/uploads/photos-1786974467265-rnor.jpg'
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                preload='auto'
                aria-label='Rundflug durch die Praxisräume'
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '-20%',
                  width: '100%',
                  height: '140%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <svg
                viewBox='0 0 1200 36'
                preserveAspectRatio='none'
                aria-hidden='true'
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '-1px',
                  width: '100%',
                  height: '30px',
                  display: 'block',
                  pointerEvents: 'none',
                }}>
                <path
                  d='M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z'
                  style={{ fill: '#ffffff' }}
                />
              </svg>
              <svg
                viewBox='0 0 1200 36'
                preserveAspectRatio='none'
                aria-hidden='true'
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '-1px',
                  width: '100%',
                  height: '30px',
                  display: 'block',
                  pointerEvents: 'none',
                }}>
                <g transform='translate(0,36) scale(1,-1)'>
                  <path
                    d='M0,0 L1200,0 L1200,20 C1140,28 1080,10 1020,22 C960,33 900,13 840,25 C780,35 720,15 660,27 C600,36 540,17 480,29 C420,38 360,19 300,30 C240,40 180,21 120,31 C60,39 30,25 0,31 Z'
                    style={{ fill: '#ffffff' }}
                  />
                </g>
              </svg>
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
            <figure style={{ margin: '0', background: '#ffffff' }}>
              <img
                className='plate'
                src='/uploads/photos-1786974468276-pkt8.jpg'
                alt='Wartebereich'
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  borderWidth: '0',
                  outline: '0',
                }}
              />
              <figcaption
                className='platecap'
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px 20px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                <span style={{ color: 'var(--color-accent-700)' }}>Tafel I</span>
                <span>Wartebereich, Blick zum Innenhof</span>
              </figcaption>
            </figure>
            <figure style={{ margin: '0', background: '#ffffff' }}>
              <img
                className='plate'
                src='/uploads/photos-1786974461785-ksjv.jpg'
                alt='Behandlungseinheit'
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  borderWidth: '0',
                  outline: '0',
                }}
              />
              <figcaption
                className='platecap'
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px 20px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                <span style={{ color: 'var(--color-accent-700)' }}>Tafel II</span>
                <span>Behandlungseinheit, Zimmer 2</span>
              </figcaption>
            </figure>
          </div>
          <div style={{ padding: '116px 64px', borderBottom: '1px solid var(--color-divider)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '40px',
                alignItems: 'baseline',
                marginBottom: '52px',
              }}>
              <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h2)', margin: '0' }}>
                Wer Sie behandelt
              </h2>
              <span style={{ height: '1px', background: 'var(--color-divider)' }} />
            </div>
            <div
              className='rv'
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
              {team.map((m, mI) => (
                <Fragment key={mI}>
                  <div>
                    <div
                      className='flipcard'
                      tabIndex='0'
                      style={{
                        position: 'relative',
                        height: '460px',
                        borderRadius: 'var(--radius-md)',
                        outlineOffset: '4px',
                      }}>
                      <div
                        className='fliphint'
                        style={{
                          position: 'absolute',
                          right: '14px',
                          bottom: '14px',
                          zIndex: '2',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255,255,255,0.9)',
                          border: '1px solid var(--color-divider)',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'var(--color-accent-700)',
                          pointerEvents: 'none',
                          transition: 'opacity .4s ease',
                        }}>
                        <svg
                          width='13'
                          height='13'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.7'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          aria-hidden='true'>
                          <path d='M21 12a9 9 0 11-3.2-6.9' />
                          <path d='M21 3v5h-5' />
                        </svg>
                        Werdegang
                      </div>
                      <div
                        className='flipinner'
                        style={{ width: '100%', height: '100%' }}>
                        <div
                          className='flipface portraitframe'
                          style={{ width: '100%', height: '100%' }}>
                          <img
                            className='plate portrait'
                            src={m.photo}
                            alt='Porträt'
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: '50% 26%',
                              borderRadius: 'var(--radius-md)',
                              mixBlendMode: 'multiply',
                            }}
                          />
                        </div>
                        <div
                          className='flipface flipback'
                          style={{
                            border: '1px solid var(--color-divider)',
                            borderRadius: 'var(--radius-md)',
                            background:
                              'linear-gradient(165deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, #ffffff 100%)',
                            padding: '38px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '18px',
                          }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '10.5px',
                              letterSpacing: '0.24em',
                              textTransform: 'uppercase',
                              color: 'var(--color-accent-700)',
                            }}>
                            Werdegang
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'var(--fs-h4)',
                              lineHeight: '1.42',
                              margin: '0',
                            }}>
                            {m.personal}
                          </p>
                          <div
                            style={{
                              display: 'grid',
                              gap: '0',
                              fontSize: '14px',
                              color: 'var(--color-neutral-800)',
                            }}>
                            {m.facts.map((f, fI) => (
                              <Fragment key={fI}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '18px',
                                    borderTop: '1px solid var(--color-divider)',
                                    padding: '10px 0',
                                  }}>
                                  <span style={{ color: 'var(--color-neutral-700)' }}>
                                    {f.label}
                                  </span>
                                  <span style={{ textAlign: 'right' }}>{f.value}</span>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3
                      style={{
                        fontWeight: '400',
                        fontSize: 'var(--fs-h3-lg)',
                        margin: '26px 0 6px',
                      }}>
                      {m.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '11.5px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent-700)',
                        marginBottom: '18px',
                      }}>
                      {m.role}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--fs-h5)',
                        lineHeight: '1.42',
                        color: 'var(--color-text)',
                      }}>
                      {m.quote}
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'var(--color-neutral-800)',
                        textAlign: 'justify',
                        hyphens: 'auto',
                        margin: '0',
                      }}>
                      {m.focus}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            className='colophon rv'
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              padding: '40px 64px',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, color-mix(in oklab, var(--color-accent) 6%, #ffffff) 100%)',
              color: 'var(--color-text)',
              borderTop: '1px solid var(--color-accent-300)',
              borderBottom: '1px solid var(--color-accent-300)',
              overflow: 'hidden',
            }}>
            <span
              style={{
                position: 'absolute',
                right: '56px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-heading)',
                fontSize: '132px',
                lineHeight: '1',
                color: 'var(--color-accent)',
                opacity: '0.17',
                fontFeatureSettings: "'tnum'",
                pointerEvents: 'none',
              }}>
              I
            </span>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
              }}>
              Kapitel I
            </div>
            <div style={{ flex: '1', height: '1px', background: 'var(--color-accent-300)' }} />
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px,2.6vw,34px)',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}>
              Die Praxis
            </div>
          </div>
          <div
            id='1b-praxis'
            style={{
              padding: '116px 64px',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 10%, #ffffff) 0%, rgba(255,255,255,0) 100%)',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <div
              className='rv'
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '56px',
                alignItems: 'end',
              }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: '400',
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-700)',
                  }}>
                  Die Praxis
                </div>
                <h2
                  style={{
                    fontWeight: '400',
                    fontSize: 'var(--fs-h2)',
                    lineHeight: '1.08',
                    margin: '16px 0 20px',
                  }}>
                  Helle Räume, moderne Technik, kein Praxisgeruch von 1995.
                </h2>
                <p
                  style={{
                    textAlign: 'justify',
                    hyphens: 'auto',
                    color: 'var(--color-neutral-800)',
                    columns: '2',
                    columnGap: '36px',
                  }}>
                  Fünf Behandlungszimmer mit Tageslicht, digitales Röntgen, Laser und Lupenbrille —
                  und ein Wartebereich, in dem man sitzen mag. Auf Wunsch läuft Musik oder ein Film
                  über den Monitor an der Decke, während wir arbeiten. Mit Angstpatienten und
                  Kindern gehen wir bewusst langsam vor: erst zeigen, dann erklären, dann behandeln.
                </p>
              </div>
              <figure style={{ margin: '0' }}>
                <img
                  className='plate'
                  src='/uploads/zahnarzt-potsdam-praxis-gross-und-gross-1030x687-1.jpg'
                  alt='Behandlungszimmer mit Deckenmonitor und Röntgenbild am Bildschirm, Patientin im Stuhl'
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <figcaption
                  className='platecap'
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px 2px 0',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-neutral-700)',
                  }}>
                  <span style={{ color: 'var(--color-accent-700)' }}>Tafel III</span>
                  <span>Deckenmonitor und Röntgenbild</span>
                </figcaption>
              </figure>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.35fr 1fr',
                gap: '22px',
                margin: '40px 0 0',
              }}>
              <figure style={{ margin: '0' }}>
                <img
                  className='plate'
                  src='/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-10-1.jpg'
                  alt='Behandlung mit Assistenz am Stuhl in der Zahnarztpraxis Groß & Groß in Potsdam'
                  style={{
                    width: '100%',
                    height: '520px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <figcaption
                  className='platecap'
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px 2px 0',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-neutral-700)',
                  }}>
                  <span style={{ color: 'var(--color-accent-700)' }}>Tafel IV</span>
                  <span>Behandlung mit Assistenz</span>
                </figcaption>
              </figure>
              <figure style={{ margin: '0' }}>
                <img
                  className='plate'
                  src='/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-5-1-1030x687-1.jpg'
                  alt='Praxisflur mit beleuchtetem Groß-&-Groß-Logo an der Wand'
                  style={{
                    width: '100%',
                    height: '520px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <figcaption
                  className='platecap'
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px 2px 0',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10.5px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-neutral-700)',
                  }}>
                  <span style={{ color: 'var(--color-accent-700)' }}>Tafel V</span>
                  <span>Flur, hinter dem Empfang</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div
            className='colophon rv'
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              padding: '40px 64px',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, color-mix(in oklab, var(--color-accent) 6%, #ffffff) 100%)',
              color: 'var(--color-text)',
              borderTop: '1px solid var(--color-accent-300)',
              borderBottom: '1px solid var(--color-accent-300)',
              overflow: 'hidden',
            }}>
            <span
              style={{
                position: 'absolute',
                right: '56px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-heading)',
                fontSize: '132px',
                lineHeight: '1',
                color: 'var(--color-accent)',
                opacity: '0.17',
                fontFeatureSettings: "'tnum'",
                pointerEvents: 'none',
              }}>
              II
            </span>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
              }}>
              Kapitel II
            </div>
            <div style={{ flex: '1', height: '1px', background: 'var(--color-accent-300)' }} />
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px,2.6vw,34px)',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}>
              Was wir behandeln
            </div>
          </div>
          <div
            id='1b-leistungen'
            style={{ padding: '116px 64px', borderBottom: '1px solid var(--color-divider)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '40px',
                alignItems: 'baseline',
                marginBottom: '44px',
              }}>
              <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h2)', margin: '0' }}>
                Leistungen
              </h2>
              <span style={{ height: '1px', background: 'var(--color-divider)' }} />
              <Link
                className='btn btn-ghost'
                href='/leistungen'>
                Alle Leistungen ansehen
              </Link>
            </div>
            <div
              className='rv'
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '36px 44px' }}>
              {services.map((s, sI) => (
                <Fragment key={sI}>
                  <div
                    style={{ borderTop: '1px solid var(--color-accent-300)', paddingTop: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        color: 'var(--color-accent-700)',
                      }}>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'>
                        <path d={s.icon} />
                      </svg>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '13px',
                          letterSpacing: '0.14em',
                          fontFeatureSettings: "'tnum'",
                        }}>
                        {s.no}
                      </span>
                    </div>
                    <h4
                      style={{ margin: '16px 0 8px', fontSize: 'var(--fs-h5)', fontWeight: '400' }}>
                      {s.title}
                    </h4>
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
          </div>
          <div
            id='1b-labor'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '64px',
              alignItems: 'center',
              padding: '116px 64px',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '400',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                Eigenes Zahnlabor
              </div>
              <h2
                style={{
                  fontWeight: '400',
                  fontSize: 'var(--fs-h2)',
                  lineHeight: '1.08',
                  margin: '16px 0 20px',
                }}>
                Besonderheit: Der Zahntechniker sitzt direkt in der Praxis.
              </h2>
              <p
                style={{
                  textAlign: 'justify',
                  hyphens: 'auto',
                  color: 'var(--color-neutral-800)',
                }}>
                Kronen, Inlays, Veneers und Brücken entstehen bei uns im eigenen Labor. Farbe und
                Passung prüfen wir direkt am Patienten, Korrekturen laufen am selben Tag — statt
                über Wochen und Wege zu einem externen Labor.
              </p>
              <div
                className='labgrid'
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '16px 28px',
                  marginTop: '28px',
                  fontSize: '14px',
                }}>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M12 3c-1.2-.8-2.2-1.1-3.4-1.1C6.4 1.9 4.8 3.6 4.8 6.2c0 2.3.6 3.5 1.2 5.8.6 2.4.7 6.1 2 6.1s1.6-4.3 4-4.3 2.7 4.3 4 4.3 1.4-3.7 2-6.1c.6-2.3 1.2-3.5 1.2-5.8 0-2.6-1.6-4.3-3.8-4.3-1.2 0-2.2.3-3.4 1.1z' />
                    <path d='M6.5 8.6c1.6 1 3.4 1.5 5.5 1.5s3.9-.5 5.5-1.5' />
                  </svg>
                  <span>Zahnkronen</span>
                </span>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M12 3c-1.2-.8-2.2-1.1-3.4-1.1C6.4 1.9 4.8 3.6 4.8 6.2c0 2.3.6 3.5 1.2 5.8.6 2.4.7 6.1 2 6.1s1.6-4.3 4-4.3 2.7 4.3 4 4.3 1.4-3.7 2-6.1c.6-2.3 1.2-3.5 1.2-5.8 0-2.6-1.6-4.3-3.8-4.3-1.2 0-2.2.3-3.4 1.1z' />
                    <rect
                      x='9.7'
                      y='7.2'
                      width='4.6'
                      height='3.8'
                      rx='1'
                    />
                  </svg>
                  <span>Inlays</span>
                </span>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M12 3c-1.2-.8-2.2-1.1-3.4-1.1C6.4 1.9 4.8 3.6 4.8 6.2c0 2.3.6 3.5 1.2 5.8.6 2.4.7 6.1 2 6.1s1.6-4.3 4-4.3 2.7 4.3 4 4.3 1.4-3.7 2-6.1c.6-2.3 1.2-3.5 1.2-5.8 0-2.6-1.6-4.3-3.8-4.3-1.2 0-2.2.3-3.4 1.1z' />
                    <path d='M9.4 4.6c-1.1 1.5-1.5 3.4-1.3 5.3.2 1.9.8 3.4 1.6 4.6' />
                  </svg>
                  <span>Veneers</span>
                </span>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M8.6 4.4h6.8l-1 3H9.6z' />
                    <path d='M12 7.6V19' />
                    <path d='M9.8 10.2h4.4M10.2 12.8h3.6M10.7 15.4h2.6' />
                  </svg>
                  <span>Implantate</span>
                </span>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M3.6 15.4c0-4.3 3.7-7.6 8.4-7.6s8.4 3.3 8.4 7.6' />
                    <path d='M7.8 15.4v3.2M12 13.4v5.2M16.2 15.4v3.2' />
                    <path d='M3 19.2h18' />
                  </svg>
                  <span>Brücken</span>
                </span>
                <span
                  className='labitem'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    borderTop: '1px solid var(--color-divider)',
                    paddingTop: '12px',
                  }}>
                  <svg
                    viewBox='0 0 24 24'
                    width='22'
                    height='22'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.15'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    aria-hidden='true'>
                    <path d='M20 12a8 8 0 1 1-2.9-6.2' />
                    <path d='M20.2 4.4v4.4h-4.4' />
                    <path d='M9 12.1l2.2 2.2 3.9-4.2' />
                  </svg>
                  <span>Recall</span>
                </span>
              </div>
              <div
                className='rv'
                style={{
                  marginTop: '38px',
                  borderTop: '1px solid var(--color-accent-300)',
                  paddingTop: '24px',
                  display: 'grid',
                  gap: '26px',
                }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '10px 18px',
                      flexWrap: 'wrap',
                    }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-neutral-700)',
                        flex: '1 1 40%',
                      }}>
                      Mit externem Labor
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--fs-lead)',
                        fontFeatureSettings: "'tnum'",
                        whiteSpace: 'nowrap',
                      }}>
                      ≈ 3 Wochen · 4 Termine
                    </span>
                  </div>
                  <div
                    style={{
                      height: '3px',
                      background: 'var(--color-neutral-200)',
                      marginTop: '12px',
                    }}>
                    <div
                      className='barfill a'
                      style={{ height: '100%', background: 'var(--color-neutral-500)' }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '10px 18px',
                      flexWrap: 'wrap',
                    }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-accent-700)',
                        flex: '1 1 40%',
                      }}>
                      Labor im eigenen Haus
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'var(--fs-lead)',
                        color: 'var(--color-accent-700)',
                        fontFeatureSettings: "'tnum'",
                        whiteSpace: 'nowrap',
                      }}>
                      ≈ 5 Tage · 2 Termine
                    </span>
                  </div>
                  <div
                    style={{
                      height: '3px',
                      background: 'var(--color-accent-200)',
                      marginTop: '12px',
                    }}>
                    <div
                      className='barfill b'
                      style={{ height: '100%', background: 'var(--color-accent)' }}
                    />
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', margin: '0' }}>
                  Typischer Ablauf einer Vollkeramikkrone — Versandwege, Wartezeit und Nachpassungen
                  über ein externes Labor entfallen.
                </p>
              </div>
            </div>
            <figure style={{ margin: '0' }}>
              <img
                className='plate'
                src='/uploads/photos-1786974479454-rmck.jpg'
                alt='Behandlungsraum mit Technik'
                style={{
                  width: '100%',
                  height: '440px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <figcaption
                className='platecap'
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px 2px 0',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                <span style={{ color: 'var(--color-accent-700)' }}>Tafel VI</span>
                <span>Zahnlabor, Arbeitsplatz Keramik</span>
              </figcaption>
            </figure>
          </div>
          {showReviews ? (
            <>
              <div
                style={{ padding: '116px 64px', borderBottom: '1px solid var(--color-divider)' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '20px',
                    marginBottom: '40px',
                  }}>
                  <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h2)', margin: '0' }}>
                    Bewertungen
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '12px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--color-neutral-700)',
                      fontFeatureSettings: "'tnum'",
                    }}>
                    Platzhalter · echte Google-Bewertungen folgen
                  </span>
                </div>
                <div
                  className='rv'
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '44px' }}>
                  {reviews.map((r, rI) => (
                    <Fragment key={rI}>
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'var(--fs-h4)',
                            lineHeight: '1.4',
                          }}>
                          {r.quote}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '11.5px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--color-neutral-700)',
                            margin: '0',
                          }}>
                          {r.who}
                        </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-neutral-600)',
                    margin: '32px 0 0',
                  }}>
                  Platzhalter — hier stehen später echte Google-Bewertungen.
                </p>
              </div>
            </>
          ) : null}
          <div
            className='colophon rv'
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              padding: '40px 64px',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, color-mix(in oklab, var(--color-accent) 6%, #ffffff) 100%)',
              color: 'var(--color-text)',
              borderTop: '1px solid var(--color-accent-300)',
              borderBottom: '1px solid var(--color-accent-300)',
              overflow: 'hidden',
            }}>
            <span
              style={{
                position: 'absolute',
                right: '56px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-heading)',
                fontSize: '132px',
                lineHeight: '1',
                color: 'var(--color-accent)',
                opacity: '0.17',
                fontFeatureSettings: "'tnum'",
                pointerEvents: 'none',
              }}>
              III
            </span>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
              }}>
              Kapitel III
            </div>
            <div style={{ flex: '1', height: '1px', background: 'var(--color-accent-300)' }} />
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px,2.6vw,34px)',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}>
              Wenn Angst im Weg steht
            </div>
          </div>
          <div
            id='1b-angst'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.05fr',
              gap: '0',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <div style={{ padding: '116px 64px', alignSelf: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '400',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                Angstpatienten
              </div>
              <h2
                style={{
                  fontWeight: '400',
                  fontSize: 'var(--fs-h2)',
                  lineHeight: '1.08',
                  margin: '16px 0 20px',
                }}>
                Wenn der letzte Zahnarztbesuch Jahre zurückliegt.
              </h2>
              <p
                style={{
                  textAlign: 'justify',
                  hyphens: 'auto',
                  color: 'var(--color-neutral-800)',
                  margin: '0 0 28px',
                }}>
                Fünf bis zehn Prozent der Menschen meiden den Zahnarzt aus Angst — und riskieren
                damit genau das, wovor sie sich fürchten. Bei uns beginnt nichts mit dem Bohrer: Der
                erste Termin ist ein Gespräch, wenn Sie möchten ohne jede Behandlung.
              </p>
              <div
                style={{
                  display: 'grid',
                  gap: '14px',
                  fontSize: '15px',
                  color: 'var(--color-neutral-800)',
                }}>
                {angst.map((a, aI) => (
                  <Fragment key={aI}>
                    <div
                      className='iconrow'
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: '18px',
                        alignItems: 'start',
                        borderTop: '1px solid var(--color-divider)',
                        paddingTop: '14px',
                      }}>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='var(--color-accent-700)'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                        style={{ marginTop: '3px' }}>
                        <path d={a.icon} />
                      </svg>
                      <span>{a.text}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
              <AngstRegler start={5} />
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h5)',
                  lineHeight: '1.45',
                  margin: '32px 0 0',
                }}>
                Sagen Sie es uns einfach am Telefon — dann planen wir von Anfang an anders.
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                <Link
                  className='btn btn-primary'
                  href='/termin'
                  style={{ padding: '12px 26px', fontSize: '15px' }}>
                  Erstgespräch anfragen
                </Link>
                <a
                  className='btn btn-secondary'
                  href='tel:+49331960926'
                  style={{ padding: '12px 26px', fontSize: '15px' }}>
                  0331 960926
                </a>
              </div>
            </div>
            <figure
              style={{ position: 'relative', margin: '0', height: '100%', minHeight: '640px' }}>
              <img
                className='plate'
                src='/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-12-1-687x1030-1.jpg'
                alt='Wartebereich der Praxis mit Sitzgruppe, Orchideen und Buddha-Figur'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderWidth: '0',
                  outline: '0',
                }}
              />
              <figcaption
                className='platecap'
                style={{
                  position: 'absolute',
                  left: '20px',
                  bottom: '18px',
                  display: 'flex',
                  gap: '14px',
                  padding: '9px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                <span style={{ color: 'var(--color-accent-700)' }}>Tafel VII</span>
                <span>Sitzgruppe, Erstgespräch</span>
              </figcaption>
            </figure>
          </div>
          <div style={{ padding: '116px 64px', borderBottom: '1px solid var(--color-divider)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '40px',
                alignItems: 'baseline',
                marginBottom: '44px',
              }}>
              <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h2)', margin: '0' }}>
                Wie ein Termin bei uns abläuft
              </h2>
              <span style={{ height: '1px', background: 'var(--color-divider)' }} />
            </div>
            <div
              className='rv'
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '44px' }}>
              {ablauf.map((a, aI) => (
                <Fragment key={aI}>
                  <div
                    style={{ borderTop: '1px solid var(--color-accent-300)', paddingTop: '20px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        color: 'var(--color-accent-700)',
                      }}>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'>
                        <path d={a.icon} />
                      </svg>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '13px',
                          letterSpacing: '0.14em',
                          fontFeatureSettings: "'tnum'",
                        }}>
                        {a.no}
                      </span>
                    </div>
                    <h4
                      style={{ margin: '16px 0 8px', fontSize: 'var(--fs-h5)', fontWeight: '400' }}>
                      {a.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'var(--color-neutral-800)',
                        margin: '0',
                      }}>
                      {a.text}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            className='colophon rv'
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              padding: '40px 64px',
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 13%, #ffffff) 0%, color-mix(in oklab, var(--color-accent) 6%, #ffffff) 100%)',
              color: 'var(--color-text)',
              borderTop: '1px solid var(--color-accent-300)',
              borderBottom: '1px solid var(--color-accent-300)',
              overflow: 'hidden',
            }}>
            <span
              style={{
                position: 'absolute',
                right: '56px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-heading)',
                fontSize: '132px',
                lineHeight: '1',
                color: 'var(--color-accent)',
                opacity: '0.17',
                fontFeatureSettings: "'tnum'",
                pointerEvents: 'none',
              }}>
              IV
            </span>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-700)',
              }}>
              Kapitel IV
            </div>
            <div style={{ flex: '1', height: '1px', background: 'var(--color-accent-300)' }} />
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px,2.6vw,34px)',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}>
              Ihr Termin
            </div>
          </div>
          <div
            id='1b-termin'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.05fr',
              gap: '64px',
              padding: '116px 64px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0) 0%, color-mix(in oklab, var(--color-accent) 11%, #ffffff) 100%)',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '400',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                Termin
              </div>
              <h2
                style={{
                  fontWeight: '400',
                  fontSize: 'var(--fs-h2)',
                  lineHeight: '1.08',
                  margin: '16px 0 20px',
                }}>
                Zwei Wunschzeiten genügen.
              </h2>
              <p
                style={{
                  textAlign: 'justify',
                  hyphens: 'auto',
                  maxWidth: '44ch',
                  color: 'var(--color-neutral-800)',
                }}>
                Wir bestätigen Anfragen innerhalb von 24 Stunden. Für akute Beschwerden halten wir
                jeden Morgen Termine frei — rufen Sie in diesem Fall bitte direkt an.
              </p>
              <hr className='hr' />
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h3)',
                  margin: '0',
                }}>
                <a
                  href='tel:+49331960926'
                  style={{ fontFeatureSettings: "'tnum'" }}>
                  0331 960926
                </a>
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-neutral-800)' }}>
                Schopenhauerstraße 37 · 14467 Potsdam
              </p>
            </div>
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div className='field'>
                <label htmlFor='b-name'>Name</label>
                <input
                  className='input'
                  id='b-name'
                  placeholder='Vor- und Nachname'
                />
              </div>
              <div className='field'>
                <label htmlFor='b-tel'>Telefon</label>
                <input
                  className='input'
                  id='b-tel'
                  type='tel'
                  placeholder='Für die Rückbestätigung'
                />
              </div>
              <div className='field'>
                <label htmlFor='b-mail'>E-Mail</label>
                <input
                  className='input'
                  id='b-mail'
                  type='email'
                  placeholder='name@beispiel.de'
                />
              </div>
              <div className='field'>
                <label htmlFor='b-date'>Wunschtermin</label>
                <input
                  className='input'
                  id='b-date'
                  type='date'
                />
              </div>
              <div className='field'>
                <label>Patientenstatus</label>
                <div className='seg'>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-status'
                      checked
                    />
                    <span>Neu</span>
                  </label>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-status'
                    />
                    <span>Bestandspatient</span>
                  </label>
                </div>
              </div>
              <div className='field'>
                <label>Versicherung</label>
                <div className='seg'>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-ins'
                      checked
                    />
                    <span>Gesetzlich</span>
                  </label>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-ins'
                    />
                    <span>Privat</span>
                  </label>
                </div>
              </div>
              <div
                className='field'
                style={{ gridColumn: '1/-1' }}>
                <label>Angst vor der Behandlung?</label>
                <div className='seg'>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-angst'
                      checked
                    />
                    <span>Nein</span>
                  </label>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-angst'
                    />
                    <span>Ja — ich bin Angstpatient/in</span>
                  </label>
                  <label className='seg-opt'>
                    <input
                      type='radio'
                      name='b-angst'
                    />
                    <span>Erstmal nur ein Gespräch</span>
                  </label>
                </div>
              </div>
              <div
                className='field'
                style={{ gridColumn: '1/-1' }}>
                <label htmlFor='b-anliegen'>Anliegen</label>
                <select
                  className='input'
                  id='b-anliegen'>
                  <option>Kontrolle &amp; Prophylaxe</option>
                  <option>Schmerzen / akutes Problem</option>
                  <option>Zahnersatz, Krone oder Implantat</option>
                  <option>Ästhetische Beratung (Veneers, Bleaching)</option>
                  <option>Kinderbehandlung</option>
                  <option>Weisheitszähne / MKG-Chirurgie</option>
                  <option>Etwas anderes</option>
                </select>
              </div>
              <div
                className='field'
                style={{ gridColumn: '1/-1' }}>
                <label htmlFor='b-msg'>Nachricht</label>
                <textarea
                  className='input'
                  id='b-msg'
                  placeholder='Was sollten wir vorab wissen?'
                />
              </div>
              <div
                style={{
                  gridColumn: '1/-1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-neutral-700)',
                    margin: '0',
                    maxWidth: '38ch',
                  }}>
                  Ihre Angaben werden ausschließlich zur Terminvergabe genutzt. Wir melden uns
                  innerhalb von 24 Stunden zurück.
                </p>
                <button
                  className='btn btn-primary'
                  type='button'
                  style={{ padding: '15px 40px', fontSize: 'var(--fs-body)' }}>
                  Anfrage senden
                </button>
              </div>
            </form>
          </div>
          <div
            id='1b-kontakt'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid var(--color-divider)',
            }}>
            <div style={{ padding: '104px 64px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '400',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                Öffnungszeiten
              </div>
              <div style={{ display: 'grid', marginTop: '22px', fontFeatureSettings: "'tnum'" }}>
                {hours.map((h, hI) => (
                  <Fragment key={hI}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '20px',
                        alignItems: 'baseline',
                        padding: '13px 0',
                        borderBottom: '1px solid var(--color-divider)',
                      }}>
                      <span
                        style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-body)' }}>
                        {h.day}
                      </span>
                      <span style={{ textAlign: 'right', color: 'var(--color-neutral-800)' }}>
                        {h.time}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', marginTop: '16px' }}>
                Und nach Vereinbarung.
              </p>
            </div>
            <div style={{ padding: '104px 64px', borderLeft: '1px solid var(--color-divider)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '400',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                Anfahrt &amp; Parken
              </div>
              <div
                className='iconrow'
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '14px 18px',
                  fontSize: '14px',
                  marginTop: '22px',
                  color: 'var(--color-neutral-800)',
                }}>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--color-accent-700)'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                  style={{ marginTop: '2px' }}>
                  <path d='M4 11h16M8 3h8M6 3h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM8 22l2-4M16 22l-2-4' />
                </svg>
                <span>Tram 91, 94, 98 — Luisenplatz-Süd, 4 Minuten zu Fuß</span>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--color-accent-700)'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                  style={{ marginTop: '2px' }}>
                  <path d='M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 104 0M15 17a2 2 0 104 0M5 17h14M5 12h14' />
                </svg>
                <span>Kurzzeit-Parkplätze direkt vor der Praxis</span>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--color-accent-700)'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                  style={{ marginTop: '2px' }}>
                  <path d='M3 20h18M6 20V9l6-4 6 4v11M10 20v-5h4v5' />
                </svg>
                <span>Erdgeschoss, barrierefrei — Zugang ebenerdig</span>
              </div>
              <figure style={{ margin: '24px 0 0' }}>
                <img
                  src='/uploads/Schopenhauer_Str_37_hinten_cropped.webp'
                  alt='Rückseite des Gebäudes Schopenhauerstraße 37 mit der gläsernen Eingangstür zur Zahnarztpraxis und gepflastertem Hof'
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-divider)',
                  }}
                />
                <figcaption
                  style={{
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    color: 'var(--color-neutral-800)',
                    margin: '12px 0 0',
                  }}>
                  Der Eingang liegt auf der
                  <strong style={{ fontWeight: '400', color: 'var(--color-text)' }}>
                    Rückseite
                  </strong>
                  des Gebäudes: Gehen Sie links am Haus vorbei nach hinten in den Hof.
                  <Link href='/anfahrt-parken'>Wegbeschreibung ansehen</Link>
                </figcaption>
              </figure>
              <div
                style={{
                  marginTop: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-divider)',
                  overflow: 'hidden',
                }}>
                <iframe
                  title='Karte Schopenhauerstraße 37, Potsdam'
                  src='https://www.openstreetmap.org/export/embed.html?bbox=13.0414%2C52.3941%2C13.0554%2C52.4011&layer=mapnik&marker=52.3976%2C13.0484'
                  style={{
                    width: '100%',
                    height: '230px',
                    border: '0',
                    display: 'block',
                    filter: 'grayscale(0.35) contrast(1.02)',
                  }}
                  loading='lazy'
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
                Größere Karte öffnen
              </a>
            </div>
          </div>
          <div
            className='rv'
            style={{
              padding: '104px 64px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #17150f 0%, #211d15 100%)',
              color: '#f3f2f2',
            }}>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-400)',
              }}>
              Neue Patienten willkommen
            </div>
            <h2
              style={{
                fontWeight: '400',
                fontSize: 'clamp(34px,4.6vw,62px)',
                lineHeight: '1.04',
                letterSpacing: '-0.03em',
                margin: '24px auto 0',
                maxWidth: '20ch',
                color: '#f7f5f0',
              }}>
              Der erste Termin ist oft nur ein
              <span style={{ fontStyle: 'italic', color: 'var(--color-accent-400)' }}>
                Gespräch
              </span>
              .
            </h2>
            <p
              style={{
                fontSize: 'var(--fs-lead)',
                lineHeight: '1.6',
                maxWidth: '52ch',
                margin: '24px auto 0',
                color: 'rgba(243,242,242,0.72)',
              }}>
              Zwei Wunschzeiten genügen — wir bestätigen innerhalb von 24 Stunden. Für akute
              Beschwerden halten wir jeden Morgen Termine frei.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '40px',
              }}>
              <Link
                className='btn'
                href='/termin'
                style={{
                  padding: '15px 38px',
                  fontSize: 'var(--fs-body)',
                  border: '1px solid var(--color-accent-400)',
                  color: '#17150f',
                  background: 'var(--color-accent-400)',
                }}>
                Termin anfragen
              </Link>
              <a
                className='btn'
                href='tel:+49331960926'
                style={{
                  padding: '15px 38px',
                  fontSize: 'var(--fs-body)',
                  border: '1px solid rgba(243,242,242,0.35)',
                  color: '#f3f2f2',
                }}>
                0331 960926
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px 30px',
                marginTop: '36px',
                fontFamily: 'var(--font-ui)',
                fontSize: '10.5px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(243,242,242,0.5)',
              }}>
              <span>Gesetzlich &amp; privat versichert</span>
              <span>Barrierefrei im Erdgeschoss</span>
              <span>Eigenes Zahnlabor im Haus</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
