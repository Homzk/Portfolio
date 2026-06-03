/* ---------------- STACK ----------------
   Portado verbatim. Seis grupos de stack en tarjetas. */

import { useLang } from "../i18n/LangContext";
import { SEC } from "../i18n/strings";

export default function Stack() {
  const { lang } = useLang();
  const t = SEC[lang];
  return (
    <section className="sec" id="stack">
      <div className="sx-orb orb-b" />
      <div className="container">
        <div className="eyebrow">{t.stackE}</div><h2 className="h2">{t.stackT}</h2>
        <div className="stack">{t.stack.map(([h, items]) => <div className="sg" key={h}><h3><span className="ar">→</span> {h}</h3><div className="items">{items.map((it) => <span key={it}>{it}</span>)}</div></div>)}</div>
      </div>
    </section>
  );
}
