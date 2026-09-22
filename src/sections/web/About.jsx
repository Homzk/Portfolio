/* ---------------- web/About ----------------
   "Quién soy" solo texto (decisión del usuario: sin foto por ahora,
   para no dejar un espacio de imagen rota). `bio` es un resumen corto
   del "Sobre mí" del portfolio principal (SEC.aboutP en strings.js),
   no una copia — recortado a lo relevante para un cliente pyme. Enlaza
   de vuelta al portfolio principal. */

import { Link } from "react-router";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";

export default function About() {
  const { lang } = useLang();
  const t = WEB[lang].about;

  return (
    <section className="sec web-about">
      <div className="container">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="h2">Álvaro Flores</h2>
        <p className="web-about-role">{t.role}</p>
        <p className="web-about-bio">{t.bio}</p>
        <p className="web-about-body">{t.body}</p>
        <Link className="lk" to="/">{t.linkBack}</Link>
      </div>
    </section>
  );
}
