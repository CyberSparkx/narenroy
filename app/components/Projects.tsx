"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ArrowUpRight,
  GitPullRequest,
  Compass,
  MonitorPlay,
  CheckCircle,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS_FROM_RESUME = [
  {
    index: "01",
    type: "FEATURED CASE STUDY",
    name: "The Darjeeling",
    subtitle: "Interactive Storytelling Website & Immersive WebGL Experience",
    headline: "An interactive storytelling digital experience celebrating the legacy, culture, and misty Himalayan horizons of Darjeeling.",
    description: [
      "Engineered an interactive storytelling website using React.js, WebGL fragment shaders, and advanced frontend animations with a focus on immersive design, performance, and user experience.",
      "Choreographed smooth 60fps scroll timelines with GSAP and custom fluid physics, immersing users into rich chapter-based regional stories.",
      "Architected lightweight asset pipelines and responsive canvas rendering ensuring silky-smooth frame budgets across desktop, tablet, and mobile devices.",
    ],
    tags: [
      "React.js",
      "WebGL & Shaders",
      "GSAP ScrollTrigger",
      "Interactive Storytelling",
      "Tailwind CSS",
      "Audio-Visual Choreography",
    ],
    metrics: [
      { label: "Rendering", value: "60 FPS" },
      { label: "Atmosphere", value: "WebGL" },
      { label: "Architecture", value: "React" },
    ],
    coords: "27.0410° N, 88.2663° E · 2,042M ELEVATION",
    links: [
      { label: "View Live Demo", url: "https://the-darjeeling.vercel.app", isPrimary: true },
      { label: "Source Code", url: "https://github.com/CyberSparkx", isPrimary: false },
    ],
    accentColor: "#f5be0b",
  },
  {
    index: "02",
    type: "OPEN SOURCE ECOSYSTEM",
    name: "OpenScreen",
    subtitle: "Screen Recording & Product Demo Platform",
    headline: "An open-source utility platform for seamless screen recording, product presentations, and workflow demonstration.",
    description: [
      "Contributed to OpenScreen, an open-source screen recording and product-demo application used by developers and content creators worldwide.",
      "Engineered critical accessibility improvements by adding robust ARIA labels, assistive technology hooks, and keyboard-accessible recording controls.",
      "Optimized control bar responsive behaviors and verified seamless screen-reader compliance across modern browser environments.",
    ],
    tags: [
      "Open Source",
      "Accessibility (WCAG)",
      "React.js",
      "MediaRecorder API",
      "Assistive Controls",
      "GitHub Ecosystem",
    ],
    metrics: [
      { label: "Accessibility", value: "100%" },
      { label: "Ecosystem", value: "GitHub" },
      { label: "Platform", value: "Web Audio/Video" },
    ],
    coords: "OPEN SOURCE · GLOBAL CONTRIBUTORS",
    links: [
      { label: "Inspect Repository", url: "https://github.com/CyberSparkx", isPrimary: true },
      { label: "GitHub Profile", url: "https://github.com/CyberSparkx", isPrimary: false },
    ],
    accentColor: "#d97706",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
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
        ".proj-rule",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
      )
        // 2. Section tag
        .fromTo(
          ".proj-tag",
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
          ".proj-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        // 4. Dossier cards stagger
        .fromTo(
          ".proj-dossier-card",
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: "power2.out" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-40"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Custom Styling & Grain Injections ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .proj-paper-grain {
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

        .marquee-track {
          display: flex;
          width: max-content;
          animation: projMarquee 26s linear infinite;
        }

        @keyframes projMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Paper Grain Overlay ── */}
      <div className="absolute inset-0 w-full h-full proj-paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── Atmospheric Ambient Golden Glow (Painterly Depth) ── */}
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] opacity-15 pointer-events-none -ml-44 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[550px] h-[550px] opacity-15 pointer-events-none -mr-40 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ── SECTION HEADER & EYEBROW ── */}
        <div className="flex flex-col gap-3 mb-12 sm:mb-16 md:mb-20">
          <div className="proj-tag flex items-center gap-3">
            <span className="proj-rule w-8 sm:w-12 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#47443c]">
              04 // PORTFOLIO — SELECTED WORKS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1b18] leading-[1.12] max-w-3xl"
            >
              Architected for immersion, engineered for{" "}
              <span className="gold-ink-highlight">performance.</span>
            </h2>

            <p className="proj-desc text-sm sm:text-[15px] text-[#47443c] max-w-md leading-relaxed font-normal">
              Featured works and open-source contributions documented directly from my resume, showcasing creative frontend motion, WebGL shaders, and high-standard accessibility.
            </p>
          </div>
        </div>

        {/* ── EDITORIAL MARQUEE TICKER ── */}
        <div className="overflow-hidden border-y border-[#1c1b18]/10 py-3 mb-14 sm:mb-18">
          <div className="marquee-track flex gap-8 whitespace-nowrap text-xs font-mono uppercase tracking-[0.22em] text-[#5c574c]">
            {[...Array(2)].map((_, outer) =>
              [
                "The Darjeeling",
                "WebGL Shaders",
                "OpenScreen",
                "WCAG Accessibility",
                "GSAP 60FPS Timelines",
                "React 19 & Next.js",
                "Three.js Canvas",
                "Kinetic Choreography",
              ].map((item, i) => (
                <span key={`${outer}-${i}`} className="flex items-center gap-4">
                  <span>{item}</span>
                  <span className="text-[#f5be0b] font-bold">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── PROJECT DOSSIER CARDS (ONLY PROJECTS AVAILABLE AT RESUME) ── */}
        <div className="flex flex-col gap-10 sm:gap-14 mb-16 sm:mb-20">
          {PROJECTS_FROM_RESUME.map((proj) => {
            const isDarjeeling = proj.index === "01";

            return (
              <div
                key={proj.index}
                className="proj-dossier-card group relative rounded-3xl p-7 sm:p-10 md:p-12 transition-all duration-300 bg-[#FAF8F3] border border-[#1c1b18]/12 hover:border-[#f5be0b] hover:shadow-[0_16px_40px_rgba(28,27,24,0.08)] hover:-translate-y-1"
              >
                {/* Floating Category Badge */}
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3.5 py-1 rounded-full bg-[#FAF8F3] border border-[#1c1b18]/15 text-[#1c1b18] text-[10px] font-bold font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-sm group-hover:border-[#f5be0b]">
                  <Sparkles className="w-3 h-3 text-[#f5be0b]" />
                  <span>{proj.type}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* ── Left Column: Title, Narrative & Features (lg:col-span-7) ── */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    
                    {/* Index & Coordinates */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8a8475]">
                      <span className="font-bold text-[#1c1b18] tracking-widest uppercase">
                        {proj.index} //
                      </span>
                      <span>{proj.coords}</span>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1c1b18] tracking-tight group-hover:text-[#b45309] transition-colors duration-200">
                        {proj.name}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-[#5c574c] mt-1">
                        {proj.subtitle}
                      </p>
                    </div>

                    {/* High-level Headline */}
                    <p className="text-xs sm:text-sm text-[#38352e] font-medium leading-relaxed bg-[#EAE6DC]/60 p-3.5 rounded-xl border border-[#1c1b18]/8">
                      {proj.headline}
                    </p>

                    {/* Resume Bullet Points */}
                    <ul className="flex flex-col gap-2.5">
                      {proj.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#423e35] leading-relaxed select-text"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f5be0b] shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-[#1c1b18]/8">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide bg-[#EAE6DC] text-[#2c2923] border border-[#1c1b18]/8 group-hover:border-[#1c1b18]/15 hover:!bg-[#f5be0b]/20 hover:!text-[#1c1b18] hover:!border-[#f5be0b]/60 transition-all cursor-default select-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links & CTA Bar */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 mt-2">
                      {proj.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                            link.isPrimary
                              ? "bg-[#1c1b18] text-[#E6E2D7] hover:bg-[#b45309] hover:shadow-md"
                              : "border border-[#1c1b18]/25 text-[#1c1b18] hover:bg-[#1c1b18]/10"
                          }`}
                        >
                          {link.label.includes("Code") || link.label.includes("GitHub") ? (
                            <Github className="w-3.5 h-3.5" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5" />
                          )}
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>

                  </div>

                  {/* ── Right Column: Architectural Visual Badge & Metrics (lg:col-span-5) ── */}
                  <div className="lg:col-span-5 flex flex-col gap-5 w-full">
                    
                    {/* Visual Feature Canvas / Illustration */}
                    <div
                      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#1c1b18]/10 flex flex-col justify-between p-6 select-none"
                      style={{
                        background: isDarjeeling
                          ? "linear-gradient(135deg, #1c1b18 0%, #2a2822 50%, #3d382f 100%)"
                          : "linear-gradient(135deg, #181714 0%, #262420 50%, #33302a 100%)",
                      }}
                    >
                      {/* Atmospheric Mountain / Screen Motif Overlay */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`goldGrad-${proj.index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f5be0b" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
                            </linearGradient>
                          </defs>
                          {isDarjeeling ? (
                            // Mountain peaks silhouette
                            <polygon points="0,250 80,110 160,180 250,80 340,170 400,100 400,250" fill={`url(#goldGrad-${proj.index})`} />
                          ) : (
                            // Screen recording frame motif
                            <g fill="none" stroke="#f5be0b" strokeWidth="1.5" opacity="0.3">
                              <rect x="40" y="30" width="320" height="190" rx="12" />
                              <circle cx="200" cy="125" r="28" strokeDasharray="4 4" />
                            </g>
                          )}
                        </svg>
                      </div>

                      {/* Top Bar inside Art Preview */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#f5be0b] animate-ping" />
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#E6E2D7]/80">
                            {isDarjeeling ? "WEBGL CANVAS ENGINE" : "A11Y ACCESSIBILITY SYSTEM"}
                          </span>
                        </div>
                        <div className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 text-[9px] font-mono text-[#f5be0b]">
                          {isDarjeeling ? "IMMERSIVE 3D" : "OPEN SOURCE"}
                        </div>
                      </div>

                      {/* Center Display Art Callout */}
                      <div className="relative z-10 my-auto text-center py-4">
                        <span className="text-2xl sm:text-3xl font-black text-[#FAF8F3] tracking-wider uppercase font-['Outfit'] block">
                          {isDarjeeling ? "THE DARJEELING" : "OPENSCREEN"}
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-[#f5be0b] uppercase mt-1 block opacity-90">
                          {isDarjeeling ? "STORYTELLING ARTIFACT" : "COMMUNITY PIPELINE"}
                        </span>
                      </div>

                      {/* Bottom Bar inside Art Preview */}
                      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#E6E2D7]/60 pt-2 border-t border-white/10">
                        <span>FPS: 60 LOCKED</span>
                        <span>STATUS: LIVE IN PRODUCTION</span>
                      </div>
                    </div>

                    {/* 3 Metric Plaque Tiles */}
                    <div className="grid grid-cols-3 gap-3">
                      {proj.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="bg-[#EAE6DC]/70 border border-[#1c1b18]/8 rounded-xl p-3 flex flex-col gap-0.5 text-center"
                        >
                          <span className="text-base sm:text-lg font-black text-[#1c1b18] tracking-tight">
                            {m.value}
                          </span>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-[#666052]">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ── BOTTOM RIBBON: GITHUB ARCHIVE DIRECTORY ── */}
        <div className="w-full">
          <div className="w-full h-px bg-[#1c1b18]/15 mb-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono tracking-wider text-[#6b6557]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#f5be0b]" />
              <span>CURATED DIRECTLY FROM NAREN ROY CV / RESUME ARCHIVE</span>
            </div>

            <a
              href="https://github.com/CyberSparkx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-[#1c1b18] hover:text-[#b45309] transition-colors cursor-pointer group"
            >
              <span>Explore All Repositories on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}