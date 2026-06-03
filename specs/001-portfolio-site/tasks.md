---
description: "Task list for portfolio-site implementation"
---

# Tasks: Portafolio personal de Álvaro Flores Rocha

**Input**: Design documents from `/specs/001-portfolio-site/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Se incluyen solo los tests que la constitución exige como puerta (paridad ES/EN,
matriz de enlaces, accesibilidad/rendimiento). El resto de la verificación es manual vía
`quickstart.md`.

**Organization**: Tareas agrupadas por historia de usuario para implementación y prueba
independientes. Fidelidad al skill `alvaro-portfolio` es restricción transversal
(Constitución I): ante cualquier duda, replicar `assets/App.reference.jsx` y
`assets/CaseStudy.reference.jsx` exactamente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Puede correr en paralelo (archivos distintos, sin dependencias pendientes)
- **[Story]**: US1–US5 (mapea a las historias del spec)
- Cada tarea incluye su ruta de archivo

## Path Conventions

SPA de frontend único en la raíz del repo: `src/`, `public/`, `tests/` (ver plan.md →
Project Structure).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicializar el proyecto Vite + React y anclar la fidelidad de estilos.

- [ ] T001 Scaffold Vite + React en la raíz del repo (`index.html`, `vite.config.js`, `src/main.jsx`, `src/App` mínimo) con `@vitejs/plugin-react`
- [ ] T002 Instalar dependencias: `react`, `react-dom`, `react-router-dom@7`, y dev deps `vitest` + `@testing-library/react` (ver research D1/D2)
- [ ] T003 [P] Configurar ESLint + Prettier en la raíz (`.eslintrc`, `.prettierrc`)
- [ ] T004 [P] Portar la hoja de estilos **verbatim** desde `assets/App.reference.jsx` a `src/styles/global.css` (tokens `:root` + keyframes) e importarla en `src/main.jsx` — ancla de fidelidad (research D3)
- [ ] T005 [P] Añadir `preconnect` + enlaces de Google Fonts (Fraunces, Hanken Grotesk, JetBrains Mono) en `index.html`
- [ ] T006 [P] Crear directorios de assets `public/media/` y `public/cv/` con placeholders (README o `.gitkeep`)

**Checkpoint**: `npm run dev` arranca y sirve una página en blanco con los estilos/fuentes cargados.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestructura compartida que TODAS las historias necesitan (router, i18n,
datos, primitivas visuales). 

**⚠️ CRITICAL**: Ninguna historia puede empezar hasta completar esta fase.

- [ ] T007 Configurar el router en `src/router.jsx` (`createBrowserRouter`: `/` → `Home`, `/proyecto/:slug` → `CaseStudy`, `<ScrollRestoration>`) y montar `<RouterProvider>` desde `react-router/dom` en `src/main.jsx` (contracts/routes.md)
- [ ] T008 Crear `src/i18n/LangContext.jsx`: estado `lang` (`es`|`en`), init desde `localStorage` con fallback `es`, persistencia en cambio, helpers `useLang/setLang/toggle/t`; `LangProvider` por encima del router (contracts/i18n.md)
- [ ] T009 [P] Crear esqueleto de diccionarios `src/i18n/strings.js` con la forma espejo `{es,en}` para `HERO`/`PROJ`/`SEC`/`CASE` (data-model: BilingualString)
- [ ] T010 [P] Crear `src/data/projects.js` con los 4 proyectos + matriz de enlaces + fila `coming-soon` (data-model: Project, orden Maderas→LPR→AirVision→Eventos)
- [ ] T011 [P] Crear `src/components/Grain.jsx` (overlay SVG `feTurbulence`, `mix-blend-mode: multiply`) — design-system
- [ ] T012 [P] Crear scaffold `src/components/Orb.jsx` con prop `mode` ("hero"|"section"|"contact") y render estático (los comportamientos de movimiento se añaden en US5)
- [ ] T013 [P] Crear `src/components/ArrowRow.jsx` (fila `etiqueta → valor`, `href` opcional, operable por teclado con foco visible) — contracts/components.md
- [ ] T014 [P] Añadir `vercel.json` con rewrite SPA de todas las rutas a `/index.html` (research D7)

**Checkpoint**: Rutas `/` y `/proyecto/:slug` resuelven; el contexto de idioma y los datos están disponibles.

---

## Phase 3: User Story 1 - Recorrer el portafolio y conocer a Álvaro (Priority: P1) 🎯 MVP

**Goal**: Página de una sola página con las 6 secciones en orden fijo y contenido real en
español, navegación con smooth-scroll.

**Independent Test**: Cargar `/` sin cambiar idioma; verificar las 6 secciones en orden,
contenido real del skill, proyectos en orden con AirVision destacado, y nav con smooth-scroll.

- [ ] T015 [P] [US1] Crear `src/components/Nav.jsx` (monograma "Álvaro Flores.", enlaces de sección con smooth-scroll a `#work`/`#about`/`#stack`/`#contact`, hueco del toggle ES/EN)
- [ ] T016 [US1] Construir `src/sections/Hero.jsx` (status bar con ubicación + reloj en vivo y `✦ Estado → Disponible`, eyebrow mono, H1 "Hola, soy *Álvaro*.", tagline, `ArrowRow` de datos, fila de CTAs, scroll cue, `<Orb mode="hero">`, `<Grain>`)
- [ ] T017 [P] [US1] Crear `src/components/ProjectCard.jsx` (miniatura `webm` lazy + `poster`, badge de estado, tagline cursiva, métricas mono, chips de stack, enlaces condicionales, botón circular `→` con `<Link to="/proyecto/:slug">`)
- [ ] T018 [US1] Construir `src/sections/Projects.jsx` (`id="work"`, 4 `ProjectCard` en orden, AirVision con anillo/glow "Destacado", fila `coming-soon`)
- [ ] T019 [P] [US1] Construir `src/sections/About.jsx` (`id="about"`, 3 párrafos con el 3º marcado borrador origin-story, panel "glance" de `ArrowRow`)
- [ ] T020 [P] [US1] Construir `src/sections/Stack.jsx` (`id="stack"`, 6 grupos: Lenguajes, Frontend & Móvil, Backend & Datos, Infra & DevOps, Visión & IoT, Otros)
- [ ] T021 [P] [US1] Construir `src/sections/Experience.jsx` (timeline de 3 roles + bloque educación PUCV; SIN "con distinción")
- [ ] T022 [P] [US1] Construir `src/sections/Contact.jsx` (`id="contact"`, heading grande, `ArrowRow` Email/LinkedIn/GitHub/WhatsApp con hover, 2 botones, `<Orb mode="contact">`)
- [ ] T023 [US1] Componer `src/pages/Home.jsx` con las 6 secciones en orden fijo y enlazar la ruta `/`
- [ ] T024 [US1] Cargar el contenido **en español** de `references/content.md` en `src/i18n/strings.js` y `src/data/projects.js` para todas las secciones

