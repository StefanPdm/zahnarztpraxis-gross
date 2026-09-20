import { Fragment } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Bild from '@/components/Bild';
import { team } from '@/lib/team';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import NotfallLeiste from '@/components/NotfallLeiste';

export const metadata = seitenMetadaten('/praxis-team');

const zahlen = [
  { value: '1991', label: 'Familiengeführt in Potsdam' },
  { value: '5', label: 'Behandlungszimmer mit Tageslicht' },
  { value: '> 500', label: 'Gesetzte Implantate' },
  { value: '1', label: 'Eigenes Labor im Haus' },
];

/* Die drei Stationen einer Behandlung. Bebildert wird der Ort, nicht die
   Person: Mitarbeiterfotos und -namen sind vom Auftraggeber nicht gewünscht. */
const personal = [
  {
    bereich: 'Anmeldung',
    title: 'Ihr erster Kontakt',
    text: 'Terminvergabe, Rückfragen zu Kostenplänen und die Recall-Erinnerung per E-Mail, SMS, Post oder Anruf.',
    bild: '/uploads/empfang-und-flur-zahnarztpraxis-gross-und-gross-potsdam.jpg',
    alt: 'Empfangstresen und Flur mit Bildern in der Zahnarztpraxis Groß & Groß',
  },
  {
    bereich: 'Prophylaxe',
    title: 'Zahnreinigung und Vorsorge',
    text: 'Professionelle Zahnreinigung, Fluoridierung, Fissurenversiegelung und die Anleitung zur Pflege zu Hause — für Erwachsene und Kinder.',
    bild: '/uploads/behandlungszimmer-prophylaxe-zahnarztpraxis-potsdam.jpg',
    alt: 'Behandlungsplatz mit Stuhl und Tageslicht in der Zahnarztpraxis Groß & Groß',
  },
  {
    bereich: 'Zahntechnik',
    title: 'Das Labor im Haus',
    text: 'Kronen, Brücken, Inlays, Veneers, Prothesen und Schienen entstehen hier. Die Zahnfarbe wird direkt am Behandlungsstuhl bestimmt.',
    bild: '/uploads/zahnlabor-werkbank-zahnarztpraxis-potsdam.jpg',
    alt: 'Werkbank im praxiseigenen Zahnlabor mit 3-D-Drucker und Artikulator',
  },
];

const historie = [
  {
    jahr: '1991',
    title: 'Gründung',
    text: 'Dr. med. Christian Groß eröffnet die Praxis in Potsdam Mitte. Sie bleibt seither in Familienhand.',
  },
  {
    jahr: '2013',
    title: 'Zweite Generation',
    text: 'Matthias Groß steigt in die Praxis seines Vaters ein — heute führt er sie gemeinsam mit Chantal Groß.',
  },
  {
    jahr: '2014',
    title: 'Eigenes Zahnlabor',
    text: 'Die Zahntechnik zieht in die Praxis. Seither arbeitet ein eigener Zahntechniker im Haus, Kronen, Brücken und Prothesen entstehen hier.',
  },
  // Vierte Station: Platzhalter bis zur Ansage der Praxis. Jahr und Text
  // ersetzen, dann ist die Reihe vollständig.
  {
    jahr: '202x',
    title: 'Platzhalter',
    text: 'Blindtext: Hier steht die jüngste Station der Praxisgeschichte — ein Satz zum Ereignis, ein Satz dazu, was sich damit für Patientinnen und Patienten geändert hat.',
  },
];

/* Nur Mitgliedschaften — Zertifikate und Fortbildungsstunden gehören nicht in
   dieselbe Liste. Beide Gesellschaften vom Auftraggeber bestätigt.
   `logo`: sobald die offizielle Bilddatei in public/uploads liegt, hier den
   Pfad eintragen — dann steht das Logo statt des Kürzels in der Zeile. */
type Gesellschaft = { name: string; kurz: string; url: string; logo?: string };

