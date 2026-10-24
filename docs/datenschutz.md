# Datenschutz-Konzept (DSGVO)

**the first thought — Onboarding-, Kampagnen- und Content-Tool · Entwurf 24.10.2026**

> Das ist ein technisch-organisatorischer Entwurf, keine Rechtsberatung. Vor dem Echtbetrieb sollte ihn eine Datenschutz-Juristin oder die WKO-Datenschutzberatung prüfen. Die Grundsätze dahinter sind aber klar, und das Tool wird von Anfang an danach gebaut.

## 1. Grundsätze in fünf Sätzen

1. **So wenig wie möglich:** Das Tool speichert Betriebsdaten der Lokale, keine Gästedaten. Keine Kassen-Rohdaten, keine Reservierungslisten, keine Kundenkarteien der Wirte.
2. **In der EU, wo es geht:** Datenbank und Dateien liegen in der EU (Supabase Frankfurt, SharePoint im EU-Tenant). Wo ein Dienst außerhalb der EU sitzt, gibt es einen Vertrag und so wenig Daten wie nötig.
3. **Videos und Fotos bleiben in SharePoint:** Das Tool speichert nur Verweise und holt kurzlebige Links zum Abspielen.
4. **Alles hat ein Ablaufdatum:** Für jede Datenart steht fest, wann sie gelöscht wird, und das passiert automatisch.
5. **Jeder sieht nur, was er braucht:** Rollen mit Login, Zwei-Faktor für das Team, Protokoll, wer was geändert hat.

## 2. Wer ist wer

| Rolle | Wer | Was das heißt |
|---|---|---|
| **Verantwortlicher** | the first thought GmbH | Entscheidet, wofür das Tool genutzt wird. Muss Verarbeitungsverzeichnis, Datenschutzhinweise und Verträge haben. |
| **Auftragsverarbeiter** | la'ver studio (Bola) | Baut und betreibt das Tool im Auftrag. Braucht einen **Auftragsverarbeitungsvertrag (AVV)** mit the first thought. |
| **Unter-Auftragsverarbeiter** | Supabase, Netlify, Anthropic, Microsoft, Telegram, E-Mail-Dienst | Hosting, KI, Dateien, Bot. Werden im AVV aufgelistet. |
| **Betroffene** | Wirte und ihre Mitarbeiter (Kontaktdaten, Nachrichten), Personen auf Fotos und Videos, Team von the first thought | Haben Auskunfts-, Lösch- und Widerspruchsrechte. |

Sonderfall: Kommt ein Gast auf ein Foto, verarbeitet the first thought das im Auftrag des Wirts oder eigenverantwortlich, je nach Vertrag. **Das klärt die Juristin.**

## 3. Welche Daten, wo, wie lange

| Datenart | Beispiel | Wo | Rechtsgrundlage | Löschung |
|---|---|---|---|---|
| Stammdaten Kunde | Name, Adresse, Ansprechperson, Telefon, E-Mail | Supabase (Frankfurt) | Vertrag | 1 Jahr nach Vertragsende, Rechnungsdaten 7 Jahre (BAO) |
| Fragebogen | Antworten, Notizen, Unterschrift | Supabase | Vertrag / vorvertraglich | wie Stammdaten; bei Nicht-Kunden nach 6 Monaten |
| Öffentliche Recherche | Google-Bewertungszahlen, Follower, Konkurrenz | Supabase | berechtigtes Interesse | 12 Monate, dann neu erheben |
| Kampagnen, Konzepte, Präsentationen | Texte, PDFs | Supabase | Vertrag | wie Stammdaten |
| Bot-Nachrichten | „Heute Seebarsch …“ | Telegram + Supabase | Vertrag | **90 Tage**, danach nur Statistik ohne Text |
| Freigaben | Status, Kommentare | Supabase | Vertrag | 12 Monate |
| Freigabe-Links | Link + PIN | Supabase (nur Hash der PIN) | Vertrag | Link läuft nach 7 Tagen ab |
| Fotos & Videos | Shootings, Reels | **SharePoint** (EU-Tenant), im Tool nur Verweis | Vertrag + Einwilligung abgebildeter Personen | nach Vertrag mit dem Wirt |
| Brand-Kit | Logo, Farben, Schriften | Supabase Storage | Vertrag | wie Stammdaten |
| Team-Konten | Name, E-Mail, Rolle, Login-Protokoll | Supabase | Arbeitsvertrag | bei Austritt sperren, nach 6 Monaten löschen; Protokoll 12 Monate |

