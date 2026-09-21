# Alte Adressen — Bestandsaufnahme vom 21.09.2026

Erhoben, solange die alte Seite noch erreichbar war. **Unter
`www.zahnmedizin-potsdam.de` lief zu diesem Zeitpunkt noch das alte
WordPress**, die neue Seite war nur auf Netlify. Nach dem Umschalten ist
diese Quelle weg — dann bleiben nur Search Console und Wayback.

## Wie es erhoben wurde

Vier Quellen, in dieser Reihenfolge:

1. **Die Sitemaps der alten Seite.** `sitemap_index.xml` verweist auf
   `page-sitemap.xml`, `avada_portfolio-sitemap.xml` und
   `avada_faq-sitemap.xml`. Das ist die Liste, die WordPress selbst für
   veröffentlicht hält.

   ```bash
   curl -sL https://www.zahnmedizin-potsdam.de/sitemap_index.xml \
     | grep -oE "<loc>[^<]+</loc>" | sed 's|</\{0,1\}loc>||g'
   ```

2. **Das Archiv (Wayback CDX).** Zeigt auch Adressen, die längst aus der
   Sitemap verschwunden sind — hier eine ganze `.html`-Generation davor.

   ```bash
   curl -s "https://web.archive.org/cdx/search/cdx?url=zahnmedizin-potsdam.de\
&matchType=domain&output=text&fl=original&collapse=urlkey&filter=statuscode:200"
   ```

3. **Die 301er der alten Seite selbst.** Sie verraten die Zuordnung der
   `.html`-Generation zur WordPress-Generation — man muss sie nicht raten:

   ```bash
   curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" \
     https://www.zahnmedizin-potsdam.de/praxis.html
   # → 301 https://www.zahnmedizin-potsdam.de/zahnarztpraxis-gross-potsdam/
   ```

4. **Noch offen, nur der Praxis zugänglich:**
   - **Google Search Console** → Indexierung → Seiten → „Indexiert" →
     exportieren. Und Leistung → Seiten über 16 Monate: Adressen mit
     Impressionen sind die, deren Ranking zählt.
   - **Search Console → Links → Externe Links → Top-Linkziele.** Eine
     verlinkte Adresse, die ins Leere läuft, verschenkt den Link.
   - **STRATO-Zugriffslogs.** Zeigen, was tatsächlich abgerufen wird —
     auch Adressen aus Flyern, Branchenbüchern und alten Mails.

## Was gefunden wurde

### WordPress-Generation (zuletzt live, das ist das Indexierte)

| Alt | Titel damals | Neu |
| --- | --- | --- |
| `/` | Zahnarzt Potsdam | `/` |
| `/zahnarztpraxis-gross-potsdam/` | Zahnarztpraxis | `/praxis-team` |
| `/zahnbehandlung-zahnlabor-potsdam/` | Leistungen | `/leistungen` ✔ Regel vorhanden |
| `/kontakt/` | Kontakt | `/kontakt` |
| `/datenschutz-impressum/` | Datenschutz & Impressum | `/impressum-datenschutz` |
| `/online-termin-zahnarzt-potsdam/` | Online Termin | `/#termin` |
| `/news/` | News | **offen** — keine Entsprechung |

### `.html`-Generation davor (aus dem Archiv, Ziel über die 301er bestätigt)

| Alt | Neu |
| --- | --- |
| `/praxis.html`, `/zahnarzt-team.html`, `/team.html` | `/praxis-team` |
| `/zahnarzt-leistungen/zahnbehandlungen.html` | `/leistungen` |
| `/zahnarzt-leistungen/zahnlabor.html` | `/zahnlabor` |
| `/anfahrt.html` | `/anfahrt-parken` |
| `/kontakt.html` | `/kontakt` |
| `/kontakt/zahnarzttermin-online-potsdam.html` | `/#termin` |
| `/impressum.html`, `/datenschutz.html` | `/impressum-datenschutz` |
| `/bewertungen.html` | `/` |

`/leistungen.html` und die übrigen Slugs aus `docs/legacy/sitemap.xml`
deckt die Regel `htmlVarianten` in `next.config.ts` bereits ab.

### Demo-Inhalte des Avada-Themes — kein Wert, aber in der Sitemap

`/portfolio-items/` mit sechs Unterseiten (`pet-grooming`, `vaccinations`,
`surgery` …) und `/faq-items/` mit acht Unterseiten (Lorem-ipsum-Titel).
Das ist nie gepflegter Demo-Inhalt. Vorschlag: auf `/` leiten, damit kein
404 entsteht — Ranking geht dabei keins verloren.

### Technische Reste

`/feed/`, `/comments/feed/`, `/author/ggadmin/`, `/wp-login.php`,
`/xmlrpc.php`. Die ersten drei fängt `wordpressReste` in `next.config.ts`
bis auf `/comments/feed/` ab. Die beiden PHP-Adressen dürfen 404 geben.

## Vor dem Umschalten

Die Erhebung ist eine Momentaufnahme. **Bevor die Domain auf Netlify zeigt**,
sollten Search Console und die STRATO-Logs dazukommen — danach sind beide
Quellen nur noch eingeschränkt zu haben. Nach dem Umschalten liefert die
Search Console unter „Nicht indexiert → Nicht gefunden (404)" den Rest
nach; dort in den ersten Wochen wöchentlich nachsehen.
