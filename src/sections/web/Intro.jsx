/* ---------------- web/Intro ----------------
   Intro breve de marca (no una pantalla de carga que espere "todo"):
   la luna pasa de nueva a llena mientras un anillo se dibuja alrededor
   (svg.createDrawable) y el nombre entra letra a letra. Dura lo mínimo
   para verse (~1,15 s), espera las fuentes con un tope de 1,6 s y sale
   con una cortina hacia arriba; al empezar a subir emite finishIntro()
   para que Header y Hero arranquen su entrada.
   Solo en la primera visita de la sesión (sessionStorage) y nunca con
   prefers-reduced-motion. Bloquea el scroll mientras está visible. */

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, createSeededRandom, createTimeline, stagger, svg } from "animejs";
import Moon from "../../components/Moon";
import { finishIntro } from "./introSignal";

const KEY = "w-intro-seen";
const NAME = "Álvaro Flores";

function shouldShow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try { return !sessionStorage.getItem(KEY); } catch { return true; }
}

export default function Intro() {
  const [show, setShow] = useState(shouldShow);
  const ref = useRef(null);
  const stars = useMemo(() => {
    const rnd = createSeededRandom(7);
    return Array.from({ length: 34 }, () => ({ x: rnd(2, 98, 1), y: rnd(3, 97, 1), s: rnd(1.2, 2.8, 1), cyan: rnd(0, 10) > 5 }));
  }, []);

  useLayoutEffect(() => {
    if (!show) { finishIntro(); return; }
    const el = ref.current;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const ring = svg.createDrawable(el.querySelector(".w-intro-ring path"));
    const tl = createTimeline({ defaults: { ease: "inOut(3)" } })
      .add(el.querySelector(".w-intro-moon"), { opacity: [0, 1], scale: [0.6, 1], duration: 500, ease: "out(3)" }, 0)
      .add(ring, { draw: ["0 0", "0 1"], duration: 1000 }, 100)
      .add(el.querySelector(".moon-shadow"), { cx: [50, -48], duration: 1000 }, 100)
      .add(el.querySelectorAll(".w-intro-name span"), { opacity: [0, 1], y: [14, 0], duration: 400, ease: "out(3)", delay: stagger(30) }, 300)
      .add(el.querySelectorAll(".w-intro-star"), { opacity: [0, 0.9], scale: [0, 1], duration: 500, ease: "out(2)", delay: stagger(20, { from: "random" }) }, 0);

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    let cancelled = false, exit;
    Promise.all([Promise.race([fonts, wait(1600)]), wait(1150)]).then(() => {
      if (cancelled) return;
      exit = animate(el, {
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"], duration: 750, ease: "inOut(4)",
        onComplete: () => {
          try { sessionStorage.setItem(KEY, "1"); } catch { /* sin storage: se volverá a mostrar */ }
          setShow(false);
        },
      });
      setTimeout(() => { html.style.overflow = prevOverflow; finishIntro(); }, 200);
    });

    return () => { cancelled = true; tl.revert(); exit?.revert(); html.style.overflow = prevOverflow; };
  }, [show]);

  if (!show) return null;

  return (
    <div className="w-intro" ref={ref} aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className={`w-intro-star${s.cyan ? " cyan" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }} />
      ))}
      <div className="w-intro-moon">
        <svg className="w-intro-ring" viewBox="0 0 120 120"><path d="M60,60 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" /></svg>
        <Moon shadowX={50} />
      </div>
      <div className="w-intro-name">
        {[...NAME].map((c, i) => <span key={i}>{c === " " ? " " : c}</span>)}
        <span className="dot">.</span>
      </div>
    </div>
  );
}
