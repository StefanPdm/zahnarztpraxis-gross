import type { Transporter } from "nodemailer";
import { adminBetreff, adminHtml, adminText, type Adminmeldung } from "@/lib/mailvorlage";

/**
 * Info-Mail an den Admin (ADMIN_MAIL), wenn ein Formular abgeschickt wurde.
 * Ohne ADMIN_MAIL passiert nichts. Inhalt: nur Art, Zeitpunkt und
 * Versandergebnis — keine Formulardaten (lib/mailvorlage.ts).
 *
 * Scheitert diese Mail, merkt der Absender nichts davon: Sie ist eine
 * Kontrolle für uns, kein Teil der Anfrage.
 */
export async function meldeAdmin(versand: Transporter, absender: string, m: Adminmeldung): Promise<void> {
  const ziel = process.env.ADMIN_MAIL;
  if (!ziel) return;
  try {
    await versand.sendMail({
      from: absender,
      to: ziel,
      subject: adminBetreff(m),
      text: adminText(m),
      html: adminHtml(m),
    });
  } catch (fehler) {
    console.error("Admin-Info nicht zugestellt:", fehlercode(fehler));
  }
}

/**
 * Nur Fehlercode und SMTP-Status ins Log, nie die Meldung selbst: Ein
 * abgewiesener Empfänger steht dort oft mit seiner Adresse drin.
 */
export function fehlercode(fehler: unknown): string {
  const f = fehler as { code?: string; responseCode?: number };
  return [f.code, f.responseCode].filter(Boolean).join(" ") || "unbekannt";
}
