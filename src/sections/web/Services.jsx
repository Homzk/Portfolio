/* ---------------- web/Services (02) ----------------
   Scrollytelling: lista a la izquierda y panel sticky a la derecha que
   cambia según el ítem que cruza el centro del viewport.
   anime.js:
   - Título pintado letra a letra con el scroll (SectionHead fill).
   - Riel izquierdo que se llena con el scroll de la lista (onScroll sync).
   - Ítem activo (onScroll enter/leave 'center'): su título hace una ola
     letra a letra (splitText chars).
   - Panel: contador y nombre con scrambleText; la vista nueva entra con
     una cortina clip-path (de abajo si se baja, de arriba si se sube) y
     zoom; las maquetas tienen coreografía propia (búsqueda que se
     escribe, estrellas, checks, candado); tags en cascada.
   - Panel inclinado en 3D siguiendo el mouse (createAnimatable).
   En móvil el panel sticky se oculta y cada ítem trae su visual estático. */

import { useLayoutEffect, useRef, useState } from "react";
import { Search, Star, MapPin, Check, Clock, Lock, Globe, KeyRound, MessageCircle } from "lucide-react";
import { animate, createAnimatable, onScroll, scrambleText, splitText, stagger, spring, utils } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { SERVICES } from "../../data/webOffer";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { revealUp } from "./motion";
import SectionHead from "./SectionHead";
import SideStars from "./SideStars";