const mitgliedschaften: Gesellschaft[] = [
  {
    name: 'Deutsche Gesellschaft für Zahn-, Mund- und Kieferheilkunde',
    kurz: 'DGZMK',
    url: 'https://www.dgzmk.de/',
    logo: '/uploads/dgzmk-logo.png',
  },
  {
    name: 'Deutsche Gesellschaft für Implantologie im Zahn-, Mund- und Kieferbereich',
    kurz: 'DGI',
    url: 'https://www.dginet.de/',
    logo: '/uploads/dgi-logo.png',
  },
];

/* Die Galerie zeigt Räume, keine Menschen: weder Patienten noch Behandler
   (Ansage des Auftraggebers). Die ersten drei Fotos stammen aus rohfotos/. */
const raeume = [
  {
    src: '/uploads/behandlungszimmer-fenster-zahnarztpraxis-potsdam.jpg',
    alt: 'Behandlungszimmer mit Stuhl, Deckenleuchte und Fenster in der Zahnarztpraxis Groß & Groß',
    no: 'I',
    cap: 'Behandlungsplatz am Fenster',
  },
  {
    src: '/uploads/behandlungszimmer-tageslicht-zahnarztpraxis-potsdam.jpg',
    alt: 'Blick in ein Behandlungszimmer mit Stuhl, Bildschirm und Tageslicht',
    no: 'II',
    cap: 'Ein Zimmer, von der Tür aus',
  },
  {
    src: '/uploads/behandlungseinheit-instrumente-zahnarztpraxis-potsdam.jpg',
    alt: 'Instrumente der Behandlungseinheit in ihrer Halterung',
    no: 'III',
    cap: 'Instrumente am Stuhl',
  },
  {
    src: '/uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-5-1-1030x687-1.jpg',
    alt: 'Praxisflur mit beleuchtetem Groß-&-Groß-Logo an der Wand',
    no: 'IV',
    cap: 'Flur, hinter dem Empfang',
  },
  {
    src: '/uploads/Zahnlabor.jpg',
    alt: 'Arbeitsplatz im praxiseigenen Zahnlabor',
    no: 'V',
    cap: 'Das Labor, eine Tür weiter',
  },
  {
    src: '/uploads/photos-1786974461824-wn8d.jpg',
    alt: 'Behandlungszimmer mit Tageslicht in der Zahnarztpraxis Groß & Groß',
    no: 'VI',
    cap: 'Behandlungszimmer, Südlicht',
  },
];

const verweise = [
  {
    href: '/angstpatienten',
    kicker: 'Angstpatienten',
    title: 'Erst reden, dann behandeln',
    text: 'Handzeichen, Pausen und ein erster Termin ohne Behandlung.',
  },
  {
    href: '/kinderzahnheilkunde',
    kicker: 'Kinder',
    title: 'Erst zeigen, dann erklären',
    text: 'Beim ersten Mal wird nur geschaut. Prophylaxe von Anfang an.',
  },
  {
    href: '/moderne-technik',
    kicker: 'Technik',
    title: 'Laser, CAD/CAM, Röntgen',
    text: 'Was in unseren Räumen steht und was es für Sie ändert.',
  },
];