**Nicht im Tool:** Gästelisten, Reservierungen, Kassen-Bons, Zahlungsdaten, Gesundheitsdaten (Allergien einzelner Gäste), Ausweise.

## 4. Dienstleister und Verträge

| Dienst | Wofür | Sitz / Datenort | Vertrag | Bemerkung |
|---|---|---|---|---|
| **Supabase** | Datenbank, Login, Dateien | Region eu-central-1 (Frankfurt) | DPA auf supabase.com/legal/dpa | Region beim Anlegen fix wählen |
| **Netlify** | Website und Funktionen | USA, Rechenzentren auch EU | DPA (netlify.com/pdf/netlify-dpa.pdf), EU-US Data Privacy Framework + Standardvertragsklauseln | Funktionen in Frankfurt ausführen (ab Pro-Tarif) |
| **Anthropic (Claude API)** | Texte, Ideen, Einordnung | USA, **keine EU-Region** | DPA, Standardvertragsklauseln | Keine Nutzung für Training. **Zero-Data-Retention beantragen.** Nur Betriebsdaten senden, keine Namen von Privatpersonen. Modelle Opus/Sonnet nutzen, nicht Fable (30 Tage Aufbewahrung). |
| **Microsoft 365 / SharePoint** | Fotos und Videos | EU, wenn der Tenant in der EU liegt | Microsoft-DPA (bereits Teil eures M365-Vertrags) | Zugriff des Tools nur auf den einen Medien-Ordner (Graph-Berechtigung „Sites.Selected“) |
| **Telegram** | Kunden-Bot | Dubai / Server weltweit | **kein AVV angeboten** | siehe Abschnitt 5 |
| **E-Mail-Versand** (z. B. Resend) | Benachrichtigungen | USA/EU | DPA | Nur Team-Benachrichtigungen, keine Kundendaten im Text |

## 5. Telegram: Entscheidung und Absicherung

Ihr habt euch für Telegram entschieden. Es ist gratis, schnell eingerichtet und für Bots sehr gut. Der Haken: **Telegram bietet keinen Auftragsverarbeitungsvertrag an.** Das ist das größte Datenschutz-Risiko im ganzen Tool. So halten wir es klein:

- **Nur geschäftliche Kommunikation mit dem Wirt.** Keine Gästenamen, keine Fotos von Gästen, keine Bestellungen über den Bot.
- **Datenschutzhinweis beim Start:** Der Bot sagt beim ersten Kontakt, dass die Nachrichten über Telegram laufen, was gespeichert wird und wie lange. Der Wirt bestätigt mit einem Tipp.
- **Freiwillig mit Alternative:** Wer Telegram nicht will, schreibt per E-Mail oder WhatsApp. Das landet über einen zweiten Kanal im selben Dashboard.
- **Kurze Speicherung bei uns:** Nachrichten werden nach 90 Tagen gelöscht. In Telegram selbst kann der Wirt den Verlauf jederzeit löschen.
- **Austauschbar gebaut:** Der Bot ist als eigene Schicht gebaut. Ein Wechsel auf WhatsApp Business ist später ohne Umbau möglich, falls die Juristin oder ein Kunde das verlangt.

Diesen Punkt sollte die Juristin ausdrücklich ansehen.

## 6. KI (Claude)

