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
      zeiten: [
        { tag: "Mo, Di", zeit: "8:00–13:00 und 14:00–17:30" },
        { tag: "Mi", zeit: "8:00–13:00" },
        { tag: "Do, Fr", zeit: "8:00–12:00" },
        { tag: "Notfälle", zeit: "Morgens ab 8:00 anrufen" }
      ],
      hilft: [
        { title: "Kühlen — von außen", text: "Ein feuchtes, kühles Tuch auf die Wange, mehrmals für einige Minuten. Nicht direkt mit Eis, das reizt die Haut." },
        { title: "Aufrecht bleiben", text: "Im Liegen steigt der Druck im Kopf und der Schmerz nimmt zu. Nachts hilft ein höheres Kopfkissen." },
        { title: "Mit lauwarmem Wasser spülen", text: "Vorsichtig ausspülen, wenn Essensreste in einem Loch oder einer Zahnlücke stecken. Nicht mit hohem Druck." },
        { title: "Schmerzmittel nach Packungsangabe", text: "Ein Mittel, das Sie kennen und verträgt, in der angegebenen Dosis. Sagen Sie uns im Termin, was und wann Sie es genommen haben." }
      ],
      nicht: [
        { title: "Wärme auflegen", text: "Wärmflasche oder Rotlicht können eine Entzündung verstärken und die Schwellung größer machen." },
        { title: "Aspirin bei Blutungen oder vor einem Eingriff", text: "Acetylsalicylsäure hemmt die Blutgerinnung. Bei blutender Wunde oder anstehender Behandlung besser ein anderes Mittel." },
        { title: "Alkohol oder Hausmittel in die Wunde", text: "Hochprozentiges, Nelkenöl direkt aufs Zahnfleisch oder eine Aspirintablette auf den Zahn legen — alles davon verätzt das Gewebe." },
        { title: "Abwarten, bis es von allein aufhört", text: "Wenn der Schmerz nachlässt, ohne dass etwas passiert ist, kann der Nerv abgestorben sein. Die Entzündung läuft dann still weiter." }
      ],
      ursachen: [
        { dringend: "Sofort anrufen", schmerz: "Pochender Dauerschmerz, Schwellung, Fieber", text: "Deutliche Zeichen einer Entzündung, die sich ausbreitet. Hier zählt der gleiche Tag." },
        { dringend: "Sofort anrufen", schmerz: "Zahn abgebrochen oder ausgeschlagen", text: "Bruchstück oder Zahn feucht aufbewahren, am besten in Milch oder Kochsalzlösung, und mitbringen." },
        { dringend: "Heute", schmerz: "Anhaltender Schmerz nach Süßem, Kaltem oder Heißem", text: "Häufig eine tiefe Karies oder ein gereizter Zahnnerv. Wird schnell schlimmer, wenn man wartet." },
        { dringend: "Bald", schmerz: "Kurzes Ziehen bei Kälte, das gleich vorbei ist", text: "Oft freiliegende Zahnhälse oder eine kleine undichte Stelle an einer Füllung. Kein Notfall, aber ein Termin." },
        { dringend: "Bald", schmerz: "Druckgefühl und blutendes Zahnfleisch", text: "Meist eine Zahnfleischentzündung. Wichtig ist, dass daraus keine Parodontitis wird." }
      ],
      ablauf: [
        { no: "01", title: "Schmerz einordnen", text: "Kurzes Gespräch, Untersuchung und, wenn nötig, ein Röntgenbild. Wir sagen Ihnen, was wir sehen und was jetzt ansteht." },
        { no: "02", title: "Schmerz nehmen", text: "In örtlicher Betäubung behandeln wir die Ursache oder verschaffen zunächst Erleichterung, wenn die endgültige Versorgung mehr Zeit braucht." },
        { no: "03", title: "Weiteres besprechen", text: "Erst wenn Sie schmerzfrei sind, reden wir über den Rest — schriftlicher Plan, Alternativen, Kosten. Entscheiden müssen Sie nicht an diesem Tag." }
      ],
      faq: [
        { q: "Ich bin kein Patient bei Ihnen. Kann ich trotzdem kommen?", a: "Ja. Rufen Sie an und sagen Sie, dass Sie akute Schmerzen haben — wir versuchen, Sie noch am gleichen Tag unterzubringen." },
        { q: "Wann rufe ich am besten an?", a: "Morgens ab 8:00. Dann ist der Tag noch nicht verplant und die Chance auf einen Termin am selben Tag am größten." },
        { q: "Was mache ich am Wochenende oder nachts?", a: "Dann hilft die Notdienstsuche der Kassenzahnärztlichen Vereinigung Land Brandenburg unter kzvlb.de. Bei Atemnot, starker Schwellung oder Kreislaufproblemen rufen Sie den Rettungsdienst unter 112." },
        { q: "Der Schmerz ist über Nacht verschwunden. Muss ich noch kommen?", a: "Ja. Wenn Schmerz plötzlich aufhört, ohne dass behandelt wurde, kann der Nerv abgestorben sein — die Entzündung läuft dann ohne Warnsignal weiter." },
        { q: "Mir ist ein Stück Zahn abgebrochen. Was tun?", a: "Bruchstück feucht aufbewahren, am besten in Milch oder Kochsalzlösung, und zum Termin mitbringen. Rufen Sie gleich an, auch wenn es nicht wehtut." },
        { q: "Wird beim Schmerztermin gleich alles gemacht?", a: "Nein. Zuerst geht es darum, dass Sie schmerzfrei sind. Was darüber hinaus nötig ist, besprechen wir danach in Ruhe und mit schriftlichem Kostenplan." }
      ]
    };
  }
}
