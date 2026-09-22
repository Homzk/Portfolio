/* ---------------- web/Hero ----------------
   Cabecera de /web. Mismos tokens del portfolio; la cinta "Yo te la
   hago." es el único elemento tomado del flyer (acento, no rediseño —
   Constitución I / Dirección B acordada con el usuario). Reusa el
   mismo orbe ámbar que sigue el mouse del Hero principal
   (src/sections/Hero.jsx), a menor escala porque este hero es mucho
   más bajo que el de pantalla completa — mismo rAF+lerp, mismo manejo
   de prefers-reduced-motion y dispositivos sin hover. */

import { useEffect, useRef } from "react";
import { MessageCircle, Languages } from "lucide-react";
import { Link } from "react-router";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { waLink } from "../../data/site";

export default function Hero() {
  const { lang, toggle } = useLang();
  const t = WEB[lang];
  const rootRef = useRef(null), orbRef = useRef(null);

  const goToCatalog = (e) => {
    const el = document.getElementById("catalogo");
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current, orb = orbRef.current; if (!root || !orb) return;
    const half = () => (orb.offsetWidth || 360) / 2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const h = half(), x = root.clientWidth * 0.66, y = root.clientHeight * 0.4;
      orb.style.transform = `translate(${x - h}px,${y - h}px)`;
      return;
    }
    const hasHover = window.matchMedia("(hover: hover)").matches;
    let tx = root.clientWidth * 0.66, ty = root.clientHeight * 0.4, cx = tx, cy = ty, raf, t0 = performance.now();
    let active = false;
    const setTarget = (clientX, clientY) => { const r = root.getBoundingClientRect(); tx = clientX - r.left; ty = clientY - r.top; };
    const onPointerMove = (e) => { active = true; setTarget(e.clientX, e.clientY); };
    const onPointerDown = (e) => { active = true; setTarget(e.clientX, e.clientY); };
    const onPointerEnd = () => { if (!hasHover) active = false; };
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerdown", onPointerDown, { passive: true });
    root.addEventListener("pointerup", onPointerEnd, { passive: true });
    root.addEventListener("pointercancel", onPointerEnd, { passive: true });
    const loop = (now) => {
      if (!active && !hasHover) { const el = (now - t0) / 1000; tx = root.clientWidth * (0.55 + 0.2 * Math.sin(el * 0.4)); ty = root.clientHeight * (0.4 + 0.18 * Math.cos(el * 0.31)); }
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

  return (
    <header className="web-hero" ref={rootRef}>
      <div className="web-orb" ref={orbRef} />
      <div className="container">
        <nav className="web-nav">
          <Link to="/" className="web-back">{t.nav.back}</Link>
          <button className="lang" onClick={toggle}><Languages size={14} />{lang === "es" ? "EN" : "ES"}</button>
        </nav>

        <div className="web-eyebrow">{t.hero.eyebrow}</div>
        <h1 className="web-h1">{t.hero.h1}</h1>

        <div className="ribbon"><span>{t.hero.ribbon}</span></div>

        <div className="wrows">
          {t.hero.bullets.map(([label, value]) => (
            <div className="wrow" key={label}>
              <span className="wrow-l">{label}</span>
              <span className="ar">→</span>
              <span className="wrow-v">{value}</span>
            </div>
          ))}
        </div>

        <div className="web-ctas">
          <a className="btn btn-primary" href={waLink(t.waMessage)} target="_blank" rel="noreferrer">
            <MessageCircle size={16} />{t.hero.ctaPrimary}
          </a>
          <a className="btn btn-ghost" href="#catalogo" onClick={goToCatalog}>{t.hero.ctaSecondary}</a>
        </div>
      </div>
    </header>
  );
}
