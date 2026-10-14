import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Bild, { VOLL } from '@/components/Bild';
import strukturierteDaten from './jsonld.json';
import { seitenMetadaten } from '@/lib/seiten';
import BewerbungsDialog from '@/components/BewerbungsDialog';
import Fragen from '@/components/Fragen';
import { praxis } from '@/lib/praxis';
import { interessen, zahntechnik } from '@/lib/karriere';

export const metadata = seitenMetadaten('/karriere/zahntechniker');

/*
  Stellenanzeige Zahntechnik. Die Texte hat der Auftraggeber am 15.10.2026
  ausdrücklich zur freien Formulierung freigegeben (lib/karriere.ts) —
  angelehnt an übliche Ausschreibungen, aber nur mit dem, was die Praxis
  tatsächlich hat: Labor in der Praxis, CAD/CAM, Modellscanner,
  Intraoralscanner, 3-D-Drucker und Keramiköfen (Foto des Labors).
  Gehalt bewusst noch nicht — kommt vom Auftraggeber.

  Anrede „Sie": Die Anzeige richtet sich an Fachkräfte. Nur /ausbildung duzt.

  Ohne Notfall-Zeile — sie richtet sich an Patienten (Auftraggeber,
  15.10.2026). Bewerben über das Kurzformular (components/BewerbungsDialog).
*/

const stellentitel = `${zahntechnik.beruf} ${zahntechnik.zusatz}`;

const zahlen = [
  { value: 'Ab sofort', label: 'Beginn' },
  { value: 'Voll / Teilzeit', label: 'Umfang nach Absprache' },
  { value: 'Eine Tür', label: 'bis zum Behandlungsstuhl' },
  { value: `Seit ${praxis.gegruendet}`, label: 'familiengeführt' },
];

const aufgaben = [
  {
    no: '01',
    title: 'Festsitzender Zahnersatz',
    text: 'Kronen, Brücken, Inlays und Veneers aus Vollkeramik und Zirkon — am Rechner konstruiert, von Hand geschichtet und an die Zahnfarbe angepasst.',
  },
  {
    no: '02',
    title: 'Zahnersatz auf Implantaten',
    text: `Kronen, Brücken und Prothesen auf Implantaten, geplant zusammen mit der Implantation. Bei ${praxis.implantate} Implantaten, die Matthias Groß gesetzt hat, ist das hier kein Sonderfall.`,
  },
  {
    no: '03',
    title: 'Prothetik',
    text: 'Interimsprothesen und endgültige Versorgungen, Anpassungen und Reparaturen. Oft, während der Patient in der Praxis wartet, statt eine Woche später.',
  },
  {
    no: '04',
    title: 'Die digitale Strecke',
    text: 'Daten aus dem Intraoralscanner und dem Modellscanner übernehmen, konstruieren, im 3-D-Drucker oder per CAD/CAM fertigen. Daneben bleiben Gips, Schienen und Provisorien Handarbeit.',
  },
  {
    no: '05',
    title: 'Am Patienten',
    text: 'Die Zahnfarbe im Tageslicht am Behandlungsstuhl bestimmen, Anproben begleiten, eine Korrektur gleich vor Ort machen. Das sieht man in einem Fremdlabor nie.',
  },
];

const mitbringen = [
  'Eine abgeschlossene Ausbildung als Zahntechnikerin oder Zahntechniker',
  'Erfahrung mit festsitzendem und herausnehmbarem Zahnersatz',
  'Kenntnisse in CAD/CAM — oder die Lust, sie bei uns zu vertiefen',
  'Ein Auge für Farbe und Form, gern mit Erfahrung in der Keramikschichtung',
  'Freude am Gespräch mit Patienten, nicht nur am Werkstück',
  'Sorgfalt, Verlässlichkeit und Sinn für ein kleines Team',
];

