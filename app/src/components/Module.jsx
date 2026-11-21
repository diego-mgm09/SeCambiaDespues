import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import model from '../../shared/model.js';
import { api } from '../api.js';
import { Ic, Av, Cell, NUMT, SC, Q, nm, sortKey } from '../ui.jsx';
import Migraciones from './Migraciones.jsx';

const { flows: FLOWS, why: WHY, norm: NORM, bod: BOD, binfo: BINFO } = model;
const PER = 6;
const MODFL = {};
Object.keys(FLOWS).forEach((f) => FLOWS[f].steps.forEach((s, i) => { if (s.m && !MODFL[s.m]) MODFL[s.m] = [f, i]; }));

/* ---------- por qué + mini flujo ---------- */
function FlowBar({ k, openFlow }) {
  const w = WHY[k]; if (!w) return null;
  const r = MODFL[k], nr = NORM[k], F = r && FLOWS[r[0]];
  return (
    <div className="why card" id="flowbar" style={{ animationDelay: '0s' }}>
      <div className="wy"><span className="wi"><Ic n="info" s={18} /></span>
        <div><b>¿Por qué existe este módulo?</b><p>{w}</p>{nr && <div className="nr"><Ic n="book" s={14} /><span>Base normativa: {nr}</span></div>}</div></div>
      {F && <div className="fb"><div className="fbt"><Ic n="flow" s={15} />Proceso: <b>{F.t}</b></div>
        <div className="fbs">{F.steps.map((s, i) => <button key={s.t} className={'fs1 ' + (i === r[1] ? 'on' : '')} title={s.t + ' · ' + s.a} onClick={() => openFlow(r[0], i)}><i>{i + 1}</i>{s.t}</button>)}</div></div>}
    </div>
  );
}

/* ---------- bodegas por proyecto ---------- */
function BodStrip({ perfil, bod, setBod, inv, mov }) {
  const ro = perfil === 'obrero';
  const stats = (n) => {
    const it = inv.filter((r) => r.bodega === n);
    return { items: it.length, val: it.reduce((s, r) => s + parseFloat(r.existencia) * (r.costo_prom || 0), 0), mov: mov.filter((r) => String(r.bodega).includes(n)).length };
  };
  const all = BOD.map((n) => ({ n, ...stats(n) }));
  return (
    <div className="bstrip" id="bstrip">
      <button className={'bc ' + (bod ? '' : 'on')} onClick={() => setBod('')}><span className="bt">{all.length} bodegas</span><b>Todas</b><small>{all.reduce((s, b) => s + b.items, 0)} ítems · {all.reduce((s, b) => s + b.mov, 0)} mov.</small></button>
      {all.map((b) => (
        <button key={b.n} className={'bc ' + (bod === b.n ? 'on' : '')} onClick={() => setBod(b.n)}><span className="bt">{BINFO[b.n][0]} · {BINFO[b.n][1]}</span><b>{b.n}</b>
          <small>{b.items} ítems · {ro ? '' : Q(Math.round(b.val)) + ' · '}{b.mov} mov.</small></button>))}
    </div>
  );
}

