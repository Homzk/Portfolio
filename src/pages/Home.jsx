/* ---------------- HOME ----------------
   Orden de la página (ajustado por el autor respecto a la referencia):
   Hero → Proyectos → (Experiencia → Stack → Sobre mí → Contacto) → Footer.
   El bloque sx-root agrupa las cuatro secciones bajo un único grano,
   igual que assets/App.reference.jsx. */

import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import About from "../sections/About";
import Stack from "../sections/Stack";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLang } from "../i18n/LangContext";

const HOME_META = {
  es: {
    title: "Álvaro Flores Rocha — Desarrollador Full Stack",
    description:
      "Portafolio de Álvaro Flores Rocha, Desarrollador Full Stack (React, TypeScript, Python). Dashboards en tiempo real, visión por computador con IA y sitios en producción.",
  },
  en: {
    title: "Álvaro Flores Rocha — Full Stack Developer",
    description:
      "Portfolio of Álvaro Flores Rocha, Full Stack Developer (React, TypeScript, Python). Real-time dashboards, AI computer vision and sites shipped to production.",
  },
};

export default function Home() {
  const { lang } = useLang();
  useDocumentMeta({ ...HOME_META[lang], path: "/" });

  return (
    <>
      <Hero />
      <Projects />
      <div className="sx-root">
        <div className="sx-grain" />
        <Experience />
        <Stack />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
