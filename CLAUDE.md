# LISS Reinigungsservice — Projektkontext

## Gemeinsame Arbeitsregeln

Vor jeder Aufgabe zuerst die gemeinsamen Regeln in `AGENTS.md` lesen und beachten. Dieses Dokument ergänzt die Claude-Code-spezifischen Hinweise weiter unten.

Website für LISS Reinigungsservice, eine neu gegründete Gebäudereinigungsfirma in
Hannover. Zielgruppe: SME-Kunden — Büros, Arztpraxen, Hausverwaltungen im Bereich
80–1.500 m². Alle Inhalte auf Deutsch, dieser Kontext auf Deutsch/Russisch gemischt,
je nachdem was der Nutzer schreibt.

## Positionierung

Drei Dinge unterscheiden LISS von der Konkurrenz in Hannover, und sie ziehen sich
durch die ganze Seite:

1. **Veröffentlichte Festpreise** — die meisten Wettbewerber schreiben „Preis auf
   Anfrage". LISS zeigt die Preisstaffel offen und hat einen Live-Rechner.
2. **24-Stunden-Angebotszusage** — kein Vor-Ort-Termin nötig, um eine Zahl zu
   bekommen.
3. **Foto-Protokoll nach jedem Einsatz** — Checkliste plus Fotos, das einzige
   nachprüfbare Qualitätsversprechen am Markt.

## Marke

- Name: **LISS Reinigungsservice** (nicht „Gebäudereinigung", nicht „LEIS" — beide
  Varianten wurden im Verlauf verworfen)
- Logo: `assets/mark-blue.png` (Kopf) und `assets/mark-white.png` (Footer, dunkle
  Flächen) — beschnittenes Signet aus dem Originallogo, nur der Schriftzug „Liss"
  mit dem geschwungenen L, ohne die Unterzeile „Gebäudereinigung"
- Markenblau exakt aus dem Logo extrahiert: `#012E89`
- Palette komplett in `assets/site.css` als CSS-Variablen definiert (`--tiefsee`,
  `--leisblau`, `--gletscher`, `--aqua` usw.) — **immer diese Variablen benutzen,
  nie neue Blautöne erfinden**
- Schrift: Archivo (Display/Fließtext), JetBrains Mono (Zahlen, Labels, Preise)

## Aktueller Stand

**Neun Content-Seiten** als eigenständige HTML-Dateien (kein Framework, kein
Build-Step nötig — einfach öffnen):

- `index.html` — Start: Hero mit Video, Preisrechner, Versprechen, Leistungen,
  Kennzahlen, angeheftete Scroll-Szene, Ablauf, Gebiete
- `leistungen.html` — alle 6 Leistungen mit vollem Leistungsverzeichnis
- `bueroreinigung.html` — Detailseite als Muster für die anderen 5 Leistungen
- `preise.html` — Preisliste, Staffelung, Vergleichstabelle
- `standorte.html` — Übersicht aller Stadtteile
- `hannover-list.html` — Muster-Stadtteilseite (14 weitere fehlen noch, siehe unten)
- `ueber-uns.html`, `faq.html`, `kontakt.html`
- `impressum.html`, `datenschutz.html`, `agb.html` — Entwurfstexte, **vor
  Veröffentlichung von einer Anwältin/einem Anwalt prüfen lassen**

Geteilte Dateien: `assets/site.css`, `assets/site.js` — einmal ändern, wirkt
überall.

**Parallax-Engine** in `site.js`: Elemente mit `data-px="0.2"` bewegen sich beim
Scrollen relativ zur Seite. Zusatzattribute: `data-px-x` (seitlicher Drift),
`data-px-rot` (Rotation), `data-px-scale` (Zoom), `data-px-op` (Ausblenden).
Zusätzlich: Blasenfeld (`bubbles()`), Wellenbänder (`waves()`), Fortschrittsbalken,
Maus-Neigung auf `.calc`, wortweise Überschriften-Einblendung, angeheftete
Scroll-Szene (`.scene-track` / `.scene-stick` / `.scene-step`).