/* ---------- formulario (crear / editar / solicitar) ---------- */
function FormModal({ m, mode, row, rows, user, onClose, onSave }) {
  const [vals, setVals] = useState(() => {
    const v = {};
    m.cols.forEach((c) => {
      const x = row ? row[c.k] : undefined;
      if (c.t === 'p' || c.t === 'x') { const [a, b] = String(x ?? '').split('|'); v[c.k + '__a'] = a || ''; v[c.k + '__b'] = b || ''; }
      else v[c.k] = x ?? '';
    });
    m.extras.forEach((e) => { v[e.k] = row?.[e.k] ?? (e.base === 'bool' ? true : ''); });
    if (mode === 'req') Object.assign(v, { material: '', cantidad: '', bodega: '' });
    return v;
  });
  const [errs, setErrs] = useState({});
  const [busy, setBusy] = useState(false);
  const [more, setMore] = useState(false);
  const [lk, setLk] = useState({});
  const set = (k, x) => setVals((p) => ({ ...p, [k]: x }));

  useEffect(() => {
    if (!more) return;
    [...new Set(m.extras.filter((e) => e.fk).map((e) => e.fk))].forEach((fk) => {
      const t = model.modules[fk]?.table; if (!t) return;
      api('/' + t + '?limit=30').then((r) => setLk((p) => ({ ...p, [fk]: r.data.map((d) => String(d[model.modules[fk].cols[0].k]).split('|')[0]) }))).catch(() => {});
    });
  }, [more, m]);

  const statuses = useMemo(() => [...new Set([...rows.map((r) => r[m.cols.find((c) => c.t === 's')?.k]).filter(Boolean), 'Activo', 'Pendiente', 'Inactivo'])], [rows, m]);

  async function submit(e) {
    e.preventDefault(); setBusy(true); setErrs({});
    let body = {};
    if (mode === 'req') {
      body = { fecha: 'Hoy', movimiento: 'Salida', material: vals.material, cantidad: vals.cantidad, bodega: vals.bodega, proyecto: BINFO[vals.bodega]?.[1] || '', solicito: user.nombre };
    } else {
      m.cols.forEach((c) => {
        if (c.t === 'p' || c.t === 'x') { const a = vals[c.k + '__a'], b = vals[c.k + '__b']; body[c.k] = a ? (b ? a + '|' + b : a) : ''; }
        else body[c.k] = vals[c.k];
      });
      m.extras.forEach((x) => { if (vals[x.k] !== '' && vals[x.k] !== undefined) body[x.k] = vals[x.k]; });
      if (mode === 'edit') body.version = row.version;
    }
    try { await onSave(body); }
    catch (x) { setErrs(x.fields || { _: x.message }); setBusy(false); }
  }

  const err = (k) => errs[k] && <small style={{ color: 'var(--bd)' }}>{errs[k]}</small>;
  const colInput = (c, i) => {
    const lab = <label>{c.l}{i === 0 && <i> *</i>}</label>;
    if (c.t === 'p' || c.t === 'x') return <div key={c.k}>{lab}<input value={vals[c.k + '__a']} onChange={(e) => set(c.k + '__a', e.target.value)} placeholder={c.t === 'p' ? 'Nombre' : 'Principal'} /><input style={{ marginTop: 6 }} value={vals[c.k + '__b']} onChange={(e) => set(c.k + '__b', e.target.value)} placeholder="Detalle (opcional)" />{err(c.k)}</div>;
    if (c.t === 's') return <div key={c.k}>{lab}<select value={vals[c.k]} onChange={(e) => set(c.k, e.target.value)}><option value="">Seleccionar…</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select>{err(c.k)}</div>;
    const ty = ['n', 'm', 'mv', 'b', 'r'].includes(c.t) ? 'number' : 'text';
    return <div key={c.k}>{lab}<input type={ty} step="any" value={vals[c.k]} onChange={(e) => set(c.k, e.target.value)} placeholder={c.t === 'k' ? 'existencia/mínimo · 340/120' : c.t === 'd' ? 'ej. 18 nov' : ''} />{err(c.k)}</div>;
  };
  const extraInput = (e) => {
    const lab = <label>{e.k.replace(/_/g, ' ')}</label>, h = e.desc && <small>{e.desc}</small>;
    if (e.base === 'bool') return <div key={e.k}><label>{e.k.replace(/_/g, ' ')}</label><label className="sw"><input type="checkbox" checked={!!vals[e.k]} onChange={(x) => set(e.k, x.target.checked)} /><i /></label>{h}</div>;
    if (e.base === 'enum') return <div key={e.k}>{lab}<select value={vals[e.k]} onChange={(x) => set(e.k, x.target.value)}><option value="">—</option>{e.en.map((o) => <option key={o} value={o}>{o.replace(/_/g, ' ')}</option>)}</select>{err(e.k)}{h}</div>;
    if (e.fk) return <div key={e.k}>{lab}<input list={'dl-' + e.k} value={vals[e.k]} onChange={(x) => set(e.k, x.target.value)} placeholder={e.fk} /><datalist id={'dl-' + e.k}>{(lk[e.fk] || []).map((o) => <option key={o} value={o} />)}</datalist>{h}</div>;
    const ty = { date: 'date', datetime: 'datetime-local', int: 'number', decimal: 'number' }[e.base] || 'text';
    return <div key={e.k}>{lab}<input type={ty} step={e.base === 'decimal' ? '0.01' : undefined} value={vals[e.k]} onChange={(x) => set(e.k, x.target.value)} placeholder={e.base === 'json' ? '{ }' : ''} />{err(e.k)}{h}</div>;
  };

  return (
    <div className="mod" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit}>
        <div className="mh"><span className="mico" style={{ margin: 0 }}><Ic n={mode === 'req' ? 'warehouse' : m.icon} s={19} /></span>
          <h2>{mode === 'req' ? 'Solicitar material' : (mode === 'edit' ? 'Editar · ' : 'Nuevo · ') + m.title}</h2>
          <button type="button" className="ib" onClick={onClose} style={{ marginLeft: 'auto' }}><Ic n="close" /></button></div>
        <div className="mb">
          {errs._ && <div className="hint" style={{ color: 'var(--bd)' }}><Ic n="alert" s={18} /><span>{errs._}</span></div>}
          {mode === 'req' ? (
            <div className="ff">
              <div><label>Material <i>*</i></label><input value={vals.material} onChange={(e) => set('material', e.target.value)} placeholder="Ej. Cemento 42.5 kg" />{err('material')}</div>
              <div><label>Cantidad <i>*</i></label><input type="number" min="1" value={vals.cantidad} onChange={(e) => set('cantidad', e.target.value)} />{err('cantidad')}</div>
              <div><label>Bodega <i>*</i></label><select value={vals.bodega} onChange={(e) => set('bodega', e.target.value)}><option value="">Seleccionar…</option>{BOD.map((b) => <option key={b}>{b}</option>)}</select>{err('bodega')}</div>
            </div>
          ) : (
            <>
              <div className="fs">Datos principales</div><div className="ff">{m.cols.map(colInput)}</div>
              {m.extras.length > 0 && <>
                <button type="button" className="btn sm alt" style={{ margin: '16px 0 4px' }} onClick={() => setMore(!more)}><Ic n={more ? 'chev' : 'chev'} s={14} />{more ? 'Ocultar ficha completa' : `Ficha completa (${m.extras.length} campos opcionales)`}</button>
                {more && <div className="ff" style={{ marginTop: 10 }}>{m.extras.map(extraInput)}</div>}</>}
            </>
          )}
        </div>
        <div className="mf"><button type="button" className="btn alt" onClick={onClose}>Cancelar</button><button className="btn" disabled={busy}><Ic n="check" s={16} />{busy ? 'Guardando…' : mode === 'req' ? 'Enviar solicitud' : 'Guardar'}</button></div>
      </form>
    </div>
  );
}

