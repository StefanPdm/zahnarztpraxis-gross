import { Fragment } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Bild, { VOLL } from '@/components/Bild';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import NotfallLeiste from '@/components/NotfallLeiste';
import Fragen from '@/components/Fragen';
import { praxis } from '@/lib/praxis';
import { ausbildung } from '@/lib/ausbildung';

export const metadata = seitenMetadaten('/ausbildung');

/*
  Die einzige Seite, die sich nicht an Patienten richtet — deshalb als
  einzige mit „du". Das ist bei Ausbildungsplätzen üblich und senkt die
  Hemmschwelle; der Rest der Website siezt weiter.

  Eckdaten stehen in lib/ausbildung.ts, nicht hier: Das JobPosting-Markup
  unten liest dieselben Werte. Ist die Stelle besetzt, genügt dort
  `offen: false` — Markup und Bewerbungsaufforderung verschwinden zugleich.
*/

const stellentitel = `Auszubildende zur Zahnmedizinischen Fachangestellten (${ausbildung.kuerzel}) ${ausbildung.zusatz}`;

const zahlen = [
  { value: ausbildung.beginnLang, label: 'Ausbildungsbeginn' },
  { value: String(ausbildung.stellen), label: 'Ausbildungsplatz' },
  { value: `${ausbildung.dauerJahre} Jahre`, label: 'Dauer der Ausbildung' },
  { value: '2', label: 'erfahrene Zahnmediziner' },
];

/* Die vier Bereiche, in denen die Praxis arbeitet, plus Hygiene und Röntgen
   aus der Ausbildungsverordnung. Der letzte Punkt ist das Besondere: Ein
   eigenes Labor hat längst nicht jede Praxis. */
const lernen = [
  {
    no: '01',
    title: 'Behandlungsassistenz',
    text: 'Instrumente vorbereiten, im richtigen Moment reichen, absaugen, den Ablauf im Kopf haben. Am Anfang schaust du zu, nach ein paar Wochen greifst du mit.',
  },
  {
    no: '02',
    title: 'Prophylaxe',
    text: 'Zähne reinigen, Beläge entfernen, Fluorid auftragen, Kindern das Putzen zeigen. Viele ZFA machen später die Fortbildung zur Prophylaxefachkraft — der Einstieg dazu beginnt hier.',
  },
  {
    no: '03',
    title: 'Empfang',
    text: 'Termine vergeben, Rückfragen am Telefon beantworten, Kostenpläne erstellen, gesetzlich und privat abrechnen. Und Patienten die Aufregung nehmen, bevor die Behandlung überhaupt anfängt.',
  },
  {
    no: '04',
    title: 'Hygiene und Röntgen',
    text: 'Du lernst, Röntgenaufnahmen anzufertigen, und bekommst dafür den Strahlenschutznachweis. Dazu die Aufbereitung der Instrumente — unspektakulär, aber der Teil, an dem sich eine gute Praxis erkennen lässt.',
  },
  {
    no: '05',
    title: 'Das eigene Labor',
    text: 'Unser Zahntechniker arbeitet eine Tür weiter, und du darfst dort mit anpacken. Du siehst, wie aus dem Abdruck eine Krone wird — ein Einblick, den es in einer Praxis ohne eigenes Labor nicht gibt.',
  },
];

const gruende = [
  {
    title: 'Ein kleines Team',
    text: 'Acht Menschen. Niemand geht hier unter, und niemand macht drei Jahre lang nur eine Sache. Du bist vom ersten Tag an Teil des Ablaufs, nicht Zuschauerin.',
  },
  {
    title: 'Familiengeführt seit 1991',
    text: 'Die Praxis ist in zweiter Generation in denselben Händen. Wer ausbildet, bleibt — und du lernst nicht bei jemandem, der in zwei Jahren weiterzieht.',
  },
  {
    title: 'Technik, mit der du später weiterkommst',
    text: 'Der digitale Abdruck mit dem Intraoralscanner erspart dir und den Patienten die klebrige Abformmasse. Dazu Laserbehandlung, Röntgen am Bildschirm und CAD/CAM im eigenen Labor.',
  },
  {
    title: 'Mitten in Potsdam',
    text: 'Schopenhauerstraße 37, ein paar Schritte vom Luisenplatz. Mit Tram und Bus gut zu erreichen, auch aus dem Umland.',
  },
];

