import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import Bild, { VOLL } from '@/components/Bild';
import BewerbungsDialog from '@/components/BewerbungsDialog';
import { praxis } from '@/lib/praxis';
import { interessen, offeneStellen } from '@/lib/karriere';
import { INITIATIV, RUECKMELDUNG_BEWERBUNG } from '@/lib/bewerbung';

export const metadata = seitenMetadaten('/karriere');

/*
  Karriereseite — Ziel der Karriere-Fahne, des Bands auf der Startseite und
  der Hinweise auf /praxis-team und /zahnlabor. Bewusst kurz: Sie stellt die
  offenen Stellen vor und führt weiter, die Einzelheiten stehen auf den
  Stellenseiten. Wer schon hier entschieden ist, kann sich direkt melden.

  Welche Stellen offen sind, steht in lib/karriere.ts. Ist keine mehr offen,
  bleibt die Seite als Einladung zur Initiativbewerbung stehen.

  Ohne Notfall-Zeile: Sie richtet sich an Patienten, diese Seite nicht
  (gilt für alle Karriereseiten, Auftraggeber 15.10.2026).
*/

/** Texte je Stelle — die Eckdaten (offen, Beginn) kommen aus lib/karriere.ts. */
const karten: Record<string, { art: string; titel: string; text: string; punkte: string[]; knopf: string }> = {
  '/karriere/zahntechniker': {
    art: 'Festanstellung',
    titel: 'Zahntechnikerin oder Zahntechniker (w/m/d)',
    text: 'Für das Labor in unserer Praxis: Kronen, Brücken, Prothetik und Implantatversorgungen, analog und digital — mit dem Patienten eine Tür weiter.',
    punkte: ['Vollzeit oder Teilzeit', 'Abgeschlossene Ausbildung in der Zahntechnik', 'CAD/CAM, Modellscanner, 3-D-Drucker im Labor'],
    knopf: 'Zur Stellenanzeige',
  },
  '/ausbildung': {
    art: 'Ausbildung',
    titel: 'Zahnmedizinische Fachangestellte oder Zahnmedizinischer Fachangestellter (w/m/d)',
    text: 'Drei Jahre, in denen der ganze Beruf auf dem Plan steht: Behandlungsassistenz, Prophylaxe, Empfang, Hygiene und Röntgen — und ein Blick ins eigene Labor.',
    punkte: ['Drei Jahre, dual mit Berufsschule', 'Ein erfolgreicher Schulabschluss genügt', 'Sehr gute Übernahmechancen'],
    knopf: 'Zum Ausbildungsplatz',
  },
};

const gruende = [
  {
    title: `Familiengeführt seit ${praxis.gegruendet}`,
    text: 'Die Praxis ist in zweiter Generation in denselben Händen. Wer hier anfängt, arbeitet mit Menschen, die bleiben.',
  },
  {
    title: 'Ein kleines Team',
    text: 'Acht Menschen, fünf Behandlungszimmer. Jeder kennt jeden, und niemand macht jahrelang nur einen Handgriff.',
  },
  {
    title: 'Labor in der Praxis',
    text: 'Zahnärztin, Zahnarzt und Zahntechnik arbeiten Tür an Tür. Fragen klären sich auf dem Flur, nicht per Auftragszettel.',
  },
  {
    title: 'Mitten in Potsdam',
    text: `${praxis.strasse}, ein paar Schritte vom Luisenplatz — mit Tram und Bus gut zu erreichen.`,
  },
];

