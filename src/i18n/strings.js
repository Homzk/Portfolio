/* ---------------- i18n ----------------
   Diccionarios ES/EN espejo, copy canónico portado verbatim desde
   assets/App.reference.jsx (references/content.md es la fuente). Cada
   clave existe en ambos idiomas (Constitución III — paridad total). */

export const HERO = {
  es: { nav: ["Proyectos","Stack","Sobre mí","Contacto"], loc:"Viña del Mar, Chile", sLabel:"Estado", sValue:"Disponible para proyectos",
    eyebrow:"Desarrollador Full Stack", h1a:"Hola, soy ", h1em:"Álvaro",
    tagline:"Construyo y llevo a producción productos de software, de extremo a extremo — de Chile 🇨🇱. Especializado en el desarrollo de aplicaciones web únicas.",
    facts:[["Base","Ing. en Informática · PUCV"],["Ahora","Magíster en Informática · en curso"],["Entrego","productos reales, en producción"]],
    cta1:"Ver proyectos", cta2:"Contacto", cta3:"CV", cue:"Proyectos" },
  en: { nav: ["Work","Stack","About","Contact"], loc:"Viña del Mar, Chile", sLabel:"Status", sValue:"Open to work",
    eyebrow:"Full Stack Developer", h1a:"Hi, I'm ", h1em:"Álvaro",
    tagline:"I build and ship software products end-to-end — from Chile 🇨🇱. Specialized in building unique web applications.",
    facts:[["Foundation","Computer Eng. · PUCV"],["Now","MSc in Computer Science · in progress"],["I deliver","real products, in production"]],
    cta1:"View work", cta2:"Contact", cta3:"CV", cue:"Work" },
};

export const PROJ = {
  es: { eyebrow:"Trabajo seleccionado", title:"Proyectos", intro:"Pocas piezas, todas terminadas. Productos reales antes que ejercicios.",
    soon:"Próximo proyecto en construcción —", soonEm:"el portafolio es un proyecto vivo.", feat:"Destacado",
    L:{ live:"Sitio en vivo", demo:"Demo en vivo", code:"Código", case:"Caso de estudio", priv:"Repo privado (cliente)", intern:"Sistema interno" } },
  en: { eyebrow:"Selected work", title:"Work", intro:"Few pieces, all finished. Real products over exercises.",
    soon:"Next project in the works —", soonEm:"this portfolio is a living project.", feat:"Featured",
    L:{ live:"Live site", demo:"Live demo", code:"Code", case:"Case study", priv:"Private repo (client)", intern:"Internal system" } },
};

