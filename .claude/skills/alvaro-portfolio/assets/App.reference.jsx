import React, { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, FileText, Languages, ArrowUpRight, ArrowRight,
  ArrowDown, MapPin, Lock, Star,
} from "lucide-react";

/* ============================================================
   PORTAFOLIO — Álvaro Flores Rocha · sitio completo
   Hero + Proyectos + Sobre mí + Stack + Experiencia + Contacto
   Un solo toggle ES/EN · estética unificada (gris hueso, orbe
   naranjo con deriva/mouse, grano, flechas →, Fraunces + mono).
   ============================================================ */

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root{
    --paper:#E9E7E0; --paper-2:#EFEDE7; --card:#F3F1EB; --ink:#18160F; --muted:#6f6a5d; --dim:#9b968a;
    --line:#cfcabc; --line-2:#bdb7a8; --accent:#E8770E; --accent-2:#F2A23C; --accent-dim:rgba(232,119,14,.10);
    --display:'Fraunces',serif; --body:'Hanken Grotesk',system-ui,sans-serif; --mono:'JetBrains Mono',monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}

  .site{background:var(--paper); color:var(--ink); font-family:var(--body); overflow-x:hidden}

  /* shared keyframes */
  @keyframes flick{0%{transform:translate(0,0)}25%{transform:translate(-6%,4%)}50%{transform:translate(5%,-5%)}75%{transform:translate(-4%,6%)}100%{transform:translate(0,0)}}
  @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
  @keyframes drift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,16px) scale(1.06)}100%{transform:translate(0,0) scale(1)}}
  @keyframes driftC{0%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-46%,-54%) scale(1.08)}100%{transform:translate(-50%,-50%) scale(1)}}
  @keyframes sweep{0%{background-position:0 0}100%{background-position:300% 0}}
  @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.7}}
  @media(prefers-reduced-motion:reduce){
    .grain,.pw-orb,.sx-orb,.orb-c,.thumb-anim,.thumb-dots,.cover-anim{animation:none!important}
  }

  /* shared utils */
  .container{position:relative; z-index:2; width:100%; max-width:1180px; margin:0 auto; padding:0 36px}
  .sx-root .container, .pw-root.narrow .container{max-width:1080px}
  @media(max-width:640px){.container{padding:0 22px}}
  .eyebrow{font-family:var(--mono); font-size:12px; letter-spacing:.13em; text-transform:uppercase; color:var(--accent); margin-bottom:16px; display:flex; align-items:center; gap:10px}
  .eyebrow::before{content:""; width:20px; height:1px; background:var(--accent)}
  .arrow,.ar{color:var(--accent)}
  .btn{display:inline-flex; align-items:center; gap:8px; font-family:var(--body); font-size:14.5px; font-weight:600; text-decoration:none; padding:12px 20px; border-radius:10px; cursor:pointer; transition:all .2s; border:1px solid transparent; color:var(--ink)}
  .btn-primary{background:var(--ink); color:var(--paper)} .btn-primary:hover{background:#000; transform:translateY(-1px)}
  .btn-ghost{border-color:var(--line-2)} .btn-ghost:hover{border-color:var(--ink)}
  .btn-icon{padding:12px}
  .lang{display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:12.5px; color:var(--muted); background:transparent; border:1px solid var(--line); padding:6px 11px; border-radius:8px; cursor:pointer; transition:all .2s}
  .lang:hover{border-color:var(--ink); color:var(--ink)}

  /* ===== HERO ===== */
  .hero-root{position:relative; overflow:hidden; min-height:100vh; display:flex; flex-direction:column; isolation:isolate}
  .orb{position:absolute; width:720px; height:720px; border-radius:50%; left:0; top:0; transform:translate(-360px,-360px);
    background:radial-gradient(circle at center,rgba(242,162,60,.78) 0%,rgba(232,119,14,.5) 26%,rgba(232,119,14,.16) 50%,rgba(232,119,14,0) 70%);
    filter:blur(10px); pointer-events:none; z-index:0; will-change:transform}
  .grain{position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:1; opacity:.42; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    animation:flick 1.5s steps(6) infinite}
  .layer{position:relative; z-index:2; display:flex; flex-direction:column; flex:1; min-height:100vh}
  .nav{padding:26px 0 0}
  .nav-in{display:flex; align-items:center; justify-content:space-between}
  .logo{font-family:var(--mono); font-weight:500; font-size:15px; letter-spacing:-.02em} .logo .d{color:var(--accent)}
  .nav-links{display:flex; align-items:center; gap:26px}
  .nav-links a{font-family:var(--body); font-size:14px; color:var(--muted); text-decoration:none; transition:color .2s}
  .nav-links a:hover{color:var(--ink)}
  @media(max-width:680px){.nav-desktop{display:none}}
  .status{padding:30px 0 0}
  .status-row{display:flex; align-items:center; justify-content:space-between; font-family:var(--mono); font-size:13px; flex-wrap:wrap; gap:8px}
  .status-row b{font-weight:500}
  .rule{height:1px; background:var(--line); margin-top:14px}
  .center{flex:1; display:flex; flex-direction:column; justify-content:center; padding:48px 0}
  .h1{font-family:var(--display); font-weight:600; font-size:clamp(46px,9vw,104px); line-height:.96; letter-spacing:-.03em; margin-bottom:30px}
  .h1 em{font-style:italic; font-weight:500}
  .tagline{font-size:clamp(17px,2.2vw,21px); color:var(--muted); max-width:560px; line-height:1.5; margin-bottom:34px}
  .facts{font-family:var(--mono); font-size:14.5px; line-height:2.05; margin-bottom:38px} .facts b{font-weight:500}
  .ctas{display:flex; flex-wrap:wrap; gap:12px; align-items:center}
  .cue{padding:0 0 30px; display:flex; align-items:center; gap:10px; font-family:var(--mono); font-size:12px; color:var(--dim)}
  .cue svg{animation:bob 1.8s ease-in-out infinite}
  .enter > *{opacity:0; animation:up .8s cubic-bezier(.2,.7,.3,1) forwards}
  .hero-eyebrow{font-family:var(--mono); font-size:12.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); margin-bottom:22px}

  /* ===== PROJECTS ===== */
  .pw-root{position:relative; overflow:hidden; padding:84px 0 90px; border-top:1px solid var(--line)}
  .pw-grain{position:absolute; inset:0; pointer-events:none; z-index:1; opacity:.32; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .pw-orb{position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(10px);
    background:radial-gradient(circle,rgba(242,162,60,.55),rgba(232,119,14,0) 70%); animation:drift 14s ease-in-out infinite}
  .pw-orb.top{width:380px; height:380px; right:-130px; top:-90px; opacity:.65}
  .pw-top{display:flex; align-items:flex-end; justify-content:space-between; gap:20px}
  .pw-title{font-family:var(--display); font-weight:600; font-size:clamp(34px,5vw,52px); letter-spacing:-.02em; line-height:1}
  .pw-intro{font-size:15px; color:var(--muted); max-width:300px; text-align:right}
  .rows{margin-top:34px}
  .row{display:flex; gap:34px; align-items:stretch; padding:34px 16px; border-top:1px solid var(--line); border-radius:14px; transition:background .25s; position:relative; text-decoration:none; color:inherit}
  .row:last-of-type{border-bottom:1px solid var(--line)}
  .row:hover{background:var(--paper-2)}
  .row.feat{background:radial-gradient(130% 150% at 100% 50%, var(--accent-dim), transparent 52%)}
  @media(max-width:860px){.row{flex-direction:column; gap:18px; padding:28px 12px}}
  .thumb{flex:none; width:340px; aspect-ratio:16/10; border-radius:12px; overflow:hidden; position:relative; border:1px solid var(--line-2); background:#1b1d22}
  .thumb.feat{border-color:var(--accent)}
  @media(max-width:860px){.thumb{width:100%}}
  .thumb-anim{position:absolute; inset:0; background:linear-gradient(120deg,#15171c 0%,#23262d 35%,#2c2620 50%,#23262d 65%,#15171c 100%); background-size:300% 100%; animation:sweep 4.5s linear infinite}
  .thumb-dots{position:absolute; inset:0; opacity:.5;
    background-image:radial-gradient(circle at 30% 40%,rgba(242,162,60,.6) 0 3px,transparent 4px),radial-gradient(circle at 60% 65%,rgba(242,162,60,.45) 0 2px,transparent 3px),radial-gradient(circle at 78% 30%,rgba(242,162,60,.5) 0 2px,transparent 3px);
    animation:pulse 3s ease-in-out infinite}
  .thumb-cap{position:absolute; left:0; right:0; bottom:0; padding:9px 12px; font-family:var(--mono); font-size:10.5px; color:#cfc9bd; background:linear-gradient(transparent,rgba(0,0,0,.55)); display:flex; align-items:center; gap:7px}
  .thumb-cap .ti{width:6px; height:6px; border-radius:50%; background:var(--accent-2)}
  .body{flex:1; min-width:0; display:flex; flex-direction:column}
  .num{font-family:var(--mono); font-size:12px; color:var(--dim); margin-bottom:8px}
  .head{display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:8px}
  .name{font-family:var(--display); font-weight:600; font-size:25px; letter-spacing:-.01em}
  .badge{font-family:var(--mono); font-size:11px; display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:100px; border:1px solid var(--line-2); color:var(--muted); white-space:nowrap}
  .badge .dot{width:6px; height:6px; border-radius:50%; background:#4FB477}
  .badge.cap .dot{background:var(--dim)}
  .feat-tag{font-family:var(--mono); font-size:10px; letter-spacing:.08em; text-transform:uppercase; background:var(--accent); color:#fff; padding:4px 9px; border-radius:6px; display:inline-flex; align-items:center; gap:5px}
  .desc{font-style:italic; font-family:var(--display); font-size:16px; color:var(--muted); margin-bottom:14px; max-width:560px}
  .metrics{font-family:var(--mono); font-size:12.5px; color:var(--ink); margin-bottom:14px}
  .metrics .sep{color:var(--accent); margin:0 8px}
  .chips{display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px}
  .chip{font-family:var(--mono); font-size:11.5px; color:var(--muted); border:1px solid var(--line); padding:3px 9px; border-radius:6px}
  .links{display:flex; flex-wrap:wrap; gap:18px; margin-top:auto}
  .lk{display:inline-flex; align-items:center; gap:6px; font-size:13.5px; font-weight:600; color:var(--ink); text-decoration:none}
  .lk .ar2{color:var(--accent); transition:transform .2s} .lk:hover .ar2{transform:translateX(3px)}
  .lk.dim{color:var(--dim); font-weight:500}
  .open{flex:none; align-self:center; width:54px; height:54px; border-radius:50%; border:1px solid var(--line-2); display:flex; align-items:center; justify-content:center; color:var(--ink); transition:all .25s}
  .row:hover .open{background:var(--ink); color:var(--paper); border-color:var(--ink)}
  .open svg{transition:transform .25s} .row:hover .open svg{transform:translate(2px,-2px)}
  @media(max-width:860px){.open{align-self:flex-start}}
  .soon{display:flex; align-items:center; justify-content:center; gap:14px; padding:40px 16px; border-top:1px dashed var(--line-2); text-align:center; color:var(--muted)}
  .soon .dotline{font-family:var(--mono); font-size:13px} .soon b{font-family:var(--display); font-weight:500; font-style:italic; color:var(--ink)}

  /* ===== SECTIONS ===== */
  .sx-root{position:relative; overflow:hidden}
  .sx-grain{position:absolute; inset:0; pointer-events:none; z-index:1; opacity:.30; mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .sx-orb{position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(11px);
    background:radial-gradient(circle,rgba(242,162,60,.5),rgba(232,119,14,0) 70%); animation:drift 15s ease-in-out infinite}
  .orb-a{width:360px;height:360px;left:-150px;top:60px;opacity:.5}
  .orb-b{width:300px;height:300px;right:-120px;top:40px;opacity:.45}
  .orb-c{width:560px;height:560px;left:50%;top:42%;transform:translate(-50%,-50%);opacity:.6;animation:driftC 18s ease-in-out infinite}
  .sec{position:relative; padding:76px 0; border-top:1px solid var(--line)}
  .h2{font-family:var(--display); font-weight:600; font-size:clamp(30px,4.5vw,46px); letter-spacing:-.02em; line-height:1.04; margin-bottom:20px}
  .about{display:grid; grid-template-columns:1.45fr 1fr; gap:54px; align-items:start}
  @media(max-width:820px){.about{grid-template-columns:1fr; gap:30px}}
  .about p{font-size:16.5px; color:#3f3b32; line-height:1.7; margin-bottom:16px; max-width:560px} .about p b{color:var(--ink); font-weight:600}
  .draft{display:inline-block; font-family:var(--mono); font-size:11px; color:var(--accent); background:var(--accent-dim); border:1px solid rgba(232,119,14,.25); padding:3px 8px; border-radius:6px; margin-bottom:14px}
  .glance{background:var(--card); border:1px solid var(--line); border-radius:14px; padding:22px 24px; font-family:var(--mono); font-size:13.5px}
  .glance .gh{font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--dim); margin-bottom:6px}
  .glance .gr{display:flex; justify-content:space-between; gap:14px; padding:13px 0; border-bottom:1px solid var(--line)}
  .glance .gr:last-child{border-bottom:none; padding-bottom:0}
  .glance .gk{color:var(--muted)} .glance .gv{color:var(--ink); text-align:right; font-weight:500}
  .stack{display:grid; grid-template-columns:repeat(3,1fr); gap:16px}
  @media(max-width:820px){.stack{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:520px){.stack{grid-template-columns:1fr}}
  .sg{background:var(--card); border:1px solid var(--line); border-radius:13px; padding:20px}
  .sg h4{font-family:var(--mono); font-size:11.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--dim); margin-bottom:13px; display:flex; align-items:center; gap:8px}
  .sg .items{display:flex; flex-wrap:wrap; gap:7px}
  .sg .items span{font-size:13px; color:var(--ink); background:var(--paper-2); border:1px solid var(--line); padding:4px 10px; border-radius:7px}
  .tl{border-left:1px solid var(--line-2); margin-left:6px; margin-top:8px}
  .tli{position:relative; padding:0 0 34px 28px}
  .tli::before{content:""; position:absolute; left:-5px; top:6px; width:9px; height:9px; border-radius:50%; background:var(--accent)}
  .tli:last-child{padding-bottom:0}
  .tld{font-family:var(--mono); font-size:12.5px; color:var(--dim); margin-bottom:5px}
  .tlr{font-size:16.5px; font-weight:600} .tlr .org{color:var(--accent)}
  .tln{color:var(--muted); font-size:14.5px; margin-top:4px; max-width:560px; line-height:1.55}
  .edu{margin-top:22px; padding-top:20px; border-top:1px dashed var(--line-2); font-family:var(--mono); font-size:13px; color:var(--muted)}
  .edu .eh{margin-bottom:12px; color:var(--dim); letter-spacing:.1em; text-transform:uppercase; font-size:11px}
  .edu div.er{margin-bottom:7px} .edu b{color:var(--ink); font-weight:500}
  .contact{text-align:center; padding:96px 0 40px}
  .contact .h2{font-size:clamp(34px,6vw,62px); margin-bottom:14px}
  .contact .sub{color:var(--muted); max-width:440px; margin:0 auto 34px; font-size:16px}
  .clist{display:flex; flex-direction:column; gap:2px; max-width:430px; margin:0 auto 30px; text-align:left}
  .crow{display:flex; align-items:center; justify-content:space-between; padding:15px 4px; border-bottom:1px solid var(--line); font-family:var(--mono); font-size:14px; text-decoration:none; color:var(--ink); transition:padding .2s}
  .crow:hover{padding-left:12px} .crow .lbl{color:var(--muted)}
  .btns{display:flex; flex-wrap:wrap; gap:12px; justify-content:center}
  .foot{position:relative; z-index:2; border-top:1px solid var(--line); padding:26px 0}
  .foot-in{display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; font-family:var(--mono); font-size:12.5px; color:var(--dim)}
`;

/* ---------------- i18n ---------------- */
const HERO = {
  es: { nav: ["Proyectos","Sobre mí","Stack","Contacto"], loc:"Viña del Mar, Chile", sLabel:"Estado", sValue:"Disponible para proyectos",
    eyebrow:"Desarrollador Full Stack", h1a:"Hola, soy ", h1em:"Álvaro",
    tagline:"Construyo y llevo a producción productos de software, de extremo a extremo — de visión por computador en hardware a dashboards en tiempo real.",
    facts:[["Base","Ing. en Informática · PUCV"],["Ahora","Magíster en Informática · en curso"],["Entrego","productos reales, en producción"]],
    cta1:"Ver proyectos", cta2:"Contacto", cta3:"CV", cue:"Proyectos" },
  en: { nav: ["Work","About","Stack","Contact"], loc:"Viña del Mar, Chile", sLabel:"Status", sValue:"Open to work",
    eyebrow:"Full Stack Developer", h1a:"Hi, I'm ", h1em:"Álvaro",
    tagline:"I build and ship software products end-to-end — from computer vision on hardware to realtime dashboards.",
    facts:[["Foundation","Computer Eng. · PUCV"],["Now","MSc in Computer Science · in progress"],["I deliver","real products, in production"]],
    cta1:"View work", cta2:"Contact", cta3:"CV", cue:"Work" },
};

const PROJ = {
  es: { eyebrow:"Trabajo seleccionado", title:"Proyectos", intro:"Pocas piezas, todas terminadas. Productos reales antes que ejercicios.",
    soon:"Próximo proyecto en construcción —", soonEm:"el portafolio es un proyecto vivo.", feat:"Destacado",
    L:{ live:"Sitio en vivo", demo:"Demo en vivo", code:"Código", case:"Caso de estudio", priv:"Repo privado (cliente)", intern:"Sistema interno" } },
  en: { eyebrow:"Selected work", title:"Work", intro:"Few pieces, all finished. Real products over exercises.",
    soon:"Next project in the works —", soonEm:"this portfolio is a living project.", feat:"Featured",
    L:{ live:"Live site", demo:"Live demo", code:"Code", case:"Case study", priv:"Private repo (client)", intern:"Internal system" } },
};

const SEC = {
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

const projData = (lang) => [
  { n:"01", name:"Maderas Ponotro", badge: lang==="es"?"En producción · Cliente real":"In production · Real client", live:true,
    desc: lang==="es"?"Sitio corporativo y plataforma de cotizaciones para una maderera chilena, end-to-end como freelance.":"Corporate site and quotation platform for a Chilean timber company, end-to-end as a freelancer.",
    metrics:["Lighthouse SEO 100","A11y 100","Perf 94","Hero 780KB→156KB"], chips:["React 18","Vite","Tailwind","EmailJS","Netlify"],
    cap:"[webm] carrito de cotización en vivo", links:[{k:"live",href:"https://maderasponotro.cl"},{k:"priv"}], open:"https://maderasponotro.cl" },
  { n:"02", name:"Sistema LPR — Club Naval", badge: lang==="es"?"Desplegado en terreno":"Deployed on-site", live:true,
    desc: lang==="es"?"Reconocimiento de patentes con visión por computador sobre hardware Hikvision + gestión de accesos e IoT.":"License-plate recognition with computer vision on Hikvision hardware + access management and IoT.",
    metrics: lang==="es"?["95% detección","−40% tiempo de accesos"]:["95% detection","−40% access time"], chips:["Python","OpenCV","Flutter","Supabase","Node-RED","Hikvision"],
    cap:"[webm] sistema LPR detectando en terreno", links:[{k:"case"},{k:"intern"}], open:"#lpr" },
  { n:"03", name:"AirVision", feat:true, badge: lang==="es"?"En vivo":"Live", live:true,
    desc: lang==="es"?"Dashboard de calidad del aire de Chile en tiempo real: 169 estaciones, mapa, alertas y arquitectura realtime.":"Realtime air-quality dashboard for Chile: 169 stations, map, alerts and a realtime architecture.",
    metrics:["+97% cobertura","166 tests","CI/CD","E2E Playwright"], chips:["React","TypeScript","Supabase","Leaflet","Recharts","Vitest"],
    cap:"[webm] mapa de AirVision en tiempo real", links:[{k:"demo",href:"https://air-vision-xi.vercel.app/"},{k:"code",href:"https://github.com/Homzk/AirVision"}], open:"https://air-vision-xi.vercel.app/" },
  { n:"04", name:"Eventos Culturales PUCV", badge: lang==="es"?"Proyecto de título":"Capstone project", live:false,
    desc: lang==="es"?"App multiplataforma para gestionar eventos universitarios, con preinscripción y control de acceso por QR.":"Cross-platform app to manage university events, with pre-registration and QR-based check-in.",
    metrics: lang==="es"?["Liderazgo técnico","3 roles: admin · monitor · usuario"]:["Tech lead","3 roles: admin · monitor · user"], chips:["Flutter","Dart","Supabase"],
    cap:"[webm] flujo de check-in por QR", links:[{k:"case"}], open:"#eventos" },
];

/* ---------------- HERO ---------------- */
function Hero({ lang, setLang }) {
  const [clock, setClock] = useState("—");
  const rootRef = useRef(null), orbRef = useRef(null);
  const t = HERO[lang];

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString(lang === "es" ? "es-CL" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [lang]);

  useEffect(() => {
    const root = rootRef.current, orb = orbRef.current; if (!root || !orb) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    let tx = root.clientWidth * 0.62, ty = root.clientHeight * 0.5, cx = tx, cy = ty, raf, t0 = performance.now();
    const onMove = (e) => { const r = root.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };
    if (hasHover) root.addEventListener("mousemove", onMove);
    const loop = (now) => {
      if (!hasHover) { const el = (now - t0) / 1000; tx = root.clientWidth * (0.5 + 0.22 * Math.sin(el * 0.4)); ty = root.clientHeight * (0.45 + 0.18 * Math.cos(el * 0.31)); }
      cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07; orb.style.transform = `translate(${cx - 360}px,${cy - 360}px)`; raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); root.removeEventListener("mousemove", onMove); };
  }, []);

  const ids = ["work", "about", "stack", "contact"];
  return (
    <header className="hero-root" ref={rootRef}>
      <div className="orb" ref={orbRef} />
      <div className="grain" />
      <div className="layer">
        <nav className="nav"><div className="container nav-in">
          <div className="logo">Álvaro Flores<span className="d">.</span></div>
          <div className="nav-links">
            <div className="nav-desktop nav-links">{t.nav.map((n, i) => <a key={n} href={`#${ids[i]}`}>{n}</a>)}</div>
            <button className="lang" onClick={() => setLang(lang === "es" ? "en" : "es")}><Languages size={14} />{lang === "es" ? "EN" : "ES"}</button>
          </div>
        </div></nav>
        <div className="status"><div className="container">
          <div className="status-row">
            <span>{t.loc} <span className="arrow">→</span> <b>{clock}</b></span>
            <span>✦ {t.sLabel} <span className="arrow">→</span> <b>{t.sValue}</b></span>
          </div><div className="rule" />
        </div></div>
        <div className="center"><div className="container enter">
          <div className="hero-eyebrow" style={{ animationDelay: ".05s" }}>{t.eyebrow}</div>
          <h1 className="h1" style={{ animationDelay: ".12s" }}>{t.h1a}<em>{t.h1em}</em>.</h1>
          <p className="tagline" style={{ animationDelay: ".2s" }}>{t.tagline}</p>
          <div className="facts" style={{ animationDelay: ".28s" }}>{t.facts.map(([k, v]) => <div key={k}>{k} <span className="arrow">→</span> <b>{v}</b></div>)}</div>
          <div className="ctas" style={{ animationDelay: ".36s" }}>
            <a className="btn btn-primary" href="#work">{t.cta1}<ArrowUpRight size={16} /></a>
            <a className="btn btn-ghost" href="#contact"><Mail size={16} />{t.cta2}</a>
            <a className="btn btn-ghost" href="#"><FileText size={16} />{t.cta3}</a>
            <a className="btn btn-ghost btn-icon" href="https://github.com/Homzk" target="_blank" rel="noreferrer"><Github size={16} /></a>
            <a className="btn btn-ghost btn-icon" href="https://linkedin.com/in/alvaro-flores-rocha" target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
          </div>
        </div></div>
        <div className="container"><div className="cue"><ArrowDown size={14} />{t.cue}</div></div>
      </div>
    </header>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects({ lang }) {
  const t = PROJ[lang]; const rows = projData(lang);
  return (
    <section className="pw-root" id="work">
      <div className="pw-grain" />
      <div className="container">
        <div className="pw-top">
          <div><div className="eyebrow">{t.eyebrow}</div><h2 className="pw-title">{t.title}</h2></div>
          <p className="pw-intro">{t.intro}</p>
        </div>
        <div className="rows">
          {rows.map((p) => (
            <a className={`row ${p.feat ? "feat" : ""}`} key={p.n} href={p.open} target="_blank" rel="noreferrer">
              <div className={`thumb ${p.feat ? "feat" : ""}`}><div className="thumb-anim" /><div className="thumb-dots" /><div className="thumb-cap"><span className="ti" />{p.cap}</div></div>
              <div className="body">
                <div className="num">{p.n} / 04</div>
                <div className="head"><span className="name">{p.name}</span>{p.feat && <span className="feat-tag"><Star size={10} fill="#fff" />{t.feat}</span>}<span className={`badge ${p.live ? "" : "cap"}`}><span className="dot" />{p.badge}</span></div>
                <div className="desc">{p.desc}</div>
                <div className="metrics">{p.metrics.map((m, i) => <React.Fragment key={m}>{i > 0 && <span className="sep">·</span>}{m}</React.Fragment>)}</div>
                <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                <div className="links">{p.links.map((l, i) => l.href ? <span className="lk" key={i}><span className="ar2">→</span>{t.L[l.k]}</span> : <span className="lk dim" key={i}><Lock size={12} />{t.L[l.k]}</span>)}</div>
              </div>
              <span className="open"><ArrowRight size={20} /></span>
            </a>
          ))}
          <div className="soon"><span className="dotline">✦ {t.soon} <b>{t.soonEm}</b></span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTIONS ---------------- */
function Sections({ lang }) {
  const t = SEC[lang];
  return (
    <div className="sx-root">
      <div className="sx-grain" />
      {/* ABOUT */}
      <section className="sec" id="about">
        <div className="sx-orb orb-a" />
        <div className="container">
          <div className="eyebrow">{t.aboutE}</div><h2 className="h2">{t.aboutT}</h2>
          <div className="about">
            <div>{t.aboutP.map((p, i) => <React.Fragment key={i}>{i === 2 && <span className="draft">{t.draft}</span>}<p>{p}</p></React.Fragment>)}</div>
            <div className="glance"><div className="gh">// {t.glanceH}</div>{t.glance.map(([k, v]) => <div className="gr" key={k}><span className="gk">{k} <span className="ar">→</span></span><span className="gv">{v}</span></div>)}</div>
          </div>
        </div>
      </section>
      {/* STACK */}
      <section className="sec" id="stack">
        <div className="sx-orb orb-b" />
        <div className="container">
          <div className="eyebrow">{t.stackE}</div><h2 className="h2">{t.stackT}</h2>
          <div className="stack">{t.stack.map(([h, items]) => <div className="sg" key={h}><h4><span className="ar">→</span> {h}</h4><div className="items">{items.map((it) => <span key={it}>{it}</span>)}</div></div>)}</div>
        </div>
      </section>
      {/* EXPERIENCE */}
      <section className="sec">
        <div className="container">
          <div className="eyebrow">{t.expE}</div><h2 className="h2">{t.expT}</h2>
          <div className="tl">{t.exp.map(([d, r, o, n]) => <div className="tli" key={r}><div className="tld">{d}</div><div className="tlr">{r} <span className="org">· {o}</span></div><div className="tln">{n}</div></div>)}</div>
          <div className="edu"><div className="eh">// {t.eduH}</div>{t.edu.map(([d, y]) => <div className="er" key={d}><b>{d}</b> <span className="ar">→</span> {y}</div>)}</div>
        </div>
      </section>
      {/* CONTACT */}
      <section className="sec contact" id="contact">
        <div className="sx-orb orb-c" />
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>{t.contactE}</div>
          <h2 className="h2">{t.contactT}</h2><p className="sub">{t.contactSub}</p>
          <div className="clist">
            <a className="crow" href="mailto:f.alvaro.ro@gmail.com"><span><span className="lbl">Email</span> &nbsp;<span className="ar">→</span></span><span>f.alvaro.ro@gmail.com</span></a>
            <a className="crow" href="https://linkedin.com/in/alvaro-flores-rocha" target="_blank" rel="noreferrer"><span><span className="lbl">LinkedIn</span> &nbsp;<span className="ar">→</span></span><span>alvaro-flores-rocha</span></a>
            <a className="crow" href="https://github.com/Homzk" target="_blank" rel="noreferrer"><span><span className="lbl">GitHub</span> &nbsp;<span className="ar">→</span></span><span>Homzk</span></a>
            <a className="crow" href="https://wa.me/56963505529" target="_blank" rel="noreferrer"><span><span className="lbl">WhatsApp</span> &nbsp;<span className="ar">→</span></span><span>+56 9 6350 5529</span></a>
          </div>
          <div className="btns">
            <a className="btn btn-primary" href="mailto:f.alvaro.ro@gmail.com"><Mail size={16} />{t.write}</a>
            <a className="btn btn-ghost" href="#"><FileText size={16} />{t.cv}</a>
          </div>
        </div>
      </section>
      <footer className="foot"><div className="container foot-in">
        <span>© {new Date().getFullYear()} Álvaro Flores Rocha</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={13} /> Viña del Mar, Chile</span>
      </div></footer>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  const [lang, setLang] = useState("es");
  return (
    <div className="site">
      <style>{STYLE}</style>
      <Hero lang={lang} setLang={setLang} />
      <Projects lang={lang} />
      <Sections lang={lang} />
    </div>
  );
}
