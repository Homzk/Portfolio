# Contract — Componentes (props y responsabilidades)

Refleja el árbol de `assets/App.reference.jsx`. La forma exacta (markup/clases) la fija la
referencia; aquí se acota la interfaz y el comportamiento observable. Fidelidad =
Constitución I.

## Reutilizables (`src/components/`)

### Orb
`<Orb mode="hero" | "section" | "contact" />`
- `hero`: sigue el mouse vía rAF+lerp (~0.07), escribiendo `style.transform`; en
  `matchMedia('(hover: hover)')===false` deriva por trayectoria automática.
- `section`: keyframe `drift` lento, posición estática sangrando un borde.
- `contact`: keyframe `driftC`, grande (~560px) y centrado, "cierra" la página.
- Todas las animaciones se anulan bajo `prefers-reduced-motion: reduce` (FR-020/021).
- `pointer-events: none`, `z-index: 0`, detrás del contenido.

### Grain
`<Grain />` — overlay SVG `feTurbulence` data-URI, `mix-blend-mode: multiply`, flicker
sutil. Sin red. Presente en todo el sitio (FR-018).

### Nav
`<Nav />` — monograma "Álvaro Flores." (izq.), enlaces de sección + **toggle ES/EN** (der.).
Único lugar con el toggle (R-I4). Enlaces hacen smooth-scroll a anclas.

### ArrowRow
`<ArrowRow label value href? />` — fila `etiqueta → valor` (glifo `→`). Si `href`, es
enlace operable por teclado con foco visible (FR-023).

### ProjectCard
`<ProjectCard project={Project} />`
- Miniatura `webm` (lazy, con `poster`), badge de estado, tagline en cursiva, descripción,
  métricas mono (puntos ámbar), chips de stack, enlaces condicionales (`liveUrl`/`repoUrl`),
  y botón circular `→` que enlaza a `/proyecto/:slug`.
- `featured` aplica anillo/glow + tag "Destacado/Featured" (solo AirVision).

## Secciones (`src/sections/`) — orden fijo en `Home`

| Componente | id | Contenido | Orbe |
|---|---|---|---|
| `Hero` | — | nav, status bar (ubicación + reloj en vivo, `✦ Estado → Disponible`), eyebrow, H1 con nombre en cursiva, tagline, filas `→`, CTAs, scroll cue | hero (mouse-follow) |
| `Projects` | `work` | 4 `ProjectCard` en orden + fila "coming soon"; AirVision featured | section (drift) |
| `About` | `about` | 2 columnas: 3 párrafos (3º = borrador origin-story) + panel "glance" de filas `→` | section |
| `Stack` | `stack` | 6 `StackGroup` en tarjetas | section |
| `Experience` | — | timeline de 3 roles + bloque educación PUCV | section |
| `Contact` | `contact` | heading grande, filas `→` (Email/LinkedIn/GitHub/WhatsApp) con hover, 2 botones | contact (close) |

## Páginas (`src/pages/`)

### Home
Compone las 6 secciones en orden fijo; provee el contexto de idioma ya disponible desde el
`LangProvider` raíz.

### CaseStudy
Lee `:slug`, resuelve el contenido del caso, renderiza la plantilla fija (back link →
title block → cover `webm` → Contexto → Problema → Rol → Solución → **Decisiones técnicas** →
Resultados → Stack → Aprendizajes → next project con orbe de cierre). La sección
"Decisiones técnicas" es obligatoria (Constitución IV).

## Criterios de aceptación transversales

- AC-C1: Toda función interactiva (nav, toggle, CTAs, `→`, filas con href) es alcanzable y
  operable por teclado con foco visible (FR-023, SC-004).
- AC-C2: El Hero no usa `setState` por mousemove (verificable por revisión: el orbe se
  mueve vía `requestAnimationFrame`).
- AC-C3: Con `prefers-reduced-motion`, ninguna animación de orbe/grano/entrada corre
  (FR-020, SC-006).
- AC-C4: Orden de secciones y de proyectos exactamente como la referencia (FR-001, FR-003).
