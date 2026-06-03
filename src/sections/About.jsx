/* ---------------- ABOUT ----------------
   Portado verbatim. Dos columnas: narrativa (3 párrafos; el 3º es el
   origin-story marcado como BORRADOR) + panel "glance". */

import { Fragment } from "react";
import { useLang } from "../i18n/LangContext";
import { SEC } from "../i18n/strings";

export default function About() {
  const { lang } = useLang();
  const t = SEC[lang];
  return (
    <section className="sec" id="about">
      <div className="sx-orb orb-a" />
      <div className="container">
        <div className="eyebrow">{t.aboutE}</div><h2 className="h2">{t.aboutT}</h2>
        <div className="about">
          <div>{t.aboutP.map((p, i) => <Fragment key={i}>{i === 2 && <span className="draft">{t.draft}</span>}<p>{p}</p></Fragment>)}</div>
          <div className="glance"><div className="gh">// {t.glanceH}</div>{t.glance.map(([k, v]) => <div className="gr" key={k}><span className="gk">{k} <span className="ar">→</span></span><span className="gv">{v}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}
