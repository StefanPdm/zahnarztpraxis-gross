# Arbeitsanweisungen für dieses Repo

Website der Zahnarztpraxis Groß & Groß, Potsdam — `zahnmedizin-potsdam.de`.
Next.js 16 (App Router, Turbopack), React 19, TypeScript, **kein Tailwind**.
Node 20.9+.

Das Design ist abgenommen und stammt aus einem Claude-Design-Projekt. Die
ursprüngliche Übergabe liegt unter `handoff/` — **nur noch als Nachschlagewerk.
Die Quelle der Wahrheit ist der Code.** Der aktuelle Stand und die offenen
Punkte stehen in `docs/STAND.md` — dort anfangen.

Next.js 16 weicht an einigen Stellen von älteren Mustern ab: `params` und
`searchParams` sind Promises, `middleware` heißt `proxy`, `next lint` gibt es
nicht mehr, `<Image priority>` heißt `preload`. Im Zweifel die mitgelieferten
Docs unter `node_modules/next/dist/docs/` lesen, nicht aus dem Gedächtnis
arbeiten.

## Aufbau

| Wo | Was |
| --- | --- |
| `lib/praxis.ts` | Stammdaten: Telefon, Adresse, E-Mail, Sprechzeiten, Kennzahlen |
| `lib/team.ts` | Behandler (Startseite, /praxis-team, JSON-LD, llms.txt) |
| `lib/seiten.ts` | Alle Seiten: Titel, Beschreibung, Rubrik → Metadaten, Sitemap, Weiterleitungen, llms.txt |
| `lib/strukturierteDaten.ts` | setzt Stammdaten in jedes JSON-LD ein |
| `app/classical.css` | Tokens: Farben, Schriften, Abstände, Radien, Schatten |
| `app/site.css.original` | Projekt-Tokens (Schriftgrade, Ebenen), Navigation, Effekte → `npm run styles` erzeugt `app/site.css` |
| `app/bausteine.css` | Bausteine als Klassen, mit eigenem Mobilverhalten |
| `components/` | React-Bausteine (NotfallLeiste, Fragen, Bild, Karte, Sprechzeiten, …) |
| `/bausteine` | lebende Übersicht aller Tokens und Bausteine — nur `npm run dev` |

Eine Angabe steht **genau einmal**. Wer die Telefonnummer, eine Sprechzeit
oder einen Seitentitel ändert, ändert ihn in `lib/` — Seiten, JSON-LD,
Sitemap und `llms.txt` ziehen mit.

## Was nicht verändert wird

- **`app/classical.css`** — das Design-System, 1:1 übernommen. Wer die Optik
  ändern will, ändert sie hier und nirgends sonst. (Einzige Abweichung vom
  Original: der Google-Fonts-`@import` ist entfernt, siehe Datenschutz.)
- **`app/site.css`** ist **erzeugt**. Änderungen gehören in
  `app/site.css.original`, danach `npm run styles`.
- **Das Aussehen bei 1440 px.** Das ist die abgenommene Leinwand.

## Inline-Styles und Bausteine

Die häufigen Muster sind Klassen in `app/bausteine.css` (Überzeile, Titel,
Abschnitte, Fließtext, Knöpfe, Seitenkopf, Abschlussband, Fragen …). Neuer
Code verwendet **nur** diese Klassen und Tokens.

Die übrigen Inline-Styles (Einzelfälle) tragen weiterhin mobiles Verhalten:
`site.css` adressiert sie über ihren Style-Text (`[style*="padding: 80px"]`).
Wer so einen Wert ändert, kann eine Mobilregel abschalten, ohne dass etwas
bricht — es sieht nur falsch aus. Beim Umstellen auf eine Klasse:

1. Klasse in `app/bausteine.css`, pixelgleich zum Inline-Stil.
2. Jede Mobilregel, die den alten Style-Text traf, ausdrücklich in die
   Klasse übernehmen (Seitenrand über `--rand`, Abstände, Grid → eine Spalte).
3. Bildvergleich aller Seiten bei 1440 und 390 px vor/nach.

## Konventionen

- Farben, Abstände, Radien, Schatten immer als `var(--token)`. Seitenrand
  immer `var(--rand)` (64 / 24 / 18 px).
- Umbruchpunkte **1000 px** (Desktop/Mobil) und **640 px** (schmal).
- Ebenen nur über `--ebene-*`; die Kopfzeile liegt mit `--ebene-kopf` vorn.
- Bilder immer über `<Bild>` (next/image). Neues Bild in `public/uploads`
  ablegen — die Maße erzeugt `npm run bilder` (läuft vor dev und build).
  Unbearbeitete Fotos der Praxis liegen in `rohfotos/` — außerhalb von
  `public/`, damit die Originale nicht öffentlich abrufbar sind, und per
  `.gitignore` außerhalb des Repos. Was gebraucht wird, wird zugeschnitten
  und verkleinert nach `public/uploads` kopiert.
- Server Components sind der Standard. `"use client"` nur mit Grund —
  aktuell: Kopfzeile, Termin-Leiste, Zurück-nach-oben, Scroll-Effekte,
  Laufmarke, Angst-Regler, Termin-Formular, Praxis-Video,
  Karte, GROSSELINO.
