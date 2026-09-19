#!/usr/bin/env node
/**
 * konvertiere-seiten.mjs — erzeugt aus dem Übergabepaket die Seiten-Komponenten.
 *
 *   node scripts/konvertiere-seiten.mjs handoff app
 *
 * Nimmt je Route `markup.html`, `data.js`, `head.json` und `jsonld.json` und
 * schreibt `app/<route>/page.tsx`. Die Umsetzung ist bewusst mechanisch: das
 * Markup ist abgenommenes Design, es wird übersetzt, nicht umgestaltet.
 *
 * Was übersetzt wird
 *   class=            → className=
 *   for=              → htmlFor=
 *   stroke-width= …   → strokeWidth= (kebab → camelCase, außer data-/aria-)
 *   style="a:b; c:d"  → style={{ a: "b", c: "d" }}  — Werte unverändert
 *   {{ x }}           → {x}
 *   {{ $index }}      → der Index der umgebenden Schleife
 *   <sc-for list as>  → {liste.map((eintrag, i) => …)}
 *   <sc-if value>     → {wert ? … : null}
 *   hint-*            → entfällt
 *   uploads/…         → /uploads/…
 *   Seite.dc.html     → echte Route, als <Link> aus next/link
 *   äußerer Wrapper   → entfällt (steht in app/layout.tsx)
 *
 * Was NICHT übersetzt wird und von Hand nachgezogen werden muss:
 *   this.state / setState, Handler, alles Interaktive. Betroffene Seiten
 *   werden am Ende gemeldet.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const [, , paketArg, zielArg] = process.argv;
const paket = paketArg ?? "handoff";
const ziel = zielArg ?? "app";

/* ------------------------------------------------------------------ */
/* Routen                                                              */
/* ------------------------------------------------------------------ */

const routen = JSON.parse(readFileSync(join(paket, "routes.json"), "utf8"));

/** Ordnername im Paket → Route. Reihenfolge wie in routes.json. */
const ordnerZuRoute = {
  index: "/",
  "praxis-team": "/praxis-team",
  angstpatienten: "/angstpatienten",
  kinderzahnheilkunde: "/kinderzahnheilkunde",
  leistungen: "/leistungen",
  zahnschmerzen: "/zahnschmerzen",
  prophylaxe: "/prophylaxe",
  parodontologie: "/parodontologie",
  "weisheitszaehne-chirurgie": "/weisheitszaehne-chirurgie",
  implantologie: "/implantologie",
  "aesthetische-zahnmedizin": "/aesthetische-zahnmedizin",
  zahnlabor: "/zahnlabor",
  "moderne-technik": "/moderne-technik",
  "anfahrt-parken": "/anfahrt-parken",
  kontakt: "/kontakt",
  termin: "/termin",
  "impressum-datenschutz": "/impressum-datenschutz",
};

/** Alter Dateiname im Design → neue Route. */
const dateiZuRoute = {
  "Zahnarztpraxis Groß.dc.html": "/",
  "Praxis & Team.dc.html": "/praxis-team",
  "Angstpatienten.dc.html": "/angstpatienten",
  "Kinderzahnheilkunde.dc.html": "/kinderzahnheilkunde",
  "Leistungen.dc.html": "/leistungen",
  "Zahnschmerzen.dc.html": "/zahnschmerzen",
  "Prophylaxe.dc.html": "/prophylaxe",
  "Parodontologie.dc.html": "/parodontologie",
  "Weisheitszähne & Chirurgie.dc.html": "/weisheitszaehne-chirurgie",
  "Implantologie.dc.html": "/implantologie",
  "Ästhetische Zahnmedizin.dc.html": "/aesthetische-zahnmedizin",
  "Zahnlabor.dc.html": "/zahnlabor",
  "Moderne Technik.dc.html": "/moderne-technik",
  "Anfahrt & Parken.dc.html": "/anfahrt-parken",
  "Kontakt.dc.html": "/kontakt",
  "Termin.dc.html": "/termin",
  "Impressum & Datenschutz.dc.html": "/impressum-datenschutz",
};

function entschaerfeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, "\u00a0");
}

/** "Praxis &amp; Team.dc.html#team" → "/praxis-team#team" */
function loeseLink(href) {
  const roh = entschaerfeEntities(href);
  const [datei, anker] = roh.split("#");
  const [pfad, query] = datei.split("?");
  const route = dateiZuRoute[pfad];
  if (!route) return null;
  return route + (query ? `?${query}` : "") + (anker ? `#${anker}` : "");
}

