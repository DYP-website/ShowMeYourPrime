function renderDashboard(){
 const date=todayISO(), meals=mealsFor(date), s=sumMacros(meals), t=profileTargets();
 const week=lastNDays(7).map(d=>({label:dayName(d),value:sumMacros(mealsFor(d)).kcal}));
 $('#dashboard').innerHTML=`
 <div class="hero">
  <div class="card"><p class="eyebrow">Daily dashboard</p><h2 class="hero-title">La tua giornata, in ordine.</h2><p class="muted">Calorie, macro, peso, ricette e palestra sempre salvati nel browser.</p></div>
  <div class="metric-row">${ringHTML('kcal',s.kcal,t.target,'var(--green)')}${ringHTML('proteine',s.protein,t.protein,'var(--violet)')}${ringHTML('carbo',s.carbs,t.carbs,'var(--blue)')}${ringHTML('grassi',s.fat,t.fat,'var(--amber)')}</div>
 </div><br>
 <div class="grid two">
  <div class="card"><h2>Macro di oggi</h2>${macroLine('Proteine',s.protein,t.protein)}<br>${macroLine('Carboidrati',s.carbs,t.carbs)}<br>${macroLine('Grassi',s.fat,t.fat)}</div>
  <div class="card"><h2>Ultimi 7 giorni</h2>${barChart(week,'value',Math.max(t.target,...week.map(x=>x.value)))}</div>
 </div><br>
 <div class="grid two"><div class="card"><h2>Pasti di oggi</h2><div class="list">${meals.length?meals.map(mealItem).join(''):'<p class="muted">Nessun pasto inserito oggi.</p>'}</div></div><div class="card"><h2>Azioni rapide</h2><div class="grid"><button class="primary" data-action="quickMeal">Aggiungi pasto manuale</button><button class="ghost" onclick="setView('recipes')">Vai al ricettario</button><button class="ghost" onclick="setView('profile')">Aggiorna profilo</button></div></div></div>`;
}
function mealItem(m){return `<div class="item"><div><strong>${m.name}</strong><div class="muted">${m.type||'pasto'} · ${fmt(m.kcal)} kcal · P ${fmt(m.protein)} C ${fmt(m.carbs)} G ${fmt(m.fat)}</div></div><button class="ghost small" onclick="deleteMeal('${m.id}')">Elimina</button></div>`}
function deleteMeal(id){ state.meals=state.meals.filter(m=>m.id!==id); saveState(); renderAll(); toast('Pasto eliminato'); }
