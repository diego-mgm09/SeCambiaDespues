import { handler } from '../lib/http.js';
import { requireAuth, perms } from '../lib/auth.js';
import { summary } from '../lib/crud.js';

// GET /api/summary → conteos por estado de cada colección que el usuario puede ver
export default handler(['GET'], async (req) => {
  const u = requireAuth(req);
  return summary([...perms(u.perfil).read]);
});