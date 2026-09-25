# Offene Punkte — nur mit Kundendaten/-entscheidung zu schließen

Stand: 2026-09-25 (7. Durchgang — Punkte 1–3 vom Kunden beantwortet und
umgesetzt). Ursprünglicher Stand: 2026-08-11. Diese Punkte sind **keine**
Bugs, die sich im Code lösen lassen — sie brauchen eine Antwort oder
Entscheidung von LISS Reinigungsservice selbst. Bis dahin bleiben die
betroffenen Textstellen Platzhalter (`[...]`) und der Prototyp ist nicht
launch-fähig.

## 1. Echte Firmendaten für `impressum.html` — ERLEDIGT (2026-09-25)

**Vom Kunden bestätigt und eingetragen:**
- [x] Ladungsfähige Anschrift: Am Bornberg 82, 29690 Schwarmstedt
- [x] Inhaber: Hassan Daoud (zweimal eingetragen: Diensteanbieter +
  § 18 Abs. 2 MStV)
- [x] Rechtsform: Einzelunternehmen/Inhaber, wie bereits formuliert — vom
  Kunden nicht widersprochen
- [x] Reale Telefonnummer: 015203133132 (deutsche Mobilnummer), als
  `tel:+4915203133132` / Anzeige „0152 0313 3132" auf allen 12 Seiten
  sowie im Impressum, in der Datenschutzerklärung und im
  `LocalBusiness`-JSON-LD auf `index.html` eingetragen.

E-Mail-Adresse `info@liss-reinigungsservice.de` war bereits korrekt und
vom Kunden ausdrücklich bestätigt — keine Änderung nötig.

## 2. USt-IdNr. oder Kleinunternehmerstatus — ERLEDIGT (2026-09-25)

**Vom Kunden bestätigt:** Kleinunternehmer nach § 19 UStG, keine USt-IdNr.,
keine Umsatzsteuer wird berechnet.

- [x] `impressum.html`, Abschnitt „Umsatzsteuer" umformuliert: „Kleinunternehmer
  im Sinne von § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen und
  berechnet; eine Umsatzsteuer-Identifikationsnummer nach § 27a UStG liegt
  entsprechend nicht vor." — keine Platzhalter-Zeile mehr live.
- **Wichtig, vom Kunden mitgeteilt und bewusst NICHT veröffentlicht:** Der
  Kunde hat eine persönliche 11-stellige Steuer-Identifikationsnummer
  genannt. Das ist **keine** USt-IdNr. nach § 27a UStG, sondern eine
  persönliche steuerliche Identifikationsnummer — die gehört nicht ins
  Impressum und wurde entsprechend nicht eingetragen.

## 3. Name des Hosters — ERLEDIGT, aber mit neuem Folgepunkt (2026-09-25)

**Vom Kunden geklärt:** Zwei getrennte Anbieter mit unterschiedlichen
Rollen, nicht ein einzelner Hoster:
- STRATO: Domain-DNS und E-Mail-Versand (Deutschland).
- GitHub Pages (GitHub, Inc.): tatsächliche Auslieferung der
  Website-Dateien — technisch unverändert gegenüber dem bisherigen Stand.

- [x] `datenschutz.html`, Abschnitt 7 „Hosting" neu formuliert: beide
  Anbieter benannt, Rollen sauber getrennt, keine falsche Zuschreibung
  mehr (STRATO liefert nicht die Website aus).
- [x] Die vorher unbelegte Behauptung „Serverstandort in Deutschland" +
  „Auftragsverarbeitungsvertrag ... liegt vor" wurde **entfernt**, weil sie
  für GitHub Pages nicht bestätigt ist (eher USA/globales CDN,
  GitHub Inc./Microsoft).
- [ ] **Neu offen:** Serverstandort von GitHub Pages und AVV-/SCC-Status
  mit GitHub, Inc. sind nicht geprüft. Muss vor Launch geklärt werden
  (GitHub veröffentlicht eigene DPA-Bedingungen für GitHub Pages/Free —
  zu prüfen, ob und wie diese für dieses Projekt greifen).
- [ ] **Neu offen:** Ob mit STRATO für Domain-/E-Mail-Verarbeitung
  tatsächlich ein unterschriebener AVV vorliegt, ist ebenfalls nicht
  bestätigt — Text behauptet das jetzt nicht mehr pauschal, sondern
  benennt es als zu bestätigenden Punkt.

## 4. Berufshaftpflichtversicherer — WEITERHIN OFFEN

