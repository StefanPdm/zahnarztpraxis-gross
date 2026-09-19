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
      wege: [
        { title: "Veneers", icon: "M4 6h16v5a8 8 0 01-8 8 8 8 0 01-8-8V6z", text: "Dünne Keramikschalen werden auf die Frontzähne geklebt und korrigieren Form und Farbe. Sie entstehen in unserem eigenen Labor und werden an Ihre Nachbarzähne angeglichen.", fit: "Bei Form, Farbe und kleinen Kanten" },
        { title: "Bleaching", icon: "M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z", text: "Die professionelle Aufhellung hellt eigene Zähne um mehrere Nuancen auf. Kronen und Füllungen bleiben, wie sie sind — deshalb klären wir vorher, ob am Ende alles zusammenpasst.", fit: "Bei nachgedunkelten eigenen Zähnen" },
        { title: "Keramik-Inlays", icon: "M4 7h16M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M9 11h6", text: "Passgenaue Einlagefüllungen aus Keramik nach Präzisionsabdruck, in Form, Kontur und Zahnfarbe angepasst. Die Klebetechnik gibt schwacher Restsubstanz ihre Festigkeit zurück.", fit: "Als Ersatz alter Amalgamfüllungen" },
        { title: "Vollkeramikkronen", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z", text: "Aus Vollkeramik oder Cerkon, im 3D-Verfahren mit CAD/CAM gefertigt. Metallfrei und in der Zahnfarbe so abgestimmt, dass man den überkronten Zahn nicht vom eigenen unterscheidet.", fit: "Wenn keine Füllung mehr hält" }
      ],
      faq: [
        { q: "Sieht man, dass etwas gemacht wurde?", a: "Wenn wir es richtig machen, nicht. Deshalb arbeiten wir mit natürlichen Farben und geben der Form ihre Unregelmäßigkeiten — eine völlig gleichmäßige, sehr weiße Reihe verrät sich sofort." },
        { q: "Wie lange hält ein Veneer?", a: "Bei guter Pflege viele Jahre. Entscheidend sind gesundes Zahnfleisch, regelmäßige Kontrolle und, falls Sie nachts knirschen, eine Schiene — sonst leidet die Keramik." },
        { q: "Wird Ästhetik von der Kasse bezahlt?", a: "In der Regel nicht, weil sie medizinisch nicht notwendig ist. Sie bekommen vorher einen schriftlichen Kostenplan; wo es eine Kassenvariante gibt, steht sie zum Vergleich daneben." },
        { q: "Bleaching oder Veneers — was ist besser?", a: "Das hängt davon ab, was stört. Sind die eigenen Zähne gesund und nur nachgedunkelt, reicht meist das Bleaching. Geht es um Form, Kanten oder einzelne auffällige Zähne, führt Bleaching nicht weiter." },
        { q: "Werden meine Zähne dafür beschliffen?", a: "Für Veneers und Kronen ja, in unterschiedlichem Maß — bei Veneers nur minimal an der Vorderfläche. Wir erklären Ihnen vorher genau, was an Substanz abgetragen wird, denn das ist nicht umkehrbar." },
        { q: "Kann ich mir das Ergebnis vorher ansehen?", a: "Farbmuster und Materialien zeigen wir Ihnen im Beratungstermin in der Hand. Bei größeren Frontzahnarbeiten besprechen wir Form und Farbe zusammen mit dem Zahntechniker, der hier im Haus arbeitet." }
      ]
    };
  }
}
