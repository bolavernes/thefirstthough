// Gemeinsamer Anfragen-Speicher für Bot und Dashboard (Demo: nur in diesem Browser)
(function () {
  const KEY = "tft-inbox-demo-v1";
  const now = Date.now(), h = 3600e3;
  const SEED = [
    { id: "s1", client: "Pizzeria Beispiel", text: "Brauchen Fotos von der neuen Kürbis-Pizza für die Karte, bis Donnerstag?", kind: "foto", status: "neu", due: "Diese Woche", created: now - 2 * h },
    { id: "s2", client: "Café Beispiel", text: "Heute Kürbiskuchen 4,90", kind: "basic", status: "auto", due: "", created: now - 3 * h, auto: true },
    { id: "s3", client: "Bar Beispiel", text: "Können wir für Halloween was machen? Gäste fragen schon.", kind: "idee", status: "arbeit", due: "Diese Woche", created: now - 26 * h, owner: "Minashe" },
    { id: "s4", client: "Pizzeria Beispiel", text: "Öffnungszeiten auf Google ändern: ab November Mo Ruhetag", kind: "aenderung", status: "neu", due: "Heute", created: now - 5 * h },
    { id: "s5", client: "Beisl Fuchsbau", text: "Heute geschlossen wegen Stromausfall", kind: "basic", status: "auto", due: "", created: now - 30 * h, auto: true },
    { id: "s6", client: "Café Beispiel", text: "Video vom Latte-Art-Kurs am Samstag?", kind: "video", status: "erledigt", due: "", created: now - 72 * h, owner: "Crew" }
  ];
  const read = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || "null"); if (Array.isArray(v)) return v; } catch (e) {} return SEED.slice(); };
  const write = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} };
  window.TFT_inbox = {
    KEY,
    all: read,
    add(t) { const l = read(); l.unshift(Object.assign({ id: "t" + Date.now(), created: Date.now(), status: "neu" }, t)); write(l); return l[0]; },
    update(id, patch) { const l = read(); const t = l.find(x => x.id === id); if (t) Object.assign(t, patch); write(l); },
    reset() { write(SEED.slice()); }
  };
  // Grobe Einordnung, in echt macht das Claude
  window.TFT_classify = function (text) {
    const low = " " + text.toLowerCase() + " ";
    if (/geschlossen| zu |ruhetag heute|urlaub|ab \d{1,2}(?:[:.]\d{2})?\s*uhr| offen | geöffnet /.test(low)) return "basic";
    if (/\d{1,3}[,.]\d{2}/.test(low) && /heute|neu|frisch|tages/.test(low) && !/karte|speisekarte|preise ändern/.test(low)) return "basic";
    if (/foto|bild|fotos|shooting/.test(low)) return "foto";
    if (/video|reel|dreh|filmen/.test(low)) return "video";
    if (/ändern|änderung|öffnungszeit|preis|karte|speisekarte|website|google/.test(low)) return "aenderung";
    if (/idee|kampagne|aktion|was machen|halloween|weihnacht|silvester|valentin/.test(low)) return "idee";
    return "sonstiges";
  };
  window.TFT_KIND = { basic: "Story (automatisch)", foto: "Foto-Wunsch", video: "Video-Wunsch", aenderung: "Änderung", idee: "Idee / Kampagne", sonstiges: "Sonstiges" };
})();
