"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Compass, Cpu, Layers, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  {
    num: "01",
    title: "Creative Frontend Architecture",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind"],
    description:
      "Transforming bespoke design systems into high-performance, accessible, and responsive interfaces with clean, scalable component architecture.",
    icon: Layers,
  },
  {
    num: "02",
    title: "Kinetic Motion & GSAP Choreography",
    tags: ["GSAP Core", "ScrollTrigger", "Lenis", "Physics"],
    description:
      "Choreographing silky smooth scroll-driven timelines, inertia transitions, and micro-interactions that give static pixels physical weight and responsiveness.",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Shader Computation & WebGL",
    tags: ["Three.js", "GLSL Shaders", "Fluid Ripples", "Canvas"],
    description:
      "Engineering custom mathematical fragment shaders, water refraction dynamics, and pixelated spatial canvas effects running at steady 60fps.",
    icon: Cpu,
  },
  {
    num: "04",
    title: "Full-Stack & Mobile Ecosystems",
    tags: ["React Native", "Node.js", "REST APIs", "MongoDB"],
    description:
      "Developing end-to-end digital solutions ranging from production React Native mobile apps to robust server-side APIs and distributed database workflows.",
    icon: Terminal,
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // 0. Conduit bridge line & tag
      tl.fromTo(
        ".about-conduit-line",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, ease: "power2.out" }
      )
        .fromTo(
          ".about-conduit",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        // 1. Line expansion
        .fromTo(
          ".about-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.85, ease: "power2.inOut", stagger: 0.1 },
          "-=0.3"
        )
        // 2. Section tag & eyebrow
        .fromTo(
          ".about-tag",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.5"
        )
        // 3. Main editorial headline
        .fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        // 4. Narrative body text
        .fromTo(
          ".about-narrative",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          "-=0.5"
        )
        // 5. Discipline cards
        .fromTo(
          ".about-craft-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none pt-12 pb-24 sm:pt-20 sm:pb-32 md:pt-28 md:pb-40"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Typography & Grain Injections ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .about-paper-grain {
          background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 0);
          background-size: 4px 4px;
        }

        .gold-ink-highlight {
          position: relative;
          display: inline-block;
          color: #1c1b18;
        }

        .gold-ink-highlight::before {
          content: "";
          position: absolute;
          left: -4px;
          right: -4px;
          bottom: 4px;
          height: 32%;
          background: rgba(245, 190, 11, 0.45);
          transform: rotate(-1.2deg);
          z-index: -1;
          border-radius: 2px;
          pointer-events: none;
        }
      `}</style>

      {/* ── Texture Overlay ── */}
      <div className="absolute inset-0 w-full h-full about-paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── Seamless Atmospheric Fold Glow (Connecting Hero & About) ── */}
      <div
        className="absolute -top-40 left-1/3 w-[640px] h-[360px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245, 190, 11, 0.45) 0%, rgba(230, 226, 215, 0.1) 50%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Subtle Atmospheric Yellow Brush Accent in Background ── */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none -mr-48 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ── CREATIVE TRANSITION CONDUIT (HERO → ABOUT CONTINUITY) ── */}
        <div className="about-conduit flex items-center gap-3 mb-6 sm:mb-10">
          <div className="about-conduit-line w-[1.5px] h-7 sm:h-10 bg-gradient-to-b from-[#1c1b18]/60 via-[#f5be0b] to-[#1c1b18]/15" />
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.22em] uppercase text-[#615c50]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5be0b]" />
            <span>DISPATCH // 01 · SYSTEM IDENTITY</span>
          </div>
        </div>

        {/* ── SECTION HEADER & EYEBROW ── */}
        <div className="flex flex-col gap-3 mb-12 sm:mb-16 md:mb-20">
          <div className="about-tag flex items-center gap-3">
            <span className="about-rule w-8 sm:w-12 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#47443c]">
              01 // WHO I AM — THE PHILOSOPHY
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1b18] leading-[1.12] max-w-4xl"
          >
            I build digital spaces that don’t just function—they{" "}
            <span className="gold-ink-highlight">resonate.</span>
          </h2>
        </div>

        {/* ── TWO-COLUMN EDITORIAL SPREAD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 sm:mb-28">
          
          {/* ── LEFT COLUMN (NARRATIVE, ROOTS & IDENTITY) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            <div className="about-narrative flex flex-col gap-4 text-sm sm:text-[15px] md:text-base leading-relaxed text-[#3a372f]">
              <p>
                Based in <span className="font-semibold text-[#1c1b18]">Siliguri, India</span>, I am a creative front-end developer and associate engineer obsessed with the convergence of <span className="font-semibold text-[#1c1b18]">artistic motion</span>, <span className="font-semibold text-[#1c1b18]">WebGL graphics</span>, and <span className="font-semibold text-[#1c1b18]">robust software systems</span>.
              </p>
              <p>
                Too much of the modern web feels generic—flat cards, template gradients, and soulless layouts. My approach is rooted in craftsmanship: treating digital interfaces like tactile editorial artifacts where every interaction, transition, and micro-moment feels intentional, fluid, and alive.
              </p>
              <p>
                Whether engineering high-reliability React Native applications in the medical domain, choreographing GSAP scroll timelines, or writing GLSL pixel shaders, I prioritize 60fps performance and emotional connection above all else.
              </p>
            </div>

            {/* ── Editorial Location & Availability Plaque ── */}
            <div className="about-narrative p-5 sm:p-6 rounded-2xl bg-[#ded9cc]/60 border border-[#1c1b18]/15 backdrop-blur-sm shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a554a]">
                  CURRENT LOCATION
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1c1b18]">
                  <Compass className="w-3.5 h-3.5 text-[#f5be0b]" />
                  Siliguri, WB, India
                </span>
              </div>

              <div className="w-full h-px bg-[#1c1b18]/10" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5a554a]">
                  AVAILABILITY
                </span>
                <span className="flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  Open for Opportunities
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (INTERACTIVE CRAFT INDEX / PILLARS) ── */}
          <div ref={cardsRef} className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#1c1b18]/15">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5a554a]">
                CORE DISCIPLINES & EXPERTISE
              </span>
              <span className="text-[11px] font-medium text-[#1c1b18]/50">
                04 Specializations
              </span>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              {DISCIPLINES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.num}
                    className="about-craft-card group p-5 sm:p-6 rounded-2xl bg-[#f0ece1]/80 hover:bg-[#fffdf7] border border-[#1c1b18]/10 hover:border-[#f5be0b] transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#f5be0b] tracking-wider">
                          {item.num}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#1c1b18] group-hover:text-black transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <div className="p-2 rounded-xl bg-[#e6e2d7] group-hover:bg-[#f5be0b] text-[#1c1b18] transition-colors shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#47443c] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide bg-[#e6e2d7] text-[#2e2c26] border border-[#1c1b18]/10 group-hover:border-[#1c1b18]/20 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}