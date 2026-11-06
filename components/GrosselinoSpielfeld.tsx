"use client";

import { useEffect, useRef, useState } from "react";
import { HELL } from "./Grosselino";
import {
  MASSE,
  MONSTER,
  WAHRZEICHEN_BREITE,
  fuellbauBreite,
  maler,
  type Art,
  type Farben,
  type Fuellbau,
  type Wahrzeichen,
} from "./grosselino-spiel/zeichnung";

/*
  Das Spielfeld zu GrosselinoSpiel: ein Läufer auf <canvas>, ohne Bibliothek.
  Die Zeichnungen stehen in grosselino-spiel/zeichnung.ts.

  GROSSELINO läuft von selbst, Sprung mit Leertaste, Pfeil nach oben,
  Eingabe, Klick oder Tippen; kurz drücken = kleiner Sprung. Bonbons, Lollis
  und Limodosen beenden die Runde, Zahnbürsten bringen Extrapunkte.

  Der Weg führt in fünf Etappen durch Potsdam — Sanssouci, Holländisches
  Viertel, Glienicker Brücke, Stadtschloss, Brandenburger Tor. Zu Beginn
  jeder Etappe zieht ihr Wahrzeichen durch den Hintergrund, dazwischen
  Bäume und Häuser. Am Ende jeder Etappe wartet ein Zuckermonster: dreimal
  drüberspringen, dann ist es besiegt (+100). Am Brandenburger Tor wartet
  das große Zuckermonster mit Krone; es wirft erst Zuckerwürfel, die man
  überspringen muss, und läuft dann selbst an. Danach: alle Zähne gerettet.

  Vor dem Start ist die Szene schon zu sehen, darüber der Knopf „Spielen".
  Den Spielstand meldet das Feld als Ereignis `grosselino-spiel` an die
  Randfigur (components/Grosselino.tsx), die dann passend spricht.

  Vollbild (nur mobil sichtbar, siehe .spiel__umschalter): Die Bühne legt
  sich als feste Ebene über Kopfzeile und Termin-Leiste und bittet den
  Browser zusätzlich um echtes Vollbild samt Querformat. Das iPhone kennt
  kein Vollbild für Elemente — dort bleibt es bei der Ebene. Die Szene wird
  nur größer gezeichnet; die Spiellogik rechnet weiter in 240 px Höhe.
*/

const HOEHE = 240; // CSS-Pixel, siehe .spiel__feld
const BODEN_ABSTAND = 34; // Boden über dem unteren Rand
const FIGUR = 62; // Kantenlänge der Figur (Zeichnung im 100er-Raster)
const FIGUR_X = 40;
const SCHWERKRAFT = 2600; // px/s²
const SPRUNG = 800; // Anfangsgeschwindigkeit, ergibt gut 120 px Sprunghöhe
const KURZER_SPRUNG = 360; // beim frühen Loslassen
const START_TEMPO = 320; // px/s
const MAX_TEMPO = 720;
const BESCHLEUNIGUNG = 0.008; // Tempo-Zuwachs je gelaufenem Pixel
const PUNKTE_JE_PIXEL = 1 / 40;
const BUERSTE_PUNKTE = 25;
const SIEG_PUNKTE = 100;
const ETAPPE_STRECKE = 7000; // px bis zum Zuckermonster, gut 15 Sekunden
const MONSTER_SPRUENGE = 3;
const ENDGEGNER_WUERFEL = 6;
const SIEG_PAUSE = 2.4; // s zwischen besiegtem Monster und nächster Etappe
const BANNER_DAUER = 2.6;
const VOLLBILD_BREITE = 480; // so viel Weg bleibt im Vollbild mindestens in Sicht
const ENDE_SPERRE = 600; // ms nach dem Rundenende, bis ein Tippen wieder zählt

const ETAPPEN: { name: string; bau: Wahrzeichen }[] = [
  { name: "Schloss Sanssouci", bau: "sanssouci" },
  { name: "Holländisches Viertel", bau: "hollaender" },
  { name: "Glienicker Brücke", bau: "bruecke" },
  { name: "Stadtschloss", bau: "stadtschloss" },
  { name: "Brandenburger Tor", bau: "tor" },
];

