# Migration: statische Website → Next.js (App Router)

Zahnarztpraxis Groß & Groß, Potsdam — `zahnmedizin-potsdam.de`

Diese Datei ist die Arbeitsanweisung. Sie gehört ins Wurzelverzeichnis des
Next-Projekts, damit sie in jeder Sitzung gilt. Arbeite die Schritte in der
angegebenen Reihenfolge ab — Schritt 3 vor Schritt 4, sonst baust du 17-mal
dieselbe Kopfzeile.

---

## Was dieses Paket enthält

```
layout/header.html           Kopfzeile, Fassung STARTSEITE
layout/header-unterseite.html Kopfzeile, Fassung UNTERSEITEN (mit „Home")
layout/footer.html           Fußzeile, vierspaltig
layout/stickycta.html        mitlaufende Termin-Leiste
layout/runhead.html          seitliche Laufmarke (nur Startseite)
pages/<route>/markup.html    nur der Seiteninhalt — ohne Rahmen
pages/<route>/data.js        Listen + Verhalten der Seite
pages/<route>/jsonld.json    strukturierte Daten der Seite
pages/<route>/head.json      Titel, Description, Canonical
routes.json                  alle 17 Seiten mit Route und Titel
styles/classical.css         Design-System: Tokens + Komponentenklassen
styles/site.css              projektspezifische Ergänzungen
styles/classical-designsystem.md   Gestaltungsregeln des Design-Systems
public/                      alle tatsächlich benutzten Bilder, Video, Icons
legacy/site.v2.js            Verhaltens-Referenz — NICHT übernehmen
legacy/.htaccess             bisherige Weiterleitungen und Header
legacy/sitemap.xml           bisherige URL-Liste
legacy/robots.txt
```

Das Markup ist **fertiges, abgenommenes Design**, keine Skizze. Layout,
Abstände, Farben und Typografie sind so gewollt und sollen eins zu eins
erhalten bleiben. Du überführst die Technik, nicht die Gestaltung.

## Rahmenbedingungen

- **Node-Laufzeit, kein `output: 'export'`.** Das Termin-Formular versendet per
  SMTP, dafür braucht es einen Route Handler auf dem Server.
- TypeScript, App Router, **kein Tailwind** — die Gestaltung liegt in den zwei
  Stylesheets und soll dort bleiben.
- Sprache der Inhalte: Deutsch. Auch Kommentare und Commit-Nachrichten auf
  Deutsch halten.

---

## Schritt 0 — Projekt anlegen

```bash
npx create-next-app@latest zahnmedizin-potsdam \
  --ts --app --no-tailwind --eslint --src-dir=false --import-alias "@/*"
cd zahnmedizin-potsdam
npm i nodemailer
npm i -D @types/nodemailer
```

Dann den Inhalt dieses Pakets ins Projektverzeichnis legen (dieses `CLAUDE.md`
nach oben, `pages/`, `styles/`, `legacy/` als Referenzordner, `public/`
verschmelzen).

## Schritt 1 — Stylesheets und Assets

`public/` aus dem Paket übernehmen — fertig, hier ist nichts umzubauen. Die
Pfade im Markup (`uploads/…`) werden zu `/uploads/…` (führender Schrägstrich).

Beide Stylesheets nach `app/` kopieren und **in dieser Reihenfolge** in
`app/layout.tsx` importieren:

```ts
import "./classical.css";   // zuerst: Tokens und Komponentenklassen
import "./site.css";        // danach: Ergänzungen, überschreibt bewusst
```

Die Reihenfolge ist nicht optional. `site.css` definiert selbst fast keine
Farben — `--color-bg`, `--color-text`, `--color-accent`, `--font-heading`,
`--font-body`, `--radius-*`, `--shadow-*` kommen alle aus `classical.css`.

**Schriften:** `Jost` wird bisher per CDN geladen (`--font-ui`, für
Navigation, Knöpfe, Kleintext). Die Leseschriften bringt das Design-System mit.
Stelle alle drei auf `next/font/google` um und setze die Ergebnis-Variablen auf
`<html>`, damit die Tokens weiter greifen. Welche Familien das Design-System
verwendet, steht in `styles/classical-designsystem.md`.

## Schritt 2 — Routen

Aus `routes.json`. Die Slugs sind **unverändert zu übernehmen** — sie stehen in
`sitemap.xml`, in den Canonicals und in der Weiterleitungsliste.

