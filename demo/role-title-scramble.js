(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const chars='!@#$%&*+-=?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const states=new Map();
function install(card){
  const title=card.querySelector('.role-copy h2');
  if(!title||title.dataset.scrambleReady)return;
  const target=title.textContent.trim();
  if(!['Leitung','Mitarbeiter','Kunden'].includes(target))return;
  title.dataset.scrambleReady='true';
  title.setAttribute('aria-label',target);
  const visual=document.createElement('span');
  visual.className='role-title-scramble';visual.setAttribute('aria-hidden','true');visual.textContent=target;
  title.replaceChildren(visual);
  let timer=0,step=0;
  const restore=()=>{if(timer)clearInterval(timer);timer=0;step=0;visual.textContent=target;};
  const animate=()=>{
    restore();
    if(reduce.matches)return;
    const cycles=2;
    timer=setInterval(()=>{
      step++;
      const settled=Math.floor(step/cycles);
      visual.textContent=Array.from(target).map((char,index)=>char===' '||index<settled?char:chars[Math.floor(Math.random()*chars.length)]).join('');
      if(settled>=target.length)restore();
    },34);
  };
  card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')animate();});
  card.addEventListener('pointerleave',restore);
  card.addEventListener('focusin',animate);
  card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget))restore();});
  card.lissResetTitleScramble=restore;
  states.set(card,restore);
}
function mount(){
  document.querySelectorAll('.role-card').forEach(install);
  for(const [card,restore] of states)if(!card.isConnected){restore();states.delete(card);}
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const restore of states.values())restore();});
reduce.addEventListener?.('change',()=>{for(const restore of states.values())restore();});
mount();new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});
})();