**Checkpoint**: US1 funcional y testeable de forma independiente (recorrido completo en español).

---

## Phase 4: User Story 2 - Cambiar el idioma con un solo toggle (Priority: P2)

**Goal**: Un único toggle ES/EN cambia todo el sitio con paridad total y persistencia.

**Independent Test**: Togglear a EN y recorrer todo verificando 100% en inglés; recargar y
seguir en EN; limpiar `localStorage` y volver a español.

- [ ] T025 [US2] Cablear el toggle ES/EN del `src/components/Nav.jsx` a `useLang().toggle()` (único toggle global, R-I4)
- [ ] T026 [US2] Añadir las contrapartes **EN** de cada cadena en `src/i18n/strings.js` (paridad total desde la referencia)
- [ ] T027 [US2] Hacer que todas las secciones consuman `t()`/`lang` para que el toggle cambie el sitio entero sin recarga ni fragmentos
- [ ] T028 [P] [US2] Test de paridad de claves en `tests/unit/i18n-parity.test.js` (falla si alguna clave existe en un solo idioma) — Constitución III (AC-I4)

**Checkpoint**: US1 + US2 funcionan; el sitio es bilingüe con persistencia.

---

## Phase 5: User Story 3 - Explorar el caso de estudio de un proyecto (Priority: P2)

**Goal**: Cada tarjeta abre su caso de estudio con la plantilla fija (incl. "Decisiones técnicas").

