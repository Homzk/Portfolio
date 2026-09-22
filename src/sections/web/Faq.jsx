/* ---------------- web/Faq ----------------
   <details>/<summary> nativos — cero JS nuevo, accesible por teclado
   sin trabajo extra. */

import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";

export default function Faq() {
  const { lang } = useLang();
  const t = WEB[lang].faq;

  return (
    <section className="sec web-faq">
      <div className="container">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="h2">{t.title}</h2>

        <div className="faq-list">
          {t.items.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
