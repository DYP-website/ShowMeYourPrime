function renderProfile(){
 const p=state.profile,t=profileTargets();
 $('#profile').innerHTML=`
 <div class="grid two">
  <div class="card"><p class="eyebrow">Profilo</p><h2>Imposta i tuoi dati</h2><p class="muted">Da qui vengono calcolati calorie, macro, BMI e deficit.</p>
   <div class="form-grid">
    ${field('Nome','name',p.name,'text')}
    <div class="field"><label>Sesso</label><select id="sex"><option value="male" ${p.sex==='male'?'selected':''}>Uomo</option><option value="female" ${p.sex==='female'?'selected':''}>Donna</option></select></div>
    ${field('Età','age',p.age,'number')}${field('Altezza cm','height',p.height,'number')}
    ${field('Peso partenza kg','startWeight',p.startWeight,'number')}${field('Peso attuale kg','currentWeight',p.currentWeight,'number')}
    ${field('Peso obiettivo kg','targetWeight',p.targetWeight,'number')}${field('Allenamenti/settimana','workoutsPerWeek',p.workoutsPerWeek,'number')}
    <div class="field"><label>Attività</label><select id="activity"><option value="low" ${p.activity==='low'?'selected':''}>Leggera</option><option value="moderate" ${p.activity==='moderate'?'selected':''}>Media</option><option value="high" ${p.activity==='high'?'selected':''}>Alta</option></select></div>
    ${field('Deficit desiderato kcal','deficit',p.deficit,'number')}
    ${field('Proteine g/kg','proteinPerKg',p.proteinPerKg,'number','0.1')}${field('Grassi g/kg','fatPerKg',p.fatPerKg,'number','0.1')}
   </div><br><button class="primary" id="saveProfile">Salva profilo</button>
  </div>
  <div class="grid">
   <div class="card"><p class="eyebrow">Calcolo</p><h2>${t.target} kcal target</h2><p class="muted">Mantenimento stimato: ${t.maintenance} kcal · BMR: ${t.bmr} kcal · BMI: ${fmt(t.bmi,1)}</p></div>
   <div class="metric-row">${ringHTML('kcal',t.target,t.maintenance,'var(--green)')}${ringHTML('proteine',t.protein,t.protein,'var(--violet)')}${ringHTML('carbo',t.carbs,t.carbs,'var(--blue)')}${ringHTML('grassi',t.fat,t.fat,'var(--amber)')}</div>
  </div>
 </div>`;
 $('#saveProfile').onclick=()=>{ ['name','sex','age','height','startWeight','currentWeight','targetWeight','workoutsPerWeek','activity','deficit','proteinPerKg','fatPerKg'].forEach(k=>{ const el=$('#'+k); state.profile[k]=el.type==='number'?Number(el.value):el.value; }); state.weights.push({id:uid(),date:todayISO(),weight:state.profile.currentWeight}); saveState(); renderAll(); toast('Profilo salvato'); };
}
function field(label,id,val,type='text',step='1'){ return `<div class="field"><label>${label}</label><input id="${id}" type="${type}" step="${step}" value="${val??''}"></div>`; }
