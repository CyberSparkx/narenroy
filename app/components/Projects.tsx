"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Inline SVG graphics — each represents the
   project's visual identity / concept
───────────────────────────────────────────── */

const PrimeGraphic = () => (
  <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="pg1" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="pg2" cx="30%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
      </radialGradient>
      <filter id="glow1">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Background */}
    <rect width="480" height="320" fill="#0c0a09" />
    <ellipse cx="240" cy="160" rx="220" ry="160" fill="url(#pg1)" />
    <ellipse cx="100" cy="250" rx="150" ry="120" fill="url(#pg2)" />

    {/* Grid lines */}
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={i*80} y1="0" x2={i*80} y2="320" stroke="#f9731608" strokeWidth="1" />
    ))}
    {[0,1,2,3].map(i => (
      <line key={i} x1="0" y1={i*80} x2="480" y2={i*80} stroke="#f9731608" strokeWidth="1" />
    ))}

    {/* Central bottle silhouette */}
    <g transform="translate(200, 30)" filter="url(#glow1)">
      {/* Bottle neck */}
      <rect x="28" y="0" width="24" height="40" rx="6" fill="#1c1917" stroke="#f97316" strokeWidth="1.5" />
      {/* Bottle body */}
      <rect x="10" y="36" width="60" height="180" rx="18" fill="#1c1917" stroke="#f97316" strokeWidth="1.5" />
      {/* Label */}
      <rect x="18" y="80" width="44" height="80" rx="6" fill="#f97316" opacity="0.15" />
      <text x="40" y="115" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="2">PRIME</text>
      {/* Shine */}
      <rect x="18" y="44" width="8" height="160" rx="4" fill="white" opacity="0.04" />
    </g>

    {/* Floating UI element — browser mockup */}
    <g transform="translate(10, 40)" opacity="0.7">
      <rect width="140" height="90" rx="8" fill="#1c1917" stroke="#f9731630" strokeWidth="1" />
      <rect width="140" height="18" rx="8" fill="#f9731615" />
      <circle cx="10" cy="9" r="3" fill="#ef4444" opacity="0.7" />
      <circle cx="22" cy="9" r="3" fill="#f59e0b" opacity="0.7" />
      <circle cx="34" cy="9" r="3" fill="#22c55e" opacity="0.7" />
      <rect x="8" y="26" width="80" height="4" rx="2" fill="#f9731630" />
      <rect x="8" y="36" width="120" height="4" rx="2" fill="#f9731318" />
      <rect x="8" y="46" width="100" height="4" rx="2" fill="#f9731318" />
      <rect x="8" y="56" width="60" height="4" rx="2" fill="#f9731318" />
      <rect x="8" y="68" width="90" height="4" rx="2" fill="#f9731318" />
    </g>

    {/* Floating tags */}
    <g transform="translate(330, 60)" opacity="0.85">
      <rect width="90" height="26" rx="13" fill="#f97316" opacity="0.12" stroke="#f9731640" strokeWidth="1" />
      <text x="45" y="17" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" letterSpacing="2">GSAP</text>
    </g>
    <g transform="translate(340, 100)" opacity="0.7">
      <rect width="80" height="26" rx="13" fill="#f97316" opacity="0.08" stroke="#f9731630" strokeWidth="1" />
      <text x="40" y="17" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" letterSpacing="2">LENIS</text>
    </g>
    <g transform="translate(320, 140)" opacity="0.6">
      <rect width="100" height="26" rx="13" fill="#f97316" opacity="0.08" stroke="#f9731330" strokeWidth="1" />
      <text x="50" y="17" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" letterSpacing="2">REACT</text>
    </g>

    {/* Waveform at bottom */}
    <polyline
      points="0,290 30,270 60,295 90,265 120,285 150,255 180,280 210,260 240,285 270,258 300,282 330,262 360,280 390,265 420,283 450,268 480,275"
      fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.3"
    />

    {/* Bottom text */}
    <text x="240" y="312" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="monospace" opacity="0.4" letterSpacing="4">
      ANIMATION-DRIVEN EXPERIENCE
    </text>
  </svg>
);

