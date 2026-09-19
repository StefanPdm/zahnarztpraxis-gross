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
| `npm run dev` | Entwicklungsserver; Designsystem unter `/bausteine` |
| `npm run build` | Produktions-Build |
| `npm run lint` | ESLint (`next lint` gibt es in Next 16 nicht mehr) |
| `npm run typecheck` | TypeScript ohne Emit |
| `npm run styles` | `site.css` aus `site.css.original` erzeugen |
| `npm run pruefen` | Inhaltsprüfung: gesperrte Begriffe, Titellängen, Seitenverzeichnis, Bildmaße |
| `npm run bilder` | Bildmaße für `<Bild>` neu erzeugen (läuft vor dev und build) |

## Struktur

```
app/
  classical.css        Design-System (Tokens + Komponentenklassen), 1:1
  site.css             ERZEUGT — nicht bearbeiten
  site.css.original    hier bearbeiten, dann `npm run styles`
  bausteine.css        Designsystem: Bausteine mit Mobilverhalten
  layout.tsx           Schriften, Rahmen, Kopf-/Fußzeile
  page.tsx             /
  <slug>/page.tsx      die übrigen 16 Routen
  bausteine/           lebende Übersicht des Designsystems (nur dev)
  llms.txt/            Fakten für KI-Suchen, aus lib/ erzeugt
  api/termin/route.ts  SMTP-Versand der Terminanfrage
components/            Bausteine und Client-Komponenten
lib/                   praxis, team, seiten, navigation — jede Angabe einmal
public/                Bilder, Video, Icons
handoff/               das Übergabepaket (nur noch Nachschlagewerk)
docs/
  STAND.md             was fertig ist, was offen ist  ← hier anfangen
  legacy/              alte .htaccess, sitemap, robots, site.v2.js
scripts/
  bildmasse.mjs        Bildmaße für <Bild> (läuft vor dev/build)
  pruefe.mjs           Inhaltsprüfung (läuft vor build)
  repariere-style-selektoren.mjs  site.css React-tauglich machen
CLAUDE.md              Arbeitsanweisung für Claude Code in VS Code
```

## Vor dem Livegang

Siehe `docs/STAND.md`. Kurz: zweites Termin-Formular auf der Startseite
verdrahten, SMTP-Zugang, 301-Liste der alten URLs beschaffen, Impressum und
Datenschutzerklärung vervollständigen, Platzhalter-Bewertungen ersetzen.
