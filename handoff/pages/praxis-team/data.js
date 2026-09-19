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
    const R = window.__resources || {};
    return {
      zahlen: [
        { value: "1991", label: "Familiengeführt in Potsdam" },
        { value: "5", label: "Behandlungszimmer mit Tageslicht" },
        { value: "1.200+", label: "Gesetzte Implantate" },
        { value: "1", label: "Eigenes Labor im Haus" }
      ],
      team: [
        {
          name: "Chantal Groß",
          role: "Zahnärztin",
          photo: R.portraitChantal || "uploads/portrait-chantal-gross.jpg",
          alt: "Porträt von Chantal Groß, Zahnärztin bei Groß & Groß in Potsdam",
          quote: "„Ich behandle viele Kinder und Menschen, die lange keinen Zahnarzt gesehen haben. Beide brauchen dasselbe: Ruhe und eine ehrliche Ansage.“",
          bio: "Nach dem Studium und der Assistenzzeit habe ich mich auf ästhetische und konservierende Zahnheilkunde spezialisiert — und darauf, Kinder zu behandeln, ohne sie zu überfahren. Regelmäßige Fortbildungen gehören für mich dazu, weil sich in der Zahnmedizin ständig etwas ändert.",
          personal: "Studium in Greifswald, Assistenzzeit in Berlin-Mitte. Curriculum Kinderzahnheilkunde und Parodontologie, jährlich rund 60 Fortbildungsstunden.",
          facts: [
            { label: "Studium", value: "Greifswald" },
            { label: "Schwerpunkt", value: "Kinder · Ästhetik" },
            { label: "Zertifikate", value: "Curriculum Paro (DG PARO)" }
          ],
          focus: "Ästhetische Zahnmedizin · Konservierende Zahnheilkunde · Kinderzahnheilkunde · Parodontologie"
        },
        {
          name: "Matthias Groß",
          role: "Zahnarzt",
          photo: R.portraitMatthias || "uploads/portrait-matthias-gross.jpg",
          alt: "Porträt von Matthias Groß, Zahnarzt und Implantologe bei Groß & Groß in Potsdam",
          quote: "„Beim Zahnersatz entscheidet der halbe Millimeter. Deshalb arbeite ich mit unserem eigenen Meisterlabor direkt in der Praxis.“",
          bio: "Mein Schwerpunkt liegt auf Implantologie und Prothetik, dazu chirurgische Eingriffe aus der MKG-Erfahrung. Weil unser Labor im Haus sitzt, kann ich Passung und Farbe direkt am Patienten prüfen, statt auf eine Lieferung zu warten.",
          personal: "Studium in Rostock, vier Jahre MKG-Chirurgie am Klinikum. Tätigkeitsschwerpunkt Implantologie, über 1.200 gesetzte Implantate.",
          facts: [
            { label: "Studium", value: "Rostock" },
            { label: "Schwerpunkt", value: "Implantologie · Prothetik" },
            { label: "Erfahrung", value: "1.200+ Implantate" }
          ],
          focus: "Implantologie · Prothetik · Chirurgie · Zahnersatz aus dem eigenen Labor"
        }
      ],
      personal: [
        { bereich: "Anmeldung", title: "Ihr erster Kontakt", text: "Terminvergabe, Rückfragen zu Kostenplänen und die Recall-Erinnerung per E-Mail, SMS, Post oder Anruf." },
        { bereich: "Prophylaxe", title: "Zahnreinigung und Vorsorge", text: "Professionelle Zahnreinigung, Fluoridierung, Fissurenversiegelung und die Anleitung zur Pflege zu Hause — für Erwachsene und Kinder." },
        { bereich: "Zahntechnik", title: "Das Labor im Haus", text: "Kronen, Brücken, Inlays, Veneers, Prothesen und Schienen entstehen hier. Die Zahnfarbe wird direkt am Behandlungsstuhl bestimmt." }
      ],
      historie: [
        { jahr: "1991", title: "Gründung", text: "Die Praxis nimmt in Potsdam ihre Arbeit auf und bleibt seither in Familienhand. (Gründungsdetails bitte ergänzen.)" },
        { jahr: "····", title: "Zweite Generation", text: "Chantal und Matthias Groß kommen in die Praxis und übernehmen sie später gemeinsam. (Jahre bitte ergänzen.)" },
        { jahr: "····", title: "Eigenes Zahnlabor", text: "Die Zahntechnik zieht in die Praxis — seither entstehen Kronen, Brücken und Prothesen im Haus. (Jahr bitte ergänzen.)" }
      ],
      zertifikate: [
        { title: "Tätigkeitsschwerpunkt Implantologie", wer: "Matthias Groß" },
        { title: "Curriculum Parodontologie (DG PARO)", wer: "Chantal Groß" },
        { title: "Curriculum Kinderzahnheilkunde", wer: "Chantal Groß" },
        { title: "Regelmäßige Fortbildung, rund 60 Stunden im Jahr", wer: "Beide" }
      ],
      raeume: [
        { src: R.raum1 || "uploads/zahnarzt-potsdam-praxis-gross-und-gross-1030x687-1.jpg", alt: "Behandlungszimmer mit Deckenmonitor und Röntgenbild am Bildschirm", no: "I", cap: "Deckenmonitor und Röntgenbild" },
        { src: R.raum2 || "uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-10-1.jpg", alt: "Behandlung mit Assistenz am Stuhl in der Zahnarztpraxis Groß & Groß", no: "II", cap: "Behandlung mit Assistenz" },
        { src: R.raum3 || "uploads/dr-zahnarzt-praxis-potsdam-gross-und-gross-1030x687.jpg", alt: "Zahnarzt bei der Untersuchung eines Patienten im Behandlungszimmer", no: "III", cap: "Untersuchung am Stuhl" },
        { src: R.raum4 || "uploads/Zahnarzt-Potsdam-Zahnarztpraxis-Gross-Gross-5-1-1030x687-1.jpg", alt: "Praxisflur mit beleuchtetem Groß-&-Groß-Logo an der Wand", no: "IV", cap: "Flur, hinter dem Empfang" },
        { src: R.raum5 || "uploads/Zahnlabor.jpg", alt: "Arbeitsplatz im praxiseigenen Zahnlabor", no: "V", cap: "Das Labor, eine Tür weiter" },
        { src: R.raum6 || "uploads/photos-1786974461824-wn8d.jpg", alt: "Behandlungszimmer mit Tageslicht in der Zahnarztpraxis Groß & Groß", no: "VI", cap: "Behandlungszimmer, Südlicht" }
      ],
      verweise: [
        { href: "Angstpatienten.dc.html", kicker: "Angstpatienten", title: "Erst reden, dann behandeln", text: "Handzeichen, Pausen und ein erster Termin ohne Behandlung." },
        { href: "Kinderzahnheilkunde.dc.html", kicker: "Kinder", title: "Erst zeigen, dann erklären", text: "Beim ersten Mal wird nur geschaut. Prophylaxe von Anfang an." },
        { href: "Moderne Technik.dc.html", kicker: "Technik", title: "Laser, CAD/CAM, Röntgen", text: "Was in unseren Räumen steht und was es für Sie ändert." }
      ]
    };
  }
}
