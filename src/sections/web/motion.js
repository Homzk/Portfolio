/* Presets de anime.js compartidos por las secciones de /web. Llamar
   siempre dentro de un useAnimeScope para que se reviertan solos. */

import { animate, onScroll, stagger, utils } from "animejs";

/* Dispara una vez cuando el borde superior de `trigger` pasa 100px por
   encima del borde inferior del viewport. sync:'play' (en vez del
   'play pause' por defecto) para que un scroll rápido no la deje
   congelada a medio camino. */
export const onReveal = (trigger, extra = {}) =>
  onScroll({ target: trigger, enter: "bottom-=100 top", sync: "play", repeat: false, ...extra });

export function revealUp(targets, trigger, params = {}) {
  utils.set(targets, { opacity: 0, y: params.fromY ?? 40 });
  const { fromY, ...rest } = params;
  return animate(targets, {
    opacity: 1, y: 0, duration: 900, ease: "out(4)", delay: stagger(110),
    ...rest,
    autoplay: onReveal(trigger),
  });
}
