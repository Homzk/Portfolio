# Research — Portafolio Álvaro Flores Rocha (Fase 0)

Decisiones técnicas y su justificación (Constitución IV: documentar el porqué). No quedan
marcadores `NEEDS CLARIFICATION`: el spec fue clarificado y el diseño está fijado por el
skill `alvaro-portfolio`.

## D1 — Framework de build: Vite + React

- **Decision**: Vite 7 con React 18 (plugin `@vitejs/plugin-react`), JSX (no TypeScript).
- **Rationale**: La implementación de referencia (`assets/App.reference.jsx`) es JSX y el
  skill manda fidelidad 1:1; Vite da arranque instantáneo, HMR y build optimizado con
  Rollup, alineado con la puerta de rendimiento. Scripts estándar `vite build` /
  `vite preview` para validar el bundle de producción localmente.
- **Alternatives considered**: Next.js (descartado: SSR/route framework innecesario para
  una SPA estática y añadiría divergencia respecto a la referencia); CRA (obsoleto, lento).
- **Fuente**: Context7 `/vitejs/vite` (scripts build/preview; `public/` se copia al output).

## D2 — Enrutado: React Router v7 en modo librería

- **Decision**: React Router v7 como **librería** (no framework): `createBrowserRouter`
  con un árbol de rutas y `RouterProvider` importado desde `react-router/dom`. Rutas:
  `/` → `Home`; `/proyecto/:slug` → `CaseStudy`. Navegación con `<Link>`; scroll al tope
  en cambio de ruta con `<ScrollRestoration>`. Los enlaces de sección de la home usan
  anclas (`#work`, `#about`, …) con smooth-scroll.
- **Rationale**: Es la API actual y recomendada para datos/rutas en v7; el modo librería
  evita adoptar el framework completo (loaders/SSR) que no necesitamos. `:slug` permite una
  sola plantilla `CaseStudy` parametrizada para los 4 proyectos.
- **Alternatives considered**: Modo framework de React Router v7 (descartado: SSR/FS-routing
  innecesario); enrutado manual por estado (descartado: rompe deep-links, historial y
  accesibilidad de URL); HashRouter (descartado: URLs feas, peor SEO).
- **Fuente**: Context7 `/remix-run/react-router` (`createBrowserRouter`, `RouterProvider`
  de `react-router/dom`, rutas con `:param`, `ScrollRestoration`).

## D3 — Estilos: hoja global de CSS portada verbatim (ancla de fidelidad)

- **Decision**: Copiar la hoja de estilos de la referencia **verbatim** a
  `src/styles/global.css`, incluyendo los tokens `:root` y todos los keyframes; importarla
  una sola vez en `main.jsx`. Tailwind NO se usa para recolorear ni re-derivar tipografía.
- **Rationale**: Constitución I (fidelidad no negociable) y la nota del skill: el CSS de la
  referencia es el ancla de fidelidad; re-derivar colores/tipografía en utilidades invita a
  drift. Mantener un único stylesheet global hace trivial verificar paridad con la referencia.
- **Alternatives considered**: Tailwind con valores arbitrarios (descartado: drift,
  prototipado sin compilador Tailwind); CSS Modules por componente (descartado para los
  tokens globales; podría usarse solo para layout local sin tocar los tokens).
- **Riesgo/seguimiento**: Verificar que las fuentes (Fraunces, Hanken Grotesk, JetBrains
  Mono) se cargan igual que en la referencia (Google Fonts con `preconnect`).

## D4 — Internacionalización: estado `lang` propio + diccionarios espejo

- **Decision**: Un `LangContext` a nivel App con estado `lang` (`es` | `en`), inicializado
  desde `localStorage` (clave única) con fallback a `es`; persistir en cada cambio. Los
  textos viven en `src/i18n/strings.js` (diccionarios `HERO`/`PROJ`/`SEC` espejo ES/EN,
  copy canónico de `references/content.md`). El toggle (solo en el Hero) cambia el estado
  global; todas las secciones y la ruta de caso de estudio lo consumen vía contexto.
