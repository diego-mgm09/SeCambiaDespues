// Piezas de interfaz compartidas: iconos, avatares, estados y renderizado de celdas
import { ICONS } from './icons.js';

export const Ic = ({ n, s = 18 }) => (
  <svg className="ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[n] || '' }} />
);

export const PAL = ['#0A2947', '#7a5c2e', '#2e6b5b', '#5b3a6b', '#8a3d3d', '#2f5d8a', '#5a6b2e'];
export const nm = (v) => Number(v).toLocaleString('en-US');
export const Q = (v) => v == null ? '—' : (v < 0 ? '− ' : '') + 'Q ' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
export const NUMT = ['n', 'm', 'mv'];

export const Av = ({ n }) => {
  const p = String(n).replace(/[^A-Za-zÁ-ú ]/g, '').trim().split(/\s+/);
  const t = ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase();
  let h = 0; for (const c of String(n)) h += c.charCodeAt(0);
  return <span className="av" style={{ background: PAL[h % PAL.length] }}>{t}</span>;
};

export const SC = (v) =>
  /^(Activo|Aprobada|Completado|Conciliado|Operativo|Listo|Autorizado|Recibido|Pagada|Cobrada|Emitida|Certificada|Declarada|Cerrado|Hecha)$/.test(v) ? 'ok'
  : /^(Pendiente|En curso|Revisión|Programado|Borrador|Planificación|Parcial|Abierto)$/.test(v) ? 'wa'
  : /^(Inactivo|Error|Bajo stock|Rechazada|Rechazado|Atrasado|Atrasada|Vencida|Anulada)$/.test(v) ? 'bd' : '';
export const Pill = ({ v }) => <span className={'pill ' + SC(v)}>{v}</span>;

export const Act = ({ a, big, niv }) => (
  <span className={'act ' + (big ? 'big' : '')} style={{ '--c': PAL[(niv[a] || 0) % PAL.length] }}>{a}</span>
);

const two = (v) => String(v ?? '').split('|');
export function Cell({ v, t }) {
  switch (t) {
    case 'p': { const [a, b] = two(v); return <div className="pc"><Av n={a} /><div className="cell2"><b>{a}</b>{b && <small>{b}</small>}</div></div>; }
    case 'x': { const [a, b] = two(v); return <div className="cell2"><b>{a}</b>{b && <small>{b}</small>}</div>; }
    case 'c': return <span className="code">{v}</span>;
    case 'g': return <span className="tag">{v}</span>;
    case 's': return <Pill v={v} />;
    case 'n': return <span className="num">{nm(v)}</span>;
    case 'm': return v == null ? <span className="mu">—</span> : <span className="num">{Q(v)}</span>;
    case 'mv': return <span className={'num ' + (v < 0 ? 'neg' : 'pos')}>{v > 0 ? '+ ' : ''}{Q(v)}</span>;
    case 'b': return <div className="pl"><div className={'meter ' + (v >= 100 ? 'ok' : '')}><u style={{ '--w': v + '%' }} /></div><b className="num">{v}%</b></div>;
    case 'k': {
      const [a, mn] = String(v).split('/').map(Number), c = a < mn ? 'bd' : a < mn * 1.25 ? 'wa' : 'ok';
      return <div className="stk"><div><b className="num">{nm(a)}</b><small>mín. {nm(mn)}</small></div><div className={'meter ' + c}><u style={{ '--w': Math.min(100, a / (mn * 2) * 100) + '%' }} /></div></div>;
    }
    case 'r': return <span className="rate" title={v + ' de 5'}>{[1, 2, 3, 4, 5].map((i) => <span key={i} className={i > v ? 'off' : ''}><Ic n="star" s={14} /></span>)}</span>;
    default: return <>{v == null || v === '' ? '—' : String(v)}</>;
  }
}

// Valor ordenable de una celda
export const sortKey = (v, t) => v == null ? -Infinity : t === 'k' ? parseFloat(v) : ['n', 'm', 'mv', 'b', 'r'].includes(t) ? Number(v) : String(v).split('|')[0].toLowerCase();
