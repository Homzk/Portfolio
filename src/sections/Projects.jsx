/* ---------------- PROJECTS ----------------
   Filas editoriales (estilo verbatim de la referencia). Re-cableado a la
   matriz (FR-013): el botón circular → y la miniatura enrutan al caso de
   estudio (/proyecto/:slug); los enlaces inline con `href` (demo/repo)
   abren externos; el enlace "caso de estudio" es un <Link> interno; los
   informativos (repo privado/sistema interno) quedan como spans dim.
   AirVision destacado. Fila "próximamente" de cierre. */

import { Fragment } from "react";
import { Link } from "react-router";
import { ArrowRight, Lock, Star } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { PROJ } from "../i18n/strings";
import { projData, VIDEO_READY } from "../data/projects";
import ProjectThumb from "../components/ProjectThumb";

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
            <article className={`row ${p.feat ? "feat" : ""}`} key={p.n}>
              <Link className={`thumb ${p.feat ? "feat" : ""}`} to={`/proyecto/${p.slug}`} aria-label={p.name}>
                <ProjectThumb slug={p.slug} cap={p.cap} hasVideo={VIDEO_READY[p.slug]} />
              </Link>
              <div className="body">
                <div className="num">{p.n} / 04</div>
                <div className="head"><span className="name">{p.name}</span>{p.feat && <span className="feat-tag"><Star size={10} fill="currentColor" />{t.feat}</span>}<span className={`badge ${p.live ? "" : "cap"}`}><span className="dot" />{p.badge}</span></div>
                <div className="desc">{p.desc}</div>
                <div className="metrics">{p.metrics.map((m, i) => <Fragment key={m}>{i > 0 && <span className="sep">·</span>}{m}</Fragment>)}</div>
                <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                <div className="links">{p.links.map((l, i) => {
                  if (l.k === "case") return <Link className="lk" key={i} to={`/proyecto/${p.slug}`}><span className="ar2">→</span>{t.L[l.k]}</Link>;
                  if (l.href) return <a className="lk" key={i} href={l.href} target="_blank" rel="noreferrer"><span className="ar2">→</span>{t.L[l.k]}</a>;
                  return <span className="lk dim" key={i}><Lock size={12} />{t.L[l.k]}</span>;
                })}</div>
              </div>
              <Link className="open" to={`/proyecto/${p.slug}`} aria-label={`${t.L.case}: ${p.name}`}><ArrowRight size={20} /></Link>
            </article>
          ))}
          <div className="soon"><span className="dotline">✦ {t.soon} <b>{t.soonEm}</b></span></div>
        </div>
      </div>
    </section>
  );
}
