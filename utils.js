const $ = (s,root=document)=>root.querySelector(s); const $$=(s,root=document)=>[...root.querySelectorAll(s)];
function fmt(n,d=0){ return Number(n||0).toLocaleString('it-IT',{maximumFractionDigits:d,minimumFractionDigits:d}); }
function dayName(date){ return new Date(date+'T12:00:00').toLocaleDateString('it-IT',{weekday:'short'}); }
function prettyDate(date){ return new Date(date+'T12:00:00').toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long',year:'numeric'}); }
function uid(){ return Math.random().toString(36).slice(2)+Date.now().toString(36); }
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
function openModal(html){ $('#modalBody').innerHTML=html; $('#modal').classList.add('show'); $('#modal').setAttribute('aria-hidden','false'); }
function closeModal(){ $('#modal').classList.remove('show'); $('#modal').setAttribute('aria-hidden','true'); }
function mealsFor(date){ return state.meals.filter(m=>m.date===date); }
function sumMacros(items){ return items.reduce((a,x)=>({kcal:a.kcal+(+x.kcal||0),protein:a.protein+(+x.protein||0),carbs:a.carbs+(+x.carbs||0),fat:a.fat+(+x.fat||0)}),{kcal:0,protein:0,carbs:0,fat:0}); }
function profileTargets(){ const p=state.profile; const bmr = p.sex==='female' ? 10*p.currentWeight + 6.25*p.height - 5*p.age - 161 : 10*p.currentWeight + 6.25*p.height - 5*p.age + 5; const multipliers={low:1.35,moderate:1.55,high:1.72}; const workoutBonus=(Number(p.workoutsPerWeek)||0)*35; const maintenance=Math.round(bmr*(multipliers[p.activity]||1.55)+workoutBonus); const target=Math.max(1400, Math.round(maintenance-(Number(p.deficit)||500))); const protein=Math.round((Number(p.proteinPerKg)||1.8)*p.currentWeight); const fat=Math.round((Number(p.fatPerKg)||0.8)*p.currentWeight); const carbs=Math.max(80, Math.round((target - protein*4 - fat*9)/4)); const bmi=p.currentWeight/((p.height/100)**2); return {bmr:Math.round(bmr),maintenance,target,protein,fat,carbs,bmi}; }
function lastNDays(n){ const arr=[]; const d=new Date(); for(let i=n-1;i>=0;i--){ const x=new Date(d); x.setDate(d.getDate()-i); arr.push(dateToISO(x)); } return arr; }
function weekStart(date=new Date()){ const d=new Date(date); const day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); return d; }
function monthDays(baseDate=new Date()){ const base = new Date(baseDate); const y=base.getFullYear(), m=base.getMonth(); const last=new Date(y,m+1,0); const arr=[]; for(let d=1;d<=last.getDate();d++) arr.push(dateToISO(new Date(y,m,d))); return arr; }
function monthKey(date=new Date()){ const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function monthLabel(date=new Date()){ return new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('it-IT',{month:'long',year:'numeric'}); }
function parseMonthKey(key){ const [y,m]=(key||monthKey()).split('-').map(Number); return new Date(y, (m||1)-1, 1); }
function shiftMonth(key,delta){ const d=parseMonthKey(key); d.setMonth(d.getMonth()+delta); return monthKey(d); }
function ringHTML(label,value,target,color){ const p=Math.min(140, target? value/target*100:0); return `<div class="ring-card card"><div class="ring" style="--p:${p};--c:${color}" data-label="${fmt(value)}${label==='kcal'?'':'g'}"></div><strong>${label}</strong><span class="muted">${fmt(p)}% del target</span></div>`; }
function macroLine(name,value,target){ const p=Math.min(120,target?value/target*100:0); return `<div><div style="display:flex;justify-content:space-between"><strong>${name}</strong><span>${fmt(value)} / ${fmt(target)}g</span></div><div class="progress-line"><span style="width:${p}%"></span></div></div>`; }
function setView(view){ state.currentView=view; saveState(); renderAll(); }
