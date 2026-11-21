import bcrypt from 'bcryptjs';
import { handler, body, HttpError } from '../../lib/http.js';
import { getDb } from '../../lib/db.js';
import { signToken } from '../../lib/auth.js';

const MAX_FALLOS = 5, BLOQUEO_MIN = 15;
const hora = () => 'Hoy ' + new Date().toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Guatemala' });

// POST /api/auth/login  { email, password } → { token, user }
export default handler(['POST'], async (req) => {
  const { email, password } = body(req);
  if (!email || !password) throw new HttpError(400, 'Escribe correo y contraseña');
  const col = (await getDb()).collection('usuarios');
  const u = await col.findOne({ email: String(email).trim().toLowerCase(), eliminado_en: null });
  const invalido = new HttpError(401, 'Correo o contraseña incorrectos');
  if (!u || !u.password_hash) throw invalido;
  if (u.bloqueado_hasta && u.bloqueado_hasta > new Date()) throw new HttpError(423, 'Cuenta bloqueada temporalmente por intentos fallidos. Intenta en unos minutos');
  if (!(await bcrypt.compare(String(password), u.password_hash))) {
    const fallos = (u.intentos_fallidos || 0) + 1;
    await col.updateOne({ _id: u._id }, { $set: { intentos_fallidos: fallos, ...(fallos >= MAX_FALLOS ? { bloqueado_hasta: new Date(Date.now() + BLOQUEO_MIN * 60000), intentos_fallidos: 0 } : {}) } });
    throw invalido;
  }
  await col.updateOne({ _id: u._id }, { $set: { intentos_fallidos: 0, bloqueado_hasta: null, ultimo_acceso: hora() } });
  const [nombre] = String(u.usuario).split('|');
  const user = { id: String(u._id), nombre, email: u.email, perfil: u.perfil || 'obrero', rol: u.rol };
  return { token: signToken(user), user };
});