import type { MetadataRoute } from "next";
import { praxis } from "@/lib/navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${praxis.domain}/sitemap.xml`,
  };
}
