import { Fragment } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Bild from '@/components/Bild';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import NotfallLeiste from '@/components/NotfallLeiste';
import Fragen from '@/components/Fragen';

export const metadata = seitenMetadaten('/prophylaxe');

const schritte = [
  {
    no: '01',
    title: 'Umfassende Untersuchung',
    text: 'Wir schauen zuerst, wo Belag sitzt, wo das Zahnfleisch reagiert und wo Sie beim Putzen nicht hinkommen.',
  },
  {
    no: '02',
    title: 'Beläge entfernen',
    text: 'Schonend werden Zahn- und Belagsablagerungen entfernt.',
  },
  {
    no: '03',
    title: 'Zahnpolitur',
    text: 'Prophylaxemaster von NSK mit automtischer Temperaturanpassung: sanft, gründlich und ohne Kratzer.',
  },
  {
    no: '04',
    title: 'Fluoridierung',
    text: 'Der effektive Schutz für Ihre Zähne: Fluorid härtet den Zahnschmelz und macht ihn widerstandsfähiger gegen Säure.',
  },
  {
    no: '05',
    title: 'Beratung danach',
    text: 'Individuelle Mundhygieneberatung zu Ihrem Zahnfleisch- und Zahngesundheit.',
  },
];

const rhythmus = [
  { fall: 'Normalfall bei gesundem Zahnfleisch', takt: '2× pro Jahr' },
  { fall: 'Zahnfleischtaschen, starke Zahnsteinbildung', takt: '3–4× pro Jahr' },
  { fall: 'Nach Parodontitis-Behandlung, Implantate', takt: 'Nach Recall-Plan' },
];

const nutzen = [
  {
    title: 'Karies',
    icon: 'M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z',
    text: 'Belag in den Zwischenräumen ist die häufigste Ursache. Was regelmäßig entfernt wird, kann keinen Schaden anrichten.',
  },
  {
    title: 'Zahnfleischentzündung',
    icon: 'M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z',
    text: 'Blutendes Zahnfleisch ist ein Warnzeichen. Wird der Reiz früh entfernt, beruhigt es sich wieder — unbehandelt entstehen Taschen.',
  },
  {
    title: 'Zahnverlust im Alter',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
    text: 'Die meisten Zähne gehen nicht durch Karies verloren, sondern durch Knochenabbau bei Parodontitis. Die Prophylaxe ist die wirksamste Vorsorge dagegen.',
  },
];

const faq = [
  {
    q: 'Tut die Zahnreinigung weh?',
    a: 'In der Regel nicht. Bei empfindlichen Zahnhälsen oder entzündetem Zahnfleisch kann es unangenehm werden — sagen Sie es uns, dann arbeiten wir vorsichtiger oder betäuben die Stelle.',
  },
  {
    q: 'Wie lange dauert der Termin?',
    a: 'Rechnen Sie mit etwa einer Stunde. Wie viel Zeit Ihr Fall braucht, hängt davon ab, wie viel Belag und Zahnstein sich gebildet hat.',
  },
  {
    q: 'Zahlt die Krankenkasse die professionelle Zahnreinigung?',
    a: 'Gesetzliche Kassen übernehmen sie meist nicht oder nur mit einem Zuschuss; viele erstatten sie inzwischen teilweise. Fragen Sie bei Ihrer Kasse nach — wir sagen Ihnen vorher, was der Termin kostet.',
  },
  {
    q: 'Werden die Zähne dabei weißer?',
    a: 'Sie werden sauber, und dadurch oft eine Nuance heller, weil Verfärbungen von Kaffee, Tee oder Rauch verschwinden. Die eigene Zahnfarbe verändert sich dabei nicht — dafür wäre ein Bleaching nötig.',
  },
  {
    q: 'Wie oft sollte ich zur Reinigung?',
    a: 'Das hängt von Ihrem Risiko ab, nicht vom Kalender. Bei gesundem Zahnfleisch genügen meist zwei Termine im Jahr, bei Zahnfleischtaschen oder starker Zahnsteinbildung sind es mehr.',
  },
  {
    q: 'Ich war jahrelang nicht beim Zahnarzt. Ist das jetzt schlimm?',
    a: 'Nein, und wir kommentieren es nicht. Wir fangen dort an, wo es für Sie machbar ist — bei Bedarf in mehreren kürzeren Terminen.',
  },
];

