/* ---------------- web/Sites ----------------
   Clientes reales + demos por rubro combinados en un solo grid (a
   pedido del usuario, antes eran dos secciones separadas). Los
   clientes reales (kind:"case"|"external") son clickeables; las demos
   (kind:"demo") no existen todavía — quedan en estado "Próximamente":
   el subdominio se muestra como texto plano y el CTA es un botón
   deshabilitado, nunca un link a un subdominio que no resuelve. */

import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import ProjectThumb from "../../components/ProjectThumb";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { SITES } from "../../data/webOffer";

export default function Sites() {
  const { lang } = useLang();
  const t = WEB[lang].sites;

  return (
    <section className="sec web-sites" id="catalogo">
      <div className="container">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="h2">{t.title}</h2>
        <p className="web-sub">{t.sub}</p>

        <div className="site-grid">
          {SITES.map((s) => {
            const body = (
              <>
                <div className="thumb site-thumb">
                  <ProjectThumb img={s.cover} cap={s.name[lang]} />
                  {s.comingSoon && <span className="site-soon">{t.comingSoon}</span>}
                </div>
                <div className="site-body">
                  <span className="site-tag">{s.planTag[lang]}</span>
                  <h3 className="site-name">{s.name[lang]}</h3>
                  {s.subdomain && <span className="site-meta">{s.subdomain}</span>}
                  <p className="site-desc">{s.desc[lang]}</p>
                  {s.comingSoon ? (
                    <button className="btn btn-ghost site-cta" disabled aria-disabled="true">{t.viewSite}</button>
                  ) : (
                    <span className="lk site-cta"><span className="ar2">→</span>{t.viewSite}</span>
                  )}
                </div>
              </>
            );

            if (s.comingSoon) return <article className="site-card" key={s.id}>{body}</article>;
            if (s.kind === "case") return <Link className="site-card" to={`/proyecto/${s.slug}`} key={s.id}>{body}</Link>;
            return (
              <a className="site-card" href={s.href} target="_blank" rel="noreferrer" key={s.id}>
                {body}<ArrowUpRight className="site-ext" size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
