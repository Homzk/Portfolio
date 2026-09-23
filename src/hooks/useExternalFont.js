/* ---------------- useExternalFont ----------------
   Carga una hoja de fuentes de Google Fonts solo cuando el componente
   que la llama está montado, en vez de cargarla globalmente en
   index.html (penalizaría el first paint de rutas que no la usan —
   p.ej. el peso 800 de Hanken Grotesk solo se usa en /web). Mismo estilo imperativo
   sobre <head> que useDocumentMeta. No se remueve al desmontar: el
   navegador la cachea, así que quitarla y re-agregarla en cada
   navegación solo generaría trabajo extra sin beneficio. */

import { useEffect } from "react";

export function useExternalFont(href) {
  useEffect(() => {
    if (document.head.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
}
