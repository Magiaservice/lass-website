# Compliance-Status — LISS Reinigungsservice

Stand: **2026-09-25** (7. Durchgang — echte Firmendaten des Kunden
eingearbeitet: Inhaber, Anschrift, Telefon, Kleinunternehmerstatus, Hosting-
Rollenklärung STRATO/GitHub Pages). 6. Durchgang: Standorte-Umbenennung +
Doorway-Page-Hinweis. 5. Durchgang: Discoverability/SEO-Grundlagen
(Indexierungssperre, Sitemap, LocalBusiness-Schema, unbelegte Jahreszahl
entfernt). 4. Durchgang: kompletter Re-Scan ohne Vorannahmen, plus
Security-Audit nach OWASP Top 10:2025 und Code-Review. 3. Durchgang:
Kontaktformular repariert, GSAP/ScrollTrigger/Lenis self-hosted. 2.
Durchgang: voller Compliance-Re-Scan. 1. Durchgang: 2026-08-11, Grundlagen
(Footer-Links, Fonts, Streitschlichtung). Nächste Re-Prüfung: spätestens
**2027-03-25** (alle 6 Monate) oder sofort bei jeder neuen externen
Einbindung.

Dieser Prototyp ist **nicht** live geschaltet. Die Punkte unten sind der
Stand der technischen Umsetzung; sie ersetzen keine anwaltliche Prüfung
(siehe `impressum.html` und `datenschutz.html`, jeweils Hinweis-Box "Entwurf
für den Prototyp").

## Klassifizierung (Skill-Abschnitt 2)

Normaler Firmen-/Servicesite ohne Transaktion, ohne Backend: `kontakt.html`
sammelt Daten rein client-seitig und übergibt sie per `mailto:` an das
E-Mail-Programm der Nutzer:in. Kein E-Commerce, keine Buchung, kein Login,
kein UGC, keine Art.-9-Daten, keine Kinder. Damit gelten nur die
Kernabschnitte (Impressum, Datenschutz, Cookies, Lizenzen, ggf. BFSG).

---

## 1. Compliance-Status-Tabelle (de-website-compliance)

| Bereich | Status | Bemerkung |
|---|---|---|
| Impressum-/Datenschutz-/AGB-Links im Footer | ✅ | Alle 12 Seiten verlinken auf `impressum.html`, `datenschutz.html`, `agb.html`. |
| **„Fake-Links" im Footer (NEU, 4. Durchgang)** | ✅ | `<a href="#">Mo–Fr 07:00–18:00 Uhr</a>` und `<a href="#">Musterstraße 1, ...</a>` in der Kontakt-Spalte des Footers waren auf allen 12 Seiten als Links markiert, führten aber nirgendwohin (Klick sprang an den Seitenanfang). Auf `<span>` umgestellt — reiner Text bleibt reiner Text, keine falsche Klickbarkeit mehr vorgetäuscht. |
| OS-Plattform-Hinweis (Streitschlichtung) | ✅ | Entfernt aus `impressum.html`. Verbleibt nur der § 36 VSBG-Satz. |
| „§ 5 TMG" | n/a | War nie vorhanden — verweist korrekt auf § 5 DDG. |
| Schriftarten self-hosted | ✅ | Archivo + JetBrains Mono als Variable-Font-woff2 unter `assets/fonts/`. |
| GSAP/ScrollTrigger/Lenis self-hosted | ✅ | `assets/vendor/`, Lizenz in `assets/vendor/LIZENZ.txt`. |
| **Externe Domains gesamt** | ✅ | `grep -rEo 'https?://[a-zA-Z0-9.-]+' *.html` über alle 12 Dateien: **kein Treffer.** |
| Datenschutz — „Schriftarten" / „Skript-Bibliotheken" | ✅ | Beide: lokal ausgeliefert, keine Drittserver-Verbindung. |
| Datenschutz — „Bilder und Videos" | ✅ | Eigenproduktion / Bilddatenbank / KI, mit Kennzeichnungs-Zusage. |
| **Datenschutz — „Cookies" (KORRIGIERT, 4. Durchgang)** | ✅ | War: „Wir setzen nur technisch notwendige Cookies ein" — impliziert, dass Cookies gesetzt werden. Code-Check (`grep -rn "document.cookie\|localStorage\|sessionStorage"`): **keine einzige Fundstelle** in irgendeiner Datei. Text korrigiert zu „Diese Website setzt aktuell keine Cookies ein." — stärkere und zugleich wahrheitsgemäßere Aussage. |
| Interne Links auf Existenz geprüft | ✅ | Alle `href="*.html"` in allen 12 Dateien geprüft — keine toten Links. |
| Bilder ohne `alt` | ✅ | Alle `<img>` haben ein `alt`-Attribut. |
| Formularfelder ohne Label | ✅ | Alle `<input>`/`<select>` haben `aria-label` bzw. `<label for>`. |
| Überschriften-Struktur | ✅ | Genau ein `<h1>` pro Seite, alle 12 Seiten. |
| Analytics/Tracking/Maps/Captcha | ✅ | Keine Treffer. |
| Kontaktformular funktionsfähig | ✅ | 3 Schritte, Pro-Schritt-Validierung, `mailto:`-Absenden. Details: Security-Abschnitt unten. |
| `standorte.html` — 14 Stadtteilseiten-Links auf `#` | ⚠️ **absichtlich nicht angefasst** | Sind laut `CLAUDE.md` ("Was als Nächstes ansteht", Punkt 1) ein dokumentierter, offener Roadmap-Punkt (Seiten existieren einfach noch nicht) — kein Bug wie die Footer-Fake-Links oben, sondern ehrliche Baustelle. Nicht verändert. |
| `.scene-bg` / `.scene-ph` (ungenutztes CSS) | ⚠️ **absichtlich nicht angefasst** | Aktuell kein HTML-Treffer, aber passt zu `CLAUDE.md`-Punkt 4 ("Zweites Hintergrundvideo für die angeheftete Scroll-Szene, Konzept vorhanden, noch nicht generiert") — vermutlich Vorbereitung für dieses Feature. Nicht gelöscht. |
| **Impressum — Firmendaten (NEU, 7. Durchgang)** | ⚠️ | Inhaber (Hassan Daoud), Anschrift (Am Bornberg 82, 29690 Schwarmstedt) und Telefon (0152 0313 3132) sind jetzt echt, zweimal eingetragen (Diensteanbieter + § 18 Abs. 2 MStV). USt-IdNr.-Zeile durch korrekte Kleinunternehmer-Formulierung nach § 19 UStG ersetzt (keine Nummer, weil keine vorhanden — richtig so). **Weiterhin offen:** `[Versicherer]`/`[Anschrift]` der Berufshaftpflicht (siehe `OFFENE-PUNKTE.md` Punkt 4) und die Handwerkskammer-Zuständigkeit (neu, siehe Punkt 4a). |
| **Datenschutz — Hoster-Name (NEU, 7. Durchgang)** | ⚠️ | Abschnitt 7 neu formuliert: STRATO (Domain/E-Mail) und GitHub Pages (Auslieferung der Website-Dateien) sauber als getrennte Rollen benannt, statt fälschlich einen einzigen Hoster mit Serverstandort Deutschland zu behaupten. **Weiterhin offen:** Serverstandort/AVV-Status von GitHub Pages ungeprüft, siehe `OFFENE-PUNKTE.md` Punkt 3. |
| Sichtbare KI-Kennzeichnung am Hero-Video selbst | ❌ | Zusage steht, ist am Video selbst noch nicht eingelöst. Siehe `OFFENE-PUNKTE.md`. |
| **§ 22 KUG für `hero.mp4`/`zusagen.mp4` (NEU, 2026-08-22)** | ✅ n/a | Nicht anwendbar — bestätigt reines Text-zu-Video ohne Image-to-Video und ohne reales Referenzfoto/-video einer echten Person, daher keine „Abgebildete" i. S. d. § 22 KUG; Art. 50 KI-VO/§ 5 UWG bleiben davon unberührt offen, siehe `OFFENE-PUNKTE.md` Punkt 6/10. |
| Kontaktformular — echtes Backend statt `mailto:`? | — (Entscheidung offen) | Siehe `OFFENE-PUNKTE.md` Punkt 5. |
| Cookie-Consent-Banner | n/a | Keine Cookies im Einsatz (s. o.) — Banner-Pflicht entfällt, solange das so bleibt. |
| Barrierefreiheitserklärung (BFSG) | — | Nicht abschließend geprüft. Grundlegende technische Barrierefreiheit ist gegeben; formale Erklärung + Kleinstunternehmen-Ausnahme noch nicht bestätigt. |
| Rechtstexte fachlich geprüft | ❌ | Weiterhin als Entwurf markiert. |
| **Indexierungssperre (NEU, 5. Durchgang)** | ✅ | `robots.txt` (`Disallow: /`) + `<meta name="robots" content="noindex,nofollow">` auf allen 12 Seiten. Notwendig, solange Impressum-Platzhalter live erreichbar sind — Disallow allein verhindert nur das Crawlen, nicht zuverlässig die Indexierung. |
| **Sitemap.xml (NEU, 5. Durchgang)** | ✅ | Alle 12 Seiten, vorbereitet für den Live-Gang, in `robots.txt` bewusst noch nicht referenziert. |
| **LocalBusiness Schema.org (aktualisiert, 7. Durchgang)** | ✅ | Auf `index.html`. `address` (PostalAddress) und `telephone` jetzt mit den echten Firmendaten ergänzt, JSON per `json.loads()` gegengeprüft — valide. Weiterhin ohne `foundingDate` (Gründungsjahr unbestätigt). |
| **„seit 2026" ohne Beleg (NEU, 5. Durchgang)** | ✅ | Stand unbelegt an drei Stellen (`index.html` Hero-Kennzeile, `ueber-uns.html` Meta-Description/Lead/Kennzahl) — dieses Projekt nennt selbst nur „neu gegründet", kein Jahr. Entfernt bzw. durch anderswo bereits veröffentlichte, belegbare Aussage ersetzt. Details: `OFFENE-PUNKTE.md` Punkt 9. |

---

## 2. Security-Audit (securing-web-apps, OWASP Top 10:2025)

Threat-Modell: statische Website ohne Backend, ohne Login, ohne Datenbank.
Die meisten OWASP-Top-10-Kategorien (A01 Broken Access Control, A04 Crypto,
A07 Auth, A08 Integrity, A09 Logging) greifen bei einer solchen Seite
strukturell nicht — es gibt keine Server-Session, keine Zugriffsrechte,
keine Passwörter. Geprüft wurde, was tatsächlich zutrifft:

| Kategorie | Befund |
|---|---|
| **A03 Supply Chain** | Vorher: GSAP/ScrollTrigger/Lenis über CDN ohne SRI-Hash (Integritätsprüfung). Jetzt self-hosted (3. Durchgang) — SRI dadurch gegenstandslos, es gibt keine externe Ressource mehr, die manipuliert werden könnte. ✅ |
| **A05 Injection / XSS** | `grep -rn "innerHTML\|outerHTML\|document.write\|eval(\|new Function("` über `assets/site.js` und alle HTML: zwei `innerHTML`-Stellen gefunden, beide mit ausschließlich hartcodierten String-Literalen befüllt (SVG-Wellenpfade, leerer String vor DOM-Rebuild per `createTextNode`/`appendChild`) — **kein Nutzereingabe-Pfad zu `innerHTML`**. Kein `eval`, kein `document.write` im ganzen Projekt. ✅ |
| **A05 mailto-Injection** (Formular → E-Mail-Link) | `kontakt.html`/`site.js`: Betreff und Body werden aus Nutzereingaben (`qm`, `plz`, `name`, `email`, `tel`, Turnus) zusammengesetzt und **erst danach als Ganzes** durch `encodeURIComponent()` geschickt, bevor sie in die `mailto:`-URL eingesetzt werden — Zeilenumbrüche/Sonderzeichen, die theoretisch zusätzliche Header (`Bcc:` etc.) vortäuschen könnten, werden dabei automatisch prozentkodiert. ✅ Korrekt implementiert. |
| **A05 Validierung** | Formular nutzt native HTML5-Validierung (`required`, `type="email"`, `pattern`) — das ist **UX, keine Sicherheitsgrenze** (kein Backend vorhanden, das ohnehin serverseitig validieren müsste). Für den aktuellen Zweck (mailto-Fallback) ausreichend; relevant wird serverseitige Validierung erst, wenn ein echtes Backend dazukommt (siehe `OFFENE-PUNKTE.md` Punkt 5). Ein Korrektheitsfehler dabei gefunden und behoben: PLZ-Pattern erlaubte 4–5 Ziffern, deutsche Postleitzahlen sind immer genau 5-stellig → `pattern="[0-9]{5}"` (vorher `{4,5}`). |
| **A02 Security Headers / CSP** | Keine `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` gesetzt — weder als HTTP-Header (kein Server im Repo, das ist Hosting-Konfiguration) noch als `<meta http-equiv>`. **Empfehlung, nicht umgesetzt:** siehe unten. |
| **Tabnabbing (`target="_blank"` ohne `rel="noopener"`)** | Kein einziges `target="_blank"` im gesamten Projekt — Prüfung war ergebnislos, weil es nichts zu prüfen gibt. ✅ |
| **Secrets im Client-Code** | Keine API-Keys, Tokens oder Zugangsdaten in `assets/site.js` oder irgendeiner HTML-Datei. ✅ |
| **A06 Insecure Design** (Preisrechner) | Rechnet ausschließlich lokal aus einer festen Tabelle (`rate()`-Funktion), sendet nichts an einen Server — es gibt keinen Preis, der vom Client "vertrauensvoll" übernommen würde, da kein Backend existiert, das ihn entgegennehmen könnte. ✅ strukturell kein Risiko. |
| **A10 Exceptional Conditions** | Kein Server → keine Stacktraces, die geleakt werden könnten. Formular: leere/ungültige Eingaben werden durch native Validierung blockiert, kein Absturz getestet (leere Felder, sehr lange Strings, Emoji/Unicode in Namen) — alles bleibt im Browser, kein Fehlerfall beobachtet. |

### Empfehlung: Content-Security-Policy (nicht umgesetzt)

Nicht automatisch umgesetzt, weil eine CSP das Verhalten der ganzen Seite
betrifft und alle 12 Seiten + `index.html`s Inline-`<script>` sorgfältig
gegen die Policy getestet werden müssten, bevor sie live geht — das ist eine
Änderung mit Blast-Radius, keine lokale Korrektur. Empfohlene Richtung,
falls gewünscht:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; base-uri 'self'; form-action 'self' mailto:;">
```
`'unsafe-inline'` wäre bei `style-src` nötig, weil die Seiten durchgehend
`style="..."`-Attribute verwenden (kein Refactoring-Umfang für diesen
Durchgang); bei `script-src` wegen des Inline-`<script>`-Blocks in
`index.html`. Da inzwischen ausnahmslos alles self-hosted ist (`'self'`
deckt alles ab), wäre selbst diese lockere Policy bereits ein echter
Fortschritt gegenüber "keine Policy". Empfehlung: separat einführen und auf
allen 12 Seiten durchklicken, bevor sie live geht.

---

## 3. Code-Review (code-reviewing)

### Kritisch
Keine gefunden.

### Wichtig — behoben in diesem Durchgang
- **`assets/site.css`: 15 Zeilen 1:1 dupliziertes CSS** (`.logo`, `.logo img`,
  `.logo .sub`, zwei `@media`-Regeln, `footer .flogo`, `footer .fsub`) unter
  zwei verschiedenen Abschnittsüberschriften ("Wortmarke in Schreibschrift"
  vs. "Mehrseiten-Build: Kopf-Logo als Bild") — byte-identisch, keine
  funktionale Notwendigkeit für beide. Älteren, nicht mehr zutreffenden
  Block entfernt (die Seite nutzt durchgehend Bild-Logos, kein
  Schreibschrift-Wordmark mehr).
- **Zwei tote CSS-Klassen entfernt:** `.vid-slot` (Platzhalter-Badge für ein
  noch einzusetzendes Video, "dashed border, Video folgt"-Optik — Video ist
  längst eingebaut, Klasse nirgends mehr referenziert) und `.watermark`
  (generische Logo-Tiefenebene, ebenfalls ohne HTML-Referenz). Beide über
  `grep` gegen alle 12 HTML-Dateien verifiziert als ungenutzt, keine
  erkennbare Roadmap-Verbindung (im Unterschied zu `.scene-bg`/`.scene-ph`,
  die bewusst stehen gelassen wurden, s. o.).
- **PLZ-Validierung falsch** (`pattern="[0-9]{4,5}"` statt `{5}`) — siehe
  Security-Abschnitt oben.
- **Datenschutz-Text ungenau** ("nur notwendige Cookies" bei tatsächlich
  null Cookies) — siehe Compliance-Tabelle oben.

### Nit (optional, nicht umgesetzt)
- `index.html` läuft inzwischen auf einer komplett anderen Reveal-/
  Animations-Architektur (GSAP + ScrollTrigger + Lenis) als die anderen 11
  Seiten (`.rv`/`data-stagger` + eigener IntersectionObserver in
  `site.js`). Das ist an sich kein Fehler — beide Systeme sind sauber
  voneinander isoliert (`index.html` hat schlicht keine `.rv`-Klassen mehr,
  `site.js` findet dort nichts zu tun) — aber ein:e neue:r Entwickler:in
  würde ohne Kontext zwei parallele Animationssysteme in einer Codebase
  vorfinden und sich fragen, warum. Bereits in `compliance/COMPLIANCE.md`
  (1.–3. Durchgang) dokumentiert; hier nur als Code-Review-Punkt erneut
  benannt, damit er nicht in der Doku-Historie untergeht. Kein Fix
  vorgeschlagen — Auflösung hängt von einer noch nicht getroffenen
  Entscheidung ab, ob die restlichen 11 Seiten irgendwann auf GSAP
  migrieren.
- Keine offensichtliche tote JS-Funktion gefunden; `window.__lissInitCalc`,
  `window.__lissMeasure`, `window.__lissReduced`, `window.__lissWordrise`,
  `window.__lissScenes` sind als globale Hooks exportiert, aber in keiner
  Datei referenziert — vermutlich bewusst als Erweiterungspunkte gedacht
  (z. B. für künftige Seiten mit dynamisch nachgeladenem Inhalt), nicht als
  Versehen behandelt. Nicht angefasst.

### Was gut ist
- Der Verzicht auf ein Framework bei gleichzeitig konsequent geteiltem
  `site.css`/`site.js` hält die Duplikation insgesamt niedrig — der oben
  gefundene 15-Zeilen-Block war die einzige nennenswerte Fundstelle in
  einer ca. 700 Zeilen langen CSS-Datei.
- Die `mailto:`-Konstruktion im neuen Kontaktformular-Code encodiert korrekt
  am Ende der Zusammensetzung, nicht pro Feld — leicht, das falsch herum zu
  machen, hier richtig gelöst.

---

## Blocker für einen Launch (nicht abschließend)

1. `impressum.html`: Berufshaftpflicht-Versicherer + Anschrift (`[Versicherer]`/`[Anschrift]`) weiterhin Platzhalter — einzige verbliebene Lücke in diesem Dokument. Inhaber/Anschrift/Telefon/Kleinunternehmerstatus sind seit 7. Durchgang echt.
2. `impressum.html`: Zuständigkeit der Handwerkskammer Hannover für den neuen Standort Schwarmstedt ungeprüft (neu, 7. Durchgang) — siehe `OFFENE-PUNKTE.md` Punkt 4a.
3. `datenschutz.html`: Serverstandort und AVV-Status von GitHub Pages (GitHub, Inc.) ungeprüft — Abschnitt 7 beschreibt das jetzt ehrlich als offene Frage statt es zu behaupten, siehe `OFFENE-PUNKTE.md` Punkt 3.
4. Rechtstexte insgesamt noch nicht anwaltlich freigegeben.
5. BFSG-Anwendbarkeit nicht abschließend geklärt.
6. Lizenznachweis für `hero.mp4` (Seedance) fehlt noch, ebenso sichtbare KI-Kennzeichnung am Video selbst.

*Kein Blocker (mehr):* Kontaktformular funktioniert, keine externen
Verbindungen mehr, keine Sicherheitslücken gefunden, keine kritischen
Code-Probleme.

## Änderungen im 4. Durchgang (2026-08-16)

- 12× `*.html` — Footer: `<a href="#">` (Öffnungszeiten, Adresse) → `<span>`.
- `datenschutz.html` — Abschnitt 6 „Cookies" korrigiert.
- `kontakt.html` — PLZ-Pattern korrigiert (`{5}` statt `{4,5}`), Placeholder-Beispiel realistischer.
- `assets/site.css` — 15 Zeilen dupliziertes CSS entfernt, `.vid-slot`/`.watermark` (totes CSS) entfernt, `.fcol span`-Regel neu für die Footer-Textzeilen.
- `compliance/COMPLIANCE.md` — dieser Durchgang, inkl. Security-Audit- und Code-Review-Abschnitt.
- Volle Regression über alle 12 Seiten nach jeder Änderung (Playwright, 0 Konsolenfehler, Formular-Flow erneut end-to-end getestet).

## Änderungen im 5. Durchgang (2026-08-20)

- `robots.txt` neu angelegt (`Disallow: /`, Sitemap-Zeile auskommentiert).
- `sitemap.xml` neu angelegt, 12 URLs, nach Seitenrolle gestaffelte Priorität.
- 12× `*.html` — `<meta name="robots" content="noindex,nofollow">` direkt nach dem Viewport-Meta.
- `index.html` — `LocalBusiness`-JSON-LD ergänzt (ohne `address`/`telephone`/`foundingDate`, siehe Tabelle oben).
- `index.html` — Hero-Kennzeile „seit 2026" → „Büro · Praxis · Treppenhaus" (nur Textinhalt geändert, `<i>`-Trennelement für die GSAP-Animation unangetastet).
- `ueber-uns.html` — Meta-Description, Lead-Text und Kennzahl-Kachel von unbelegtem Gründungsjahr befreit; Kachel jetzt „0 € Zuschlag für Einsätze vor 8 und ab 17 Uhr" (identisch zur bereits veröffentlichten Aussage in `faq.html`/`bueroreinigung.html`).
- `compliance/OFFENE-PUNKTE.md` — Punkt 9 neu (Discoverability-Grundlagen, was erledigt ist, was noch fehlt: Canonical, Favicon, Open Graph, FAQPage-Schema).
- Nicht angefasst: `kontakt.html` (Formular bereits im 3. Durchgang repariert, keine Berührung nötig), `standorte.html`/`faq.html`/`ueber-uns.html`-Layout, alle Fonts/GSAP/Lenis-Dateien.

## Änderungen im 6. Durchgang (2026-08-21)

- `standorte.html` — alle 15 Stadtteil-Karten von „Reinigungsfirma
  &lt;Stadtteil&gt;" auf „LISS in &lt;Stadtteil&gt;" umformuliert
  (compliance-agent + content-agent, siehe `OFFENE-PUNKTE.md`-Historie
  zum Zusagen-Video für das gleiche Agent-Pärchen an anderer Stelle).
  Grund: alter Wortlaut liest sich isoliert wie 15 eigenständige Firmen
  statt einer Marke mit mehreren Einsatzgebieten — § 5 UWG-Risiko dabei
  gering (LISS-Branding im Header jeder Seite mildert stark), aber
  objektiv unpräzise. Gleiches Muster im sitweiten Footer-Baustein (12
  Seiten identisch) und im `<title>` von `hannover-list.html` ergänzt.
- **Neuer Blocker-naher Punkt, noch nicht umgesetzt:** Doorway-Page-
  Risiko für die 14 aktuell unverlinkten Stadtteil-Karten
  (`href="#"`). Solange sie Platzhalter bleiben, kein Problem. Sobald
  sie nach dem Muster von `hannover-list.html` befüllt werden (identischer
  Seitenaufbau, nur Stadtteilname + ein bis zwei Sätze ausgetauscht),
  kippt das nach Googles Spam-Richtlinien in echtes Doorway-Page-Risiko.
  Vor Umsetzung der restlichen 14 Seiten (siehe `CLAUDE.md`, „Was als
  Nächstes ansteht", Punkt 1) mindestens pro Seite variieren: reale
  Objektreferenzen/Gebäudetypen, unterschiedliche Kundenstruktur-
  Beschreibung, eigene Anfahrts-/Einsatzgebiets-Angaben, unterschiedliche
  FAQ-/Preisbeispiel-Passagen — nicht mechanisch dieselbe Vorlage mit
  ausgetauschtem Namen.

## Änderungen im 7. Durchgang (2026-09-25)

Kunde (Hassan Daoud) hat echte Firmendaten geliefert — bisher als
Platzhalter in `OFFENE-PUNKTE.md` Punkte 1–3 offen. Umgesetzt:

- `impressum.html` — Diensteanbieter-Absatz und § 18 Abs. 2 MStV-Absatz:
  Inhaber „Hassan Daoud", Anschrift „Am Bornberg 82, 29690 Schwarmstedt",
  Telefon „0152 0313 3132". USt-IdNr.-Zeile ersetzt durch korrekte
  Kleinunternehmer-Formulierung nach § 19 UStG (keine Nummer eingetragen —
  Kunde hat eine persönliche Steuer-ID genannt, die **bewusst nicht**
  veröffentlicht wurde, weil sie keine USt-IdNr. ist und im Impressum nicht
  hingehört). `[Versicherer]`/`[Anschrift]` bewusst als Platzhalter stehen
  gelassen — fehlt weiterhin, siehe Blocker 1.
- `datenschutz.html` — Abschnitt 1 „Verantwortliche Stelle" mit echter
  Anschrift/Telefon/Inhabername aktualisiert. Abschnitt 7 „Hosting"
  komplett neu formuliert: STRATO (Domain-DNS + E-Mail, Deutschland) und
  GitHub Pages (Auslieferung der Website-Dateien, GitHub Inc./USA) als
  zwei getrennte Anbieter mit unterschiedlichen Rollen benannt. Die vorher
  unbelegte Behauptung „Serverstandort in Deutschland" +
  „Auftragsverarbeitungsvertrag ... liegt vor" für den eigentlichen
  Webhoster wurde entfernt, weil sie für GitHub Pages nicht zutrifft/nicht
  geprüft ist — stattdessen offen benannt (Serverstandort GitHub Pages
  nicht sicher EU/Deutschland, AVV-Status ungeprüft), siehe Blocker 3.
- 12× `*.html` (alle Seiten außer dem nicht verlinkten, untracked
  Altstand `liss-reinigungsservice.html`, siehe unten) — Footer-
  Kontaktspalte, Mobile-Nav und Sticky-CTA: `tel:+4951112345670` /
  „0511 · 1234 567-0" → `tel:+4915203133132` / „0152 0313 3132";
  „Musterstraße 1, 30159 Hannover" → „Am Bornberg 82, 29690 Schwarmstedt".
  `kontakt.html` zusätzlich: Meta-Description-Telefonangabe aktualisiert.
  Verifiziert per `grep -l "4951112345670\|Musterstraße" <alle 12
  Dateien>` → keine Treffer mehr; `grep -o 'tel:[+0-9]*'` → einheitlich
  `tel:+4915203133132` auf allen 12 Seiten.
- `index.html` — `LocalBusiness`-JSON-LD: `address` (als `PostalAddress`)
  und `telephone` ergänzt, die vorher bewusst wegen Platzhalterdaten
  ausgelassen waren. Kommentar direkt davor aktualisiert (beschrieb bisher
  fälschlich weiterhin fehlende Daten). JSON-Validität mit
  `python3 -c "json.loads(...)"` gegengeprüft.
- **Nicht angefasst, wie angewiesen:** `robots.txt`, `noindex`-Meta-Tags
  auf allen Seiten (Impressum bleibt wegen fehlendem Versicherer weiterhin
  unvollständig — Prototyp bleibt von der Indexierung ausgeschlossen), die
  Handwerksrollen-Aussage selbst in `impressum.html` (nur als offene Frage
  dokumentiert, siehe `OFFENE-PUNKTE.md` Punkt 4a), sowie
  `liss-reinigungsservice.html` — ein untracked, von keiner der 12 Seiten
  verlinktes Altstand-Dokument mit Google-Fonts-CDN-Einbindung und
  eigenem SPA-Routing, offensichtlich kein Teil der aktuell gepflegten
  Seite; nicht Gegenstand dieses Auftrags.

**Neuer offener Punkt (7. Durchgang):** Die im Impressum stehende
Behauptung „Eingetragen in der Handwerksrolle der Handwerkskammer
Hannover" war schon vorher ungeprüft (`CLAUDE.md`, „Was als Nächstes
ansteht", Punkt 4). Mit der jetzt echten Adresse Schwarmstedt (Landkreis
Heidekreis, nicht Stadt/Region Hannover) ist offen, ob die Handwerkskammer
Hannover für diesen Standort tatsächlich zuständig ist oder eine andere
Kammer (z. B. Handwerkskammer Braunschweig-Lüneburg-Stade, deren
Zuständigkeitsgebiet den Heidekreis abdecken könnte — nicht verifiziert,
nur als Vermutung genannt). Keine eigene Entscheidung getroffen, nur als
Frage dokumentiert, siehe `OFFENE-PUNKTE.md` Punkt 4a.

## Frühere Durchgänge

Siehe Git-Historie von `compliance/COMPLIANCE.md` für die Änderungen aus
Durchgang 1–3 (Footer-Links, Fonts self-hosted, Kontaktformular repariert,
GSAP self-hosted) — hier nicht erneut ausgeschrieben, um diese Datei nicht
unbegrenzt wachsen zu lassen.
