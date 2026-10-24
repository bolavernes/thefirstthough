// Brand-Kit + Vorlagen für den Content-Bereich (Demo: erfundenes „Beisl Fuchsbau“)
window.TFT_BRAND_DEFAULT = {
  name: "Beisl Fuchsbau",
  handle: "beisl.fuchsbau",
  logo: "FUCHSBAU",
  colors: { dark: "#1e3a2f", light: "#f4ecdc", accent: "#d0482a" },
  head: "DM Serif Display",
  body: "Inter"
};


window.TFT_TEMPLATES = {
  offer: {
    label: "Angebot", format: "Post 4:5", w: 1080, h: 1350,
    fields: [
      { k: "kicker", label: "Kicker", def: "Jeden Montag ab 17 Uhr" },
      { k: "title", label: "Headline", def: "Montag ist Schnitzeltag" },
      { k: "price", label: "Preis", def: "14,90 €" },
      { k: "sub", label: "Zeile unten", def: "In Butterschmalz. Wie bei der Oma." }
    ]
  },
  story: {
    label: "Countdown", format: "Story 9:16", w: 1080, h: 1920,
    fields: [
      { k: "kicker", label: "Oben", def: "Noch" },
      { k: "big", label: "Groß", def: "3 Tage" },
      { k: "title", label: "Anlass", def: "bis Martini" },
      { k: "sub", label: "Call to Action", def: "Reservieren mit Kennwort FUCHSBAU" }
    ]
  },
  quote: {
    label: "Gäste-Stimme", format: "Post 1:1", w: 1080, h: 1080,
    fields: [
      { k: "quote", label: "Zitat", def: "Das beste Schnitzel im 7. Und ich hab sie alle probiert." },
      { k: "name", label: "Name", def: "Google-Bewertung, Oktober" }
    ]
  },
  reel: {
    label: "Reel", format: "Reel 9:16", w: 1080, h: 1920, video: true,
    fields: [
      { k: "url", label: "Video (SharePoint-Link)", def: "" },
      { k: "hook", label: "Hook-Text (optional)", def: "" }
    ]
  },
  special: {
    label: "Tagesangebot", format: "Story 9:16", w: 1080, h: 1920,
    fields: [
      { k: "kicker", label: "Oben", def: "Heute frisch" },
      { k: "title", label: "Gericht", def: "Seebarsch vom Grill" },
      { k: "price", label: "Preis", def: "24,90 €" },
      { k: "sub", label: "Zeile unten", def: "Solange der Vorrat reicht" }
    ]
  },
  today: {
    label: "Heute-Info", format: "Story 9:16", w: 1080, h: 1920,
    fields: [
      { k: "kicker", label: "Oben", def: "Heute" },
      { k: "big", label: "Status", def: "geschlossen" },
      { k: "sub", label: "Grund / Info", def: "Wegen Unwetter bleibt der Schanigarten zu. Drinnen ist offen!" }
    ]
  },
  event: {
    label: "Event / Termin", format: "Post 4:5", w: 1080, h: 1350,
    fields: [
      { k: "date", label: "Datum", def: "11.11." },
      { k: "title", label: "Titel", def: "Ganz Gansl, halb für zwei" },
      { k: "sub", label: "Details", def: "2.–29. November · nur mit Reservierung" }
    ]
  }
};