/* ------------------------------------------------------------------ */
/* HTML einlesen                                                       */
/* ------------------------------------------------------------------ */

const LEERE_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function zerlege(html) {
  const knoten = [];
  const stapel = [{ kinder: knoten }];
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s/>"']+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
  let pos = 0;
  let treffer;

  const text = (roh) => {
    if (!roh) return;
    stapel[stapel.length - 1].kinder.push({ art: "text", wert: roh });
  };

  while ((treffer = re.exec(html)) !== null) {
    text(html.slice(pos, treffer.index));
    pos = re.lastIndex;

    if (treffer[0].startsWith("<!--")) continue;

    if (treffer[1]) {
      // Schließendes Tag
      for (let i = stapel.length - 1; i > 0; i--) {
        if (stapel[i].tag === treffer[1].toLowerCase()) {
          stapel.length = i;
          break;
        }
      }
      continue;
    }

    const tag = treffer[2].toLowerCase();
    const element = {
      art: "element",
      tag,
      attribute: leseAttribute(treffer[3] ?? ""),
      kinder: [],
    };
    stapel[stapel.length - 1].kinder.push(element);
    if (!treffer[4] && !LEERE_TAGS.has(tag)) stapel.push(element);
  }
  text(html.slice(pos));
  return knoten;
}

function leseAttribute(roh) {
  const attribute = [];
  const re = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let t;
  while ((t = re.exec(roh)) !== null) {
    if (!t[1]) continue;
    attribute.push({ name: t[1], wert: t[2] ?? t[3] ?? t[4] ?? null });
  }
  return attribute;
}

/* ------------------------------------------------------------------ */
/* Nach JSX schreiben                                                  */
/* ------------------------------------------------------------------ */

const ATTRIBUT_NAMEN = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  colspan: "colSpan",
  rowspan: "rowSpan",
  contenteditable: "contentEditable",
  srcset: "srcSet",
  novalidate: "noValidate",
  enctype: "encType",
  playsinline: "playsInline",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  usemap: "useMap",
  accesskey: "accessKey",
  inputmode: "inputMode",
};

const BOOLESCH = new Set([
  "disabled", "checked", "selected", "readonly", "required", "autofocus",
  "multiple", "controls", "loop", "muted", "autoplay", "playsinline",
  "novalidate", "hidden", "open", "default", "reversed", "async", "defer",
]);

function jsxAttributName(name) {
  const klein = name.toLowerCase();
  if (ATTRIBUT_NAMEN[klein]) return ATTRIBUT_NAMEN[klein];
  if (klein.startsWith("data-") || klein.startsWith("aria-")) return klein;
  if (klein === "viewbox") return "viewBox";
  if (klein === "preserveaspectratio") return "preserveAspectRatio";
  if (klein === "xmlns") return "xmlns";
  // kebab-case → camelCase (SVG: stroke-width, fill-rule, stop-color …)
  return klein.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/** CSS-Eigenschaft → React-Schlüssel. Eigene Variablen bleiben unverändert. */
function styleSchluessel(prop) {
  const p = prop.trim();
  if (p.startsWith("--")) return `"${p}"`;
  const camel = p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return /^[a-zA-Z][a-zA-Z0-9]*$/.test(camel) ? camel : `"${p}"`;
}

/** style="a:b; c:d" → { a: "b", c: "d" } — Werte bleiben wortgleich. */
function styleObjekt(roh, indexName) {
  const teile = [];
  let tiefe = 0;
  let aktuell = "";
  for (const z of roh) {
    if (z === "(") tiefe++;
    if (z === ")") tiefe--;
    if (z === ";" && tiefe === 0) {
      teile.push(aktuell);
      aktuell = "";
    } else {
      aktuell += z;
    }
  }
  teile.push(aktuell);

  const eintraege = [];
  for (const teil of teile) {
    const t = teil.trim();
    if (!t) continue;
    const i = t.indexOf(":");
    if (i < 0) continue;
    const prop = t.slice(0, i);
    const wert = t.slice(i + 1).trim();
    eintraege.push(
      `${styleSchluessel(prop)}: ${attributWert(entschaerfeEntities(wert), indexName)
        .replace(/^\{/, "")
        .replace(/\}$/, "")}`,
    );
  }
  return `{ ${eintraege.join(", ")} }`;
}

const PLATZHALTER = /\{\{\s*([^}]+?)\s*\}\}/g;

