# THE FIRST THOUGHT — Onboarding-Tool & Kampagnen-Maschine

**Konzept-Deep-Dive · Stand 23.10.2026 · von Bola (la'ver studio) für Minashe (the first thought GmbH)**
Grundlage: Gespräch vom 21.10.2026 (Pocket-Transkript, 87 Min.), Framburi-Case (Strategie + 3 Research-Reports + 33-Folien-Deck), thefirstthought.at, Franie-Fonts, Research-Report `01_RESEARCH_Deep-Dive.md` (gleicher Ordner).

---

## 0. In einem Absatz

Der Gastronom legt beim ersten Termin das iPad nicht aus der Hand, bis er 25 Minuten lang über sein Lokal geredet hat — nur dass er dabei tippt. Was er eingibt, landet nicht in einem PDF, sondern in einer Kundenakte, aus der eine Maschine über Nacht das baut, was bei Framburi noch zwei Tage Handarbeit waren: Deep-Dive, Wettbewerb, Benchmarks, drei bis sieben messbare Kampagnen mit Anlass, Dauer, KPI, Mechanik, Kreativ-Idee, Foto-/Video-Konzepten, Referenz-Reels — und daraus eine Präsentation im First-Thought-Look. Minashe sieht das Ergebnis im Admin, nicht der Kunde. Dazu ein vorgeplanter Jahreskalender pro Kunde — Feiertage, Saison und die Anlässe, die zu genau diesem Lokal passen (Martinigans fürs Wirtshaus, Valentinstag für die Weinbar, Semesterstart für den Imbiss neben der Uni) —, sodass Minashe zu jedem Anlass mit einem fertigen Konzept zum Kunden gehen und es verkaufen kann. Ab Freigabe wird daraus ein Content-Kalender, aus dem die Crew weiß, was sie wann bei wem wie filmt. **Das Tool ist ein reines Social-Media- und Werbe-Tool:** Es nimmt First Thought die Hintergrundarbeit ab — Recherche, Ideen, Konzepte, Präsentation, Planung — und macht die Antwort auf „Welche Kampagne machen wir?“ nicht mehr von der Tagesform des Teams abhängig.

---

## 1. Warum das Ding gebaut wird (aus dem Gespräch destilliert)

| Schmerz (Minashe, 21.10.) | Was das Tool dagegen tut |
|---|---|
| „Jeder der 66 Kunden hat dieselbe Frage: Was können wir tun, damit Kunden kommen?“ | Standardisierter Einstieg (Fragebogen) + individualisierte Antwort (Research + Kampagnen) pro Kunde |
| „Der größte Pain des Gastronomen: Er kann nicht messen, was die Agentur für ihn tut.“ | Jedes Konzept kommt mit Anlass, Dauer, KPI und einer **Mess-Empfehlung für den Wirt** (z. B. eigene Kassa-Taste, Code-Wort, QR) — als Text im Konzept. Das Tool selbst misst nicht und hängt an keine Kassa an |
| „Gratis / 1+1 Matcha ist keine Kampagne.“ · „Do it for the fries ist nicht trackbar und animiert zu weniger Umsatz.“ | Rezeptbuch mit geprüften Mechaniken; die KI darf nur Kampagnen vorschlagen, die messbar sind |
| „Weihnachten muss für jeden Gastronomen jetzt gestartet werden.“ | Anlass-Rollout: ein Anlass → 66 individualisierte Kampagnen in einem Batch |
| „Kampagnen-Ideen kosten das Team jedes Mal Stunden.“ | Die Maschine macht den ersten Wurf; Menschen kuratieren. Crew-App sagt jedem, was zu tun ist |
| „Claude kann keine Instagram-Links rausgeben.“ | Daten-Layer (TikTok Creative Center, Apify/EnsembleData, IG Graph API) → KI bekommt echte Permalinks + Views + Thumbnails und baut Referenz-Karten |
| „Ich will nur in der Theorie verstehen, wo was gehostet wird.“ | Ein Stack, ein Repo, ein Dashboard; Minashe bedient, Bola baut |
| „Vielleicht eine eigene App?“ | Web-App am iPad-Homescreen (PWA, ohne Browser-UI) — fühlt sich an wie App, kostet keinen App-Store |

---

## 1b. Was die Recherche am Konzept verändert hat (die 10 wichtigsten Befunde)

Details, Preise und Quellen stehen im Research-Report; hier nur, was Entscheidungen beeinflusst:

1. **So ein Tool gibt es nicht zu kaufen.** Kein SaaS kombiniert Kunden-Intake + CRM + KI-Kampagnen + Content-Kalender + Videografen-Briefs + Freigaben. Planable für 66 Marken käme auf ≈ 3.200 $/Monat, Later ≈ 760 $, Metricool erst im Custom-Tarif — und keines davon baut Kampagnen-Konzepte oder Anlass-Rollouts. Bauen ist richtig; das Posten selbst (Stories/Reels sind API-seitig überall eingeschränkt) sollte das Tool nicht übernehmen, sondern per Export/API an Metricool oder Buffer delegieren.
2. **Fragebogen-Maß:** 40–60 geschlossene + 5–8 offene Fragen passen in 20–30 Minuten; unbegleitet brechen Leute nach 7–8 Minuten ab → am iPad mit Minashe daneben ist die lange Version in Ordnung, der Remote-Link braucht eine Kurzfassung.
3. **Instagram-Links sind lösbar, aber nicht gratis und nicht ganz weiß.** Offiziell: Instagram-Hashtag-Suche (30 Hashtags pro 7 Tage, nur über Facebook-Login + App-Review), eigene Account-Insights, Meta Ad Library. TikTok Creative Center (Trends, Top Ads) ist nur als Website nutzbar, die TikTok-Research-API ist für kommerzielle Agenturen gesperrt. Was Minashe will — „diese konkreten Videos nachmachen“ — geht praktisch nur über Daten-Provider (Apify/ScrapeCreators, ≈ 1–2,6 $ pro 1.000 Datensätze): rechtlich gelb (ToS-/Account-Risiko, DSGVO-Datensparsamkeit). Empfehlung: offizielle Wege zuerst, Scraper als abschaltbarer Adapter, nur Permalink + Cover + Zahlen speichern, keine Creator-Profile.
4. **oEmbed liefert seit 11/2025 keine Thumbnails mehr** → Referenz-Karten brauchen entweder den offiziellen Embed-Code (lädt live) oder ein gecachtes Cover (Grauzone, nur intern).
5. **Claude API hat keine EU-Inference-Region** (nur „global“/„us“). Für Gastro-Daten heißt das: Zero-Data-Retention beantragen, nur Betriebsdaten (keine Gästedaten) an die KI schicken, AVV mit Anthropic. Alternative mit EU-Region: Claude über AWS Bedrock (Frankfurt) — Modellverfügbarkeit noch zu prüfen. Das muss Minashe als Verantwortlicher entscheiden.
6. **Kosten der KI sind klein:** bei 60 Kunden, je ein Research-Lauf + wöchentliche Kalender + Chats realistisch 90–160 $/Monat; Batch-Verarbeitung (Anlass-Rollout) kostet die Hälfte. Web-Suche 10 $ pro 1.000 Suchen.
7. **Keine Kassa-Anbindung.** Die Recherche hat Kassen-Schnittstellen (ready2order, APRO u. a.) mit untersucht, weil Minashe im Gespräch Messbarkeit als größten Schmerz der Gastronomen genannt hat. Für dieses Tool ist das **bewusst nicht im Umfang**: Messbarkeit steckt im Konzept (jede Kampagne sagt, woran man den Erfolg erkennt und wie der Wirt mitzählt), nicht in der Software. Die Befunde bleiben im Research-Report, falls das später ein eigenes Produkt wird.
8. **Google-Daten:** Performance-API (Anrufe, Routen, Website-/Menü-Klicks) braucht ein Cloud-Projekt mit manueller Freischaltung; Reviews lesen/antworten geht; die Q&A-API ist seit 11/2025 abgeschaltet. Anreize für Reviews sind verboten — Google sperrt Profile.
9. **Recht, kurz:** PrAG § 9a (30-Tage-Tiefstpreis) gilt laut WKO für Waren; Gastro-Leistungen fallen unter UWG § 2 → trotzdem Fixpreise statt Prozent-Claims kommunizieren (sicher, merkbar). GewO § 112 „Apfelsaft-Paragraph“: zwei alkoholfreie Getränke müssen billiger sein als das billigste alkoholische — relevant für jede Bier-Happy-Hour. Gewinnspiele: 5 % Glücksspielabgabe auf den Preiswert, Bagatellgrenze 500 €/Jahr Abgabe; Kopplung an Kauf ist erlaubt, Werbe-Einwilligung getrennt.
10. **Minashes Würfel-Beispiel, nachgerechnet:** Doppel-Sechs ist 1/36 → im Schnitt ≈ 2,8 % Rabatt, nicht 10 %. Erst „jeder Pasch gewinnt“ (1/6) kommt auf ≈ 17 %. Genau solche Rechnungen soll das Rezeptbuch automatisch mitliefern (Erwartungswert, Worst Case, Abgabe).

Bonus aus dem Anlasskalender: Christkindlmarkt Rathausplatz 13.11.–26.12.2026 · Opernball Do 4.2.2027 · Semesterferien Wien 1.–6.2.2027 · Faschingsdienstag 9.2.2027 · Muttertag 9.5.2027 · Donauinselfest 25.–27.6.2027 · Schulbeginn Wien 6.9.2027 · Kaiser Wiesn 23.9.–10.10.2027.

---

## 2. Produktidee: eine Küche, vier Stationen

Das Tool heißt wie die Agentur: **the first thought** — es ist das Werkzeug, mit dem der erste Gedanke für jeden Kunden entsteht. Die Module heißen wie Stationen in einer Küche — passt zu „Let's cook tasty content“ und erklärt sich dem Team von selbst.

```
                 ┌────────────────────────────────────────────────────────┐
   iPad beim     │  1 · MISE EN PLACE   Kunden-Fragebogen (PWA, offline)  │
   Kunden   ───▶ │     → Kundenakte wird angelegt / vorbefüllt            │
                 └───────────────┬────────────────────────────────────────┘
                                 ▼
                 ┌────────────────────────────────────────────────────────┐
   läuft über    │  2 · KÜCHE   Agenten (Claude API)                      │
   Nacht         │     Research → Strategie → Referenzen → Deck → Kalender│
                 └───────────────┬────────────────────────────────────────┘
                                 ▼
                 ┌────────────────────────────────────────────────────────┐
   Minashe/Bola  │  3 · COCKPIT   Admin & CRM                             │
   im Büro       │     Kundenakte · Pipeline · Freigaben · Chat mit Claude│
                 │     · Rezeptbuch (Mechaniken + Anlasskalender)         │
                 └───────────────┬────────────────────────────────────────┘
                                 ▼
                 ┌────────────────────────────────────────────────────────┐
   Crew          │  4 · PASS   Crew-App                                   │
   am Set        │     Drehplan · Shotlist · Brand-Cheat-Sheet · Refs     │
                 └────────────────────────────────────────────────────────┘
```

Alles ein Code-Repo (`bolavernes/thefirstthough`), eine Datenbank, ein Login — nur unterschiedliche Rollen sehen unterschiedliche Oberflächen.

---

## 3. Station 1 · MISE EN PLACE — der iPad-Fragebogen

### 3.1 Prinzipien
1. **Fühlt sich an wie ein Gespräch, nicht wie ein Formular.** Eine Frage pro Screen, große Touch-Ziele, Fortschrittsbalken, Franie-Typo, schwarzer Hintergrund mit Pink-Akzenten — der Kunde merkt: Das ist die Agentur, die anders ist.
2. **Der Kunde tippt so wenig wie möglich.** Chips, Slider, Karten zum Antippen, „Das oder das“-Swipes. Freitext nur dort, wo die eigene Sprache des Gastronomen Gold wert ist (Story, Lieblingsgericht, größter Ärger).
3. **Vorbefüllen statt abfragen.** Sobald Name + Adresse stehen, zieht das Tool im Hintergrund Google-Business-Profil (Rating, Reviews, Öffnungszeiten, Kategorie), Website (Speisekarte, Texte), Instagram/TikTok (Follower, Posting-Frequenz) — der Kunde bestätigt nur noch. Das ist der erste „Wow“-Moment am Tisch.
4. **Kein Ergebnis am iPad.** Am Ende steht „Danke — wir melden uns mit einem Vorschlag“. Die Antwort kommt als Präsentation, nicht als Chatbot-Output. (Minashe: „Er dreht sich um, ich drücke Enter.“ — genau, nur dass Enter die Nacht arbeitet.)
5. **Funktioniert auch ohne WLAN im Lokal.** Antworten werden lokal gespeichert und synchronisiert, sobald Netz da ist.
6. **Mehrsprachig von Tag 1:** Deutsch, Englisch; Russisch/Serbokroatisch/Türkisch als spätere Sprachpakete (viele Wiener Gastronomen antworten ehrlicher in der Muttersprache).

### 3.2 Ablauf (ca. 25 Minuten, 9 Kapitel, adaptiv nach Betriebstyp)

| # | Kapitel | Was gefragt wird (Auszug) | Input-Form |
|---|---|---|---|
| 1 | **Das Lokal** | Name, Adresse, Betriebstyp (Restaurant / Café / Bar / QSR / Heuriger / Event-Location / Hotel-Gastro), Sitzplätze innen/außen, Öffnungszeiten, seit wann, Inhaber:in, Entscheider:in für Marketing | Vorbefüllt aus Google, Chips |
| 2 | **Die Story** | „Warum gibt es euch?“, „Was würde fehlen, wenn ihr morgen zusperrt?“, Herkunft, Küche, Chef:in, Produzenten | 3 Freitexte (Sprachaufnahme möglich → Transkript) |
| 3 | **Helden & Karte** | Top-3-Gerichte nach Verkauf, Top-3 nach Marge, das „Instagram-Gericht“, Signature-Drink, Preisniveau, Speisekarten-Upload (Foto reicht — wird erkannt) | Karten + Upload |
| 4 | **Gäste & Zeiten** | Wochen-Heatmap Mo–So × Frühstück/Lunch/Nachmittag/Abend/Late: „voll · okay · leer“ per Tap; Gästetypen (Stammgäste, Touristen, Büro, Studis, Familien, Nachtschwärmer) mit Anteil-Slider; Durchschnittsbon | Tap-Grid, Slider |
| 5 | **Ziel & Schmerz** | „Was soll in 90 Tagen anders sein?“ (mehr Umsatz / bestimmte Tageszeit füllen / neue Gäste / Stammgäste binden / Eröffnung / Reputation / Recruiting), konkrete Zahl wenn möglich, größter Ärger (Reviews, Portion, Preis, Personal, Konkurrenz) | Priorisierung per Drag, Zahlfeld |
| 6 | **Marketing bisher** | Kanäle + Zugänge (IG, TikTok, FB, Google, Website, Newsletter, Wolt/Lieferando), bisherige Agentur, Budget/Monat (Chips: 0 · <300 · 300–700 · 700–1.500 · >1.500), was hat schon mal funktioniert, was nie | Chips, Freitext |
| 7 | **Nachbarschaft & Konkurrenz** | Karte mit Radius: „Wer ist um dich herum?“ — 3 direkte Konkurrenten antippen, Anker in der Nähe (Uni, Spital, Büro, Markt, Bühne, Bars, Hotel) | Map-Picker |
| 8 | **Marke & Ton** | „Das oder das“ (12 Swipes: laut/leise, frech/elegant, Dialekt/Hochdeutsch, Du/Sie, Humor/Handwerk …), 3 Marken die du magst, No-Gos, Farben/Logo-Upload, Tabus (Alkohol-Werbung, Religion, Politik) | Swipe-Karten, Upload |
| 9 | **Rahmen & Freigaben** | Kapazität für Aktionen (Personal, Küche), Spielräume bei Preisen/Rabatten, Öffnungszeit-Tests möglich?, Zugänge zu Instagram/TikTok/Google-Profil freigeben, DSGVO-Einwilligung + AVV, Unterschrift | Chips, Toggle, Signatur |

Adaptive Logik: Ein Heuriger bekommt Fragen zu Ausg'steckt-Zeiten, eine Bar zu Sperrstunde und Events, ein Konzerthaus (House of Strauss) zu Programm & Ticketing, eine Neueröffnung zu Eröffnungsdatum statt „Was lief bisher“.

### 3.3 Modi
- **Gast-Modus (Kunde allein am iPad):** keine Navigation außerhalb des Fragebogens, iPad „Geführter Zugriff“ (Apple-Bordmittel), Logout nach Abschluss.
- **Begleitet (Minashe sitzt daneben):** Interviewer-Notizen pro Frage, „überspringen & später“, Sprachaufnahme des Gesprächs → Transkript als Anhang.
- **Remote-Link:** Kunde füllt zu Hause aus (Link per Mail/WhatsApp, 7 Tage gültig).
- **Nachfassen:** Jedes Jahr / jede Saison ein 5-Minuten-Update („Was hat sich geändert?“).

---

## 4. Station 2 · KÜCHE — die Agenten

Alles läuft über die Claude API (nicht über den Chat/Max-Abo — das ist ein eigener Vertrag mit Token-Abrechnung, siehe Research-Report Kap. 4). Technisch: Messages API mit Tool-Use und strukturierten Ausgaben, ausgeführt in Hintergrund-Jobs (Netlify Background Functions bis 15 Min. oder ein Job-Runner wie Inngest) — das Agent SDK selbst ist für Netlify-Functions ungeeignet. Jeder Agent ist ein definierter Job mit Input, Werkzeugen, Output-Schema und Prüfregeln. Reihenfolge nach Abschluss des Fragebogens:

| Agent | Input | Werkzeuge | Output (im Cockpit sichtbar) | Dauer |
|---|---|---|---|---|
| **Research** | Kundenakte, Speisekarte, Zugänge | Web-Suche/-Fetch, Google-Places-Daten, IG/TikTok-Daten-Provider, Wettbewerber-Scan (Radius + Sparte), Agenturmarkt, Presse | 3 Reports wie bei Framburi: *Deep-Dive · Wettbewerb Wien/AT · Benchmarks & Mechaniken* — mit Quellen-URLs | 10–20 Min. |
| **Strategie** | Fragebogen + Research + Rezeptbuch + Anlasskalender | Mechanik-Bibliothek, KPI-Baum-Vorlage, Rechtsregeln AT | Strategie-Dokument: Thesen, Status quo, **3–7 Kampagnen** (jede: Anlass · Dauer · Ziel · Zielgruppe · Angebot · Mechanik · KPI + Mess-Empfehlung · Kreativ-Serie · Foto-/Video-Konzepte · Budget · Risiken/Recht), Ideenbank, Content-System, Timeline, Budget-Szenarien, Bedarf vom Kunden | 5–10 Min. |
| **Referenzen** | Kampagnen, Sparte, Stadt | Trend-Datenlayer: offiziell (IG-Hashtag-Suche über Facebook-Login, eigene Insights, Meta Ad Library, TikTok Creative Center kuratiert) + optionaler Scraper-Adapter (Apify/ScrapeCreators); Referenz-Bibliothek | Pro Kampagne 3–6 **Referenz-Karten**: Permalink, Cover (offizieller Embed oder gecacht), Views/Likes, warum es passt, was wir anders machen. Claude bekommt die Kandidaten als JSON und wählt/begründet — es „erfindet“ keine Links | 2–5 Min. |
| **Deck** | Strategie + Referenzen + Brand-Vorlage | HTML→PDF-Renderer mit Franie/Thefirstfont, klickbare Links | **Präsentation** (16:9 oder 320×180) im First-Thought-Look + Web-Version mit Link | 1–2 Min. |
| **Kalender** | freigegebene Kampagnen | Content-System-Regeln, Drehtag-Logik, Kapazität der Crew | **Content-Kalender** (Posts, Stories, Drehtage, Deadlines) + **Shotlists** je Drehtag | 1–2 Min. |
| **Anlass-Planer** | Anlasskalender + Kundenakte (Küche, Lage, Zielgruppe) | Rezeptbuch, Batch-Verarbeitung | Je Kunde ein vorgeplanter Jahresplan; 6–8 Wochen vor jedem Anlass ein fertiges Konzept zum Verkaufen (siehe Kap. 7) | über Nacht |

Dazu der **Projekt-Chat**: Im Cockpit kann man mit Claude über *diesen* Kunden reden — „Mach aus Kampagne 2 einen Fixpreis statt Prozent“, „Schreib 10 Hooks für die Late-Night-Serie“, „Verschieb den Drehtag auf KW 47“. Der Chat hat die ganze Kundenakte als Kontext und darf Kampagnen, Kalender und Shotlists ändern — jede Änderung wird protokolliert und ist rückgängig machbar.

**Leitplanken für die KI (hart kodiert):**
- Keine Kampagne ohne messbares Ziel. Keine Prozent-Claims bei wiederkehrenden Aktionen (PrAG § 9a → Fixpreis). Keine Anreize für Google-Reviews. Alkohol nie im Rabatt-Bundle. Gewinnspiele nur mit Teilnahmebedingungen.
- Jede Zahl hat eine Quelle oder ist als Hypothese markiert.
- Was die Maschine nicht weiß, fragt sie — als offene Punkte im Dokument, nicht als erfundene Fakten.

---

## 5. Station 3 · COCKPIT — Admin & CRM

**Pipeline-Ansicht:** Lead → Onboarding → Research → Strategie → Angebot an Kunde → Freigabe → Produktion → Live → Nachbesprechung. Jeder Kunde ist eine Karte; Minashe sieht auf einen Blick, wo die 66 stehen.

**Kundenakte (360°):**
- Stammdaten, Entscheider, Verträge, Budget, Retainer-Status
- Fragebogen (Antworten + Interviewer-Notizen + Audio-Transkript)
- Brand-Kit: Logo, Farben, Fonts, Tonalität, Do/Don'ts, Hooks, Bildsprache, Beispiel-Captions — **der Teil, den die Crew als Cheat-Sheet bekommt**
- Kanäle & Zugänge: Instagram, TikTok, Facebook, Google-Profil, Website
- Research-Reports (3), Strategie-Dokument, Deck(s) mit Versionen
- Kampagnen (Status: Idee → angeboten → verkauft → umgesetzt; KPI-Ziel; Ergebnis, wenn der Kunde es mitteilt)
- Content-Kalender + Shotlists + Asset-Links (Footage, Fotos, Lizenzen)
- Jahresplan mit Anlässen, Notizen, Aufgaben

**Rezeptbuch:** Mechanik-Bibliothek (jede Mechanik mit Mess-Empfehlung, Anlass-Fit, Recht, Beispiel, Ergebnis) + **Anlasskalender Österreich** (Feiertage, Schulferien Wien, Märkte, Ballsaison, Festivals, Food-Days) — beides pflegt das Team; die KI liest es. Jede gelaufene Kampagne fließt mit Ergebnis zurück ins Rezeptbuch → das System wird mit jedem Kunden klüger.

**Team & Rollen:** Owner (Minashe) · Strategie (Bola, Minashe) · Produktion (Fotograf:innen, Videograf:innen — nur zugewiesene Kunden, nur Kalender/Shotlist/Brand-Kit) · Freelancer (ein Kunde, zeitlich begrenzt) · Kunde (nur eigene Freigaben, optional).

**Tagesgeschäft-Automationen (die kleinen Dinge, die Minashe im Gespräch begeistert haben):**
- Tagesangebot per Telegram/WhatsApp vom Gastronomen („Goldbrasse vom Grill“) → Story-Vorlage im Brand + Kreidetafel-Block auf der Website.
- Speisekarten-Foto → strukturierte Karte (Allergene, Preise, Fehlerliste) → PDF + Website + Screens.
- Review-Antwort-Vorschläge für die vier Kritik-Cluster.

---

## 6. Station 4 · PASS — die Crew-App

Mobile Ansicht (Handy, auch als PWA) für Fotograf:innen und Videograf:innen:
- **Heute/Diese Woche:** Drehtage mit Adresse, Ansprechperson, Uhrzeit, Dauer, Parken, Besonderheiten („kein Außen-Sound“, „Küche ab 15 Uhr frei“).
- **Pro Dreh:** Shotlist (Reihenfolge, Format 9:16/16:9, Dauer, Hook, Referenz-Reel-Karten, benötigte Props/Personen), Checkliste, Lizenz-Hinweise (Musik, Model Release).
- **Brand-Cheat-Sheet** des Kunden (eine Seite): Ton, Do/Don'ts, Farben, Beispielbilder, „so reden die Gäste“.
- **Abgabe:** Link zum Upload (Drive/Dropbox/Frame.io), „Dreh erledigt“ + Notizen → Kalender rückt weiter, Strategie sieht Status.
- **Push/Telegram:** „Morgen 10:00 Adriano, Shotlist aktualisiert“.

Damit beantwortet sich Minashes Frage „Wie wissen Mitarbeiter, welcher Content für welchen Kunden wie gefilmt gehört?“ ohne dass er es erklärt.

---

## 6b. Content-Studio, Freigabe & Kunden-Bot

**Content-Studio (nur Team):** Posts, Stories und Reel-Vorschauen entstehen aus Vorlagen pro Kunde: Angebot, Event, Countdown, Gäste-Stimme, Tagesangebot, Heute-Info (offen, geschlossen, Schlechtwetter) und Reel. Schrift, Farben und Logo kommen aus dem Brand-Kit und sind gesperrt. Die Feed-Vorschau zeigt das Profil, wie es nach dem Posten aussieht. Export als PNG plus Caption an Metricool oder die Meta Business Suite. Kein freier Canva-Ersatz, nur Vorlagen.

**Layout-Editor (nur Team):** Pro Kunde lassen sich eigene Vorlagen bauen, entweder aus einer Standardvorlage als Start oder leer. Foto, Texte, Logo, Preis-Badge, Flächen, Rahmen und Verläufe werden per Maus oder Finger verschoben und an den Ecken skaliert; pro Element gibt es Schriftgröße, Zeilenabstand, Ausrichtung und eine Farbrolle aus dem Brand-Kit (Schrift, Akzent, Hintergrund). Schriften und Farben selbst bleiben gesperrt, damit jede Variante zum Kunden passt; zu lange Texte werden automatisch kleiner. Rückgängig, Raster und Text-Befehle („Logo oben rechts“, „Headline größer“) sind eingebaut. Gespeicherte Vorlagen erscheinen im Content-Studio mit ★ und, wenn angehakt, als Variante im Kunden-Bot. Im Freigabe-Link reist das Layout mit, der Kunde sieht also genau das, was das Team gebaut hat.

**Reels:** Die Video-Dateien bleiben in SharePoint. Das Tool speichert nur den Verweis und holt beim Abspielen über Microsoft Graph einen kurzlebigen Download-Link (App-Berechtigung nur auf den Medien-Ordner, „Sites.Selected“). Kein Kopieren, kein zweiter Speicherort.

**Freigabe (Kunde):** Der Kunde bearbeitet nichts. Er bekommt einen Link per WhatsApp und die PIN separat. Pro Post tippt er „Passt“ oder „Ändern“ mit Kommentar. Kein Login. Der Link läuft nach 7 Tagen ab, nach 3 falschen PINs ist er 60 Sekunden gesperrt. Ohne Antwort nach 48 h gilt der Post als freigegeben, der Kunde wird vorher erinnert. In der echten Version prüft der Server die PIN und speichert die Antworten direkt in der Kundenakte.

**Kunden-Bot (Telegram, entschieden 24.10.):** Alles, was ein Kunde will, schreibt er dem Bot. Jede Nachricht landet im **Anfragen-Dashboard** (Neu, In Arbeit, Automatisch erledigt, Erledigt; mit Kunde, Art und Frist). Vereinbarte Basics wie Tagesangebot, offen/geschlossen oder Schlechtwetter baut der Bot sofort und schickt das fertige Bild zurück. Alles andere („Ich brauch ein Foto von …“) wird eine Aufgabe fürs Team. Der Wirt schreibt „Heute Seebarsch vom Grill 24,90“ oder „Heute zu wegen Unwetter“. Claude erkennt Gericht, Preis oder Grund, wählt die Vorlage, nimmt ein passendes Foto aus der verschlagworteten Mediathek des Kunden (Fotos aus euren Shootings, Schlagworte vergibt Claude beim Hochladen) und schickt 3 Varianten zurück. „Nimm 2“ → je nach Kunde direkt als Story online oder erst zur Kontrolle an the first thought. Telegram ist gratis, bietet aber keinen Auftragsverarbeitungsvertrag, siehe Datenschutz-Konzept, Abschnitt 5. Offen: ob Bot-Stories direkt online gehen dürfen oder immer erst zur Kontrolle (pro Kunde einstellbar).

---

## 6c. Trend-Radar: virale Reel-Ideen pro Kundentyp

Einmal pro Woche (z. B. Montag 7 Uhr) bekommt Minashe pro Kundentyp ein **Viral-Briefing**: die 5–10 Reels, die in der Sparte gerade überdurchschnittlich laufen, mit Link, Views, warum es funktioniert, und für welche Kunden sich das Format eignet („passt zu Beisl Fuchsbau und Gasthaus X“). Es liegt im Dashboard und kommt als Telegram-Nachricht ans Team.

**Woher die Daten kommen:**
- **TikTok Creative Center** (gratis): trendende Sounds, Hashtags und Creator nach Land. Keine Schnittstelle, daher als Website oder über einen Apify-Baustein (ca. 1,50 $ pro 1.000 Einträge).
- **Instagram-Hashtag-Suche** (offiziell, gratis): Top-Beiträge zu #wienessen, #foodvienna, #schnitzel … (30 Hashtags pro Woche).
- **Beobachtungsliste:** 50–100 Gastro-Accounts aus Wien, DACH und international (z. B. Fabel Friet, Frittenwerk). Das Tool holt deren neue Reels über einen Daten-Anbieter (Apify oder ScrapeCreators, ca. 1–2,60 $ pro 1.000 Treffer) und markiert Ausreißer: Views im Verhältnis zur Follower-Zahl.
- **Team-Funde** aus der Referenz-Bibliothek.

**Apps, die es dafür schon gibt** (Stand Oktober 2026; keine davon hat eine offene Schnittstelle mit Video-Links für Nischen-Trends, deshalb eher als Ergänzung):
- TrendTok (ca. 20 $/Jahr): TikTok-Trend-Sounds und -Hashtags nach Region
- Pentos (99–999 $/Monat): TikTok-Analysen
- Trendpop (jetzt Teil von Collab): Agentur-Preise auf Anfrage
- Buzzsumo (ab 199 $/Monat), RivalIQ (ab 239 $/Monat): Konkurrenz- und Content-Analyse
- Metricool (ab ca. 20 $/Monat): Konkurrenz-Vergleich auf Instagram/TikTok

**Kosten fürs Tool:** realistisch 30–150 $/Monat Daten-Anbieter, plus Claude für die Auswertung (wenige Dollar pro Woche).
**Recht:** Nur Link, Zahlen und Cover speichern, keine Profildaten, 90 Tage Löschfrist; Daten-Anbieter sind eine Grauzone (Datenschutz-Konzept, Abschnitt 7).

---

## 7. Der Anlass-Planer — fertige Konzepte, bevor der Kunde fragt

Das ist der Teil, mit dem Minashe Geld verdient: Das Tool weiß das ganze Jahr im Voraus, welcher Anlass zu welchem Kunden passt, und legt rechtzeitig ein fertiges Konzept auf den Tisch.

**1 · Anlasskalender (für alle):** Feiertage, Schulferien Wien, Advent & Christkindlmärkte, Silvester, Ballsaison (Opernball 4.2.2027), Fasching/Krapfen, Valentinstag, Ostern, Muttertag (9.5.2027), Vatertag, Pride, Donauinselfest (25.–27.6.2027), Sommerferien, Schulbeginn (6.9.2027), Sturm-/Heurigenzeit, Kaiser Wiesn, Halloween, Martini (11.11.), Black Friday, Nikolo — plus internationale Food-Days (Tag der Pommes, Pizza-Tag, Burger-Tag …). Liegt verifiziert im Research-Report vor.

**2 · Anlass × Kundentyp:** Jeder Anlass hat Regeln, zu wem er passt. Beispiele:
| Anlass | passt zu | passt nicht zu |
|---|---|---|
| Martinigans (Nov.) | Wirtshaus, Beisl, Hotel-Restaurant | Sushi, Burger, Café |
| Krapfen / Fasching | Café, Bäckerei, Konditorei | Steakhouse |
| Valentinstag | Fine Dining, Weinbar, Italiener | Imbiss (außer mit Augenzwinkern) |
| Semesterstart / Uni-Montag | Imbiss, QSR, Café in Uni-Nähe | Fine Dining |
| Sturm & Heuriger | Heuriger, Wirtshaus, Weinbar | Asiatisch |
| Opernball / Ballsaison | Bar, Late-Night, Café (Frühstück danach) | Mittagslokal |

Die KI ergänzt das pro Kunde aus der Kundenakte (Küche, Lage, Zielgruppe, Ton) und schlägt auch Anlässe vor, die nur für diesen Kunden Sinn machen (Ario Café neben dem AKH → „Nachtdienst-Teller“).

**3 · Jahresplan pro Kunde:** Nach dem Onboarding bekommt jeder Kunde automatisch einen Jahresplan mit 8–12 passenden Anlässen. Minashe sieht im Cockpit: „In 6 Wochen ist Martini — für diese 14 Kunden passt das.“

**4 · Konzept auf Knopfdruck (oder automatisch 6–8 Wochen vorher):** Pro Kunde und Anlass ein verkaufsfertiges Konzept: Idee · Mechanik · Angebot · Dauer · Ziel/KPI · wie der Wirt den Erfolg sieht · Foto-/Video-Konzept · Referenz-Reels · grobe Kosten. Als Präsentation im First-Thought-Look, die Minashe dem Kunden schickt oder zeigt.

**5 · Rollout für alle:** Für große Anlässe (Weihnachten, Silvester, Valentinstag) läuft ein Batch über alle passenden Kunden — 66 individualisierte Konzepte über Nacht, nicht 66 Mal dieselbe Vorlage.

**6 · Lernen (Ergebnis eintragen → Rezeptbuch):** Ist eine Kampagne vorbei, erscheint sie im Dashboard unter „Heute dringend“, und der Telegram-Bot fragt den Wirt nach der Zahl („Wie viele FORNO-Bestellungen hattet ihr?“). Das Team bestätigt in 20 Sekunden: gut / mittel / schlecht, erreichte Zahl gegen das Ziel, ein Satz, nochmal machen ja / anders / nein. Daraus wird eine Zeile im **Rezeptbuch** mit einer Lehre in einem Satz. Wenn Claude den nächsten Vorschlag baut, sucht das Tool die passenden Zeilen heraus (gleiche Mechanik, gleiche Sparte, gleicher Kunde) und gibt sie als Kontext mit: Gutes wird stärker gewichtet, Schlechtes vermieden, Sätze wie „Service vorher briefen“ kommen als Warnung mit. Claude selbst wird dabei nicht trainiert; das Wissen liegt lesbar in der eigenen Datenbank von the first thought und kann korrigiert oder gelöscht werden. Im Prototyp: Seite „Kampagnen“ pro Kunde mit Pipeline (Idee → angeboten → verkauft → läuft → fertig), „Starten“ legt die Posts direkt im Content-Studio an.

---

## 8. Technik (Kurzfassung — Details & Preise im Research-Report, Kap. 4)

- **Frontend:** React + Vite als PWA (eine Codebasis, drei Oberflächen: Fragebogen / Cockpit / Crew), Tailwind mit First-Thought-Tokens, offline-fähig (Service Worker + IndexedDB), „Zum Home-Bildschirm“ am iPad.
- **Backend/Daten:** Supabase Pro (≈ 25 $/Monat, Region eu-central-1 Frankfurt — die konkrete Region wählen, nicht „Europe“): Postgres, Auth (Magic Link + Passkeys; Rollen per Custom-Access-Token-Hook + Row-Level-Security), Storage (Logos, Speisekarten, Decks), Realtime (Kalender-Updates). Netlify Identity ist seit 2/2025 abgekündigt — Netlify selbst empfiehlt Supabase Auth.
- **Hosting:** Netlify Pro (≈ 20 $/Monat; EU-Regionen fra/dub/lhr gibt es erst ab Pro) — Site + Functions (60 s) + Scheduled Functions + Background Functions (15 Min.) für Agenten-Läufe; Blobs mit explizit gesetzter EU-Region. Wenn die Agenten-Läufe länger oder parallel werden: Inngest oder Trigger.dev davor.
- **KI:** Claude API — Messages API mit Tool-Use, Web-Suche/-Fetch, strukturierte Ausgaben, Prompt-Caching (Cache-Reads ≈ 5 % des Preises), Batch (−50 %) für Rollouts. Pro Kunde ein Kontext-Paket (Kundenakte als Markdown + Rezeptbuch-Auszug), das für alle Agenten gecacht wird. Modellwahl: Sonnet 5.5 für Kalender/Chat/Anlass-Konzepte, Opus 5.5 für Research/Strategie. **Datenresidenz: keine EU-Inference-Region → ZDR beantragen + Pseudonymisierung, oder Claude über AWS Bedrock EU (prüfen).**
- **Daten-Layer Social:** Google Places/GBP (Performance-API mit Freischaltung), Instagram Graph API (eigene Accounts + Hashtag-Suche via Facebook-Login + App-Review + Business-Verifizierung), TikTok Business/Marketing API für eigene Konten, Meta Ad Library, TikTok Creative Center (kuratiert), Drittanbieter-Adapter (Apify/ScrapeCreators) — alles austauschbar, alles abschaltbar.
- **PDF:** HTML-Template (gleiches Design wie Web-Deck) → `@react-pdf/renderer` in einer Netlify-Function (Franie als **TTF** einbetten — OTF/Variable Fonts werden nicht unterstützt), Ablage in Supabase Storage (Antwortlimit 6 MB), klickbare Links, 16:9 oder 320×180. Falls echtes Chromium-Rendering nötig: Browserless (EU-Endpunkte).
- **Benachrichtigungen:** E-Mail (Resend), Telegram-Bot, optional Slack/WhatsApp.
- **Repo:** `bolavernes/thefirstthough` auf GitHub; Deploy-Previews pro Branch; Claude Code als Entwicklungsumgebung.
- **Datenschutz:** EU-Hosting, AVV mit Supabase/Netlify/Anthropic, Zero-Data-Retention-Option für die API, Rollen & Audit-Log, Backup täglich, Löschkonzept pro Kunde.

---

## 9. Ausbaustufen (Vorschlag)

| Phase | Wochen | Ergebnis | Test-Kunden |
|---|---|---|---|
| **0 · Fundament** | 1 | Fragebogen-Inhalt mit Minashe final, Datenmodell, Brand-Tokens, Repo, Supabase, Netlify, Rollen | — |
| **1 · Mise en Place + Cockpit light** | 2–3 | iPad-Fragebogen live (PWA, offline), Kundenakte, Pipeline, manuelle Kampagnen, Deck-Export aus Vorlage | Adriano, Chattanooga/Wiener Stadtbräu, Framburi (Daten vorhanden) |
| **2 · Küche** | 3–4 | Research-, Strategie-, Deck-Agent; Rezeptbuch mit 40+ Mechaniken + Anlasskalender; Projekt-Chat | dieselben 3 + House of Strauss |
| **3 · Pass + Kalender** | 2 | Content-Kalender, Shotlists, Crew-App, Telegram-Push | Crew von Minashe |
| **4 · Anlass-Planer & Rollout** | 2 | Anlasskalender, Anlass × Kundentyp-Regeln, Jahresplan pro Kunde, Batch-Rollout | alle |
| **5 · Referenzen** | 2 | Trend-Datenlayer, Referenz-Bibliothek, Reel-Karten in Konzepten | alle |
| **5b · Content-Studio, Freigabe & Bot** | 3–4 | Vorlagen-Editor mit Brand-Kit, Feed-Vorschau, Reel-Links, PIN-Freigabe, Telegram-Bot mit Mediathek | 3 Pilotkunden |
| **6 · Extras** | laufend | Tagesangebot-Bot, Speisekarten-Generator, Review-Antworten, Kundenportal | nach Bedarf |

Phase 1–2 sind in ~6 Wochen erreichbar, wenn Minashe im Fundament eine Woche lang täglich 30 Minuten für Fragebogen-Feedback hat.

---

## 10. Was das am Ende kostet (Größenordnung, Details im Report)

- **Infrastruktur:** Netlify Pro ≈ 20 $ + Supabase Pro ≈ 25 $ + Resend (E-Mail, gratis bis 3.000/Monat) ≈ **45–60 $/Monat**, solange keine großen Videos im System liegen (Footage bleibt in Drive/Dropbox/Frame.io; das Tool speichert Links).
- **Claude API:** bei 60 Kunden × (1 Research-Lauf + 4 Wochen-Kalender + ~40 Chat-Züge) ≈ 75 $ (Sonnet-lastig) bis 140 $ (Opus-lastig), mit Puffer **≈ 90–160 $/Monat**; Web-Suche 10 $ je 1.000 Suchen; Anlass-Rollout für 66 Kunden im Batch zum halben Preis.
- **Social-Daten-Provider:** 0 € (nur offizielle APIs) bis ≈ 50–200 $/Monat (Apify/ScrapeCreators je nach Volumen; Metricool Advanced ≈ 53 $/Monat als Posting-Backend optional).
- **Summe laufend:** realistisch **150–400 $/Monat** für den Vollbetrieb mit 66 Kunden.
- **Bau:** das ist zwischen Bola und Minashe zu klären (Pauschale für den Kern + projektbasiert für Erweiterungen; siehe Fragen).

---

## 11. Offene Fragen an Minashe & Bola

**A · Besitz, Geschäft, Marke**
1. Wem gehört das Tool — der first thought GmbH, la'ver studio, oder gemeinsam? Soll es später als White-Label an andere Agenturen gehen?
2. Wie wird der Bau abgerechnet: Pauschale für Phase 1–2 + projektbasiert danach, oder Beteiligung am Mehrumsatz, den das Tool bringt?
3. Wird das Onboarding dem Kunden verkauft („Strategie-Session inkl. Konzept-Deck“ als Produkt) oder ist es Akquise-Kosten?
4. Domain: `app.thefirstthought.at` (Cockpit + Crew) und `start.thefirstthought.at` (Kunden-Fragebogen)? Soll das Tool im Look der Website auftreten (Schwarz/Pink/Franie) oder bewusst ruhiger?

**B · Menschen & Rollen**
5. Wer bedient das Cockpit täglich — nur Minashe + Bola, oder weitere Teammitglieder? Wie viele Fotograf:innen/Videograf:innen und Freelancer brauchen Crew-Zugang?
6. Sprachen im Team (DE/EN/RU gehört): soll die Crew-App mehrsprachig sein? Sollen Kunden den Fragebogen auf Englisch/anderen Sprachen ausfüllen können?
7. Sollen Kunden selbst einen Zugang bekommen (Konzepte ansehen, freigeben) oder bleibt alles intern und per PDF/Link?

**C · Fragebogen**
8. Füllt der Gastronom allein aus oder sitzt Minashe immer daneben? (Entscheidet über Tonfall, Länge, Audio-Aufnahme.)
9. Welche Fragen fehlen aus Minashes Praxis — was fragt er heute beim ersten Termin immer, was nie? Welche Antworten waren bei bisherigen Kunden am wertvollsten?
10. Welche Zugänge geben Gastronomen realistisch her (GBP-Manager, Meta-Business)? Was ist die Erfahrung bei den 66?

**D · Kunden & Daten**
11. Welche 3 Pilot-Kunden? Vorschlag: Adriano, Chattanooga/Wiener Stadtbräu, Framburi; House of Strauss als Nicht-Gastro-Test.
12. Sollen die bestehenden 66 Kundenordner (A–Z, Standards, Contentpläne, Grafik) importiert werden — und wer räumt sie vorher auf?
13. Welche Kundentypen gibt es unter den 66 (Wirtshaus, Italiener, Asiatisch, Bar, Café, QSR, Fine Dining, Event-Location …) und wie viele je Typ? Davon hängen die Anlass-Regeln ab.
14. Wie weit im Voraus will Minashe ein Anlass-Konzept haben, um es verkaufen zu können (4, 6, 8 Wochen)?

**E · Kampagnen & Rezeptbuch**
15. Welche Kampagnen hat The First Thought schon gefahren — mit welchem Ergebnis? (Seed fürs Rezeptbuch: auch die, die nicht funktioniert haben.)
16. Welche Anlässe sind für Minashe Pflicht pro Jahr (Weihnachten, Silvester, Valentinstag, …) und welche sind tabu?
17. Grenzen: Wie weit darf die KI vorschlagen (Öffnungszeiten-Tests, PR-Stunts à la McShark, Preisaktionen)? Was muss immer ein Mensch freigeben, bevor es der Kunde sieht?

**F · Referenz-Reels**
18. Reicht TikTok Creative Center + Hashtag-/Keyword-Suche (offiziell, kostenlos) oder soll ein Drittanbieter-Scan (kostenpflichtig, Grauzone) dazu, der auch Instagram-Reels nach Sparte findet?
19. Dürfen fremde Reels als Thumbnail + Link in Kundenpräsentationen (intern ok; Kunde sieht Deck → Link statt eingebettetes Video)?

**G · Deck & Kalender**
20. Deck-Format: 16:9 (wie Framburi) oder 320×180 wie bei la'ver? Nur PDF oder auch Web-Deck mit Link? Sprache DE, EN bei Bedarf?
21. Welche Tools nutzt The First Thought heute für Content-Planung/Posting (Notion? Planable? Later? Meta Business Suite?) — ersetzt das Tool die Planung komplett, oder soll das Posting dort bleiben und nur exportiert werden?
22. Wie werden Drehtage heute geplant (Google Kalender?) — soll der Kalender des Tools dort hineinsynchronisieren (ICS)?

**H · Technik & Recht**
23. Claude-API-Konto: eigenes Console-Konto der first thought GmbH (Kosten laufen dort) oder über la'ver und Weiterverrechnung?
24. Wer ist datenschutzrechtlich Verantwortlicher (die first thought GmbH), wer Auftragsverarbeiter (la'ver)? Gibt es eine Datenschutzerklärung/AGB, die angepasst werden muss? Und: Ist US-Inference mit Zero-Data-Retention + Pseudonymisierung akzeptabel, oder muss es Claude über AWS Bedrock in Frankfurt sein?
24b. Welche Kundendaten dürfen an die KI: Fragebogen und öffentliche Daten ja, personenbezogene Gästedaten nein — passt diese Linie?
25. iPads: Wie viele, welche Generation, ist „Geführter Zugriff“/MDM in Ordnung?
26. GitHub-Repo `thefirstthough` ist leer, oder? Soll dort auch die Website-Migration später landen, oder nur das Tool?

**I · Zeit**
27. Ab wann braucht Minashe den Fragebogen am iPad — gibt es einen konkreten Termin (z. B. ein anstehender Neukunden-Termin), an dem das erstmals eingesetzt werden soll?
28. Wie viel Zeit kann Minashe in Phase 0 pro Tag für Feedback geben?

---

## 12. Nächste Schritte (Vorschlag)

1. Minashe beantwortet die Fragen (Sprachnachricht reicht — wird transkribiert und in die Akte übernommen).
2. Bola baut in Phase 0 den Fragebogen-Prototyp am iPad (klickbar, ohne Backend) → ein Termin zum Durchspielen.
3. Parallel: Rezeptbuch-Seed aus dem Research-Report + Framburi-Material; Brand-Tokens als Design-System im Repo.
4. Phase 1 mit Adriano/Chattanooga/Framburi als erste echte Akten.
