# Handoff — LISS Reinigungsservice website

Stand: 2026-09-28. Geschrieben für den nächsten, der an diesem Projekt
weiterarbeitet — egal ob Mensch oder neue Claude-Code-Sitzung ohne
Gedächtnis an dieses Gespräch. Ersetzt die frühere Fassung vom
2026-08-20 vollständig (dieses Dokument ist ein Schnappschuss, keine
Historie — die vollständige Historie steht in `git log` und in
`compliance/COMPLIANCE.md`).

## 1. Goal

Static HTML/CSS/JS website for **LISS Reinigungsservice**, eine
Gebäudereinigungsfirma mit Sitz in **Schwarmstedt** (nicht Hannover —
das war lange ein Platzhalter, siehe §3). B2B: Büros, Arztpraxen,
Treppenhäuser, 80–1.500 m². Kein Framework, kein Build-Schritt — jede
Seite öffnet direkt im Browser. Deutscher Markt, deutsches Recht
(Impressum, DSGVO, UWG, BFSG) gilt durchgehend.

## 2. Aktueller Stand — großer Sprung seit der letzten Übergabe

- **Live-Domain:** https://liss-reinigungsservice.de/ — funktioniert,
  eigenes SSL-Zertifikat (GitHub-Pages-Standard, automatisch
  ausgestellt). **Noch auf `noindex`/`robots.txt: Disallow: /`** — siehe
  §5, ein Pflichtfeld im Impressum fehlt noch.
- **Repository:** https://github.com/Magiaservice/lass-website (jetzt
  **privat**, Branch `main`). **Eigentümerwechsel am 28.09.2026:**
  vorher `Lexikal` (Entwickler-Konto), jetzt vollständig auf ein Konto
  im Namen des Kunden (**Hassan Daoud**) übertragen. Der bisherige
  Entwickler-Account (`Lexikal`) wurde von GitHub beim Transfer
  automatisch als Collaborator mit Schreibrecht beibehalten — Zugriff
  für weitere Arbeit ist also weiterhin da, ohne dass der Kunde etwas
  tun musste.
- **Domain/E-Mail:** bei **STRATO**, Konto des Kunden. DNS zeigt per
  A-Record (Apex, `185.199.108.153`) und CNAME (`www` →
  `lexikal.github.io` — historisch benannt, zeigt aber korrekt auf die
  GitHub-Pages-Infrastruktur) auf die Website. **Die eigentlichen
  Website-Dateien liegen weiterhin auf GitHub Pages**, nicht bei
  STRATO — STRATO übernimmt nur Domain-DNS und E-Mail
  (`info@liss-reinigungsservice.de`).
- **Lokale Arbeitskopie:** `~/Downloads/lass-website`. `git remote -v`
  zeigt jetzt `github.com/Magiaservice/lass-website.git` (nicht mehr
  `Lexikal`) — **vor jeder Aktion neu prüfen**, falls diese Datei
  veraltet ist.
- **GitHub-Pages-Falle, falls das je wieder passiert:** Ein
  Eigentümerwechsel UND jeder Wechsel auf ein privates Repository
  deaktiviert die Pages-Konfiguration automatisch (private Pages sind
  eine kostenpflichtige GitHub-Funktion, das Konto hier ist kostenlos).
  Fix jedes Mal gleich: Repo öffentlich stellen (`gh api -X PATCH
  repos/<owner>/<repo> -f private=false`, oder manuell in den
  Settings — beide Wege können vom Auto-Mode-Classifier blockiert
  werden, dann bleibt nur die manuelle Web-UI: Settings → Danger Zone),
  **und** unter Settings → Pages → Source einmal manuell auf „GitHub
  Actions" umstellen (der eingebaute `GITHUB_TOKEN` kann eine neue
  Pages-Site nicht selbst anlegen — exakt derselbe Fehler wie beim
  allerersten Deploy am 17.08., siehe `git log 453c89a`).

## 3. Offene Punkte vor „richtigem" Launch (noindex aufheben)

Einziger verbliebener Pflichtangaben-Block im Impressum:

1. **Berufshaftpflichtversicherer** (Name + Anschrift) — Kunde hat
   gesagt, er hat den Nachweis „morgen" (Stand seiner letzten
   Nachricht, Datum unbekannt, vermutlich Ende September). Sobald da:
   in `impressum.html` eintragen, `compliance/OFFENE-PUNKTE.md` Punkt 4
   abhaken.
