/* ---------------- Contenido de casos de estudio ----------------
   Bilingüe ES/EN. Maderas: portado verbatim desde
   assets/CaseStudy.reference.jsx. LPR / AirVision / Eventos: redactados
   desde references/content.md (hechos verificados). La sección
   "Decisiones técnicas" es obligatoria (Constitución IV) y los
   "Aprendizajes" quedan marcados como BORRADOR para la voz personal de
   Álvaro (no inventar la versión final).

   NOTA (verificar): la cifra de cobertura de AirVision (~97%) debe
   confirmarse con `npm run test:coverage` y usarse consistente. */

// Etiquetas compartidas de la plantilla
export const CASE_LABELS = {
  es: {
    back: "Proyectos",
    rol: "Rol", cliente: "Cliente", anio: "Año",
    eContext: "Contexto", eProblem: "El problema", eRole: "Mi rol", eSolution: "La solución",
    eDecisions: "Decisiones técnicas — el porqué", eResults: "Resultados", eStack: "Stack", eLearnings: "Aprendizajes",
    next: "Siguiente proyecto →", notFound: "Caso de estudio no encontrado",
  },
  en: {
    back: "Work",
    rol: "Role", cliente: "Client", anio: "Year",
    eContext: "Context", eProblem: "The problem", eRole: "My role", eSolution: "The solution",
    eDecisions: "Technical decisions — the why", eResults: "Results", eStack: "Stack", eLearnings: "Takeaways",
    next: "Next project →", notFound: "Case study not found",
  },
};

export const CASE_ORDER = ["maderas", "lpr", "airvision", "eventos"];

