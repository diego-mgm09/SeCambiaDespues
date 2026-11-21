// Verifica la configuración y la base de datos. Ejecutar: npm run check
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import model from '../shared/model.js';

const ok = (b) => (b ? '✔' : '✘');
console.log(`${ok(process.env.MONGODB_URI)} MONGODB_URI   ${ok((process.env.JWT_SECRET || '').length >= 16)} JWT_SECRET (≥16 caracteres)`);
if (!process.env.MONGODB_URI) process.exit(1);
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'panoramic');
  await db.command({ ping: 1 });
  console.log(`✔ Conectado a la base "${db.databaseName}"\n`);
  let total = 0;
  for (const m of Object.values(model.modules).filter((x) => x.table)) {
    const n = await db.collection(m.table).countDocuments({ eliminado_en: null });
    total += n; console.log(`  ${m.table.padEnd(22)} ${String(n).padStart(4)}`);
  }
  console.log(`\nTotal: ${total} documentos. ${total ? '' : 'La base está vacía: ejecuta npm run seed'}`);
} catch (e) {
  console.error('✘ No se pudo conectar:', e.message);
  console.error('  Revisa usuario/contraseña y que Atlas → Network Access permita tu IP (o 0.0.0.0/0 para Vercel).');
  process.exitCode = 1;
} finally { await client.close(); }