**Preisrechner** (`.calc` in jedem HTML, Logik in `site.js`, Funktion `initCalc`):
Staffelpreis nach m² (0,90 € unter 150 m² → 0,58 € ab 800 m²), Objektfaktor
(Büro 1,0 / Praxis 1,25 / Treppenhaus 0,8 / Laden 1,1), Turnusfaktor. Mehrere
Instanzen pro Seite möglich, jede läuft unabhängig.

**Hero-Video** (`assets/hero.mp4` + `assets/hero-poster.jpg`): Makroaufnahme eines
Wassertropfens, nahtlos geloopt (4,9 s), H.264/yuv420p, ohne Tonspur, ~700 KB.
Läuft im `.vid-layer` hinter dem Hero-Text mit eigenem Parallax.

## Wichtige Entscheidungen — bitte nicht rückgängig machen ohne zu fragen

- **Büroreinigung ist keine Hauptnavigation**, sondern nur über die Leistungen-
  Übersicht erreichbar (Unterseite, nicht gleichrangig mit den 6 Leistungen)
- **Kein Framework.** Reines HTML/CSS/JS, damit jede Seite sofort im Browser
  läuft, ohne `npm install` oder Build-Schritt
- **Keine KI-generierten Menschen, Teamfotos oder „Referenzobjekte".** Rechtlich
  heikel unter § 5 UWG (Irreführung). Atmosphäre, Texturen, Mockups sind okay
- Farbpalette ist **navy/glacier**, keine warmen Töne — das war eine bewusste
  Korrektur nach einem früheren bläulich-türkisen Zwischenstand

## Was als Nächstes ansteht

1. **14 weitere Stadtteilseiten** nach dem Muster von `hannover-list.html`
   (Mitte, Linden, Südstadt, Vahrenwald, Bothfeld, Ricklingen, Misburg, Kleefeld,
   Döhren, Herrenhausen, Langenhagen, Laatzen, Garbsen, Isernhagen)
2. **5 weitere Leistungsseiten** nach dem Muster von `bueroreinigung.html`
   (Praxis-, Treppenhaus-, Glas-, Grund-, Bauendreinigung)
3. Echte Firmendaten in `impressum.html`, `datenschutz.html`, Telefonnummer,
   Adresse (aktuell Platzhalter „Musterstraße 1" / `+4951112345670`)
4. Zweites Hintergrundvideo für die angeheftete Scroll-Szene (Konzept und Prompts
   wurden bereits durchgesprochen, noch nicht generiert)
5. Bildmaterial für die 6 Leistungskarten (siehe Bildbriefing, falls mitgeliefert)

## Wenn du (Claude Code) hier weiterarbeitest

- Halte dich an die bestehende Optik — das ist bewusst kein generisches SaaS-
  Design, sondern hat einen eigenen redaktionellen Charakter (harte Kanten,
  Mono-Zahlen, viel Weißraum). Bevor du visuell etwas veränderst, schau dir
  `assets/site.css` an, um den bestehenden Stil zu verstehen.
- Alle Texte sind auf Deutsch und in einem sachlich-direkten Ton geschrieben,
  ohne Marketing-Floskeln. Neue Seiten sollten sich daran halten.
- Bei neuen Seiten: Kopf- und Footer-Markup 1:1 aus einer bestehenden Seite
  übernehmen, damit Navigation und Rechtstexte überall gleich sind.
- **Agent-Dispatch (siehe `~/.claude/CLAUDE.md`):** Für dieses Projekt ist
  der relevante Agenten-Pool der website-factory-eigene (`builder`,
  `compliance-agent`, `content-agent`, `design-agent`, `qa-agent`,
  `security-agent`, `seo-audit-agent`, `strategist`, `researcher`,
  `visual-qa-agent`) — nicht der allgemeine Sprach-/Framework-Reviewer-
  Pool (react-reviewer, kotlin-build-resolver usw.), der für ein reines
  HTML/CSS/JS-Projekt ohne Framework größtenteils nicht zutrifft. Vor
  jeder Aufgabe kurz benennen, welche 1–3 Agenten (falls überhaupt nötig)
  eingesetzt werden, per 📋 REKOMMENDATION-Block laut `~/.claude/CLAUDE.md`.