| Route | Seite |
| --- | --- |
| `/` | Startseite |
| `/praxis-team` | Praxis & Team |
| `/angstpatienten` | Angstpatienten |
| `/kinderzahnheilkunde` | Kinderzahnheilkunde |
| `/leistungen` | Leistungen (Übersicht) |
| `/zahnschmerzen` | Zahnschmerzen & Akutbehandlung |
| `/prophylaxe` | Prophylaxe |
| `/parodontologie` | Parodontologie |
| `/weisheitszaehne-chirurgie` | Weisheitszähne & Chirurgie |
| `/implantologie` | Implantologie |
| `/aesthetische-zahnmedizin` | Ästhetische Zahnmedizin |
| `/zahnlabor` | Zahnlabor |
| `/moderne-technik` | Moderne Technik |
| `/anfahrt-parken` | Anfahrt & Parken |
| `/kontakt` | Kontakt |
| `/termin` | Termin (Formular) |
| `/impressum-datenschutz` | Impressum & Datenschutz |

Bisher lagen die Dateien als `/implantologie.html` auf dem Server, mit einer
Regel, die `/implantologie` ebenfalls auslieferte. Next liefert künftig nur die
Form ohne `.html`. Die `.html`-Varianten daher per 301 auf die neue Form
umleiten (Schritt 8) — sonst brechen alle bereits indexierten URLs.

## Schritt 3 — Layout (der wichtigste Schritt)

In `pages/*/markup.html` fehlen Kopfzeile, mitlaufende Termin-Leiste, Fußzeile
und der Zurück-nach-oben-Knopf **absichtlich**. Sie waren bisher in allen 17
Dateien dupliziert; jede Navigationsänderung war dadurch ein Rundlauf über alle
Seiten. Sie liegen jetzt einmalig unter `layout/` und gehören nach
`app/layout.tsx` bzw. in Komponenten darunter:

| Datei | Zielkomponente |
| --- | --- |
| `layout/header.html` + `layout/header-unterseite.html` | `components/Kopfzeile.tsx` — Client-Komponente |
| `layout/footer.html` | `components/Fusszeile.tsx` |
| `layout/stickycta.html` | `components/TerminLeiste.tsx` — Client-Komponente |
| `layout/runhead.html` | `components/Laufmarke.tsx` — Client, nur `/` |
| (im alten Markup nicht enthalten, per Skript erzeugt) | `components/ZurueckNachOben.tsx` — Client-Komponente |

Auch der **äußere Wrapper** gehört ins Layout, nicht in jede Seite: die Seiten
beginnen jetzt direkt mit ihrem ersten Abschnitt. Der Wrapper lautete
`max-width:1440px; margin:0 auto; background:var(--color-bg);
font-family:var(--font-body)`.

Die beiden Kopfzeilen-Fassungen unterscheiden sich in **genau einem Punkt**:
auf der Startseite entfällt rechts „Home". Baue dafür keine zwei Komponenten —
entscheide in `Kopfzeile.tsx` über `usePathname()`.

**Navigation, auf allen Seiten identisch.** Links vom Logo:
Praxis · Angst · Kinder · Behandlungen ▾ — rechts davon: Home · Kontakt ·
Anfahrt und der Knopf „Termin vereinbaren".

- „Behandlungen" ist **kein Link**, nur ein Aufklapp-Label mit Pfeil dahinter.
  Die Übersicht ist über den Eintrag „Alle Leistungen" im Untermenü erreichbar.
- Auf der Startseite entfällt „Home" (dort also zwei Einträge rechts).
- Die aktive Seite trägt eine goldene Unterstreichung, im Untermenü die Klasse
  `is-active`.
- Umbruchpunkt Desktop/Mobil: **1000 px**.

## Schritt 4 — Seiten

Je Route eine `app/<slug>/page.tsx`. Das Markup aus `markup.html` übernehmen,
die Daten aus `data.js` daneben.

### Die Platzhalter auflösen — das ist der Kern dieses Schritts

Im Markup stehen `{{ … }}`-Platzhalter und die Tags `<sc-for>` / `<sc-if>`.
Das ist **keine** Templatesprache, die Next.js kennt — sie muss vollständig
aufgelöst werden, sonst erscheinen leere Bereiche und sichtbare geschweifte
Klammern auf der Seite. Die Werte liefert `data.js` derselben Seite; die
Schlüsselnamen dort entsprechen genau den Namen im Markup.

```html
<!-- vorher -->
<sc-for list="{{ services }}" as="s" hint-placeholder-count="3">
  <h3>{{ s.title }}</h3>
  <p>{{ s.text }}</p>
</sc-for>
```

```tsx
// nachher
{services.map((s, i) => (
  <div key={i}>
    <h3>{s.title}</h3>
    <p>{s.text}</p>
  </div>
))}
```

