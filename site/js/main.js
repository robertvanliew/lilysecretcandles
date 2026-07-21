/* =========================================================
   LILY'S SECRET — interactions & bespoke configurator
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Data (from brand documents) ---------- */
  const FRAGRANCES = [
    { name: "Exotic Dream",  fam: "Fruity & Tropical",   desc: "Warm Mediterranean breeze with tropical fruit and soft musk.", alt: "Karki",         ico: "fPineapple" },
    { name: "Amber Tale",    fam: "Warm & Oriental",     desc: "Luxurious amber, honey and spice, like a mystical winter night.", alt: "Kalimat",     ico: "fAmber" },
    { name: "Velvet Coffee", fam: "Gourmet & Coffee",    desc: "Fresh coffee, creamy vanilla and bitter almond — gourmet and warm.", alt: "Amour Coffee", ico: "fCoffee" },
    { name: "Summer Sun",    fam: "Coconut & Beach",     desc: "Coconut, warm sand and tropical breeze — an endless summer.", alt: "",             ico: "fPalm" },
    { name: "Pure Silk",     fam: "Clean & White Floral",desc: "White florals and light woody notes, fresh as washed linen.", alt: "Valaya Demarly",  ico: "fFeather" },
    { name: "Sweet Escape",  fam: "Sugary & Marshmallow",desc: "Strawberry, raspberry and marshmallow — a pink cloud of sweetness.", alt: "Marshmello", ico: "fBerry" },
    { name: "Istanbul Tulip",fam: "Fresh & Floral",      desc: "A single tulip's freshness, serene as a secret palace garden.", alt: "Zahrat al Tolep", ico: "fTulip" },
  ];

  const MESSAGES = [
    "A single flame of your heart illuminates the entire universe.",
    "Espresso yourself, or just slow down.",
    "Your potential is endless. Keep shining!",
    "As this candle dispels the darkness, your smile lights up my heart.",
    "This candle sacrificed itself for this message, but… I love you!",
    "Habibi, your future is glowing.",
  ];

  const OCCASIONS = ["Wedding", "Birthday", "Thank You", "Corporate", "New Baby", "A Declaration", "Just Because"];

  /* Inline SVG glyphs for fragrances (gold line art) */
  const GLYPHS = {
    fPineapple:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8c-2-3-5-3-6-2 2 0 3 1 3 3M16 8c2-3 5-3 6-2-2 0-3 1-3 3M16 7v3"/><path d="M11 13h10l-1.5 12h-7z"/><path d="M12 16l8 6M20 16l-8 6"/></svg>',
    fAmber:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h4v3h-4z"/><path d="M12 11h8l1 4a5 6 0 0 1-10 0z"/><path d="M16 18v6"/></svg>',
    fCoffee:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15h13v4a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z"/><path d="M22 16h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M12 11c-1-1 1-2 0-3M16 11c-1-1 1-2 0-3"/></svg>',
    fPalm:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12v12"/><path d="M16 12c-3-3-7-2-9 0 3-1 5 0 6 1M16 12c3-3 7-2 9 0-3-1-5 0-6 1M16 12c-1-3 1-6 3-7-1 2-1 4 0 5"/><path d="M11 24h10"/></svg>',
    fFeather:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9c-6 0-12 5-13 11 4-1 12-3 13-11z"/><path d="M9 23l6-6M16 12v6M13 15h4"/></svg>',
    fBerry:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17a5 5 0 0 0 10 0M18 15a5 5 0 0 1 8 4 5 5 0 0 1-9 1"/><path d="M13 12c0-2 2-3 3-3M20 13c0-2 1-3 3-3"/></svg>',
    fTulip:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10c-3 1-4 4-4 6 0-2-2-3-4-2 1 4 4 5 8 5 4 0 7-1 8-5-2-1-4 0-4 2 0-2-1-5-4-6z"/><path d="M16 21v4"/></svg>',
  };

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* Signal JS is active so reveal-hiding styles apply (no-JS users see content) */
  document.documentElement.classList.add("js");

  /* ---------- Year ---------- */
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Ribbon ---------- */
  const ribbon = $("#ribbon");
  $("#ribbonClose")?.addEventListener("click", () => ribbon.classList.add("hide"));

  /* ---------- Header scroll state ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = $("#navToggle");
  const mobile = $("#navMobile");
  toggle?.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navMobile a").forEach(a => a.addEventListener("click", () => {
    mobile.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in")); // fallback: show all
  }

  /* ---------- Interactive candle (burn-to-reveal) ---------- */
  const candle = $("#candle");
  const secretMsg = $("#secretMsg");
  const lightBtn = $("#lightBtn");
  const nextBtn = $("#nextMsg");
  const hint = $("#revealHint");
  let msgIndex = 0;

  function reveal(i) {
    secretMsg.textContent = MESSAGES[i];
    candle.classList.remove("lit");
    // force reflow so re-lighting re-animates
    void candle.offsetWidth;
    requestAnimationFrame(() => candle.classList.add("lit"));
  }
  lightBtn?.addEventListener("click", () => {
    reveal(msgIndex);
    lightBtn.textContent = "Relight";
    nextBtn.hidden = false;
    hint.textContent = "The wax melts down… your secret appears.";
  });
  nextBtn?.addEventListener("click", () => {
    msgIndex = (msgIndex + 1) % MESSAGES.length;
    reveal(msgIndex);
  });

  /* ---------- Fragrance display cards ---------- */
  const fragGrid = $("#fragGrid");
  if (fragGrid) {
    fragGrid.innerHTML = FRAGRANCES.map(f => `
      <article class="frag">
        <span class="frag__ico">${GLYPHS[f.ico] || ""}</span>
        <h3 class="frag__name">${f.name}</h3>
        <span class="frag__fam">${f.fam}</span>
        <p class="frag__desc">${f.desc}</p>
        ${f.alt ? `<p class="frag__alt">Inspired by ${f.alt}</p>` : ""}
      </article>`).join("");
  }

  /* ============================================================
     BESPOKE CONFIGURATOR
     ============================================================ */
  const order = { fragrance: "", message: "", messageType: "", occasion: "", qty: 1, name: "", contact: "", date: "", notes: "" };

  /* Step 1 chips */
  const fragChips = $("#fragChips");
  if (fragChips) {
    fragChips.innerHTML = FRAGRANCES.map(f => `
      <button type="button" class="chip" role="button" aria-pressed="false" data-frag="${f.name}">
        <span class="chip__t">${f.name}</span>
        <span class="chip__s">${f.fam}</span>
      </button>`).join("");
  }

  /* Step 2 chips */
  const msgChips = $("#msgChips");
  if (msgChips) {
    msgChips.innerHTML = MESSAGES.map((m, i) => `
      <button type="button" class="chip chip--msg" role="button" aria-pressed="false" data-msg="${i}">
        <span class="chip__t">“${m}”</span>
      </button>`).join("");
  }

  /* Step 3 chips */
  const occChips = $("#occChips");
  if (occChips) {
    occChips.innerHTML = OCCASIONS.map(o => `
      <button type="button" class="chip chip--occ" role="button" aria-pressed="false" data-occ="${o}">
        <span class="chip__t">${o}</span>
      </button>`).join("");
  }

  function selectOne(container, activeEl) {
    $$(".chip", container).forEach(c => c.setAttribute("aria-pressed", "false"));
    activeEl.setAttribute("aria-pressed", "true");
  }

  /* Summary refs */
  const sFrag = $("#sFrag"), sMsg = $("#sMsg"), sOcc = $("#sOcc"), sQty = $("#sQty");
  const setSummary = (el, val) => { el.textContent = val || "—"; el.classList.toggle("filled", !!val); };

  /* Fragrance select */
  fragChips?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-frag]"); if (!b) return;
    selectOne(fragChips, b);
    order.fragrance = b.dataset.frag;
    setSummary(sFrag, order.fragrance);
  });

  /* Message select */
  const customMsg = $("#customMsg");
  const msgCount = $("#msgCount");
  msgChips?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-msg]"); if (!b) return;
    selectOne(msgChips, b);
    order.message = MESSAGES[+b.dataset.msg];
    order.messageType = "suggested";
    if (customMsg) customMsg.value = "";
    updateMsgCount();
    setSummary(sMsg, `“${order.message}”`);
  });
  function updateMsgCount() {
    const len = customMsg ? customMsg.value.length : 0;
    if (msgCount) msgCount.textContent = `${len} / 120 · Hand-set before the final pour — once sealed, it cannot be changed.`;
  }
  customMsg?.addEventListener("input", () => {
    updateMsgCount();
    if (customMsg.value.trim()) {
      order.message = customMsg.value.trim();
      order.messageType = "custom";
      $$(".chip", msgChips).forEach(c => c.setAttribute("aria-pressed", "false"));
      setSummary(sMsg, `“${order.message}”`);
    } else if (order.messageType === "custom") {
      order.message = "";
      setSummary(sMsg, "");
    }
  });

  /* Occasion select */
  occChips?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-occ]"); if (!b) return;
    selectOne(occChips, b);
    order.occasion = b.dataset.occ;
    setSummary(sOcc, order.occasion);
  });

  /* Detail fields */
  const fQty = $("#fQty");
  fQty?.addEventListener("input", () => {
    order.qty = Math.max(1, parseInt(fQty.value || "1", 10));
    sQty.textContent = order.qty;
  });
  $("#fName")?.addEventListener("input", e => order.name = e.target.value.trim());
  $("#fContact")?.addEventListener("input", e => order.contact = e.target.value.trim());
  $("#fDate")?.addEventListener("input", e => order.date = e.target.value.trim());
  $("#fNotes")?.addEventListener("input", e => order.notes = e.target.value.trim());

  /* ---------- Toast ---------- */
  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("show"), 4200);
  }

  /* ---------- Submit → pre-filled email ---------- */
  const EMAIL = "Bsraulaas6@gmail.com";
  $("#sendOrder")?.addEventListener("click", () => {
    const missing = [];
    if (!order.fragrance) missing.push("a fragrance");
    if (!order.message)   missing.push("a secret message");
    if (missing.length) {
      toast(`Please choose ${missing.join(" and ")} to complete your candle.`);
      const target = !order.fragrance ? "#fragChips" : "#msgChips";
      $(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const L = [
      "Hello Lily's Secret — I'd like to create a bespoke candle.",
      "",
      `• Fragrance: ${order.fragrance}`,
      `• Secret message (${order.messageType || "chosen"}): ${order.message}`,
      `• Occasion: ${order.occasion || "—"}`,
      `• Quantity: ${order.qty}`,
      `• Preferred delivery / pickup: ${order.date || "—"}`,
      "",
      `• Name: ${order.name || "—"}`,
      `• Contact: ${order.contact || "—"}`,
      `• Notes: ${order.notes || "—"}`,
      "",
      "Please confirm availability and the final details. Thank you!",
    ].join("\n");
    const subject = `Bespoke candle order — ${order.fragrance}${order.occasion ? " · " + order.occasion : ""}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(L)}`;
    window.location.href = href;
    toast("Opening your email — just press send and we'll take it from there ✦");
  });

})();