- Scroll-Verhalten über `useBeimScrollen` (lib/) — mit dem Pfad als
  Schlüssel, wenn die Komponente im Layout sitzt.
- Seitenspezifische Texte und Daten als Konstanten oben in der `page.tsx`.
- Sprache: Bezeichner, Kommentare und Commit-Nachrichten auf Deutsch.
  Ausnahme: React-eigene Namen (`useState`, `className`) bleiben, wie sie sind.
- Die Begleitfigur der Kinderseite heißt **GROSSELINO** — immer in Versalien,
  immer mit Doppel-S, nie „Großelino". Im Quelltext steht „Grosselino"; die
  Versalien macht `text-transform: uppercase`. Grund: Screenreader
  buchstabieren durchgängig große Wörter, so bleibt der Name ein Wort.
- Text nie unter 12 px, Trefflächen mobil nie unter 44 px, Textkontrast
  mindestens 4,5:1. Keine Emoji. (Die Versalzeilen mit 10–11,5 px aus dem
  Design verstoßen noch dagegen — offene Entscheidung, siehe `docs/STAND.md`.)

## Inhaltsregeln — vom Auftraggeber, gelten weiter

1. **Nur veröffentlichen, was belegt ist.** Gesperrt, weil von der Praxis
   nicht bestätigt: Intraoralscanner, DVT/3-D-Implantatplanung, Knochenaufbau,
   Wurzelkanalbehandlung, Wurzelspitzenresektion, Sedierung/Narkose. Diese
   Begriffe nicht ergänzen, auch nicht, um eine dünne Seite zu füllen.
   `npm run pruefen` schlägt fehl, sobald einer davon im Code steht.
2. **KI-Kennzeichnung** (`/uploads/ai-generated-badge.svg`, Klasse
   `.ai-badge`) nur auf ausdrückliche Ansage des Auftraggebers. Bisher
   gekennzeichnet: `/parodontologie` (Zahnfleisch), `/praxis-team`
   (Beratung bei den Mitgliedschaften), `/zahnschmerzen` (Wartebereich)
   und `/aesthetische-zahnmedizin` (Porträt). Faustregel aus der Praxis:
   Zeigt ein erzeugtes Bild **Menschen**, wird es gekennzeichnet;
   Räume, Geräte und Stillleben bisher nicht.
3. **Belegte Fakten:** familiengeführt seit 1991 in Potsdam Mitte; fünf
   Behandlungszimmer; Schopenhauerstraße 37, 14467 Potsdam, Eingang auf der
   **Rückseite**; Telefon 0331 960926; Rückmeldung innerhalb von 24 Stunden;
   über 2.000 gesetzte Implantate (Matthias Groß); Chantal und Matthias Groß
   haben beide in **Halle/Saale** studiert (bestätigt 19.09.2026; Schreibweise
   immer „Halle/Saale").
4. **Nichts erfinden.** Wo etwas fehlt, einen sichtbaren Platzhalter setzen
   (Klasse `.todo`) und nachfragen. Die offenen Stellen stehen in
   `docs/STAND.md`.

## Datenschutz — hier kein Formalismus

Es geht um Patientendaten. **Vor jeder Einwilligung keine einzige Anfrage an
Dritte** — so ist es geprüft und so bleibt es: Schriften über `next/font`
(kein Google-CDN), Karte nur nach Klick (`components/Karte`), kein Tracking
ohne Einwilligung. Die Content-Security-Policy in `next.config.ts` erlaubt
fremde Quellen nur für den Karten-Frame; wer einen Dienst ergänzt, muss sie
bewusst erweitern.

Die **Google-Bewertungen** auf der Startseite
(`components/GoogleBewertungen`) halten sich daran: Der Abruf läuft auf dem
Server (einmal am Tag, `revalidate`), der API-Schlüssel bleibt dort, und die
Profilbilder liefert `next/image` von unserer Domain aus. Im Browser der
Besucher entsteht keine einzige Anfrage an Google. Wer das ändert — etwa ein
Bild direkt einbindet —, hebelt genau das aus.

Die Angabe zur Zahnarztangst im Termin-Formular ist ein **Gesundheitsdatum**:
nur an die Praxis versenden, nicht protokollieren, nicht speichern, nicht an
Dritte. Keine Zugangsdaten ins Repository.

## Eine neue Seite anlegen

1. Eintrag in `lib/seiten.ts` (Titel ≤ 60, Beschreibung ≤ 160 Zeichen).
2. `app/<pfad>/page.tsx` mit `export const metadata = seitenMetadaten("/<pfad>")`,
   aufgebaut aus den Bausteinen (Vorlage: eine bestehende Unterseite,
   Übersicht unter `/bausteine`).
3. Häufige Fragen über `<Fragen eintraege={…} pfad="/<pfad>" />` — das
   erzeugt Liste und FAQ-JSON-LD zugleich.
4. Falls sie in die Navigation gehört: `lib/navigation.ts`.

Sitemap, `llms.txt` und die `.html`-Weiterleitung entstehen automatisch.

## Vor jedem Commit

```bash
npm run typecheck && npm run lint && npm run pruefen && npm run build
```

`npm run build` führt `bilder` und `pruefen` selbst vorab aus.
