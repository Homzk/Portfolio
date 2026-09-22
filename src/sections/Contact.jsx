/* ---------------- CONTACT ----------------
   Portado verbatim. Cierre centrado con orbe grande, filas de contacto
   (Email/LinkedIn/GitHub/WhatsApp) y dos botones. */

import { Mail, FileText } from "lucide-react";
import { Link } from "react-router";
import { useLang } from "../i18n/LangContext";
import { SEC } from "../i18n/strings";
import { CV_URL, CV_FILENAME, EMAIL, WHATSAPP_URL, WHATSAPP_DISPLAY } from "../data/site";

export default function Contact() {
  const { lang } = useLang();
  const t = SEC[lang];
  return (
    <section className="sec contact" id="contact">
      <div className="sx-orb orb-c" />
      <div className="container">
        <div className="eyebrow" style={{ justifyContent: "center" }}>{t.contactE}</div>
        <h2 className="h2">{t.contactT}</h2><p className="sub">{t.contactSub}</p>
        <div className="clist">
          <a className="crow" href={`mailto:${EMAIL}`}><span><span className="lbl">Email</span> &nbsp;<span className="ar">→</span></span><span>{EMAIL}</span></a>
          <a className="crow" href="https://linkedin.com/in/alvaro-flores-rocha" target="_blank" rel="noreferrer"><span><span className="lbl">LinkedIn</span> &nbsp;<span className="ar">→</span></span><span>alvaro-flores-rocha</span></a>
          <a className="crow" href="https://github.com/Homzk" target="_blank" rel="noreferrer"><span><span className="lbl">GitHub</span> &nbsp;<span className="ar">→</span></span><span>Homzk</span></a>
          <a className="crow" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><span><span className="lbl">WhatsApp</span> &nbsp;<span className="ar">→</span></span><span>{WHATSAPP_DISPLAY}</span></a>
        </div>
        <div className="btns">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}><Mail size={16} />{t.write}</a>
          <a className="btn btn-ghost" href={CV_URL} download={CV_FILENAME} target="_blank" rel="noreferrer"><FileText size={16} />{t.cv}</a>
        </div>
        <Link className="biz-link" to="/web">{t.bizQ} <span className="ar">→</span> {t.bizA}</Link>
      </div>
    </section>
  );
}
