import { Fragment } from 'react';
import Link from 'next/link';
import { seitenMetadaten } from '@/lib/seiten';
import NotfallLeiste from '@/components/NotfallLeiste';
import { praxis } from '@/lib/praxis';

export const metadata = seitenMetadaten('/impressum-datenschutz');

const haftung = [
  {
    title: 'Inhalte',
    text: 'Für eigene Inhalte auf diesen Seiten sind wir als Diensteanbieter nach den allgemeinen Gesetzen verantwortlich. Trotz sorgfältiger Kontrolle können wir keine Gewähr für Aktualität und Vollständigkeit übernehmen. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Inhalte umgehend.',
  },
  {
    title: 'Externe Links',
    text: 'Unser Angebot enthält Links zu Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar; eine dauerhafte Kontrolle ist ohne konkreten Anlass nicht zumutbar.',
  },
  {
    title: 'Urheberrecht',
    text: 'Texte, Bilder und Gestaltung dieser Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen unserer schriftlichen Zustimmung. Downloads sind für den privaten, nicht kommerziellen Gebrauch gestattet.',
  },
];

/*
  Datenschutzerklärung.

  Die mit `entwurf` markierten Abschnitte sind neu oder umgeschrieben und vor
  dem Livegang von der Praxis beziehungsweise ihrem Anwalt freizugeben. Sie
  beschreiben, was der Code nachweislich tut — geprüft am 21.09.2026:

  · kein Cookie, kein localStorage, kein sessionStorage, kein indexedDB
  · vor einer Einwilligung keine einzige Anfrage an Dritte (CSP in
    next.config.ts: default-src 'self', frame-src nur OpenStreetMap)
  · Bewertungen holt der Server, die Profilbilder liefert next/image von
    unserer Domain (components/GoogleBewertungen)
  · Karte erst nach Klick (components/Karte)

  Wer eines davon ändert, ändert hier mit — sonst steht in der Erklärung
  etwas anderes als im Auslieferungszustand.
*/
type Abschnitt = { no: string; title: string; text: string; entwurf?: boolean };