- Claude bekommt die Kundenakte (Betriebsdaten), öffentliche Recherche und die Nachricht des Wirts, aber keine Gästedaten.
- Anthropic nutzt API-Daten nicht zum Training. Mit Zero-Data-Retention werden Anfragen nach der Verarbeitung nicht gespeichert.
- Fotos, die Claude verschlagworten soll, gehen nur als verkleinerte Vorschau hin und nur, wenn keine erkennbaren Gäste drauf sind (Team markiert beim Hochladen).
- Im Datenschutzhinweis von the first thought steht, dass KI zur Ideenfindung genutzt wird.
- Keine automatisierten Entscheidungen über Personen. Claude macht Vorschläge, Menschen entscheiden.

## 7. Fotos und Videos mit Personen

- **Recht am eigenen Bild (§ 78 UrhG) und DSGVO:** Für erkennbare Personen braucht es eine Einwilligung. Das Tool speichert pro Shooting, wer unterschrieben hat (Model Release), und warnt, wenn ein Foto ohne Freigabe verwendet werden soll.
- **Mitarbeiter des Wirts:** Einwilligung schriftlich, widerrufbar. Bei Widerruf markiert das Tool alle betroffenen Medien.
- **Gäste im Hintergrund:** Nur unkenntlich oder mit Einwilligung.
- **Referenz-Reels von anderen Accounts:** Nur Link, Zahlen und Cover, keine Profildaten. Kein automatisches Massen-Auslesen (Scraping) im ersten Schritt.

## 8. Technische und organisatorische Maßnahmen

- Login mit Magic Link oder Passkey, **Zwei-Faktor-Pflicht für das Team**
- Rollen: Owner, Strategie, Crew (nur zugewiesene Kunden), Freelancer (ein Kunde, befristet)
- Datenbank-Regeln (Row-Level-Security): Jede Abfrage prüft, ob die Person den Kunden sehen darf
- Verschlüsselung bei Übertragung (HTTPS) und Speicherung (Supabase Standard)
- Änderungsprotokoll: wer wann was geändert, freigegeben oder gelöscht hat
- Tägliches Backup in der EU, Wiederherstellung einmal im Quartal testen
- iPad für den Fragebogen: Geführter Zugriff, kein Speichern nach dem Absenden, Gerät mit Code
- PIN der Freigabe-Links nur als Hash gespeichert, 3 Fehlversuche → Sperre
- Eigene Schriften und Bibliotheken selbst hosten, keine Google Fonts oder CDN-Aufrufe im Echtbetrieb (IP-Übermittlung)
- Kein Tracking, keine Werbe-Cookies im Tool
- Automatische Löschläufe für alle Fristen aus Abschnitt 3

## 9. Rechte der Betroffenen

- **Auskunft und Export:** Knopf im Cockpit: „Alle Daten zu diesem Kunden exportieren“ (JSON + PDF).
- **Löschung:** Knopf „Kunde löschen“ mit Bestätigung. Rechnungsdaten bleiben wegen Aufbewahrungspflicht, alles andere geht.
- **Berichtigung:** Kunde meldet sich per Bot oder E-Mail, das Team korrigiert.
- **Datenpanne:** Ablauf festlegen: wer informiert die Datenschutzbehörde binnen 72 h.

## 10. Was the first thought dafür braucht (Checkliste)

- [ ] AVV zwischen the first thought GmbH und la'ver studio
- [ ] Liste der Unter-Auftragsverarbeiter als Anhang zum AVV
- [ ] DPA-Annahme bei Supabase, Netlify, Anthropic; ZDR bei Anthropic beantragen
- [ ] Eintrag ins Verarbeitungsverzeichnis von the first thought
- [ ] Datenschutzhinweis für Kunden (Fragebogen, Bot, Freigabe-Links), ergänzt um KI und Telegram
- [ ] Model-Release-Vorlage für Shootings (Mitarbeiter, Gäste)
- [ ] Löschkonzept (Abschnitt 3) freigeben
- [ ] Prüfung, ob eine Datenschutz-Folgenabschätzung nötig ist (voraussichtlich nicht, weil keine sensiblen Daten in großem Umfang)
- [ ] Juristische Prüfung von Telegram (Abschnitt 5) und der Rollenverteilung bei Gästefotos

