import Image, { type ImageProps } from "next/image";
import bildmasse from "@/lib/bildmasse.json";

/*
  Bild — next/image mit Maßen aus lib/bildmasse.json.

  Liefert AVIF/WebP in der passenden Breite statt des Original-JPGs,
  reserviert den Platz vorab und lädt außerhalb des Bildschirms erst bei
  Bedarf. Klasse und Inline-Stil gehen unverändert an das <img> —
  site.css hängt an beidem.

  `sizes` sagt dem Browser, wie breit das Bild dargestellt wird. Der
  Standard passt für die häufigste Form: halbe Breite auf dem Desktop,
  volle Breite mobil. Vollbreite Bänder übergeben "100vw".

  Oberhalb der Falz (Aufmacherbild) `vorrang` setzen: sofort laden, hohe Priorität.
*/

const masse: Record<string, number[]> = bildmasse;

export const HALB = "(max-width: 1000px) 100vw, 50vw";
export const VOLL = "100vw";

type Eigenschaften = Omit<ImageProps, "src" | "width" | "height" | "priority" | "preload"> & {
  src: string;
  vorrang?: boolean;
};

export default function Bild({ src, alt, sizes = HALB, vorrang = false, ...rest }: Eigenschaften) {
  const m = masse[src];
  if (!m) {
    throw new Error(`Bild: keine Maße für ${src}. Liegt die Datei in public/images? Dann \`npm run bilder\`.`);
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={m[0]}
      height={m[1]}
      sizes={sizes}
      {...(vorrang ? { loading: "eager", fetchPriority: "high" } : {})}
      {...rest}
    />
  );
}
