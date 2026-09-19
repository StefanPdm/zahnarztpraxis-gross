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
      weg: [
        { no: "01", title: "Schopenhauerstraße 37", text: "Die gelbe Fassade mit den hohen Sprossenfenstern ist die Straßenseite. Hier stehen Sie richtig — aber noch nicht am Eingang." },
        { no: "02", title: "Links am Gebäude vorbei", text: "Gehen Sie links am Gebäude vorbei nach hinten. Hinter dem Haus öffnet sich ein gepflasterter Hof." },
        { no: "03", title: "Gläserne Tür in der Mitte", text: "Auf der Rückseite führt eine gläserne Doppeltür ins Haus. Von dort erreichen Sie unsere Anmeldung." }
      ],
      faq: [
        { q: "Wo genau ist der Eingang?", a: "Auf der Rückseite des Gebäudes, nicht an der Schopenhauerstraße. Gehen Sie links am Gebäude vorbei nach hinten in den Hof — dort ist eine gläserne Doppeltür." },
        { q: "Kann ich direkt an der Praxis parken?", a: "An der Hofseite gibt es Kurzzeit-Parkplätze. Sind sie belegt, finden Sie weitere Stellplätze in der Zeppelinstraße, wenige Gehminuten entfernt." },
        { q: "Wie komme ich mit öffentlichen Verkehrsmitteln?", a: "Mit den Tramlinien 91, 94 und 98 bis Luisenplatz-Süd oder den Buslinien 605, 606 und 695 bis Luisenplatz. Von dort sind es etwa vier Minuten zu Fuß." },
        { q: "Ist die Praxis barrierefrei?", a: "Ja, die Praxis liegt im Erdgeschoss und ist barrierefrei erreichbar. Sagen Sie bei der Terminvereinbarung kurz Bescheid, wenn Sie Unterstützung beim Zugang möchten." },
        { q: "Mein Navi führt mich an die Straßenseite — was jetzt?", a: "Das ist normal, die Adresse liegt an der Straße. Stellen Sie das Auto ab und gehen Sie links am Gebäude vorbei nach hinten in den Hof; dort ist der Eingang." }
      ]
    };
  }
}