type Zustand = "bereit" | "laeuft" | "vorbei" | "geschafft";
type Phase = "strecke" | "aufraeumen" | "boss" | "sieg";
/** `zusatz`: eigene Geschwindigkeit auf dem Bildschirm (rollende Würfel). */
type Hindernis = { art: Art; x: number; zusatz: number };
type Buerste = { x: number; hoehe: number; weg: boolean };
type Wolke = { x: number; y: number; g: number };
type Bau = { art: Wahrzeichen | Fuellbau; x: number; v: number };
type Monster = {
  x: number;
  y: number;
  vy: number;
  g: number;
  endgegner: boolean;
  modus: "auftritt" | "werfen" | "anlauf" | "warten" | "platzt";
  uebersprungen: number;
  gezaehlt: boolean;
  bis: number;
  wuerfelRest: number;
};

export type SpielMeldung = "bereit" | "laeuft" | "vorbei" | "geschafft";
const melde = (z: SpielMeldung) => window.dispatchEvent(new CustomEvent<SpielMeldung>("grosselino-spiel", { detail: z }));

/* Vollbild-Schnittstellen, die TypeScript nicht (mehr) kennt: Safari auf dem
   iPad mit Präfix, Ausrichtung sperren nur in Chrome für Android. */
type VollbildElement = HTMLElement & { webkitRequestFullscreen?: () => void };
type VollbildDokument = Document & { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => void };
type Ausrichtung = ScreenOrientation & { lock?: (art: string) => Promise<void> };
const imVollbild = () => {
  const d = document as VollbildDokument;
  return Boolean(d.fullscreenElement ?? d.webkitFullscreenElement);
};

