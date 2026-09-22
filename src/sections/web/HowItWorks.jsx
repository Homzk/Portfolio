/* ---------------- web/HowItWorks ----------------
   4 pasos numerados, simples. */

import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";

export default function HowItWorks() {
  const { lang } = useLang();
  const t = WEB[lang].how;

  return (
    <section className="sec web-how">
      <div className="container">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="h2">{t.title}</h2>

        <ol className="how-list">
          {t.steps.map(([n, title, body]) => (
            <li className="how-step" key={n}>
              <span className="how-n">{n}</span>
              <div>
                <span className="how-t">{title}</span>
                <p className="how-b">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