| Im Markup | In React |
| --- | --- |
| `{{ name }}` | `{name}` |
| `{{ s.title }}` | `{s.title}` |
| `{{ $index }}` | der Map-Index |
| `<sc-for list="{{ x }}" as="item">` | `{x.map((item, i) => …)}` |
| `<sc-if value="{{ y }}">` | `{y && …}` |
| `hint-placeholder-count`, `hint-size`, `hint-placeholder-val` | ersatzlos streichen |

Verschachtelte Schleifen kommen vor: `<sc-for list="{{ team }}" as="m">`
enthält `<sc-for list="{{ m.facts }}" as="f">`. Die innere Liste kommt also
aus dem Element der äußeren, nicht aus `data.js`.

Prüfe zum Schluss jede Seite mit einer Suche nach `{{`, `sc-for`, `sc-if` und
`hint-` — es darf kein Treffer übrig bleiben.

### Weiter beim Übernehmen

- `class=` → `className=`, `for=` → `htmlFor=`, alle Elemente schließen
- Inline-`style="…"` → Style-Objekte (**Werte nicht verändern**, siehe unten)
- interne Links auf die neuen Routen, als `<Link>` aus `next/link`
- `uploads/…` → `/uploads/…`
- Listen aus `data.js` als Konstanten oben in der Datei; alles mit
  `this.state` / `setState` wird `useState` in einer Client-Komponente

### Achtung: `site.css` greift teilweise über Inline-Style-Textvergleich

In der Ursprungsumgebung war ausschließlich Inline-Styling möglich. Deshalb
adressieren die Mobil-Regeln in `site.css` Elemente über ihren Style-Text, etwa
`[style*="max-width: 1440px"]` oder `[style*="columns: 2"]`, und schließen
Ausnahmen per `:not([style*="auto 1fr"])` aus. Zwei Konsequenzen:

1. Solange diese Regeln bestehen, **müssen die Inline-Styles wörtlich erhalten
   bleiben** — auch Schreibweise und Leerzeichen. Ränder stehen deshalb als
   `margin: 0px 64px …`.
2. Das ist die eine Stelle, an der Aufräumen sich wirklich lohnt: ersetze diese
   Selektoren nach und nach durch echte Klassen und verschiebe die zugehörigen
   Inline-Styles mit. Aber **erst nachdem** alle 17 Seiten stehen und
   funktionieren — nicht während der Migration. Zwei Baustellen gleichzeitig
   nehmen dir die Vergleichbarkeit mit dem Original.

## Schritt 5 — Verhalten (`legacy/site.v2.js` ersetzen)

Die Datei liegt nur als Referenz bei. **Nicht übernehmen.** Die Timeout-Ketten,
der `MutationObserver` und die `snake_case`-Namen darin sind Notlösungen der
Ursprungsumgebung (das Markup wurde dort nach dem Skript neu aufgebaut, Namen
in camelCase wurden zerstört). In React entfällt beides — du hast die Knoten per
`ref`. Die Projektregel „kein camelCase" gilt hier **nicht**.

Neu zu schreiben, je als kleine Client-Komponente oder Hook:

| Verhalten | Was es tut |
| --- | --- |
| Kopfzeile schrumpfen | Ab 96 px Scrollweg schrumpfen, erst unter 32 px wieder aufgehen. Die **Hysterese ist notwendig**: das Schrumpfen ändert die Kopfhöhe und damit die Scroll-Position, mit einem einzigen Schwellwert flattert die Leiste endlos. |
| Untermenü mobil | Unter 1000 px klappt „Behandlungen" auf Tipp auf und zu; Enter und Leertaste ebenso; schließt mit dem Hauptmenü. Über 1000 px öffnet Hover. |
| Burger → X | Obere und untere Linie fahren in die Mitte und drehen 225°, die mittlere schrumpft seitlich weg. Liegt vollständig in `site.css` und hängt am Zustand `#navtoggle:checked` — in React an einen State-Wert hängen, etwa `data-offen` auf dem Knopf, und die Selektoren entsprechend anpassen. |
| Mitlaufende Termin-Leiste | Fährt auf der Startseite unten ein, wenn der Termin-Abschnitt außer Sicht ist. |
| Zurück nach oben | Erscheint ab 0,9 Bildschirmhöhen, weicht der Termin-Leiste um deren Höhe + 14 px nach oben aus, scrollt sanft, respektiert `prefers-reduced-motion`. |
| Parallax | Bilder mit `.parallax-img` bewegen sich langsamer als der Scroll. |
| Einblenden + Zählwerke | Auf der Startseite: Abschnitte blenden beim Erreichen ein, Kennzahlen zählen hoch. Mit `IntersectionObserver` statt Scroll-Handler. |
| Großelino | Nur `/kinderzahnheilkunde`: läuft am linken Rand mit, wechselt seinen Zuspruch. Sprechblase erscheint beim Laufen, beim Zeigen mit der Maus **und** bei Tastaturfokus. Mobil eine feste Variante im Inhalt, die per `IntersectionObserver` einblendet. Die Figur ist tastaturbedienbar (`tabindex="0"`, `role="img"`, Beschriftung, goldener Fokusring). |