export const CASES = {
  /* ============================ MADERAS ============================ */
  maderas: {
    live: true,
    name: "Maderas Ponotro",
    badge: { es: "En producción · Cliente real", en: "In production · Real client" },
    lead: {
      es: "La primera presencia digital de una maderera chilena con más de 21 años de trayectoria — diseñada, construida y desplegada de extremo a extremo.",
      en: "The first digital presence for a Chilean timber company with over 21 years of history — designed, built and shipped end-to-end.",
    },
    meta: {
      rol: { es: "Desarrollador freelance · end-to-end", en: "Freelance developer · end-to-end" },
      cliente: { es: "Maderas Ponotro · Región del Bío-Bío", en: "Maderas Ponotro · Bío-Bío Region, Chile" },
      anio: { es: "2026 · en producción", en: "2026 · in production" },
    },
    primary: { href: "https://maderasponotro.cl", label: { es: "Visitar maderasponotro.cl", en: "Visit maderasponotro.cl" } },
    privateNote: { es: "Repo privado (bajo contrato)", en: "Private repo (under contract)" },
    cover: "/media/cases/maderas-cover.jpg",
    coverCap: {
      es: "Inicio del sitio: hero, catálogo y acceso a cotización",
      en: "Site homepage: hero, catalog and quote access",
    },
    gallery: [
      { src: "/media/cases/maderas-cotizacion.jpg", cap: {
        es: "Carrito de cotización persistente con los productos seleccionados",
        en: "Persistent quotation cart with the selected products",
      }},
      { src: "/media/cases/maderas-producto.jpg", cap: {
        es: "Configurador de producto: largo, cepillado e impregnado",
        en: "Product configurator: length, planed and treated",
      }},
      { src: "/media/cases/maderas-proceso.jpg", cap: {
        es: "Sección de proceso productivo en el aserradero",
        en: "Production-process section at the sawmill",
      }},
    ],
    sections: [
      { k: "context", h2: { es: "El cliente", en: "The client" }, paras: {
        es: ["Maderas Ponotro es una empresa chilena de elaboración e impregnación de maderas con más de <b>21 años de trayectoria</b> en la Región del Bío-Bío. Pese a su recorrido, no tenía ninguna presencia digital: ni catálogo en línea, ni forma de recibir cotizaciones más allá del teléfono."],
        en: ["Maderas Ponotro is a Chilean timber processing and impregnation company with over <b>21 years of history</b> in the Bío-Bío Region. Despite that track record, it had no digital presence: no online catalog and no way to receive quotes beyond the phone."],
      }},
      { k: "problem", h2: { es: "Cero presencia, presupuesto acotado", en: "Zero presence, tight budget" }, paras: {
        es: ["El desafío tenía dos caras. Por un lado, había que <b>mostrar el catálogo y captar cotizaciones</b> de clientes que hoy llegaban solo por boca a boca. Por otro, el presupuesto no daba para mantener infraestructura de backend ni costos de hosting recurrentes. La solución tenía que ser profesional, rápida y de costo de operación cercano a cero."],
        en: ["The challenge had two sides. On one hand, we had to <b>showcase the catalog and capture quotes</b> from clients who arrived only by word of mouth. On the other, the budget didn't allow maintaining backend infrastructure or recurring hosting costs. The solution had to be professional, fast and near-zero to operate."],
      }},
      { k: "role", h2: { es: "De extremo a extremo", en: "End-to-end" }, paras: {
        es: ["Trabajé solo y de forma independiente en todo el ciclo: <b>levantamiento de requerimientos</b> junto al cliente, diseño UX/UI y paleta de marca, desarrollo frontend completo, optimización de rendimiento, configuración de EmailJS y dominio, despliegue en producción, capacitación y mantención posterior."],
        en: ["I worked solo and independently across the whole cycle: <b>requirements gathering</b> with the client, UX/UI and brand palette design, full frontend development, performance optimization, EmailJS and domain setup, production deployment, training and ongoing maintenance."],
      }},
      { k: "solution", h2: { es: "Una SPA estática, rápida y sin backend", en: "A static SPA, fast and backendless" }, paras: {
        es: ["Un sitio de página única en React 18 + Vite + Tailwind con un <b>catálogo de 14 productos en 4 categorías</b>, filtros dinámicos, un <b>carrito de cotización persistente</b> (Context API + localStorage) que inyecta los productos seleccionados al formulario, y envío automático de pedidos por correo vía EmailJS. Sumé multi-sucursal con Google Maps, contacto directo por WhatsApp/llamada/email y animaciones scroll-reveal. Todo servido desde CDN, con costo de infraestructura cercano a cero."],
        en: ["A single-page site in React 18 + Vite + Tailwind with a <b>14-product catalog across 4 categories</b>, dynamic filters, a <b>persistent quotation cart</b> (Context API + localStorage) that injects selected products into the form, and automatic order delivery by email via EmailJS. I added multi-branch with Google Maps, direct WhatsApp/call/email contact and scroll-reveal animations. All served from a CDN, with near-zero infrastructure cost."],
      }},
    ],
    decisions: [
      { q: { es: "¿Por qué Vite SPA y no Next.js?", en: "Why a Vite SPA and not Next.js?" }, a: {
        es: "El sitio es una sola página de scroll continuo, sin rutas ni contenido server-rendered ni backend. Next habría sumado complejidad (SSR/ISR, server components, API routes) sin beneficio real. Vite da un dev server casi instantáneo, build optimizado y todo el control para una SPA estática en CDN.",
        en: "The site is a single continuous-scroll page, with no routes, server-rendered content or backend. Next would have added complexity (SSR/ISR, server components, API routes) with no real benefit. Vite gives a near-instant dev server, an optimized build and full control for a static SPA on a CDN.",
      }},
      { q: { es: "¿Por qué Context API + useReducer y no Redux/Zustand?", en: "Why Context API + useReducer and not Redux/Zustand?" }, a: {
        es: "El estado global se limita al carrito de cotización (unas seis acciones). Introducir Redux o Zustand para un solo dominio de estado habría sido sobreingeniería; Context + useReducer cubre el caso con cero dependencias adicionales.",
        en: "Global state is limited to the quotation cart (around six actions). Bringing in Redux or Zustand for a single state domain would have been over-engineering; Context + useReducer covers it with zero extra dependencies.",
      }},
      { q: { es: "¿Por qué EmailJS y no un backend propio?", en: "Why EmailJS and not a custom backend?" }, a: {
        es: "El cliente necesitaba recibir cotizaciones por correo, no almacenarlas ni procesarlas. EmailJS elimina la necesidad de mantener un backend y sus costos, mantiene las credenciales fuera del repo con env vars, y se carga de forma diferida para no inflar el bundle inicial.",
        en: "The client needed to receive quotes by email, not store or process them. EmailJS removes the need to maintain a backend and its costs, keeps credentials out of the repo via env vars, and loads lazily so it doesn't inflate the initial bundle.",
      }},
    ],
    results: [
      { v: "100", k: { es: "Lighthouse SEO", en: "Lighthouse SEO" } },
      { v: "100", k: { es: "Best Practices", en: "Best Practices" } },
      { v: "100", k: { es: "Accesibilidad", en: "Accessibility" } },
      { v: "94", k: { es: "Performance", en: "Performance" } },
      { v: "156", small: " KB", k: { es: "Hero móvil (desde 780 KB)", en: "Mobile hero (from 780 KB)" } },
      { v: "≈0", k: { es: "CLS (sin saltos de layout)", en: "CLS (no layout shift)" } },
      { v: "~0", small: " $", k: { es: "Costo de infraestructura", en: "Infrastructure cost" } },
      { v: "14", k: { es: "Productos · 4 categorías", en: "Products · 4 categories" } },
    ],
    stack: ["React 18", "Vite 6", "Tailwind CSS 3", "Context API", "localStorage", "EmailJS", "Netlify (CI/CD)", "Brotli", "WebP", "Schema.org"],
    learnings: {
      es: "Que la mejor decisión técnica muchas veces es la que <b>resta</b>: descartar Next, Redux y un backend no fue pereza, fue ajustar la herramienta al problema real del cliente. Que trabajar directo con alguien no técnico obliga a traducir cada decisión a su impacto de negocio. Y que medir el rendimiento <b>en producción</b> (no solo en local) es lo que separa una promesa de un resultado.",
      en: "That the best technical decision is often the one that <b>subtracts</b>: dropping Next, Redux and a backend wasn't laziness, it was fitting the tool to the client's real problem. That working directly with a non-technical person forces you to translate every decision into business impact. And that measuring performance <b>in production</b> (not just locally) is what separates a promise from a result.",
    },
  },

  /* ============================== LPR ============================== */
  lpr: {
    live: true,
    name: "Sistema LPR — Club Naval",
    badge: { es: "Desplegado en terreno", en: "Deployed on-site" },
    lead: {
      es: "Reconocimiento de patentes con visión por computador sobre hardware Hikvision, con un 95% de detección — y la plataforma que lo convirtió en gestión de accesos.",
      en: "License-plate recognition with computer vision on Hikvision hardware, at 95% detection — and the platform that turned it into access management.",
    },
    meta: {
      rol: { es: "Ingeniero de desarrollo y sistemas (Proyecto IA)", en: "Development & Systems Engineer (AI project)" },
      cliente: { es: "Club Naval Las Salinas", en: "Club Naval Las Salinas" },
      anio: { es: "Abr — Jul 2024 · en terreno", en: "Apr — Jul 2024 · on-site" },
    },
    primary: null,
    privateNote: { es: "Sistema interno · sin repo público ni demo", en: "Internal system · no public repo or demo" },
    cover: "/media/cases/lpr-cover.jpg",
    coverCap: {
      es: "Cámaras Hikvision instaladas en terreno (LPR + IoT)",
      en: "Hikvision cameras deployed on-site (LPR + IoT)",
    },
    gallery: [
      { src: "/media/cases/lpr-historial.jpg", cap: {
        es: "Historial de patentes detectadas (patentes censuradas)",
        en: "Detected license-plate history (plates redacted)",
      }},
      { src: "/media/cases/lpr-grafico.jpg", cap: {
        es: "Analítica de accesos: concurrencia y permanencia",
        en: "Access analytics: concurrency and dwell time",
      }},
      { src: "/media/cases/lpr-login.jpg", cap: {
        es: "Acceso a la plataforma de gestión",
        en: "Login to the management platform",
      }},
    ],
    sections: [
      { k: "context", h2: { es: "El cliente", en: "The client" }, paras: {
        es: ["El Club Naval Las Salinas necesitaba controlar el acceso vehicular a sus instalaciones. El registro de entradas y salidas era <b>manual</b>, lento y dependiente de personal en la barrera."],
        en: ["Club Naval Las Salinas needed to control vehicle access to its premises. Logging entries and exits was <b>manual</b>, slow and dependent on staff at the barrier."],
      }},
      { k: "problem", h2: { es: "Control de accesos manual y lento", en: "Manual, slow access control" }, paras: {
        es: ["Había que <b>automatizar el reconocimiento de patentes</b> de forma fiable, reutilizando el hardware de cámaras ya instalado, e integrarlo con el control físico de la barrera y la gestión administrativa de los accesos."],
        en: ["We had to <b>automate license-plate recognition</b> reliably, reusing the already-installed camera hardware, and integrate it with physical barrier control and the administrative management of access."],
      }},
      { k: "role", h2: { es: "Lideré el proyecto de IA, de punta a punta", en: "I led the AI project, end to end" }, paras: {
        es: ["Levanté requerimientos, construí el <b>pipeline de visión por computador</b>, integré el hardware Hikvision, desarrollé la plataforma de gestión, armé los flujos IoT y realicé el QA y el despliegue en terreno."],
        en: ["I gathered requirements, built the <b>computer-vision pipeline</b>, integrated the Hikvision hardware, developed the management platform, wired the IoT flows, and ran QA and on-site deployment."],
      }},
      { k: "solution", h2: { es: "Visión por computador + gestión + IoT", en: "Computer vision + management + IoT" }, paras: {
        es: ["LPR con <b>Python y OpenCV</b> sobre cámaras Hikvision alcanzando un <b>95% de detección</b>; una plataforma de gestión integral (Flutter + Supabase) que redujo en <b>40%</b> el tiempo de administración de accesos; y flujos IoT con Node-RED integrados al control de la barrera. Todo probado y desplegado en terreno."],
        en: ["LPR with <b>Python and OpenCV</b> on Hikvision cameras reaching <b>95% detection</b>; a full management platform (Flutter + Supabase) that cut access-administration time by <b>40%</b>; and Node-RED IoT flows wired into barrier control. All tested and deployed on-site."],
      }},
    ],
    decisions: [
      { q: { es: "¿Por qué OpenCV sobre el hardware Hikvision existente?", en: "Why OpenCV on the existing Hikvision hardware?" }, a: {
        es: "Reutilizar las cámaras ya instaladas evitó comprar hardware nuevo y mantuvo el costo bajo. OpenCV da control total del pipeline de detección y corre sobre cómputo estándar, sin atarse a un SDK propietario cerrado.",
        en: "Reusing the already-installed cameras avoided buying new hardware and kept costs low. OpenCV gives full control over the detection pipeline and runs on commodity compute, without locking into a closed proprietary SDK.",
      }},
      { q: { es: "¿Por qué Node-RED para los flujos IoT?", en: "Why Node-RED for the IoT flows?" }, a: {
        es: "El control de barrera y sensores se orquesta visualmente, en bajo código. Eso permitió ajustar la lógica en terreno —tiempos, condiciones— sin recompilar ni redeplegar todo el sistema.",
        en: "Barrier and sensor control is orchestrated visually, in low-code. That made it possible to tune logic on-site —timings, conditions— without recompiling or redeploying the whole system.",
      }},
      { q: { es: "¿Por qué Flutter + Supabase para la gestión?", en: "Why Flutter + Supabase for management?" }, a: {
        es: "Una sola base de código para la app de gestión más un backend gestionado (Postgres + auth) dejó el foco donde estaba el riesgo real: el problema de visión por computador, no la infraestructura.",
        en: "A single codebase for the management app plus a managed backend (Postgres + auth) kept focus where the real risk was: the computer-vision problem, not the infrastructure.",
      }},
    ],
    results: [
      { v: "95", small: " %", k: { es: "Detección de patentes", en: "Plate detection" } },
      { v: "−40", small: " %", k: { es: "Tiempo de administración de accesos", en: "Access-admin time" } },
      { v: "IoT", k: { es: "Node-RED en el control de barrera", en: "Node-RED in barrier control" } },
      { v: "En terreno", k: { es: "QA y despliegue en producción", en: "QA and production deployment" } },
    ],
    stack: ["Python", "OpenCV", "Flutter", "Supabase", "Node-RED", "Hikvision"],
    learnings: {
      es: "Que un modelo al 95% en el laboratorio y uno al 95% <b>en terreno</b> son problemas distintos: la luz, el clima y los ángulos reales mandan. Que integrar IA con hardware físico obliga a pensar en fallos y reintentos, no solo en el “happy path”. Y que reutilizar lo que el cliente ya tiene suele ser la mejor ingeniería.",
      en: "That a 95% model in the lab and a 95% one <b>in the field</b> are different problems: real light, weather and angles rule. That integrating AI with physical hardware forces you to design for failures and retries, not just the happy path. And that reusing what the client already has is often the best engineering.",
    },
  },

  /* ============================ AIRVISION ============================ */
  airvision: {
    live: true,
    name: "AirVision",
    badge: { es: "En vivo", en: "Live" },
    lead: {
      es: "Calidad del aire de Chile en tiempo real: 169 estaciones, mapa, alertas y una arquitectura realtime — construido con Spec-Driven Development.",
      en: "Chile's air quality in real time: 169 stations, map, alerts and a realtime architecture — built with Spec-Driven Development.",
    },
    meta: {
      rol: { es: "Desarrollador full stack · proyecto propio", en: "Full stack developer · personal project" },
      cliente: { es: "Proyecto propio · open source", en: "Personal project · open source" },
      anio: { es: "2025", en: "2025" },
    },
    primary: { href: "https://air-vision-xi.vercel.app/", label: { es: "Ver demo en vivo", en: "View live demo" } },
    secondary: { href: "https://github.com/Homzk/AirVision", label: { es: "Código en GitHub", en: "Code on GitHub" } },
    privateNote: null,
    cover: "/media/cases/airvision-cover.jpg",
    coverCap: {
      es: "Mapa en tiempo real con las 169 estaciones de calidad del aire",
      en: "Real-time map with the 169 air-quality stations",
    },
    gallery: [
      { src: "/media/cases/airvision-charts.jpg", cap: {
        es: "Detalle de estación con tendencias PM2.5 · PM10 · O₃",
        en: "Station detail with PM2.5 · PM10 · O₃ trends",
      }},
      { src: "/media/cases/airvision-alerts.jpg", cap: {
        es: "Configuración de alertas por umbral",
        en: "Threshold-based alert configuration",
      }},
    ],
    sections: [
      { k: "context", h2: { es: "Datos públicos, ilegibles", en: "Public data, unreadable" }, paras: {
        es: ["Los datos de calidad del aire en Chile son públicos (SINCA, OpenAQ), pero están <b>fragmentados</b> y son difíciles de leer para alguien que no es experto. No existía una vista única, rápida y amable del estado del aire en el país."],
        en: ["Air-quality data in Chile is public (SINCA, OpenAQ), but it's <b>fragmented</b> and hard to read for a non-expert. There was no single, fast, friendly view of the country's air state."],
      }},
      { k: "problem", h2: { es: "Tiempo real, histórico y alertas en un solo lugar", en: "Realtime, history and alerts in one place" }, paras: {
        es: ["Hacía falta reunir <b>169 estaciones</b> en un mapa interactivo, mostrar tendencias históricas, permitir favoritos por usuario y disparar alertas cuando la calidad del aire cruza umbrales — todo actualizándose solo."],
        en: ["It needed to bring <b>169 stations</b> together on an interactive map, show historical trends, allow per-user favorites and trigger alerts when air quality crosses thresholds — all updating on its own."],
      }},
      { k: "role", h2: { es: "Full stack en solitario", en: "Solo full stack" }, paras: {
        es: ["Diseñé y construí todo: la <b>ingesta de datos</b>, la arquitectura realtime, la UI, la autenticación, los tests y el CI/CD. Lo guié con <b>Spec-Driven Development</b>, escribiendo la especificación antes que el código."],
        en: ["I designed and built everything: <b>data ingestion</b>, the realtime architecture, the UI, authentication, tests and CI/CD. I drove it with <b>Spec-Driven Development</b>, writing the spec before the code."],
      }},
      { k: "solution", h2: { es: "Dashboard realtime con ingesta serverless", en: "Realtime dashboard with serverless ingestion" }, paras: {
        es: ["Mapa interactivo con <b>Leaflet + clustering</b>, tendencias con Recharts, autenticación, favoritos y <b>alertas edge-triggered</b>. La ingesta corre en <b>Edge Functions (Deno)</b> con un cron cada 15 minutos. Calidad sostenida por <b>~97% de cobertura</b>, ~166 tests, E2E con Playwright y CI/CD con rama protegida."],
        en: ["Interactive map with <b>Leaflet + clustering</b>, trends with Recharts, authentication, favorites and <b>edge-triggered alerts</b>. Ingestion runs on <b>Edge Functions (Deno)</b> with a 15-minute cron. Quality held by <b>~97% coverage</b>, ~166 tests, Playwright E2E and CI/CD with a protected branch."],
      }},
    ],
    decisions: [
      { q: { es: "¿Por qué Edge Functions con cron y no un servidor siempre encendido?", en: "Why Edge Functions on a cron and not an always-on server?" }, a: {
        es: "La ingesta es periódica (cada 15 minutos), no continua. Funciones serverless agendadas cuestan cero cuando no corren y escalan con los datos, sin un servidor que mantener, parchear ni pagar 24/7.",
        en: "Ingestion is periodic (every 15 minutes), not continuous. Scheduled serverless functions cost nothing while idle and scale with the data, with no server to maintain, patch or pay for 24/7.",
      }},
      { q: { es: "¿Por qué Spec-Driven Development?", en: "Why Spec-Driven Development?" }, a: {
        es: "Escribir la especificación primero mantuvo el alcance y la arquitectura explícitos, y le dio sentido real a los ~166 tests y a la puerta de CI: dejaron de ser un agregado y pasaron a verificar un contrato definido de antemano.",
        en: "Writing the spec first kept scope and architecture explicit, and gave the ~166 tests and the CI gate real meaning: they stopped being an afterthought and started verifying a contract defined up front.",
      }},
      { q: { es: "¿Por qué alertas edge-triggered y no polling en el cliente?", en: "Why edge-triggered alerts and not client polling?" }, a: {
        es: "Las alertas se disparan al cambiar los datos, en el momento de la ingesta. Así el usuario las recibe sin que el cliente consulte el servidor constantemente, ahorrando red y batería.",
        en: "Alerts fire when the data changes, at ingestion time. That way users get them without the client constantly polling the server, saving network and battery.",
      }},
    ],
    results: [
      { v: "~97", small: " %", k: { es: "Cobertura de tests (verificar)", en: "Test coverage (verify)" } },
      { v: "166", k: { es: "Tests · E2E Playwright", en: "Tests · Playwright E2E" } },
      { v: "169", k: { es: "Estaciones (SINCA/OpenAQ)", en: "Stations (SINCA/OpenAQ)" } },
      { v: "15", small: " min", k: { es: "Cron de ingesta (Deno Edge)", en: "Ingestion cron (Deno Edge)" } },
    ],
    stack: ["React", "TypeScript", "Supabase", "Leaflet", "Recharts", "Vitest", "Playwright", "Deno Edge Functions"],
    learnings: {
      es: "Que escribir la especificación antes que el código no frena: <b>acelera</b>, porque cada decisión queda anclada y los tests verifican algo real. Que una arquitectura realtime vive o muere en la ingesta de datos. Y que el open source obliga a un estándar de calidad —cobertura, CI, README— que después agradeces.",
      en: "That writing the spec before the code doesn't slow you down: it <b>speeds you up</b>, because every decision is anchored and the tests verify something real. That a realtime architecture lives or dies in data ingestion. And that open source forces a quality bar —coverage, CI, README— you later thank yourself for.",
    },
  },

  /* ============================ EVENTOS ============================ */
  eventos: {
    live: false,
    name: "Eventos Culturales PUCV",
    badge: { es: "Proyecto de título", en: "Capstone project" },
    lead: {
      es: "CulturaPUCV: app multiplataforma que centraliza la gestión, promoción e inscripción de los eventos culturales de la PUCV, con credencial virtual por QR para el control de acceso.",
      en: "CulturaPUCV: a cross-platform app that centralizes the management, promotion and registration of PUCV's cultural events, with a virtual QR credential for access control.",
    },
    meta: {
      rol: { es: "Desarrollo de extremo a extremo · proyecto de título", en: "End-to-end development · capstone" },
      cliente: { es: "Dirección de Vinculación Artístico Cultural · PUCV", en: "Directorate of Artistic & Cultural Liaison · PUCV" },
      anio: { es: "2024 · proyecto de título", en: "2024 · capstone" },
    },
    primary: null,
    privateNote: { es: "Proyecto académico · sin enlaces públicos", en: "Academic project · no public links" },
    cover: "/media/cases/eventos-cover.jpg",
    coverCap: {
      es: "Credencial digital con QR para el control de acceso",
      en: "Digital QR credential for access control",
    },
    gallery: [
      { src: "/media/cases/eventos-bienvenida.jpg", cap: {
        es: "Bienvenida e inicio de sesión según rol",
        en: "Welcome and role-based login",
      }},
      { src: "/media/cases/eventos-cartelera.jpg", cap: {
        es: "Inicio: cartelera de eventos y accesos principales",
        en: "Home: event listing and main actions",
      }},
      { src: "/media/cases/eventos-monitores.jpg", cap: {
        es: "Gestión de monitores (rol administrador)",
        en: "Monitor management (admin role)",
      }},
    ],
    sections: [
      { k: "context", h2: { es: "Gestión cultural dispersa", en: "Fragmented cultural management" }, paras: {
        es: ["La <b>Dirección de Vinculación Artístico Cultural</b> de la PUCV organiza una amplia gama de eventos artísticos y culturales, gratuitos y abiertos al público. Pero los gestionaba de forma <b>dispersa</b>: la promoción por redes sociales y la inscripción por formularios de Google."],
        en: ["PUCV's <b>Directorate of Artistic and Cultural Liaison</b> runs a wide range of free, public artistic and cultural events. But it managed them in a <b>fragmented</b> way: promotion over social media and registration through Google Forms."],
      }},
      { k: "problem", h2: { es: "Información fragmentada, decisiones a ciegas", en: "Fragmented data, blind decisions" }, paras: {
        es: ["Esa fragmentación <b>degradaba la experiencia</b> de los asistentes y dificultaba recopilar datos de quién asistía, limitando la toma de decisiones estratégicas y la capacidad de atraer a más público. Faltaba una herramienta única para <b>publicar, inscribir, controlar el acceso y medir</b>."],
        en: ["That fragmentation <b>degraded the attendee experience</b> and made it hard to collect data on who attended, limiting strategic decisions and the ability to attract a wider audience. There was no single tool to <b>publish, register, control access and measure</b>."],
      }},
      { k: "role", h2: { es: "Proyecto de título, de extremo a extremo", en: "Capstone, end-to-end" }, paras: {
        es: ["Desarrollé <b>CulturaPUCV</b> como mi proyecto de título de Ingeniería en Ejecución Informática (PUCV): desde el <b>levantamiento de requerimientos</b> y el modelado del sistema, hasta el diseño de interfaces, la construcción y la entrega de la <b>versión 1.0</b>."],
        en: ["I built <b>CulturaPUCV</b> as my Computer Engineering capstone (PUCV): from <b>requirements gathering</b> and system modeling, through interface design, build and delivery of <b>version 1.0</b>."],
      }},
      { k: "solution", h2: { es: "App multiplataforma con credencial QR", en: "Cross-platform app with QR credential" }, paras: {
        es: ["Una app multiplataforma en <b>FlutterFlow + Supabase</b> que centraliza todo el ciclo: registro e inicio de sesión, <b>gestión de roles</b>, cartelera y gestión de eventos, inscripción en línea, <b>credencial virtual con QR</b> para registrar la asistencia en la puerta, listas de asistencia e inscripciones, e historial de eventos. Diseñada para ser <b>accesible a todo público</b>, con especial atención a la tercera edad."],
        en: ["A cross-platform app in <b>FlutterFlow + Supabase</b> that centralizes the whole cycle: registration and login, <b>role management</b>, event listing and management, online registration, a <b>virtual QR credential</b> to record attendance at the door, attendance and registration lists, and event history. Designed to be <b>accessible to everyone</b>, with special attention to older adults."],
      }},
    ],
    decisions: [
      { q: { es: "¿Por qué multiplataforma y no nativo?", en: "Why cross-platform and not native?" }, a: {
        es: "Una sola base de código para web y móvil acelera el desarrollo, baja el costo y simplifica el mantenimiento — clave para el plazo de un proyecto de título. Tras comparar Flutter, React Native, Ionic y Xamarin, elegí el ecosistema Flutter por su rendimiento e interfaz cercana a la nativa.",
        en: "A single codebase for web and mobile speeds development, lowers cost and simplifies maintenance — key for a capstone timeline. After comparing Flutter, React Native, Ionic and Xamarin, I chose the Flutter ecosystem for its performance and near-native UI.",
      }},
      { q: { es: "¿Por qué FlutterFlow + Supabase?", en: "Why FlutterFlow + Supabase?" }, a: {
        es: "FlutterFlow dio construcción low-code sobre Flutter para iterar las interfaces rápido, y Supabase aportó autenticación, base de datos Postgres y backend gestionado sin montar ni pagar servidores propios — el tamaño justo para entregar una app real dentro del plazo.",
        en: "FlutterFlow gave low-code building on top of Flutter to iterate UIs fast, and Supabase provided auth, a Postgres database and a managed backend with no servers to run or pay for — right-sized to ship a real app on time.",
      }},
      { q: { es: "¿Por qué credencial virtual con QR?", en: "Why a virtual QR credential?" }, a: {
        es: "El QR permite verificar la asistencia en segundos en la puerta, reduce los tiempos de espera y elimina las listas en papel. Además deja un registro de asistencia que alimenta los reportes para decisiones futuras.",
        en: "A QR lets you verify attendance in seconds at the door, cuts waiting times and removes paper lists. It also leaves an attendance record that feeds reports for future decisions.",
      }},
    ],
    results: [
      { v: "v1.0", k: { es: "Versión entregada · en desarrollo", en: "Delivered v1.0 · in progress" } },
      { v: "QR", k: { es: "Credencial virtual de acceso", en: "Virtual access credential" } },
      { v: "11", k: { es: "Requerimientos funcionales", en: "Functional requirements" } },
      { v: "4", k: { es: "Roles: usuario · monitor · encargado · admin", en: "Roles: user · monitor · staff · admin" } },
    ],
    stack: ["FlutterFlow", "Flutter", "Dart", "Supabase", "PostgreSQL"],
    learnings: {
      es: "CulturaPUCV fue uno de mis mayores retos: era mi <b>proyecto de título</b> y, a la vez, una aplicación real para mi propia universidad. Aun así, disfruté cada etapa — desde la primera <b>recolección de requerimientos</b> hasta la presentación final.",
      en: "CulturaPUCV was one of my biggest challenges: it was my <b>capstone</b> and, at the same time, a real application for my own university. Even so, I enjoyed every stage — from the first <b>requirements-gathering</b> session to the final presentation.",
    },
  },
};
