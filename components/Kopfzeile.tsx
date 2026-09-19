"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { behandlungen, navLinks, navRechts } from "@/lib/navigation";

/*
  Kopfzeile — eine Komponente für Startseite und Unterseiten.

  Der versteckte `#navtoggle` aus dem Original bleibt absichtlich erhalten,
  nur als kontrolliertes Feld. Sämtliche Regeln in site.css hängen daran
  (`input#navtoggle:checked ~ nav`, die Burger-Animation, das Sperren des
  Scrollens). Würde man ihn durch ein data-Attribut ersetzen, müssten rund
  zwanzig Selektoren umgeschrieben werden — mit dem Risiko, die abgenommene
  Animation zu verlieren. So bleibt das Verhalten wortgleich.
*/

const UMBRUCH = 1000;

export default function Kopfzeile() {
  const pathname = usePathname();
  const istStartseite = pathname === "/";

  const [menueOffen, setMenueOffen] = useState(false);
  const [untermenueOffen, setUntermenueOffen] = useState(false);
  const kopf = useRef<HTMLElement>(null);

  /*
    Schrumpfen ab 96px Scrollweg, Rückkehr erst unter 32px.
    Die Hysterese ist notwendig: das Schrumpfen ändert die Kopfhöhe und damit
    die Scroll-Position. Mit einem einzigen Schwellwert flattert die Leiste.
  */
  useEffect(() => {
    let angefordert = false;
    let geschrumpft = false;

    const pruefe = () => {
      angefordert = false;
      const y = window.scrollY;
      if (!geschrumpft && y > 96) {
        geschrumpft = true;
        kopf.current?.classList.add("shrunk");
      } else if (geschrumpft && y < 32) {
        geschrumpft = false;
        kopf.current?.classList.remove("shrunk");
      }
    };

    const beiScroll = () => {
      if (angefordert) return;
      angefordert = true;
      requestAnimationFrame(pruefe);
    };

    pruefe();
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  // Beim Seitenwechsel alles schließen — im Rendern statt im Effekt,
  // damit kein zweiter Durchlauf mit veraltetem Zustand entsteht.
  const [letzterPfad, setLetzterPfad] = useState(pathname);
  if (pathname !== letzterPfad) {
    setLetzterPfad(pathname);
    setMenueOffen(false);
    setUntermenueOffen(false);
  }

  const menueSchalten = (offen: boolean) => {
    setMenueOffen(offen);
    // Untermenü schließt mit dem Hauptmenü.
    if (!offen) setUntermenueOffen(false);
  };

  // Escape schließt das offene Menü.
  useEffect(() => {
    if (!menueOffen) return;
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenueOffen(false);
      setUntermenueOffen(false);
      document.getElementById("navtoggle")?.focus();
    };
    document.addEventListener("keydown", beiTaste);
    return () => document.removeEventListener("keydown", beiTaste);
  }, [menueOffen]);

  const aktiv = (href: string) => pathname === href.split("#")[0];
  const behandlungAktiv = behandlungen.some((b) => aktiv(b.href));

  /** Unter 1000px schaltet das Untermenü auf Tipp, darüber auf Hover (CSS). */
  const untermenueSchalten = () => {
    if (window.innerWidth <= UMBRUCH) setUntermenueOffen((o) => !o);
  };

  return (
    <header
      ref={kopf}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "26px 64px",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <input
        type="checkbox"
        id="navtoggle"
        aria-label={menueOffen ? "Menü schließen" : "Menü öffnen"}
        checked={menueOffen}
        onChange={(e) => menueSchalten(e.target.checked)}
        className="nur-lesbar"
      />
      <label
        htmlFor="navtoggle"
        className="navburger"
        style={{
          display: "none",
          cursor: "pointer",
          alignItems: "center",
          gap: "9px",
          fontFamily: "var(--font-ui)",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-accent-700)",
        }}
      >
        <span style={{ display: "grid", gap: "5px" }}>
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--color-text)" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--color-text)" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: "var(--color-text)" }} />
        </span>
        <span>Menü</span>
      </label>

      <nav
        aria-label="Hauptnavigation"
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {navLinks.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            aria-current={aktiv(e.href) ? "page" : undefined}
            style={
              aktiv(e.href)
                ? { borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px" }
                : undefined
            }
          >
            {e.label}
          </Link>
        ))}

        <span
          className={untermenueOffen ? "navdrop open" : "navdrop"}
          style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "7px" }}
        >
          <span
            className="navlabel"
            role="button"
            tabIndex={0}
            aria-expanded={untermenueOffen}
            onClick={untermenueSchalten}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                setUntermenueOffen((o) => !o);
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              cursor: "default",
              color: "var(--color-text)",
              ...(behandlungAktiv
                ? { borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px" }
                : {}),
            }}
          >
            Behandlungen
            <svg
              className="navchev"
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: "var(--color-accent-700)" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
          <span className="navmenu">
            {/* Der innere Rahmen ist nötig: mobil klappt site.css über grid-template-rows auf. */}
            <span>
              {behandlungen.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className={aktiv(b.href) ? "is-active" : undefined}
                  aria-current={aktiv(b.href) ? "page" : undefined}
                >
                  {b.label}
                </Link>
              ))}
            </span>
          </span>
        </span>
      </nav>

      <Link
        href="/"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "9px",
          textDecoration: "none",
          color: "var(--color-text)",
        }}
      >
        <span
          className="brand-mono"
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-ui)",
            fontWeight: "500",
            fontSize: "var(--fs-h2)",
            lineHeight: "0.86",
            color: "var(--color-accent-700)",
          }}
        >
          <span style={{ display: "block", transform: "scaleX(-1)", marginRight: "-0.3em" }}>G</span>
          <span style={{ display: "block", color: "var(--color-text)" }}>G</span>
        </span>
        <span
          className="brand-word"
          style={{
            display: "block",
            fontFamily: "var(--font-heading)",
            fontSize: "var(--fs-h3)",
            letterSpacing: "0.05em",
            lineHeight: "1",
          }}
        >
          GROSS &amp; GROSS
        </span>
        <span
          className="brand-tagline"
          style={{
            display: "block",
            fontFamily: "var(--font-ui)",
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-neutral-700)",
          }}
        >
          Zahnmedizin · Implantologie · Potsdam
        </span>
      </Link>

      <nav
        aria-label="Kontakt und Termin"
        style={{
          display: "flex",
          gap: istStartseite ? "26px" : "24px",
          justifyContent: "flex-end",
          alignItems: "center",
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {!istStartseite && <Link href="/">Home</Link>}
        {navRechts.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            aria-current={aktiv(e.href) ? "page" : undefined}
            style={
              aktiv(e.href)
                ? { borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px" }
                : undefined
            }
          >
            {e.label}
          </Link>
        ))}
        <Link className="btn btn-primary" href="/termin">
          Termin vereinbaren
        </Link>
      </nav>
    </header>
  );
}