const NanaGraphic = () => (
  <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="ng1" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="ng2" cx="80%" cy="80%" r="50%">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Background */}
    <rect width="480" height="320" fill="#020617" />
    <ellipse cx="240" cy="140" rx="230" ry="170" fill="url(#ng1)" />
    <ellipse cx="380" cy="280" rx="180" ry="120" fill="url(#ng2)" />

    {/* Dot matrix */}
    {Array.from({length: 8}).map((_, row) =>
      Array.from({length: 12}).map((_, col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 40 + 20}
          cy={row * 40 + 20}
          r="1"
          fill="#22d3ee"
          opacity="0.08"
        />
      ))
    )}

    {/* Fruit / organic shapes — NANA = beverage brand */}
    <g transform="translate(170, 20)" filter="url(#glow2)">
      {/* Can body */}
      <rect x="25" y="30" width="70" height="180" rx="16" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      {/* Can top / bottom rounded edge */}
      <ellipse cx="60" cy="30" rx="35" ry="10" fill="#1e293b" stroke="#22d3ee" strokeWidth="1" />
      <ellipse cx="60" cy="210" rx="35" ry="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
      {/* Label area */}
      <rect x="30" y="70" width="60" height="100" rx="4" fill="#22d3ee" opacity="0.08" />
      {/* NANA text */}
      <text x="60" y="118" textAnchor="middle" fill="#22d3ee" fontSize="14" fontFamily="serif" fontWeight="bold" letterSpacing="4">NANA</text>
      <text x="60" y="133" textAnchor="middle" fill="#22d3ee" fontSize="7" fontFamily="monospace" letterSpacing="3" opacity="0.6">BEVERAGE</text>
      {/* Shine */}
      <rect x="30" y="38" width="10" height="164" rx="5" fill="white" opacity="0.03" />
      {/* Pull tab */}
      <ellipse cx="60" cy="24" rx="8" ry="4" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
    </g>

    {/* Splash / liquid circles */}
    <circle cx="320" cy="80" r="40" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.12" />
    <circle cx="320" cy="80" r="28" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.08" />
    <circle cx="320" cy="80" r="14" fill="#22d3ee" opacity="0.1" />

    <circle cx="80" cy="240" r="30" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.15" />
    <circle cx="80" cy="240" r="18" fill="#a78bfa" opacity="0.06" />

    {/* Pixel-art fruit accents */}
    {/* Lemon slice */}
    <g transform="translate(350, 160)" opacity="0.5">
      <circle cx="0" cy="0" r="22" fill="none" stroke="#fde047" strokeWidth="1" />
      <circle cx="0" cy="0" r="16" fill="#fde04710" />
      <line x1="0" y1="-16" x2="0" y2="16" stroke="#fde047" strokeWidth="0.8" opacity="0.4" />
      <line x1="-16" y1="0" x2="16" y2="0" stroke="#fde047" strokeWidth="0.8" opacity="0.4" />
      <line x1="-11" y1="-11" x2="11" y2="11" stroke="#fde047" strokeWidth="0.8" opacity="0.4" />
      <line x1="11" y1="-11" x2="-11" y2="11" stroke="#fde047" strokeWidth="0.8" opacity="0.4" />
    </g>

    {/* Floating tag */}
    <g transform="translate(30, 60)" opacity="0.8">
      <rect width="100" height="26" rx="13" fill="#22d3ee" opacity="0.1" stroke="#22d3ee40" strokeWidth="1" />
      <text x="50" y="17" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace" letterSpacing="2">TAILWIND</text>
    </g>
    <g transform="translate(20, 96)" opacity="0.65">
      <rect width="80" height="26" rx="13" fill="#22d3ee" opacity="0.07" stroke="#22d3ee30" strokeWidth="1" />
      <text x="40" y="17" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace" letterSpacing="2">GSAP</text>
    </g>

    {/* Bottom wave */}
    <path d="M0,295 Q60,270 120,290 T240,278 T360,288 T480,272 V320 H0 Z" fill="#22d3ee" opacity="0.04" />

    <text x="240" y="313" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="4">
      PIXEL-PERFECT FRONTEND
    </text>
  </svg>
);

