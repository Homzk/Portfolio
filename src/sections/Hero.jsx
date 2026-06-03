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

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString(lang === "es" ? "es-CL" : "en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [lang]);

  useEffect(() => {
    const root = rootRef.current, orb = orbRef.current; if (!root || !orb) return;
    // Respetar prefers-reduced-motion: orbe estático, sin rAF ni seguimiento (FR-020).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const x = root.clientWidth * 0.62, y = root.clientHeight * 0.5;
      orb.style.transform = `translate(${x - 360}px,${y - 360}px)`;
      return;
    }
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
            <button className="lang" onClick={toggle}><Languages size={14} />{lang === "es" ? "EN" : "ES"}</button>
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
