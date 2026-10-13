(()=>{'use strict';const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');const field=document.createElement('div');field.id='liss-bubble-field';field.setAttribute('aria-hidden','true');const specs=[
{size:248,x:6,y:14,depth:.8,delay:-6,duration:20},
{size:116,x:21,y:70,depth:.62,delay:-11,duration:16},
{size:292,x:81,y:13,depth:.42,delay:-2,duration:24},
{size:172,x:95,y:48,depth:.75,delay:-14,duration:18},
{size:226,x:65,y:83,depth:.54,delay:-9,duration:22},
{size:92,x:43,y:31,depth:1,delay:-4,duration:14},
{size:188,x:15,y:91,depth:.47,delay:-17,duration:25},
{size:138,x:55,y:9,depth:.88,delay:-8,duration:17},
{size:264,x:39,y:96,depth:.38,delay:-19,duration:27}
];const bubbles=[];for(const item of specs){const bubble=document.createElement('span'),sphere=document.createElement('i');bubble.className='liss-glass-bubble';bubble.setAttribute('aria-hidden','true');bubble.style.setProperty('--size',item.size+'px');bubble.style.left=item.x+'%';bubble.style.top=item.y+'%';bubble.style.setProperty('--depth',item.depth);sphere.style.setProperty('--duration',item.duration+'s');sphere.style.setProperty('--delay',item.delay+'s');bubble.append(sphere);field.append(bubble);bubbles.push({el:bubble,depth:item.depth});}document.body.prepend(field);let px=0,py=0,sy=window.scrollY||0,frame=0;function paint(){frame=0;const sx=Math.max(-1,Math.min(1,px)),syNorm=Math.max(-1,Math.min(1,py));for(const b of bubbles){const d=b.depth,dx=sx*30*d,dy=syNorm*22*d-Math.max(-85,Math.min(85,(window.scrollY-sy)*.045*d));b.el.style.transform=`translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)`;}}function schedule(){if(!reduced.matches&&!frame)frame=requestAnimationFrame(paint);}window.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;px=(e.clientX/Math.max(1,innerWidth)-.5)*2;py=(e.clientY/Math.max(1,innerHeight)-.5)*2;schedule();},{passive:true});window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduced.addEventListener?.('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;for(const b of bubbles)b.el.style.transform='none';}else schedule();});})();
