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
      laser: [
        { title: "Parodontosebehandlung", text: "Der Laser erreicht die entzündeten Zahnfleischtaschen, ohne sie mechanisch aufzuarbeiten." },
        { title: "Keimreduktion", text: "Bakterien werden gezielt reduziert — die Wunde heilt ruhiger und die Schmerzfreiheit hält länger an." },
        { title: "Fissurenversiegelung", text: "Vor allem bei Kindern: die feinen Rillen der Backenzähne werden schonend versiegelt." }
      ],
      digital: [
        { no: "01", title: "Modell einscannen", text: "Das Modell Ihres Kiefers wird digital erfasst. Daraus entsteht am Rechner ein exaktes dreidimensionales Abbild." },
        { no: "02", title: "Am Rechner konstruieren", text: "Krone, Brücke oder Inlay werden auf dem digitalen Modell konstruiert — Passung und Kontaktpunkte lassen sich vorher prüfen." },
        { no: "03", title: "CAD/CAM fertigen", text: "Vollkeramik und Cerkon entstehen im 3D-Verfahren, an Ihre Zahnfarbe angepasst — ohne Gipsversand ans Fremdlabor." }
      ],
      faq: [
        { q: "Tut die Laserbehandlung weh?", a: "Sie ist in der Regel schonender als das klassische Vorgehen. Der Vorteil liegt vor allem danach: weniger Wundschmerz und eine längere Schmerzfreiheit." },
        { q: "Brauche ich beim Laser überhaupt eine Spritze?", a: "Oft genügt weniger Betäubungsmittel als sonst. Ob und wie viel nötig ist, entscheiden wir zusammen mit Ihnen — je nach Eingriff und Ihrer Empfindlichkeit." },
        { q: "Was heißt CAD/CAM für mich als Patient?", a: "Ihr Zahnersatz wird am Rechner konstruiert und im 3D-Verfahren gefertigt, hier im Haus. Das macht die Passung genauer und spart die Wartezeit, die der Versand an ein Fremdlabor kostet." },
        { q: "Wie oft wird geröntgt?", a: "Nur, wenn ein Bild eine Behandlungsentscheidung trägt — etwa bei Weisheitszähnen, vor einem Implantat oder bei tiefer Entzündung. Wir sagen Ihnen vorher, warum." },
        { q: "Kann ich mir die Geräte ansehen?", a: "Ja. Fragen Sie im Termin danach — wir zeigen Ihnen, was bei Ihnen zum Einsatz kommt, und erklären, was es tut." }
      ]
    };
  }
}
