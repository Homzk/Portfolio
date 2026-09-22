/* ---------------- WEB (/web) ----------------
   Landing de venta de páginas web para pymes. Mismos tokens del
   portfolio (Dirección B acordada con el usuario); .web-root en
   web.css NUNCA debe recibir transform/filter/will-change — WhatsAppFloat
   depende de que position:fixed resuelva contra el viewport. */

import Hero from "../sections/web/Hero";
import Sites from "../sections/web/Sites";
import Pricing from "../sections/web/Pricing";
import HowItWorks from "../sections/web/HowItWorks";
import About from "../sections/web/About";
import Faq from "../sections/web/Faq";
import Close from "../sections/web/Close";
import Footer from "../sections/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useExternalFont } from "../hooks/useExternalFont";
import { useLang } from "../i18n/LangContext";
import { WEB } from "../i18n/strings";
import "../styles/web.css";

export default function WebPage() {
  const { lang } = useLang();
  useDocumentMeta({ ...WEB[lang].meta, path: "/web" });
  useExternalFont("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap");

  return (
    <div className="web-root">
      <div className="web-grain" />
      <Hero />
      <Sites />
      <Pricing />
      <HowItWorks />
      <About />
      <Faq />
      <Close />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
