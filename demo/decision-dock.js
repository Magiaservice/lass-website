/* Offene Fälle: kompakte Karte im linken Seitenbereich (unter dem Menü) statt langem Scrollen.
   Der große Block «Was braucht Ihre Entscheidung?» (#ops-attention) bleibt unverändert und wird nur eingeklappt;
   alle Aktionen laufen weiter über die originalen Schaltflächen. Nur Leitung / Übersicht. */
(() => {
  'use strict';
  const CSS = `
#decision-dock{margin:14px 0 0;padding:12px;border:1px solid #cfdcf0;border-radius:14px;background:linear-gradient(160deg,#fff,#f1f6fd);box-shadow:0 6px 18px -12px rgba(1,46,137,.35);font:inherit}
#decision-dock .dd-head{display:flex;align-items:center;gap:8px;width:100%;padding:0;border:0;background:none;cursor:pointer;color:#0a1f5c;font:600 14px/1.2 inherit;text-align:left}
#decision-dock .dd-icon{flex:0 0 30px;width:30px;height:30px;border-radius:9px;background:#012e89;color:#fff;display:grid;place-items:center}
#decision-dock .dd-icon svg{width:17px;height:17px}
#decision-dock .dd-title{flex:1}
#decision-dock .dd-badge{min-width:24px;padding:2px 7px;border-radius:999px;background:#012e89;color:#fff;font-size:12px;text-align:center}
#decision-dock .dd-badge.is-zero{background:#8fa3c8}
#decision-dock .dd-chips{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0 0}
#decision-dock .dd-chip{padding:4px 8px;border:1px solid #cfdcf0;border-radius:999px;background:#fff;color:#0a1f5c;font:500 12px/1.2 inherit;cursor:pointer}
#decision-dock .dd-chip:hover{border-color:#012e89}
#decision-dock .dd-list{display:grid;gap:7px;margin:10px 0 0;padding:0;list-style:none}
#decision-dock .dd-case{padding:8px 9px;border:1px solid #dbe5f3;border-radius:10px;background:#fff}
#decision-dock .dd-case strong{display:block;font-size:13px;line-height:1.25;color:#0a1f5c}
#decision-dock .dd-case small{display:block;margin-top:2px;font-size:11.5px;line-height:1.3;color:#5a6b8a}
#decision-dock .dd-case button{margin-top:6px;padding:4px 9px;border:0;border-radius:8px;background:#012e89;color:#fff;font:600 12px/1.2 inherit;cursor:pointer}
#decision-dock .dd-empty{margin:10px 0 0;font-size:12.5px;color:#5a6b8a}
#decision-dock .dd-all{margin:10px 0 0;width:100%;padding:7px 10px;border:1px solid #012e89;border-radius:9px;background:#fff;color:#012e89;font:600 12.5px/1.2 inherit;cursor:pointer}
#decision-dock .dd-all:hover{background:#012e89;color:#fff}
#ops-attention.decision-collapsed:not(.is-open)>:not(h3):not(.decision-toggle){display:none}
#ops-attention .decision-toggle{margin:8px 0 0;padding:7px 12px;border:1px solid #012e89;border-radius:9px;background:#fff;color:#012e89;font:600 13px/1.2 inherit;cursor:pointer}
@media print{#decision-dock{display:none}}`;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const bell = () => {
    const s = document.createElementNS(SVG_NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', 'M4 6h16v10H4zM4 13h5l1 2h4l1-2h5');
    s.append(p); return s;
  };
  const parseFilter = (b) => {
    const m = /^(.*?)\s*·\s*(\d+)\s*$/.exec((b.textContent || '').trim());
    return m ? { label: m[1], count: Number(m[2]), node: b } : null;
  };

  let signature = '';
  let styled = false;

  function ensureStyle() {
    if (styled) return;
    const s = document.createElement('style'); s.id = 'decision-dock-style'; s.textContent = CSS; document.head.append(s); styled = true;
  }

  function openFull(att) {
    att.classList.add('is-open');
    const t = att.querySelector('.decision-toggle'); if (t) t.textContent = 'Fälle ausblenden';
    att.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ensureToggle(att) {
    if (att.dataset.dockInit) return;
    att.dataset.dockInit = '1';
    att.classList.add('decision-collapsed');
    const head = att.querySelector('h3');
    const toggle = el('button', 'decision-toggle', 'Alle Fälle anzeigen');
    toggle.type = 'button';
    toggle.addEventListener('click', () => {
      const open = att.classList.toggle('is-open');
      toggle.textContent = open ? 'Fälle ausblenden' : 'Alle Fälle anzeigen';
    });
    (head || att).after(toggle);
  }

  function sync() {
    const att = document.getElementById('ops-attention');
    const nav = document.getElementById('nav');
    let dock = document.getElementById('decision-dock');
    if (!att || !nav) { if (dock) dock.remove(); signature = ''; return; }
    ensureStyle();
    ensureToggle(att);

    const filters = Array.from(att.querySelectorAll('.decision-filters button')).map(parseFilter).filter(Boolean);
    const all = filters.find((f) => /^alle$/i.test(f.label));
    const total = all ? all.count : 0;
    const cards = Array.from(att.querySelectorAll('.decision-card')).slice(0, 3).map((c) => ({
      title: (c.querySelector('h4') || {}).textContent || 'Fall',
      context: ((c.querySelector('.decision-context') || {}).textContent || '').trim(),
      action: c.querySelector('.decision-action-main') || c.querySelector('.decision-actions button'),
      label: ((c.querySelector('.decision-action-main') || {}).textContent || 'Öffnen').trim()
    }));
    const sig = JSON.stringify([total, filters.map((f) => [f.label, f.count]), cards.map((c) => [c.title, c.context])]);
    if (dock && dock.parentNode === nav && sig === signature) return;
    signature = sig;

    if (!dock) { dock = el('section'); dock.id = 'decision-dock'; dock.setAttribute('aria-label', 'Offene Fälle'); }
    dock.replaceChildren();

    const head = el('button', 'dd-head'); head.type = 'button';
    const icon = el('span', 'dd-icon'); icon.append(bell());
    head.append(icon, el('span', 'dd-title', 'Offene Fälle'), el('span', 'dd-badge' + (total ? '' : ' is-zero'), String(total)));
    head.addEventListener('click', () => openFull(att));
    dock.append(head);

    const chips = filters.filter((f) => f !== all && f.count > 0);
    if (chips.length) {
      const row = el('div', 'dd-chips');
      for (const f of chips) {
        const chip = el('button', 'dd-chip', f.label + ' · ' + f.count); chip.type = 'button';
        chip.addEventListener('click', () => { f.node.click(); openFull(att); });
        row.append(chip);
      }
      dock.append(row);
    }

    if (cards.length) {
      const list = el('ul', 'dd-list');
      for (const c of cards) {
        const li = el('li', 'dd-case');
        li.append(el('strong', '', c.title));
        if (c.context) li.append(el('small', '', c.context));
        if (c.action) {
          const b = el('button', '', c.label || 'Öffnen'); b.type = 'button';
          b.addEventListener('click', () => c.action.click());
          li.append(b);
        }
        list.append(li);
      }
      dock.append(list);
    } else {
      dock.append(el('p', 'dd-empty', 'Keine offenen Fälle.'));
    }

    const allBtn = el('button', 'dd-all', 'Alle anzeigen'); allBtn.type = 'button';
    allBtn.addEventListener('click', () => openFull(att));
    dock.append(allBtn);

    if (dock.parentNode !== nav) nav.append(dock);
  }

  let queued = false;
  const schedule = () => { if (queued) return; queued = true; setTimeout(() => { queued = false; try { sync(); } catch (e) { /* Karte ist optional */ } }, 120); };
  const start = () => {
    schedule();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
