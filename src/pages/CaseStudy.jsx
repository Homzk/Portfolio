/* ---------------- CaseStudy (stub) ----------------
   Placeholder de ruta para /proyecto/:slug. La plantilla completa
   (Contexto → Problema → Rol → Solución → Decisiones técnicas →
   Resultados → Stack → Aprendizajes) se construye en US3 (tasks
   T029–T031) desde assets/CaseStudy.reference.jsx. */

import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function CaseStudy() {
  const { slug } = useParams();
  const { lang } = useLang();
  const t =
    lang === "es"
      ? { back: "Volver al inicio", soon: "Caso de estudio en construcción", note: "Proyecto" }
      : { back: "Back to home", soon: "Case study in progress", note: "Project" };

  return (
    <section className="sec" style={{ minHeight: "70vh", paddingTop: 60 }}>
      <div className="container">
        <Link className="lk" to="/" style={{ marginBottom: 24 }}>
          <ArrowLeft size={16} /> {t.back}
        </Link>
        <div className="eyebrow" style={{ marginTop: 24 }}>
          {t.note} → {slug}
        </div>
        <h2 className="h2">{t.soon}</h2>
      </div>
    </section>
  );
}
