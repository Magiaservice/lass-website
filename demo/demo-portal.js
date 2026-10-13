(()=>{'use strict';
const KEY='liss-public-demo-session-v1';
const accounts={
 leadership:{username:'demo.leitung',password:'0000',name:'Leitung Demo',role:'owner',start:'LISS-Prozess.html?ansicht=overview'},
 employee:{username:'demo.team',password:'0000',name:'Mitarbeiter Demo',role:'employee',start:'LISS-Prozess.html?ansicht=employee&id=DEMO-MA-1'},
 customer:{username:'demo.kunde',password:'0000',name:'Kunde Demo',role:'customer',start:'LISS-Prozess.html?ansicht=customer&id=DEMO-OBJ-1'}
};
function session(){try{const value=JSON.parse(sessionStorage.getItem(KEY)||'null');return value&&accounts[value.kind]?value:null;}catch(e){return null;}}
const path=decodeURIComponent(location.pathname.split('/').pop()||'');
if(path==='LISS-Zugang.html'||path===''){
 document.querySelectorAll('.demo-login').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const kind=form.dataset.demoRole,account=accounts[kind],username=form.elements.username.value.trim(),password=form.elements.password.value,error=form.querySelector('.login-error');if(!account||username!==account.username||password!==account.password){error.textContent='Benutzername oder Passwort stimmt nicht.';return;}try{if(!localStorage.getItem('liss-process-v1')&&window.LissDemoMode)window.LissDemoMode.start();sessionStorage.setItem(KEY,JSON.stringify({kind,name:account.name,role:account.role,username:account.username,at:Date.now()}));location.assign(account.start);}catch(e){error.textContent='Demo-Sitzung konnte nicht gestartet werden: '+e.message;}}));
 return;
}
if(path.startsWith('LISS-')&&path!=='LISS-Zugang.html'){
 const value=session();if(!value){location.replace('LISS-Zugang.html');return;}
 const params=new URLSearchParams(location.search),allowed=value.kind==='leadership'||(path==='LISS-Prozess.html'&&value.kind==='employee'&&params.get('ansicht')==='employee'&&params.get('id')==='DEMO-MA-1')||(path==='LISS-Prozess.html'&&value.kind==='customer'&&params.get('ansicht')==='customer'&&params.get('id')==='DEMO-OBJ-1');
 if(!allowed){location.replace(value.start);return;}
 window.LissTeamSession={company:'LISS-DEMO',id:value.username,name:value.name,role:value.role,demo:true};
}
window.LissDemoPortal={session,logout(){try{sessionStorage.removeItem(KEY);}catch(e){}location.assign('LISS-Zugang.html');}};
})();
