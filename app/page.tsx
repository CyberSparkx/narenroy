import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Preloader />
      <div id="home" className="w-full">
        <Hero />
      </div>
      <div id="about" className="w-full">
        <About />
      </div>
      <div id="skills" className="w-full">
        <Skills />
      </div>
      <div id="experience" className="w-full">
        <Experience />
      </div>
      <div id="projects" className="w-full">
        <Projects />
      </div>
      <div id="contact" className="w-full">
        <Contact />
      </div>

      <footer className="w-full py-8 text-center text-xs font-mono tracking-widest uppercase text-[#736d60] bg-[#E6E2D7] border-t border-[#1c1b18]/15">
        <p>© {new Date().getFullYear()} Naren Roy · Crafted with precision & motion.</p>
      </footer>
    </main>
  );
}