const bieten = [
  'Eine unbefristete Anstellung, in Vollzeit oder Teilzeit',
  'Ein eingerichtetes Labor: CAD/CAM, Modellscanner, 3-D-Drucker, Keramiköfen',
  'Abwechslung statt Serienfertigung, vom Inlay bis zur Implantatversorgung',
  'Kurze Wege zu Zahnärztin und Zahnarzt — Matthias Groß ist selbst gelernter Zahntechniker',
  'Fortbildungen und Schulungen, die wir unterstützen',
  'Geregelte Arbeitszeiten, abgestimmt auf die Sprechzeiten der Praxis',
  'Ein familiengeführtes Team mitten in Potsdam',
];

const gruende = [
  {
    title: 'Sie sehen, für wen Sie arbeiten',
    text: 'Im gewerblichen Labor ist ein Patient eine Auftragsnummer. Hier steht er eine Tür weiter, und Sie hören, ob die Krone sich richtig anfühlt.',
  },
  {
    title: 'Ein Chef, der Ihr Handwerk kennt',
    text: 'Matthias Groß hat vor dem Studium Zahntechniker gelernt. Er weiß, was ein Labor braucht, und spricht mit Ihnen über den Fall statt über einen Auftragszettel.',
  },
  {
    title: 'Kein Akkord',
    text: 'Wir fertigen für die eigenen Patienten, nicht für zwanzig Praxen. Eine aufwendige Arbeit darf die Zeit bekommen, die sie braucht.',
  },
  {
    title: 'Mitten in Potsdam',
    text: `${praxis.strasse}, ein paar Schritte vom Luisenplatz. Mit Tram und Bus gut zu erreichen.`,
  },
];

const faq = [
  {
    q: 'Vollzeit oder Teilzeit?',
    a: 'Beides ist möglich. Wie viele Stunden und an welchen Tagen, besprechen wir mit Ihnen — die Arbeitszeiten richten sich nach den Sprechzeiten der Praxis.',
  },
  {
    q: 'Ich habe bisher wenig mit CAD/CAM gearbeitet. Lohnt sich die Bewerbung?',
    a: 'Ja. Handwerkliches Können und ein Auge für Farbe lassen sich schwerer lernen als eine Software. Die digitale Strecke zeigen wir Ihnen in der Einarbeitung.',
  },
  {
    q: 'Wann könnte ich anfangen?',
    a: 'Ab sofort, oder sobald Ihre Kündigungsfrist es zulässt. Sagen Sie uns in der Bewerbung, ab wann Sie frei sind.',
  },
  {
    q: 'Wie läuft die Bewerbung ab?',
    a: `Über „Jetzt bewerben" genügen Name und E-Mail-Adresse, Unterlagen können Sie anhängen, müssen aber nicht. Wir melden uns ${praxis.antwortzeit} und vereinbaren ein persönliches Gespräch. Wenn es von beiden Seiten passt, folgt ein Probetag im Labor.`,
  },
];

/* JobPosting für die Google-Jobsuche. Nur solange die Stelle offen ist:
   Eine Anzeige, die nach der Besetzung weiterläuft, wertet Google ab.
   Ohne Gehalt — Google empfiehlt die Angabe, verlangt sie aber nicht. */
