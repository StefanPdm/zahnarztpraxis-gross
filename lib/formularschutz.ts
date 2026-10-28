import { praxis } from "@/lib/praxis";

/**
 * Schutz für die Formular-Routen (app/api/termin, app/api/bewerbung):
 * nur Anfragen von der eigenen Seite, und nicht beliebig viele pro IP.
 * Nur serverseitig — liest lib/praxis.ts.
 */

/**
 * Nur Anfragen von der eigenen Seite annehmen (Schutz vor fremden Formularen).
 * Verglichen wird mit dem Host der Anfrage — hinter einem Proxy steht der
 * öffentliche Name in x-forwarded-host — und mit der Praxis-Domain samt und
 * ohne www.
 */
export function vonEigenerSeite(request: Request): boolean {
  const herkunft = request.headers.get("origin");
  if (!herkunft) return false;
  const praxisHost = new URL(praxis.domain).host;
  const erlaubt = new Set(
    [
      new URL(request.url).host,
      request.headers.get("host"),
      request.headers.get("x-forwarded-host")?.split(",")[0].trim(),
      praxisHost,
      praxisHost.replace(/^www./, ""),
    ].filter(Boolean),
  );
  try {
    return erlaubt.has(new URL(herkunft).host);
  } catch {
    return false;
  }
}

/**
 * Absender-IP. Netlify setzt x-nf-client-connection-ip selbst und sagt zu,
 * ihn beizubehalten; x-forwarded-for kann der Absender mitschicken und
 * damit jede Begrenzung umgehen — nur noch Rückfall, etwa lokal.
 */
export function absenderIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unbekannt"
  );
}

/**
 * Der Name steht in der Bestätigung, die an eine frei eingegebene Adresse
 * geht. Damit niemand über das Formular Werbung an Fremde verschickt, nur
 * Buchstaben, Leerzeichen, Punkt, Bindestrich und Apostroph — keine Ziffern,
 * keine Links, nichts, was wie eine Domain aussieht („gewinn.com“).
 */
export function nameUnverdaechtig(name: string): boolean {
  return /^[\p{L}\p{M}][\p{L}\p{M}\p{Zs}.'’-]*$/u.test(name) && !/\.\p{L}{2,}/u.test(name);
}

/** Antwort, wenn der Name nicht durchgeht. */
export const NAME_HINWEIS = "Bitte im Feld „Name“ nur den Namen eintragen — ohne Ziffern oder Links.";

/** Schlüssel für eine Obergrenze über alle Absender hinweg. */
export const ALLE = "alle";

/**
 * Einfache Begrenzung pro IP — je Formular eine eigene, damit eine
 * Terminanfrage nicht das Kontingent für die Bewerbung aufbraucht.
 * Reicht für eine Praxisseite.
 */
export function begrenzung(maximum: number, fensterMs: number) {
  const zugriffe = new Map<string, number[]>();
  return function zuHaeufig(ip: string): boolean {
    const jetzt = Date.now();
    // Abgelaufene Einträge anderer IPs mit aufräumen, damit die Liste nicht wächst.
    if (zugriffe.size > 1000) {
      for (const [schluessel, zeiten] of zugriffe) {
        if (zeiten.every((z) => jetzt - z >= fensterMs)) zugriffe.delete(schluessel);
      }
    }
    const bisher = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < fensterMs);
    bisher.push(jetzt);
    zugriffe.set(ip, bisher);
    return bisher.length > maximum;
  };
}
