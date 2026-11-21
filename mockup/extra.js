/* Panoramic · extra: procesos, bodegas por proyecto, "por qué", login y arranque */
const act=(a,big)=>`<span class="act ${big?'big':''}" style="--c:${PAL[(NIV[a]||0)%PAL.length]}">${a}</span>`;

/* ---------- barra "por qué" + mini flujo del módulo ---------- */
function flowbar(k){const w=WHY[k];if(!w)return'';const r=MODFL[k],nr=NORM[k];
 let h=`<div class="why card" id="flowbar" style="animation-delay:0s"><div class="wy"><span class="wi">${ic('info',18)}</span><div><b>¿Por qué existe este módulo?</b><p>${w}</p>${nr?`<div class="nr">${ic('book',14)}<span>Base normativa: ${nr}</span></div>`:''}</div></div>`;
 if(r){const F=FLOWS[r[0]];h+=`<div class="fb"><div class="fbt">${ic('flow',15)}Proceso: <b>${F.t}</b></div><div class="fbs">${F.steps.map((s,i)=>`<button class="fs1 ${i==r[1]?'on':''}" data-a="fbgo" data-f="${r[0]}" data-i="${i}" title="${esc(s.t+' · '+s.a)}"><i>${i+1}</i>${s.t}</button>`).join('')}</div></div>`}
 return h+'</div>'}

/* ---------- bodegas por proyecto ---------- */
function bodStrip(){const ro=st.p=='obrero',all=BOD.map(n=>({n,...bodStats(n)}));
 return `<div class="bstrip" id="bstrip"><button class="bc ${st.bod?'':'on'}" data-a="bod" data-b=""><span class="bt">${all.length} bodegas</span><b>Todas</b><small>${all.reduce((s,b)=>s+b.items,0)} ítems · ${all.reduce((s,b)=>s+b.mov,0)} mov.</small></button>${all.map(b=>`<button class="bc ${st.bod==b.n?'on':''}" data-a="bod" data-b="${b.n}"><span class="bt">${BINFO[b.n][0]} · ${BINFO[b.n][1]}</span><b>${b.n}</b><small>${b.items} ítems · ${ro?'':Q(Math.round(b.val))+' · '}${b.mov} mov.</small></button>`).join('')}</div>`}

/* ---------- procesos y línea de mando ---------- */
function flowsView(){const f=st.fl;
 return `<div class="head fade"><div style="display:flex;align-items:center"><span class="mico">${ic('flow',20)}</span><div><h1>Procesos y capacitación</h1><p class="sub">Cada proceso paso a paso: quién actúa, por qué y qué deja registrado.</p></div></div></div>
 <div class="tabs" id="tabs">${[['f','Flujos de proceso','flow'],['l','Línea de mando','users']].map(t=>`<button data-a="fltab" data-t="${t[0]}" class="${f.tab==t[0]?'on':''}">${ic(t[2],16)}${t[1]}</button>`).join('')}</div><div id="flowArea"></div>`}
function cmdView(){return `<div class="hint">${ic('info',18)}<span>La <b>línea de mando</b> indica a quién reporta cada nivel y qué puede decidir. Si algo supera tu nivel, sube al siguiente.</span></div>
 <div class="pyr" id="flowrail">${CMD.map((c,i)=>`<div class="lvl" style="--w:${56+i*11}%;--i:${i}"><div class="lc"><span class="ln" style="background:${PAL[(i+1)%PAL.length]}">${c[1]}</span><div><b>${c[0]}</b><small>${c[2]}</small></div><span class="lic">${ic(c[6],20)}</span></div><p>${c[3]}</p><div class="lm"><span>${ic('arrowd',13)}Reporta a: <b>${c[4]}</b></span><span>${ic('eye',13)}Ve: <b>${c[5]}</b></span></div></div>${i<CMD.length-1?`<div class="lcon">${ic('arrowd',16)}<small>supervisa a</small></div>`:''}`).join('')}</div>
 <h3 style="margin:24px 0 10px;font-size:14px">Matriz de aprobación</h3><div class="tw"><table style="min-width:680px"><thead><tr><th>Acción</th><th>Solicita</th><th>Revisa</th><th>Aprueba</th><th>Límite</th></tr></thead><tbody>${MATRIZ.map((r,i)=>`<tr style="cursor:default;--i:${i}"><td><b>${r[0]}</b></td><td>${act(r[1])}</td><td>${act(r[2])}</td><td>${act(r[3])}</td><td class="mu">${r[4]}</td></tr>`).join('')}</tbody></table></div>`}
