import type { NextConfig } from "next";
import { seiten } from "./lib/seiten";

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

/*
  Content-Security-Policy ohne Nonces: Nonces würden jede Seite dynamisch
  machen (Next rendert sie dann pro Anfrage). So bleiben alle Seiten statisch.
  unsafe-inline ist für Skripte nötig, weil Next seine Daten inline einbettet,
  und für Stile, weil das Design Inline-Styles trägt. Alles andere ist eng:
  nur eigene Quellen, keine fremden Skripte, Frames nur OpenStreetMap (nach
  Klick, components/Karte), Formulare nur an uns, keine Einbettung bei anderen.
  Siehe node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
*/
const entwicklung = process.env.NODE_ENV === "development";
const inhaltsrichtlinie = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${entwicklung ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${entwicklung ? " ws:" : ""}`,
  "frame-src https://www.openstreetmap.org",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(entwicklung ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Verrät sonst in jeder Antwort das Framework (X-Powered-By: Next.js).
  poweredByHeader: false,
  // next dev hängt sonst bei jedem Start einen englischen Hinweisblock an
  // CLAUDE.md an. Derselbe Hinweis steht dort schon auf Deutsch.
  agentRules: false,

  images: {
    // AVIF zuerst (≈20 % kleiner als WebP), WebP als Rückfall. Hinter einem
    // eigenen Proxy/CDN muss der Accept-Header durchgereicht werden.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Bilder ändern sich selten; die optimierten Fassungen dürfen lange liegen.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async redirects() {
    // /<slug>.html → /<slug>. Die alten Adressen sind indexiert.
    const htmlVarianten = seiten
      .filter((s) => s.pfad !== "/")
      .map((s) => ({
        source: `${s.pfad}.html`,
        destination: s.pfad,
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
          { key: "Content-Security-Policy", value: inhaltsrichtlinie },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), hid=(), browsing-topics=(), interest-cohort=()",
          },
        ],
      },
      {
        // Bilder, Video, Karte: Dateinamen ändern sich bei neuem Inhalt nicht
        // zwingend – darum 30 Tage statt „immutable".
        source: "/uploads/:datei*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
