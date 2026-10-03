# Stand der Website

Stand: 19.09.2026. Frühere Fassung dieser Datei: `MIGRATION-STATUS.md` (siehe
Git-Verlauf). Jeder Schritt steht als eigener Commit im Repository.

## Fertig und geprüft

| Bereich | Stand |
| --- | --- |
| 17 Seiten | alle statisch vorgerendert, `/praxis-team` repariert (lieferte 500) |
| Kopfzeile | schrumpft beim Scrollen (151 → 69 px), Weichzeichner in allen Browsern, liegt immer vorn (`--ebene-kopf`), mobiles Untermenü klappt, per Tastatur bedienbar |
| Termin-Leiste, Zurück nach oben | Verhalten wie im Original-Skript, nach jedem Seitenwechsel neu gemessen |
| Praxis-Video | WebM + MP4 (Safari), mobile Fassung, lädt bei Sichtbarkeit, Anhalten-Knopf |
| GROSSELINO, Laufmarke, Zählwerke, Parallax | als Komponenten, laufen auch nach Navigation |
| Karte | Zwei-Klick-Lösung auf Start, /kontakt, /anfahrt-parken |
| Bilder | über `next/image`: AVIF/WebP, passende Breiten; 5,45 → 1,30 MB über alle Seiten |
| Sicherheit | Content-Security-Policy, HSTS, COOP/CORP, Permissions-Policy; `/api/termin` gehärtet (Herkunft, Größe, Typ, Header-Injection) |
| Datenschutz | vor jeder Einwilligung null Anfragen an Dritte (Google-Fonts-Import entfernt) |
| SEO | Titel ≤ 60, Beschreibungen ≤ 160 Zeichen, Open Graph mit Bild, kanonische URLs, Sitemap mit echten Änderungsdaten, Überschriften ohne Sprünge |
| Strukturierte Daten | Stammdaten aus `lib/`, FAQ aus den sichtbaren Fragen erzeugt (64 Einträge), Behandler als `Person` |
| KI-Lesbarkeit | `/llms.txt` aus denselben Daten, alle Crawler zugelassen |
| Designsystem | `app/bausteine.css` + Komponenten, lebende Übersicht unter `/bausteine`; Inline-Styles 1382 → 760 (Zählweise `style={{`); Obergrenze in `npm run pruefen`, darf nur sinken |
| Qualitätssicherung | `npm run pruefen`: gesperrte Begriffe, Titellängen, Seitenverzeichnis, Bildmaße, Obergrenze Inline-Styles — läuft vor jedem Build |
| Farben im Markup | keine Hexwerte mehr in TSX: `--ink-dark`, `--papier`, `--weiss` (`app/site.css.original`). Ausnahme `lib/mailvorlage.ts` — Mailprogramme kennen keine CSS-Variablen |

## Noch zu tun — Entscheidungen

- **Schrift unter 12 px.** Die Versalzeilen des Designs haben 10–11,5 px;
  CLAUDE.md verlangt mindestens 12 px. Beides lässt sich nicht zugleich
  halten. Umsetzung, wenn entschieden: die Tokens `--fs-marke` und
  `--fs-marke-klein` in `app/site.css.original` auf 12px setzen; die
  restlichen Einzelfälle stehen noch inline.
- **Link „Wie wir Angstpatienten begleiten"** im Termin-Formular führt jetzt
  zu `/angstpatienten` (vorher `/leistungen`).

## Noch zu tun — Technik

- [ ] **Formulare und E-Mail** (bewusst zurückgestellt): Das zweite
      Termin-Formular auf der Startseite ist nicht verdrahtet — am
      einfachsten durch `<TerminFormular />` ersetzen. SMTP-Zugangsdaten in
      `.env.local` (Vorlage `.env.example`).
- [ ] Datenschutzerklärung um OpenStreetMap (Karte nach Klick) ergänzen —
      juristischer Text, nicht erfinden.
- [ ] Restliche Inline-Styles (Einzelfälle) nach und nach in Bausteine
      überführen; Verfahren in CLAUDE.md, Abschnitt „Inline-Styles und
      Bausteine". Danach entfällt die Selektor-Reparatur (unten).
- [ ] Flip-Karten (Porträts) auf Touch-Geräten prüfen: sie drehen über
      `:focus-within`.

## Noch zu tun — Inhalte, nicht erfinden

- Mitarbeiternamen und Funktionen für `/praxis-team`
- Eckdaten der Praxisgeschichte seit 1991
- Echte Google-Bewertungen (die Startseite zeigt sie hinter `showReviews`
  als sichtbar gekennzeichnete Platzhalter) — vor dem Livegang ersetzen
  oder `showReviews = false`.
- Medizinische Freigaben für die sechs gesperrten Themen

### Öffnungsstatus — Pflege

