# Implementation Plan: Portafolio personal de Álvaro Flores Rocha

**Branch**: `001-portfolio-site` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-site/spec.md`

## Summary

Portafolio bilingüe (ES/EN, un solo toggle) de una sola página con scroll —Hero →
Proyectos → Sobre mí → Stack → Experiencia → Contacto— más cuatro páginas dedicadas de
caso de estudio, construido en **React + Vite** con **React Router v7 (modo librería)**
para las rutas y desplegado en **Vercel**. La identidad visual (paleta bone-gray + un
acento ámbar, tipografías Fraunces/Hanken Grotesk/JetBrains Mono, orbe que sigue el mouse
+ grano, filas `etiqueta → valor`) ya está aprobada y vive en el skill `alvaro-portfolio`;
el enfoque técnico es **portar la hoja de estilos global verbatim** desde
`assets/App.reference.jsx` como ancla de fidelidad y reflejar su árbol de componentes, sin
rediseñar. El idioma se recuerda en `localStorage` (primera visita = español); sin
analítica con cookies.

## Technical Context

**Language/Version**: JavaScript (ES2020+) / JSX; Node.js 20 LTS para tooling. TypeScript
opcional, no requerido por la referencia (que es JSX); se mantiene JSX para fidelidad 1:1.

**Primary Dependencies**: React 18, Vite 7, React Router v7 (modo librería:
`createBrowserRouter` + `RouterProvider`). Sin librerías de animación (el orbe usa
`requestAnimationFrame` + lerp nativo). Sin framework CSS obligatorio: una hoja de estilos
global de CSS plano con custom properties, portada verbatim desde la referencia.

**Storage**: `localStorage` del navegador para una sola clave: el idioma elegido
(`lang` = `es` | `en`). Sin backend, sin base de datos.

**Testing**: Vitest + React Testing Library para lógica (toggle/i18n, paridad de cadenas,
matriz de enlaces); Playwright (opcional) para un humo E2E de navegación y rutas de caso de
estudio; Lighthouse CI / axe para las puertas de accesibilidad y rendimiento. Los tests son
OPCIONALES por plantilla; se incluyen los de paridad i18n y accesibilidad por ser puertas
de la constitución.

**Target Platform**: Web estática (SPA) servida por Vercel; navegadores modernos
evergreen, escritorio y móvil.

**Project Type**: Aplicación web de una sola página (frontend único, sin backend).

**Performance Goals**: Página principal interactiva en < 3 s en banda ancha típica; sin
saltos de contenido perceptibles (CLS ≈ 0); Lighthouse objetivo ≥ 90 en Performance,
Accesibilidad, Best Practices y SEO. Movimiento solo con `transform`/`opacity`.

**Constraints**: Fidelidad exacta al diseño aprobado (Constitución I); `webm` en vez de
GIF con carga diferida; `prefers-reduced-motion` respetado; orbe sin `setState` por
mousemove (rAF + lerp); paridad total ES/EN; WCAG 2.1 AA; sin analítica con cookies.

**Scale/Scope**: 1 página principal con 6 secciones + 4 rutas de caso de estudio + fila
"próximamente". ~6 componentes de sección, 1 plantilla de caso de estudio, 1 capa i18n con
diccionarios bilingües, 1 sistema de orbe/grano reutilizable.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | ¿Cómo lo cumple el plan? | Estado |
|---|---|---|
| **I. Fidelidad al Diseño (NO NEGOCIABLE)** | Hoja de estilos global y tokens `:root` portados **verbatim** desde `assets/App.reference.jsx`; árbol de componentes refleja la referencia; `CaseStudy.reference.jsx` como plantilla. No se introduce Tailwind para recolorear ni se altera estructura/orden. | ✅ PASS |
| **II. Rendimiento como Feature** | `webm` + lazy-load; movimiento solo `transform`/`opacity`; orbe con rAF+lerp (sin re-render por frame); sin librerías pesadas de efectos; objetivo Lighthouse ≥ 90. | ✅ PASS |
| **III. Bilingüe ES/EN paridad total** | Capa i18n con un único estado `lang` a nivel App propagado a todas las secciones y rutas; diccionarios ES/EN espejo; español por defecto; persistencia en `localStorage`. Test de paridad de claves. | ✅ PASS |
| **IV. Documentar Decisiones Técnicas** | `research.md` registra cada decisión (router mode, CSS verbatim, i18n local, deploy) con porqué y alternativas; los casos de estudio incluyen la sección "Decisiones técnicas". | ✅ PASS |
| **V. Accesibilidad** | HTML semántico, foco visible, navegación por teclado en toggle/CTAs/`→`; contraste AA; `prefers-reduced-motion`. Puerta con axe/Lighthouse a11y. | ✅ PASS |

**Resultado del gate**: PASS. Sin violaciones; la sección Complexity Tracking queda vacía.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site/
├── plan.md              # Este archivo (/speckit-plan)
├── research.md          # Fase 0 (decisiones técnicas)
├── data-model.md        # Fase 1 (entidades de contenido)
├── quickstart.md        # Fase 1 (guía de validación)
├── contracts/           # Fase 1 (contratos de UI: rutas, i18n, props)
│   ├── routes.md
│   ├── i18n.md
│   └── components.md
├── checklists/
│   └── requirements.md  # Checklist de calidad del spec
└── tasks.md             # Fase 2 (/speckit-tasks — NO lo crea /speckit-plan)
```

