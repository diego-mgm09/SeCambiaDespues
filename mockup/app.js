/* Panoramic · mockup interactivo (datos ficticios). Requiere data.js */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],H=document.documentElement;
const ls={g:k=>{try{return localStorage.getItem(k)}catch(e){}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- iconos minimalistas (trazo 1.6, 24x24) ---------- */
const I={
home:'<path d="M3 11l9-8 9 8M5 9.5V20h14V9.5M10 20v-5h4v5"/>',
users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.4.3 4 2.3 4 5"/>',
shield:'<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
book:'<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>',
building:'<path d="M5 21V4a1 1 0 011-1h8a1 1 0 011 1v17M15 9h3a1 1 0 011 1v11M3 21h18M9 7h2M9 11h2M9 15h2"/>',
box:'<path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5L12 12l9-4.5M12 12v9"/>',
truck:'<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
hardhat:'<path d="M3 17h18v2.5H3zM5 17a7 7 0 0114 0M9.5 11.5V9a2.5 2.5 0 015 0v2.5"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
cart:'<path d="M3 4h2l2.4 10.5h10.2L20 7H6.5"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
bank:'<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>',
chart:'<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
ledger:'<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3"/>',
warehouse:'<path d="M3 10l9-6 9 6v10H3z"/><path d="M8 20v-6h8v6"/>',
tractor:'<circle cx="7" cy="17" r="3.5"/><circle cx="18" cy="18" r="2"/><path d="M10.5 17H16M3.5 13.5V6h6l2 5h6l2 3v2"/>',
migrate:'<path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z"/><path d="M4 6v6c0 1.7 3.6 3 8 3M4 12v6c0 1.7 3.6 3 8 3"/><path d="M19 13v7M16.5 17.5L19 20l2.5-2.5"/>',
org:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
moon:'<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .7-1.5 1.2-1.5 2.5M12 17h.01"/>',
menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
download:'<path d="M12 4v11M7.5 11L12 15.5 16.5 11M5 20h14"/>',
upload:'<path d="M12 16V5M7.5 9L12 4.5 16.5 9M5 20h14"/>',
chev:'<path d="M9 6l6 6-6 6"/>',chevL:'<path d="M15 6l-6 6 6 6"/>',
sort:'<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>',up:'<path d="M12 19V5M6 11l6-6 6 6"/>',down:'<path d="M12 5v14M6 13l6 6 6-6"/>',
bell:'<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4z"/><path d="M10 21h4"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/>',
sheet:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M9.5 13h5M9.5 17h5M12 11v8"/>',
trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
trendd:'<path d="M3 7l6 6 4-4 8 8M15 17h6v-6"/>',
table:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 10v9"/>',
layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
loader:'<path d="M12 3a9 9 0 019 9"/>',
link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
db:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
hand:'<path d="M7 12V6a1.5 1.5 0 013 0v5M10 11V4.5a1.5 1.5 0 013 0V11M13 11V6a1.5 1.5 0 013 0v7M16 12.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1a6 6 0 01-5-3l-2.5-4a1.5 1.5 0 012.5-1.5L7 13"/>',
star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z"/>',
receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
flow:'<path d="M3 20h5v-5h5v-5h5V5h3"/><circle cx="3" cy="20" r=".6"/><circle cx="21" cy="5" r=".6"/>',
logout:'<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/>',
lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
scale:'<path d="M12 4v16M6 20h12M5 8h14M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z"/>',
percent:'<path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2"/><circle cx="16.5" cy="16.5" r="2"/>',
key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
play:'<path d="M7 5l12 7-12 7z"/>',pause:'<path d="M8 5v14M16 5v14"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
arrowr:'<path d="M5 12h14M13 6l6 6-6 6"/>',arrowd:'<path d="M12 5v14M6 13l6 6 6-6"/>'};
const ic=(n,s=18)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]||''}</svg>`;

/* ---------- estado ---------- */
const st={v:'dash',p:ls.g('o360p')||'admin',tab:'d',q:'',f:'',sort:null,page:0,sel:new Set(),bod:'',open:{},fl:{p:'compra',s:0,tab:'f',iv:null},
 mg:{step:0,loaded:false,fixed:new Set(),done:false,prog:0,iv:null,rules:{trim:1,upper:1,dups:1,units:1}},coll:ls.g('o360c')=='1'};
if(!ACC[st.p])st.p='admin';

/* ---------- utilidades ---------- */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const Q=v=>v==null?'—':(v<0?'− ':'')+'Q '+Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});
const nm=v=>Number(v).toLocaleString('en-US');
const PAL=['#0A2947','#7a5c2e','#2e6b5b','#5b3a6b','#8a3d3d','#2f5d8a','#5a6b2e'];
const av=n=>{const p=String(n).replace(/[^A-Za-zÁ-ú ]/g,'').trim().split(/\s+/);const t=((p[0]||'?')[0]+(p[1]?p[1][0]:'')).toUpperCase();let h=0;for(const c of n)h+=c.charCodeAt(0);return `<span class="av" style="background:${PAL[h%PAL.length]}">${t}</span>`};
const SC=v=>/^(Activo|Aprobada|Completado|Conciliado|Operativo|Listo|Autorizado|Recibido|Pagada|Cobrada|Emitida|Certificada|Declarada|Cerrado|Hecha)$/.test(v)?'ok':/^(Pendiente|En curso|Revisión|Programado|Borrador|Planificación|Parcial|Abierto)$/.test(v)?'wa':/^(Inactivo|Error|Bajo stock|Rechazada|Rechazado|Atrasado|Atrasada|Vencida|Anulada)$/.test(v)?'bd':'';
const pill=v=>`<span class="pill ${SC(v)}">${esc(v)}</span>`;
let tt;const toast=(t,i='check')=>{const e=$('#toast');e.innerHTML=ic(i,16)+'<span>'+esc(t)+'</span>';e.className='on';clearTimeout(tt);tt=setTimeout(()=>e.className='',2600)};
const side=o=>{$('#side').classList.toggle('open',o);$('#scrim').classList.toggle('on',o)};

/* ---------- tema ---------- */
const mq=matchMedia('(prefers-color-scheme:dark)');
const TH=[['light','sun','Claro','Siempre claro'],['dark','moon','Oscuro','Descansa la vista'],['system','monitor','Sistema','Sigue tu dispositivo']];
function theme(m){ls.s('o360t',m);H.dataset.t=m=='system'?(mq.matches?'dark':'light'):m;
 $('#themeBtn').innerHTML=ic(TH.find(t=>t[0]==m)[1]);
 $('#themeMenu').innerHTML='<h4>Apariencia</h4>'+TH.map(t=>`<button data-a="theme" data-m="${t[0]}" class="${t[0]==m?'on':''}">${ic(t[1])}<div>${t[2]}<small>${t[3]}</small></div><span class="ck">${ic('check',16)}</span></button>`).join('')}
mq.onchange=()=>theme(ls.g('o360t')||'system');

/* ---------- modelo de datos ---------- */
function fields(m){return (U+'|'+m.f).split('|').map(l=>{const[a,d='']=l.split(' # ');const i=a.indexOf(':'),n=a.slice(0,i),r=a.slice(i+1).trim(),base=r.match(/^[A-Za-z]+/)[0];
 return{n,base,fk:base=='FK'?r.split(/\s+/)[1]:null,en:(r.match(/\(([^)]*)\)/)||[])[1],pk:/\bPK\b/.test(r),uq:/\bUNIQUE\b/.test(r),nl:/\bNULL\b/.test(r),ix:/\bINDEX\b/.test(r),d}})}
const own=m=>fields(m).slice(7);
function sql(k){const m=M[k],fl=fields(m);
 const T={uuid:'uuid',string:'varchar(150)',text:'text',int:'integer',decimal:'numeric(14,2)',bool:'boolean',date:'date',datetime:'timestamptz',json:'jsonb',enum:'varchar(30)',FK:'uuid'};
 const ord=[fl[0],...fl.slice(7),...fl.slice(1,7)];
 const L=ord.map(f=>{let s='  '+f.n+' '+T[f.base];
  if(f.pk)s+=' PRIMARY KEY DEFAULT gen_random_uuid()';else{
   if(!f.nl)s+=' NOT NULL';if(f.uq)s+=' UNIQUE';
   if(f.base=='bool')s+=' DEFAULT true';if(f.n=='version')s+=' DEFAULT 1';if(/^(creado|actualizado)_en$/.test(f.n))s+=' DEFAULT now()';
   if(f.fk)s+=` REFERENCES ${f.fk}(id)`;if(f.base=='enum')s+=` CHECK (${f.n} IN (${f.en.split(',').map(x=>`'${x}'`).join(', ')}))`}
  return s});
 const ix=ord.filter(f=>f.fk||f.ix).map(f=>`CREATE INDEX idx_${k}_${f.n} ON ${k} (${f.n});`);
 return `-- Panoramic · tabla ${k}\n-- Crear en orden de dependencia o agregar las FK con ALTER TABLE.\nCREATE TABLE ${k} (\n${L.join(',\n')}\n);\n\n${ix.join('\n')}`}
function hl(t){return t.split('\n').map(l=>{l=esc(l);if(l.trim().startsWith('--'))return `<span class="cm">${l}</span>`;
 return l.replace(/'([^']*)'/g,'<span class="st">\'$1\'</span>').replace(/\b(CREATE TABLE|CREATE INDEX|PRIMARY KEY|NOT NULL|UNIQUE|REFERENCES|CHECK|DEFAULT|ON|IN)\b/g,'<span class="kw">$1</span>').replace(/\b(uuid|varchar\(\d+\)|text|integer|numeric\(\d+,\d+\)|boolean|date|timestamptz|jsonb)\b(?![^<]*>)/g,'<span class="ty2">$1</span>')}).join('\n')}

/* ---------- celdas de tabla ---------- */
const NUMT=['n','m','mv'];
function cell(v,t){switch(t){
 case 'p':{const[a,b]=String(v).split('|');return `<div class="pc">${av(a)}<div class="cell2"><b>${esc(a)}</b>${b?`<small>${esc(b)}</small>`:''}</div></div>`}
 case 'x':{const[a,b]=String(v).split('|');return `<div class="cell2"><b>${esc(a)}</b>${b?`<small>${esc(b)}</small>`:''}</div>`}
 case 'c':return `<span class="code">${esc(v)}</span>`;
 case 'g':return `<span class="tag">${esc(v)}</span>`;
 case 's':return pill(v);
 case 'n':return `<span class="num">${nm(v)}</span>`;
 case 'm':return v==null?'<span class="mu">—</span>':`<span class="num">${Q(v)}</span>`;
 case 'mv':return `<span class="num ${v<0?'neg':'pos'}">${v>0?'+ ':''}${Q(v)}</span>`;
 case 'b':return `<div class="pl"><div class="meter ${v>=100?'ok':''}"><u style="--w:${v}%"></u></div><b class="num">${v}%</b></div>`;
 case 'k':{const[a,mn]=String(v).split('/').map(Number),c=a<mn?'bd':a<mn*1.25?'wa':'ok';return `<div class="stk"><div><b class="num">${nm(a)}</b><small>mín. ${nm(mn)}</small></div><div class="meter ${c}"><u style="--w:${Math.min(100,a/(mn*2)*100)}%"></u></div></div>`}
 case 'r':return `<span class="rate" title="${v} de 5">${[1,2,3,4,5].map(i=>`<span class="${i>v?'off':''}">${ic('star',14)}</span>`).join('')}</span>`;
 default:return v==null?'—':esc(v)}}
const key=(v,t)=>v==null?-Infinity:t=='k'?parseFloat(v):['n','m','mv','b','r'].includes(t)?Number(v):String(v).split('|')[0].toLowerCase();
const cols=m=>m.c.map((c,i)=>({l:c[0],t:c[1],i})).filter(c=>!(st.p=='obrero'&&(c.t=='m'||c.t=='mv')));
const sidx=m=>m.c.findIndex(c=>c[1]=='s');
function rows(m){let r=m.r.map((x,i)=>({x,i}));
 if(st.q)r=r.filter(o=>o.x.join(' ').toLowerCase().includes(st.q));
 const si=sidx(m);if(st.f&&si>-1)r=r.filter(o=>o.x[si]==st.f);
 if(st.bod&&m.bi!=null)r=r.filter(o=>String(o.x[m.bi]).includes(st.bod));
 if(st.sort){const{c,d}=st.sort,t=m.c[c][1];r.sort((a,b)=>{const x=key(a.x[c],t),y=key(b.x[c],t);return(x>y?1:x<y?-1:0)*d})}
 return r}

/* ---------- navegación ---------- */
const attn=k=>{const m=M[k],si=sidx(m);return si<0?0:m.r.filter(r=>SC(r[si])=='wa'||SC(r[si])=='bd').length};
function nav(){const a=ACC[st.p];let h=`<button data-a="go" data-v="dash" class="${st.v=='dash'?'on':''}" title="Inicio">${ic('home')}<span class="t">Inicio</span></button>`;
 const leaf=(k,sub)=>`<button data-a="go" data-v="${k}" class="${st.v==k?'on':''} ${sub?'sb':''}" title="${M[k].t}">${ic(M[k].i,sub?16:18)}<span class="t">${M[k].t}</span>${['compras','inventarios','bodega'].includes(k)&&st.p!='obrero'?`<span class="cnt">${attn(k)}</span>`:''}</button>`;
 Object.keys(NAV).forEach(g=>{let b='';NAV[g].forEach(k=>{
  if(k[0]=='@'){const s=k.slice(1),kids=SUBS[s].k.filter(x=>a.includes(x));if(!kids.length)return;const open=st.open[s]!==undefined?st.open[s]:kids.includes(st.v);
   b+=`<button data-a="subt" data-s="${s}" class="par ${open?'open':''} ${kids.includes(st.v)?'has':''}" title="${SUBS[s].t}" aria-expanded="${!!open}">${ic(SUBS[s].i)}<span class="t">${SUBS[s].t}</span>${ic('chev',14)}</button><div class="sublist ${open?'open':''}"><div>${kids.map(x=>leaf(x,1)).join('')}</div></div>`}
  else if(a.includes(k))b+=leaf(k,0)});
  if(b)h+=`<div class="ng">${g}</div>`+b});
 $('#nav').innerHTML=h}
function hdr(){const P=PROF[st.p];
 const so=SUBOF[st.v];$('#crumbs').innerHTML=`Panoramic ${ic('chev',14)} ${so?SUBS[so].t+' '+ic('chev',14)+' ':''}<b>${st.v=='dash'?'Inicio':M[st.v].t}</b>`;
 $('#profBtn').innerHTML=`${av(P.n)}<div><b>${P.n.split(' ')[0]}</b><small>${P.r}</small></div>`;
 $('#profMenu').innerHTML='<h4>Cambiar perfil (demo)</h4>'+Object.keys(PROF).map(k=>`<button data-a="role" data-r="${k}" class="${k==st.p?'on':''}">${av(PROF[k].n)}<div>${PROF[k].r}<small>${PROF[k].d}</small></div><span class="ck">${ic('check',16)}</span></button>`).join('')+`<div class="sep"></div><button data-a="logout">${ic('logout')}<div>Cerrar sesión<small>Volver a la pantalla de ingreso</small></div></button>`;
 const ph=st.v=='dash'?'Ir a un módulo… (Enter)':st.tab=='m'?'Buscar campo…':'Buscar en '+M[st.v].t.toLowerCase()+'…';
 $('#q').placeholder=ph;$('#q').value=st.q;$('#sfIc').innerHTML=ic('help',22);$('#qIc').innerHTML=ic('search',16);$('#menu').innerHTML=ic('menu');$('#coll').innerHTML=ic('panel');$('#tourBtn').innerHTML=ic('help');
 const nt=[['alert','bd','Meta atrasada: Cimentación pila 3','Hace 2 h'],['cart','wa','OC-2026-119 espera tu aprobación','Hace 3 h'],['box','wa','Varilla 3/8" bajo el mínimo','Hoy 07:30'],['migrate','in','Migración "inventario_2019" finalizó','Hoy 09:10']];
 $('#bellBtn').innerHTML=ic('bell')+'<i class="dot"></i>';
 $('#bellMenu').innerHTML='<h4>Notificaciones</h4>'+nt.map(n=>`<div class="nt"><span class="al" style="padding:0;width:auto"><span class="ai ${n[1]}">${ic(n[0],16)}</span></span><div>${n[2]}<small>${n[3]}</small></div></div>`).join('')}

/* ---------- inicio ---------- */
const spark=a=>{const mx=Math.max(...a),mn=Math.min(...a),p=a.map((v,i)=>`${i*(80/(a.length-1))},${24-(v-mn)/(mx-mn||1)*22}`);return `<svg class="sk" width="80" height="26" viewBox="0 0 80 26"><polyline class="sp" pathLength="1" points="${p.join(' ')}"/></svg>`};
const cu=(n,pre='',suf='')=>`<b data-n="${n}" data-pre="${pre}" data-suf="${suf}">0</b>`;
const kpi=(l,v,suf,ico,tr,bad,sp,i)=>`<div class="card kpi" style="--i:${i}"><span class="ki">${ic(ico)}</span>${cu(v,'',suf)}<span>${l}</span><span class="tr ${bad?'bd':''}">${ic(bad?'trendd':'trend',14)}${tr}</span>${spark(sp)}</div>`;
const greet=()=>{const h=new Date().getHours();return h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches'};
const today=()=>{const s=new Date().toLocaleDateString('es-GT',{weekday:'long',day:'numeric',month:'long'});return s[0].toUpperCase()+s.slice(1)};
const ALR=[['wa','box','Varilla 3/8" bajo el mínimo','28 de 80 · Bodega Zona 10','inventarios'],['wa','cart','OC-2026-119 pendiente de aprobación','Q 112,300 · Acero Centro','compras'],['bd','alert','Meta atrasada: Cimentación pila 3','PRY-005 · 14 días de retraso','metas'],['in','tractor','Camión ACT-031 en revisión','Taller · mantenimiento','activos'],['in','migrate','11 errores por corregir en inventario_2019','Depuración y migraciones','migraciones']];
const alerts=(id=true)=>`<div class="card" style="--i:5" ${id?'id="alerts"':''}><h3>${ic('bell')}Requiere atención</h3>${ALR.filter(a=>ACC[st.p].includes(a[4])).map(a=>`<button class="al" data-a="go" data-v="${a[4]}"><span class="ai ${a[0]}">${ic(a[1],17)}</span><span><b>${a[2]}</b><small>${a[3]}</small></span></button>`).join('')}</div>`;
const prog=(id=true)=>`<div class="card" style="--i:4" ${id?'id="avc"':''}><h3>${ic('building')}Avance por proyecto<button class="link" data-a="go" data-v="proyectos">Ver todos ${ic('chev',14)}</button></h3>${M.proyectos.r.filter(r=>r[6]!='Completado').slice(0,5).map(r=>{const[a,b]=r[0].split('|');return `<div class="pr"><div><b>${a}</b><small>${b.split(' · ')[0]} · ${r[2]}</small></div><div class="meter ${r[6]=='Atrasado'?'bd':''}"><u style="--w:${r[3]}%"></u></div><b class="num">${r[3]}%</b></div>`}).join('')}</div>`;
const tasks=(L,pre)=>`<div id="tk">${L.map((t,i)=>`<button class="task ${i<pre?'done':''}" data-a="task"><span class="bx">${ic('check',14)}</span><span class="tt">${t[0]}</span><small>${t[1]}</small></button>`).join('')}</div>`;
function dash(){const P=PROF[st.p],first=P.n.split(' ')[0];
 if(st.p=='obrero')return `<div class="fade"><h1>Hola, ${first}</h1><p class="sub">¿Qué necesitas hacer hoy?</p></div><div class="grid" id="bigs" style="margin-top:20px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">${[['req','warehouse','Pedir material','Solicita lo que necesitas',''],['go','target','Mis tareas','Lo que toca hoy','metas'],['go','box','Consultar inventario','¿Hay material?','inventarios'],['go','flow','Cómo se hace','Aprende el proceso paso a paso','procesos']].map((x,i)=>`<button class="big" style="--i:${i}" data-a="${x[0]}" data-v="${x[4]}"><span class="bi">${ic(x[1],30)}</span>${x[2]}<small>${x[3]}</small></button>`).join('')}</div>
 <div class="two"><div class="card" style="--i:3" id="jornada"><h3>${ic('check')}Mi jornada de hoy<small class="mu" id="tcnt" style="margin-left:auto;font-weight:400"></small></h3>${tasks([['Armar columnas · eje C','7:00'],['Mover 200 blocks a nivel 4','10:00'],['Limpieza de frente de trabajo','15:30']],1)}</div>
 <div class="card" style="--i:4"><h3>${ic('clock')}Resumen</h3><div class="tl"><div><b>Entrada registrada</b><small>6:55 a. m. · PRY-001</small></div><div><b>Material entregado</b><small>40 sacos de cemento · 20 nov</small></div><div><b>Capacitación de seguridad</b><small>Pendiente esta semana</small></div></div></div></div>`;
 const m=st.p=='maestro';
 const K=m?[['Tareas de hoy',5,'','check','2 completadas',0,[1,3,2,4,3,5]],['Personal presente',42,' / 48','users','Asistencia 88 %',0,[38,40,41,39,42,42]],['Solicitudes por aprobar',3,'','hand','1 urgente',1,[1,2,2,3,4,3]],['Materiales críticos',3,'','box','En tus proyectos',1,[1,1,2,2,3,3]]]
  :[['Proyectos activos',6,'','building','+1 este mes',0,[3,4,4,5,5,6]],['Presupuesto ejecutado',68,'%','chart','+4 pts vs. mes anterior',0,[40,48,52,58,64,68]],['Materiales en stock crítico',12,'','box','3 nuevos hoy',1,[6,7,9,9,11,12]],['Personal en obra',148,'','hardhat','+9 esta semana',0,[120,128,131,139,142,148]]];
 const hero=`<div class="hero fade"><div style="position:relative;z-index:1"><h1>${greet()}, ${first}</h1><p>${today()} · ${m?'Panel del Maestro de Obra':'Panel administrativo'}</p></div><div class="hs">${m?`<button class="btn" data-a="go" data-v="bodega">${ic('warehouse',16)}Bodega</button><button class="btn" data-a="go" data-v="metas">${ic('target',16)}Metas</button>`:`<button class="btn" data-a="go" data-v="compras">${ic('cart',16)}Compras</button><button class="btn" data-a="go" data-v="reportes">${ic('chart',16)}Reportes</button>`}</div></div>`;
 const grid=`<div class="grid" id="kp">${K.map((k,i)=>kpi(k[0],k[1],k[2],k[3],k[4],k[5],k[6],i)).join('')}</div>`;
 if(m)return hero+grid+`<div class="two"><div class="card" style="--i:4" id="avc"><h3>${ic('check')}Tareas del día<small class="mu" id="tcnt" style="margin-left:auto;font-weight:400"></small></h3>${tasks([['Revisar armado de columnas · Nivel 5','07:30'],['Recibir 400 sacos de cemento','09:00'],['Charla de seguridad (5 min)','10:30'],['Medir avance de fundición','14:00'],['Firmar vales de bodega','16:30']],2)}</div>
 <div class="card" style="--i:5" id="alerts"><h3>${ic('hand')}Solicitudes por aprobar</h3>${[['Block 15x20x40 · 500 u','Carlos Tzoc · PRY-001'],['Cemento 42.5 kg · 60 sacos','Esteban Coy · PRY-001'],['Cable THHN #12 · 4 rollos','Mario Chen · PRY-001']].map(s=>`<div class="apr"><div><b>${s[0]}</b><small>${s[1]}</small></div><button class="btn sm alt" data-a="appr" data-ok="0" aria-label="Rechazar">${ic('close',14)}</button><button class="btn sm" data-a="appr" data-ok="1">${ic('check',14)}Aprobar</button></div>`).join('')}</div></div>
 <div class="two" style="grid-template-columns:1fr 1fr">${prog(false)}${alerts(false)}</div>`;
 const mo=['Jun','Jul','Ago','Sep','Oct','Nov'],pl=[40,52,60,66,72,80],re=[38,50,57,70,69,74];
 return hero+grid+`<div class="two">${prog()}${alerts()}</div>
 <div class="two"><div class="card" style="--i:6"><h3>${ic('chart')}Gasto mensual<small class="mu" style="margin-left:auto;font-weight:400">Q millones</small></h3><div class="lg"><span><i style="background:var(--ln)"></i>Planificado</span><span><i style="background:var(--ac)"></i>Real</span></div><div class="chart">${mo.map((x,i)=>`<div class="col"><div class="bars"><i style="--h:${pl[i]}%;--d:${i}" title="Plan ${pl[i]/10}"></i><i style="--h:${re[i]}%;--d:${i}" title="Real ${re[i]/10}"></i></div></div>`).join('')}</div><div class="chart-l">${mo.map(x=>`<div>${x}</div>`).join('')}</div></div>
 <div class="card" style="--i:7"><h3>${ic('bank')}Presupuesto global</h3><div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><div class="ringw"><svg class="ring" width="124" height="124" viewBox="0 0 42 42"><circle class="bg" cx="21" cy="21" r="15.9" pathLength="100"/><circle class="fg" cx="21" cy="21" r="15.9" pathLength="100" style="--v:68"/></svg><b>68%</b></div>
 <div style="flex:1;min-width:140px"><div class="pr" style="grid-template-columns:1fr auto"><span class="mu">Ejecutado</span><b>Q 28.0 M</b></div><div class="pr" style="grid-template-columns:1fr auto"><span class="mu">Comprometido</span><b>Q 6.4 M</b></div><div class="pr" style="grid-template-columns:1fr auto"><span class="mu">Disponible</span><b>Q 6.7 M</b></div></div></div></div></div>
 <div class="two" style="grid-template-columns:1fr 1fr"><div class="card" style="--i:8"><h3>${ic('clock')}Actividad reciente</h3><div class="tl"><div><b>Ana aprobó OC-2026-118</b><small>Hace 40 min · Compras</small></div><div><b>Julio registró entrada de 200 varillas</b><small>Ayer 16:20 · Bodega</small></div><div><b>Sofía cerró asiento A-0348</b><small>Ayer 15:02 · Contabilidad</small></div><div><b>Importación inventario_2019 completada</b><small>Hoy 09:10 · Migraciones</small></div></div></div>
 <div class="card" style="--i:9"><h3>${ic('spark')}Accesos rápidos</h3><div class="grid" style="grid-template-columns:repeat(3,1fr);gap:10px;margin:0">${['compras','bodega','cxp','femi','procesos','reportes'].map(k=>`<button class="al" style="flex-direction:column;align-items:center;text-align:center;border:1px solid var(--ln)" data-a="go" data-v="${k}"><span class="ai in">${ic(M[k].i,18)}</span><b style="font-size:12.5px">${M[k].t.replace('Depuración y migraciones','Migraciones')}</b></button>`).join('')}</div></div></div>`}

/* ---------- módulos ---------- */
function mod(){if(st.v=='procesos')return flowsView();
 const m=M[st.v],ro=st.p=='obrero',adm=st.p=='admin',si=sidx(m);
 const ok=si<0?0:m.r.filter(r=>SC(r[si])=='ok').length,at=attn(st.v);
 const kp=m.kp?m.kp:[['Registros',m.r.length],['Al día',ok],['Por revisar',at],...(ro?[]:[[m.ex[0],m.ex[1]]])];
 const canNew=st.v!='migraciones'&&(!ro||st.v=='bodega');
 let h=`<div class="head fade"><div style="display:flex;align-items:center"><span class="mico">${ic(m.i,20)}</span><div><h1>${m.t}</h1><p class="sub">${m.d}</p></div></div><div class="acts"><button class="btn alt" id="exportBtn" data-a="export">${ic('download',16)}Exportar</button>${canNew?`<button class="btn" id="newBtn" data-a="${ro?'req':'new'}">${ic('plus',16)}${ro?'Solicitar material':'Nuevo'}</button>`:''}</div></div>
 <div class="mk fade" id="mk" style="${ro?'grid-template-columns:repeat(3,1fr)':''}">${kp.map((k,i)=>`<div class="card" style="--i:${i}"><span>${k[0]}</span><b ${typeof k[1]=='number'?`data-n="${k[1]}"`:''}>${typeof k[1]=='number'?0:k[1]}</b></div>`).join('')}</div>`;
 h+=flowbar(st.v);
 if(adm)h+=`<div class="tabs" id="tabs">${[['d','Datos','table'],['m','Modelo de datos','layers'],['s','SQL','code']].map(t=>`<button data-a="tab" data-t="${t[0]}" class="${st.tab==t[0]?'on':''}">${ic(t[2],16)}${t[1]}</button>`).join('')}</div>`;
 if(st.tab=='m'&&adm){const fl=fields(m),rel=[...new Set(fl.filter(f=>f.fk&&f.fk!=st.v).map(f=>f.fk))];
  return h+`<div class="chipsrow fade"><span class="tag">${fl.length} campos</span><span class="tag">${fl.filter(f=>f.fk).length} claves foráneas</span><span class="tag">${fl.filter(f=>f.uq).length} únicos</span><span class="tag">${fl.filter(f=>!f.nl&&!f.pk).length} obligatorios</span>${rel.length?`<span class="mu" style="margin-left:6px">Relaciones:</span>${rel.map(r=>`<button class="chip" data-a="relmodel" data-v="${r}">${ic('link',13)}${r}</button>`).join('')}`:''}</div>
  <div class="hint">${ic('help',18)}<span>Los 7 campos de <b>auditoría y control</b> (id, creado/actualizado, eliminado_en, version) se agregan a todas las tablas. Úsalos tal cual al crear la base de datos.</span></div><div id="mArea"></div>`}
 if(st.tab=='s'&&adm)return h+`<div class="sql fade"><button class="btn sm alt cp" data-a="copy">${ic('copy',14)}Copiar</button><pre id="sqlc">${hl(sql(st.v))}</pre></div>`;
 if(st.v=='migraciones')h+=mig();
 return h+(m.bi!=null?bodStrip():'')+`<div id="chips" class="bar"></div><div id="tblArea"></div>`}

function drawTable(){const m=M[st.v],ro=st.p=='obrero',cs=cols(m),all=rows(m),per=6,pages=Math.max(1,Math.ceil(all.length/per)),si=sidx(m);
 if(st.page>=pages)st.page=pages-1;const pg=all.slice(st.page*per,st.page*per+per);
 if(si>-1){const u=[...new Set(m.r.map(r=>r[si]))];$('#chips').innerHTML=`<div class="chips">${[['','Todos',m.r.length],...u.map(x=>[x,x,m.r.filter(r=>r[si]==x).length])].map(c=>`<button class="chip ${st.f==c[0]?'on':''}" data-a="chip" data-f="${esc(c[0])}">${c[1]}<em>${c[2]}</em></button>`).join('')}</div>`}else $('#chips').innerHTML='';
 const allSel=pg.length&&pg.every(o=>st.sel.has(o.i));
 const bulk=st.sel.size?`<div class="bulk">${ic('check',16)}<b>${st.sel.size} seleccionado${st.sel.size>1?'s':''}</b><span style="flex:1"></span><button class="btn sm" data-a="export">${ic('download',14)}Exportar</button><button class="btn sm" data-a="toast" data-msg="Registros archivados (demostración)">${ic('archive',14)}Archivar</button><button class="btn sm" data-a="selClear">${ic('close',14)}Limpiar</button></div>`:'';
 const th=cs.map(c=>{const on=st.sort&&st.sort.c==c.i;return `<th class="s ${on?'on':''} ${NUMT.includes(c.t)?'r':''}" data-a="sort" data-c="${c.i}">${c.l}${ic(on?(st.sort.d>0?'up':'down'):'sort',13)}</th>`}).join('');
 const body=pg.map((o,n)=>`<tr class="${st.sel.has(o.i)?'sel':''}" data-a="row" data-i="${o.i}" style="--i:${n}">${ro?'':`<td class="ck" data-a="noop"><input type="checkbox" data-a="sel" data-i="${o.i}" ${st.sel.has(o.i)?'checked':''} aria-label="Seleccionar"></td>`}${cs.map(c=>`<td class="${NUMT.includes(c.t)?'r':''}">${cell(o.x[c.i],c.t)}</td>`).join('')}<td class="go">${ic('chev',16)}</td></tr>`).join('');
 const a=all.length?st.page*per+1:0,b=Math.min(all.length,st.page*per+per);
 $('#tblArea').innerHTML=bulk+(all.length?`<div class="tw"><table><thead><tr>${ro?'':`<th class="ck"><input type="checkbox" data-a="selAll" ${allSel?'checked':''} aria-label="Seleccionar todo"></th>`}${th}<th></th></tr></thead><tbody>${body}</tbody></table></div>
 <div class="tf"><span>Mostrando ${a}–${b} de ${all.length}</span><div class="pg"><button data-a="page" data-p="${st.page-1}" ${st.page?'':'disabled'} aria-label="Anterior">${ic('chevL',15)}</button>${Array.from({length:pages},(_,i)=>`<button class="${i==st.page?'on':''}" data-a="page" data-p="${i}">${i+1}</button>`).join('')}<button data-a="page" data-p="${st.page+1}" ${st.page<pages-1?'':'disabled'} aria-label="Siguiente">${ic('chev',15)}</button></div></div>`
 :`<div class="tw"><div class="empty">${ic('search',34)}<b>Sin resultados</b><span>Prueba con otra búsqueda o quita los filtros.</span><button class="btn sm alt" data-a="clearf">Quitar filtros</button></div></div>`)}
function drawModel(){const m=M[st.v],fl=fields(m),ord=[fl[0],...fl.slice(7),...fl.slice(1,7)].filter(f=>!st.q||(f.n+' '+f.d+' '+f.base).toLowerCase().includes(st.q));
 $('#mArea').innerHTML=`<div class="tw"><table><thead><tr><th>#</th><th>Campo</th><th>Tipo</th><th>Restricciones</th><th>Descripción</th></tr></thead><tbody>${ord.map((f,i)=>{const x=fl.indexOf(f),a=x>0&&x<7;return `<tr style="--i:${Math.min(i,12)};cursor:default;${a?'opacity:.7':''}"><td class="mu">${x<7?'·':x-6}</td><td><b class="ty">${f.n}</b></td><td><span class="ty">${f.base=='FK'?'uuid':f.base}${f.en?`(${f.en.replace(/,/g,' | ')})`:''}</span></td><td>${f.pk?'<span class="k pk">PK</span>':''}${f.fk?`<span class="k fk">FK → ${f.fk}</span>`:''}${f.uq?'<span class="k uq">ÚNICO</span>':''}${f.ix?'<span class="k ix">ÍNDICE</span>':''}${f.nl?'<span class="k nl">NULL</span>':(f.pk?'':'<span class="k nl" style="opacity:.55">NOT NULL</span>')}</td><td class="mu" style="white-space:normal;min-width:220px">${esc(f.d)}</td></tr>`}).join('')||'<tr><td colspan="5"><div class="empty"><b>Sin campos con ese texto</b></div></td></tr>'}</tbody></table></div>`}