Bündle die reinen Scroll-Effekte in **einem** `requestAnimationFrame`-gedrosselten
Listener, nicht in sieben einzelnen.

## Schritt 6 — Metadaten und strukturierte Daten

`head.json` → `export const metadata` je Seite (`title`, `description`,
`alternates.canonical`). Gemeinsames in `app/layout.tsx`:
`metadataBase`, `openGraph`, Favicon (`/favicon.png`), Apple-Touch-Icon,
`lang="de"` auf `<html>`.

`jsonld.json` je Seite als `<script type="application/ld+json">` ausgeben
(Inhalt per `dangerouslySetInnerHTML`, das ist hier der vorgesehene Weg).
Insgesamt sind es 52 FAQ-Einträge plus `MedicalWebPage`, `BreadcrumbList` und
`Dentist`/`LocalBusiness` — **nicht verkürzen**, die Einträge sind inhaltlich
geprüft.

`sitemap.xml` und `robots.txt` künftig als `app/sitemap.ts` und
`app/robots.ts` erzeugen, Inhalt aus `legacy/` übernehmen.

## Schritt 7 — Termin-Formular mit SMTP

Das Formular in `pages/termin/markup.html` ist ein **Prototyp**: es hat weder
`name`-Attribute noch `required`, noch ein Ziel. Das ist jetzt zu bauen.

**Felder** (IDs wie im Markup): `t-name`, `t-tel`, `t-mail`, `t-birth`,
`t-date1`, `t-date2`, Radiogruppen `t-time` (Vormittag/Nachmittag), `t-status`
(Neu/Bestandspatient), `t-ins` (Gesetzlich/Privat), `t-angst`
(Nein / Ja — Angstpatient/in / Erstmal nur ein Gespräch), Freitextfeld,
Einverständnis-Kästchen zur Datenverarbeitung.

**Pflichtfelder:** Name, eine Rückmeldemöglichkeit (Telefon **oder** E-Mail),
Wunschtermin 1, Einverständnis. Alles andere optional.

**Server:** `app/api/termin/route.ts`, `POST`, Validierung mit `zod`
serverseitig (nicht nur im Browser), Versand per `nodemailer` über SMTP.
Zugangsdaten ausschließlich aus Umgebungsvariablen:

```
SMTP_HOST= SMTP_PORT= SMTP_USER= SMTP_PASS= SMTP_FROM= PRAXIS_MAIL=
```

`.env.example` mit diesen Schlüsseln anlegen, `.env.local` niemals einchecken.

**Weitere Anforderungen:**

- Zwei Mails: Anfrage an die Praxis, Eingangsbestätigung an den Absender
  (letztere nur, wenn eine E-Mail angegeben wurde).
- Die Zusage „Rückmeldung innerhalb von 24 Stunden" steht auf der Seite und
  gehört in beide Mails.
- Spamschutz ohne Captcha: verstecktes Honeypot-Feld plus Zeitstempel-Prüfung
  (Absenden unter 3 Sekunden verwerfen). Zusätzlich eine einfache
  Rate-Begrenzung pro IP.
- Gesundheitsdaten: der Angst-Status ist ein Gesundheitsdatum. Nur an die
  Praxis versenden, **nicht** protokollieren, nicht in eine Datenbank
  schreiben, nicht an Dritte.
- Zustände im Formular: Absenden läuft / Erfolg / Fehler — jeweils sichtbar,
  Fehler mit Telefonnummer 0331 960926 als Ausweg.

## Schritt 8 — Weiterleitungen, Header, Hosting

`legacy/.htaccess` enthält die bisherigen Regeln. Nach `next.config.js`:

- `redirects()`: Kanonisierung auf `www` + HTTPS (oder beim Hoster),
  `/<slug>.html` → `/<slug>` für alle 17 Seiten, die WordPress-Reste
  (`/wp-content/*`, `/wp-includes/*`, `/category/*`, `/tag/*`, `/author/*`,
  `/feed`) → `/`, sowie die bestätigte Regel
  `/zahnbehandlung-zahnlabor-potsdam` → `/leistungen`.
