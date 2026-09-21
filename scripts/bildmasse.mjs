#!/usr/bin/env node
/**
 * bildmasse.mjs — schreibt lib/bildmasse.json: Breite und Höhe jedes Bildes
 * unter public/images.
 *
 * <Bild> (components/Bild.tsx) braucht die Maße, damit next/image Platz
 * reservieren kann (kein Springen beim Laden) und passende Größen ausliefert.
 * Läuft automatisch vor `dev` und `build` — ein neues Bild in public/images
 * ist damit sofort verwendbar, ohne dass jemand Maße abtippt.
 */
import fs from "node:fs";
import path from "node:path";

const WURZEL = path.resolve(import.meta.dirname, "..");
const ORDNER = path.join(WURZEL, "public", "images");
const ZIEL = path.join(WURZEL, "lib", "bildmasse.json");
const ENDUNGEN = /\.(jpe?g|png|webp|avif|gif)$/i;

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  // sharp fehlt (z. B. in einer schlanken CI-Umgebung): vorhandene Datei behalten.
  console.warn("bildmasse: sharp nicht verfügbar – lib/bildmasse.json bleibt unverändert.");
  process.exit(0);
}

const masse = {};
for (const datei of fs.readdirSync(ORDNER).filter((d) => ENDUNGEN.test(d)).sort()) {
  const { width, height } = await sharp(path.join(ORDNER, datei)).metadata();
  masse[`/images/${datei}`] = [width, height];
}

const neu = JSON.stringify(masse, null, 2) + "\n";
const alt = fs.existsSync(ZIEL) ? fs.readFileSync(ZIEL, "utf8") : "";
if (neu !== alt) {
  fs.writeFileSync(ZIEL, neu);
  console.log(`bildmasse: ${Object.keys(masse).length} Bilder → lib/bildmasse.json`);
}