const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Mock({ kind, m }) {
  if (kind === "seo") return (
    <div className="mk mk-seo">
      <div className="mk-search"><Search size={15} /><span className="mk-type" data-text={m.seo.query}>{m.seo.query}</span></div>
      <div className="mk-result">
        <div className="mk-map"><MapPin size={22} /></div>
        <div>
          <strong>{m.seo.name}</strong>
          <span className="mk-stars">{[0, 1, 2, 3, 4].map((i) => <Star size={13} key={i} />)} {m.seo.rating}</span>
          <span className="mk-meta">{m.seo.meta}</span>
        </div>
      </div>
    </div>
  );
  if (kind === "care") return (
    <div className="mk mk-care">
      <span className="mk-title">{m.care.title}</span>
      {m.care.rows.map(([label, status], i) => {
        const pending = i === m.care.rows.length - 1;
        return (
          <div className={`mk-row${pending ? " pending" : ""}`} key={label}>
            <span className="mk-ic">{pending ? <Clock size={15} /> : <Check size={15} />}</span>
            <span>{label}</span><em>{status}</em>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="mk mk-domain">
      <div className="mk-bar"><span className="mk-ic"><Lock size={14} /></span><span className="mk-type" data-text={m.domain.url}>{m.domain.url}</span></div>
      <div className="mk-row"><span className="mk-ic"><Globe size={15} /></span><span>{m.domain.ssl}</span></div>
      <div className="mk-row"><span className="mk-ic"><KeyRound size={15} /></span><span>{m.domain.owner}</span></div>
    </div>
  );
}

function Visual({ s, m }) {
  return s.img ? <img src={s.img} alt="" loading="lazy" /> : <Mock kind={s.mock} m={m} />;
}

/* Escribe el texto de .mk-type carácter a carácter con un cursor. El
   revert (si se interrumpe) deja el texto completo. */
function typeIn(el, delay = 0) {
  const text = el.dataset.text, state = { n: 0 };
  el.textContent = "";
  el.classList.add("typing");
  const anim = animate(state, {
    n: text.length, modifier: utils.round(0), duration: text.length * 45, delay, ease: "linear",
    onUpdate: () => { el.textContent = text.slice(0, state.n); },
    onComplete: () => el.classList.remove("typing"),
  });
  return { revert: () => { anim.revert(); el.textContent = text; el.classList.remove("typing"); } };
}

/* Coreografía de entrada de cada vista del panel. Devuelve las
   animaciones para poder revertirlas. */
function choreograph(vis, s) {
  const $ = (q) => vis.querySelectorAll(q);
  if (s.img) return [animate($("img"), { scale: [1.18, 1], duration: 1400, ease: "out(3)" })];
  const anims = [animate($(".mk > *"), { opacity: [0, 1], y: [24, 0], duration: 700, ease: "out(3)", delay: stagger(110, { start: 150 }) })];
  if (s.mock === "seo") {
    anims.push(typeIn(vis.querySelector(".mk-type"), 250));
    anims.push(animate($(".mk-stars svg"), { scale: [0, 1], rotate: [-90, 0], ease: spring({ bounce: 0.6 }), delay: stagger(90, { start: 900 }) }));
    anims.push(animate($(".mk-map svg"), { y: [-14, 0], ease: spring({ bounce: 0.7 }), delay: 700 }));
  } else if (s.mock === "care") {
    anims.push(animate($(".mk-ic"), { scale: [0, 1], ease: spring({ bounce: 0.6 }), delay: stagger(160, { start: 450 }) }));
    anims.push(animate($(".mk-row.pending .mk-ic svg"), { rotate: [0, 360], duration: 1600, ease: "inOut(3)", delay: 900 }));
  } else {
    anims.push(typeIn(vis.querySelector(".mk-type"), 300));
    anims.push(animate($(".mk-ic"), { scale: [0, 1], rotate: [-45, 0], ease: spring({ bounce: 0.6 }), delay: stagger(180, { start: 250 }) }));
  }
  return anims;
}

/* El nodo se remonta con cada cambio (key), así que parte con el texto
   final: se vuelve al anterior y scrambleText lo lleva al nuevo. */
function scrambleFrom(el, fromText, toText, chars, duration) {
  el.textContent = fromText;
  return animate(el, { innerHTML: scrambleText({ text: toText, chars }), duration });
}

export default function Services() {
  const { lang } = useLang();
  const t = WEB[lang].services;
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);
  const cardRef = useRef(null);

  const root = useAnimeScope((self, el) => {
    const list = el.querySelector(".w-svc-list");
    animate(el.querySelector(".w-svc-rail-fill"), {
      scaleY: [0, 1], ease: "linear",
      autoplay: onScroll({ target: list, enter: "center top", leave: "center bottom", sync: true }),
    });
    el.querySelectorAll(".w-svc-item").forEach((item, i) => {
      splitText(item.querySelector(".w-svc-t"), { words: true, chars: { class: "w-svc-ch" } });
      onScroll({ target: item, enter: "center top", leave: "center bottom", onEnter: () => setActive(i) });
    });

    const stick = el.querySelector(".w-svc-stick");
    revealUp(cardRef.current, stick, { fromY: 60, scale: [0.94, 1], duration: 1100 });

    if (self.matches.desktop && window.matchMedia("(hover: hover)").matches) {
      const tilt = createAnimatable(cardRef.current, { rotateX: 700, rotateY: 700, ease: "out(3)" });
      const onMove = (e) => {
        const r = stick.getBoundingClientRect();
        tilt.rotateY(utils.clamp(((e.clientX - r.left) / r.width - 0.5) * 12, -6, 6));
        tilt.rotateX(utils.clamp(-((e.clientY - r.top) / r.height - 0.5) * 10, -5, 5));
      };
      const onLeave = () => { tilt.rotateX(0); tilt.rotateY(0); };
      stick.addEventListener("pointermove", onMove);
      stick.addEventListener("pointerleave", onLeave);
      return () => { stick.removeEventListener("pointermove", onMove); stick.removeEventListener("pointerleave", onLeave); };
    }
  }, [lang]);

  useLayoutEffect(() => {
    const card = cardRef.current, el = root.current;
    if (!card || !el) return;
    const from = prevActive.current;
    prevActive.current = active;
    if (from === active || reduceMotion()) return;
    const s = SERVICES[active];
    const down = active >= from;
    const vis = card.querySelectorAll(".w-svc-vis")[active];
    const anims = [
      animate(vis, {
        clipPath: [down ? "inset(100% 0% 0% 0% round 14px)" : "inset(0% 0% 100% 0% round 14px)", "inset(0% 0% 0% 0% round 14px)"],
        duration: 850, ease: "inOut(4)",
      }),
      ...choreograph(vis, s),
      scrambleFrom(card.querySelector(".w-svc-count b"), pad(from + 1), pad(active + 1), "numbers", 600),
      scrambleFrom(card.querySelector(".w-svc-name"), SERVICES[from].name[lang], s.name[lang], "uppercase", 700),
      animate(card.querySelectorAll(".w-tags span, .w-svc-quote"), { opacity: [0, 1], y: [14, 0], duration: 550, ease: "out(3)", delay: stagger(70, { start: 350 }) }),
    ];
    const item = el.querySelectorAll(".w-svc-item")[active];
    const chars = item?.querySelectorAll(".w-svc-ch");
    if (chars?.length) anims.push(animate(chars, { y: [0, -10, 0], duration: 520, ease: "out(2)", delay: stagger(22) }));
    return () => anims.forEach((a) => a.revert());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const s = SERVICES[active];

  return (
    <section className="w-sec" id="servicios" ref={root}>
      <SideStars seed={23} count={64} />
      <div className="container">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} sub={t.sub} fill />

        <div className="w-svc">
          <div className="w-svc-listwrap">
            <span className="w-svc-rail" aria-hidden="true"><span className="w-svc-rail-fill" /></span>
            <ol className="w-svc-list">
              {SERVICES.map((svc, i) => (
                <li className={`w-svc-item${i === active ? " on" : ""}`} key={svc.id}>
                  <span className="w-svc-n">{pad(i + 1)}</span>
                  <h3 className="w-svc-t" key={`${svc.id}-${lang}`}>{svc.name[lang]}</h3>
                  <p className="w-svc-d">{svc.desc[lang]}</p>
                  <div className="w-svc-inline">
                    <div className="w-svc-visual"><Visual s={svc} m={t.mocks} /></div>
                    <div className="w-tags">{svc.tags[lang].map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="w-svc-stick">
            <div className="w-svc-card" ref={cardRef}>
              <div className="w-svc-head">
                <span className="w-svc-label">{t.panelLabel} <b className="w-svc-name" key={`n-${active}-${lang}`}>{s.name[lang]}</b></span>
                <span className="w-svc-count"><b key={`c-${active}`}>{pad(active + 1)}</b> / {pad(SERVICES.length)}</span>
              </div>
              <div className="w-svc-stage" aria-hidden="true">
                {SERVICES.map((svc, i) => (
                  <div className={`w-svc-vis${i === active ? " on" : ""}${i === prevActive.current && i !== active ? " prev" : ""}`} key={svc.id}>
                    <Visual s={svc} m={t.mocks} />
                  </div>
                ))}
              </div>
              <div className="w-svc-foot">
                <div className="w-tags">{s.tags[lang].map((tag) => <span key={`${s.id}-${tag}`}>{tag}</span>)}</div>
                <a className="w-svc-quote" href={waLink(`${t.waService} ${s.name[lang]}`)} target="_blank" rel="noreferrer">
                  <MessageCircle size={15} />{t.quote} {s.name[lang]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