const mitbringen = [
  'Einen erfolgreichen Schulabschluss — Hauptschule, Realschule oder Abitur',
  'Freude daran, mit Menschen zu arbeiten, auch mit ängstlichen',
  'Einfühlungsvermögen: Du merkst, wenn jemand ein gutes Wort braucht',
  'Zuverlässigkeit, weil Patienten einen Termin haben und der gilt',
  'Sorgfalt und Lust, Neues zu lernen',
];

const bieten = [
  'Sehr gute Übernahmechancen nach bestandener Abschlussprüfung',
  'Eine Ausbildungsvergütung und geregelte Arbeitszeiten',
  'Unterstützung bei der Vorbereitung auf die Prüfungen',
  'Helle Räume mit Tageslicht in allen fünf Behandlungszimmern',
  'Ein Team, das Fragen beantwortet, statt sie abzuwinken',
  'Gemeinsame Team-Abende außerhalb der Praxis',
];

const faq = [
  {
    q: 'Wann geht die Ausbildung los?',
    a: `Am ${ausbildung.beginnLang}. Es ist ${ausbildung.stellen === 1 ? 'ein Platz' : `${ausbildung.stellen} Plätze`} zu vergeben. Bewirb dich früh genug — wir schauen uns die Zuschriften an, sobald sie kommen, und nicht erst kurz vorher.`,
  },
  {
    q: 'Wie lange dauert die Ausbildung?',
    a: 'Drei Jahre, dual: Du arbeitest in der Praxis und gehst daneben zur Berufsschule. Bei guten Leistungen lässt sich die Zeit verkürzen — das entscheidet die Zahnärztekammer auf Antrag.',
  },
  {
    q: 'Was macht eine ZFA eigentlich den ganzen Tag?',
    a: 'Vier Dinge im Wechsel: am Behandlungsstuhl assistieren, Prophylaxe machen, den Empfang mit Terminen und Abrechnung betreuen und im Labor mit anpacken. Dazu Röntgen und die Aufbereitung der Instrumente. Kein Tag ist wie der vorige, und am Schreibtisch sitzen ist es nicht.',
  },
  {
    q: 'Was muss in die Bewerbung?',
    a: 'Dein Lebenslauf und ein paar Sätze, warum dich der Beruf interessiert. Ein förmliches Anschreiben nach Vorlage brauchen wir nicht. Wenn du vorher etwas wissen willst, ruf einfach an — wir melden uns ohnehin innerhalb von 24 Stunden zurück.',
  },
];

/* JobPosting für die Google-Jobsuche. Nur solange die Stelle offen ist:
   Eine Anzeige, die nach der Besetzung weiterläuft, wertet Google ab. */
const stellenanzeige = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: stellentitel,
  description: [
    `<p>Wir bilden zur ${ausbildung.beruf} ${ausbildung.zusatz} aus. Ausbildungsbeginn ist der ${ausbildung.beginnLang}, die Ausbildung dauert ${ausbildung.dauerJahre} Jahre.</p>`,
    '<p>Du lernst alle Bereiche kennen: Behandlungsassistenz, Prophylaxe, Empfang mit Terminvergabe und Abrechnung, Hygiene und Röntgen sowie das praxiseigene Zahnlabor.</p>',
    `<p>Wir sind eine familiengeführte Zahnarztpraxis in Potsdam Mitte, seit ${praxis.gegruendet} in derselben Familie, mit ${praxis.behandlungszimmer} Behandlungszimmern und eigenem Labor in der Praxis.</p>`,
    '<p>Voraussetzung ist ein erfolgreicher Schulabschluss. Wir bieten sehr gute Übernahmechancen, eine Ausbildungsvergütung, geregelte Arbeitszeiten und Unterstützung bei der Prüfungsvorbereitung.</p>',
  ].join(''),
  datePosted: ausbildung.veroeffentlicht,
  validThrough: ausbildung.gueltigBis,
  jobStartDate: ausbildung.beginn,
  employmentType: 'FULL_TIME',
  totalJobOpenings: ausbildung.stellen,
  occupationalCategory: 'Zahnmedizinische Fachangestellte',
  industry: 'Zahnmedizin',
  educationRequirements: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'high school',
  },
  hiringOrganization: {
    '@type': 'Dentist',
    '@id': `${praxis.domain}/#praxis`,
    name: praxis.vollerName,
    url: `${praxis.domain}/`,
    telephone: praxis.telefonIntl,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: praxis.strasse,
      postalCode: praxis.plz,
      addressLocality: praxis.stadt,
      addressRegion: praxis.region,
      addressCountry: 'DE',
    },
  },
  applicantLocationRequirements: { '@type': 'Country', name: 'DE' },
};

