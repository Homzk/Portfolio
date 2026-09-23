/* ---------------- web/Pillars (01 Sobre mí) ----------------
   Tira de herramientas + texto y tarjetas apiladas.
   anime.js:
   - Tira: bucle infinito (x 0 → -50% sobre la lista duplicada), se pausa
     con hover.
   - Título (SectionHead fill) y párrafos se "pintan" (gris → blanco)
     mientras la sección llega; terminan justo cuando el texto se fija.
   - Escritorio: texto y tarjetas son sticky (CSS) con un top apenas
     mayor por tarjeta (--stick), así cada una sube y tapa a la anterior
     1:1 con el scroll y asoma el borde de las de abajo. anime.js achica y
     oscurece la tarjeta tapada exactamente mientras la siguiente la cubre
     (desde que se detiene hasta que llega la siguiente; onScroll
     sync:true, sin retraso) y llena la barra inferior de cada una.
   - Alineación (useLayoutEffect propio, corre también con movimiento
     reducido): el borde superior del mazo queda a la altura del título
     — padding-top del stack al entrar y --stick de cada tarjeta al
     quedar fijas— y la columna de texto se alarga lo justo para que texto
     y mazo se suelten juntos al salir. Se re-mide al redimensionar y al cargar las fuentes; si
     cambió, refresca el scope de anime.js (sus umbrales leen --stick).
   - Móvil: lista normal, sin sticky ni alineación.
   - Divisor inferior con un punto que viaja de lado a lado. */

import { useLayoutEffect, useRef } from "react";
import { Target, Code2, PenTool, ArrowRight } from "lucide-react";
import { animate, onScroll, splitText, stagger, utils, spring } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { TOOLS } from "../../data/webOffer";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { onReveal, revealUp } from "./motion";
import Moon from "../../components/Moon";
import SectionHead from "./SectionHead";
import SideStars from "./SideStars";

const ICONS = [Target, Code2, PenTool];
// Separadores de la tira: una luna por fase, en orden (cx de la sombra).
const PHASES = [150, 118, 96, 74, 50, 26, 4, -18];
const STICK_TOP = 130;
const PEEK = 16;
const stickOf = (card) => parseFloat(card.style.getPropertyValue("--stick")) || STICK_TOP;

/* Alinea el borde superior del mazo con el del título (h2) y ajusta el
   alto de la columna de texto para que texto y mazo se suelten del sticky
   al mismo tiempo (si no, el texto —más alto— se va antes). Devuelve una
   firma de las medidas para detectar cambios. */
function alignStack(leftCol, left, stack) {
  const cards = [...stack.querySelectorAll(".w-pillar")];
  const desktop = window.matchMedia("(min-width: 901px)").matches;
  const title = left.querySelector(".w-h2");
  const offset = desktop && title ? Math.round(title.getBoundingClientRect().top - left.getBoundingClientRect().top) : 0;
  stack.style.paddingTop = desktop ? `${offset}px` : "";
  cards.forEach((card, i) => {
    card.style.setProperty("--stick", `${STICK_TOP + offset + i * PEEK}px`);
    // Al irse la sección, un sticky no pasa del borde inferior de su contenedor
    // (margin box incluido): este margen conserva el desfase del mazo en la salida.
    card.style.marginBottom = desktop ? `${(cards.length - 1 - i) * PEEK}px` : "";
  });
  // Tras fijarse ambos, la última tarjeta se suelta después de
  // (stack - offset - desfases - alto última) px de scroll; el texto, después
  // de (columna - texto). Igualarlos da el alto mínimo de la columna.
  const last = cards.at(-1);
  const colH = desktop && last
    ? Math.round(left.offsetHeight + stack.offsetHeight - offset - PEEK * (cards.length - 1) - last.offsetHeight)
    : 0;
  leftCol.style.minHeight = colH ? `${colH}px` : "";
  return `${offset}|${colH}`;
}

