import Link from "next/link";
import { praxis } from "@/lib/praxis";

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
    </div>
  );
}
