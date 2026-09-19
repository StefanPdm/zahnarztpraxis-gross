"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBeimScrollen } from "@/lib/useBeimScrollen";

/*
  Parallax und Zählwerke für die jeweils angezeigte Seite.

  Liegt im Layout und bleibt beim Seitenwechsel bestehen — deshalb hängt
  alles am Pfad: nach jeder Navigation werden die Elemente der neuen Seite
  gesucht. Vorher liefen die Effekte nur auf der zuerst geladenen Seite.

  Ohne Skript und bei reduzierter Bewegung steht überall der Endwert im
  Markup — Suchmaschinen und Screenreader lesen nie „0".
*/

export default function ScrollEffekte() {
  const pfad = usePathname();

  /* — Parallax (Formel aus site.v2.js: begrenzt auf den Bildüberstand) — */
  useBeimScrollen(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const el of document.querySelectorAll<HTMLElement>(".parallax-img")) {
      const rahmen = el.parentElement;
      if (!rahmen) continue;
      const kasten = rahmen.getBoundingClientRect();
      if (kasten.bottom < -200 || kasten.top > window.innerHeight + 200) continue;
      const abstand = kasten.top + kasten.height / 2 - window.innerHeight / 2;
      const spiel = (el.offsetHeight - kasten.height) / 2;
      const versatz = Math.max(-spiel, Math.min(spiel, -abstand * 0.06));
      el.style.transform = `translate3d(0,${versatz.toFixed(1)}px,0)`;
    }
  }, pfad);

  /* — Zählwerke: <span class="countup" data-to data-suffix data-decimals data-static> — */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elemente = document.querySelectorAll<HTMLElement>(".countup[data-to]");
    if (!elemente.length) return;

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          beobachter.unobserve(e.target);
          zaehle(e.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    elemente.forEach((el) => beobachter.observe(el));
    return () => beobachter.disconnect();
  }, [pfad]);

  return null;
}

function zaehle(el: HTMLElement) {
  const ziel = Number(el.dataset.to);
  if (!Number.isFinite(ziel) || ziel <= 0) return;
  const endtext = el.textContent ?? "";
  const nachkomma = Number(el.dataset.decimals ?? 0);
  const zusatz = el.dataset.suffix ?? "";
  // Tausenderpunkt nur, wenn der Endwert ihn trägt: „1.200" ja, die Jahreszahl „1991" nein.
  const gruppieren = /\d\.\d{3}/.test(el.dataset.static ?? endtext);
  const format = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: nachkomma,
    maximumFractionDigits: nachkomma,
    useGrouping: gruppieren,
  });

  const dauer = 1100;
  const start = performance.now();
  const schritt = (jetzt: number) => {
    const t = Math.min(1, (jetzt - start) / dauer);
    const weich = 1 - Math.pow(1 - t, 3);
    el.textContent = t < 1 ? format.format(ziel * weich) + zusatz : endtext;
    if (t < 1) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
}
