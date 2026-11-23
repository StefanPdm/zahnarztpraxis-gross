import type { MetadataRoute } from "next";
import { praxis } from "@/lib/praxis";
import { winterkapitel } from "@/lib/winterkapitel";

/**
 * Alle Suchmaschinen und KI-Crawler (GPTBot, ClaudeBot, PerplexityBot …)
 * sind ausdrücklich willkommen — die Praxis will gefunden und korrekt
 * zitiert werden. Nur der Formular-Endpunkt ist tabu.
 * Kompakte Fakten für Sprachmodelle: /llms.txt
 */
export default function robots(): MetadataRoute.Robots {
  // Testschalter "an" (etwa per Umgebungsvariable auf einer Vorschau): alles zu.
  if (winterkapitel()?.alles) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${praxis.domain}/sitemap.xml`,
    host: praxis.domain,
  };
}
