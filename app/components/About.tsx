"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "3+",  label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "5+",  label: "Tech Stacks"    },
  { value: "∞",   label: "Lines of Code"  },
];

const TAGS = [
  "React", "Next.js", "TypeScript", "GSAP",
  "Node.js", "Three.js", "IoT", "Arduino",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    tl.from(".ab-label",   { y: 20, opacity: 0, duration: 0.5 })
      .from(".ab-heading",  { y: 50, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".ab-body",     { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(".ab-tag",      { y: 16, opacity: 0, duration: 0.45, stagger: 0.05 }, "-=0.4")
      .from(".ab-stat",     { y: 24, opacity: 0, duration: 0.5,  stagger: 0.08 }, "-=0.4")
      .from(".ab-card",     { x: 60, opacity: 0, duration: 0.9,  ease: "expo.out" }, "<-=0.7");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ background: "#0a0a0f", fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
      `}</style>

      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,139,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,139,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(61,139,255,0.10) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(61,139,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* ── Section label ── */}
        <div className="ab-label mono flex items-center gap-3 mb-8">
          <span className="w-8 h-px" style={{ background: "#3d8bff" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#3d8bff" }}>Who I Am</span>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col gap-8">

            {/* Heading */}
            <h2
              className="ab-heading text-white font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
            >
              Building with<br />
              <span style={{ color: "#3d8bff" }}>intention.</span>
            </h2>

            {/* Summary */}
            <p
              className="ab-body mono text-white/50 leading-[1.85]"
              style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.9rem)", maxWidth: "460px" }}
            >
              {portfolioData.personalInfo.summary}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="ab-tag mono text-[11px] tracking-wider px-3 py-1.5 rounded-full cursor-default transition-all duration-300"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "rgba(61,139,255,0.5)";
                    e.currentTarget.style.background = "rgba(61,139,255,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-4 gap-6 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="ab-stat flex flex-col gap-1">
                  <span
                    className="font-extrabold"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#3d8bff" }}
                  >
                    {s.value}
                  </span>
                  <span className="mono text-white/30 text-[10px] leading-tight tracking-wider uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Code card ── */}
          <div className="ab-card relative">

            {/* Glowing border wrapper */}
            <div
              className="relative rounded-2xl p-px"
              style={{
                background: "linear-gradient(135deg, rgba(61,139,255,0.45) 0%, rgba(61,139,255,0.05) 50%, rgba(61,139,255,0.18) 100%)",
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden flex flex-col"
                style={{ background: "#0f0f18", minHeight: "380px" }}
              >
                {/* Editor top bar */}
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.6)" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
                  <span className="mono text-white/20 text-[11px] ml-3 tracking-wider">about.ts</span>
                </div>

                {/* Code body */}
                <div
                  className="flex-1 p-6 mono leading-[2.1] select-none"
                  style={{ fontSize: "clamp(0.7rem, 1vw, 0.82rem)", color: "rgba(255,255,255,0.3)" }}
                >
                  <p>
                    <span style={{ color: "#60a5fa" }}>const </span>
                    <span style={{ color: "#34d399" }}>developer</span>
                    <span> = </span>
                    <span style={{ color: "#fbbf24" }}>{`{`}</span>
                  </p>
                  <p className="pl-5">
                    <span style={{ color: "#f9a8d4" }}>name</span>
                    <span>: </span>
                    <span style={{ color: "#86efac" }}>"Naren Roy"</span>
                    <span>,</span>
                  </p>
                  <p className="pl-5">
                    <span style={{ color: "#f9a8d4" }}>role</span>
                    <span>: </span>
                    <span style={{ color: "#86efac" }}>"Frontend Developer"</span>
                    <span>,</span>
                  </p>
                  <p className="pl-5">
                    <span style={{ color: "#f9a8d4" }}>location</span>
                    <span>: </span>
                    <span style={{ color: "#86efac" }}>"Siliguri, IN"</span>
                    <span>,</span>
                  </p>
                  <p className="pl-5">
                    <span style={{ color: "#f9a8d4" }}>stack</span>
                    <span>: [</span>
                  </p>
                  <p className="pl-10">
                    <span style={{ color: "#86efac" }}>"React"</span>
                    <span>, </span>
                    <span style={{ color: "#86efac" }}>"GSAP"</span>
                    <span>, </span>
                    <span style={{ color: "#86efac" }}>"TypeScript"</span>
                    <span>,</span>
                  </p>
                  <p className="pl-10">
                    <span style={{ color: "#86efac" }}>"Node.js"</span>
                    <span>, </span>
                    <span style={{ color: "#86efac" }}>"Three.js"</span>
                    <span>,</span>
                  </p>
                  <p className="pl-5"><span>],</span></p>
                  <p className="pl-5">
                    <span style={{ color: "#f9a8d4" }}>available</span>
                    <span>: </span>
                    <span style={{ color: "#60a5fa" }}>true</span>
                    <span>,</span>
                  </p>
                  <p><span style={{ color: "#fbbf24" }}>{`}`}</span><span>;</span></p>
                </div>

                {/* Cursor line */}
                <div
                  className="flex items-center gap-1.5 px-6 pb-5 mono"
                  style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}
                >
                  <span style={{ color: "#3d8bff" }}>▶</span>
                  <span className="cursor-blink inline-block w-2 h-[1.1em]" style={{ background: "#3d8bff" }} />
                </div>

                {/* Inner corner glow */}
                <div
                  className="absolute bottom-0 right-0 w-56 h-56 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(61,139,255,0.07) 0%, transparent 70%)" }}
                />
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-3.5 -right-3.5 mono text-[11px] px-3 py-1.5 rounded-full tracking-wider"
              style={{
                color: "#3d8bff",
                background: "rgba(61,139,255,0.10)",
                border: "1px solid rgba(61,139,255,0.28)",
                backdropFilter: "blur(8px)",
              }}
            >
              Open to Work ✦
            </div>

            {/* Decorative corner lines */}
            <div className="absolute -bottom-3 -left-3 w-6 h-6 pointer-events-none"
              style={{ borderLeft: "1.5px solid rgba(61,139,255,0.3)", borderBottom: "1.5px solid rgba(61,139,255,0.3)" }} />
            <div className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none"
              style={{ borderLeft: "1.5px solid rgba(61,139,255,0.3)", borderTop: "1.5px solid rgba(61,139,255,0.3)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}