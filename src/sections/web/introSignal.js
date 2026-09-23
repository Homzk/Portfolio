/* Señal "la intro terminó" para que Header y Hero arranquen su entrada
   justo cuando se levanta la cortina de Intro.jsx (y no detrás de ella).
   Se resuelve una sola vez por carga de página; si la intro no se
   muestra, Intro.jsx la resuelve de inmediato. */

let resolveIntro;
export const introDone = new Promise((resolve) => { resolveIntro = resolve; });
export const finishIntro = () => resolveIntro();
