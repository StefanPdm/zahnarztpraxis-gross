/* Daten und Verhalten dieser Seite.
 *
 * Ursprungsform: eine Klasse, deren renderVals() alles zurückgibt, was das
 * Markup über {{ … }}-Platzhalter einsetzt. Die Namen der zurückgegebenen
 * Schlüssel entsprechen genau den Namen in markup.html.
 *
 * Überführung nach Next.js:
 *   • reine Listen und Texte  → Konstanten oben in page.tsx
 *   • this.state / setState   → useState in einer Client-Komponente
 *   • Funktionen (onClick …)  → normale Handler
 *   • componentDidMount       → useEffect(…, [])
 *
 * <sc-for list="{{ x }}" as="item">…</sc-for>  wird  {x.map(item => …)}
 * <sc-if value="{{ y }}">…</sc-if>             wird  {y && …}
 * $index ist der Map-Index.
 */

class Component extends DCLogic {
  renderVals() {
    return {
      haftung: [
        { title: "Inhalte", text: "Für eigene Inhalte auf diesen Seiten sind wir als Diensteanbieter nach den allgemeinen Gesetzen verantwortlich. Trotz sorgfältiger Kontrolle können wir keine Gewähr für Aktualität und Vollständigkeit übernehmen. Werden uns Rechtsverletzungen bekannt, entfernen wir die betreffenden Inhalte umgehend." },
        { title: "Externe Links", text: "Unser Angebot enthält Links zu Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar; eine dauerhafte Kontrolle ist ohne konkreten Anlass nicht zumutbar." },
        { title: "Urheberrecht", text: "Texte, Bilder und Gestaltung dieser Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der gesetzlichen Grenzen bedürfen unserer schriftlichen Zustimmung. Downloads sind für den privaten, nicht kommerziellen Gebrauch gestattet." }
      ],
      datenschutz: [
        { no: "01", title: "Verantwortliche Stelle", text: "Verantwortlich für die Datenverarbeitung auf dieser Website ist die Zahnärztliche Gemeinschaftspraxis Chantal Groß und Matthias Groß, Schopenhauerstraße 37, 14467 Potsdam. Sie erreichen uns telefonisch unter 0331 / 96 09 26 oder per E-Mail." },
        { no: "02", title: "Terminanfrage & Kontaktformular", text: "Ihre Angaben aus dem Formular — Name, Kontaktdaten, Wunschtermin und Ihr Anliegen — speichern wir zur Bearbeitung der Anfrage und für mögliche Anschlussfragen. Rechtsgrundlage ist Ihre Einwilligung sowie die Anbahnung des Behandlungsvertrags. Wir geben diese Daten nicht an Dritte weiter." },
        { no: "03", title: "Gesundheitsdaten", text: "Angaben zu Beschwerden, Medikamenten oder Ängsten sind besonders schützenswert. Bitte senden Sie nur, was für die Terminvergabe nötig ist; Details klären wir im Gespräch. In der Praxis unterliegen Ihre Behandlungsdaten der zahnärztlichen Schweigepflicht und den gesetzlichen Aufbewahrungsfristen." },
        { no: "04", title: "Server-Logdateien", text: "Unser Hoster erhebt automatisch Zugriffsdaten wie Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit und gekürzte IP-Adresse. Diese Daten dienen dem sicheren, störungsfreien Betrieb und werden nicht mit anderen Datenquellen zusammengeführt." },
        { no: "05", title: "Cookies", text: "Technisch notwendige Cookies ermöglichen den Betrieb der Seite und werden nach Ihrem Besuch gelöscht. Cookies für Statistik oder eingebettete Karten setzen wir nur mit Ihrer Einwilligung; Sie können diese jederzeit widerrufen und Cookies in Ihrem Browser blockieren oder löschen." },
        { no: "06", title: "Kartenanbieter", text: "Für die Anfahrt kann eine Kartendarstellung eines externen Anbieters eingebettet sein. Dabei wird Ihre IP-Adresse an dessen Server übertragen. Die Karte lädt erst, wenn Sie sie ausdrücklich aktivieren." },
        { no: "07", title: "SSL-Verschlüsselung", text: "Diese Seite überträgt Daten verschlüsselt. Eine gesicherte Verbindung erkennen Sie am „https://“ in der Adresszeile und am Schloss-Symbol Ihres Browsers." },
        { no: "08", title: "Ihre Rechte", text: "Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, deren Herkunft und Zweck, sowie auf Berichtigung, Einschränkung, Löschung und Datenübertragbarkeit. Zudem können Sie sich bei der zuständigen Aufsichtsbehörde beschweren. Der Nutzung unserer Kontaktdaten für unverlangte Werbung widersprechen wir ausdrücklich." }
      ]
    };
  }
}
