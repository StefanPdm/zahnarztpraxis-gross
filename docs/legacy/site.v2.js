/* ══ NUR ALS VERHALTENS-REFERENZ — NICHT 1:1 ÜBERNEHMEN ══
   Die Timeout-Ketten, der MutationObserver und die snake_case-Namen darin sind
   Notlösungen für die Umgebung, in der der Prototyp entstand: dort wird das
   Markup nach dem Skript neu aufgebaut, weshalb Bindungen wiederholt gesetzt
   werden müssen. In React entfällt das — du hast die Knoten per ref.
   Die Projektregel „kein camelCase" gilt in Next.js NICHT. ══ */

/* ═══════════════════════════════════════════════════════════════════════════
   Zahnmedizin Potsdam — Groß & Groß
   Gemeinsames Skript für alle Seiten.

     1  Kopfzeile beim Scrollen verkleinern
     2  Mitlaufende Termin-Leiste ein- und ausblenden
     3  Parallax für Bilder mit .parallax-img
     4  Großelino (nur Kinderseite, wenn vorhanden)
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  function onScroll() {
    // 1 — Kopfzeile
    var header = document.querySelector("header");
    // Hysterese: das Schrumpfen ändert die Kopfhöhe und damit die Scroll-Position.
    // Ein einzelner Schwellwert lässt den Kopf an dieser Stelle flattern.
    if (header) {
      var shrunk = header.classList.contains("shrunk");
      if (!shrunk && window.scrollY > 96) header.classList.add("shrunk");
      else if (shrunk && window.scrollY < 32) header.classList.remove("shrunk");
    }

    // 2 — Termin-Leiste: erscheint ab 620px, verschwindet über der Fußzeile
    var cta = document.getElementById("stickycta");
    if (cta) {
      var show = window.scrollY > 620;
      var footer = document.querySelector("footer");
      if (footer && footer.getBoundingClientRect().top < window.innerHeight) show = false;
      cta.style.transform = show ? "translateY(0)" : "translateY(110%)";
    }

    // 2b — Zurück nach oben: sichtbar ab einer Bildschirmhöhe, weicht der
    // mitlaufenden Termin-Leiste aus, wenn diese gerade eingefahren ist.
    var top_btn = document.getElementById("totop");
    if (top_btn) {
      top_btn.classList.toggle("show", window.scrollY > window.innerHeight * 0.9);
      var lift = 0;
      if (cta) {
        var cta_box = cta.getBoundingClientRect();
        if (cta_box.top < window.innerHeight - 4) lift = cta_box.height + 14;
      }
      top_btn.style.transform = "translateY(" + -lift + "px)";
    }

    // 3 — Parallax
    document.querySelectorAll(".parallax-img").forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var box = parent.getBoundingClientRect();
      var distance = box.top + box.height / 2 - window.innerHeight / 2;
      var slack = (el.offsetHeight - box.height) / 2;
      var offset = Math.max(-slack, Math.min(slack, -distance * 0.06));
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  setTimeout(onScroll, 400);
  setTimeout(onScroll, 1200);

  /* Zurück-nach-oben-Knopf: wird eingesetzt, damit er auf allen Seiten
     gleich aussieht, ohne in jeder Vorlage zu stehen. */
  (function backtotop() {
    if (document.getElementById("totop")) return;
    var btn = document.createElement("button");
    btn.id = "totop";
    btn.type = "button";
    btn.setAttribute("aria-label", "Zurück nach oben");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path></svg>';
    btn.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    document.body.appendChild(btn);
  })();

  /* Untermenü „Behandlungen": auf Mobil aufklappbar.
     „Behandlungen" ist kein Link mehr — ein Tipp auf die Zeile klappt auf und zu. */
  (function submenu() {
    // Alles läuft verzögert und wiederholt: der Kopf wird nach dem Skript neu gebaut,
    // Bindungen aus dem ersten Lauf würden am toten Knoten hängen.
    function label_of(node) { return node && node.closest ? node.closest("header .navdrop > .navlabel") : null; }
    function toggle_menu(label) {
      if (!window.matchMedia("(max-width: 1000px)").matches) return;
      var drop = label.parentElement;
      drop.classList.toggle("open");
      label.setAttribute("aria-expanded", drop.classList.contains("open") ? "true" : "false");
    }
    function on_click(e) { var label = label_of(e.target); if (label) toggle_menu(label); }
    function on_key(e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var label = label_of(document.activeElement);
      if (!label) return;
      e.preventDefault();
      toggle_menu(label);
    }
    function on_change(e) {
      if (!e.target || e.target.id !== "navtoggle" || e.target.checked) return;
      var drop = document.querySelector("header .navdrop");
      if (drop) drop.classList.remove("open");
      var label = drop && drop.querySelector(":scope > .navlabel");
      if (label) label.setAttribute("aria-expanded", "false");
    }
    function bind() {
      if (document.gg_nav_bound) return;
      document.gg_nav_bound = true;
      document.addEventListener("click", on_click);
      document.addEventListener("keydown", on_key);
      document.addEventListener("change", on_change);
    }
    function prepare() {
      bind();
      var drop = document.querySelector("header .navdrop");
      if (!drop) return;
      // Untermenü-Einträge in einen Wrapper legen, damit grid-template-rows greift
      var menu = drop.querySelector(":scope > .navmenu");
      if (menu && !menu.querySelector(":scope > span")) {
        var wrap = document.createElement("span");
        while (menu.firstChild) wrap.appendChild(menu.firstChild);
        menu.appendChild(wrap);
      }
      var label = drop.querySelector(":scope > .navlabel");
      if (!label) return;
      if (label.getAttribute("role") !== "button") label.setAttribute("role", "button");
      if (label.getAttribute("tabindex") !== "0") label.setAttribute("tabindex", "0");
      if (!label.hasAttribute("aria-expanded")) label.setAttribute("aria-expanded", "false");
    }
    var pending = null;
    function schedule() {
      if (pending) return;
      pending = setTimeout(function () { pending = null; prepare(); }, 60);
    }
    [0, 300, 900, 2000, 4000].forEach(function (t) { setTimeout(prepare, t); });
    if (window.MutationObserver) {
      new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
    }
  })();

  /* 4 — Großelino: läuft am linken Rand mit und wechselt seinen Zuspruch.
         Auf Mobil übernimmt #grosselino-mobil, eingeblendet beim Hereinscrollen. */
  var lines = [
    [0.10, "Hallo, ich bin Großelino!"],
    [0.28, "Beim ersten Mal wird nur geschaut."],
    [0.48, "Zähne zählen darfst du selbst."],
    [0.66, "Hand heben heißt: Pause."],
    [0.86, "Du machst das ganz super."],
    [1.01, "Bis gleich in der Praxis!"]
  ];
  var stop_timer = null;
  var last_line = -1;

  function grosselino() {
    var el = document.getElementById("grosselino");
    if (!el) return;
    // Damit der Spruch auch per Tastatur erreichbar ist (:focus-within)
    var figur = el.firstElementChild;
    if (figur && !figur.hasAttribute("tabindex")) {
      figur.setAttribute("tabindex", "0");
      figur.setAttribute("role", "img");
      figur.setAttribute("aria-label", "Großelino, unser Begleiter für Kinder");
    }
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.max(0, Math.min(1, window.scrollY / max));
    el.style.top = (18 + progress * 48) + "%";
    el.classList.add("walking", "talking");

    var i = 0;
    while (i < lines.length - 1 && progress > lines[i][0]) i++;
    if (i !== last_line) {
      last_line = i;
      var bubble = document.getElementById("gr-bubble");
      if (bubble) bubble.textContent = lines[i][1];
    }

    clearTimeout(stop_timer);
    stop_timer = setTimeout(function () {
      el.classList.remove("walking");
      setTimeout(function () { el.classList.remove("talking"); }, 1400);
    }, 220);
  }

  // Die Zuhörer werden unbedingt registriert: die Figur steht beim Ausführen des
  // Skripts noch nicht im Dokument, eine Abfrage vorab würde sie überspringen.
  addEventListener("scroll", grosselino, { passive: true });
  addEventListener("resize", grosselino);
  [200, 600, 1200, 2400].forEach(function (t) { setTimeout(grosselino, t); });

  var mobil_beobachtet = false;
  function beobachte_mobil() {
    var mobile = document.getElementById("grosselino-mobil");
    if (!mobile || mobil_beobachtet) return;
    mobil_beobachtet = true;
    if (!("IntersectionObserver" in window)) { mobile.classList.add("inview"); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) mobile.classList.add("inview"); });
    }, { threshold: 0.35 }).observe(mobile);
  }
  [200, 600, 1200, 2400, 4000].forEach(function (t) { setTimeout(beobachte_mobil, t); });
})();