export default function GrosselinoSpielfeld() {
  const feldRef = useRef<HTMLCanvasElement>(null);
  const buehneRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<() => void>(() => {});
  const nochmalRef = useRef<() => void>(() => {});
  const [ansage, setAnsage] = useState("");
  const [gestartet, setGestartet] = useState(false);
  const [vollbild, setVollbild] = useState(false);
  const [ende, setEnde] = useState(false);

  useEffect(() => {
    const feld = feldRef.current;
    if (!feld) return;
    const ctx = feld.getContext("2d");
    if (!ctx) return;

    const stil = getComputedStyle(feld);
    const token = (name: string) => stil.getPropertyValue(name).trim();
    const f: Farben = {
      linie: token("--color-accent-700"),
      zart: token("--color-accent-300"),
      flaeche: token("--color-accent-200"),
      tinte: token("--color-text"),
      teiler: token("--color-divider"),
      text: token("--color-neutral-800"),
      hell: HELL,
    };
    const grund = token("--kid-ground");
    const schriftUi = stil.fontFamily;
    const schriftTitel = token("--font-heading") || schriftUi;
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const beruehrung = window.matchMedia("(pointer: coarse)").matches;
    const m = maler(ctx, f);

    /* Gezeichnet wird in Spiel-Pixeln: 240 hoch, `breite` breit. Im Feld ist
       das 1:1. Im Vollbild wächst die Szene mit der Höhe — aber nur so weit,
       dass noch VOLLBILD_BREITE Weg in Sicht bleibt, und nie kleiner als im
       Feld. Was an Höhe übrig bleibt, verteilt sich als Himmel und Boden. */
    let breite = feld.clientWidth;
    let oben = 0;
    const anpassen = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const b = feld.clientWidth;
      const h = feld.clientHeight || HOEHE;
      const massstab = Math.min(h / HOEHE, Math.max(1, b / VOLLBILD_BREITE));
      breite = b / massstab;
      oben = (h / massstab - HOEHE) / 2;
      feld.width = Math.round(b * dpr);
      feld.height = Math.round(h * dpr);
      ctx.setTransform(dpr * massstab, 0, 0, dpr * massstab, 0, oben * dpr * massstab);
    };
    anpassen();
    const groesse = new ResizeObserver(anpassen);
    groesse.observe(feld);

    const boden = HOEHE - BODEN_ABSTAND;
    const s = {
      zustand: "bereit" as Zustand,
      phase: "strecke" as Phase,
      phaseBis: 0,
      etappe: 0,
      etappeWeg: 0,
      y: 0, // Höhe der Figur über dem Boden
      vy: 0,
      tempo: START_TEMPO,
      strecke: 0,
      extra: 0,
      bestwert: 0,
      neuerBestwert: false,
      naechstes: 0,
      hindernisse: [] as Hindernis[],
      buersten: [] as Buerste[],
      monster: null as Monster | null,
      wolken: [
        { x: 0.15, y: 46, g: 1 },
        { x: 0.55, y: 30, g: 0.8 },
        { x: 0.85, y: 62, g: 1.15 },
      ] as Wolke[],
      kulisse: 0, // gelaufene Strecke der Silhouette in px
      bauten: [] as Bau[],
      naechsterBau: 10,
      zeit: 0,
      sperreBis: 0,
      plus: { bis: 0, x: 0, y: 0, text: "" },
      banner: { von: 0, bis: 0, titel: "", text: "" },
    };
    const punkte = () => Math.floor(s.strecke * PUNKTE_JE_PIXEL) + s.extra;

    const banner = (titel: string, text: string) => {
      s.banner = { von: s.zeit, bis: s.zeit + BANNER_DAUER, titel, text };
      setAnsage(`${titel} ${text}`);
    };
    const plus = (punkteZusatz: number, x: number, y: number) => {
      s.extra += punkteZusatz;
      s.plus = { bis: s.zeit + 0.9, x, y, text: `+${punkteZusatz}` };
    };

    /* ── Kulisse ─────────────────────────────────────────────────────────
       Bauten in Kulissen-Koordinaten; gezeichnet bei x − s.kulisse. */
    const baubreite = (b: Bau) =>
      b.art === "baum" || b.art === "haeuser" ? fuellbauBreite(b.art, b.v) : WAHRZEICHEN_BREITE[b.art];
    const fuelleBis = (grenze: number) => {
      while (s.naechsterBau < grenze) {
        const art: Fuellbau = Math.random() < 0.55 ? "baum" : "haeuser";
        const v = Math.random();
        s.bauten.push({ art, x: s.naechsterBau, v });
        s.naechsterBau += fuellbauBreite(art, v) + 18 + Math.random() * 50;
      }
    };
    const wahrzeichenSetzen = (art: Wahrzeichen, x = Math.max(s.naechsterBau, s.kulisse + breite + 30)) => {
      s.bauten.push({ art, x, v: 0 });
      s.naechsterBau = x + WAHRZEICHEN_BREITE[art] + 40;
    };
    // Erstes Bild: Sanssouci gleich im Blick
    fuelleBis(breite * 0.36);
    wahrzeichenSetzen("sanssouci", s.naechsterBau);
    fuelleBis(breite + 60);

    /* ── Ablauf ──────────────────────────────────────────────────────── */
    const neueRunde = () => {
      s.zustand = "laeuft";
      s.phase = "strecke";
      s.etappe = 0;
      s.etappeWeg = 0;
      s.y = 0;
      s.vy = 0;
      s.tempo = START_TEMPO;
      s.strecke = 0;
      s.extra = 0;
      s.neuerBestwert = false;
      s.naechstes = 260;
      s.hindernisse = [];
      s.buersten = [];
      s.monster = null;
      const sanssouciImBild = s.bauten.some((b) => b.art === "sanssouci" && b.x - s.kulisse < breite);
      if (!sanssouciImBild) wahrzeichenSetzen("sanssouci");
      banner(`Etappe 1 von ${ETAPPEN.length}`, ETAPPEN[0].name);
      setGestartet(true);
      setEnde(false);
      melde("laeuft");
    };
    startRef.current = () => {
      neueRunde();
      feld.focus({ preventScroll: true });
    };
    nochmalRef.current = () => {
      if (performance.now() < s.sperreBis) return;
      startRef.current();
    };

    // Vorschau vor dem Start: zeigt, worauf man sich einlässt.
    s.hindernisse = [
      { art: "bonbon", x: breite * 0.5, zusatz: 0 },
      { art: "lolli", x: breite * 0.7, zusatz: 0 },
      { art: "dose", x: breite * 0.88, zusatz: 0 },
    ];
    s.buersten = [{ x: breite * 0.58, hoehe: 74, weg: false }];

    let endeZeit = 0;
    const rundeEnde = (zustand: "vorbei" | "geschafft") => {
      s.zustand = zustand;
      s.sperreBis = performance.now() + ENDE_SPERRE;
      // Knöpfe erst nach der Sperre — sonst trifft ein Sprung-Tippen sie gleich.
      clearTimeout(endeZeit);
      endeZeit = window.setTimeout(() => {
        if (s.zustand !== "laeuft") setEnde(true);
      }, ENDE_SPERRE);
      const p = punkte();
      s.neuerBestwert = p > s.bestwert;
      s.bestwert = Math.max(s.bestwert, p);
      const bestwert = s.neuerBestwert ? ", neuer Bestwert" : "";
      setAnsage(
        zustand === "geschafft"
          ? `Alle Zähne gerettet! ${p} Punkte${bestwert}. Leertaste oder Tippen für eine neue Runde.`
          : `Runde vorbei in Etappe ${s.etappe + 1}: ${p} Punkte${bestwert}. Leertaste oder Tippen für eine neue Runde.`,
      );
      melde(zustand);
    };

    const bossStart = () => {
      const endgegner = s.etappe === ETAPPEN.length - 1;
      s.phase = "boss";
      s.monster = {
        x: breite + 30,
        y: 0,
        vy: 0,
        g: endgegner ? 1.35 : 1,
        endgegner,
        modus: endgegner ? "auftritt" : "anlauf",
        uebersprungen: 0,
        gezaehlt: false,
        bis: 0,
        wuerfelRest: endgegner ? ENDGEGNER_WUERFEL : 0,
      };
      if (endgegner) banner("Das große Zuckermonster!", "Erst über die Würfel, dann dreimal drüber.");
      else banner("Achtung, Zuckermonster!", "Spring dreimal drüber.");
    };

    const etappeGeschafft = () => {
      s.monster = null;
      if (s.etappe === ETAPPEN.length - 1) {
        rundeEnde("geschafft");
        return;
      }
      s.phase = "sieg";
      s.phaseBis = s.zeit + SIEG_PAUSE;
      banner(`${ETAPPEN[s.etappe].name} geschafft!`, `Goldene Zahnbürste: +${SIEG_PUNKTE} Punkte`);
    };

    const naechsteEtappe = () => {
      s.etappe++;
      s.phase = "strecke";
      s.etappeWeg = 0;
      s.naechstes = 240;
      const e = ETAPPEN[s.etappe];
      wahrzeichenSetzen(e.bau);
      banner(`Etappe ${s.etappe + 1} von ${ETAPPEN.length}`, e.name);
    };

    /* ── Eingabe ─────────────────────────────────────────────────────── */
    const druecken = () => {
      if (s.zustand !== "laeuft") {
        if (performance.now() >= s.sperreBis) neueRunde();
        return;
      }
      if (s.y === 0) s.vy = SPRUNG;
    };
    const loslassen = () => {
      if (s.zustand === "laeuft" && s.vy > KURZER_SPRUNG) s.vy = KURZER_SPRUNG;
    };
    const tasten = new Set([" ", "Spacebar", "ArrowUp", "Enter"]);
    const tasteRunter = (e: KeyboardEvent) => {
      if (!tasten.has(e.key)) return;
      e.preventDefault(); // sonst scrollt die Leertaste die Seite
      if (!e.repeat) druecken();
    };
    const tasteHoch = (e: KeyboardEvent) => {
      if (tasten.has(e.key)) loslassen();
    };
    const zeigerRunter = (e: PointerEvent) => {
      e.preventDefault();
      feld.focus({ preventScroll: true });
      druecken();
    };
    feld.addEventListener("keydown", tasteRunter);
    feld.addEventListener("keyup", tasteHoch);
    feld.addEventListener("pointerdown", zeigerRunter);
    feld.addEventListener("pointerup", loslassen);
    feld.addEventListener("pointercancel", loslassen);

    /* ── Spiellogik ──────────────────────────────────────────────────── */
    const figurKasten = () => {
      const k = FIGUR / 100;
      const oben = boden - 93.5 * k - s.y;
      return { x1: FIGUR_X + 24 * k, x2: FIGUR_X + 76 * k, y1: oben + 20 * k, y2: oben + 92 * k };
    };

    const monsterSchritt = (dt: number) => {
      const mo = s.monster;
      if (!mo) return;
      const mb = MONSTER.b * mo.g;
      if (mo.modus !== "platzt" && mo.modus !== "warten") {
        mo.vy -= SCHWERKRAFT * dt;
        mo.y += mo.vy * dt;
        if (mo.y <= 0) {
          mo.y = 0;
          // hüpft unregelmäßig: höchstens gut 30 px, der größere Endgegner flacher
          mo.vy = mo.endgegner ? 200 + Math.random() * 100 : 280 + Math.random() * 140;
        }
      }
      switch (mo.modus) {
        case "auftritt": {
          const ziel = breite - mb - 40;
          mo.x -= 260 * dt;
          if (mo.x <= ziel) {
            mo.x = ziel;
            mo.modus = "werfen";
            mo.bis = s.zeit + 0.7;
          }
          break;
        }
        case "werfen":
          if (mo.wuerfelRest > 0 && s.zeit >= mo.bis) {
            s.hindernisse.push({ art: "wuerfel", x: mo.x - 8, zusatz: 170 });
            mo.wuerfelRest--;
            mo.bis = s.zeit + 0.85 + Math.random() * 0.7;
          }
          if (mo.wuerfelRest === 0 && !s.hindernisse.some((h) => h.art === "wuerfel")) {
            mo.modus = "anlauf";
            banner("Jetzt das Monster!", "Dreimal drüberspringen.");
          }
          break;
        case "anlauf": {
          mo.x -= (Math.min(s.tempo, 480) + 140) * dt;
          if (!mo.gezaehlt && mo.x + mb < figurKasten().x1) {
            mo.gezaehlt = true;
            mo.uebersprungen++;
            if (mo.uebersprungen >= MONSTER_SPRUENGE) {
              mo.modus = "platzt";
              mo.bis = s.zeit + 0.7;
              plus(SIEG_PUNKTE, Math.max(8, mo.x), boden - 70);
              break;
            }
          }
          if (mo.x < -mb - 20) {
            mo.modus = "warten";
            mo.bis = s.zeit + 0.5;
          }
          break;
        }
        case "warten":
          if (s.zeit >= mo.bis) {
            mo.x = breite + 30;
            mo.gezaehlt = false;
            mo.modus = "anlauf";
          }
          break;
        case "platzt":
          if (s.zeit >= mo.bis) etappeGeschafft();
          break;
      }
    };

    const schritt = (dt: number) => {
      s.zeit += dt;
      if (s.zustand !== "laeuft") return;

      s.tempo = Math.min(MAX_TEMPO, START_TEMPO + s.strecke * BESCHLEUNIGUNG);
      const weg = s.tempo * dt;
      s.strecke += weg;

      s.vy -= SCHWERKRAFT * dt;
      s.y += s.vy * dt;
      if (s.y <= 0) {
        s.y = 0;
        s.vy = 0;
      }

      for (const h of s.hindernisse) h.x -= weg + h.zusatz * dt;
      for (const b of s.buersten) b.x -= weg;
      s.hindernisse = s.hindernisse.filter((h) => h.x > -60);
      s.buersten = s.buersten.filter((b) => b.x > -60 && !b.weg);

      if (s.phase === "strecke") {
        s.etappeWeg += weg;
        s.naechstes -= weg;
        if (s.naechstes <= 0) {
          const arten: Art[] = ["bonbon", "lolli", "dose"];
          s.hindernisse.push({ art: arten[Math.floor(Math.random() * arten.length)], x: breite + 20, zusatz: 0 });
          const luecke = s.tempo * 0.75 + 170 + Math.random() * (240 + s.tempo * 0.4);
          s.naechstes = luecke;
          if (Math.random() < 0.22) {
            s.buersten.push({ x: breite + 20 + luecke / 2, hoehe: 78 + Math.random() * 40, weg: false });
          }
        }
        if (s.etappeWeg >= ETAPPE_STRECKE) s.phase = "aufraeumen";
      } else if (s.phase === "aufraeumen") {
        if (s.hindernisse.length === 0) bossStart();
      } else if (s.phase === "boss") {
        monsterSchritt(dt);
      } else if (s.phase === "sieg" && s.zeit >= s.phaseBis) {
        naechsteEtappe();
      }
      if (s.zustand !== "laeuft") return;

      // Treffer: Kasten der Figur, etwas kleiner als die Zeichnung.
      const fk = figurKasten();
      for (const h of s.hindernisse) {
        const mh = MASSE[h.art];
        if (fk.x2 > h.x + 4 && fk.x1 < h.x + mh.b - 4 && fk.y2 > boden - mh.h + 4) {
          rundeEnde("vorbei");
          return;
        }
      }
      const mo = s.monster;
      if (mo && mo.modus !== "platzt" && mo.modus !== "warten") {
        const mb = MONSTER.b * mo.g;
        const oben = boden - mo.y - MONSTER.h * mo.g;
        if (fk.x2 > mo.x + 12 * mo.g && fk.x1 < mo.x + mb - 12 * mo.g && fk.y2 > oben + 8 * mo.g) {
          rundeEnde("vorbei");
          return;
        }
      }
      for (const b of s.buersten) {
        const by = boden - b.hoehe;
        if (fk.x2 > b.x && fk.x1 < b.x + 44 && fk.y1 < by + 8 && fk.y2 > by - 8) {
          b.weg = true;
          plus(BUERSTE_PUNKTE, b.x, by);
        }
      }
    };

    /* ── Zeichnen ────────────────────────────────────────────────────── */
    const sperrung = (wert: string) => {
      if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = wert;
    };
    const schrift = (groesse: number, familie: string, gewicht = 400) => {
      ctx.font = `${gewicht} ${groesse}px ${familie}`;
    };
    /** Zeilen mittig, mit hellem Grund dahinter — lesbar über der Kulisse. */
    const tafel = (zeilen: { text: string; titel?: boolean }[], y: number, deckkraft = 1) => {
      ctx.save();
      ctx.globalAlpha = deckkraft;
      ctx.textAlign = "center";
      sperrung("0px");
      let hoehe = 0;
      let weiteste = 0;
      for (const z of zeilen) {
        schrift(z.titel ? 24 : 13, z.titel ? schriftTitel : schriftUi);
        weiteste = Math.max(weiteste, ctx.measureText(z.text).width);
        hoehe += z.titel ? 30 : 20;
      }
      ctx.globalAlpha = deckkraft * 0.85;
      ctx.fillStyle = grund;
      ctx.beginPath();
      ctx.roundRect(breite / 2 - weiteste / 2 - 16, y - 24, weiteste + 32, hoehe + 12, 8);
      ctx.fill();
      ctx.globalAlpha = deckkraft;
      let zy = y;
      for (const z of zeilen) {
        schrift(z.titel ? 24 : 13, z.titel ? schriftTitel : schriftUi);
        ctx.fillStyle = z.titel ? f.tinte : f.text;
        ctx.fillText(z.text, breite / 2, zy);
        zy += z.titel ? 26 : 20;
      }
      ctx.restore();
    };

    const zeichnen = () => {
      ctx.clearRect(0, -oben, breite, HOEHE + 2 * oben);

      for (const w of s.wolken) m.wolke(w.x * (breite + 160) - 80, w.y, w.g);
      for (const b of s.bauten) m.bau(b.art, b.x - s.kulisse, boden, b.v);

      // Boden mit Strichen, die mitlaufen
      m.strich(f.teiler, 1);
      m.linie(0, boden, breite, boden);
      const versatz = s.strecke % 46;
      for (let x = -versatz; x < breite; x += 46) m.linie(x, boden + 10, x + 10, boden + 10);

      for (const b of s.buersten) m.buerste(b.x, boden - b.hoehe + Math.sin(s.zeit * 4 + b.x * 0.01) * 3);
      for (const h of s.hindernisse) m.hindernis(h.art, h.x, boden);
      const mo = s.monster;
      if (mo && mo.modus !== "warten") {
        m.monster(mo.x, boden - mo.y, mo.g, {
          zeit: s.zeit,
          krone: mo.endgegner,
          platzen: mo.modus === "platzt" ? 1 - (mo.bis - s.zeit) / 0.7 : 0,
        });
      }
      m.baer(FIGUR_X, boden - 93.5 * (FIGUR / 100) - s.y, FIGUR, {
        zeit: s.zeit,
        laeuft: s.zustand === "laeuft",
        amBoden: s.y === 0,
        aus: s.zustand === "vorbei",
        jubel: s.zustand === "geschafft" || s.phase === "sieg",
      });

      if (s.plus.bis > s.zeit) {
        ctx.fillStyle = f.linie;
        schrift(15, schriftUi, 500);
        ctx.textAlign = "left";
        sperrung("0.05em");
        ctx.fillText(s.plus.text, s.plus.x, s.plus.y - 14 - (0.9 - (s.plus.bis - s.zeit)) * 22);
      }

      if (s.zustand === "bereit") return;

      // Kopfzeile: Etappe links, Punkte rechts
      ctx.fillStyle = f.text;
      schrift(13, schriftUi, 500);
      sperrung("0.18em");
      ctx.textAlign = "left";
      ctx.fillText(`ETAPPE ${s.etappe + 1}/${ETAPPEN.length}`, 16, 26);
      ctx.textAlign = "right";
      const stand = `PUNKTE ${String(punkte()).padStart(4, "0")}`;
      const best = s.bestwert > 0 && breite >= 560 ? `BESTWERT ${String(s.bestwert).padStart(4, "0")}   ` : "";
      ctx.fillText(best + stand, breite - 16, 26);

      // Lebensanzeige des Monsters
      if (mo && mo.modus !== "platzt" && s.banner.bis < s.zeit) {
        const rest = MONSTER_SPRUENGE - mo.uebersprungen;
        ctx.textAlign = "center";
        schrift(12, schriftUi, 500);
        sperrung("0.18em");
        ctx.fillStyle = f.linie;
        ctx.fillText(mo.endgegner ? "GROSSES ZUCKERMONSTER" : "ZUCKERMONSTER", breite / 2, 54);
        for (let i = 0; i < MONSTER_SPRUENGE; i++) {
          ctx.beginPath();
          ctx.arc(breite / 2 - 14 + i * 14, 66, 4, 0, Math.PI * 2);
          if (i < rest) {
            ctx.fillStyle = f.linie;
            ctx.fill();
          }
          m.strich(f.linie, 1.4);
          ctx.stroke();
        }
      }

      if (s.zustand === "laeuft" && s.banner.bis > s.zeit) {
        const ein = Math.min(1, (s.zeit - s.banner.von) / 0.25);
        const aus = Math.min(1, (s.banner.bis - s.zeit) / 0.4);
        tafel([{ text: s.banner.titel, titel: true }, { text: s.banner.text }], 72, Math.min(ein, aus));
      }

      const hinweis = beruehrung ? "Tippen zum Springen" : "Leertaste oder Klick zum Springen";
      const bestwertZeile = s.neuerBestwert ? " · neuer Bestwert" : "";
      if (s.zustand === "vorbei") {
        tafel(
          [
            { text: "Zu viel Zucker!", titel: true },
            { text: `Etappe ${s.etappe + 1} · ${punkte()} Punkte${bestwertZeile}` },
            { text: `Nochmal? ${hinweis}` },
          ],
          72,
        );
      } else if (s.zustand === "geschafft") {
        tafel(
          [
            { text: "Alle Zähne gerettet!", titel: true },
            { text: `${punkte()} Punkte${bestwertZeile}` },
            { text: `Nochmal? ${hinweis}` },
          ],
          72,
        );
      }
    };

    /* ── Schleife ────────────────────────────────────────────────────── */
    let letzte = performance.now();
    let rahmen = 0;
    const schleife = (jetzt: number) => {
      const dt = Math.min(0.05, (jetzt - letzte) / 1000); // nach Tab-Wechsel nicht springen
      letzte = jetzt;
      schritt(dt);
      if (!ruhig || s.zustand === "laeuft") {
        const hinten = s.zustand === "laeuft" ? s.tempo * dt : 14 * dt;
        for (const w of s.wolken) {
          w.x -= (hinten * 0.12) / (breite + 160);
          if (w.x < 0) w.x += 1;
        }
        s.kulisse += hinten * 0.25;
        s.bauten = s.bauten.filter((b) => b.x + baubreite(b) - s.kulisse > -10);
      }
      fuelleBis(s.kulisse + breite + 60); // auch im Stand: das Vollbild ist breiter
      zeichnen();
      rahmen = requestAnimationFrame(schleife);
    };
    rahmen = requestAnimationFrame(schleife);

    return () => {
      cancelAnimationFrame(rahmen);
      clearTimeout(endeZeit);
      groesse.disconnect();
      feld.removeEventListener("keydown", tasteRunter);
      feld.removeEventListener("keyup", tasteHoch);
      feld.removeEventListener("pointerdown", zeigerRunter);
      feld.removeEventListener("pointerup", loslassen);
      feld.removeEventListener("pointercancel", loslassen);
      melde("bereit");
    };
  }, []);

  /* ── Vollbild ──────────────────────────────────────────────────────── */
  const vollbildAn = () => {
    setVollbild(true);
    const el = buehneRef.current as VollbildElement | null;
    if (!el) return;
    const quer = () => (screen.orientation as Ausrichtung | undefined)?.lock?.("landscape").catch(() => {});
    // Muss in derselben Klick-Behandlung passieren, sonst lehnt der Browser ab.
    if (el.requestFullscreen) el.requestFullscreen({ navigationUI: "hide" }).then(quer, () => {});
    else el.webkitRequestFullscreen?.();
  };
  const vollbildAus = () => setVollbild(false); // das Aufräumen übernimmt der Effekt

  useEffect(() => {
    if (!vollbild) return;
    const wurzel = document.documentElement;
    wurzel.classList.add("spiel-vollbild"); // Seite dahinter scrollt nicht mit
    feldRef.current?.focus({ preventScroll: true });
    // Zurück-Taste oder Esc beenden das echte Vollbild — dann auch die Ebene.
    const gewechselt = () => {
      if (!imVollbild()) setVollbild(false);
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVollbild(false);
    };
    document.addEventListener("fullscreenchange", gewechselt);
    document.addEventListener("webkitfullscreenchange", gewechselt);
    document.addEventListener("keydown", taste);
    return () => {
      wurzel.classList.remove("spiel-vollbild");
      try {
        screen.orientation?.unlock();
      } catch {
        // nicht gesperrt oder nicht unterstützt
      }
      if (imVollbild()) {
        const d = document as VollbildDokument;
        if (d.exitFullscreen) d.exitFullscreen().catch(() => {});
        else d.webkitExitFullscreen?.();
      }
      document.removeEventListener("fullscreenchange", gewechselt);
      document.removeEventListener("webkitfullscreenchange", gewechselt);
      document.removeEventListener("keydown", taste);
    };
  }, [vollbild]);

  return (
    <div ref={buehneRef} className={vollbild ? "spiel__buehne spiel__buehne--vollbild" : "spiel__buehne"}>
      <canvas
        ref={feldRef}
        className="spiel__feld spiel__leinwand"
        tabIndex={0}
        role="application"
        aria-roledescription="Spiel"
        aria-label="Grosselino läuft durch Potsdam und springt über Süßigkeiten und Zuckermonster. Leertaste, Pfeil nach oben oder Tippen zum Springen."
      />
      {!gestartet && (
        <div className="spiel__start">
          <button type="button" className="btn btn-primary knopf-gross" onClick={() => startRef.current()}>
            Spielen
          </button>
          {!vollbild && (
            <button
              type="button"
              className="btn btn-secondary knopf-gross spiel__vollbild-start"
              onClick={() => {
                vollbildAn();
                startRef.current();
              }}
            >
              Im Vollbild spielen
            </button>
          )}
          <span className="spiel__hinweis">Springen mit Leertaste oder Tippen</span>
        </div>
      )}
      {vollbild && ende && (
        <div className="spiel__ende">
          <button type="button" className="btn btn-primary knopf-gross" onClick={() => nochmalRef.current()}>
            Nochmal
          </button>
          <button type="button" className="btn btn-secondary knopf-gross" onClick={vollbildAus}>
            Vollbild beenden
          </button>
        </div>
      )}
      {(gestartet || vollbild) && !(vollbild && ende) && (
        <button
          type="button"
          className="spiel__umschalter"
          onClick={vollbild ? vollbildAus : vollbildAn}
          aria-label={vollbild ? "Vollbild beenden" : "Im Vollbild spielen"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {vollbild ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 8V3h5M12 3h5v5M17 12v5h-5M8 17H3v-5" />}
          </svg>
        </button>
      )}
      {vollbild && <p className="spiel__drehen">Handy quer halten, dann wird das Spielfeld größer.</p>}
      <p className="nur-vorlesen" aria-live="polite">
        {ansage}
      </p>
    </div>
  );
}
