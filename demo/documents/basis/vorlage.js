/* Gemeinsames Verhalten aller Vorlagen: Firmendaten, ausfüllbare Felder,
   Firma/Privat-Umschaltung, Preisübersicht mit Summen, Zusatzleistungen,
   entfernbare Abschnitte und Zeilen, Prüfung vor dem Speichern als PDF. */
(function () {
  'use strict';
  var F = window.LISS_FIRMA || {};
  var SATZ = (F.ustSatz || 19) / 100;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function euro(cent) {
    return (cent / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }
  // "1.234,56" / "892" / "892,00 €" -> Zahl; Text wie "inklusive" -> NaN
  var NEG = document.body.hasAttribute('data-negativ');
  function zahl(text) {
    var t = String(text || '').replace(/[€\s]/g, '').replace(/\u2212/g, '-');
    if (!t) return NaN;
    if (t.indexOf(',') > -1) t = t.replace(/\./g, '').replace(',', '.');
    return /^-?\d+(\.\d+)?$/.test(t) ? parseFloat(t) : NaN;
  }
  function zwei(n) { return ('0' + n).slice(-2); }
  function datum(d) { return zwei(d.getDate()) + '.' + zwei(d.getMonth() + 1) + '.' + d.getFullYear(); }
  function plusTage(n) { var d = new Date(); d.setDate(d.getDate() + n); return d; }
  function b2c() { return document.body.getAttribute('data-modus') === 'b2c'; }

  /* Firmendaten */
  $$('[data-firma]').forEach(function (el) {
    var v = F[el.getAttribute('data-firma')];
    if (v) { el.textContent = v; }
    else { el.textContent = el.getAttribute('data-label') + ' fehlt'; el.classList.add('fehlt'); }
  });
  $$('[data-wenn-firma]').forEach(function (el) { if (!F[el.getAttribute('data-wenn-firma')]) el.remove(); });
  $$('[data-wenn-nicht-firma]').forEach(function (el) { if (F[el.getAttribute('data-wenn-nicht-firma')]) el.remove(); });
  $$('[data-ust-satz]').forEach(function (el) { el.textContent = (F.ustSatz || 19) + ' %'; });

  /* Vorbelegungen */
  $$('[data-heute]').forEach(function (el) { if (!el.textContent.trim()) el.textContent = datum(new Date()); });
  $$('[data-plus-tage]').forEach(function (el) {
    var k = el.getAttribute('data-plus-tage');
    if (!el.textContent.trim()) el.textContent = datum(plusTage(F[k] || parseInt(k, 10) || 0));
  });
  // Nummernschema des Inhabers: ANG-2026-0920-01 (Jahr, Monat+Tag, laufend am Tag)
  $$('[data-nummer]').forEach(function (el) {
    var d = new Date();
    if (!el.textContent.trim()) el.textContent = el.getAttribute('data-nummer') + '-' + d.getFullYear() + '-' + zwei(d.getMonth() + 1) + zwei(d.getDate()) + '-01';
  });

  /* Ausfüllbare Felder: Einfügen nur als reiner Text */
  function machFeld(el) {
    el.setAttribute('contenteditable', 'true');
    el.addEventListener('paste', function (e) {
      e.preventDefault();
      document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text'));
    });
    el.addEventListener('input', function () {
      if (el.textContent.trim() === '' && !el.querySelector('li')) el.innerHTML = '';
      rechnen();
    });
    if (el.getAttribute('data-spalte') === 'preis' || el.hasAttribute('data-zusatz-preis')) {
      el.addEventListener('blur', function () {
        var p = zahl(el.textContent);
        if (NEG && !isNaN(p)) p = -Math.abs(p);
        if (!isNaN(p)) el.textContent = euro(Math.round(p * 100));
      });
    }
  }
  $$('.f').forEach(machFeld);

  /* Entfernbare Abschnitte */
  $$('.abschnitt').forEach(function (a) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'weg-abschnitt'; b.textContent = T('× Abschnitt entfernen');
    b.addEventListener('click', function () { a.remove(); rechnen(); });
    a.insertBefore(b, a.firstChild);
  });

  /* Tabellen mit entfernbaren Zeilen (Rhythmus, Bedingungen) */
  function zeileWeg(tr) {
    var td = document.createElement('td');
    td.className = 'nur-bildschirm'; td.style.width = '6mm';
    td.innerHTML = '<button class="weg" type="button" title="Zeile entfernen">×</button>';
    td.firstChild.addEventListener('click', function () { tr.remove(); });
    tr.appendChild(td);
  }
  $$('table[data-zeilen]').forEach(function (t) {
    $$('thead tr', t).forEach(function (tr) { var th = document.createElement('th'); th.className = 'nur-bildschirm'; tr.appendChild(th); });
    $$('tbody tr', t).forEach(zeileWeg);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'btn-zeile'; btn.textContent = T('+ Zeile');
    btn.addEventListener('click', function () {
      var tr = document.createElement('tr');
      var lab = t.getAttribute('data-zeilen') === 'lab';
      var n = parseInt(t.getAttribute('data-spalten') || '2', 10);
      var phs = (t.getAttribute('data-ph-spalten') || 'Bezeichnung,Inhalt').split(',');
      var h = '';
      for (var c = 0; c < n; c++) h += '<td' + (lab && c === 0 ? ' class="lab"' : '') + '><span class="f block" data-ph="' + (phs[c] || '') + '"></span></td>';
      tr.innerHTML = h;
      $$('.f', tr).forEach(machFeld);
      zeileWeg(tr);
      $('tbody', t).appendChild(tr);
    });
    t.parentNode.insertBefore(btn, t.nextSibling);
  });

  /* Firma / Privat */
  function modus(m) {
    document.body.setAttribute('data-modus', m);
    $$('[data-setze-modus]').forEach(function (b) { b.classList.toggle('an', b.getAttribute('data-setze-modus') === m); });
    rechnen();
  }
  $$('[data-setze-modus]').forEach(function (b) {
    b.addEventListener('click', function () { modus(b.getAttribute('data-setze-modus')); });
  });

  /* Preisübersicht: Preis = Betrag der Zeile; Text wie "inklusive" zählt nicht mit */
  var tbody = $('table.pos tbody');
  function neueZeile(w) {
    w = w || {};
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="nr"></td>' +
      '<td><span class="f block" data-ph="Leistung" data-spalte="text"></span></td>' +
      '<td class="menge"><span class="f block" data-ph="z. B. 50 m², Monatspauschale" data-spalte="menge"></span></td>' +
      '<td class="preis"><span class="f block" data-ph="0,00 €" data-spalte="preis"></span></td>' +
      '<td class="nur-bildschirm" style="width:6mm"><button class="weg" type="button" title="Position entfernen">×</button></td>';
    ['text', 'menge', 'preis'].forEach(function (k) {
      var f = $('[data-spalte="' + k + '"]', tr);
      if (w[k] != null) f.textContent = w[k];
      machFeld(f);
    });
    $('.weg', tr).addEventListener('click', function () { tr.remove(); rechnen(); });
    tbody.appendChild(tr);
    rechnen();
    return tr;
  }
  window.LISS_neueZeile = neueZeile;
  var plus = $('[data-neue-zeile]');
  if (plus) plus.addEventListener('click', function () { $('[data-spalte="text"]', neueZeile()).focus(); });

  function teile(cent) { // gibt {netto, ust, brutto} je nach Modus
    if (b2c()) { var n = Math.round(cent / (1 + SATZ)); return { netto: n, ust: cent - n, brutto: cent }; }
    var u = Math.round(cent * SATZ); return { netto: cent, ust: u, brutto: cent + u };
  }
  function schreibe(root, attr, s) {
    ['netto', 'ust', 'brutto'].forEach(function (k) {
      $$('[' + attr + '="' + k + '"]', root).forEach(function (e) { e.textContent = euro(s[k]); });
    });
  }

  function rechnen() {
    $$('[data-preis-art]').forEach(function (e) { e.textContent = b2c() ? 'brutto' : 'netto'; });
    var fehler = false;
    if (tbody) {
      var summe = 0, nr = 0;
      $$('tr', tbody).forEach(function (tr) {
        var text = $('[data-spalte="text"]', tr).textContent.trim();
        var menge = $('[data-spalte="menge"]', tr).textContent.trim();
        var ptxt = $('[data-spalte="preis"]', tr).textContent.trim();
        var leer = !text && !menge && !ptxt;
        tr.classList.toggle('leer', leer);
        $('.nr', tr).textContent = leer ? '' : zwei(++nr);
        var p = zahl(ptxt);
        if (NEG && !isNaN(p)) p = -Math.abs(p);
        if (!isNaN(p)) summe += Math.round(p * 100);
        else if (!leer && !ptxt) fehler = true;
      });
      schreibe(document, 'data-summe', teile(summe));
    }
    $$('.zusatz').forEach(function (z) {
      var p = zahl(($('[data-zusatz-preis]', z) || {}).textContent);
      schreibe(z, 'data-zusatz', teile(isNaN(p) ? 0 : Math.round(p * 100)));
    });
    document.body.classList.toggle('pos-fehler', fehler);
    rechnenMahn();
  }

  /* Mahnung: Summe einer Tabellenspalte + Gebühren */
  function rechnenMahn() {
    var t = $('table[data-summiere]'); if (!t) return;
    var col = parseInt(t.getAttribute('data-summiere'), 10), sum = 0, fees = 0;
    $$('tbody tr', t).forEach(function (tr) {
      var c = tr.children[col - 1], v = zahl(c ? c.textContent : '');
      if (!isNaN(v)) sum += Math.round(v * 100);
    });
    $$('[data-fee]').forEach(function (f) {
      if (f.offsetParent === null) return;
      var v = zahl(f.textContent); if (!isNaN(v)) fees += Math.round(v * 100);
    });
    $$('[data-offen]').forEach(function (e) { e.textContent = euro(sum); });
    $$('[data-forderung]').forEach(function (e) { e.textContent = euro(sum + fees); });
  }

  /* Ankreuzfelder */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.box') : null;
    if (b) b.textContent = b.textContent.trim() === '☐' ? '☒' : '☐';
  });

  /* Dokumentstufe / -art (z. B. Erinnerung, 1. Mahnung; Übergabe, Rückgabe) */
  function stufe(s) {
    document.body.setAttribute('data-stufe', s);
    $$('[data-setze-stufe]').forEach(function (b) { b.classList.toggle('an', b.getAttribute('data-setze-stufe') === s); });
    $$('[data-nur-stufe]').forEach(function (el) { el.hidden = el.getAttribute('data-nur-stufe').split(' ').indexOf(s) < 0; });
    rechnenMahn();
  }
  $$('[data-setze-stufe]').forEach(function (b) {
    b.addEventListener('click', function () { stufe(b.getAttribute('data-setze-stufe')); });
  });

  /* Leere Tabellenzeilen im Ausdruck weglassen */
  window.addEventListener('beforeprint', function () {
    $$('table[data-zeilen] tbody tr').forEach(function (tr) {
      var fs = $$('.f', tr);
      tr.classList.toggle('leer', fs.length > 0 && fs.every(function (f) { return !f.textContent.trim(); }));
    });
  });

  /* Clean on-screen preview, then native print/PDF preview. */
  var druck = $('[data-drucken]'), previewBar = null, previewFields = [], previewScroll = 0;
  function preparePrintRows() {
    $$('table[data-zeilen] tbody tr').forEach(function (tr) {
      var fs = $$('.f', tr);
      tr.classList.toggle('leer', fs.length > 0 && fs.every(function (f) { return !f.textContent.trim(); }));
    });
  }
  function checkPrint() {
    var offen = [];
    $$('.f[data-pflicht]').forEach(function (f) { if (!f.textContent.trim() && f.offsetParent !== null) offen.push(f.getAttribute('data-ph')); });
    $$('.fehlt').forEach(function (f) { if (f.offsetParent !== null) offen.push(f.textContent); });
    if (tbody && !$$('tr', tbody).some(function (tr) { return !tr.classList.contains('leer'); })) offen.push('mindestens eine Position');
    if (document.body.classList.contains('pos-fehler')) offen.push('Preis in einer Position');
    offen = offen.filter(function (x, i) { return offen.indexOf(x) === i; });
    if (offen.length && !confirm(T('Nicht ausgefüllt:\n\n–') + offen.join('\n– ') + T('\n\nPDF trotzdem speichern?'))) return false;
    return true;
  }
  function closePreview() {
    document.body.classList.remove('druckvorschau');
    previewFields.forEach(function (item) { item.el.setAttribute('contenteditable', item.value); });
    previewFields = [];
    if (previewBar) previewBar.hidden = true;
    window.scrollTo(0, previewScroll);
    if (druck) druck.focus({preventScroll:true});
  }
  function openPreview() {
    if (document.body.classList.contains('druckvorschau')) return;
    if (document.activeElement) document.activeElement.blur();
    previewScroll = window.scrollY;
    preparePrintRows();
    previewFields = $$('.blatt [contenteditable]').map(function (el) { return {el:el,value:el.getAttribute('contenteditable')}; });
    previewFields.forEach(function (item) { item.el.setAttribute('contenteditable','false'); });
    if (!previewBar) {
      previewBar = document.createElement('div');previewBar.className='druckvorschau-leiste';previewBar.setAttribute('role','region');previewBar.setAttribute('aria-label','Dokumentvorschau');
      var title=document.createElement('span');title.textContent='Vorschau · ohne Bearbeitungsmarkierungen. Seitenumbrüche im Druckdialog prüfen.';
      var back=document.createElement('button');back.type='button';back.textContent='Zurück zum Bearbeiten';back.onclick=closePreview;
      var print=document.createElement('button');print.type='button';print.textContent='Drucken / PDF speichern';print.className='haupt';print.onclick=function(){if(checkPrint())window.print();};
      previewBar.appendChild(title);previewBar.appendChild(back);previewBar.appendChild(print);document.body.appendChild(previewBar);
    }
    previewBar.hidden=false;document.body.classList.add('druckvorschau');window.scrollTo(0,0);previewBar.querySelector('button').focus({preventScroll:true});
  }
  if (druck) { druck.textContent='Vorschau / PDF';druck.addEventListener('click',openPreview); }
  window.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('druckvorschau'))closePreview();});

  /* Vorbelegung aus Dashboard (CRM / Begehung): #fill=<base64url-JSON>. Nur Text, keine HTML-Übernahme; Adresszeile wird danach geleert. */
  (function () {
    var m = /[#&]fill=([A-Za-z0-9_\-]+)/.exec(location.hash); if (!m) return;
    var v;
    try { var b = m[1].replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '='; v = JSON.parse(decodeURIComponent(escape(atob(b)))); } catch (e) { return; }
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (!v || typeof v !== 'object') return;
    function t(x, n) { return String(x == null ? '' : x).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n || 400); }
    var n = 0;
    $$('.f[data-fill]').forEach(function (el) {
      var k = el.getAttribute('data-fill');
      if (Object.prototype.hasOwnProperty.call(v, k) && t(v[k])) { el.textContent = t(v[k]); n++; }
    });
    if (v.modus === 'b2c' || v.modus === 'b2b') document.body.setAttribute('data-modus', v.modus);
    if (tbody && Array.isArray(v.pos)) {
      $$('tr', tbody).forEach(function (tr) { tr.remove(); });
      v.pos.slice(0, 30).forEach(function (p) { if (p && typeof p === 'object') { neueZeile({ text: t(p.text, 200), menge: t(p.menge, 80), preis: t(p.preis, 20) }); n++; } });
    }
    var hinweis = document.createElement('div'); hinweis.className = 'hinweis nur-bildschirm';
    hinweis.innerHTML = '<b>Vorbelegt aus ' + (v.quelle === 'begehung' ? 'Objektbegehung' : 'CRM') + '</b> (' + n + ' Felder). Bitte alles prüfen, besonders Preis und Adresse. Fehlende Angaben (Straße, Nummer, Zahlungsziel) ergänzen. Nichts wird gespeichert, zuerst PDF sichern.';
    var leiste = $('.leiste'); if (leiste && leiste.parentNode) leiste.parentNode.insertBefore(hinweis, leiste.nextSibling);
  })();

  modus(document.body.getAttribute('data-modus') || 'b2b');
  if (document.body.hasAttribute('data-stufe')) stufe(document.body.getAttribute('data-stufe'));
  if (tbody && !$$('tr', tbody).length) neueZeile();
})();
