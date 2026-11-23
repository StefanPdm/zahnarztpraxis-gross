/*
  Der Adventskranz in der Winter-Hero (lib/winterkapitel.ts), links neben
  dem Slogan.

  Gezeichnet wie der große Stern (components/HeroStern): feine Goldlinie,
  Tannengrün als Nadelstriche, ein paar goldene Beeren, vorn eine Schleife.
  Es brennen so viele Kerzen, wie Adventssonntage schon waren — wie im Kranz
  der Laufmarke und bei den Tafeln. Wie bei einem echten Kranz ist die Kerze,
  die am längsten brennt, die kürzeste.

  Flamme, Kern und Lichthof sind Verläufe im SVG und flackern jede in eigenem
  Takt (app/saison.css). Rein schmückend, darum aria-hidden. Server
  Component — kein Skript.
*/

// Kerzen in der Reihenfolge des Anzündens: x-Mitte, Fuß (y) und Höhe.
// Hinten stehen sie höher im Bild (Fuß weiter oben), vorn tiefer.
const KERZEN = [
  { x: 54, fuss: 106, hoehe: 40 },
  { x: 94, fuss: 90, hoehe: 46 },
  { x: 140, fuss: 90, hoehe: 52 },
  { x: 180, fuss: 106, hoehe: 58 },
];
const BREITE = 14;

// Nadelstriche entlang einer Ellipse — einmal auf dem Server berechnet.
const MITTE = { x: 116, y: 100 };
function nadeln(rx: number, ry: number, anzahl: number, laenge: number, versatz: number) {
  return Array.from({ length: anzahl }, (_, i) => {
    const w = (i / anzahl) * Math.PI * 2 + versatz;
    const x = MITTE.x + Math.cos(w) * rx;
    const y = MITTE.y + Math.sin(w) * ry;
    // Die Nadel zeigt schräg nach außen, leicht im Uhrzeigersinn gekippt.
    const aw = w + 0.9;
    const dx = Math.cos(aw) * laenge;
    const dy = Math.sin(aw) * laenge * 0.55;
    return { vorn: Math.sin(w) > 0.35, d: `M${x.toFixed(1)} ${y.toFixed(1)}l${dx.toFixed(1)} ${dy.toFixed(1)}` };
  });
}
const AUSSEN = nadeln(100, 24, 90, 13, 0);
const INNEN = nadeln(80, 16, 70, 11, 0.2);
const MITTEL = nadeln(90, 20, 80, 12, 0.1);
const zweige = (n: { vorn: boolean; d: string }[], vorn: boolean) =>
  n.filter((x) => x.vorn === vorn).map((x) => x.d).join(" ");
const BEEREN = [
  [30, 98], [64, 121], [150, 123], [194, 116], [210, 94], [76, 81], [160, 80], [118, 77],
];

// Tropfenförmige Flamme über dem Docht (Unterkante bei y).
const flamme = (x: number, y: number) =>
  `M${x} ${y} C${x - 5} ${y - 3} ${x - 3.4} ${y - 10} ${x} ${y - 17} C${x + 3.4} ${y - 10} ${x + 5} ${y - 3} ${x} ${y} Z`;

export default function HeroKranz({ brennen }: { brennen: number }) {
  return (
    <svg className="hero-kranz" viewBox="0 0 232 140" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hero-kranz-wachs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="hero-kranz__wachs-hell" />
          <stop offset="1" className="hero-kranz__wachs-dunkel" />
        </linearGradient>
        <radialGradient id="hero-kranz-flamme" cx="0.5" cy="0.78" r="0.62">
          <stop offset="0" className="hero-kranz__flamme-1" />
          <stop offset="0.45" className="hero-kranz__flamme-2" />
          <stop offset="1" className="hero-kranz__flamme-3" />
        </radialGradient>
        <radialGradient id="hero-kranz-schein">
          <stop offset="0" className="hero-kranz__schein-1" />
          <stop offset="1" className="hero-kranz__schein-2" />
        </radialGradient>
      </defs>

      {/* Lichthöfe zuerst — sie liegen hinter allem */}
      {KERZEN.slice(0, brennen).map((k, i) => (
        <circle
          key={`s${i}`}
          className={`hero-kranz__schein hero-kranz__takt-${i + 1}`}
          cx={k.x}
          cy={k.fuss - k.hoehe - 12}
          r="40"
          fill="url(#hero-kranz-schein)"
        />
      ))}

      {/* Hintere Hälfte des Kranzes */}
      <ellipse cx={MITTE.x} cy={MITTE.y} rx="96" ry="22" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <ellipse cx={MITTE.x} cy={MITTE.y} rx="80" ry="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d={zweige(AUSSEN, false)} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
      <path d={zweige(INNEN, false)} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d={zweige(MITTEL, false)} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />

      {/* Kerzen */}
      {KERZEN.map((k, i) => {
        const oben = k.fuss - k.hoehe;
        const l = k.x - BREITE / 2;
        const r = k.x + BREITE / 2;
        const wachs = `M${l} ${k.fuss} V${oben + 3} Q${l} ${oben} ${k.x} ${oben} Q${r} ${oben} ${r} ${oben + 3} V${k.fuss}`;
        return (
          <g key={`k${i}`}>
            {/* Deckend unterlegt, sonst schimmerte der Kranz durchs Wachs */}
            <path d={wachs} className="hero-kranz__wachs-grund" />
            <path
              d={wachs}
              fill="url(#hero-kranz-wachs)"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path d={`M${k.x} ${oben} q0.5 -3 0 -6`} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            {i < brennen && (
              <path
                d={`M${l + 3} ${oben + 1} v6 a1.5 1.5 0 0 0 3 0 v-5`}
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}

      {/* Vordere Hälfte, Beeren, Schleife */}
      <path d={zweige(AUSSEN, true)} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d={zweige(INNEN, true)} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <path d={zweige(MITTEL, true)} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      {BEEREN.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" className="hero-kranz__beere" />
      ))}
      <path
        d="M116 122 q-14 -9 -16 2 q2 9 16 -2 q14 -9 16 2 q-2 9 -16 -2 M116 122 l-8 14 M116 122 l8 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flammen */}
      {KERZEN.slice(0, brennen).map((k, i) => {
        const y = k.fuss - k.hoehe - 3;
        return (
          <g key={`f${i}`} className={`hero-kranz__flamme hero-kranz__takt-${i + 1}`}>
            <path d={flamme(k.x, y)} fill="url(#hero-kranz-flamme)" />
            <ellipse cx={k.x} cy={y - 3.5} rx="1.5" ry="3" className="hero-kranz__kern" />
          </g>
        );
      })}
    </svg>
  );
}