function ausdruck(roh, indexName) {
  const t = roh.trim();
  if (t === "$index") return indexName ?? "i";
  return t.replace(/\$index/g, indexName ?? "i");
}

/** Text mit {{ … }} → JSX-Kinder. */
function textNachJsx(roh, indexName) {
  if (!PLATZHALTER.test(roh)) {
    PLATZHALTER.lastIndex = 0;
    return escapeText(roh);
  }
  PLATZHALTER.lastIndex = 0;
  return roh.replace(PLATZHALTER, (_, inhalt) => `{${ausdruck(inhalt, indexName)}}`);
}

function escapeText(roh) {
  return roh.replace(/[{}]/g, (z) => `{"${z}"}`);
}

/** Attributwert mit {{ … }} → JSX-Attributwert. */
function attributWert(roh, indexName) {
  PLATZHALTER.lastIndex = 0;
  const treffer = [...roh.matchAll(PLATZHALTER)];
  if (treffer.length === 0) return JSON.stringify(entschaerfeEntities(roh));
  if (treffer.length === 1 && treffer[0][0] === roh) {
    return `{${ausdruck(treffer[0][1], indexName)}}`;
  }
  const template = roh.replace(PLATZHALTER, (_, inhalt) => `\${${ausdruck(inhalt, indexName)}}`);
  return `{\`${template.replace(/`/g, "\\`")}\`}`;
}

const zustand = { brauchtLink: false, offenePunkte: [] };

function knotenNachJsx(knoten, einzug, indexName) {
  const e = "  ".repeat(einzug);

  if (knoten.art === "text") {
    const roh = knoten.wert;
    if (!roh.trim()) return "";
    return e + textNachJsx(roh.trim(), indexName) + "\n";
  }

  if (knoten.tag === "sc-for") {
    const liste = knoten.attribute.find((a) => a.name === "list")?.wert ?? "";
    const as = knoten.attribute.find((a) => a.name === "as")?.wert ?? "item";
    const quelle = ausdruck(liste.replace(PLATZHALTER, "$1"), indexName);
    const idx = `${as}I`;
    const kinder = knoten.kinder
      .map((k) => knotenNachJsx(k, einzug + 2, idx))
      .join("");
    return (
      `${e}{${quelle}.map((${as}, ${idx}) => (\n` +
      `${e}  <Fragment key={${idx}}>\n${kinder}${e}  </Fragment>\n` +
      `${e}))}\n`
    );
  }

  if (knoten.tag === "sc-if") {
    const wert = knoten.attribute.find((a) => a.name === "value")?.wert ?? "";
    const bedingung = ausdruck(wert.replace(PLATZHALTER, "$1"), indexName);
    const kinder = knoten.kinder
      .map((k) => knotenNachJsx(k, einzug + 2, indexName))
      .join("");
    return `${e}{${bedingung} ? (\n${e}  <>\n${kinder}${e}  </>\n${e}) : null}\n`;
  }

  // Gewöhnliches Element
  let tag = knoten.tag;
  const attribute = [];
  let istLink = false;

  for (const attr of knoten.attribute) {
    const name = attr.name.toLowerCase();
    if (name.startsWith("hint-")) continue;

    if (name === "style" && attr.wert !== null) {
      attribute.push(`style={${styleObjekt(attr.wert, indexName)}}`);
      continue;
    }

    if (name === "href" && attr.wert !== null) {
      const route = loeseLink(attr.wert);
      if (route) {
        istLink = true;
        attribute.push(`href=${JSON.stringify(route)}`);
        continue;
      }
    }

    if ((name === "src" || name === "poster") && attr.wert !== null) {
      const wert = attr.wert.startsWith("uploads/") ? `/${attr.wert}` : attr.wert;
      attribute.push(`${jsxAttributName(name)}=${attributWert(wert, indexName)}`);
      continue;
    }

    if (attr.wert === null) {
      attribute.push(BOOLESCH.has(name) ? `${jsxAttributName(name)}` : `${jsxAttributName(name)}=""`);
      continue;
    }

    attribute.push(`${jsxAttributName(name)}=${attributWert(attr.wert, indexName)}`);
  }

  if (istLink && tag === "a") {
    tag = "Link";
    zustand.brauchtLink = true;
  }

  const attrText = attribute.length ? " " + attribute.join(" ") : "";

  if (LEERE_TAGS.has(knoten.tag) || knoten.kinder.length === 0) {
    const kinderText = knoten.kinder
      .map((k) => knotenNachJsx(k, einzug + 1, indexName))
      .join("");
    if (!kinderText) return `${e}<${tag}${attrText} />\n`;
    return `${e}<${tag}${attrText}>\n${kinderText}${e}</${tag}>\n`;
  }

  const kinderText = knoten.kinder
    .map((k) => knotenNachJsx(k, einzug + 1, indexName))
    .join("");
  if (!kinderText.trim()) return `${e}<${tag}${attrText} />\n`;
  return `${e}<${tag}${attrText}>\n${kinderText}${e}</${tag}>\n`;
}

