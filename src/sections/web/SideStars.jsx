/* ---------------- web/SideStars ----------------
   Estrellas en los márgenes izquierdo y derecho de una sección (capa
   absoluta detrás del contenido). anime.js:
   - Parallax: cada estrella tiene una profundidad (data-d) y se desplaza
     en Y según el scroll de la sección (onScroll con sync suavizado): las
     "cercanas" viajan más que las lejanas.
   - Titileo: opacidad y escala en bucle, con duración/retraso al azar.
   - Estrellas fugaces: una por costado, cruzan cada varios segundos.
   Posiciones con semilla fija (createSeededRandom): estables entre renders.
   Se oculta en móvil (CSS). */

import { useMemo } from "react";
import { animate, createSeededRandom, onScroll, utils } from "animejs";
import { useAnimeScope } from "../../hooks/useAnimeScope";

function makeStars(count, seed) {
  const rnd = createSeededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const left = i % 2 === 0;
    const big = rnd(0, 10) > 8;
    return {
      x: left ? rnd(1, 11, 2) : rnd(89, 99, 2),
      y: rnd(2, 98, 2),
      size: big ? rnd(3.5, 5, 1) : rnd(1.6, 3, 1),
      depth: rnd(0.3, 1.6, 2),
      cyan: rnd(0, 10) > 5,
      big,
    };
  });
}

export default function SideStars({ count = 30, seed = 1 }) {
  const stars = useMemo(() => makeStars(count, seed), [count, seed]);

  const root = useAnimeScope((self, el) => {
    const dots = el.querySelectorAll(".w-star");

    animate(dots, {
      y: (d) => [`${d.dataset.d * 110}px`, `${-d.dataset.d * 110}px`],
      ease: "linear",
      autoplay: onScroll({ target: el, enter: "bottom top", leave: "top bottom", sync: 0.5 }),
    });

    animate(dots, {
      opacity: [0.25, 1],
      scale: [0.7, 1.15],
      duration: () => utils.random(1400, 3600),
      delay: () => utils.random(0, 2500),
      ease: "inOut(2)", loop: true, alternate: true,
    });

    el.querySelectorAll(".w-shoot").forEach((s, i) => {
      animate(s, {
        x: [0, 230], opacity: [0, 1, 0], scaleX: [0.2, 1, 0.4],
        duration: 1300, ease: "out(2)",
        delay: 1500 + i * 2600, loop: true, loopDelay: utils.random(5000, 9000),
      });
    });
  });

  return (
    <div className="w-sidestars" ref={root} aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className={`w-star${s.cyan ? " cyan" : ""}${s.big ? " big" : ""}`} data-d={s.depth}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }} />
      ))}
      <span className="w-shoot-wrap left"><span className="w-shoot" /></span>
      <span className="w-shoot-wrap right"><span className="w-shoot" /></span>
    </div>
  );
}
