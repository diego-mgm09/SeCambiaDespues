import { handler, body, HttpError } from '../../lib/http.js';
import { requireAuth, can } from '../../lib/auth.js';
import { metaOf, list, create } from '../../lib/crud.js';

// GET  /api/<coleccion>   → lista (q, sort, limit, skip, filtros por campo)
// POST /api/<coleccion>   → crea un registro
export default handler(['GET', 'POST'], async (req) => {
  const user = requireAuth(req);
  const meta = metaOf(req.query.resource);
  if (!meta) throw new HttpError(404, 'Recurso no encontrado');
  if (!can(user, meta.table, req.method === 'GET' ? 'read' : 'write')) throw new HttpError(403, 'No tienes permiso para esta acción');
  if (req.method === 'GET') return list(meta, req.query);
  const input = body(req);
  // Un obrero solo puede crear solicitudes pendientes
  if (user.perfil === 'obrero') input.estado = 'Pendiente';
  return create(meta, input, user);
});