const stellenanzeige = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: stellentitel,
  description: [
    `<p>Wir suchen ${zahntechnik.beginnLang} eine Zahntechnikerin oder einen Zahntechniker ${zahntechnik.zusatz} für das Labor in unserer Praxis, in Vollzeit oder Teilzeit.</p>`,
    '<p>Ihre Aufgaben: festsitzender Zahnersatz aus Vollkeramik und Zirkon, implantatgetragener Zahnersatz, Prothetik mit Anpassungen und Reparaturen, die digitale Strecke mit Intraoralscanner, Modellscanner, CAD/CAM und 3-D-Drucker sowie die Farbbestimmung direkt am Patienten.</p>',
    '<p>Sie bringen eine abgeschlossene Ausbildung als Zahntechnikerin oder Zahntechniker mit, Erfahrung mit festsitzendem und herausnehmbarem Zahnersatz und Freude am Kontakt mit Patienten. CAD/CAM-Kenntnisse sind willkommen, aber keine Bedingung.</p>',
    `<p>Wir sind eine familiengeführte Zahnarztpraxis in Potsdam Mitte, seit ${praxis.gegruendet} in derselben Familie, mit ${praxis.behandlungszimmer} Behandlungszimmern und eigenem Labor in der Praxis. Wir bieten eine unbefristete Anstellung, ein eingerichtetes Labor, kurze Wege zu den Behandlern und Unterstützung bei Fortbildungen.</p>`,
  ].join(''),
  datePosted: zahntechnik.veroeffentlicht,
  validThrough: zahntechnik.gueltigBis,
  employmentType: ['FULL_TIME', 'PART_TIME'],
  totalJobOpenings: zahntechnik.stellen,
  occupationalCategory: 'Zahntechniker',
  industry: 'Zahnmedizin',
  educationRequirements: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'professional certificate',
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

