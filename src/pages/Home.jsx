/* ---------------- HOME ----------------
   Compone la página principal en el orden fijo de la referencia:
   Hero → Proyectos → (Sobre mí → Stack → Experiencia → Contacto) → Footer.
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
        <About />
        <Stack />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