- **Rationale**: El sitio tiene un conjunto cerrado y pequeño de cadenas; una librería i18n
  (i18next) añadiría peso y complejidad contra la puerta de rendimiento. Un test de paridad
  de claves garantiza Constitución III (paridad total). `localStorage` cumple la
  clarificación de persistencia sin cookies (FR-010a, FR-027).
- **Alternatives considered**: `react-i18next` (descartado: sobredimensionado, +peso);
  routing por idioma `/es` `/en` (descartado: el spec pide un solo toggle global, no rutas
  separadas; duplicaría URLs).
- **Edge**: `localStorage` no disponible (modo privado estricto) → degradar a estado en
  memoria con default `es`, sin romper.

## D5 — Sistema de orbe y grano (movimiento)

- **Decision**: `Orb.jsx` reutilizable con modos: hero (sigue el mouse con
  `requestAnimationFrame` + lerp ~0.07 escribiendo `style.transform` directo, nunca
  `setState` por frame; en `(hover: none)` deriva por trayectoria seno/coseno),
  intermedio (keyframe `drift`) y contacto (keyframe `driftC`, grande y centrado).
  `Grain.jsx` = overlay SVG `feTurbulence` data-URI con `mix-blend-mode: multiply`.
  Todo envuelto en `@media (prefers-reduced-motion: reduce){ animation:none }`.
- **Rationale**: Constitución II (movimiento solo `transform`/`opacity`, sin reflow) y la
  regla de cohesión del orbe del design-system. rAF+lerp evita re-render por mousemove.
- **Alternatives considered**: Framer Motion / GSAP (descartado: peso y dependencia
  innecesaria); animar `left/top` (descartado: dispara layout, viola Constitución II).
- **Fuente**: `references/design-system.md` (gradiente, blur, factores de lerp, keyframes).

## D6 — Medios `webm` y carga diferida

- **Decision**: Miniaturas de proyecto como `<video autoplay loop muted playsinline
  poster>` en `.webm`, servidas desde `public/media/`, con `loading`/`preload` diferido y
  un poster estático. Hasta grabar los clips reales, usar el placeholder animado de la
  referencia (sweep + pulsos + caption mono). Receta de codificación en quickstart (T8).
- **Rationale**: Constitución II (`webm` sobre GIF, lazy-load); evita penalizar la carga
  inicial y mantiene CLS bajo con `poster` + dimensiones reservadas.
- **Alternatives considered**: GIF (prohibido por constitución: peso); `<img>` estático
  (pierde el movimiento aprobado de la firma editorial).

## D7 — Despliegue: Vercel con rewrite SPA

- **Decision**: Desplegar el build estático de Vite en Vercel. Añadir `vercel.json` con un
  rewrite de todas las rutas a `/index.html` para que los deep-links de caso de estudio
  (`/proyecto/airvision`) funcionen al recargar. Build command `vite build`, output `dist/`.
- **Rationale**: React Router en modo librería hace enrutado en cliente; sin el rewrite,
  recargar una ruta profunda daría 404 en hosting estático. Vercel es el target del skill y
  el mismo flujo con que se construyó AirVision.
- **Alternatives considered**: Netlify (`_redirects`) — equivalente, pero el skill fija
  Vercel; hosting sin rewrite (descartado: rompe deep-links).

## D8 — Analítica y privacidad

- **Decision**: Sin analítica basada en cookies ni seguimiento de datos personales; por
  tanto, sin banner de consentimiento (FR-027). Si en el futuro se quisiera medir tráfico,
  usar una solución agregada sin cookies.
- **Rationale**: Clarificación Q3; alineado con la tesis de rendimiento/privacidad y evita
  trabajo de cumplimiento RGPD.

## Decisiones diferidas a `/speckit-tasks` o implementación

- Estructura exacta de carpetas de assets y nombres de archivos `webm` (T8).
- Si se añade Vitest/Playwright desde el inicio o tras el MVP visual (orden de tareas).
- Posterización exacta y duración de cada clip `webm` (al grabar el sitio en vivo).
