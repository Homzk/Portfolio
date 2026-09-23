/* ---------------- Moon ----------------
   Símbolo propio de /web: luna en SVG con lado oscuro, luz crema y
   cráteres. La fase la da un círculo de sombra (.moon-shadow) que enmascara
   la parte iluminada: `shadowX` es su cx en un viewBox de 100 —50 = luna
   nueva, <50 o >50 = creciente/menguante, ≤-46 o ≥146 = llena—. Al ser un
   atributo SVG, anime.js puede animar `cx` para recorrer las fases. */

import { useId } from "react";

export default function Moon({ shadowX = 150, className = "" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={`moon ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`ml-${uid}`} cx="38%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#F8F5DC" />
          <stop offset="55%" stopColor="#E4DEA8" />
          <stop offset="100%" stopColor="#ADA87C" />
        </radialGradient>
        <mask id={`mm-${uid}`}>
          <rect width="100" height="100" fill="white" />
          <circle className="moon-shadow" cx={shadowX} cy="50" r="47" fill="black" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#1C1B16" />
      <g fill="#26241D">
        <circle cx="35" cy="37" r="7" /><circle cx="62" cy="63" r="9" /><circle cx="58" cy="29" r="4" />
      </g>
      <g mask={`url(#mm-${uid})`}>
        <circle cx="50" cy="50" r="46" fill={`url(#ml-${uid})`} />
        <g fill="#C8C28E" opacity=".55">
          <circle cx="35" cy="37" r="7" /><circle cx="62" cy="63" r="9" /><circle cx="58" cy="29" r="4" />
          <circle cx="40" cy="66" r="5" /><circle cx="70" cy="44" r="3.5" /><circle cx="26" cy="55" r="3" />
        </g>
      </g>
      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(239,237,214,.22)" strokeWidth="1" />
    </svg>
  );
}
