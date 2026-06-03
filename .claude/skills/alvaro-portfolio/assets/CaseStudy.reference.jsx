import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Lock, ExternalLink } from "lucide-react";

/* ============================================================
   CASO DE ESTUDIO — plantilla (ejemplo: Maderas Ponotro)
   Lo que abre el círculo → de cada tarjeta de proyecto.
   Estructura: Contexto → Problema → Rol → Solución →
   Decisiones técnicas → Resultados → Stack → Aprendizajes.
   Mismo lenguaje: gris hueso, orbe naranjo, flechas →, grano.
   ============================================================ */

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  :root{
    --paper:#E9E7E0; --paper-2:#EFEDE7; --card:#F3F1EB; --ink:#18160F; --muted:#6f6a5d; --dim:#9b968a;
    --line:#cfcabc; --line-2:#bdb7a8; --accent:#E8770E; --accent-2:#F2A23C; --accent-dim:rgba(232,119,14,.10);
    --display:'Fraunces',serif; --body:'Hanken Grotesk',system-ui,sans-serif; --mono:'JetBrains Mono',monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0}

  .cs-root{position:relative; overflow:hidden; background:var(--paper); color:var(--ink); font-family:var(--body); padding-bottom:0}
  .cs-grain{position:fixed; inset:0; pointer-events:none; z-index:1; opacity:.30; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  /* page-level subtle orb accents — la firma del hero, en pequeño */
  .cs-orb{position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(10px);
    background:radial-gradient(circle,rgba(242,162,60,.55),rgba(232,119,14,0) 70%);
    animation:drift 16s ease-in-out infinite}
  @keyframes drift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,18px) scale(1.05)}100%{transform:translate(0,0) scale(1)}}
  @media(prefers-reduced-motion:reduce){.cs-orb{animation:none}}
  .cs-orb.top{width:420px; height:420px; right:-150px; top:-120px; opacity:.6}
  .container{position:relative; z-index:2; width:100%; max-width:880px; margin:0 auto; padding:0 36px}
  @media(max-width:640px){.container{padding:0 22px}}
  .wide{max-width:1080px}

  .back{padding:30px 0 0}
  .back a{display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:13px; color:var(--muted); text-decoration:none}
  .back a:hover{color:var(--ink)}

  /* title block */
  .titleblk{padding:44px 0 30px}
  .badge{font-family:var(--mono); font-size:11px; display:inline-flex; align-items:center; gap:6px; padding:5px 11px; border-radius:100px; border:1px solid var(--line-2); color:var(--muted); margin-bottom:20px}
  .badge .dot{width:6px; height:6px; border-radius:50%; background:#4FB477}
  .h1{font-family:var(--display); font-weight:600; font-size:clamp(40px,7vw,68px); letter-spacing:-.025em; line-height:1; margin-bottom:18px}
  .lead{font-family:var(--display); font-style:italic; font-size:clamp(18px,2.4vw,23px); color:var(--muted); max-width:600px; line-height:1.45; margin-bottom:30px}

  .meta{font-family:var(--mono); font-size:13.5px; line-height:2.1; margin-bottom:28px}
  .meta .ar{color:var(--accent)}
  .meta b{font-weight:500}

  .actions{display:flex; flex-wrap:wrap; gap:12px}
  .btn{display:inline-flex; align-items:center; gap:8px; font-family:var(--body); font-size:14.5px; font-weight:600; text-decoration:none; padding:12px 20px; border-radius:10px; transition:all .2s; border:1px solid transparent; color:var(--ink)}
  .btn-primary{background:var(--ink); color:var(--paper)}
  .btn-primary:hover{background:#000; transform:translateY(-1px)}
  .btn-dim{font-family:var(--mono); font-size:12.5px; color:var(--dim); display:inline-flex; align-items:center; gap:7px; padding:12px 4px}

  /* cover */
  .cover{position:relative; height:380px; border-radius:16px; overflow:hidden; border:1px solid var(--line-2); margin:8px 0 50px; background:#16181c}
  .cover-anim{position:absolute; inset:0; background:linear-gradient(120deg,#15171c,#23262d 35%,#2c2620 50%,#23262d 65%,#15171c); background-size:300% 100%; animation:sweep 5s linear infinite}
  @keyframes sweep{0%{background-position:0 0}100%{background-position:300% 0}}
  .cover-orb{position:absolute; width:520px; height:520px; border-radius:50%; left:55%; top:30%; transform:translate(-50%,-50%);
    background:radial-gradient(circle,rgba(242,162,60,.6),rgba(232,119,14,0) 68%); filter:blur(12px)}
  .cover-cap{position:absolute; left:0; bottom:0; right:0; padding:14px 18px; font-family:var(--mono); font-size:11.5px; color:#cfc9bd; background:linear-gradient(transparent,rgba(0,0,0,.6)); display:flex; align-items:center; gap:8px}
  .cover-cap .d{width:7px;height:7px;border-radius:50%;background:var(--accent-2)}

  /* body sections */
  .sec{padding:0 0 44px}
  .eyebrow{font-family:var(--mono); font-size:12px; letter-spacing:.13em; text-transform:uppercase; color:var(--accent); margin-bottom:16px; display:flex; align-items:center; gap:10px}
  .eyebrow::before{content:""; width:20px; height:1px; background:var(--accent)}
  .sec h2{font-family:var(--display); font-weight:600; font-size:28px; letter-spacing:-.02em; margin-bottom:16px}
  .sec p{font-size:16.5px; color:#3f3b32; line-height:1.7; margin-bottom:14px; max-width:660px}
  .sec p b{color:var(--ink); font-weight:600}

  /* technical decisions */
  .dec{background:var(--card); border:1px solid var(--line); border-left:3px solid var(--accent); border-radius:0 12px 12px 0; padding:22px 24px; margin-bottom:14px}
  .dec h3{font-family:var(--mono); font-size:14px; font-weight:500; color:var(--ink); margin-bottom:9px}
  .dec p{font-size:15px; color:#4a463c; line-height:1.65; margin:0; max-width:none}

  /* results */
  .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:6px}
  @media(max-width:680px){.stats{grid-template-columns:repeat(2,1fr)}}
  .stat{background:var(--card); border:1px solid var(--line); border-radius:12px; padding:20px 18px}
  .stat .v{font-family:var(--display); font-weight:600; font-size:32px; letter-spacing:-.02em; line-height:1}
  .stat .v small{font-size:16px; color:var(--accent)}
  .stat .k{font-family:var(--mono); font-size:11.5px; color:var(--muted); margin-top:8px; line-height:1.4}

  /* stack */
  .chips{display:flex; flex-wrap:wrap; gap:8px}
  .chip{font-family:var(--mono); font-size:12.5px; color:var(--ink); background:var(--card); border:1px solid var(--line); padding:6px 12px; border-radius:8px}

  .draft{display:inline-block; font-family:var(--mono); font-size:11px; color:var(--accent); background:var(--accent-dim); border:1px solid rgba(232,119,14,.25); padding:3px 8px; border-radius:6px; margin-bottom:12px}

  /* next */
  .next{position:relative; margin-top:30px; border-top:1px solid var(--line); padding:40px 0 70px; overflow:hidden}
  .next-orb{position:absolute; right:-80px; top:-40px; width:360px; height:360px; border-radius:50%; background:radial-gradient(circle,rgba(242,162,60,.45),rgba(232,119,14,0) 68%); filter:blur(10px); pointer-events:none}
  .next a{position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; text-decoration:none; color:inherit}
  .next .lbl{font-family:var(--mono); font-size:12px; color:var(--muted)}
  .next .nm{font-family:var(--display); font-weight:600; font-size:30px; letter-spacing:-.02em}
  .next .circ{width:56px;height:56px;border-radius:50%;border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;transition:all .25s}
  .next a:hover .circ{background:var(--ink);color:var(--paper);border-color:var(--ink)}
`;

export default function CaseStudy() {
  return (
    <div className="cs-root">
      <style>{STYLE}</style>
      <div className="cs-grain" />
      <div className="cs-orb top" />

      <div className="container back">
        <a href="#"><ArrowLeft size={15} /> Proyectos</a>
      </div>

      {/* TITLE */}
      <div className="container titleblk">
        <span className="badge"><span className="dot" />En producción · Cliente real</span>
        <h1 className="h1">Maderas Ponotro</h1>
        <p className="lead">La primera presencia digital de una maderera chilena con más de 21 años de trayectoria — diseñada, construida y desplegada de extremo a extremo.</p>
        <div className="meta">
          <div>Rol <span className="ar">→</span> <b>Desarrollador freelance · end-to-end</b></div>
          <div>Cliente <span className="ar">→</span> <b>Maderas Ponotro · Región del Bío-Bío</b></div>
          <div>Año <span className="ar">→</span> <b>2026 · en producción</b></div>
        </div>
        <div className="actions">
          <a className="btn btn-primary" href="https://maderasponotro.cl" target="_blank" rel="noreferrer">Visitar maderasponotro.cl <ExternalLink size={15} /></a>
          <span className="btn-dim"><Lock size={13} /> Repo privado (bajo contrato)</span>
        </div>
      </div>

      {/* COVER */}
      <div className="container wide">
        <div className="cover">
          <div className="cover-anim" />
          <div className="cover-orb" />
          <div className="cover-cap"><span className="d" />[webm] recorrido del sitio: hero, catálogo y carrito de cotización</div>
        </div>
      </div>

      {/* CONTEXTO */}
      <div className="container sec">
        <div className="eyebrow">Contexto</div>
        <h2>El cliente</h2>
        <p>Maderas Ponotro es una empresa chilena de elaboración e impregnación de maderas con más de <b>21 años de trayectoria</b> en la Región del Bío-Bío. Pese a su recorrido, no tenía ninguna presencia digital: ni catálogo en línea, ni forma de recibir cotizaciones más allá del teléfono.</p>
      </div>

      {/* PROBLEMA */}
      <div className="container sec">
        <div className="eyebrow">El problema</div>
        <h2>Cero presencia, presupuesto acotado</h2>
        <p>El desafío tenía dos caras. Por un lado, había que <b>mostrar el catálogo y captar cotizaciones</b> de clientes que hoy llegaban solo por boca a boca. Por otro, el presupuesto no daba para mantener infraestructura de backend ni costos de hosting recurrentes. La solución tenía que ser profesional, rápida y de costo de operación cercano a cero.</p>
      </div>

      {/* ROL */}
      <div className="container sec">
        <div className="eyebrow">Mi rol</div>
        <h2>De extremo a extremo</h2>
        <p>Trabajé solo y de forma independiente en todo el ciclo: <b>levantamiento de requerimientos</b> junto al cliente, diseño UX/UI y paleta de marca, desarrollo frontend completo, optimización de rendimiento, configuración de EmailJS y dominio, despliegue en producción, capacitación y mantención posterior.</p>
      </div>

      {/* SOLUCION */}
      <div className="container sec">
        <div className="eyebrow">La solución</div>
        <h2>Una SPA estática, rápida y sin backend</h2>
        <p>Un sitio de página única en React 18 + Vite + Tailwind con un <b>catálogo de 14 productos en 4 categorías</b>, filtros dinámicos, un <b>carrito de cotización persistente</b> (Context API + localStorage) que inyecta los productos seleccionados al formulario, y envío automático de pedidos por correo vía EmailJS. Sumé multi-sucursal con Google Maps, contacto directo por WhatsApp/llamada/email y animaciones scroll-reveal. Todo servido desde CDN, con costo de infraestructura cercano a cero.</p>
      </div>

      {/* DECISIONES */}
      <div className="container sec">
        <div className="eyebrow">Decisiones técnicas — el porqué</div>
        <h2>Elegir la herramienta mínima suficiente</h2>
        <div className="dec">
          <h3>¿Por qué Vite SPA y no Next.js?</h3>
          <p>El sitio es una sola página de scroll continuo, sin rutas ni contenido server-rendered ni backend. Next habría sumado complejidad (SSR/ISR, server components, API routes) sin beneficio real. Vite da un dev server casi instantáneo, build optimizado y todo el control para una SPA estática en CDN.</p>
        </div>
        <div className="dec">
          <h3>¿Por qué Context API + useReducer y no Redux/Zustand?</h3>
          <p>El estado global se limita al carrito de cotización (unas seis acciones). Introducir Redux o Zustand para un solo dominio de estado habría sido sobreingeniería; Context + useReducer cubre el caso con cero dependencias adicionales.</p>
        </div>
        <div className="dec">
          <h3>¿Por qué EmailJS y no un backend propio?</h3>
          <p>El cliente necesitaba recibir cotizaciones por correo, no almacenarlas ni procesarlas. EmailJS elimina la necesidad de mantener un backend y sus costos, mantiene las credenciales fuera del repo con env vars, y se carga de forma diferida para no inflar el bundle inicial.</p>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="container sec">
        <div className="eyebrow">Resultados</div>
        <h2>Rendimiento medido en producción</h2>
        <div className="stats">
          <div className="stat"><div className="v">100</div><div className="k">Lighthouse SEO</div></div>
          <div className="stat"><div className="v">100</div><div className="k">Best Practices</div></div>
          <div className="stat"><div className="v">100</div><div className="k">Accesibilidad</div></div>
          <div className="stat"><div className="v">94</div><div className="k">Performance</div></div>
          <div className="stat"><div className="v">156<small> KB</small></div><div className="k">Hero móvil (desde 780 KB)</div></div>
          <div className="stat"><div className="v">≈0</div><div className="k">CLS (sin saltos de layout)</div></div>
          <div className="stat"><div className="v">~0<small> $</small></div><div className="k">Costo de infraestructura</div></div>
          <div className="stat"><div className="v">14</div><div className="k">Productos · 4 categorías</div></div>
        </div>
      </div>

      {/* STACK */}
      <div className="container sec">
        <div className="eyebrow">Stack</div>
        <h2>Herramientas</h2>
        <div className="chips">
          {["React 18","Vite 6","Tailwind CSS 3","Context API","localStorage","EmailJS","Netlify (CI/CD)","Brotli","WebP","Schema.org"].map(c => <span className="chip" key={c}>{c}</span>)}
        </div>
      </div>

      {/* APRENDIZAJES */}
      <div className="container sec">
        <div className="eyebrow">Aprendizajes</div>
        <h2>Lo que me llevo</h2>
        <span className="draft">BORRADOR — personalízalo con tu voz</span>
        <p>Que la mejor decisión técnica muchas veces es la que <b>resta</b>: descartar Next, Redux y un backend no fue pereza, fue ajustar la herramienta al problema real del cliente. Que trabajar directo con alguien no técnico obliga a traducir cada decisión a su impacto de negocio. Y que medir el rendimiento <b>en producción</b> (no solo en local) es lo que separa una promesa de un resultado.</p>
      </div>

      {/* NEXT */}
      <div className="container wide next">
        <div className="next-orb" />
        <a href="#">
          <div>
            <div className="lbl">Siguiente proyecto →</div>
            <div className="nm">Sistema LPR — Club Naval</div>
          </div>
          <span className="circ"><ArrowUpRight size={22} /></span>
        </a>
      </div>
    </div>
  );
}
