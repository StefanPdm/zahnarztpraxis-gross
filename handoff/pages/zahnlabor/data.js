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
      proof: [
        { value: "Im Haus", label: "Zahntechniker in der Praxis" },
        { value: "Vor Ort", label: "Zahnfarbe am Behandlungsstuhl" },
        { value: "CAD/CAM", label: "Kronen im 3D-Verfahren" },
        { value: "1991", label: "Familiengeführt in Potsdam Mitte" }
      ],
      vorteile: [
        { no: "01", title: "Kurze Wege", text: "Kein Postweg, kein Fremdlabor, keine Wartezeit dazwischen. Ihr Zahnersatz entsteht in demselben Haus, in dem er eingesetzt wird." },
        { no: "02", title: "Zahnfarbe direkt vor Ort", text: "Der Techniker bestimmt die Farbe an Ihrem Zahn, im gleichen Licht — nicht nach einer Notiz und einem Farbschlüssel-Code auf dem Auftragszettel." },
        { no: "03", title: "Korrekturen ohne Umwege", text: "Sitzt eine Krone einen Hauch zu hoch, wird sie angepasst, während Sie da sind. Sonst wären dafür ein weiterer Termin und eine Woche Wartezeit fällig." },
        { no: "04", title: "Direkte Abstimmung", text: "Zahnärztin und Zahntechniker sprechen über Ihren Fall, nicht über ein Formular. Bei aufwendigen Versorgungen ist das der Unterschied zwischen passend und wirklich passend." }
      ],
      arbeiten: [
        { title: "Kronen", text: "Vollkeramik oder Cerkon, im 3D-Verfahren mit CAD/CAM gefertigt und an Ihre Zahnfarbe angepasst." },
        { title: "Brücken", text: "Festsitzender Ersatz für Lücken, passgenau an Pfeilerzähne und Zahnfleischform gearbeitet." },
        { title: "Inlays", text: "Keramik-Inlays nach Präzisionsabdruck — die ästhetische Alternative zur alten Amalgamfüllung." },
        { title: "Veneers", text: "Dünne Verblendungen für die Frontzähne, wenn Form oder Farbe verbessert werden sollen." },
        { title: "Prothesen", text: "Von der Interimsprothese bis zur endgültigen Versorgung, inklusive Anpassungen und Reparaturen." },
        { title: "Implantatgetragener Zahnersatz", text: "Kronen, Brücken und Prothesen auf Implantaten — geplant zusammen mit der Implantation." },
        { title: "Schienen", text: "Knirscherschienen bei Bruxismus, individuell angepasst und im Haus nachgearbeitet." },
        { title: "Provisorien", text: "Mittels Tiefziehschienen gefertigt, damit Sie in der Zwischenzeit nicht mit einer Lücke leben müssen." }
      ],
      faq: [
        { q: "Merke ich als Patient überhaupt einen Unterschied?", a: "Vor allem bei Terminen und Korrekturen. Anpassungen passieren oft im laufenden Termin statt in einer zweiten Sitzung Wochen später — und bei der Farbe stimmt das Ergebnis häufiger auf Anhieb." },
        { q: "Wird mein Zahnersatz wirklich hier gefertigt?", a: "Ja, das Labor ist Teil der Praxis. Sie können sich die Arbeitsschritte zeigen lassen, wenn Sie möchten." },
        { q: "Wie lange dauert eine Krone?", a: "Das hängt vom Fall ab. Wichtiger ist: die Zwischenzeit überbrücken wir mit einem Provisorium, und für Anpassungen brauchen wir keine Versandwoche." },
        { q: "Kann ich mir Materialien vorher ansehen?", a: "Im Beratungstermin zeigen wir Ihnen Muster und erklären die Unterschiede zwischen den Materialien — auch preislich, im schriftlichen Kostenplan." },
        { q: "Was kostet Zahnersatz aus dem eigenen Labor?", a: "Sie erhalten vor jeder Behandlung einen Kostenplan mit dem Kassenzuschuss und Ihrem Eigenanteil. Wenn es eine günstigere Alternative gibt, steht sie mit darin." }
      ]
    };
  }
}
