/* ---------------- Datos de proyectos ----------------
   projData(lang) — los 4 proyectos en orden Maderas → LPR → AirVision
   → Eventos, portado verbatim desde assets/App.reference.jsx.
   La fila "coming soon" se renderiza en la sección Projects.
   NOTA (US3): el botón circular → enrutará a /proyecto/:slug cuando se
   construyan los casos de estudio (tasks T029–T031). En este MVP la
   fila mantiene el comportamiento de la referencia (`open`). */

/* Activar la miniatura en vídeo de un proyecto:
   1) Deja el clip en  public/media/<slug>.webm  (y opcional un poster
      estático en  public/media/<slug>.jpg).
   2) Cambia su slug a `true` aquí abajo.
   Mientras siga en `false`, la tarjeta muestra el placeholder animado.
   Slugs: maderas · lpr · airvision · eventos. */
export const VIDEO_READY = {
  maderas: true,
  lpr: false,
  airvision: true,
  eventos: false,
};

export const projData = (lang) => [
  { n:"01", slug:"maderas", name:"Maderas Ponotro", badge: lang==="es"?"En producción · Cliente real":"In production · Real client", live:true,
    desc: lang==="es"?"Sitio corporativo y plataforma de cotizaciones para una maderera chilena, end-to-end como freelance.":"Corporate site and quotation platform for a Chilean timber company, end-to-end as a freelancer.",
    metrics:["Lighthouse SEO 100","A11y 100","Perf 94","Hero 780KB→156KB"], chips:["React 18","Vite","Tailwind","EmailJS","Netlify"],
    cap:"[webm] carrito de cotización en vivo", links:[{k:"live",href:"https://maderasponotro.cl"},{k:"priv"}], open:"https://maderasponotro.cl" },
  { n:"02", slug:"lpr", name:"Sistema LPR — Club Naval", badge: lang==="es"?"Desplegado en terreno":"Deployed on-site", live:true,
    desc: lang==="es"?"Reconocimiento de patentes con visión por computador sobre hardware Hikvision + gestión de accesos e IoT.":"License-plate recognition with computer vision on Hikvision hardware + access management and IoT.",
    metrics: lang==="es"?["95% detección","−40% tiempo de accesos"]:["95% detection","−40% access time"], chips:["Python","OpenCV","Flutter","Supabase","Node-RED","Hikvision"],
    cap:"[webm] sistema LPR detectando en terreno", links:[{k:"case"},{k:"intern"}], open:"#lpr" },
  { n:"03", slug:"airvision", name:"AirVision", feat:true, badge: lang==="es"?"En vivo":"Live", live:true,
    desc: lang==="es"?"Dashboard de calidad del aire de Chile en tiempo real: 169 estaciones, mapa, alertas y arquitectura realtime.":"Realtime air-quality dashboard for Chile: 169 stations, map, alerts and a realtime architecture.",
    metrics:["+97% cobertura","166 tests","CI/CD","E2E Playwright"], chips:["React","TypeScript","Supabase","Leaflet","Recharts","Vitest"],
    cap:"[webm] mapa de AirVision en tiempo real", links:[{k:"demo",href:"https://air-vision-xi.vercel.app/"},{k:"code",href:"https://github.com/Homzk/AirVision"}], open:"https://air-vision-xi.vercel.app/" },
  { n:"04", slug:"eventos", name:"Eventos Culturales PUCV", badge: lang==="es"?"Proyecto de título":"Capstone project", live:false,
    desc: lang==="es"?"App multiplataforma para gestionar eventos universitarios, con preinscripción y control de acceso por QR.":"Cross-platform app to manage university events, with pre-registration and QR-based check-in.",
    metrics: lang==="es"?["Liderazgo técnico","3 roles: admin · monitor · usuario"]:["Tech lead","3 roles: admin · monitor · user"], chips:["Flutter","Dart","Supabase"],
    cap:"[webm] flujo de check-in por QR", links:[{k:"case"}], open:"#eventos" },
];
