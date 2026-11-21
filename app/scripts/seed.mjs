// Carga los datos de ejemplo del mockup en MongoDB. Ejecutar: npm run seed
// Es repetible: borra solo los documentos con origen:"seed" y los vuelve a crear. No toca lo que se cree desde la app.
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
import { loadMockup, TABLE, slug } from './mockup.mjs';

const uri = process.env.MONGODB_URI;
if (!uri) { console.error('Falta MONGODB_URI (créala en app/.env)'); process.exit(1); }
const mk = loadMockup();
const { M, EMAIL } = mk;
const DEMO_PASS = process.env.DEMO_PASSWORD || 'panoramic';

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'panoramic');
  const hash = await bcrypt.hash(DEMO_PASS, 10);
  const perfilDe = Object.fromEntries(Object.entries(EMAIL).map(([p, e]) => [e, p]));
  const now = new Date();
  let total = 0;

  for (const [key, m] of Object.entries(M)) {
    const table = TABLE[key];
    if (!table || !m.r) continue;
    const col = db.collection(table);
    await col.deleteMany({ origen: 'seed' });
    const docs = m.r.map((row, i) => {
      const d = {};
      m.c.forEach(([label], j) => { d[slug(label)] = row[j] ?? null; });
      if (key === 'usuarios') {
        const email = String(d.usuario).split('|')[1].toLowerCase();
        d.email = email;
        d.perfil = perfilDe[email] || null; // solo los 3 perfiles de demostración pueden iniciar sesión
        if (d.perfil) d.password_hash = hash;
        d.intentos_fallidos = 0; d.bloqueado_hasta = null;
      }
      return { ...d, _orden: i, origen: 'seed', creado_en: now, creado_por: 'seed', actualizado_en: now, actualizado_por: 'seed', eliminado_en: null, version: 1 };
    });
    if (docs.length) await col.insertMany(docs);
    await col.createIndex({ eliminado_en: 1 });
    total += docs.length;
    console.log(`  ${table.padEnd(22)} ${String(docs.length).padStart(3)} documentos`);
  }
  await db.collection('usuarios').createIndex({ email: 1 }, { unique: true, partialFilterExpression: { email: { $type: 'string' } } });
  console.log(`\nListo: ${total} documentos en la base "${db.databaseName}".`);
  console.log(`Usuarios de demostración: ${Object.values(EMAIL).join(', ')}  (contraseña: ${DEMO_PASS})`);
} catch (e) {
  console.error('\nNo se pudo cargar la base de datos:', e.message);
  if (/ENOTFOUND|ECONN|timed out|selection/i.test(e.message)) console.error('Revisa en Atlas → Network Access que tu IP (o 0.0.0.0/0) esté permitida.');
  process.exitCode = 1;
} finally {
  await client.close();
}
