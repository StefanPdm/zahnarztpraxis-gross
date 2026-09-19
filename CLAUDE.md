# Arbeitsanweisungen für dieses Repo

Website der Zahnarztpraxis Groß & Groß, Potsdam — `zahnmedizin-potsdam.de`.
Next.js 16 (App Router, Turbopack), React 19, TypeScript, **kein Tailwind**.
Node 20.9+.

Das Design ist abgenommen und stammt aus einem Claude-Design-Projekt. Die
ursprüngliche Übergabe liegt unverändert unter `handoff/`, die
Original-Arbeitsanweisung unter `docs/arbeitsanweisung-original.md`. **Der
aktuelle Stand steht in `docs/MIGRATION-STATUS.md` — dort anfangen.**

Next.js 16 weicht an einigen Stellen von älteren Mustern ab: `params` und
`searchParams` sind Promises, `middleware` heißt `proxy`, `next lint` gibt es
nicht mehr. Im Zweifel die mitgelieferten Docs unter
`node_modules/next/dist/docs/` lesen, nicht aus dem Gedächtnis arbeiten.

## Was nicht verändert wird

- **`app/classical.css`** — das Design-System, 1:1 übernommen. Farben,
  Tonleitern, Schriften, Abstände, Radien, Schatten. Wer die Optik ändern
  will, ändert sie hier und nirgends sonst.
- **`app/site.css`** ist **erzeugt**. Änderungen gehören in
  `app/site.css.original`, danach `npm run styles`. Warum: siehe
  `docs/MIGRATION-STATUS.md`, Abschnitt „Selektor-Reparatur".
- **Die Inline-Styles im Markup.** Sie sehen nach Aufräumarbeit aus, tragen
  aber das mobile Verhalten: `site.css` adressiert Elemente über ihren
  Style-Text. Wer einen Wert ändert, kann eine Mobilregel abschalten, ohne
  dass etwas bricht — es sieht nur falsch aus. Aufräumen erst, wenn alle
  Seiten geprüft sind, und dann Selektor für Selektor mit Sichtprüfung.
- **Das Aussehen bei 1440 px.** Das ist die abgenommene Leinwand.

## Konventionen

- Farben, Abstände, Radien, Schatten immer als `var(--token)`. Nie ein
  Hexwert oder eine rohe px-Zahl, die als Token vorliegt.
- Umbruchpunkt Desktop/Mobil ist **1000 px**.
- Server Components sind der Standard. `"use client"` nur mit Grund —
  aktuell: Kopfzeile, Termin-Leiste, Zurück-nach-oben, Scroll-Effekte,
  Laufmarke, Angst-Regler, Anliegen-Wahl, Termin-Formular.
- Texte und Daten in Konstanten oben in der jeweiligen `page.tsx`, so wie der
  Konverter sie erzeugt. Gemeinsames nach `lib/`.
- Sprache: Bezeichner, Kommentare und Commit-Nachrichten auf Deutsch.
  Ausnahme: React-eigene Namen (`useState`, `className`) bleiben, wie sie sind.
- Text nie unter 12 px, Trefflächen mobil nie unter 44 px, Textkontrast
  mindestens 4,5:1. Keine Emoji.

## Inhaltsregeln — vom Auftraggeber, gelten weiter

1. **Nur veröffentlichen, was belegt ist.** Gesperrt, weil von der Praxis
   nicht bestätigt: Intraoralscanner, DVT/3-D-Implantatplanung, Knochenaufbau,
   Wurzelkanalbehandlung, Wurzelspitzenresektion, Sedierung/Narkose. Diese
   Begriffe nicht ergänzen, auch nicht, um eine dünne Seite zu füllen.
2. **KI-Kennzeichnung** (`/uploads/ai-generated-badge.svg`, Klasse
   `.ai-badge`) nur auf ausdrückliche Ansage des Auftraggebers. Bisher
   gekennzeichnet: das Bild auf `/parodontologie`.
3. **Belegte Fakten:** familiengeführt seit 1991 in Potsdam Mitte; fünf
   Behandlungszimmer; Schopenhauerstraße 37, 14467 Potsdam, Eingang auf der
   **Rückseite**; Telefon 0331 960926; Rückmeldung innerhalb von 24 Stunden;
   über 1.200 gesetzte Implantate (Matthias Groß).
4. **Nichts erfinden.** Wo etwas fehlt, einen sichtbaren Platzhalter setzen
   (Klasse `.todo`) und nachfragen. Die offenen Stellen stehen in
   `docs/MIGRATION-STATUS.md`.

## Datenschutz — hier kein Formalismus

Es geht um Patientendaten. Keine Drittanbieter-Requests zur Laufzeit (darum
`next/font` statt Google-CDN), kein Tracking ohne Einwilligung, keine
Karten-Einbettung ohne Zwei-Klick-Lösung. Die Angabe zur Zahnarztangst im
Termin-Formular ist ein **Gesundheitsdatum**: nur an die Praxis versenden,
nicht protokollieren, nicht speichern, nicht an Dritte. Keine Zugangsdaten
ins Repository.

## Eine Seite neu aus dem Design übernehmen

```bash
npm run seiten          # erzeugt ALLE 17 Seiten neu aus handoff/
```

Vorher committen: die Handarbeit an `/`, `/angstpatienten` und `/termin` wird
dabei überschrieben und muss erneut eingesetzt werden.

## Vor jedem Commit

```bash
npm run typecheck && npm run lint && npm run build
```
