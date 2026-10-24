# the first thought — Onboarding- & Kampagnen-Tool

Konzept-Entwurf und klickbarer Prototyp für das interne Tool von **the first thought** (Wiener Gastro-Social-Media-Agentur).

| Pfad | Inhalt |
|---|---|
| `/` | Konzept-Übersicht mit interaktivem Anlass-Planer |
| `/fragebogen/` | iPad-Fragebogen (Demo, PWA, „Zum Home-Bildschirm“ → läuft ohne Browserleiste) |
| `/auswertung/` | Beispiel einer Kunden-Auswertung im Cockpit (erfundenes Lokal) |
| `/brandkit/` | Brand-Kit pro Kunde: Logo, Farben, Schriften (Upload), Ton, Mediathek, Live-Vorschau |
| `/vorlagen/` | Layout-Editor pro Kunde: Foto, Texte, Logo, Preis-Badge, Flächen per Drag & Drop anordnen, Rückgängig, Text-Befehle. Vorlagen erscheinen im Content-Studio (★) und optional im Kunden-Bot |
| `/content/` | Content-Studio mit Feed-Vorschau, Vorlagen, Freigabe-Link |
| `/bot/` · `/anfragen/` | Kunden-Bot (Simulation) und Dashboard mit Kundenliste |
| `/konzept/` | Vollständiges Konzept inkl. offener Fragen (`docs/konzept.md`) |
| `/research/` | Research-Report mit Quellen (`docs/research.md`) |

**Stand:** Entwurf vom 23.10.2026. Statische Seite ohne Build-Schritt. Der Fragebogen speichert Antworten nur lokal im Browser (Demo), es gibt noch kein Backend.

## Deploy auf Netlify
1. Netlify → *Add new site* → *Import an existing project* → GitHub → `bolavernes/thefirstthough`
2. Build command: leer lassen · Publish directory: `.` (steht schon in `netlify.toml`)
3. Deploy. Optional: Domain `app.thefirstthought.at` verbinden.

## Lokal ansehen
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Nächste Schritte (Phase 0/1)
Fragebogen-Inhalt mit Minashe finalisieren → Supabase (eu-central-1) + Auth → Kundenakte & Cockpit → Claude-Agenten (Research, Strategie, Präsentation) → Anlass-Planer.

---
Fonts: Franie & Thefirstfont aus dem Webauftritt von the first thought. Konzept & Umsetzung: la'ver studio.

## Beispielkunde Adriano
Logo, Farben und Fotos von Adriano liegen unter `assets/kunden/adriano/` (Fotos aus dem Website-Entwurf, Clips verkleinert). **Die Schriften Davida und ITC Newtext sind lizenzpflichtig und deshalb nicht im Repo.** Im Brand-Kit (`/brandkit/?k=adriano`) einmal hochladen, dann bleiben sie im Browser; bis dahin nimmt das Tool Ersatzschriften (Rye, Jost).
