/* ---------------- EXPERIENCE ----------------
   Portado verbatim. Timeline de 3 roles + bloque de educación PUCV.
   (Sin "con distinción / with honors" — eliminado intencionalmente.) */

import { useLang } from "../i18n/LangContext";
import { SEC } from "../i18n/strings";

export default function Experience() {
  const { lang } = useLang();
  const t = SEC[lang];
  return (
    <section className="sec">
      <div className="container">
        <div className="eyebrow">{t.expE}</div><h2 className="h2">{t.expT}</h2>
        <div className="tl">{t.exp.map(([d, r, o, n], i) => <div className={`tli${i === 0 ? " now" : ""}`} key={r}><div className="tld">{d}</div><div className="tlr">{r} <span className="org">· {o}</span></div><div className="tln">{n}</div></div>)}</div>
        <div className="edu"><div className="eh">// {t.eduH}</div>{t.edu.map(([d, y]) => <div className="er" key={d}><b>{d}</b> <span className="ar">→</span> {y}</div>)}</div>
      </div>
    </section>
  );
}
