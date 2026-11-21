import { useCallback, useEffect, useRef, useState } from 'react';
import model from '../shared/model.js';
import { api, getSession, setSession, login } from './api.js';
import { Ic, Av, SC } from './ui.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Module from './components/Module.jsx';
import Procesos from './components/Procesos.jsx';
import { startTour } from './tour.js';

const TH = [['light', 'sun', 'Claro', 'Siempre claro'], ['dark', 'moon', 'Oscuro', 'Descansa la vista'], ['system', 'monitor', 'Sistema', 'Sigue tu dispositivo']];
const ls = {
  g: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  s: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignorar */ } }
};
const NOTIFS = [['alert', 'bd', 'Meta atrasada: Cimentación pila 3', 'Hace 2 h'], ['cart', 'wa', 'OC-2026-119 espera tu aprobación', 'Hace 3 h'], ['box', 'wa', 'Varilla 3/8" bajo el mínimo', 'Hoy 07:30'], ['migrate', 'in', 'Migración "inventario_2019" finalizó', 'Hoy 09:10']];

export default function App() {
  const [user, setUser] = useState(() => getSession()?.user || null);
  const [closing, setClosing] = useState(false);
  const [showLogin, setShowLogin] = useState(() => !getSession());
  const [view, setView] = useState({ v: 'dash', tab: 'd' });
  const [q, setQ] = useState('');
  const [mode, setMode] = useState(() => ls.g('pan_theme') || 'system');
  const [coll, setColl] = useState(() => ls.g('pan_coll') === '1');
  const [open, setOpen] = useState({});
  const [pop, setPop] = useState(null);
  const [side, setSide] = useState(false);
  const [toast, setToast] = useState(null);
  const [summary, setSummary] = useState({});
  const [welcome, setWelcome] = useState(false);
  const [flow, setFlow] = useState({ p: 'compra', s: 0, tab: 'f' });
  const searchRef = useRef(null);
  const perfil = user?.perfil || 'obrero';
  const acc = model.acc[perfil] || [];

  /* ---------- tema ---------- */
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme:dark)');
    const apply = () => { document.documentElement.dataset.t = mode === 'system' ? (mq.matches ? 'dark' : 'light') : mode; };
    apply(); ls.s('pan_theme', mode);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);
  useEffect(() => { document.body.classList.toggle('coll', coll); ls.s('pan_coll', coll ? '1' : '0'); }, [coll]);
  useEffect(() => { document.body.classList.toggle('enter', closing); }, [closing]);

  const notify = useCallback((msg, icon = 'check') => {
    setToast({ msg, icon, k: Date.now() });
  }, []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  /* ---------- sesión ---------- */
  const refreshSummary = useCallback(() => { if (getSession()) api('/summary').then(setSummary).catch(() => {}); }, []);
  useEffect(() => { if (user) refreshSummary(); }, [user, refreshSummary]);
  const logout = useCallback(() => {
    setSession(null); setUser(null); setSummary({}); setView({ v: 'dash', tab: 'd' }); setShowLogin(true); setClosing(false); setPop(null);
  }, []);
  useEffect(() => { window.addEventListener('pan:logout', logout); return () => window.removeEventListener('pan:logout', logout); }, [logout]);

  const onLogin = (u) => {
    setUser(u); setView({ v: 'dash', tab: 'd' }); setClosing(true);
    setTimeout(() => { setShowLogin(false); setClosing(false); }, 1250);
    setTimeout(() => { if (!ls.g('pan_welcome')) setWelcome(true); }, 1900);
    notify('Bienvenido, ' + u.nombre.split(' ')[0], 'user');
  };
  async function switchProfile(k) {
    setPop(null);
    try {
      const r = await login(model.email[k], 'panoramic');
      setSession({ token: r.token, user: r.user }); setUser(r.user); setView({ v: 'dash', tab: 'd' }); setSummary({});
      notify('Perfil: ' + model.prof[k].r, 'user');
    } catch (e) { notify(e.message, 'alert'); }
  }

  /* ---------- navegación ---------- */
  const go = useCallback((v, tab = 'd') => {
    setView({ v, tab }); setQ(''); setSide(false);
    const so = model.modules[v]?.sub; if (so) setOpen((o) => ({ ...o, [so]: true }));
    window.scrollTo({ top: 0 });
  }, []);
  const openFlow = (p, s) => { setFlow({ p, s, tab: 'f' }); go('procesos'); };

  useEffect(() => {
    const onDoc = (e) => { if (!e.target.closest('.pop')) setPop(null); };
    const onKey = (e) => {
      if (e.key === '/' && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'Escape') { setPop(null); setSide(false); }
    };
    document.addEventListener('click', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const attn = (key) => {
    const t = model.modules[key]?.table, s = summary[t];
    return s ? Object.entries(s.by).reduce((n, [st, c]) => n + (['wa', 'bd'].includes(SC(st)) ? c : 0), 0) : 0;
  };
  const mod = model.modules[view.v];
  const so = mod?.sub;

  const leaf = (k, sub) => (
    <button key={k} className={(view.v === k ? 'on ' : '') + (sub ? 'sb' : '')} title={model.modules[k].title} onClick={() => go(k)}>
      <Ic n={model.modules[k].icon} s={sub ? 16 : 18} /><span className="t">{model.modules[k].title}</span>
      {['compras', 'inventarios', 'bodega'].includes(k) && perfil !== 'obrero' && <span className="cnt">{attn(k)}</span>}
    </button>
  );

  const nav = (
    <nav id="nav">
      <button className={view.v === 'dash' ? 'on' : ''} title="Inicio" onClick={() => go('dash')}><Ic n="home" /><span className="t">Inicio</span></button>
      {Object.keys(model.nav).map((g) => {
        const items = model.nav[g].map((k) => {
          if (k[0] === '@') {
            const s = k.slice(1), kids = model.subs[s].k.filter((x) => acc.includes(x));
            if (!kids.length) return null;
            const isOpen = open[s] !== undefined ? open[s] : kids.includes(view.v);
            return (
              <div key={k}>
                <button className={'par ' + (isOpen ? 'open ' : '') + (kids.includes(view.v) ? 'has' : '')} title={model.subs[s].t} aria-expanded={!!isOpen}
                  onClick={() => setOpen((o) => ({ ...o, [s]: !isOpen }))}>
                  <Ic n={model.subs[s].i} /><span className="t">{model.subs[s].t}</span><Ic n="chev" s={14} />
                </button>
                <div className={'sublist ' + (isOpen ? 'open' : '')}><div>{kids.map((x) => leaf(x, true))}</div></div>
              </div>
            );
          }
          return acc.includes(k) ? leaf(k, false) : null;
        }).filter(Boolean);
        return items.length ? <div key={g}><div className="ng">{g}</div>{items}</div> : null;
      })}
    </nav>
  );

  const placeholder = view.v === 'dash' ? 'Ir a un módulo… (Enter)' : view.v === 'procesos' ? 'Buscar…' : view.tab === 'm' ? 'Buscar campo…' : 'Buscar en ' + (mod?.title || '').toLowerCase() + '…';
  const onSearchKey = (e) => {
    if (e.key === 'Enter' && view.v === 'dash' && q) {
      const k = acc.find((k) => model.modules[k].title.toLowerCase().includes(q.toLowerCase()));
      k ? go(k) : notify('No hay un módulo con ese nombre', 'search');
    }
  };

  const doTour = () => { setSide(false); setTimeout(() => startTour({ view, perfil, acc, setSide }), 50); };
  const mt = TH.find((t) => t[0] === mode);

  return (
    <>
      <aside id="side" className={side ? 'open' : ''} aria-label="Navegación principal">
        <div className="brand"><img src="/logo.jpg" alt="Logo" /><div className="lbl"><b>Panoramic</b><small>Gestión de obra</small></div></div>
        {nav}
        <div className="side-foot lbl"><span><Ic n="help" s={22} /></span><div><b>¿Primera vez?</b><small>Haz el recorrido guiado</small></div><button className="btn sm" onClick={doTour}>Iniciar</button></div>
      </aside>
      <div id="scrim" className={side ? 'on' : ''} onClick={() => setSide(false)} />

      <div className="main">
        <header className="top">
          <button className="ib" id="menu" onClick={() => setSide(true)} aria-label="Abrir menú"><Ic n="menu" /></button>
          <button className="ib" id="coll" onClick={() => setColl(!coll)} aria-label="Contraer menú"><Ic n="panel" /></button>
          <div className="crumbs" id="crumbs">Panoramic <Ic n="chev" s={14} /> {so && <>{model.subs[so].t} <Ic n="chev" s={14} /> </>}<b>{view.v === 'dash' ? 'Inicio' : mod?.title}</b></div>
          <label className="search" id="searchBox"><Ic n="search" s={16} />
            <input id="q" ref={searchRef} placeholder={placeholder} aria-label="Buscar" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onSearchKey} /><kbd>/</kbd></label>
          <div className="tools">
            <button className="ib" id="tourBtn" onClick={doTour} title="Tour guiado" aria-label="Tour guiado"><Ic n="help" /></button>
            <div className={'pop ' + (pop === 'bell' ? 'open' : '')}>
              <button className="ib" id="bellBtn" onClick={() => setPop(pop === 'bell' ? null : 'bell')} title="Notificaciones" aria-label="Notificaciones"><Ic n="bell" /><i className="dot" /></button>
              <div className="menu wide"><h4>Notificaciones</h4>{NOTIFS.map((n) => <div className="nt" key={n[2]}><span className="al" style={{ padding: 0, width: 'auto' }}><span className={'ai ' + n[1]}><Ic n={n[0]} s={16} /></span></span><div>{n[2]}<small>{n[3]}</small></div></div>)}</div>
            </div>
            <div className={'pop ' + (pop === 'theme' ? 'open' : '')}>
              <button className="ib" id="themeBtn" onClick={() => setPop(pop === 'theme' ? null : 'theme')} title="Apariencia" aria-label="Apariencia"><Ic n={mt[1]} /></button>
              <div className="menu"><h4>Apariencia</h4>{TH.map((t) => <button key={t[0]} className={t[0] === mode ? 'on' : ''} onClick={() => { setMode(t[0]); setPop(null); }}><Ic n={t[1]} /><div>{t[2]}<small>{t[3]}</small></div><span className="ck"><Ic n="check" s={16} /></span></button>)}</div>
            </div>
            <div className={'pop ' + (pop === 'prof' ? 'open' : '')}>
              <button className="who" id="profBtn" onClick={() => setPop(pop === 'prof' ? null : 'prof')} aria-label="Perfil">
                {user && <><Av n={user.nombre} /><div><b>{user.nombre.split(' ')[0]}</b><small>{model.prof[perfil]?.r}</small></div></>}</button>
              <div className="menu wide"><h4>Cambiar perfil (demo)</h4>
                {Object.keys(model.prof).map((k) => <button key={k} className={k === perfil ? 'on' : ''} onClick={() => k !== perfil && switchProfile(k)}><Av n={model.prof[k].n} /><div>{model.prof[k].r}<small>{model.prof[k].d}</small></div><span className="ck"><Ic n="check" s={16} /></span></button>)}
                <div className="sep" /><button onClick={logout}><Ic n="logout" /><div>Cerrar sesión<small>Volver a la pantalla de ingreso</small></div></button></div>
            </div>
          </div>
        </header>
        <main id="view">
          {user && view.v === 'dash' && <Dashboard user={user} perfil={perfil} acc={acc} go={go} />}
          {user && view.v === 'procesos' && <Procesos perfil={perfil} acc={acc} go={go} flow={flow} setFlow={setFlow} />}
          {user && view.v !== 'dash' && view.v !== 'procesos' && mod && (
            <Module key={view.v + '|' + perfil} mkey={view.v} tab={view.tab} setTab={(t) => setView({ ...view, tab: t })} q={q} setQ={setQ}
              perfil={perfil} user={user} notify={notify} refreshSummary={refreshSummary} go={go} openFlow={openFlow} />
          )}
        </main>
      </div>

      {welcome && (
        <div id="welcome" className="on"><b>Bienvenido a Panoramic</b>
          <p>¿Quieres un recorrido de 1 minuto por la interfaz? También puedes aprender cada proceso en <b>Procesos y capacitación</b>.</p>
          <div><button className="btn sm" onClick={() => { ls.s('pan_welcome', '1'); setWelcome(false); doTour(); }}><Ic n="help" s={14} />Iniciar recorrido</button>
            <button className="btn sm alt" onClick={() => { ls.s('pan_welcome', '1'); setWelcome(false); }}>Ahora no</button></div></div>
      )}
      <div id="toast" role="status" className={toast ? 'on' : ''}>{toast && <><Ic n={toast.icon} s={16} /><span>{toast.msg}</span></>}</div>
      {showLogin && <Login closing={closing} onDone={onLogin} onTheme={() => setMode(TH[(TH.findIndex((t) => t[0] === mode) + 1) % 3][0])} />}
    </>
  );
}
