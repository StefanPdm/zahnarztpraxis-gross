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
      gruende: [
        "Der Zahn liegt schief und drückt gegen den Nachbarzahn.",
        "Er kommt nur teilweise durch — unter dem Zahnfleischrand entstehen Entzündungen, die immer wiederkehren.",
        "Er lässt sich nicht putzen, weil er zu weit hinten oder halb bedeckt liegt. Karies ist dann eine Frage der Zeit.",
        "Es gibt wiederkehrende Schmerzen oder Schwellungen in der Region.",
        "Der Platz wird für eine geplante Versorgung gebraucht."
      ],
      ablauf: [
        { no: "01", title: "Röntgen und Befund", text: "Anhand von Untersuchung und Röntgenbild von Ober- und Unterkiefer bestimmen wir die Lage jedes Weisheitszahns und planen den Eingriff entsprechend." },
        { no: "02", title: "Aufklärung", text: "Sie erfahren vorher, was gemacht wird, wie lange es dauert, welche Risiken bestehen und was es kostet — schriftlich, mit Zeit zum Nachdenken." },
        { no: "03", title: "Der Eingriff", text: "In örtlicher Betäubung. Sie spüren Druck, aber keinen Schmerz. Je nach Lage werden ein Zahn oder mehrere in einer Sitzung entfernt." },
        { no: "04", title: "Nachsorge", text: "Kontrolle der Wunde und, wenn genäht wurde, Fäden ziehen nach etwa einer Woche. Bei Beschwerden dazwischen rufen Sie an." }
      ],
      danach: [
        { wann: "Sofort", text: "Kühlen Sie von außen mit einem kühlen Tuch, mehrmals für einige Minuten — nicht mit Eis direkt auf der Haut." },
        { wann: "Heute", text: "Nichts essen, solange die Betäubung wirkt. Danach weiche, lauwarme Kost auf der anderen Seite kauen." },
        { wann: "48 h", text: "Kein Sport, keine schwere körperliche Arbeit, keine Sauna, kein heißes Bad — alles davon fördert Nachblutungen." },
        { wann: "48 h", text: "Kein Alkohol, kein Kaffee, kein Nikotin. Rauchen verzögert die Wundheilung deutlich." },
        { wann: "Erste Tage", text: "Nicht mit der Zunge in der Wunde spielen und nicht kräftig spülen — das Blutgerinnsel muss dort bleiben." },
        { wann: "Immer", text: "Weiterputzen, aber die Wunde aussparen. Ein sauberer Mund heilt besser." }
      ],
      weitere: [
        { title: "Zahnentfernung", text: "Wenn ein Zahn nicht erhalten werden kann, entfernen wir ihn so schonend wie möglich — und besprechen gleich, wie die Lücke später versorgt wird." },
        { title: "Implantation", text: "Das Setzen von Zahnimplantaten ist ein chirurgischer Eingriff. Planung, Implantation und Zahnersatz laufen bei uns in einer Hand." },
        { title: "Freilegung und Zahnfleischkorrektur", text: "Kleinere Eingriffe am Zahnfleisch, etwa im Rahmen einer Implantatversorgung oder einer Parodontitis-Behandlung." }
      ],
      faq: [
        { q: "Muss ich meine Weisheitszähne entfernen lassen?", a: "Nicht zwingend. Wenn sie gerade stehen, im Biss sind und sich putzen lassen, können sie bleiben. Entfernt wird, wenn sie Schaden anrichten oder absehbar anrichten werden — das entscheidet die Lage im Kiefer, nicht das Alter." },
        { q: "Tut die Entfernung weh?", a: "Der Eingriff findet in örtlicher Betäubung statt; Sie spüren Druck, aber keinen Schmerz. Danach ist die Stelle einige Tage empfindlich — was Sie dagegen nehmen können, besprechen wir vorher." },
        { q: "Werden alle vier auf einmal entfernt?", a: "Das hängt von der Lage und von Ihnen ab. Manchmal ist eine Sitzung sinnvoll, manchmal zwei — dann ist immer eine Seite zum Kauen frei." },
        { q: "Wie lange bin ich danach ausgefallen?", a: "Rechnen Sie mit zwei bis drei Tagen, in denen Sie es ruhig angehen sollten. Planen Sie den Termin so, dass danach kein wichtiger Anlass steht." },
        { q: "Wie stark schwillt es an?", a: "Eine Schwellung ist normal und erreicht meist am zweiten Tag ihren Höhepunkt. Konsequentes Kühlen in den ersten Stunden hält sie klein." },
        { q: "Wann muss ich mich melden?", a: "Wenn Schmerz oder Schwellung nach dem dritten Tag zunehmen statt abzunehmen, bei Fieber oder bei einer Blutung, die nicht aufhört. Rufen Sie dann an." },
        { q: "Zahlt die Krankenkasse die Entfernung?", a: "Wenn die Entfernung medizinisch notwendig ist, ist sie eine Leistung der gesetzlichen Krankenkassen. Was in Ihrem Fall gilt, sagen wir Ihnen vor dem Eingriff." }
      ]
    };
  }
}