export default function Pillars() {
  const { lang } = useLang();
  const t = WEB[lang].pillars;
  const marquee = useRef(null);
  const leftColRef = useRef(null);
  const leftRef = useRef(null);
  const stackRef = useRef(null);

  useLayoutEffect(() => {
    const leftCol = leftColRef.current, left = leftRef.current, stack = stackRef.current;
    let offset = alignStack(leftCol, left, stack);
    let timer;
    const recheck = () => {
      const next = alignStack(leftCol, left, stack);
      if (next !== offset) { offset = next; root.refresh(); }
    };
    const onResize = () => { clearTimeout(timer); timer = setTimeout(recheck, 150); };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(recheck);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const root = useAnimeScope((self, el) => {
    const strip = el.querySelector(".w-marquee");
    const grid = el.querySelector(".w-about-grid");
    marquee.current = animate(el.querySelector(".w-marquee-track"), { x: ["0%", "-50%"], duration: 34000, ease: "linear", loop: true });
    revealUp(strip, strip, { fromY: 24 });

    const words = [...el.querySelectorAll(".w-about-p")].flatMap((p) => splitText(p, { words: true }).words);
    animate(words, {
      opacity: [0.16, 1], duration: 200, delay: stagger(18), ease: "linear",
      autoplay: onScroll({ target: grid, enter: "bottom-=80 top", leave: `top+=${STICK_TOP} top`, sync: true }),
    });

    const cta = el.querySelector(".w-cta-line");
    utils.set(cta.querySelector(".w-cta-bar"), { scaleY: 0 });
    utils.set(cta.querySelectorAll(".w-cta-item"), { opacity: 0, x: -20 });
    animate(cta.querySelector(".w-cta-bar"), { scaleY: 1, duration: 700, ease: "out(3)", autoplay: onReveal(cta) });
    animate(cta.querySelectorAll(".w-cta-item"), { opacity: 1, x: 0, duration: 700, ease: "out(3)", delay: stagger(120, { start: 300 }), autoplay: onReveal(cta) });

    const cards = [...el.querySelectorAll(".w-pillar")];
    const icons = cards.map((c) => c.querySelector(".w-icon"));
    utils.set(cards, { opacity: 0, x: 90 });
    utils.set(icons, { scale: 0, rotate: -120 });
    animate(cards, { opacity: 1, x: 0, duration: 1000, ease: "out(4)", delay: stagger(140), autoplay: onReveal(cards[0]) });
    animate(icons, { scale: 1, rotate: 0, ease: spring({ bounce: 0.55 }), delay: stagger(140, { start: 250 }), autoplay: onReveal(cards[0]) });

    cards.forEach((card, i) => {
      animate(card.querySelector(".w-pillar-bar"), {
        scaleX: [0, 1], ease: "linear",
        autoplay: onScroll({ target: card, enter: "bottom top", leave: `top+=${stickOf(card)} top`, sync: true }),
      });

      const next = cards[i + 1];
      if (self.matches.desktop && next) {
        // La tarjeta i se detiene cuando `next` está a (distancia entre ambas) bajo su top.
        const gapToNext = next.offsetTop - card.offsetTop;
        animate(card, {
          scale: [1, 0.92], filter: ["brightness(1)", "brightness(0.42)"], ease: "linear",
          autoplay: onScroll({ target: next, enter: `top+=${stickOf(card) + gapToNext} top`, leave: `top+=${stickOf(next)} top`, sync: true }),
        });
      }
    });

    animate(el.querySelector(".w-divider-dot"), { left: ["0%", "100%"], duration: 7000, ease: "inOut(2)", loop: true, alternate: true });
  }, [lang]);

  return (
    <section className="w-sec w-dotted w-about" id="sobre-mi" ref={root}>
      <SideStars seed={11} count={48} />
      <div className="container">
        <div className="w-marquee" onMouseEnter={() => marquee.current?.pause()} onMouseLeave={() => marquee.current?.play()}>
          <span className="w-marquee-label">{t.toolsLabel}</span>
          <div className="w-marquee-view">
            <div className="w-marquee-track">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <span className="w-tool" key={i} aria-hidden={i >= TOOLS.length ? "true" : undefined}>{tool}<Moon shadowX={PHASES[i % PHASES.length]} className="w-tool-moon" /></span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-about-grid">
          <div className="w-about-leftcol" ref={leftColRef}>
          <div className="w-about-left" ref={leftRef}>
            <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} fill />
            <p className="w-about-p" key={`b1-${lang}`}>{t.body}</p>
            <p className="w-about-p" key={`b2-${lang}`}>{t.body2}</p>
            <div className="w-cta-line">
              <span className="w-cta-bar" aria-hidden="true" />
              <span className="w-cta-item">
                <a className="w-btn w-btn-acc" href={waLink(WEB[lang].waMessage)} target="_blank" rel="noreferrer">
                  <ArrowRight size={16} />{t.cta}
                </a>
              </span>
            </div>
          </div>
          </div>

          <div className="w-stack" ref={stackRef}>
            {t.cards.map(([title, body], i) => {
              const Icon = ICONS[i];
              return (
                <article className="w-pillar" style={{ zIndex: i + 1 }} key={title}>
                  <span className="w-icon"><Icon size={22} /></span>
                  <div className="w-pillar-txt">
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <span className="w-pillar-bar" aria-hidden="true" />
                </article>
              );
            })}
            {/* Contenido (no padding: sticky ignora el padding del contenedor)
                que mantiene el mazo completo un rato antes de irse. */}
            <span className="w-stack-hold" aria-hidden="true" />
          </div>
        </div>

        <div className="w-divider" aria-hidden="true"><span className="w-divider-dot" /></div>
      </div>
    </section>
  );
}
