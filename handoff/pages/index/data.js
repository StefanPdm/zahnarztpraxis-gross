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
  state = { fear: 5, reason: null };
  pickReason(r) {
    this.setState({ reason: r.value });
    const sel = document.getElementById("b-anliegen");
    if (sel) sel.value = r.option;
    const t = document.getElementById("1b-termin");
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
  }
  renderVals() {
    const p = this.props;
    const tiers = [
      { min: 1, max: 3, label: "Routine", icon: "M20 6L9 17l-5-5", text: "Dann halten wir es kurz: Kontrolle, Reinigung, klare Ansage — und ein Recall-Intervall, das zu Ihren Zähnen passt statt zum Kalender." },
      { min: 4, max: 7, label: "Mit Ansage", icon: "M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z", text: "Wir erklären jeden Schritt, bevor er kommt, und legen Pausen ein, wenn Sie es brauchen. Betäubung besprechen wir vorher, nicht erst am Stuhl." },
      { min: 8, max: 10, label: "Ohne Behandlung beginnen", icon: "M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z", text: "Erster Termin: nur Gespräch, wenn Sie möchten ohne Blick in den Mund. Danach vereinbaren wir ein Handzeichen, blocken einen längeren Termin und stellen Musik oder einen Film über den Deckenmonitor ein." }
    ];
    const fear = this.state.fear;
    const reasonDefs = [
      { label: "Kontrolle", value: "kontrolle", option: "Kontrolle & Prophylaxe" },
      { label: "Schmerzen", value: "schmerzen", option: "Schmerzen / akutes Problem" },
      { label: "Beratung", value: "beratung", option: "Ästhetische Beratung (Veneers, Bleaching)" }
    ];
    const active = reasonDefs.find(r => r.value === this.state.reason) || null;
    return {
      fear,
      onFear: (e) => this.setState({ fear: +e.target.value }),
      fearTier: tiers.find(t => fear >= t.min && fear <= t.max) || tiers[1],
      ctaHref: active ? "Termin.dc.html?anliegen=" + encodeURIComponent(active.value) : "Termin.dc.html",
      reasons: reasonDefs.map(r => ({
        label: r.label,
        bg: r.value === this.state.reason ? "var(--color-accent-100)" : "transparent",
        fg: r.value === this.state.reason ? "var(--color-accent-800)" : "var(--color-text)",
        bc: r.value === this.state.reason ? "var(--color-accent)" : "var(--color-divider)",
        onClick: () => this.pickReason(r)
      })),
      showReviews: p.showReviews ?? true,
      proof: [
        { value: "5", to: 5, decimals: 0, suffix: "", label: "Behandlungszimmer" },
        { value: "1991", to: 1991, decimals: 0, suffix: "", label: "Familiengeführt in Potsdam" },
        { value: "1.200", to: 1200, decimals: 0, suffix: "", label: "Gesetzte Implantate" },
        { value: "24", to: 24, decimals: 0, suffix: " h", label: "Bis zur Antwort" }
      ],
      services: [
        { no: "01", title: "Prophylaxe", text: "Professionelle Reinigung und Kontrolle im Rhythmus, der zu Ihren Zähnen passt.", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.2 3 6.3 5 4 7.7 4c1.5 0 2.6.6 4.3.6S14.8 4 16.3 4C19 4 21 6.3 21 9.2c0 2.8-1.5 4.8-3.4 4.8-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z" },
        { no: "02", title: "Ästhetische Zahnmedizin", text: "Veneers, Bleaching und Füllungen, die man nicht sieht.", icon: "M12 3l1.9 4.9L19 9.8l-4.4 3.2 1.4 5.2L12 15.4 8 18.2l1.4-5.2L5 9.8l5.1-.9L12 3z" },
        { no: "03", title: "Implantologie", text: "Planung, Setzen und Versorgung des Implantats aus einer Hand.", icon: "M9 3h6M9 6h6M10 9h4M12 9v11M10.5 13h3M10.5 16.5h3" },
        { no: "04", title: "Prothetik", text: "Kronen, Brücken und Zahnersatz — gefertigt im eigenen Labor.", icon: "M3 17l2-9 4 4 3-6 3 6 4-4 2 9H3z" },
        { no: "05", title: "Weisheitszähne & MKG", text: "Chirurgische Eingriffe mit eigener Erfahrung aus der MKG-Chirurgie.", icon: "M14 4l6 6-9.5 9.5H4v-6.5L14 4zM11.5 6.5l6 6" },
        { no: "06", title: "Kinderzahnheilkunde", text: "Erst zeigen, dann erklären, dann behandeln — im Tempo des Kindes.", icon: "M12 21a8 8 0 100-16 8 8 0 000 16zM9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8" },
        { no: "07", title: "Angstpatienten", text: "Längere Termine, Pausen auf Zeichen, jeder Schritt vorher angekündigt.", icon: "M12 20.5s-7.3-4.6-7.3-9.8A4.6 4.6 0 0112 8.2a4.6 4.6 0 017.3 2.5c0 5.2-7.3 9.8-7.3 9.8z" },
        { no: "08", title: "Parodontologie", text: "Behandlung von Zahnfleischentzündungen, Schienentherapie und Laser.", icon: "M4 15c2-1 3-3 3-6M20 15c-2-1-3-3-3-6M4 15c0 3 3.6 5 8 5s8-2 8-5M8 9h8" }
      ],
      team: [
        {
          name: "Chantal Groß",
          role: "Zahnärztin",
          photo: (window.__resources && window.__resources.portraitChantal) || "uploads/portrait-chantal-gross.jpg",
          personal: "Studium in Greifswald, Assistenzzeit in Berlin-Mitte. Curriculum Kinderzahnheilkunde und Parodontologie, jährlich rund 60 Fortbildungsstunden.",
          facts: [
            { label: "Studium", value: "Greifswald" },
            { label: "Schwerpunkt", value: "Kinder & Prophylaxe" },
            { label: "Zertifikate", value: "Curriculum Paro (DG PARO)" }
          ],
          quote: "„Ich behandle viele Kinder und Menschen, die lange keinen Zahnarzt gesehen haben. Beide brauchen dasselbe: Ruhe und eine ehrliche Ansage.\u201c",
          focus: "Ästhetische Zahnmedizin · Konservierende Zahnheilkunde · Kinderzahnheilkunde · Parodontologie",
          bio: "Nach dem Studium und der Assistenzzeit habe ich mich auf ästhetische und konservierende Zahnheilkunde spezialisiert — und darauf, Kinder zu behandeln, ohne sie zu überfahren. Regelmäßige Fortbildungen in Parodontologie und Kinderzahnheilkunde gehören für mich zum Beruf, nicht zur Kür."
        },
        {
          name: "Matthias Groß",
          role: "Zahnarzt",
          photo: (window.__resources && window.__resources.portraitMatthias) || "uploads/portrait-matthias-gross.jpg",
          personal: "Studium in Rostock, vier Jahre MKG-Chirurgie am Klinikum. Tätigkeitsschwerpunkt Implantologie, über 1.200 gesetzte Implantate.",
          facts: [
            { label: "Studium", value: "Rostock" },
            { label: "Schwerpunkt", value: "Implantologie & Prothetik" },
            { label: "Zertifikate", value: "Tätigkeitsschwerpunkt Implantologie (DGI)" }
          ],
          quote: "„Beim Zahnersatz entscheidet der halbe Millimeter. Deshalb arbeite ich mit unserem eigenen Meisterlabor direkt in der Praxis.\u201c",
          focus: "Implantologie · Prothetik · Chirurgie",
          bio: "Mein Schwerpunkt liegt auf Implantologie und Prothetik, dazu chirurgische Eingriffe aus der MKG-Erfahrung. Weil unser Labor im Haus sitzt, kann ich Passung und Farbe direkt am Patienten prüfen — das ist der Grund, warum ich diese Praxis so aufgebaut habe."
        }
      ],
      behandlungen: [
        { no: "01", title: "Prophylaxe & Zahnreinigung", text: "Professionelle Reinigung, Fluoridierung und ein Kontrollrhythmus, der zu Ihrem Risiko passt — nicht zum Kalender." },
        { no: "02", title: "Füllungen & Zahnerhalt", text: "Zahnfarbene Komposit-Füllungen und Keramik-Inlays unter Lupenbrille, um den eigenen Zahn so lange wie möglich zu erhalten." },
        { no: "03", title: "Parodontologie", text: "Behandlung von Zahnfleischentzündung und Knochenabbau, unterstützt durch Laser und ein festes Recall-Programm." },
        { no: "04", title: "Weisheitszähne & Chirurgie", text: "Entfernung von Weisheitszähnen und kleinere chirurgische Eingriffe mit Erfahrung aus der MKG-Chirurgie." },
        { no: "05", title: "Kinderbehandlung", text: "Erst zeigen, dann erklären, dann behandeln. Der erste Termin ist bei uns oft nur ein Kennenlernen." },
        { no: "06", title: "Angstpatienten", text: "Längere Termine, ein vereinbartes Handzeichen für Pausen und keine Behandlung ohne Ankündigung." },
        { no: "07", title: "Schienentherapie", text: "Knirscher- und Aufbissschienen gegen Verspannungen, Kopfschmerzen und abgeriebene Zahnflächen." },
        { no: "08", title: "Bleaching & Ästhetik", text: "Aufhellung und ästhetische Korrekturen — dezent dosiert, damit das Ergebnis nicht auffällt, sondern passt." }
      ],
      labor: [
        { no: "01", title: "Zahnkronen", text: "Vollkeramik-Kronen, Farbe direkt am Stuhl abgestimmt." },
        { no: "02", title: "Inlays", text: "Passgenaue Einlagefüllungen statt großflächiger Füllungen." },
        { no: "03", title: "Veneers", text: "Dünne Keramikschalen für Form und Farbe der Frontzähne." },
        { no: "04", title: "Implantate", text: "Planung, Setzen und Versorgung aus einer Hand." },
        { no: "05", title: "Brücken & Prothetik", text: "Fester und herausnehmbarer Zahnersatz, im Haus gefertigt." },
        { no: "06", title: "Reparatur & Recall", text: "Kurze Wege bei Reparaturen — meist am selben Tag." }
      ],
      angst: [
        { no: "01", text: "Längere Termine, damit niemand das Gefühl hat, im Takt abgearbeitet zu werden.", icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2" },
        { no: "02", text: "Ein vereinbartes Handzeichen — bei dem wir sofort aufhören, nicht „gleich“.", icon: "M9 11V5.5a1.5 1.5 0 013 0V11m0-1.5a1.5 1.5 0 013 0V12m0-1a1.5 1.5 0 013 0v4.5A5.5 5.5 0 0112.5 21H11a5 5 0 01-4.2-2.3L4.4 15a1.6 1.6 0 012.4-2l2.2 2" },
        { no: "03", text: "Jeder Schritt wird vorher angekündigt und erklärt, auch der unangenehme.", icon: "M20 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h12a2 2 0 012 2z" },
        { no: "04", text: "Musik oder ein Film über den Deckenmonitor, wenn Ablenkung hilft.", icon: "M9 18V6l10-2v12M9 18a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19 16a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }
      ],
      ablauf: [
        { no: "01", title: "Anfrage", text: "Sie senden zwei Wunschzeiten und Ihr Anliegen. Wir bestätigen innerhalb von 24 Stunden.", icon: "M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" },
        { no: "02", title: "Erstgespräch", text: "Befund, Röntgen wenn nötig, und eine Erklärung ohne Fachlatein — inklusive Kostenplan.", icon: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4" },
        { no: "03", title: "Behandlung", text: "In Etappen, die Sie mitbestimmen. Zahnersatz entsteht parallel im eigenen Labor.", icon: "M12 22c-1.6 0-2-3.4-2.6-5.3C8.8 14.6 7.6 14 6.4 14 4.5 14 3 12 3 9.2 3 6.3 5 4 7.7 4c1.5 0 2.6.6 4.3.6S14.8 4 16.3 4C19 4 21 6.3 21 9.2c0 2.8-1.5 4.8-3.4 4.8-1.2 0-2.4.6-3 2.7C14 18.6 13.6 22 12 22z" },
        { no: "04", title: "Nachsorge", text: "Kontrolle, Feinkorrektur und ein Recall-Intervall, das zu Ihren Zähnen passt.", icon: "M21 12a9 9 0 11-3.2-6.9M21 3v5h-5" }
      ],
      reviews: [
        { quote: "„Mir wurde vorher genau erklärt, was gemacht wird — das nimmt einem die halbe Angst.\u201c", who: "Platzhalter · Google" },
        { quote: "„Krone in derselben Woche fertig, weil das Labor im Haus ist. Sehr angenehm.\u201c", who: "Platzhalter · Google" },
        { quote: "„Termin am Telefon in zwei Minuten, keine Wartezeit im Wartezimmer.\u201c", who: "Platzhalter · Google" }
      ],
      hours: [
        { day: "Montag – Dienstag", time: "08:00 – 13:00 · 14:00 – 17:30" },
        { day: "Mittwoch", time: "08:00 – 13:00" },
        { day: "Donnerstag", time: "08:00 – 12:00" },
        { day: "Freitag", time: "08:00 – 12:00" }
      ]
    };
  }
}
