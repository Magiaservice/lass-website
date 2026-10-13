(function (root) {
  'use strict';
  const P = () => root.LissProcess, O = () => root.LissOperations, E = () => root.LissObjectEconomics;
  const today = () => new Intl.DateTimeFormat('sv-SE', {timeZone:'Europe/Berlin'}).format(new Date());
  function bounds(month) {
    if (!/^\d{4}-\d{2}$/.test(month) || !P().dateOK(month + '-01')) throw Error('Monat wählen');
    const d = new Date(month + '-01T12:00:00Z');
    d.setUTCMonth(d.getUTCMonth() + 1); d.setUTCDate(0);
    return {month, from:month + '-01', to:d.toISOString().slice(0,10)};
  }
  function activeVisits(s, from, to) {
    return P().publishedVisits(s).filter(v => !v.cancelled && !v.supersededBy && v.date >= from && v.date <= to);
  }
  function payroll(s, from, to) {
    if (!P().dateOK(from) || !P().dateOK(to) || from > to) throw Error('Zeitraum prüfen');
    const visits = activeVisits(s,from,to), groups = new Map(), ledger=root.LissSettlement?.lines(s,from,to);
    for (const v of visits) {
      const w = s.workers.find(w => w.id === v.workerId);
      const r = groups.get(v.workerId) || {workerId:v.workerId, name:w?.name || v.workerId,
        personalNumber:w ? P().workerNumber(w) : v.workerId, minutes:0, costCents:0,
        missingRateMinutes:0, pending:0, missing:0, returned:0, approved:0, visits:[]};
      const status = O().reportState(v);
      if (status === 'approved') {
        const rate = E().rateAt(s,v.workerId,v.date);
        r.minutes += v.report.minutes; r.approved++;
        if (rate) r.costCents += ledger?.find(x=>x.visitId===v.id)?.employerCents??Math.floor((v.report.minutes*rate.cents+30)/60);
        else r.missingRateMinutes += v.report.minutes;
        r.visits.push({id:v.id,objectId:v.objectId,objectName:s.objects.find(o=>o.id===v.objectId)?.name || v.objectId,
          date:v.date,start:v.report.start,end:v.report.end,pause:v.report.pause,minutes:v.report.minutes,
          reportVersion:v.report.version||1,...(v.report.endDate&&v.report.endDate!==v.date?{endDate:v.report.endDate}:{}),rateCents:rate?.cents??null,costCents:rate?(ledger?.find(x=>x.visitId===v.id)?.employerCents??Math.floor((v.report.minutes*rate.cents+30)/60)):null});
      } else r[status]++;
      groups.set(v.workerId,r);
    }
    if(root.LissSettlement)for(const x of ledger.filter(x=>x.source==='entry'&&x.status!=='cancelled')){const w=s.workers.find(w=>w.id===x.workerId),r=groups.get(x.workerId)||{workerId:x.workerId,name:w.name,personalNumber:P().workerNumber(w),minutes:0,costCents:0,missingRateMinutes:0,pending:0,missing:0,returned:0,approved:0,visits:[]};if(x.status==='approved'){r.approved++;r.minutes+=x.minutes;r.costCents+=x.employerCents??0;if(x.employerCents===null)r.missingRateMinutes+=x.minutes;r.visits.push({id:x.id,objectId:x.objectId,objectName:s.objects.find(o=>o.id===x.objectId)?.name||'Betrieb · ohne Objekt',date:x.date,start:x.start,end:x.end,endDate:x.endDate,pause:x.pause,minutes:x.minutes,reportVersion:x.version,rateCents:root.LissSettlement.rate(s,x.workerId,x.date)?.cents??E().rateAt(s,x.workerId,x.date)?.cents??null,costCents:x.employerCents,source:'entry',kind:x.kind});}else r[x.status==='returned'?'returned':'pending']++;groups.set(x.workerId,r);}
    return [...groups.values()].sort((a,b)=>a.workerId<b.workerId?-1:a.workerId>b.workerId?1:0);
  }
  function summary(s, month) {
    const {from,to} = bounds(month), visits = activeVisits(s,from,to), rows = [], blockers = [], warnings = [];
    const activityIds = new Set([
      ...visits.map(v=>v.objectId),
      ...(s.timeEntries||[]).filter(t=>t.date>=from&&t.date<=to&&t.status!=='cancelled'&&t.objectId).map(t=>t.objectId),
      ...(s.shiftNeeds||[]).filter(n=>!n.cancelled&&n.date>=from&&n.date<=to).map(n=>n.objectId),
      ...(s.invoices||[]).filter(i=>i.status!=='cancelled'&&i.date>=from&&i.date<=to).map(i=>i.objectId),
      ...(s.stockMoves||[]).filter(m=>m.kind==='consume'&&m.date>=from&&m.date<=to).map(m=>m.objectId),
      ...(s.economyExpenses||[]).filter(e=>e.date>=from&&e.date<=to).map(e=>e.objectId),
      ...(s.requests||[]).filter(r=>r.plannedDate>=from&&r.plannedDate<=to&&!['cancelled','rejected'].includes(r.status)).map(r=>r.objectId)
    ]);
    for (const o of s.objects.filter(o=>activityIds.has(o.id))) {
      const x = E().calculate(s,o.id,from,to,0,0), own = visits.filter(v=>v.objectId===o.id), reasons = [];
      const missingRateMinutes = x.workerRows.reduce((n,r)=>n+r.fallbackMinutes,0);
      for(const need of (s.shiftNeeds||[]).filter(n=>!n.cancelled&&n.objectId===o.id&&n.date>=from&&n.date<=to)) {
        const completed=own.filter(v=>v.needId===need.id&&O().reportState(v)==='approved').length;
        if(completed<need.required)reasons.push({type:'plan',objectId:o.id,needId:need.id,date:need.date,title:'Personalbedarf nicht vollständig nachgewiesen · '+need.date+' · '+completed+' / '+need.required});
      }
      for (const v of own) {
        const status=O().reportState(v);
        if(status!=='approved') reasons.push({type:'report',objectId:o.id,visitId:v.id,status,title:({missing:'Bericht fehlt',pending:'Bericht prüfen',returned:'Korrektur ausstehend'}[status])+' · '+v.date+' · '+(s.workers.find(w=>w.id===v.workerId)?.name||v.workerId)});
        else if (!E().rateAt(s,v.workerId,v.date)) reasons.push({type:'rate',objectId:o.id,workerId:v.workerId,date:v.date,title:'Stundensatz fehlt · '+(s.workers.find(w=>w.id===v.workerId)?.name||v.workerId)+' · '+v.date});
      }
      const drafts=(s.invoices||[]).filter(i=>i.objectId===o.id&&i.status==='draft'&&i.date>=from&&i.date<=to);
      for(const i of drafts) reasons.push({type:'invoice',objectId:o.id,invoiceId:i.id,title:'Rechnungsentwurf noch offen · '+(i.number||i.id)});
      for(const e of x.extras) if(!e.linkedInvoices.some(i=>['issued','disputed'].includes(i.status))) reasons.push({type:'extra',objectId:o.id,requestId:e.id,title:'Erledigtes Extra noch nicht ausgestellt · '+e.label});
      for(const r of (s.requests||[]).filter(r=>r.objectId===o.id&&r.plannedDate>=from&&r.plannedDate<=to&&['accepted','planned'].includes(r.status))) reasons.push({type:'extra',objectId:o.id,requestId:r.id,title:'Vereinbartes Extra noch nicht abgeschlossen · '+r.label});
      // Invoices are grouped by invoice date. A separate warning catches work with no invoice in this view.
      if(x.approved&&!x.invoiceCount&&!drafts.length) warnings.push({type:'revenue',objectId:o.id,title:'Freigegebene Arbeit ohne Rechnung im gewählten Rechnungsdatum-Zeitraum · '+o.name});
      const disputed=(s.invoices||[]).filter(i=>i.objectId===o.id&&i.status==='disputed'&&i.date>=from&&i.date<=to);
      if(disputed.length) warnings.push({type:'dispute',objectId:o.id,title:disputed.length+' strittige Rechnungen · '+o.name});
      rows.push({...x,objectId:o.id,name:o.name,clientName:o.clientName,missingRateMinutes,incomplete:missingRateMinutes>0||x.unreviewed>0,reasons,
        result:missingRateMinutes||x.unreviewed?null:x.result});
      blockers.push(...reasons);
    }
    const settlement=root.LissSettlement&&(s.payRates?.length||s.saleRates?.length||s.timeEntries?.length)?root.LissSettlement.summary(s,from,to):null;
    if(settlement)blockers.push(...settlement.issues);
    else for(const t of s.timeEntries||[])if(t.date>=from&&t.date<=to&&t.status!=='cancelled')blockers.push({type:'additional-time',workerId:t.workerId,title:'Zusätzliche Zeit noch nicht in Finanzabschluss integriert · '+t.date+' · '+t.kind});
    const dedup = list => [...new Map(list.map(x=>[JSON.stringify(x),x])).values()];
    const totals = rows.reduce((n,r)=>({net:n.net+r.net,minutes:n.minutes+r.minutes,labor:n.labor+r.labor,materials:n.materials+r.materials,
      overhead:n.overhead+r.overhead,missingRateMinutes:n.missingRateMinutes+r.missingRateMinutes,unreviewed:n.unreviewed+r.unreviewed}),
      {net:0,minutes:0,labor:0,materials:0,overhead:0,missingRateMinutes:0,unreviewed:0});
    if(settlement){totals.labor+=settlement.companyCost;totals.missingRateMinutes+=settlement.companyMissing;}
    totals.result=settlement?.issues.length||totals.missingRateMinutes||totals.unreviewed?null:totals.net-totals.labor-totals.materials-totals.overhead;
    if(to>=today()) blockers.push({type:'period',title:'Monat noch nicht abgeschlossen · bis '+to});
    if(!rows.length) blockers.push({type:'empty',title:'Keine Vorgänge im gewählten Monat'});
    return {month,from,to,rows,totals,blockers:dedup(blockers),warnings:dedup(warnings),workers:payroll(s,from,to),...(settlement?{settlement}: {})};
  }
  function canonical(value) {
    if(Array.isArray(value)) return value.map(canonical);
    if(value&&typeof value==='object') return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));
    return value;
  }
  // Semantic source, not a whole-state revision: unrelated future shifts do not invalidate a snapshot.
  function source(s,month) {
    if(root.LissPeriodSource)return root.LissPeriodSource.source(s,month);
    const {from,to}=bounds(month), dates=x=>x.date>=from&&x.date<=to;
    const sorted=rows=>rows.slice().sort((a,b)=>String(a.id)<String(b.id)?-1:String(a.id)>String(b.id)?1:0), v=activeVisits(s,from,to);
    const rateIds=new Set(v.filter(v=>v.report&&O().reportState(v)==='approved').map(v=>E().rateAt(s,v.workerId,v.date)?.id).filter(Boolean));
    const invoices=(s.invoices||[]).filter(dates);
    const extraIds=new Set(invoices.flatMap(i=>i.sourceExtraIds||[]));
    const needs=(s.shiftNeeds||[]).filter(n=>!n.cancelled&&dates(n));
    const periodExtras=(s.requests||[]).filter(r=>r.plannedDate>=from&&r.plannedDate<=to||extraIds.has(r.id));
    const objects=new Set([...periodExtras.map(r=>r.objectId),...needs.map(n=>n.objectId),...v.map(v=>v.objectId),...invoices.map(i=>i.objectId),...(s.economyExpenses||[]).filter(dates).map(e=>e.objectId),...(s.stockMoves||[]).filter(m=>m.kind==='consume'&&dates(m)).map(m=>m.objectId)]);
    return canonical({
      needs:sorted(needs),
      visits:sorted(v.map(v=>({id:v.id,workerId:v.workerId,objectId:v.objectId,date:v.date,report:v.report||null,reportReviews:v.reportReviews||[],tasks:v.tasks}))),
      rates:sorted((s.economyRates||[]).filter(r=>rateIds.has(r.id))),
      expenses:sorted((s.economyExpenses||[]).filter(dates)),
      materials:sorted((s.stockMoves||[]).filter(m=>m.kind==='consume'&&dates(m))),
      invoices:sorted(invoices),
      extras:sorted(periodExtras),
      workers:sorted(s.workers.filter(w=>v.some(v=>v.workerId===w.id)).map(w=>({id:w.id,name:w.name,personalNumber:P().workerNumber(w)}))),
      objects:sorted(s.objects.filter(o=>objects.has(o.id)).map(o=>({id:o.id,name:o.name,clientName:o.clientName})))
    });
  }
  function snapshotChanged(s,record) { return JSON.stringify(canonical(record.source))!==JSON.stringify(source(s,record.month)); }
  function close(s,month,value) {
    const x=summary(s,month);
    if(x.blockers.length) throw Error('Zuerst offene Punkte bearbeiten: '+x.blockers[0].title);
    if(!value?.hoursChecked||!value.costsChecked||!value.invoicesChecked||!String(value.note||'').trim()) throw Error('Stunden, Kosten, Rechnungen und Abschlussvermerk prüfen');
    if((s.periodClosures||[]).some(r=>r.month===month&&r.status==='closed')) throw Error('Dieser Monat ist bereits abgeschlossen');
    return P().change(s,'Monat geprüft und Stand archiviert: '+month,'Inhaber',n=>{
      n.periodClosures=[...(n.periodClosures||[]),{id:P().id('CLOSE'),month,from:x.from,to:x.to,status:'closed',
        at:new Date().toISOString(),note:String(value.note).trim(),checks:{hours:true,costs:true,invoices:true},
        source:source(s,month),snapshot:P().copy(x)}];
    });
  }
  function reopen(s,id,note) {
    if(!String(note||'').trim())throw Error('Grund für Wiederöffnung angeben');
    return P().change(s,'Monat wieder geöffnet','Inhaber',n=>{const r=n.periodClosures?.find(r=>r.id===id);
      if(!r||r.status!=='closed')throw Error('Abschluss nicht offen');r.status='reopened';r.reopenedAt=new Date().toISOString();r.reopenNote=String(note).trim();});
  }
  function validate(s) {
    const rows=s.periodClosures||[],closed=new Set();
    if(!Array.isArray(rows)||new Set(rows.map(r=>r.id)).size!==rows.length)throw Error('Abschlussliste prüfen');
    for(const r of rows) {
      const b=bounds(r.month);
      if(!r.id||!r.at||!r.note||r.from!==b.from||r.to!==b.to||!['closed','reopened'].includes(r.status)||
        !r.source||!r.snapshot||r.snapshot.month!==r.month||r.snapshot.from!==r.from||r.snapshot.to!==r.to||
        r.checks?.hours!==true||r.checks.costs!==true||r.checks.invoices!==true||r.status==='reopened'&&(!r.reopenNote||!r.reopenedAt))throw Error('Abschlussdaten prüfen');
      const snap=r.snapshot;
      if(!Array.isArray(snap.rows)||!Array.isArray(snap.workers)||!Array.isArray(snap.blockers)||!Array.isArray(snap.warnings)||!snap.totals)throw Error('Abschlusskopie unvollständig');
      for(const key of ['net','minutes','labor','materials','overhead','missingRateMinutes','unreviewed'])if(!Number.isSafeInteger(snap.totals[key])||snap.totals[key]<0)throw Error('Abschlusszahlen prüfen');
      if(snap.totals.result!==null&&!Number.isSafeInteger(snap.totals.result))throw Error('Abschlussergebnis prüfen');
      for(const w of snap.workers)if(!w.workerId||!w.name||!Array.isArray(w.visits)||!Number.isSafeInteger(w.minutes)||w.minutes<0)throw Error('Archivierte Stunden prüfen');
      if(r.status==='closed'){if(closed.has(r.month))throw Error('Monat mehrfach abgeschlossen');closed.add(r.month);}
    }
  }
  function cell(v) { return '"'+String(v??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"'; }
  function csvRows(rows) {return '\ufeff'+rows.map(row=>row.map(cell).join(';')).join('\r\n');}
  function payrollCsv(rows,from,to) {
    return csvRows([['Von','Bis','Personalnummer','Name','Objekt','Datum','Beginn','Ende','Pause Minuten','Arbeitsminuten','Berichtsversion','Arbeitgeberkosten EUR','Quelle','Zeitart','Enddatum'],
      ...rows.flatMap(w=>w.visits.map(v=>[from,to,w.personalNumber,w.name,v.objectName,v.date,v.start,v.end,v.pause,v.minutes,v.reportVersion,v.costCents===null?'':(v.costCents/100).toFixed(2),v.source||'visit',v.kind||'work',v.endDate||v.date]))]);
  }
  function summaryCsv(x) {
    return csvRows([['Monat','Objekt','Kunde','Rechnungen netto EUR','Freigegebene Minuten','Bekannte Personalkosten EUR','Verbrauch EUR','Weitere Kosten EUR','Restbetrag EUR','Offene Berichte','Minuten ohne Satz'],
      ...x.rows.map(r=>[x.month,r.name,r.clientName,(r.net/100).toFixed(2),r.minutes,(r.labor/100).toFixed(2),(r.materials/100).toFixed(2),(r.overhead/100).toFixed(2),r.result===null?'':(r.result/100).toFixed(2),r.unreviewed,r.missingRateMinutes])]);
  }
  root.LissPeriodWorkspace={bounds,summary,payroll,source,snapshotChanged,close,reopen,validate,payrollCsv,summaryCsv};
})(typeof window==='undefined'?globalThis:window);
