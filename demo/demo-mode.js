(function(root){'use strict';
const KEY='liss-process-v1',BACKUP='liss-demo-real-backup-v1',META='liss-demo-mode-v1';
const readMeta=()=>{try{return JSON.parse(localStorage.getItem(META)||'null');}catch(e){return null;}};
function isActive(){return readMeta()?.active===true&&localStorage.getItem(BACKUP)!==null;}
function hasBackup(){return localStorage.getItem(BACKUP)!==null;}
function day(offset){const d=new Date();d.setDate(d.getDate()+offset);return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(d);}
function pick(list){return list[Math.floor(Math.random()*list.length)];}
function name(){return pick(['Anna','Maria','Olga','Lena','Sofia','Mira','Nina','Laura'])+' '+pick(['Berger','Schneider','Keller','Fischer','Hartmann','Neumann','Wagner','Hoffmann']);}
function build(){
  const P=root.LissProcess,K=root.LissKanban,today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date()),followUp=day(3);
  let s=P.empty();
  const workers=[name(),name()];while(workers[1]===workers[0])workers[1]=name();
  workers.forEach((fullName,i)=>{s=P.saveWorker(s,{id:'DEMO-MA-'+(i+1),personalNumber:'D-'+Math.random().toString(36).slice(2,7).toUpperCase(),name:fullName,role:'Reinigungskraft',employment:i?'Teilzeit':'Minijob',entry:day(-90-i*120),availability:'Mo–Fr vormittags',color:i?'#287e85':'#345f9b',demoScenario:true});});
  s=K.update(s,'people','DEMO-MA-1',{stageId:'candidate',owner:'',due:'',note:''});
  const samples=[
    {key:'salon',industry:'salon',client:pick(['Friseuratelier Morgenrot','Salon Haarwerk','Studio Schnittpunkt']),object:'Friseursalon · Verkaufsraum und Sanitär',street:'Beispielweg 12',startStage:'inquiry'},
    {key:'practice',industry:'dentist',client:pick(['Zahnarztpraxis Lindenblick','Praxis am Stadtgarten','Zahnteam Nord']),object:'Praxisräume · Empfang und Behandlungszimmer',street:'Übungsstraße 8',startStage:'decision'},
    {key:'house',industry:'stairs',client:pick(['Hausverwaltung Nordbogen','Wohnanlage Leineblick','Immobilienkontor Mitte']),object:'Wohnhaus · Treppenhaus, 5 Etagen',street:'Musterallee 21',startStage:'inspection'}
  ];
  for(let i=0;i<samples.length;i++){
    const x=samples[i],customerId='DEMO-KD-'+(i+1),objectId='DEMO-OBJ-'+(i+1),days=[1,3,5];
    s=P.saveClient(s,{id:customerId,name:x.client,industry:x.industry,symbol:x.industry,street:x.street,zip:'30159',city:'Hannover',district:'Mitte',status:'Anfrage',contact:'Fiktiver Demo-Kontakt',email:'demo@example.invalid',demoScenario:true});
    s=P.saveObject(s,{id:objectId,customerId,clientName:x.client,name:x.object,street:x.street,zip:'30159',city:'Hannover',district:'Mitte',area:String(90+i*45),contact:'Fiktiver Demo-Kontakt',days,start:'08:00',end:'09:30',travel:30,amount:['185,00','240,00','320,00'][i],demoScenario:true,demoNote:'Fiktive Demo-Daten; nicht versenden oder abrechnen.',tasks:['Abfall leeren','Oberflächen reinigen','Boden reinigen','Abschlusskontrolle'].map(label=>({id:P.id('DEMO-T'),label,days}))});
    s=K.update(s,'deals',objectId,{stageId:x.startStage,owner:'',due:'',note:''});
  }
  const employee=s.workers.find(w=>w.id==='DEMO-MA-1'),assignedObject=s.objects.find(o=>o.id==='DEMO-OBJ-1');
  if(employee&&assignedObject){
    assignedObject.agreed=true;assignedObject.assignedWorkerId=employee.id;
    const addVisit=(date,completed=false)=>s.visits.push({id:'DEMO-E-'+date.replaceAll('-',''),objectId:assignedObject.id,objectRevision:assignedObject.revision||1,workerId:employee.id,date,start:'08:00',end:'09:30',travel:assignedObject.travel||20,tasks:assignedObject.tasks.map(t=>({id:t.id,label:t.label,state:completed?'done':'open',note:'',instruction:t.note||''})),ack:'accepted',keys:true,material:true,problem:'',revision:1,publicationStatus:'published',...(completed?{clock:{start:date+'T08:00:00+02:00',end:date+'T09:30:00+02:00'},report:{start:'08:00',end:'09:30',pause:0,minutes:90,at:date+'T09:35:00+02:00',completedAt:date+'T09:35:00+02:00',summary:'Demo-Arbeitsbericht'}}:{})});
    for(let offset=-14;offset<0;offset++){const date=day(offset),dow=new Date(date+'T12:00:00Z').getUTCDay();if(assignedObject.days.includes(dow)){addVisit(date,true);break;}}
    for(let offset=1;offset<=21;offset++){const date=day(offset),dow=new Date(date+'T12:00:00Z').getUTCDay();if(assignedObject.days.includes(dow))addVisit(date);}
  }
  return {state:s,meta:{active:true,version:1,startedAt:new Date().toISOString(),followUp,workers,employeeId:'DEMO-MA-1',objects:Object.fromEntries(samples.map((x,i)=>[x.key,'DEMO-OBJ-'+(i+1)])),clients:samples.map(x=>x.client)}};
}
function start(){
  if(root.LissTeamSession)throw Error('Demo-Modus nur in der lokalen Einzelplatz-Vorschau starten. Während einer Team-Anmeldung sind gemeinsame Daten aktiv.');
  if(isActive())throw Error('Demo-Modus läuft bereits.');
  if(hasBackup())throw Error('Ein gespeicherter Arbeitsstand wartet auf Wiederherstellung. Stelle ihn zuerst wieder her.');
  const raw=localStorage.getItem(KEY);if(raw)root.LissProcess.valid(JSON.parse(raw));
  const built=build(),backup={raw,createdAt:new Date().toISOString()};
  try{localStorage.setItem(BACKUP,JSON.stringify(backup));localStorage.setItem(KEY,JSON.stringify(built.state));localStorage.setItem(META,JSON.stringify(built.meta));}
  catch(error){try{if(raw===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,raw);}catch(e){}localStorage.removeItem(META);localStorage.removeItem(BACKUP);throw Error('Demo nicht gestartet: Der Arbeitsstand ließ sich nicht sicher aufbewahren. Browser-Speicher prüfen.');}
  return root.LissProcess.valid(built.state);
}
function reset(){if(!isActive())throw Error('Demo-Modus ist nicht aktiv.');const built=build();try{localStorage.setItem(KEY,JSON.stringify(built.state));localStorage.setItem(META,JSON.stringify(built.meta));}catch(e){throw Error('Demo konnte nicht auf den Startzustand zurückgesetzt werden.');}return root.LissProcess.valid(built.state);}
function restore(){if(!hasBackup())throw Error('Kein gespeicherter Arbeitsstand gefunden.');let backup;try{backup=JSON.parse(localStorage.getItem(BACKUP));if(!backup||!(backup.raw===null||typeof backup.raw==='string'))throw Error();if(backup.raw!==null)root.LissProcess.valid(JSON.parse(backup.raw));}catch(e){throw Error('Gesicherter Arbeitsstand ist nicht lesbar. Demo-Daten bleiben unverändert.');}
  try{if(backup.raw===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,backup.raw);localStorage.removeItem(META);localStorage.removeItem(BACKUP);}catch(e){throw Error('Arbeitsstand ließ sich nicht wiederherstellen. Die Demo bleibt aktiv.');}
  const raw=localStorage.getItem(KEY);return raw?root.LissProcess.valid(JSON.parse(raw)):root.LissProcess.empty();
}
function status(s){const m=readMeta();if(!m||!m.active)return {active:false,canRestore:hasBackup()};const ids=m.objects||{},checks=[
  {id:'inspection',title:'Friseursalon zur Besichtigung führen',detail:'Öffne den Auftragsweg und verschiebe den Friseursalon von „Anfrage“ nach „Besichtigung“.',example:m.clients?.[0]||'Friseursalon',objectId:ids.salon,done:!!ids.salon&&Kcard(s,ids.salon).stageId==='inspection'},
  {id:'followup',title:'Wiedervorlage für die Praxis setzen',detail:'Öffne die Zahnarztpraxis-Karte. Trage eine zuständige Person und eine Wiedervorlage für '+m.followUp+' ein.',example:m.clients?.[1]||'Zahnarztpraxis',objectId:ids.practice,done:!!ids.practice&&(()=>{const c=Kcard(s,ids.practice);return !!c.owner&&c.due===m.followUp;})()},
  {id:'offer',title:'Angebot für das Wohnhaus vorbereiten',detail:'Verschiebe das Wohnhaus nach „Angebot“; prüfe dabei, dass der Bedarf besichtigt wurde.',example:m.clients?.[2]||'Wohnhaus',objectId:ids.house,done:!!ids.house&&Kcard(s,ids.house).stageId==='offer'},
  {id:'onboarding',title:'Mitarbeiteraufnahme starten',detail:'Öffne „Team & Einsatz“ → „Einstellung“ und verschiebe die Karte des Mitarbeiters von „Kandidat“ nach „Unterlagen“.',example:m.workers?.[0]||'Mitarbeiter',done:!!m.employeeId&&Kcard(s,m.employeeId,'people').stageId==='documents'}
];return {active:true,canRestore:true,meta:m,tasks:checks,complete:checks.filter(x=>x.done).length};}
function Kcard(s,id,kind='deals'){try{return root.LissKanban.card(s,kind,id);}catch(e){return {stageId:''};}}
function mount(host,a){
  const {node,button}=a,st=status(a.state()),wrap=node('section',undefined,'demo-settings');
  const hero=node('header',undefined,'demo-settings-hero');hero.append(node('span','TRAINING · LOKAL','eyebrow'),node('h2','Demo-Modus'),node('p','Übe typische Situationen mit erfundenen Kunden, Objekten und Mitarbeitern. Deine Arbeitsdaten werden vor dem Start gesichert und beim Beenden zurückgeholt.'));wrap.append(hero);
  if(st.active){
    const meter=node('section',undefined,'demo-progress');meter.append(node('div',undefined,'demo-progress-copy'));const copy=meter.firstChild;copy.append(node('strong','Übungsfortschritt'),node('span',st.complete+' von '+st.tasks.length+' Aufgaben erledigt'));const bar=node('progress');bar.max=st.tasks.length;bar.value=st.complete;bar.setAttribute('aria-label',st.complete+' von '+st.tasks.length+' Aufgaben erledigt');meter.append(bar);wrap.append(meter);
    const list=node('section',undefined,'demo-task-list');list.append(node('h3','Deine Trainingsaufgaben'));for(const [i,t] of st.tasks.entries()){const card=node('article',undefined,'demo-task '+(t.done?'is-done':'')),top=node('div',undefined,'demo-task-heading');top.append(node('span',t.done?'✓':String(i+1),'demo-task-number'),node('div',undefined,'demo-task-copy'));top.lastChild.append(node('h4',t.title),node('p',t.detail),node('small',t.example+' · Fiktiver Beispieldatensatz'));card.append(top,node('span',t.done?'Erledigt':'Offen','demo-task-state'));list.append(card);}wrap.append(list);
    wrap.append(node('p','Die Aufgaben werden anhand der gespeicherten Demo-Daten geprüft. Änderungen bleiben in dieser Demo und werden beim Zurücksetzen gelöscht.','muted'),button('Auftragsweg öffnen',a.openBoard,'primary'),button('Einstellung öffnen',()=>a.openHiring()),button('Demo auf Werkzustand zurücksetzen',()=>{if(confirm('Alle Änderungen in der Demo löschen und Aufgaben neu starten? Der gesicherte Arbeitsstand bleibt erhalten.'))a.onReset();}),button('Demo beenden · Arbeitsstand wiederherstellen',()=>{if(confirm('Demo beenden und den vor dem Start gesicherten Arbeitsstand zurückholen?'))a.onExit();}));
  }else if(st.canRestore){wrap.append(node('p','Ein zuvor gesicherter Arbeitsstand wurde gefunden. Stelle ihn wieder her, bevor du eine neue Demo startest.','demo-warning'),button('Arbeitsstand wiederherstellen',()=>{if(confirm('Gesicherten Arbeitsstand wiederherstellen?'))a.onExit();},'primary'));}
  else{const note=node('section',undefined,'demo-safe-note');note.append(node('h3','Sicherer Übungsbereich'),node('p','Beim Start legt die App eine lokale Sicherung deiner aktuellen Arbeitsdaten an und öffnet eine getrennte Beispieldatenbasis. Demo-Daten werden nicht an Kunden gesendet oder abgerechnet.'));
    const preview=node('ul');['3 fiktive Kundenaufträge in unterschiedlichen Phasen','2 fiktive Mitarbeiter','4 Aufgaben zu Auftragsweg, Wiedervorlage und Einstellung'].forEach(t=>preview.append(node('li',t)));note.append(preview);const startButton=root.LissAmazingButton?root.LissAmazingButton.create({label:'Demo-Modus starten',onClick:a.onStart}):button('Demo-Modus starten',a.onStart,'primary');wrap.append(note,startButton,node('p','Demo ist für lokale Vorschau vorgesehen. Mit aktivem Teamzugang muss sie erst in einer getrennten Sandbox umgesetzt werden.','muted'));}
  host.append(wrap);
}
root.LissDemoMode={isActive,hasBackup,start,reset,restore,status,mount};
})(window);
