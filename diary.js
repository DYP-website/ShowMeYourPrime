function renderDiary(){
 const d=state.selectedDate||todayISO(); const meals=mealsFor(d), s=sumMacros(meals), t=profileTargets();
 $('#diary').innerHTML=`<div class="grid two"><div class="card"><p class="eyebrow">Diario</p><h2>${prettyDate(d)}</h2><p class="muted">Aggiungi un pasto dal ricettario oppure inserisci un pasto libero con i macro già pronti.</p><div class="form-grid"><div class="field"><label>Giorno</label><input type="date" id="diaryDate" value="${d}"></div><div class="field"><label>&nbsp;</label><button class="primary" data-action="quickMeal">+ Aggiungi pasto</button></div></div></div><div class="metric-row">${ringHTML('kcal',s.kcal,t.target,'var(--green)')}${ringHTML('proteine',s.protein,t.protein,'var(--violet)')}${ringHTML('carbo',s.carbs,t.carbs,'var(--blue)')}${ringHTML('grassi',s.fat,t.fat,'var(--amber)')}</div></div><br><div class="card"><h2>Pasti</h2><div class="list">${meals.length?meals.map(mealItem).join(''):'<p class="muted">Nessun pasto per questo giorno.</p>'}</div></div>`;
 $('#diaryDate').onchange=e=>{state.selectedDate=e.target.value;saveState();renderDiary();};
}

function quickMealModal(){
 const dateValue = state.selectedDate || todayISO();
 const recipeOptions = state.recipes.length
  ? state.recipes.map(r=>`<option value="${r.id}">${r.name}</option>`).join('')
  : '<option value="">Nessuna ricetta salvata</option>';
 openModal(`
  <h2>Aggiungi pasto</h2>
  <p class="hint">Scegli una ricetta salvata oppure inserisci un pasto libero. I dati vengono salvati automaticamente.</p>
  <div class="meal-choice">
    <button class="meal-choice-card active" id="chooseRecipe" type="button">
      <span>Dal ricettario</span><small>Selezioni un piatto e l'app compila i macro</small>
    </button>
    <button class="meal-choice-card" id="chooseFree" type="button">
      <span>Pasto libero</span><small>Inserisci calorie, proteine, carbo e grassi</small>
    </button>
  </div>

  <div id="recipeMealPanel" class="meal-panel">
    <div class="form-grid">
      <div class="field"><label>Data</label><input id="recipeMealDate" type="date" value="${dateValue}"></div>
      <div class="field"><label>Tipo pasto</label><select id="recipeMealType"><option>Pranzo</option><option>Cena</option><option>Spuntino</option><option>Altro</option></select></div>
      <div class="field"><label>Ricetta</label><select id="recipeSelect">${recipeOptions}</select></div>
      <div class="field"><label>Porzione</label><select id="recipePortion"><option value="1">Dose completa</option><option value="0.75">3/4 dose</option><option value="0.5">Mezza dose</option><option value="1.5">Dose e mezza</option><option value="2">Doppia dose</option></select></div>
    </div>
    <div id="recipePreview" class="macro-preview"></div>
    <button class="primary wide" id="addRecipeMealBtn">Aggiungi dal ricettario</button>
  </div>

  <div id="freeMealPanel" class="meal-panel hidden">
    <div class="form-grid">
      <div class="field"><label>Data</label><input id="freeMealDate" type="date" value="${dateValue}"></div>
      <div class="field"><label>Tipo pasto</label><select id="freeMealType"><option>Pranzo</option><option>Cena</option><option>Spuntino</option><option>Altro</option></select></div>
      <div class="field"><label>Nome pasto</label><input id="freeMealName" placeholder="Es. Focaccia stracchino"></div>
      <div class="field"><label>Calorie</label><input id="freeMealKcal" inputmode="decimal" type="number" placeholder="1260"></div>
      <div class="field"><label>Proteine (g)</label><input id="freeMealProtein" inputmode="decimal" type="number" placeholder="84"></div>
      <div class="field"><label>Carboidrati (g)</label><input id="freeMealCarbs" inputmode="decimal" type="number" placeholder="131"></div>
      <div class="field"><label>Grassi (g)</label><input id="freeMealFat" inputmode="decimal" type="number" placeholder="45"></div>
    </div>
    <button class="primary wide" id="addFreeMealBtn">Aggiungi pasto libero</button>
  </div>
 `);

 const setMode=(mode)=>{
  const recipe=mode==='recipe';
  $('#chooseRecipe').classList.toggle('active',recipe); $('#chooseFree').classList.toggle('active',!recipe);
  $('#recipeMealPanel').classList.toggle('hidden',!recipe); $('#freeMealPanel').classList.toggle('hidden',recipe);
 };
 $('#chooseRecipe').onclick=()=>setMode('recipe');
 $('#chooseFree').onclick=()=>setMode('free');

 const updatePreview=()=>{
  const id=$('#recipeSelect')?.value; const portion=Number($('#recipePortion')?.value||1); const r=state.recipes.find(x=>x.id===id);
  if(!r){ $('#recipePreview').innerHTML='<p class="muted">Non hai ancora ricette salvate. Vai nel Ricettario e crea la prima.</p>'; return; }
  const base=sumMacros(r.ingredients||[]); const scaled={kcal:base.kcal*portion,protein:base.protein*portion,carbs:base.carbs*portion,fat:base.fat*portion};
  $('#recipePreview').innerHTML=`<div class="preview-grid"><div><strong>${fmt(scaled.kcal)}</strong><span>kcal</span></div><div><strong>${fmt(scaled.protein)}</strong><span>proteine</span></div><div><strong>${fmt(scaled.carbs)}</strong><span>carbo</span></div><div><strong>${fmt(scaled.fat)}</strong><span>grassi</span></div></div>`;
 };
 $('#recipeSelect')?.addEventListener('change',updatePreview); $('#recipePortion')?.addEventListener('change',updatePreview); updatePreview();

 $('#addRecipeMealBtn').onclick=()=>{
  const id=$('#recipeSelect').value; const r=state.recipes.find(x=>x.id===id); if(!r){toast('Prima salva una ricetta');return;}
  const portion=Number($('#recipePortion').value||1); const base=sumMacros(r.ingredients||[]);
  const label = portion===1 ? r.name : `${r.name} · ${Math.round(portion*100)}%`;
  state.meals.push({id:uid(),date:$('#recipeMealDate').value,type:$('#recipeMealType').value,name:label,kcal:base.kcal*portion,protein:base.protein*portion,carbs:base.carbs*portion,fat:base.fat*portion});
  saveState(); closeModal(); renderAll(); toast('Pasto aggiunto');
 };
 $('#addFreeMealBtn').onclick=()=>{
  const name=$('#freeMealName').value.trim(); if(!name){toast('Dai un nome al pasto');return;}
  state.meals.push({id:uid(),date:$('#freeMealDate').value,type:$('#freeMealType').value,name,kcal:Number($('#freeMealKcal').value)||0,protein:Number($('#freeMealProtein').value)||0,carbs:Number($('#freeMealCarbs').value)||0,fat:Number($('#freeMealFat').value)||0});
  saveState(); closeModal(); renderAll(); toast('Pasto aggiunto');
 };
}
