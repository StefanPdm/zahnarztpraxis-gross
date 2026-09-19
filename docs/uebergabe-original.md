# Übergabe: Zahnmedizin Potsdam → Next.js

Website der Zahnarztpraxis Groß & Groß, Potsdam — 17 Seiten, fertig abgenommen,
bisher als statische HTML-Site ausgeliefert. Dieses Paket enthält alles, was für
die Überführung in eine Next.js-App gebraucht wird.

**Die Arbeitsanweisung steht in `CLAUDE.md`.** Diese Datei hier gibt nur den
Überblick.

## Fidelity: hoch

Das ist kein Entwurf. Farben, Typografie, Abstände, Zustände und Texte sind
final und über mehrere Runden abgenommen. Ziel der Migration ist eine
**optisch identische** Seite auf neuer Technik — keine Neugestaltung. Wo etwas
besser gemacht werden könnte, erst fragen.

## Warum überhaupt migrieren

Die Site ist technisch gesund, hat aber zwei strukturelle Schwächen, die aus
ihrer Entstehung stammen:

1. **Kopfzeile, Notfall-Leiste und Fußzeile liegen in allen 17 Dateien
   dupliziert.** Jede Navigationsänderung war zuletzt ein Rundlauf über alle
   Seiten — mehrfach die Ursache für Inkonsistenzen, die einzeln nachgezogen
   werden mussten.
2. **Das Verhalten musste gegen eine Umgebung arbeiten, die das Markup nach
   dem Skriptlauf neu aufbaut.** Daher Timeout-Ketten und ein
   `MutationObserver` in `site.v2.js`, die in React alle entfallen.

Ein Layout-Baustein und React-Zustand lösen beides. Das ist der eigentliche
Gewinn — nicht Geschwindigkeit, die ist schon in Ordnung.

## Rahmen

- Next.js App Router, TypeScript, **kein Tailwind**
- **Node-Laufzeit, kein statischer Export** — das Termin-Formular versendet
  per SMTP und braucht dafür einen Route Handler
- Gestaltung bleibt in den beiden mitgelieferten Stylesheets

## Die 17 Seiten

| Route | Seite | Besonderheit |
| --- | --- | --- |
| `/` | Startseite | Praxis-Video, „Worum geht es?"-Einstieg, Bildtafeln I–VII, Zählwerke, mitlaufende Termin-Leiste |
| `/praxis-team` | Praxis & Team | Praxisgeschichte seit 1991, Porträts mit Wendeeffekt |
| `/angstpatienten` | Angstpatienten | eigener, ruhiger Tonfall |
| `/kinderzahnheilkunde` | Kinderzahnheilkunde | Begleitfigur „Großelino", eigene Farbfläche |
| `/leistungen` | Leistungen | Übersicht, Ziel des Untermenüs |
| `/zahnschmerzen` | Zahnschmerzen & Akutbehandlung | Akutfall-Einstieg |
| `/prophylaxe` | Prophylaxe | |
| `/parodontologie` | Parodontologie | einziges KI-gekennzeichnetes Bild |
| `/weisheitszaehne-chirurgie` | Weisheitszähne & Chirurgie | |
| `/implantologie` | Implantologie | über 1.200 gesetzte Implantate |
| `/aesthetische-zahnmedizin` | Ästhetische Zahnmedizin | |
| `/zahnlabor` | Zahnlabor | eigenes Labor im Haus |
| `/moderne-technik` | Moderne Technik | nur belegte Technik, siehe Sperrliste |
| `/anfahrt-parken` | Anfahrt & Parken | OSM-Karte (Consent offen), Gebäudeansicht mit eingezeichnetem Weg |
| `/kontakt` | Kontakt | |
| `/termin` | Termin | Formular — **hier ist echte Arbeit**, siehe CLAUDE.md Schritt 7 |
| `/impressum-datenschutz` | Impressum & Datenschutz | |

Vollständig mit Titeln und Descriptions in `routes.json`.

## Gestaltung

Grundlage ist das Design-System **Classical** — editorial, buchartig: heller
Grund, Serifen-Überschriften über Serifen-Lauftext, Haarlinien als Struktur,
Farbe als Kontur statt Fläche, Knöpfe umrandet statt gefüllt, Fotos als
mattierte Tafeln (`.plate`).