export default function Karriere() {
  const anzahl = offeneStellen.length;

  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      <div className='seitenkopf'>
        <div>
          <div className='ueberzeile'>
            Karriere ·{' '}
            {anzahl === 0
              ? 'Initiativbewerbung'
              : `${anzahl} ${anzahl === 1 ? 'offene Stelle' : 'offene Stellen'}`}
          </div>
          <h1 className='seitentitel'>
            Arbeiten,
            <br />
            wo man sich
            <br />
            noch kennt.
          </h1>
        </div>
        <div>
          <p className='fliesstext fliesstext--gross'>
            Wir sind eine familiengeführte Zahnarztpraxis in Potsdam Mitte — seit{' '}
            {praxis.gegruendet}, mit fünf Behandlungszimmern und einem eigenen Zahnlabor in der
            Praxis.{' '}
            {anzahl > 0
              ? 'Gerade suchen wir Verstärkung, im Labor und im Praxisteam.'
              : 'Gerade ist keine Stelle ausgeschrieben — eine Bewerbung lohnt sich trotzdem.'}
          </p>
          <div className='knopfreihe'>
            <BewerbungsDialog
              knopf='Initiativ bewerben'
              knopfKlasse='btn btn-primary knopf-gross'
              interessen={interessen}
              vorauswahl={INITIATIV}
            />
            <a
              className='btn btn-secondary knopf-gross'
              href={praxis.telefonHref}>
              {praxis.telefon}
            </a>
          </div>
        </div>
      </div>
      {/* Der echte Empfang der Praxis, die Person darin ist erzeugt — also
          gekennzeichnet (CLAUDE.md, Faustregel zur KI-Kennzeichnung).
          Ohne --mitte: Der Ausschnitt wandert mobil nach rechts, zu ihr. */}
      <figure className='breitband'>
        <Bild
          sizes={VOLL}
          vorrang
          src='/images/karriere-auszubildende-empfang-zahnarztpraxis-potsdam.jpg'
          alt='Zahnmedizinische Auszubildende mit Tablet am Empfang der Praxis, links der Flur zu den Behandlungszimmern mit Gemälden in Rot und Orange'
        />
        <span className='ai-badge'>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG-Kennzeichnung, nichts zu optimieren */}
          <img
            src='/images/ai-generated-badge.svg'
            alt='KI-generiertes Bild'
          />
        </span>
        <figcaption className='bildmarke umbruch-schmal'>Am Empfang · hier beginnt der Tag</figcaption>
      </figure>
      {anzahl > 0 && (
        <div className='spalten spalten--2 stellenkarten'>
          {offeneStellen.map((s) => {
            const k = karten[s.pfad];
            return (
              <article
                key={s.pfad}
                className='linie-links stellenkarte'>
                <div className='ueberzeile'>
                  {k.art} · {s.beginn}
                </div>
                <h2 className='titel-3'>
                  <Link href={s.pfad}>{k.titel}</Link>
                </h2>
                <p className='text-15'>{k.text}</p>
                <ul className='strichliste strichliste--klein stellenkarte__punkte'>
                  {k.punkte.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className='knopfreihe stellenkarte__knopf'>
                  <Link
                    className='btn btn-primary knopf-gross'
                    href={s.pfad}>
                    {k.knopf}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <div className='spalten spalten--2 spalten--weit abschnitt abschnitt--hoch abschnitt--flaeche abschnitt--linie-unten'>
        <div>
          <div className='ueberzeile'>Warum hier</div>
          <h2 className='titel-2 breite-24'>Eine kleine Praxis arbeitet anders.</h2>
          <p className='fliesstext fliesstext--luft'>
            In großen Zentren hat jede Kraft ihren festen Ausschnitt. Bei uns sieht man den ganzen
            Weg eines Patienten — von der Begrüßung am Empfang bis zur fertigen Krone aus dem
            eigenen Labor.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/praxis-team'>
              Die Praxis kennenlernen
            </Link>
          </div>
        </div>
        <ul className='gruende'>
          {gruende.map((g) => (
            <li key={g.title}>
              <h3 className='zwischentitel'>{g.title}</h3>
              <p className='text-15'>{g.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='abschluss'>
        <div className='ueberzeile ueberzeile--hell'>Initiativbewerbung</div>
        <h2 className='abschluss__titel'>Nichts Passendes dabei?</h2>
        <p className='abschluss__text abschluss__text--breit'>
          Schreiben Sie uns trotzdem. Wir melden uns {RUECKMELDUNG_BEWERBUNG} — auch dann, wenn gerade
          keine Stelle frei ist.
        </p>
        <div className='knopfreihe knopfreihe--mitte'>
          <BewerbungsDialog
            knopf='Initiativ bewerben'
            knopfKlasse='btn knopf-band knopf-band--voll'
            interessen={interessen}
            vorauswahl={INITIATIV}
          />
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