function drawFlow(){const f=st.fl,A=$('#flowArea');if(!A)return;
 if(f.tab=='l'){A.innerHTML=cmdView();return}
 const F=FLOWS[f.p],S=F.steps,n=S.length,cur=S[f.s],mine=MIROL[st.p]||[],can=cur.m&&ACC[st.p].includes(cur.m);
 const chips=`<div class="chips" id="flowchips" style="margin-bottom:12px">${Object.keys(FLOWS).map(k=>`<button class="chip ${k==f.p?'on':''}" data-a="flp" data-p="${k}">${ic(FLOWS[k].i,14)}${FLOWS[k].t}</button>`).join('')}</div><p class="sub" style="margin:0 0 12px">${F.d}</p>`;
 const rail=`<div class="railw" id="flowrail"><ol class="rail" style="--n:${n};--p:${n>1?f.s/(n-1):0}">${S.map((s,i)=>`<li class="${i<f.s?'done':i==f.s?'cur':''}"><button data-a="fls" data-i="${i}"><span class="nd">${i<f.s?ic('check',15):i+1}</span><b>${s.t}</b>${act(s.a)}${mine.includes(s.a)?'<i class="mine">Tu parte</i>':''}</button></li>`).join('')}</ol></div>`;
 const imp=st.p=='obrero'?'':cur.x?`<div class="imp"><h4>${ic('ledger',14)}Impacto contable</h4><table><thead><tr><th>Cuenta</th><th class="r">Debe</th><th class="r">Haber</th></tr></thead><tbody>${cur.x.map(r=>`<tr style="cursor:default"><td>${r[0]}</td><td class="r num">${r[1]!=null?Q(r[1]):''}</td><td class="r num">${r[2]!=null?Q(r[2]):''}</td></tr>`).join('')}</tbody></table>${cur.n?`<p class="mu" style="margin-top:8px;font-size:12.5px">${ic('book',13)} ${cur.n}</p>`:''}</div>`:cur.n?`<div class="imp"><h4>${ic('book',14)}Norma</h4><p class="mu">${cur.n}</p></div>`:'';
 const det=`<div class="card step" id="flowdetail"><div class="sh"><span class="sn">Paso ${f.s+1} de ${n}</span><h2>${cur.t}</h2><div class="who2">${act(cur.a,1)}<small>${NIV[cur.a]?'Nivel de mando '+NIV[cur.a]:'Automático'}</small>${mine.includes(cur.a)?'<i class="mine">Esta es tu parte</i>':''}</div></div>
 <div class="sg"><div><div class="why2"><h4>${ic('info',15)}¿Por qué se hace?</h4><p>${cur.w}</p></div><div class="doc"><h4>Documento que se genera</h4><span class="tag">${cur.d}</span></div></div>${imp}</div>
 <div class="sf"><button class="btn alt" data-a="flprev" ${f.s?'':'disabled'}>${ic('chevL',16)}Anterior</button><button class="btn alt" data-a="flplay">${ic(f.iv?'pause':'play',15)}${f.iv?'Pausar':'Recorrer'}</button>${cur.m?`<button class="btn alt" ${can?`data-a="go" data-v="${cur.m}"`:'disabled'}>${ic(M[cur.m].i,15)}${can?'Ir a '+M[cur.m].t:'Lo realiza otra área'}</button>`:''}<span style="flex:1"></span><button class="btn" data-a="flnext" ${f.s<n-1?'':'disabled'}>Siguiente${ic('chev',16)}</button></div></div>`;
 A.innerHTML=chips+rail+det;
 const c=$('.rail li.cur');if(c)$('.railw').scrollTo({left:c.offsetLeft-$('.railw').clientWidth/2+c.offsetWidth/2,behavior:RM?'auto':'smooth'})}