/* ---------- detalle lateral ---------- */
function openRow(i){const m=M[st.v],r=m.r[i],cs=m.c.map((c,k)=>({l:c[0],t:c[1],k})).filter(c=>!(st.p=='obrero'&&(c.t=='m'||c.t=='mv')));
 const parts=String(r[0]).split('|'),first=parts[0],sub=parts[1]||m.t,txt=['p','x','c','t','g','d'].includes(cs[0].t);
 $('#drawer').innerHTML=`<div class="dh">${cs[0].t=='p'?av(first):`<span class="mico" style="margin:0">${ic(m.i,19)}</span>`}<div><h2>${esc(first)}</h2><p class="sub" style="margin:2px 0 0">${esc(sub)}</p></div><button class="ib x" data-a="dclose" aria-label="Cerrar">${ic('close')}</button></div>
 <div class="db"><h4>Información</h4><dl class="dl">${cs.slice(1).map(c=>`<dt>${c.l}</dt><dd>${cell(r[c.k],c.t)}</dd>`).join('')}</dl>
 <h4>Historial</h4><div class="tl"><div><b>Consultado por ti</b><small>Ahora</small></div><div><b>Actualizado por Ana Cifuentes</b><small>12 nov 2026 · 14:20</small></div><div><b>Creado por Luis Marroquín</b><small>03 sep 2026 · 09:05</small></div></div></div>
 <div class="df">${st.p=='obrero'?`<button class="btn alt" data-a="dclose">Cerrar</button>`:`<button class="btn" data-a="toast" data-msg="Edición abierta (demostración)">${ic('edit',15)}Editar</button><button class="btn alt" data-a="toast" data-msg="Registro duplicado (demostración)">${ic('copy',15)}Duplicar</button><button class="btn alt" data-a="toast" data-msg="Registro archivado (demostración)">${ic('archive',15)}Archivar</button>`}</div>`;
 $('#drawer').classList.add('on');$('#dscrim').classList.add('on')}
