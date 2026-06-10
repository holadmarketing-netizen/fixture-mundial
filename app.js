const SOURCE_NOTE = 'Fixture oficial del Mundial 2026 cargado desde API/proxy football-data.org, basado en el calendario oficial FIFA. Horarios mostrados en Uruguay (UTC-3).';
const RESULTS_PROXY_URL = window.RESULTS_PROXY_URL || 'https://fixture-mundial-iota.vercel.app/api/matches';

const NAMES_ES_BY_TLA = {
  MEX:'México', RSA:'Sudáfrica', KOR:'Corea del Sur', CZE:'República Checa', CAN:'Canadá', BIH:'Bosnia y Herzegovina', QAT:'Qatar', SUI:'Suiza',
  BRA:'Brasil', MAR:'Marruecos', HAI:'Haití', SCO:'Escocia', USA:'Estados Unidos', PAR:'Paraguay', AUS:'Australia', TUR:'Turquía',
  GER:'Alemania', CUW:'Curazao', CIV:'Costa de Marfil', ECU:'Ecuador', NED:'Países Bajos', JPN:'Japón', SWE:'Suecia', TUN:'Túnez',
  BEL:'Bélgica', EGY:'Egipto', IRN:'Irán', NZL:'Nueva Zelanda', ESP:'España', CPV:'Cabo Verde', KSA:'Arabia Saudita', URU:'Uruguay',
  FRA:'Francia', SEN:'Senegal', IRQ:'Irak', NOR:'Noruega', ARG:'Argentina', ALG:'Argelia', AUT:'Austria', JOR:'Jordania',
  POR:'Portugal', COD:'República Democrática del Congo', UZB:'Uzbekistán', COL:'Colombia', ENG:'Inglaterra', CRO:'Croacia', GHA:'Ghana', PAN:'Panamá',
  CRC:'Costa Rica', CHI:'Chile', PER:'Perú', VEN:'Venezuela', BOL:'Bolivia'
};
const NAMES_ES_BY_NAME = {
  Mexico:'México','South Africa':'Sudáfrica','South Korea':'Corea del Sur',Czechia:'República Checa',Canada:'Canadá','Bosnia-Herzegovina':'Bosnia y Herzegovina','Bosnia and Herzegovina':'Bosnia y Herzegovina',Qatar:'Qatar',Switzerland:'Suiza',Brazil:'Brasil',Morocco:'Marruecos',Haiti:'Haití',Scotland:'Escocia','United States':'Estados Unidos','USA':'Estados Unidos',Paraguay:'Paraguay',Australia:'Australia',Türkiye:'Turquía',Turkey:'Turquía',Germany:'Alemania',Curaçao:'Curazao','Curacao':'Curazao','Côte d’Ivoire':'Costa de Marfil','Côte d\'Ivoire':'Costa de Marfil','Ivory Coast':'Costa de Marfil',Ecuador:'Ecuador',Netherlands:'Países Bajos',Japan:'Japón',Sweden:'Suecia',Tunisia:'Túnez',Belgium:'Bélgica',Egypt:'Egipto',Iran:'Irán','New Zealand':'Nueva Zelanda',Spain:'España','Cape Verde':'Cabo Verde','Saudi Arabia':'Arabia Saudita',Uruguay:'Uruguay',France:'Francia',Senegal:'Senegal',Iraq:'Irak',Norway:'Noruega',Argentina:'Argentina',Algeria:'Argelia',Austria:'Austria',Jordan:'Jordania',Portugal:'Portugal','DR Congo':'República Democrática del Congo','Congo DR':'República Democrática del Congo',Uzbekistan:'Uzbekistán',Colombia:'Colombia',England:'Inglaterra',Croatia:'Croacia',Ghana:'Ghana',Panama:'Panamá'
};
const FLAGS_BY_TLA={MEX:'🇲🇽',RSA:'🇿🇦',KOR:'🇰🇷',CZE:'🇨🇿',CAN:'🇨🇦',BIH:'🇧🇦',QAT:'🇶🇦',SUI:'🇨🇭',BRA:'🇧🇷',MAR:'🇲🇦',HAI:'🇭🇹',SCO:'🏴',USA:'🇺🇸',PAR:'🇵🇾',AUS:'🇦🇺',TUR:'🇹🇷',GER:'🇩🇪',CUW:'🇨🇼',CIV:'🇨🇮',ECU:'🇪🇨',NED:'🇳🇱',JPN:'🇯🇵',SWE:'🇸🇪',TUN:'🇹🇳',BEL:'🇧🇪',EGY:'🇪🇬',IRN:'🇮🇷',NZL:'🇳🇿',ESP:'🇪🇸',CPV:'🇨🇻',KSA:'🇸🇦',URU:'🇺🇾',FRA:'🇫🇷',SEN:'🇸🇳',IRQ:'🇮🇶',NOR:'🇳🇴',ARG:'🇦🇷',ALG:'🇩🇿',AUT:'🇦🇹',JOR:'🇯🇴',POR:'🇵🇹',COD:'🇨🇩',UZB:'🇺🇿',COL:'🇨🇴',ENG:'🏴',CRO:'🇭🇷',GHA:'🇬🇭',PAN:'🇵🇦'};

