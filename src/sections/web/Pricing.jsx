/* ---------------- web/Pricing (05) ----------------
   3 planes + tabla comparativa (sin franja de inclusiones compartidas —
   ver nota en webOffer.js) + aviso de precios referenciales + condiciones.
   Montos en CLP, formateados en el render.
   anime.js: tarjetas en cascada y precios que cuentan hasta su valor (el
   JSX ya trae el monto final para movimiento reducido). En la tabla, la
   luna de cada plan pasa de nueva a su fase (creciente → casi llena →
   llena, a más plan más luna) y cada fila entra al hacer scroll con sus
   checks apareciendo con rebote. */

import { Check, CheckCircle2, Minus } from "lucide-react";
import { animate, stagger, spring, utils } from "animejs";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { PRICING_TIERS, COMPARISON } from "../../data/webOffer";
import { waLink } from "../../data/site";
import { useAnimeScope } from "../../hooks/useAnimeScope";
import Moon from "../../components/Moon";
import { onReveal, revealUp } from "./motion";
import SectionHead from "./SectionHead";

const fmtCLP = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

/* Fase de la luna de cada plan (cx de la sombra en Moon: 50 = nueva; al
   correrla a la izquierda se ilumina más: creciente → gibosa → llena). */
const PLAN_MOON = [22, -14, -60];

function Cell({ v, lang, t }) {
  if (v === true) return <><CheckCircle2 className="yes" size={20} aria-hidden="true" /><span className="w-sr">{t.included}</span></>;
  if (v === false) return <><Minus className="no" size={18} aria-hidden="true" /><span className="w-sr">{t.notIncluded}</span></>;
  return v[lang];
}

function Row({ row, alt, lang, t }) {
  return (
    <div className={`w-cmp-row${alt ? " alt" : ""}`} role="row">
      <span className="w-cmp-label" role="rowheader">{row.label[lang]}</span>
      {row.values.map((v, i) => (
        <span className="w-cmp-cell" role="cell" key={i}><Cell v={v} lang={lang} t={t} /></span>
      ))}
    </div>
  );
}

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

    const head = el.querySelector(".w-cmp-head");
    revealUp(head.querySelectorAll(".w-cmp-plan"), head, { fromY: 40, duration: 1000, delay: stagger(130) });
    head.querySelectorAll(".w-cmp-moon .moon-shadow").forEach((shadow, i) => {
      utils.set(shadow, { cx: 50 });
      animate(shadow, { cx: PLAN_MOON[i], duration: 1800, ease: "inOut(3)", delay: 400 + i * 180, autoplay: onReveal(head) });
    });

    el.querySelectorAll(".w-cmp-row").forEach((row) => {
      revealUp(row, row, { fromY: 18, duration: 700 });
      const yes = row.querySelectorAll(".yes");
      if (!yes.length) return;
      utils.set(yes, { scale: 0 });
      animate(yes, { scale: 1, ease: spring({ bounce: 0.6 }), delay: stagger(90, { start: 200 }), autoplay: onReveal(row) });
    });

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

        <div className="w-cmp">
          <h3 className="w-cmp-title">{t.compareTitle}</h3>
          <div className="w-cmp-table" role="table" aria-label={t.compareTitle}>
            <div className="w-cmp-head" role="row">
              <span className="w-cmp-corner" role="columnheader" />
              {PRICING_TIERS.map((tier, i) => (
                <div className={`w-cmp-plan${tier.recommended ? " reco" : ""}`} role="columnheader" key={tier.id}>
                  <div className="w-cmp-art"><Moon shadowX={PLAN_MOON[i]} className="w-cmp-moon" /></div>
                  <span className="w-cmp-name">{tier.name[lang]}</span>
                  <span className="w-cmp-price">{fmtCLP(tier.priceCLP)}</span>
                </div>
              ))}
            </div>
            {COMPARISON.map((row, r) => <Row row={row} alt={r % 2 === 0} lang={lang} t={t} key={row.id} />)}
          </div>
        </div>

        <div className="w-notes w-notes-single">
          <div className="w-note"><span className="w-note-t">{t.disclaimer.title}</span><span>{t.disclaimer.body}</span></div>
        </div>

        <div className="w-conditions">
          <h3 className="w-mini-h">{t.conditionsTitle}</h3>
          <ul>{t.conditions.map((c) => <li key={c}><Check size={14} />{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
