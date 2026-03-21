"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    key: "languages",
    label: "Languages",
    num: "01",
    accent: "#3d8bff",
    icon: "{ }",
  },
  {
    key: "frontend",
    label: "Frontend",
    num: "02",
    accent: "#f472b6",
    icon: "◈",
  },
  {
    key: "backend",
    label: "Backend",
    num: "03",
    accent: "#34d399",
    icon: "⬡",
  },
  {
    key: "databases",
    label: "Databases",
    num: "04",
    accent: "#fbbf24",
    icon: "⊞",
  },
  {
    key: "tools",
    label: "Tools",
    num: "05",
    accent: "#fb923c",
    icon: "⚙",
  },
  {
    key: "cloudDevOps",
    label: "Cloud / DevOps",
    num: "06",
    accent: "#22d3ee",
    icon: "⬢",
  },
] as const;

type SkillKey = typeof CATEGORIES[number]["key"];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section label + heading
    gsap.from(".sk-label", {
      scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      y: 20, opacity: 0, duration: 0.5, ease: "power3.out",
    });
    gsap.from(".sk-heading", {
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    // Cards stagger
    gsap.from(".sk-card", {
      scrollTrigger: {
        trigger: ".sk-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50, opacity: 0, duration: 0.65,
      stagger: 0.1, ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ background: "#0a0a0f", fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
        .sk-card { transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease; }
        .sk-card:hover { transform: translateY(-4px); }
        .sk-pill { transition: background 0.2s, color 0.2s, border-color 0.2s; }
      `}</style>

      {/* Grid background */}
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

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(61,139,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section label */}
        <div className="sk-label mono flex items-center gap-3 mb-8">
          <span className="w-8 h-px" style={{ background: "#3d8bff" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#3d8bff" }}>What I Use</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <h2
            className="sk-heading font-extrabold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            Technical<br />
            <span style={{ color: "#3d8bff" }}>Arsenal.</span>
          </h2>
          <p
            className="mono text-white/30 max-w-xs leading-relaxed"
            style={{ fontSize: "0.78rem" }}
          >
            Tools & technologies I use to build fast, animated, production-ready products.
          </p>
        </div>

        {/* Cards grid */}
        <div className="sk-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(({ key, label, num, accent, icon }) => {
            const skills = (portfolioData.skills as Record<SkillKey, string[]>)[key] ?? [];

            return (
              <div
                key={key}
                className="sk-card relative rounded-2xl p-6 flex flex-col gap-5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
                  (e.currentTarget as HTMLElement).style.background = `rgba(255,255,255,0.04)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1.5">
                    {/* Number */}
                    <span
                      className="mono text-[10px] tracking-widest"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      {num}
                    </span>
                    {/* Label */}
                    <h3
                      className="font-bold text-white text-lg leading-none"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {label}
                    </h3>
                  </div>

                  {/* Icon badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                      color: accent,
                      fontFamily: "monospace",
                    }}
                  >
                    {icon}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="sk-pill mono text-[11px] tracking-wide px-2.5 py-1 rounded-lg cursor-default"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                        (e.currentTarget as HTMLElement).style.background = `${accent}18`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${accent}50`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-20 h-20 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${accent}10 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom rule with skill count */}
        <div
          className="mt-14 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="mono text-white/20 text-[11px] tracking-widest uppercase">
            {CATEGORIES.length} Categories
          </span>
          <span className="mono text-white/20 text-[11px] tracking-widest uppercase">
            {CATEGORIES.reduce((acc, { key }) =>
              acc + ((portfolioData.skills as Record<SkillKey, string[]>)[key]?.length ?? 0), 0
            )}+ Skills
          </span>
        </div>

      </div>
    </section>
  );
}