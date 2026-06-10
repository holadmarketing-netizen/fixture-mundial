const SOURCE_NOTE = 'Fixture base FIFA/ESPN. Formato 2026: 48 selecciones, 12 grupos, 72 partidos de grupo, 32 clasificados, 104 partidos totales. Horarios convertidos a Uruguay (UTC-3).';
// API opcional: para resultados automáticos gratis se recomienda usar un proxy propio en Vercel/Netlify hacia football-data.org.
// Endpoint sugerido: window.RESULTS_PROXY_URL = 'https://tu-proxy.vercel.app/api/worldcup';
const GROUPS = {
 A:['Mexico','South Africa','South Korea','Czechia'], B:['Canada','Bosnia and Herzegovina','Qatar','Switzerland'], C:['Brazil','Morocco','Haiti','Scotland'], D:['United States','Paraguay','Australia','Türkiye'], E:['Germany','Curaçao','Ivory Coast','Ecuador'], F:['Netherlands','Japan','Sweden','Tunisia'], G:['Belgium','Egypt','Iran','New Zealand'], H:['Spain','Cape Verde','Saudi Arabia','Uruguay'], I:['France','Senegal','Iraq','Norway'], J:['Argentina','Algeria','Austria','Jordan'], K:['Portugal','DR Congo','Uzbekistan','Colombia'], L:['England','Croatia','Ghana','Panama']
};
const FLAGS={Mexico:'🇲🇽','South Africa':'🇿🇦','South Korea':'🇰🇷',Czechia:'🇨🇿',Canada:'🇨🇦','Bosnia and Herzegovina':'🇧🇦',Qatar:'🇶🇦',Switzerland:'🇨🇭',Brazil:'🇧🇷',Morocco:'🇲🇦',Haiti:'🇭🇹',Scotland:'🏴','United States':'🇺🇸',Paraguay:'🇵🇾',Australia:'🇦🇺','Türkiye':'🇹🇷',Germany:'🇩🇪','Curaçao':'🇨🇼','Ivory Coast':'🇨🇮',Ecuador:'🇪🇨',Netherlands:'🇳🇱',Japan:'🇯🇵',Sweden:'🇸🇪',Tunisia:'🇹🇳',Belgium:'🇧🇪',Egypt:'🇪🇬',Iran:'🇮🇷','New Zealand':'🇳🇿',Spain:'🇪🇸','Cape Verde':'🇨🇻','Saudi Arabia':'🇸🇦',Uruguay:'🇺🇾',France:'🇫🇷',Senegal:'🇸🇳',Iraq:'🇮🇶',Norway:'🇳🇴',Argentina:'🇦🇷',Algeria:'🇩🇿',Austria:'🇦🇹',Jordan:'🇯🇴',Portugal:'🇵🇹','DR Congo':'🇨🇩',Uzbekistan:'🇺🇿',Colombia:'🇨🇴',England:'🏴',Croatia:'🇭🇷',Ghana:'🇬🇭',Panama:'🇵🇦'};

const NAMES_ES = {
  Mexico:'México', 'South Africa':'Sudáfrica', 'South Korea':'Corea del Sur', Czechia:'República Checa',
  Canada:'Canadá', 'Bosnia and Herzegovina':'Bosnia y Herzegovina', Qatar:'Qatar', Switzerland:'Suiza',
  Brazil:'Brasil', Morocco:'Marruecos', Haiti:'Haití', Scotland:'Escocia',
  'United States':'Estados Unidos', Paraguay:'Paraguay', Australia:'Australia', 'Türkiye':'Turquía',
  Germany:'Alemania', 'Curaçao':'Curazao', 'Ivory Coast':'Costa de Marfil', Ecuador:'Ecuador',
  Netherlands:'Países Bajos', Japan:'Japón', Sweden:'Suecia', Tunisia:'Túnez',
  Belgium:'Bélgica', Egypt:'Egipto', Iran:'Irán', 'New Zealand':'Nueva Zelanda',
  Spain:'España', 'Cape Verde':'Cabo Verde', 'Saudi Arabia':'Arabia Saudita', Uruguay:'Uruguay',
  France:'Francia', Senegal:'Senegal', Iraq:'Irak', Norway:'Noruega',
  Argentina:'Argentina', Algeria:'Argelia', Austria:'Austria', Jordan:'Jordania',
  Portugal:'Portugal', 'DR Congo':'República Democrática del Congo', Uzbekistan:'Uzbekistán', Colombia:'Colombia',
  England:'Inglaterra', Croatia:'Croacia', Ghana:'Ghana', Panama:'Panamá'
};