/* ---------- detalle lateral ---------- */
function Drawer({ m, row, perfil, canWrite, onClose, onEdit, onDup, onArchive }) {
  const [sure, setSure] = useState(false);
  useEffect(() => setSure(false), [row]);
  const cs = m.cols.map((c, k) => ({ ...c, k2: k })).filter((c) => !(perfil === 'obrero' && (c.t === 'm' || c.t === 'mv')));
  const [first, sub] = row ? String(row[m.cols[0].k]).split('|') : ['', ''];
  const fmt = (d) => d ? new Date(d).toLocaleString('es-GT', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
  return (
    <>
      <div id="dscrim" className={row ? 'on' : ''} onClick={onClose} />
      <aside id="drawer" className={row ? 'on' : ''} aria-label="Detalle">
        {row && <>
          <div className="dh">{m.cols[0].t === 'p' ? <Av n={first} /> : <span className="mico" style={{ margin: 0 }}><Ic n={m.icon} s={19} /></span>}
            <div><h2>{first}</h2><p className="sub" style={{ margin: '2px 0 0' }}>{sub || m.title}</p></div>
            <button className="ib x" onClick={onClose} aria-label="Cerrar"><Ic n="close" /></button></div>
          <div className="db"><h4>Información</h4>
            <dl className="dl">{cs.slice(1).map((c) => <Fragment key={c.k}><dt>{c.l}</dt><dd><Cell v={row[c.k]} t={c.t} /></dd></Fragment>)}</dl>
            <h4>Historial</h4>
            <div className="tl"><div><b>Consultado por ti</b><small>Ahora</small></div>
              {row.version > 1 && <div><b>Actualizado por {row.actualizado_por}</b><small>{fmt(row.actualizado_en)} · versión {row.version}</small></div>}
              <div><b>Creado por {row.creado_por}</b><small>{fmt(row.creado_en)}</small></div></div></div>
          <div className="df">{canWrite ? <>
            <button className="btn" onClick={onEdit}><Ic n="edit" s={15} />Editar</button>
            <button className="btn alt" onClick={onDup}><Ic n="copy" s={15} />Duplicar</button>
            {sure ? <button className="btn" style={{ background: 'var(--bd)', borderColor: 'var(--bd)', color: '#fff' }} onClick={onArchive}><Ic n="archive" s={15} />Confirmar archivo</button>
              : <button className="btn alt" onClick={() => setSure(true)}><Ic n="archive" s={15} />Archivar</button>}</>
            : <button className="btn alt" onClick={onClose}>Cerrar</button>}</div></>}
      </aside>
    </>
  );
}

/* ---------- pestañas de modelo y JSON (solo administrativo) ---------- */
function ModelTab({ m, q }) {
  const extras = m.extras.filter((e) => !q || (e.k + ' ' + e.desc + ' ' + e.base).toLowerCase().includes(q.toLowerCase()));
  const cols = m.cols.filter((c) => !q || (c.k + c.l).toLowerCase().includes(q.toLowerCase()));
  const rel = [...new Set(m.extras.filter((e) => e.fk && e.fk !== m.key).map((e) => e.fk))];
  return (
    <>
      <div className="chipsrow fade"><span className="tag">{m.cols.length} columnas visibles</span><span className="tag">{m.extras.length} campos de ficha</span><span className="tag">{m.extras.filter((e) => e.fk).length} referencias</span><span className="tag">{m.extras.filter((e) => !e.nullable && e.base !== 'bool').length} obligatorios en el modelo</span>
        {rel.length > 0 && <><span className="mu" style={{ marginLeft: 6 }}>Relaciones:</span>{rel.map((r) => <span key={r} className="chip"><Ic n="link" s={13} />{r}</span>)}</>}</div>
      <div className="hint"><Ic n="help" s={18} /><span>Cada registro se guarda como un <b>documento de MongoDB</b> en la colección <b>{m.table}</b>. Las columnas visibles son los campos principales; la ficha completa agrega el resto del modelo. Todos llevan auditoría: creado_en/por, actualizado_en/por, eliminado_en (borrado lógico) y version.</span></div>
      <div className="tw"><table><thead><tr><th>Campo</th><th>Tipo</th><th>Origen</th><th>Descripción</th></tr></thead><tbody>
        {cols.map((c) => <tr key={c.k} style={{ cursor: 'default' }}><td><b className="ty">{c.k}</b></td><td><span className="ty">{c.t}</span></td><td><span className="k pk">COLUMNA</span></td><td className="mu">{c.l}</td></tr>)}
        {extras.map((e, i) => <tr key={e.k} style={{ cursor: 'default', '--i': Math.min(i, 12) }}><td><b className="ty">{e.k}</b></td><td><span className="ty">{e.base}{e.en ? `(${e.en.join(' | ')})` : ''}</span></td>
          <td>{e.fk && <span className="k fk">REF → {e.fk}</span>}{e.unique && <span className="k uq">ÚNICO</span>}{e.nullable ? <span className="k nl">OPCIONAL</span> : <span className="k nl" style={{ opacity: .55 }}>REQUERIDO</span>}</td><td className="mu" style={{ whiteSpace: 'normal', minWidth: 220 }}>{e.desc}</td></tr>)}
      </tbody></table></div>
    </>
  );
}
function JsonTab({ m, rows }) {
  const sample = rows[0] ? { ...rows[0] } : Object.fromEntries(m.cols.map((c) => [c.k, null]));
  const txt = JSON.stringify(sample, null, 2);
  return (
    <div className="sql fade"><button className="btn sm alt cp" onClick={() => navigator.clipboard?.writeText(txt)}><Ic n="copy" s={14} />Copiar</button>
      <pre>{`// Colección "${m.table}" — documento de ejemplo\n` + txt}</pre></div>
  );
}

/* ---------- módulo ---------- */
export default function Module({ mkey, tab, setTab, q, setQ, perfil, user, notify, refreshSummary, go, openFlow }) {
  const m = model.modules[mkey];
  const ro = perfil === 'obrero', adm = perfil === 'admin';
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [f, setF] = useState('');
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState(new Set());
  const [bod, setBod] = useState('');
  const [drawer, setDrawer] = useState(null);
  const [form, setForm] = useState(null);
  const [side, setSide] = useState({ inv: [], mov: [] });
  const canWrite = !ro;
  const canNew = mkey !== 'migraciones' && (canWrite || mkey === 'bodega');

  const load = useCallback(async () => {
    try { const r = await api('/' + m.table + '?limit=500'); setRows(r.data); setError(''); }
    catch (e) { setError(e.message); setRows([]); }
  }, [m.table]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (m.bi == null) return;
    Promise.all([api('/inventarios?limit=500'), api('/movimientos_bodega?limit=500')]).then(([a, b]) => setSide({ inv: a.data, mov: b.data })).catch(() => {});
  }, [m.bi, rows]);

  const cols = m.cols.filter((c) => !(ro && NUMT.includes(c.t) && c.t !== 'n'));
  const si = m.cols.findIndex((c) => c.t === 's'), sk = si >= 0 ? m.cols[si].k : null;
  const bk = m.bi != null ? m.cols[m.bi].k : null;
  const data = rows || [];
  const view = useMemo(() => {
    let r = data;
    if (q) r = r.filter((x) => m.cols.map((c) => x[c.k]).join(' ').toLowerCase().includes(q.toLowerCase()));
    if (f && sk) r = r.filter((x) => x[sk] === f);
    if (bod && bk) r = r.filter((x) => String(x[bk]).includes(bod));
    if (sort) { const c = m.cols.find((c) => c.k === sort.k); r = [...r].sort((a, b) => { const x = sortKey(a[c.k], c.t), y = sortKey(b[c.k], c.t); return (x > y ? 1 : x < y ? -1 : 0) * sort.d; }); }
    return r;
  }, [data, q, f, bod, sort, m, sk, bk]);
  useEffect(() => setPage(0), [q, f, bod, sort]);

  const pages = Math.max(1, Math.ceil(view.length / PER));
  const pg = view.slice(Math.min(page, pages - 1) * PER, Math.min(page, pages - 1) * PER + PER);
  const ok = sk ? data.filter((r) => SC(r[sk]) === 'ok').length : 0;
  const at = sk ? data.filter((r) => ['wa', 'bd'].includes(SC(r[sk]))).length : 0;
  const kp = m.kp ? m.kp : [['Registros', data.length], ['Al día', ok], ['Por revisar', at], ...(ro || !m.ex ? [] : [[m.ex[0], m.ex[1]]])];
  const allSel = pg.length > 0 && pg.every((r) => sel.has(r.id));

  async function save(body) {
    if (form.mode === 'edit') await api('/' + m.table + '/' + form.row.id, { method: 'PATCH', body });
    else await api('/' + m.table, { method: 'POST', body });
    const wasReq = form.mode === 'req';
    setForm(null); setDrawer(null); await load(); refreshSummary();
    notify(wasReq ? 'Solicitud enviada: queda pendiente de autorización' : 'Guardado en la base de datos');
  }
  async function archive() {
    try { await api('/' + m.table + '/' + drawer.id, { method: 'DELETE' }); setDrawer(null); await load(); refreshSummary(); notify('Registro archivado', 'archive'); }
    catch (e) { notify(e.message, 'alert'); }
  }
  async function duplicate() {
    const body = {}; m.cols.forEach((c) => { body[c.k] = drawer[c.k]; }); m.extras.forEach((e) => { if (drawer[e.k] != null) body[e.k] = drawer[e.k]; });
    try { await api('/' + m.table, { method: 'POST', body }); setDrawer(null); await load(); refreshSummary(); notify('Registro duplicado', 'copy'); }
    catch (e) { notify(e.message, 'alert'); }
  }
  function exportCsv() {
    const list = sel.size ? view.filter((r) => sel.has(r.id)) : view;
    const csv = [cols.map((c) => c.l), ...list.map((r) => cols.map((c) => r[c.k]))].map((l) => l.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })); a.download = m.table + '.csv'; a.click();
    notify(`Exportadas ${list.length} filas a CSV`, 'download');
  }

  const statuses = sk ? [...new Set(data.map((r) => r[sk]))] : [];

  return (
    <>
      <div className="head fade"><div style={{ display: 'flex', alignItems: 'center' }}><span className="mico"><Ic n={m.icon} s={20} /></span><div><h1>{m.title}</h1><p className="sub">{m.desc}</p></div></div>
        <div className="acts"><button className="btn alt" id="exportBtn" onClick={exportCsv}><Ic n="download" s={16} />Exportar</button>
          {canNew && <button className="btn" id="newBtn" onClick={() => setForm({ mode: ro ? 'req' : 'new' })}><Ic n="plus" s={16} />{ro ? 'Solicitar material' : 'Nuevo'}</button>}</div></div>
      <div className="mk fade" id="mk" style={ro ? { gridTemplateColumns: 'repeat(3,1fr)' } : undefined}>
        {kp.map((k, i) => <div className="card" style={{ '--i': i }} key={k[0]}><span>{k[0]}</span><b>{typeof k[1] === 'number' ? nm(k[1]) : k[1]}</b></div>)}</div>
      <FlowBar k={mkey} openFlow={openFlow} />
      {adm && <div className="tabs" id="tabs">{[['d', 'Datos', 'table'], ['m', 'Modelo de datos', 'layers'], ['s', 'JSON', 'code']].map((t) => <button key={t[0]} className={tab === t[0] ? 'on' : ''} onClick={() => { setTab(t[0]); setQ(''); }}><Ic n={t[2]} s={16} />{t[1]}</button>)}</div>}

      {adm && tab === 'm' && <ModelTab m={m} q={q} />}
      {adm && tab === 's' && <JsonTab m={m} rows={data} />}
      {(!adm || tab === 'd') && (
        <>
          {mkey === 'migraciones' && <Migraciones notify={notify} go={go} onImported={load} />}
          {m.bi != null && <BodStrip perfil={perfil} bod={bod} setBod={setBod} inv={side.inv} mov={side.mov} />}
          <div id="chips" className="bar">{sk && <div className="chips">{[['', 'Todos', data.length], ...statuses.map((x) => [x, x, data.filter((r) => r[sk] === x).length])].map((c) => <button key={c[0]} className={'chip ' + (f === c[0] ? 'on' : '')} onClick={() => setF(c[0])}>{c[1]}<em>{c[2]}</em></button>)}</div>}</div>
          <div id="tblArea">
            {error && <div className="hint" style={{ color: 'var(--bd)' }}><Ic n="alert" s={18} /><span>{error}</span><button className="btn sm alt" onClick={load}>Reintentar</button></div>}
            {rows === null && <div className="tw"><div className="empty"><Ic n="loader" s={30} /><b>Cargando desde la base de datos…</b></div></div>}
            {sel.size > 0 && <div className="bulk"><Ic n="check" s={16} /><b>{sel.size} seleccionado{sel.size > 1 ? 's' : ''}</b><span style={{ flex: 1 }} /><button className="btn sm" onClick={exportCsv}><Ic n="download" s={14} />Exportar</button><button className="btn sm" onClick={() => setSel(new Set())}><Ic n="close" s={14} />Limpiar</button></div>}
            {rows !== null && (view.length ? <>
              <div className="tw"><table>
                <thead><tr>{!ro && <th className="ck"><input type="checkbox" checked={allSel} onChange={(e) => setSel((s) => { const n = new Set(s); pg.forEach((r) => (e.target.checked ? n.add(r.id) : n.delete(r.id))); return n; })} aria-label="Seleccionar todo" /></th>}
                  {cols.map((c) => { const on = sort?.k === c.k; return <th key={c.k} className={'s ' + (on ? 'on ' : '') + (NUMT.includes(c.t) ? 'r' : '')} onClick={() => setSort(on ? (sort.d === 1 ? { k: c.k, d: -1 } : null) : { k: c.k, d: 1 })}>{c.l}<Ic n={on ? (sort.d > 0 ? 'up' : 'down') : 'sort'} s={13} /></th>; })}<th /></tr></thead>
                <tbody>{pg.map((r, n) => (
                  <tr key={r.id} className={sel.has(r.id) ? 'sel' : ''} style={{ '--i': n }} onClick={() => setDrawer(r)}>
                    {!ro && <td className="ck" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={sel.has(r.id)} onChange={(e) => setSel((s) => { const x = new Set(s); e.target.checked ? x.add(r.id) : x.delete(r.id); return x; })} aria-label="Seleccionar" /></td>}
                    {cols.map((c) => <td key={c.k} className={NUMT.includes(c.t) ? 'r' : ''}><Cell v={r[c.k]} t={c.t} /></td>)}<td className="go"><Ic n="chev" s={16} /></td></tr>))}</tbody></table></div>
              <div className="tf"><span>Mostrando {Math.min(page, pages - 1) * PER + 1}–{Math.min(view.length, Math.min(page, pages - 1) * PER + PER)} de {view.length}</span>
                <div className="pg"><button disabled={!page} onClick={() => setPage(page - 1)} aria-label="Anterior"><Ic n="chevL" s={15} /></button>
                  {Array.from({ length: pages }, (_, i) => <button key={i} className={i === page ? 'on' : ''} onClick={() => setPage(i)}>{i + 1}</button>)}
                  <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)} aria-label="Siguiente"><Ic n="chev" s={15} /></button></div></div></>
              : !error && <div className="tw"><div className="empty"><Ic n="search" s={34} /><b>Sin resultados</b><span>Prueba con otra búsqueda o quita los filtros.</span><button className="btn sm alt" onClick={() => { setF(''); setQ(''); setBod(''); }}>Quitar filtros</button></div></div>)}
          </div>
        </>
      )}

      <Drawer m={m} row={drawer} perfil={perfil} canWrite={canWrite} onClose={() => setDrawer(null)}
        onEdit={() => setForm({ mode: 'edit', row: drawer })} onDup={duplicate} onArchive={archive} />
      {form && <FormModal m={m} mode={form.mode} row={form.row} rows={data} user={user} onClose={() => setForm(null)} onSave={save} />}
    </>
  );
}
