/* ---------------- web/Pricing ----------------
   3 planes + inclusiones compartidas + callout de referido +
   condiciones. Los montos son CLP; se formatean en el render (no en
   los datos) para que ambos idiomas compartan el mismo número. */

import { Check } from "lucide-react";
import { useLang } from "../../i18n/LangContext";
import { WEB } from "../../i18n/strings";
import { PRICING_TIERS } from "../../data/webOffer";

const fmtCLP = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

export default function Pricing() {
  const { lang } = useLang();
  const t = WEB[lang].pricing;

  return (
    <section className="sec web-pricing">
      <div className="container">
        <div className="eyebrow">{t.eyebrow}</div>
        <h2 className="h2">{t.title}</h2>

        <div className="price-grid">
          {PRICING_TIERS.map((tier) => (
            <div className={`price-card${tier.recommended ? " reco" : ""}`} key={tier.id}>
              {tier.recommended && <span className="price-badge">{t.recommended}</span>}
              <h3 className="price-name">{tier.name[lang]}</h3>
              <div className="price-amount">{fmtCLP(tier.priceCLP)}</div>
              <div className="price-days">{tier.days} {t.daysLabel}</div>
              <p className="price-desc">{tier.desc[lang]}</p>
            </div>
          ))}
        </div>

        <div className="price-inclusions">
          <h3 className="price-inclusions-h">{t.inclusionsTitle}</h3>
          <ul className="inclusion-list">
            {t.inclusions.map((i) => <li key={i}><Check size={14} className="ar" />{i}</li>)}
          </ul>
        </div>

        <div className="price-referral">
          <span className="price-referral-t">{t.referral.title}</span>
          <span className="price-referral-b">{t.referral.body}</span>
        </div>

        <div className="price-conditions">
          <h3 className="price-conditions-h">{t.conditionsTitle}</h3>
          <ul>
            {t.conditions.map((c) => <li key={c}>— {c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
