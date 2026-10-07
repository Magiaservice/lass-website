/* Burst-Effekt (Versuch): Ein Klick auf einen Link-Button lässt ihn in Seifenblasen zerplatzen, danach öffnet sich die Zielseite.
   Eigenständig: Datei + <script>-Zeile je Seite entfernen (oder den Commit zurücknehmen) = alter Zustand.
   Aus bei „Bewegung reduzieren“, bei Strg/Cmd/Shift-Klick, target=_blank, Anker, tel:/mailto:, Download, data-no-burst, ?burst=0. */
(function () {
  'use strict';
  if (/[?&]burst=0\b/.test(location.search)) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !Element.prototype.animate) return;
  var DAUER = 760, WEITER = window.LISS_BURST_WEITER || 560, busy = false;   /* Test: window.LISS_BURST_WEITER = 5000 verlängert die Wartezeit vor dem Seitenwechsel */

  var css = document.createElement('style');
  css.textContent = '.burst-layer{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden}' +
    '.burst-b{position:absolute;border-radius:50%;will-change:transform,opacity;box-sizing:border-box}' +
    '.burst-b::after{content:"";position:absolute;top:14%;left:20%;width:30%;height:14%;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.3));transform:rotate(-32deg)}' +
    '.burst-weg{transition:opacity .14s ease,transform .14s ease;opacity:0!important;transform:scale(.92)!important}';
  document.head.appendChild(css);

  function rgb(c) { var m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(c || ''); return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null; }
  function lum(c) { return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }
  function farbe(el) {
    var cs = getComputedStyle(el), bg = rgb(cs.backgroundColor), tx = rgb(cs.color);
    var c = bg && bg.a > 0.15 ? bg : (tx || { r: 1, g: 46, b: 137, a: 1 });
    var hell = lum(c) > 0.62;
    return { c: c, hell: hell };
  }
  function blase(layer, x, y, d, f, dx, dy, delay) {
    var b = document.createElement('span'); b.className = 'burst-b';
    var c = f.c, rim = f.hell ? 'rgba(255,255,255,.85)' : 'rgba(214,229,250,.8)';
    b.style.cssText = 'left:' + (x - d / 2) + 'px;top:' + (y - d / 2) + 'px;width:' + d + 'px;height:' + d + 'px;' +
      'border:1.5px solid ' + rim + ';' +
      'background:radial-gradient(circle at 50% 50%,rgba(' + c.r + ',' + c.g + ',' + c.b + ',.10) 0 50%,rgba(' + c.r + ',' + c.g + ',' + c.b + ',.38) 85%,rgba(255,255,255,.4) 100%);' +
      'box-shadow:inset 3px 4px 8px rgba(255,255,255,.45),0 0 12px rgba(' + (f.hell ? '255,255,255' : '159,194,232') + ',.35)';
    layer.appendChild(b);
    b.animate([
      { transform: 'translate(0,0) scale(.35)', opacity: 0 },
      { transform: 'translate(' + dx * .25 + 'px,' + dy * .25 + 'px) scale(1)', opacity: 1, offset: .18 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1.12)', opacity: 0 }
    ], { duration: DAUER - delay, delay: delay, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'both' });
  }
  function zerplatzen(el) {
    var r = el.getBoundingClientRect(), f = farbe(el), layer = document.createElement('div'); layer.className = 'burst-layer';
    document.body.appendChild(layer);
    var n = Math.max(14, Math.min(26, Math.round(r.width / 9))), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < n; i++) {
      var x = r.left + Math.random() * r.width, y = r.top + Math.random() * r.height;
      var d = 12 + Math.random() * 30, ang = Math.atan2(y - cy, x - cx) + (Math.random() - .5) * 1.2, dist = 50 + Math.random() * 120;
      blase(layer, x, y, d, f, Math.cos(ang) * dist, Math.sin(ang) * dist - 40 - Math.random() * 60, Math.random() * 120);
    }
    el.classList.add('burst-weg');
    return layer;
  }
  document.addEventListener('click', function (e) {
    if (busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a.btn[href]') : null;
    if (!a || a.hasAttribute('data-no-burst') || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || /^(tel:|mailto:|javascript:)/i.test(href)) return;
    var url; try { url = new URL(a.href, location.href); } catch (x) { return; }
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    e.preventDefault(); busy = true;
    var layer; try { layer = zerplatzen(a); } catch (x) { location.href = url.href; return; }
    setTimeout(function () { location.href = url.href; }, WEITER);
    setTimeout(function () { if (layer && layer.parentNode) layer.remove(); busy = false; a.classList.remove('burst-weg'); }, DAUER + 200);
  }, true);
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    busy = false; document.querySelectorAll('.burst-weg').forEach(function (x) { x.classList.remove('burst-weg'); });
    document.querySelectorAll('.burst-layer').forEach(function (x) { x.remove(); });
  });
})();
