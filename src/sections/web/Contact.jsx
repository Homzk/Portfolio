/* ---------------- web/Contact (08) ----------------
   Formulario (Formspree, FORM_ENDPOINT en src/data/site.js) + FAQ con
   pestañas y acordeón. Mientras FORM_ENDPOINT esté vacío, el formulario
   abre WhatsApp con los datos ya escritos en vez de enviar. */

import { useEffect, useRef, useState } from "react";
import { Send, Plus, MessageCircle, Mail } from "lucide-react";
import { animate, stagger } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { EMAIL, FORM_ENDPOINT, waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { revealUp } from "./motion";
import SectionHead from "./SectionHead";
import SideStars from "./SideStars";

function ContactForm({ t, lang }) {
  const f = t.form;
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!FORM_ENDPOINT) {
      const lines = [f.waIntro, ...[...data.entries()].filter(([k, v]) => v && !k.startsWith("_")).map(([k, v]) => `${f[k]}: ${v}`)];
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="w-form w-card" onSubmit={onSubmit}>
      <div className="w-form-row">
        <label><span>{f.name}</span><input name="name" required autoComplete="name" /></label>
        <label><span>{f.contact}</span><input name="contact" required autoComplete="email" /></label>
      </div>
      <div className="w-form-row">
        <label><span>{f.business}</span><input name="business" /></label>
        <label><span>{f.plan}</span>
          <select name="plan" defaultValue={f.planOptions[0]}>
            {f.planOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <label><span>{f.message}</span><textarea name="message" rows={4} /></label>
      <input type="hidden" name="_language" value={lang} />
      <button className="w-btn w-btn-acc w-form-submit" type="submit" disabled={status === "sending"}>
        <Send size={16} />{status === "sending" ? f.sending : f.submit}
      </button>
      {status === "ok" && <p className="w-form-msg ok" role="status">{f.ok}</p>}
      {status === "error" && <p className="w-form-msg err" role="alert">{f.error}</p>}
    </form>
  );
}

function Faq({ t }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const items = t.faq[tab][1];
  const accRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = animate(accRef.current.children, { opacity: [0, 1], x: [24, 0], duration: 550, ease: "out(3)", delay: stagger(70) });
    return () => anim.revert();
  }, [tab]);

  return (
    <div className="w-faq">
      <h3 className="w-mini-h">{t.faqTitle}</h3>
      <div className="w-tabs" role="tablist">
        {t.faq.map(([label], i) => (
          <button key={label} role="tab" aria-selected={i === tab} className={i === tab ? "on" : ""}
            onClick={() => { setTab(i); setOpen(0); }}>
            {i + 1}. {label}
          </button>
        ))}
      </div>
      <div className="w-acc" role="tabpanel" ref={accRef}>
        {items.map(([q, a], i) => {
          const isOpen = i === open;
          return (
            <div className={`w-acc-item${isOpen ? " open" : ""}`} key={q}>
              <button className="w-acc-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="w-acc-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="w-acc-t">{q}</span>
                <Plus className="w-acc-ic" size={18} />
              </button>
              <div className="w-acc-a"><div><p>{a}</p></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Contact() {
  const { lang } = useLang();
  const t = WEB[lang].contact;

  const root = useAnimeScope((self, el) => {
    const wrap = el.querySelector(".w-contact");
    revealUp(wrap.children[0], wrap, { fromY: 0, x: [-60, 0], duration: 1100 });
    revealUp(wrap.children[1], wrap, { fromY: 0, x: [60, 0], duration: 1100, delay: 150 });
    revealUp(el.querySelectorAll(".w-acc-item"), wrap, { fromY: 20, delay: stagger(80, { start: 400 }) });
  });

  return (
    <section className="w-sec" id="contacto" ref={root}>
      <SideStars seed={59} />
      <div className="container">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <div className="w-contact">
          <div>
            <ContactForm t={t} lang={lang} />
            <div className="w-contact-alt">
              <a href={waLink(WEB[lang].waMessage)} target="_blank" rel="noreferrer"><MessageCircle size={16} />WhatsApp</a>
              <a href={`mailto:${EMAIL}`}><Mail size={16} />{EMAIL}</a>
            </div>
          </div>
          <Faq t={t} />
        </div>
      </div>
    </section>
  );
}