export default function Prophylaxe() {
  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <NotfallLeiste />
      <div className='seitenkopf'>
        <div>
          <div className='ueberzeile'>Prophylaxe</div>
          <h1 className='seitentitel'>
            Professionelle
            <br />
            Zahnreinigung
            <br />
            in Potsdam.
          </h1>
        </div>
        <div>
          <p className='fliesstext fliesstext--gross'>
            Für dauerhaft gesunde Zähne und gesundes Zahnfleisch: Unsere professionelle
            Zahnreinigung entfernt schonend hartnäckige Beläge und unterstützt die wirksame
            Vorbeugung von Karies und Parodontitis. Individuell auf Ihre Bedürfnisse abgestimmt,
            sorgt sie nachhaltig für ein gepflegtes, frisches Mundgefühl.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-primary knopf-gross'
              href='/termin'>
              Zahnreinigung anfragen
            </Link>
            <a
              className='btn btn-secondary knopf-gross'
              href='tel:+49331960926'>
              0331 960926
            </a>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 64px 96px' }}>
        <div className='ueberzeile'>Ein Termin, fünf Schritte</div>
        <h2 className='titel-2 breite-26'>Was bei der Reinigung passiert.</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            margin: '40px 0 0',
            borderTop: '1px solid var(--color-divider)',
          }}>
          {schritte.map((s, sI) => (
            <Fragment key={sI}>
              <div
                style={{
                  padding: '28px 22px 30px 0',
                  borderBottom: '1px solid var(--color-divider)',
                }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    color: 'var(--color-accent-700)',
                    fontFeatureSettings: "'tnum'",
                  }}>
                  {s.no}
                </span>
                <h3
                  style={{
                    fontWeight: '400',
                    fontSize: 'var(--fs-h5)',
                    lineHeight: '1.16',
                    margin: '13px 0 9px',
                  }}>
                  {s.title}
                </h3>
                <p
                  style={{
                    color: 'var(--color-neutral-800)',
                    fontSize: '14.5px',
                    lineHeight: '1.6',
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
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
          background: 'var(--color-surface)',
        }}>
        <div className='abschnitt'>
          <div className='ueberzeile'>Der Rhythmus</div>
          <h2 className='titel-2 titel-2--luft'>
            Nach Ihrem persönlichenRisiko, nicht nach Kalender.
          </h2>
          <p className='fliesstext fliesstext--absatz'>
            „Zweimal im Jahr“ ist eine Faustregel, keine Diagnose. Wer kräftigen Zahnstein bildet,
            Zahnfleischtaschen hat, raucht oder Diabetes hat, braucht kürzere Abstände. Wer stabile
            Verhältnisse hat, kommt mit weniger aus.
          </p>
          <p
            style={{
              textAlign: 'justify',
              hyphens: 'auto',
              color: 'var(--color-neutral-800)',
              margin: '0 0 22px',
            }}>
            Wir legen den Abstand nach dem fest, was wir im Mund sehen — und sagen Ihnen, warum.
            Eine professionelle Zahnreinigung zweimal jährlich unterstützt die langfristige
            Gesundheit von Zähnen und Zahnfleisch und kann das Risiko für Parodontitis reduzieren.
            Die optimale Häufigkeit richtet sich nach Ihrer individuellen Mundgesundheit.
          </p>
          <div style={{ display: 'grid', gap: '0', borderTop: '1px solid var(--color-divider)' }}>
            {rhythmus.map((r, rI) => (
              <Fragment key={rI}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    padding: '15px 0',
                    borderBottom: '1px solid var(--color-divider)',
                    fontSize: '15px',
                  }}>
                  <span style={{ color: 'var(--color-neutral-800)' }}>{r.fall}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-700)',
                      whiteSpace: 'nowrap',
                    }}>
                    {r.takt}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', margin: '16px 0 0' }}>
            Anhaltswerte — den Abstand für Ihren Fall bestimmen wir im Termin.
          </p>
        </div>
        <figure
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '620px',
            margin: '0',
            borderLeft: '1px solid var(--color-divider)',
          }}>
          {/* Kein Parallax-Rahmen: das Motiv ist breit angelegt, der Überstand
              von 140 % würde Modell und Instrumente seitlich abschneiden.
              Der Bildausschnitt liegt rechts, dort steht das Motiv. */}
          <Bild
            vorrang
            sizes='(max-width: 1000px) 100vw, 50vw'
            src='/uploads/zahnreinigung-instrumente-zahnarztpraxis-potsdam.jpg'
            alt='Zahnmodell und Instrumente für die professionelle Zahnreinigung auf einer Ablage'
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '72% 50%',
            }}
          />
        </figure>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div className='abschnitt'>
          <div className='ueberzeile'>Zu Hause</div>
          <h2 className='titel-3'>Zahnseide, Bürstchen oder Munddusche?</h2>
          <p className='fliesstext fliesstext--absatz'>
            Das hängt von Ihren Zwischenräumen ab, nicht von der Werbung. Enge Räume brauchen
            Zahnseide, weitere eine Interdentalbürste in der passenden Stärke, und bei Brücken oder
            Implantaten hilft oft die Munddusche zusätzlich.
          </p>
          <p className='fliesstext'>
            Wir zeigen Ihnen im Termin, was zu Ihrem Mund passt — und lassen Sie es einmal selbst
            machen. Das hält länger als jede Erklärung.
          </p>
        </div>
        <div className='abschnitt abschnitt--linie'>
          <div className='ueberzeile'>Fluoridierung</div>
          <h2 className='titel-3'>Zum Abschluss wird der Schmelz gehärtet.</h2>
          <p className='fliesstext fliesstext--absatz'>
            Nach der Reinigung tragen wir Fluorid auf. Es härtet den Zahnschmelz und macht ihn
            widerstandsfähiger gegen Säure — schnell, schmerzfrei und ohne Bohrer.
          </p>
          <p className='fliesstext'>
            Bei Kindern gehört zusätzlich die Fissurenversiegelung dazu: die feinen Rillen der
            Backenzähne werden verschlossen, bevor sich Bakterien dort einnisten.{' '}
            <Link href='/kinderzahnheilkunde'>Mehr zur Kinderprophylaxe</Link>
          </p>
        </div>
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Warum es sich lohnt</div>
        <h2 className='titel-2 breite-26'>Was die Reinigung verhindert.</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '0 48px',
          margin: '40px 64px 96px',
          borderTop: '1px solid var(--color-divider)',
        }}>
        {nutzen.map((n, nI) => (
          <Fragment key={nI}>
            <div style={{ padding: '26px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='var(--color-accent-700)'
                  strokeWidth='1.35'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'>
                  <path d={n.icon} />
                </svg>
                <h3
                  style={{
                    fontWeight: '400',
                    fontSize: 'var(--fs-h4)',
                    lineHeight: '1.16',
                    margin: '0',
                  }}>
                  {n.title}
                </h3>
              </div>
              <p
                style={{
                  color: 'var(--color-neutral-800)',
                  fontSize: '15px',
                  lineHeight: '1.62',
                  margin: '12px 0 0',
                }}>
                {n.text}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          borderTop: '1px solid var(--color-divider)',
          borderBottom: '1px solid var(--color-divider)',
          background: 'var(--color-surface)',
        }}>
        <figure
          style={{ position: 'relative', overflow: 'hidden', minHeight: '460px', margin: '0' }}>
          <Bild
            className='parallax-img'
            src='/uploads/photos-1786974461803-v5uo.jpg'
            alt='Behandlungszimmer mit Fenster in der Zahnarztpraxis Groß & Groß Potsdam'
          />
        </figure>
        <div className='abschnitt abschnitt--linie'>
          <div className='ueberzeile'>Wenn mehr nötig ist</div>
          <h2 className='titel-3'>Blutet Ihr Zahnfleisch beim Putzen?</h2>
          <p className='fliesstext fliesstext--absatz'>
            Dann reicht die Reinigung allein nicht. Blutendes Zahnfleisch ist entzündet, und wenn
            sich Taschen gebildet haben, baut der Kieferknochen unbemerkt ab. Das ist Parodontitis —
            und die häufigste Ursache dafür, dass Zähne im Alter verloren gehen.
          </p>
          <p className='fliesstext'>
            Wir reinigen dann die Taschen, unterstützen mit dem Laser und halten das Ergebnis über
            ein festes Recall-Programm. Sagen Sie im Termin Bescheid, wenn Ihr Zahnfleisch blutet.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/parodontologie'>
              Zur Parodontologie
            </Link>
            <Link
              className='btn btn-primary knopf-gross'
              href='/termin'>
              Termin anfragen
            </Link>
          </div>
        </div>
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Häufige Fragen</div>
        <h2 className='titel-2 breite-24'>Fragen zur Zahnreinigung.</h2>
      </div>
      <Fragen
        eintraege={faq}
        pfad='/prophylaxe'
      />
      <div className='abschluss'>
        <div className='ueberzeile ueberzeile--hell'>Termin</div>
        <h2 className='abschluss__titel'>Einmal gründlich, dann halten Sie es.</h2>
        <p className='abschluss__text'>
          Senden Sie zwei Wunschzeiten — wir bestätigen innerhalb von 24 Stunden und sagen Ihnen
          vorher, was die Reinigung in Ihrem Fall kostet.
        </p>
        <div className='knopfreihe knopfreihe--mitte'>
          <Link
            className='btn knopf-band knopf-band--voll'
            href='/termin'>
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
