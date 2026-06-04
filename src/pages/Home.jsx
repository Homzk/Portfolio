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

export default function Home() {
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