export default function Zahntechniker() {
  const bewerbung = `mailto:${praxis.email}?subject=${encodeURIComponent('Bewerbung Zahntechnik')}`;

  return (
    <>
      <JsonLd daten={strukturierteDaten} />
      {zahntechnik.offen && <JsonLd daten={stellenanzeige} />}
      <div className='seitenkopf'>
        <div>
          <div className='ueberzeile'>
            Stellenangebot · {zahntechnik.offen ? zahntechnik.beginnLang : 'derzeit besetzt'}
          </div>
          <h1 className='seitentitel'>
            Zahntechnik,
            <br />
            eine Tür neben
            <br />
            dem Patienten.
          </h1>
        </div>
        <div>
          <p className='fliesstext fliesstext--gross'>
            Wir suchen eine Zahntechnikerin oder einen Zahntechniker {zahntechnik.zusatz} für das
            Labor in unserer Praxis — in Vollzeit oder Teilzeit, {zahntechnik.beginnLang}. Bei uns
            arbeiten Sie nicht nach einem Auftragszettel aus der Ferne: Sie sehen die Patienten,
            bestimmen die Zahnfarbe am Behandlungsstuhl und besprechen jeden Fall direkt mit
            Zahnärztin und Zahnarzt.
          </p>
          <div className='knopfreihe'>
            <BewerbungsDialog
              knopf='Jetzt bewerben'
              knopfKlasse='btn btn-primary knopf-gross'
              interessen={interessen}
              vorauswahl='/karriere/zahntechniker'
            />
            <a
              className='btn btn-secondary knopf-gross'
              href={praxis.telefonHref}>
              {praxis.telefon}
            </a>
          </div>
        </div>
      </div>
      <figure className='breitband breitband--mitte'>
        <Bild
          sizes={VOLL}
          vorrang
          src='/images/zahnlabor-werkbank-drucker-zahnarztpraxis-potsdam.jpg'
          alt='Das Zahnlabor der Praxis: Arbeitsplatz mit Artikulator und Leuchte, links ein 3-D-Drucker, rechts zwei Keramiköfen'
        />
        <figcaption className='bildmarke umbruch-schmal'>
          Ihr Arbeitsplatz · im Labor der Praxis
        </figcaption>
      </figure>
      <div className='statbar spalten spalten--4 abschnitt--linie-unten'>
        {zahlen.map((z) => (
          <div
            key={z.label}
            className='linie-links kennzahl'>
            <span className='kennzahl__wert'>{z.value}</span>
            <span className='kennzahl__marke'>{z.label}</span>
          </div>
        ))}
      </div>
      <div className='abschnitt-oben'>
        <div className='ueberzeile'>Ihre Aufgaben</div>
        <h2 className='titel-2 breite-26'>Vom Inlay bis zur ganzen Versorgung.</h2>
      </div>
      <div className='spalten spalten--2 nummernliste'>
        {aufgaben.map((a) => (
          <div
            key={a.no}
            className='paar nummernpunkt'>
            <span className='nummernpunkt__no'>{a.no}</span>
            <div>
              <h3 className='zwischentitel'>{a.title}</h3>
              <p className='text-15'>{a.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='spalten spalten--2 spalten--weit abschnitt abschnitt--hoch abschnitt--linie-oben abschnitt--flaeche'>
        <div>
          <div className='ueberzeile'>Warum hier</div>
          <h2 className='titel-2 breite-24'>Ein Labor, das zur Praxis gehört.</h2>
          <p className='fliesstext fliesstext--luft'>
            Die meisten Zahntechniker arbeiten weit weg von den Menschen, für die sie arbeiten. Bei
            uns ist das anders: Das Labor ist Teil der Praxis, und was Sie fertigen, sehen Sie
            wenig später im Mund des Patienten — samt seiner Reaktion.
          </p>
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
      <div className='spalten spalten--2 spalten--weit abschnitt abschnitt--hoch abschnitt--linie-oben'>
        <div>
          <div className='ueberzeile'>Das bringen Sie mit</div>
          <h2 className='titel-3 titel-3--eng'>Handwerk und ein Auge für Farbe.</h2>
          <ul className='strichliste'>
            {mitbringen.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className='ueberzeile'>Das bieten wir Ihnen</div>
          <h2 className='titel-3 titel-3--eng'>Was Sie dafür bekommen.</h2>
          <ul className='strichliste'>
            {bieten.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='spalten spalten--2 spalten--weit abschnitt abschnitt--hoch abschnitt--linie-oben'>
        <div>
          <div className='ueberzeile'>So bewerben Sie sich</div>
          <h2 className='titel-2 breite-24'>Ein paar Angaben genügen.</h2>
          <p className='fliesstext fliesstext--luft'>
            Name und E-Mail-Adresse reichen, Lebenslauf und Zeugnisse können Sie anhängen. Ein
            Anschreiben brauchen wir nicht — alles Weitere besprechen wir im persönlichen Gespräch.
            Wir melden uns {praxis.antwortzeit} zurück. Lieber per Mail oder Telefon? Auch gut.
          </p>
          <div className='knopfreihe'>
            <BewerbungsDialog
              knopf='Jetzt bewerben'
              knopfKlasse='btn btn-primary knopf-gross'
              interessen={interessen}
              vorauswahl='/karriere/zahntechniker'
            />
          </div>
        </div>
        <div>
          <p className='kontakt-gross'>
            <a href={bewerbung}>{praxis.email}</a>
          </p>
          <p className='kontakt-gross kontakt-gross--folge'>
            <a href={praxis.telefonHref}>{praxis.telefon}</a>
          </p>
          <p className='kontakt-notiz'>
            {praxis.strasse} · {praxis.ort} — {praxis.eingang}, {praxis.zugang}.
          </p>
          <div className='knopfreihe'>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/zahnlabor'>
              Das Labor ansehen
            </Link>
            <Link
              className='btn btn-secondary knopf-gross'
              href='/karriere'>
              Alle Stellen
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
        pfad='/karriere/zahntechniker'
      />
      <div className='abschluss'>
        <div className='ueberzeile ueberzeile--hell'>Zahntechnik · {zahntechnik.beginnLang}</div>
        <h2 className='abschluss__titel'>Kommen Sie ins Labor.</h2>
        <p className='abschluss__text abschluss__text--breit'>
          Ein paar Angaben über das Formular, oder erst einmal ein Anruf. Den Rest klären wir im
          Gespräch — und am besten an der Werkbank.
        </p>
        <div className='knopfreihe knopfreihe--mitte'>
          <BewerbungsDialog
            knopf='Jetzt bewerben'
            knopfKlasse='btn knopf-band knopf-band--voll'
            interessen={interessen}
            vorauswahl='/karriere/zahntechniker'
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