Notfallleiste und Sprechzeiten zeigen „Jetzt geöffnet · bis 13:00" bzw.
„Geschlossen · wieder morgen ab 8:00" (`components/OffenStatus`). Die
gesetzlichen Feiertage in Brandenburg sind eingerechnet. **Betriebsferien
und Brückentage nicht** — die gehören als ISO-Datum in `schliesstage` in
`lib/praxis.ts`, sonst steht im Urlaub „Jetzt geöffnet". Vor jedem Urlaub
eintragen, oder die Praxis schickt die Termine einmal im Jahr.

Dieselben Schließtage und Feiertage sperren im Terminformular die
Wunschtermine (`lib/wunschtermin.ts`), dazu Wochenenden und „Nachmittag"
an Tagen ohne Nachmittagssprechstunde. Wer die Sprechzeiten in
`lib/praxis.ts` ändert, ändert damit auch diese Regeln.

### Ausbildungsplatz — Pflege nach dem Livegang

`/ausbildung` trägt ein **JobPosting-JSON-LD**. Google verlangt, dass eine
Stellenanzeige verschwindet, sobald die Stelle besetzt ist; eine Anzeige,
die weiterläuft, wird abgewertet. Dafür genügt in `lib/ausbildung.ts`:

```ts
offen: false   // Markup und Bewerbungsaufforderung entfallen zugleich
```

Die Seite bleibt dann als Information über den Beruf stehen. Offen sind
noch: Höhe der Vergütung, Berufsschule, Ansprechpartnerin, Praktikum oder
Schnuppertag, eine echte Bewerbungsfrist (`gueltigBis` steht vorläufig auf
dem Tag vor Ausbildungsbeginn) und die Frage nach Social-Media-Konten.
Sie stehen als `.todo`-Box sichtbar auf der Seite.

Nach dem Livegang lohnen zwei kostenlose Einträge, die bei einer einzelnen
Stelle mehr bringen als jede Optimierung an der Seite: die Lehrstellenbörse
der Zahnärztekammer Brandenburg und die Jobbörse der Agentur für Arbeit.

### Impressum

Vom Auftraggeber am 27.09.2026 als vollständig bestätigt — so, wie es
steht.

### Datenschutzerklärung

