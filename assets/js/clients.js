// Kunden (Demo): Adriano mit echtem Branding, Rest erfunden
(function () {
  const A = "../assets/kunden/adriano/";
  const today = new Date();
  const d = n => { const x = new Date(today); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

  const CLIENTS = {
    adriano: {
      id: "adriano", name: "Adriano", typ: "ital", typLabel: "Italiener / Pizza", real: true,
      bio: "Ristorante · Pizzeria · Holzofenpizza, Pasta, Pesce",
      brand: {
        name: "Adriano", handle: "adriano.ristorante", logo: "ADRIANO",
        logoOnDark: A + "logo-gelb.svg", logoOnLight: A + "logo-weinrot.svg",
        colors: { dark: "#7E232A", light: "#F6EFE3", accent: "#F1DC3D" },
        head: "Davida", headFallback: "Rye", body: "ITC Newtext", bodyFallback: "Jost",
        tone: "Herzlich, italienisch, ein bisschen verspielt. Du-Form. Italienische Gerichtsnamen bleiben italienisch.",
        dos: "Holzofen und Flammen zeigen · Teig, Käse-Zug, Dampf · Gäste beim Genießen",
        donts: "Keine Stockfotos · kein Prozent-Rabatt · keine Emojis in Headlines",
        fonts: []
      },
      media: [
        { url: A + "pizza-im-ofen.webp", tags: ["pizza", "ofen", "holzofen", "feuer", "offen"] },
        { url: A + "pizza-rucola.webp", tags: ["pizza", "rucola", "rucolasalat"] },
        { url: A + "pizzaiolo.webp", tags: ["pizzaiolo", "teig", "team", "koch"] },
        { url: A + "teig.webp", tags: ["teig", "pizza", "handwerk"] },
        { url: A + "spaghetti-muscheln.webp", tags: ["spaghetti", "muscheln", "pasta", "fisch", "meeresfrüchte", "pesce", "vongole"] },
        { url: A + "pasta-pesto.webp", tags: ["pasta", "pesto", "nudeln", "penne"] },
        { url: A + "salat-scampi.webp", tags: ["salat", "scampi", "garnelen", "insalata"] },
        { url: A + "tiramisu.webp", tags: ["tiramisu", "dessert", "nachspeise", "dolci"] },
        { url: A + "gastraum-neu.webp", tags: ["gastraum", "lokal", "innen", "geschlossen", "reservieren", "zu"] },
        { url: A + "tafel.webp", tags: ["tafel", "tagesangebot", "special", "kürbis", "kuerbis", "suppe", "sturm"] },
        { url: A + "kuerbissuppe.webp", tags: ["kürbiscremesuppe", "kürbissuppe", "kuerbissuppe", "suppe"] }
      ],
      seed: () => [
        { id: "a1", tpl: "reel", v: "dark", date: d(1), status: "draft", f: { url: A + "pizza-zucca.mp4", hook: "Pizza con zucca.\nNur im Herbst." }, caption: "Kürbis, Zucchini, Lauch, Speck. Aus dem Holzofen. 🍕🎃" },
        { id: "a2", tpl: "special", v: "dark", date: d(2), status: "draft", img: A + "kuerbissuppe.webp", f: { kicker: "Kürbis & Sturm", title: "Kürbis-\ncremesuppe", price: "5,80", sub: "Mit Obershaube, Kernen und Kernöl" }, caption: "Die Suppe zur Saison. Nur bis Ende November." },
        { id: "a3", tpl: "offer", v: "light", date: d(3), status: "draft", img: A + "pizza-im-ofen.webp", f: { kicker: "Aus dem Holzofen", title: "Pizza con zucca", price: "15,50", sub: "Kürbis · Zucchini · Lauch · Speck" }, caption: "Herbst auf der Pizza." },
        { id: "a4", tpl: "event", v: "dark", date: d(5), status: "draft", img: A + "tafel.webp", f: { date: "Kürbis\n& Sturm", title: "Unsere Herbstkarte ist da", sub: "Kürbis-Lasagne · Kürbisrisotto · Sturm ¼ l 3,90" }, caption: "Kürbis & Sturm: die Saisonkarte bis Ende November." },
        { id: "a5", tpl: "today", v: "accent", date: d(6), status: "draft", f: { kicker: "Heute", big: "erst ab\n17 Uhr", sub: "Dann aber mit vollem Holzofen!" }, caption: "" },
        { id: "a6", tpl: "offer", v: "dark", date: d(8), status: "draft", img: A + "tiramisu.webp", f: { kicker: "Dolce", title: "Tiramisù\ndella casa", price: "Fatto in casa", sub: "Hausgemacht, jeden Tag frisch" }, caption: "Der Abschluss, der immer passt." }
      ],
      old: [A + "spaghetti-muscheln.webp", A + "pizza-rucola.webp", A + "pizzaiolo.webp"]
    },
    fuchsbau: {
      id: "fuchsbau", name: "Beisl Fuchsbau", typ: "wirt", typLabel: "Wirtshaus / Beisl", real: false,
      bio: "Wiener Küche in Butterschmalz · 1070 Wien",
      brand: Object.assign({}, window.TFT_BRAND_DEFAULT, { headFallback: "Georgia", bodyFallback: "Inter", fonts: [], tone: "Wienerisch, frech, Du-Form.", dos: "Butterschmalz, Handwerk, Stammtisch", donts: "Keine Prozent-Rabatte" }),
      media: [
        { url: "", name: "seebarsch_grill_02.jpg", tags: ["seebarsch", "wolfsbarsch", "branzino", "fisch", "grill"] },
        { url: "", name: "schnitzel_pfanne_05.jpg", tags: ["schnitzel", "wiener", "butterschmalz"] },
        { url: "", name: "gansl_tranchiert_03.jpg", tags: ["gansl", "gans", "martini"] },
        { url: "", name: "kuerbissuppe_01.jpg", tags: ["kürbis", "kuerbis", "suppe"] },
        { url: "", name: "schanigarten_regen_01.jpg", tags: ["unwetter", "regen", "schlechtwetter", "schanigarten"] },
        { url: "", name: "lokal_aussen_abend.jpg", tags: ["offen", "geschlossen", "zu", "ruhetag"] }
      ],
      seed: null, old: null
    }
  };

  // Übersicht für die Kundenliste (Demo: 12 von 66)
  const LIST = [
    { id: "adriano", name: "Adriano", typ: "Italiener / Pizza", t: "ital", plan: "Retainer", posts: 6, review: 0 },
    { id: "fuchsbau", name: "Beisl Fuchsbau", typ: "Wirtshaus / Beisl", t: "wirt", plan: "Retainer", posts: 6, review: 0, fictional: true },
    { name: "Pizzeria Beispiel", typ: "Italiener / Pizza", t: "ital", plan: "Retainer", posts: 8, review: 3, fictional: true },
    { name: "Café Beispiel", typ: "Café / Bäckerei", t: "cafe", plan: "Retainer", posts: 10, review: 0, fictional: true },
    { name: "Bar Beispiel", typ: "Bar / Late Night", t: "bar", plan: "Projekt", posts: 4, review: 2, fictional: true },
    { name: "Sushi Beispiel", typ: "Asiatisch", t: "asia", plan: "Retainer", posts: 8, review: 1, fictional: true },
    { name: "Heuriger Beispiel", typ: "Heuriger / Weinbar", t: "heuriger", plan: "Saison", posts: 3, review: 0, fictional: true },
    { name: "Burger Beispiel", typ: "Burger / Imbiss", t: "imbiss", plan: "Retainer", posts: 12, review: 4, fictional: true },
    { name: "Steakhaus Beispiel", typ: "Fine Dining", t: "fine", plan: "Retainer", posts: 6, review: 0, fictional: true },
    { name: "Konzerthaus Beispiel", typ: "Event-Location", t: "event", plan: "Projekt", posts: 5, review: 1, fictional: true },
    { name: "Fischrestaurant Beispiel", typ: "Restaurant", t: "fine", plan: "Retainer", posts: 7, review: 0, fictional: true },
    { name: "Gasthaus Beispiel", typ: "Wirtshaus / Beisl", t: "wirt", plan: "Retainer", posts: 6, review: 2, fictional: true }
  ];

  const bkey = id => "tft-brand-" + id;
  window.TFT_CLIENTS = CLIENTS;
  window.TFT_CLIENT_LIST = LIST;
  window.TFT_getBrand = function (id) {
    const c = CLIENTS[id] || CLIENTS.adriano;
    let o = {};
    try { o = JSON.parse(localStorage.getItem(bkey(c.id)) || "{}"); } catch (e) {}
    const b = Object.assign({}, JSON.parse(JSON.stringify(c.brand)), o);
    b.colors = Object.assign({}, c.brand.colors, o.colors || {});
    return b;
  };
  window.TFT_saveBrand = function (id, brand) {
    try { localStorage.setItem(bkey(id), JSON.stringify(brand)); return true; } catch (e) { return false; }
  };
  window.TFT_resetBrand = function (id) { try { localStorage.removeItem(bkey(id)); } catch (e) {} };
  window.TFT_currentClient = function () {
    const q = new URLSearchParams(location.search).get("k");
    if (q && CLIENTS[q]) { try { localStorage.setItem("tft-client", q); } catch (e) {} return q; }
    try { const s = localStorage.getItem("tft-client"); if (s && CLIENTS[s]) return s; } catch (e) {}
    return "adriano";
  };
  window.TFT_setClient = function (id) { try { localStorage.setItem("tft-client", id); } catch (e) {} const u = new URL(location.href); u.searchParams.set("k", id); location.href = u.toString(); };
  window.TFT_pickMedia = function (id, text) {
    const c = CLIENTS[id]; const low = (text || "").toLowerCase();
    const hit = c.media.find(m => m.tags.some(t => low.includes(t)));
    return hit || c.media[0];
  };
})();
