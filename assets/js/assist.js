// Bearbeitungs-Chat fürs Team. Demo: einfache Befehle. Echt: Claude ruft dieselben Werkzeuge per Tool-Use auf.
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  window.TFT_COLORS = { rot: "#c8102e", weinrot: "#7e232a", bordeaux: "#6d1a2a", gelb: "#f1dc3d", gold: "#c9a24b", orange: "#e8742a", grün: "#2f6b3a", gruen: "#2f6b3a", olive: "#6b7a3a", blau: "#1f4e8c", navy: "#14213d", türkis: "#2a9d8f", rosa: "#e8a0b4", pink: "#e82b56", schwarz: "#141414", weiß: "#ffffff", weiss: "#ffffff", creme: "#f6efe3", beige: "#efe3cf", grau: "#6b6f76", braun: "#6b4226" };
  window.TFT_parseColor = t => { const h = t.match(/#[0-9a-f]{6}\b/i); if (h) return h[0]; const low = t.toLowerCase(); const k = Object.keys(TFT_COLORS).find(n => new RegExp("\\b" + n + "\\b").test(low)); return k ? TFT_COLORS[k] : null; };
  window.TFT_assist = function (opts) {
    const fab = document.createElement("button"); fab.type = "button"; fab.className = "ai-fab"; fab.innerHTML = `<i>✦</i><span>Mit Claude bearbeiten</span>`;
    const panel = document.createElement("aside"); panel.className = "ai-panel"; panel.setAttribute("aria-label", "Bearbeitungs-Chat");
    panel.innerHTML = `<div class="ai-head"><div><b>✦ Claude</b><small>${esc(opts.title || "Bearbeiten per Text")}</small></div><button type="button" aria-label="Schließen">✕</button></div>
      <div class="ai-log"></div><div class="ai-ex"></div>
      <form class="ai-in"><input placeholder="Was soll ich ändern?" autocomplete="off"><button type="submit" aria-label="Senden">➤</button></form>`;
    document.body.appendChild(fab); document.body.appendChild(panel);
    const log = panel.querySelector(".ai-log"), ex = panel.querySelector(".ai-ex"), inp = panel.querySelector("input");
    const add = (html, who) => { const d = document.createElement("div"); d.className = "ai-m " + who; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    const open = () => { panel.classList.add("open"); setTimeout(() => inp.focus(), 250); };
    fab.onclick = open; panel.querySelector(".ai-head button").onclick = () => panel.classList.remove("open");
    document.addEventListener("keydown", e => { if (e.key === "Escape") panel.classList.remove("open"); if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); } });
    (opts.examples || []).forEach(t => { const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.onclick = () => run(t); ex.appendChild(b); });
    add(esc(opts.hello || "Sag mir, was ich ändern soll.") + `<span class="tool">Demo: einfache Befehle · echt: Claude mit Werkzeugen</span>`, "ai");
    function run(text) {
      add(esc(text), "me");
      const parts = text.split(/\s*(?:;|\bund dann\b|\n)\s*/i).filter(Boolean);
      const done = [], miss = [];
      parts.forEach(p => { let r = null; try { r = opts.handle(p.trim()); } catch (e) { r = null; } if (r) done.push(r); else miss.push(p); });
      let html = "";
      if (done.length) html += done.map(r => `${esc(r.say)}<span class="done">✓ ${esc(r.what)}</span>${r.tool ? `<span class="tool">${esc(r.tool)}</span>` : ""}`).join("<br>");
      if (miss.length) html += (html ? "<br><br>" : "") + `Das versteht die Demo noch nicht: „${esc(miss.join("; "))}“. In der echten Version macht Claude das, z. B. ${esc(opts.fallback || "Texte umschreiben, Layout anpassen, Varianten vorschlagen")}.`;
      setTimeout(() => add(html, "ai"), 350);
    }
    panel.querySelector("form").onsubmit = e => { e.preventDefault(); const t = inp.value.trim(); if (!t) return; inp.value = ""; run(t); };
    return { open, run };
  };
})();
