/* ---------------- Datos de proyectos ----------------
   projData(lang) — los 4 proyectos en orden Maderas → LPR → AirVision
   → Eventos, portado verbatim desde assets/App.reference.jsx.
   La fila "coming soon" se renderiza en la sección Projects.
   NOTA (US3): el botón circular → enrutará a /proyecto/:slug cuando se
   construyan los casos de estudio (tasks T029–T031). En este MVP la
   fila mantiene el comportamiento de la referencia (`open`). */

/* Miniatura de cada proyecto: imagen estática en public/media/<slug>.jpg.
   - maderas/airvision: screenshot del sitio/dashboard (repos de GitHub).
   - lpr: screenshot del historial de patentes detectadas.
   - eventos: logo "App Cultura PUCV".
   El slug sin entrada aquí usa el placeholder animado de la referencia.
   Para añadir/cambiar una miniatura: deja el .jpg en public/media/ y
   apunta su slug aquí. */
export const THUMB_IMG = {
  maderas: "/media/maderas.jpg",
  lpr: "/media/lpr.jpg",
  airvision: "/media/airvision.jpg",
  eventos: "/media/eventos.jpg",
};

export const projData = (lang) => [
  { n:"01", slug:"maderas", name:"Maderas Ponotro", badge: lang==="es"?"En producción · Cliente real":"In production · Real client", live:true,
    desc: lang==="es"?"Sitio corporativo y plataforma de cotizaciones para una maderera chilena, end-to-end como freelance.":"Corporate site and quotation platform for a Chilean timber company, end-to-end as a freelancer.",
    metrics:["Lighthouse SEO 100","A11y 100","Perf 94","Hero 780KB→156KB"], chips:["React 18","Vite","Tailwind","EmailJS","Netlify"],
    cap:"Maderas Ponotro · sitio en producción", links:[{k:"live",href:"https://maderasponotro.cl"},{k:"priv"}], open:"https://maderasponotro.cl" },
  { n:"02", slug:"lpr", name:"ParkVision — Club Naval", badge: lang==="es"?"Cliente real · en terreno":"Real client · on-site", live:true,
    desc: lang==="es"?"ParkVision: reconocimiento de patentes (ANPR) con cámaras Hikvision para el Club Naval Las Salinas, con app de historial y reportes de accesos.":"ParkVision: license-plate recognition (ANPR) with Hikvision cameras for Club Naval Las Salinas, with a history and access-reports app.",
    metrics: lang==="es"?["Cámaras ANPR Hikvision","Historial + dashboard","Equipo de 5"]:["Hikvision ANPR cameras","History + dashboard","Team of 5"], chips:["Flutter","Dart","Node-RED","Supabase","Hikvision ANPR"],
    cap:"historial de patentes detectadas", links:[{k:"case"},{k:"intern"}], open:"#lpr" },
  { n:"03", slug:"airvision", name:"AirVision", feat:true, badge: lang==="es"?"En vivo":"Live", live:true,
    desc: lang==="es"?"Dashboard de calidad del aire de Chile en tiempo real: 169 estaciones, mapa, alertas y arquitectura realtime.":"Realtime air-quality dashboard for Chile: 169 stations, map, alerts and a realtime architecture.",
    metrics:["+97% cobertura","166 tests","CI/CD","E2E Playwright"], chips:["React","TypeScript","Supabase","Leaflet","Recharts","Vitest"],
    cap:"mapa de AirVision en tiempo real", links:[{k:"demo",href:"https://air-vision-xi.vercel.app/"},{k:"code",href:"https://github.com/Homzk/AirVision"}], open:"https://air-vision-xi.vercel.app/" },
  { n:"04", slug:"eventos", name:"Eventos Culturales PUCV", badge: lang==="es"?"Proyecto de título":"Capstone project", live:false,
    desc: lang==="es"?"CulturaPUCV: app multiplataforma que centraliza la promoción, inscripción y control de acceso por QR de los eventos culturales de la PUCV.":"CulturaPUCV: cross-platform app that centralizes promotion, registration and QR access control for PUCV's cultural events.",
    metrics: lang==="es"?["Credencial QR en puerta","4 roles","Proyecto de título"]:["QR door credential","4 roles","Capstone"], chips:["FlutterFlow","Flutter","Supabase"],
    cap:"App Cultura PUCV", links:[{k:"case"}], open:"#eventos" },
];