- [ ] `impressum.html`: `[Versicherer]`, `[Anschrift]` — Name und Anschrift
  des Berufshaftpflichtversicherers eintragen (Pflichtangabe für
  Handwerksbetriebe, siehe Eintrag „Eingetragen in der Handwerksrolle der
  Handwerkskammer Hannover" auf derselben Seite). **Einziger noch
  fehlender Pflichtangaben-Block im Impressum** nach Abschluss der
  Punkte 1–3.
- [ ] Falls die Handwerksrollen-Eintragung selbst noch nicht final ist:
  auch das gegenprüfen, bevor die Seite live geht — siehe verschärfend
  Punkt 4a unten.

## 4a. Zuständigkeit der Handwerkskammer — NEU OFFEN (2026-09-25)

`impressum.html` behauptet weiterhin unverändert: „Eingetragen in der
Handwerksrolle der Handwerkskammer Hannover" und nennt als Aufsichtsbehörde
„Handwerkskammer Hannover, Berliner Allee 17, 30175 Hannover". Diese
Aussage war laut `CLAUDE.md` („Was als Nächstes ansteht", Punkt 4) bereits
vorher als ungeprüft markiert. Mit der jetzt bestätigten echten Anschrift
**Am Bornberg 82, 29690 Schwarmstedt** — das liegt im Landkreis Heidekreis,
nicht in der Stadt oder Region Hannover — stellt sich die Frage neu und
konkreter:

- [ ] Ist die Handwerkskammer Hannover tatsächlich die für den
  Betriebssitz Schwarmstedt zuständige Kammer, oder eine andere (z. B.
  Handwerkskammer Braunschweig-Lüneburg-Stade — nicht verifiziert, nur als
  mögliche Alternative genannt, keine eigene Entscheidung getroffen)?
- [ ] Falls eine andere Kammer zuständig ist: sowohl der Eintrag unter
  „Eintragung" als auch „Zuständige Aufsichtsbehörde" (Name + Anschrift)
  in `impressum.html` müssen entsprechend korrigiert werden.
- Bewusst **nicht selbst geändert** — das ist eine Tatsachenfrage, die nur
  durch eine Kammer-Zugehörigkeitsprüfung (oder Rückfrage bei der
  Handwerkskammer Hannover selbst) beantwortet werden kann, keine
  Ermessensentscheidung dieses Dokuments.

## 5. Kontaktformular — Button-Funktion behoben (2026-08-16), Backend-Frage bleibt

**Update 2026-08-16 — behoben:** `kontakt.html` ist jetzt ein echtes
`<form id="kontaktForm">` mit drei Schritten (`.form-step[data-step="1|2|3"]`).
„Weiter"/„Zurück" funktionieren, Pflichtfelder werden pro Schritt geprüft
(`assets/site.js`, `initContactForm`), Turnus lässt sich wie im Preisrechner
per Chip auswählen. „Anfrage senden" ist jetzt `type="submit"` und öffnet
das E-Mail-Programm der Nutzer:in mit vorausgefüllter Betreffzeile und
Nachricht (`mailto:info@liss-reinigungsservice.de?subject=...&body=...`) —
das war bereits als „einfachste Lösung" hier dokumentiert und wurde jetzt
umgesetzt. Nichts wird ohne aktives Zutun der Nutzer:in verschickt.

**Weiterhin offen — bewusste Entscheidung, keine Bugfix-Frage mehr:**

- [ ] Reicht der `mailto:`-Fallback dauerhaft, oder soll ein echtes
  serverseitiges Backend dahinter (z. B. E-Mail-Versand über den Hoster,
  sobald der feststeht, oder ein Formular-Service wie Formspree/Basin)?
  Vorteile eines echten Backends: funktioniert auch ohne lokal
  eingerichtetes E-Mail-Programm, serverseitige Validierung, Spam-Schutz.
  — **Falls Drittanbieter-Service:** eigener Datenschutz-Abschnitt + ggf.
  AVV nötig, aktuell in `datenschutz.html` nicht vorgesehen.
- [ ] `datenschutz.html` Abschnitt 4 „Anfrageformular und Preisrechner"
  gegenprüfen, sobald klar ist, welcher Übertragungsweg dauerhaft gilt —
  der Text beschreibt bereits eine serverseitige Verarbeitung mit
  Löschfrist „sechs Monate", die beim reinen `mailto:`-Fallback so gar
  nicht stattfindet (die Anfrage geht direkt aus dem E-Mail-Programm der
  Nutzer:in an `info@liss-reinigungsservice.de`, LISS selbst verarbeitet
  sie dann wie jede normale E-Mail).

## Zusätzlich aufgefallen (nicht Teil der ursprünglichen 4 Punkte, aber direkt angrenzend)

### 6. Sichtbare KI-Kennzeichnung am Hero-Video

`datenschutz.html` Abschnitt 9 verspricht jetzt: „KI-generierte Inhalte
werden entsprechend gekennzeichnet." `assets/hero.mp4` ist laut
Projektkontext mit Seedance/Dreamina KI-generiert, trägt aber aktuell
**keine sichtbare Kennzeichnung im Video oder auf der Seite**. Layout/Markup
war in diesem Auftrag ausdrücklich ausgeschlossen ("Не трогай верстку"), daher
hier nur als offener Punkt vermerkt statt umgesetzt.

**Risikoeinordnung, getrennt von Punkt 10 zu bewerten (2026-08-22):**
hero.mp4 zeigt reine Hintergrund-Atmosphäre — eine Wassertropfen-
Makroaufnahme, kein Mensch, keine dargestellte Tätigkeit. Risiko nach
Art. 50 KI-VO/§ 5 UWG dadurch niedrig-mittel, spürbar geringer als bei
`zusagen.mp4` (Punkt 10). Beide Videos wurden in früheren Durchgängen
teils mit demselben Maßstab behandelt — ab diesem Durchgang bewusst
getrennt, siehe Risikoeinordnung in Punkt 10.

**§ 22 KUG (2026-08-22, geklärt):** Nicht anwendbar. hero.mp4 ist laut
bestätigtem Kundenfakt (Basis: zwei unabhängige juristische Reviews)
reines Text-zu-Video ohne Image-to-Video-Verfahren und ohne reales
Referenzfoto/-video einer echten Person. § 22 KUG setzt die Abbildung
einer tatsächlich existierenden, identifizierbaren Person voraus — es
gibt keine „Abgebildete", deren Einwilligung nötig wäre. Frage damit für
hero.mp4 geschlossen; offen bleiben Art. 50 KI-VO und § 5 UWG (s. u.).

- [ ] ~~Umgesetzt 2026-08-22: sichtbares Label „KI-generierte Darstellung"
  (`.ai-tag`, `assets/site.css`) — kein On-Screen-Burn-in im Video selbst,
  sondern ein eigenes HTML-Element über dem Video, dauerhaft sichtbar
  (keine Animation, kein Ausblenden nach der ersten Sekunde). Damit ist
  die Zusage aus `datenschutz.html` Abschnitt 9 jetzt auch technisch
  eingelöst, nicht mehr nur inhaltlich richtig.~~
  **Update 2026-08-22 (zurückgenommen, selber Tag):** Auf Nutzerwunsch
  vollständig entfernt (`index.html`, `assets/site.css`) — Kennzeichnung
  wurde als fehlerhaft/vorzeitig eingesetzt bezeichnet. Kennzeichnung
  wird NICHT ohne erneute ausdrückliche Freigabe wieder eingefügt. Punkt
  damit wieder offen: die Zusage aus `datenschutz.html` Abschnitt 9 ist
  aktuell wieder nur inhaltlich, nicht technisch eingelöst.
- [ ] **An die Rechtsberatung, statt pauschal „Kennzeichnung nötig"
  anzunehmen:** Ist für hero.mp4 (reine Atmosphäre, kein Mensch/keine
  Handlung im Bild) trotzdem eine Kennzeichnung nach Art. 50(2) KI-VO
  nötig — wer ist Provider des verwendeten KI-Tools in der Kette, und
  ist dessen maschinenlesbare Kennzeichnungspflicht erfüllt?

**Provider-Recherche (2026-08-22, per Websuche, kein Ersatz für
Rechtsberatung):** Für `hero.mp4` ist der Provider laut Projektstand
Dreamina/Seedance (ByteDance). Öffentlich zugängliche Quellen (Stand
August 2026) beschreiben, dass ByteDance Seedance 2.0 mit C2PA-
Wasserzeichen/„Content Credentials" ausliefert — kryptografisch
signierte Provenienzdaten, die laut denselben Quellen beim Export nicht
entfernt werden und erhalten bleiben. Das spricht dafür, dass die
maschinenlesbare Kennzeichnungspflicht aus Art. 50(2) KI-VO für
hero.mp4 grundsätzlich vom Provider erfüllt werden könnte — **nicht
verifiziert**: nicht selbst geprüft, ob das MP4 in `assets/hero.mp4`
tatsächlich intakte C2PA-Metadaten enthält (dafür fehlt ein
C2PA-Prüfwerkzeug in dieser Umgebung), und die Quellen sind
Sekundärquellen (Blogartikel), keine offizielle ByteDance-Dokumentation.
**Für `zusagen.mp4` bleibt diese Frage vollständig offen** — Provider
weiterhin unbekannt (siehe `LIZENZEN.md`), diese Recherche gilt nicht
automatisch für dieses Video.
Quellen: [tellers.ai](https://tellers.ai/blog/ai_video_eu_ai_act_compliance_august_2026_2026-04-27), [ComplianceHub.Wiki](https://compliancehub.wiki/eu-ai-act-marking-labelling-code-of-practice-article-50-2026/), [MindStudio](https://www.mindstudio.ai/blog/what-is-seedance-2-release-guide), [Dreamina Privacy Policy](https://dreamina.capcut.com/clause/dreamina-privacy-policy).

### 7. Lizenznachweis für `hero.mp4` selbst

Für die Google-Fonts-Dateien liegt jetzt ein Nachweis vor
(`assets/fonts/LIZENZ.txt`). Für `assets/hero.mp4` fehlt das Äquivalent:
Screenshot/Export der Seedance-Nutzungsbedingungen zum Erstellungszeitpunkt,
oder Beleg des Generierungsauftrags. Siehe `LIZENZEN.md`.

### 8. GSAP/ScrollTrigger/Lenis — self-hosted (erledigt 2026-08-16)

War: CDN-Einbindung über `cdn.jsdelivr.net`, bewusst nicht automatisch
geändert, weil in einem früheren Auftrag explizit CDN gewünscht war.

**Jetzt behoben, auf ausdrücklichen Wunsch:** Alle drei Dateien liegen unter
`assets/vendor/` (`gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`),
`index.html` lädt sie lokal. `datenschutz.html` Abschnitt 10 wurde
entsprechend korrigiert (keine Drittserver-Verbindung mehr, statt vorheriger
jsDelivr-Offenlegung). Lizenznachweis: `assets/vendor/LIZENZ.txt`.
Verifiziert: `grep -rEo 'https?://[a-zA-Z0-9.-]+' *.html` über alle 12
HTML-Dateien liefert keinen Treffer mehr — keine externe Domain im gesamten
Projekt.

### 9. Discoverability-Grundlagen (erledigt 2026-08-20)

Bis dahin fehlten jede Steuerung der Indexierung und jede strukturierte
Auszeichnung — bei einem öffentlich erreichbaren Vorab-Stand mit
Platzhalter-Impressum ein eigenes Risiko, unabhängig von den Punkten 1–4.

**Jetzt behoben:**
- `robots.txt` (`Disallow: /`) + `<meta name="robots" content="noindex,nofollow">`
  auf allen 12 Seiten. Disallow allein verhindert nur das Crawlen, nicht
  zuverlässig die Indexierung; GitHub Pages erlaubt keine eigenen
  `X-Robots-Tag`-Header, daher beides zusammen.
- `sitemap.xml` mit allen 12 Seiten, vorbereitet für den Live-Gang, aber in
  `robots.txt` bewusst noch nicht referenziert.
- `LocalBusiness`-Schema.org auf `index.html`. **Bewusst ohne** `address`,
  `telephone` und `foundingDate` — siehe Punkt 1 unten, falsche NAP-Daten in
  strukturierten Daten sind schädlicher als fehlende.

**Nebenbefund, im selben Durchgang behoben:** Die Behauptung „seit 2026" /
„2026 in Hannover gegründet" stand an drei Stellen (`index.html`
Hero-Kennzeile, `ueber-uns.html` Meta-Description, Lead-Text und
Kennzahl-Kachel) ohne Beleg — dieses Projekt selbst nennt nur „neu
gegründete Gebäudereinigungsfirma", ohne Jahr. Alle vier Stellen entfernt
bzw. durch bereits anderswo veröffentlichte, belegbare Aussagen ersetzt
(„0 € Zuschlag für Einsätze vor 8 und ab 17 Uhr" — siehe `faq.html` und
`bueroreinigung.html`). Sobald das tatsächliche Gründungsdatum von LISS
vorliegt (Punkt 1), kann die Aussage mit Beleg wieder aufgenommen werden —
auch dann gehört sie in `foundingDate` im Schema.org-Block.

**Noch offen:**
- [ ] Canonical-Tags — erst sinnvoll, wenn die endgültige Domain feststeht
  (aktuell GitHub-Pages-URL, sonst müssten 12 Dateien zweimal geändert werden)
- [ ] Favicon fehlt komplett (404 auf jeder Seite)
- [ ] Open-Graph-/Twitter-Card-Tags fehlen (keine Vorschau beim Teilen des Links)
- [ ] `FAQPage`-Schema für die zwölf echten Fragen auf `faq.html` und die
  drei auf `bueroreinigung.html` — noch nicht ergänzt
- [ ] NAP (Name/Adresse/Telefon) kann erst vollständig ins Schema, wenn
  Punkt 1 unten geklärt ist

### 10. Zweites KI-generiertes Video — `assets/zusagen.mp4` (2026-08-20, korrigiert 2026-08-20)

Auf ausdrücklichen Wunsch in der Titelspalte von „Was anders läuft"
ergänzt, scroll-scrubbed wie das Hero-Wasserband, aber **ohne** dessen
Maskierungstechnik — siehe unten.

**Wichtig, unverändert:** Das Ausgangsmaterial zeigt eine Hand in
Einweghandschuh beim Abwischen einer Fläche — anders als die abstrakte
Wassertropfen-Aufnahme im Hero also **eine Person**, wenn auch nur Hand/
Arm. Nach `CLAUDE.md` („Keine KI-generierten Menschen ... Rechtlich heikel
unter § 5 UWG") wäre das Video in erkennbarer Form eigentlich nicht
einsetzbar.

**Verlauf der Entscheidung:**
1. Erster Durchgang: stark abstrahiert (Kontrast/Helligkeit/Screen-Blend
   so eingestellt, dass nur noch Licht und Bewegung erkennbar blieben,
   keine Hand mehr) — Kompromissvorschlag des Modells, vom Kunden zunächst
   auch so gewählt.
2. Nach Ansicht des Ergebnisses ausdrücklich zurückgewiesen: Kunde will
   die Hand und die Wischbewegung sichtbar. Auf diesen Wunsch hin wurde
   die Abstraktion entfernt — das Video lief zunächst unbearbeitet, aber
   noch als Hintergrund hinter der Überschrift, mit einem Navy-Scrim für
   die Textlesbarkeit.
3. **Update 2026-08-21, zweiter Umbau:** Auch diese Anordnung war nicht das,
   was der Kunde wollte — er empfand die Überschrift-über-Video-Kombination
   als „Rahmen", in dem die Hand eingesperrt wirkte. Umgebaut: Überschrift
   stand auf normalem Seitenhintergrund, Video als eigenes, gerahmtes Feld
   direkt darunter (`border` + `border-radius` wie andere Karten der Seite).
4. **Update 2026-08-21, dritter Umbau:** Auch die Rahmen-Karte war nicht
   das gewünschte Bild — ausdrückliche Vorgabe war jetzt das Wasserband im
   Hero als Vorlage. Video läuft seitdem wie dort als vollflächiges
   Hintergrundfeld hinter der ganzen Sektion (nicht mehr Teil des Grids),
   links statt rechts verankert, per CSS-Maskenverlauf zur Textseite hin
   ausgeblendet — dieselbe Mechanik wie `.hv-media` im Hero, gespiegelt.
   **Wichtiger Unterschied zum Hero:** kein Screen-Blend, weil das
   Quellmaterial hell auf hellem Grund ist (weißer Handschuh/Tuch) —
   Screen-Blend gegen den hellen Seitenhintergrund hätte das Bild wie beim
   ersten Anlauf praktisch gelöscht. Stattdessen `mix-blend-mode:multiply`
   (dunkelt ab statt aufzuhellen) plus eine sehr leichte Markenblau-
   Farbklammer (`opacity:.18`, deutlich schwächer als im Hero) — Hand und
   Handschuh bleiben klar erkennbar, das war über alle drei Umbauten
   hinweg die einzige konstante, nicht verhandelbare Vorgabe des Kunden.
   Am Grundkonflikt (KI-generierte, erkennbare Hand, zeigt die verkaufte
   Leistung) ändert keine dieser drei Anordnungen etwas — nur die
   Lesbarkeits-Begründung von Punkt 2 entfällt seit Umbau 2, weil kein
   Text mehr direkt über sichtbaren Video-Pixeln liegt.
5. **Der CLAUDE.md-Konflikt besteht damit weiterhin, bewusst in Kauf
   genommen vom Kunden.** Diese Datei hält beide Seiten fest: das Risiko
   (§ 5 UWG, irreführende Darstellung eigenen Personals durch
   KI-generiertes Material) und die ausdrückliche Entscheidung, es
   trotzdem so zu veröffentlichen. Vor Launch der Rechtsprüfung
   ausdrücklich vorlegen, nicht stillschweigend durchlaufen lassen.

- [ ] ~~Umgesetzt 2026-08-22: sichtbares Label „KI-generierte
  Darstellung" (`.ai-tag`, in `.zusagen-head`, dauerhaft sichtbar) —
  wie bei Punkt 6, siehe dort für die Begründung. Bewusst OHNE den
  Zusatz „kein tatsächlicher Reinigungsvorgang": das aktuelle Video
  zeigt seit dem Tausch (siehe „Update 2026-08-21, Quellvideo
  ausgetauscht" unten) kein Reinigungshandeln mehr, sondern ein
  Logo-in-Seifenblasen-Motiv — ein Hinweis auf einen nicht gezeigten
  Vorgang wäre sachlich falsch gewesen.~~
  **Update 2026-08-22 (zurückgenommen, selber Tag):** Auf Nutzerwunsch
  vollständig entfernt (`index.html`, `assets/site.css`) — Kennzeichnung
  wurde als fehlerhaft/vorzeitig eingesetzt bezeichnet. Kennzeichnung
  wird NICHT ohne erneute ausdrückliche Freigabe wieder eingefügt. Punkt
  damit wieder offen.
- [x] ~~Wie Punkt 7: Lizenznachweis/Generierungsbeleg~~ — dito, siehe
  Update unten.
- [x] **Vor Launch mit Rechtsberatung klären, ob das Video in dieser Form
  (erkennbare Person, KI-generiert, zeigt die verkaufte Leistung selbst)
  überhaupt veröffentlicht werden darf** — **gegenstandslos seit
  Video-Austausch 2026-08-21, siehe Update am Ende dieses Abschnitts:
  keine Person mehr im Bild.**

**Kundeneinwand (2026-08-21):** Auf die Rückfrage, ob der Punkt gestrichen
werden kann, weil auf dem Video nur eine Hand zu sehen ist — keine
identifizierbare Person, kein Gesicht — und deshalb niemand erkennen
könne, dass das Material KI-generiert ist. Einwand inhaltlich richtig
(die Hand ist tatsächlich nicht als bestimmte reale Person identifizierbar),
trifft aber nicht die beiden Risiken, die diesen Punkt begründen:

- **§ 5 UWG** hängt nicht an der Erkennbarkeit einer Person, sondern daran,
  dass dem Betrachter eine scheinbar echte Aufnahme der verkauften
  Leistung gezeigt wird, die tatsächlich synthetisch ist — eine
  Irreführung **kann** sich aus der Darstellung des Vorgangs ergeben,
  nicht aus der Identität der Hand. Das ist eine Wertungsfrage, kein
  feststehender Verstoß — genau deshalb bleibt der Punkt offen statt
  „erledigt" oder „gestrichen".
  Konkret verschärft wird dieses Risiko durch die Platzierung im Layout:
  Das Video läuft direkt neben Zusage „04 · NACHWEIS — Digitales
  Foto-Protokoll … Sie sehen die Leistung, auch wenn Sie nicht da sind"
  (`index.html`, `.zusagen-list`, vierter Punkt). Ausgerechnet in einem
  Abschnitt, dessen Aussage „Sie sehen die echte Leistung" ist, läuft ein
  synthetisches Bild einer nicht real stattgefundenen Reinigung — das ist
  das stärkste konkrete Argument für ein Irreführungsrisiko, deutlich
  konkreter als die abstrakte Vorgangs-Darstellung allein.
- **Art. 50 KI-VO** verlangt Kennzeichnung von KI-generiertem Video-/
  Audiomaterial unabhängig davon, ob eine abgebildete Person erkennbar
  ist — die Pflicht ist an die Herkunft des Materials geknüpft, nicht an
  Persönlichkeitsrechte.
- Zusätzlich: `datenschutz.html` §9 sagt bereits sichtbare KI-Kennzeichnung
  zu (Punkt 6/oben) — den Risikopunkt zu streichen, ohne diese Zusage
  einzulösen, würde einen Widerspruch innerhalb der Seite selbst schaffen.

**Anschlussfrage zu § 22 KUG — geklärt (2026-08-22):** Bestätigter
Kundenfakt (Basis: zwei unabhängige juristische Reviews): sowohl
hero.mp4 als auch `zusagen.mp4` (das ursprüngliche Hand-Motiv wie das
jetzige Logo-Motiv) sind reines Text-zu-Video ohne Image-to-Video-
Verfahren und ohne reales Referenzfoto/-video einer echten Person. Damit
ist § 22 KUG nicht anwendbar — es gibt keine tatsächlich existierende,
identifizierbare „Abgebildete", deren Einwilligung nötig wäre. Frage
geschlossen; die frühere Formulierung „reales Referenzmaterial diente
der Generierung" ist damit ausdrücklich verneint.

**Update 2026-08-21, Quellvideo ausgetauscht — Grundkonflikt entfällt:**
Der Kunde hat ein neues, selbst geliefertes Video eingesetzt: das
LISS-Logo, das sich in Seifenblasen auflöst. **Keine Person mehr im
Bild.** Damit entfällt der eigentliche Streitpunkt dieses Abschnitts
(§ 5 UWG/Art. 50 KI-VO/§ 22 KUG bezogen auf eine abgebildete Person) —
alle drei oben diskutierten Risiken hingen an der erkennbaren Hand, nicht
an bewegtem Bild allgemein. Technik (Vollflächen-Hintergrund, Masken-
verlauf, `mix-blend-mode:multiply`) unverändert übernommen, funktioniert
motivunabhängig.

**Risikoeinordnung ggü. hero.mp4, ab jetzt getrennt zu bewerten
(2026-08-22):** hero.mp4 ist reine Hintergrund-Atmosphäre ohne Bezug zur
Leistung selbst — Risiko niedrig-mittel. `zusagen.mp4` läuft direkt
neben der Zusage „Sie sehen die Leistung, auch wenn Sie nicht da sind"
(s. Kundeneinwand oben) und zeigte bis zum Motivwechsel eine
KI-generierte Nachstellung der verkauften Tätigkeit selbst — Risiko
mittel, hier lag und liegt der Schwerpunkt der offenen Fragen dieses
Dokuments. Nicht mehr symmetrisch mit hero.mp4 zu behandeln, auch jetzt,
wo das aktuelle Motiv (Logo in Seifenblasen) personenfrei ist — die
Video/Text-Kombination bleibt eigenständig zu prüfen, s. Frage 3 unten.

Bleibt trotzdem offen, jetzt aus anderem Grund:
- [ ] **Neu, ungeklärt:** Das Logo im Video trägt die Unterzeile
  „Gebäudereinigung" — dieser Firmenname wurde laut `CLAUDE.md` bereits
  früher im Projekt verworfen zugunsten von „LISS Reinigungsservice"
  (so auch in der Kopfzeile der Seite: „Reinigungsservice Hannover").
  Muss mit dem Kunden geklärt werden: Video neu generieren ohne
  Unterzeile, Unterzeile im Bild kaschieren, oder bewusste Ausnahme?
- [ ] **Sichtbare KI-Kennzeichnung (2026-08-22, konkretisiert):** Statt
  pauschal „Kennzeichnung nach Art. 50 nötig" anzunehmen, drei konkrete
  Fragen an die Rechtsberatung, speziell für `zusagen.mp4`:
  - Ist `zusagen.mp4` angesichts visueller Realitätsnähe und
    Einsatzkontext ein Deepfake im Sinne von Art. 3(60)/Art. 50(4) KI-VO?
  - Wer ist der Provider des verwendeten KI-Tools in der Kette, und ist
    die maschinenlesbare Kennzeichnungspflicht nach Art. 50(2) KI-VO
    erfüllt?
  - Erzeugt die Kombination aus Video und aktuellem Begleittext
    (insbesondere die Zusage direkt daneben, die von echter/gesehener
    Leistung spricht) ein Risiko nach § 5/5a UWG?
  Hinweis zum aktuellen Motiv, damit die Rechtsberatung nicht von der
  Hand-Version ausgeht: `zusagen.mp4` zeigt seit dem Austausch vom
  2026-08-21 das LISS-Logo, das sich in Seifenblasen auflöst — keine
  Person, keine dargestellte Wisch-/Reinigungshandlung mehr (siehe
  oben). Frage 1 und 3 bleiben trotzdem sinnvoll zu stellen, weil
  „Deepfake" und „Irreführung durch Kombination mit Text" nicht zwingend
  an einer abgebildeten Person hängen. Für hero.mp4 gilt eine eigene,
  auf sein Motiv zugeschnittene Frage — siehe Punkt 6.
- [ ] Lizenznachweis/Generierungsbeleg fehlt weiterhin, siehe
  `LIZENZEN.md` — neues Video braucht einen eigenen Eintrag, altes
  Hand-Video-Material kann aus `LIZENZEN.md` entfernt werden.

**Kundenentscheidung — Risiko herabgestuft, nicht Blocker (2026-08-22).**
Nach Rückzug der Kennzeichnungs-Umsetzung (siehe oben) hat der Kunde die
drei offenen Fragen erneut bewertet und den Punkt bewusst herabgestuft —
nicht gestrichen, damit die Begründung nachvollziehbar bleibt:

- **§ 22 KUG:** geschlossen (siehe oben) — Video ist per Prompt
  generiert (Text-zu-Video), ohne reale Person als Referenz, keine
  Einwilligung erforderlich.
- **Art. 50 KI-VO:** Das Video hat keinen Bezug zu einer konkreten
  realen Person, einem Objekt oder Ereignis — damit unwahrscheinlich,
  dass es unter die Deepfake-Definition nach Art. 3(60) fällt; eine
  verpflichtende sichtbare Kennzeichnung wird auf dieser Grundlage als
  nicht erforderlich eingeschätzt. Risiko niedrig, kein Blocker.
- **§ 5 UWG:** Das Video trifft keine konkrete Tatsachenbehauptung
  (nicht „so wurde genau bei Ihnen gereinigt"), sondern ist eine
  illustrative Generic-Szene, vergleichbar mit gewöhnlichem
  Stock-Footage. Risiko niedrig — **unter der Bedingung**, dass der Text
  „Sie sehen die Leistung" (Zusagen-Punkt 4) sich erkennbar auf die
  Foto-Protokoll-Leistung bezieht und nicht das Video selbst als
  Aufzeichnung eines realen Vorgangs ausgibt. Aktueller Wortlaut seit
  2026-08-22 („echte Fotos vom Objekt … so sehen Sie, was gemacht
  wurde") erfüllt diese Bedingung nach Einschätzung des Kunden.

**Status:** Risiko als niedrig akzeptiert, sichtbare Kennzeichnung wird
auf dieser Grundlage nicht umgesetzt. Das ist eine unternehmerische
Risikoentscheidung des Kunden, keine Rechtsberatung durch dieses
Dokument oder durch Claude — finale Bestätigung liegt weiterhin im
Ermessen der Rechtsberatung bei der Gesamtprüfung der Seite vor Launch,
ist aber ab jetzt **kein Blocker mehr für die weitere Arbeit** an diesem
Projekt. Die drei Fragen oben bleiben als Dokumentation stehen (nicht
gelöscht), nur nicht mehr mit Blocker-Dringlichkeit versehen.

---

### 11. Drittes KI-generiertes Video mit Hand — `assets/praxis.mp4` (2026-08-21, **zurückgezogen 2026-08-22**)

**Update 2026-08-22:** Vom Kunden als Fehleinsatz bezeichnet und
zurückgezogen — „das war ein Fehler, muss gelöscht werden". Dateien
(`assets/praxis.mp4`, `assets/praxis-poster.jpg`) gelöscht, Einbindung in
`leistungen.html` #praxis vollständig rückgängig gemacht, `site.css`
`.praxis-*`-Regeln entfernt. Verifiziert: keine Referenzen mehr im Repo.
Der Rest dieses Punkts bleibt als Verlaufsdokumentation stehen, nicht
weil er noch offen ist, sondern damit nachvollziehbar bleibt, dass dieses
Motiv bewusst geprüft und dann wieder entfernt wurde — nicht einfach
vergessen. Ein neues, größeres Hand-Video ist am selben Tag an anderer
Stelle hinzugekommen, siehe Punkt 12.

Ursprünglicher Eintrag (2026-08-21): Vom Kunden geliefert, auf
`leistungen.html` im Abschnitt „Praxisreinigung"
(`#praxis`) eingesetzt: eine behandschuhte Hand desinfiziert eine
Praxisliege. Inhaltlich passend zum Text ("Wischdesinfektion
patientennaher Flächen"), aber **derselbe Grundkonflikt wie Punkt 10,
jetzt an neuer Stelle:**

- Erkennbare Person (Hand/Arm in Einweghandschuh), KI-generiert, zeigt
  exakt die verkaufte Leistung — § 5 UWG/Art. 50 KI-VO-Erwägungen aus
  Punkt 10 gelten hier unverändert, siehe dort für die volle Herleitung.
- Anders als beim Zusagen-Video wurde dieser Konflikt hier **nicht**
  durch ein alternatives, personenfreies Motiv aufgelöst — die Hand blieb
  im Bild, weil kein Ersatzmotiv vorlag und die inhaltliche Passung zum
  Text sehr hoch ist (im Gegensatz zum bloß illustrativen Hand-Video in
  „Was anders läuft" zeigt dieses Video direkt die im selben Absatz
  beschriebene Tätigkeit).
- Technisch unterscheidet sich die Einbindung von Punkt 10: **kein
  Scroll-Scrub** (diese Seite lädt kein GSAP/ScrollTrigger/Lenis),
  stattdessen normales Autoplay-Loop-Video. Für die rechtliche Bewertung
  macht das keinen Unterschied — sichtbar bleibt sichtbar, ob per
  Scroll-Steuerung oder Dauerschleife.
- Lizenzlage identisch ungeklärt wie bei Punkt 7/10: Generierungstool
  unbekannt, kein Nutzungsnachweis, siehe `LIZENZEN.md`.

- [x] ~~Gleiche Rechtsfrage wie Punkt 10~~ — **gegenstandslos seit
  Rückzug 2026-08-22**, siehe Update oben. Bleibt als Verlauf stehen.
- [x] ~~Sichtbare KI-Kennzeichnung~~ — gegenstandslos, Video entfernt.
- [x] ~~Lizenznachweis~~ — gegenstandslos, Video entfernt.

### 12. Viertes KI-generiertes Video mit Hand — `assets/leistungen-bg.mp4` (2026-08-22, neu, seitenweit)

Vom Kunden geliefert, direkt im Anschluss an den Rückzug von Punkt 11 als
**fixierter Vollbild-Hintergrund für die gesamte Seite `leistungen.html`**
eingesetzt (`position:fixed`, hinter allen sechs Leistungsabschnitten,
scroll-scrubbed über den kompletten Seiten-Scroll). Zeigt eine
behandschuhte Hand, die verschiedene Kontaktflächen desinfiziert
(Türklinke, Lichtschalter, Glas, Arbeitsplatte) — Montage statt
Einzelszene.

**Ausdrücklich auf Kundenwunsch, mit vollem Bewusstsein für den
Grundkonflikt:** Anders als bei Punkt 11 (Rückzug) hat der Kunde hier
bewusst entschieden, den gleichen Motivtyp einzusetzen — diesmal sogar
mit deutlich größerer Reichweite (ganze Seite statt ein Abschnitt).
Rechtlich gilt exakt dieselbe Analyse wie Punkt 10/11:

- Erkennbare Person (Hand/Arm in Einweghandschuh), KI-generiert, zeigt
  die verkaufte Kernleistung (Desinfektion/Reinigung von Kontaktflächen) —
  § 5 UWG/Art. 50 KI-VO-Erwägungen aus Punkt 10 gelten unverändert.
- **Verschärfender Faktor gegenüber Punkt 10/11:** Reichweite. Das Motiv
  ist jetzt nicht mehr auf einen Abschnitt begrenzt, sondern hinterlegt
  die komplette Seite „Leistungen & Preise" — alle sechs Leistungen,
  nicht nur eine. Das stärkt das Irreführungsargument („der Betrachter
  sieht durchgehend eine scheinbar echte Reinigungstätigkeit als
  Kontext für sämtliche Preisangaben") gegenüber der bisherigen,
  abschnittsgebundenen Nutzung.
- Technisch neu: erstmals GSAP/ScrollTrigger/Lenis auf einer zweiten
  Seite geladen (bisher nur `index.html`) — ändert nichts an der
  rechtlichen Bewertung, nur an der Umsetzung.
- Lizenzlage identisch ungeklärt: Generierungstool unbekannt, kein
  Nutzungsnachweis, siehe `LIZENZEN.md`.

- [ ] **Rechtsfrage aus Punkt 10 jetzt für drei Vorkommen gemeinsam zu
  stellen** (Hero, dieses Video — Zusagen- und Praxis-Vorkommen sind
  zurückgezogen): Dürfen KI-generierte, erkennbare Personen, die die
  verkaufte Leistung zeigen, in dieser Form veröffentlicht werden? Bei
  diesem Vorkommen zusätzlich zu klären: ändert die seitenweite statt
  abschnittsgebundene Nutzung die Einschätzung?
- [ ] Sichtbare KI-Kennzeichnung fehlt weiterhin (Punkt 6) — betrifft
  jetzt Hero und dieses Video.
- [ ] Lizenznachweis/Generierungsbeleg fehlt, siehe `LIZENZEN.md`.
- [ ] Lesbarkeit über die ganze Seite hinweg nur per Screenshot in einer
  bekanntermaßen unzuverlässigen Testumgebung stichprobenartig geprüft
  (siehe Implementierungs-Notizen im Commit) — vor Launch nochmal mit
  echtem Browser auf einem echten Gerät gegenchecken, nicht nur per DOM-
  Messung vertrauen.

---

**Nächster Schritt (Stand 2026-09-25):** Punkte 1–3 sind mit den vom Kunden
gelieferten echten Firmendaten geschlossen. Noch offen und weiterhin 1:1 an
LISS Reinigungsservice bzw. externe Stellen weiterzureichen:
- Punkt 4: Name/Anschrift des Berufshaftpflichtversicherers (vom Kunden).
- Punkt 4a: Zuständige Handwerkskammer für Schwarmstedt (Rückfrage bei der
  Kammer oder Kammer-Zugehörigkeitsprüfung, nicht allein vom Kunden zu
  beantworten).
- Punkt 3, GitHub-Pages-Folgefrage: Serverstandort/AVV-Status von GitHub
  Pages (technische/rechtliche Prüfung, nicht allein vom Kunden zu
  beantworten).
- Punkt 5–12: siehe jeweilige Abschnitte oben, unverändert offen.
