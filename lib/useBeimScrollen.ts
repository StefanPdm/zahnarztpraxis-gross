"use client";

import { useEffect, useEffectEvent } from "react";

/**
 * Ruft `pruefe` einmal sofort und danach höchstens einmal pro Bildschirm-
 * Frame beim Scrollen und bei Größenänderungen auf.
 *
 * `schluessel` startet die Messung neu — für Layout-Komponenten den Pfad
 * übergeben, sonst messen sie nach einem Seitenwechsel die alte Seite.
 */
export function useBeimScrollen(pruefe: () => void, schluessel?: unknown) {
  const lauf = useEffectEvent(pruefe);

  useEffect(() => {
    let angefordert = false;
    const imNaechstenFrame = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(() => {
        angefordert = false;
        lauf();
      });
    };

    imNaechstenFrame();
    window.addEventListener("scroll", imNaechstenFrame, { passive: true });
    window.addEventListener("resize", imNaechstenFrame, { passive: true });
    return () => {
      window.removeEventListener("scroll", imNaechstenFrame);
      window.removeEventListener("resize", imNaechstenFrame);
    };
  }, [schluessel]);
}
