/*
  Der Stern unter dem Slogan im Winterkapitel (lib/winterkapitel.ts): eine
  feine Linie, die sich zeichnet wie die Bahn einer Fräse in der
  CAD/CAM-Software, kurz leuchtet, verblasst und von vorn beginnt. Ein
  kleinerer Stern über Eck folgt ihr versetzt, der Mittelpunkt pulsiert.
  Bewegung in app/saison.css; ohne Bewegung steht er still und ganz da.
*/
export default function HeroStern() {
  return (
    <svg className="hero-stern" viewBox="0 0 64 64" width="58" height="58" aria-hidden="true">
      <path
        className="hero-stern__bahn"
        pathLength={1}
        d="M32 3 C33.6 21 39 30.4 61 32 C39 33.6 33.6 43 32 61 C30.4 43 25 33.6 3 32 C25 30.4 30.4 21 32 3 Z"
      />
      <path
        className="hero-stern__innen"
        pathLength={1}
        d="M22 22 C28 27.5 36 27.5 42 22 C36.5 28 36.5 36 42 42 C36 36.5 28 36.5 22 42 C27.5 36 27.5 28 22 22 Z"
      />
      <circle className="hero-stern__punkt" cx="32" cy="32" r="1.8" />
    </svg>
  );
}