const dclose=()=>{$('#drawer').classList.remove('on');$('#dscrim').classList.remove('on')};

/* ---------- formularios ---------- */
function modal(inner,title,ico,ok){const d=document.createElement('div');d.className='mod';d.innerHTML=`<form><div class="mh"><span class="mico" style="margin:0">${ic(ico,19)}</span><h2>${title}</h2><button type="button" class="ib" data-close style="margin-left:auto">${ic('close')}</button></div><div class="mb">${inner}</div><div class="mf"><button type="button" class="btn alt" data-close>Cancelar</button><button class="btn">${ic('check',16)}${ok}</button></div></form>`;
 d.onclick=e=>{if(e.target==d||e.target.closest('[data-close]'))d.remove()};d.querySelector('form').onsubmit=e=>{e.preventDefault();d.remove();toast('Guardado correctamente (demostración)')};document.body.append(d);const f=d.querySelector('input,select');f&&f.focus()}
const opts=k=>`<option value="">Seleccionar…</option>`+M[k].r.slice(0,8).map(r=>`<option>${esc(String(r[0]).split('|')[0])}</option>`).join('');
function input(f){const lab=`<label>${f.n.replace(/_/g,' ')}${!f.nl&&f.base!='bool'?' <i>*</i>':''}</label>`,h=f.d?`<small>${esc(f.d)}</small>`:'';
 if(f.base=='bool')return `<div><label>${f.n.replace(/_/g,' ')}</label><label class="sw"><input type="checkbox" checked><i></i></label>${h}</div>`;
 if(f.fk)return `<div>${lab}<select>${opts(f.fk)}</select>${h}</div>`;
 if(f.base=='enum')return `<div>${lab}<select>${f.en.split(',').map(x=>`<option>${x.replace(/_/g,' ')}</option>`).join('')}</select>${h}</div>`;
 const ty={date:'date',datetime:'datetime-local',int:'number',decimal:'number'}[f.base]||'text';
 return `<div>${lab}<input type="${ty}" ${f.base=='decimal'?'step="0.01"':''} placeholder="${f.base=='json'?'{ }':f.base}">${h}</div>`}
