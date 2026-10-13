(function(root){'use strict';
const iconPaths={
  overview:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  objects:'M4 21V5l8-3 8 3v16H4z M9 21v-5h6v5 M8 7h1 M15 7h1 M8 11h1 M15 11h1',
  pipeline:'M3 4h5v16H3z M10 4h5v12h-5z M17 4h4v8h-4z',
  appointments:'M4 5h16v16H4z M8 2v6 M16 2v6 M4 10h16 M8 15l3 3 5-5',
  workers:'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M2 21v-2a7 7 0 0 1 14 0v2 M17 4a4 4 0 0 1 0 7 M22 21v-2a7 7 0 0 0-4-6',
  calendar:'M4 5h16v16H4z M8 2v6 M16 2v6 M4 10h16 M8 14h1 M15 14h1 M8 18h1 M15 18h1',
  times:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M12 6v6l4 2',
  inventory:'M3 8l9-5 9 5v10l-9 5-9-5V8z M3 8l9 5 9-5 M12 13v10',
  documents:'M8 2h8l4 4v13H8z M16 2v5h4 M4 6v16h12 M11 10h6 M11 14h6',
  finance:'M5 2h10l4 4v16H5z M15 2v5h4 M14 11a3 3 0 1 0 0 7 M8 13h5 M8 16h4',
  archive:'M3 3h18v5H3z M5 8v13h14V8 M9 12h6 M9 16h6',
  access:'M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M12 3v3 M12 9v3h6 M21 12v3h-3v6 M12 15v6h3 M21 18v3 M4.5 6h3 M16.5 6h3 M4.5 18h3',
  settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.6 2.8-.2-.1a1.7 1.7 0 0 0-1.9.3l-.1.1h-3.2l-.1-.2a1.7 1.7 0 0 0-1.5-1 1.7 1.7 0 0 0-1.5 1l-.1.2H6.4l-.1-.2a1.7 1.7 0 0 0-1.5-1 1.7 1.7 0 0 0-.9.3l-.2.1-1.6-2.8.1-.1a1.7 1.7 0 0 0 .3-1.9l-.1-.2v-3.2l.2-.1a1.7 1.7 0 0 0 1-1.5 1.7 1.7 0 0 0-1-1.5l-.2-.1 1.6-2.8.2.1a1.7 1.7 0 0 0 1.9-.3l.1-.1h3.2l.1.2a1.7 1.7 0 0 0 1.5 1 1.7 1.7 0 0 0 1.5-1l.1-.2h3.2l.1.2a1.7 1.7 0 0 0 1.5 1 1.7 1.7 0 0 0 .9-.3l.2-.1 1.6 2.8-.1.1a1.7 1.7 0 0 0-.3 1.9l.1.2v3.2l-.2.1a1.7 1.7 0 0 0-1 1.5',
  connections:'M8 3v5 M16 3v5 M5 8h14v3a7 7 0 0 1-14 0V8 M12 18v4'
};
const groups=[
  {id:'customers',title:'Kunden & Aufträge',icon:iconPaths.objects,items:[
    ['objects','Kunden & Objekte','LISS-Prozess.html?ansicht=clients'],
    ['pipeline','Auftragsweg','LISS-Prozess.html?ansicht=pipeline','deals'],
    ['appointments','Besichtigungen & Termine','LISS-Prozess.html?ansicht=appointments']
  ]},
  {id:'team',title:'Team',icon:iconPaths.workers,items:[
    ['workers','Mitarbeiter','LISS-Prozess.html?ansicht=workers'],
    ['pipeline','Einstellung','LISS-Prozess.html?ansicht=pipeline&tafel=people','people'],
    ['times','Zeiten · Plan / Ist','LISS-Prozess.html?ansicht=times']
  ]},
  {id:'deployment',title:'Einsatz',icon:iconPaths.calendar,items:[
    ['calendar','Einsatzplanung','LISS-Einsatzplan.html']
  ]},
  {id:'documents',title:'Dokumente & Abrechnung',icon:iconPaths.documents,items:[
    ['documents','Dokumente & Vorlagen','LISS-Prozess.html'],
    ['finance','Finanzen','LISS-Prozess.html?ansicht=finance'],
    ['archive','Berichte & Archiv','LISS-Prozess.html?ansicht=archive']
  ]},
  {id:'admin',title:'Einstellungen & Verwaltung',icon:iconPaths.access,items:[
    ['settings','Demo-Modus','LISS-Prozess.html?ansicht=settings'],
    ['access','Zugänge verwalten','LISS-Zugaenge.html'],
    ['connections','System & Anschlüsse','LISS-Verbindungen.html']
  ]}
];
function icon(path){const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),shape=document.createElementNS(ns,'path');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','workspace-icon');svg.setAttribute('aria-hidden','true');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.7');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');shape.setAttribute('d',path);svg.append(shape);return svg;}
function makeAnchor(id,text,href,active,onSelect,kind){const a=document.createElement('a');a.href=href;a.dataset.area=id;a.dataset.kind=kind||'';a.append(icon(iconPaths[id]||iconPaths.objects));const label=document.createElement('span');label.textContent=text;a.append(label);if(active){a.classList.add('active');a.setAttribute('aria-current','page');}if(onSelect&&!['documents','calendar','access','connections'].includes(id))a.onclick=e=>{e.preventDefault();onSelect(id,kind);};return a;}
function mount(host,active,onSelect,activeKind='deals'){
  host.replaceChildren();host.classList.add('workspace-nav');host.setAttribute('aria-label','Рабочие разделы');
  const session=root.LissTeamSession;
  if(session?.role==='employee'||session?.role==='customer'){
    const employee=session.role==='employee',href=employee?'LISS-Prozess.html?ansicht=employee&id=DEMO-MA-1':'LISS-Prozess.html?ansicht=customer&id=DEMO-OBJ-1';
    host.append(makeAnchor(employee?'workers':'objects',employee?'Mein Arbeitsbereich':'Mein Objekt',href,true));
    const foot=document.createElement('a');foot.href='LISS-Zugang.html';foot.className='workspace-account';foot.textContent='Demo verlassen';foot.addEventListener('click',()=>{try{sessionStorage.removeItem('liss-public-demo-session-v1');}catch(e){}});host.append(foot);return;
  }
  const home=makeAnchor('overview','Dashboard','LISS-Prozess.html?ansicht=overview',active==='overview',onSelect);
  home.classList.add('workspace-nav-home');host.append(home);
  let inventory=false;try{inventory=JSON.parse(localStorage.getItem('liss-process-v1')||'null')?.settings?.inventory===true;}catch(e){}
  for(const group of groups){
    const items=group.id==='team'&&inventory?group.items.concat([['inventory','Einkauf & Material','LISS-Prozess.html?ansicht=inventory']]):group.items;
    const allowedItems=group.id==='admin'&&root.LissTeamSession&&root.LissTeamSession.role!=='owner'?items.filter(item=>item[0]!=='connections'):items;
    if(!allowedItems.length)continue;
    const contains=allowedItems.some(item=>item[0]===active||(active==='pipeline'&&item[0]==='pipeline'&&item[3]===(activeKind||'deals')));
    const details=document.createElement('details');details.className='workspace-nav-group';details.dataset.group=group.id;details.open=contains;details.addEventListener('toggle',()=>{if(details.open)host.querySelectorAll('.workspace-nav-group[open]').forEach(other=>{if(other!==details)other.open=false;});});
    const summary=document.createElement('summary');summary.append(icon(group.icon));const title=document.createElement('span');title.textContent=group.title;summary.append(title);
    const chevron=document.createElement('span');chevron.className='workspace-nav-chevron';chevron.setAttribute('aria-hidden','true');summary.append(chevron);details.append(summary);
    const children=document.createElement('div');children.className='workspace-nav-children';
    for(const [id,text,href,kind] of allowedItems){
      if(id==='inventory'&&!inventory)continue;
      const isActive=id===active&&(!(id==='pipeline')||(!kind||kind===(activeKind||'deals')));
      children.append(makeAnchor(id,text,href,isActive,onSelect,kind));
    }
    details.append(children);host.append(details);
  }
  const foot=document.createElement('a');foot.href='LISS-Zugang.html';foot.className='workspace-account';foot.textContent='Zugang';foot.addEventListener('click',()=>{try{sessionStorage.removeItem('liss-public-demo-session-v1');}catch(e){}});host.append(foot);
}
root.LissNavigation={mount,groups};
})(window);
