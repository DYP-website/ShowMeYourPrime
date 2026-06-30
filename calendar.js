function renderCalendar(){
 const currentMonth = state.calendarMonth || monthKey(new Date());
 state.calendarMonth = currentMonth;
 const baseDate = parseMonthKey(currentMonth);
 const days = monthDays(baseDate);
 const label = monthLabel(baseDate);
 const monthGymPlans = days.filter(d=>state.gymPlans[d]).length;
 const monthGymDone = days.filter(d=>state.gymDone[d]).length;
 const monthKcal = days.reduce((tot,d)=>tot+sumMacros(mealsFor(d)).kcal,0);

 $('#calendar').innerHTML = `
  <div class="card calendar-head">
   <div>
    <p class="eyebrow">Calendario</p>
    <h2>${label}</h2>
    <p class="muted">Cambia mese, programma la palestra e apri un giorno per vedere pasti, calorie, macro e deficit.</p>
   </div>
   <div class="calendar-actions">
    <button class="ghost" id="prevMonth">‹ Mese prima</button>
    <button class="ghost" id="goToday">Oggi</button>
    <button class="ghost" id="nextMonth">Mese dopo ›</button>
   </div>
  </div>
  <div class="calendar-summary">
   <div class="mini-card"><span class="muted">Palestra programmata</span><strong>${monthGymPlans}</strong></div>
   <div class="mini-card"><span class="muted">Palestra fatta</span><strong>${monthGymDone}</strong></div>
   <div class="mini-card"><span class="muted">Calorie registrate</span><strong>${fmt(monthKcal)}</strong></div>
  </div>
  <div class="weekday-grid">
   ${['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(x=>`<span>${x}</span>`).join('')}
  </div>
  <div class="calendar-grid month-view">${calendarCells(days, baseDate)}</div>`;

 $('#prevMonth').onclick = () => { state.calendarMonth = shiftMonth(state.calendarMonth, -1); saveState(); renderAll(); };
 $('#nextMonth').onclick = () => { state.calendarMonth = shiftMonth(state.calendarMonth, 1); saveState(); renderAll(); };
 $('#goToday').onclick = () => { state.calendarMonth = monthKey(new Date()); saveState(); renderAll(); };
 $$('.day').forEach(el=>el.onclick=()=>dayModal(el.dataset.date));
}

function calendarCells(days, baseDate){
 const firstDay = (new Date(baseDate.getFullYear(), baseDate.getMonth(), 1).getDay()+6)%7;
 const blanks = Array.from({length:firstDay},()=>'<div class="day empty"></div>').join('');
 return blanks + days.map(dayCard).join('');
}

function dayCard(d){
 const s=sumMacros(mealsFor(d));
 const has=s.kcal>0, plan=state.gymPlans[d], done=state.gymDone[d], weight=state.weights.find(w=>w.date===d);
 return `<div class="day ${d===todayISO()?'today':''}" data-date="${d}">
  <strong>${new Date(d+'T12:00').getDate()}</strong>
  <div class="muted">${dayName(d)}</div>
  <div class="muted">${fmt(s.kcal)} kcal</div>
  ${weight?`<div class="muted">${fmt(weight.weight,1)} kg</div>`:''}
  <div class="dots">
   ${has?'<span class="dot" title="Pasti registrati"></span>':''}
   ${plan?'<span class="dot gym" title="Palestra programmata"></span>':''}
   ${done?'<span class="dot done" title="Palestra fatta"></span>':''}
  </div>
 </div>`;
}

function dayModal(d){
 const meals=mealsFor(d), s=sumMacros(meals), t=profileTargets(), deficit=t.maintenance-s.kcal;
 const weight=state.weights.find(w=>w.date===d);
 openModal(`<h2>${prettyDate(d)}</h2>
  <div class="metric-row">${ringHTML('kcal',s.kcal,t.target,'var(--green)')}${ringHTML('proteine',s.protein,t.protein,'var(--violet)')}</div>
  <div class="mini-card"><span class="muted">Deficit stimato</span><strong>${fmt(deficit)} kcal</strong></div>
  <div class="mini-card"><span class="muted">Peso registrato</span><strong>${weight?fmt(weight.weight,1)+' kg':'—'}</strong></div>
  <div class="tabs"><button class="ghost" id="togglePlan">${state.gymPlans[d]?'Rimuovi palestra programmata':'Programma palestra'}</button><button class="ghost" id="toggleDone">${state.gymDone[d]?'Segna non fatta':'Segna palestra fatta'}</button><button class="primary" data-action="quickMeal">+ Pasto</button></div>
  <h3>Pasti</h3><div class="list">${meals.length?meals.map(mealItem).join(''):'<p class="muted">Nessun pasto.</p>'}</div>`);
 $('#togglePlan').onclick=()=>{state.gymPlans[d]=!state.gymPlans[d];saveState();closeModal();renderAll();};
 $('#toggleDone').onclick=()=>{state.gymDone[d]=!state.gymDone[d];saveState();closeModal();renderAll();};
}
