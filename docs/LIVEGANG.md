# Livegang: von STRATO/WordPress zu Netlify

Die neue Website läuft bereits auf Netlify unter
`https://zahnarztpraxis-gross.netlify.app`. Die Domain
`zahnmedizin-potsdam.de` zeigt noch auf die alte WordPress-Seite bei STRATO.
Beim Livegang wird **nur umgestellt, wohin die Domain zeigt**. Domain,
DNS-Verwaltung und E-Mail bleiben bei STRATO.

Stand der Prüfung: 27.09.2026. Die Werte unter „Ausgangslage“ sind per
DNS-Abfrage belegt.

---

## Das Prinzip in einem Satz

In der DNS-Verwaltung bei STRATO werden zwei Einträge geändert und einer
gelöscht. Danach beantwortet Netlify alle Aufrufe von
`www.zahnmedizin-potsdam.de`, und die E-Mail läuft unverändert weiter über
STRATO.

**Keine „Weiterleitung“ bei STRATO einrichten.** STRATO bietet an, eine
Domain per HTTP auf eine andere Adresse weiterzuleiten. Dann stünde in der
Adresszeile und bei Google `zahnarztpraxis-gross.netlify.app`, und die
Domain verlöre ihr Ranking. Richtig ist die Umstellung der DNS-Einträge
(Schritt 3).

**Die Nameserver nicht zu Netlify umziehen.** Das ginge auch, dann müssten
aber alle E-Mail-Einträge (MX, DMARC, gegebenenfalls SPF und DKIM) bei
Netlify neu angelegt werden. Ein Fehler dabei legt die Praxis-E-Mail lahm,
und nichts wäre gewonnen.

---

## Ausgangslage (belegt, 27.09.2026)

**Diese Werte vorher notieren, für den Rückweg.**

