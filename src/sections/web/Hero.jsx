/* ---------------- web/Hero ----------------
   Hero oscuro de /web: textura de trazos + puntos, luz lunar (orbe) y
   sello giratorio con una luna que recorre sus fases (símbolo propio,
   src/components/Moon.jsx).

   Entrada con anime.js: timeline con el título partido en palabras
   (splitText), subrayado que se dibuja, círculo del sello trazado con
   svg.createDrawable y sello/asterisco con spring. El h1 lleva
   key={lang}: al cambiar de idioma se remonta en vez de parchear texto
   que splitText ya reemplazó.

   Luz (orbe), scope propio: con mouse lo sigue (createAnimatable, se queda
   donde quedó al salir); en táctil NO sigue el dedo —hacía saltos al hacer
   scroll— y flota sola en una deriva lenta en bucle. Su punto de reposo lo
   da el CSS (70% / 45%), así que con movimiento reducido queda ahí quieta. */

import { MessageCircle, Check, ArrowRight } from "lucide-react";
import { animate, createAnimatable, createTimeline, splitText, stagger, utils, svg, spring } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import Moon from "../../components/Moon";
import { scrollToId } from "./scrollTo";
import { introDone } from "./introSignal";

export default function Hero() {
  const { lang } = useLang();
  const t = WEB[lang];
  const rootRef = useAnimeScope((self, el) => {
    const $ = (s) => el.querySelectorAll(s);
    const words = [...$(".w-h1-text")].flatMap((n) => splitText(n, { words: { wrap: "clip" } }).words);
    const ring = svg.createDrawable(el.querySelector(".w-badge-draw"));
    const em = el.querySelector(".w-h1-em");

    utils.set($(".w-kicker, .w-hero-sub, .w-bullets li, .w-ctas"), { opacity: 0, y: 24 });
    utils.set(words, { y: "110%" });
    utils.set(em, { "--u": "0%" });
    utils.set(ring, { draw: "0 0" });
    utils.set($(".w-ast"), { opacity: 0, scale: 0 });
    utils.set($(".w-badge"), { opacity: 0, scale: 0.3, rotate: -140 });

    // Espera a que se levante la intro (Intro.jsx) para no animar detrás de ella.
    const tl = createTimeline({ defaults: { ease: "out(4)", duration: 800 }, autoplay: false })
      .add($(".w-kicker"), { opacity: 1, y: 0 }, 100)
      .add(words, { y: "0%", duration: 1000, delay: stagger(70) }, 180)
      .add(em, { "--u": "100%", duration: 900, ease: "inOut(3)" }, 800)
      .add(ring, { draw: "0 1", duration: 1600, ease: "inOut(3)" }, 700)
      .add($(".w-ast"), { opacity: 1, scale: 1, ease: spring({ bounce: 0.6 }) }, 950)
      .add($(".w-hero-sub"), { opacity: 1, y: 0 }, 650)
      .add($(".w-bullets li"), { opacity: 1, y: 0, delay: stagger(90) }, 950)
      .add($(".w-ctas"), { opacity: 1, y: 0 }, 1150)
      .add($(".w-badge"), { opacity: 1, scale: 1, rotate: 0, duration: 1400, ease: spring({ bounce: 0.35 }) }, 500);

    // Luna del sello: recorre sus fases en bucle (sombra de derecha a
    // izquierda: llena → menguante → nueva → creciente → llena).
    animate(el.querySelector(".w-badge-core .moon-shadow"), { cx: [150, -50], duration: 12000, ease: "linear", loop: true });

    let alive = true;
    introDone.then(() => { if (alive) tl.play(); });
    return () => { alive = false; };
  }, [lang]);

  const orbRef = useAnimeScope((self, orb) => {
    const hero = orb.parentElement;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const follow = createAnimatable(orb, { x: 900, y: 900, ease: "out(3)" });
      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        follow.x(e.clientX - r.left - r.width * 0.7);
        follow.y(e.clientY - r.top - r.height * 0.45);
      };
      hero.addEventListener("pointermove", onMove, { passive: true });
      return () => hero.removeEventListener("pointermove", onMove);
    }
    const w = hero.clientWidth, h = hero.clientHeight;
    animate(orb, {
      x: [0, -w * 0.28, -w * 0.1, w * 0.05, 0],
      y: [0, h * 0.12, -h * 0.15, h * 0.08, 0],
      duration: 18000, ease: "inOut(2)", loop: true,
    });
  });

  return (
    <section className="w-hero" id="top" ref={rootRef}>
      <div className="w-orb" ref={orbRef} />
      <div className="w-strokes" aria-hidden="true" />
      <div className="w-dots" aria-hidden="true" />

      <div className="container w-hero-in">
        <div className="w-hero-copy">
          <div className="w-kicker"><span className="w-kicker-line" />{t.hero.eyebrow}</div>
          <h1 className="w-h1" key={lang}>
            <span className="w-h1-text">{t.hero.h1a}</span>
            <em className="w-h1-em"><span className="w-h1-text">{t.hero.h1em}</span></em>
            <span className="w-h1-text">{t.hero.h1b}</span>
            <span className="w-ast" aria-hidden="true"><i><Moon shadowX={74} /></i></span>
          </h1>
          <p className="w-hero-sub">{t.hero.sub}</p>
          <ul className="w-bullets">
            {t.hero.bullets.map((b) => <li key={b}><Check size={16} />{b}</li>)}
          </ul>
          <div className="w-ctas">
            <a className="w-btn w-btn-acc" href={waLink(t.waMessage)} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />{t.hero.ctaPrimary}
            </a>
            <a className="w-btn w-btn-line" href="#catalogo" onClick={(e) => scrollToId(e, "catalogo")}>
              {t.hero.ctaSecondary}<ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="w-badge" aria-hidden="true">
          <svg className="w-badge-ring" viewBox="0 0 200 200">
            <defs><path id="w-badge-path" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" /></defs>
            <path className="w-badge-draw" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
            <text><textPath href="#w-badge-path" textLength="474" lengthAdjust="spacing">{t.hero.badge}</textPath></text>
          </svg>
          <span className="w-badge-core"><Moon shadowX={150} /></span>
        </div>
      </div>
    </section>
  );
}
