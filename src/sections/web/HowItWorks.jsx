/* ---------------- web/HowItWorks (07 Proceso) ----------------
   Timeline vertical con anime.js: la línea naranja se escala ligada al
   scroll (onScroll con sync:true = progreso de la animación = progreso
   del scroll) y cada paso se enciende al cruzar el centro del viewport
   (onEnter) y se apaga si se vuelve hacia arriba (onLeaveBackward). */

import { useState } from "react";
import { animate, onScroll, spring } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import SectionHead from "./SectionHead";
import SideStars from "./SideStars";

export default function HowItWorks() {
  const { lang } = useLang();
  const t = WEB[lang].how;
  const [reached, setReached] = useState(() => new Set());

  const root = useAnimeScope((self, el) => {
    const list = el.querySelector(".w-tl");
    animate(el.querySelector(".w-tl-fill"), {
      scaleY: [0, 1], ease: "linear",
      autoplay: onScroll({ target: list, enter: "center top", leave: "center bottom", sync: true }),
    });

    el.querySelectorAll(".w-tl-step").forEach((step, i) => {
      const node = step.querySelector(".w-tl-node");
      onScroll({
        target: step, enter: "center top",
        onEnterForward: () => {
          setReached((prev) => new Set(prev).add(i));
          animate(node, { scale: [0.6, 1], ease: spring({ bounce: 0.6 }) });
        },
        onLeaveBackward: () => setReached((prev) => { const next = new Set(prev); next.delete(i); return next; }),
      });
    });
  });

  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="w-sec w-dotted" id="proceso" ref={root}>
      <SideStars seed={41} />
      <div className="container w-how">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} />

        <ol className={`w-tl${reduce ? " all-on" : ""}`}>
          <span className="w-tl-line" aria-hidden="true"><span className="w-tl-fill" /></span>
          {t.steps.map(([title, body], i) => (
            <li className={`w-tl-step${reached.has(i) ? " on" : ""}`} key={title}>
              <span className="w-tl-node">{String(i + 1).padStart(2, "0")}</span>
              <div className="w-tl-card">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
