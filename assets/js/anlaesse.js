// Anlasskalender Österreich/Wien Nov 2026 – Okt 2027 (Seed fürs Rezeptbuch)
// typ-Kürzel: wirt, ital, asia, imbiss, cafe, bar, fine, heuriger, event
window.TFT_TYPEN = [
  { id: "wirt", label: "Wirtshaus / Beisl" },
  { id: "ital", label: "Italiener / Pizza" },
  { id: "asia", label: "Asiatisch" },
  { id: "imbiss", label: "Burger / Imbiss" },
  { id: "cafe", label: "Café / Bäckerei" },
  { id: "bar", label: "Bar / Late Night" },
  { id: "fine", label: "Fine Dining" },
  { id: "heuriger", label: "Heuriger / Weinbar" },
  { id: "event", label: "Event-Location" }
];

window.TFT_ANLAESSE = [
  { m: "Nov", d: "11.11.", t: "Martini — Gansl-Saison", typ: ["wirt", "heuriger", "fine"] },
  { m: "Nov", d: "ab 13.11.", t: "Christkindlmarkt Rathausplatz", typ: ["cafe", "bar", "imbiss", "wirt"] },
  { m: "Nov", d: "27.11.", t: "Black Friday", typ: ["imbiss", "asia", "ital"] },
  { m: "Dez", d: "6.12.", t: "Nikolo", typ: ["cafe", "wirt"] },
  { m: "Dez", d: "Advent", t: "Weihnachtsfeiern & Gutscheine", typ: ["wirt", "ital", "asia", "fine", "heuriger", "event", "bar"] },
  { m: "Dez", d: "31.12.", t: "Silvester", typ: ["bar", "fine", "event", "imbiss"] },
  { m: "Jan", d: "1.1.", t: "Neujahr — Katerfrühstück", typ: ["cafe", "wirt", "imbiss"] },
  { m: "Jan", d: "Jän–Feb", t: "Ballsaison", typ: ["bar", "cafe", "fine", "event"] },
  { m: "Jan", d: "ab 22.1.", t: "Wiener Eistraum", typ: ["cafe", "imbiss", "bar"] },
  { m: "Feb", d: "1.–6.2.", t: "Semesterferien Wien", typ: ["imbiss", "cafe", "ital"] },
  { m: "Feb", d: "4.2.", t: "Opernball", typ: ["bar", "cafe", "fine"] },
  { m: "Feb", d: "9.2.", t: "Faschingsdienstag — Krapfen", typ: ["cafe", "bar"] },
  { m: "Feb", d: "10.2.", t: "Aschermittwoch — Heringsschmaus", typ: ["wirt", "fine", "heuriger"] },
  { m: "Feb", d: "14.2.", t: "Valentinstag", typ: ["fine", "ital", "heuriger", "bar", "asia"] },
  { m: "Mär", d: "20.–29.3.", t: "Osterferien", typ: ["cafe", "imbiss", "ital"] },
  { m: "Mär", d: "28.3.", t: "Ostern — Osterbrunch", typ: ["wirt", "cafe", "heuriger", "fine"] },
  { m: "Apr", d: "18.4.", t: "Vienna City Marathon", typ: ["ital", "cafe", "imbiss"] },
  { m: "Mai", d: "1.5.", t: "Staatsfeiertag — Schanigarten-Start", typ: ["wirt", "bar", "heuriger", "cafe"] },
  { m: "Mai", d: "9.5.", t: "Muttertag", typ: ["wirt", "cafe", "fine", "ital", "heuriger"] },
  { m: "Mai", d: "27.5.", t: "Fronleichnam — Fenstertag", typ: ["heuriger", "wirt", "bar"] },
  { m: "Jun", d: "13.6.", t: "Vatertag", typ: ["wirt", "imbiss", "heuriger"] },
  { m: "Jun", d: "Juni", t: "Vienna Pride", typ: ["bar", "cafe", "imbiss", "event"] },
  { m: "Jun", d: "25.–27.6.", t: "Donauinselfest", typ: ["imbiss", "bar"] },
  { m: "Jul", d: "ab 3.7.", t: "Sommerferien — Schanigarten", typ: ["cafe", "bar", "ital", "heuriger"] },
  { m: "Aug", d: "15.8.", t: "Mariä Himmelfahrt — Sommerloch-Aktion", typ: ["wirt", "ital", "asia"] },
  { m: "Sep", d: "6.9.", t: "Schulbeginn / Uni-Start", typ: ["imbiss", "cafe", "asia"] },
  { m: "Sep", d: "Sep–Okt", t: "Sturm & Heurigen-Saison", typ: ["heuriger", "wirt"] },
  { m: "Sep", d: "ab 23.9.", t: "Kaiser Wiesn", typ: ["wirt", "bar", "event"] },
  { m: "Okt", d: "26.10.", t: "Nationalfeiertag", typ: ["wirt", "heuriger", "cafe"] },
  { m: "Okt", d: "31.10.", t: "Halloween", typ: ["bar", "imbiss", "event"] }
];
