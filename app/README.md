# Panoramic · app (React + API Node + MongoDB)

Proyecto desplegable en **Vercel** como un solo sitio: la interfaz React (Vite) y la API (funciones Node en `/api`) comparten la misma URL, sin CORS. La base de datos es **MongoDB Atlas**.

```
app/
  api/            Funciones de Vercel (cada archivo = un endpoint)
    health.js            GET  /api/health          estado del servicio y la base de datos
    auth/login.js        POST /api/auth/login      correo + contraseña → token de sesión
    auth/me.js           GET  /api/auth/me         sesión y permisos
    summary.js           GET  /api/summary         conteos por estado (insignias del menú)
    [resource]/index.js  GET/POST  /api/<coleccion>        lista y crea
    [resource]/[id].js   GET/PATCH/DELETE /api/<coleccion>/<id>
  lib/            Lógica de servidor: conexión Mongo, JWT, permisos, CRUD genérico con validación
  shared/model.js Modelo de datos GENERADO desde ../mockup (no editar a mano)
  scripts/        generate-model, seed (carga datos), check (diagnóstico)
  src/            Interfaz React (login, menú con submenús, módulos, procesos, tour)
```

## Variables de entorno
Copia `.env.example` a `.env` (local) y créalas igual en Vercel. **Nunca subas `.env` a GitHub** (ya está en `.gitignore`).

| Variable | Qué es |
|---|---|
| `MONGODB_URI` | Cadena de conexión de Atlas (`mongodb+srv://usuario:clave@cluster…`) |
| `MONGODB_DB` | Nombre de la base (por defecto `panoramic`) |
| `JWT_SECRET` | Texto aleatorio de 16+ caracteres para firmar sesiones |

## Uso local
```bash
npm install
npm run check      # verifica variables y conexión a Mongo
npm run seed       # carga los datos de ejemplo del mockup (repetible)
npm run dev        # http://localhost:5173  (la API corre en el mismo puerto)
```
Usuarios de demostración (contraseña `panoramic`): `luis@panoramic.gt` (Administrativo), `ana@panoramic.gt` (Maestro de Obra), `carlos@panoramic.gt` (Obrero).

## Desplegar en Vercel
1. Sube el repositorio a GitHub (ver README de la raíz).
2. En Atlas → **Network Access** agrega `0.0.0.0/0` (las IP de Vercel cambian).
3. En Vercel → **Add New → Project** → importa el repo y en **Root Directory** elige **`app`**. Framework: Vite (se detecta solo).
4. En **Environment Variables** agrega `MONGODB_URI`, `MONGODB_DB` y `JWT_SECRET`.
5. **Deploy**. Abre `https://TU-PROYECTO.vercel.app/api/health`: debe responder `"db": "conectada"`.
6. Carga los datos una vez desde tu computadora con `npm run seed` (usa el mismo `MONGODB_URI`).

## Cómo funciona el modelo de datos
El mockup (`../mockup/data.js`, `data2.js`) es la fuente. `npm run model` genera `shared/model.js`, que usan la interfaz y la API:
- Cada módulo es una **colección** (`proyectos`, `movimientos_bodega`, `cuentas_por_pagar`, …).
- Las **columnas visibles** del mockup son los campos principales de cada documento.
- Los demás campos del modelo (cientos, con tipo y descripción) forman la **ficha completa**, opcional en el formulario.
- Toda colección lleva auditoría: `creado_en/por`, `actualizado_en/por`, `eliminado_en` (borrado lógico) y `version` (control de edición simultánea).
- Si cambias el mockup, ejecuta `npm run model` y `npm run seed`.

## Permisos
Salen del menú de cada perfil: **admin** lee y escribe todo; **maestro** lee y escribe sus módulos; **obrero** solo lee los suyos y crea solicitudes de bodega (siempre quedan *Pendiente*). Usuarios y roles solo los ve el admin. Tras 5 contraseñas erróneas la cuenta se bloquea 15 minutos.

## Seguridad
- Rota la contraseña de la base de datos si alguna vez se compartió fuera de `.env`/Vercel.
- Usa un `JWT_SECRET` propio y largo en producción.
- Los usuarios de demostración comparten una contraseña pública: bórralos o cámbiala antes de usar datos reales.

## Si `npm install` falla con `UNABLE_TO_VERIFY_LEAF_SIGNATURE`
Un firewall de la red (por ejemplo Fortinet) inspecciona el tráfico. Cambia de red (hotspot del celular), o pide a TI el certificado de la CA y ejecútalo así: `set NODE_EXTRA_CA_CERTS=C:\ruta\ca.pem` antes de `npm install`. Evita `strict-ssl=false`.