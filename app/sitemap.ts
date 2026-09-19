import type { MetadataRoute } from "next";
import routen from "@/lib/routes.json";
import { praxis } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return routen.map((r) => ({
    url: `${praxis.domain}${r.route}`,
    lastModified: new Date(),
    changeFrequency: r.route === "/" ? "weekly" : "monthly",
    priority: r.route === "/" ? 1 : 0.7,
  }));
}