const DraakshGraphic = () => (
  <svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="dg1" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
      </radialGradient>
      <filter id="glow3">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    <rect width="480" height="320" fill="#09090b" />
    <ellipse cx="240" cy="160" rx="240" ry="180" fill="url(#dg1)" />

    {/* Hexagonal grid accent */}
    {[0,1,2].map(row =>
      [0,1,2,3,4].map(col => {
        const x = col * 90 + (row % 2 === 0 ? 0 : 45);
        const y = row * 78 - 20;
        const pts = Array.from({length: 6}, (_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          return `${x + 34 * Math.cos(angle)},${y + 34 * Math.sin(angle)}`;
        }).join(' ');
        return <polygon key={`${row}-${col}`} points={pts} fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.07" />;
      })
    )}

    {/* Conference stage / podium illustration */}
    <g transform="translate(120, 50)" filter="url(#glow3)">
      {/* Screen */}
      <rect x="30" y="0" width="180" height="110" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
      {/* Screen content — bar chart */}
      <rect x="45" y="70" width="18" height="30" rx="3" fill="#a855f7" opacity="0.4" />
      <rect x="72" y="50" width="18" height="50" rx="3" fill="#a855f7" opacity="0.6" />
      <rect x="99" y="30" width="18" height="70" rx="3" fill="#a855f7" opacity="0.8" />
      <rect x="126" y="45" width="18" height="55" rx="3" fill="#a855f7" opacity="0.5" />
      <rect x="153" y="60" width="18" height="40" rx="3" fill="#a855f7" opacity="0.35" />
      <text x="120" y="14" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" letterSpacing="3" opacity="0.6">DRAAKSH × SILIGURI</text>

      {/* Stand */}
      <rect x="108" y="110" width="24" height="30" rx="2" fill="#27272a" />
      <rect x="80" y="138" width="80" height="8" rx="4" fill="#27272a" stroke="#a855f740" strokeWidth="1" />

      {/* Audience rows (dots) */}
      {[0,1,2].map(row =>
        [0,1,2,3,4,5,6,7].map(col => (
          <circle
            key={`aud-${row}-${col}`}
            cx={col * 26 + 10}
            cy={row * 16 + 160}
            r="5"
            fill="#a855f7"
            opacity={0.15 - row * 0.04}
          />
        ))
      )}
    </g>

    {/* Location pin */}
    <g transform="translate(380, 50)" opacity="0.7" filter="url(#glow3)">
      <path d="M20,0 C9,0 0,9 0,20 C0,35 20,55 20,55 C20,55 40,35 40,20 C40,9 31,0 20,0Z"
        fill="#a855f7" opacity="0.15" stroke="#a855f7" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="7" fill="#a855f7" opacity="0.5" />
    </g>

    {/* Tags */}
    <g transform="translate(20, 220)" opacity="0.8">
      <rect width="90" height="26" rx="13" fill="#a855f7" opacity="0.1" stroke="#a855f740" strokeWidth="1" />
      <text x="45" y="17" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" letterSpacing="2">VITE+TS</text>
    </g>
    <g transform="translate(120, 220)" opacity="0.65">
      <rect width="80" height="26" rx="13" fill="#a855f7" opacity="0.07" stroke="#a855f730" strokeWidth="1" />
      <text x="40" y="17" textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" letterSpacing="2">SHADCN</text>
    </g>

    <text x="240" y="313" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="monospace" opacity="0.35" letterSpacing="4">
      TECH CONFERENCE · SILIGURI
    </text>
  </svg>
);