function stopFlow(){clearInterval(st.fl.iv);st.fl.iv=null}

Object.assign(ACT,{
 bod:e=>{st.bod=e.dataset.b;st.page=0;$('#bstrip').outerHTML=bodStrip();drawTable()},
 subt:e=>{const s=e.dataset.s,cur=st.open[s]!==undefined?st.open[s]:SUBS[s].k.includes(st.v);st.open[s]=!cur;nav()},
 fltab:e=>{st.fl.tab=e.dataset.t;stopFlow();render()},
 flp:e=>{stopFlow();st.fl.p=e.dataset.p;st.fl.s=0;drawFlow()},
 fls:e=>{stopFlow();st.fl.s=+e.dataset.i;drawFlow()},
 flprev:()=>{stopFlow();st.fl.s--;drawFlow()},flnext:()=>{stopFlow();st.fl.s++;drawFlow()},
 flplay:()=>{const f=st.fl;if(f.iv){stopFlow();drawFlow();return}const last=()=>f.s>=FLOWS[f.p].steps.length-1;if(last())f.s=0;
  f.iv=setInterval(()=>{if(last()){stopFlow();drawFlow();return}f.s++;drawFlow()},RM?700:2600);drawFlow()},
 fbgo:e=>{stopFlow();Object.assign(st.fl,{p:e.dataset.f,s:+e.dataset.i,tab:'f'});gotoV('procesos')},
 lgp:e=>{const k=e.dataset.r;$$('.lp').forEach(x=>x.classList.toggle('on',x===e));$('#lgUser').value=EMAIL[k];$('#lgPass').value='panoramic';$('#lgErr').textContent=''},
 lgtheme:()=>{const o=['light','dark','system'],c=ls.g('o360t')||'system';theme(o[(o.indexOf(c)+1)%3]);toast('Apariencia: '+TH.find(t=>t[0]==ls.g('o360t'))[2],TH.find(t=>t[0]==ls.g('o360t'))[1])},
 lgshow:()=>{const i=$('#lgPass');i.type=i.type=='password'?'text':'password'},
 logout:()=>{try{sessionStorage.removeItem('o360s')}catch(x){}stopFlow();dclose();showLogin()}});

/* ---------- login ---------- */
function lgArt(){const B=[[60,100,6],[180,116,9],[338,84,5],[444,132,11]];let h='';
 B.forEach((b,bi)=>{for(let i=0;i<b[2];i++){const y=340-(i+1)*22;h+=`<g class="fl" style="animation-delay:${(bi*.4+i*.12+.2).toFixed(2)}s"><rect x="${b[0]}" y="${y}" width="${b[1]}" height="22"/>${Array.from({length:Math.floor((b[1]-8)/26)},(_,k)=>`<rect class="wn" style="animation-delay:${(((bi*7+i*3+k*5)%10)/3).toFixed(1)}s" x="${b[0]+10+k*26}" y="${y+7}" width="10" height="8"/>`).join('')}</g>`}});
 let zz='M314 340';for(let y=340;y>52;y-=24)zz+=`L326 ${y-12}L314 ${y-24}`;
 return `<svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><line class="gr" x1="20" y1="340" x2="580" y2="340"/>${h}
 <g class="crane"><line x1="314" y1="340" x2="314" y2="44"/><line x1="326" y1="340" x2="326" y2="44"/><path d="${zz}"/><rect x="308" y="38" width="24" height="10" rx="2"/>
 <g class="jib"><line x1="170" y1="44" x2="480" y2="44"/><path d="M170 44L320 20L480 44"/><rect x="150" y="40" width="22" height="14"/><line class="cab" x1="420" y1="44" x2="420" y2="104"/><g class="ld"><rect x="404" y="104" width="32" height="18" rx="2"/></g></g></g>
 <g class="dim"><line x1="40" y1="340" x2="40" y2="100"/><line x1="34" y1="100" x2="46" y2="100"/><text x="52" y="226">+24,0 m</text></g></svg>`}
