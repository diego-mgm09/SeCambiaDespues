// Tour guiado: resalta elementos de la pantalla paso a paso (DOM imperativo, independiente de React)
const $ = (s) => document.querySelector(s);

export function stepsFor({ view, perfil }) {
  const G = [
    ['#nav', 'Menú de módulos', 'Aquí están los módulos disponibles para tu perfil. Los números indican elementos pendientes.'],
    ['#q', 'Búsqueda', 'Filtra al instante lo que ves en pantalla. Atajo: presiona “/”.'],
    ['#bellBtn', 'Notificaciones', 'Avisos de aprobaciones, metas atrasadas y stock bajo.'],
    ['#themeBtn', 'Apariencia', 'Elige modo claro, oscuro o el del sistema.'],
    ['#profBtn', 'Perfil', 'Cambia entre Administrativo, Maestro de Obra y Obrero para ver cómo se adapta la interfaz.']
  ];
  let V;
  if (view.v === 'procesos') V = [
    ['#flowchips', 'Elige un proceso', 'Cada proceso cuenta una historia de principio a fin: compra, despacho, traslado, cobro, planilla y cierre.'],
    ['#flowrail', 'Línea del proceso', 'Los pasos van en orden. Cada uno muestra quién actúa y su nivel de mando. Toca un paso o usa “Recorrer”.'],
    ['#flowdetail', 'Detalle del paso', 'Aquí está el porqué, el documento que se genera y el impacto contable. Desde aquí saltas al módulo.']];
  else if (view.v === 'dash') V = perfil === 'obrero'
    ? [['#bigs', 'Acciones grandes', 'Botones para lo más común: pedir material, ver tus tareas y consultar inventario.'], ['#jornada', 'Tu jornada', 'Marca tus tareas como hechas con un toque.']]
    : [['#kp', 'Indicadores', 'Un vistazo al estado de tus obras. Los números se actualizan solos.'],
       ['#avc', perfil === 'maestro' ? 'Tareas del día' : 'Avance por proyecto', perfil === 'maestro' ? 'Marca cada tarea al terminarla.' : 'Progreso de cada obra de un vistazo.'],
       ['#alerts', perfil === 'maestro' ? 'Solicitudes' : 'Requiere atención', perfil === 'maestro' ? 'Aprueba o rechaza pedidos de material con un clic.' : 'Toca una alerta para ir directo al módulo.']];
  else V = [
    ['#flowbar', '¿Por qué existe?', 'Cada módulo explica para qué sirve y en qué paso del proceso interviene. Toca un paso para ver el flujo completo.'],
    ['#mk', 'Resumen', 'Cifras clave del módulo.'],
    ['#exportBtn', 'Exportar', 'Descarga lo que ves, o solo lo seleccionado.'],
    ...(view.v === 'migraciones' ? [['#mg', 'Asistente de migración', '4 pasos: origen, mapeo, validación e importación.']] : []),
    ['#bstrip', 'Bodegas por proyecto', 'Cada proyecto tiene sus bodegas. Toca una para ver solo su inventario y movimientos.'],
    ['#newBtn', 'Crear registro', 'Abre un formulario organizado por secciones.'],
    ['#tabs', 'Datos · Modelo · JSON', 'Cambia entre la tabla, los campos del modelo y el documento de ejemplo.'],
    ['#chips', 'Filtros rápidos', 'Filtra por estado con un clic.'],
    ['#tblArea', 'Tabla', 'Ordena con los encabezados, selecciona filas y haz clic en una para ver su detalle.']];
  return [...V, ...G].filter((s) => { const e = $(s[0]); return e && e.offsetWidth > 0; });
}

export function startTour({ view, perfil, setSide }) {
  const S = stepsFor({ view, perfil });
  if (!S.length) return;
  let i = 0;
  const o = document.createElement('div');
  o.className = 'tour';
  o.innerHTML = '<div class="hole"></div><div class="tip"><span class="tc"></span><b></b><p></p><div class="tf2"><div class="dots"></div><div class="bt"><button class="btn sm ghost" data-x>Salir</button><button class="btn sm alt" data-p>Atrás</button><button class="btn sm" data-n>Siguiente</button></div></div></div>';
  document.body.append(o);
  const hole = o.querySelector('.hole'), tip = o.querySelector('.tip'), $t = (s) => tip.querySelector(s);
  const end = () => { o.remove(); setSide(false); removeEventListener('keydown', kd); removeEventListener('resize', place); };
  function place() {
    const e = $(S[i][0]); if (!e) return;
    const r = e.getBoundingClientRect();
    Object.assign(hole.style, { top: r.top - 6 + 'px', left: r.left - 6 + 'px', width: r.width + 12 + 'px', height: r.height + 12 + 'px' });
    const th = tip.offsetHeight, tw = tip.offsetWidth;
    let y = r.bottom + 16 + th > innerHeight ? r.top - th - 16 : r.bottom + 16;
    if (y < 10) y = Math.min(innerHeight - th - 10, r.bottom + 16);
    if (r.height > innerHeight * 0.6) y = innerHeight - th - 14;
    tip.style.top = Math.max(10, y) + 'px';
    tip.style.left = Math.max(10, Math.min(innerWidth - tw - 10, r.left)) + 'px';
  }
  function show() {
    const s = S[i], mobileNav = innerWidth <= 900 && s[0] === '#nav';
    setSide(mobileNav);
    $(s[0]).scrollIntoView({ block: 'center' });
    $t('.tc').textContent = `Paso ${i + 1} de ${S.length}`; $t('b').textContent = s[1]; $t('p').textContent = s[2];
    $t('.dots').innerHTML = S.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
    $t('[data-p]').style.visibility = i ? 'visible' : 'hidden';
    $t('[data-n]').textContent = i === S.length - 1 ? 'Finalizar' : 'Siguiente';
    setTimeout(place, mobileNav ? 380 : 60);
  }
  const nx = () => { i < S.length - 1 ? (i++, show()) : end(); };
  const pv = () => { if (i) { i--; show(); } };
  const kd = (e) => { if (e.key === 'Escape') end(); if (e.key === 'ArrowRight') nx(); if (e.key === 'ArrowLeft') pv(); };
  tip.onclick = (e) => { if (e.target.closest('[data-x]')) end(); if (e.target.closest('[data-n]')) nx(); if (e.target.closest('[data-p]')) pv(); };
  addEventListener('keydown', kd); addEventListener('resize', place); show();
}
