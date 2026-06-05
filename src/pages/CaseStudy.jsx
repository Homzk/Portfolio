/* ---------------- CaseStudy ----------------
   Plantilla de caso de estudio (data-driven) portada desde
   assets/CaseStudy.reference.jsx. Lee :slug, resuelve el contenido
   bilingüe de src/data/caseStudies.js y renderiza la estructura fija.
   La sección "Decisiones técnicas" es obligatoria (Constitución IV).
   El contenido HTML inline (<b>) proviene de datos propios estáticos. */

import { Link, useParams, Navigate } from "react-router";
import { ArrowLeft, ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { CASES, CASE_LABELS, CASE_ORDER } from "../data/caseStudies";
import "../styles/case-study.css";

export default function CaseStudy() {
  const { slug } = useParams();
  const { lang } = useLang();
  const L = CASE_LABELS[lang];
  const c = CASES[slug];

  if (!c) return <Navigate to="/" replace />;

  const idx = CASE_ORDER.indexOf(slug);
  const nextSlug = CASE_ORDER[(idx + 1) % CASE_ORDER.length];
  const next = CASES[nextSlug];

  const eyebrowFor = { context: L.eContext, problem: L.eProblem, role: L.eRole, solution: L.eSolution };
  const html = (s) => ({ dangerouslySetInnerHTML: { __html: s } });

  return (
    <div className="cs-root">
      <div className="cs-grain" />
      <div className="cs-orb top" />

      <div className="container back">
        <Link to="/"><ArrowLeft size={15} /> {L.back}</Link>
      </div>

      {/* TITLE */}
      <div className="container titleblk">
        <span className="badge"><span className="dot" style={c.live ? undefined : { background: "var(--dim)" }} />{c.badge[lang]}</span>
        <h1 className="h1">{c.name}</h1>
        <p className="lead">{c.lead[lang]}</p>
        <div className="meta">
          <div>{L.rol} <span className="ar">→</span> <b>{c.meta.rol[lang]}</b></div>
          <div>{L.cliente} <span className="ar">→</span> <b>{c.meta.cliente[lang]}</b></div>
          <div>{L.anio} <span className="ar">→</span> <b>{c.meta.anio[lang]}</b></div>
        </div>
        <div className="actions">
          {c.primary && <a className="btn btn-primary" href={c.primary.href} target="_blank" rel="noreferrer">{c.primary.label[lang]} <ExternalLink size={15} /></a>}
          {c.secondary && <a className="btn" href={c.secondary.href} target="_blank" rel="noreferrer" style={{ borderColor: "var(--line-2)" }}>{c.secondary.label[lang]} <ArrowUpRight size={15} /></a>}
          {c.privateNote && <span className="btn-dim"><Lock size={13} /> {c.privateNote[lang]}</span>}
        </div>
      </div>

      {/* COVER */}
      <div className="container wide">
        <div className="cover">
          {c.cover ? (
            <img className="cover-img" src={c.cover} alt="" loading="lazy" />
          ) : (
            <>
              <div className="cover-anim" />
              <div className="cover-orb" />
            </>
          )}
          <div className="cover-cap"><span className="d" />{c.coverCap[lang]}</div>
        </div>
      </div>

      {/* GALERÍA (solo si el caso tiene fotos) */}
      {c.gallery && (
        <div className="container wide">
          <div className="gallery">
            {c.gallery.map((g, i) => (
              <figure className="shot" key={i}>
                <img src={g.src} alt="" loading="lazy" />
                <figcaption><span className="d" />{g.cap[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* CONTEXTO / PROBLEMA / ROL / SOLUCIÓN */}
      {c.sections.map((s) => (
        <div className="container sec" key={s.k}>
          <div className="eyebrow">{eyebrowFor[s.k]}</div>
          <h2>{s.h2[lang]}</h2>
          {s.paras[lang].map((p, i) => <p key={i} {...html(p)} />)}
        </div>
      ))}

      {/* DECISIONES TÉCNICAS */}
      <div className="container sec">
        <div className="eyebrow">{L.eDecisions}</div>
        <h2>{lang === "es" ? "El porqué de cada decisión" : "The why behind each decision"}</h2>
        {c.decisions.map((d, i) => (
          <div className="dec" key={i}><h3>{d.q[lang]}</h3><p {...html(d.a[lang])} /></div>
        ))}
      </div>

      {/* RESULTADOS */}
      <div className="container sec">
        <div className="eyebrow">{L.eResults}</div>
        <h2>{lang === "es" ? "En números" : "By the numbers"}</h2>
        <div className="stats">
          {c.results.map((r, i) => (
            <div className="stat" key={i}><div className="v">{r.v}{r.small && <small>{r.small}</small>}</div><div className="k">{r.k[lang]}</div></div>
          ))}
        </div>
      </div>

      {/* STACK */}
      <div className="container sec">
        <div className="eyebrow">{L.eStack}</div>
        <h2>{lang === "es" ? "Herramientas" : "Tools"}</h2>
        <div className="chips">{c.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
      </div>

      {/* APRENDIZAJES */}
      <div className="container sec">
        <div className="eyebrow">{L.eLearnings}</div>
        <h2>{lang === "es" ? "Lo que me llevo" : "What I take away"}</h2>
        <p {...html(c.learnings[lang])} />
      </div>

      {/* NEXT */}
      <div className="container wide next">
        <div className="next-orb" />
        <Link to={`/proyecto/${nextSlug}`}>
          <div>
            <div className="lbl">{L.next}</div>
            <div className="nm">{next.name}</div>
          </div>
          <span className="circ"><ArrowUpRight size={22} /></span>
        </Link>
      </div>
    </div>
  );
}
