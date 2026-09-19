#!/usr/bin/env node
/**
 * pruefe.mjs — inhaltliche Prüfungen, die kein Compiler und kein Linter macht.
 * Läuft mit `npm run pruefen` und vor jedem Build.
 *
 *   1  Gesperrte medizinische Begriffe (CLAUDE.md, Inhaltsregel 1)
 *   2  Titel ≤ 60 und Beschreibung ≤ 160 Zeichen (lib/seiten.ts)
 *   3  Jede Seite unter app/ steht in lib/seiten.ts und umgekehrt
 *   4  Jedes Bild in <Bild src="…"> hat Maße in lib/bildmasse.json
 *
 * Bricht mit Fehlercode ab, sobald eine Regel verletzt ist.
 */
import fs from "node:fs";
import path from "node:path";

const WURZEL = path.resolve(import.meta.dirname, "..");
const lies = (d) => fs.readFileSync(path.join(WURZEL, d), "utf8");
const dateien = (ordner, muster) =>
  fs
    .readdirSync(path.join(WURZEL, ordner), { recursive: true })
    .map((d) => path.join(ordner, d).replaceAll("\\", "/"))
    .filter((d) => muster.test(d));

const fehler = [];

/* 1 — Gesperrte Begriffe: von der Praxis nicht bestätigt, dürfen nicht erscheinen. */
const GESPERRT = [
  /intraoral\s*-?\s*scan/i,
  /\bDVT\b/,
  /3\s*-?\s*D\s*-?\s*Implantatplanung/i,
  /Knochenaufbau/i,
  /Wurzelkanal/i,
  /Wurzelspitzenresektion/i,
  /Sedierung/i,
  /Narkose/i,
];
for (const d of [...dateien("app", /\.(tsx?|json)$/), ...dateien("components", /\.tsx?$/), ...dateien("lib", /\.(ts|json)$/)]) {
  const text = lies(d);
  for (const r of GESPERRT) {
    const m = text.match(r);
    if (m) fehler.push(`${d}: gesperrter Begriff „${m[0]}" (CLAUDE.md, Inhaltsregel 1)`);
  }
}

/* 2 + 3 — Seitenverzeichnis */
const seitenQuelle = lies("lib/seiten.ts");
const eintraege = [...seitenQuelle.matchAll(/pfad: "([^"]+)"[\s\S]*?titel: "([^"]+)",\s*beschreibung:\s*"([^"]+)"/g)];
for (const [, pfad, titel, beschreibung] of eintraege) {
  if (titel.length > 60) fehler.push(`lib/seiten.ts ${pfad}: Titel ${titel.length} Zeichen (max. 60)`);
  if (beschreibung.length > 160) fehler.push(`lib/seiten.ts ${pfad}: Beschreibung ${beschreibung.length} Zeichen (max. 160)`);
}
const verzeichnet = new Set(eintraege.map(([, p]) => p));
const vorhanden = new Set(
  dateien("app", /(^|\/)page\.tsx$/).map((d) => {
    const pfad = "/" + path.dirname(d).replace(/^app\/?/, "");
    return pfad === "/." || pfad === "/" ? "/" : pfad;
  }),
);
for (const p of vorhanden) if (!verzeichnet.has(p)) fehler.push(`app${p}/page.tsx fehlt in lib/seiten.ts`);
for (const p of verzeichnet) if (!vorhanden.has(p)) fehler.push(`lib/seiten.ts nennt ${p}, die Seite gibt es nicht`);

/* 4 — Bildmaße */
const masse = JSON.parse(lies("lib/bildmasse.json"));
for (const d of [...dateien("app", /\.tsx$/), ...dateien("components", /\.tsx$/)]) {
  for (const [, src] of lies(d).matchAll(/<Bild\b[^>]*?\bsrc=["']([^"']+)["']/g)) {
    if (!masse[src]) fehler.push(`${d}: ${src} ohne Maße – liegt die Datei in public/uploads? (npm run bilder)`);
  }
}

if (fehler.length) {
  console.error(`✗ ${fehler.length} Problem(e):\n  ` + fehler.join("\n  "));
  process.exit(1);
}
console.log(`✓ Inhaltsprüfung: ${eintraege.length} Seiten, keine gesperrten Begriffe, alle Bildmaße vorhanden.`);
