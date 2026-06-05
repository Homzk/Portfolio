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
    draft: "BORRADOR — personalízalo con tu voz",
    next: "Siguiente proyecto →", notFound: "Caso de estudio no encontrado",
  },
  en: {
    back: "Work",
    rol: "Role", cliente: "Client", anio: "Year",
    eContext: "Context", eProblem: "The problem", eRole: "My role", eSolution: "The solution",
    eDecisions: "Technical decisions — the why", eResults: "Results", eStack: "Stack", eLearnings: "Takeaways",
    draft: "DRAFT — make it yours",
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
      es: "App multiplataforma para gestionar y promocionar eventos culturales universitarios, con preinscripción y control de acceso por QR.",
      en: "Cross-platform app to manage and promote university cultural events, with pre-registration and QR-based check-in.",
    },
    meta: {
      rol: { es: "Líder técnico · ciclo completo", en: "Tech lead · full cycle" },
      cliente: { es: "Proyecto de título · PUCV", en: "Capstone · PUCV" },
      anio: { es: "Dic 2024", en: "Dec 2024" },
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
      { k: "context", h2: { es: "Eventos sin una herramienta común", en: "Events without a common tool" }, paras: {
        es: ["Los eventos culturales universitarios se promocionaban y gestionaban de forma <b>informal</b>: afiches, mensajes sueltos y listas en papel. No había una herramienta única para publicarlos, inscribirse y controlar el acceso."],
        en: ["University cultural events were promoted and managed <b>informally</b>: posters, scattered messages and paper lists. There was no single tool to publish them, register and control access."],
      }},
      { k: "problem", h2: { es: "Publicar, inscribir y controlar acceso", en: "Publish, register and control access" }, paras: {
        es: ["Se necesitaba una app que permitiera <b>publicar eventos</b>, recibir <b>preinscripción en línea</b> y <b>controlar el acceso en la puerta</b>, con permisos distintos para organizadores, monitores y asistentes."],
        en: ["We needed an app to <b>publish events</b>, take <b>online pre-registration</b> and <b>control access at the door</b>, with distinct permissions for organizers, monitors and attendees."],
      }},
      { k: "role", h2: { es: "Liderazgo técnico, ciclo completo", en: "Tech lead, full cycle" }, paras: {
        es: ["Lideré técnicamente el proyecto de extremo a extremo: <b>requerimientos, arquitectura, construcción y entrega</b>, coordinando el trabajo del equipo."],
        en: ["I led the project technically end-to-end: <b>requirements, architecture, build and delivery</b>, coordinating the team's work."],
      }},
      { k: "solution", h2: { es: "App multiplataforma con acceso por QR", en: "Cross-platform app with QR access" }, paras: {
        es: ["App en <b>Flutter + Supabase</b> con preinscripción en línea, <b>control de acceso por escaneo de QR</b> y autenticación con <b>tres roles</b>: admin (CRUD de eventos y roles), monitor (escaneo de QR) y usuario (descubrir e inscribirse)."],
        en: ["A <b>Flutter + Supabase</b> app with online pre-registration, <b>QR-scan access control</b> and authentication with <b>three roles</b>: admin (event and role CRUD), monitor (QR scanning) and user (discover and register)."],
      }},
    ],
    decisions: [
      { q: { es: "¿Por qué control de acceso por QR?", en: "Why QR-based access control?" }, a: {
        es: "Un QR por inscripción es barato, funciona bien en la puerta incluso con conexión intermitente y elimina el chequeo manual de listas. Cada asistente lleva su credencial en el teléfono.",
        en: "A QR per registration is cheap, works well at the door even with spotty connectivity, and removes manual list-checking. Each attendee carries their pass on their phone.",
      }},
      { q: { es: "¿Por qué tres roles diferenciados?", en: "Why three distinct roles?" }, a: {
        es: "Separar admin, monitor y usuario refleja cómo se opera un evento de verdad y mantiene los permisos limpios: quien organiza no es quien escanea, y quien asiste solo descubre e inscribe.",
        en: "Separating admin, monitor and user reflects how an event is actually run and keeps permissions clean: the organizer isn't the scanner, and the attendee only discovers and registers.",
      }},
      { q: { es: "¿Por qué Flutter + Supabase?", en: "Why Flutter + Supabase?" }, a: {
        es: "Una sola base de código para Android e iOS más autenticación y Postgres gestionados: el tamaño justo para el plazo de un proyecto de título sin sacrificar una app real y multiplataforma.",
        en: "A single codebase for Android and iOS plus managed auth and Postgres: right-sized for a capstone timeline without sacrificing a real, cross-platform app.",
      }},
    ],
    results: [
      { v: "3", k: { es: "Roles: admin · monitor · usuario", en: "Roles: admin · monitor · user" } },
      { v: "QR", k: { es: "Control de acceso en puerta", en: "Door access control" } },
      { v: "iOS+And", k: { es: "Multiplataforma (Flutter)", en: "Cross-platform (Flutter)" } },
      { v: "E2E", k: { es: "Ciclo completo, liderazgo técnico", en: "Full cycle, tech lead" } },
    ],
    stack: ["Flutter", "Dart", "Supabase"],
    learnings: {
      es: "Que liderar técnicamente es sobre todo <b>traducir</b>: del requerimiento al diseño, y del diseño a tareas que el equipo pueda tomar. Que un control de acceso simple y robusto vale más que uno sofisticado y frágil. Y que pensar los roles desde el inicio ahorra rehacer permisos después.",
      en: "That leading technically is mostly about <b>translating</b>: from requirement to design, and from design to tasks the team can pick up. That simple, robust access control beats sophisticated but fragile. And that thinking through roles from the start saves reworking permissions later.",
    },
  },
};
