/**
 * Die Kontaktangaben, die im Browser landen dürfen.
 *
 * Warum getrennt von lib/praxis.ts: Eine Client-Komponente, die `praxis`
 * importiert, zieht das **ganze** Objekt ins JavaScript-Bündel — ein
 * Objektliteral lässt sich nicht aufteilen. So standen E-Mail-Adresse,
 * Kennzahlen und die Google-Place-ID in einem Chunk, den jeder Besucher
 * lädt, obwohl keine der vier Client-Komponenten sie braucht. Für Bots ist
 * eine Adresse im JavaScript leichter zu ernten als eine im HTML.
 *
 * Hier stehen deshalb nur Telefon und Anschrift: beides ohnehin auf jeder
 * Seite sichtbar. Alles Übrige bleibt in lib/praxis.ts und damit auf dem
 * Server.
 *
 * Regel für neuen Code: In einer Datei mit `"use client"` wird aus
 * `lib/kontakt` importiert, nie aus `lib/praxis`.
 */
export const kontakt = {
  telefon: "0331 960926",
  telefonHref: "tel:+49331960926",
  telefonIntl: "+49331960926",
  strasse: "Schopenhauerstraße 37",
  plz: "14467",
  stadt: "Potsdam",
  ort: "14467 Potsdam",
  region: "Brandenburg",
} as const;
