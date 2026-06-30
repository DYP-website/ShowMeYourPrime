const NAV = [
 ['dashboard','Dashboard'],['profile','Profilo'],['diary','Diario'],['recipes','Ricettario'],['calendar','Calendario'],['progress','Progressi'],['settings','Impostazioni']
];
function renderNav(){ $('#nav').innerHTML=NAV.map(([id,label])=>`<button class="${state.currentView===id?'active':''}" onclick="setView('${id}')">${label}</button>`).join(''); }
function renderAll(){
 document.documentElement.dataset.theme=state.theme;
 $('#dateLine').textContent=prettyDate(todayISO());
 const title = NAV.find(x=>x[0]===state.currentView)?.[1] || 'Dashboard'; $('#pageTitle').textContent=title;
 renderNav();
 $$('.view').forEach(v=>v.classList.toggle('active',v.id===state.currentView));
 renderDashboard(); renderProfile(); renderDiary(); renderRecipes(); renderCalendar(); renderProgress(); renderSettings();
 $$('.view').forEach(v=>v.classList.toggle('active',v.id===state.currentView));
 $('#sidebar').classList.remove('open');
}
document.addEventListener('click',e=>{ const a=e.target.closest('[data-action]'); if(!a) return; if(a.dataset.action==='quickMeal') quickMealModal(); });
$('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
$('#themeBtn').onclick=()=>{state.theme=state.theme==='light'?'dark':'light';saveState();renderAll();};
$('#modalClose').onclick=closeModal; $('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
$('#exportBtn').onclick=exportState; $('#importFile').onchange=e=>importState(e.target.files[0]);
renderAll();
