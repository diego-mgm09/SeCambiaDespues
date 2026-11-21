import { handler, body, HttpError } from '../../lib/http.js';
import { requireAuth, can } from '../../lib/auth.js';
import { metaOf, getOne, update, remove } from '../../lib/crud.js';

// GET /api/<coleccion>/<id> · PATCH (edita) · DELETE (archiva, borrado lógico)
export default handler(['GET', 'PATCH', 'DELETE'], async (req) => {
  const user = requireAuth(req);
  const meta = metaOf(req.query.resource);
  if (!meta) throw new HttpError(404, 'Recurso no encontrado');
  if (!can(user, meta.table, req.method === 'GET' ? 'read' : 'write')) throw new HttpError(403, 'No tienes permiso para esta acción');
  if (req.method === 'GET') return getOne(meta, req.query.id);
  if (req.method === 'DELETE') return remove(meta, req.query.id, user);
  return update(meta, req.query.id, body(req), user);
});