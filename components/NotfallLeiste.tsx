import Link from "next/link";
import { praxis, schliesstage, sprechzeiten } from "@/lib/praxis";
import OffenStatus from "@/components/OffenStatus";

/** Hinweis auf Notfalltermine unter dem Kopf — auf allen Seiten außer /zahnschmerzen. */
export default function NotfallLeiste() {
  return (
    <div className="notfallleiste">
      <span className="notfallleiste__marke">Akute Zahnschmerzen?</span>
      <span className="notfallleiste__strich" />
      <span>
        Rufen Sie uns morgens ab 8:00 an — Montag bis Freitag halten wir{" "}
        <Link href="/zahnschmerzen">Notfalltermine</Link> frei.
      </span>
      <a href={praxis.telefonHref} className="notfallleiste__telefon">
        {praxis.telefon}
      </a>
      <OffenStatus plan={sprechzeiten} schliesstage={schliesstage} kurz />
    </div>
  );
}
