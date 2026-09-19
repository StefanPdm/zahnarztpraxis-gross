#!/usr/bin/env node
/**
 * repariere-style-selektoren.mjs
 *
 * PROBLEM
 * -------
 * `site.css` steuert das gesamte mobile Verhalten über Selektoren, die den
 * TEXT des Inline-`style`-Attributs vergleichen:
 *
 *   [style*="padding: 116px"]      { … }
 *   [style*="margin: 0px 64px"]    { … }
 *   [style*="max-width: 1440px"]   { … }
 *
 * Diese Schreibweise stammt aus der Ursprungsumgebung, in der der Browser das
 * Attribut normalisiert hat: Leerzeichen nach dem Doppelpunkt, Längen als
 * `0px`. Weder das exportierte Markup noch React schreiben es so:
 *
 *   Markup im Export   style="padding:80px 64px"      (ohne Leerzeichen)
 *   React-Style-Objekt style="padding:80px 64px"      (ohne Leerzeichen, 0 bleibt 0)
 *   Erwartet von CSS   style="padding: 80px 64px"     (mit Leerzeichen, 0px)
 *
 * Ohne Reparatur greift KEINE dieser 31 Regeln — die Seite sieht auf dem
 * Desktop richtig aus und bricht unter 1000 px komplett auseinander, ohne
 * Fehlermeldung.
 *
 * LÖSUNG
 * ------
 * Jeder betroffene Selektor wird vervielfacht, sodass er alle Schreibweisen
 * trifft. Es wird nichts entfernt — das Verhalten bleibt identisch, der
 * Geltungsbereich wird nur auf die Formen erweitert, die tatsächlich
 * vorkommen.
 *
 * Das ist die Brücke, nicht das Ziel. Sobald alle Seiten stehen, sollten die
 * Inline-Styles schrittweise durch echte Klassen ersetzt werden — so steht es
 * auch in der Arbeitsanweisung. Dann fällt dieses Skript ersatzlos weg.
 *
 *   node scripts/repariere-style-selektoren.mjs app/site.css.original app/site.css
 */

import { readFileSync, writeFileSync } from "node:fs";

const [, , eingang, ausgang] = process.argv;
if (!eingang || !ausgang) {
  console.error(
    "Aufruf: node scripts/repariere-style-selektoren.mjs <quelle.css> <ziel.css>",
  );
  process.exit(1);
}

const css = readFileSync(eingang, "utf8");

/** Alle Schreibweisen, die derselbe Inline-Style annehmen kann. */
function varianten(wert) {
  const menge = new Set([wert]);

  // "padding: 116px" -> "padding:116px"
  menge.add(wert.replace(/:\s+/g, ":"));
  // "padding:116px" -> "padding: 116px"
  menge.add(wert.replace(/:(?!\s)/g, ": "));

  // 0px <-> 0 (React normalisiert nicht, der Browser schon)
  for (const v of [...menge]) {
    menge.add(v.replace(/\b0px\b/g, "0"));
    menge.add(v.replace(/(^|[\s:])0(?![\d.a-z])/g, "$10px"));
  }

  return [...menge];
}

let ersetzungen = 0;

/*
  Ein Selektorabschnitt kann mehrere [style*="…"] enthalten, die zusammen EINE
  Bedingung bilden (z. B. [style*="padding: "][style*=" 64px"]). Deshalb wird
  pro zusammenhängendem Selektor expandiert, nicht pro Attribut.
*/
const repariert = css.replace(
  /(^[^\n{}]*\[style\*=[^\n{}]*)(?=\s*[,{])/gm,
  (selektor) => {
    // Alle Attributwerte im Selektor einsammeln
    const attribute = [...selektor.matchAll(/\[style\*="([^"]*)"\]/g)];
    if (attribute.length === 0) return selektor;

    // Kombinationen aller Varianten bilden
    let formen = [selektor];
    for (const [ganz, wert] of attribute) {
      const naechste = [];
      for (const form of formen) {
        for (const v of varianten(wert)) {
          naechste.push(form.replace(ganz, `[style*="${v}"]`));
        }
      }
      formen = [...new Set(naechste)];
    }

    formen = [...new Set(formen)];
    if (formen.length <= 1) return selektor;

    ersetzungen++;
    const einzug = selektor.match(/^\s*/)[0];
    return formen
      .map((f, i) => (i === 0 ? f : einzug + f.trimStart()))
      .join(",\n");
  },
);

const kopf = `/* ============================================================================
   ERZEUGT — nicht von Hand bearbeiten.

   Quelle: ${eingang}
   Erzeugt von: scripts/repariere-style-selektoren.mjs

   Die [style*="…"]-Selektoren wurden um die Schreibweisen erweitert, die
   React und das exportierte Markup tatsächlich ausgeben. Inhaltliche
   Änderungen gehören in ${eingang}, danach das Skript erneut laufen lassen:

     npm run styles

   ============================================================================ */

`;

writeFileSync(ausgang, kopf + repariert);
console.log(`✓ ${ersetzungen} Selektorgruppen erweitert → ${ausgang}`);
