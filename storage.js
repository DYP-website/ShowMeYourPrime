const STORAGE_KEY = 'show_me_your_prime_v1';
const todayISO = () => new Date().toISOString().slice(0,10);
const DEFAULT_STATE = {
  theme:'light', currentView:'dashboard',
  profile:{name:'',sex:'male',age:27,height:175,startWeight:75,currentWeight:75,targetWeight:70,workoutsPerWeek:4,activity:'moderate',goal:'cut',deficit:500,proteinPerKg:1.9,fatPerKg:0.8},
  meals:[], recipes:[], customFoods:[], weights:[], gymPlans:{}, gymDone:{}, createdAt: todayISO()
};
function loadState(){
  try{ const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return structuredClone(DEFAULT_STATE); return {...structuredClone(DEFAULT_STATE),...JSON.parse(raw)}; }
  catch(e){ return structuredClone(DEFAULT_STATE); }
}
let state = loadState();
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); showSaved(); }
function resetState(){ if(confirm('Vuoi cancellare tutti i dati salvati su questo browser?')){ localStorage.removeItem(STORAGE_KEY); state=structuredClone(DEFAULT_STATE); renderAll(); toast('Dati cancellati'); } }
function exportState(){ const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='show-me-your-prime-backup.json'; a.click(); URL.revokeObjectURL(a.href); }
function importState(file){ const reader=new FileReader(); reader.onload=()=>{ try{ state={...structuredClone(DEFAULT_STATE),...JSON.parse(reader.result)}; saveState(); renderAll(); toast('Backup importato'); }catch(e){toast('File non valido')} }; reader.readAsText(file); }
let savedTimer; function showSaved(){ clearTimeout(savedTimer); savedTimer=setTimeout(()=>{},10); }
