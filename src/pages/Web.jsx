/* ---------------- WEB (/web) ----------------
   Landing de venta de páginas web para pymes. Tema oscuro propio con un
   único acento naranja (src/styles/web.css, tokens bajo .web-root); no
   comparte el color del portafolio personal, solo sus fuentes.
   .web-root NUNCA debe recibir transform/filter/will-change —
   WhatsAppFloat depende de que position:fixed resuelva contra el
   viewport, igual que el header flotante — ni overflow:hidden, que
   rompería el panel sticky de Servicios (se usa overflow-x:clip). */

import Intro from "../sections/web/Intro";
import Header from "../sections/web/Header";
import Hero from "../sections/web/Hero";
import Pillars from "../sections/web/Pillars";
import Services from "../sections/web/Services";
import Sites from "../sections/web/Sites";
import Showcase from "../sections/web/Showcase";
import Pricing from "../sections/web/Pricing";
import HowItWorks from "../sections/web/HowItWorks";
import Contact from "../sections/web/Contact";
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
  useExternalFont("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@800&display=swap");

  return (
    <div className="web-root">
      <Intro />
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Services />
        <Sites />
        <Showcase />
        <Pricing />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
