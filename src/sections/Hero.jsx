/* ---------------- HERO ----------------
   Portado verbatim desde assets/App.reference.jsx. Orbe que sigue el
   mouse con requestAnimationFrame + lerp (sin setState por mousemove);
   en dispositivos sin hover deriva por trayectoria automática. Reloj en
   vivo en la barra de estado. */

import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, FileText, Languages, ArrowUpRight, ArrowDown,
} from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { HERO } from "../i18n/strings";
import { CV_URL, CV_FILENAME, GITHUB_URL, LINKEDIN_URL } from "../data/site";

export default function Hero() {
  const { lang, toggle } = useLang();
  const [clock, setClock] = useState("—");
  const rootRef = useRef(null), orbRef = useRef(null);
  const t = HERO[lang];

  // Scroll interno a una sección por #hash. Lo hacemos a mano porque el
  // <ScrollRestoration/> del router intercepta el cambio de URL del ancla
  // y resetea el scroll a 0, anulando el salto nativo. Respeta
  // prefers-reduced-motion (FR-020). Enlaces externos/descarga (sin #) no
  // entran aquí y conservan su comportamiento nativo.
  const goToHash = (e, hash) => {
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", hash);
  };

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString(lang === "es" ? "es-CL" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [lang]);

  useEffect(() => {
    const root = rootRef.current, orb = orbRef.current; if (!root || !orb) return;
    // Medio tamaño real del orbe (lo lee del DOM, así el media query móvil
    // puede achicarlo sin descentrar el seguimiento). Fallback 360 (=720/2).
    const half = () => (orb.offsetWidth || 720) / 2;
    // Respetar prefers-reduced-motion: orbe estático, sin rAF ni seguimiento (FR-020).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const h = half(), x = root.clientWidth * 0.62, y = root.clientHeight * 0.5;
      orb.style.transform = `translate(${x - h}px,${y - h}px)`;
      return;
    }
    const hasHover = window.matchMedia("(hover: hover)").matches;
    let tx = root.clientWidth * 0.62, ty = root.clientHeight * 0.5, cx = tx, cy = ty, raf, t0 = performance.now();
    // Pointer Events (no mousemove): en touch siguen el dedo de forma continua
    // durante el arrastre — antes solo se sintetizaba un mousemove al hacer tap.
    // `active` = hay un puntero/dedo controlando el orbe; mientras tanto se sigue
    // al puntero, y si no, en dispositivos sin hover el orbe deriva solo.
    let active = false;
    const setTarget = (clientX, clientY) => { const r = root.getBoundingClientRect(); tx = clientX - r.left; ty = clientY - r.top; };
    const onPointerMove = (e) => { active = true; setTarget(e.clientX, e.clientY); };
    const onPointerDown = (e) => { active = true; setTarget(e.clientX, e.clientY); };
    // Al soltar el dedo (touch) se retoma la deriva automática; con mouse se
    // mantiene en la última posición, como antes.
    const onPointerEnd = () => { if (!hasHover) active = false; };
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerdown", onPointerDown, { passive: true });
    root.addEventListener("pointerup", onPointerEnd, { passive: true });
    root.addEventListener("pointercancel", onPointerEnd, { passive: true });
    const loop = (now) => {
      if (!active && !hasHover) { const el = (now - t0) / 1000; tx = root.clientWidth * (0.5 + 0.22 * Math.sin(el * 0.4)); ty = root.clientHeight * (0.45 + 0.18 * Math.cos(el * 0.31)); }
      const h = half(); cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07; orb.style.transform = `translate(${cx - h}px,${cy - h}px)`; raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointerup", onPointerEnd);
      root.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  const ids = ["work", "stack", "about", "contact"];
  return (
    <header className="hero-root" ref={rootRef}>
      <div className="orb" ref={orbRef} />
      <div className="grain" />
      <div className="layer">
        <nav className="nav"><div className="container nav-in">
          <div className="logo">Álvaro Flores<span className="d">.</span></div>
          <div className="nav-links">
            <div className="nav-desktop nav-links">{t.nav.map((n, i) => <a key={n} href={`#${ids[i]}`} onClick={(e) => goToHash(e, `#${ids[i]}`)}>{n}</a>)}</div>
            <button className="lang" onClick={toggle}><Languages size={14} />{lang === "es" ? "EN" : "ES"}</button>
          </div>
        </div></nav>
        <div className="status"><div className="container">
          <div className="status-row">
            <span>{t.loc} <span className="arrow">→</span> <b>{clock}</b></span>
            <a className="status-cta" href="#contact" onClick={(e) => goToHash(e, "#contact")}>✦ {t.sLabel} <span className="arrow">→</span> <b>{t.sValue}</b></a>
          </div><div className="rule" />
        </div></div>
        <div className="center"><div className="container enter">
          <div className="hero-eyebrow" style={{ animationDelay: ".05s" }}>{t.eyebrow}</div>
          <h1 className="h1" style={{ animationDelay: ".12s" }}>{t.h1a}<em>{t.h1em}</em>.</h1>
          <p className="tagline" style={{ animationDelay: ".2s" }}>{t.tagline}</p>
          <div className="facts" style={{ animationDelay: ".28s" }}>{t.facts.map(([k, v]) => <div key={k}>{k} <span className="arrow">→</span> <b>{v}</b></div>)}</div>
          <div className="ctas" style={{ animationDelay: ".36s" }}>
            <a className="btn btn-primary" href="#work" onClick={(e) => goToHash(e, "#work")}>{t.cta1}<ArrowUpRight size={16} /></a>
            <a className="btn btn-ghost" href="#contact" onClick={(e) => goToHash(e, "#contact")}><Mail size={16} />{t.cta2}</a>
            <a className="btn btn-ghost" href={CV_URL} download={CV_FILENAME} target="_blank" rel="noreferrer"><FileText size={16} />{t.cta3}</a>
            <a className="btn btn-ghost btn-icon" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
            <a className="btn btn-ghost btn-icon" href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div></div>
        <div className="container"><div className="cue"><ArrowDown size={14} />{t.cue}</div></div>
      </div>
    </header>
  );
}
