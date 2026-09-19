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
      schritte: [
        { no: "01", title: "Befund", text: "Wir schauen zuerst, wo Belag sitzt, wo das Zahnfleisch reagiert und wo Sie beim Putzen nicht hinkommen." },
        { no: "02", title: "Beläge entfernen", text: "Harter Zahnstein und weicher Belag werden entfernt — auch unterhalb des Zahnfleischsaums und in den Zwischenräumen." },
        { no: "03", title: "Politur", text: "Die Zahnoberflächen werden geglättet. Auf glatten Flächen setzt sich neuer Belag deutlich langsamer ab." },
        { no: "04", title: "Fluoridierung", text: "Zum Abschluss wird der Zahnschmelz gehärtet und damit widerstandsfähiger gegen Säure." },
        { no: "05", title: "Anleitung", text: "Sie erfahren, welche Hilfsmittel zu Ihren Zwischenräumen passen — und probieren sie einmal selbst aus." }
      ],
      rhythmus: [
        { fall: "Stabile Verhältnisse, kein Zahnstein", takt: "1× pro Jahr" },
        { fall: "Normalfall bei gesundem Zahnfleisch", takt: "2× pro Jahr" },
        { fall: "Zahnfleischtaschen, starke Zahnsteinbildung", takt: "3–4× pro Jahr" },
        { fall: "Nach Parodontitis-Behandlung, Implantate", takt: "Nach Recall-Plan" }
      ],
      nutzen: [
        { title: "Karies", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z", text: "Belag in den Zwischenräumen ist die häufigste Ursache. Was regelmäßig entfernt wird, kann keinen Schaden anrichten." },
        { title: "Zahnfleischentzündung", icon: "M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z", text: "Blutendes Zahnfleisch ist ein Warnzeichen. Wird der Reiz früh entfernt, beruhigt es sich wieder — unbehandelt entstehen Taschen." },
        { title: "Zahnverlust im Alter", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", text: "Die meisten Zähne gehen nicht durch Karies verloren, sondern durch Knochenabbau bei Parodontitis. Die Prophylaxe ist die wirksamste Vorsorge dagegen." }
      ],
      faq: [
        { q: "Tut die Zahnreinigung weh?", a: "In der Regel nicht. Bei empfindlichen Zahnhälsen oder entzündetem Zahnfleisch kann es unangenehm werden — sagen Sie es uns, dann arbeiten wir vorsichtiger oder betäuben die Stelle." },
        { q: "Wie lange dauert der Termin?", a: "Rechnen Sie mit etwa einer Stunde. Wie viel Zeit Ihr Fall braucht, hängt davon ab, wie viel Belag und Zahnstein sich gebildet hat." },
        { q: "Zahlt die Krankenkasse die professionelle Zahnreinigung?", a: "Gesetzliche Kassen übernehmen sie meist nicht oder nur mit einem Zuschuss; viele erstatten sie inzwischen teilweise. Fragen Sie bei Ihrer Kasse nach — wir sagen Ihnen vorher, was der Termin kostet." },
        { q: "Werden die Zähne dabei weißer?", a: "Sie werden sauber, und dadurch oft eine Nuance heller, weil Verfärbungen von Kaffee, Tee oder Rauch verschwinden. Die eigene Zahnfarbe verändert sich dabei nicht — dafür wäre ein Bleaching nötig." },
        { q: "Wie oft sollte ich zur Reinigung?", a: "Das hängt von Ihrem Risiko ab, nicht vom Kalender. Bei gesundem Zahnfleisch genügen meist zwei Termine im Jahr, bei Zahnfleischtaschen oder starker Zahnsteinbildung sind es mehr." },
        { q: "Ich war jahrelang nicht beim Zahnarzt. Ist das jetzt schlimm?", a: "Nein, und wir kommentieren es nicht. Wir fangen dort an, wo es für Sie machbar ist — bei Bedarf in mehreren kürzeren Terminen." }
      ]
    };
  }
}
