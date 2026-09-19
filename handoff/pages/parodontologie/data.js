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
      zeichen: [
        "Das Zahnfleisch blutet beim Zähneputzen oder bei der Zahnseide.",
        "Es ist dunkelrot und geschwollen statt blassrosa und fest.",
        "Mundgeruch, der nach dem Putzen zurückkommt.",
        "Die Zähne wirken länger — das Zahnfleisch geht zurück, Zahnhälse liegen frei.",
        "Ein Zahn fühlt sich locker an oder hat seine Stellung leicht verändert.",
        "Empfindliche Zahnhälse bei Kälte, Süßem oder Berührung."
      ],
      ablauf: [
        { no: "01", title: "Befund und Messung", text: "Wir messen die Tiefe der Zahnfleischtaschen an jedem Zahn und beurteilen mit Untersuchung und Röntgenbild, wie weit der Knochen betroffen ist." },
        { no: "02", title: "Vorbehandlung", text: "Zuerst kommen die Beläge oberhalb des Zahnfleischs weg, und Sie erfahren, wie Sie die kritischen Stellen zu Hause erreichen. Ohne diesen Schritt hält das Ergebnis nicht." },
        { no: "03", title: "Taschen reinigen", text: "Die Wurzeloberflächen unterhalb des Zahnfleischsaums werden gereinigt und geglättet, unterstützt durch den Laser zur Keimreduktion. In örtlicher Betäubung, meist in zwei Sitzungen." },
        { no: "04", title: "Kontrolle und Recall", text: "Nach einigen Wochen messen wir erneut. Danach halten wir das Ergebnis über ein festes Recall-Programm mit kurzen Abständen." }
      ],
      faq: [
        { q: "Woran merke ich, dass ich Parodontitis habe?", a: "Am häufigsten an blutendem Zahnfleisch beim Putzen. Weitere Zeichen sind dunkelrotes, geschwollenes Zahnfleisch, wiederkehrender Mundgeruch, zurückgehendes Zahnfleisch und im späteren Verlauf lockere Zähne." },
        { q: "Tut die Behandlung weh?", a: "Die Reinigung der Taschen findet in örtlicher Betäubung statt. Danach kann das Zahnfleisch einige Tage empfindlich sein — durch den Laser fällt der Wundschmerz in der Regel geringer aus." },
        { q: "Wie viele Termine brauche ich?", a: "Meist Befund, Vorbehandlung, zwei Sitzungen für die Taschenreinigung und eine Kontrolle nach einigen Wochen. Danach folgt das Recall-Programm dauerhaft." },
        { q: "Zahlt die Krankenkasse die Parodontitis-Behandlung?", a: "Die Parodontitis-Therapie ist bei entsprechendem Befund eine Leistung der gesetzlichen Krankenkassen; einzelne Zusatzleistungen können privat sein. Sie bekommen den Plan vorher schriftlich." },
        { q: "Kann der abgebaute Knochen wieder aufgebaut werden?", a: "Verlorener Kieferknochen wächst nicht von selbst zurück. Deshalb ist das Ziel, den Abbau zu stoppen — je früher wir behandeln, desto mehr bleibt erhalten." },
        { q: "Wird Parodontitis wieder auftreten?", a: "Die Bakterien kommen zurück, das ist normal. Mit regelmäßiger Nachsorge und guter Pflege zu Hause bleibt die Erkrankung aber unter Kontrolle." }
      ]
    };
  }
}
