/* ---------------- web/Header ----------------
   Header flotante (position:fixed) de /web. anime.js:
   - Entrada: baja desde arriba y sus elementos aparecen en cascada.
   - Morph ligado al scroll: en los primeros 140px pasa de barra ancha y
     transparente a "píldora" flotante (más angosta, redondeada, vidrio,
     borde naranja y sombra). onScroll con sync suavizado: al volver
     arriba se deshace igual de suave.
   - Barra de progreso de lectura de toda la página (sync directo).
   Con movimiento reducido no corre nada de esto y el CSS deja la
   píldora fija (legible sobre el contenido). */

import { Link } from "react-router";
import { Languages, MessageCircle } from "lucide-react";
import { animate, createTimeline, onScroll, stagger } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { scrollToId } from "./scrollTo";
import { introDone } from "./introSignal";

const MORPH_PX = 140;

export default function Header() {
  const { lang, toggle } = useLang();
  const t = WEB[lang];

  const root = useAnimeScope((self, el) => {
    const bar = el.querySelector(".w-header-bar");
    const page = el.closest(".web-root");
    const padFrom = window.matchMedia("(max-width: 640px)").matches ? "20px" : "36px";

    // Entrada tras la intro (Intro.jsx); hasta entonces queda oculto arriba.
    const drop = animate(el, { y: ["-120%", "0%"], duration: 900, ease: "out(4)", autoplay: false });
    const items = animate(el.querySelectorAll(".w-logo, .w-nav a, .w-header-r"), {
      opacity: [0, 1], y: [-12, 0], duration: 600, ease: "out(3)", delay: stagger(50, { start: 300 }), autoplay: false,
    });
    drop.seek(0); items.seek(0);
    let alive = true;
    introDone.then(() => { if (alive) { drop.play(); items.play(); } });

    createTimeline({
      defaults: { ease: "linear", duration: 1000 },
      autoplay: onScroll({ target: page, enter: "top top", leave: `top top+=${MORPH_PX}`, sync: 0.35 }),
    })
    .add(el, { paddingTop: [0, 14], paddingLeft: [0, 14], paddingRight: [0, 14] }, 0)
    .add(bar, {
      maxWidth: ["1180px", "1040px"],
      height: ["76px", "58px"],
      paddingLeft: [padFrom, "20px"],
      paddingRight: [padFrom, "20px"],
      borderRadius: ["0px", "30px"],
      backgroundColor: ["rgba(6,10,16,0)", "rgba(12,18,28,0.78)"],
      borderColor: ["rgba(230,224,168,0)", "rgba(230,224,168,0.4)"],
      boxShadow: ["0px 0px 0px rgba(0,0,0,0), 0px 0px 0px rgba(230,224,168,0)", "0px 18px 50px rgba(0,0,0,0.5), 0px 0px 36px rgba(230,224,168,0.14)"],
      backdropFilter: ["blur(0px)", "blur(14px)"],
    }, 0);

    animate(el.querySelector(".w-header-progress"), {
      scaleX: [0, 1], ease: "linear",
      autoplay: onScroll({ target: page, enter: "top top", leave: "bottom bottom", sync: true }),
    });

    return () => { alive = false; };
  });

  return (
    <header className="w-header" ref={root}>
      <div className="w-header-bar">
        <a className="w-logo" href="#top" onClick={(e) => scrollToId(e, "top")}>Álvaro Flores<span>.</span></a>
        <nav className="w-nav" aria-label={lang === "es" ? "Secciones" : "Sections"}>
          {t.nav.links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => scrollToId(e, id)}>{label}</a>
          ))}
        </nav>
        <div className="w-header-r">
          <Link to="/" className="w-header-back">{t.nav.back}</Link>
          <button className="w-lang" onClick={toggle}><Languages size={14} />{lang === "es" ? "EN" : "ES"}</button>
          <a className="w-btn w-btn-acc w-btn-sm" href={waLink(t.waMessage)} target="_blank" rel="noreferrer">
            <MessageCircle size={15} />{t.nav.cta}
          </a>
        </div>
        <span className="w-header-progress" aria-hidden="true" />
      </div>
    </header>
  );
}