const fixtures = [
 {id:'m01',g:'A',d:'2026-06-11T16:00:00-03:00',city:'Mexico City',a:'Mexico',b:'South Africa'},
 {id:'m02',g:'A',d:'2026-06-11T23:00:00-03:00',city:'Zapopan',a:'South Korea',b:'Czechia'},
 {id:'m03',g:'B',d:'2026-06-12T16:00:00-03:00',city:'Toronto',a:'Canada',b:'Bosnia and Herzegovina'},
 {id:'m04',g:'D',d:'2026-06-12T22:00:00-03:00',city:'Inglewood',a:'United States',b:'Paraguay'},
 {id:'m05',g:'B',d:'2026-06-13T16:00:00-03:00',city:'Santa Clara',a:'Qatar',b:'Switzerland'},
 {id:'m06',g:'C',d:'2026-06-13T19:00:00-03:00',city:'East Rutherford',a:'Brazil',b:'Morocco'},
 {id:'m07',g:'C',d:'2026-06-13T22:00:00-03:00',city:'Foxborough',a:'Haiti',b:'Scotland'},
 {id:'m08',g:'D',d:'2026-06-14T01:00:00-03:00',city:'Vancouver',a:'Australia',b:'Türkiye'},
 {id:'m09',g:'E',d:'2026-06-14T14:00:00-03:00',city:'Houston',a:'Germany',b:'Curaçao'},
 {id:'m10',g:'F',d:'2026-06-14T17:00:00-03:00',city:'Arlington',a:'Netherlands',b:'Japan'},
 {id:'m11',g:'E',d:'2026-06-14T20:00:00-03:00',city:'Philadelphia',a:'Ivory Coast',b:'Ecuador'},
 {id:'m12',g:'F',d:'2026-06-14T23:00:00-03:00',city:'Guadalupe',a:'Sweden',b:'Tunisia'},
 {id:'m13',g:'H',d:'2026-06-15T14:00:00-03:00',city:'Atlanta',a:'Spain',b:'Cape Verde'},
 {id:'m14',g:'G',d:'2026-06-15T19:00:00-03:00',city:'Seattle',a:'Belgium',b:'Egypt'},
 {id:'m15',g:'H',d:'2026-06-15T19:00:00-03:00',city:'Miami Gardens',a:'Saudi Arabia',b:'Uruguay'},
 {id:'m16',g:'G',d:'2026-06-16T01:00:00-03:00',city:'Inglewood',a:'Iran',b:'New Zealand'},
 {id:'m17',g:'I',d:'2026-06-16T16:00:00-03:00',city:'East Rutherford',a:'France',b:'Senegal'},
 {id:'m18',g:'I',d:'2026-06-16T19:00:00-03:00',city:'Foxborough',a:'Iraq',b:'Norway'},
 {id:'m19',g:'J',d:'2026-06-16T22:00:00-03:00',city:'Kansas City',a:'Argentina',b:'Algeria'},
 {id:'m20',g:'J',d:'2026-06-17T01:00:00-03:00',city:'Santa Clara',a:'Austria',b:'Jordan'},
 {id:'m21',g:'K',d:'2026-06-17T14:00:00-03:00',city:'Houston',a:'Portugal',b:'DR Congo'},
 {id:'m22',g:'L',d:'2026-06-17T17:00:00-03:00',city:'Arlington',a:'England',b:'Croatia'},
 {id:'m23',g:'L',d:'2026-06-17T20:00:00-03:00',city:'Toronto',a:'Ghana',b:'Panama'},
 {id:'m24',g:'K',d:'2026-06-17T23:00:00-03:00',city:'Mexico City',a:'Uzbekistan',b:'Colombia'},
 {id:'m25',g:'A',d:'2026-06-18T13:00:00-03:00',city:'Atlanta',a:'Czechia',b:'South Africa'},
 {id:'m26',g:'B',d:'2026-06-18T16:00:00-03:00',city:'Inglewood',a:'Switzerland',b:'Bosnia and Herzegovina'},
 {id:'m27',g:'B',d:'2026-06-18T19:00:00-03:00',city:'Vancouver',a:'Canada',b:'Qatar'},
 {id:'m28',g:'A',d:'2026-06-19T00:00:00-03:00',city:'Zapopan',a:'Mexico',b:'South Korea'},
 {id:'m29',g:'D',d:'2026-06-19T16:00:00-03:00',city:'Seattle',a:'United States',b:'Australia'},
 {id:'m30',g:'C',d:'2026-06-19T19:00:00-03:00',city:'Foxborough',a:'Scotland',b:'Morocco'},
 {id:'m31',g:'C',d:'2026-06-19T22:00:00-03:00',city:'Philadelphia',a:'Brazil',b:'Haiti'},
 {id:'m32',g:'D',d:'2026-06-20T01:00:00-03:00',city:'Santa Clara',a:'Türkiye',b:'Paraguay'},
 {id:'m33',g:'F',d:'2026-06-20T14:00:00-03:00',city:'Houston',a:'Netherlands',b:'Sweden'},
 {id:'m34',g:'E',d:'2026-06-20T17:00:00-03:00',city:'Toronto',a:'Germany',b:'Ivory Coast'},
 {id:'m35',g:'E',d:'2026-06-20T21:00:00-03:00',city:'Kansas City',a:'Ecuador',b:'Curaçao'},
 {id:'m36',g:'F',d:'2026-06-21T01:00:00-03:00',city:'Guadalupe',a:'Tunisia',b:'Japan'},
 {id:'m37',g:'H',d:'2026-06-21T13:00:00-03:00',city:'Atlanta',a:'Spain',b:'Saudi Arabia'},
 {id:'m38',g:'G',d:'2026-06-21T16:00:00-03:00',city:'Inglewood',a:'Belgium',b:'Iran'},
 {id:'m39',g:'H',d:'2026-06-21T19:00:00-03:00',city:'Miami Gardens',a:'Uruguay',b:'Cape Verde'},
 {id:'m40',g:'G',d:'2026-06-21T22:00:00-03:00',city:'Vancouver',a:'New Zealand',b:'Egypt'},
 {id:'m41',g:'J',d:'2026-06-22T14:00:00-03:00',city:'Arlington',a:'Argentina',b:'Austria'},
 {id:'m42',g:'I',d:'2026-06-22T18:00:00-03:00',city:'Philadelphia',a:'France',b:'Iraq'},
 {id:'m43',g:'I',d:'2026-06-22T21:00:00-03:00',city:'East Rutherford',a:'Norway',b:'Senegal'},
 {id:'m44',g:'J',d:'2026-06-23T00:00:00-03:00',city:'Santa Clara',a:'Jordan',b:'Algeria'},
 {id:'m45',g:'K',d:'2026-06-23T14:00:00-03:00',city:'Houston',a:'Portugal',b:'Uzbekistan'},
 {id:'m46',g:'L',d:'2026-06-23T17:00:00-03:00',city:'Foxborough',a:'England',b:'Ghana'},
 {id:'m47',g:'L',d:'2026-06-23T20:00:00-03:00',city:'Toronto',a:'Panama',b:'Croatia'},
 {id:'m48',g:'K',d:'2026-06-23T23:00:00-03:00',city:'Zapopan',a:'Colombia',b:'DR Congo'},
 {id:'m49',g:'B',d:'2026-06-24T16:00:00-03:00',city:'Vancouver',a:'Switzerland',b:'Canada'},
 {id:'m50',g:'B',d:'2026-06-24T16:00:00-03:00',city:'Seattle',a:'Bosnia and Herzegovina',b:'Qatar'},
 {id:'m51',g:'C',d:'2026-06-24T19:00:00-03:00',city:'Miami Gardens',a:'Scotland',b:'Brazil'},
 {id:'m52',g:'C',d:'2026-06-24T19:00:00-03:00',city:'Atlanta',a:'Morocco',b:'Haiti'},
 {id:'m53',g:'A',d:'2026-06-24T22:00:00-03:00',city:'Mexico City',a:'Czechia',b:'Mexico'},
 {id:'m54',g:'A',d:'2026-06-24T22:00:00-03:00',city:'Guadalupe',a:'South Africa',b:'South Korea'},
 {id:'m55',g:'E',d:'2026-06-25T17:00:00-03:00',city:'East Rutherford',a:'Ecuador',b:'Germany'},
 {id:'m56',g:'E',d:'2026-06-25T17:00:00-03:00',city:'Philadelphia',a:'Curaçao',b:'Ivory Coast'},
 {id:'m57',g:'F',d:'2026-06-25T20:00:00-03:00',city:'Arlington',a:'Japan',b:'Sweden'},
 {id:'m58',g:'F',d:'2026-06-25T20:00:00-03:00',city:'Kansas City',a:'Tunisia',b:'Netherlands'},
 {id:'m59',g:'D',d:'2026-06-25T23:00:00-03:00',city:'Inglewood',a:'Türkiye',b:'United States'},
 {id:'m60',g:'D',d:'2026-06-25T23:00:00-03:00',city:'Santa Clara',a:'Paraguay',b:'Australia'},
 {id:'m61',g:'I',d:'2026-06-26T16:00:00-03:00',city:'Foxborough',a:'Norway',b:'France'},
 {id:'m62',g:'I',d:'2026-06-26T16:00:00-03:00',city:'Toronto',a:'Senegal',b:'Iraq'},
 {id:'m63',g:'H',d:'2026-06-26T21:00:00-03:00',city:'Houston',a:'Cape Verde',b:'Saudi Arabia'},
 {id:'m64',g:'H',d:'2026-06-26T21:00:00-03:00',city:'Zapopan',a:'Uruguay',b:'Spain'},
 {id:'m65',g:'G',d:'2026-06-27T00:00:00-03:00',city:'Seattle',a:'Egypt',b:'Iran'},
 {id:'m66',g:'G',d:'2026-06-27T00:00:00-03:00',city:'Vancouver',a:'New Zealand',b:'Belgium'},
 {id:'m67',g:'L',d:'2026-06-27T18:00:00-03:00',city:'East Rutherford',a:'Panama',b:'England'},
 {id:'m68',g:'L',d:'2026-06-27T18:00:00-03:00',city:'Philadelphia',a:'Croatia',b:'Ghana'},
 {id:'m69',g:'K',d:'2026-06-27T20:30:00-03:00',city:'Miami Gardens',a:'Colombia',b:'Portugal'},
 {id:'m70',g:'K',d:'2026-06-27T20:30:00-03:00',city:'Atlanta',a:'DR Congo',b:'Uzbekistan'},
 {id:'m71',g:'J',d:'2026-06-27T23:00:00-03:00',city:'Kansas City',a:'Algeria',b:'Austria'},
 {id:'m72',g:'J',d:'2026-06-27T23:00:00-03:00',city:'Arlington',a:'Jordan',b:'Argentina'}
];
const r32Templates=['2A vs 2B','1C vs 2F','1E vs 3 A/B/C/D/F','1F vs 2C','2E vs 2I','1I vs 3 C/D/F/G/H','1A vs 3 C/E/F/H/I','1L vs 3 E/H/I/J/K','1G vs 3 A/E/H/I/J','1D vs 3 B/E/F/I/J','1H vs 2J','2K vs 2L','1B vs 3 E/F/G/I/J','2D vs 2G','1J vs 2H','1K vs 3 D/E/I/J/L'];
let state=JSON.parse(localStorage.getItem('wc2026State')||'{}');
state.scores=state.scores||{}; state.selected=state.selected||[]; state.ko=state.ko||{};
function save(){localStorage.setItem('wc2026State',JSON.stringify(state));}
function fmtDate(iso){return new Intl.DateTimeFormat('es-UY',{weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Montevideo'}).format(new Date(iso));}
function displayName(t){return NAMES_ES[t] || t;}
function team(t){return `${FLAGS[t]||''} ${displayName(t)}`;}
function initStats(){const s={}; Object.entries(GROUPS).forEach(([g,teams])=>teams.forEach(t=>s[t]={team:t,g,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,dg:0,pts:0})); return s;}
function standings(){const s=initStats(); fixtures.forEach(m=>{const sc=state.scores[m.id]; if(!sc||sc.a===''||sc.b==='')return; const a=+sc.a,b=+sc.b; const A=s[m.a],B=s[m.b]; A.pj++;B.pj++;A.gf+=a;A.gc+=b;B.gf+=b;B.gc+=a; if(a>b){A.pg++;B.pp++;A.pts+=3}else if(a<b){B.pg++;A.pp++;B.pts+=3}else{A.pe++;B.pe++;A.pts++;B.pts++} A.dg=A.gf-A.gc;B.dg=B.gf-B.gc;}); const byGroup={}; Object.keys(GROUPS).forEach(g=>{byGroup[g]=Object.values(s).filter(x=>x.g===g).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||a.team.localeCompare(b.team));}); return byGroup;}
function bestThirds(byGroup){return Object.values(byGroup).map(arr=>arr[2]).sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf).slice(0,8).map(x=>x.team);}
function renderGroups(){const by=standings(); const best3=bestThirds(by); document.getElementById('groupsGrid').innerHTML=Object.keys(GROUPS).map(g=>`<article class="groupCard"><div class="groupTop"><div class="groupName">Grupo ${g}</div><small>${GROUPS[g].map(t=>FLAGS[t]).join(' ')}</small></div><div class="tableRow tableHead"><span>Selección</span><span>PJ</span><span>GF</span><span>GC</span><span>DG</span><span>Pts</span></div>${by[g].map((x,i)=>`<div class="tableRow ${i<2?'qualified':best3.includes(x.team)?'thirdOk':''}"><span><b class="rank">${i+1}</b>${team(x.team)}</span><span>${x.pj}</span><span>${x.gf}</span><span>${x.gc}</span><span>${x.dg}</span><span><b>${x.pts}</b></span></div>`).join('')}</article>`).join('');}
function renderMatches(){const q=(document.getElementById('searchInput')?.value||'').toLowerCase(); const items=fixtures.filter(m=>`${m.g} ${m.city} ${m.a} ${m.b} ${displayName(m.a)} ${displayName(m.b)}`.toLowerCase().includes(q)); document.getElementById('matchesList').innerHTML=items.map(m=>{const sc=state.scores[m.id]||{a:'',b:''}; const active=state.selected.includes(m.id); return `<article class="matchCard"><div><div class="matchMeta">Grupo ${m.g} · ${fmtDate(m.d)} · ${m.city}</div><div class="teams"><span>${team(m.a)}</span><div class="scoreBox"><input inputmode="numeric" min="0" value="${sc.a}" data-score="${m.id}:a" placeholder="-"> <span>-</span> <input inputmode="numeric" min="0" value="${sc.b}" data-score="${m.id}:b" placeholder="-"> </div><span>${team(m.b)}</span></div></div><div class="matchActions"><button class="iconBtn ${active?'active':''}" data-select="${m.id}">${active?'🔔 Activado':'🔔 Activar'}</button><button class="iconBtn" data-google="${m.id}">Google</button><button class="iconBtn" data-ics="${m.id}">.ics</button></div></article>`}).join('');}
function labelToTeam(label,by,best3){const m=label.match(/(1|2)([A-L])/); if(m){return by[m[2]]?.[+m[1]-1]?.team||label} if(label.startsWith('3 '))return 'Mejor 3º ('+label.replace('3 ','')+')'; return label;}
function renderBracket(){
 const by=standings(), b3=bestThirds(by);
 const r32=r32Templates.map((tpl,i)=>{const [x,y]=tpl.split(' vs '); return {id:'r32_'+i,a:labelToTeam(x,by,b3),b:labelToTeam(y,by,b3),meta:tpl}});
 const r16=Array.from({length:8},(_,i)=>({id:'r16_'+i,a:state.ko['r32_'+(i*2)]||'Ganador D'+(i*2+1),b:state.ko['r32_'+(i*2+1)]||'Ganador D'+(i*2+2)}));
 const qf=Array.from({length:4},(_,i)=>({id:'qf_'+i,a:state.ko['r16_'+(i*2)]||'Ganador O'+(i*2+1),b:state.ko['r16_'+(i*2+1)]||'Ganador O'+(i*2+2)}));
 const sf=Array.from({length:2},(_,i)=>({id:'sf_'+i,a:state.ko['qf_'+(i*2)]||'Ganador C'+(i*2+1),b:state.ko['qf_'+(i*2+1)]||'Ganador C'+(i*2+2)}));
 const third=[{id:'third',a:state.ko.sf_0?`Perdedor SF1`: 'Perdedor SF1',b:state.ko.sf_1?`Perdedor SF2`: 'Perdedor SF2',meta:'Partido por el tercer puesto'}];
 const final=[{id:'final',a:state.ko.sf_0||'Ganador SF1',b:state.ko.sf_1||'Ganador SF2',meta:'Final'}];
 const rounds=[['Dieciseisavos',r32],['Octavos',r16],['Cuartos',qf],['Semifinales',sf],['Tercer puesto',third],['Final',final]];
 document.getElementById('bracket').innerHTML=rounds.map(([name,slots])=>`<div class="round"><h3>${name}</h3>${slots.map((s,i)=>`<div class="slot"><small>${s.meta||'Partido '+(i+1)}</small><div class="slotTeam"><button data-win="${s.id}" data-team="${s.a}">${team(s.a)}</button></div><div class="slotTeam"><button data-win="${s.id}" data-team="${s.b}">${team(s.b)}</button></div>${state.ko[s.id]?`<small>Ganador: <b>${team(state.ko[s.id])}</b></small>`:''}</div>`).join('')}</div>`).join('');
}
function renderSelected(){const box=document.getElementById('selectedMatches'); const selected=fixtures.filter(m=>state.selected.includes(m.id)); box.className='selectedList'+(selected.length?'':' empty'); box.innerHTML=selected.length?selected.map(m=>`<span class="selectedPill">${team(m.a)} vs ${team(m.b)} · ${fmtDate(m.d)}</span>`).join(''):'Todavía no activaste ningún partido.';}
function refresh(){renderGroups();renderMatches();renderSelected();renderBracket();}
function icsDate(d){return new Date(d).toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';}
function makeICS(matches){const now=icsDate(new Date()); return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Fixture Mundial 2026//ES','CALSCALE:GREGORIAN',...matches.flatMap(m=>['BEGIN:VEVENT','UID:'+m.id+'@mundial2026.local','DTSTAMP:'+now,'DTSTART:'+icsDate(m.d),'DTEND:'+icsDate(new Date(new Date(m.d).getTime()+2*60*60*1000)),'SUMMARY:'+displayName(m.a)+' vs '+displayName(m.b),'DESCRIPTION:Partido Grupo '+m.g+' - '+SOURCE_NOTE,'LOCATION:'+m.city,'TRANSP:TRANSPARENT','BEGIN:VALARM','TRIGGER:-PT15M','ACTION:DISPLAY','DESCRIPTION:Empieza pronto: '+displayName(m.a)+' vs '+displayName(m.b),'END:VALARM','END:VEVENT']),'END:VCALENDAR'].join('\r\n');}

function compactGoogleDate(iso){return new Date(iso).toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';}
function googleCalendarUrl(m){
  const start=compactGoogleDate(m.d);
  const end=compactGoogleDate(new Date(new Date(m.d).getTime()+2*60*60*1000));
  const params=new URLSearchParams({
    action:'TEMPLATE',
    text:`${displayName(m.a)} vs ${displayName(m.b)}`,
    dates:`${start}/${end}`,
    details:`Partido Grupo ${m.g}. Recordá activar la notificación 15 minutos antes en Google Calendar. ${SOURCE_NOTE}`,
    location:m.city,
    trp:'false'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
function openGoogleForMatches(matches){
  if(matches.length===1){ window.open(googleCalendarUrl(matches[0]),'_blank','noopener'); return; }
  alert('Google Calendar permite abrir un evento por vez. Se abrirá el primero seleccionado; para todos juntos usá Descargar .ics.');
  if(matches[0]) window.open(googleCalendarUrl(matches[0]),'_blank','noopener');
}
const LATAM_TEAMS=['Uruguay','Argentina','Brazil','Colombia','Ecuador','Paraguay','Mexico','Panama','Costa Rica','Chile','Peru','Venezuela','Bolivia'];
const NEWS_SOURCES=['site:espndeportes.espn.com','site:as.com','site:marca.com','site:mundodeportivo.com','site:fifa.com/es'];
let activeNewsTeams=JSON.parse(localStorage.getItem('wc2026NewsTeams')||'["Uruguay","Argentina","Brazil","Colombia","Mexico"]');
function renderNewsFilters(){
 const box=document.getElementById('newsFilters'); if(!box)return;
 box.innerHTML=LATAM_TEAMS.map(t=>`<button class="filterChip ${activeNewsTeams.includes(t)?'active':''}" data-news-team="${t}">${team(t)}</button>`).join('');
}
function decodeHTML(str){const txt=document.createElement('textarea');txt.innerHTML=str;return txt.value;}
function stripTags(str){return decodeHTML((str||'').replace(/<[^>]+>/g,'')).trim();}
async function fetchNews(){
 const list=document.getElementById('newsList'); if(!list)return;
 list.innerHTML='<article class="newsCard mutedCard">Buscando noticias destacadas...</article>';
 const teams=activeNewsTeams.length?activeNewsTeams:['Uruguay','Argentina','Brazil','Colombia','Mexico'];
 const queries=teams.slice(0,6).map(t=>`(${displayName(t)} OR selección ${displayName(t)}) Mundial 2026 (${NEWS_SOURCES.join(' OR ')})`);
 const urls=queries.map(q=>`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://news.google.com/rss/search?q='+encodeURIComponent(q)+'&hl=es-419&gl=UY&ceid=UY:es-419')}`);
 try{
   const responses=await Promise.all(urls.map(u=>fetch(u).then(r=>r.ok?r.json():null).catch(()=>null)));
   const seen=new Set();
   const items=[];
   responses.forEach(data=>{(data?.items||[]).forEach(it=>{
     const title=stripTags(it.title).replace(/ - Google News$/,'');
     const key=title.toLowerCase().slice(0,80);
     if(seen.has(key))return; seen.add(key);
     const source=stripTags(it.author||new URL(it.link).hostname.replace('www.',''));
     items.push({title,link:it.link,source,date:it.pubDate,desc:stripTags(it.description).slice(0,180)});
   })});
   const top=items.slice(0,9);
   list.innerHTML=top.length?top.map(n=>`<article class="newsCard"><div class="newsSource"><span>${n.source||'Medio'}</span><span>${n.date?new Date(n.date).toLocaleDateString('es-UY'):''}</span></div><h3>${n.title}</h3><p>${n.desc||'Abrí la nota para leer el desarrollo completo en la fuente original.'}</p><a class="readMore" href="${n.link}" target="_blank" rel="noopener">Leer nota</a></article>`).join(''):'<article class="newsCard mutedCard">No encontré noticias recientes con esos filtros. Probá con más selecciones.</article>';
 }catch(err){
   list.innerHTML='<article class="newsCard mutedCard">No se pudieron cargar noticias ahora. La web sigue funcionando; podés volver a intentar más tarde.</article>';
 }
}

function download(name,text){const blob=new Blob([text],{type:'text/calendar;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); URL.revokeObjectURL(a.href);}
document.addEventListener('input',e=>{if(e.target.matches('[data-score]')){const [id,side]=e.target.dataset.score.split(':'); state.scores[id]=state.scores[id]||{a:'',b:''}; state.scores[id][side]=e.target.value.replace(/[^0-9]/g,''); save(); renderGroups(); renderBracket();} if(e.target.id==='searchInput')renderMatches();});
document.addEventListener('click',e=>{const sel=e.target.closest('[data-select]'); if(sel){const id=sel.dataset.select; state.selected=state.selected.includes(id)?state.selected.filter(x=>x!==id):[...state.selected,id]; save(); renderNewsFilters();
refresh();
fetchNews();} const goog=e.target.closest('[data-google]'); if(goog){const m=fixtures.find(x=>x.id===goog.dataset.google); openGoogleForMatches([m]);} const ics=e.target.closest('[data-ics]'); if(ics){const m=fixtures.find(x=>x.id===ics.dataset.ics); download(`${displayName(m.a)}-vs-${displayName(m.b)}.ics`.replaceAll(' ','-'),makeICS([m]));} const news=e.target.closest('[data-news-team]'); if(news){const t=news.dataset.newsTeam; activeNewsTeams=activeNewsTeams.includes(t)?activeNewsTeams.filter(x=>x!==t):[...activeNewsTeams,t]; localStorage.setItem('wc2026NewsTeams',JSON.stringify(activeNewsTeams)); renderNewsFilters(); fetchNews();} const win=e.target.closest('[data-win]'); if(win){const t=win.dataset.team; if(!t.includes('Ganador')&&!t.includes('Mejor 3º')){state.ko[win.dataset.win]=t; save(); renderBracket();}}});
document.getElementById('downloadSelected').onclick=document.getElementById('downloadSelectedTop').onclick=()=>{const ms=fixtures.filter(m=>state.selected.includes(m.id)); if(!ms.length){alert('Primero activá al menos un partido.');return} download('mis-partidos-mundial-2026.ics',makeICS(ms));};
document.getElementById('openSelectedGoogle').onclick=()=>{const ms=fixtures.filter(m=>state.selected.includes(m.id)); if(!ms.length){alert('Primero activá al menos un partido.');return} openGoogleForMatches(ms);};
document.getElementById('refreshNews').onclick=fetchNews;
document.getElementById('resetResults').onclick=()=>{if(confirm('¿Borrar resultados y ganadores cargados?')){state.scores={};state.ko={};save();renderNewsFilters();
refresh();
fetchNews();}};
renderNewsFilters();
refresh();
fetchNews();
