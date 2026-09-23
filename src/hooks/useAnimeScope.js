/* ---------------- useAnimeScope ----------------
   createScope de anime.js acotado a un ref (patrón de la guía oficial
   "Using with React"): todo lo creado dentro de `setup` —animate,
   timelines, onScroll, splitText, utils.set— se revierte al desmontar
   o cuando cambian `deps`. useLayoutEffect para fijar los estados
   iniciales antes del primer paint (sin parpadeo).

   `setup(self, rootEl)` recibe self.matches.reduce: con movimiento
   reducido no se anima nada y el contenido queda visible tal cual.
   self.matches.desktop (>900px) sirve para efectos que solo tienen
   sentido en pantalla ancha; el scope se re-ejecuta solo si cambia.

   Si `setup` devuelve una función, el scope la llama al revertir (útil
   para quitar listeners). El ref devuelto trae además `.refresh()` (scope.refresh(): revierte y
   vuelve a correr `setup`), para cuando cambian medidas del DOM de las
   que dependen los umbrales de onScroll. */

import { useLayoutEffect, useRef } from "react";
import { createScope } from "animejs";

export function useAnimeScope(setup, deps = []) {
  const root = useRef(null);
  const scope = useRef(null);
  root.refresh = () => scope.current?.refresh();

  useLayoutEffect(() => {
    scope.current = createScope({ root, mediaQueries: { reduce: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 901px)" } })
      .add((self) => (self.matches.reduce ? undefined : setup(self, root.current)));
    return () => { scope.current.revert(); scope.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return root;
}
