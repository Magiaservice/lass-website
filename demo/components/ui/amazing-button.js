(function(root){'use strict';
const CHARS='!@#$%&*+-=?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function create({label='Demo-Modus starten',onClick}={}){
  const button=document.createElement('button');button.type='button';button.className='liss-amazing-button';button.setAttribute('aria-label',label);
  const frame=document.createElement('span');frame.className='liss-amazing-button__frame';
  const lock=document.createElementNS('http://www.w3.org/2000/svg','svg');lock.setAttribute('viewBox','0 0 24 24');lock.setAttribute('aria-hidden','true');lock.classList.add('liss-amazing-button__lock');
  lock.innerHTML='<path d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/><path d="M12 14v3"/>';
  const text=document.createElement('span');text.className='liss-amazing-button__label';text.textContent=label;
  const scan=document.createElement('span');scan.className='liss-amazing-button__scan';scan.setAttribute('aria-hidden','true');frame.append(lock,text,scan);button.append(frame);
  if(typeof onClick==='function')button.addEventListener('click',onClick);
  let timer=0,step=0,active=false;
  const stop=()=>{if(timer)window.clearInterval(timer);timer=0;step=0;text.textContent=label;active=false;};
  const start=()=>{if(active||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;active=true;step=0;timer=window.setInterval(()=>{step++;const settled=Math.floor(step/2);text.textContent=Array.from(label).map((char,index)=>char===' '||index<settled?char:CHARS[Math.floor(Math.random()*CHARS.length)]).join('');if(settled>=label.length)stop();},38);};
  button.addEventListener('pointerenter',start);button.addEventListener('pointerleave',stop);button.addEventListener('focus',start);button.addEventListener('blur',stop);button.addEventListener('click',stop);
  return button;
}
root.LissAmazingButton={create};
})(window);