| Eintrag | Name | Wert heute | Nach dem Livegang |
| --- | --- | --- | --- |
| NS | `zahnmedizin-potsdam.de` | `docks11.rzone.de`, `shades03.rzone.de` (STRATO) | **unverändert** |
| A | `zahnmedizin-potsdam.de` | `81.169.145.74` (STRATO) | `75.2.60.5` (Netlify) |
| AAAA | `zahnmedizin-potsdam.de` | `2a01:238:20a:202:1074::` (STRATO) | **löschen** |
| CNAME | `www` | `zahnmedizin-potsdam.de` | `zahnarztpraxis-gross.netlify.app` |
| MX | `zahnmedizin-potsdam.de` | `smtpin.rzone.de` (STRATO) | **unverändert** |
| TXT | `_dmarc` | `v=DMARC1;p=reject;` | **unverändert** (siehe Schritt 0.3) |
| TXT (SPF) | `zahnmedizin-potsdam.de` | *keiner* | siehe Schritt 0.3 |
| CAA | — | *keiner* | *keiner* (Let's Encrypt darf ausstellen) |

**Warum der AAAA-Eintrag weg muss:** Er zeigt per IPv6 auf den alten
STRATO-Server. Bleibt er stehen, landen alle Besucher mit IPv6, also ein
großer Teil der Handynutzer, weiter auf der alten WordPress-Seite. Und
Netlify kann kein Zertifikat ausstellen. Das ist der häufigste Fehler bei
diesem Umzug.

---

## Schritt 0 — Vorbereitung (einige Tage vorher)

### 0.1 Vertrag bei STRATO prüfen

- [ ] Im STRATO-Kundenlogin nachsehen, in welchem Paket Domain, E-Mail und
      Webspace stecken. Meist ist es **ein** Paket.
- [ ] **Das Paket nicht kündigen.** Mit ihm verschwänden Domain und E-Mail.
      Später (Schritt 6) nur auf einen kleineren Tarif ohne WordPress
      wechseln, etwa „Domain + Mail“.

### 0.2 Sicherung der alten Website

- [ ] WordPress-Sicherung herunterladen: Dateien und Datenbank, über
      STRATO-Backup oder ein Plugin (z. B. UpdraftPlus). Sicher ablegen.
      Das ist die Rückfallebene, falls später doch etwas von dort gebraucht
      wird.

### 0.3 E-Mail-Zustellung klären — wichtig, auch unabhängig vom Umzug

Die Domain hat eine DMARC-Regel mit `p=reject`: Empfänger sollen jede Mail
von `@zahnmedizin-potsdam.de` **abweisen**, die nicht per SPF oder DKIM
nachweisbar von einem berechtigten Server kommt. Einen SPF-Eintrag gibt es
nicht, und unter dem üblichen STRATO-Namen ist kein DKIM-Schlüssel
veröffentlicht.

Folge, falls das stimmt: Gmail, GMX, web.de und Outlook weisen Mails der
Praxis womöglich ab. Das gilt für die normale Praxis-Post und ebenso für
die Eingangsbestätigung, die das Terminformular an Patienten schickt.

- [ ] **Test:** Von `praxis@zahnmedizin-potsdam.de` eine Mail an eine
      Gmail-Adresse schicken. Kommt sie an, dort „Original anzeigen“
      öffnen: `SPF`, `DKIM` und `DMARC` sollten jeweils `PASS` zeigen.
- [ ] Falls nicht: im STRATO-Kundenlogin unter der Domain → DNS **SPF** und
      **DKIM** aktivieren. STRATO bietet dafür eigene Schalter; die Werte
      nicht von Hand eintippen. Danach den Test wiederholen.

### 0.4 Netlify vorbereiten

- [ ] Letzten Stand von `main` gepusht und auf Netlify erfolgreich gebaut
      (Deploys → „Published“).
- [ ] Umgebungsvariablen unter *Site configuration → Environment variables*
      gesetzt (Vorlage: `.env.example`):
  - `SMTP_HOST`, `SMTP_PORT` (587), `SMTP_USER`, `SMTP_PASS`: das
    STRATO-Postfach, über das das Formular sendet
  - `SMTP_FROM`: Absender, muss zum SMTP-Konto passen
  - `PRAXIS_MAIL`: Empfängeradresse der Praxis
  - `GOOGLE_PLACES_API_KEY`: in der Google Cloud Console auf die
    „Places API“ beschränkt
- [ ] **Terminformular auf `zahnarztpraxis-gross.netlify.app` testen**, mit
      eigener Gmail-Adresse als Patient:
  - [ ] Anfrage kommt bei der Praxis an.
  - [ ] Eingangsbestätigung kommt im Gmail-Postfach an, nicht im Spam.
  - [ ] Die Bestätigung enthält **keine** Angabe zur Zahnarztangst
        (Gesundheitsdatum, geht nur an die Praxis).
- [ ] Offene Inhalte vor dem Livegang (siehe `docs/STAND.md`):
      Betriebsferien in `schliesstage` (`lib/praxis.ts`) eintragen,
      Zahlungsarten und weitere Profile (jameda, Doctolib …) bei der Praxis
      erfragen.

### 0.5 Zeitpunkt wählen

- [ ] Einen ruhigen Zeitpunkt wählen, etwa Freitagnachmittag nach
      Praxisschluss oder am Wochenende. Eine Ausfallzeit entsteht nicht:
      Bis die Änderung überall angekommen ist, antwortet einfach noch die
      alte Seite. Das dauert Minuten bis einige Stunden, selten bis 24 h.

---

## Schritt 1 — Domain bei Netlify eintragen

*Netlify → Site → Domain management → Add a domain*

- [ ] `www.zahnmedizin-potsdam.de` hinzufügen.
- [ ] Netlify schlägt vor, auch `zahnmedizin-potsdam.de` (ohne www)
      hinzuzufügen: **annehmen**.
- [ ] **`www.zahnmedizin-potsdam.de` als Primary domain** festlegen. Dann
      leitet Netlify die Adresse ohne www dauerhaft auf www um. Die
      `netlify.app`-Adresse leitet Netlify **nicht** um; das übernimmt eine
      Regel in `next.config.ts`.
- [ ] Netlify zeigt jetzt „Awaiting External DNS“ oder Ähnliches. Das ist
      richtig so, die DNS-Einträge folgen in Schritt 3.
- [ ] Falls Netlify einen TXT-Eintrag zur Bestätigung verlangt (z. B.
      `netlify-challenge`), diesen in Schritt 3 bei STRATO mit anlegen.

## Schritt 2 — letzter Blick vor dem Umschalten

- [ ] Alte Werte aus der Tabelle oben notiert.
- [ ] Neue Seite unter `zahnarztpraxis-gross.netlify.app` einmal
      durchgeklickt, Formular getestet (0.4).

## Schritt 3 — DNS bei STRATO umstellen (der eigentliche Livegang)

*STRATO-Kundenlogin → Domains → `zahnmedizin-potsdam.de` → DNS
(Einstellungen verwalten).* Die Menüpunkte heißen je nach Paket leicht
anders.

- [ ] **A-Record** der Domain: von `81.169.145.74` auf **`75.2.60.5`**.
- [ ] **AAAA-Record** der Domain: **entfernen bzw. deaktivieren.**
      Bei STRATO lässt sich das Feld nicht leeren: Die Maske bietet nur
      „STRATO Standard IP-Adresse“ oder „Eigene IP-Adresse“, und die will
      eine gültige IPv6-Adresse. **Nicht „STRATO Standard“ wählen**, das
      ist der alte Server. Am 27.09.2026 war nach dem Umstellen des
      A-Records kein AAAA-Eintrag mehr veröffentlicht, auch nicht am
      STRATO-Nameserver selbst. Die AAAA-Maske also abbrechen und nur
      prüfen:
      `nslookup -type=AAAA zahnmedizin-potsdam.de docks11.rzone.de`
      darf keine Adresse liefern.
      *Plan B, falls doch ein AAAA auf STRATO zeigt:* A und AAAA beide auf
      „STRATO Standard“ lassen, im Reiter *Webserver* die Domain dauerhaft
      (301) auf `https://www.zahnmedizin-potsdam.de` umleiten und nur `www`
      per CNAME zu Netlify schicken. Bei Netlify dann nur die www-Domain
      eintragen. Die Domain ohne www bleibt so bei STRATO und leitet weiter;
      dafür muss das SSL-Zertifikat für sie bei STRATO aktiv bleiben.
- [ ] **www:** Bei STRATO erbt `www` oft still die Einstellungen der
      Hauptdomain. Falls sich für `www` kein eigener Eintrag setzen lässt,
      zuerst unter *Subdomains* die Subdomain `www` anlegen. Dann für `www`
      einen **CNAME-Record** auf **`zahnarztpraxis-gross.netlify.app`**
      setzen.
- [ ] **MX, E-Mail, DMARC, SPF, DKIM: nicht anfassen.**
- [ ] Falls Netlify einen Bestätigungs-TXT verlangt hat: anlegen.
- [ ] Speichern. Die Uhrzeit notieren.

## Schritt 4 — HTTPS-Zertifikat

*Netlify → Domain management → HTTPS*

- [ ] Sobald die DNS-Einträge angekommen sind (meist Minuten bis eine
      Stunde), stellt Netlify das Zertifikat von Let's Encrypt von selbst
      aus. Dauert es länger als ein paar Stunden: „Verify DNS configuration“
      und „Provision certificate“ anklicken.
- [ ] Hängt es trotzdem, ist fast immer noch ein AAAA-Eintrag auf den alten
      Server gesetzt (Schritt 3). War beim ersten Versuch noch einer
      gesetzt, versucht Netlify es nicht von selbst erneut: dann
      „Provision certificate“ bzw. „Renew certificate“ von Hand anstoßen.
- [ ] **Bis das Zertifikat steht, zeigt `https://` eine Sicherheitswarnung**
      (Netlify antwortet mit seinem Zertifikat für `*.netlify.app`). Deshalb
      Schritt 3 und 4 zügig nacheinander erledigen und nicht über Nacht
      halb umgestellt lassen.

## Schritt 5 — Prüfen, ob alles läuft

### 5.1 Ist die Umstellung angekommen?

In der Eingabeaufforderung (Windows) oder im Terminal:

```bash
nslookup zahnmedizin-potsdam.de 8.8.8.8          # erwartet: 75.2.60.5
nslookup -type=AAAA zahnmedizin-potsdam.de 8.8.8.8  # erwartet: keine Adresse
nslookup www.zahnmedizin-potsdam.de 8.8.8.8      # erwartet: …netlify.app
nslookup -type=MX zahnmedizin-potsdam.de 8.8.8.8  # erwartet: smtpin.rzone.de
```

### 5.2 Adressen und Weiterleitungen

Jede Zeile im Browser aufrufen, am besten in einem privaten Fenster:

| Aufruf | Erwartet |
| --- | --- |
| `https://www.zahnmedizin-potsdam.de` | neue Startseite, Schloss-Symbol |
| `http://www.zahnmedizin-potsdam.de` | → `https://www.…` |
| `https://zahnmedizin-potsdam.de` | → `https://www.zahnmedizin-potsdam.de` |
| `https://zahnarztpraxis-gross.netlify.app/…` | → `https://www.zahnmedizin-potsdam.de/…` (Regel in `next.config.ts`; Netlify leitet das nicht von selbst um) |
| `…/zahnarztpraxis-gross-potsdam/` | → `/praxis-team` |
| `…/zahnbehandlung-zahnlabor-potsdam/` | → `/leistungen` |
| `…/datenschutz-impressum/` | → `/impressum-datenschutz` |
| `…/online-termin-zahnarzt-potsdam/` | → `/#termin` |
| `…/news/` | → Startseite |
| `…/kontakt/` | → `/kontakt` |
| `…/portfolio-items/surgery/` | Seite „nicht gefunden“ (gewollt) |
| `…/sitemap.xml`, `…/robots.txt`, `…/llms.txt` | neue Dateien |

Schnelltest im Terminal: Der Header `server: Netlify` zeigt, dass die neue
Seite antwortet.

```bash
curl -sI https://www.zahnmedizin-potsdam.de | grep -i "^server"
curl -sI https://zahnmedizin-potsdam.de/zahnarztpraxis-gross-potsdam/ | grep -i "^location"
```

### 5.3 Funktionen

- [ ] Terminformular auf `www.zahnmedizin-potsdam.de` abschicken:
      Praxis-Mail und Bestätigung kommen an (wie in 0.4).
- [ ] E-Mail der Praxis: eine Mail empfangen **und** eine senden. Der
      Beweis, dass MX und Postfach unberührt sind.
- [ ] Startseite am Handy: Bewertungen sichtbar, Video läuft, Öffnungsstatus
      stimmt.
- [ ] `/anfahrt-parken`: Karte lädt erst nach Klick.
- [ ] Eine Seite per WhatsApp an sich selbst schicken: Vorschaubild
      erscheint.

---

## Schritt 6 — Suchmaschinen und KI (am selben Tag)

- [ ] **Google Search Console:** Property vom Typ „Domain“ für
      `zahnmedizin-potsdam.de` anlegen. Den Bestätigungs-TXT bei STRATO im
      DNS eintragen (zusätzlicher TXT-Eintrag, der Rest bleibt).
  - [ ] *Sitemaps* → `https://www.zahnmedizin-potsdam.de/sitemap.xml`
        einreichen.
  - [ ] *URL-Prüfung* → Startseite → „Indexierung beantragen“. Ebenso für
        `/implantologie`, `/angstpatienten`, `/zahnschmerzen`.
  - [ ] Die „Adressänderung“ wird **nicht** gebraucht, die Domain bleibt
        dieselbe.
- [ ] **Bing Webmaster Tools:** „Import from Google Search Console“, dann
      ist auch die Sitemap drin. ChatGPT sucht über Bing, deshalb zählt
      dieser Eintrag doppelt.
- [ ] **Google-Unternehmensprofil** (business.google.com):
  - [ ] Website: `https://www.zahnmedizin-potsdam.de`
  - [ ] Sprechzeiten mit `lib/praxis.ts` abgleichen. Mo/Di 8–13 und
        14–17:30, Mi 8–13, Do/Fr 8–12.
  - [ ] Terminlink: `https://www.zahnmedizin-potsdam.de/#termin`
- [ ] **Facebook-Seite** der Praxis: Website-Link prüfen.

---

## Schritt 7 — Nachsorge

**Nach 1–2 Wochen**
- [ ] Search Console → *Seiten*: Tauchen unter „Nicht gefunden (404)“
      alte Adressen auf, die keine Theme-Demo sind (`/portfolio-items/…`,
      `/faq-items/…` sind gewollt)? Dann Regel in `next.config.ts`
      (`wordpressSeiten`) ergänzen.
- [ ] Search Console → *Core Web Vitals*: echte Ladezeiten ansehen.
      Lighthouse misst im Labor mobil LCP 3,4 s; echte Besucher liegen
      meist darunter. Erst mit echten Daten entscheiden, ob nachgebessert
      wird.

**Nach etwa 4 Wochen**, wenn alles stabil läuft:
- [ ] Bei STRATO vom WordPress-Paket auf einen Tarif **mit Domain und
      E-Mail, ohne Webspace** wechseln. Nicht kündigen, siehe 0.1.
- [ ] Vorher sicherstellen, dass die Sicherung aus 0.2 vorliegt.

---

## Rückweg, falls etwas schiefgeht

Bei STRATO die drei Einträge auf die notierten alten Werte zurücksetzen:

- A → `81.169.145.74`
- AAAA → `2a01:238:20a:202:1074::`
- `www` → CNAME auf `zahnmedizin-potsdam.de` (bzw. die eigene Subdomain
  wieder löschen)

Die alte WordPress-Seite ist dann nach Minuten bis Stunden wieder
erreichbar. Deshalb bleibt sie bis Schritt 7 unangetastet.

---

## Gut zu wissen

- **HSTS:** Die neue Seite sendet `Strict-Transport-Security` mit
  `includeSubDomains` (`next.config.ts`). Browser erzwingen dann für
  **alle** Subdomains von `zahnmedizin-potsdam.de` HTTPS. Falls die Praxis
  eine weitere Subdomain nutzt, die nur über `http://` erreichbar ist, wäre
  die nach dem ersten Besuch der Startseite blockiert. Vor dem Livegang bei
  STRATO unter *Subdomains* nachsehen; heute ist keine bekannt.
- **Sitemap-Datum:** Das Änderungsdatum je Seite kommt aus dem Git-Verlauf.
  Klont Netlify nur flach, steht dort das Build-Datum. Das ist unkritisch.
- **Datenschutzerklärung:** Sie nennt bereits Netlify (Hosting) und STRATO
  (E-Mail). Das passt zu genau diesem Aufbau.
