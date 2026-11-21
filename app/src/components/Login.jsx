import { useEffect, useMemo, useRef, useState } from 'react';
import model from '../../shared/model.js';
import { login, setSession } from '../api.js';
import { Ic, Av } from '../ui.jsx';

// Ilustración: edificios que suben piso por piso y una grúa que se balancea
function art() {
  const B = [[60, 100, 6], [180, 116, 9], [338, 84, 5], [444, 132, 11]];
  let h = '';
  B.forEach((b, bi) => {
    for (let i = 0; i < b[2]; i++) {
      const y = 340 - (i + 1) * 22;
      let w = '';
      for (let k = 0; k < Math.floor((b[1] - 8) / 26); k++) w += `<rect class="wn" style="animation-delay:${(((bi * 7 + i * 3 + k * 5) % 10) / 3).toFixed(1)}s" x="${b[0] + 10 + k * 26}" y="${y + 7}" width="10" height="8"/>`;
      h += `<g class="fl" style="animation-delay:${(bi * 0.4 + i * 0.12 + 0.2).toFixed(2)}s"><rect x="${b[0]}" y="${y}" width="${b[1]}" height="22"/>${w}</g>`;
    }
  });
  let zz = 'M314 340';
  for (let y = 340; y > 52; y -= 24) zz += `L326 ${y - 12}L314 ${y - 24}`;
  return `<svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><line class="gr" x1="20" y1="340" x2="580" y2="340"/>${h}
<g class="crane"><line x1="314" y1="340" x2="314" y2="44"/><line x1="326" y1="340" x2="326" y2="44"/><path d="${zz}"/><rect x="308" y="38" width="24" height="10" rx="2"/>
<g class="jib"><line x1="170" y1="44" x2="480" y2="44"/><path d="M170 44L320 20L480 44"/><rect x="150" y="40" width="22" height="14"/><line class="cab" x1="420" y1="44" x2="420" y2="104"/><g class="ld"><rect x="404" y="104" width="32" height="18" rx="2"/></g></g></g>
<g class="dim"><line x1="40" y1="340" x2="40" y2="100"/><line x1="34" y1="100" x2="46" y2="100"/><text x="52" y="226">+24,0 m</text></g></svg>`;
}

const STEPS = ['Verificando credenciales', 'Cargando tus proyectos y bodegas', 'Preparando tu panel'];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Login({ closing, onDone, onTheme }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [step, setStep] = useState(-1);
  const [shake, setShake] = useState(false);
  const [pick, setPick] = useState('');
  const svg = useMemo(art, []);
  const ref = useRef(null);
  useEffect(() => { const t = setTimeout(() => ref.current?.focus(), 600); return () => clearTimeout(t); }, []);

  const fail = (m) => { setErr(m); setStep(-1); setShake(false); requestAnimationFrame(() => setShake(true)); };
  const busy = step >= 0;

  async function submit(e) {
    e.preventDefault();
    if (!email || !pass) return fail('Escribe correo y contraseña');
    setErr(''); setStep(0);
    try {
      const [r] = await Promise.all([login(email.trim(), pass), wait(600)]);
      setStep(1); await wait(600); setStep(2); await wait(500); setStep(3); await wait(250);
      setSession({ token: r.token, user: r.user });
      onDone(r.user);
    } catch (x) { fail(x.message); }
  }

  return (
    <section id="login" className={closing ? 'out' : ''} aria-label="Inicio de sesión">
      <div className="lg-art">
        <div className="lg-brand"><img src="/logo.jpg" alt="" /><b>Panoramic</b></div>
        <div className="lg-svg" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="lg-copy">
          <h2>Cada obra,<br />bajo control.</h2>
          <p>Bodegas por proyecto, compras, contabilidad NIIF y facturación en un solo lugar.</p>
          <div className="lg-stats"><div><b>8</b><span>proyectos</span></div><div><b>5</b><span>bodegas</span></div><div><b>100 %</b><span>trazable</span></div></div>
        </div>
      </div>
      <div className="lg-form">
        <button className="ib lg-theme" type="button" onClick={onTheme} aria-label="Cambiar apariencia"><Ic n="sun" /></button>
        <div id="lgCard" className={(shake ? 'shake ' : '') + (busy ? 'busy' : '')} onAnimationEnd={() => setShake(false)}>
          <h1>Ingresa a tu obra</h1>
          <p className="sub">Elige un perfil de demostración o escribe tus datos.</p>
          <div className="lg-prof">
            {Object.keys(model.prof).map((k) => (
              <button key={k} type="button" className={'lp ' + (pick === k ? 'on' : '')} disabled={busy}
                onClick={() => { setPick(k); setEmail(model.email[k]); setPass('panoramic'); setErr(''); }}>
                <Av n={model.prof[k].n} /><div><b>{model.prof[k].r}</b><small>{model.prof[k].n}</small></div><Ic n="chev" s={16} />
              </button>
            ))}
          </div>
          <form className="lf" onSubmit={submit} noValidate>
            <label htmlFor="lgUser">Correo</label>
            <div className="inp"><Ic n="mail" s={17} /><input id="lgUser" ref={ref} type="email" autoComplete="username" placeholder="usuario@panoramic.gt" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} /></div>
            <label htmlFor="lgPass">Contraseña</label>
            <div className="inp"><Ic n="key" s={17} /><input id="lgPass" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} disabled={busy} />
              <button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Mostrar contraseña"><Ic n="eye" s={17} /></button></div>
            <div id="lgErr" role="alert">{err}</div>
            <button className="btn lg-go" type="submit" disabled={busy}>Ingresar</button>
            {busy && (
              <div id="lgSteps" className="on">
                {STEPS.map((s, j) => <div key={s} className={j < step ? 'ok' : j === step ? 'ld' : ''}><Ic n={j < step ? 'check' : j === step ? 'loader' : 'clock'} s={16} /><span>{s}</span></div>)}
              </div>
            )}
          </form>
          <p className="lg-hint">Demostración: los datos son ficticios. Contraseña de prueba: <b>panoramic</b></p>
        </div>
      </div>
    </section>
  );
}
