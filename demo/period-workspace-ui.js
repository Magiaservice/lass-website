(function(root) {
  'use strict';
  const M=()=>root.LissPeriodWorkspace;
  const euro=c=>(c/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  const hours=m=>(m/60).toLocaleString('de-DE',{maximumFractionDigits:2})+' h';
  let chosenMonth=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date()).slice(0,7);
  let filter='all';
  function download(content,name) {
    const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
    a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  function owner() {return !root.LissTeamSession||root.LissTeamSession.role==='owner';}
  function render(host,api) {
    if(!owner())return;
    const n=api.node,b=api.button,box=n('section',undefined,'period-workspace'),controls=n('div',undefined,'row'),month=api.input('month',chosenMonth),content=n('div');
    box.append(n('h2','Monatsübersicht & Abschluss'),n('p','Objekte vergleichen → offene Punkte erledigen → Stunden exportieren → geprüften Stand archivieren.','muted'));
    const prev=b('‹',()=>move(-1)),next=b('›',()=>move(1));prev.setAttribute('aria-label','Vorheriger Monat');next.setAttribute('aria-label','Nächster Monat');
    controls.append(prev,api.label('Monat',month),next);box.append(controls,content);host.append(box);
    function move(delta){const d=new Date(month.value+'-01T12:00:00Z');if(!Number.isFinite(d.getTime()))return;d.setUTCMonth(d.getUTCMonth()+delta);month.value=d.toISOString().slice(0,7);chosenMonth=month.value;update();}
    function openIssue(x){
      if(x.type==='plan'){location.href='LISS-Einsatzplan.html?woche='+encodeURIComponent(x.date);return;}
      if(x.type==='report'){if(x.status==='missing')api.visitDialog(x.visitId);else root.LissOperationsUI.reportReview(x.visitId);}
      else if(x.type==='invoice')root.LissOperationsUI.invoiceDialog(x.invoiceId);
      else if(x.type==='extra'){
        const r=(api.getState().requests||[]).find(r=>r.id===x.requestId);
        if(r?.status==='completed')costDialog(x.objectId);else api.requestDialog(x.requestId);
      }
      else if(x.type==='rate')rateDialog(x);
      else if(x.objectId)root.LissOperationsUI.route(x.objectId);
    }
    function costDialog(oid){const x=M().bounds(month.value);api.dialog('Objektkosten & Extras',d=>root.LissObjectEconomics.render(d,api,{objectId:oid,from:x.from,to:x.to}));}
    function rateDialog(issue){const s=api.getState(),revision=s.revision,w=s.workers.find(w=>w.id===issue.workerId);
      api.dialog('Stundensatz ergänzen · '+(w?.name||issue.workerId),d=>{const form=n('form'),from=api.input('date',issue.date),amount=api.input('text',''),error=n('p','','error'),save=n('button','Speichern','primary');save.type='submit';amount.required=true;from.required=true;amount.inputMode='decimal';form.append(api.label('Gültig ab',from),api.label('Arbeitgeberkosten € / produktive Stunde',amount),n('p','Vollständige eigene Kosten einsetzen. Keine automatische Lohn- oder Abgabenberechnung.','muted'),error,save);
        form.onsubmit=e=>{e.preventDefault();try{if(api.getState().revision!==revision)throw Error('Daten inzwischen geändert. Neu öffnen.');api.commit(root.LissObjectEconomics.saveRate(api.getState(),{workerId:issue.workerId,from:from.value,amount:amount.value}));api.close();}catch(e){error.textContent=e.message;}};d.append(form);});
    }
    function closeDialog(){if(root.LissTeamSync&&(root.LissTeamSync.state().pending||root.LissTeamSync.state().busy||root.LissTeamSync.state().otherPending)){api.notice('Zuerst wartende Team-Änderungen speichern oder vergleichen. Der Monat wird danach auf dem bestätigten Stand geprüft.');root.LissTeamSync.retry();return;}const s=api.getState(),revision=s.revision,x=M().summary(s,month.value);
      if(x.blockers.length){api.notice('Zuerst offene Punkte bearbeiten.');return;}
      api.dialog('Monat prüfen und archivieren · '+x.month,d=>{let queued=false;const form=n('form'),checks={},note=n('textarea'),error=n('p','','error'),save=n('button','Geprüften Stand archivieren','primary');save.type='submit';note.required=true;note.rows=2;
        d.append(n('p','Speichert eine unveränderliche Kopie dieses Stands. Nachträge bleiben möglich und werden als Änderung angezeigt. Kein buchhalterischer Abschluss und keine Lohnzahlung.','muted'));
        for(const [key,label] of [['hoursChecked','Arbeitsberichte und freigegebene Stunden geprüft'],['costsChecked','Material, Fahrten und weitere Kosten vollständig berücksichtigt'],['invoicesChecked','Rechnungszeiträume und Extras geprüft; Hinweise geklärt']]){const c=api.input('checkbox');c.required=true;checks[key]=c;form.append(api.label(label,c));}
        for(const w of x.warnings)form.append(n('p',w.title,'period-warning'));
        form.append(api.label('Abschlussvermerk',note),error,save);
        form.onsubmit=e=>{e.preventDefault();if(save.disabled)return;const finish=()=>{if(api.getState().revision!==revision)throw Error('Daten geändert. Abschluss erneut prüfen; Vermerk bleibt erhalten.');api.commit(M().close(api.getState(),x.month,{...Object.fromEntries(Object.entries(checks).map(([k,c])=>[k,c.checked])),note:note.value}));};if(!root.LissTeamSync){try{finish();api.close();}catch(e){error.textContent=e.message;}return;}save.disabled=true;error.textContent='Team-Speicherung wird geprüft …';(async()=>{try{await root.LissTeamSync.waitForSaved();if(!queued){finish();queued=true;}await root.LissTeamSync.waitForSaved();api.close();}catch(e){error.textContent=e.message;save.disabled=false;}})();};d.append(form);
      });
    }
    function reopenDialog(record){const revision=api.getState().revision;
      api.dialog('Monat wieder öffnen · '+record.month,d=>{const form=n('form'),note=n('textarea'),error=n('p','','error'),save=n('button','Wieder öffnen','primary');save.type='submit';note.required=true;form.append(n('p','Die bisherige Kopie bleibt erhalten. Nach Korrekturen kann eine neue Kopie erstellt werden.'),api.label('Grund',note),error,save);
        form.onsubmit=e=>{e.preventDefault();try{if(api.getState().revision!==revision)throw Error('Daten geändert. Neu öffnen.');api.commit(M().reopen(api.getState(),record.id,note.value));api.close();}catch(e){error.textContent=e.message;}};d.append(form);});
    }
    function history(x){const records=(api.getState().periodClosures||[]).filter(r=>r.month===x.month).slice().reverse();if(!records.length)return;
      const details=n('details',undefined,'period-history');details.append(n('summary','Archivierte Stände · '+records.length));
      records.forEach(r=>{const card=n('article',undefined,'period-history-card'),changed=M().snapshotChanged(api.getState(),r);card.append(n('h3',r.month+' · '+(r.status==='closed'?'Geprüft archiviert':'Wieder geöffnet')),n('p',r.at+' · '+r.note),n('p',changed?'Aktuelle Daten weichen von dieser Kopie ab.':'Aktuelle Daten entsprechen dieser Kopie.',changed?'period-warning':'muted'));
        if(r.recordedBy)card.append(n('small','Archiviert von '+r.recordedBy.name));
        if(r.reopenNote)card.append(n('p','Wieder geöffnet: '+r.reopenNote));
        card.append(b('Archivierte Objektübersicht CSV',()=>download(M().summaryCsv(r.snapshot),'LISS-Abschluss-'+r.month+'.csv')),b('Archivierte Stunden CSV',()=>download(M().payrollCsv(r.snapshot.workers,r.from,r.to),'LISS-Stunden-Archiv-'+r.month+'.csv')));
        if(r.status==='closed')card.append(b('Wieder öffnen',()=>reopenDialog(r)));details.append(card);});content.append(details);
    }
    function update(){content.replaceChildren();chosenMonth=month.value;let x;try{x=M().summary(api.getState(),month.value);}catch(e){content.append(n('p',e.message,'error'));return;}
      const metrics=n('div',undefined,'period-metrics');for(const [label,value] of [['Rechnungen netto',euro(x.totals.net)],['Freigegebene Zeit',hours(x.totals.minutes)],['Bekannte Personalkosten',euro(x.totals.labor)],['Material & weitere Kosten',euro(x.totals.materials+x.totals.overhead)],['Vorläufiger Rest',x.totals.result===null?'Kosten / Berichte offen':euro(x.totals.result)]]){const card=n('div',undefined,'period-metric');card.append(n('span',label),n('strong',value));metrics.append(card);}content.append(metrics,n('p','Rechnungen nach Rechnungsdatum, Stunden nach Einsatztag, Ausgaben nach Kostendatum. Unvollständige Stundenkosten werden nicht als vollständiger Gewinn angezeigt.','muted'));
      const filters=n('div',undefined,'row');for(const [key,label] of [['all','Alle Objekte'],['open','Offene Punkte'],['negative','Negativer Rest']]){const c=b(label,()=>{filter=key;update();},filter===key?'primary':'');c.setAttribute('aria-pressed',String(filter===key));filters.append(c);}content.append(filters);
      const table=n('div',undefined,'period-object-list');const visible=x.rows.filter(r=>filter==='all'||filter==='open'&&r.reasons.length||filter==='negative'&&r.result!==null&&r.result<0);
      for(const r of visible){const card=n('article',undefined,'period-object-card'),copy=n('div'),amount=n('div',undefined,'period-object-result');copy.append(n('h3',r.name),n('small',r.clientName),n('p',hours(r.minutes)+' · Netto '+euro(r.net)+' · '+r.reasons.length+' offene Punkte'));amount.append(n('strong',r.result===null?'Noch unvollständig':euro(r.result)),n('small',r.result===null?hours(r.missingRateMinutes)+' ohne Kostensatz · '+r.unreviewed+' Berichte offen':'Vorläufiger Rest'));const actions=n('div',undefined,'row');actions.append(b('Kosten & Extras',()=>costDialog(r.objectId)),b('Objekt öffnen',()=>root.LissOperationsUI.route(r.objectId)));card.append(copy,amount,actions);table.append(card);}if(!visible.length)table.append(n('p','Keine Objekte in dieser Auswahl.'));content.append(table);
      const tasks=n('details',undefined,'period-checklist');tasks.open=x.blockers.length>0;tasks.append(n('summary','Für den Abschluss offen · '+x.blockers.length));for(const issue of x.blockers){const r=n('div',undefined,'period-task');r.append(n('span',issue.title));if(!['period','empty'].includes(issue.type))r.append(b('Direkt bearbeiten',()=>openIssue(issue)));tasks.append(r);}if(!x.blockers.length)tasks.append(n('p','Erfasste Vorgänge bereit. Vollständigkeit der Kosten und Rechnungen persönlich bestätigen.'));for(const w of x.warnings){const r=n('div',undefined,'period-task period-warning');r.append(n('span',w.title),b('Objekt prüfen',()=>openIssue(w)));tasks.append(r);}content.append(tasks);
      const workers=n('details',undefined,'period-payroll');workers.append(n('summary','Stunden zur Vorbereitung · '+x.workers.length+' Mitarbeiter'));
      for(const w of x.workers){const line=n('article',undefined,'period-worker-row');line.append(b(w.name+' · '+w.personalNumber,()=>api.workerDossier(w.workerId)),n('span',hours(w.minutes)+' freigegeben · '+(w.pending+w.missing+w.returned)+' offen'),n('span',w.missingRateMinutes?'Kostensatz fehlt für '+hours(w.missingRateMinutes):euro(w.costCents)),b('Stunden CSV',()=>download(M().payrollCsv([w],x.from,x.to),'LISS-Stunden-'+x.month+'.csv')));workers.append(line);}workers.append(n('p','Freigegebene Arbeitsberichte und zusätzliche Zeitarten aus dem Zeitkonto. Brutto-Vorbereitung und Kundentarife stehen oben in Finanzen. Diese Stundenliste berechnet keine Netto-Auszahlung.','muted'));content.append(workers);
      const actions=n('div',undefined,'row');actions.append(b('Objektübersicht CSV',()=>download(M().summaryCsv(x),'LISS-Objekte-'+x.month+'.csv')),b('Alle freigegebenen Stunden CSV',()=>download(M().payrollCsv(x.workers,x.from,x.to),'LISS-Stunden-'+x.month+'.csv')));
      const closed=(api.getState().periodClosures||[]).find(r=>r.month===x.month&&r.status==='closed');
      if(!closed){const c=b('Monat prüfen & archivieren',closeDialog,'primary');c.disabled=x.blockers.length>0;actions.append(c);}else{actions.append(n('span',M().snapshotChanged(api.getState(),closed)?'Nachträge seit Archivierung · erneut prüfen':'Geprüfter Stand archiviert','period-status'));}
      content.append(actions);history(x);
    }
    month.onchange=update;update();
  }
  function dashboard(host,api){if(!owner())return;let x;try{x=M().summary(api.getState(),chosenMonth);}catch(e){return;}const n=api.node,box=n('section',undefined,'period-dashboard');box.append(n('h3','Monatsblick · '+x.month),n('p',hours(x.totals.minutes)+' freigegeben · '+x.blockers.length+' Punkte zum Abschluss · Netto '+euro(x.totals.net)),api.button('Objekte, Kosten & Abschluss',()=>api.show('finance'),'primary'));host.append(box);}
  root.LissPeriodWorkspaceUI={render,dashboard};
})(window);
