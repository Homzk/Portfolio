/* ---------------- web/Close ----------------
   Banda de cierre: WhatsApp/email + hilo de vuelta al portfolio (guiño
   al orbe del sitio principal + la cursiva de la cinta del hero). Es un
   componente propio y no una reutilización de Contact.jsx, que está
   orientado a reclutadores (CV, LinkedIn, GitHub) — audiencia distinta
   a la de esta página de venta. */

import { MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { EMAIL, waLink, WHATSAPP_DISPLAY } from "../../data/site";

export default function Close() {
  const { lang } = useLang();
  const t = WEB[lang].close;

  return (
    <section className="web-close">
      <div className="web-close-orb" />
      <div className="container web-close-in">
        <div>
          <h2 className="h2">{t.title}</h2>
          <p className="web-close-sub">{t.sub}</p>
          <div className="btns" style={{ justifyContent: "flex-start" }}>
            <a className="btn btn-primary" href={waLink(WEB[lang].waMessage)} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />{t.ctaWhatsapp}
            </a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}><Mail size={16} />{t.ctaEmail}</a>
          </div>
          <span className="web-close-wa">{WHATSAPP_DISPLAY}</span>
        </div>
        <div className="web-close-back">
          <Link to="/">{WEB[lang].about.linkBack}</Link>
          <span className="web-close-quote">{t.quote}</span>
        </div>
      </div>
    </section>
  );
}
