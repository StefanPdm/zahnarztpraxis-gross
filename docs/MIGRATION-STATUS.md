# Stand der Migration

Grundlage ist der Ordner `handoff/` — das Übergabepaket aus Claude Design
(17 Seiten, Layout-Bausteine, beide Stylesheets, JSON-LD, Alt-Konfiguration).
Er bleibt im Repo, damit jede Entscheidung nachvollziehbar bleibt und der
Konverter erneut laufen kann.

## Fertig und geprüft

| Bereich | Stand |
| --- | --- |
| Alle 17 Routen als `app/<slug>/page.tsx` | erzeugt, keine Rückstände an `{{ }}`, `sc-for`, `sc-if`, `hint-`, `.dc.html` |
| Design-System `classical.css` | 1:1, unverändert |
| Projekt-Stylesheet `site.css` | 1:1, plus Selektor-Reparatur (siehe unten) |
| Kopfzeile, Fußzeile, Termin-Leiste, Laufmarke, Zurück-nach-oben | je einmal in `components/`, nicht 17-mal |
| Schriften | `next/font/google`, self-hosted, kein Google-Request zur Laufzeit |
| Metadaten je Seite | aus `head.json` |
| JSON-LD je Seite | aus `jsonld.json`, unverkürzt |
| `sitemap.ts`, `robots.ts` | aus `routes.json` |
| Weiterleitungen `/​<slug>.html` → `/<slug>` | in `next.config.ts` |
| Sicherheits-Header | aus `legacy/.htaccess` |
| Angst-Regler, Anliegen-Auswahl | als Client-Komponenten, `useState` statt `this.state` |
| Termin-Versand `app/api/termin/route.ts` | Validierung mit zod, SMTP, Honeypot, Zeitstempel, IP-Begrenzung |
| Termin-Formular `components/TerminFormular.tsx` | Client-Komponente, gegen die Route verdrahtet; `/termin` bleibt Server Component (wegen `metadata`). Vorbelegung über `?anliegen=kontrolle|schmerzen`. Knopf bis zur Hydrierung gesperrt, damit kein nativer Versand Gesundheitsdaten in eine URL schreibt. Getestet bis zur SMTP-Prüfung; echter Versand erst mit `.env.local` |

## Der wichtigste Eingriff: die Selektor-Reparatur

`site.css` steuert das gesamte mobile Verhalten über den **Text** des
Inline-`style`-Attributs:

```css
[style*="padding: 116px"]    { … }
[style*="margin: 0px 64px"]  { … }
[style*="max-width: 1440px"] { … }
```

Diese Schreibweise stammt aus der Ursprungsumgebung, in der der Browser das
Attribut normalisiert hat — mit Leerzeichen nach dem Doppelpunkt und Längen
als `0px`. Weder das exportierte Markup noch React schreiben es so:

| Quelle | Ergebnis |
| --- | --- |
| Markup im Übergabepaket | `style="padding:80px 64px"` |
| React aus einem Style-Objekt | `style="padding:80px 64px"` |
| Erwartet von `site.css` | `style="padding: 80px 64px"` |

**Ohne Reparatur greift keine dieser 31 Regeln.** Die Seite sähe auf dem
Desktop völlig richtig aus und bräche unter 1000 px auseinander — ohne
Fehlermeldung, ohne Warnung im Terminal.

`scripts/repariere-style-selektoren.mjs` erweitert jeden betroffenen Selektor
um die tatsächlich vorkommenden Schreibweisen. Es wird nichts entfernt, nur
ergänzt. Bearbeitet wird `app/site.css.original`; `app/site.css` ist erzeugt:

```bash
npm run styles
```

Das ist die Brücke, nicht das Ziel. Die Arbeitsanweisung empfiehlt, die
Inline-Styles nach und nach durch echte Klassen zu ersetzen — **erst wenn
alle Seiten stehen und geprüft sind**. Danach fällt dieses Skript weg.

## Was ich anders gemacht habe als die Arbeitsanweisung

1. **Der `#navtoggle` bleibt.** Die Anweisung schlägt vor, das Mobilmenü an
   ein `data-`Attribut zu hängen und die Selektoren anzupassen. Rund zwanzig
   Regeln in `site.css` hängen an `input#navtoggle:checked ~ …`, darunter die
   abgenommene Burger-Animation. Das Kästchen ist stattdessen ein
   kontrolliertes React-Feld — dieselbe Wirkung, kein einziger geänderter
   Selektor.

2. **Ein Konverter statt Handarbeit.** `scripts/konvertiere-seiten.mjs`
   übersetzt Markup und Daten mechanisch. Damit ist die Übernahme
   wiederholbar: ändert sich eine Seite im Design, wird sie neu erzeugt statt
   von Hand nachgezogen.

   ```bash
   npm run seiten
   ```

   Achtung: Das überschreibt die Seiten. Die drei Stellen mit Handarbeit
   (`AngstRegler`, `AnliegenWahl`, Termin-Formular) müssen danach erneut
   eingesetzt werden. Beim Termin-Formular heißt das: den `<form>`-Block in
   `app/termin/page.tsx` durch `<TerminFormular anliegen={vorwahl} />`
   ersetzen und `searchParams` wieder auswerten. Vorher committen.

## Noch zu tun — Technik

- [ ] **Großelino** auf `/kinderzahnheilkunde` — die mitlaufende Figur mit
      Sprechblase, tastaturbedienbar. Noch nicht gebaut.
- [ ] **Laufmarke:** erkennt Abschnitte über `.colophon` bzw.
      `data-abschnitt`. Falls die Startseite anders ausgezeichnet ist, den
      Selektor in `components/Laufmarke.tsx` anpassen.
- [ ] **Zählwerke** erwarten `data-zaehl="1200"` am Element. Im übernommenen
      Markup steht die Zahl als Text — die Auszeichnung muss ergänzt werden.
- [ ] **OSM-Karte** auf `/anfahrt-parken`: lädt ohne Einwilligung von einem
      Drittserver. Vor dem Livegang Zwei-Klick-Lösung.
- [ ] Optischer Abgleich gegen die alte Seite bei **1440 px und 390 px**.

## Noch zu tun — Inhalte, nicht erfinden

Diese Punkte stammen aus der Übergabe und gelten unverändert:

- Vollständige 301-Liste der alten WordPress-URLs. In `next.config.ts` ist
  nur die eine belegte Regel gesetzt. Quellen: Google Search Console
  (Seiten → indexiert) und die alte `wp-sitemap.xml`. **Jede alte URL ohne
  Regel verliert ihr Ranking.**
- Mitarbeiternamen und Funktionen für `/praxis-team`
- Eckdaten der Praxisgeschichte seit 1991
- Echte Google-Bewertungen (die Startseite zeigt sie hinter `showReviews`
  als sichtbar gekennzeichnete Platzhalter)
- Zahnärztekammer, Aufsichtsbehörde, Berufsordnung, USt-IdNr. im Impressum
- Medizinische Freigaben für die sechs gesperrten Themen
- SMTP-Zugangsdaten (`.env.example` → `.env.local`)

## Gesperrte medizinische Begriffe

Nicht ergänzen, auch nicht als Füllmaterial: Intraoralscanner, DVT/3-D-
Implantatplanung, Knochenaufbau, Wurzelkanalbehandlung,
Wurzelspitzenresektion, Sedierung/Narkose.
