/* ============ ICÔNES ============ */
const P={home:"M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",users:"M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8",bars:"M5 20v-8M12 20V4M19 20v-6",seg:"M12 3a9 9 0 1 0 9 9h-9z M15 3.5A9 9 0 0 1 20.5 9H15z",bolt:"M13 2L4 14h7l-1 8 9-12h-7z",file:"M7 3h7l5 5v13H7zM14 3v5h5",set:"M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4",search:"M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M21 21l-4-4",chat:"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12",tag:"M3 12V4h8l10 10-8 8zM7.5 8.5h.01",box:"M4 4h16v16H4zM9 9h6v6H9z",heart:"M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11",chev:"M9 6l6 6-6 6",target:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8",coin:"M12 8c-4.4 0-8-1.3-8-3s3.6-3 8-3 8 1.3 8 3-3.6 3-8 3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",pie:"M12 3a9 9 0 1 0 9 9h-9z",alert:"M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0",up:"M12 19V5M5 12l7-7 7 7",down:"M12 5v14M19 12l-7 7-7-7"};
const ic=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n]||P.box}"/></svg>`;
const $=s=>document.querySelector(s);
const fr=n=>Number(n).toLocaleString("fr-FR");

/* ============ RENDU ============ */
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const charts={};let state=null;
const NAV=[["home","Tableau de bord",1],["users","Clients"],["bars","Prédiction du churn"],["seg","Segmentation"],["bolt","Actions de rétention"],["file","Rapports"],["set","Paramètres"]];
$("#nav").innerHTML=NAV.map(([i,l,on])=>`<a href="#${l}" class="${on?"on":""}">${ic(i)}<span>${l}</span></a>`).join("");
document.querySelectorAll("[data-ic]").forEach(e=>e.innerHTML=ic(e.dataset.ic));
$("#nav").addEventListener("click",e=>{const a=e.target.closest("a");if(!a)return;e.preventDefault();document.querySelectorAll(".menu a").forEach(x=>x.classList.toggle("on",x===a));});

function fmtKpi(k){return k.format==="pct"?k.value.toLocaleString("fr-FR",{minimumFractionDigits:1})+" %":k.format==="eur"?fr(k.value)+" €":fr(k.value);}
function renderKpis(d){
  $("#kpis").innerHTML=d.kpis.map(k=>{const up=k.delta>=0;return `<div class="col-12 col-sm-6 col-xl-3"><div class="panel kpi"><div class="kico">${ic(k.icon)}</div><div><div class="klab">${k.label}</div><div class="kval">${fmtKpi(k)}</div><span class="delta ${k.good?"good":"bad"}">${ic(up?"up":"down").replace('class="i"','class="i" style="width:12px;height:12px"')}${up?"+":"−"}${Math.abs(k.delta)} %</span><small>vs période préc.</small></div></div></div>`}).join("");
}
function renderLists(d){
  const t=d.risk.reduce((s,r)=>s+r.count,0);$("#dTotal").textContent=fr(t);
  const col=x=>x==="bad"?css("--bad"):x==="warn"?css("--warn"):css("--teal");
  $("#legend").innerHTML=d.risk.map(r=>`<li><i style="background:${col(r.tone)}"></i>${r.label}<em>${r.pct.toLocaleString("fr-FR",{minimumFractionDigits:1})} % (${fr(r.count)})</em></li>`).join("");
  $("#drivers").innerHTML=d.drivers.map(x=>`<div class="drv"><span>${x.label}</span><div class="bar"><i data-w="${x.pct*3}"></i></div><b>${x.pct} %</b></div>`).join("");
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll(".bar i").forEach(b=>b.style.width=Math.min(100,b.dataset.w)+"%")));
  $("#actions").innerHTML=d.actions.map(a=>`<div class="act" role="button" tabindex="0"><span class="aico">${ic(a.icon)}</span><div><b>${a.title}</b><small>${a.desc}</small></div>${ic("chev")}</div>`).join("");
  $("#mAcc").textContent=d.model.accuracy+" %";$("#mAuc").textContent=d.model.auc.toLocaleString("fr-FR",{minimumFractionDigits:2});
}
function mk(id,cfg){charts[id]?.destroy();charts[id]=new Chart($("#"+id),cfg);}
function renderCharts(d){
  const teal=css("--teal"),c2=css("--accent2"),muted=css("--muted"),line=css("--line"),panel=css("--panel2"),txt=css("--text");
  Chart.defaults.font.family='Inter,system-ui,sans-serif';Chart.defaults.color=muted;Chart.defaults.font.size=11;
  const tip={backgroundColor:panel,titleColor:txt,bodyColor:txt,borderColor:line,borderWidth:1,padding:10,cornerRadius:8,displayColors:false};
  const scales=()=>({x:{grid:{display:false},border:{display:false}},y:{beginAtZero:true,border:{display:false},grid:{color:line},ticks:{callback:v=>v+" %",maxTicksLimit:5}}});
  const grad=(ctx,h)=>{const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,teal+"55");g.addColorStop(1,teal+"00");return g;};
  mk("cTrend",{type:"line",data:{labels:d.churnTrend.labels,datasets:[{data:d.churnTrend.values,borderColor:teal,borderWidth:2,tension:.35,fill:true,pointRadius:3,pointBackgroundColor:teal,pointHoverRadius:6,
    backgroundColor:c=>c.chart.chartArea?grad(c.chart.ctx,c.chart.chartArea.bottom):teal+"22"}]},
    options:{maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>"Churn : "+c.parsed.y.toLocaleString("fr-FR")+" %"}}},scales:scales()}});
  mk("cRisk",{type:"doughnut",data:{labels:d.risk.map(r=>r.label),datasets:[{data:d.risk.map(r=>r.count),backgroundColor:d.risk.map(r=>r.tone==="bad"?css("--bad"):r.tone==="warn"?css("--warn"):teal),borderColor:css("--panel"),borderWidth:3,spacing:0}]},
    options:{maintainAspectRatio:false,cutout:"72%",plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:c=>`${c.label} : ${fr(c.parsed)}`}}}}});
  mk("cPred",{type:"line",data:{labels:d.predVsActual.labels,datasets:[
    {label:"Prédit",data:d.predVsActual.predicted,borderColor:teal,backgroundColor:c=>c.chart.chartArea?grad(c.chart.ctx,c.chart.chartArea.bottom):teal+"22",fill:true,tension:.35,borderWidth:2,pointRadius:2},
    {label:"Réel",data:d.predVsActual.actual,borderColor:c2,tension:.35,borderWidth:2,pointRadius:2}]},
    options:{maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},plugins:{legend:{display:false},tooltip:{...tip,displayColors:true,callbacks:{label:c=>`${c.dataset.label} : ${c.parsed.y.toLocaleString("fr-FR")} %`}}},scales:scales()}});
}
function render(d){
  state=d;
  const ini=d.user.name.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase();
  $("#uAv").textContent=ini;$("#uName").textContent=d.user.name;$("#uRole").textContent=d.user.role;
  const sel=$("#period");if(!sel.options.length)sel.innerHTML=d.periods.map(p=>`<option value="${p.id}">${p.label}</option>`).join("");
  renderKpis(d);renderLists(d);renderCharts(d);
}
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2600);}
async function load(){
  try{render(await fetchDashboard({period:$("#period").value||undefined,range:$("#range").value}));}
  catch(e){console.error(e);toast("Impossible de charger les données.");}
}
$("#period").addEventListener("change",load);$("#range").addEventListener("change",load);
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>state&&render(state));
load();