**Independent Test**: Abrir los 4 casos desde su tarjeta; verificar plantilla completa,
"Decisiones técnicas", enlace de retorno y deep-link recargable.

- [ ] T029 [US3] Construir `src/pages/CaseStudy.jsx` desde `assets/CaseStudy.reference.jsx` (back link → title block → cover `webm` → Contexto → Problema → Rol → Solución → **Decisiones técnicas (¿Por qué X?)** → Resultados (tiles) → Stack → Aprendizajes [borrador] → next project con orbe de cierre)
- [ ] T030 [P] [US3] Añadir contenido de caso de estudio (ES+EN) de los 4 proyectos a `src/i18n/strings.js` (Maderas, LPR, AirVision, Eventos) con `decisions` y `stats` (data-model: CaseStudy)
- [ ] T031 [US3] Cablear la matriz de enlaces por proyecto (live/repo/CTA primaria) en `ProjectCard.jsx` y `CaseStudy.jsx` según `data-model.md`
- [ ] T032 [P] [US3] Test de matriz de enlaces en `tests/unit/link-matrix.test.js` (cada proyecto expone exactamente los enlaces de la matriz; el `→` siempre abre el caso)

**Checkpoint**: US1–US3 funcionan; los 4 casos de estudio son navegables.

---

## Phase 6: User Story 4 - Contactar a Álvaro y acceder a sus recursos (Priority: P3)

**Goal**: CTAs y filas de Contacto llevan a los destinos correctos.

**Independent Test**: Activar cada CTA/enlace del Hero y de Contacto y verificar destino
correcto (email, LinkedIn, GitHub, WhatsApp, CV, demos).

- [ ] T033 [US4] Cablear las CTAs del Hero en `src/sections/Hero.jsx` (Ver proyectos → `#work`, Contacto → `#contact`, CV, GitHub, LinkedIn) con datos reales del skill
- [ ] T034 [US4] Cablear filas y botones de `src/sections/Contact.jsx` (Email `f.alvaro.ro@gmail.com`, LinkedIn, GitHub `Homzk`, WhatsApp `wa.me/56963505529`) con reacción al hover
- [ ] T035 [P] [US4] Enlazar placeholder del CV (`public/cv/`) y enlaces en vivo (Maderas → maderasponotro.cl; AirVision → demo + GitHub) en datos/secciones

**Checkpoint**: US1–US4 funcionan; el portafolio convierte.

---

## Phase 7: User Story 5 - Firma visual viva pero accesible (Priority: P3)

**Goal**: Orbe con mouse-follow en Hero, drift en secciones, cierre en Contacto; grano;
todo respetando `prefers-reduced-motion` y dispositivos sin hover.

**Independent Test**: Con hover/movimiento: orbe sigue el mouse, deriva, cierra grande;
con `prefers-reduced-motion`: sin animación; sin hover: orbe deriva automático.

- [ ] T036 [US5] Implementar el mouse-follow del Hero en `src/components/Orb.jsx` (rAF + lerp ~0.07 escribiendo `style.transform`; **sin** `setState` por mousemove) — research D5, AC-C2
- [ ] T037 [US5] Implementar modos `section` (keyframe `drift`) y `contact` (keyframe `driftC`, grande/centrado) en `src/components/Orb.jsx`
- [ ] T038 [US5] Añadir fallback sin hover (`matchMedia('(hover: hover)')===false` → trayectoria seno/coseno) en `src/components/Orb.jsx` (FR-021)
- [ ] T039 [US5] Añadir guardas `@media (prefers-reduced-motion: reduce)` para orbe, grano y animaciones de entrada/scroll-cue (FR-020, SC-006)
- [ ] T040 [P] [US5] Verificar grano (`Grain.jsx`) + entrada escalonada (`up`) y scroll cue (`bob`) contra la referencia

**Checkpoint**: Las 5 historias funcionan de forma independiente.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Puertas constitucionales (a11y, rendimiento), assets reales y despliegue.

