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
  state = { fear: 8 };
  renderVals() {
    const tiers = [
      { min: 1, max: 3, label: "Routine", icon: "M20 6L9 17l-5-5", text: "Dann halten wir es kurz: Kontrolle, Reinigung, klare Ansage — und ein Recall-Intervall, das zu Ihren Zähnen passt statt zum Kalender." },
      { min: 4, max: 7, label: "Mit Ansage", icon: "M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z", text: "Wir erklären jeden Schritt, bevor er kommt, und legen Pausen ein, wenn Sie es brauchen. Betäubung besprechen wir vorher, nicht erst am Stuhl." },
      { min: 8, max: 10, label: "Ohne Behandlung beginnen", icon: "M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z", text: "Erster Termin: nur Gespräch, wenn Sie möchten ohne Blick in den Mund. Danach vereinbaren wir ein Handzeichen, blocken einen längeren Termin und stellen Musik oder einen Film über den Monitor ein." }
    ];
    const fear = this.state.fear;
    return {
      fear,
      onFear: (e) => this.setState({ fear: +e.target.value }),
      fearTier: tiers.find(t => fear >= t.min && fear <= t.max) || tiers[1],
      zusagen: [
        { no: "01", title: "Erster Termin nur zum Kennenlernen", text: "Auf Wunsch ohne jede Behandlung. Sie sehen die Praxis, wir hören zu, und Sie entscheiden danach, ob und wann es weitergeht." },
        { no: "02", title: "Kein Rechtfertigen", text: "Wir fragen nicht, warum Sie so lange nicht da waren, und kommentieren den Zustand Ihrer Zähne nicht. Wir schauen nach vorn." },
        { no: "03", title: "Jeder Schritt wird vorher erklärt", text: "Was wir tun, warum, wie lange es dauert und was Sie dabei spüren — bevor es passiert, nicht währenddessen." },
        { no: "04", title: "Ein vereinbartes Handzeichen", text: "Hand heben heißt: sofort unterbrechen. Wir halten uns daran, ohne Diskussion und ohne „nur noch schnell“." },
        { no: "05", title: "Pausen, so oft Sie wollen", text: "Kurz durchatmen, aufsetzen, Mund ausspülen. Eine Pause ist kein Abbruch und kostet Sie keinen Termin." },
        { no: "06", title: "Behandlung in Etappen", text: "Große Vorhaben teilen wir in mehrere kurze Termine auf. Sie bestimmen das Tempo, wir planen die Reihenfolge medizinisch sinnvoll." },
        { no: "07", title: "Ablenkung am Behandlungsstuhl", text: "Monitor am Platz: Sie können Musik oder einen Film mitbringen und während der Behandlung hören oder ansehen." }
      ],
      etappen: [
        { no: "01", title: "Gespräch", text: "Nur reden. Sie sagen, was geht und was nicht. Wenn Sie möchten, schauen wir kurz nach — mehr passiert an diesem Tag nicht." },
        { no: "02", title: "Plan", text: "Befund, Reihenfolge und Kosten schriftlich. Wir fangen mit dem an, was am dringendsten ist, oder mit dem, was Ihnen am leichtesten fällt." },
        { no: "03", title: "Termine", text: "So kurz und so viele, wie Sie brauchen. Nach jedem Termin wissen Sie, was beim nächsten Mal ansteht." }
      ],
      faq: [
        { q: "Kann ich zuerst nur zum Gespräch kommen?", a: "Ja. Sagen Sie bei der Anfrage, dass Sie ein Erstgespräch möchten — dann ist der Termin ein Gespräch und keine Behandlung." },
        { q: "Muss ich erklären, warum ich lange nicht beim Zahnarzt war?", a: "Nein. Das ist für die Behandlung nicht wichtig und wir fragen nicht danach." },
        { q: "Was passiert, wenn ich mitten in der Behandlung nicht mehr kann?", a: "Sie heben die Hand — das Zeichen legen wir vorher fest — und wir unterbrechen sofort. Danach entscheiden Sie, ob wir weitermachen, pausieren oder aufhören." },
        { q: "Kann eine größere Behandlung auf mehrere Termine verteilt werden?", a: "Ja. Wir teilen sie in kürzere Etappen auf und besprechen vorher, was an welchem Termin dran ist." },
        { q: "Darf ich Musik oder einen Film mitbringen?", a: "Gern. An den Behandlungsplätzen gibt es Monitore; Musik oder Film laufen während der Behandlung." },
        { q: "Wie sage ich Ihnen vorab, dass ich Angst habe?", a: "Bei der Online-Terminanfrage wählen Sie „Angstpatient/in“ aus, oder sagen es am Telefon. Wir planen dann mehr Zeit ein." }
      ]
    };
  }
}
