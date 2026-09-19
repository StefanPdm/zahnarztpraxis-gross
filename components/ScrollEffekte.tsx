"use client";

import { useEffect } from "react";

/*
  Ersetzt die Scroll-Teile aus legacy/site.v2.js.

  Die Vorlage hatte sieben einzelne Listener plus einen MutationObserver —
  Notlösungen der Ursprungsumgebung, die das Markup nach dem Skriptlauf neu
  aufgebaut hat. Hier reicht ein gedrosselter Listener für den Parallax und
  je ein IntersectionObserver für Einblenden und Zählwerke.
*/
export default function ScrollEffekte() {
  useEffect(() => {
    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* — Parallax — */
    const bilder = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax-img"),
    );
    let angefordert = false;

    const parallax = () => {
      angefordert = false;
      for (const bild of bilder) {
        const rahmen = bild.parentElement;
        if (!rahmen) continue;
        const kasten = rahmen.getBoundingClientRect();
        if (kasten.bottom < 0 || kasten.top > window.innerHeight) continue;
        const fortschritt =
          (window.innerHeight - kasten.top) / (window.innerHeight + kasten.height);
        bild.style.transform = `translateY(${(fortschritt - 0.5) * 60}px)`;
      }
    };

    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(parallax);
    };

    if (bilder.length && !reduziert) {
      parallax();
      window.addEventListener("scroll", beiScroll, { passive: true });
      window.addEventListener("resize", beiScroll, { passive: true });
    }

    /* — Abschnitte einblenden (Klasse .rv) — */
    const einblenden = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          einblenden.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of document.querySelectorAll(".rv")) einblenden.observe(el);

    /* — Zählwerke (Elemente mit data-zaehl) — */
    const zaehlen = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          zaehlen.unobserve(el);
          const ziel = Number(el.dataset.zaehl ?? "0");
          if (!ziel || reduziert) {
            el.textContent = String(ziel || el.textContent);
            continue;
          }
          const dauer = 1100;
          const start = performance.now();
          const schritt = (jetzt: number) => {
            const t = Math.min(1, (jetzt - start) / dauer);
            const weich = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(ziel * weich).toLocaleString("de-DE");
            if (t < 1) requestAnimationFrame(schritt);
          };
          requestAnimationFrame(schritt);
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    for (const el of document.querySelectorAll("[data-zaehl]")) zaehlen.observe(el);

    return () => {
      window.removeEventListener("scroll", beiScroll);
      window.removeEventListener("resize", beiScroll);
      einblenden.disconnect();
      zaehlen.disconnect();
    };
  }, []);

  return null;
}
