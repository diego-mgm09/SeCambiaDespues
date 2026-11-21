# Panoramic

ERP de construcción: bodegas por proyecto, compras, contabilidad NIIF, facturación, procesos y capacitación.

```
PANORAMIC/
  mockup/   Diseño de referencia (HTML/CSS/JS plano, datos ficticios). Sirve como demo estática y como fuente del modelo de datos.
  app/      Proyecto real: React + API Node (funciones de Vercel) + MongoDB Atlas. Ver app/README.md
```

## Subir a GitHub
```bash
git init
git add .
git commit -m "Panoramic: mockup + app"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/panoramic.git
git push -u origin main
```
Antes de `git add .` confirma con `git status` que **no aparezca ningún `.env`**.

## Vercel (dos proyectos desde el mismo repositorio)
| Proyecto | Root Directory | Para qué |
|---|---|---|
| `panoramic` | `app` | Sistema real. Requiere variables `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET` |
| `panoramic-demo` | `mockup` | Demo estática sin base de datos. Respaldo para la presentación |

Detalles de variables, base de datos y comandos en [app/README.md](app/README.md).

## Consejos para el hackathon
- Despliega **temprano** (aunque esté a medias) y verifica `/api/health` antes de seguir.
- Ten la demo estática (`mockup`) abierta en otra pestaña como plan B si falla la red o la base.
- Carga los datos (`npm run seed`) antes de presentar y entra una vez para "despertar" la conexión.
- Ensaya el recorrido: login → inicio → bodega por proyecto → proceso de compra → cuentas por pagar.