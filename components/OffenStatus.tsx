'use client';

import { useSyncExternalStore } from 'react';
import { oeffnungsstatus, type Wochenplan } from '@/lib/oeffnungsstatus';

/*
  „Jetzt geöffnet · bis 13:00" — Notfallleiste und Sprechzeiten.

  Die Seiten sind statisch gebaut; welche Uhrzeit gerade ist, weiß erst der
  Browser. Auf dem Server und im ersten Bild steht deshalb ein unsichtbarer
  Platzhalter in Länge des Kurztexts: Der Platz ist reserviert, nichts
  springt, wenn der Status erscheint. Danach wird jede halbe Minute neu
  gerechnet — wer die Seite über Mittag offen lässt, sieht die Pause.

  Die Zeiten kommen als Prop von einer Server-Komponente: lib/praxis.ts
  gehört nicht in eine Client-Datei (CLAUDE.md).
*/

const abonnieren = (melden: () => void) => {
  const takt = window.setInterval(melden, 30_000);
  return () => window.clearInterval(takt);
};

export default function OffenStatus({
  plan,
  schliesstage,
  kurz = false,
}: {
  plan: Wochenplan;
  schliesstage: readonly string[];
  kurz?: boolean;
}) {
  // Als Zeichenkette, damit der Schnappschuss zwischen zwei Takten gleich
  // bleibt — ein neues Objekt bei jedem Aufruf ließe React endlos rendern.
  const schnappschuss = useSyncExternalStore(
    abonnieren,
    () => {
      const s = oeffnungsstatus(plan, schliesstage);
      return `${s.offen ? 1 : 0}|${kurz ? s.kurz : s.lang}`;
    },
    () => '',
  );

  const klasse = `offen-status${kurz ? ' offen-status--kurz' : ''}`;
  if (!schnappschuss) {
    return (
      <span
        className={klasse}
        aria-hidden='true'
        style={{ visibility: 'hidden' }}>
        <span className='offen-status__punkt' />
        Jetzt geschlossen
      </span>
    );
  }

  const [offen, text] = schnappschuss.split('|');
  return (
    <span
      className={klasse}
      data-offen={offen === '1' ? '' : undefined}>
      <span
        className='offen-status__punkt'
        aria-hidden='true'
      />
      {text}
    </span>
  );
}
