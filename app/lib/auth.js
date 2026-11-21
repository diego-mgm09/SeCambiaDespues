// Autenticación (JWT) y permisos por perfil, derivados del modelo del mockup
import jwt from 'jsonwebtoken';
import model from '../shared/model.js';
import { HttpError } from './http.js';

const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) { const e = new HttpError(500, 'Falta JWT_SECRET (mínimo 16 caracteres)'); e.expose = true; throw e; }
  return s;
};
export const signToken = (user) => jwt.sign({ sub: user.id, perfil: user.perfil, nombre: user.nombre }, secret(), { expiresIn: '8h' });

export function requireAuth(req) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Bearer ')) throw new HttpError(401, 'Sesión requerida');
  try { return jwt.verify(h.slice(7), secret()); }
  catch (e) { if (e instanceof HttpError) throw e; throw new HttpError(401, 'Sesión vencida. Ingresa de nuevo'); }
}

const tableOf = (key) => model.modules[key]?.table;
// Lectura: los módulos que el perfil ve en el menú. Escritura: admin todo; maestro todo lo suyo; obrero solo solicitudes de bodega.
export function perms(perfil) {
  const read = new Set((model.acc[perfil] || []).map(tableOf).filter(Boolean));
  let write;
  if (perfil === 'admin') write = new Set(read);
  else if (perfil === 'maestro') write = new Set(read);
  else write = new Set([tableOf('bodega')]);
  if (perfil !== 'admin') ['usuarios', 'roles'].forEach((t) => { read.delete(t); write.delete(t); });
  return { read, write };
}

export function can(user, table, op) {
  const p = perms(user.perfil);
  return (op === 'read' ? p.read : p.write).has(table);
}