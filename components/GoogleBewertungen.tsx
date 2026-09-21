import Image from "next/image";
import Bild from "@/components/Bild";
import BewertungText from "@/components/BewertungText";

/*
  Echte Google-Bewertungen auf der Startseite.

  Server Component: Der Abruf läuft auf dem Server, der Schlüssel bleibt dort.
  `revalidate` holt die Daten einmal am Tag neu — die Seite bleibt statisch,
  und Google wird rund 30-mal im Monat gefragt statt bei jedem Aufruf.

  Datenschutz: Im Browser der Besucher entsteht **keine** Anfrage an Google.
  Die Texte kommen aus unserem HTML, die Profilbilder durch `next/image` über
  unseren eigenen Server (dafür ist lh3.googleusercontent.com in
  next.config.ts freigegeben). Ohne diesen Umweg würde jeder Seitenaufruf die
  IP-Adresse des Besuchers an Google melden.

  Google verlangt, Bewertungen unverändert und mit Hinweis auf die Quelle zu
  zeigen: Name, Bild, Sterne und Zeitangabe stehen deshalb so da, wie sie
  geliefert werden, und der Kopf verlinkt auf den Eintrag bei Google.
*/

type Bewertung = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
};

type Antwort = {
  result?: { reviews?: Bewertung[]; rating?: number; user_ratings_total?: number };
  status?: string;
};

const EIN_TAG = 60 * 60 * 24;

/* Ab dieser Länge passt der Text nicht mehr in vier Zeilen — dann führt ein
   „Mehr lesen" zu Google. Geschätzt, nicht gemessen: Wie viel hineinpasst,
   weiß erst der Browser, und die Seite wird auf dem Server erzeugt. */
const LANG = 190;

async function holeBewertungen(): Promise<Antwort["result"] | null> {
  const schluessel = process.env.GOOGLE_PLACES_API_KEY;
  const ort = process.env.NEXT_PUBLIC_PLACE_ID;
  if (!schluessel || !ort) {
    // Ohne Zugang keine Sektion — aber auch kein Fehler beim Bauen.
    console.warn("Google-Bewertungen: GOOGLE_PLACES_API_KEY oder NEXT_PUBLIC_PLACE_ID fehlt.");
    return null;
  }

  const adresse =
    "https://maps.googleapis.com/maps/api/place/details/json" +
    `?place_id=${encodeURIComponent(ort)}` +
    "&fields=reviews,rating,user_ratings_total" +
    "&reviews_sort=newest&language=de" +
    `&key=${encodeURIComponent(schluessel)}`;

  try {
    const antwort = await fetch(adresse, { next: { revalidate: EIN_TAG } });
    if (!antwort.ok) {
      // Bewusst ohne Adresse im Log — sie trägt den Schlüssel.
      console.warn(`Google-Bewertungen: HTTP ${antwort.status}`);
      return null;
    }
    const daten = (await antwort.json()) as Antwort;
    if (daten.status && daten.status !== "OK") {
      console.warn(`Google-Bewertungen: Status ${daten.status}`);
      return null;
    }
    return daten.result ?? null;
  } catch (fehler) {
    console.warn("Google-Bewertungen: Abruf fehlgeschlagen —", (fehler as Error).message);
    return null;
  }
}

/** Fünf Sterne, davon `wert` gefüllt. Für Screenreader steht die Zahl daneben. */
function Sterne({ wert }: { wert: number }) {
  const voll = Math.round(wert);
  return (
    <span
      role="img"
      aria-label={`${wert} von 5 Sternen`}
      style={{ display: "inline-flex", gap: "3px", color: "var(--color-accent)" }}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={n <= voll ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3.2l2.6 5.5 5.9.8-4.3 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.5 9.5l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default async function GoogleBewertungen() {
  const ergebnis = await holeBewertungen();
  /* Nur 4 und 5 Sterne — Ansage des Auftraggebers. Der Schnitt und die
     Gesamtzahl stehen darüber, die Auswahl schönt das Bild also nicht. */
  const bewertungen = (ergebnis?.reviews ?? []).filter((b) => b.text?.trim() && b.rating >= 4);
  if (bewertungen.length === 0) return null;

  const ort = process.env.NEXT_PUBLIC_PLACE_ID ?? "";
  const beiGoogle = `https://search.google.com/local/reviews?placeid=${encodeURIComponent(ort)}`;
  const schnitt = ergebnis?.rating;
  const anzahl = ergebnis?.user_ratings_total;

  return (
    <div style={{ padding: "116px 64px", borderBottom: "1px solid var(--color-divider)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "24px",
          marginBottom: "44px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "20px", flexWrap: "wrap" }}>
          <h2 style={{ fontWeight: "400", fontSize: "var(--fs-h2)", margin: "0" }}>Bewertungen</h2>
          {schnitt ? (
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-neutral-700)",
                fontFeatureSettings: "'tnum'",
              }}
            >
              {schnitt.toFixed(1).replace(".", ",")} von 5
              {anzahl ? ` · ${anzahl} Bewertungen bei Google` : " bei Google"}
            </span>
          ) : null}
        </div>
        <a
          href={beiGoogle}
          target="_blank"
          rel="noopener"
          className="textlink"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Alle bei Google lesen
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "36px" }}>
        {bewertungen.slice(0, 4).map((b, i) => (
          <div
            key={i}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Sterne wert={b.rating} />
            <BewertungText
              text={b.text.trim()}
              lang={b.text.trim().length > LANG}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "auto 0 0",
                paddingTop: "20px",
              }}
            >
              {b.profile_photo_url ? (
                <Image
                  src={b.profile_photo_url}
                  alt=""
                  width={36}
                  height={36}
                  sizes="36px"
                  style={{ borderRadius: "999px", flexShrink: 0 }}
                />
              ) : null}
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-neutral-700)",
                  lineHeight: "1.5",
                }}
              >
                {b.author_name}
                <br />
                {b.relative_time_description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pflichtangabe der Places API. Die offizielle Datei für helle
          Hintergründe, unverändert: Google untersagt, das Logo einzufärben,
          zu beschneiden oder nachzubauen. Sie liegt lokal, damit beim Aufruf
          keine Anfrage an Google entsteht. */}
      <div style={{ marginTop: "44px" }}>
        <Bild
          src="/uploads/powered-by-google-on-white.png"
          alt="Powered by Google"
          sizes="120px"
          style={{ display: "block", width: "120px", height: "auto" }}
        />
      </div>
    </div>
  );
}