/* ------------------------------------------------------------------ */
/* data.js → Konstanten                                                */
/* ------------------------------------------------------------------ */

function leseDaten(quelle, route) {
  const ohneKommentare = quelle.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const hatZustand = /\bstate\s*=\s*\{|this\.setState|this\.state/.test(ohneKommentare);
  if (hatZustand) {
    zustand.offenePunkte.push(
      `${route}: data.js enthält Zustand/Handler — Client-Komponente von Hand bauen`,
    );
  }

  const start = quelle.indexOf("return {");
  if (start < 0) return { konstanten: "", schluessel: [], hatZustand };

  // Passende schließende Klammer suchen
  let tiefe = 0;
  let ende = -1;
  for (let i = quelle.indexOf("{", start); i < quelle.length; i++) {
    if (quelle[i] === "{") tiefe++;
    else if (quelle[i] === "}") {
      tiefe--;
      if (tiefe === 0) {
        ende = i;
        break;
      }
    }
  }
  if (ende < 0) return { konstanten: "", schluessel: [], hatZustand };

  const koerper = quelle.slice(quelle.indexOf("{", start) + 1, ende);

  // Top-Level-Schlüssel auf Einrückungsebene der Rückgabe trennen
  const eintraege = [];
  tiefe = 0;
  let inText = null;
  let aktuell = "";
  for (let i = 0; i < koerper.length; i++) {
    const z = koerper[i];
    if (inText) {
      aktuell += z;
      if (z === inText && koerper[i - 1] !== "\\") inText = null;
      continue;
    }
    if (z === '"' || z === "'" || z === "`") {
      inText = z;
      aktuell += z;
      continue;
    }
    if (z === "{" || z === "[" || z === "(") tiefe++;
    if (z === "}" || z === "]" || z === ")") tiefe--;
    if (z === "," && tiefe === 0) {
      eintraege.push(aktuell);
      aktuell = "";
      continue;
    }
    aktuell += z;
  }
  if (aktuell.trim()) eintraege.push(aktuell);

  const konstanten = [];
  const schluessel = [];
  for (const eintrag of eintraege) {
    const t = eintrag.trim();
    if (!t) continue;
    const i = t.indexOf(":");
    if (i < 0) {
      // Kurzschreibweise { fear } — kommt aus dem Zustand
      schluessel.push(t);
      continue;
    }
    const name = t.slice(0, i).trim();
    const wert = t.slice(i + 1).trim();
    schluessel.push(name);
    konstanten.push(`const ${name} = ${wert};`);
  }

  const ersetzt = konstanten
    .join("\n\n")
    .replace(/"([^"]*\.dc\.html[^"]*)"/g, (ganz, href) => {
      const route = loeseLink(href);
      return route ? JSON.stringify(route) : ganz;
    });

  return { konstanten: ersetzt, schluessel, hatZustand };
}

/* ------------------------------------------------------------------ */
/* Seiten schreiben                                                    */
/* ------------------------------------------------------------------ */

/** Den äußeren Wrapper entfernen — er steht in app/layout.tsx. */
function entferneWrapper(knoten) {
  const elemente = knoten.filter((k) => k.art === "element");
  if (elemente.length !== 1) return knoten;
  const einziges = elemente[0];
  if (einziges.tag !== "div") return knoten;
  const style = einziges.attribute.find((a) => a.name === "style")?.wert ?? "";
  if (!/max-width:\s*1440px/.test(style)) return knoten;
  return einziges.kinder;
}

let anzahl = 0;
const bericht = [];

for (const [ordner, route] of Object.entries(ordnerZuRoute)) {
  const quellordner = join(paket, "pages", ordner);
  if (!existsSync(join(quellordner, "markup.html"))) {
    bericht.push(`! ${route}: markup.html fehlt`);
    continue;
  }

  zustand.brauchtLink = false;

  const markup = readFileSync(join(quellordner, "markup.html"), "utf8");
  const head = JSON.parse(readFileSync(join(quellordner, "head.json"), "utf8"));
  const jsonLdPfad = join(quellordner, "jsonld.json");
  const jsonLd = existsSync(jsonLdPfad) ? readFileSync(jsonLdPfad, "utf8") : null;
  const datenPfad = join(quellordner, "data.js");
  const daten = existsSync(datenPfad)
    ? leseDaten(readFileSync(datenPfad, "utf8"), route)
    : { konstanten: "", schluessel: [], hatZustand: false };

  const baum = entferneWrapper(zerlege(markup));
  const jsx = baum.map((k) => knotenNachJsx(k, 3, null)).join("");

  const brauchtFragment = /<Fragment key=/.test(jsx);
  const importe = [];
  if (brauchtFragment) importe.push(`import { Fragment } from "react";`);
  importe.push(`import type { Metadata } from "next";`);
  if (zustand.brauchtLink) importe.push(`import Link from "next/link";`);
  if (jsonLd) importe.push(`import JsonLd from "@/components/JsonLd";`);

  const komponente = ordner
    .split(/[-_]/)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join("");

  const kopfNotiz = daten.hatZustand
    ? `\n/*\n * ACHTUNG — diese Seite hatte in der Übergabe Zustand und Handler\n * (this.state / setState). Der interaktive Teil ist hier NICHT abgebildet\n * und muss als Client-Komponente ergänzt werden. Siehe docs/MIGRATION-STATUS.md.\n */\n`
    : "";

  const inhalt =
    `${importe.join("\n")}\n` +
    (jsonLd ? `import strukturierteDaten from "./jsonld.json";\n` : "") +
    kopfNotiz +
    `\nexport const metadata: Metadata = {\n` +
    `  title: ${JSON.stringify(entschaerfeEntities(head.title))},\n` +
    `  description: ${JSON.stringify(entschaerfeEntities(head.description ?? ""))},\n` +
    `  alternates: { canonical: ${JSON.stringify(route)} },\n` +
    `};\n\n` +
    (daten.konstanten ? daten.konstanten + "\n\n" : "") +
    `export default function ${komponente || "Seite"}() {\n` +
    `  return (\n` +
    `    <>\n` +
    (jsonLd ? `      <JsonLd daten={strukturierteDaten} />\n` : "") +
    jsx +
    `    </>\n` +
    `  );\n}\n`;

  const zielordner = route === "/" ? ziel : join(ziel, route.slice(1));
  mkdirSync(zielordner, { recursive: true });
  writeFileSync(join(zielordner, "page.tsx"), inhalt);
  if (jsonLd) writeFileSync(join(zielordner, "jsonld.json"), jsonLd);

  // Rückstände melden
  const reste = [];
  if (/\{\{\s*[\w$][\w$.]*\s*\}\}/.test(inhalt)) reste.push("{{ … }}");
  if (/<sc-(for|if)/.test(inhalt)) reste.push("sc-*");
  if (/hint-/.test(inhalt)) reste.push("hint-");
  if (/\.dc\.html/.test(inhalt)) reste.push(".dc.html");

  bericht.push(
    `${reste.length ? "!" : "✓"} ${route.padEnd(28)} ${String(markup.split("\n").length).padStart(4)} Zeilen` +
      (daten.schluessel.length ? `, Daten: ${daten.schluessel.join(", ")}` : "") +
      (reste.length ? `  ← RÜCKSTÄNDE: ${reste.join(", ")}` : ""),
  );
  anzahl++;
}

console.log(bericht.join("\n"));
console.log(`\n${anzahl} Seiten geschrieben.`);
if (zustand.offenePunkte.length) {
  console.log("\nVon Hand nachzuziehen:");
  for (const p of zustand.offenePunkte) console.log("  · " + p);
}
