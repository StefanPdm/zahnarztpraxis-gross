"use client";

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

/*
  Termin-Formular, verdrahtet gegen app/api/termin/route.ts.

  Markup 1:1 aus dem Übergabepaket (app/termin), ergänzt um name, required
  und den Versand. Die Seite selbst bleibt Server Component, damit
  `metadata` und JSON-LD dort stehen bleiben können.

  Datenschutz: Die Angabe zur Zahnarztangst ist ein Gesundheitsdatum. Sie geht
  nur als POST-Body an die eigene Route — nichts wird protokolliert oder im
  Browser gespeichert. Bis React übernommen hat, ist der Knopf gesperrt, damit
  kein nativer Versand die Angaben in eine URL schreibt.
*/

const nichts = () => () => {};

export default function TerminFormular({ anliegen }: { anliegen?: string }) {
  const bereit = useSyncExternalStore(nichts, () => true, () => false);
  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [rueckmeldung, setRueckmeldung] = useState<
    { art: "erfolg" } | { art: "fehler"; text: string } | null
  >(null);
  // Zeitstempel für den Spamschutz — erst im Browser setzen, nicht beim Rendern.
  const gestartet = useRef(0);

  useEffect(() => {
    gestartet.current = Date.now();
  }, []);

  async function sendeAnfrage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formular = event.currentTarget;
    const daten = new FormData(formular);
    const wert = (name: string) => String(daten.get(name) ?? "").trim();
    // Leere Auswahl gar nicht mitschicken — die Route erwartet dort einen festen Wert oder nichts.
    const auswahl = (name: string) => wert(name) || undefined;

    if (!wert("tel") && !wert("mail")) {
      setRueckmeldung({ art: "fehler", text: "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an." });
      formular.querySelector<HTMLInputElement>("#t-tel")?.focus();
      return;
    }

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
      onSubmit={sendeAnfrage}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div className='field'>
        <label htmlFor='t-name'>Name</label>
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
        <label htmlFor='t-tel'>Telefon</label>
        <input
          className='input'
          id='t-tel'
          name='tel'
          type='tel'
          placeholder='Für die Rückbestätigung'
          autoComplete='tel'
          maxLength={60}
        />
      </div>
      <div className='field'>
        <label htmlFor='t-mail'>E-Mail</label>
        <input
          className='input'
          id='t-mail'
          name='mail'
          type='email'
          placeholder='name@beispiel.de'
          autoComplete='email'
          maxLength={180}
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
        <label htmlFor='t-date1'>Wunschtermin 1</label>
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
      <div className='field'>
        <label>Tageszeit</label>
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
      </div>
      <div className='field'>
        <label>Patientenstatus</label>
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
      </div>
      <div className='field'>
        <label>Versicherung</label>
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
      </div>
      <div
        className='field'
        style={{ gridColumn: '1/-1' }}>
        <label>Angst vor der Behandlung?</label>
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
          was Sie möchten — ohne Behandlung.
          <Link href='/leistungen'>Wie wir Angstpatienten begleiten</Link>
        </p>
      </div>
      <div className='field'>
        <label htmlFor='t-anliegen'>Anliegen</label>
        <select
          className='input'
          id='t-anliegen'
          name='anliegen'
          defaultValue={anliegen}
          required>
          <option>Kontrolle &amp; Prophylaxe</option>
          <option>Professionelle Zahnreinigung</option>
          <option>Schmerzen / akutes Problem</option>
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
          gespeichert werden.
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
          Wir melden uns innerhalb von 24 Stunden zurück. Bitte senden Sie keine medizinischen
          Notfälle über dieses Formular — bei akuten Schmerzen rufen Sie uns direkt an.
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
