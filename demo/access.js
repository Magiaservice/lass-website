(()=>{'use strict';
const track=document.getElementById('roles');
const cards=[...track.querySelectorAll('.role-card')];
const dots=[...document.querySelectorAll('#dots button')];
const labels=['Leitung','Mitarbeiter','Kunden'];
let active=0,frame=0;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function update(index){active=Math.max(0,Math.min(cards.length-1,index));const card=cards[active];track.scrollTo({left:card.offsetLeft-parseFloat(getComputedStyle(track).paddingLeft),behavior:reduced()?'auto':'smooth'});document.getElementById('position').textContent=labels[active]+' · '+(active+1)+' / '+cards.length;dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));document.getElementById('previous').disabled=active===0;document.getElementById('next').disabled=active===cards.length-1;}
document.getElementById('previous').addEventListener('click',()=>update(active-1));
document.getElementById('next').addEventListener('click',()=>update(active+1));
dots.forEach((dot,index)=>dot.addEventListener('click',()=>update(index)));
track.addEventListener('scroll',()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const left=track.scrollLeft+parseFloat(getComputedStyle(track).paddingLeft);let best=0,distance=Infinity;cards.forEach((card,index)=>{const delta=Math.abs(card.offsetLeft-left);if(delta<distance){distance=delta;best=index;}});active=best;document.getElementById('position').textContent=labels[best]+' · '+(best+1)+' / '+cards.length;dots.forEach((dot,index)=>dot.setAttribute('aria-current',String(index===best)));document.getElementById('previous').disabled=best===0;document.getElementById('next').disabled=best===cards.length-1;});},{passive:true});
track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();update(active+(event.key==='ArrowRight'?1:-1));}});
window.addEventListener('resize',()=>update(active));
})();
