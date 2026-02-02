import Navbar from "./components/Navbar";
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
      <Navbar />
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

      <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-zinc-800">
        <p>© {new Date().getFullYear()} Naren Roy. All rights reserved.</p>
      </footer>
    </main>
  );
}
