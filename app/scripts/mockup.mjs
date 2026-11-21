// Lee el mockup (carpeta ../mockup, intacta) y expone sus datos. Solo se usa en desarrollo (modelo y seed).
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const MOCKUP_DIR = path.resolve(here, '..', '..', 'mockup');

export function loadMockup() {
  const code = ['data.js', 'data2.js']
    .map((f) => fs.readFileSync(path.join(MOCKUP_DIR, f), 'utf8'))
    .join('\n') + '\n;({M,U,NAV,SUBS,SUBOF,ACC,PROF,EMAIL,WHY,NORM,FLOWS,NIV,MIROL,CMD,MATRIZ,BOD,BINFO})';
  return vm.runInNewContext(code);
}

// Nombre de colección en Mongo para cada módulo del mockup
export const TABLE = {
  usuarios: 'usuarios', roles: 'roles', catalogos: 'catalogos', proyectos: 'proyectos', inventarios: 'inventarios',
  proveedores: 'proveedores', trabajadores: 'trabajadores', metas: 'metas', compras: 'compras', tesoreria: 'tesoreria',
  reportes: 'reportes', contabilidad: 'asientos', bodega: 'movimientos_bodega', activos: 'activos',
  migraciones: 'migraciones', departamentos: 'departamentos', bodegas: 'bodegas', plan: 'plan_cuentas',
  cxp: 'cuentas_por_pagar', cxc: 'cuentas_por_cobrar', eeff: 'estados_financieros', cierre: 'cierres_periodo',
  frec: 'facturas_recibidas', femi: 'facturas_emitidas', notas: 'notas_fiscales', ret: 'retenciones'
};

export const slug = (s) =>
  String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
