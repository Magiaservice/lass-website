# LISS Reinigungsservice — Website

Statische Website (reines HTML/CSS/JS, kein Framework, kein Build-Schritt).

- Lokal ansehen: Ordner öffnen und `index.html` im Browser starten, oder `python3 -m http.server 8123` und http://localhost:8123 aufrufen.
- Veröffentlichung: Push auf `main` löst den GitHub-Pages-Workflow aus (`.github/workflows/pages.yml`). Veröffentlicht werden nur `*.html`, `assets/`, `CNAME`, `robots.txt`, `sitemap.xml`.
- Gemeinsame Dateien: `assets/site.css`, `assets/site.js`.
