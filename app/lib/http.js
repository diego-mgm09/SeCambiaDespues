// Utilidades HTTP para las funciones de Vercel
export class HttpError extends Error {
  constructor(status, message, fields) { super(message); this.status = status; this.fields = fields; }
}

// Envuelve un handler: valida método, captura errores y responde siempre JSON
export function handler(methods, fn) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    try {
      if (!methods.includes(req.method)) {
        res.setHeader('Allow', methods.join(', '));
        throw new HttpError(405, 'Método no permitido');
      }
      const out = await fn(req, res);
      if (out !== undefined && !res.writableEnded) res.status(200).json(out);
    } catch (e) {
      const status = e.status || (e.code === 11000 ? 409 : 500);
      if (status >= 500) console.error('[api]', req.method, req.url, e);
      const msg = e.code === 11000 ? 'Ya existe un registro con ese valor único' : status >= 500 ? (e.expose ? e.message : 'Error interno del servidor') : e.message;
      if (!res.writableEnded) res.status(status).json({ error: msg, ...(e.fields ? { fields: e.fields } : {}) });
    }
  };
}

export const body = (req) => (req.body && typeof req.body === 'object' ? req.body : {});