Die Erklärung ist am 21.09.2026 gegen den Code geprüft und umgeschrieben
worden. Die Bearbeitungshinweise (Marken „Entwurf", `.todo`-Box) sind am
27.09.2026 auf Ansage des Auftraggebers entfernt worden.

Einen Abschnitt zum **Datenschutzbeauftragten** gibt es nicht mehr
(Auftraggeber, 27.09.2026): Die Praxis hat weniger als 20 Mitarbeiter und
muss nach § 38 BDSG keinen benennen. Die Abschnitte sind seitdem ab 02
neu nummeriert.

**Die Verarbeitungskette** (Auftraggeber, 21.09.2026) — so steht sie in den
Abschnitten 05 und 07:

| Rolle | Wer |
| --- | --- |
| Verantwortliche | Praxis Groß & Groß |
| Auftragsverarbeiter Website | Stefan Heinemann, Berlin |
| Unterauftragsverarbeiter Hosting | Netlify, Inc., USA |
| Auftragsverarbeiter E-Mail | STRATO AG, Berlin |

Die Praxis war vorher vollständig bei STRATO; dort liegt weiterhin der
E-Mail-Verkehr, die Website ist zu Netlify umgezogen. Zwei Verträge gehören
in die Unterlagen der Praxis, nicht auf die Website: der AV-Vertrag
Praxis ↔ Heinemann und der AV-Vertrag Praxis ↔ STRATO. Die Netlify-DPA
liegt beim Auftragsverarbeiter.

**Weiterleitungen der alten Website — erledigt (27.09.2026).** Alle Seiten
aus der `sitemap_index.xml` des alten Auftritts leiten jetzt dauerhaft auf
ihr neues Gegenstück (`next.config.ts`, `wordpressSeiten`). Die Demo-Inhalte
des alten Themes (`/portfolio-items/…`, `/faq-items/…`) enden bewusst mit
404. Nach dem Umzug in der Search Console unter „Seiten" prüfen, ob Google
weitere alte Adressen kennt, die dort nicht standen.

### Vor und nach dem Livegang — Suchmaschinen und KI

Schritt für Schritt, samt DNS-Umstellung bei STRATO: **`docs/LIVEGANG.md`**.

- **Google Search Console** und **Bing Webmaster Tools** für
  `https://www.zahnmedizin-potsdam.de` einrichten, Sitemap einreichen
  (`/sitemap.xml`). Bing kann die Einstellungen aus der Search Console
  übernehmen. ChatGPT sucht über Bing, Gemini über Google — beide Einträge
  sind damit auch die Grundlage für die KI-Suchen.
- **Google-Unternehmensprofil** abgleichen: Website-Link auf die neue Seite,
  Sprechzeiten wie in `lib/praxis.ts`. Geprüft am 27.09.2026: Website,
  Sprechzeiten, Telefon und Adresse stimmen bereits. Der Name dort lautet
  „Zahnarztpraxis für Ästhetik Groß & Groß" — die Website nennt ihn im
  JSON-LD als `alternateName`.
- **Hoster:** `www` als Hauptdomain, `zahnmedizin-potsdam.de` leitet
  dauerhaft darauf um (heute schon so beim alten Auftritt).

**Kein Einwilligungsbanner.** Geprüft und so gewollt: kein Cookie, kein
`localStorage`, keine Anfrage an Dritte vor einer Einwilligung. Wer ein
Analysewerkzeug, eine Schriftart vom CDN oder ein eingebettetes Video
ergänzt, macht ein Banner nötig **und** muss Abschnitt 02 der Erklärung
umschreiben — dort steht ausdrücklich, dass es nichts davon gibt.

## Geprüft und bewusst so belassen (03.10.2026)

Damit diese Punkte nicht erneut als Befund auftauchen:

- **`--color-accent-2`** ist fast gleich `--color-accent` und wird nirgends
  benutzt. Bleibt stehen, weil `classical.css` 1:1 übernommen ist.
- **`--font-heading-weight: 600`**, aber Seitentitel in 400: Das ist so
  gewollt, siehe den Kommentar in `classical.css` (Display-Schrift im
  normalen Schnitt).
- **`--space-*`** (4,6 / 9,2 … px) auf den Seiten ungenutzt: Die Skala passt
  nicht zu den abgenommenen Abständen. Ein Umstellen würde die Optik bei
  1440 px verändern.
- **Serifen-Fallback `sans-serif`** in `classical.css`: `app/schriften.css`
  überschreibt ihn mit `Georgia, serif`.
- **Gold-Akzent mit 3:1:** Text und Links nutzen `accent-700/800`. Reines
  `--color-accent` steht nur noch auf Grafik (Sterne, 3:1 genügt) und auf
  Schmuckziffern.
- **CSP mit `unsafe-inline`:** Bei Skripten fällt es nur mit Nonces weg, und
  dann würde jede Seite pro Anfrage gerendert (Begründung in
  `next.config.ts`). Bei Stilen fällt es erst weg, wenn alle Inline-Styles
  überführt sind.

## Die Selektor-Reparatur (Brücke für die restlichen Inline-Styles)

`site.css` steuert das mobile Verhalten der verbliebenen Inline-Styles über
den **Text** des `style`-Attributs:

```css
[style*="padding: 116px"]    { … }
[style*="margin: 0px 64px"]  { … }
```

Diese Schreibweise stammt aus der Ursprungsumgebung, in der der Browser das
Attribut normalisiert hat. React schreibt `style="padding:80px 64px"` — ohne
Leerzeichen. `scripts/repariere-style-selektoren.mjs` erweitert jeden
betroffenen Selektor um die tatsächlich vorkommenden Schreibweisen
(`npm run styles`, bearbeitet wird `app/site.css.original`).

Das ist die Brücke, nicht das Ziel. Für die Bausteine in
`app/bausteine.css` gilt sie nicht mehr: dort steht das Mobilverhalten
ausdrücklich. Sind alle Inline-Styles überführt, fallen Skript und
`site.css`-Erzeugung weg.

## Stolperstellen, die schon einmal gebissen haben

- **`backdrop-filter`:** nie `-webkit-backdrop-filter` von Hand dazuschreiben.
  Lightning CSS fasst beide zusammen und behält nur das Präfix — dann blurrt
  nur Safari.
- **`next.config.ts` importiert `lib/seiten.ts`:** dort nur relative Imports
  (`./praxis`), der Pfad-Alias `@/` gilt beim Laden der Konfiguration nicht.
  Sonst startet der Dev-Server nicht.
- **Offenes Mobilmenü:** nur `html` bekommt `overflow: hidden`. Bekommt auch
  `body` es, wird `body` zum Scroll-Container und die klebende Kopfzeile
  rutscht aus dem Bild.
- **Layout-Komponenten mit DOM-Messungen** (Scroll, Parallax, Zählwerke)
  müssen am Pfad hängen — das Layout bleibt beim Seitenwechsel bestehen.

## Gesperrte medizinische Begriffe

Nicht ergänzen, auch nicht als Füllmaterial: Intraoralscanner, DVT/3-D-
Implantatplanung, Knochenaufbau, Wurzelkanalbehandlung,
Wurzelspitzenresektion, Sedierung/Narkose. `npm run pruefen` prüft das.
