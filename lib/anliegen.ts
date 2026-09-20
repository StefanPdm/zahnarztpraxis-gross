/**
 * Die Anliegen-Knöpfe unter der Hero und die Auswahl im Termin-Formular.
 *
 * Eine Quelle für beide: der Knopf schreibt genau den Wert in das Feld, den
 * das Formular anbietet. Wer hier einen Eintrag ergänzt, muss ihn auch in der
 * <select>-Liste in components/TerminFormular führen — sonst greift die
 * Vorauswahl ins Leere.
 */

export type Anliegen = { schluessel: string; label: string; feldwert: string };

export const anliegen: Anliegen[] = [
  { schluessel: "kontrolle", label: "Kontrolle", feldwert: "Kontrolle & Prophylaxe" },
  { schluessel: "schmerzen", label: "Schmerzen", feldwert: "Schmerzen / akutes Problem" },
  { schluessel: "beratung", label: "Beratung", feldwert: "Beratung" },
];

/** Vorbelegung aus ?anliegen=… — Schlüssel auf Feldwert. */
export const feldwertZuSchluessel: Record<string, string> = Object.fromEntries(
  anliegen.map((a) => [a.schluessel, a.feldwert]),
);

/** Sprungziel der Formularsektion auf der Startseite. */
export const TERMIN_ANKER = "termin";
