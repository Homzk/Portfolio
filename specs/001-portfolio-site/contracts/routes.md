# Contract — Rutas (React Router v7, modo librería)

Definidas en `src/router.jsx` con `createBrowserRouter` y renderizadas por
`RouterProvider` (`react-router/dom`). `<ScrollRestoration>` en el layout raíz lleva el
scroll al tope en cada cambio de ruta.

## Tabla de rutas

| Path | Componente | Descripción | Notas |
|---|---|---|---|
| `/` | `Home` | Página principal: 6 secciones en orden fijo. | Enlaces de nav usan anclas `#work`, `#about`, `#stack`, `#contact` con smooth-scroll. |
| `/proyecto/:slug` | `CaseStudy` | Plantilla de caso de estudio parametrizada. | `:slug` ∈ `maderas` \| `lpr` \| `airvision` \| `eventos`. |
| `*` | `Home` (o NotFound mínimo) | Fallback. | Slug desconocido → redirigir a `/` o mostrar aviso simple. |

## Comportamiento

- **Navegación interna**: usar `<Link>` (no `<a>`) para `/` ↔ `/proyecto/:slug` para evitar
  recargas completas.
- **Botón `→` de tarjeta**: `<Link to={'/proyecto/' + slug}>` (FR-004, FR-011).
- **Enlace de retorno** en `CaseStudy`: `<Link to="/">` (FR-014).
- **Coherencia de idioma** (FR-010): el estado `lang` vive en un proveedor por encima del
  router, por lo que persiste al navegar entre rutas sin recargar.
- **Anclas de sección**: los `id` de sección son `work`, `about`, `stack`, `contact`
  (Hero y Experience no requieren id para el nav, según referencia).

## Deep-linking / hosting

`vercel.json` reescribe todas las rutas a `/index.html` para que recargar
`/proyecto/airvision` no dé 404 (ver research D7).

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Criterios de aceptación

- AC-R1: Visitar `/proyecto/maderas` directamente (recarga) renderiza el caso de estudio de
  Maderas sin 404.
- AC-R2: Pulsar el `→` de cada tarjeta abre su caso de estudio correspondiente.
- AC-R3: El enlace de retorno vuelve a `/` y el scroll queda al tope.
- AC-R4: El idioma elegido se mantiene al cambiar de ruta.
