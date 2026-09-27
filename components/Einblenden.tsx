'use client';

import { useEffect } from 'react';

/*
  Abschnittsköpfe und Kennzahlen blenden beim ersten Hineinscrollen ein
  (Stile in bausteine.css, `[data-einblenden]`).

  Versteckt wird erst hier, und nur, was beim Laden noch unterhalb des
  Fensters liegt. So steht ohne Skript alles da, und was man sofort sieht,
  flackert nicht: Es wird nie ausgeblendet, um dann wieder aufzutauchen.

  Einmalig — wer zurückscrollt, sieht keine zweite Vorstellung.
*/
export default function Einblenden() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elemente = [...document.querySelectorAll<HTMLElement>('[data-einblenden]')].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (!elemente.length) return;

    for (const el of elemente) el.classList.add('wartet');
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          e.target.classList.remove('wartet');
          beobachter.unobserve(e.target);
        }
      },
      // Erst wenn der Kopf ein Stück im Bild ist — sonst läuft die Bewegung
      // am unteren Rand ab, wo niemand hinsieht.
      { rootMargin: '0px 0px -10% 0px' },
    );
    for (const el of elemente) beobachter.observe(el);

    return () => {
      beobachter.disconnect();
      for (const el of elemente) el.classList.remove('wartet');
    };
  }, []);

  return null;
}
