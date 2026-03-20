"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SKILLS = [
  { num: "01.", label: "React & Next.js"   },
  { num: "02.", label: "GSAP Animation"    },
  { num: "03.", label: "TypeScript"        },
  { num: "04.", label: "Three.js / R3F"   },
  { num: "05.", label: "Node.js / Express" },
  { num: "06.", label: "IoT & Arduino"     },
];

const HeroIllustration = () => (
  <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
    <ellipse cx="240" cy="490" rx="130" ry="18" fill="#1a3a8f" fillOpacity="0.25" />
    {/* Chair */}
    <rect x="148" y="370" width="14" height="100" rx="7" fill="#1a3aff" />
    <rect x="318" y="370" width="14" height="100" rx="7" fill="#1a3aff" />
    <rect x="120" y="440" width="240" height="14" rx="7" fill="#1a3aff" />
    <rect x="110" y="330" width="260" height="55" rx="20" fill="#1a3aff" />
    <rect x="148" y="200" width="14" height="145" rx="7" fill="#1a3aff" />
    <rect x="318" y="200" width="14" height="145" rx="7" fill="#1a3aff" />
    <rect x="130" y="195" width="220" height="60" rx="18" fill="#1a3aff" />
    {/* Body */}
    <rect x="176" y="250" width="128" height="90" rx="28" fill="#ffd166" />
    <path d="M200 295 Q240 315 280 295" stroke="#e6b800" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Head */}
    <circle cx="240" cy="200" r="62" fill="#ffd166" />
    <path d="M178 185 Q185 130 240 125 Q295 130 302 185" fill="#1a1a2e" />
    <path d="M178 185 Q170 160 182 148" stroke="#1a1a2e" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M302 185 Q310 160 298 148" stroke="#1a1a2e" strokeWidth="8" fill="none" strokeLinecap="round" />
    <ellipse cx="218" cy="198" rx="10" ry="12" fill="#1a1a2e" />
    <ellipse cx="262" cy="198" rx="10" ry="12" fill="#1a1a2e" />
    <circle cx="222" cy="194" r="3" fill="white" />
    <circle cx="266" cy="194" r="3" fill="white" />
    <path d="M224 218 Q240 232 256 218" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Headphones */}
    <path d="M178 190 Q178 140 240 138 Q302 140 302 190" stroke="#1a1a2e" strokeWidth="9" fill="none" />
    <rect x="165" y="188" width="20" height="28" rx="8" fill="#1a1a2e" />
    <rect x="295" y="188" width="20" height="28" rx="8" fill="#1a1a2e" />
    {/* Arms */}
    <path d="M176 275 Q130 285 105 330" stroke="#ffd166" strokeWidth="26" strokeLinecap="round" fill="none" />
    <path d="M304 275 Q350 285 375 330" stroke="#ffd166" strokeWidth="26" strokeLinecap="round" fill="none" />
    {/* Left laptop */}
    <rect x="95"  y="310" width="110" height="70" rx="10" fill="#1a1a2e" />
    <rect x="100" y="315" width="100" height="60" rx="7"  fill="#0d0d1a" />
    <rect x="108" y="323" width="50"  height="5"  rx="2.5" fill="#22c55e" />
    <rect x="108" y="333" width="35"  height="5"  rx="2.5" fill="#60a5fa" />
    <rect x="108" y="343" width="45"  height="5"  rx="2.5" fill="#fbbf24" />
    <rect x="108" y="353" width="30"  height="5"  rx="2.5" fill="#22c55e" />
    <rect x="88"  y="378" width="125" height="10" rx="5"  fill="#1a1a2e" />
    {/* Right laptop */}
    <rect x="275" y="315" width="100" height="65" rx="10" fill="#1a1a2e" />
    <rect x="280" y="320" width="90"  height="55" rx="7"  fill="#0d0d1a" />
    <rect x="285" y="325" width="80"  height="8"  rx="3"  fill="#1a3aff" />
    <rect x="285" y="338" width="55"  height="4"  rx="2"  fill="#3a3a5c" />
    <rect x="285" y="346" width="70"  height="4"  rx="2"  fill="#3a3a5c" />
    <rect x="285" y="354" width="45"  height="4"  rx="2"  fill="#3a3a5c" />
    <rect x="285" y="362" width="60"  height="4"  rx="2"  fill="#3a3a5c" />
    <rect x="268" y="378" width="115" height="10" rx="5"  fill="#1a1a2e" />
    {/* Sparkles */}
    <circle cx="80"  cy="150" r="5" fill="white" fillOpacity="0.7" />
    <circle cx="400" cy="120" r="7" fill="white" fillOpacity="0.5" />
    <circle cx="430" cy="280" r="4" fill="white" fillOpacity="0.6" />
    <circle cx="55"  cy="310" r="6" fill="white" fillOpacity="0.4" />
    {/* Floating badges */}
    <rect x="340" y="145" width="112" height="48" rx="12" fill="white" fillOpacity="0.15" />
    <text x="356" y="167" fontFamily="monospace" fontSize="12" fill="white" fillOpacity="0.9">&lt;Naren /&gt;</text>
    <text x="356" y="184" fontFamily="monospace" fontSize="10" fill="#22c55e">//frontend dev</text>
    <rect x="18"  y="160" width="100" height="46" rx="12" fill="white" fillOpacity="0.15" />
    <text x="30"  y="181" fontFamily="monospace" fontSize="10" fill="white" fillOpacity="0.9">GSAP ✦ React</text>
    <text x="30"  y="197" fontFamily="monospace" fontSize="9"  fill="#fbbf24">TypeScript</text>
  </svg>
);

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const badgeRef        = useRef<HTMLDivElement>(null);
  const headlineRef     = useRef<HTMLHeadingElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const stripRef        = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6, delay: 0.7 })
      .from(headlineRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(subRef.current,      { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(ctaRef.current,      { y: 24, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(illustrationRef.current, { x: 50, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.8")
      .from(
        stripRef.current?.querySelectorAll(".skill-item") ?? [],
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.06 },
        "-=0.5"
      );

    // Blob float
    gsap.to(".hero-blob", {
      y: -12, duration: 3.5, yoyo: true, repeat: -1,
      ease: "sine.inOut", stagger: { each: 0.7 },
    });

    // Illustration float
    gsap.to(illustrationRef.current, {
      y: -10, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#3d8bff", fontFamily: "'Syne', sans-serif" }}
    >
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .mono { font-family: 'Space Mono', monospace; }
      `}</style>

      {/* Decorative blobs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden>
        <ellipse cx="120" cy="80"  rx="22" ry="14" fill="#1a3a8f" fillOpacity="0.18" className="hero-blob" />
        <ellipse cx="340" cy="55"  rx="12" ry="8"  fill="#1a3a8f" fillOpacity="0.18" className="hero-blob" />
        <ellipse cx="60"  cy="260" rx="18" ry="11" fill="#1a3a8f" fillOpacity="0.14" className="hero-blob" />
        <ellipse cx="500" cy="200" rx="10" ry="7"  fill="#1a3a8f" fillOpacity="0.18" className="hero-blob" />
        <ellipse cx="700" cy="90"  rx="20" ry="13" fill="#1a3a8f" fillOpacity="0.16" className="hero-blob" />
        <ellipse cx="760" cy="350" rx="15" ry="9"  fill="#1a3a8f" fillOpacity="0.18" className="hero-blob" />
        <ellipse cx="900" cy="140" rx="11" ry="7"  fill="#1a3a8f" fillOpacity="0.18" className="hero-blob" />
        {/* Diagonal stripe */}
        <rect x="55%" y="0" width="90" height="120%" fill="#1a3aff" fillOpacity="0.09" transform="rotate(-8,700,200)" />
      </svg>

      {/* Vertical meta text */}
      <div
        className="mono absolute left-3 top-1/2 text-white/30 text-[10px] pointer-events-none select-none z-10"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        Naren Roy — Portfolio 2025
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────
           pt-28 = 112px clears the floating navbar (navbar height ~60px + 16px top offset + gap)
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center gap-6 px-12 md:px-20 pt-28 pb-6">

        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="mono inline-flex self-start items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-white text-[11px] tracking-widest uppercase mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Open to Work
          </div>

          {/* Headline — clamped so it NEVER overflows or wraps per-letter */}
          <h1
            ref={headlineRef}
            className="font-extrabold text-white leading-[1.08] tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 5.8rem)",
            }}
          >
            The art<br />of coding.
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="mono mt-5 text-white/75 leading-relaxed"
            style={{ fontSize: "clamp(0.72rem, 1vw, 0.92rem)", maxWidth: "340px" }}
          >
            Front End Developer — I build motion‑driven,{" "}
            pixel-perfect digital experiences{" "}
            <span className="text-white font-bold">from Siliguri.</span>
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-2.5 bg-white text-[#3d8bff] rounded-full font-bold text-sm hover:bg-yellow-300 hover:text-black transition-all duration-300"
            >
              See Projects
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-white/40 text-white rounded-full font-bold text-sm hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Right: illustration */}
        <div
          ref={illustrationRef}
          className="w-full md:w-[46%] lg:w-[42%] flex-shrink-0 flex items-end justify-center"
          style={{ maxHeight: "460px" }}
        >
          <HeroIllustration />
        </div>
      </div>

      {/* ── Bottom skill strip ── */}
      <div
        ref={stripRef}
        className="relative z-10 w-full border-t border-white/20 grid"
        style={{ gridTemplateColumns: `repeat(${SKILLS.length}, 1fr)` }}
      >
        {SKILLS.map((s, i) => (
          <div
            key={i}
            className="skill-item px-4 py-3 border-r border-white/20 last:border-r-0 hover:bg-white/10 transition-colors duration-200 cursor-default"
          >
            <span className="mono text-white/40 text-[10px] block mb-0.5">{s.num}</span>
            <span className="text-white text-xs font-bold leading-tight block">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