export const SEC = {
  es: { aboutE:"Sobre mí", aboutT:"Ingeniería con criterio, no solo sintaxis.", draft:"BORRADOR — tu historia de origen",
    aboutP:["Soy desarrollador full stack con formación formal en ingeniería (PUCV, cursando Magíster). Esa base —algoritmos, arquitectura, bases de datos— me permite no solo escribir código, sino justificar cada decisión técnica detrás de él.","Trabajo de extremo a extremo: levanto requerimientos con el cliente, diseño la arquitectura, construyo, optimizo y despliego en producción. Lo mismo da un sitio corporativo con Lighthouse al 100 que un sistema de visión por computador sobre hardware en terreno.","[Acá va tu historia de origen, en una o dos frases con carácter — qué te llevó a la informática y qué problemas te gusta resolver. La afinamos juntos.]"],
    glanceH:"En corto", glance:[["Rol","Full Stack Dev"],["Base","Ing. Informática · PUCV"],["Ahora","Magíster (en curso)"],["Lugar","Viña del Mar, CL"],["Idiomas","ES · EN (B2)"]],
    stackE:"Herramientas", stackT:"Stack técnico",
    stack:[["Lenguajes",["JavaScript","TypeScript","Python","Java","C++"]],["Frontend & Móvil",["React 18","Vite","Tailwind","Flutter","HTML5","CSS3"]],["Backend & Datos",["Node.js","PostgreSQL","MySQL","Supabase","REST APIs"]],["Infra & DevOps",["Docker","Netlify","Vercel","Git/GitHub","CI/CD"]],["Visión & IoT",["OpenCV","Node-RED","Hikvision LPR"]],["Otros",["SEO técnico","EmailJS","Figma","Scrum/Agile"]]],
    expE:"Trayectoria", expT:"Experiencia",
    exp:[["Feb 2026 — Actualidad","Desarrollador Web Freelance","Maderas Ponotro","Sitio corporativo y plataforma de cotizaciones end-to-end, en producción con dominio propio."],["Abr 2024 — Jul 2024","Ingeniero de Desarrollo y Sistemas (Proyecto IA)","Club Naval Las Salinas","Lideré un sistema LPR con visión por computador (95% detección) + plataforma de gestión y automatización IoT."],["Ene 2023 — Jun 2023","Desarrollador Web Full Stack","Slince Limitada","Modernización de plataforma escolar y optimización de base de datos MySQL."]],
    eduH:"Formación", edu:[["Magíster en Informática — PUCV","Jun 2025 — Actualidad"],["Ing. de Ejecución en Informática — PUCV","Dic 2024"]],
    contactE:"Hablemos", contactT:"¿Construimos algo?", contactSub:"Abierto a oportunidades full stack y proyectos freelance. La mejor vía es el correo.", write:"Escríbeme", cv:"Descargar CV" },
  en: { aboutE:"About", aboutT:"Engineering judgment, not just syntax.", draft:"DRAFT — your origin story",
    aboutP:["I'm a full stack developer with formal engineering training (PUCV, now pursuing an MSc). That foundation — algorithms, architecture, databases — lets me not just write code, but justify the technical decisions behind it.","I work end-to-end: gathering requirements with the client, designing the architecture, building, optimizing and shipping to production. Whether it's a corporate site scoring 100 on Lighthouse or a computer-vision system running on hardware in the field.","[Your origin story goes here, in a sentence or two with character — what drew you to software and the problems you like to solve. We'll refine it together.]"],
    glanceH:"At a glance", glance:[["Role","Full Stack Dev"],["Base","Computer Eng. · PUCV"],["Now","MSc (in progress)"],["Place","Viña del Mar, CL"],["Languages","ES · EN (B2)"]],
    stackE:"Tooling", stackT:"Tech stack",
    stack:[["Languages",["JavaScript","TypeScript","Python","Java","C++"]],["Frontend & Mobile",["React 18","Vite","Tailwind","Flutter","HTML5","CSS3"]],["Backend & Data",["Node.js","PostgreSQL","MySQL","Supabase","REST APIs"]],["Infra & DevOps",["Docker","Netlify","Vercel","Git/GitHub","CI/CD"]],["Vision & IoT",["OpenCV","Node-RED","Hikvision LPR"]],["Other",["Technical SEO","EmailJS","Figma","Scrum/Agile"]]],
    expE:"Track record", expT:"Experience",
    exp:[["Feb 2026 — Present","Freelance Web Developer","Maderas Ponotro","End-to-end corporate site and quotation platform, in production on its own domain."],["Apr 2024 — Jul 2024","Development & Systems Engineer (AI Project)","Club Naval Las Salinas","Led an LPR computer-vision system (95% detection) plus a management platform and IoT automation."],["Jan 2023 — Jun 2023","Full Stack Web Developer","Slince Limitada","School platform modernization and MySQL database optimization."]],
    eduH:"Education", edu:[["MSc in Computer Science — PUCV","Jun 2025 — Present"],["Computer Engineering — PUCV","Dec 2024"]],
    contactE:"Let's talk", contactT:"Shall we build something?", contactSub:"Open to full stack roles and freelance projects. Email is the best way to reach me.", write:"Email me", cv:"Download CV" },
};
