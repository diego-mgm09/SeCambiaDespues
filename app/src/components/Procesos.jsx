import { useEffect, useRef } from 'react';
import model from '../../shared/model.js';
import { Ic, Act, Q } from '../ui.jsx';
import { PAL } from '../ui.jsx';

const { flows: FLOWS, niv: NIV, mirol: MIROL, cmd: CMD, matriz: MATRIZ } = model;

function Command() {
  return (
    <>
      <div className="hint"><Ic n="info" s={18} /><span>La <b>línea de mando</b> indica a quién reporta cada nivel y qué puede decidir. Si algo supera tu nivel, sube al siguiente.</span></div>
      <div className="pyr" id="flowrail">
        {CMD.map((c, i) => (
          <div key={c[0]} style={{ display: 'contents' }}>
            <div className="lvl" style={{ '--w': 56 + i * 11 + '%', '--i': i }}>
              <div className="lc"><span className="ln" style={{ background: PAL[(i + 1) % PAL.length] }}>{c[1]}</span><div><b>{c[0]}</b><small>{c[2]}</small></div><span className="lic"><Ic n={c[6]} s={20} /></span></div>
              <p>{c[3]}</p>
              <div className="lm"><span><Ic n="arrowd" s={13} />Reporta a: <b>{c[4]}</b></span><span><Ic n="eye" s={13} />Ve: <b>{c[5]}</b></span></div>
            </div>
            {i < CMD.length - 1 && <div className="lcon"><Ic n="arrowd" s={16} /><small>supervisa a</small></div>}
          </div>
        ))}
      </div>
      <h3 style={{ margin: '24px 0 10px', fontSize: 14 }}>Matriz de aprobación</h3>
      <div className="tw"><table style={{ minWidth: 680 }}>
        <thead><tr><th>Acción</th><th>Solicita</th><th>Revisa</th><th>Aprueba</th><th>Límite</th></tr></thead>
        <tbody>{MATRIZ.map((r, i) => (
          <tr key={r[0]} style={{ cursor: 'default', '--i': i }}><td><b>{r[0]}</b></td><td><Act a={r[1]} niv={NIV} /></td><td><Act a={r[2]} niv={NIV} /></td><td><Act a={r[3]} niv={NIV} /></td><td className="mu">{r[4]}</td></tr>))}</tbody>
      </table></div>
    </>
  );
}

