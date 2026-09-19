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
      steps: [
        { no: "01", title: "Anfrage senden", text: "Zwei Wunschzeiten, Ihr Anliegen und wie wir Sie erreichen." },
        { no: "02", title: "Bestätigung", text: "Rückmeldung innerhalb von 24 Stunden — telefonisch oder per E-Mail." },
        { no: "03", title: "Ihr Termin", text: "Mit der Zeit, die Ihr Anliegen tatsächlich braucht." }
      ]
    };
  }
}
