import { handler } from '../lib/http.js';
import { getDb } from '../lib/db.js';

// GET /api/health → estado del servicio y de la base de datos
export default handler(['GET'], async () => {
  const env = { MONGODB_URI: !!process.env.MONGODB_URI, JWT_SECRET: !!process.env.JWT_SECRET };
  let db = 'sin configurar';
  if (env.MONGODB_URI) {
    try { await (await getDb()).command({ ping: 1 }); db = 'conectada'; } catch (e) { db = 'error: ' + e.message.slice(0, 120); }
  }
  return { ok: db === 'conectada' && env.JWT_SECRET, service: 'panoramic-api', db, env };
});