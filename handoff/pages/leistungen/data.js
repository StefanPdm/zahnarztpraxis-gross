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
      behandlungen: [
        { no: "01", title: "Prophylaxe & professionelle Zahnreinigung", text: "Reinigung, Fluoridierung und Anleitung zur Pflege zu Hause — mit Zahnseide, Interdentalbürste oder Munddusche, je nachdem, was zu Ihren Zwischenräumen passt. Den Kontrollrhythmus legen wir nach Ihrem Risiko fest, nicht nach Kalender." },
        { no: "02", title: "Weisheitszahn-Entfernung", text: "Oft ist im Kiefer nicht genug Platz: die Weisheitszähne wachsen schief, drücken auf Nachbarzähne und verursachen Schmerzen. Anhand von Untersuchung und Röntgenbild von Ober- und Unterkiefer bestimmen wir die Lage und planen den Eingriff entsprechend." },
        { no: "03", title: "Parodontologie", text: "Bakterieller Belag am Zahnfleischsaum verhärtet zu Zahnstein, das Zahnfleisch entzündet sich, blutet und es entstehen Taschen — unbehandelt baut der Kieferknochen ab. Wir reinigen die Taschen, unterstützen mit Laser und halten das Ergebnis über ein festes Recall-Programm." },
        { no: "04", title: "Schienentherapie bei Zähneknirschen", text: "Knirschen (Bruxismus) passiert meist nachts und unbewusst: die Kaumuskulatur verkrampft, Zahnsubstanz wird abgeschliffen, dazu kommen Spannungskopfschmerzen. Wir fertigen eine individuell angepasste Knirscherschiene für die Nacht." },
        { no: "05", title: "Laserbehandlung", text: "Wir setzen den Laser in der Parodontosebehandlung, zur Keimreduktion und bei der Fissurenversiegelung ein. Die Vorteile: weniger Wundschmerz, längere Schmerzfreiheit und geringere Anästhesiemengen." },
        { no: "06", title: "Angstpatienten", text: "Fünf bis zehn Prozent der Menschen meiden den Zahnarzt aus Angst — und riskieren damit ihre Zahngesundheit. Bei uns gibt es längere Termine, ein vereinbartes Handzeichen für Pausen, keine Behandlung ohne Ankündigung und auf Wunsch Musik oder einen Film über den Deckenmonitor." },
        { no: "07", title: "Kinderzahnheilkunde", text: "Damit Kinder gar keine Angst entwickeln: erst zeigen, dann erklären, dann behandeln. Hygienekontrollen, Putzanleitung, Fluoridierung und Fissurenversiegelung beugen früh vor — und auch Eltern sollten vor und während einer Schwangerschaft auf ihre Mundflora achten." },
        { no: "08", title: "Bleaching & ästhetische Korrekturen", text: "Aufhellung, zahnfarbene Füllungen und Veneers für die Frontzähne — dezent dosiert, damit das Ergebnis nicht auffällt, sondern passt." }
      ],
      ablauf: [
        { no: "01", title: "Beratung", text: "Befund, Röntgen wenn nötig, und eine Erklärung ohne Fachlatein." },
        { no: "02", title: "Planung", text: "Behandlungsplan mit Kostenaufstellung — inklusive der Alternativen." },
        { no: "03", title: "Ausführung", text: "In Etappen, die Sie mitbestimmen. Zahnersatz entsteht parallel im Labor." },
        { no: "04", title: "Nachsorge", text: "Kontrolle, Feinkorrektur und ein Recall-Intervall, das zu Ihren Zähnen passt — auf Wunsch erinnern wir Sie per E-Mail, SMS, Post oder Anruf." }
      ]
    };
  }
}
