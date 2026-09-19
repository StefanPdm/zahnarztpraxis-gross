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
      regel: [
        { no: "1", title: "Zeigen", icon: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 9a3 3 0 100 6 3 3 0 000-6z", text: "Spiegel, Licht, Stuhl, Sauger: alles darf angeschaut und angefasst werden, bevor es benutzt wird." },
        { no: "2", title: "Erklären", icon: "M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z", text: "In Worten, die ein Kind versteht — ohne Fachbegriffe und ohne Sätze, die harmloser klingen sollen, als sie sind." },
        { no: "3", title: "Behandeln", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.5 3 6.5 5.2 4 8.2 4c1.4 0 2.6.5 3.8.5S14.4 4 15.8 4C18.8 4 21 6.5 21 9.5c0 2.5-1.5 4.5-3.4 4.5-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z", text: "Erst wenn klar ist, was passiert. Und mit dem Recht, jederzeit die Hand zu heben und Pause zu machen." }
      ],
      prophylaxe: [
        { title: "Regelmäßige Hygienekontrolle", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11", text: "Zwei Kontrollen im Jahr genügen meistens, um kleine Stellen zu finden, solange sie noch klein sind." },
        { title: "Putzanleitung, die haftet", icon: "M12 20h9M3 20l4-1 9.5-9.5a2.1 2.1 0 00-3-3L4 16l-1 4z", text: "Wir zeigen dem Kind selbst, wo die Bürste hinkommt — nicht nur den Eltern. Das hält länger als jeder Vortrag." },
        { title: "Fluoridierung", icon: "M12 3s5 5.5 5 9.5a5 5 0 01-10 0C7 8.5 12 3 12 3z", text: "Härtet den Zahnschmelz und macht ihn widerstandsfähiger gegen Säure. Schnell, schmerzfrei, ohne Bohrer." },
        { title: "Fissurenversiegelung", icon: "M4 7h16M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7M9 11h6", text: "Die feinen Rillen der Backenzähne werden verschlossen, bevor sich dort Bakterien einnisten können." }
      ],
      faq: [
        { q: "Ab welchem Alter soll mein Kind zum Zahnarzt?", a: "Sobald die ersten Zähne da sind, spätestens im Rahmen der Vorsorgeuntersuchungen. Beim ersten Besuch geht es ohnehin nur ums Kennenlernen — je früher der stattfindet, desto normaler ist der Zahnarzt für Ihr Kind." },
        { q: "Was passiert beim ersten Termin?", a: "Ihr Kind darf den Behandlungsstuhl ausprobieren, das Licht anschauen und den Spiegel halten. Wir zählen die Zähne, wenn es möchte. Behandelt wird an diesem Tag nichts." },
        { q: "Darf ich als Elternteil dabeibleiben?", a: "Ja, so lange Sie und Ihr Kind es möchten. Manche Kinder sind ohne Publikum mutiger — das merken wir gemeinsam." },
        { q: "Was ist, wenn mein Kind nicht mitmacht?", a: "Dann machen wir Schluss und probieren es beim nächsten Termin wieder. Niemand wird überredet oder festgehalten; ein abgebrochener Termin ist besser als ein schlechtes erstes Erlebnis." },
        { q: "Was kostet die Prophylaxe für Kinder?", a: "Die zahnärztlichen Vorsorgeuntersuchungen und die Individualprophylaxe für Kinder und Jugendliche sind Leistungen der gesetzlichen Krankenkassen. Was darüber hinausgeht, sagen wir Ihnen vorher." },
        { q: "Kann ich Kariesbakterien auf mein Kind übertragen?", a: "Ja, das ist möglich — über gemeinsam benutzte Löffel oder den abgeleckten Schnuller. Deshalb lohnt es sich, gerade vor und während einer Schwangerschaft die eigene Mundgesundheit im Blick zu haben." }
      ]
    };
  }
}
