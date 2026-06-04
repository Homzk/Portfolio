# Portafolio — Álvaro Flores Rocha

Portafolio personal de **Álvaro Flores Rocha**, Desarrollador Full Stack. Una SPA en React + Vite con i18n ES/EN, un sistema visual propio (orbe naranja, grano y flechas) y casos de estudio dedicados por proyecto.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vitest](https://img.shields.io/badge/Vitest-2-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)

## Características

- **Internacionalización ES/EN** con un layer propio y persistencia en `localStorage` (español por defecto).
- **Sistema visual de alta fidelidad**: orbe naranja, textura de grano y flechas, portado verbatim desde el diseño aprobado.
- **Casos de estudio por proyecto** servidos por React Router en modo librería (`/proyecto/:slug`).
- **Miniaturas en vídeo opcionales** por proyecto, con placeholder animado mientras no hay clip.
- **CV descargable** servido como activo estático, reemplazable sin tocar código.
- **Accesibilidad y SEO** cuidados (WCAG AA, auditorías Lighthouse limpias).
- **Sin analítica ni cookies.**

## Stack

| Área         | Tecnología                                              |
| ------------ | ------------------------------------------------------- |
| UI           | React 18, Vite 7                                        |
| Enrutado     | React Router v7 (modo librería)                         |
| Iconografía  | lucide-react                                            |
| i18n         | Layer propio ES/EN con persistencia en `localStorage`  |
| Tipografías  | Fraunces, Hanken Grotesk, JetBrains Mono (Google Fonts) |
| Tests        | Vitest + @testing-library/react (jsdom)                 |
| Despliegue   | Vercel                                                  |

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

## Tests

```bash
npm test         # ejecuta la suite una vez
npm run test:watch
```

Pruebas actuales en `tests/unit/`:

- `i18n-parity.test.js` — verifica la paridad de claves entre español e inglés.
- `link-matrix.test.js` — valida la matriz de enlaces de los proyectos.

## Estructura

```
src/
├── main.jsx              # punto de entrada
├── router.jsx            # rutas (Home + casos de estudio)
├── pages/                # Home, CaseStudy
├── sections/             # Hero, Projects, About, Stack, Experience, Contact, Footer
├── components/           # ProjectThumb (miniaturas vídeo/placeholder)
├── data/                 # site.js, projects.js, caseStudies.js
├── i18n/                 # LangContext.jsx, strings.js
└── styles/               # global.css, case-study.css
public/
├── cv/                   # PDF del CV
└── media/                # vídeos/posters de los proyectos
```

## Personalización rápida

- **CV** — reemplaza `public/cv/Alvaro-Flores-Rocha-CV.pdf` por tu PDF (mismo nombre, sin tocar código). Si lo renombras, actualiza `CV_URL` y `CV_FILENAME` en `src/data/site.js`.
- **Enlaces** (GitHub, LinkedIn) — `src/data/site.js`.
- **Proyectos** — `src/data/projects.js`.
- **Textos ES/EN** — `src/i18n/strings.js`.

### Activar la miniatura en vídeo de un proyecto

1. Deja el clip en `public/media/<slug>.webm` (poster opcional en `public/media/<slug>.jpg`).
2. Cambia el slug a `true` dentro de `VIDEO_READY` en `src/data/projects.js`.

Mientras el slug siga en `false`, la tarjeta muestra el placeholder animado. Slugs disponibles: `maderas`, `lpr`, `airvision`, `eventos`.

## Despliegue

Optimizado para **Vercel**. El `vercel.json` reescribe todas las rutas a `index.html` para soportar el enrutado del lado del cliente (SPA). Conecta el repositorio en Vercel y el build (`npm run build`) se ejecuta automáticamente.

## Documentación de diseño

> [!IMPORTANT]
> La fidelidad al diseño aprobado es un requisito del proyecto: paleta, tipografía, sistema de orbe/grano/flechas, estructura, orden y contenido deben preservarse exactamente.

El diseño aprobado y los artefactos de especificación viven en `specs/001-portfolio-site/` (spec, plan, research, data-model, contracts y quickstart).
