// Kampagnen pro Kunde + Rezeptbuch (was das Tool aus Ergebnissen lernt)
// Demo: localStorage. Echt: Tabellen „campaigns“ und „playbook“ in Supabase, Claude bekommt die passenden Einträge als Kontext.
(function () {
  "use strict";
  const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // Mechanik-Bibliothek: was man tut + wie man es misst (ohne Kassa)
  window.TFT_MECH = {
    fixpreis: { label: "Fixpreis-Angebot an einem Tag", mess: "Kennwort beim Bestellen, Service macht Strichliste", unit: "Kennwörter pro Abend", recht: "Fixpreis statt Prozent-Rabatt (Preisauszeichnung)" },
    limitiert: { label: "Limitiertes Saisongericht", mess: "Verkaufte Portionen laut Bonierung zählen", unit: "Portionen", recht: "„Solange der Vorrat reicht“ nur, wenn wirklich begrenzt" },
    vorbestellung: { label: "Vorbestellung / Reservierung mit Kennwort", mess: "Reservierungen mit Kennwort im Buch markieren", unit: "Reservierungen", recht: "Storno-Regel klar kommunizieren" },
    gutschein: { label: "Gutschein mit Bonus", mess: "Verkaufte Gutscheine zählen", unit: "Gutscheine", recht: "Bonus als fixen Betrag, Gültigkeit angeben" },
    event: { label: "Event-Abend", mess: "Reservierungen für den Abend", unit: "Reservierungen", recht: "Bei Musik: AKM-Anmeldung prüfen" },
    stempel: { label: "Stempelkarte / Wiederkommer", mess: "Ausgegebene und eingelöste Karten zählen", unit: "eingelöste Karten", recht: "Bedingungen auf die Karte drucken" }
  };

  // Rezeptbuch: Start-Einträge (Beispiele, erfunden), danach alles, was das Team einträgt
  const RKEY = "tft-rezept-v1";
  const RSEED = [
    { id: "r1", client: "Beisl Fuchsbau", typ: "wirt", kamp: "Montag ist Schnitzeltag", anlass: "Wochentag", mech: "fixpreis", ziel: 50, ist: 61, unit: "Kennwörter pro Abend", rating: "gut", satz: "Montag war danach der zweitstärkste Tag.", again: "ja", datum: "2026-06-30", demo: true },
    { id: "r2", client: "Pizzeria Beispiel", typ: "ital", kamp: "Pizza-Dienstag 2 für 1", anlass: "Wochentag", mech: "fixpreis", ziel: 40, ist: 22, unit: "Kennwörter pro Abend", rating: "schlecht", satz: "2-für-1 hat Stammgäste nur billiger gemacht, kaum neue Gäste.", again: "nein", datum: "2026-05-12", demo: true },
    { id: "r3", client: "Pizzeria Beispiel", typ: "ital", kamp: "Trüffel-Wochen", anlass: "Herbst", mech: "limitiert", ziel: 200, ist: 236, unit: "Portionen", rating: "gut", satz: "Reel vom Hobeln am Tisch hat 40k Views gebracht.", again: "ja", datum: "2025-11-20", demo: true },
    { id: "r4", client: "Café Beispiel", typ: "cafe", kamp: "Krapfen-Vorbestellung", anlass: "Fasching", mech: "vorbestellung", ziel: 300, ist: 410, unit: "Reservierungen", rating: "gut", satz: "Vorbestellen über Instagram-DM war der Renner.", again: "ja", datum: "2026-02-18", demo: true },
    { id: "r5", client: "Bar Beispiel", typ: "bar", kamp: "Silvester-Gutschein", anlass: "Silvester", mech: "gutschein", ziel: 80, ist: 35, unit: "Gutscheine", rating: "schlecht", satz: "Zu spät gestartet, erst Mitte Dezember.", again: "angepasst", datum: "2026-01-03", demo: true },
    { id: "r6", client: "Adriano", typ: "ital", kamp: "Aperitivo im Schanigarten", anlass: "Sommer", mech: "fixpreis", ziel: 30, ist: 18, unit: "Kennwörter pro Abend", rating: "mittel", satz: "Gut besucht, aber das Kennwort wurde kaum abgefragt. Service vorher briefen.", again: "angepasst", datum: "2026-08-31", demo: true }
  ];
  window.TFT_rezept = {
    all() { try { const s = JSON.parse(localStorage.getItem(RKEY) || "null"); if (Array.isArray(s)) return s; } catch (e) {} return RSEED.slice(); },
    save(arr) { try { localStorage.setItem(RKEY, JSON.stringify(arr)); return true; } catch (e) { return false; } },
    add(entry) { const a = this.all().filter(x => x.id !== entry.id); a.unshift(entry); this.save(a); return entry; },
    reset() { try { localStorage.removeItem(RKEY); } catch (e) {} }
  };

  // Lehre in einem Satz (echt: formuliert Claude aus Ergebnis + Satz)
  window.TFT_lesson = r => {
    const m = TFT_MECH[r.mech] ? TFT_MECH[r.mech].label : r.mech;
    const zahl = r.ist != null && r.ziel ? ` (${r.ist} von ${r.ziel} ${r.unit})` : "";
    const head = r.rating === "gut" ? `${m} hat funktioniert${zahl}.` : r.rating === "mittel" ? `${m} ging teilweise${zahl}.` : `${m} hat nicht funktioniert${zahl}.`;
    return head + (r.satz ? " " + r.satz : "") + (r.again === "nein" ? " Nicht wiederholen." : r.again === "angepasst" ? " Nur angepasst wiederholen." : "");
  };

  // Kampagnen pro Kunde
  const KKEY = cid => "tft-kamp-" + cid + "-v1";
  const SEED = {
    adriano: [
      { id: "k1", title: "Holzofen-Montag", status: "fertig", anlass: "Wochentag", mech: "fixpreis", idee: "Jeden Montag: Pizza aus dem Holzofen + Glas Hauswein zum Fixpreis. Wer „FORNO“ sagt, bekommt das Angebot.", angebot: "Pizza + ¼ Hauswein 16,90 €", von: iso(2026, 9, 7), bis: iso(2026, 10, 19), ziel: 40, unit: "Kennwörter pro Abend", content: "1 Reel (Flamme, Teig), 2 Posts, jeden Montag 2 Stories" },
      { id: "k2", title: "Kürbis & Sturm", status: "laeuft", anlass: "Herbst", mech: "limitiert", idee: "Drei Wochen Kürbis aus dem Holzofen: Pizza con zucca, Kürbiscremesuppe, dazu Sturm vom Heurigen.", angebot: "Pizza con zucca 15,50 € · Suppe 5,80 €", von: iso(2026, 10, 12), bis: iso(2026, 11, 8), ziel: 180, unit: "Portionen", content: "1 Reel, 1 Event-Post, 6 Stories" },
      { id: "k3", title: "Weihnachtsfeiern 2026", status: "angeboten", anlass: "Weihnachtsfeiern & Gutscheine", mech: "vorbestellung", idee: "Firmen- und Familienfeiern im Holzofen-Raum: drei Menüs zum Fixpreis, Reservierung mit Kennwort „NATALE“.", angebot: "Menüs 39 / 49 / 59 € p. P.", von: iso(2026, 11, 2), bis: iso(2026, 12, 20), ziel: 12, unit: "Reservierungen", content: "1 Reel, 3 Posts, LinkedIn-Post für Firmen" },
      { id: "k4", title: "Pizza a cuore", status: "idee", anlass: "Valentinstag", mech: "fixpreis", idee: "Herzförmige Pizza für zwei mit Prosecco, nur am 13. und 14.2.", angebot: "Pizza a cuore + 2 Prosecco 39 €", von: iso(2027, 2, 13), bis: iso(2027, 2, 14), ziel: 30, unit: "Kennwörter pro Abend", content: "1 Reel, 1 Post, 3 Stories", src: "Anlass-Planer" }
    ],
    fuchsbau: [
      { id: "k1", title: "Montag ist Schnitzeltag", status: "laeuft", anlass: "Wochentag", mech: "fixpreis", idee: "Schnitzel in Butterschmalz mit Erdäpfelsalat zum Fixpreis, Kennwort „FUCHSBAU“.", angebot: "16,90 € inkl. Gurkensalat", von: iso(2026, 9, 1), bis: iso(2026, 11, 30), ziel: 50, unit: "Kennwörter pro Abend", content: "ASMR-Reel, 2 Posts, Stories jeden Montag" },
      { id: "k2", title: "Ganz Gansl — halb für zwei", status: "verkauft", anlass: "Martini — Gansl-Saison", mech: "vorbestellung", idee: "Das halbe Gansl für zwei, am Tisch tranchiert. Nur mit Reservierung.", angebot: "62 € für zwei", von: iso(2026, 11, 2), bis: iso(2026, 11, 29), ziel: 60, unit: "Reservierungen", content: "1 Reel, 1 Event-Post, 6 Stories" }
    ]
  };
  window.TFT_kamp = {
    all(cid) { try { const s = JSON.parse(localStorage.getItem(KKEY(cid)) || "null"); if (Array.isArray(s)) return s; } catch (e) {} return JSON.parse(JSON.stringify(SEED[cid] || [])); },
    save(cid, arr) { try { localStorage.setItem(KKEY(cid), JSON.stringify(arr)); return true; } catch (e) { return false; } },
    reset(cid) { try { localStorage.removeItem(KKEY(cid)); } catch (e) {} },
    // Kampagnen, die vorbei sind und noch kein Ergebnis haben
    missing(cid) { const t = new Date().toISOString().slice(0, 10); return this.all(cid).filter(k => (k.status === "fertig" || (k.status === "laeuft" && k.bis < t)) && !k.result); }
  };

  // Vorschlag bauen: Mechanik nach Rezeptbuch gewichten (echt: Claude mit Kundenakte + Rezeptbuch-Treffern als Kontext)
  const ANLASS_MECH = [
    [/valentin|muttertag|vatertag/i, ["fixpreis", "vorbestellung", "event"]],
    [/weihnacht|advent|gutschein|nikolo/i, ["vorbestellung", "gutschein", "event"]],
    [/silvester|opernball|ball/i, ["event", "vorbestellung", "gutschein"]],
    [/martini|gansl|ostern|brunch/i, ["vorbestellung", "limitiert", "fixpreis"]],
    [/fasching|krapfen|black friday/i, ["vorbestellung", "limitiert", "fixpreis"]],
    [/marathon|ferien|eistraum|schanigarten|sommer|fenstertag/i, ["fixpreis", "limitiert", "stempel"]],
    [/montag|dienstag|mittwoch|donnerstag|wochentag|ruhig|schwach|leer|mehr gäste/i, ["fixpreis", "stempel", "event"]]
  ];
  window.TFT_suggest = function (cid, client, input) {
    const rez = TFT_rezept.all();
    const cands = (ANLASS_MECH.find(([re]) => re.test(input)) || [null, ["fixpreis", "limitiert", "vorbestellung", "event"]])[1];
    const scored = cands.map((m, i) => {
      let score = 3 - i * 0.5; const used = [];
      rez.filter(r => r.mech === m).forEach(r => {
        const w = (r.client === client.name ? 2 : r.typ === client.typ ? 1.5 : 0.6) * (r.rating === "gut" ? 2 : r.rating === "mittel" ? 0.4 : -2.2);
        score += w; used.push({ r, w });
      });
      return { m, score, used: used.sort((a, b) => Math.abs(b.w) - Math.abs(a.w)) };
    }).sort((a, b) => b.score - a.score);
    const best = scored[0], M = TFT_MECH[best.m];
    const warn = rez.filter(r => r.typ === client.typ && r.rating !== "gut" && r.satz).slice(0, 2);
    return { mech: best.m, mechLabel: M.label, unit: M.unit, mess: M.mess, recht: M.recht, ranking: scored, warn };
  };
})();
