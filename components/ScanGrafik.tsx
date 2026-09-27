/*
  Ein Backenzahn wird gescannt — die Grafik zu „Gut zu wissen: abdruckfrei
  und volldigital" auf der Startseite.

  Zwei Lagen derselben Zahnform: darunter gestrichelt (analog), darüber als
  Punktemodell mit durchgezogener Kontur (digital). Eine Scanlinie fährt von
  oben nach unten und deckt die digitale Lage dabei auf, dann Pause und von
  vorn. Bewegung und Aufdecken stehen in bausteine.css (`.scangrafik`), damit
  beide dieselbe Dauer und Kurve haben.

  Rein schmückend: Der Text daneben sagt dasselbe. Deshalb aria-hidden und
  kein Alt-Text. Keine Client-Komponente — nur SVG und CSS.
*/

// Krone mit zwei Wurzeln, mittig bei x = 160. Die Zeichenfläche (viewBox)
// reicht von x 40 bis 280: gerade breit genug für die Scanlinie (60 bis 260).
const ZAHN =
  "M90 60C90 35 120 25 140 38C150 44 170 44 180 38C200 25 230 35 230 60" +
  "C230 90 222 110 215 130C208 150 205 185 195 215C190 230 176 230 173 212" +
  "C169 190 168 165 160 165C152 165 151 190 147 212C144 230 130 230 125 215" +
  "C115 185 112 150 105 130C98 110 90 90 90 60Z";

export default function ScanGrafik() {
  return (
    <svg
      className='scangrafik'
      viewBox='40 0 240 250'
      aria-hidden='true'
      focusable='false'>
      <defs>
        <clipPath id='scangrafik-zahn'>
          <path d={ZAHN} />
        </clipPath>
        <pattern
          id='scangrafik-punkte'
          width='9'
          height='9'
          patternUnits='userSpaceOnUse'>
          <circle
            cx='4.5'
            cy='4.5'
            r='1.25'
          />
        </pattern>
        <linearGradient
          id='scangrafik-schein'
          x1='0'
          y1='0'
          x2='0'
          y2='1'>
          <stop
            offset='0'
            className='scangrafik__schein-rand'
          />
          <stop
            offset='0.5'
            className='scangrafik__schein-mitte'
          />
          <stop
            offset='1'
            className='scangrafik__schein-rand'
          />
        </linearGradient>
      </defs>

      {/* analog: gestrichelte Kontur */}
      <path
        className='scangrafik__analog'
        d={ZAHN}
      />

      {/* digital: Punktemodell und Kontur, wird von der Scanlinie aufgedeckt */}
      <g className='scangrafik__digital'>
        <rect
          className='scangrafik__punkte'
          x='80'
          y='20'
          width='160'
          height='215'
          clipPath='url(#scangrafik-zahn)'
        />
        <path
          className='scangrafik__kontur'
          d={ZAHN}
        />
      </g>

      {/* Scanlinie mit weichem Schein. Sie fährt über genau die Höhe der
          digitalen Lage (y 20 bis 235: das Punkte-Rechteck), damit Linie und
          Aufdecken in bausteine.css deckungsgleich laufen. */}
      <g className='scangrafik__linie'>
        <rect
          x='60'
          y='8'
          width='200'
          height='24'
          fill='url(#scangrafik-schein)'
        />
        <line
          x1='60'
          y1='20'
          x2='260'
          y2='20'
        />
      </g>
    </svg>
  );
}
