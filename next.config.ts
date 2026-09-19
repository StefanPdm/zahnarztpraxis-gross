import type { NextConfig } from "next";
import routen from "./lib/routes.json";

/*
  Weiterleitungen und Header, übernommen aus legacy/.htaccess.

  Die Kanonisierung auf www + HTTPS gehört zum Hoster, nicht hierher —
  sonst läuft sie durch die Node-Laufzeit und kostet bei jedem Aufruf.
  Bei Vercel: Domain-Einstellungen. Bei eigenem nginx: server-Block.
*/

const wordpressReste = [
  { source: "/wp-content/:pfad*", destination: "/", permanent: true },
  { source: "/wp-includes/:pfad*", destination: "/", permanent: true },
  { source: "/category/:pfad*", destination: "/", permanent: true },
  { source: "/tag/:pfad*", destination: "/", permanent: true },
  { source: "/author/:pfad*", destination: "/", permanent: true },
  { source: "/feed", destination: "/", permanent: true },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    // /<slug>.html → /<slug>. Die alten Adressen sind indexiert.
    const htmlVarianten = routen
      .filter((r) => r.route !== "/")
      .map((r) => ({
        source: `${r.route}.html`,
        destination: r.route,
        permanent: true,
      }));

    return [
      ...htmlVarianten,
      { source: "/index.html", destination: "/", permanent: true },
      // Einzige belegte Altadresse aus der WordPress-Zeit.
      {
        source: "/zahnbehandlung-zahnlabor-potsdam",
        destination: "/leistungen",
        permanent: true,
      },
      ...wordpressReste,
      /*
        ⚠ HIER FEHLT DIE VOLLSTÄNDIGE 301-LISTE.
        Die übrigen alten WordPress-Adressen sind nicht belegt und dürfen
        nicht geraten werden. Quellen: Google Search Console (Seiten →
        indexiert) und die alte wp-sitemap.xml. Jede alte URL ohne Regel
        verliert ihr Ranking. Siehe docs/legacy/.htaccess.
      */
    ];
  },

  async headers() {
    return [
      {
        source: "/:pfad*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
