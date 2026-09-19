# Zahnarztpraxis Groß & Groß — Potsdam

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · CSS ohne
Framework. 17 Seiten, migriert aus dem Claude-Design-Übergabepaket.

Voraussetzung: **Node.js 20.9 oder neuer.**

## Loslegen

```bash
npm install
npm run dev
```

→ <http://localhost:3000>

Der erste Start braucht kurz Internet: `next/font` holt Cormorant Garamond,
Lora und Jost einmalig und legt sie lokal ab.

Für das Termin-Formular `.env.example` nach `.env.local` kopieren und die
SMTP-Zugangsdaten eintragen. Ohne sie läuft alles andere normal; der Versand
meldet einen Fehler mit Telefonnummer als Ausweg.

## Skripte

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run lint` | ESLint (`next lint` gibt es in Next 16 nicht mehr) |
| `npm run typecheck` | TypeScript ohne Emit |
| `npm run styles` | `site.css` aus `site.css.original` erzeugen |
| `npm run seiten` | alle 17 Seiten aus `handoff/` neu erzeugen |

## Struktur

```
app/
  classical.css        Design-System (Tokens + Komponentenklassen), 1:1
  site.css             ERZEUGT — nicht bearbeiten
  site.css.original    hier bearbeiten, dann `npm run styles`
  layout.tsx           Schriften, Rahmen, Kopf-/Fußzeile
  page.tsx             /
  <slug>/page.tsx      die übrigen 16 Routen
  api/termin/route.ts  SMTP-Versand der Terminanfrage
components/            Kopfzeile, Fußzeile, Termin-Leiste, Laufmarke,
                       Zurück-nach-oben, Scroll-Effekte, Angst-Regler,
                       Anliegen-Wahl, JSON-LD
lib/                   Navigation, Routenliste
public/                26 Bilder, Video, Icons
handoff/               das unveränderte Übergabepaket (Quelle der Wahrheit)
docs/
  MIGRATION-STATUS.md  was fertig ist, was offen ist  ← hier anfangen
  legacy/              alte .htaccess, sitemap, robots, site.v2.js
scripts/
  konvertiere-seiten.mjs        Markup + Daten → page.tsx
  repariere-style-selektoren.mjs  site.css React-tauglich machen
CLAUDE.md              Arbeitsanweisung für Claude Code in VS Code
```

## Vor dem Livegang

Siehe `docs/MIGRATION-STATUS.md`. Kurz: Termin-Formular verdrahten, Großelino
bauen, 301-Liste der alten URLs beschaffen, Impressum vervollständigen,
Consent für die OSM-Karte, SMTP-Zugang.