export default function Ausbildung() {
  const bewerbung = `mailto:${praxis.email}?subject=${encodeURIComponent('Bewerbung Ausbildung ZFA')}`;

  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      {ausbildung.offen && <JsonLd daten={stellenanzeige} />}
      <NotfallLeiste />
      <div className='seitenkopf'>
        <div>
          <div className='ueberzeile'>Ausbildung · ZFA</div>
          <h1 className='seitentitel'>
            Komm ins Team,
            <br />
            lern den Beruf.
          </h1>
        </div>
        <div>
          <p className='fliesstext fliesstext--gross'>
            Wir bilden aus — zur Zahnmedizinischen Fachangestellten {ausbildung.zusatz}. <br />
            Beginn am {ausbildung.beginnLang}. In einer Praxis, die seit 1991 in Familienhand ist,
            mit tollen Kollegen, fünf Behandlungszimmern und einem eigenen Zahnlabor eine Tür
            weiter. <br />
            Du lernst den Beruf hier nicht in Ausschnitten, sondern ganz: <br />
            vom Behandlungsstuhl über die Prophylaxe bis zum Empfang.
          </p>
          <div className='knopfreihe'>
            <a
              className='btn btn-primary knopf-gross'
              href={bewerbung}>
              Bewerbung schreiben
            </a>
            <a
              className='btn btn-secondary knopf-gross'
              href={praxis.telefonHref}>
              {praxis.telefon}
            </a>
          </div>
        </div>
      </div>
      {/* 3:1-Panorama, deshalb .breitband statt der sonst üblichen festen
          Höhe mit Parallaxe — die schnitte hier links und rechts je ein
          Fünftel weg. Erzeugtes Bild mit einer Person, also gekennzeichnet
          (CLAUDE.md, Faustregel zur KI-Kennzeichnung). */}
      <figure className='breitband'>
        <Bild
          sizes={VOLL}
          vorrang
          src='/images/ausbildung-zfa-behandlungszimmer-scanner.jpg'
          alt='Zahnmedizinische Fachangestellte mit Intraoralscanner neben dem Behandlungsstuhl'
        />
        <span className='ai-badge'>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG-Kennzeichnung, nichts zu optimieren */}
          <img
            src='/images/ai-generated-badge.svg'
            alt='KI-generiertes Bild'
          />
        </span>
        <figcaption
          style={{
            position: 'absolute',
            left: '24px',
            bottom: '20px',
            display: 'flex',
            gap: '14px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.92)',
            fontFamily: 'var(--font-ui)',
            fontSize: '10.5px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-700)',
          }}>
          Am Behandlungsstuhl · mit dem Intraoralscanner
        </figcaption>
      </figure>
      <div
        className='statbar'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
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
                  fontSize: 'var(--fs-h3-lg)',
                  lineHeight: '1.1',
                  color: 'var(--color-accent-700)',
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
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Was du lernst</div>
        <h2 className='titel-2 breite-26'>Fünf Bereiche, kein Schubladendenken.</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 56px',
          margin: '40px var(--rand) 96px',
          borderTop: '1px solid var(--color-divider)',
        }}>
        {lernen.map((l, lI) => (
          <Fragment key={lI}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '20px',
                padding: '26px 0',
                borderBottom: '1px solid var(--color-divider)',
              }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  color: 'var(--color-accent-700)',
                  fontFeatureSettings: "'tnum'",
                  paddingTop: '5px',
                }}>
                {l.no}
              </span>
              <div>
                <h3
                  style={{
                    fontWeight: '400',
                    fontSize: 'var(--fs-h4)',
                    lineHeight: '1.16',
                    margin: '0 0 8px',
                  }}>
                  {l.title}
                </h3>
                <p className='text-15'>{l.text}</p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
          padding: '96px var(--rand)',
          borderTop: '1px solid var(--color-divider)',
          background: 'var(--color-surface)',
        }}>
        <div>
          <div className='ueberzeile'>Warum hier</div>
          <h2 className='titel-2 breite-24'>Eine kleine Praxis bildet anders aus.</h2>
          <p
            className='fliesstext'
            style={{ marginTop: '20px' }}>
            In großen Zentren übernimmt jede Kraft ihren festen Ausschnitt. Bei uns geht das nicht —
            und das ist für die Ausbildung ein Vorteil: Du siehst den ganzen Weg eines Patienten,
            von der Begrüßung am Empfang bis zur fertigen Krone aus dem Labor.
          </p>
        </div>
        <div style={{ display: 'grid', gap: '0' }}>
          {gruende.map((g, gI) => (
            <div
              key={gI}
              style={{ padding: '22px 0', borderTop: '1px solid var(--color-divider)' }}>
              <h3
                style={{
                  fontWeight: '400',
                  fontSize: 'var(--fs-h4)',
                  lineHeight: '1.16',
                  margin: '0 0 8px',
                }}>
                {g.title}
              </h3>
              <p className='text-15'>{g.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
          padding: '96px var(--rand)',
          borderTop: '1px solid var(--color-divider)',
        }}>
        <div>
          <div className='ueberzeile'>Das bringst du mit</div>
          <h2 className='titel-3 titel-3--eng'>Noten sind nicht alles.</h2>
          <ul className='strichliste'>
            {mitbringen.map((m, mI) => (
              <li key={mI}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className='ueberzeile'>Das bieten wir dir</div>
          <h2 className='titel-3 titel-3--eng'>Was du dafür bekommst.</h2>
          <ul className='strichliste'>
            {bieten.map((b, bI) => (
              <li key={bI}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Was die Praxis noch nicht bestätigt hat — sichtbarer Platzhalter
          statt erfundener Angaben (CLAUDE.md, „Nichts erfinden"). */}
      {/* <div
        className='todo'
        style={{ margin: '0 var(--rand) 40px' }}>
        <b>Von der Praxis zu bestätigen</b>
        Höhe der Ausbildungsvergütung · zuständige Berufsschule · Ansprechpartnerin für Bewerbungen
        · ob ein Praktikum oder Schnuppertag möglich ist · Bewerbungsfrist (steht im JobPosting
        derzeit auf dem Tag vor Ausbildungsbeginn) · Instagram oder Facebook, falls vorhanden.
      </div> */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
          padding: '96px var(--rand)',
          borderTop: '1px solid var(--color-divider)',
        }}>
        <div>
          <div className='ueberzeile'>So bewirbst du dich</div>
          <h2 className='titel-2 breite-24'>Lebenslauf genügt.</h2>
          <p
            className='fliesstext'
            style={{ marginTop: '20px' }}>
            Schick uns deinen Lebenslauf und ein paar Sätze, warum dich der Beruf interessiert. Ein
            förmliches Anschreiben nach Vorlage brauchen wir nicht. Wenn du vorher etwas wissen
            willst, ruf an — das beantwortet meist mehr als jede Stellenanzeige. Wir melden uns{' '}
            {praxis.antwortzeit} zurück.
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h3)',
              margin: '0',
              wordBreak: 'break-word',
            }}>
            <a href={bewerbung}>{praxis.email}</a>
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h3)',
              margin: '14px 0 0',
            }}>
            <a
              href={praxis.telefonHref}
              style={{ fontFeatureSettings: "'tnum'" }}>
              {praxis.telefon}
            </a>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--color-neutral-800)', margin: '10px 0 0' }}>
            {praxis.strasse} · {praxis.ort} — {praxis.eingang}, {praxis.zugang}.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/praxis-team'>
              Das Team ansehen
            </Link>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/moderne-technik'>
              Die Technik ansehen
            </Link>
          </div>
        </div>
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Häufige Fragen</div>
        <h2 className='titel-2 breite-24'>Was vor der Bewerbung im Kopf ist.</h2>
      </div>
      <Fragen
        eintraege={faq}
        pfad='/ausbildung'
      />
      <div className='abschluss'>
        <div className='ueberzeile ueberzeile--hell'>Ausbildungsstart {ausbildung.beginnLang}</div>
        <h2 className='abschluss__titel'>Trau dich, schreib uns.</h2>
        <p className='abschluss__text abschluss__text--breit'>
          Du musst nichts vorbereiten und nichts auswendig können. Lebenslauf, ein paar Sätze über
          dich — den Rest klären wir miteinander.
        </p>
        <div className='knopfreihe knopfreihe--mitte'>
          <a
            className='btn knopf-band knopf-band--voll'
            href={bewerbung}>
            Bewerbung schreiben
          </a>
          <a
            className='btn knopf-band knopf-band--rahmen'
            href={praxis.telefonHref}>
            {praxis.telefon}
          </a>
        </div>
      </div>
    </>
  );
}