function loginInit(){$('#lgArt').innerHTML=lgArt();$('#lgProf').innerHTML=Object.keys(PROF).map(k=>`<button type="button" class="lp" data-a="lgp" data-r="${k}">${av(PROF[k].n)}<div><b>${PROF[k].r}</b><small>${PROF[k].n}</small></div>${ic('chev',16)}</button>`).join('');
 $('#lgTheme').innerHTML=ic('sun');$$('.lgi').forEach(e=>{e.innerHTML=ic(e.dataset.i,17)})}
function lock(on){$$('#side,.main').forEach(e=>{e.inert=on})}
function showLogin(){const L=$('#login');L.hidden=false;L.classList.remove('out');document.body.classList.remove('enter');lock(true);$('#lgUser').value='';$('#lgPass').value='';$('#lgErr').textContent='';$('#lgGo').disabled=false;$('#lgCard').classList.remove('busy');$('#lgSteps').classList.remove('on');$$('.lp').forEach(x=>x.classList.remove('on'));loginInit();setTimeout(()=>$('#lgUser').focus(),500)}
function enter(k){st.p=k;ls.s('o360p',k);try{sessionStorage.setItem('o360s',k)}catch(x){}
 st.v='dash';render();lock(false);document.body.classList.add('enter');const L=$('#login');L.classList.add('out');
 setTimeout(()=>{L.hidden=true;L.classList.remove('out');document.body.classList.remove('enter')},RM?50:1250);
 setTimeout(()=>{if(!ls.g('o360w'))offerTour()},RM?300:1900);toast('Bienvenido, '+PROF[k].n.split(' ')[0],'user')}
function offerTour(){const w=$('#welcome');w.innerHTML=`<b>Bienvenido a Panoramic</b><p>¿Quieres un recorrido de 1 minuto por la interfaz? También puedes aprender cada proceso en <b>Procesos y capacitación</b>.</p><div><button class="btn sm" data-a="wgo">${ic('help',14)}Iniciar recorrido</button><button class="btn sm alt" data-a="wno">Ahora no</button></div>`;w.classList.add('on')}
$('#lgForm').addEventListener('submit',e=>{e.preventDefault();
 const u=$('#lgUser').value.trim().toLowerCase(),k=Object.keys(EMAIL).find(x=>EMAIL[x]==u),err=$('#lgErr');
 if(!k||!$('#lgPass').value){err.textContent=!k?'Usuario no reconocido. Elige un perfil de demostración.':'Escribe la contraseña.';const c=$('#lgCard');c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');return}
 err.textContent='';$('#lgGo').disabled=true;$('#lgCard').classList.add('busy');
 const S=['Verificando credenciales','Cargando tus proyectos y bodegas','Preparando tu panel'],L=$('#lgSteps');L.classList.add('on');
 const paint=i=>{L.innerHTML=S.map((s,j)=>`<div class="${j<i?'ok':j==i?'ld':''}">${ic(j<i?'check':j==i?'loader':'clock',16)}<span>${s}</span></div>`).join('')};
 let i=0;paint(0);const t=setInterval(()=>{i++;if(i>=S.length){clearInterval(t);paint(S.length);setTimeout(()=>enter(k),RM?50:350)}else paint(i)},RM?80:700)});

/* ---------- arranque ---------- */
document.body.classList.toggle('coll',st.coll);
theme(ls.g('o360t')||'system');
let ses=null;try{ses=sessionStorage.getItem('o360s')}catch(x){}
loginInit();
if(ses&&ACC[ses]){st.p=ses;$('#login').hidden=true;lock(false)}else{lock(true);setTimeout(()=>$('#lgUser').focus(),700)}
render();