(function () {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nl = s => esc(s).replace(/\n/g, "<br>");
  const GOOGLE = ["DM Serif Display", "Abril Fatface", "Bebas Neue", "Playfair Display", "Archivo Black", "Inter", "Work Sans", "Space Grotesk", "Rye", "Jost", "Cormorant Garamond", "Fraunces", "Oswald", "Lora"];
  window.TFT_FONTS = GOOGLE;

  // Kontrast-Helfer: Text immer lesbar, egal welche Farbe der Kunde wählt
  const lum = hex => { const h = (hex || "#000").replace("#", ""); const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h; const v = [0, 2, 4].map(i => { let c = parseInt(n.substr(i, 2), 16) / 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }); return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]; };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  window.TFT_contrast = contrast;

  function palette(brand, v) {
    const c = brand.colors;
    const bg = v === "light" ? c.light : v === "accent" ? c.accent : c.dark;
    const fg = contrast(bg, c.light) >= contrast(bg, c.dark) ? c.light : c.dark;
    let ac = v === "accent" ? (fg === c.light ? c.dark : c.light) : c.accent;
    if (contrast(bg, ac) < 1.9) ac = fg === c.light ? c.light : c.dark;
    const onAc = contrast(ac, c.light) >= contrast(ac, c.dark) ? c.light : c.dark;
    return { bg, fg, ac, onAc, darkBg: lum(bg) < .35 };
  }

  const loaded = new Set();
  window.TFT_loadFonts = function (brand) {
    // Hochgeladene Schriften (bleiben im Browser)
    (brand.fonts || []).forEach(f => {
      if (!f || !f.family || !f.data || loaded.has(f.family + f.data.length)) return;
      loaded.add(f.family + f.data.length);
      // Variante 1: FontFace mit den Rohdaten (robust in Safari, Chrome, Firefox)
      try {
        const b64 = f.data.slice(f.data.indexOf(",") + 1), bin = atob(b64), buf = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
        const ff = new FontFace(f.family, buf.buffer);
        document.fonts.add(ff);
        ff.load().then(() => document.dispatchEvent(new Event("tft-fonts"))).catch(() => {});
      } catch (e) {}
      // Variante 2: zusätzlich als @font-face, falls FontFace nicht greift
      try {
        const st = document.createElement("style");
        st.textContent = `@font-face{font-family:"${f.family.replace(/"/g, "")}";src:url(${f.data});font-display:block}`;
        document.head.appendChild(st);
      } catch (e) {}
    });
    const fams = [brand.head, brand.body, brand.headFallback, brand.bodyFallback].filter(f => f && GOOGLE.includes(f));
    if (!fams.length) return;
    const href = "https://fonts.googleapis.com/css2?" + [...new Set(fams)].map(f => "family=" + encodeURIComponent(f).replace(/%20/g, "+") + ":wght@400;600;700").join("&") + "&display=swap";
    let link = document.getElementById("tft-gf");
    if (!link) { link = document.createElement("link"); link.id = "tft-gf"; link.rel = "stylesheet"; document.head.appendChild(link); }
    if (link.href !== href) link.href = href;
  };

  const isUrl = u => typeof u === "string" && /^(https:\/\/|\.\.\/assets\/|data:)/i.test(u.trim());

  // Liefert HTML in Originalgröße (z. B. 1080×1350). Skalierung macht der Container.
  window.TFT_renderPost = function (post, brand, opts) {
    opts = opts || {};
    const t = TFT_tpl(post);
    const f = Object.assign({}, ...t.fields.map(x => ({ [x.k]: x.def })), post.f || {});
    const p = palette(brand, post.v || "dark");
    const H = `font-family:'${brand.head}','${brand.headFallback || "Georgia"}',Georgia,serif`;
    const B = `font-family:'${brand.body}','${brand.bodyFallback || "Inter"}',system-ui,sans-serif`;
    const img = post.img && isUrl(post.img) ? post.img : "";
    const photo = img
      ? `background:url('${esc(img)}') center/cover no-repeat`
      : `background:repeating-linear-gradient(135deg, ${p.ac}33 0 18px, ${p.ac}1a 18px 36px)`;
    const ph = img ? "" : `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;${B};font-size:30px;font-weight:600;color:${p.fg};opacity:.6;padding:40px">${post.media ? "📷 " + esc(post.media) : "Foto"}</div>`;
    const logoSrc = p.darkBg ? (brand.logoOnDark || "") : (brand.logoOnLight || "");
    const logo = (h) => logoSrc
      ? `<img src="${esc(logoSrc)}" alt="" style="height:${h || 60}px;width:auto;display:block">`
      : `<div style="${H};font-size:${Math.round((h || 60) * .6)}px;letter-spacing:.18em;color:${p.fg}">${esc(brand.logo || brand.name)}</div>`;
    const wrap = (inner) => `<div class="tft-post" style="position:relative;width:${t.w}px;height:${t.h}px;background:${p.bg};color:${p.fg};overflow:hidden;box-sizing:border-box">${inner}</div>`;
    if (t.layout) return renderLayout(t, f, p, H, B, photo, ph, logoSrc, brand, opts);
    const badge = (txt, size, x, y, d) => `<div style="position:absolute;right:${x}px;top:${y}px;width:${d}px;height:${d}px;border-radius:50%;background:${p.ac};color:${p.onAc};display:grid;place-items:center;text-align:center;${H};font-size:${size}px;line-height:1;transform:rotate(-8deg);padding:20px;box-sizing:border-box">${esc(txt)}</div>`;

    if (post.tpl === "offer") return wrap(`
      <div style="position:absolute;left:0;right:0;top:0;height:760px;${photo}">${ph}</div>
      ${badge(f.price, 62, 70, 640, 240)}
      <div style="position:absolute;left:80px;right:80px;top:820px">
        <div style="${B};font-size:34px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div data-fit style="${H};font-size:108px;line-height:1;margin-top:20px">${nl(f.title)}</div>
        <div style="${B};font-size:36px;margin-top:28px;opacity:.85">${esc(f.sub)}</div>
      </div>
      <div style="position:absolute;left:80px;bottom:60px">${logo(56)}</div>`);

    if (post.tpl === "story") return wrap(`
      <div style="position:absolute;inset:0;${photo};opacity:.35">${ph}</div>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,${p.bg}00 0%,${p.bg} 62%)"></div>
      <div style="position:absolute;left:90px;top:120px">${logo(80)}</div>
      <div style="position:absolute;left:90px;right:90px;top:820px">
        <div style="${B};font-size:52px;font-weight:600;color:${p.ac};text-transform:uppercase;letter-spacing:.08em">${esc(f.kicker)}</div>
        <div data-fit style="${H};font-size:250px;line-height:.9;margin-top:10px">${nl(f.big)}</div>
        <div data-fit style="${H};font-size:110px;line-height:1;margin-top:20px">${nl(f.title)}</div>
      </div>
      <div style="position:absolute;left:90px;right:90px;bottom:180px;background:${p.ac};color:${p.onAc};border-radius:999px;padding:38px 50px;text-align:center;${B};font-size:44px;font-weight:700">${esc(f.sub)}</div>`);

    if (post.tpl === "quote") return wrap(`
      <div style="position:absolute;left:90px;top:80px;${H};font-size:300px;line-height:1;color:${p.ac}">„</div>
      <div style="position:absolute;left:90px;right:90px;top:300px;${H};font-size:80px;line-height:1.1">${nl(f.quote)}</div>
      <div style="position:absolute;left:90px;bottom:170px;${B};font-size:40px;letter-spacing:.2em;color:${p.ac}">★★★★★</div>
      <div style="position:absolute;left:90px;bottom:110px;${B};font-size:32px;opacity:.8">${esc(f.name)}</div>
      <div style="position:absolute;right:90px;bottom:100px">${logo(50)}</div>`);

    if (post.tpl === "reel") {
      const url = (f.url || "").trim();
      const safe = isUrl(url) && !/^data:/i.test(url) ? url : "";
      const vid = safe
        ? `<video src="${esc(safe)}" ${opts.controls ? "controls" : "autoplay muted loop"} playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000"></video>`
        : `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;${B};font-size:44px;color:${p.fg};opacity:.6;padding:80px;background:repeating-linear-gradient(135deg, ${p.ac}33 0 18px, ${p.ac}1a 18px 36px)">Video-Link einfügen<br><span style="font-size:30px">(liegt in SharePoint, wird nur verlinkt)</span></div>`;
      const hook = f.hook ? `<div data-fit style="position:absolute;left:80px;right:80px;top:260px;${H};font-size:96px;line-height:1;color:#fff;text-shadow:0 4px 30px rgba(0,0,0,.6);pointer-events:none">${nl(f.hook)}</div>` : "";
      const icon = `<div style="position:absolute;right:50px;top:50px;width:90px;height:90px;border-radius:24px;background:rgba(0,0,0,.45);display:grid;place-items:center;pointer-events:none"><svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>`;
      return wrap(vid + hook + (opts.controls ? "" : icon));
    }

    if (post.tpl === "special") return wrap(`
      <div style="position:absolute;left:0;right:0;top:0;height:1150px;${photo}">${ph}</div>
      <div style="position:absolute;left:0;right:0;top:850px;height:300px;background:linear-gradient(180deg,${p.bg}00,${p.bg})"></div>
      <div style="position:absolute;left:90px;top:110px;filter:drop-shadow(0 4px 20px rgba(0,0,0,.35))">${logoSrc ? `<img src="${esc(brand.logoOnDark || logoSrc)}" alt="" style="height:90px;width:auto">` : logo(80)}</div>
      <div style="position:absolute;left:90px;right:90px;top:1120px">
        <div style="${B};font-size:50px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div data-fit style="${H};font-size:140px;line-height:1;margin-top:16px">${nl(f.title)}</div>
      </div>
      ${badge(f.price, 70, 90, 960, 280)}
      <div style="position:absolute;left:90px;right:90px;bottom:150px;${B};font-size:44px;opacity:.85">${esc(f.sub)}</div>`);

    if (post.tpl === "today") return wrap(`
      <div style="position:absolute;inset:70px;border:6px solid ${p.ac};border-radius:40px"></div>
      <div style="position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center">${logo(110)}</div>
      <div style="position:absolute;left:130px;right:130px;top:600px;text-align:center">
        <div style="${B};font-size:64px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div data-fit style="${H};font-size:190px;line-height:.95;margin-top:24px">${nl(f.big)}</div>
        <div style="${B};font-size:52px;line-height:1.3;margin-top:60px;opacity:.9">${nl(f.sub)}</div>
      </div>`);

    if (post.tpl === "event") return wrap(`
      <div style="position:absolute;inset:60px;border:4px solid ${p.ac}"></div>
      <div style="position:absolute;left:120px;right:120px;top:130px;height:560px;${photo}">${ph}</div>
      <div style="position:absolute;left:120px;right:120px;top:730px;bottom:200px;display:flex;flex-direction:column;justify-content:flex-start;gap:24px">
        <div data-fit style="${H};font-size:130px;line-height:.95;color:${p.ac}">${nl(f.date)}</div>
        <div data-fit style="${H};font-size:76px;line-height:1.04">${nl(f.title)}</div>
      </div>
      <div style="position:absolute;left:120px;right:120px;bottom:130px;${B};font-size:34px;opacity:.85">${esc(f.sub)}</div>`);
    return wrap("");
  };

  // ---------- Eigene Layouts (Vorlagen-Editor) ----------
  const FMT = { story: { label: "Story 9:16", w: 1080, h: 1920 }, post45: { label: "Post 4:5", w: 1080, h: 1350 }, post11: { label: "Post 1:1", w: 1080, h: 1080 } };
  const FL = { kicker: "Kicker", title: "Headline", price: "Preis", sub: "Zeile unten", date: "Datum", big: "Groß", cta: "Call to Action", quote: "Zitat", name: "Name", hook: "Hook-Text", url: "Video-Link" };
  const FD = { kicker: "Heute frisch", title: "Pizza con zucca", price: "15,50", sub: "Kürbis · Zucchini · Lauch · Speck", date: "11.11.", big: "Heute", cta: "Jetzt reservieren", quote: "Die beste Pizza im Bezirk.", name: "Google-Bewertung", hook: "Montag, 17:03.\nDas erste Schnitzel.", url: "" };
  window.TFT_FMT = FMT; window.TFT_FIELD_LABELS = FL; window.TFT_FIELD_DEFAULTS = FD;
  const layoutTpl = L => {
    const fields = [];
    (L.els || []).forEach(e => { if (e.field && !fields.some(x => x.k === e.field)) fields.push({ k: e.field, label: FL[e.field] || e.field, def: (L.samples && L.samples[e.field] != null) ? L.samples[e.field] : (FD[e.field] || "") }); });
    const fm = FMT[L.format] || FMT.post45;
    return { label: L.name || "Eigene Vorlage", format: fm.label, w: fm.w, h: fm.h, layout: L, fields, custom: true };
  };
  window.TFT_layoutTpl = layoutTpl;
  window.TFT_registerLayout = L => { TFT_TEMPLATES["L:" + L.id] = layoutTpl(L); };
  // Vorlage eines Posts: eigene Layouts live, sonst Kopie aus dem Post (z. B. im Freigabe-Link)
  window.TFT_tpl = post => TFT_TEMPLATES[post.tpl] || (post.layout ? layoutTpl(post.layout) : TFT_TEMPLATES.offer);
  // Die eingebauten Vorlagen als Element-Layouts: dadurch ist jede Vorlage im Layout-Editor bearbeitbar
  const T = (field, x, y, w, h, o) => Object.assign({ type: "text", field, x, y, w, h, font: "head", size: 80, color: "fg", align: "left" }, o || {});
  const STD = {
    offer: { format: "post45", els: [
      { type: "photo", x: 0, y: 0, w: 1080, h: 760 },
      { type: "badge", field: "price", x: 770, y: 640, w: 240, h: 240, size: 62, rotate: -8, color: "ac" },
      T("kicker", 80, 820, 920, 50, { font: "body", size: 34, weight: 600, upper: true, color: "ac" }),
      T("title", 80, 880, 920, 230, { size: 108, lh: 1 }),
      T("sub", 80, 1130, 920, 60, { font: "body", size: 36, opacity: .85 }),
      { type: "logo", x: 80, y: 1230, w: 320, h: 60, align: "left" }] },
    story: { format: "story", els: [
      { type: "photo", x: 0, y: 0, w: 1080, h: 1920, opacity: .35 },
      { type: "shade", x: 0, y: 300, w: 1080, h: 900, color: "bg", dir: "down" },
      { type: "box", x: 0, y: 1190, w: 1080, h: 730, fill: true, color: "bg" },
      { type: "logo", x: 90, y: 120, w: 400, h: 80, align: "left" },
      T("kicker", 90, 820, 900, 70, { font: "body", size: 52, weight: 600, upper: true, color: "ac" }),
      T("big", 90, 900, 900, 260, { size: 250, lh: .9 }),
      T("title", 90, 1170, 900, 240, { size: 110, lh: 1 }),
      T("sub", 90, 1620, 900, 130, { font: "body", size: 44, weight: 700, align: "center", color: "onAc", pill: "ac" })] },
    quote: { format: "post11", els: [
      T("", 80, 40, 320, 300, { text: "„", size: 300, lh: 1, color: "ac" }),
      T("quote", 90, 300, 900, 470, { size: 80, lh: 1.1 }),
      T("", 90, 830, 520, 60, { text: "★★★★★", font: "body", size: 40, color: "ac" }),
      T("name", 90, 910, 560, 60, { font: "body", size: 32, opacity: .8 }),
      { type: "logo", x: 690, y: 920, w: 300, h: 60, align: "right" }] },
    reel: { format: "story", els: [
      { type: "video", x: 0, y: 0, w: 1080, h: 1920 },
      T("hook", 80, 260, 920, 420, { size: 96, lh: 1, color: "white", shadow: true }),
      { type: "play", x: 940, y: 50, w: 90, h: 90 }] },
    special: { format: "story", els: [
      { type: "photo", x: 0, y: 0, w: 1080, h: 1150 },
      { type: "shade", x: 0, y: 850, w: 1080, h: 300, color: "bg", dir: "down" },
      { type: "logo", x: 90, y: 110, w: 420, h: 90, align: "left" },
      T("kicker", 90, 1120, 900, 70, { font: "body", size: 50, weight: 700, upper: true, color: "ac" }),
      T("title", 90, 1200, 900, 380, { size: 140, lh: 1 }),
      { type: "badge", field: "price", x: 710, y: 960, w: 280, h: 280, size: 70, rotate: -8, color: "ac" },
      T("sub", 90, 1640, 900, 130, { font: "body", size: 44, opacity: .85 })] },
    today: { format: "story", els: [
      { type: "box", x: 70, y: 70, w: 940, h: 1780, border: 6, radius: 40, color: "ac" },
      { type: "logo", x: 240, y: 170, w: 600, h: 110, align: "center" },
      T("kicker", 130, 600, 820, 90, { font: "body", size: 64, weight: 700, upper: true, color: "ac", align: "center" }),
      T("big", 130, 700, 820, 420, { size: 190, lh: .95, align: "center" }),
      T("sub", 130, 1180, 820, 300, { font: "body", size: 52, lh: 1.3, align: "center", opacity: .9 })] },
    event: { format: "post45", els: [
      { type: "box", x: 60, y: 60, w: 960, h: 1230, border: 4, color: "ac" },
      { type: "photo", x: 120, y: 130, w: 840, h: 560 },
      T("date", 120, 730, 840, 150, { size: 130, lh: .95, color: "ac" }),
      T("title", 120, 900, 840, 200, { size: 76, lh: 1.04 }),
      T("sub", 120, 1150, 840, 60, { font: "body", size: 34, opacity: .85 })] }
  };
  Object.entries(STD).forEach(([k, L]) => { L.std = k; L.id = "std-" + k; L.name = TFT_TEMPLATES[k].label; L.els.forEach((e, i) => e.id = k + i); });
  const stdFields = {}; Object.keys(STD).forEach(k => stdFields[k] = TFT_TEMPLATES[k].fields.slice());
  const applyStd = (k, L) => {
    const t = TFT_TEMPLATES[k]; t.layout = L;
    const fields = stdFields[k].slice();
    (L.els || []).forEach(e => { if (e.field && !fields.some(x => x.k === e.field)) fields.push({ k: e.field, label: FL[e.field] || e.field, def: FD[e.field] || "" }); });
    t.fields = fields; t.customized = L !== STD[k];
  };
  window.TFT_STD = STD;
  window.TFT_stdDefault = k => JSON.parse(JSON.stringify(STD[k]));
  // Ein Layout für eine Vorlage verwenden (z. B. aus einem Freigabe-Link)
  window.TFT_useLayout = (key, L) => { if (!L) return; if (STD[key]) applyStd(key, L); else if (key.startsWith("L:")) TFT_registerLayout(L); };
  Object.keys(STD).forEach(k => applyStd(k, STD[k]));
  window.TFT_loadLayouts = function (cid) {
    let arr = []; try { arr = JSON.parse(localStorage.getItem("tft-layouts-" + cid) || "[]"); } catch (e) {}
    Object.keys(TFT_TEMPLATES).filter(k => k.startsWith("L:")).forEach(k => delete TFT_TEMPLATES[k]);
    Object.keys(STD).forEach(k => applyStd(k, STD[k]));
    arr.forEach(L => { if (L.std && STD[L.std]) applyStd(L.std, L); else TFT_registerLayout(L); });
    return arr.filter(L => !L.std);
  };
  function renderLayout(t, f, p, H, B, photo, ph, logoSrc, brand, opts) {
    const col = c => c === "ac" ? p.ac : c === "onAc" ? p.onAc : c === "bg" ? p.bg : c === "white" ? "#fff" : p.fg;
    const out = (t.layout.els || []).map(e => {
      const pos = `position:absolute;left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;box-sizing:border-box;${e.type === "video" ? "" : "pointer-events:none;"}`;
      if (e.type === "video") {
        const url = (f.url || "").trim(), safe = isUrl(url) && !/^data:/i.test(url) ? url : "";
        return `<div data-el="${e.id}" style="${pos}overflow:hidden;border-radius:${e.radius || 0}px;background:#000">${safe
          ? `<video src="${esc(safe)}" ${opts.controls ? "controls" : "autoplay muted loop"} playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block"></video>`
          : `<div style="width:100%;height:100%;display:grid;place-items:center;text-align:center;${B};font-size:44px;color:${p.fg};opacity:.6;padding:80px;box-sizing:border-box;background:repeating-linear-gradient(135deg, ${p.ac}33 0 18px, ${p.ac}1a 18px 36px)">Video-Link einfügen<br><span style="font-size:30px">(liegt in SharePoint, wird nur verlinkt)</span></div>`}</div>`;
      }
      if (e.type === "play") return opts.controls ? "" : `<div data-el="${e.id}" style="${pos}border-radius:24%;background:rgba(0,0,0,.45);display:grid;place-items:center"><svg width="55%" height="55%" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>`;
      const op = e.opacity != null ? `opacity:${e.opacity};` : "";
      if (e.type === "photo") return `<div data-el="${e.id}" style="${pos}${photo};border-radius:${e.radius || 0}px;overflow:hidden;${op}">${ph}</div>`;
      if (e.type === "shade") return `<div data-el="${e.id}" style="${pos}background:linear-gradient(${e.dir === "up" ? "0deg" : "180deg"},${col(e.color || "bg")}00 0%,${col(e.color || "bg")} 100%);${op}"></div>`;
      if (e.type === "box") return `<div data-el="${e.id}" style="${pos}${e.fill ? `background:${col(e.color)};` : ""}${e.border ? `border:${e.border}px solid ${col(e.color)};` : ""}border-radius:${e.radius || 0}px;${op}"></div>`;
      if (e.type === "logo") return `<div data-el="${e.id}" style="${pos}display:flex;align-items:center;justify-content:${e.align === "center" ? "center" : e.align === "right" ? "flex-end" : "flex-start"};${op}">${logoSrc ? `<img src="${esc(logoSrc)}" alt="" style="max-width:100%;max-height:100%;display:block">` : `<div style="${H};font-size:${Math.round(e.h * .6)}px;letter-spacing:.15em;color:${p.fg}">${esc(brand.logo || brand.name)}</div>`}</div>`;
      if (e.type === "badge") return `<div data-el="${e.id}" data-fit="box" style="${pos}border-radius:50%;background:${col(e.color || "ac")};color:${e.color === "fg" ? p.bg : p.onAc};display:grid;place-items:center;text-align:center;${H};font-size:${e.size || 60}px;line-height:1;transform:rotate(${e.rotate || 0}deg);padding:${Math.round(e.w * .12)}px;overflow:hidden;${op}">${esc(e.field ? (f[e.field] || "") : (e.text || ""))}</div>`;
      return `<div data-el="${e.id}" data-fit="box" style="${pos}${e.font === "body" ? B : H};font-size:${e.size || 60}px;line-height:${e.lh || 1.05};color:${col(e.color)};text-align:${e.align || "left"};${e.upper ? "text-transform:uppercase;letter-spacing:.06em;" : ""}font-weight:${e.weight || 400};${e.shadow ? "text-shadow:0 4px 30px rgba(0,0,0,.6);" : ""}${e.pill ? `background:${col(e.pill)};border-radius:999px;display:flex;align-items:center;justify-content:center;padding:0 40px;` : ""}overflow:hidden;${op}">${nl(e.field ? (f[e.field] || "") : (e.text || ""))}</div>`;
    }).join("");
    return `<div class="tft-post" style="position:relative;width:${t.w}px;height:${t.h}px;background:${p.bg};color:${p.fg};overflow:hidden">${out}</div>`;
  }

  // Schrift verkleinern, bis lange Wörter in die Zeile passen (z. B. breite Display-Schriften)
  window.TFT_fit = function (root) {
    root.querySelectorAll("[data-fit]").forEach(el => {
      if (!el.dataset.fs) el.dataset.fs = parseFloat(el.style.fontSize) || 80;
      let fs = parseFloat(el.dataset.fs), g = 0; el.style.fontSize = fs + "px";
      el.style.overflowWrap = "normal";
      const box = el.dataset.fit === "box";
      while ((el.scrollWidth > el.clientWidth + 2 || (box && el.scrollHeight > el.clientHeight + 2)) && fs > 14 && g++ < 60) { fs *= 0.93; el.style.fontSize = fs.toFixed(1) + "px"; }
    });
  };

  // Wenn Schriften nachladen (Google Fonts, hochgeladene Schriften), Text nochmal einpassen
  const mounted = new Set();
  window.TFT_track = el => mounted.add(el);
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", () => {
    mounted.forEach(el => { if (el.isConnected) TFT_fit(el); else mounted.delete(el); });
  });

  // Rendert skaliert in einen Container mit fixer Breite
  window.TFT_mount = function (container, post, brand, opts) {
    const t = TFT_tpl(post);
    const w = container.clientWidth || 300;
    const s = w / t.w;
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.aspectRatio = t.w + " / " + t.h;
    container.innerHTML = `<div style="position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(${s})">${TFT_renderPost(post, brand, opts)}</div>`;
    TFT_fit(container); mounted.add(container);
  };

  // Brand ohne eingebettete Dateien (für Freigabe-Links)
  window.TFT_brandLite = b => { const o = JSON.parse(JSON.stringify(b)); delete o.fonts; ["logoOnDark", "logoOnLight"].forEach(k => { if (o[k] && /^data:/.test(o[k])) delete o[k]; }); return o; };

  // Base64url für Freigabe-Links
  window.TFT_pack = obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  window.TFT_unpack = str => JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/")))));
  window.TFT_hash = async s => {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
  };
})();
