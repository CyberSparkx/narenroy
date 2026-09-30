"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Sparkles,
  Server,
  Database,
  Wrench,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import { portfolioData } from "../data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    key: "languages",
    label: "Core Languages",
    num: "01",
    subtext: "Foundational syntaxes for performance, algorithms, and type-safe systems.",
    icon: Code2,
    customSkills: ["JavaScript (ES6+)", "TypeScript", "Python", "C", "HTML5", "CSS3 / Sass"],
  },
  {
    key: "frontend",
    label: "Frontend & Motion",
    num: "02",
    subtext: "Kinetic UI, WebGL shaders, component architectures & reactive applications.",
    icon: Sparkles,
    customSkills: [
      "React.js",
      "Next.js 15",
      "React Native",
      "GSAP Core & ScrollTrigger",
      "Three.js & GLSL Shaders",
      "Tailwind CSS",
      "Framer Motion",
      "Lenis Smooth Scroll",
    ],
  },
  {
    key: "backend",
    label: "Backend & Systems",
    num: "03",
    subtext: "Distributed APIs, microservices, websockets & real-time communication engines.",
    icon: Server,
    customSkills: ["Node.js", "Express.js", "RESTful APIs", "WebSockets", "Socket.IO", "JWT & OAuth"],
  },
  {
    key: "databases",
    label: "Databases & Storage",
    num: "04",
    subtext: "Document models, relational schemas, caching, and persistence workflows.",
    icon: Database,
    customSkills: ["MongoDB", "Mongoose ORM", "MySQL", "Firebase", "Database Schema Design"],
  },
  {
    key: "tools",
    label: "Workflow & Engineering",
    num: "05",
    subtext: "Containerization, versioning, debugging, API testing & interface prototyping.",
    icon: Wrench,
    customSkills: ["Git & GitHub", "Docker", "Postman", "MongoDB Compass", "Figma", "VS Code"],
  },
  {
    key: "cloudDevOps",
    label: "Cloud & Deployment",
    num: "06",
    subtext: "Continuous delivery pipelines, edge hosting, cloud servers & production monitoring.",
    icon: Cloud,
    customSkills: ["Vercel", "Netlify", "Railway", "CI/CD Pipelines", "Edge Functions"],
  },
] as const;

type SkillKey = typeof CATEGORIES[number]["key"];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

      // 1. Line expansion
      tl.fromTo(
        ".sk-rule",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
      )
        // 2. Section tag
        .fromTo(
          ".sk-tag",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.5"
        )
        // 3. Headline & paragraph
        .fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.3"
        )
        .fromTo(
          ".sk-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        // 4. Cards stagger
        .fromTo(
          ".sk-card",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out" },
          "-=0.3"
        )
        // 5. Bottom ledger ribbon
        .fromTo(
          ".sk-footer-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          ".sk-footer-content",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const totalSkillsCount = CATEGORIES.reduce((acc, cat) => acc + cat.customSkills.length, 0);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-40"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Custom Styling & Grain ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .skills-paper-grain {
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
      <div className="absolute inset-0 w-full h-full skills-paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── Atmospheric Ambient Golden Glow (Painterly Depth) ── */}
      <div
        className="absolute top-1/3 left-10 w-[550px] h-[550px] opacity-15 pointer-events-none -ml-36 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[450px] h-[450px] opacity-15 pointer-events-none -mr-32 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ── SECTION HEADER & EYEBROW ── */}
        <div className="flex flex-col gap-3 mb-12 sm:mb-16 md:mb-20">
          <div className="sk-tag flex items-center gap-3">
            <span className="sk-rule w-8 sm:w-12 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#47443c]">
              02 // WHAT I USE — TECHNICAL ARSENAL
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1b18] leading-[1.12] max-w-3xl"
            >
              Tools of precision, motion &{" "}
              <span className="gold-ink-highlight">architecture.</span>
            </h2>

            <p className="sk-desc text-sm sm:text-[15px] text-[#47443c] max-w-md leading-relaxed font-normal">
              A curated inventory of programming languages, kinetic frameworks, graphics engines, and production infrastructure I deploy to engineer responsive, high-performance software.
            </p>
          </div>
        </div>

        {/* ── WORKSHOP CARDS GRID (ARCHITECTURAL LEDGER) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 sm:mb-20">
          {CATEGORIES.map(({ key, label, num, subtext, icon: Icon, customSkills }) => {
            return (
              <div
                key={key}
                className="sk-card group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#FAF8F3] border border-[#1c1b18]/10 hover:border-[#f5be0b]/80 hover:shadow-[0_12px_32px_rgba(28,27,24,0.06)] hover:-translate-y-1"
              >
                <div>
                  {/* Card Header: Number & Architectural Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#8a8475] uppercase">
                      {num} //
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#E6E2D7] text-[#1c1b18] group-hover:bg-[#f5be0b] group-hover:text-black transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-lg sm:text-xl font-black text-[#1c1b18] tracking-tight mb-2">
                    {label}
                  </h3>

                  {/* Category Subtext */}
                  <p className="text-xs text-[#5c574c] leading-relaxed mb-5 font-normal">
                    {subtext}
                  </p>

                  {/* Hairline Divider */}
                  <div className="w-full h-px bg-[#1c1b18]/8 mb-5" />

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {customSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide bg-[#EAE6DC] text-[#2c2923] border border-[#1c1b18]/8 group-hover:border-[#1c1b18]/15 hover:!bg-[#f5be0b]/20 hover:!text-[#1c1b18] hover:!border-[#f5be0b]/60 transition-all cursor-default select-text"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Ledger Stamp */}
                <div className="mt-6 pt-3.5 border-t border-[#1c1b18]/6 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#8a8475]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#1c1b18]/40 group-hover:text-[#f5be0b] transition-colors" />
                    <span>PRODUCTION VERIFIED</span>
                  </span>
                  <span>{customSkills.length} SKILLS</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM LEDGER FOOTER RIBBON ── */}
        <div className="w-full">
          <div className="sk-footer-rule w-full h-px bg-[#1c1b18]/15 mb-6" />
          <div className="sk-footer-content flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono tracking-wider text-[#6b6557]">
            <div className="flex items-center gap-4">
              <span>TOTAL DISCIPLINES: {CATEGORIES.length}</span>
              <span className="text-[#1c1b18]/25">•</span>
              <span>VERIFIED CAPABILITIES: {totalSkillsCount}+</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#7a7364]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5be0b]" />
              <span>STACK OPTIMIZED FOR 60FPS EXPERIENCES</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}