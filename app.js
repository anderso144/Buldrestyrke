// Programdata (innebygd for offline)
const program = {
  A: [
    {cat:"Oppvarming", navn:"5 min roing/sykkel + mobilitet + scapula pull-ups", dose:"—", note:"Håndleddssirkler, thorakal mobilitet"},
    {cat:"Grepsstyrke", navn:"Dead Hang (pull-up-stang)", dose:"3 x 20–40 s", note:"Aktiv skulder, full hang"},
    {cat:"Grepsstyrke", navn:"Farmer’s Carry (tunge manualer)", dose:"3 x 30–40 m", note:"Nøytral kjerne, rolige steg"},
    {cat:"Trekkstyrke", navn:"Pull-Ups (evt. assistert)", dose:"3–4 x 6–10", note:"2 s eksentrisk"},
    {cat:"Trekkstyrke", navn:"Stangroing (Barbell Row)", dose:"3 x 8–10", note:"Nøytral rygg"},
    {cat:"Bakside/Skuldre", navn:"Face Pull (kabel)", dose:"3 x 12–15", note:"Albuer høye, squeeze"},
    {cat:"Kjerne", navn:"Hanging Leg Raise/Knee Raise", dose:"3 x 8–12", note:"Posterior tilt, kontroll"},
    {cat:"Ben", navn:"Front Squat / Goblet Squat", dose:"3 x 6–10", note:"Dypde, knær sporer tær"}
  ],
  B: [
    {cat:"Oppvarming", navn:"5 min roing/sykkel + mobilitet + skulderpriming", dose:"—", note:"Håndledd, skulderrotasjoner"},
    {cat:"Grepsstyrke", navn:"Plate Pinch Hold (2 skiver)", dose:"3 x 20–30 s", note:"Tomler aktivt"},
    {cat:"Skulder/Press", navn:"Overhead Press (manualer/stang)", dose:"3 x 6–10", note:"Ribbekontroll, lockout"},
    {cat:"Stabilitet", navn:"Scapula Pull-Ups", dose:"3 x 10–12", note:"Kun skulderbladbevegelse"},
    {cat:"Bakskulder", navn:"YTWL (lette manualer)", dose:"2 x 8–10/posisjon", note:"Kontrollert tempo"},
    {cat:"Kjerne", navn:"Hollow Body Hold", dose:"3 x 30–45 s", note:"Lav korsrygg"},
    {cat:"Ben/Glutes", navn:"Bulgarian Split Squat", dose:"3 x 8–10/ben", note:"Balanse, vertikal legg"},
    {cat:"Bakside", navn:"Hip Thrust", dose:"3 x 10–12", note:"Full hofteekstensjon"}
  ],
  uke: [
    {tittel:"Uke 1 – Innkjøring & teknikk", tip:"RIR 2–3. Finn startvekter og tid i hang. Notér utgangspunkt."},
    {tittel:"Uke 2 – Moderat progresjon", tip:"+1 rep/sett eller +2,5–5 % vekt. Grep: +5–10 s/sett."},
    {tittel:"Uke 3 – Overbelastning", tip:"Legg til ett ekstra sett i én baseøvelse pr. økt. Grep litt tyngre."},
    {tittel:"Uke 4 – Deload", tip:"Volum –30–40 %, fokus på teknikk, mobilitet, kvalitet."}
  ]
};

// Tabbing
const tabs = document.querySelectorAll('.tabs button');
const sections = document.querySelectorAll('main .tab');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  sections.forEach(s=>s.classList.add('hidden'));
  document.getElementById(btn.dataset.tab).classList.remove('hidden');
}));

// Render program
function liRow(item){
  const li = document.createElement('li');
  li.innerHTML = `<strong>${item.cat}</strong>: ${item.navn}<br><span class="meta">${item.dose}${item.note?` · ${item.note}`:''}</span>`;
  return li;
}

document.getElementById('listeA').append(...program.A.map(liRow));
document.getElementById('listeB').append(...program.B.map(liRow));

document.getElementById('ukeplan').append(...program.uke.map(u=>{
  const li = document.createElement('li');
  li.innerHTML = `<strong>${u.tittel}</strong><br><span class="meta">${u.tip}</span>`;
  return li;
}));

// Logg lagring
function loadLog(){
  try { return JSON.parse(localStorage.getItem('logg')||'[]'); } catch(e){ return []; }
}
function saveLog(arr){ localStorage.setItem('logg', JSON.stringify(arr)); }

const loggUl = document.getElementById('loggliste');
function renderLog(){
  const arr = loadLog();
  loggUl.innerHTML = '';
  arr.forEach((e,idx)=>{
    const li = document.createElement('li');
    const d = new Date(e.dato);
    li.innerHTML = `
      <div><strong>${e.okt}</strong> – ${e.vekt?e.vekt+' kg':''} ${e.tid?('· '+e.tid+' s hang'):''} ${e.reps?('· '+e.reps+' reps'):''} ${e.rir?('· RIR '+e.rir):''}</div>
      <div class="meta">${d.toLocaleDateString()} ${d.toLocaleTimeString()}</div>
      ${e.notater?`<div>${e.notater}</div>`:''}
      <div>
        <button class="danger" data-del="${idx}">Slett</button>
      </div>`;
    loggUl.append(li);
  });
}
renderLog();

loggUl.addEventListener('click', (ev)=>{
  const i = ev.target.getAttribute('data-del');
  if(i!==null){
    const arr = loadLog();
    arr.splice(parseInt(i),1);
    saveLog(arr); renderLog();
  }
});

// Skjema
const f = document.getElementById('loggForm');
f.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const entry = {
    dato: new Date().toISOString(),
    okt: document.getElementById('feltOkt').value,
    vekt: parseFloat(document.getElementById('feltVekt').value)||null,
    tid: parseInt(document.getElementById('feltTid').value)||null,
    reps: parseInt(document.getElementById('feltReps').value)||null,
    rir: parseInt(document.getElementById('feltRir').value)||null,
    notater: document.getElementById('feltNotater').value.trim()
  };
  const arr = loadLog();
  arr.unshift(entry);
  saveLog(arr);
  f.reset();
  renderLog();
});

document.getElementById('slettAltBtn').addEventListener('click',()=>{
  if(confirm('Slette all logg? Dette kan ikke angres.')){
    localStorage.removeItem('logg');
    renderLog();
  }
});

// Eksport
function download(filename, content, type='text/plain'){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], {type}));
  a.download = filename; a.click();
}

document.getElementById('eksportCsv').addEventListener('click',()=>{
  const rows = [['dato','okt','vekt','tid_s','reps','rir','notater']];
  for(const e of loadLog()){
    rows.push([e.dato, e.okt, e.vekt??'', e.tid??'', e.reps??'', e.rir??'', (e.notater||'').replace(/\n/g,' ') ]);
  }
  const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  download('buldring_logg.csv', csv, 'text/csv');
});

document.getElementById('eksportJson').addEventListener('click',()=>{
  download('buldring_logg.json', JSON.stringify(loadLog(), null, 2), 'application/json');
});

// PWA: service worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js');
  });
}

// A2HS prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('installBtn');
  btn.hidden = false;
  btn.addEventListener('click', async ()=>{
    btn.hidden = true; await deferredPrompt.prompt(); deferredPrompt = null;
  }, { once:true });
});
