// CRUD genérico sobre MongoDB, dirigido por shared/model.js (generado desde el mockup)
import { ObjectId } from 'mongodb';
import model from '../shared/model.js';
import { getDb } from './db.js';
import { HttpError } from './http.js';

const byTable = Object.fromEntries(Object.values(model.modules).filter((m) => m.table).map((m) => [m.table, m]));
export const metaOf = (table) => byTable[table] || null;
export const NUM = ['n', 'm', 'mv', 'b', 'r'];
const HIDDEN = { _id: 0, password_hash: 0, eliminado_en: 0, _orden: 0, origen: 0, intentos_fallidos: 0, bloqueado_hasta: 0 };

const bad = (field, msg) => { throw new HttpError(422, 'Datos inválidos', { [field]: msg }); };

// Convierte y valida un valor según el tipo de columna visible (t) o del modelo (base)
function coerce(field, type, v, en) {
  if (v === undefined) return undefined;
  if (v === null || v === '') return null;
  if (NUM.includes(type) || type === 'int' || type === 'decimal') {
    const n = Number(v);
    if (!Number.isFinite(n)) bad(field, 'Debe ser un número');
    if (type === 'int' && !Number.isInteger(n)) bad(field, 'Debe ser un entero');
    return n;
  }
  if (type === 'bool') {
    if (v === true || v === 'true' || v === 1) return true;
    if (v === false || v === 'false' || v === 0) return false;
    return bad(field, 'Debe ser verdadero o falso');
  }
  if (type === 'enum') {
    if (en && !en.includes(String(v))) bad(field, 'Valor permitido: ' + en.join(', '));
    return String(v);
  }
  if (type === 'json') {
    if (typeof v === 'string') { try { return JSON.parse(v); } catch { return bad(field, 'JSON inválido'); } }
    return v;
  }
  if (type === 'k') {
    if (!/^\d+(\.\d+)?\/\d+(\.\d+)?$/.test(String(v))) bad(field, 'Formato: existencia/mínimo, por ejemplo 340/120');
    return String(v);
  }
  return String(v).trim().slice(0, 400);
}

export function validate(meta, input, { partial }) {
  const doc = {};
  meta.cols.forEach((c, i) => {
    const v = coerce(c.k, c.t, input[c.k], null);
    if (v !== undefined) doc[c.k] = v;
    if (!partial && i === 0 && (v === undefined || v === null)) bad(c.k, 'Campo obligatorio');
    if (partial && i === 0 && v === null) bad(c.k, 'Campo obligatorio');
  });
  meta.extras.forEach((e) => {
    const t = e.base === 'FK' || e.base === 'uuid' || e.base === 'string' || e.base === 'text' || e.base === 'date' || e.base === 'datetime' ? 'str' : e.base;
    const v = coerce(e.k, t, input[e.k], e.en);
    if (v !== undefined) doc[e.k] = v;
  });
  return doc;
}

const oid = (id) => { if (!ObjectId.isValid(id)) throw new HttpError(400, 'Identificador inválido'); return new ObjectId(id); };
const out = (d) => (d ? { id: String(d._id), ...Object.fromEntries(Object.entries(d).filter(([k]) => !(k in HIDDEN))) } : d);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function list(meta, query) {
  const col = (await getDb()).collection(meta.table);
  const filter = { eliminado_en: null };
  const textKeys = meta.cols.filter((c) => !NUM.includes(c.t)).map((c) => c.k);
  if (query.q) filter.$or = textKeys.map((k) => ({ [k]: { $regex: esc(String(query.q).slice(0, 80)), $options: 'i' } }));
  for (const c of meta.cols) if (query[c.k] !== undefined && query[c.k] !== '') filter[c.k] = NUM.includes(c.t) ? Number(query[c.k]) : String(query[c.k]);
  let sort = { _orden: 1, creado_en: -1 };
  if (query.sort) {
    const desc = String(query.sort).startsWith('-'), k = String(query.sort).replace(/^-/, '');
    if (meta.cols.some((c) => c.k === k)) sort = { [k]: desc ? -1 : 1 };
  }
  const limit = Math.min(Math.max(parseInt(query.limit) || 200, 1), 500);
  const skip = Math.max(parseInt(query.skip) || 0, 0);
  const [rows, total] = await Promise.all([
    col.find(filter, { projection: HIDDEN }).sort(sort).skip(skip).limit(limit).toArray(),
    col.countDocuments(filter)
  ]);
  return { data: rows.map(out), total };
}

export async function getOne(meta, id) {
  const d = await (await getDb()).collection(meta.table).findOne({ _id: oid(id), eliminado_en: null }, { projection: HIDDEN });
  if (!d) throw new HttpError(404, 'No encontrado');
  return out({ _id: id, ...d });
}

export async function create(meta, input, user) {
  const doc = validate(meta, input, { partial: false });
  const now = new Date();
  const full = { ...doc, creado_en: now, creado_por: user.nombre, actualizado_en: now, actualizado_por: user.nombre, eliminado_en: null, version: 1 };
  const r = await (await getDb()).collection(meta.table).insertOne(full);
  return out({ _id: r.insertedId, ...full });
}

export async function update(meta, id, input, user) {
  const set = validate(meta, input, { partial: true });
  if (!Object.keys(set).length) throw new HttpError(400, 'No hay cambios');
  const filter = { _id: oid(id), eliminado_en: null };
  if (input.version !== undefined) filter.version = Number(input.version);
  const r = await (await getDb()).collection(meta.table).findOneAndUpdate(
    filter,
    { $set: { ...set, actualizado_en: new Date(), actualizado_por: user.nombre }, $inc: { version: 1 } },
    { returnDocument: 'after', projection: HIDDEN }
  );
  if (!r) {
    const exists = await (await getDb()).collection(meta.table).countDocuments({ _id: oid(id), eliminado_en: null });
    throw new HttpError(exists ? 409 : 404, exists ? 'El registro cambió mientras lo editabas. Recarga e intenta de nuevo' : 'No encontrado');
  }
  return out({ _id: id, ...r });
}

export async function remove(meta, id, user) {
  const r = await (await getDb()).collection(meta.table).updateOne(
    { _id: oid(id), eliminado_en: null },
    { $set: { eliminado_en: new Date(), actualizado_por: user.nombre, actualizado_en: new Date() }, $inc: { version: 1 } }
  );
  if (!r.matchedCount) throw new HttpError(404, 'No encontrado');
  return { ok: true };
}

// Conteo por estado de cada colección (para insignias del menú)
export async function summary(tables) {
  const db = await getDb();
  const res = {};
  await Promise.all(tables.map(async (t) => {
    const meta = byTable[t], sc = meta.cols.find((c) => c.t === 's');
    if (!sc) { res[t] = { total: await db.collection(t).countDocuments({ eliminado_en: null }), by: {} }; return; }
    const g = await db.collection(t).aggregate([{ $match: { eliminado_en: null } }, { $group: { _id: '$' + sc.k, n: { $sum: 1 } } }]).toArray();
    res[t] = { total: g.reduce((s, x) => s + x.n, 0), by: Object.fromEntries(g.map((x) => [x._id, x.n])) };
  }));
  return res;
}
