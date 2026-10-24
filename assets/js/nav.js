// Kopfzeile: Zurück-Knopf, klickbare Breadcrumbs, Nachfrage bei ungespeicherten Änderungen
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  window.TFT_nav = function (opts) {
    opts = opts || {};
    const crumbs = opts.crumbs || [];
    const dirty = opts.dirty || (() => false);
    const backTo = opts.back || (crumbs.length > 1 ? crumbs[crumbs.length - 2].href : "../");
    // Breadcrumbs
    const el = document.querySelector(".crumbs");
    if (el) el.innerHTML = crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${esc(c.href)}" data-nav>${esc(c.label)}</a>` : `<b>${esc(c.label)}</b>`).join('<span class="sep">/</span>');
    // Zurück-Knopf links neben dem Logo
    const logo = document.querySelector("header.top .wrap > a");
    if (logo && !document.querySelector(".backbtn")) {
      const wrap = document.createElement("div"); wrap.className = "hdr-l";
      logo.parentNode.insertBefore(wrap, logo);
      const b = document.createElement("button"); b.type = "button"; b.className = "backbtn"; b.innerHTML = "← Zurück";
      b.onclick = () => go(backTo);
      wrap.appendChild(b); wrap.appendChild(logo);
    }
    // Dialog
    let modal = document.getElementById("tftLeave");
    if (!modal) {
      modal = document.createElement("div"); modal.className = "tft-modal"; modal.id = "tftLeave"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `<div class="box"><h3>Nicht gespeichert</h3><p>Du hast Änderungen, die noch nicht gespeichert sind. Was möchtest du tun?</p>
        <div class="acts">${opts.save ? `<button class="btn btn--pink" type="button" data-a="save">Speichern & weiter</button>` : ""}
        <button class="btn danger" type="button" data-a="leave">Ohne Speichern verlassen</button>
        <button class="link" type="button" data-a="stay">Abbrechen, hierbleiben</button></div></div>`;
      document.body.appendChild(modal);
    }
    let target = null;
    modal.onclick = e => {
      const a = e.target.closest("[data-a]"); if (e.target === modal) { modal.classList.remove("open"); return; } if (!a) return;
      if (a.dataset.a === "stay") { modal.classList.remove("open"); return; }
      if (a.dataset.a === "save" && opts.save) opts.save();
      leaving = true; location.href = target;
    };
    let leaving = false;
    function go(href) {
      if (dirty()) { target = href; modal.classList.add("open"); modal.querySelector("button").focus(); return; }
      leaving = true; location.href = href;
    }
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href]"); if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute("href"); if (!href || href.startsWith("#") || href.startsWith("http") && !href.startsWith(location.origin)) return;
      if (dirty()) { e.preventDefault(); go(a.href); }
    });
    window.addEventListener("beforeunload", e => { if (!leaving && dirty()) { e.preventDefault(); e.returnValue = ""; } });
    window.TFT_go = go;
    document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("open"); });
  };
})();
