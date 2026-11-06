/*
  Zeichnungen des GROSSELINO-Spiels auf <canvas>: Figur, Süßigkeiten,
  Zuckermonster und die Potsdam-Kulisse. Reine Zeichenfunktionen ohne
  Spiellogik — die steht in components/GrosselinoSpielfeld.tsx.

  Alles als feine Linienzeichnung in den Farben des Designs. Koordinaten in
  CSS-Pixeln; `u` ist immer die Bodenlinie.
*/

export type Farben = {
  linie: string; // Kontur der Spielfiguren
  zart: string; // Zierlinien, Kontur der Kulisse
  flaeche: string; // Fläche der Kulisse
  tinte: string; // Augen, Nase, Schrift
  teiler: string; // Boden, Wolken
  text: string; // Nebentext
  hell: string; // Füllung der Figuren
};

export type Art = "bonbon" | "lolli" | "dose" | "wuerfel";
export const MASSE: Record<Art, { b: number; h: number }> = {
  bonbon: { b: 46, h: 22 },
  lolli: { b: 24, h: 58 },
  dose: { b: 26, h: 42 },
  wuerfel: { b: 16, h: 16 },
};

export type Wahrzeichen = "sanssouci" | "hollaender" | "bruecke" | "stadtschloss" | "tor";
export type Fuellbau = "baum" | "haeuser";
export const WAHRZEICHEN_BREITE: Record<Wahrzeichen, number> = {
  sanssouci: 210,
  hollaender: 148,
  bruecke: 240,
  stadtschloss: 190,
  tor: 124,
};
/** Breite eines Füllbaus; `v` (0–1) wählt die Spielart. */
export function fuellbauBreite(art: Fuellbau, v: number) {
  return art === "baum" ? 26 : (v > 0.5 ? 3 : 2) * 26;
}

/** Monster: Grundmaße bei Größe 1. */
export const MONSTER = { b: 64, h: 46 };

