/* Ausgang zur Website: kleiner fester Knopf auf jeder Seite des Arbeitsbereichs. */
(()=>{'use strict';
const href=new URL('../index.html',document.currentScript.src).href;
const style=document.createElement('style');
style.textContent='.liss-site-exit{position:fixed;left:12px;bottom:12px;z-index:2147483000;display:inline-flex;align-items:center;gap:6px;padding:10px 14px;border-radius:999px;background:#012E89;color:#fff;font:600 13px/1 -apple-system,system-ui,"Segoe UI",sans-serif;text-decoration:none;box-shadow:0 4px 14px rgba(1,46,137,.35)}.liss-site-exit:hover{background:#0A1F5C}.liss-site-exit:focus-visible{outline:3px solid #7FB2FF;outline-offset:2px}@media print{.liss-site-exit{display:none}}';
document.head.append(style);
const a=document.createElement('a');a.className='liss-site-exit';a.href=href;a.textContent='\u2190 Zur Website';a.setAttribute('aria-label','Zur\u00fcck zur Website');
const add=()=>document.body.append(a);
if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
})();