2. **Handwerkskammer-Zuständigkeit** — Impressum behauptet
   „Handwerkskammer Hannover", die echte Adresse (Schwarmstedt,
   Heidekreis) liegt aber möglicherweise im Gebiet einer anderen Kammer
   (Verdacht: Handwerkskammer Braunschweig-Lüneburg-Stade, nicht
   verifiziert). Kunde soll direkt bei der Kammer nachfragen. Siehe
   `compliance/OFFENE-PUNKTE.md` Punkt 4a.
3. **AVV-Status GitHub Pages / STRATO** — ungeprüft, siehe
   `compliance/OFFENE-PUNKTE.md` Punkt 3.
4. **KI-Video-Risiko (hero.mp4, zusagen.mp4, leistungen-bg.mp4)** —
   vom Kunden nach zwei unabhängigen juristischen Reviews als niedriges
   Risiko akzeptiert, aber **keine echte anwaltliche Freigabe**, siehe
   `compliance/OFFENE-PUNKTE.md` Punkt 10/12 für die volle Herleitung
   (§ 22 KUG geklärt/nicht anwendbar, Art. 50 KI-VO und § 5 UWG als
   Kundenentscheidung dokumentiert, nicht als Rechtsberatung).
5. Sobald noindex aufgehoben wird: `sitemap.xml`, `robots.txt`,
   `og:url` auf allen 12 Seiten und die URLs im `LocalBusiness`-JSON-LD
   zeigen noch auf `lexikal.github.io` — müssen dann auf die echte
   Domain umgestellt werden (bewusst noch nicht gemacht, siehe Commit
   `c903a97`).

Rechtstexte (Impressum/Datenschutz/AGB) sind weiterhin **nicht**
anwaltlich geprüft — das war nie Teil dieses Auftrags, nur die
technische Umsetzung.

## 4. Was in dieser Sitzung sonst noch passierte (28.09., kurz)

- Sichtbare KI-Kennzeichnung (`.ai-tag`) wurde am 22.08. eingeführt und
  noch am selben Tag auf Kundenwunsch wieder vollständig entfernt.
  **Steht nicht mehr im Code.** Nicht ohne erneute ausdrückliche
  Freigabe wieder einbauen (ausdrücklicher Kundenwunsch, siehe
  `compliance/OFFENE-PUNKTE.md`).
- Hero-Rechner (`.hv .calc`) ist jetzt halbtransparent statt voll
  deckend, damit das Hintergrundvideo auf breiten Bildschirmen sichtbar
  bleibt — siehe Commit `3bacab0`.
- Für die Arbeit mit dem Kunden: er ist technischer Laie, braucht sehr
  kleinschrittige, screenshot-basierte Anleitung für alles außerhalb
  von Claude Code (STRATO-Panel, GitHub-Weboberfläche). Bewährt hat
  sich: exakte Klickpfade geben, nach jedem Schritt einen Screenshot
  anfordern statt mehrere Schritte auf Zuruf voraussetzen.

## 5. Für den nächsten Auftrag: 14 fehlende Stadtteilseiten

Steht weiterhin aus (`CLAUDE.md`, „Was als Nächstes ansteht"). **Wichtig,
neu seit dieser Sitzung:** `compliance/COMPLIANCE.md` (6. Durchgang)
warnt ausdrücklich vor Doorway-Page-Risiko, falls diese 14 Seiten
mechanisch nach dem Muster von `hannover-list.html` mit nur
ausgetauschtem Stadtteilnamen befüllt werden — jede Seite braucht
echte, unterschiedliche Inhalte (Referenzobjekte, Anfahrtsdetails,
FAQ-Auswahl), sonst Google-Spam-Risiko.

## 6. Abrechnung

Ein vollständiger, datierter Leistungsnachweis über alle 15
Arbeitstermine dieses Projekts (08.08.–28.09.2026) wurde am 28.09.2026
als Artifact erstellt und dem Nutzer als Grundlage für die
Rechnungsstellung übergeben — nicht Teil dieses Repositorys, nur hier
vermerkt, falls danach gefragt wird.
