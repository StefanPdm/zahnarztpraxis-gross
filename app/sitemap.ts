import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { seiten } from "@/lib/seiten";
import { praxis } from "@/lib/praxis";

/**
 * Sitemap aus lib/seiten.ts. Das Änderungsdatum ist der letzte Git-Commit
 * der jeweiligen Seite — nicht „heute bei jedem Build", das werten
 * Suchmaschinen als unzuverlässig und ignorieren es dann ganz.
 * Ohne Git (z. B. flacher Klon beim Hoster) fällt es auf das Build-Datum zurück.
 */
function geaendert(pfad: string): Date {
  const datei = pfad === "/" ? "app/page.tsx" : `app${pfad}/page.tsx`;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", datei], { encoding: "utf8" }).trim();
    if (iso) return new Date(iso);
  } catch {
    // kein Git verfügbar
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return seiten.map((s) => ({
    url: `${praxis.domain}${s.pfad === "/" ? "" : s.pfad}`,
    lastModified: geaendert(s.pfad),
    changeFrequency: s.pfad === "/" ? "weekly" : "monthly",
    priority: s.pfad === "/" ? 1 : s.rubrik === "Rechtliches" ? 0.3 : 0.7,
  }));
}
