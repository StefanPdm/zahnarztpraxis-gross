"use client";

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { feldwertZuSchluessel } from "@/lib/anliegen";

/*
  Termin-Formular, verdrahtet gegen app/api/termin/route.ts.

  Markup 1:1 aus dem Übergabepaket, ergänzt um name, required
  und den Versand. Die Seite selbst bleibt Server Component, damit
  `metadata` und JSON-LD dort stehen bleiben können.

  Datenschutz: Die Angabe zur Zahnarztangst ist ein Gesundheitsdatum. Sie geht
  nur als POST-Body an die eigene Route — nichts wird protokolliert oder im
  Browser gespeichert. Bis React übernommen hat, ist der Knopf gesperrt, damit
  kein nativer Versand die Angaben in eine URL schreibt.
*/

const nichts = () => () => {};

/*
  Sternchen am Pflichtfeld. `aria-hidden`, weil Screenreader das `required`
  am Feld selbst ansagen — gesprochen wäre der Stern nur ein „Sternchen“
  zwischen Wörtern. Die Erklärung dazu steht unten im Formular.
*/
function Pflicht() {
  return (
    <span
      aria-hidden='true'
      style={{ color: 'var(--color-accent-700)' }}>
      *
    </span>
  );
}

export default function TerminFormular() {
  const bereit = useSyncExternalStore(nichts, () => true, () => false);
  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [rueckmeldung, setRueckmeldung] = useState<
    { art: "erfolg" } | { art: "fehler"; text: string } | null
  >(null);
  // Zeitstempel für den Spamschutz — erst im Browser setzen, nicht beim Rendern.
  const gestartet = useRef(0);
  const anliegenFeld = useRef<HTMLSelectElement>(null);
  const formularFeld = useRef<HTMLFormElement>(null);

  /*
    Testhilfe: füllt alle Felder mit Beispieldaten, damit der Versand ohne
    Tipparbeit geprüft werden kann. Ausgelöst wird sie durch einen Klick auf
    das Wort „Formular“ im Hinweissatz neben dem Absendeknopf — es sieht aus
    wie normaler Text. Vor dem Livegang entfernen oder in eine Prüfung auf
    process.env.NODE_ENV fassen.
  */
  function fuelleTestdaten() {
    const f = formularFeld.current;
    if (!f) return;
    const inTagen = (tage: number) =>
      new Date(Date.now() + tage * 86400000).toISOString().slice(0, 10);
    const setze = (name: string, wert: string) => {
      const feld = f.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | RadioNodeList
        | null;
      if (feld) feld.value = wert;
    };

    setze("name", "Max Mustermann");
    setze("tel", "0331 1234567");
    setze("mail", "nurso@schiebetuer.com");
    setze("geburt", "1985-04-17");
    setze("termin1", inTagen(7));
    setze("termin2", inTagen(9));
    setze("tageszeit", "Nachmittag");
    setze("status", "Neu");
    setze("versicherung", "Gesetzlich");
    setze("angst", "Ja — Angstpatient/in");
    setze("anliegen", "Kontrolle & Prophylaxe");
    setze("nachricht", "Testanfrage über das Formular — bitte nicht bearbeiten.");
    const haken = f.elements.namedItem("einverstaendnis") as HTMLInputElement | null;
    if (haken) haken.checked = true;
    // Der Spamschutz verwirft Anfragen, die in unter 3 Sekunden entstehen —
    // beim Testen wäre das ein stiller Fehlschlag. Zeitstempel zurückdatieren.
    gestartet.current = Date.now() - 5000;
  }

  useEffect(() => {
    gestartet.current = Date.now();
    // Im Browser statt auf dem Server gelesen: so bleibt die Seite statisch.
    const wunsch = new URLSearchParams(window.location.search).get("anliegen");
    const wert = wunsch ? feldwertZuSchluessel[wunsch] : undefined;
    if (wert && anliegenFeld.current) anliegenFeld.current.value = wert;
  }, []);

  async function sendeAnfrage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formular = event.currentTarget;
    const daten = new FormData(formular);
    const wert = (name: string) => String(daten.get(name) ?? "").trim();
    // Leere Auswahl gar nicht mitschicken — die Route erwartet dort einen festen Wert oder nichts.
    const auswahl = (name: string) => wert(name) || undefined;

    setWirdGesendet(true);
    setRueckmeldung(null);

    try {
      const antwort = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: wert("name"),
          tel: wert("tel"),
          mail: wert("mail"),
          geburt: wert("geburt"),
          termin1: wert("termin1"),
          termin2: wert("termin2"),
          tageszeit: auswahl("tageszeit"),
          status: auswahl("status"),
          versicherung: auswahl("versicherung"),
          angst: auswahl("angst"),
          anliegen: wert("anliegen"),
          nachricht: wert("nachricht"),
          einverstaendnis: daten.get("einverstaendnis") === "on",
          website: String(daten.get("website") ?? ""),
          gestartet: gestartet.current,
        }),
      });

      if (antwort.ok) {
        formular.reset();
        setRueckmeldung({ art: "erfolg" });
        return;
      }

      const inhalt = (await antwort.json().catch(() => null)) as { fehler?: string } | null;
      setRueckmeldung({
        art: "fehler",
        text:
          inhalt?.fehler ??
          "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns unter 0331 960926 an.",
      });
    } catch {
      setRueckmeldung({
        art: "fehler",
        text: "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns unter 0331 960926 an.",
      });
    } finally {
      setWirdGesendet(false);
    }
  }

  return (
    <form
      method='post'
      ref={formularFeld}
      onSubmit={sendeAnfrage}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div className='field'>
        <label htmlFor='t-name'>
          Name <Pflicht />
        </label>
        <input
          className='input'
          id='t-name'
          name='name'
          placeholder='Vor- und Nachname'
          autoComplete='name'
          minLength={2}
          maxLength={120}
          required
        />
      </div>
      <div className='field'>
        <label htmlFor='t-tel'>
          Telefon <Pflicht />
        </label>
        <input
          className='input'
          id='t-tel'
          name='tel'
          type='tel'
          placeholder='Für die Rückbestätigung'
          autoComplete='tel'
          minLength={5}
          maxLength={60}
          required
        />
      </div>
      <div className='field'>
        <label htmlFor='t-mail'>
          E-Mail <Pflicht />
        </label>
        <input
          className='input'
          id='t-mail'
          name='mail'
          type='email'
          placeholder='name@beispiel.de'
          autoComplete='email'
          maxLength={180}
          required
        />
      </div>
      <div className='field'>
        <label htmlFor='t-birth'>Geburtsdatum</label>
        <input
          className='input'
          id='t-birth'
          name='geburt'
          type='date'
          autoComplete='bday'
        />
      </div>
      <div className='field'>
        <label htmlFor='t-date1'>
          Wunschtermin 1 <Pflicht />
        </label>
        <input
          className='input'
          id='t-date1'
          name='termin1'
          type='date'
          required
        />
      </div>
      <div className='field'>
        <label htmlFor='t-date2'>Wunschtermin 2</label>
        <input
          className='input'
          id='t-date2'
          name='termin2'
          type='date'
        />
      </div>
      <fieldset className='field'>
        <legend>Tageszeit</legend>
        <div className='seg'>
          <label className='seg-opt'>
            <input
              type='radio'
              name='tageszeit'
              value='Vormittag'
              defaultChecked
            />
            <span>Vormittag</span>
          </label>
          <label className='seg-opt'>
            <input
              type='radio'
              name='tageszeit'
              value='Nachmittag'
            />
            <span>Nachmittag</span>
          </label>
        </div>
      </fieldset>
      <fieldset className='field'>
        <legend>Patientenstatus</legend>
        <div className='seg'>
          <label className='seg-opt'>
            <input
              type='radio'
              name='status'
              value='Neu'
              defaultChecked
            />
            <span>Neu</span>
          </label>
          <label className='seg-opt'>
            <input
              type='radio'
              name='status'
              value='Bestandspatient'
            />
            <span>Bestandspatient</span>
          </label>
        </div>
      </fieldset>
      <fieldset className='field'>
        <legend>Versicherung</legend>
        <div className='seg'>
          <label className='seg-opt'>
            <input
              type='radio'
              name='versicherung'
              value='Gesetzlich'
              defaultChecked
            />
            <span>Gesetzlich</span>
          </label>
          <label className='seg-opt'>
            <input
              type='radio'
              name='versicherung'
              value='Privat'
            />
            <span>Privat</span>
          </label>
        </div>
      </fieldset>
      <fieldset
        className='field'
        style={{ gridColumn: '1/-1' }}>
        <legend>Angst vor der Behandlung?</legend>
        <div className='seg'>
          <label className='seg-opt'>
            <input
              type='radio'
              name='angst'
              value='Nein'
              defaultChecked
            />
            <span>Nein</span>
          </label>
          <label className='seg-opt'>
            <input
              type='radio'
              name='angst'
              value='Ja — Angstpatient/in'
            />
            <span>Ja — ich bin Angstpatient/in</span>
          </label>
          <label className='seg-opt'>
            <input
              type='radio'
              name='angst'
              value='Erstmal nur ein Gespräch'
            />
            <span>Erstmal nur ein Gespräch</span>
          </label>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--color-neutral-700)', margin: '8px 0 0' }}>
          Wenn Sie „Angstpatient/in“ wählen, planen wir mehr Zeit ein und besprechen zuerst nur,
          was Sie möchten — ohne Behandlung.{" "}
          <Link href='/angstpatienten'>Wie wir Angstpatienten begleiten</Link>
        </p>
      </fieldset>
      <div className='field'>
        <label htmlFor='t-anliegen'>
          Anliegen <Pflicht />
        </label>
        <select
          className='input'
          id='t-anliegen'
          name='anliegen'
          ref={anliegenFeld}
          required>
          <option>Kontrolle &amp; Prophylaxe</option>
          <option>Professionelle Zahnreinigung</option>
          <option>Schmerzen / akutes Problem</option>
          <option>Beratung</option>
          <option>Zahnersatz, Krone oder Implantat</option>
          <option>Ästhetische Beratung (Veneers, Bleaching)</option>
          <option>Parodontitis-Behandlung</option>
          <option>Knirscherschiene</option>
          <option>Weisheitszähne / Chirurgie</option>
          <option>Kinderbehandlung</option>
          <option>Etwas anderes</option>
        </select>
      </div>
      <div
        className='field'
        style={{ gridColumn: '1/-1' }}>
        <label htmlFor='t-msg'>Nachricht</label>
        <textarea
          className='input'
          id='t-msg'
          name='nachricht'
          rows={4}
          maxLength={4000}
          placeholder='Was sollten wir vorab wissen? Zum Beispiel Angst vor der Behandlung, Medikamente, Vorbehandlungen.'
        />
      </div>
      <label
        style={{
          gridColumn: '1/-1',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          fontSize: '13px',
          color: 'var(--color-neutral-800)',
        }}>
        <input
          type='checkbox'
          name='einverstaendnis'
          required
          style={{ marginTop: '3px', accentColor: 'var(--color-accent)' }}
        />
        <span>
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung der Terminanfrage
          gespeichert werden. <Pflicht />{" "}
          <Link href='/impressum-datenschutz'>Datenschutzerklärung</Link>
        </span>
      </label>
      {/* Honeypot: für Menschen unsichtbar, muss leer bleiben. */}
      <input
        type='text'
        name='website'
        tabIndex={-1}
        autoComplete='off'
        aria-hidden='true'
        style={{ display: 'none' }}
      />
      <div
        style={{
          gridColumn: '1/-1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-neutral-700)',
            margin: '0',
            maxWidth: '44ch',
          }}>
          <Pflicht /> Pflichtfeld. Wir melden uns innerhalb von 24 Stunden zurück. Bitte senden Sie
          keine medizinischen Notfälle über dieses{" "}
          {/* Unsichtbarer Auslöser für die Testdaten: ein Klick auf dieses eine
              Wort füllt das Formular. Es sieht aus wie der übrige Text und ist
              bewusst kein <button> — sonst würde es der Screenreader als
              Schaltfläche ansagen und den Satz zerreißen.

              Nur in der Entwicklung: Im Produktionsbuild fällt der Zweig weg
              und mit ihm die Testadresse, die sonst im ausgelieferten
              JavaScript stünde. */}
          {process.env.NODE_ENV === 'production' ? (
            'Formular'
          ) : (
            <span
              onClick={fuelleTestdaten}
              title='Testdaten einfügen'>
              Formular
            </span>
          )}{" "}
          — bei akuten Schmerzen rufen Sie uns direkt an.
        </p>
        <button
          className='btn btn-primary'
          type='submit'
          disabled={!bereit || wirdGesendet}
          style={{ padding: '12px 30px', fontSize: '15px' }}>
          {wirdGesendet ? 'Wird gesendet ...' : 'Anfrage senden'}
        </button>
      </div>
      {rueckmeldung?.art === 'erfolg' && (
        <p
          role='status'
          style={{ gridColumn: '1/-1', color: 'var(--color-accent-700)', margin: '0' }}>
          Vielen Dank. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      )}
      {rueckmeldung?.art === 'fehler' && (
        <p
          role='alert'
          style={{ gridColumn: '1/-1', color: 'var(--color-accent-700)', margin: '0' }}>
          {rueckmeldung.text}
        </p>
      )}
    </form>
  );
}