Alle Werte stehen als Tokens in `styles/classical.css` — `--color-*` (mit
Tonleitern 100–900), `--font-heading` / `--font-body`, `--space-*`,
`--radius-*`, `--shadow-*`. Projektspezifisch kommt in `styles/site.css` dazu:
`--font-ui` (Jost, für Navigation, Knöpfe, Kleintext) und die Farbwelt der
Kinderseite. **Keine Werte hart schreiben, die als Token vorliegen.**

Die Regeln des Systems im Detail: `styles/classical-designsystem.md`.

Zwei projektspezifische Festlegungen, die dort nicht stehen:

- Umbruchpunkt Desktop/Mobil ist **1000 px**
- Die Kopfzeile hat **keine Hintergrundfarbe**, nur Weichzeichner
  (22 px, geschrumpft 30 px, mit leichter Sättigung). Bei offenem Mobilmenü
  schaltet sie auf Deckung, sonst wären die Einträge unlesbar. Für Browser ohne
  `backdrop-filter` gibt es einen Fallback auf `--color-bg`.

## Assets

`public/` enthält die **26 tatsächlich benutzten** Dateien — Praxisfotos,
Porträts, Kindermotiv, Gebäudeansichten, das Praxis-Video (`Praxisflug.webm`),
das KI-Badge, Favicon und Apple-Touch-Icon. Aus dem Ursprungsprojekt nicht
übernommene Dateien waren Zwischenstände und Arbeitsmaterial.

Herkunft: Studioaufnahmen und Praxisfotos vom Auftraggeber; das Bild auf der
Parodontologie-Seite ist KI-erzeugt und darum gekennzeichnet.

## Was noch offen ist

Vor dem Livegang zu klären — in `CLAUDE.md` am Ende ausführlich:

- vollständige 301-Liste der alten WordPress-URLs (sonst Ranking-Verlust)
- Mitarbeiternamen und Funktionen, Eckdaten der Praxisgeschichte, echte
  Google-Bewertungen — aktuell Platzhalter
- Consent-Lösung für die OSM-Karte
- medizinische Freigaben für sechs gesperrte Themen
- SMTP-Zugangsdaten für das Formular

## Dateien in diesem Paket

```
CLAUDE.md                          Arbeitsanweisung — hier anfangen
README.md                          diese Übersicht
routes.json                        alle Seiten mit Route, Titel, Description
layout/                            Kopfzeile, Fußzeile, Termin-Leiste, Laufmarke
                                   — einmalig, gehören nach app/layout.tsx
pages/<route>/markup.html          nur der Seiteninhalt
pages/<route>/data.js              Listen und Verhalten der Seite
pages/<route>/jsonld.json          strukturierte Daten
pages/<route>/head.json            Titel, Description, Canonical
styles/classical.css               Design-System: Tokens + Komponenten
styles/site.css                    projektspezifische Ergänzungen
styles/classical-designsystem.md   Gestaltungsregeln
public/                            26 Assets
legacy/site.v2.js                  Verhaltens-Referenz, nicht übernehmen
legacy/.htaccess                   bisherige Weiterleitungen und Header
legacy/sitemap.xml, robots.txt     bisherige URL-Liste
```

## Echte Inhaltslücken

Alles andere im Paket ist fertiger, abgenommener Text. Nur diese Stellen sind
bewusst unausgefüllt — sie tragen die Klasse `.todo` oder das Wort
„Platzhalter" und **dürfen nicht erfunden werden**:

| Wo | Was fehlt |
| --- | --- |
| `/praxis-team` | Namen und Funktionen der Mitarbeiter­innen; Eckdaten der Praxisgeschichte seit 1991 |
| `/` | drei Google-Bewertungen (aktuell mit „Platzhalter · Google" gekennzeichnet) |
| `/impressum-datenschutz` | Zahnärztekammer, Aufsichtsbehörde, Berufsordnung, USt-IdNr. |
| `next.config.js` | vollständige 301-Liste der alten WordPress-URLs |

Die beiden Zahnärzte (Matthias Groß, Chantal Groß) sind vollständig — mit
Porträt, Zitat, Werdegang. Es fehlt nur das übrige Team.