## 11. Prototyp vs. echte Version

Der Prototyp auf Netlify ist eine Demo und **darf nicht mit echten Kundendaten genutzt werden**:
- Er lädt Google Fonts und Bibliotheken von fremden Servern (CDN). Im Echtbetrieb wird alles selbst gehostet.
- Er speichert Demo-Daten im Browser (localStorage). Im Echtbetrieb liegt alles in Supabase mit Login.
- Die PIN-Prüfung läuft im Browser. Im Echtbetrieb prüft der Server.
- Das GitHub-Repo ist öffentlich und sollte auf privat gestellt werden.

## 12. Offen zur Klärung

1. Liegt euer Microsoft-365-Tenant in der EU? (Admin-Center → Einstellungen → Organisationsprofil → Datenspeicherort)
2. Gibt es bei the first thought schon einen Datenschutzhinweis und ein Verarbeitungsverzeichnis?
3. Wer ist Ansprechperson für Datenschutz bei the first thought?
4. Gibt es eine Model-Release-Vorlage, die ihr heute bei Shootings nutzt?
5. Juristin oder WKO-Beratung für die Prüfung: wer, bis wann?

## 13. Das Reel „10 ways your vibecoded app is getting sued“: was davon für uns gilt

Das Video zählt US-Fälle mit US-Strafen auf (FTC, ADA, COPPA, CAN-SPAM, Illinois-Biometrie-Gesetz). Für ein B2B-Tool in Österreich sieht es so aus:

| Punkt im Video | Gilt bei uns? | Was wir tun |
|---|---|---|
| 1 · Marketing ohne Einwilligung | EU-Pendant: TKG/UWG für Newsletter und Werbe-Nachrichten | Das Tool verschickt keine Werbung. Der Bot antwortet nur, wenn der Wirt schreibt. |
| 2 · Kein DMCA-Agent | Nein, US-Recht | – |
| 3 · Unverschlüsselte Daten | Ja, DSGVO Art. 32 | Verschlüsselung bei Übertragung und Speicherung (Abschnitt 8) |
| 4 · Keine KI-Richtlinie | Teilweise, DSGVO-Transparenz und EU AI Act | KI-Nutzung im Datenschutzhinweis; Menschen prüfen jeden Post vor Veröffentlichung |
| 5 · Face ID ohne Einwilligung | Ja, biometrische Daten sind besonders geschützt | **Keine Gesichtserkennung.** Claude verschlagwortet Gerichte und Räume, keine Personen. |
| 6 · Meta-Pixel vor Cookie-Zustimmung | Ja (für Websites) | Das Tool hat kein Tracking. Bei Kunden-Websites: Pixel erst nach Zustimmung. |
| 7 · Kein Alt-Text | Barrierefreiheitsgesetz gilt für bestimmte Verbraucher-Dienste; internes B2B-Tool eher nicht | Trotzdem: Das Tool schlägt für jeden Post automatisch einen Alt-Text vor (gut für Instagram und Google). |
| 8 · Keine Altersabfrage | Nein (keine Kinder-Zielgruppe); bei Alkohol-Werbung Jugendschutz beachten | Keine Alkohol-Rabatte in Vorlagen |
| 9 · Kein Abmelden | Ja, sinngemäß | Bot versteht „STOP“, danach keine Nachrichten mehr, Daten nach Frist gelöscht |
| 10 · Unbelegte KI-Versprechen | Ja, UWG (irreführende Werbung) | the first thought verspricht keine KI-Ergebnisse, die es nicht belegen kann |

Die Dollar-Beträge im Video sind US-Strafen. Die DSGVO-Strafen in Österreich sind theoretisch höher, in der Praxis bekommen kleine Betriebe bei Erstverstößen aber meist eine Verwarnung. Entscheidend ist, dass Verträge, Hinweise und Löschfristen da sind. Genau das deckt dieses Konzept ab.
