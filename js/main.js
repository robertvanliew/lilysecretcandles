/* =========================================================
   LILY'S SECRET — interactions, i18n wiring & bespoke configurator
   ========================================================= */
(function () {
  "use strict";

  var I18N = window.I18N;
  var t = function (k) { return I18N.t(k); };

  /* ---------- Data (ids are stable; text comes from i18n) ---------- */
  var FRAGRANCES = [
    { id: "exotic", name: "Exotic Dream",   alt: "Karki",         ico: "fPineapple" },
    { id: "amber",  name: "Amber Tale",     alt: "Kalimat",       ico: "fAmber" },
    { id: "velvet", name: "Velvet Coffee",  alt: "Amour Coffee",  ico: "fCoffee" },
    { id: "summer", name: "Summer Sun",     alt: "",              ico: "fPalm" },
    { id: "silk",   name: "Pure Silk",      alt: "Valaya Demarly",ico: "fFeather" },
    { id: "sweet",  name: "Sweet Escape",   alt: "Marshmello",    ico: "fBerry" },
    { id: "tulip",  name: "Istanbul Tulip", alt: "Zahrat al Tolep",ico: "fTulip" }
  ];
  var MSG_IDX = [0, 1, 2, 3, 4, 5];
  var OCCASIONS = ["wedding", "birthday", "thanks", "corporate", "newbaby", "declaration", "justbecause"];

  var GLYPHS = {
    fPineapple:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8c-2-3-5-3-6-2 2 0 3 1 3 3M16 8c2-3 5-3 6-2-2 0-3 1-3 3M16 7v3"/><path d="M11 13h10l-1.5 12h-7z"/><path d="M12 16l8 6M20 16l-8 6"/></svg>',
    fAmber:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h4v3h-4z"/><path d="M12 11h8l1 4a5 6 0 0 1-10 0z"/><path d="M16 18v6"/></svg>',
    fCoffee:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15h13v4a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z"/><path d="M22 16h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M12 11c-1-1 1-2 0-3M16 11c-1-1 1-2 0-3"/></svg>',
    fPalm:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12v12"/><path d="M16 12c-3-3-7-2-9 0 3-1 5 0 6 1M16 12c3-3 7-2 9 0-3-1-5 0-6 1M16 12c-1-3 1-6 3-7-1 2-1 4 0 5"/><path d="M11 24h10"/></svg>',
    fFeather:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9c-6 0-12 5-13 11 4-1 12-3 13-11z"/><path d="M9 23l6-6M16 12v6M13 15h4"/></svg>',
    fBerry:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17a5 5 0 0 0 10 0M18 15a5 5 0 0 1 8 4 5 5 0 0 1-9 1"/><path d="M13 12c0-2 2-3 3-3M20 13c0-2 1-3 3-3"/></svg>',
    fTulip:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10c-3 1-4 4-4 6 0-2-2-3-4-2 1 4 4 5 8 5 4 0 7-1 8-5-2-1-4 0-4 2 0-2-1-5-4-6z"/><path d="M16 21v4"/></svg>'
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.documentElement.classList.add("js");

  /* ---------- Boot i18n (sets static text, lang/dir) ---------- */
  I18N.boot();

  /* ---------- Year ---------- */
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Ribbon ---------- */
  var ribbon = $("#ribbon");
  var rc = $("#ribbonClose"); if (rc) rc.addEventListener("click", function () { ribbon.classList.add("hide"); });

  /* ---------- Header scroll state ---------- */
  var header = $("#header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  var toggle = $("#navToggle"), mobile = $("#navMobile");
  if (toggle) toggle.addEventListener("click", function () {
    var open = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navMobile a").forEach(function (a) {
    a.addEventListener("click", function () {
      mobile.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Language switcher ---------- */
  var lang = $("#lang"), langBtn = $("#langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = lang.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", String(open));
    });
    $$("#langMenu [data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        I18N.setLang(b.getAttribute("data-lang"));
        lang.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (lang && !lang.contains(e.target)) { lang.classList.remove("open"); langBtn.setAttribute("aria-expanded", "false"); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { lang.classList.remove("open"); langBtn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- Scroll reveal ---------- */
  function bindReveal() {
    var els = $$(".reveal:not(.in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("in"); });
    }
  }
  bindReveal();

  /* ============================================================
     RENDERING (re-run on language change)
     ============================================================ */
  var fragGrid = $("#fragGrid");
  function renderFragGrid() {
    if (!fragGrid) return;
    fragGrid.innerHTML = FRAGRANCES.map(function (f) {
      var alt = f.alt ? '<p class="frag__alt">' + t("frag.inspired") + " " + f.alt + "</p>" : "";
      return '<article class="frag">' +
        '<span class="frag__ico">' + (GLYPHS[f.ico] || "") + '</span>' +
        '<h3 class="frag__name">' + f.name + '</h3>' +
        '<span class="frag__fam">' + t("frag." + f.id + ".fam") + '</span>' +
        '<p class="frag__desc">' + t("frag." + f.id + ".desc") + '</p>' + alt +
        '</article>';
    }).join("");
  }

  var revealList = $("#revealList");
  function renderRevealList() {
    if (!revealList) return;
    revealList.innerHTML = [0, 1, 2, 5].map(function (i) {
      return "<li>“" + t("msg." + i) + "”</li>";
    }).join("");
  }

  /* ---------- Configurator selection state ---------- */
  var sel = { frag: "", msgIndex: -1, msgCustom: "", occ: "", qty: 1, name: "", contact: "", date: "", notes: "" };

  var fragChips = $("#fragChips");
  function renderFragChips() {
    if (!fragChips) return;
    fragChips.innerHTML = FRAGRANCES.map(function (f) {
      var on = sel.frag === f.name;
      return '<button type="button" class="chip" aria-pressed="' + on + '" data-frag="' + f.name + '">' +
        '<span class="chip__t">' + f.name + '</span>' +
        '<span class="chip__s">' + t("frag." + f.id + ".fam") + '</span></button>';
    }).join("");
  }

  var msgChips = $("#msgChips");
  function renderMsgChips() {
    if (!msgChips) return;
    msgChips.innerHTML = MSG_IDX.map(function (i) {
      var on = sel.msgIndex === i && !sel.msgCustom;
      return '<button type="button" class="chip chip--msg" aria-pressed="' + on + '" data-msg="' + i + '">' +
        '<span class="chip__t">“' + t("msg." + i) + '”</span></button>';
    }).join("");
  }

  var occChips = $("#occChips");
  function renderOccChips() {
    if (!occChips) return;
    occChips.innerHTML = OCCASIONS.map(function (id) {
      var on = sel.occ === id;
      return '<button type="button" class="chip chip--occ" aria-pressed="' + on + '" data-occ="' + id + '">' +
        '<span class="chip__t">' + t("occname." + id) + '</span></button>';
    }).join("");
  }

  /* ---------- Summary ---------- */
  var sFrag = $("#sFrag"), sMsg = $("#sMsg"), sOcc = $("#sOcc"), sQty = $("#sQty");
  function displayMessage() {
    if (sel.msgCustom) return "“" + sel.msgCustom + "”";
    if (sel.msgIndex >= 0) return "“" + t("msg." + sel.msgIndex) + "”";
    return "";
  }
  function setDD(el, val) {
    if (!el) return;
    var dash = "—";
    el.textContent = val || dash;
    el.classList.toggle("filled", !!val);
  }
  function refreshSummary() {
    setDD(sFrag, sel.frag);
    setDD(sMsg, displayMessage());
    setDD(sOcc, sel.occ ? t("occname." + sel.occ) : "");
    if (sQty) sQty.textContent = sel.qty;
  }

  var customMsg = $("#customMsg"), msgCount = $("#msgCount");
  function updateMsgCount() {
    var len = customMsg ? customMsg.value.length : 0;
    if (msgCount) msgCount.textContent = len + " / 120 · " + t("create.msghint");
  }

  /* ---------- Wire configurator events (once) ---------- */
  function selectOne(container, activeEl) {
    $$(".chip", container).forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
    if (activeEl) activeEl.setAttribute("aria-pressed", "true");
  }
  if (fragChips) fragChips.addEventListener("click", function (e) {
    var b = e.target.closest("[data-frag]"); if (!b) return;
    selectOne(fragChips, b); sel.frag = b.getAttribute("data-frag"); refreshSummary();
  });
  if (msgChips) msgChips.addEventListener("click", function (e) {
    var b = e.target.closest("[data-msg]"); if (!b) return;
    selectOne(msgChips, b);
    sel.msgIndex = parseInt(b.getAttribute("data-msg"), 10);
    sel.msgCustom = "";
    if (customMsg) customMsg.value = "";
    updateMsgCount(); refreshSummary();
  });
  if (customMsg) customMsg.addEventListener("input", function () {
    sel.msgCustom = customMsg.value.trim();
    if (sel.msgCustom) { sel.msgIndex = -1; if (msgChips) selectOne(msgChips, null); }
    updateMsgCount(); refreshSummary();
  });
  if (occChips) occChips.addEventListener("click", function (e) {
    var b = e.target.closest("[data-occ]"); if (!b) return;
    selectOne(occChips, b); sel.occ = b.getAttribute("data-occ"); refreshSummary();
  });
  var fQty = $("#fQty");
  if (fQty) fQty.addEventListener("input", function () {
    sel.qty = Math.max(1, parseInt(fQty.value || "1", 10)); refreshSummary();
  });
  var bind = function (id, prop) { var el = $(id); if (el) el.addEventListener("input", function () { sel[prop] = el.value.trim(); }); };
  bind("#fName", "name"); bind("#fContact", "contact"); bind("#fDate", "date"); bind("#fNotes", "notes");

  /* ---------- Interactive candle (burn-to-reveal) ---------- */
  var candle = $("#candle"), secretMsg = $("#secretMsg"),
      lightBtn = $("#lightBtn"), nextBtn = $("#nextMsg"), hint = $("#revealHint");
  var candleIdx = 0, candleLit = false;
  function playReveal(i) {
    secretMsg.textContent = t("msg." + i);
    candle.classList.remove("lit");
    void candle.offsetWidth;                       // restart the reveal animation
    requestAnimationFrame(function () { candle.classList.add("lit"); });
  }
  function ignite() {
    candleLit = true;
    playReveal(candleIdx);
    lightBtn.textContent = t("secret.blowout");
    if (nextBtn) nextBtn.hidden = false;
    if (hint) hint.textContent = t("secret.hint2");
  }
  function extinguish() {
    candleLit = false;
    candle.classList.remove("lit");                // flame out, message hides, label returns
    lightBtn.textContent = t("secret.light");
    if (nextBtn) nextBtn.hidden = true;
    if (hint) hint.textContent = t("secret.hint");
  }
  if (lightBtn) lightBtn.addEventListener("click", function () {
    if (!candle) return;
    if (candleLit) extinguish(); else ignite();
  });
  if (nextBtn) nextBtn.addEventListener("click", function () {
    candleIdx = (candleIdx + 1) % 6;
    if (candleLit) playReveal(candleIdx); else ignite();
  });

  /* ---------- Toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add("show"); });
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 4600);
  }

  /* ---------- Submit (ALWAYS in English for the studio) ---------- */
  var EMAIL = "Bsraulaas6@gmail.com";

  // ── Direct-to-inbox delivery (Formspree) ────────────────────────────────
  // Submissions POST straight to this Formspree form, which forwards them to
  // the studio inbox — no email app opens for the customer.
  // To move to a different form later, just replace this endpoint. Set it to ""
  // to fall back to opening a pre-filled email instead.
  var FORM_ENDPOINT = "https://formspree.io/f/maqrblvg";

  // Delivers {subject, message} to the studio.
  // onDone(true) = sent to inbox · false = failed · null = used mailto fallback.
  function submitToStudio(subject, message, fromName, replyTo, onDone) {
    if (FORM_ENDPOINT) {
      var params = new URLSearchParams();
      params.set("_subject", subject);
      params.set("name", fromName || "Lily's Secret website");
      params.set("message", message);
      if (replyTo && replyTo.indexOf("@") > -1) params.set("email", replyTo);   // reply-to when it's an email
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },   // body is form-encoded (set automatically)
        body: params
      }).then(function (r) {
        return r.json().then(function (d) { return { ok: r.ok, d: d }; }, function () { return { ok: r.ok, d: null }; });
      }).then(function (res) {
        onDone(res.ok && !(res.d && res.d.errors) ? true : false);
      }).catch(function () { onDone(false); });
    } else {
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
      onDone(null);
    }
  }

  function messageEN() {
    if (sel.msgCustom) return sel.msgCustom;
    if (sel.msgIndex >= 0) return I18N.en("msg." + sel.msgIndex);
    return "";
  }
  var sendBtn = $("#sendOrder");
  if (sendBtn) sendBtn.addEventListener("click", function () {
    var missing = [];
    if (!sel.frag) missing.push(t("toast.frag"));
    if (!sel.msgCustom && sel.msgIndex < 0) missing.push(t("toast.msgsel"));
    if (missing.length) {
      toast(t("toast.pleasechoose") + " " + missing.join(" " + t("toast.and") + " ") + " " + t("toast.complete"));
      var target = !sel.frag ? "#fragChips" : "#msgChips";
      var tEl = $(target); if (tEl) tEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    var occEN = sel.occ ? I18N.en("occname." + sel.occ) : "—";
    var msgType = sel.msgCustom ? "custom" : "suggested";
    var lines = [
      "Hello Lily's Secret — I'd like to create a bespoke candle.",
      "",
      "• Fragrance: " + sel.frag,
      "• Secret message (" + msgType + "): " + messageEN(),
      "• Occasion: " + occEN,
      "• Quantity: " + sel.qty,
      "• Preferred delivery / pickup: " + (sel.date || "—"),
      "",
      "• Name: " + (sel.name || "—"),
      "• Contact: " + (sel.contact || "—"),
      "• Notes: " + (sel.notes || "—"),
      "",
      "Please confirm availability and the final details. Thank you!"
    ];
    var subject = "Bespoke candle order — " + sel.frag + (sel.occ ? " · " + occEN : "");
    toast(t("form.sending"));
    submitToStudio(subject, lines.join("\n"), sel.name, sel.contact, function (ok) {
      if (ok === false) toast(t("form.error"));
      else if (ok === true) toast(t("form.sent"));
      else toast(t("toast.opening"));
    });
  });

  /* ============================================================
     CONVERSATIONAL CONTACT FORM
     ============================================================ */
  var chatEl = $("#chat"), chatLog = $("#chatLog"), chatDock = $("#chatDock");
  var chatStarted = false;
  var LOGO = "assets/images/logo-seal.png";
  var contact = { name: "", topic: "", topicId: "", message: "", reach: "" };
  var TOPIC_EN = { bespoke: "A bespoke candle", bulk: "A corporate / bulk order", question: "A question", hello: "Just saying hello" };

  function chatScroll() { if (chatLog) chatLog.scrollTop = chatLog.scrollHeight; }
  function clearDock() { if (chatDock) chatDock.innerHTML = ""; }

  function botBubble(text, cb) {
    var row = document.createElement("div");
    row.className = "cbub cbub--bot";
    row.innerHTML = '<span class="cbub__av" aria-hidden="true"><img src="' + LOGO + '" alt=""></span>' +
      '<div class="cbub__b cbub__typing"><span></span><span></span><span></span></div>';
    chatLog.appendChild(row); chatScroll();
    setTimeout(function () {
      var b = row.querySelector(".cbub__b");
      b.classList.remove("cbub__typing");
      b.textContent = text;
      chatScroll();
      if (cb) cb();
    }, 720);
  }
  function userBubble(text) {
    var row = document.createElement("div");
    row.className = "cbub cbub--user";
    var b = document.createElement("div"); b.className = "cbub__b"; b.textContent = text;
    row.appendChild(b); chatLog.appendChild(row); chatScroll();
  }
  function askText(ph, onSubmit) {
    clearDock();
    var form = document.createElement("form");
    form.className = "cform";
    form.innerHTML = '<input type="text" class="cform__in" autocomplete="off">' +
      '<button type="submit" class="cform__send" aria-label="Send">→</button>';
    var input = form.querySelector("input");
    input.setAttribute("placeholder", ph);
    chatDock.appendChild(form);
    try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      userBubble(v); clearDock(); onSubmit(v);
    });
  }
  function askChoices(options, onPick) {
    clearDock();
    var wrap = document.createElement("div"); wrap.className = "cchips";
    options.forEach(function (o) {
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "cchip"; btn.textContent = o.label;
      btn.addEventListener("click", function () { userBubble(o.label); clearDock(); onPick(o); });
      wrap.appendChild(btn);
    });
    chatDock.appendChild(wrap);
  }
  function showSend() {
    clearDock();
    var wrap = document.createElement("div"); wrap.className = "csend";
    var send = document.createElement("button");
    send.type = "button"; send.className = "btn btn--gold"; send.textContent = t("contact.send");
    var ig = document.createElement("a");
    ig.className = "csend__ig"; ig.href = "https://www.instagram.com/lillysecretcandlesdxb";
    ig.target = "_blank"; ig.rel = "noopener"; ig.textContent = t("contact.igAlt");
    var restart = document.createElement("button");
    restart.type = "button"; restart.className = "csend__restart"; restart.textContent = t("contact.restart");
    send.addEventListener("click", sendContact);
    restart.addEventListener("click", startChat);
    wrap.appendChild(send); wrap.appendChild(ig); wrap.appendChild(restart);
    chatDock.appendChild(wrap);
  }
  function sendContact() {
    var topicEN = TOPIC_EN[contact.topicId] || contact.topic;
    var lines = [
      "New message from the Lily's Secret website:",
      "",
      "• Name: " + (contact.name || "—"),
      "• Topic: " + topicEN,
      "• Message: " + (contact.message || "—"),
      "• Reach me at: " + (contact.reach || "—"),
      "",
      "Sent via the site's contact form."
    ];
    var subject = "Website enquiry — " + topicEN + (contact.name ? " · " + contact.name : "");
    clearDock();
    var pending = document.createElement("div");
    pending.className = "cbub cbub--bot";
    pending.innerHTML = '<span class="cbub__av" aria-hidden="true"><img src="' + LOGO + '" alt=""></span>' +
      '<div class="cbub__b cbub__typing"><span></span><span></span><span></span></div>';
    chatLog.appendChild(pending); chatScroll();
    submitToStudio(subject, lines.join("\n"), contact.name, contact.reach, function (ok) {
      pending.remove();
      if (ok === false) { toast(t("form.error")); showSend(); return; }
      botBubble(ok === true ? t("form.sent") : t("toast.opening"), function () {
        clearDock();
        var wrap = document.createElement("div"); wrap.className = "csend";
        var ig = document.createElement("a");
        ig.className = "csend__ig"; ig.href = "https://www.instagram.com/lillysecretcandlesdxb";
        ig.target = "_blank"; ig.rel = "noopener"; ig.textContent = t("contact.igAlt");
        var restart = document.createElement("button");
        restart.type = "button"; restart.className = "csend__restart"; restart.textContent = t("contact.restart");
        restart.addEventListener("click", startChat);
        wrap.appendChild(ig); wrap.appendChild(restart);
        chatDock.appendChild(wrap);
      });
    });
  }
  function startChat() {
    if (!chatLog) return;
    contact = { name: "", topic: "", topicId: "", message: "", reach: "" };
    chatLog.innerHTML = ""; clearDock();
    botBubble(t("contact.greet"), function () {
      askText(t("contact.namePh"), function (name) {
        contact.name = name;
        botBubble(t("contact.q_help").replace("{name}", name), function () {
          askChoices([
            { id: "bespoke", label: t("contact.opt_bespoke") },
            { id: "bulk", label: t("contact.opt_bulk") },
            { id: "question", label: t("contact.opt_question") },
            { id: "hello", label: t("contact.opt_hello") }
          ], function (o) {
            contact.topicId = o.id; contact.topic = o.label;
            botBubble(t("contact.q_detail"), function () {
              askText(t("contact.detailPh"), function (msg) {
                contact.message = msg;
                botBubble(t("contact.q_contact"), function () {
                  askText(t("contact.contactPh"), function (reach) {
                    contact.reach = reach;
                    botBubble(t("contact.q_ready").replace("{name}", contact.name), function () {
                      showSend();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  /* ---------- Full render + re-render on language change ---------- */
  function renderAll() {
    renderFragGrid();
    renderRevealList();
    renderFragChips();
    renderMsgChips();
    renderOccChips();
    refreshSummary();
    updateMsgCount();
    if (candleLit) secretMsg.textContent = t("msg." + candleIdx);
    if (lightBtn) lightBtn.textContent = candleLit ? t("secret.blowout") : t("secret.light");
    if (hint) hint.textContent = candleLit ? t("secret.hint2") : t("secret.hint");
    if (chatStarted) startChat();   // re-localize the conversation
    bindReveal();
  }
  renderAll();
  document.addEventListener("ls:langchange", renderAll);

  /* Start the conversation when the contact section scrolls into view */
  if (chatEl && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !chatStarted) { chatStarted = true; startChat(); cio.disconnect(); }
      });
    }, { threshold: 0.3 });
    cio.observe(chatEl);
  } else if (chatEl) {
    chatStarted = true; startChat();
  }

})();