const datenschutz: Abschnitt[] = [
  {
    no: '01',
    title: 'Verantwortliche Stelle',
    text: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist die Zahnärztliche Gemeinschaftspraxis Chantal Groß und Matthias Groß, Schopenhauerstraße 37, 14467 Potsdam. Sie erreichen uns telefonisch unter 0331 / 96 09 26 oder per E-Mail.',
  },
  {
    no: '02',
    title: 'Datenschutzbeauftragter',
    text: 'Platzhalter — bitte ausfüllen oder streichen: Hat die Praxis einen Datenschutzbeauftragten benannt, gehören Name und Kontaktdaten an diese Stelle. Bei einer Praxis, die Gesundheitsdaten verarbeitet, ist die Benennung in der Regel Pflicht (Art. 37 DSGVO, § 38 BDSG).',
    entwurf: true,
  },
  {
    no: '03',
    title: 'Keine Cookies, kein Tracking',
    text: 'Diese Website setzt keine Cookies und speichert nichts auf Ihrem Gerät — weder für Statistik noch für Werbung. Es gibt keine Analyse-Werkzeuge, keine Zählpixel und keine Weitergabe Ihres Besuchs an Dritte. Deshalb sehen Sie hier auch kein Einwilligungsbanner: Es gibt nichts, worin Sie einwilligen müssten.',
    entwurf: true,
  },
  {
    no: '04',
    title: 'Terminanfrage & Kontaktformular',
    text: 'Ihre Angaben aus dem Formular — Name, Kontaktdaten, Wunschtermin und Ihr Anliegen — verarbeiten wir zur Bearbeitung der Anfrage und für mögliche Anschlussfragen. Rechtsgrundlage sind Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) und die Anbahnung des Behandlungsvertrags (lit. b). Die Anfrage erreicht uns per E-Mail; eine Datenbank auf dieser Website gibt es nicht. Wir löschen die Nachricht, sobald sie erledigt ist und keine Aufbewahrungspflicht entgegensteht. Ihre Einwilligung können Sie jederzeit formlos widerrufen — für die Zukunft.',
    entwurf: true,
  },
  {
    no: '05',
    title: 'Gesundheitsdaten',
    text: 'Angaben zu Beschwerden, Medikamenten oder zur Angst vor der Behandlung sind Gesundheitsdaten nach Art. 9 DSGVO. Wir verarbeiten sie ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a) und nur, um Ihren Termin passend zu planen. Sie gehen unverändert an die Praxis und an niemanden sonst; die Website protokolliert und speichert sie nicht. Bitte senden Sie nur, was für die Terminvergabe nötig ist — Details klären wir im Gespräch. In der Praxis unterliegen Ihre Behandlungsdaten der zahnärztlichen Schweigepflicht und den gesetzlichen Aufbewahrungsfristen.',
    entwurf: true,
  },
  {
    no: '06',
    title: 'Hosting und technischer Betrieb',
    text: 'Betrieb und Pflege dieser Website hat die Praxis an Stefan Heinemann, Potsdam, vergeben, der dabei als Auftragsverarbeiter nach Art. 28 DSGVO für uns tätig ist. Die Seiten liegen auf der Infrastruktur der Netlify, Inc., USA, die als Unterauftragsverarbeiter eingebunden ist; für die Übermittlung in die USA bestehen Standardvertragsklauseln. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und schnellen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Der E-Mail-Verkehr der Praxis läuft davon getrennt über die STRATO AG (siehe Abschnitt 08).',
    entwurf: true,
  },
  {
    no: '07',
    title: 'Server-Logdateien',
    text: 'Beim Abruf der Seiten fallen automatisch Zugriffsdaten an: Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit und IP-Adresse. Sie dienen dem sicheren, störungsfreien Betrieb und der Abwehr von Angriffen, werden nicht mit anderen Datenquellen zusammengeführt und nicht zur Wiedererkennung einzelner Personen ausgewertet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
  },
  {
    no: '08',
    title: 'E-Mail-Versand',
    text: 'Für den Versand der Terminanfrage an die Praxis und Ihrer Eingangsbestätigung nutzen wir die STRATO AG, Pascalstraße 10, 10587 Berlin, als Auftragsverarbeiter nach Art. 28 DSGVO. Die Daten bleiben damit in der Europäischen Union. Ihre Bestätigungsmail enthält Ihre Kontaktangaben und Wunschtermine, aber bewusst keine Angaben zu Ihrer Gesundheit — diese gehen ausschließlich an die Praxis.',
    entwurf: true,
  },
  {
    no: '09',
    title: 'Schriften, Bilder und Video',
    text: 'Alle Schriften, Bilder und das Praxisvideo liegen auf unserem eigenen Server. Es werden keine Google Fonts, keine Bilddienste und keine Videoplattformen von außen eingebunden. Beim Aufruf dieser Seiten entsteht daher keine Verbindung zu Dritten.',
    entwurf: true,
  },
  {
    no: '10',
    title: 'Google-Bewertungen',
    text: 'Auf der Startseite zeigen wir Bewertungen aus unserem Google-Unternehmensprofil. Die Texte holt unser Server einmal täglich über die Google Places API, die Profilbilder liefern wir anschließend von unserer eigenen Domain aus. Ihr Browser baut dabei keine Verbindung zu Google auf, es wird nichts über Ihren Besuch an Google übermittelt und kein Cookie gesetzt. Die Namen und Bilder stammen von den Verfassern der Bewertungen; deren Daten verarbeitet Google als eigenständiger Verantwortlicher.',
    entwurf: true,
  },
  {
    no: '11',
    title: 'Kartenanbieter',
    text: 'Auf der Seite „Anfahrt & Parken" und im Kontaktbereich steht zunächst nur ein Standbild von unserem Server. Erst wenn Sie auf „Interaktive Karte laden" klicken, binden wir eine Karte der OpenStreetMap Foundation ein; dabei werden Ihre IP-Adresse und Browserdaten an deren Server in Großbritannien übertragen. Rechtsgrundlage ist Ihre Einwilligung durch diesen Klick (Art. 6 Abs. 1 lit. a DSGVO). Ohne Klick geschieht nichts.',
    entwurf: true,
  },
  {
    no: '12',
    title: 'Schutz vor Massenanfragen',
    text: 'Damit das Terminformular nicht automatisiert missbraucht wird, merkt sich unser Server für wenige Minuten, von welcher IP-Adresse eine Anfrage kam. Die Angabe liegt nur im Arbeitsspeicher, wird nicht gespeichert und nicht ausgewertet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',
    entwurf: true,
  },
  {
    no: '13',
    title: 'SSL-Verschlüsselung',
    text: 'Diese Seite überträgt Daten verschlüsselt. Eine gesicherte Verbindung erkennen Sie am „https://“ in der Adresszeile und am Schloss-Symbol Ihres Browsers.',
  },
  {
    no: '14',
    title: 'Ihre Rechte',
    text: 'Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, deren Herkunft und Zweck, sowie auf Berichtigung, Einschränkung, Löschung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Zudem können Sie sich bei der zuständigen Aufsichtsbehörde beschweren — für uns ist das die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg. Der Nutzung unserer Kontaktdaten für unverlangte Werbung widersprechen wir ausdrücklich.',
    entwurf: true,
  },
];