export function maler(ctx: CanvasRenderingContext2D, f: Farben) {
  const strich = (farbe: string, breite: number) => {
    ctx.strokeStyle = farbe;
    ctx.lineWidth = breite;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };
  const ellipse = (cx: number, cy: number, rx: number, ry: number, fuellung: string | null, rand: string | null, lw = 3.4) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    if (fuellung) {
      ctx.fillStyle = fuellung;
      ctx.fill();
    }
    if (rand) {
      strich(rand, lw);
      ctx.stroke();
    }
  };
  const linie = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  /* ── GROSSELINO ────────────────────────────────────────────────────────
     Nachgezeichnet nach der SVG-Figur in components/Grosselino.tsx
     (100er-Raster, Füße enden bei y = 93,5). */
  const baer = (
    ox: number,
    oy: number,
    groesse: number,
    z: { zeit: number; laeuft: boolean; amBoden: boolean; aus: boolean; jubel: boolean },
  ) => {
    const k = groesse / 100;
    const phase = Math.sin(z.zeit * 22);
    const beinL = z.laeuft && z.amBoden ? -Math.max(0, phase) * 5 : z.laeuft ? -3 : 0;
    const beinR = z.laeuft && z.amBoden ? -Math.max(0, -phase) * 5 : z.laeuft ? -3 : 0;
    const armeOben = !z.amBoden || z.jubel;

    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(k, k);
    ellipse(41, 88 + beinL, 7.5, 5.5, f.hell, f.linie);
    ellipse(59, 88 + beinR, 7.5, 5.5, f.hell, f.linie);
    ellipse(50, 71, 17, 16, f.hell, f.linie);
    ellipse(50, 73.5, 9, 8, null, f.zart, 2);
    strich(f.linie, 3.4);
    linie(35, 64, 23, z.jubel ? 44 : armeOben ? 52 : 60);
    linie(66, 64, 79, z.jubel ? 42 : armeOben ? 49 : 57);
    ellipse(31, 25, 10, 10, f.hell, f.linie);
    ellipse(69, 25, 10, 10, f.hell, f.linie);
    ellipse(31, 25, 4, 4, null, f.zart, 2);
    ellipse(69, 25, 4, 4, null, f.zart, 2);
    ellipse(50, 37, 21, 21, f.hell, f.linie);
    ellipse(50, 45, 10, 7.5, f.hell, f.zart, 2);
    if (z.aus) {
      strich(f.tinte, 2.4);
      for (const ax of [41, 59]) {
        ctx.beginPath();
        ctx.arc(ax, 32, 3, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();
      }
    } else {
      ellipse(41, 33, 2.6, 2.6, f.tinte, null);
      ellipse(59, 33, 2.6, 2.6, f.tinte, null);
    }
    ellipse(50, 41.5, 3.2, 2.4, f.tinte, null);
    strich(f.tinte, 2.4);
    ctx.beginPath();
    if (z.aus) {
      ctx.moveTo(44, 50);
      ctx.quadraticCurveTo(50, 47, 56, 50);
    } else {
      ctx.moveTo(44, 47.5);
      ctx.quadraticCurveTo(50, z.jubel ? 55 : 52.5, 56, 47.5);
    }
    ctx.stroke();
    ctx.restore();
  };

  /* ── Süßigkeiten ───────────────────────────────────────────────────── */
  const bonbonForm = (mx: number, my: number, rx: number, ry: number, ende: number, lw: number) => {
    strich(f.linie, lw);
    ctx.fillStyle = f.hell;
    for (const seite of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(mx + seite * rx * 0.7, my);
      ctx.lineTo(mx + seite * (rx + ende), my - ry * 0.95);
      ctx.lineTo(mx + seite * (rx + ende), my + ry * 0.95);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ellipse(mx, my, rx, ry, f.hell, f.linie, lw);
  };

  const hindernis = (art: Art, x: number, u: number) => {
    const { b, h } = MASSE[art];
    const oben = u - h;
    if (art === "bonbon") {
      const mx = x + b / 2;
      const my = u - h / 2;
      bonbonForm(mx, my, 13, h / 2 - 0.5, 10, 2);
      strich(f.zart, 2);
      linie(mx - 5, my + 7, mx + 1, my - 8);
      linie(mx + 2, my + 8, mx + 7, my - 4);
    } else if (art === "lolli") {
      const mx = x + b / 2;
      strich(f.linie, 2);
      linie(mx, u, mx, oben + 22);
      ellipse(mx, oben + 11, 11, 11, f.hell, f.linie, 2);
      strich(f.zart, 2);
      ctx.beginPath();
      ctx.arc(mx, oben + 11, 6, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mx, oben + 11, 2.5, Math.PI, Math.PI * 2.5);
      ctx.stroke();
    } else if (art === "dose") {
      ctx.beginPath();
      ctx.roundRect(x, oben, b, h, 4);
      ctx.fillStyle = f.hell;
      ctx.fill();
      strich(f.linie, 2);
      ctx.stroke();
      linie(x + 6, oben - 3, x + b - 6, oben - 3);
      strich(f.zart, 2);
      linie(x + 4, oben + h * 0.42, x + b - 4, oben + h * 0.42);
      linie(x + 4, oben + h * 0.62, x + b - 4, oben + h * 0.62);
    } else {
      // Zuckerwürfel, rollt
      ctx.save();
      ctx.translate(x + b / 2, u - h / 2);
      ctx.rotate(x * 0.06);
      ctx.beginPath();
      ctx.roundRect(-b / 2, -h / 2, b, h, 3);
      ctx.fillStyle = f.hell;
      ctx.fill();
      strich(f.linie, 2);
      ctx.stroke();
      ctx.fillStyle = f.zart;
      for (const [px, py] of [[-3, -3], [3, 2], [-2, 4], [4, -4]]) ctx.fillRect(px - 1, py - 1, 2, 2);
      ctx.restore();
    }
  };

  const buerste = (x: number, y: number, golden = false) => {
    strich(f.linie, golden ? 2.6 : 2);
    linie(x, y, x + 28, y);
    ctx.beginPath();
    ctx.roundRect(x + 28, y - 3, 16, 6, 3);
    ctx.fillStyle = golden ? f.zart : f.hell;
    ctx.fill();
    ctx.stroke();
    strich(golden ? f.linie : f.zart, 2);
    for (let i = 0; i < 4; i++) linie(x + 31 + i * 3.5, y - 4, x + 31 + i * 3.5, y - 10);
  };

  /* ── Zuckermonster ─────────────────────────────────────────────────────
     Ein großes Bonbon mit grimmigem, aber freundlichem Gesicht. Die Krone
     trägt nur der Endgegner. `platzen` (0–1) lässt es zerfallen. */
  const monster = (x: number, unten: number, g: number, z: { zeit: number; krone: boolean; platzen: number }) => {
    const cx = x + (MONSTER.b / 2) * g;
    const cy = unten - 25 * g;
    ctx.save();
    if (z.platzen > 0) {
      ctx.globalAlpha = Math.max(0, 1 - z.platzen);
      ctx.translate(cx, cy);
      ctx.scale(1 + z.platzen * 0.6, 1 + z.platzen * 0.6);
      ctx.translate(-cx, -cy);
    }
    // Füße
    const tritt = Math.sin(z.zeit * 16) * 2 * g;
    ellipse(cx - 8 * g, unten - 3 * g + tritt, 6 * g, 3.5 * g, f.hell, f.linie, 2);
    ellipse(cx + 8 * g, unten - 3 * g - tritt, 6 * g, 3.5 * g, f.hell, f.linie, 2);
    bonbonForm(cx, cy, 21 * g, 20 * g, 11 * g, 2.4);
    // Streifen
    strich(f.zart, 2.2);
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, 20 * g, 19 * g, 0, 0, Math.PI * 2);
    ctx.clip();
    for (const d of [-22, -8, 22]) linie(cx + (d - 8) * g, cy + 20 * g, cx + (d + 8) * g, cy - 20 * g);
    ctx.restore();
    // Gesicht
    ellipse(cx - 7 * g, cy - 2 * g, 4.2 * g, 4.6 * g, f.hell, f.linie, 1.6);
    ellipse(cx + 7 * g, cy - 2 * g, 4.2 * g, 4.6 * g, f.hell, f.linie, 1.6);
    const blick = Math.sin(z.zeit * 2) * 1.2 * g;
    ellipse(cx - 8 * g + blick, cy - 1 * g, 2 * g, 2 * g, f.tinte, null);
    ellipse(cx + 6 * g + blick, cy - 1 * g, 2 * g, 2 * g, f.tinte, null);
    strich(f.tinte, 2.2);
    linie(cx - 12 * g, cy - 10 * g, cx - 3 * g, cy - 7 * g);
    linie(cx + 12 * g, cy - 10 * g, cx + 3 * g, cy - 7 * g);
    // Grummelmund mit einem Zahn
    ctx.beginPath();
    ctx.moveTo(cx - 7 * g, cy + 10 * g);
    ctx.quadraticCurveTo(cx, cy + 5 * g, cx + 7 * g, cy + 10 * g);
    ctx.stroke();
    strich(f.linie, 1.4);
    ctx.beginPath();
    ctx.rect(cx - 1.5 * g, cy + 7.4 * g, 3 * g, 2.6 * g);
    ctx.fillStyle = f.hell;
    ctx.fill();
    ctx.stroke();
    if (z.krone) {
      const ky = cy - 19 * g;
      ctx.beginPath();
      ctx.moveTo(cx - 10 * g, ky);
      ctx.lineTo(cx - 12 * g, ky - 11 * g);
      ctx.lineTo(cx - 5 * g, ky - 5 * g);
      ctx.lineTo(cx, ky - 13 * g);
      ctx.lineTo(cx + 5 * g, ky - 5 * g);
      ctx.lineTo(cx + 12 * g, ky - 11 * g);
      ctx.lineTo(cx + 10 * g, ky);
      ctx.closePath();
      ctx.fillStyle = f.zart;
      ctx.fill();
      strich(f.linie, 2);
      ctx.stroke();
    }
    ctx.restore();
    // Funken beim Platzen
    if (z.platzen > 0 && z.platzen < 1) {
      strich(f.linie, 2);
      for (let i = 0; i < 8; i++) {
        const w = (i / 8) * Math.PI * 2;
        const r1 = (24 + z.platzen * 30) * g;
        const r2 = r1 + 8 * g;
        linie(cx + Math.cos(w) * r1, cy + Math.sin(w) * r1, cx + Math.cos(w) * r2, cy + Math.sin(w) * r2);
      }
    }
  };

  /* ── Wolken ────────────────────────────────────────────────────────── */
  const wolke = (x: number, y: number, g: number) => {
    strich(f.teiler, 1.5);
    ctx.beginPath();
    ctx.moveTo(x - 30 * g, y);
    ctx.arc(x - 14 * g, y - 2 * g, 12 * g, Math.PI * 0.95, Math.PI * 1.75);
    ctx.arc(x + 6 * g, y - 6 * g, 15 * g, Math.PI * 1.2, Math.PI * 1.95);
    ctx.arc(x + 24 * g, y - 1 * g, 9 * g, Math.PI * 1.35, Math.PI * 2.05);
    ctx.lineTo(x - 30 * g, y);
    ctx.stroke();
  };

  /* ── Potsdam-Kulisse ───────────────────────────────────────────────────
     Fläche hell und halb durchsichtig, Kontur in Zartgold: Hintergrund,
     kein Hindernis. */
  const umriss = (pfad: () => void, fuellen = true) => {
    ctx.beginPath();
    pfad();
    if (fuellen) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = f.flaeche;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    strich(f.zart, 1.2);
    ctx.stroke();
  };

  const sanssouci = (x: number, u: number) => {
    // Weinbergterrassen mit Mitteltreppe
    umriss(() => {
      ctx.moveTo(x + 10, u);
      ctx.lineTo(x + 32, u - 36);
      ctx.lineTo(x + 178, u - 36);
      ctx.lineTo(x + 200, u);
      ctx.closePath();
    });
    umriss(() => {
      for (const h of [9, 18, 27]) {
        const einzug = 10 + (h / 36) * 22;
        ctx.moveTo(x + einzug, u - h);
        ctx.lineTo(x + 210 - einzug, u - h);
      }
      ctx.moveTo(x + 99, u);
      ctx.lineTo(x + 99, u - 36);
      ctx.moveTo(x + 111, u);
      ctx.lineTo(x + 111, u - 36);
    }, false);
    // Schloss mit Kuppel
    umriss(() => ctx.rect(x + 40, u - 56, 130, 20));
    umriss(() => {
      ctx.moveTo(x + 93, u - 56);
      ctx.lineTo(x + 93, u - 62);
      ctx.arc(x + 105, u - 62, 12, Math.PI, 0);
      ctx.lineTo(x + 117, u - 56);
    });
    umriss(() => {
      ctx.moveTo(x + 105, u - 74);
      ctx.lineTo(x + 105, u - 79);
      for (let i = 0; i < 9; i++) {
        if (i === 4) continue;
        const fx = x + 50 + i * 13;
        ctx.moveTo(fx, u - 41);
        ctx.lineTo(fx, u - 50);
      }
    }, false);
  };

  const hollaender = (x: number, u: number) => {
    for (let i = 0; i < 4; i++) {
      const hx = x + i * 38;
      const hoch = i % 2 ? 36 : 32;
      // Backsteinhaus mit geschwungenem Giebel
      umriss(() => {
        ctx.moveTo(hx, u);
        ctx.lineTo(hx, u - hoch);
        ctx.lineTo(hx + 4, u - hoch);
        ctx.quadraticCurveTo(hx + 4, u - hoch - 10, hx + 10, u - hoch - 12);
        ctx.lineTo(hx + 12, u - hoch - 18);
        ctx.quadraticCurveTo(hx + 17, u - hoch - 25, hx + 22, u - hoch - 18);
        ctx.lineTo(hx + 24, u - hoch - 12);
        ctx.quadraticCurveTo(hx + 30, u - hoch - 10, hx + 30, u - hoch);
        ctx.lineTo(hx + 34, u - hoch);
        ctx.lineTo(hx + 34, u);
      });
      umriss(() => {
        ctx.moveTo(hx + 13, u);
        ctx.lineTo(hx + 13, u - 9);
        ctx.arc(hx + 17, u - 9, 4, Math.PI, 0);
        ctx.lineTo(hx + 21, u);
        ctx.rect(hx + 7, u - hoch + 6, 6, 7);
        ctx.rect(hx + 21, u - hoch + 6, 6, 7);
      }, false);
    }
  };

  const bruecke = (x: number, u: number) => {
    const deck = u - 16;
    umriss(() => {
      ctx.moveTo(x, deck);
      ctx.lineTo(x + 240, deck);
      ctx.rect(x + 66, deck, 8, 16);
      ctx.rect(x + 166, deck, 8, 16);
    }, false);
    // Stahlbögen mit Hängern: Mitte hoch, Seitenfelder flach
    const bogen = (a: number, b: number, hoehe: number, haenger: number) => {
      umriss(() => {
        ctx.moveTo(a, deck);
        ctx.quadraticCurveTo((a + b) / 2, deck - hoehe * 2, b, deck);
        for (let i = 1; i < haenger; i++) {
          const t = i / haenger;
          const hx = a + (b - a) * t;
          ctx.moveTo(hx, deck);
          ctx.lineTo(hx, deck - 4 * hoehe * t * (1 - t));
        }
      }, false);
    };
    bogen(x + 4, x + 70, 16, 5);
    bogen(x + 70, x + 170, 34, 8);
    bogen(x + 170, x + 236, 16, 5);
  };

  const stadtschloss = (x: number, u: number) => {
    umriss(() => ctx.rect(x, u - 40, 190, 40));
    umriss(() => ctx.rect(x + 3, u - 45, 184, 5));
    // Fortunaportal mit Kuppel und Figur
    umriss(() => {
      ctx.moveTo(x + 82, u - 45);
      ctx.lineTo(x + 82, u - 72);
      ctx.arc(x + 95, u - 72, 13, Math.PI, 0);
      ctx.lineTo(x + 108, u - 45);
    });
    umriss(() => {
      ctx.moveTo(x + 95, u - 85);
      ctx.lineTo(x + 95, u - 92);
      ctx.moveTo(x + 98, u - 95);
      ctx.arc(x + 95, u - 95, 3, 0, Math.PI * 2);
      ctx.moveTo(x + 89, u);
      ctx.lineTo(x + 89, u - 14);
      ctx.arc(x + 95, u - 14, 6, Math.PI, 0);
      ctx.lineTo(x + 101, u);
      for (let i = 0; i < 12; i++) {
        const fx = x + 12 + i * 14 + (i >= 6 ? 14 : 0);
        ctx.moveTo(fx, u - 32);
        ctx.lineTo(fx, u - 22);
      }
    }, false);
  };

  const tor = (x: number, u: number) => {
    umriss(() => ctx.rect(x, u - 64, 120, 64));
    umriss(() => {
      ctx.moveTo(x - 4, u - 64);
      ctx.lineTo(x + 124, u - 64);
      ctx.rect(x + 4, u - 72, 112, 8);
      ctx.moveTo(x + 46, u);
      ctx.lineTo(x + 46, u - 34);
      ctx.arc(x + 60, u - 34, 14, Math.PI, 0);
      ctx.lineTo(x + 74, u);
      for (const sx of [12, 24, 96, 108]) {
        ctx.moveTo(x + sx, u);
        ctx.lineTo(x + sx, u - 56);
      }
    }, false);
  };

  /** Zwischen den Wahrzeichen: Bäume und schlichte Bürgerhäuser, niedriger. */
  const baum = (x: number, u: number, v: number) => {
    umriss(() => {
      ctx.moveTo(x + 13, u);
      ctx.lineTo(x + 13, u - 12);
    }, false);
    umriss(() => {
      if (v > 0.5) ctx.ellipse(x + 13, u - 30, 8, 18, 0, 0, Math.PI * 2); // Pappel
      else ctx.arc(x + 13, u - 23 - v * 6, 11 + v * 4, 0, Math.PI * 2);
    });
  };
  const haeuser = (x: number, u: number, v: number) => {
    const anzahl = v > 0.5 ? 3 : 2;
    for (let i = 0; i < anzahl; i++) {
      const hx = x + i * 26;
      const hoch = 20 + ((i * 7 + Math.round(v * 10)) % 3) * 6;
      umriss(() => {
        ctx.moveTo(hx, u);
        ctx.lineTo(hx, u - hoch);
        ctx.lineTo(hx + 13, u - hoch - 12);
        ctx.lineTo(hx + 26, u - hoch);
        ctx.lineTo(hx + 26, u);
      });
      umriss(() => ctx.rect(hx + 9, u - hoch + 5, 8, 7), false);
    }
  };

  const WAHRZEICHEN: Record<Wahrzeichen, (x: number, u: number) => void> = {
    sanssouci,
    hollaender,
    bruecke,
    stadtschloss,
    tor,
  };
  const bau = (art: Wahrzeichen | Fuellbau, x: number, u: number, v: number) => {
    if (art === "baum") baum(x, u, v);
    else if (art === "haeuser") haeuser(x, u, v);
    else WAHRZEICHEN[art](x, u);
  };

  return { strich, linie, baer, hindernis, buerste, monster, wolke, bau };
}
