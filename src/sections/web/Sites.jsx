/* ---------------- web/Sites (04) ----------------
   Clientes reales + demos por rubro en un solo grid. Las demos que aún
   no existen (comingSoon) quedan en "Próximamente": subdominio como
   texto plano y CTA deshabilitado, nunca un link a un subdominio que no
   resuelve. Las tarjetas clickeables se inclinan en 3D siguiendo el
   puntero (solo con mouse) y muestran un ojo sobre la captura. */

import { Link } from "react-router";
import { ArrowUpRight, Eye } from "lucide-react";
import ProjectThumb from "../../components/ProjectThumb";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { SITES } from "../../data/webOffer";
import { stagger } from "animejs";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { revealUp } from "./motion";
import SectionHead from "./SectionHead";

const canTilt = () => window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

function onTilt(e) {
  if (!canTilt()) return;
  const el = e.currentTarget, r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
}
function offTilt(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export default function Sites() {
  const { lang } = useLang();
  const t = WEB[lang].sites;
  const root = useAnimeScope((self, el) => {
    const grid = el.querySelector(".w-site-grid");
    revealUp(grid.children, grid, { fromY: 60, scale: [0.94, 1], duration: 1000, delay: stagger(90) });
  });

  return (
    <section className="w-sec" id="catalogo" ref={root}>
      <div className="container">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div className="w-site-grid">
          {SITES.map((s) => {
            const body = (
              <>
                <div className="w-site-thumb">
                  <ProjectThumb img={s.cover} cap={s.name[lang]} />
                  {s.comingSoon
                    ? <span className="w-site-soon">{t.comingSoon}</span>
                    : <span className="w-site-eye" aria-hidden="true"><Eye size={22} /></span>}
                </div>
                <div className="w-site-body">
                  <span className="w-site-tag">{s.planTag[lang]}</span>
                  <h3 className="w-site-name">{s.name[lang]}</h3>
                  {s.subdomain && <span className="w-site-meta">{s.subdomain}</span>}
                  <p className="w-site-desc">{s.desc[lang]}</p>
                  {s.comingSoon
                    ? <span className="w-site-cta off" aria-disabled="true">{t.viewSite}</span>
                    : <span className="w-site-cta">{t.viewSite}<ArrowUpRight size={15} /></span>}
                </div>
              </>
            );

            const tilt = { onPointerMove: onTilt, onPointerLeave: offTilt };
            let card;
            if (s.comingSoon) card = <article className="w-site soon">{body}</article>;
            else if (s.kind === "case") card = <Link className="w-site" to={`/proyecto/${s.slug}`} {...tilt}>{body}</Link>;
            else card = <a className="w-site" href={s.href} target="_blank" rel="noreferrer" {...tilt}>{body}</a>;

            return <div className="w-site-cell" key={s.id}>{card}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
