# Content — Álvaro Flores Rocha

Real content. The bilingual strings live in `assets/App.reference.jsx` (the `HERO`,
`PROJ`, `SEC` dictionaries and `projData`). This file is the human-readable summary.
Spanish is default; every string needs an EN counterpart.

## Identity / contact

- Name: **Álvaro Flores Rocha** (monogram in nav: "Álvaro Flores.")
- Role: Desarrollador Full Stack / Full Stack Developer
- Location: Viña del Mar, Chile
- Email: f.alvaro.ro@gmail.com
- LinkedIn: linkedin.com/in/alvaro-flores-rocha
- GitHub: github.com/Homzk
- WhatsApp: +56 9 6350 5529 (`https://wa.me/56963505529`)
- Education: Ingeniería de Ejecución en Informática — PUCV (Dic 2024); Magíster en
  Informática — PUCV (Jun 2025 – en curso).
  NOTE: "titulado con distinción / with honors" was intentionally removed. Do not add it.
- Languages: Español (nativo), Inglés (B2).

## Hero

- Eyebrow: "Desarrollador Full Stack" / "Full Stack Developer".
- H1: "Hola, soy *Álvaro*." / "Hi, I'm *Álvaro*." (italic on the name).
- Tagline (ES): "Construyo y llevo a producción productos de software, de extremo a
  extremo — de visión por computador en hardware a dashboards en tiempo real."
- Status: "✦ Estado → Disponible para proyectos" / "✦ Status → Open to work".
- Facts: Base → Ing. en Informática · PUCV · Ahora → Magíster en Informática (en curso)
  · Entrego → productos reales, en producción.

## About narrative (ES; EN in reference)

1. Full stack con formación formal en ingeniería (PUCV, cursando Magíster); la base
   (algoritmos, arquitectura, BD) permite justificar cada decisión técnica, no solo
   escribir código.
2. Trabajo de extremo a extremo: requerimientos → arquitectura → build → optimización →
   producción. Tanto un sitio con Lighthouse 100 como visión por computador sobre
   hardware en terreno.
3. **[DRAFT placeholder]** origin story — what drew him to software, what problems he
   likes solving. Leave marked until Álvaro writes it.

## Projects (the four)

### Maderas Ponotro — freelance, in production
Sitio corporativo + plataforma de cotizaciones para una maderera chilena (+21 años,
Región del Bío-Bío). SPA React 18 + Vite + Tailwind, catálogo 14 productos / 4
categorías, carrito de cotización persistente (Context API + localStorage), envío por
EmailJS (sin backend, costo ~0), multi-sucursal con Google Maps, deep links
WhatsApp/llamada/email. Métricas: Lighthouse SEO 100 / Best Practices 100 /
Accesibilidad 100 / Performance 94, CLS ≈ 0, hero móvil 780 KB → ~156 KB, Schema.org.
Live: maderasponotro.cl. Repo privado (bajo contrato).
Decisiones técnicas (reuse in case study): Vite SPA vs Next.js; Context+useReducer vs
Redux/Zustand; EmailJS vs backend propio.

### Sistema LPR — Club Naval Las Salinas (Abr–Jul 2024)
Reconocimiento de patentes (LPR) con visión por computador sobre hardware Hikvision,
**95% de detección**. Plataforma de gestión integral (Flutter + Supabase) que redujo
**40%** el tiempo de administración de accesos. Flujos IoT con Node-RED integrados al
control de acceso. QA y despliegue en terreno. Stack: Python, OpenCV, Flutter, Supabase,
Node-RED, Hikvision. Internal system — no public repo, no live demo; case study only.

### AirVision — featured
Dashboard de calidad del aire de Chile en tiempo real: 169 estaciones (SINCA/OpenAQ),
mapa interactivo (Leaflet + clustering), tendencias (Recharts), auth, favoritos, alertas
edge-triggered, ingesta vía Edge Functions (Deno) con cron cada 15 min. ~97% test
coverage (verify exact number), ~166 tests, E2E Playwright, CI/CD con rama protegida.
Construido con Spec-Driven Development. Stack: React, TypeScript, Supabase, Leaflet,
Recharts, Vitest. Live: air-vision-xi.vercel.app. Public repo: github.com/Homzk/AirVision.
NOTE: confirm coverage figure and use it consistently; ensure GitHub repo "About" has
description + website + topics; confirm screenshots render.

### Eventos Culturales PUCV — capstone (Dic 2024)
App multiplataforma (Flutter + Supabase) para gestionar y promocionar eventos culturales
universitarios; preinscripción online; control de acceso por escaneo de QR; auth con 3
roles (admin = CRUD eventos + roles, monitor = escaneo QR, usuario = descubrir/inscribir).
Liderazgo técnico, ciclo completo. No public links; case study.

### Slince Limitada (Ene–Jun 2023) — experience only, NOT a featured project
Modernización de plataforma escolar (HTML5/CSS3/JS), optimización de BD MySQL. Lives in
the experience timeline, not the projects grid.

## Stack groups (exact)

- Lenguajes: JavaScript (ES6+), TypeScript, Python, Java, C++
- Frontend & Móvil: React 18, Vite, Tailwind CSS, Flutter, HTML5, CSS3
- Backend & Datos: Node.js, PostgreSQL, MySQL, Supabase, REST APIs
- Infra & DevOps: Docker, Netlify, Vercel, Git/GitHub, CI/CD
- Visión & IoT: OpenCV, Node-RED, Hikvision LPR
- Otros: SEO técnico, EmailJS, Figma, Scrum/Agile

## Experience timeline

- Feb 2026 – Actualidad · Desarrollador Web Freelance · Maderas Ponotro
- Abr 2024 – Jul 2024 · Ingeniero de Desarrollo y Sistemas (Proyecto IA) · Club Naval
  Las Salinas
- Ene 2023 – Jun 2023 · Desarrollador Web Full Stack · Slince Limitada