export default function Procesos({ perfil, acc, go, flow, setFlow }) {
  const ivRef = useRef(null);
  const stop = () => { clearInterval(ivRef.current); ivRef.current = null; };
  useEffect(() => stop, []);
  const F = FLOWS[flow.p], S = F.steps, n = S.length, cur = S[flow.s], mine = MIROL[perfil] || [];
  const set = (patch) => { stop(); setFlow({ ...flow, ...patch }); };
  const playing = !!ivRef.current;
  const play = () => {
    if (ivRef.current) { stop(); setFlow({ ...flow }); return; }
    let s = flow.s >= n - 1 ? 0 : flow.s;
    setFlow({ ...flow, s });
    ivRef.current = setInterval(() => {
      if (s >= n - 1) { stop(); setFlow((f) => ({ ...f })); return; }
      s++; setFlow((f) => ({ ...f, s }));
    }, 2600);
  };
  const railRef = useRef(null);
  useEffect(() => {
    const c = railRef.current?.querySelector('li.cur'), w = railRef.current;
    if (c && w) w.scrollTo({ left: c.offsetLeft - w.clientWidth / 2 + c.offsetWidth / 2, behavior: 'smooth' });
  }, [flow.p, flow.s]);
  const can = cur.m && acc.includes(cur.m);

  return (
    <>
      <div className="head fade"><div style={{ display: 'flex', alignItems: 'center' }}><span className="mico"><Ic n="flow" s={20} /></span><div><h1>Procesos y capacitación</h1><p className="sub">Cada proceso paso a paso: quién actúa, por qué y qué deja registrado.</p></div></div></div>
      <div className="tabs" id="tabs">
        {[['f', 'Flujos de proceso', 'flow'], ['l', 'Línea de mando', 'users']].map((t) => <button key={t[0]} className={flow.tab === t[0] ? 'on' : ''} onClick={() => set({ tab: t[0] })}><Ic n={t[2]} s={16} />{t[1]}</button>)}
      </div>
      {flow.tab === 'l' ? <Command /> : (
        <>
          <div className="chips" id="flowchips" style={{ marginBottom: 12 }}>
            {Object.keys(FLOWS).map((k) => <button key={k} className={'chip ' + (k === flow.p ? 'on' : '')} onClick={() => set({ p: k, s: 0 })}><Ic n={FLOWS[k].i} s={14} />{FLOWS[k].t}</button>)}
          </div>
          <p className="sub" style={{ margin: '0 0 12px' }}>{F.d}</p>
          <div className="railw" id="flowrail" ref={railRef}>
            <ol className="rail" style={{ '--n': n, '--p': n > 1 ? flow.s / (n - 1) : 0 }}>
              {S.map((s, i) => (
                <li key={s.t} className={i < flow.s ? 'done' : i === flow.s ? 'cur' : ''}>
                  <button onClick={() => set({ s: i })}><span className="nd">{i < flow.s ? <Ic n="check" s={15} /> : i + 1}</span><b>{s.t}</b><Act a={s.a} niv={NIV} />{mine.includes(s.a) && <i className="mine">Tu parte</i>}</button>
                </li>))}
            </ol>
          </div>
          <div className="card step" id="flowdetail" key={flow.p + flow.s}>
            <div className="sh"><span className="sn">Paso {flow.s + 1} de {n}</span><h2>{cur.t}</h2>
              <div className="who2"><Act a={cur.a} big niv={NIV} /><small>{NIV[cur.a] ? 'Nivel de mando ' + NIV[cur.a] : 'Automático'}</small>{mine.includes(cur.a) && <i className="mine">Esta es tu parte</i>}</div></div>
            <div className="sg">
              <div>
                <div className="why2"><h4><Ic n="info" s={15} />¿Por qué se hace?</h4><p>{cur.w}</p></div>
                <div className="doc"><h4>Documento que se genera</h4><span className="tag">{cur.d}</span></div>
              </div>
              {perfil !== 'obrero' && cur.x && (
                <div className="imp"><h4><Ic n="ledger" s={14} />Impacto contable</h4>
                  <table><thead><tr><th>Cuenta</th><th className="r">Debe</th><th className="r">Haber</th></tr></thead>
                    <tbody>{cur.x.map((r) => <tr key={r[0]} style={{ cursor: 'default' }}><td>{r[0]}</td><td className="r num">{r[1] != null ? Q(r[1]) : ''}</td><td className="r num">{r[2] != null ? Q(r[2]) : ''}</td></tr>)}</tbody></table>
                  {cur.n && <p className="mu" style={{ marginTop: 8, fontSize: 12.5 }}><Ic n="book" s={13} /> {cur.n}</p>}</div>)}
              {perfil !== 'obrero' && !cur.x && cur.n && <div className="imp"><h4><Ic n="book" s={14} />Norma</h4><p className="mu">{cur.n}</p></div>}
            </div>
            <div className="sf">
              <button className="btn alt" disabled={!flow.s} onClick={() => set({ s: flow.s - 1 })}><Ic n="chevL" s={16} />Anterior</button>
              <button className="btn alt" onClick={play}><Ic n={playing ? 'pause' : 'play'} s={15} />{playing ? 'Pausar' : 'Recorrer'}</button>
              {cur.m && <button className="btn alt" disabled={!can} onClick={() => go(cur.m)}><Ic n={model.modules[cur.m].icon} s={15} />{can ? 'Ir a ' + model.modules[cur.m].title : 'Lo realiza otra área'}</button>}
              <span style={{ flex: 1 }} />
              <button className="btn" disabled={flow.s >= n - 1} onClick={() => set({ s: flow.s + 1 })}>Siguiente<Ic n="chev" s={16} /></button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
