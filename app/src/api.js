// Cliente de la API (misma URL en Vercel: /api/...)
const KEY = 'pan_session';
let session = null;
try { session = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { /* sin sesión */ }

export const getSession = () => session;
export function setSession(s) {
  session = s;
  try { s ? sessionStorage.setItem(KEY, JSON.stringify(s)) : sessionStorage.removeItem(KEY); } catch { /* ignorar */ }
}

export async function api(path, { method = 'GET', body } = {}) {
  let r;
  try {
    r = await fetch('/api' + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(session ? { Authorization: 'Bearer ' + session.token } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch { throw Object.assign(new Error('No se pudo conectar con el servidor'), { status: 0 }); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    if (r.status === 401 && session) window.dispatchEvent(new Event('pan:logout'));
    throw Object.assign(new Error(j.error || 'Error ' + r.status), { status: r.status, fields: j.fields });
  }
  return j;
}

export const login = (email, password) => api('/auth/login', { method: 'POST', body: { email, password } });
