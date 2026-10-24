// Brand-Kit + Vorlagen für den Content-Bereich (Demo: erfundenes „Beisl Fuchsbau“)
window.TFT_BRAND_DEFAULT = {
  name: "Beisl Fuchsbau",
  handle: "beisl.fuchsbau",
  logo: "FUCHSBAU",
  colors: { dark: "#1e3a2f", light: "#f4ecdc", accent: "#d0482a" },
  head: "DM Serif Display",
  body: "Inter"
};

window.TFT_FONTS = ["DM Serif Display", "Abril Fatface", "Bebas Neue", "Playfair Display", "Archivo Black", "Inter", "Work Sans", "Space Grotesk"];

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
      { k: "url", label: "Video-Link (mp4, extern gehostet)", def: "" },
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

  window.TFT_loadFonts = function (brand) {
    const fams = [brand.head, brand.body].filter(Boolean);
    const id = "tft-gf";
    let link = document.getElementById(id);
    const href = "https://fonts.googleapis.com/css2?" + fams.map(f => "family=" + encodeURIComponent(f).replace(/%20/g, "+") + ":wght@400;600;700").join("&") + "&display=swap";
    if (!link) { link = document.createElement("link"); link.id = id; link.rel = "stylesheet"; document.head.appendChild(link); }
    if (link.href !== href) link.href = href;
  };

  function palette(brand, v) {
    const c = brand.colors;
    if (v === "light") return { bg: c.light, fg: c.dark, ac: c.accent };
    if (v === "accent") return { bg: c.accent, fg: c.light, ac: c.dark };
    return { bg: c.dark, fg: c.light, ac: c.accent };
  }

  // Liefert HTML in Originalgröße (z. B. 1080×1350). Skalierung macht der Container.
  window.TFT_renderPost = function (post, brand, opts) {
    opts = opts || {};
    const t = TFT_TEMPLATES[post.tpl];
    const f = Object.assign({}, ...t.fields.map(x => ({ [x.k]: x.def })), post.f || {});
    const p = palette(brand, post.v || "dark");
    const H = `font-family:'${brand.head}',Georgia,serif`;
    const B = `font-family:'${brand.body}',system-ui,sans-serif`;
    const photo = post.img
      ? `background:url('${post.img}') center/cover no-repeat`
      : `background:repeating-linear-gradient(135deg, ${p.ac}33 0 18px, ${p.ac}1a 18px 36px)`;
    const ph = post.img ? "" : `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;${B};font-size:30px;font-weight:600;color:${p.fg};opacity:.6;padding:40px">${post.media ? "📷 " + esc(post.media) : "Foto"}</div>`;
    const logo = `<div style="${H};font-size:34px;letter-spacing:.18em;color:${p.fg}">${esc(brand.logo)}</div>`;
    const wrap = (inner) => `<div class="tft-post" style="position:relative;width:${t.w}px;height:${t.h}px;background:${p.bg};color:${p.fg};overflow:hidden;box-sizing:border-box">${inner}</div>`;

    if (post.tpl === "offer") return wrap(`
      <div style="position:absolute;left:0;right:0;top:0;height:760px;${photo}">${ph}</div>
      <div style="position:absolute;right:70px;top:640px;width:240px;height:240px;border-radius:50%;background:${p.ac};color:${p.bg === brand.colors.accent ? brand.colors.light : brand.colors.light};display:grid;place-items:center;text-align:center;${H};font-size:62px;line-height:1;transform:rotate(-8deg)">${esc(f.price)}</div>
      <div style="position:absolute;left:80px;right:80px;top:820px">
        <div style="${B};font-size:34px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div style="${H};font-size:112px;line-height:.98;margin-top:20px">${nl(f.title)}</div>
        <div style="${B};font-size:36px;margin-top:28px;opacity:.85">${esc(f.sub)}</div>
      </div>
      <div style="position:absolute;left:80px;bottom:60px">${logo}</div>`);

    if (post.tpl === "story") return wrap(`
      <div style="position:absolute;inset:0;${photo};opacity:.35">${ph}</div>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,${p.bg}00 0%,${p.bg} 62%)"></div>
      <div style="position:absolute;left:90px;top:120px">${logo}</div>
      <div style="position:absolute;left:90px;right:90px;top:820px;text-align:left">
        <div style="${B};font-size:52px;font-weight:600;color:${p.ac};text-transform:uppercase;letter-spacing:.08em">${esc(f.kicker)}</div>
        <div style="${H};font-size:260px;line-height:.9;margin-top:10px">${nl(f.big)}</div>
        <div style="${H};font-size:110px;line-height:1;margin-top:20px">${nl(f.title)}</div>
      </div>
      <div style="position:absolute;left:90px;right:90px;bottom:180px;background:${p.ac};color:${brand.colors.light};border-radius:999px;padding:38px 50px;text-align:center;${B};font-size:44px;font-weight:700">${esc(f.sub)}</div>`);

    if (post.tpl === "quote") return wrap(`
      <div style="position:absolute;left:90px;top:80px;${H};font-size:300px;line-height:1;color:${p.ac}">„</div>
      <div style="position:absolute;left:90px;right:90px;top:300px;${H};font-size:84px;line-height:1.08">${nl(f.quote)}</div>
      <div style="position:absolute;left:90px;bottom:170px;${B};font-size:40px;letter-spacing:.2em;color:${p.ac}">★★★★★</div>
      <div style="position:absolute;left:90px;bottom:110px;${B};font-size:32px;opacity:.8">${esc(f.name)}</div>
      <div style="position:absolute;right:90px;bottom:100px">${logo}</div>`);

    if (post.tpl === "reel") {
      const url = (f.url || "").trim();
      const safe = /^https:\/\//i.test(url) ? url : "";
      const vid = safe
        ? `<video src="${esc(safe)}" ${opts.controls ? "controls" : "autoplay muted loop"} playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000"></video>`
        : `<div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;${B};font-size:44px;color:${p.fg};opacity:.6;padding:80px;background:repeating-linear-gradient(135deg, ${p.ac}33 0 18px, ${p.ac}1a 18px 36px)">Video-Link einfügen<br><span style="font-size:30px">(Dropbox, Bunny, R2, eigener Server …)</span></div>`;
      const hook = f.hook ? `<div style="position:absolute;left:80px;right:80px;top:260px;${H};font-size:96px;line-height:1;color:#fff;text-shadow:0 4px 30px rgba(0,0,0,.6);pointer-events:none">${nl(f.hook)}</div>` : "";
      const icon = `<div style="position:absolute;right:50px;top:50px;width:90px;height:90px;border-radius:24px;background:rgba(0,0,0,.45);display:grid;place-items:center;pointer-events:none"><svg width="48" height="48" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>`;
      return wrap(vid + hook + (opts.controls ? "" : icon));
    }

    if (post.tpl === "special") return wrap(`
      <div style="position:absolute;left:0;right:0;top:0;height:1150px;${photo}">${ph}</div>
      <div style="position:absolute;left:0;right:0;top:850px;height:300px;background:linear-gradient(180deg,${p.bg}00,${p.bg})"></div>
      <div style="position:absolute;left:90px;top:110px">${logo}</div>
      <div style="position:absolute;left:90px;right:90px;top:1120px">
        <div style="${B};font-size:50px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div style="${H};font-size:150px;line-height:.95;margin-top:16px">${nl(f.title)}</div>
      </div>
      <div style="position:absolute;right:90px;top:960px;width:280px;height:280px;border-radius:50%;background:${p.ac};color:${brand.colors.light};display:grid;place-items:center;text-align:center;${H};font-size:72px;line-height:1;transform:rotate(-8deg)">${esc(f.price)}</div>
      <div style="position:absolute;left:90px;right:90px;bottom:150px;${B};font-size:44px;opacity:.85">${esc(f.sub)}</div>`);

    if (post.tpl === "today") return wrap(`
      <div style="position:absolute;inset:70px;border:6px solid ${p.ac};border-radius:40px"></div>
      <div style="position:absolute;left:0;right:0;top:170px;display:flex;justify-content:center">${logo}</div>
      <div style="position:absolute;left:130px;right:130px;top:600px;text-align:center">
        <div style="${B};font-size:64px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${p.ac}">${esc(f.kicker)}</div>
        <div style="${H};font-size:200px;line-height:.92;margin-top:24px">${nl(f.big)}</div>
        <div style="${B};font-size:52px;line-height:1.3;margin-top:60px;opacity:.9">${nl(f.sub)}</div>
      </div>`);

    if (post.tpl === "event") return wrap(`
      <div style="position:absolute;inset:60px;border:4px solid ${p.ac}"></div>
      <div style="position:absolute;left:120px;right:120px;top:130px;height:600px;${photo}">${ph}</div>
      <div style="position:absolute;left:120px;top:780px;${H};font-size:170px;line-height:.9;color:${p.ac}">${esc(f.date)}</div>
      <div style="position:absolute;left:120px;right:120px;top:960px;${H};font-size:84px;line-height:1">${nl(f.title)}</div>
      <div style="position:absolute;left:120px;right:120px;bottom:130px;${B};font-size:34px;opacity:.85">${esc(f.sub)}</div>`);
    return wrap("");
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
  };

  // Base64url für Freigabe-Links
  window.TFT_pack = obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  window.TFT_unpack = str => JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/")))));
  window.TFT_hash = async s => {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
  };
})();
