import type { MetadataRoute } from "next";
import { praxis } from "@/lib/praxis";

/**
 * Alle Suchmaschinen und KI-Crawler (GPTBot, ClaudeBot, PerplexityBot …)
 * sind ausdrücklich willkommen — die Praxis will gefunden und korrekt
 * zitiert werden. Nur der Formular-Endpunkt ist tabu.
 * Kompakte Fakten für Sprachmodelle: /llms.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${praxis.domain}/sitemap.xml`,
    host: praxis.domain,
  };
}
