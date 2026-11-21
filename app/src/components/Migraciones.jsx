import { useEffect, useRef, useState } from 'react';
import model from '../../shared/model.js';
import { api } from '../api.js';
import { Ic, nm } from '../ui.jsx';

const SRC = [['cem-001␣', 'Cemento··42.5KG␣', '340', 'SACO', '92.5', [0]], ['VAR-0045', 'Varilla 3/8"', '28', 'varilla', '48,75', [3, 4]], ['BLK101', 'Block 15x20x40', '4200', 'UND', '5.2', []], ['mat-0150', 'Arena de río', 'N/A', 'M3', '185', [2]], ['cem-001␣', 'Cemento··42.5KG␣', '340', 'SACO', '92.5', [0]]];
const MAP = [['COD_MAT', 'cem-001', 'sku', 'Mayúsculas, sin espacios'], ['DESC', 'Cemento 42.5KG', 'descripcion', 'Quitar duplicados'], ['EXIST', '340', 'stock_actual', 'Convertir a número'], ['UND', 'SACO', 'unidad_id', 'Homologar con catálogo'], ['PRECIO', '92,5', 'costo_promedio', 'Coma → punto decimal'], ['OBS', '—', '', 'Ignorar columna']];
const ISS = [['Fila 4', 'stock_actual', '"N/A" no es numérico', 'Usar 0 y marcar revisión'], ['Fila 17', 'unidad_id', '"saco" no existe en catálogo', 'Homologar a "Saco"'], ['Fila 33', 'sku', 'Código duplicado MAT-0045', 'Fusionar con fila 12'], ['Fila 58', 'costo_promedio', '"48,75" con coma decimal', 'Convertir a 48.75'], ['Fila 91', 'descripcion', 'Campo vacío', 'Omitir fila']];
const RULES = [['trim', 'Quitar espacios y caracteres invisibles', 'Limpia " cem-001 " → "cem-001"'], ['upper', 'Códigos en mayúscula', 'mat-0150 → MAT-0150'], ['dups', 'Fusionar duplicados por SKU', 'Conserva la fila más reciente'], ['units', 'Homologar unidades con catálogo', 'saco, SACO, Sacos → Saco']];
const STAGES = ['Leyendo archivo', 'Limpiando y homologando', 'Validando reglas', 'Insertando en Inventarios'];
const FIELDS = ['', ...model.modules.inventarios.extras.map((e) => e.k)];
const NAMES = ['Origen', 'Mapeo', 'Validación', 'Importación'];

