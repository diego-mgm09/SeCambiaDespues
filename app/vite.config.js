import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// En desarrollo, sirve las funciones de /api con el mismo código que usa Vercel (sin instalar la CLI de Vercel).
function localApi(env) {
  return {
    name: 'panoramic-local-api',
    configureServer(server) {
      Object.assign(process.env, env);
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) return next();
        const url = new URL(req.url, 'http://local');
        const parts = url.pathname.split('/').filter(Boolean).slice(1); // sin "api"
        const query = Object.fromEntries(url.searchParams);
        let file = null;
        const direct = path.join('api', ...parts) + '.js';
        if (parts.length && fs.existsSync(direct)) file = direct;
        else if (parts.length === 1) { file = 'api/[resource]/index.js'; query.resource = parts[0]; }
        else if (parts.length === 2) { file = 'api/[resource]/[id].js'; query.resource = parts[0]; query.id = parts[1]; }
        if (!file) { res.statusCode = 404; res.setHeader('Content-Type', 'application/json'); return res.end('{"error":"Ruta no encontrada"}'); }
        let raw = '';
        for await (const c of req) raw += c;
        let body; try { body = raw ? JSON.parse(raw) : undefined; } catch { body = undefined; }
        req.query = query; req.body = body;
        res.status = (c) => { res.statusCode = c; return res; };
        res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); };
        try { (await server.ssrLoadModule('/' + file)).default(req, res); }
        catch (e) { console.error(e); res.statusCode = 500; res.end('{"error":"Error cargando la función"}'); }
      });
    }
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(loadEnv(mode, process.cwd(), ''))]
}));