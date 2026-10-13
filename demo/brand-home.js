/* Every LISS mark leads to the internal home, including dynamically opened cards. */
(()=>{'use strict';const home=new URL('LISS-Prozess.html?ansicht=overview',document.currentScript.src).href;
function decorate(){document.querySelectorAll('img').forEach(image=>{
 if(!/^LISS(?:\s|$)/i.test(image.alt||'')&&!/mark-blue\.png(?:$|\?)/.test(image.getAttribute('src')||''))return;
 let link=image.closest('a');if(!link){link=document.createElement('a');image.before(link);link.append(image);}
 if(link.dataset.lissHome==='1')return;
 link.dataset.lissHome='1';link.href=home;link.classList.add('liss-home-mark');link.setAttribute('aria-label','LISS Reinigungsservice · Zur Übersicht');link.removeAttribute('target');
 let caption=Array.from(link.children).find(e=>e!==image&&/^(?:LISS\s+)?REINIGUNGSSERVICE$/i.test(e.textContent.trim()));
 if(!caption){const sibling=link.nextElementSibling;if(sibling&&/^(?:LISS\s+)?REINIGUNGSSERVICE$/i.test(sibling.textContent.trim())){caption=sibling;link.append(caption);}}
 if(!caption){caption=document.createElement('span');link.append(caption);}
 caption.textContent='REINIGUNGSSERVICE';caption.classList.add('liss-home-caption');image.draggable=false;
 });}
decorate();new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
})();
