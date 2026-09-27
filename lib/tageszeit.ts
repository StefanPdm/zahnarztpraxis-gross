/**
 * Setzt `<html data-tageszeit="morgen|mittag|abend|nacht">` nach der Uhrzeit
 * in Potsdam. Das Tageslicht in der Hero liest davon (bausteine.css): morgens
 * hell von links, mittags von oben, abends warm von rechts, nachts kaum.
 *
 * Als Inline-Skript im <head> des Root-Layouts, nicht als Effekt in einer
 * Komponente: So steht das Attribut, bevor die Seite zum ersten Mal
 * gezeichnet wird — sonst sähe man erst das Mittagslicht und dann einen
 * Sprung. Das Layout bleibt beim Seitenwechsel bestehen, das Attribut also
 * auch. Ohne Skript fehlt es, dann gilt das Mittagslicht.
 *
 * Die CSP erlaubt Inline-Skripte ohnehin (next.config.ts, für Next selbst).
 *
 * `en-GB` statt `de-DE`: Die deutsche Formatierung hängt „Uhr" an („21 Uhr"),
 * die Umwandlung in eine Zahl ergäbe dann NaN — und jede Stunde wäre Abend.
 */
export const TAGESZEIT_SKRIPT = `try{var h=parseInt(new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Berlin",hour:"2-digit",hourCycle:"h23"}).format(new Date()),10);document.documentElement.dataset.tageszeit=h<5||h>=21?"nacht":h<10?"morgen":h<16?"mittag":"abend"}catch(e){}`;
