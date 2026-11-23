import { LEITSTERN_ZIEL } from "@/lib/winterkapitel";

/*
  Landeplatz des Leitsterns (components/Leitstern) über dem Terminformular.
  Zunächst gedämpft; kommt das Formular ins Bild, setzt der Leitstern die
  Klasse .ist-angekommen, und der Stern leuchtet auf. Ohne Skript bleibt er
  einfach als ruhiger Stern mit seinem Satz stehen.
*/
export default function LeitsternZiel() {
  return (
    <div id="leitstern-ziel" className="leitstern-ziel">
      <span className="leitstern-ziel__stern" aria-hidden="true" />
      <span className="leitstern-ziel__text">{LEITSTERN_ZIEL}</span>
    </div>
  );
}
