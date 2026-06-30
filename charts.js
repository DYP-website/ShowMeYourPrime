function barChart(data, key='value', max=null){
  const m=max || Math.max(1,...data.map(d=>d[key]||0));
  return `<div class="chart">${data.map(d=>`<div class="bar-wrap"><div class="bar"><span style="height:${Math.min(100,(d[key]||0)/m*100)}%"></span></div><b>${d.label}</b><span>${fmt(d[key]||0)}</span></div>`).join('')}</div>`;
}
function lineChart(points){
  const w=640,h=220,p=22; const vals=points.map(x=>x.value).filter(v=>v!==null && v!==undefined); const min=Math.min(...vals,0), max=Math.max(...vals,1); const range=max-min || 1;
  const coords=points.map((pt,i)=>{ const x=p+i*((w-p*2)/Math.max(1,points.length-1)); const y=h-p-(((pt.value??min)-min)/range)*(h-p*2); return {x,y,...pt}; });
  const d=coords.map((c,i)=>`${i?'L':'M'}${c.x},${c.y}`).join(' ');
  return `<svg class="line-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/><defs><linearGradient id="g"><stop offset="0" stop-color="#6ee7b7"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>${coords.map(c=>`<circle cx="${c.x}" cy="${c.y}" r="5" fill="#8b5cf6"/>`).join('')}</svg>`;
}
