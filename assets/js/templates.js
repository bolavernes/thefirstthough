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
    const t = TFT_TEMPLATES[post.tpl];
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

  // Schrift verkleinern, bis lange Wörter in die Zeile passen (z. B. breite Display-Schriften)
  window.TFT_fit = function (root) {
    root.querySelectorAll("[data-fit]").forEach(el => {
      let fs = parseFloat(el.style.fontSize) || 80, g = 0;
      el.style.overflowWrap = "normal";
      while (el.scrollWidth > el.clientWidth + 2 && fs > 18 && g++ < 40) { fs *= 0.93; el.style.fontSize = fs.toFixed(1) + "px"; }
    });
  };

  // Rendert skaliert in einen Container mit fixer Breite
  window.TFT_mount = function (container, post, brand, opts) {
    const t = TFT_TEMPLATES[post.tpl];
    const w = container.clientWidth || 300;
    const s = w / t.w;
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.style.aspectRatio = t.w + " / " + t.h;
    container.innerHTML = `<div style="position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(${s})">${TFT_renderPost(post, brand, opts)}</div>`;
    TFT_fit(container);
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
