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
        { value: "1.200+", label: "Gesetzte Implantate" },
        { value: "DGI", label: "Tätigkeitsschwerpunkt Implantologie" },
        { value: "1", label: "Praxis für OP, Zahnersatz und Nachsorge" },
        { value: "1991", label: "Familiengeführt in Potsdam Mitte" }
      ],
      ablauf: [
        { no: "01", title: "Befund und Planung", text: "Untersuchung und Röntgen zeigen, wie viel Knochen vorhanden ist und wo das Implantat sitzen kann. Sie bekommen den Plan mit Alternativen und Kosten schriftlich." },
        { no: "02", title: "Implantation", text: "Der Eingriff findet in örtlicher Betäubung statt und dauert bei einem Einzelzahn meist unter einer Stunde. Danach setzen wir, wenn nötig, ein Provisorium ein." },
        { no: "03", title: "Einheilen und Zahnersatz", text: "Das Implantat wächst über einige Monate im Knochen fest. Danach entsteht der sichtbare Zahn im eigenen Labor — Farbe und Form direkt mit Ihnen abgestimmt." },
        { no: "04", title: "Nachsorge", text: "Implantate brauchen Pflege wie eigene Zähne. Wir kontrollieren regelmäßig und reinigen professionell, damit das Zahnfleisch rund um das Implantat gesund bleibt." }
      ],
      aufbau: [
        { no: "A", title: "Implantatkörper", text: "Aus Titan, wird im Kieferknochen verankert und übernimmt die Aufgabe der natürlichen Zahnwurzel." },
        { no: "B", title: "Aufbau", text: "Das Verbindungsstück zwischen Implantat und sichtbarem Zahn — es trägt die Krone, Brücke oder Prothese." },
        { no: "C", title: "Sichtbarer Zahn", text: "Krone, Brücke oder Prothese aus dem eigenen Labor, an Ihre Zahnfarbe angepasst." }
      ],
      faelle: [
        { title: "Ein fehlender Zahn", text: "Ein Einzelzahnimplantat mit Krone. Der große Vorteil gegenüber einer Brücke: die Nachbarzähne bleiben unangetastet und müssen nicht beschliffen werden." },
        { title: "Mehrere fehlende Zähne", text: "Mehrere Implantate tragen eine Brücke und schließen die Lücke, ohne dass gesunde Zähne als Pfeiler herhalten müssen." },
        { title: "Größere Lücken und lockerer Zahnersatz", text: "Implantatgetragener Zahnersatz gibt einer Prothese festen Halt — sie sitzt, ohne zu wackeln, und belastet den Kiefer gleichmäßiger." }
      ],
      faq: [
        { q: "Tut das Einsetzen weh?", a: "Der Eingriff findet in örtlicher Betäubung statt; Sie spüren Druck, aber keinen Schmerz. Danach kann die Stelle einige Tage empfindlich sein — was Sie dagegen nehmen können, besprechen wir vorher." },
        { q: "Wie lange dauert es, bis der neue Zahn fertig ist?", a: "Mit dem Einheilen im Knochen sind es in der Regel mehrere Monate. Für die Zeit dazwischen gibt es, wenn nötig, ein Provisorium — Sie laufen nicht mit einer Lücke herum." },
        { q: "Ist ein Implantat für mich überhaupt möglich?", a: "Das entscheidet vor allem der Knochen an der betreffenden Stelle. Wir prüfen das im Beratungstermin mit Untersuchung und Röntgenbild und sagen Ihnen offen, wenn eine andere Lösung sinnvoller ist." },
        { q: "Was kostet ein Implantat?", a: "Das hängt von der Zahl der Implantate und der Art des Zahnersatzes ab. Sie bekommen vor jeder Behandlung einen schriftlichen Kostenplan — auch mit der Alternative ohne Implantat, damit Sie vergleichen können." },
        { q: "Übernimmt die Krankenkasse etwas?", a: "Gesetzliche Kassen bezahlen in der Regel einen Festzuschuss für den Zahnersatz, nicht für das Implantat selbst. Was in Ihrem Fall gilt, steht im Kostenplan." },
        { q: "Wie lange hält ein Implantat?", a: "Bei guter Pflege und regelmäßiger Kontrolle viele Jahre. Entscheidend ist das Zahnfleisch rund um das Implantat — deshalb gehört die professionelle Reinigung zur Nachsorge dazu." }
      ]
    };
  }
}