- `headers()`: `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security`,
  `Permissions-Policy: geolocation=(), microphone=(), camera=()`.
- `app/not-found.tsx` als 404-Seite (bisher wurde auf die Startseite
  umgeleitet — eine echte 404-Seite ist besser).

**Die vollständige 301-Liste fehlt noch.** In der `.htaccess` sind die
wahrscheinlichen WordPress-URLs als Kommentar vorbereitet, aber nur
`zahnbehandlung-zahnlabor-potsdam` ist belegt. Quellen für die echten URLs:
Google Search Console (Seiten → indexiert) und die alte `wp-sitemap.xml`. Jede
alte URL ohne Regel verliert ihr Ranking. **Nicht raten** — nachfragen.

---

## Verbindliche Inhaltsregeln

Diese Regeln stammen vom Auftraggeber und gelten weiter:

1. **Medizinische Angaben** nur veröffentlichen, was belegt ist. Gesperrt, weil
   von der Praxis nicht bestätigt: Intraoralscanner, DVT/3-D-Implantatplanung,
   Knochenaufbau, Wurzelkanalbehandlung, Wurzelspitzenresektion,
   Sedierung/Narkose. Diese Begriffe **nicht** ergänzen, auch nicht als
   Füllmaterial für eine dünn wirkende Seite.
2. **KI-Kennzeichnung:** Das Badge `/uploads/ai-generated-badge.svg` (Klasse
   `.ai-badge`, rechts unten im Bildcontainer) wird nur gesetzt, wenn der
   Auftraggeber es ausdrücklich sagt. Betrifft nur fotorealistische
   Darstellungen. Bisher gekennzeichnet: das Bild auf der Parodontologie-Seite.
3. **Belegte Fakten:** familiengeführt seit 1991 in Potsdam Mitte; fünf
   Behandlungszimmer; Schopenhauerstraße 37, 14467 Potsdam, Eingang auf der
   **Rückseite** (links am Gebäude vorbei in den Hof); Telefon 0331 960926;
   Rückmeldung innerhalb von 24 Stunden; über 1.200 gesetzte Implantate
   (Matthias Groß).
4. **Gestaltung:** Text nie unter 12 px, Trefflächen mobil nie unter 44 px,
   Textkontrast mindestens 4,5:1. Keine Emoji. Farben nur aus den Tokens.
5. Erfinde keine Inhalte. Wo etwas fehlt, setze einen sichtbaren Platzhalter
   (Klasse `.todo` ist dafür vorhanden) und frage nach.

## Offene Punkte — beim Auftraggeber erfragen, nicht ausfüllen

- Vollständige 301-Liste der alten WordPress-URLs (siehe Schritt 8)
- Mitarbeiternamen und Funktionen für `/praxis-team`
- Eckdaten der Praxisgeschichte seit 1991
- Echte Google-Bewertungen (aktuell Platzhalter)
- Consent-Lösung für die eingebettete OSM-Karte auf `/anfahrt-parken` —
  vor dem Livegang nötig, die Karte lädt sonst ohne Einwilligung von einem
  Drittserver
- Medizinische Freigaben für die gesperrten Themen (Punkt 1 oben)

## Abnahme-Checkliste

- [ ] Alle 17 Routen erreichbar, Navigation überall identisch
- [ ] **Keine Suchtreffer mehr auf `{{`, `sc-for`, `sc-if`, `hint-`**
- [ ] Kopfzeile und Fußzeile existieren genau einmal im Projekt, nicht 17-mal
- [ ] Optischer Vergleich gegen die alte Seite bei 1440 px und bei 390 px —
      Abweichungen nur dort, wo Absicht
- [ ] Kopfzeile flattert an keiner Scroll-Position
- [ ] Untermenü und Burger-Animation auf einem echten Telefon geprüft
- [ ] Großelino: Text erscheint beim Scrollen, beim Zeigen und per Tastatur
- [ ] Termin-Formular: Pflichtfeld-Prüfung, echter SMTP-Versand, beide Mails,
      Honeypot greift, Fehlerzustand zeigt die Telefonnummer
- [ ] JSON-LD aller Seiten gültig (Rich-Results-Test), 52 FAQ vollständig
- [ ] `/<slug>.html` leitet auf `/<slug>` weiter
- [ ] `sitemap.xml` und `robots.txt` liefern dieselben URLs wie vorher
- [ ] Lighthouse: Barrierefreiheit und SEO je mindestens 95
- [ ] Keine Zugangsdaten im Repository
