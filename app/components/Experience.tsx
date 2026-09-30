"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  GitPullRequest,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceItem {
  num: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  isCurrent?: boolean;
  isFreelance?: boolean;
  tags: string[];
  description: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    num: "01",
    role: "Freelance Creative Developer & Full Stack Engineer",
    company: "Independent / Creative Studios & Startups",
    location: "Remote / Worldwide",
    duration: "Present",
    type: "Freelance / Contract",
    isCurrent: true,
    isFreelance: true,
    tags: [
      "Next.js 15",
      "React.js",
      "GSAP Kinetic Motion",
      "Three.js & WebGL",
      "Tailwind CSS",
      "React Native",
      "Full-Stack Architecture",
    ],
    description: [
      "Partnering with ambitious founders, digital agencies, and brands to engineer bespoke web applications with fluid 60fps animations, custom GLSL fragment shaders, and tactile micro-interactions.",
      "Developing production-ready React Native mobile experiences and full-stack solutions with high-performance, type-safe API architectures.",
      "Available for contract engagements, creative front-end architecture, and high-impact digital experiences.",
    ],
  },
  {
    num: "02",
    role: "Software Engineer",
    company: "Fordel Studios (A Yellowchalk Company)",
    location: "India",
    duration: "Jul 2026 – Sep 2026",
    type: "Full-time",
    isCurrent: false,
    tags: [
      "React.js",
      "Next.js",
      "OTT Platform",
      "Scalable Frontend",
      "AI Workflows",
      "Performance Optimization",
    ],
    description: [
      "Contributed to engineering a high-scale OTT video streaming platform with interactive, performance-focused front-end architectures using React.js and Next.js.",
      "Leveraged AI-assisted development workflows to accelerate feature delivery, eliminate bottlenecks, and significantly heighten engineering velocity.",
      "Collaborated with product designers and backend engineers to maintain ultra-fast load times and seamless cross-device streaming interfaces.",
    ],
  },
  {
    num: "03",
    role: "Associate Developer",
    company: "Appycodes Technologies LLP",
    location: "India",
    duration: "Aug 2025 – Feb 2026",
    type: "Full-time",
    tags: [
      "React Native",
      "Mobile Applications",
      "Healthcare & Pharma",
      "Admin Panels",
      "REST APIs",
      "Git / GitHub",
    ],
    description: [
      "Engineered and maintained production applications for pharmaceutical and healthcare clients, supporting multi-tenant workflows and regulatory requirements.",
      "Built features across cross-platform mobile apps, internal social platforms, and robust admin dashboards using React Native, React.js, and REST APIs.",
      "Architected responsive, accessible UI layouts and optimized runtime memory and rendering performance across iOS and Android builds.",
    ],
  },
  {
    num: "04",
    role: "Full Stack Developer Intern",
    company: "Edunet Foundation",
    location: "India",
    duration: "Dec 2024 – Jan 2025",
    type: "Internship",
    tags: ["MERN Stack", "Node.js", "Express.js", "REST APIs", "Full Stack Architecture"],
    description: [
      "Developed full-stack web applications integrating MongoDB, Express.js, React.js, and Node.js for client-facing software systems.",
      "Implemented responsive layouts and connected RESTful API endpoints with structured client-side state handling and validation.",
    ],
  },
];