/* ─────────────────────────────────────────────
   Project data
───────────────────────────────────────────── */
const projects = [
  {
    index: "01",
    name: "Prime",
    subtitle: "Brand Website Reimagined",
    description:
      "Reimagined the Prime brand website with a modern animation-driven UI — multi-page transitions, smooth scrolling with Lenis, and optimized media delivery.",
    tags: ["React.js", "GSAP", "Lenis", "Tailwind CSS"],
    accent: "#f97316",
    links: [
      { label: "GitHub", url: "https://github.com/CyberSparkx" },
      { label: "Live", url: "#" },
    ],
    Graphic: PrimeGraphic,
    year: "2024",
  },
  {
    index: "02",
    name: "NANA",
    subtitle: "Beverage Brand Website",
    description:
      "Pixel-perfect, responsive frontend for a beverage brand. Smooth UI animations via GSAP and Lenis, built with React.js and Tailwind CSS.",
    tags: ["React.js", "GSAP", "Lenis", "Tailwind CSS"],
    accent: "#22d3ee",
    links: [
      { label: "GitHub", url: "https://github.com/CyberSparkx" },
      { label: "Live", url: "#" },
    ],
    Graphic: NanaGraphic,
    year: "2024",
  },
  {
    index: "03",
    name: "Draaksh × Siliguri",
    subtitle: "Tech Event Landing Page",
    description:
      "Conference landing page with scroll-driven canvas animations, GSAP + ScrollTrigger + Locomotive Scroll, and a pill-style frosted glass navbar.",
    tags: ["Vite", "React", "TypeScript", "GSAP", "shadcn/ui"],
    accent: "#a855f7",
    links: [
      { label: "GitHub", url: "https://github.com/CyberSparkx" },
      { label: "Live", url: "#" },
    ],
    Graphic: DraakshGraphic,
    year: "2025",
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section heading
      gsap.from(".proj-heading", {
        scrollTrigger: { trigger: ".proj-heading", start: "top 85%" },
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
      });

      // Marquee (runs on mount, not scroll)
      gsap.to(".marquee-inner", {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      // Cards
      const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });

        // Graphic reveal
        const graphic = card.querySelector(".proj-graphic");
        gsap.from(graphic, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          scale: 1.08,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.15,
        });
      });

      // Tags
      gsap.from(".proj-tag", {
        scrollTrigger: { trigger: container.current, start: "top 70%" },
        scale: 0.6,
        opacity: 0,
        stagger: 0.05,
        duration: 0.45,
        ease: "back.out(2)",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-[#09090b] pb-32 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 70%)" }}
      />

      {/* ── Heading ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-5">
          Selected Works
        </p>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-20">
          <h2
            className="proj-heading text-5xl md:text-7xl font-black text-white leading-none tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Projects
          </h2>
          <span className="text-zinc-600 font-mono text-sm">
            {projects.length} case studies
          </span>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="overflow-hidden border-y border-zinc-800 py-3 mb-20">
        <div className="marquee-inner flex gap-10 whitespace-nowrap w-max">
          {[...Array(2)].map((_, outer) =>
            ["React.js", "GSAP", "TypeScript", "Tailwind CSS", "Lenis", "Node.js", "MongoDB", "React Native", "Vite", "shadcn/ui"].map((item, i) => (
              <span key={`${outer}-${i}`} className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-600">
                {item} <span className="text-zinc-700 mx-4">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const { Graphic } = project;
          return (
            <div
              key={project.index}
              className="proj-card group relative flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1"
              style={{ boxShadow: `0 0 0 0 ${project.accent}00` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px -10px ${project.accent}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${project.accent}00`;
              }}
            >
              {/* Graphic area */}
              <div className="proj-graphic relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
                <Graphic />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at center, ${project.accent}15 0%, transparent 70%)` }}
                />
                {/* Year badge */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}10` }}
                >
                  {project.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                {/* Index + title */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-mono text-zinc-600 mt-1">{project.index}</span>
                  <div>
                    <h3
                      className="text-xl font-black text-white leading-tight transition-colors duration-300"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: project.accent }}>
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="proj-tag text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-zinc-800">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label === "GitHub" ? (
                        <Github size={13} />
                      ) : (
                        <ExternalLink size={13} />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}