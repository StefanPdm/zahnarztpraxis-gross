"use client";

import { FormEvent, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { kontakt } from "@/lib/kontakt";
import {
  ANHANG_ACCEPT,
  ANHANG_TYPEN,
  MAX_ANHAENGE,
  MAX_ANHANG_BYTES,
  MAX_ANHANG_TEXT,
  RUECKMELDUNG_BEWERBUNG,
  type Interesse,
} from "@/lib/bewerbung";

/*
  Bewerbung in einem Schritt: ein Knopf, der ein kurzes Formular öffnet.
  Es soll nur den Kontakt herstellen — alles Weitere im persönlichen
  Gespräch (Auftraggeber, 15.10.2026). Pflicht sind deshalb nur Name und
  E-Mail; Telefon, ein paar Sätze und Anhänge sind freiwillig.

  Versand an app/api/bewerbung: Mail an die Praxis mit den Anhängen,
  Eingangsbestätigung an die Bewerberin oder den Bewerber. Nichts wird im
  Browser gespeichert.

  Der native <dialog> bringt Fokusfalle, Escape und die Sperre des
  Hintergrunds mit. Das Formular bleibt beim Schließen stehen — wer aus
  Versehen Escape drückt, findet seine Eingaben beim nächsten Öffnen wieder.

  Die Wahl „Worum geht es?" kommt als Prop vom Server (lib/karriere.ts).
  `du`: Die Ausbildungsseite duzt, das Formular dort auch.
*/

const nichts = () => () => {};

function Pflicht() {
  return (
    <span aria-hidden="true" className="pflicht">
      *
    </span>
  );
}

type Eigenschaften = {
  knopf: string;
  knopfKlasse: string;
  interessen: Interesse[];
  vorauswahl: string;
  du?: boolean;
};

export default function BewerbungsDialog({ knopf, knopfKlasse, interessen, vorauswahl, du = false }: Eigenschaften) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const nameFeld = useRef<HTMLInputElement>(null);
  const gestartet = useRef(0);
  // Bis React übernommen hat, ist der Knopf gesperrt — ohne Skript gäbe es
  // keinen Dialog und keinen Versand.
  const bereit = useSyncExternalStore(nichts, () => true, () => false);

  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [gesendet, setGesendet] = useState(false);
  // Bewerbung angekommen, aber die Bestätigung an den Absender nicht.
  const [ohneBestaetigung, setOhneBestaetigung] = useState(false);
  const [fehler, setFehler] = useState("");
  const [anhangHinweis, setAnhangHinweis] = useState("");

  const t = du
    ? {
        titel: "Erzähl uns kurz, wer du bist.",
        einleitung: `Ein paar Angaben genügen. Alles Weitere besprechen wir persönlich — wir melden uns ${RUECKMELDUNG_BEWERBUNG}.`,
        nachricht: "Ein paar Sätze über dich — oder wann wir dich am besten erreichen.",
        anhang: "Zeugnis oder Lebenslauf, wenn du schon etwas hast. Muss aber nicht.",
        datenschutz: "Deine Angaben gehen nur per E-Mail an die Praxis und werden ausschließlich für deine Bewerbung verwendet.",
        danke: "Danke! Deine Bewerbung ist angekommen.",
        dankeText: `Du bekommst gleich eine Bestätigung per E-Mail. Wir melden uns ${RUECKMELDUNG_BEWERBUNG}, um ein Gespräch zu vereinbaren.`,
        dankeOhneBestaetigung: `Nur die Bestätigung an deine E-Mail-Adresse ließ sich nicht zustellen. Prüf die Adresse bitte noch einmal — schick die Bewerbung aber nicht erneut. Wir melden uns ${RUECKMELDUNG_BEWERBUNG}.`,
        fehler: `Das hat leider nicht geklappt. Ruf uns bitte an: ${kontakt.telefon}.`,
      }
    : {
        titel: "Kurz vorstellen genügt.",
        einleitung: `Ein paar Angaben reichen. Alles Weitere besprechen wir in einem persönlichen Gespräch — wir melden uns ${RUECKMELDUNG_BEWERBUNG}.`,
        nachricht: "Ein paar Sätze über Sie — oder wann wir Sie am besten erreichen.",
        anhang: "Lebenslauf oder Zeugnisse, wenn Sie möchten. Gern auch später.",
        datenschutz: "Ihre Angaben gehen nur per E-Mail an die Praxis und werden ausschließlich für Ihre Bewerbung verwendet.",
        danke: "Vielen Dank! Ihre Bewerbung ist angekommen.",
        dankeText: `Sie erhalten gleich eine Bestätigung per E-Mail. Wir melden uns ${RUECKMELDUNG_BEWERBUNG}, um ein persönliches Gespräch zu vereinbaren.`,
        dankeOhneBestaetigung: `Nur die Bestätigung an Ihre E-Mail-Adresse ließ sich nicht zustellen. Bitte prüfen Sie die Adresse — senden Sie die Bewerbung aber nicht erneut. Wir melden uns ${RUECKMELDUNG_BEWERBUNG}.`,
        fehler: `Das hat leider nicht geklappt. Bitte rufen Sie uns an: ${kontakt.telefon}.`,
      };

  function oeffnen() {
    gestartet.current = Date.now();
    dialog.current?.showModal();
    // Fokus ins erste Textfeld statt auf den Schließen-Knopf.
    nameFeld.current?.focus();
  }

  function schliessen() {
    dialog.current?.close();
  }

  /** Nach dem Schließen eines erfolgreichen Versands: bereit für die nächste. */
  function beimSchliessen() {
    if (!gesendet) return;
    setGesendet(false);
    setOhneBestaetigung(false);
    setFehler("");
  }

  /** Anzahl, Größe und Art der Dateien schon im Browser prüfen — die Route prüft noch einmal. */
  function pruefeAnhaenge(feld: HTMLInputElement) {
    const dateien = [...(feld.files ?? [])];
    const gesamt = dateien.reduce((s, d) => s + d.size, 0);
    const falsch = dateien.find((d) => !ANHANG_TYPEN[d.name.split(".").pop()?.toLowerCase() ?? ""]);
    const hinweis =
      dateien.length > MAX_ANHAENGE
        ? `Bitte höchstens ${MAX_ANHAENGE} Dateien auswählen.`
        : gesamt > MAX_ANHANG_BYTES
          ? `Zusammen höchstens ${MAX_ANHANG_TEXT}, das sind gerade ${(gesamt / 1024 / 1024).toFixed(1).replace(".", ",")} MB.`
          : falsch
            ? "Bitte nur PDF, JPG, PNG oder Word-Dateien."
            : "";
    feld.setCustomValidity(hinweis);
    setAnhangHinweis(hinweis);
  }

  async function senden(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = event.currentTarget;
    const daten = new FormData(f);
    daten.set("gestartet", String(gestartet.current));
    daten.set("anrede", du ? "du" : "sie");

    setWirdGesendet(true);
    setFehler("");
    try {
      const antwort = await fetch("/api/bewerbung", { method: "POST", body: daten });
      if (antwort.ok) {
        const inhalt = (await antwort.json().catch(() => null)) as { ohneBestaetigung?: boolean } | null;
        f.reset();
        setAnhangHinweis("");
        setOhneBestaetigung(inhalt?.ohneBestaetigung === true);
        setGesendet(true);
        return;
      }
      const inhalt = (await antwort.json().catch(() => null)) as { fehler?: string } | null;
      setFehler(inhalt?.fehler ?? t.fehler);
    } catch {
      setFehler(t.fehler);
    } finally {
      setWirdGesendet(false);
    }
  }

  return (
    <>
      <button type="button" className={knopfKlasse} onClick={oeffnen} disabled={!bereit} aria-haspopup="dialog">
        {knopf}
      </button>
      <dialog ref={dialog} className="bewerbung" aria-labelledby={`${id}-titel`} onClose={beimSchliessen}>
        <div className="bewerbung__kopf">
          <div>
            <div className="ueberzeile">Bewerbung</div>
            <h2 id={`${id}-titel`} className="titel-3 titel-3--eng">
              {gesendet ? t.danke : t.titel}
            </h2>
          </div>
          <button type="button" className="bewerbung__schliessen" onClick={schliessen} aria-label="Schließen">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {gesendet ? (
          <div className="bewerbung__erfolg" role="status">
            <p className="fliesstext">{ohneBestaetigung ? t.dankeOhneBestaetigung : t.dankeText}</p>
            <div className="knopfreihe">
              <button type="button" className="btn btn-primary knopf-gross" onClick={schliessen}>
                Schließen
              </button>
            </div>
          </div>
        ) : (
          <form className="bewerbung__formular" onSubmit={senden}>
            <p className="bewerbung__einleitung">{t.einleitung}</p>

            <div className="field bewerbung__breit">
              <label htmlFor={`${id}-interesse`}>Worum geht es?</label>
              <select className="input" id={`${id}-interesse`} name="interesse" defaultValue={vorauswahl}>
                {interessen.map((i) => (
                  <option key={i.wert} value={i.wert}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${id}-name`}>
                Name <Pflicht />
              </label>
              <input
                ref={nameFeld}
                className="input"
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                minLength={2}
                maxLength={120}
                required
              />
            </div>
            <div className="field">
              <label htmlFor={`${id}-mail`}>
                E-Mail <Pflicht />
              </label>
              <input
                className="input"
                id={`${id}-mail`}
                name="mail"
                type="email"
                autoComplete="email"
                maxLength={180}
                required
              />
            </div>
            <div className="field bewerbung__breit">
              <label htmlFor={`${id}-tel`}>Telefon</label>
              <input className="input" id={`${id}-tel`} name="tel" type="tel" autoComplete="tel" maxLength={60} />
            </div>
            <div className="field bewerbung__breit">
              <label htmlFor={`${id}-nachricht`}>Nachricht</label>
              <textarea
                className="input"
                id={`${id}-nachricht`}
                name="nachricht"
                rows={3}
                maxLength={2000}
                placeholder={t.nachricht}
              />
            </div>
            <div className="field bewerbung__breit">
              <label htmlFor={`${id}-anhang`}>Anhänge</label>
              <input
                className="input bewerbung__datei"
                id={`${id}-anhang`}
                name="anhang"
                type="file"
                multiple
                accept={ANHANG_ACCEPT}
                onChange={(e) => pruefeAnhaenge(e.currentTarget)}
                aria-describedby={`${id}-anhang-hinweis`}
                aria-invalid={anhangHinweis ? true : undefined}
              />
              <p id={`${id}-anhang-hinweis`} className={anhangHinweis ? "feldhinweis" : "feldhinweis feldhinweis-leise"}>
                {anhangHinweis ||
                  `${t.anhang} PDF, JPG, PNG oder Word, bis zu ${MAX_ANHAENGE} Dateien, zusammen höchstens ${MAX_ANHANG_TEXT}.`}
              </p>
            </div>

            {/* Honeypot: für Menschen unsichtbar, muss leer bleiben. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="bewerbung__falle" />

            <div className="bewerbung__fuss">
              <p className="bewerbung__datenschutz">
                <Pflicht /> Pflichtfeld. {t.datenschutz}{" "}
                <Link href="/impressum-datenschutz#datenschutz">Datenschutzerklärung</Link>
              </p>
              <button className="btn btn-primary knopf-gross" type="submit" disabled={wirdGesendet}>
                {wirdGesendet ? "Wird gesendet …" : "Bewerbung absenden"}
              </button>
            </div>
            {fehler && (
              <p className="bewerbung__fehler" role="alert">
                {fehler}
              </p>
            )}
          </form>
        )}
      </dialog>
    </>
  );
}