export default function Migraciones({ notify, go, onImported }) {
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fixed, setFixed] = useState(new Set());
  const [rules, setRules] = useState({ trim: 1, upper: 1, dups: 1, units: 1 });
  const [done, setDone] = useState(false);
  const [prog, setProg] = useState(0);
  const iv = useRef(null);
  useEffect(() => () => clearInterval(iv.current), []);

  const errors = 11 - fixed.size, valid = 1198 + fixed.size;
  const reset = () => { clearInterval(iv.current); setStep(0); setLoaded(false); setFixed(new Set()); setDone(false); setProg(0); };

  function start() {
    setStep(3); setProg(0); setDone(false);
    let p = 0;
    iv.current = setInterval(async () => {
      p = Math.min(100, p + 2); setProg(p);
      if (p >= 100) {
        clearInterval(iv.current);
        try {
          // Deja constancia real de la carga en la base de datos
          await api('/migraciones', { method: 'POST', body: { origen: 'inventario_2019.xlsx|Excel · 3 hojas', destino: 'Inventarios', filas: 1240, validas: valid, errores: errors, fecha: 'Hoy', estado: errors ? 'Revisión' : 'Completado' } });
          onImported?.(); notify('Importación completada y registrada');
        } catch (e) { notify('Importación lista, pero no se pudo registrar: ' + e.message, 'alert'); }
        setDone(true);
      }
    }, 60);
  }

  const cur = Math.min(3, Math.floor(prog / 25));
  let body = null;
  if (step === 0) body = (
    <>
      <div className="src">
        <button className="opt on" type="button"><Ic n="sheet" s={24} /><div><b>Excel / CSV</b><small>Carga un archivo de tu equipo</small></div></button>
        <button className="opt" type="button" onClick={() => notify('Conexión a sistema legacy: disponible en la versión final', 'db')}><Ic n="db" s={24} /><div><b>Sistema legacy</b><small>SQL Server, MySQL, Access…</small></div></button>
      </div>
      {loaded ? (
        <>
          <div className="file"><span className="fi"><Ic n="sheet" s={22} /></span><div><b>inventario_2019.xlsx</b><small>3 hojas · 1,240 filas · 5 columnas · 214 KB</small></div><button className="btn sm alt" onClick={reset}>Cambiar</button></div>
          <div className="tw"><table style={{ minWidth: 520 }}><thead><tr>{['COD_MAT', 'DESC', 'EXIST', 'UND', 'PRECIO'].map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{SRC.map((r, i) => <tr key={i} style={{ cursor: 'default' }}>{r.slice(0, 5).map((c, j) => <td key={j}>{r[5].includes(j) ? <span className="bad">{c}</span> : c}</td>)}</tr>)}</tbody></table></div>
          <p className="sub" style={{ fontSize: 12.5, marginTop: 8 }}><span className="bad">Rojo</span> = datos que se corregirán automáticamente o requieren revisión.</p>
        </>
      ) : (
        <button className="dz" onClick={() => setLoaded(true)}><span className="up"><Ic n="upload" s={24} /></span><b>Arrastra un archivo o haz clic para usar el ejemplo</b><span>.xlsx · .csv · hasta 20 MB</span></button>
      )}
    </>
  );
  if (step === 1) body = (
    <>
      <div className="file" style={{ marginBottom: 12 }}><span className="fi" style={{ background: 'color-mix(in srgb,var(--in) 18%,transparent)', color: 'var(--in)' }}><Ic n="spark" s={20} /></span><div><b>5 de 6 columnas reconocidas automáticamente</b><small>Destino: <span className="tag">Inventarios</span> · revisa y ajusta si hace falta</small></div></div>
      <div className="tw"><table style={{ minWidth: 560 }}><thead><tr><th>Columna origen</th><th>Ejemplo</th><th /><th>Campo estándar</th><th>Regla</th></tr></thead>
        <tbody>{MAP.map((r) => <tr key={r[0]} style={{ cursor: 'default' }}><td><span className="code">{r[0]}</span></td><td className="mu">{r[1]}</td><td className="mu"><Ic n="chev" s={14} /></td>
          <td><select className="sel" style={{ minWidth: 170 }} defaultValue={r[2]}>{FIELDS.map((f) => <option key={f} value={f}>{f || '(ignorar)'}</option>)}</select></td><td className="mu">{r[3]}</td></tr>)}</tbody></table></div>
      <div className="rules">{RULES.map((r) => <div className="rule" key={r[0]}><div><b>{r[1]}</b><small>{r[2]}</small></div><label className="sw"><input type="checkbox" checked={!!rules[r[0]]} onChange={(e) => setRules({ ...rules, [r[0]]: e.target.checked ? 1 : 0 })} /><i /></label></div>)}</div>
    </>
  );
  if (step === 2) body = (
    <>
      <div className="mk" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="card"><b className="pos">{nm(valid)}</b><span>Filas válidas</span></div><div className="card"><b>31</b><span>Duplicados fusionados</span></div><div className="card"><b className={errors ? 'neg' : 'pos'}>{errors}</b><span>Errores por corregir</span></div></div>
      <div className="tw"><table style={{ minWidth: 620 }}><thead><tr><th>Fila</th><th>Campo</th><th>Problema</th><th>Sugerencia</th><th /></tr></thead>
        <tbody>{ISS.map((r, i) => <tr key={r[0]} style={{ cursor: 'default' }}><td><span className="code">{r[0]}</span></td><td className="ty">{r[1]}</td><td>{r[2]}</td><td className="mu">{r[3]}</td>
          <td className="r">{fixed.has(i) ? <span className="pill ok">Corregido</span> : <button className="btn sm alt" onClick={() => setFixed(new Set(fixed).add(i))}><Ic n="spark" s={14} />Corregir</button>}</td></tr>)}</tbody></table></div>
      <p className="sub" style={{ fontSize: 12.5, marginTop: 8 }}>+ 6 errores similares se resolverán con las mismas reglas.</p>
    </>
  );
  if (step === 3) body = done ? (
    <div className="done-c"><span className="ok-ic"><Ic n="check" s={30} /></span><h2>¡Importación completada!</h2><p className="sub">{nm(valid)} registros cargados en <b>Inventarios</b> · lote IMP-2026-0042</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}><button className="btn" onClick={() => go('inventarios')}><Ic n="box" s={16} />Ver inventarios</button><button className="btn alt" onClick={reset}>Nueva migración</button></div></div>
  ) : (
    <div><div className="stg">{STAGES.map((s, i) => <div key={s} className={i < cur ? 'ok' : i === cur ? 'ld' : ''}><Ic n={i < cur ? 'check' : i === cur ? 'loader' : 'clock'} s={17} /><span>{s}</span></div>)}</div>
      <div className="pbar"><u style={{ width: prog + '%' }} /></div><p className="sub" style={{ marginTop: 8 }}>{prog}%</p></div>
  );

  return (
    <>
      <div className="card" id="mg" style={{ marginBottom: 18, animationDelay: '0s' }}>
        <div className="steps">{NAMES.map((s, i) => <div key={s} className={i < step || (done && i === 3) ? 'ok' : i === step ? 'on' : ''}><span>{s}</span></div>)}</div>
        {body}
        {!done && step < 3 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'space-between' }}>
            <div>{step > 0 && <button className="btn alt" onClick={() => setStep(step - 1)}><Ic n="chevL" s={16} />Atrás</button>}</div>
            <button className="btn" disabled={step === 0 && !loaded} onClick={() => (step === 2 ? start() : setStep(step + 1))}>{['Continuar', 'Validar datos', 'Importar'][step]}<Ic n="chev" s={16} /></button>
          </div>)}
      </div>
      <h3 style={{ margin: '6px 0 10px', fontSize: 14 }}>Historial de cargas</h3>
    </>
  );
}