- [ ] T041 [P] Pase de accesibilidad: HTML semántico, navegación por teclado, `:focus-visible`, contraste AA; correr axe sin violaciones (FR-023/024, SC-004/005)
- [ ] T042 [P] Pase de rendimiento: lazy-load de `webm`, confirmar movimiento solo `transform`/`opacity`, Lighthouse ≥ 90 en las 4 categorías (SC-007/009)
- [ ] T043 Grabar miniaturas `webm` reales + `poster` (Maderas, AirVision) en `public/media/` con la receta `ffmpeg` del quickstart; LPR/Eventos con footage/placeholder
- [ ] T044 [P] Ajustar el repo de AirVision en GitHub ("About": descripción/website/topics) y verificar que la cifra de cobertura sea consistente en todo el sitio
- [ ] T045 Pase de fidelidad contra la referencia (checklist de `references/speckit-workflow.md`): paleta, tipografías, orbe, `→`/`✦`, orden, sin "con distinción", origin-story aún borrador
- [ ] T046 Desplegar en Vercel y validar recarga de deep-link (`/proyecto/lpr`) en producción

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias — empieza de inmediato.
- **Foundational (Phase 2)**: depende de Setup — BLOQUEA todas las historias.
- **User Stories (Phase 3–7)**: dependen de Foundational. Orden de prioridad P1 → P2 → P3.
  - US1 (P1) no depende de otras historias.
  - US2 (P2) extiende el contenido de US1 (necesita las cadenas creadas).
  - US3 (P2) usa el router/datos foundational; se beneficia de US2 para EN pero es testeable sola.
  - US4 (P3) usa Hero/Contact de US1.
  - US5 (P3) mejora el orbe scaffold de Foundational; independiente del contenido.
- **Polish (Phase 8)**: depende de las historias deseadas completas.

### User Story Dependencies

- US1: solo Foundational.
- US2: Foundational + cadenas de US1 (paridad EN sobre las claves ES existentes).
- US3: Foundational (router/datos). Contenido EN de casos se completa mejor tras US2.
- US4: Foundational + Hero/Contact (US1).
- US5: Foundational (Orb scaffold). Independiente del contenido textual.

### Within Each User Story

- Componentes reutilizables antes que las secciones que los usan.
- Secciones antes de componer `Home`.
- Contenido (cadenas) puede ir en paralelo a la estructura cuando son archivos distintos.

---

## Parallel Opportunities

- **Setup**: T003, T004, T005, T006 en paralelo tras T001/T002.
- **Foundational**: T009, T010, T011, T012, T013, T014 en paralelo tras T007/T008.
- **US1**: T017, T019, T020, T021, T022 en paralelo (componentes/secciones en archivos
  distintos); T015 en paralelo; T016/T018/T023 secuencian por dependencia de Orb/Card/Home.
- **US3**: T030 y T032 en paralelo a T029/T031.
- **Polish**: T041, T042, T044 en paralelo.

### Parallel Example: User Story 1

```bash
# Tras Foundational, lanzar en paralelo los componentes/secciones independientes:
Task: "T017 [US1] Crear src/components/ProjectCard.jsx"
Task: "T019 [US1] Construir src/sections/About.jsx"
Task: "T020 [US1] Construir src/sections/Stack.jsx"
Task: "T021 [US1] Construir src/sections/Experience.jsx"
Task: "T022 [US1] Construir src/sections/Contact.jsx"
```

---

## Implementation Strategy

### MVP First (solo US1)

1. Completar Phase 1: Setup.
2. Completar Phase 2: Foundational (CRÍTICO — bloquea todo).
3. Completar Phase 3: US1.
4. **PARAR y VALIDAR**: probar el recorrido one-page en español contra la referencia.
5. Desplegar/demostrar si está listo (MVP).

### Incremental Delivery

1. Setup + Foundational → base lista.
2. US1 → recorrido en español (MVP) → validar → demo.
3. US2 → bilingüe con persistencia → validar → demo.
4. US3 → casos de estudio → validar → demo.
5. US4 → contacto/CTAs → validar.
6. US5 → firma visual accesible → validar.
7. Polish → a11y/perf/assets/deploy.

### Notes

- [P] = archivos distintos, sin dependencias pendientes.
- Cada historia debe quedar completable y testeable de forma independiente.
- Tras cada sección, cotejar visualmente contra `assets/App.reference.jsx` (fidelidad).
- Commit tras cada tarea o grupo lógico.
- Evitar: tareas vagas, conflictos en el mismo archivo, dependencias cruzadas que rompan la
  independencia de las historias.