export default function Experience() {
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
        ".exp-rule",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
      )
        // 2. Section tag
        .fromTo(
          ".exp-tag",
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
          ".exp-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        // 4. Dossier cards stagger
        .fromTo(
          ".exp-dossier-card",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out" },
          "-=0.3"
        )
        // 5. Open source spotlight & footer
        .fromTo(
          ".exp-spotlight",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-40"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Custom Styling & Grain Injections ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .exp-paper-grain {
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

      {/* ── Paper Grain Overlay ── */}
      <div className="absolute inset-0 w-full h-full exp-paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── Atmospheric Ambient Golden Glow (Painterly Depth) ── */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[550px] opacity-15 pointer-events-none -mr-36 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-[500px] h-[500px] opacity-15 pointer-events-none -ml-36 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ── SECTION HEADER & EYEBROW ── */}
        <div className="flex flex-col gap-3 mb-12 sm:mb-16 md:mb-20">
          <div className="exp-tag flex items-center gap-3">
            <span className="exp-rule w-8 sm:w-12 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#47443c]">
              03 // CHRONOLOGY — WORK HISTORY
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1b18] leading-[1.12] max-w-3xl"
            >
              A journey of craft, systems &{" "}
              <span className="gold-ink-highlight">execution.</span>
            </h2>

            <p className="exp-desc text-sm sm:text-[15px] text-[#47443c] max-w-md leading-relaxed font-normal">
              A chronological ledger of engineering roles, production systems, and creative ventures spanning startups, agency workflows, and freelance craft.
            </p>
          </div>
        </div>

        {/* ── DOSSIER EXPERIENCE CARDS ── */}
        <div className="flex flex-col gap-6 sm:gap-8 mb-16 sm:mb-20">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.num}
              className={`exp-dossier-card group relative rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 bg-[#FAF8F3] border ${
                exp.isFreelance
                  ? "border-[#f5be0b]/60 shadow-[0_4px_24px_rgba(245,190,11,0.1)]"
                  : "border-[#1c1b18]/10"
              } hover:border-[#f5be0b] hover:shadow-[0_12px_36px_rgba(28,27,24,0.07)] hover:-translate-y-1`}
            >
              {/* Highlight Ribbon for Current / Freelance */}
              {exp.isFreelance && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full bg-[#f5be0b] text-[#1c1b18] text-[10px] font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#1c1b18]" />
                  <span>ACTIVE FREELANCE CRAFT</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* ── Left Column: Index & Role Details (lg:col-span-8) ── */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  
                  {/* Top Eyebrow: Index & Company */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                    <span className="font-bold text-[#8a8475] tracking-widest uppercase">
                      {exp.num} //
                    </span>
                    <span className="font-semibold text-[#1c1b18] text-sm sm:text-base">
                      {exp.company}
                    </span>
                    <span className="text-[#1c1b18]/30">•</span>
                    <span className="text-[#666052] flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3 text-[#8a8475]" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Main Role Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1c1b18] tracking-tight group-hover:text-[#b45309] transition-colors duration-200">
                    {exp.role}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#423e35] leading-relaxed select-text"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f5be0b] shrink-0 mt-2" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-[#1c1b18]/8">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tracking-wide bg-[#EAE6DC] text-[#2c2923] border border-[#1c1b18]/8 group-hover:border-[#1c1b18]/15 hover:!bg-[#f5be0b]/20 hover:!text-[#1c1b18] hover:!border-[#f5be0b]/60 transition-all cursor-default select-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right Column: Duration, Badge & Type (lg:col-span-4) ── */}
                <div className="lg:col-span-4 flex flex-row lg:flex-col lg:items-end justify-between gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1c1b18]/8">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#5c574c] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#8a8475]" />
                    <span>{exp.duration}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider ${
                      exp.isFreelance
                        ? "bg-[#f5be0b]/20 text-[#1c1b18] border border-[#f5be0b]/50"
                        : exp.type === "Full-time"
                        ? "bg-[#1c1b18]/8 text-[#1c1b18] border border-[#1c1b18]/15"
                        : "bg-[#EAE6DC] text-[#5c574c] border border-[#1c1b18]/10"
                    }`}
                  >
                    {exp.isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                    )}
                    <span>{exp.type}</span>
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── OPEN SOURCE CONTRIBUTION SPOTLIGHT ── */}
        <div className="exp-spotlight rounded-2xl p-6 sm:p-8 bg-[#FAF8F3] border border-[#1c1b18]/10 mb-16 sm:mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#f5be0b]/60 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#E6E2D7] text-[#1c1b18] flex items-center justify-center shrink-0">
              <GitPullRequest className="w-5 h-5 text-[#b45309]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#8a8475]">
                  ECOSYSTEM & OPEN SOURCE
                </span>
                <span className="text-[#1c1b18]/20">•</span>
                <span className="text-xs font-semibold text-[#1c1b18]">
                  OpenScreen Contribution
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#423e35] max-w-2xl leading-relaxed">
                Contributed accessibility optimizations to OpenScreen (an open-source screen recording and product-demo tool), adding assistive technology labeling across recording controls.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/CyberSparkx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1c1b18]/20 hover:border-black text-xs font-semibold text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#E6E2D7] transition-all duration-200 shrink-0 cursor-pointer shadow-sm group"
          >
            <span>View GitHub Activity</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* ── BOTTOM LEDGER FOOTER RIBBON ── */}
        <div className="w-full">
          <div className="w-full h-px bg-[#1c1b18]/15 mb-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono tracking-wider text-[#6b6557]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
              <span className="font-bold text-[#1c1b18]">STATUS: AVAILABLE FOR SELECTIVE FREELANCE & CONTRACTS</span>
            </div>

            <a
              href="#contact"
              className="flex items-center gap-1.5 text-xs font-bold text-[#1c1b18] hover:text-[#b45309] transition-colors cursor-pointer group"
            >
              <span>Initiate Collaboration</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}