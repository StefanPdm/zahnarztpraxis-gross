'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useBeimScrollen } from '@/lib/useBeimScrollen';

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

  /*
    Sprungziele zuverlässig anlaufen — betrifft vor allem die vielen
    „Termin anfragen"-Knöpfe, die seit dem Zusammenlegen der Termin-Seite auf
    /#termin zeigen.

    Zwei Lücken schließt das:
    1. Steht die Adresse bereits auf dem Anker, tut ein weiterer Klick von
       sich aus nichts. Nur dann greifen wir ein — sonst bleibt das normale
       Verhalten des Browsers samt Fokuswechsel erhalten (wichtig für den
       Sprunglink).
    2. Nach einem Seitenwechsel mit Anker in der Adresse springen wir nach
       dem ersten Bild selbst ans Ziel.
  */
  useEffect(() => {
    const sanft = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? ('auto' as const) : ('smooth' as const);

    const beiKlick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.('a');
      const ziel = link?.getAttribute('href') ?? '';
      const [seite, anker] = ziel.split('#');
      if (!anker || (seite !== '' && seite !== pfad)) return;
      if (window.location.hash !== `#${anker}`) return; // sonst macht der Browser es selbst
      const element = document.getElementById(anker);
      if (!element) return;
      e.preventDefault();
      element.scrollIntoView({ behavior: sanft(), block: 'start' });
    };

    /*
      In der Erfassungsphase (`true`), also bevor React und der Router den
      Klick sehen. Der <Link> von Next ruft selbst `preventDefault()` auf und
      schiebt die Route nach; ein Handler danach fände nur noch einen
      abgeräumten Klick vor und liefe ins Leere — genau daran scheiterte der
      Knopf in der Fußzeile beim zweiten Mal. Unterbinden wir den Klick hier,
      steigt der Router seinerseits aus (er prüft `defaultPrevented`), und der
      Sprung liegt in einer Hand.
    */
    document.addEventListener('click', beiKlick, true);
    return () => document.removeEventListener('click', beiKlick, true);
  }, [pfad]);

  useEffect(() => {
    const anker = window.location.hash.slice(1);
    if (!anker) return;
    let abgebrochen = false;
    // Zwei Bilder warten: Erst danach steht das Markup der neuen Seite.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (abgebrochen) return;
        document.getElementById(anker)?.scrollIntoView({ block: 'start' });
      }),
    );
    return () => {
      abgebrochen = true;
    };
  }, [pfad]);

  /* — Parallax (Formel aus site.v2.js: begrenzt auf den Bildüberstand) — */
  useBeimScrollen(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (const el of document.querySelectorAll<HTMLElement>('.parallax-img')) {
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elemente = document.querySelectorAll<HTMLElement>('.countup[data-to]');
    if (!elemente.length) return;

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          if (e.intersectionRatio < 1) continue;
          beobachter.unobserve(e.target);
          zaehle(e.target as HTMLElement);
        }
      },
      { threshold: 1 },
    );
    elemente.forEach((el) => beobachter.observe(el));
    return () => beobachter.disconnect();
  }, [pfad]);

  return null;
}

function zaehle(el: HTMLElement) {
  const ziel = Number(el.dataset.to);
  if (!Number.isFinite(ziel) || ziel <= 0) return;
  const nachkomma = Number(el.dataset.decimals ?? 0);
  const zusatz = el.dataset.suffix ?? '';
  const endtext = `${el.dataset.static ?? el.textContent ?? ''}${zusatz}`;
  // Tausenderpunkt nur, wenn der Endwert ihn trägt: „1.200" ja, die Jahreszahl „1991" nein.
  const gruppieren = /\d\.\d{3}/.test(el.dataset.static ?? endtext);
  const format = new Intl.NumberFormat('de-DE', {
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