let state = JSON.parse(localStorage.getItem('wc2026State') || '{}');
state.scores = state.scores || {}; state.selected = state.selected || []; state.ko = state.ko || {};
let apiMatches = []; let fixtures = []; let GROUPS = {}; let TEAM_META = {};
function save(){ localStorage.setItem('wc2026State', JSON.stringify(state)); }
function byId(id){ return document.getElementById(id); }
function normalizeGroup(g){ return (g || '').replace('GROUP_','').replace('GROUP ','').replace('Grupo ','').trim().slice(-1); }
function displayNameFromObj(t){ if(!t) return 'Por definir'; return NAMES_ES_BY_TLA[t.tla] || NAMES_ES_BY_NAME[t.name] || t.name || 'Por definir'; }
function displayName(key){ const meta=TEAM_META[key]; return meta?.es || NAMES_ES_BY_NAME[key] || key; }
function teamKey(t){ return t?.tla || t?.name || 'TBD'; }
function crestOrFlag(key){ const meta=TEAM_META[key]; if(meta?.crest) return `<img class="crest" src="${meta.crest}" alt="">`; if(meta?.flag) return `<span class="crest">${meta.flag}</span>`; return ''; }
function team(key){ if(!key || key==='Por definir') return 'Por definir'; if(String(key).startsWith('Ganador') || String(key).startsWith('Perdedor') || String(key).startsWith('Mejor')) return key; return `<span class="teamName">${crestOrFlag(key)}${displayName(key)}</span>`; }
function fmtDate(iso){ return new Intl.DateTimeFormat('es-UY',{weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Montevideo'}).format(new Date(iso)); }
function stageName(stage){ const s={GROUP_STAGE:'Fase de grupos',LAST_32:'Dieciseisavos',ROUND_OF_32:'Dieciseisavos',LAST_16:'Octavos',ROUND_OF_16:'Octavos',QUARTER_FINALS:'Cuartos',SEMI_FINALS:'Semifinales',THIRD_PLACE:'Tercer puesto',FINAL:'Final'}; return s[stage] || stage || 'Partido'; }
function statusName(status){ return {TIMED:'Programado',SCHEDULED:'Programado',IN_PLAY:'En vivo',PAUSED:'Entretiempo',FINISHED:'Finalizado',POSTPONED:'Postergado'}[status] || status || ''; }

async function loadOfficialFixture(){
  const status = byId('apiStatus');
  try{
    if(status) status.textContent = 'Cargando fixture oficial...';
    const r = await fetch(RESULTS_PROXY_URL, { cache:'no-store' });
    const data = await r.json();
    if(!r.ok || !Array.isArray(data.matches)) throw new Error(data.message || data.error || 'Respuesta inválida');
    apiMatches = data.matches;
    buildDataFromAPI(apiMatches);
    if(status){ status.textContent = `Fixture oficial cargado: ${apiMatches.length} partidos.`; status.className='apiStatus ok'; }
  }catch(err){
    console.error(err);
    if(status){ status.textContent = 'No se pudo cargar la API. Revisá el proxy de Vercel o el token.'; status.className='apiStatus error'; }
  }
  refresh();
}
function addTeamMeta(t){
  if(!t || (!t.name && !t.tla)) return;
  const key=teamKey(t);
  TEAM_META[key]={key,name:t.name,tla:t.tla,es:displayNameFromObj(t),crest:t.crest,flag:FLAGS_BY_TLA[t.tla]};
}
function buildDataFromAPI(matches){
  TEAM_META={}; GROUPS={};
  fixtures = matches.map(m=>{
    addTeamMeta(m.homeTeam); addTeamMeta(m.awayTeam);
    const g=normalizeGroup(m.group);
    const a=teamKey(m.homeTeam), b=teamKey(m.awayTeam);
    if(m.stage==='GROUP_STAGE' && g){
      GROUPS[g]=GROUPS[g]||[];
      [a,b].forEach(k=>{ if(k && !GROUPS[g].includes(k)) GROUPS[g].push(k); });
    }
    return { id:String(m.id), apiId:m.id, g, d:m.utcDate, city:m.area?.name || 'Sede por confirmar', a, b, stage:m.stage, status:m.status, matchday:m.matchday, score:m.score, original:m };
  }).sort((x,y)=>new Date(x.d)-new Date(y.d));
}
function scoreFor(m){
  const ft=m.score?.fullTime;
  if(Number.isInteger(ft?.home) && Number.isInteger(ft?.away)) return {a:ft.home,b:ft.away,source:'api'};
  const sc=state.scores[m.id];
  if(sc && sc.a!=='' && sc.b!=='') return {a:+sc.a,b:+sc.b,source:'manual'};
  return null;
}
function initStats(){ const s={}; Object.entries(GROUPS).forEach(([g,teams])=>teams.forEach(t=>s[t]={team:t,g,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,dg:0,pts:0})); return s; }
function standings(){
  const s=initStats();
  fixtures.filter(m=>m.stage==='GROUP_STAGE').forEach(m=>{ const sc=scoreFor(m); if(!sc) return; const A=s[m.a],B=s[m.b]; if(!A||!B) return; const a=sc.a,b=sc.b; A.pj++;B.pj++;A.gf+=a;A.gc+=b;B.gf+=b;B.gc+=a; if(a>b){A.pg++;B.pp++;A.pts+=3}else if(a<b){B.pg++;A.pp++;B.pts+=3}else{A.pe++;B.pe++;A.pts++;B.pts++} A.dg=A.gf-A.gc;B.dg=B.gf-B.gc; });
  const by={}; Object.keys(GROUPS).sort().forEach(g=>{ by[g]=Object.values(s).filter(x=>x.g===g).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||displayName(a.team).localeCompare(displayName(b.team),'es')); });
  return by;
}
function bestThirds(by){ return Object.values(by).map(arr=>arr[2]).filter(Boolean).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf).slice(0,8).map(x=>x.team); }
function renderGroups(){
 const grid=byId('groupsGrid'); if(!grid) return; const by=standings(); const best3=bestThirds(by); const keys=Object.keys(GROUPS).sort();
 grid.innerHTML = keys.length ? keys.map(g=>`<article class="groupCard"><div class="groupTop"><div class="groupName">Grupo ${g}</div><small>${GROUPS[g].map(k=>crestOrFlag(k)).join('')}</small></div><div class="tableRow tableHead"><span>Selección</span><span>PJ</span><span>GF</span><span>GC</span><span>DG</span><span>Pts</span></div>${by[g].map((x,i)=>`<div class="tableRow ${i<2?'qualified':best3.includes(x.team)?'thirdOk':''}"><span><b class="rank">${i+1}</b>${team(x.team)}</span><span>${x.pj}</span><span>${x.gf}</span><span>${x.gc}</span><span>${x.dg}</span><span><b>${x.pts}</b></span></div>`).join('')}</article>`).join('') : '<article class="groupCard">Cargando grupos oficiales...</article>';
}
function renderMatches(){
 const list=byId('matchesList'); if(!list) return; const q=(byId('searchInput')?.value||'').toLowerCase();
 const items=fixtures.filter(m=>m.stage==='GROUP_STAGE').filter(m=>`${m.g} ${m.city} ${displayName(m.a)} ${displayName(m.b)} ${m.a} ${m.b}`.toLowerCase().includes(q));
 list.innerHTML = items.length ? items.map(m=>{ const sc=scoreFor(m); const manual=state.scores[m.id]||{a:'',b:''}; const active=state.selected.includes(m.id); const locked=sc?.source==='api'; return `<article class="matchCard"><div><div class="matchMeta">Grupo ${m.g} · ${fmtDate(m.d)} · ${m.city}<span class="statusPill">${statusName(m.status)}</span></div><div class="teams"><span>${team(m.a)}</span><div class="scoreBox ${locked?'locked':''}"><input inputmode="numeric" min="0" value="${sc?sc.a:manual.a}" data-score="${m.id}:a" placeholder="-" ${locked?'readonly title="Resultado desde API"':''}> <span>-</span> <input inputmode="numeric" min="0" value="${sc?sc.b:manual.b}" data-score="${m.id}:b" placeholder="-" ${locked?'readonly title="Resultado desde API"':''}></div><span>${team(m.b)}</span></div></div><div class="matchActions"><button class="iconBtn ${active?'active':''}" data-select="${m.id}">${active?'🔔 Activado':'🔔 Activar'}</button><button class="iconBtn" data-google="${m.id}">Google</button><button class="iconBtn" data-ics="${m.id}">.ics</button></div></article>` }).join('') : '<article class="matchCard">Cargando partidos oficiales...</article>';
}
function renderBracket(){
 const box=byId('bracket'); if(!box) return;
 const order=['LAST_32','ROUND_OF_32','LAST_16','ROUND_OF_16','QUARTER_FINALS','SEMI_FINALS','THIRD_PLACE','FINAL'];
 const byStage={}; fixtures.filter(m=>m.stage!=='GROUP_STAGE').forEach(m=>{ const key=m.stage==='ROUND_OF_32'?'LAST_32':m.stage==='ROUND_OF_16'?'LAST_16':m.stage; byStage[key]=byStage[key]||[]; byStage[key].push(m); });
 const rounds=order.filter((v,i,a)=>a.indexOf(v)===i).map(st=>[stageName(st), (byStage[st]||[]).sort((a,b)=>new Date(a.d)-new Date(b.d))]).filter(x=>x[1].length);
 box.innerHTML = rounds.length ? rounds.map(([name,slots])=>`<div class="round"><h3>${name}</h3>${slots.map((s,i)=>{ const sc=scoreFor(s); const winner=s.score?.winner ? (s.score.winner==='HOME_TEAM'?s.a:s.score.winner==='AWAY_TEAM'?s.b:null) : null; return `<div class="slot"><small>${fmtDate(s.d)} · ${s.city}</small><div class="slotTeam"><button>${team(s.a)}</button>${sc?`<b>${sc.a}</b>`:''}</div><div class="slotTeam"><button>${team(s.b)}</button>${sc?`<b>${sc.b}</b>`:''}</div>${winner?`<small>Ganador: <b>${team(winner)}</b></small>`:`<small>${statusName(s.status)}</small>`}</div>`}).join('')}</div>`).join('') : '<div class="round"><h3>Fase eliminatoria</h3><div class="slot">La API todavía no devolvió los cruces eliminatorios o están pendientes de confirmación.</div></div>';
}
function renderSelected(){ const box=byId('selectedMatches'); if(!box) return; const selected=fixtures.filter(m=>state.selected.includes(m.id)); box.className='selectedList'+(selected.length?'':' empty'); box.innerHTML=selected.length?selected.map(m=>`<span class="selectedPill">${team(m.a)} vs ${team(m.b)} · ${fmtDate(m.d)}</span>`).join(''):'Todavía no activaste ningún partido.'; }
function refresh(){ renderGroups(); renderMatches(); renderSelected(); renderBracket(); }
function icsDate(d){ return new Date(d).toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'; }
function makeICS(matches){ const now=icsDate(new Date()); return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Fixture Mundial 2026//ES','CALSCALE:GREGORIAN',...matches.flatMap(m=>['BEGIN:VEVENT','UID:'+m.id+'@mundial2026.local','DTSTAMP:'+now,'DTSTART:'+icsDate(m.d),'DTEND:'+icsDate(new Date(new Date(m.d).getTime()+2*60*60*1000)),'SUMMARY:'+displayName(m.a)+' vs '+displayName(m.b),'DESCRIPTION:Partido '+(m.stage==='GROUP_STAGE'?'Grupo '+m.g:stageName(m.stage))+' - '+SOURCE_NOTE,'LOCATION:'+m.city,'TRANSP:TRANSPARENT','BEGIN:VALARM','TRIGGER:-PT15M','ACTION:DISPLAY','DESCRIPTION:Empieza pronto: '+displayName(m.a)+' vs '+displayName(m.b),'END:VALARM','END:VEVENT']),'END:VCALENDAR'].join('\r\n'); }
function googleCalendarUrl(m){ const start=icsDate(m.d); const end=icsDate(new Date(new Date(m.d).getTime()+2*60*60*1000)); const params=new URLSearchParams({action:'TEMPLATE',text:`${displayName(m.a)} vs ${displayName(m.b)}`,dates:`${start}/${end}`,details:`${m.stage==='GROUP_STAGE'?'Partido Grupo '+m.g:stageName(m.stage)}. Recordatorio sugerido: 15 minutos antes. ${SOURCE_NOTE}`,location:m.city,trp:'false'}); return `https://calendar.google.com/calendar/render?${params.toString()}`; }
function openGoogleForMatches(matches){ if(matches.length===1){ window.open(googleCalendarUrl(matches[0]),'_blank','noopener'); return; } alert('Google Calendar permite abrir un evento por vez. Se abrirá el primero seleccionado; para todos juntos usá Descargar .ics.'); if(matches[0]) window.open(googleCalendarUrl(matches[0]),'_blank','noopener'); }
function download(name,text){ const blob=new Blob([text],{type:'text/calendar;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); URL.revokeObjectURL(a.href); }

const LATAM_TEAMS=['URU','ARG','BRA','COL','ECU','PAR','MEX','PAN','CRC','CHI','PER','VEN','BOL'];
const NEWS_SOURCES=['site:espndeportes.espn.com','site:as.com','site:marca.com','site:mundodeportivo.com','site:fifa.com/es'];
let activeNewsTeams=JSON.parse(localStorage.getItem('wc2026NewsTeams')||'["URU","ARG","BRA","COL","MEX"]');
function renderNewsFilters(){ const box=byId('newsFilters'); if(!box)return; box.innerHTML=LATAM_TEAMS.map(t=>`<button class="filterChip ${activeNewsTeams.includes(t)?'active':''}" data-news-team="${t}">${team(t)}</button>`).join(''); }
function decodeHTML(str){ const txt=document.createElement('textarea'); txt.innerHTML=str; return txt.value; }
function stripTags(str){ return decodeHTML((str||'').replace(/<[^>]+>/g,'')).trim(); }
async function fetchNews(){ const list=byId('newsList'); if(!list)return; list.innerHTML='<article class="newsCard mutedCard">Buscando noticias destacadas...</article>'; const teams=activeNewsTeams.length?activeNewsTeams:['URU','ARG','BRA','COL','MEX']; const queries=teams.slice(0,6).map(t=>`(${displayName(t)} OR selección ${displayName(t)}) Mundial 2026 (${NEWS_SOURCES.join(' OR ')})`); const urls = queries.map(
  q => `https://fixture-mundial-iota.vercel.app/api/news?q=${encodeURIComponent(q)}`
); try{ const responses = await Promise.all(
  urls.map(async u => {
    try {
      const xml = await fetch(u).then(r => r.text());

      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "text/xml");

      const items = [...doc.querySelectorAll("item")].map(item => ({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
        author: item.querySelector("source")?.textContent || "Medio"
      }));

      return { items };

    } catch {
      return null;
    }
  })
); const seen=new Set(), items=[]; responses.forEach(data=>(data?.items||[]).forEach(it=>{ const title=stripTags(it.title).replace(/ - Google News$/,''); const key=title.toLowerCase().slice(0,80); if(seen.has(key))return; seen.add(key); const source=stripTags(it.author||'Medio'); items.push({title,link:it.link,source,date:it.pubDate,desc:stripTags(it.description).slice(0,180)}); })); const top=items.slice(0,9); list.innerHTML=top.length?top.map(n=>`<article class="newsCard"><div class="newsSource"><span>${n.source||'Medio'}</span><span>${n.date?new Date(n.date).toLocaleDateString('es-UY'):''}</span></div><h3>${n.title}</h3><p>${n.desc||'Abrí la nota para leer el desarrollo completo en la fuente original.'}</p><a class="readMore" href="${n.link}" target="_blank" rel="noopener">Leer nota</a></article>`).join(''):'<article class="newsCard mutedCard">No encontré noticias recientes con esos filtros.</article>'; }catch(e){ list.innerHTML='<article class="newsCard mutedCard">No se pudieron cargar noticias ahora.</article>'; } }

document.addEventListener('input',e=>{ if(e.target.matches('[data-score]') && !e.target.readOnly){ const [id,side]=e.target.dataset.score.split(':'); state.scores[id]=state.scores[id]||{a:'',b:''}; state.scores[id][side]=e.target.value.replace(/[^0-9]/g,''); save(); renderGroups(); renderBracket(); } if(e.target.id==='searchInput') renderMatches(); });
document.addEventListener('click',e=>{ const sel=e.target.closest('[data-select]'); if(sel){ const id=sel.dataset.select; state.selected=state.selected.includes(id)?state.selected.filter(x=>x!==id):[...state.selected,id]; save(); refresh(); } const goog=e.target.closest('[data-google]'); if(goog){ const m=fixtures.find(x=>x.id===goog.dataset.google); if(m) openGoogleForMatches([m]); } const ics=e.target.closest('[data-ics]'); if(ics){ const m=fixtures.find(x=>x.id===ics.dataset.ics); if(m) download(`${displayName(m.a)}-vs-${displayName(m.b)}.ics`.replaceAll(' ','-'),makeICS([m])); } const news=e.target.closest('[data-news-team]'); if(news){ const t=news.dataset.newsTeam; activeNewsTeams=activeNewsTeams.includes(t)?activeNewsTeams.filter(x=>x!==t):[...activeNewsTeams,t]; localStorage.setItem('wc2026NewsTeams',JSON.stringify(activeNewsTeams)); renderNewsFilters(); fetchNews(); } });
byId('downloadSelected').onclick=byId('downloadSelectedTop').onclick=()=>{ const ms=fixtures.filter(m=>state.selected.includes(m.id)); if(!ms.length){alert('Primero activá al menos un partido.');return} download('mis-partidos-mundial-2026.ics',makeICS(ms)); };
byId('openSelectedGoogle').onclick=()=>{ const ms=fixtures.filter(m=>state.selected.includes(m.id)); if(!ms.length){alert('Primero activá al menos un partido.');return} openGoogleForMatches(ms); };
byId('refreshNews').onclick=fetchNews;
byId('resetResults').onclick=()=>{ if(confirm('¿Borrar resultados manuales y partidos activados?')){ state.scores={}; state.ko={}; state.selected=[]; save(); refresh(); } };
renderNewsFilters(); refresh(); fetchNews(); loadOfficialFixture();