### Source Code (repository root)

```text
index.html               # Entry HTML (root div, preconnect de fuentes)
vite.config.js           # Config de Vite (plugin React)
vercel.json              # Rewrite SPA: todas las rutas → /index.html
public/
├── media/               # Miniaturas .webm de proyectos (placeholders hasta grabar)
├── cv/                   # CV en PDF (placeholder hasta entregar)
└── (favicon / og assets)
src/
├── main.jsx             # createRoot + RouterProvider (react-router/dom)
├── router.jsx           # createBrowserRouter: "/" (Home) + "/proyecto/:slug" (CaseStudy)
├── styles/
│   └── global.css       # Hoja de estilos PORTADA VERBATIM (tokens :root + keyframes)
├── i18n/
│   ├── LangContext.jsx  # Estado `lang` global + persistencia localStorage
│   └── strings.js       # Diccionarios ES/EN (HERO, PROJ, SEC) — copy canónico
├── data/
│   └── projects.js      # projData: los 4 proyectos + matriz de enlaces + "coming soon"
├── components/
│   ├── Orb.jsx          # Orbe ámbar (hero mouse-follow / drift / contact close)
│   ├── Grain.jsx        # Overlay de grano SVG feTurbulence
│   ├── Nav.jsx          # Monograma + enlaces + toggle ES/EN
│   ├── ArrowRow.jsx     # Fila `etiqueta → valor`
│   └── ProjectCard.jsx  # Tarjeta editorial de proyecto (thumb webm, badges, links, →)
├── sections/
│   ├── Hero.jsx
│   ├── Projects.jsx
│   ├── About.jsx
│   ├── Stack.jsx
│   ├── Experience.jsx
│   └── Contact.jsx
└── pages/
    ├── Home.jsx         # Compone las 6 secciones en orden fijo
    └── CaseStudy.jsx    # Plantilla de caso de estudio (desde CaseStudy.reference.jsx)
tests/
├── unit/                # toggle/i18n, paridad de claves, matriz de enlaces
└── e2e/                 # (opcional) navegación + rutas de caso de estudio
```

**Structure Decision**: Proyecto único de frontend (SPA). La separación
`components/` (reutilizables) vs `sections/` (bloques de la home) vs `pages/` (rutas)
refleja directamente `App.reference.jsx` (secciones) y `CaseStudy.reference.jsx` (ruta),
manteniendo la hoja de estilos global como una única ancla de fidelidad en
`src/styles/global.css`.

## Complexity Tracking

> Sin violaciones de la constitución. No aplica.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