export default function PraxisTeam() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'end',
          padding: '96px 64px 56px',
        }}>
        <div>
          <div className='ueberzeile'>Praxis &amp; Team</div>
          <h1 className='seitentitel'>
            Familiengeführt
            <br />
            seit 1991.
          </h1>
        </div>
        <div>
          <p className='fliesstext fliesstext--gross'>
            Eine Praxis, die seit über drei Jahrzehnten in denselben Händen liegt, arbeitet anders
            als eine, die alle paar Jahre den Betreiber wechselt. Wir kennen viele unserer Patienten
            über zwei Generationen — und weil Zahnärztin, Zahnarzt und Zahntechniker hier zusammen
            unter einem Dach arbeiten, entscheidet nicht der Kalender, sondern der Fall.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-primary knopf-gross'
              href='/#termin'>
              Termin anfragen
            </Link>
            <a
              className='btn btn-secondary knopf-gross'
              href='tel:+49331960926'>
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div
        className='statbar'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        {zahlen.map((z, zI) => (
          <Fragment key={zI}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '7px',
                padding: '30px 20px',
                textAlign: 'center',
                borderLeft: '1px solid var(--color-divider)',
              }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h2-sm)',
                  lineHeight: '1',
                  color: 'var(--color-accent-700)',
                  fontFeatureSettings: "'tnum'",
                }}>
                {z.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                {z.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        className='abschnitt-oben'
        id='team'>
        <div className='ueberzeile'>Ihre Behandler</div>
        <h2 className='titel-2 breite-26'>Wer Sie behandelt — und woher das Können kommt.</h2>
        <p
          style={{
            color: 'var(--color-neutral-800)',
            fontSize: 'var(--fs-body-lg)',
            margin: '18px 0 0',
            maxWidth: '62ch',
            textWrap: 'pretty',
          }}>
          Bewegen Sie den Zeiger über ein Porträt, um Studium, Erfahrung und Zertifikate zu sehen.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          margin: '40px 64px 0',
          paddingBottom: '96px',
        }}>
        {team.map((m, mI) => (
          <Fragment key={mI}>
            {/* Spalte als Flex-Säule: die Schwerpunktzeile sitzt unten, damit
                ihre Linie bei beiden Behandlern auf gleicher Höhe liegt. */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                className='flipcard'
                tabIndex={0}
                style={{
                  position: 'relative',
                  height: '520px',
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
                    <Bild
                      className='plate portrait'
                      src={m.foto}
                      alt={m.alt}
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
                      {m.werdegang}
                    </p>
                    <div
                      style={{
                        display: 'grid',
                        gap: '0',
                        fontSize: '14px',
                        color: 'var(--color-neutral-800)',
                      }}>
                      {m.fakten.map((f, fI) => (
                        <Fragment key={fI}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '18px',
                              borderTop: '1px solid var(--color-divider)',
                              padding: '10px 0',
                            }}>
                            <span style={{ color: 'var(--color-neutral-700)' }}>{f.label}</span>
                            <span style={{ textAlign: 'right' }}>{f.value}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 style={{ fontWeight: '400', fontSize: 'var(--fs-h3-xl)', margin: '26px 0 6px' }}>
                {m.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11.5px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                  margin: '0 0 18px',
                }}>
                {m.rolle}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h5)',
                  lineHeight: '1.42',
                  color: 'var(--color-text)',
                  margin: '0 0 16px',
                }}>
                {m.zitat}
              </p>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.65',
                  color: 'var(--color-neutral-800)',
                  textAlign: 'justify',
                  hyphens: 'auto',
                  margin: '0 0 16px',
                }}>
                {m.bio}
              </p>
              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--color-neutral-700)',
                  borderTop: '1px solid var(--color-divider)',
                  paddingTop: '14px',
                  margin: 'auto 0 0',
                }}>
                {m.schwerpunkte}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          padding: '80px 64px',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
          background: 'var(--color-surface)',
        }}>
        <div className='ueberzeile'>Das Praxisteam</div>
        <h2
          style={{
            fontWeight: '400',
            fontSize: 'var(--fs-h2)',
            lineHeight: '1.08',
            margin: '16px 0 0',
            maxWidth: '28ch',
          }}>
          Die Menschen, die Sie am Telefon und am Stuhl treffen.
        </h2>
        <p
          style={{
            color: 'var(--color-neutral-800)',
            fontSize: 'var(--fs-body-lg)',
            margin: '18px 0 0',
            maxWidth: '62ch',
            textWrap: 'pretty',
          }}>
          Acht Kolleginnen und Kollegen arbeiten am Empfang, in der Prophylaxe und im Labor. Alle
          sind bestens ausgebildet und arbeiten mit den neuesten Techniken — Fortbildungen und
          Schulungen sind hier selbstverständlich, nicht die Ausnahme.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '0 48px',
            margin: '40px 0 0',
          }}>
          {personal.map((p, pI) => (
            <Fragment key={pI}>
              <div>
                <Bild
                  sizes='(max-width: 1000px) 100vw, 30vw'
                  className='plate'
                  src={p.bild}
                  alt={p.alt}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <div
                  style={{
                    borderTop: '1px solid var(--color-accent-300)',
                    padding: '22px 0',
                    marginTop: '22px',
                  }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '10.5px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-700)',
                    }}>
                    {p.bereich}
                  </div>
                  <h3
                    style={{
                      fontWeight: '400',
                      fontSize: 'var(--fs-h4)',
                      lineHeight: '1.16',
                      margin: '10px 0 8px',
                    }}>
                    {p.title}
                  </h3>
                  <p className='text-15'>{p.text}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Praxisgeschichte</div>
        <h2 className='titel-2 breite-24'>Drei Jahrzehnte, eine Familie.</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          margin: '40px 64px 96px',
          borderTop: '1px solid var(--color-divider)',
        }}>
        {historie.map((h, hI) => (
          <Fragment key={hI}>
            <div
              style={{
                padding: '30px 28px 32px 0',
                borderBottom: '1px solid var(--color-divider)',
              }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h3-xl)',
                  lineHeight: '1',
                  color: 'var(--color-accent-700)',
                  fontFeatureSettings: "'tnum'",
                }}>
                {h.jahr}
              </span>
              <h3
                style={{
                  fontWeight: '400',
                  fontSize: 'var(--fs-h4)',
                  lineHeight: '1.16',
                  margin: '14px 0 9px',
                }}>
                {h.title}
              </h3>
              <p className='text-15'>{h.text}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        {/* Mittig in der Zeile: die Liste ist kürzer als das Bild daneben hoch. */}
        <div
          className='abschnitt'
          style={{ alignSelf: 'center' }}>
          <div className='ueberzeile'>Mitgliedschaften</div>
          <h2
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-h2-sm)',
              lineHeight: '1.1',
              margin: '16px 0 18px',
            }}>
            Fachgesellschaften, in denen wir Mitglied sind.
          </h2>
          <div
            style={{
              display: 'grid',
              gap: '0',
              borderTop: '1px solid var(--color-divider)',
              fontSize: '15px',
            }}>
            {mitgliedschaften.map((m, gI) => (
              <Fragment key={gI}>
                <a
                  href={m.url}
                  target='_blank'
                  rel='noopener'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--color-divider)',
                    color: 'var(--color-neutral-800)',
                    textDecoration: 'none',
                  }}>
                  <span>
                    {m.name}
                    <span className='nur-lesbar'>
                      {' '}
                      — Website der Gesellschaft, öffnet in neuem Tab
                    </span>
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexShrink: '0',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-700)',
                      whiteSpace: 'nowrap',
                    }}>
                    {/* alt bleibt leer: der Name der Gesellschaft steht schon
                        im Linktext, das Logo wiederholt ihn nur bildlich. */}
                    {m.logo ? (
                      <Bild
                        sizes='60px'
                        src={m.logo}
                        alt=''
                        style={{ width: 'auto', height: '38px' }}
                      />
                    ) : (
                      m.kurz
                    )}
                    <svg
                      width='11'
                      height='11'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      aria-hidden='true'>
                      <path d='M7 17 L17 7' />
                      <path d='M9 7h8v8' />
                    </svg>
                  </span>
                </a>
              </Fragment>
            ))}
          </div>
          <p
            style={{
              color: 'var(--color-neutral-800)',
              fontSize: 'var(--fs-body-lg)',
              margin: '26px 0 0',
              maxWidth: '52ch',
              textWrap: 'pretty',
            }}>
            Über die Mitgliedschaft kommen Leitlinien, Fortbildungen und Kongresse der
            Fachgesellschaften direkt in die Praxis. So bleibt unser Wissen auf dem Stand der
            Wissenschaft — dauerhaft, nicht nur einmal nach dem Examen.
          </p>
        </div>
        {/* Kein Parallax-Rahmen: die Szene läuft über die volle Bildbreite,
            der Überstand von 140 % würde die Personen am Rand anschneiden.
            Das Bild füllt die Rasterzelle ganz aus — sonst bliebe unten ein
            weißer Streifen, auf dem die KI-Kennzeichnung liegen würde. */}
        <figure
          style={{
            position: 'relative',
            overflow: 'hidden',
            margin: '0',
            borderLeft: '1px solid var(--color-divider)',
          }}>
          <Bild
            sizes='(max-width: 1000px) 100vw, 50vw'
            src='/uploads/beratung-zahnimplantat-modell.jpg'
            alt='Beratungsgespräch am Tisch: ein Zahnarzt erklärt einem Paar ein Implantatmodell'
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 45%',
            }}
          />
          {/* Die Gezeigten gehören nicht zur Praxis — das muss am Bild stehen,
              nicht nur im Alt-Text. Gegenstück zur KI-Kennzeichnung rechts. */}
          <span className='ai-badge'>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG-Kennzeichnung, nichts zu optimieren */}
            <img
              src='/uploads/ai-generated-badge.svg'
              alt='KI-generiertes Bild'
            />
          </span>
        </figure>
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Die Räume</div>
        <h2 className='titel-2 breite-26'>Fünf Behandlungszimmer mit Tageslicht.</h2>
        <p
          style={{
            color: 'var(--color-neutral-800)',
            fontSize: 'var(--fs-body-lg)',
            margin: '18px 0 0',
            maxWidth: '62ch',
            textWrap: 'pretty',
          }}>
          Die Praxis liegt im 1. Stock eines Altbaus, barrierefrei erreichbar. Fünf
          Behandlungszimmer, ein Wartebereich, in dem man sitzen mag — und das eigene Zahnlabor eine
          Tür weiter.
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '20px',
          margin: '40px 64px 96px',
        }}>
        {raeume.map((r, rI) => (
          <Fragment key={rI}>
            <figure style={{ margin: '0' }}>
              <Bild
                sizes='(max-width: 1000px) 100vw, 30vw'
                className='plate'
                src={r.src}
                alt={r.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <figcaption
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '11px 2px 0',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral-700)',
                }}>
                <span style={{ color: 'var(--color-accent-700)' }}>{r.no}</span>
                <span>{r.cap}</span>
              </figcaption>
            </figure>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        {verweise.map((v, vI) => (
          <Fragment key={vI}>
            <a
              href={v.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '44px 40px',
                borderLeft: '1px solid var(--color-divider)',
                color: 'var(--color-text)',
                textDecoration: 'none',
              }}>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10.5px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-700)',
                }}>
                {v.kicker}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-h3)',
                  lineHeight: '1.16',
                }}>
                {v.title}
              </span>
              <span
                style={{
                  fontSize: '14.5px',
                  lineHeight: '1.6',
                  color: 'var(--color-neutral-800)',
                }}>
                {v.text}
              </span>
            </a>
          </Fragment>
        ))}
      </div>
      <div className='abschluss'>
        <div className='ueberzeile ueberzeile--hell'>Termin</div>
        <h2 className='abschluss__titel'>Lernen Sie uns kennen.</h2>
        <p className='abschluss__text'>
          Senden Sie zwei Wunschzeiten und Ihr Anliegen — wir bestätigen innerhalb von 24 Stunden.
        </p>
        <div className='knopfreihe knopfreihe--mitte'>
          <Link
            className='btn knopf-band knopf-band--voll'
            href='/#termin'>
            Termin anfragen
          </Link>
          <a
            className='btn knopf-band knopf-band--rahmen'
            href='tel:+49331960926'>
            0331 960926
          </a>
        </div>
      </div>
    </>
  );
}
