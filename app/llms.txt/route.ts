import { praxis, sprechzeitGruppen, tageLang, zeitenLang } from "@/lib/praxis";
import { seiten, type Seite } from "@/lib/seiten";
import { team } from "@/lib/team";

/*
  /llms.txt — kompakte Fakten für Sprachmodelle und KI-Suchen (ChatGPT,
  Claude, Perplexity, Google AI Overviews). Format nach llmstxt.org:
  Markdown, oben das Wichtigste, darunter die Seiten mit Kurzbeschreibung.

  Wird beim Build aus lib/praxis, lib/team und lib/seiten erzeugt — ändert
  sich dort etwas, stimmt diese Datei automatisch mit.
*/

export const dynamic = "force-static";

const RUBRIKEN: Seite["rubrik"][] = ["Praxis", "Behandlungen", "Besondere Anliegen", "Service", "Rechtliches"];

export function GET() {
  const url = (pfad: string) => `${praxis.domain}${pfad === "/" ? "" : pfad}`;

  const text = [
    `# ${praxis.vollerName}, Potsdam`,
    "",
    `> Familiengeführte Zahnarztpraxis in Potsdam Mitte seit ${praxis.gegruendet}. ` +
      `${praxis.behandlungszimmer} Behandlungszimmer, eigenes Zahnlabor im Haus, ` +
      `${praxis.implantate} gesetzte Implantate. Behutsam mit Angstpatienten und Kindern.`,
    "",
    "## Auf einen Blick",
    "",
    `- Adresse: ${praxis.strasse}, ${praxis.ort}`,
    `- Wichtig: Der Praxiseingang liegt auf der Rückseite des Gebäudes, nicht an der Straße.`,
    `- Telefon: ${praxis.telefon}`,
    `- E-Mail: ${praxis.email}`,
    `- Terminanfrage online: ${url("/termin")} – Rückmeldung ${praxis.antwortzeit}`,
    `- Akute Zahnschmerzen: morgens ab 8:00 anrufen; Montag bis Freitag werden Notfalltermine freigehalten.`,
    `- Außerhalb der Sprechzeiten: zahnärztlicher Notdienst der KZV Land Brandenburg, https://www.kzvlb.de/patienten/notdienstsuche`,
    "",
    "## Sprechzeiten",
    "",
    ...sprechzeitGruppen().map((g) => `- ${tageLang(g)}: ${zeitenLang(g)}`),
    "- Und nach Vereinbarung.",
    "",
    "## Behandler",
    "",
    ...team.map((m) => `- ${m.name}, ${m.rolle}: ${m.werdegang} Schwerpunkte: ${m.schwerpunkte}.`),
    "",
    ...RUBRIKEN.flatMap((rubrik) => [
      `## ${rubrik}`,
      "",
      ...seiten.filter((s) => s.rubrik === rubrik).map((s) => `- [${s.name}](${url(s.pfad)}): ${s.beschreibung}`),
      "",
    ]),
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