function form(){const m=M[st.v],f=own(m),g=[['Datos generales',f.filter(x=>!x.fk&&x.base!='enum'&&x.base!='bool')],['Relaciones',f.filter(x=>x.fk)],['Estado y opciones',f.filter(x=>x.base=='enum'||x.base=='bool')]];
 modal(g.filter(s=>s[1].length).map(s=>`<div class="fs">${s[0]}</div><div class="ff">${s[1].map(input).join('')}</div>`).join(''),'Nuevo · '+m.t,m.i,'Guardar')}
function reqForm(){modal(`<div class="ff"><div><label>Material <i>*</i></label><select>${opts('inventarios')}</select></div><div><label>Cantidad <i>*</i></label><input type="number" min="1" placeholder="0"></div><div><label>Proyecto</label><select>${opts('proyectos')}</select></div><div><label>Cuándo lo necesitas</label><input type="date"></div></div><div class="fs">Nota para el bodeguero</div><div class="ff" style="grid-template-columns:1fr"><input placeholder="Opcional"></div>`,'Solicitar material','warehouse','Enviar solicitud')}

/* ---------- depuración y migraciones ---------- */
const SRC=[['<span class="bad">cem-001␣</span>','Cemento··42.5KG␣','340','SACO','92.5'],['VAR-0045','Varilla 3/8"','28','<span class="bad">varilla</span>','<span class="bad">48,75</span>'],['BLK101','Block 15x20x40','4200','UND','5.2'],['mat-0150','Arena de río','<span class="bad">N/A</span>','M3','185'],['<span class="bad">cem-001␣</span>','Cemento··42.5KG␣','340','SACO','92.5']];
const MAP=[['COD_MAT','cem-001','sku','Mayúsculas, sin espacios'],['DESC','Cemento 42.5KG','descripcion','Quitar duplicados'],['EXIST','340','stock_actual','Convertir a número'],['UND','SACO','unidad_id','Homologar con catálogo'],['PRECIO','92,5','costo_promedio','Coma → punto decimal'],['OBS','—','','Ignorar columna']];
const ISS=[['Fila 4','stock_actual','"N/A" no es numérico','Usar 0 y marcar revisión'],['Fila 17','unidad_id','"saco" no existe en catálogo','Homologar a "Saco"'],['Fila 33','sku','Código duplicado MAT-0045','Fusionar con fila 12'],['Fila 58','costo_promedio','"48,75" con coma decimal','Convertir a 48.75'],['Fila 91','descripcion','Campo vacío','Omitir fila']];
function mig(){const g=st.mg,S=['Origen','Mapeo','Validación','Importación'];let b='';
 if(g.step==0)b=`<div class="src"><button class="opt on" type="button">${ic('sheet',24)}<div><b>Excel / CSV</b><small>Carga un archivo de tu equipo</small></div></button><button class="opt" type="button" data-a="toast" data-msg="Conexión a sistema legacy: disponible en la versión final" data-i="db">${ic('db',24)}<div><b>Sistema legacy</b><small>SQL Server, MySQL, Access…</small></div></button></div>`+
  (g.loaded?`<div class="file"><span class="fi">${ic('sheet',22)}</span><div><b>inventario_2019.xlsx</b><small>3 hojas · 1,240 filas · 5 columnas · 214 KB</small></div><button class="btn sm alt" data-a="mgreset">Cambiar</button></div><div class="tw"><table style="min-width:520px"><thead><tr>${['COD_MAT','DESC','EXIST','UND','PRECIO'].map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${SRC.map(r=>`<tr style="cursor:default">${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="sub" style="font-size:12.5px;margin-top:8px"><span class="bad">Rojo</span> = datos que se corregirán automáticamente o requieren revisión.</p>`
  :`<button class="dz" data-a="mgload">${`<span class="up">${ic('upload',24)}</span>`}<b>Arrastra un archivo o haz clic para usar el ejemplo</b><span>.xlsx · .csv · hasta 20 MB</span></button>`);
 if(g.step==1){const F=['',...own(M.inventarios).map(f=>f.n)];b=`<div class="file" style="margin-bottom:12px"><span class="fi" style="background:color-mix(in srgb,var(--in) 18%,transparent);color:var(--in)">${ic('spark',20)}</span><div><b>5 de 6 columnas reconocidas automáticamente</b><small>Destino: <span class="tag">Inventarios</span> · revisa y ajusta si hace falta</small></div></div><div class="tw"><table style="min-width:560px"><thead><tr><th>Columna origen</th><th>Ejemplo</th><th></th><th>Campo estándar</th><th>Regla</th></tr></thead><tbody>${MAP.map(r=>`<tr style="cursor:default"><td><span class="code">${r[0]}</span></td><td class="mu">${r[1]}</td><td class="mu">${ic('chev',14)}</td><td><select class="sel" style="min-width:170px">${F.map(f=>`<option ${f==r[2]?'selected':''} value="${f}">${f||'(ignorar)'}</option>`).join('')}</select></td><td class="mu">${r[3]}</td></tr>`).join('')}</tbody></table></div>
  <div class="rules">${[['trim','Quitar espacios y caracteres invisibles','Limpia " cem-001 " → "cem-001"'],['upper','Códigos en mayúscula','mat-0150 → MAT-0150'],['dups','Fusionar duplicados por SKU','Conserva la fila más reciente'],['units','Homologar unidades con catálogo','saco, SACO, Sacos → Saco']].map(r=>`<div class="rule"><div><b>${r[1]}</b><small>${r[2]}</small></div><label class="sw"><input type="checkbox" data-a="mgrule" data-k="${r[0]}" ${g.rules[r[0]]?'checked':''}><i></i></label></div>`).join('')}</div>`}
 if(g.step==2){const e=11-g.fixed.size;b=`<div class="mk" style="grid-template-columns:repeat(3,1fr)"><div class="card"><b class="pos">${nm(1198+g.fixed.size)}</b><span>Filas válidas</span></div><div class="card"><b>31</b><span>Duplicados fusionados</span></div><div class="card"><b class="${e?'neg':'pos'}">${e}</b><span>Errores por corregir</span></div></div><div class="tw"><table style="min-width:620px"><thead><tr><th>Fila</th><th>Campo</th><th>Problema</th><th>Sugerencia</th><th></th></tr></thead><tbody>${ISS.map((r,i)=>`<tr style="cursor:default"><td><span class="code">${r[0]}</span></td><td class="ty">${r[1]}</td><td>${r[2]}</td><td class="mu">${r[3]}</td><td class="r">${g.fixed.has(i)?`<span class="pill ok">Corregido</span>`:`<button class="btn sm alt" data-a="mgfix" data-i="${i}">${ic('spark',14)}Corregir</button>`}</td></tr>`).join('')}</tbody></table></div><p class="sub" style="font-size:12.5px;margin-top:8px">+ 6 errores similares se resolverán con las mismas reglas.</p>`}
 if(g.step==3)b=g.done?`<div class="done-c"><span class="ok-ic">${ic('check',30)}</span><h2>¡Importación completada!</h2><p class="sub">${nm(1198+g.fixed.size)} registros cargados en <b>Inventarios</b> · lote IMP-2026-0042</p><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="btn" data-a="go" data-v="inventarios">${ic('box',16)}Ver inventarios</button><button class="btn alt" data-a="mgreset">Nueva migración</button></div></div>`:`<div id="imp"></div>`;
 const nx=['Continuar','Validar datos','Importar',''];
 return `<div class="card" id="mg" style="margin-bottom:18px;animation-delay:0s"><div class="steps">${S.map((s,i)=>`<div class="${i<g.step||g.done&&i==3?'ok':i==g.step?'on':''}"><span>${s}</span></div>`).join('')}</div>${b}${g.done?'':`<div style="display:flex;gap:8px;margin-top:16px;justify-content:space-between"><div>${g.step&&g.step<3?`<button class="btn alt" data-a="mgback">${ic('chevL',16)}Atrás</button>`:''}</div>${g.step<3?`<button class="btn" data-a="mgnext" ${g.step==0&&!g.loaded?'disabled':''}>${nx[g.step]}${ic('chev',16)}</button>`:''}</div>`}</div><h3 style="margin:6px 0 10px;font-size:14px">Historial de cargas</h3>`}
function paintImp(){const g=st.mg,el=$('#imp');if(!el)return;const S=['Leyendo archivo','Limpiando y homologando','Validando reglas','Insertando en Inventarios'],cur=Math.min(3,Math.floor(g.prog/25));
 el.innerHTML=`<div class="stg">${S.map((s,i)=>`<div class="${i<cur?'ok':i==cur?'ld':''}">${ic(i<cur?'check':i==cur?'loader':'clock',17)}<span>${s}</span></div>`).join('')}</div><div class="pbar"><u style="width:${g.prog}%"></u></div><p class="sub" style="margin-top:8px">${g.prog}%</p>`}
function startImp(){const g=st.mg;clearInterval(g.iv);g.prog=0;g.done=false;paintImp();g.iv=setInterval(()=>{g.prog=Math.min(100,g.prog+(RM?25:2));if(g.prog>=100){clearInterval(g.iv);g.iv=null;g.done=true;render();toast('Importación completada');return}paintImp()},60)}
const mgreset=()=>{clearInterval(st.mg.iv);Object.assign(st.mg,{step:0,loaded:false,fixed:new Set(),done:false,prog:0,iv:null});render()};

/* ---------- render ---------- */
function countUp(){$$('[data-n]').forEach(e=>{const t=+e.dataset.n,p=e.dataset.pre||'',s=e.dataset.suf||'',f=v=>p+nm(Math.round(v))+s;if(RM||t<2){e.textContent=f(t);return}const t0=performance.now();(function s2(n){const k=Math.max(0,Math.min(1,(n-t0)/800));e.textContent=f(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(s2)})(t0)})}
function tcnt(){const a=$$('#tk .task'),c=$('#tcnt');if(c)c.textContent=a.filter(x=>x.classList.contains('done')).length+' de '+a.length+' completadas'}
function render(){if(st.mg.iv&&!(st.v=='migraciones'&&st.mg.step==3)){clearInterval(st.mg.iv);st.mg.iv=null}
 if(st.fl.iv&&st.v!='procesos'){clearInterval(st.fl.iv);st.fl.iv=null}
 nav();hdr();$('#view').innerHTML=st.v=='dash'?dash():mod();
 if(st.v=='procesos')drawFlow();
 else if(st.v!='dash'){if(st.tab=='d')drawTable();if(st.tab=='m'&&st.p=='admin')drawModel()}
 if(st.v=='migraciones'&&st.mg.step==3&&!st.mg.done&&st.tab=='d'){if(st.mg.iv)paintImp();else startImp()}
 countUp();tcnt()}
function gotoV(v,tab){st.v=v;st.tab=tab||'d';st.q='';st.f='';st.sort=null;st.page=0;st.sel.clear();if(!M[v]||M[v].bi==null)st.bod='';if(SUBOF[v])st.open[SUBOF[v]]=true;dclose();render();side(false);scrollTo({top:0,behavior:RM?'auto':'smooth'})}

/* ---------- acciones ---------- */
const ACT={
 pop:e=>{const p=e.closest('.pop'),o=p.classList.contains('open');$$('.pop.open').forEach(x=>x.classList.remove('open'));p.classList.toggle('open',!o)},
 go:e=>gotoV(e.dataset.v),req:()=>reqForm(),new:()=>form(),
 side1:()=>side(true),side0:()=>side(false),
 coll:()=>{st.coll=!st.coll;ls.s('o360c',st.coll?1:0);document.body.classList.toggle('coll',st.coll)},
 tab:e=>{st.tab=e.dataset.t;st.q='';render()},
 sort:e=>{const c=+e.dataset.c;st.sort=st.sort&&st.sort.c==c?(st.sort.d==1?{c,d:-1}:null):{c,d:1};drawTable()},
 chip:e=>{st.f=e.dataset.f;st.page=0;drawTable()},clearf:()=>{st.f='';st.q='';$('#q').value='';drawTable()},
 page:e=>{st.page=+e.dataset.p;drawTable()},
 row:e=>openRow(+e.dataset.i),dclose,
 sel:e=>{const i=+e.dataset.i;e.checked?st.sel.add(i):st.sel.delete(i);drawTable()},
 selAll:e=>{const pg=rows(M[st.v]).slice(st.page*6,st.page*6+6);pg.forEach(o=>e.checked?st.sel.add(o.i):st.sel.delete(o.i));drawTable()},
 selClear:()=>{st.sel.clear();drawTable()},
 export:()=>toast('Exportando '+(st.sel.size||rows(M[st.v]).length)+' filas a Excel (demostración)','download'),
 toast:e=>toast(e.dataset.msg,e.dataset.i||'check'),
 theme:e=>theme(e.dataset.m),
 role:e=>{st.p=e.dataset.r;ls.s('o360p',st.p);gotoV('dash');toast('Perfil: '+PROF[st.p].r,'user')},
 tour:()=>{side(false);dclose();startTour()},
 relmodel:e=>gotoV(e.dataset.v,'m'),
 copy:()=>{try{navigator.clipboard.writeText(sql(st.v))}catch(x){}toast('SQL copiado','copy')},
 task:e=>{e.classList.toggle('done');tcnt()},
 appr:e=>{e.closest('.apr').classList.add('out');toast(e.dataset.ok=='1'?'Solicitud aprobada':'Solicitud rechazada',e.dataset.ok=='1'?'check':'close')},
 mgload:()=>{st.mg.loaded=true;render()},mgreset,
 mgnext:()=>{st.mg.step++;render()},mgback:()=>{st.mg.step--;render()},
 mgfix:e=>{st.mg.fixed.add(+e.dataset.i);render()},
 mgrule:e=>{st.mg.rules[e.dataset.k]=e.checked?1:0},
 wgo:()=>{ls.s('o360w',1);$('#welcome').classList.remove('on');startTour()},wno:()=>{ls.s('o360w',1);$('#welcome').classList.remove('on')}};
document.addEventListener('click',ev=>{const pop=ev.target.closest('.pop');$$('.pop.open').forEach(p=>{if(p!==pop)p.classList.remove('open')});
 const el=ev.target.closest('[data-a]');if(!el)return;const a=el.dataset.a,f=ACT[a];if(!f)return;f(el,ev);if(a!='pop'&&el.closest('.pop'))el.closest('.pop').classList.remove('open')});
$('#q').addEventListener('input',e=>{st.q=e.target.value.toLowerCase().trim();if(st.v=='dash'||st.v=='procesos')return;st.page=0;if(st.tab=='d')drawTable();else if(st.tab=='m')drawModel()});
$('#q').addEventListener('keydown',e=>{if(e.key=='Enter'&&st.v=='dash'&&st.q){const k=ACC[st.p].find(k=>M[k].t.toLowerCase().includes(st.q));if(k)gotoV(k);else toast('No hay un módulo con ese nombre','search')}});
document.addEventListener('keydown',e=>{const t=e.target.tagName;if(e.key=='/'&&!/INPUT|SELECT|TEXTAREA/.test(t)){e.preventDefault();$('#q').focus()}
 if(e.key=='Escape'){dclose();side(false);$$('.pop.open').forEach(p=>p.classList.remove('open'));const m=$('.mod');m&&m.remove()}});

/* ---------- tour guiado ---------- */
function startTour(){
 const G=[['#nav','Menú de módulos','Aquí están los módulos disponibles para tu perfil. Los números indican elementos pendientes.'],['#q','Búsqueda','Filtra al instante lo que ves en pantalla. Atajo: presiona “/”.'],['#bellBtn','Notificaciones','Avisos de aprobaciones, metas atrasadas y stock bajo.'],['#themeBtn','Apariencia','Elige modo claro, oscuro o el del sistema.'],['#profBtn','Perfil','Cambia entre Administrativo, Maestro de Obra y Obrero para ver cómo se adapta la interfaz.']];
 const V=st.v=='procesos'?[['#flowchips','Elige un proceso','Cada proceso cuenta una historia de principio a fin: compra, despacho, traslado, cobro, planilla y cierre.'],['#flowrail','Línea del proceso','Los pasos van en orden. Cada uno muestra quién actúa y su nivel de mando. Toca un paso o usa “Recorrer”.'],['#flowdetail','Detalle del paso','Aquí está el porqué, el documento que se genera y el impacto contable. Desde aquí saltas al módulo.']]
  :st.v=='dash'?(st.p=='obrero'?[['#bigs','Acciones grandes','Tres botones para lo más común: pedir material, ver tus tareas y consultar inventario.'],['#jornada','Tu jornada','Marca tus tareas como hechas con un toque.']]:[['#kp','Indicadores','Un vistazo al estado de tus obras. Los números se actualizan solos.'],['#avc',st.p=='maestro'?'Tareas del día':'Avance por proyecto',st.p=='maestro'?'Marca cada tarea al terminarla.':'Progreso de cada obra de un vistazo.'],['#alerts',st.p=='maestro'?'Solicitudes':'Requiere atención',st.p=='maestro'?'Aprueba o rechaza pedidos de material con un clic.':'Toca una alerta para ir directo al módulo.']])
  :[['#flowbar','¿Por qué existe?','Cada módulo explica para qué sirve y en qué paso del proceso interviene. Toca un paso para ver el flujo completo.'],['#mk','Resumen','Cifras clave del módulo.'],...(M[st.v].bi!=null?[['#bstrip','Bodegas por proyecto','Cada proyecto tiene sus bodegas. Toca una para ver solo su inventario y sus movimientos.']]:[]),['#exportBtn','Exportar','Descarga lo que ves, o solo lo seleccionado, a Excel.'],...(st.v=='migraciones'?[['#mg','Asistente de migración','4 pasos: origen, mapeo, validación e importación. Cada paso se puede revisar antes de continuar.']]:[]),['#newBtn','Crear registro','Abre un formulario organizado por secciones.'],['#tabs','Datos · Modelo · SQL','Cambia entre la tabla, los campos de la base de datos y el SQL generado.'],['#chips','Filtros rápidos','Filtra por estado con un clic.'],['#tblArea','Tabla','Ordena con los encabezados, selecciona filas y haz clic en una para ver su detalle.']];
 const S=[...V,...G].filter(s=>{const e=$(s[0]);return e&&e.offsetWidth>0}),o=document.createElement('div');let i=0;
 o.className='tour';o.innerHTML='<div class="hole"></div><div class="tip"><span class="tc"></span><b></b><p></p><div class="tf2"><div class="dots"></div><div class="bt"><button class="btn sm ghost" data-x>Salir</button><button class="btn sm alt" data-p>Atrás</button><button class="btn sm" data-n>Siguiente</button></div></div></div>';document.body.append(o);
 const hole=o.querySelector('.hole'),tip=o.querySelector('.tip'),$t=s=>tip.querySelector(s);
 function end(){o.remove();side(false);removeEventListener('keydown',kd);removeEventListener('resize',place)}
 function place(){const s=S[i],e=$(s[0]);if(!e)return;const r=e.getBoundingClientRect();Object.assign(hole.style,{top:r.top-6+'px',left:r.left-6+'px',width:r.width+12+'px',height:r.height+12+'px'});
  const th=tip.offsetHeight,tw=tip.offsetWidth;let y=r.bottom+16+th>innerHeight?r.top-th-16:r.bottom+16;if(y<10)y=Math.min(innerHeight-th-10,r.bottom+16);if(r.height>innerHeight*.6)y=innerHeight-th-14;
  tip.style.top=Math.max(10,y)+'px';tip.style.left=Math.max(10,Math.min(innerWidth-tw-10,r.left))+'px'}
 function show(){const s=S[i];side(innerWidth<=900&&s[0]=='#nav');const e=$(s[0]);e.scrollIntoView({block:'center',behavior:'auto'});$t('.tc').textContent=`Paso ${i+1} de ${S.length}`;$t('b').textContent=s[1];$t('p').textContent=s[2];
  $t('.dots').innerHTML=S.map((_,k)=>`<i class="${k==i?'on':''}"></i>`).join('');$t('[data-p]').style.visibility=i?'visible':'hidden';$t('[data-n]').textContent=i==S.length-1?'Finalizar':'Siguiente';setTimeout(place,innerWidth<=900&&s[0]=='#nav'?380:60)}
 const nx=()=>{i<S.length-1?(i++,show()):end()},pv=()=>{if(i){i--;show()}},kd=e=>{if(e.key=='Escape')end();if(e.key=='ArrowRight')nx();if(e.key=='ArrowLeft')pv()};
 tip.onclick=e=>{if(e.target.closest('[data-x]'))end();if(e.target.closest('[data-n]'))nx();if(e.target.closest('[data-p]'))pv()};addEventListener('keydown',kd);addEventListener('resize',place);show()}

/* El arranque (login, sesión y primer render) vive en extra.js */
