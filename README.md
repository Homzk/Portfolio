<div align="center">

# Álvaro Flores Rocha · Desarrollador Full Stack

**Construyo y llevo a producción productos de software, de extremo a extremo —
de visión por computador en hardware a dashboards en tiempo real.**

Ing. en Informática (PUCV) · Magíster en Informática en curso · Viña del Mar, Chile

[Sitio en vivo](https://maderasponotro.cl) ·
[GitHub](https://github.com/Homzk) ·
[LinkedIn](https://linkedin.com/in/alvaro-flores-rocha) ·
[Email](mailto:f.alvaro.ro@gmail.com)

</div>

---

Este repositorio es mi portafolio personal: una SPA construida a mano en React + Vite,
con i18n ES/EN, un sistema visual propio (orbe naranja que sigue el cursor, textura de
grano, flechas) y un caso de estudio dedicado por proyecto. No es una plantilla — está
diseñado y escrito de cero, y cuidado al detalle en accesibilidad (WCAG AA) y rendimiento
(auditorías Lighthouse limpias, sin analítica ni cookies).

## Proyectos seleccionados

Pocas piezas, todas terminadas. Productos reales antes que ejercicios.

### Maderas Ponotro — _en producción · cliente real_

Sitio corporativo y plataforma de cotizaciones para una maderera chilena, construido
end-to-end como freelance.

`Lighthouse SEO 100` · `A11y 100` · `Perf 94` · `Hero 780 KB → 156 KB`
**React 18 · Vite · Tailwind · EmailJS · Netlify**
→ [maderasponotro.cl](https://maderasponotro.cl)

### Sistema LPR — Club Naval Las Salinas — _desplegado en terreno_

Reconocimiento de patentes con visión por computador sobre hardware Hikvision, más
gestión de accesos y automatización IoT.

`95% de detección` · `−40% tiempo de accesos`
**Python · OpenCV · Flutter · Supabase · Node-RED · Hikvision**

### AirVision — _en vivo_

Dashboard de calidad del aire de Chile en tiempo real: 169 estaciones, mapa, alertas y
una arquitectura realtime.

`+97% cobertura` · `166 tests` · `CI/CD` · `E2E Playwright`
**React · TypeScript · Supabase · Leaflet · Recharts · Vitest**
→ [Demo](https://air-vision-xi.vercel.app/) · [Código](https://github.com/Homzk/AirVision)

### Eventos Culturales PUCV — _proyecto de título_

App multiplataforma para gestionar eventos universitarios, con preinscripción y control
de acceso por QR.

`Liderazgo técnico` · `3 roles: admin · monitor · usuario`
**Flutter · Dart · Supabase**

## Stack técnico

| Área              | Tecnologías                                          |
| ----------------- | ---------------------------------------------------- |
| Lenguajes         | JavaScript, TypeScript, Python, Java, C++            |
| Frontend & Móvil  | React 18, Vite, Tailwind, Flutter, HTML5, CSS3       |
| Backend & Datos   | Node.js, PostgreSQL, MySQL, Supabase, REST APIs      |
| Infra & DevOps    | Docker, Netlify, Vercel, Git/GitHub, CI/CD           |
| Visión & IoT      | OpenCV, Node-RED, Hikvision LPR                      |
| Otros             | SEO técnico, EmailJS, Figma, Scrum/Agile             |

## Trayectoria

- **Feb 2026 — Actualidad** · Desarrollador Web Freelance — _Maderas Ponotro_
  Sitio corporativo y plataforma de cotizaciones end-to-end, en producción con dominio propio.
- **Abr 2024 — Jul 2024** · Ingeniero de Desarrollo y Sistemas (Proyecto IA) — _Club Naval Las Salinas_
  Lideré un sistema LPR con visión por computador (95% detección) + gestión y automatización IoT.
- **Ene 2023 — Jun 2023** · Desarrollador Web Full Stack — _Slince Limitada_
  Modernización de plataforma escolar y optimización de base de datos MySQL.

## Contacto

Abierto a oportunidades full stack y proyectos freelance. La mejor vía es el correo.

- **Email** — [f.alvaro.ro@gmail.com](mailto:f.alvaro.ro@gmail.com)
- **LinkedIn** — [alvaro-flores-rocha](https://linkedin.com/in/alvaro-flores-rocha)
- **GitHub** — [Homzk](https://github.com/Homzk)
- **WhatsApp** — [+56 9 6350 5529](https://wa.me/56963505529)

---

<details>
<summary><b>Detalles técnicos del proyecto</b> (instalación y estructura)</summary>

### Stack del sitio

React 18 + Vite 7 · React Router v7 (modo librería) · lucide-react · i18n propio ES/EN con
persistencia en `localStorage` · Vitest + @testing-library/react · desplegado en Vercel.

### Puesta en marcha

Requiere Node.js 18+ (recomendado 20+) y npm.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # previsualizar el build
npm test         # suite de tests (paridad i18n + matriz de enlaces)
```

### Estructura

```
src/
├── router.jsx            # rutas (Home + casos de estudio)
├── pages/                # Home, CaseStudy
├── sections/             # Hero, Projects, About, Stack, Experience, Contact, Footer
├── components/           # ProjectThumb (miniaturas vídeo/placeholder)
├── data/                 # site.js, projects.js, caseStudies.js
├── i18n/                 # LangContext.jsx, strings.js
└── styles/               # global.css, case-study.css
```

> [!NOTE]
> El diseño aprobado y los artefactos de especificación viven en `specs/001-portfolio-site/`.
> La fidelidad a ese diseño (paleta, tipografía, sistema de orbe/grano/flechas, estructura y
> contenido) es un requisito del proyecto.

</details>
