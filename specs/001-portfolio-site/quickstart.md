# Quickstart — Portafolio Álvaro Flores Rocha

Guía para arrancar, validar y desplegar. Detalle de diseño/contenido: skill
`alvaro-portfolio`. Contratos: `contracts/`. Modelo de contenido: `data-model.md`.

## Prerrequisitos

- Node.js 20 LTS y npm.
- (Para grabar `webm` en T8) `ffmpeg`.

## Setup inicial

```bash
# Scaffold (si el proyecto aún no existe)
npm create vite@latest . -- --template react
npm install
npm install react-router-dom@7   # React Router v7

# Arrancar dev server
npm run dev
```

Tras el scaffold, portar `src/styles/global.css` **verbatim** desde
`assets/App.reference.jsx` e importarlo en `src/main.jsx` (ancla de fidelidad, research D3).

## Comandos

| Acción | Comando |
|---|---|
| Dev server (HMR) | `npm run dev` |
| Build producción | `npm run build` |
| Previsualizar build | `npm run preview` |
| Tests unitarios | `npm run test` (Vitest) |
| E2E humo (opcional) | `npm run test:e2e` (Playwright) |
| Auditoría Lighthouse | `npx lighthouse http://localhost:4173 --view` (sobre `preview`) |

## Escenarios de validación (mapa a historias y FR)

### V1 — Recorrido one-page en español (US1)
1. `npm run dev`, abrir `/` con `localStorage` limpio.
2. **Esperado**: Hero en español (eyebrow, H1 "Hola, soy *Álvaro*.", status bar con reloj
   en vivo y "✦ Estado → Disponible"); secciones en orden Hero → Proyectos → Sobre mí →
   Stack → Experiencia → Contacto; proyectos en orden Maderas → LPR → AirVision → Eventos →
   "coming soon", AirVision destacado. (FR-001..006; AC-C4)
3. Click en enlaces de nav → smooth-scroll a la sección. (FR-006)

### V2 — Toggle bilingüe con persistencia (US2)
1. Activar el toggle a EN → todo el sitio cambia a inglés, sin fragmentos en español.
2. Recargar → el sitio sigue en inglés. Borrar `localStorage` y recargar → vuelve a español.
3. **Esperado**: AC-I1..I3; FR-007..010a. Correr `npm run test` → pasa el test de paridad
   de claves (AC-I4).

### V3 — Casos de estudio (US3)
1. Pulsar el `→` de cada tarjeta → abre `/proyecto/:slug`.
2. Recargar `/proyecto/airvision` directamente → renderiza sin 404 (rewrite SPA).
3. **Esperado**: plantilla completa con la sección "Decisiones técnicas (¿Por qué X?)";
   enlace de retorno vuelve a `/` con scroll al tope. (FR-011..014; AC-R1..R4)

### V4 — Contacto y enlaces por matriz (US4)
1. Probar CTAs del Hero (proyectos, contacto, CV, GitHub, LinkedIn) y filas de Contacto
   (Email/LinkedIn/GitHub/WhatsApp).
2. Verificar enlaces en vivo: Maderas → maderasponotro.cl; AirVision → demo + GitHub.
3. **Esperado**: FR-013, FR-015..017.

### V5 — Firma visual y accesibilidad (US5 + transversales)
1. Con hover y movimiento permitido: el orbe sigue el mouse en el Hero, deriva en secciones,
   cierra grande en Contacto; grano presente. (FR-018)
2. Activar `prefers-reduced-motion: reduce` (DevTools → Rendering) → sin animaciones. (FR-020)
3. Emular dispositivo sin hover → el orbe deriva automáticamente. (FR-021)
4. Navegar todo solo con teclado (Tab/Enter) con foco visible. (FR-023, SC-004)
5. `npx lighthouse` sobre `preview` → Performance/Accesibilidad/Best Practices/SEO ≥ 90;
   axe sin violaciones AA. (SC-005, SC-007, SC-009)

## Despliegue (Vercel)

1. Añadir `vercel.json` con el rewrite SPA (ver `contracts/routes.md`).
2. Conectar el repo en Vercel; build `vite build`, output `dist/`.
3. Validar que recargar una ruta profunda (`/proyecto/lpr`) funciona en producción.

## Grabar miniaturas `webm` (T8)

```bash
ffmpeg -i input.mov -t 5 -an -c:v libvpx-vp9 -b:v 0 -crf 34 -vf "scale=720:-2,fps=24" public/media/<slug>.webm
```

El componente `src/components/ProjectThumb.jsx` ya renderiza el `<video>` (loop, muted,
playsInline, lazy, con poster y respeto a `prefers-reduced-motion`). Para **activar** la
miniatura en vídeo de un proyecto:

1. Deja el clip en `public/media/<slug>.webm` (slug = `maderas` · `lpr` · `airvision` ·
   `eventos`) y, opcional, un poster estático en `public/media/<slug>.jpg`.
2. En `src/data/projects.js`, cambia ese slug a `true` en `VIDEO_READY`.

Mientras siga en `false`, la tarjeta muestra el placeholder animado de la referencia (sin
peticiones 404).

## Reemplazar el CV

Los botones "CV" (Hero) y "Descargar CV" (Contacto) descargan
`public/cv/Alvaro-Flores-Rocha-CV.pdf` (hoy un placeholder válido generado por
`scripts/make-placeholder-cv.mjs`). Para poner el real: **reemplaza ese archivo por tu PDF
con el mismo nombre** — no hay que tocar código. Si prefieres otro nombre, actualiza
`CV_URL` y `CV_FILENAME` en `src/data/site.js`.

## Puerta de fidelidad antes de "hecho"

Recorrer la checklist de fidelidad del skill (`references/speckit-workflow.md`): paleta y
tipografías exactas, orbe/grano correctos, filas `→` y `✦`, orden de secciones/proyectos,
"Decisiones técnicas" presente, sin "con distinción", origin-story aún en borrador, rápido
(`webm`, lazy, transform-only).
