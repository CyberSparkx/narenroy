"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Phone, Mail, Linkedin, Github, Check, FileText } from "lucide-react";
import PixelShaderCanvas from "./PixelShaderCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopArtRef = useRef<HTMLDivElement>(null);
  const tabletArtRef = useRef<HTMLDivElement>(null);
  const mobileArtRef = useRef<HTMLDivElement>(null);
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

      const targets = [
        desktopArtRef.current,
        tabletArtRef.current,
        mobileArtRef.current,
      ].filter(Boolean);

      // 1. Entrance animation for artwork
      if (targets.length > 0) {
        tl.fromTo(
          targets,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
        );
      }

      // 2. Navigation header
      tl.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.7"
      )
        // 3. Eyebrow
        .fromTo(
          eyebrowRef.current,
          { x: -25, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        // 4. Headline
        .fromTo(
          headlineRef.current,
          { x: -25, opacity: 0, filter: "blur(6px)" },
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
          [scrollRef.current, rightTagRef.current, locationRef.current].filter(Boolean),
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
      className="relative w-full min-h-[100dvh] md:h-screen md:min-h-[660px] flex flex-col justify-between overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none"
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

        /* ── Tablet Portrait Viewports Only (768px to 1023px, portrait) ── */
        @media (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
          .hero-main-row {
            flex-direction: column !important;
            justify-content: center !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
            gap: 1.5rem !important;
          }
          .hero-left-col {
            width: 100% !important;
            max-width: 580px !important;
          }
          .hero-headline-img {
            width: 440px !important;
          }
          .hero-portrait-art {
            display: block !important;
            width: 100% !important;
            max-width: 540px !important;
            height: auto !important;
            aspect-ratio: 16 / 11 !important;
            margin: 1.25rem auto !important;
          }
          .hero-right-col {
            display: none !important;
          }
          .hero-contact-bar {
            font-size: 13px !important;
            gap: 1rem !important;
            margin-bottom: 1.25rem !important;
          }
        }
      `}</style>

      {/* ── Copy Notification Toast ── */}
      {copiedText && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1b18] text-[#E6E2D7] text-xs font-semibold shadow-2xl border border-white/10 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-[#f5be0b]" />
          <span>{copiedText} copied to clipboard!</span>
        </div>
      )}

      {/* ── Paper texture grain overlay (entire fold) ── */}
      <div className="absolute inset-0 w-full h-full paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── TOP NAVIGATION ── */}
      <header
        ref={navRef}
        className="relative z-30 w-full px-4 sm:px-8 md:px-10 lg:px-16 pt-5 sm:pt-6 md:pt-7 flex items-center justify-between shrink-0"
      >
        {/* Brand / Name */}
        <a
          href="#home"
          className="group flex items-center gap-2 sm:gap-2.5 text-[#1b1a17] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
          aria-label="Naren Roy — Return to top"
        >
          <span className="text-xs sm:text-sm font-black tracking-[0.16em] sm:tracking-[0.22em] uppercase">
            NAREN ROY
          </span>
          <span className="inline-block w-6 sm:w-10 h-[1.5px] bg-[#1b1a17]/70 group-hover:w-14 transition-all duration-300" />
        </a>

        {/* Nav Links */}
        <nav aria-label="Hero navigation" className="flex items-center gap-2.5 sm:gap-5 md:gap-7 lg:gap-9">
          {[
            { label: "about", href: "#about" },
            { label: "projects", href: "#projects" },
            { label: "skills", href: "#skills" },
            { label: "contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] sm:text-xs md:text-[13px] font-medium tracking-wide text-[#2e2c26] hover:text-black transition-colors relative py-1 group cursor-pointer"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-200" />
            </a>
          ))}

          {/* Download Resume Button */}
          <a
            href="/Naren_Roy_Resume.pdf"
            download="Naren_Roy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#1b1a17]/30 hover:border-black text-[10px] sm:text-xs md:text-[13px] font-semibold text-[#1b1a17] hover:bg-[#1b1a17] hover:text-[#E6E2D7] transition-all duration-200 shadow-sm cursor-pointer group shrink-0"
            title="Download Resume (PDF)"
          >
            <FileText className="w-3 sm:w-3.5 h-3 sm:h-3.5 opacity-80 group-hover:opacity-100 transition-opacity shrink-0" />
            <span>resume</span>
          </a>
        </nav>
      </header>

      {/* ── DESKTOP FULL-BLEED ARTWORK WITH INTERACTIVE WEBGL SHADER (Desktop Only: lg:block) ── */}
      <div className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          ref={desktopArtRef}
          className="absolute inset-0 w-full h-full pointer-events-auto z-10"
        >
          <PixelShaderCanvas
            bgSrc="/bg.png"
            meSrc="/me.png"
          />
        </div>
      </div>

      {/* ── MAIN CONTENT (LEFT COLUMN ON DESKTOP, VERTICAL FLOW ON TABLET & MOBILE) ── */}
      <div className="hero-main-row relative z-30 w-full flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-10 lg:px-16 py-3 md:py-4 lg:py-6 my-auto pointer-events-none">
        
        {/* ── TYPOGRAPHY, BIO & CONTACT DETAILS ── */}
        <div className="hero-left-col w-full max-w-xl lg:max-w-2xl flex flex-col justify-center pointer-events-auto shrink-0">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 md:mb-3">
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-[#47443c]">
              FULL STACK SOFTWARE DEVELOPER
            </span>
          </div>

          {/* Main Display Headline (Authentic Brushed Ink Typography with full 'y' descender) */}
          <div ref={headlineRef} className="mb-2 sm:mb-3 md:mb-4 lg:mb-5">
            <h1 className="sr-only">Naren Roy — Full Stack Software Developer</h1>

            <div className="relative inline-block select-none">
              <img
                src="/naren-roy-title.png"
                alt="Naren Roy"
                className="hero-headline-img w-[210px] xs:w-[250px] sm:w-[320px] md:w-[440px] lg:w-[490px] h-auto object-contain select-none pointer-events-none mix-blend-multiply"
              />
            </div>
          </div>

          {/* ── MOBILE & TABLET ARTWORK SHOWCASE (Hidden on Desktop: lg:hidden) ── */}
          <div
            ref={mobileArtRef}
            className="hero-portrait-art lg:hidden relative w-full max-w-[290px] sm:max-w-[340px] md:max-w-[540px] aspect-[4/3] md:aspect-[16/11] mx-auto my-2.5 sm:my-4 md:my-6 overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/bg.png"
                alt="Yellow energy art"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center select-none"
              />
            </div>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/me.png"
                alt="Naren Roy Portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center select-none"
              />
            </div>
          </div>

          {/* Contact Bar */}
          <div
            ref={contactRef}
            className="hero-contact-bar flex flex-wrap items-center gap-x-2.5 gap-y-1.5 sm:gap-x-3 text-[11px] sm:text-xs md:text-[13px] text-[#2b2923] font-medium mb-3 sm:mb-4 md:mb-5 lg:mb-6"
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
              <Phone className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">+91 7864066694</span>
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
              <Mail className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">narensarkar607@gmail.com</span>
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
            className="flex items-stretch gap-2.5 sm:gap-3 max-w-sm sm:max-w-md lg:max-w-lg select-text"
          >
            {/* Yellow Accent Bar */}
            <div className="w-[3px] rounded-full bg-[#f3b413] shrink-0" />
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-[14px] leading-relaxed text-[#35332c] font-normal">
              I build interactive web and mobile experiences
              <br className="hidden sm:inline" /> with a focus on modern frontend, GSAP animations,
              <br className="hidden sm:inline" /> WebGL and immersive digital experiences.
            </p>
          </div>
        </div>

      </div>

      {/* ── FOOTER / FOLD ACCENTS ── */}
      <footer className="relative z-30 w-full px-4 sm:px-8 md:px-10 lg:px-16 pb-4 sm:pb-5 md:pb-6 flex items-end justify-between shrink-0">
        {/* Bottom Left: Scroll To Explore */}
        <a
          ref={scrollRef}
          href="#about"
          className="group flex flex-col items-start gap-1 cursor-pointer pointer-events-auto"
          aria-label="Scroll down to explore about section"
        >
          <div
            ref={scrollLineRef}
            className="w-[1.5px] h-5 sm:h-6 bg-[#1c1b18]/70 group-hover:bg-[#f3b413] group-hover:h-8 transition-all duration-300 origin-top"
          />
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#47443c] group-hover:text-black transition-colors leading-tight">
            SCROLL
            <br />
            TO EXPLORE
          </div>
        </a>

        {/* Bottom Right: Siliguri, India */}
        <div
          ref={locationRef}
          className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#1c1b18] md:text-[#f8f5ee] pointer-events-auto"
        >
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#f5be0b] shadow-[0_0_8px_#f5be0b] shrink-0" />
          <span>SILIGURI, INDIA</span>
          <span className="w-5 sm:w-7 md:w-10 h-[1.5px] bg-current opacity-60 shrink-0" />
        </div>
      </footer>

      {/* ── ULTRA-WIDE DESKTOP RIGHT-EDGE ACCENT (CODE ANIMATE CREATE) ── */}
      <div
        ref={rightTagRef}
        className="hidden 2xl:flex absolute right-10 top-48 flex-col items-start gap-1 text-[11px] font-bold tracking-[0.22em] uppercase text-[#2c2a24] select-none z-30 pointer-events-none"
      >
        <span>CODE</span>
        <span>ANIMATE</span>
        <span>CREATE</span>
        <span className="w-6 h-[1.5px] bg-[#1c1b18]/60 mt-1" />
      </div>
    </section>
  );
}
