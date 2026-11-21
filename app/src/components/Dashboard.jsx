import { useEffect, useState } from 'react';
import model from '../../shared/model.js';
import { api } from '../api.js';
import { Ic, nm } from '../ui.jsx';

const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
const today = () => { const s = new Date().toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long' }); return s[0].toUpperCase() + s.slice(1); };

// Número que sube animado
function Count({ to, suf = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches || to < 2) { setV(to); return; }
    let raf; const t0 = performance.now();
    const step = (n) => { const k = Math.max(0, Math.min(1, (n - t0) / 800)); setV(to * (1 - Math.pow(1 - k, 3))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [to]);
  return <b>{nm(Math.round(v))}{suf}</b>;
}

function Spark({ a }) {
  const mx = Math.max(...a), mn = Math.min(...a);
  const p = a.map((v, i) => `${i * (80 / (a.length - 1))},${24 - (v - mn) / (mx - mn || 1) * 22}`).join(' ');
  return <svg className="sk" width="80" height="26" viewBox="0 0 80 26"><polyline className="sp" pathLength="1" points={p} /></svg>;
}

const Kpi = ({ k, i }) => (
  <div className="card kpi" style={{ '--i': i }}>
    <span className="ki"><Ic n={k[3]} /></span><Count to={k[1]} suf={k[2]} /><span>{k[0]}</span>
    <span className={'tr ' + (k[5] ? 'bd' : '')}><Ic n={k[5] ? 'trendd' : 'trend'} s={14} />{k[4]}</span><Spark a={k[6]} />
  </div>
);

function Tasks({ list, pre, title, id, i }) {
  const [done, setDone] = useState(() => list.map((_, k) => k < pre));
  return (
    <div className="card" style={{ '--i': i }} id={id}>
      <h3><Ic n="check" />{title}<small className="mu" style={{ marginLeft: 'auto', fontWeight: 400 }}>{done.filter(Boolean).length} de {list.length} completadas</small></h3>
      {list.map((t, k) => (
        <button key={t[0]} className={'task ' + (done[k] ? 'done' : '')} onClick={() => setDone(done.map((d, j) => (j === k ? !d : d)))}>
          <span className="bx"><Ic n="check" s={14} /></span><span className="tt">{t[0]}</span><small>{t[1]}</small></button>
      ))}
    </div>
  );
}

const ALR = [['wa', 'box', 'Varilla 3/8" bajo el mínimo', '28 de 80 · Bodega Torre Z10', 'inventarios'], ['wa', 'cart', 'OC-2026-119 pendiente de aprobación', 'Q 112,300 · Acero Centro', 'compras'], ['bd', 'alert', 'Meta atrasada: Cimentación pila 3', 'PRY-005 · 14 días de retraso', 'metas'], ['in', 'tractor', 'Camión ACT-031 en revisión', 'Taller · mantenimiento', 'activos'], ['in', 'migrate', '11 errores por corregir en inventario_2019', 'Depuración y migraciones', 'migraciones']];
const Alerts = ({ acc, go, id }) => (
  <div className="card" style={{ '--i': 5 }} id={id}><h3><Ic n="bell" />Requiere atención</h3>
    {ALR.filter((a) => acc.includes(a[4])).map((a) => (
      <button key={a[2]} className="al" onClick={() => go(a[4])}><span className={'ai ' + a[0]}><Ic n={a[1]} s={17} /></span><span><b>{a[2]}</b><small>{a[3]}</small></span></button>))}
  </div>
);

function Progress({ acc, go, id }) {
  const [rows, setRows] = useState(null);
  useEffect(() => { if (acc.includes('proyectos')) api('/proyectos').then((r) => setRows(r.data)).catch(() => setRows([])); }, [acc]);
  const list = (rows || []).filter((r) => r.estado !== 'Completado').slice(0, 5);
  return (
    <div className="card" style={{ '--i': 4 }} id={id}>
      <h3><Ic n="building" />Avance por proyecto<button className="link" onClick={() => go('proyectos')}>Ver todos <Ic n="chev" s={14} /></button></h3>
      {rows === null && <p className="mu">Cargando desde la base de datos…</p>}
      {list.map((r) => { const [a, b] = String(r.proyecto).split('|'); return (
        <div className="pr" key={r.id}><div><b>{a}</b><small>{(b || '').split(' · ')[0]} · {r.maestro_de_obra}</small></div>
          <div className={'meter ' + (r.estado === 'Atrasado' ? 'bd' : '')}><u style={{ '--w': r.avance + '%' }} /></div><b className="num">{r.avance}%</b></div>); })}
    </div>
  );
}

function Approvals() {
  const [items, setItems] = useState([['Block 15x20x40 · 500 u', 'Esteban Coy · Los Cedros'], ['Cemento 42.5 kg · 60 sacos', 'Esteban Coy · Los Cedros'], ['Cable THHN #12 · 4 rollos', 'Mario Chen · Torre Z10']]);
  return (
    <div className="card" style={{ '--i': 5 }} id="alerts"><h3><Ic n="hand" />Solicitudes por aprobar</h3>
      {items.length === 0 && <p className="mu">No hay solicitudes pendientes.</p>}
      {items.map((s) => (
        <div className="apr" key={s[0]}><div><b>{s[0]}</b><small>{s[1]}</small></div>
          <button className="btn sm alt" onClick={() => setItems(items.filter((x) => x !== s))} aria-label="Rechazar"><Ic n="close" s={14} /></button>
          <button className="btn sm" onClick={() => setItems(items.filter((x) => x !== s))}><Ic n="check" s={14} />Aprobar</button></div>))}
    </div>
  );
}

export default function Dashboard({ user, perfil, acc, go }) {
  const first = user.nombre.split(' ')[0];
  if (perfil === 'obrero') return (
    <>
      <div className="fade"><h1>Hola, {first}</h1><p className="sub">¿Qué necesitas hacer hoy?</p></div>
      <div className="grid" id="bigs" style={{ marginTop: 20, gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))' }}>
        {[['warehouse', 'Pedir material', 'Solicita lo que necesitas', 'bodega'], ['target', 'Mis tareas', 'Lo que toca hoy', 'metas'], ['box', 'Consultar inventario', '¿Hay material?', 'inventarios'], ['flow', 'Cómo se hace', 'Aprende el proceso paso a paso', 'procesos']].map((x, i) => (
          <button key={x[1]} className="big" style={{ '--i': i }} onClick={() => go(x[3])}><span className="bi"><Ic n={x[0]} s={30} /></span>{x[1]}<small>{x[2]}</small></button>))}
      </div>
      <div className="two">
        <Tasks id="jornada" i={3} title="Mi jornada de hoy" pre={1} list={[['Armar columnas · eje C', '7:00'], ['Mover 200 blocks a nivel 4', '10:00'], ['Limpieza de frente de trabajo', '15:30']]} />
        <div className="card" style={{ '--i': 4 }}><h3><Ic n="clock" />Resumen</h3><div className="tl"><div><b>Entrada registrada</b><small>6:55 a. m. · Torre Z10</small></div><div><b>Material entregado</b><small>40 sacos de cemento · 20 nov</small></div><div><b>Capacitación de seguridad</b><small>Pendiente esta semana</small></div></div></div>
      </div>
    </>
  );

  const m = perfil === 'maestro';
  const K = m
    ? [['Tareas de hoy', 5, '', 'check', '2 completadas', 0, [1, 3, 2, 4, 3, 5]], ['Personal presente', 42, ' / 48', 'users', 'Asistencia 88 %', 0, [38, 40, 41, 39, 42, 42]], ['Solicitudes por aprobar', 3, '', 'hand', '1 urgente', 1, [1, 2, 2, 3, 4, 3]], ['Materiales críticos', 3, '', 'box', 'En tus proyectos', 1, [1, 1, 2, 2, 3, 3]]]
    : [['Proyectos activos', 6, '', 'building', '+1 este mes', 0, [3, 4, 4, 5, 5, 6]], ['Presupuesto ejecutado', 68, '%', 'chart', '+4 pts vs. mes anterior', 0, [40, 48, 52, 58, 64, 68]], ['Materiales en stock crítico', 12, '', 'box', '3 nuevos hoy', 1, [6, 7, 9, 9, 11, 12]], ['Personal en obra', 148, '', 'hardhat', '+9 esta semana', 0, [120, 128, 131, 139, 142, 148]]];
  const hero = (
    <div className="hero fade"><div style={{ position: 'relative', zIndex: 1 }}><h1>{greet()}, {first}</h1><p>{today()} · {m ? 'Panel del Maestro de Obra' : 'Panel administrativo'}</p></div>
      <div className="hs">{m
        ? <><button className="btn" onClick={() => go('bodega')}><Ic n="warehouse" s={16} />Bodega</button><button className="btn" onClick={() => go('metas')}><Ic n="target" s={16} />Metas</button></>
        : <><button className="btn" onClick={() => go('compras')}><Ic n="cart" s={16} />Compras</button><button className="btn" onClick={() => go('reportes')}><Ic n="chart" s={16} />Reportes</button></>}</div></div>
  );
  const grid = <div className="grid" id="kp">{K.map((k, i) => <Kpi key={k[0]} k={k} i={i} />)}</div>;

  if (m) return (
    <>{hero}{grid}
      <div className="two">
        <Tasks id="avc" i={4} title="Tareas del día" pre={2} list={[['Revisar armado de columnas · Nivel 5', '07:30'], ['Recibir 400 sacos de cemento', '09:00'], ['Charla de seguridad (5 min)', '10:30'], ['Medir avance de fundición', '14:00'], ['Firmar vales de bodega', '16:30']]} />
        <Approvals />
      </div>
      <div className="two" style={{ gridTemplateColumns: '1fr 1fr' }}><Progress acc={acc} go={go} /><Alerts acc={acc} go={go} /></div>
    </>
  );

  const mo = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'], pl = [40, 52, 60, 66, 72, 80], re = [38, 50, 57, 70, 69, 74];
  return (
    <>{hero}{grid}
      <div className="two"><Progress id="avc" acc={acc} go={go} /><Alerts id="alerts" acc={acc} go={go} /></div>
      <div className="two">
        <div className="card" style={{ '--i': 6 }}><h3><Ic n="chart" />Gasto mensual<small className="mu" style={{ marginLeft: 'auto', fontWeight: 400 }}>Q millones</small></h3>
          <div className="lg"><span><i style={{ background: 'var(--ln)' }} />Planificado</span><span><i style={{ background: 'var(--ac)' }} />Real</span></div>
          <div className="chart">{mo.map((x, i) => <div className="col" key={x}><div className="bars"><i style={{ '--h': pl[i] + '%', '--d': i }} title={'Plan ' + pl[i] / 10} /><i style={{ '--h': re[i] + '%', '--d': i }} title={'Real ' + re[i] / 10} /></div></div>)}</div>
          <div className="chart-l">{mo.map((x) => <div key={x}>{x}</div>)}</div></div>
        <div className="card" style={{ '--i': 7 }}><h3><Ic n="bank" />Presupuesto global</h3>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="ringw"><svg className="ring" width="124" height="124" viewBox="0 0 42 42"><circle className="bg" cx="21" cy="21" r="15.9" pathLength="100" /><circle className="fg" cx="21" cy="21" r="15.9" pathLength="100" style={{ '--v': 68 }} /></svg><b>68%</b></div>
            <div style={{ flex: 1, minWidth: 140 }}>{[['Ejecutado', 'Q 28.0 M'], ['Comprometido', 'Q 6.4 M'], ['Disponible', 'Q 6.7 M']].map((r) => <div className="pr" key={r[0]} style={{ gridTemplateColumns: '1fr auto' }}><span className="mu">{r[0]}</span><b>{r[1]}</b></div>)}</div></div></div>
      </div>
      <div className="two" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card" style={{ '--i': 8 }}><h3><Ic n="clock" />Actividad reciente</h3><div className="tl"><div><b>Ana aprobó OC-2026-118</b><small>Hace 40 min · Compras</small></div><div><b>Julio registró entrada de 200 varillas</b><small>Ayer 16:20 · Bodega</small></div><div><b>Sofía cerró asiento A-0348</b><small>Ayer 15:02 · Contabilidad</small></div><div><b>Importación inventario_2019 completada</b><small>Hoy 09:10 · Migraciones</small></div></div></div>
        <div className="card" style={{ '--i': 9 }}><h3><Ic n="spark" />Accesos rápidos</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: 0 }}>
            {['compras', 'bodega', 'cxp', 'femi', 'procesos', 'reportes'].map((k) => <button key={k} className="al" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid var(--ln)' }} onClick={() => go(k)}><span className="ai in"><Ic n={model.modules[k].icon} s={18} /></span><b style={{ fontSize: 12.5 }}>{model.modules[k].title}</b></button>)}</div></div>
      </div>
    </>
  );
}
