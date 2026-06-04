# Portafolio — Álvaro Flores Rocha

Portafolio personal de **Álvaro Flores Rocha**, Desarrollador Full Stack.
SPA construida con React + Vite, con i18n ES/EN, sistema visual propio
(orbe naranja, grano, flechas) y casos de estudio por proyecto.

## Stack

- **React 18** + **Vite 7**
- **React Router v7** (modo librería)
- **lucide-react** para iconografía
- i18n propio ES/EN con persistencia en `localStorage` (español por defecto)
- Tests con **Vitest** + **@testing-library/react** (jsdom)
- Despliegue en **Vercel**

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
```

## Tests

```bash
npm test         # ejecuta la suite una vez
npm run test:watch
```

Pruebas actuales en `tests/unit/`:

- `i18n-parity.test.js` — verifica paridad de claves entre español e inglés.
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

- **CV**: reemplaza `public/cv/Alvaro-Flores-Rocha-CV.pdf` por tu PDF (mismo
  nombre, sin tocar código). Si lo renombras, actualiza `CV_URL` y
  `CV_FILENAME` en `src/data/site.js`.
- **Enlaces** (GitHub, LinkedIn): `src/data/site.js`.
- **Proyectos**: `src/data/projects.js`. Para activar la miniatura en vídeo
  de un proyecto, deja el clip en `public/media/<slug>.webm` (poster opcional
  en `public/media/<slug>.jpg`) y pon su slug en `true` dentro de
  `VIDEO_READY`. Slugs: `maderas`, `lpr`, `airvision`, `eventos`.
- **Textos ES/EN**: `src/i18n/strings.js`.

## Despliegue

Optimizado para **Vercel**. El `vercel.json` reescribe todas las rutas a
`index.html` para soportar el enrutado del lado del cliente (SPA). Conecta el
repositorio en Vercel y el build (`npm run build`) se ejecuta automáticamente.

## Documentación de diseño

El diseño aprobado y los artefactos de especificación viven en
`specs/001-portfolio-site/` (spec, plan, research, data-model, contracts y
quickstart). La fidelidad al diseño aprobado es un requisito del proyecto.
