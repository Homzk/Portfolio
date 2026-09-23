/* Encabezado numerado de sección de /web ("01 — Sobre mí" + título).
   anime.js: la línea naranja se estira y el subtítulo sube. El título:
   - por defecto entra palabra por palabra (splitText con wrap 'clip');
   - con `fill`, se parte en letras que pasan de gris a blanco ligadas al
     scroll (onScroll sync:true): la frase se "pinta" mientras bajas.
   El div raíz lleva key={title} para que un cambio de idioma remonte el
   nodo en vez de que React parchee texto que splitText ya reemplazó. */

import { animate, createTimeline, onScroll, splitText, stagger, utils } from "animejs";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { onReveal } from "./motion";

export default function SectionHead({ num, eyebrow, title, sub, fill = false }) {
  const root = useAnimeScope((self, el) => {
    const line = el.querySelector(".w-kicker-line");
    const kicker = el.querySelector(".w-kicker");
    const h2 = el.querySelector(".w-h2");
    const subEl = el.querySelector(".w-sub");

    utils.set(line, { scaleX: 0 });
    utils.set(kicker, { opacity: 0, x: -16 });
    if (subEl) utils.set(subEl, { opacity: 0, y: 24 });

    const tl = createTimeline({ defaults: { ease: "out(4)", duration: 800 }, autoplay: onReveal(el) })
      .add(kicker, { opacity: 1, x: 0 }, 0)
      .add(line, { scaleX: 1, duration: 700 }, 100);
    if (subEl) tl.add(subEl, { opacity: 1, y: 0 }, 450);

    if (fill) {
      const { chars } = splitText(h2, { words: true, chars: true });
      animate(chars, {
        color: ["rgba(239,237,214,0.16)", "rgba(239,237,214,1)"],
        duration: 200, delay: stagger(24), ease: "linear",
        autoplay: onScroll({ target: h2, enter: "bottom-=60 top", leave: "center top", sync: true }),
      });
    } else {
      const { words } = splitText(h2, { words: { wrap: "clip" } });
      utils.set(words, { y: "110%" });
      tl.add(words, { y: "0%", duration: 900, delay: stagger(55) }, 150);
    }
  }, [title]);

  return (
    <div className="w-head" ref={root} key={title}>
      <div className="w-kicker"><span className="w-num">{num}</span><span className="w-kicker-line" />{eyebrow}</div>
      <h2 className="w-h2">{title}</h2>
      {sub && <p className="w-sub">{sub}</p>}
    </div>
  );
}
