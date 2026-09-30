"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Phone, Mail, Linkedin, Github, Check } from "lucide-react";
import PixelShaderCanvas from "./PixelShaderCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const artLayerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const rightTagRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Entrance animation for the WebGL artwork layer
      tl.fromTo(
        artLayerRef.current,
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      )
        // 2. Navigation header
        .fromTo(
          navRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.7"
        )
        // 3. Eyebrow
        .fromTo(
          eyebrowRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        // 4. Headline with full y descender
        .fromTo(
          headlineRef.current,
          { x: -30, opacity: 0, filter: "blur(6px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "power3.out" },
          "-=0.45"
        )
        // 5. Contact strip
        .fromTo(
          contactRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        // 6. Bio quote
        .fromTo(
          quoteRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.35"
        )
        // 7. Corner details
        .fromTo(
          [scrollRef.current, rightTagRef.current, locationRef.current],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );

      // Continuous pulse on scroll indicator
      if (scrollLineRef.current) {
        gsap.to(scrollLineRef.current, {
          scaleY: 0.45,
          opacity: 0.35,
          transformOrigin: "top",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Google Fonts injection & Custom Typography ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .paper-grain {
          background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 0);
          background-size: 4px 4px;
        }
      `}</style>

      {/* ── Copy Notification Toast ── */}
      {copiedText && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1b18] text-[#E6E2D7] text-xs font-semibold shadow-2xl border border-white/10 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-[#f5be0b]" />
          <span>{copiedText} copied to clipboard!</span>
        </div>
      )}

      {/* ── MULTI-LAYER ARTWORK WITH INTERACTIVE WEBGL PIXEL SHADER ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Interactive WebGL Pixelation Canvas (Cursor radius effect) */}
        <div
          ref={artLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-auto z-10"
        >
          <PixelShaderCanvas
            bgSrc="/bg.png"
            meSrc="/me.png"
          />
        </div>

        {/* Paper texture grain overlay */}
        <div className="absolute inset-0 w-full h-full paper-grain opacity-25 mix-blend-multiply pointer-events-none z-20" />
      </div>

      {/* ── TOP NAVIGATION ── */}
      <header
        ref={navRef}
        className="relative z-30 w-full px-6 sm:px-10 md:px-14 lg:px-16 pt-6 sm:pt-8 flex items-center justify-between pointer-events-auto"
      >
        {/* Brand / Name */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-[#1b1a17] hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Naren Roy — Return to top"
        >
          <span className="text-xs sm:text-sm font-black tracking-[0.22em] uppercase">
            NAREN ROY
          </span>
          <span className="inline-block w-8 sm:w-10 h-[1.5px] bg-[#1b1a17]/70 group-hover:w-14 transition-all duration-300" />
        </a>

        {/* Nav Links */}
        <nav aria-label="Hero navigation" className="flex items-center gap-5 sm:gap-8 md:gap-11">
          {[
            { label: "about", href: "#about" },
            { label: "projects", href: "#projects" },
            { label: "skills", href: "#skills" },
            { label: "contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs sm:text-[13px] font-medium tracking-wide text-[#2e2c26] hover:text-black transition-colors relative py-1 group cursor-pointer"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>
      </header>

      {/* ── MAIN CONTENT (LEFT COLUMN) ── */}
      <div className="relative z-30 w-full flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-8 md:py-6 pointer-events-none">
        <div className="w-full max-w-xl lg:max-w-2xl flex flex-col pointer-events-auto">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
            <span className="w-8 sm:w-11 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#47443c]">
              FULL STACK SOFTWARE DEVELOPER
            </span>
          </div>

          {/* Main Display Headline (Authentic Brushed Ink Typography with full 'y' descender) */}
          <div ref={headlineRef} className="mb-4 sm:mb-6">
            <h1 className="sr-only">Naren Roy — Full Stack Software Developer</h1>

            <div className="relative inline-block select-none">
              <img
                src="/naren-roy-title.png"
                alt="Naren Roy"
                className="w-[290px] sm:w-[370px] md:w-[440px] lg:w-[490px] h-auto object-contain select-none pointer-events-none mix-blend-multiply"
              />
            </div>
          </div>

          {/* Contact Bar */}
          <div
            ref={contactRef}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-[#2b2923] font-medium mb-5 sm:mb-7"
          >
            {/* Phone */}
            <a
              href="tel:+917864066694"
              onClick={(e) => {
                if (window.innerWidth >= 1024) {
                  e.preventDefault();
                  handleCopy("+91 7864066694", "Phone number");
                }
              }}
              className="flex items-center gap-1.5 hover:text-amber-800 transition-colors group cursor-pointer"
              title="Call / Copy +91 7864066694"
            >
              <Phone className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              <span>+91 7864066694</span>
            </a>

            <span className="text-[#1c1b18]/30 select-none">——</span>

            {/* Email */}
            <a
              href="mailto:narensarkar607@gmail.com"
              onClick={(e) => {
                if (window.innerWidth >= 1024 && e.shiftKey) {
                  e.preventDefault();
                  handleCopy("narensarkar607@gmail.com", "Email address");
                }
              }}
              className="flex items-center gap-1.5 hover:text-amber-800 transition-colors group cursor-pointer"
              title="Email narensarkar607@gmail.com (Shift+click to copy)"
            >
              <Mail className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              <span>narensarkar607@gmail.com</span>
            </a>

            <span className="text-[#1c1b18]/30 select-none">——</span>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/naren-roy-4390a6238/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-black/5 hover:text-[#0a66c2] transition-colors cursor-pointer"
                aria-label="Naren Roy LinkedIn profile"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/CyberSparkx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:bg-black/5 hover:text-black transition-colors cursor-pointer"
                aria-label="Naren Roy GitHub profile"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bio Quote Block */}
          <div
            ref={quoteRef}
            className="flex items-stretch gap-3 sm:gap-3.5 max-w-sm sm:max-w-md lg:max-w-lg select-text"
          >
            {/* Yellow Accent Bar */}
            <div className="w-[3px] rounded-full bg-[#f3b413] shrink-0" />
            <p className="text-[12px] sm:text-[13px] md:text-sm leading-relaxed text-[#35332c] font-normal">
              I build interactive web and mobile experiences
              <br className="hidden sm:inline" /> with a focus on modern frontend, GSAP animations,
              <br className="hidden sm:inline" /> WebGL and immersive digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER / FOLD ACCENTS ── */}
      <div className="relative z-30 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-6 sm:pb-8 flex items-end justify-between pointer-events-none">
        {/* Bottom Left: Scroll To Explore */}
        <a
          ref={scrollRef}
          href="#about"
          className="group flex flex-col items-start gap-1 cursor-pointer pointer-events-auto"
          aria-label="Scroll down to explore about section"
        >
          <div
            ref={scrollLineRef}
            className="w-[1.5px] h-6 bg-[#1c1b18]/70 group-hover:bg-[#f3b413] group-hover:h-8 transition-all duration-300 origin-top"
          />
          <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-[#47443c] group-hover:text-black transition-colors leading-tight">
            SCROLL
            <br />
            TO EXPLORE
          </div>
        </a>

        {/* Bottom Right: Siliguri, India */}
        <div
          ref={locationRef}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#1c1b18] md:text-[#f8f5ee] pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-[#f5be0b] shadow-[0_0_8px_#f5be0b] shrink-0" />
          <span>SILIGURI, INDIA</span>
          <span className="w-7 sm:w-10 h-[1.5px] bg-current opacity-60 shrink-0" />
        </div>
      </div>

      {/* ── DESKTOP RIGHT-EDGE ACCENT (CODE ANIMATE CREATE) ── */}
      <div
        ref={rightTagRef}
        className="hidden lg:flex absolute right-14 xl:right-16 top-48 flex-col items-start gap-1 text-[11px] font-bold tracking-[0.22em] uppercase text-[#2c2a24] select-none z-30 pointer-events-none"
      >
        <span>CODE</span>
        <span>ANIMATE</span>
        <span>CREATE</span>
        <span className="w-6 h-[1.5px] bg-[#1c1b18]/60 mt-1" />
      </div>
    </section>
  );
}
