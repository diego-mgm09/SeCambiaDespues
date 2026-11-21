// Conexión a MongoDB reutilizada entre invocaciones (importante en serverless)
import { MongoClient } from 'mongodb';
import { HttpError } from './http.js';

const g = globalThis;
g.__mongo ??= { promise: null };

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { const e = new HttpError(500, 'Falta la variable de entorno MONGODB_URI'); e.expose = true; throw e; }
  if (!g.__mongo.promise) {
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8000 });
    g.__mongo.promise = client.connect().catch((err) => { g.__mongo.promise = null; throw err; });
  }
  const client = await g.__mongo.promise;
  return client.db(process.env.MONGODB_DB || 'panoramic');
}