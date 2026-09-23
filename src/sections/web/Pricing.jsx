/* ---------------- web/Pricing (06) ----------------
   3 planes + inclusiones (grilla con ícono) + mantención + referido +
   condiciones. Montos en CLP, formateados en el render.
   anime.js: tarjetas en cascada, los precios cuentan hasta su valor
   (el JSX ya trae el monto final para movimiento reducido) e
   inclusiones entrando desde el centro de la grilla. */

import { Smartphone, MessageCircle, Search, ShieldCheck, RefreshCw, KeyRound, Check } from "lucide-react";
import { animate, stagger } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { PRICING_TIERS } from "../../data/webOffer";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import { onReveal, revealUp } from "./motion";
import SectionHead from "./SectionHead";

const fmtCLP = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

/* Ícono por posición de WEB.pricing.inclusions (6 textos ES/EN espejados).
   El 3º (Google Business + SEO) va destacado. */
const INCLUSION_ICONS = [Smartphone, MessageCircle, Search, ShieldCheck, RefreshCw, KeyRound];
const INCLUSION_FEATURED = 2;

export default function Pricing() {
  const { lang } = useLang();
  const t = WEB[lang].pricing;

  const root = useAnimeScope((self, el) => {
    const grid = el.querySelector(".w-price-grid");
    revealUp(el.querySelectorAll(".w-price"), grid, { fromY: 80, duration: 1100, delay: stagger(140) });

    el.querySelectorAll(".w-price-amount").forEach((amountEl, i) => {
      const counter = { v: 0 };
      amountEl.textContent = fmtCLP(0);
      animate(counter, {
        v: PRICING_TIERS[i].priceCLP, modifier: (v) => Math.round(v / 1000) * 1000, duration: 1600, ease: "out(4)", delay: 300 + i * 140,
        onUpdate: () => { amountEl.textContent = fmtCLP(counter.v); },
        autoplay: onReveal(grid),
      });
    });

    const incl = el.querySelector(".w-incl-grid");
    revealUp(incl.children, incl, { fromY: 30, scale: [0.9, 1], delay: stagger(80, { from: "center" }) });
    revealUp(el.querySelectorAll(".w-note, .w-conditions li"), el.querySelector(".w-notes"), { fromY: 20, duration: 700, delay: stagger(50) });
  });

  return (
    <section className="w-sec" id="planes" ref={root}>
      <div className="container">
        <SectionHead num={t.num} eyebrow={t.eyebrow} title={t.title} />

        <div className="w-price-grid">
          {PRICING_TIERS.map((tier) => (
            <article className={`w-price${tier.recommended ? " reco" : ""}`} key={tier.id}>
              {tier.recommended && <span className="w-price-badge">{t.recommended}</span>}
              <h3 className="w-price-name">{tier.name[lang]}</h3>
              <div className="w-price-amount">{fmtCLP(tier.priceCLP)}</div>
              <div className="w-price-days">{tier.days} {t.daysLabel}</div>
              <p className="w-price-desc">{tier.desc[lang]}</p>
              <a className={`w-btn ${tier.recommended ? "w-btn-acc" : "w-btn-line"} w-price-cta`}
                href={waLink(`${WEB[lang].waMessage} (${tier.name[lang]})`)} target="_blank" rel="noreferrer">
                {t.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="w-incl">
          <h3 className="w-mini-h">{t.inclusionsTitle}</h3>
          <ul className="w-incl-grid">
            {t.inclusions.map((item, i) => {
              const Icon = INCLUSION_ICONS[i];
              return (
                <li className={`w-incl-card${i === INCLUSION_FEATURED ? " feat" : ""}`} key={item}>
                  <span className="w-icon sm"><Icon size={17} /></span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-notes">
          <div className="w-note"><span className="w-note-t">{t.addon.title}</span><span>{t.addon.body}</span></div>
          <div className="w-note"><span className="w-note-t">{t.referral.title}</span><span>{t.referral.body}</span></div>
        </div>

        <div className="w-conditions">
          <h3 className="w-mini-h">{t.conditionsTitle}</h3>
          <ul>{t.conditions.map((c) => <li key={c}><Check size={14} />{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
