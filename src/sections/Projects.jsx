/* ---------------- PROJECTS ----------------
   Portado verbatim desde assets/App.reference.jsx. Filas editoriales con
   miniatura animada (placeholder hasta grabar webm en T043), badge,
   métricas, chips, enlaces por matriz y botón circular →. AirVision
   destacado. Fila "próximamente" de cierre. */

import { Fragment } from "react";
import { ArrowRight, Lock, Star } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { PROJ } from "../i18n/strings";
import { projData } from "../data/projects";

export default function Projects() {
  const { lang } = useLang();
  const t = PROJ[lang];
  const rows = projData(lang);
  return (
    <section className="pw-root" id="work">
      <div className="pw-grain" />
      <div className="container">
        <div className="pw-top">
          <div><div className="eyebrow">{t.eyebrow}</div><h2 className="pw-title">{t.title}</h2></div>
          <p className="pw-intro">{t.intro}</p>
        </div>
        <div className="rows">
          {rows.map((p) => (
            <a className={`row ${p.feat ? "feat" : ""}`} key={p.n} href={p.open} target="_blank" rel="noreferrer">
              <div className={`thumb ${p.feat ? "feat" : ""}`}><div className="thumb-anim" /><div className="thumb-dots" /><div className="thumb-cap"><span className="ti" />{p.cap}</div></div>
              <div className="body">
                <div className="num">{p.n} / 04</div>
                <div className="head"><span className="name">{p.name}</span>{p.feat && <span className="feat-tag"><Star size={10} fill="#fff" />{t.feat}</span>}<span className={`badge ${p.live ? "" : "cap"}`}><span className="dot" />{p.badge}</span></div>
                <div className="desc">{p.desc}</div>
                <div className="metrics">{p.metrics.map((m, i) => <Fragment key={m}>{i > 0 && <span className="sep">·</span>}{m}</Fragment>)}</div>
                <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                <div className="links">{p.links.map((l, i) => l.href ? <span className="lk" key={i}><span className="ar2">→</span>{t.L[l.k]}</span> : <span className="lk dim" key={i}><Lock size={12} />{t.L[l.k]}</span>)}</div>
              </div>
              <span className="open"><ArrowRight size={20} /></span>
            </a>
          ))}
          <div className="soon"><span className="dotline">✦ {t.soon} <b>{t.soonEm}</b></span></div>
        </div>
      </div>
    </section>
  );
}
