import Link from "next/link";
import { WINTERBAND, type Winterkapitel } from "@/lib/winterkapitel";

/*
  Schmales dunkles Band unter der Kopfzeile, auf jeder Seite, solange das
  Winterkapitel läuft (lib/winterkapitel.ts). Führt zu „Die stille Zeit" auf
  der Startseite. Aussehen in app/saison.css.
*/
export default function Winterband({ winter }: { winter: Winterkapitel }) {
  const t = WINTERBAND[winter.phase];
  return (
    <div className="winterband">
      <span className="winterband__stern" aria-hidden="true" />
      <span className="winterband__marke">{t.marke}</span>
      <span className="winterband__trenner" aria-hidden="true" />
      <Link href="/#stille-zeit" className="winterband__link">
        {t.link}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
