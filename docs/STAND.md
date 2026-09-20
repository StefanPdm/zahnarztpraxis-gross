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
| Designsystem | `app/bausteine.css` + Komponenten, lebende Übersicht unter `/bausteine`; Inline-Styles 1382 → 751 |
| Qualitätssicherung | `npm run pruefen`: gesperrte Begriffe, Titellängen, Seitenverzeichnis, Bildmaße — läuft vor jedem Build |

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

- Vollständige 301-Liste der alten WordPress-URLs. In `next.config.ts` ist
  nur die eine belegte Regel gesetzt. Quellen: Google Search Console
  (Seiten → indexiert) und die alte `wp-sitemap.xml`. **Jede alte URL ohne
  Regel verliert ihr Ranking.**
- Mitarbeiternamen und Funktionen für `/praxis-team`
- Eckdaten der Praxisgeschichte seit 1991
- Echte Google-Bewertungen (die Startseite zeigt sie hinter `showReviews`
  als sichtbar gekennzeichnete Platzhalter) — vor dem Livegang ersetzen
  oder `showReviews = false`.
- Zahnärztekammer, Aufsichtsbehörde, Berufsordnung, USt-IdNr. im Impressum
- Medizinische Freigaben für die sechs gesperrten Themen

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
