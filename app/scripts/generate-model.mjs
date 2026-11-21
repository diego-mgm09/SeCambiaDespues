// Genera shared/model.js a partir del mockup. Ejecutar: npm run model
// El archivo generado lo usan el frontend (React) y las funciones de la API, sin las filas de ejemplo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadMockup, TABLE, slug } from './mockup.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const mk = loadMockup();
const { M, U } = mk;

// Parseo de campos del modelo: "nombre:tipo FLAGS # descripción"
const parseFields = (str) =>
  str.split('|').map((l) => {
    const [a, d = ''] = l.split(' # ');
    const i = a.indexOf(':');
    const name = a.slice(0, i);
    const r = a.slice(i + 1).trim();
    const base = r.match(/^[A-Za-z]+/)[0];
    return {
      name, base, desc: d,
      fk: base === 'FK' ? r.split(/\s+/)[1] : null,
      en: (r.match(/\(([^)]*)\)/) || [])[1]?.split(',') ?? null,
      nullable: /\bNULL\b/.test(r), unique: /\bUNIQUE\b/.test(r)
    };
  });

const AUDIT = new Set(parseFields(U).map((f) => f.name));
const modules = {};
const problems = [];

for (const [key, m] of Object.entries(M)) {
  const table = TABLE[key] || null;
  const cols = (m.c || []).map(([label, type]) => ({ k: slug(label), l: label, t: type }));
  const keys = new Set(cols.map((c) => c.k));
  if (keys.size !== cols.length) problems.push(`${key}: columnas con el mismo nombre`);
  const extras = m.f
    ? parseFields(m.f)
        .filter((f) => !AUDIT.has(f.name) && !keys.has(f.name))
        .map((f) => ({
          k: f.name, base: f.base, en: f.en, fk: f.fk && M[f.fk] ? f.fk : null, desc: f.desc, nullable: f.nullable, unique: f.unique
        }))
    : [];
  extras.forEach((e) => { if (e.fk === null && e.base === 'FK') problems.push(`${key}.${e.k}: FK a módulo inexistente`); });
  modules[key] = {
    key, table, title: m.t, icon: m.i, desc: m.d, group: m.g || null, sub: mk.SUBOF[key] || null,
    bi: m.bi ?? null, ex: m.ex || null, kp: m.kp || null, cols, extras, custom: key === 'procesos'
  };
}
if (problems.length) { console.error('Problemas en el modelo:\n- ' + problems.join('\n- ')); process.exit(1); }

const model = {
  modules,
  nav: mk.NAV, subs: mk.SUBS, acc: mk.ACC, prof: mk.PROF, email: mk.EMAIL,
  why: mk.WHY, norm: mk.NORM, flows: mk.FLOWS, niv: mk.NIV, mirol: mk.MIROL, cmd: mk.CMD, matriz: mk.MATRIZ,
  bod: mk.BOD, binfo: mk.BINFO
};
const out = path.resolve(here, '..', 'shared', 'model.js');
fs.writeFileSync(out, '// GENERADO por scripts/generate-model.mjs a partir de ../mockup. No editar a mano.\nexport default ' + JSON.stringify(model, null, 1) + ';\n');
const tables = Object.values(modules).filter((x) => x.table);
console.log(`model.js generado: ${Object.keys(modules).length} módulos, ${tables.length} colecciones, ${tables.reduce((s, x) => s + x.cols.length + x.extras.length, 0)} campos`);