export default function ImpressumDatenschutz() {
  return (
    <>
      <NotfallLeiste />
      <div style={{ padding: '96px 64px 56px', borderBottom: '1px solid var(--color-divider)' }}>
        <div className='ueberzeile'>Rechtliches</div>
        <h1 className='seitentitel'>
          Impressum &amp;
          <br />
          Datenschutz
        </h1>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div style={{ padding: '70px 64px' }}>
          <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h3-xl)', margin: '0 0 24px' }}>
            Impressum
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '14px 28px',
              fontSize: '15px',
              color: 'var(--color-neutral-800)',
            }}>
            <span style={{ color: 'var(--color-neutral-700)' }}>Praxis</span>
            <span>
              Chantal Groß | Matthias Groß
              <br />
              Zahnärztliche Gemeinschaftspraxis
            </span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Anschrift</span>
            <span>
              Schopenhauerstraße 37
              <br />
              14467 Potsdam
            </span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Telefon</span>
            <span style={{ fontFeatureSettings: "'tnum'" }}>
              <a href='tel:+49331960926'>0331 / 96 09 26</a>
            </span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Telefax</span>
            <span style={{ fontFeatureSettings: "'tnum'" }}>0331 / 58 11 32 30</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>E-Mail</span>
            <span>
              <a href={`mailto:${praxis.email}`}>{praxis.email}</a>
            </span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Berufsbezeichnung</span>
            <span>Zahnärztin / Zahnarzt, verliehen in der Bundesrepublik Deutschland</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Kammer</span>
            <span>Landeszahnärztekammer Brandenburg</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Aufsicht</span>
            <span>Kassenzahnärztliche Vereinigung Land Brandenburg</span>
            <span style={{ color: 'var(--color-neutral-700)' }}>Verantwortlich</span>
            <span>Chantal Groß und Matthias Groß, Anschrift wie oben</span>
          </div>
          {/* <p
            style={{
              fontSize: '12px',
              color: 'var(--color-neutral-700)',
              marginTop: '26px',
              maxWidth: '52ch',
            }}>
            Platzhalter zur Prüfung: Kammer, Aufsichtsbehörde, Berufsordnung und Umsatzsteuer-ID
            bitte vor Veröffentlichung durch die Praxis bestätigen lassen.
          </p> */}
        </div>
        <div style={{ padding: '70px 64px', borderLeft: '1px solid var(--color-divider)' }}>
          <h2 style={{ fontWeight: '400', fontSize: 'var(--fs-h3-xl)', margin: '0 0 24px' }}>
            Haftung &amp; Urheberrecht
          </h2>
          {haftung.map((h, hI) => (
            <Fragment key={hI}>
              <div
                style={{
                  borderTop: '1px solid var(--color-divider)',
                  padding: '18px 0 0',
                  marginBottom: '18px',
                }}>
                <h3 style={{ fontWeight: '400', fontSize: '20px', margin: '0 0 8px' }}>
                  {h.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.62',
                    color: 'var(--color-neutral-800)',
                    textAlign: 'justify',
                    hyphens: 'auto',
                    margin: '0',
                  }}>
                  {h.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div
        id='datenschutz'
        style={{
          padding: '80px 64px',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-divider)',
        }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'end',
            marginBottom: '52px',
          }}>
          <h2
            style={{
              fontWeight: '400',
              fontSize: 'var(--fs-h2)',
              lineHeight: '1.08',
              margin: '0',
            }}>
            Datenschutzerklärung
          </h2>
          <p className='fliesstext'>
            Als Zahnarztpraxis arbeiten wir täglich mit sensiblen Daten. Auf dieser Website erheben
            wir so wenig wie möglich: Sie können sie nutzen, ohne personenbezogene Daten anzugeben.
            Nur wenn Sie uns eine Terminanfrage senden, verarbeiten wir Ihre Angaben —
            ausschließlich dafür.
          </p>
        </div>
        <div
          className='todo'
          style={{ marginBottom: '44px' }}>
          <b>Vor dem Livegang</b>
          Die als <em>Entwurf</em> markierten Abschnitte sind neu formuliert und beschreiben, was
          die Website technisch tut. Sie gehören von der Praxis oder ihrem Anwalt geprüft und
          freigegeben. Offen ist außerdem eine Angabe: der Datenschutzbeauftragte (Abschnitt 02).
          Diese Box und die Marken entfernen, sobald alles steht.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '44px 72px' }}>
          {datenschutz.map((d, dI) => (
            <Fragment key={dI}>
              <div style={{ borderTop: '1px solid var(--color-accent-300)', paddingTop: '18px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    letterSpacing: '0.14em',
                    color: 'var(--color-accent-700)',
                    fontFeatureSettings: "'tnum'",
                  }}>
                  {d.no}
                </div>
                <h3 style={{ fontWeight: '400', fontSize: 'var(--fs-h4)', margin: '10px 0 10px' }}>
                  {d.title}
                  {d.entwurf && <span className='entwurf'>Entwurf, noch nicht freigegeben</span>}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.62',
                    color: 'var(--color-neutral-800)',
                    textAlign: 'justify',
                    hyphens: 'auto',
                    margin: '0',
                  }}>
                  {d.text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-neutral-700)',
            margin: '44px 0 0',
            maxWidth: '70ch',
          }}>
          Stand dieser Erklärung: 09/2026
        </p>
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
            Fragen zu Ihren Daten?
          </h2>
          <p style={{ color: 'var(--color-neutral-800)', margin: '0', maxWidth: '60ch' }}>
            Auskunft, Berichtigung oder Löschung: eine kurze Nachricht an die Praxis genügt.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '14px' }}>
          <a
            className='btn btn-secondary knopf-gross'
            href={`mailto:${praxis.email}`}>
            E-Mail schreiben
          </a>
          <Link
            className='btn btn-primary knopf-gross'
            href='/kontakt'>
            Kontakt
          </Link>
        </div>
      </div>
    </>
  );
}
