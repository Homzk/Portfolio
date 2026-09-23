/* ---------------- web/Showcase (05) ----------------
   Versión "testimonios" sin testimonios inventados: burbujas flotantes
   con los sitios publicados (SITES sin comingSoon) alrededor de una caja
   central. El foco (brillo lunar) rota solo cada 4,5 s (se pausa con hover o
   foco, y con prefers-reduced-motion) y cada burbuja es un botón.

   anime.js: las burbujas entran con spring en orden aleatorio al hacer
   scroll; al cambiar de sitio, el contenido de la caja entra en cascada
   y las comillas dan un pequeño salto. El flote idle es CSS (.w-bub), por
   eso la escala de entrada va en .w-bub-in: una animación CSS pisaría
   el transform que escribe anime. */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { animate, stagger, utils, spring } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { SITES } from "../../data/webOffer";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { onReveal, revealUp } from "./motion";
import SectionHead from "./SectionHead";
import SideStars from "./SideStars";

const LIVE = SITES.filter((s) => !s.comingSoon);
const SPOTS = [{ l: 13, t: 20 }, { l: 87, t: 16 }, { l: 9, t: 78 }, { l: 90, t: 76 }, { l: 50, t: 4 }, { l: 50, t: 97 }];
const DECOR = [{ l: 30, t: 6, s: 30 }, { l: 70, t: 93, s: 24 }, { l: 97, t: 46, s: 16 }, { l: 3, t: 48, s: 20 }, { l: 24, t: 95, s: 14 }];

export default function Showcase() {
  const { lang } = useLang();
  const t = WEB[lang].showcase;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const quoteRef = useRef(null);

  const root = useAnimeScope((self, el) => {
    const stage = el.querySelector(".w-show");
    const bubs = el.querySelectorAll(".w-bub-in");
    utils.set(bubs, { scale: 0, opacity: 0 });
    animate(bubs, { scale: 1, opacity: 1, ease: spring({ bounce: 0.5 }), delay: stagger(110, { from: "random" }), autoplay: onReveal(stage) });
    revealUp(el.querySelector(".w-quote"), stage, { fromY: 50, scale: [0.92, 1], duration: 1100 });
  });

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % LIVE.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const box = quoteRef.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const body = animate(box.querySelectorAll(".w-quote-body > *"), { opacity: [0, 1], y: [18, 0], duration: 650, ease: "out(3)", delay: stagger(70) });
    const mark = animate(box.querySelector(".w-quote-mark"), { scale: [0.6, 1], rotate: [-12, 0], ease: spring({ bounce: 0.6 }) });
    return () => { body.revert(); mark.revert(); };
  }, [active]);

  const s = LIVE[active];
  const visit = s.kind === "case"
    ? <Link className="w-link" to={`/proyecto/${s.slug}`}>{t.visit}<ArrowUpRight size={15} /></Link>
    : <a className="w-link" href={s.href} target="_blank" rel="noreferrer">{t.visit}<ArrowUpRight size={15} /></a>;

  return (
    <section className="w-sec w-dotted" id="en-linea" ref={root}>
      <SideStars seed={37} />
      <div className="container">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div className="w-show" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          {DECOR.map((d, i) => (
            <span className="w-bub-pos decor" style={{ left: `${d.l}%`, top: `${d.t}%` }} key={i} aria-hidden="true">
              <span className="w-bub-in"><span className="w-bub-ring" style={{ width: d.s, height: d.s, "--d": `${i * -1.3}s` }} /></span>
            </span>
          ))}

          <div className="w-bubs">
            {LIVE.map((site, i) => (
              <span className="w-bub-pos" style={{ left: `${SPOTS[i].l}%`, top: `${SPOTS[i].t}%` }} key={site.id}>
                <span className="w-bub-in">
                  <button className={`w-bub${i === active ? " on" : ""}`} style={{ "--d": `${i * -1.1}s` }}
                    onClick={() => setActive(i)} aria-pressed={i === active} aria-label={site.name[lang]}>
                    <img src={site.cover} alt="" loading="lazy" />
                  </button>
                </span>
              </span>
            ))}
          </div>

          <div className="w-quote" aria-live="polite" ref={quoteRef}>
            <span className="w-quote-mark" aria-hidden="true">“</span>
            <div className="w-quote-body" key={s.id}>
              <span className="w-site-tag">{s.planTag[lang]}</span>
              <h3>{s.name[lang]}</h3>
              <p>{s.desc[lang]}</p>
              {visit}
            </div>
            <div className="w-quote-dots">
              {LIVE.map((site, i) => <span className={i === active ? "on" : ""} key={site.id} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
