import { handler } from '../../lib/http.js';
import { requireAuth, perms } from '../../lib/auth.js';

// GET /api/auth/me → datos de la sesión y tablas permitidas
export default handler(['GET'], async (req) => {
  const u = requireAuth(req);
  const p = perms(u.perfil);
  return { user: { id: u.sub, nombre: u.nombre, perfil: u.perfil }, read: [...p.read], write: [...p.write] };
});