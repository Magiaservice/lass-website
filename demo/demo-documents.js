(function(root){'use strict';
const KEY='liss-demo-local-documents-v1',LIMIT=1500000;
function read(){try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');return value&&typeof value==='object'?value:{};}catch(e){return {};}}
function write(value){localStorage.setItem(KEY,JSON.stringify(value));}
function mount(host,{scope,title='Meine Unterlagen',node,button}){
  const panel=node('section',undefined,'demo-document-panel'),head=node('div',undefined,'demo-document-heading');
  head.append(node('div',undefined,'demo-document-copy'));head.firstChild.append(node('h3',title),node('p','Lokale Demo-Ablage · Dateien bleiben in diesem Browser. Keine echten Personal- oder Kundendokumente hochladen.'));
  const picker=node('input');picker.type='file';picker.accept='.pdf,.jpg,.jpeg,.png,.doc,.docx';picker.setAttribute('aria-label','Demo-Datei auswählen');
  const error=node('p','','demo-document-error'),list=node('div',undefined,'demo-document-list');
  function draw(){list.replaceChildren();const items=(read()[scope]||[]).slice().reverse();if(!items.length)list.append(node('p','Noch keine Dateien hinzugefügt.','muted'));items.forEach(item=>{const row=node('div',undefined,'demo-document-row'),info=node('div');info.append(node('strong',item.name),node('small',new Date(item.addedAt).toLocaleString('de-DE')+' · '+Math.ceil(item.size/1024)+' KB'));const actions=node('div',undefined,'row'),download=node('a','Öffnen / laden','demo-document-download');download.href=item.data;download.download=item.name;const remove=button('Entfernen',()=>{const all=read();all[scope]=(all[scope]||[]).filter(x=>x.id!==item.id);write(all);draw();});actions.append(download,remove);row.append(info,actions);list.append(row);});}
  picker.onchange=()=>{const file=picker.files?.[0];if(!file)return;error.textContent='';if(file.size>LIMIT){error.textContent='Demo-Dateien dürfen höchstens 1,5 MB groß sein.';picker.value='';return;}const reader=new FileReader();reader.onload=()=>{try{const all=read(),items=all[scope]||[];items.push({id:'DOC-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),name:file.name,type:file.type||'application/octet-stream',size:file.size,addedAt:new Date().toISOString(),data:String(reader.result)});all[scope]=items;write(all);picker.value='';draw();}catch(e){error.textContent='Datei konnte nicht lokal gespeichert werden. Speicherplatz prüfen.';}};reader.onerror=()=>{error.textContent='Datei konnte nicht gelesen werden.';};reader.readAsDataURL(file);};
  panel.append(head,picker,error,list);host.append(panel);draw();return panel;
}
root.LissDemoDocuments={mount,count(scope){return (read()[scope]||[]).length;},list(scope){return (read()[scope]||[]).map(({id,name,type,size,addedAt,data})=>({id,name,type,size,addedAt,data}));},clear(){try{localStorage.removeItem(KEY);}catch(e){}}};
})(window);
