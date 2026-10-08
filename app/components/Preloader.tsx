"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const counterBoxRef = useRef<HTMLDivElement>(null);

  /* ── Counter Animation ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Counter begins once phase 2 reveals (~1.9s)
    const startDelay = 1900;
    const duration = 1450;
    let startTs: number | null = null;
    let animId: number;

    const timeoutId = setTimeout(() => {
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2.5);
        setCounter(Math.floor(eased * 100));

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        }
      };
      animId = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
      document.body.style.overflow = "";
    };
  }, []);

  /* ── GSAP Timeline: Phase 1 (Namaste) -> Phase 2 (Counter) -> 5-Column Curtain Reveal ── */
  useGSAP(
    () => {
      const tl = gsap.timeline();
      const columns = columnsRef.current?.children ?? [];

      // Initial clean state
      gsap.set(greetingRef.current, { opacity: 0, y: 15, display: "flex" });
      gsap.set(counterBoxRef.current, { opacity: 0, y: 15, display: "none" });
      gsap.set(columns, { yPercent: 0 });

      // Phase 1: Fade in नमस्ते / NAMASTE
      tl.to(greetingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      })
        // Hold on Namaste for 0.9s
        .to({}, { duration: 0.9 })
        // Fade out Namaste
        .to(greetingRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            if (greetingRef.current) greetingRef.current.style.display = "none";
            if (counterBoxRef.current) counterBoxRef.current.style.display = "flex";
          },
        })
        // Phase 2: Fade in Counter & Tagline
        .to(counterBoxRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        })
        // Hold for counter completion (0 -> 100%)
        .to({}, { duration: 1.5 })
        // Fade out Counter
        .to(counterBoxRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.35,
          ease: "power2.in",
        })
        // Phase 3: Staggered 5-Column upward curtain lift
        .to(
          columns,
          {
            yPercent: -100,
            duration: 0.95,
            stagger: 0.08,
            ease: "power4.inOut",
          },
          "-=0.1"
        )
        // Complete & unlock scrolling
        .call(() => {
          setDone(true);
          document.body.style.overflow = "";
        });
    },
    { scope: containerRef }
  );

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] overflow-hidden select-none pointer-events-none"
    >
      {/* ── Google Fonts injection ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        .preloader-devanagari {
          font-family: 'Noto Serif Devanagari', 'Mangal', serif;
        }

        .preloader-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .preloader-paper-grain {
          background-image: radial-gradient(rgba(0,0,0,0.035) 1px, transparent 0);
          background-size: 4px 4px;
        }
      `}</style>

      {/* ── 5 VERTICAL COLUMNS BACKGROUND ── */}
      <div
        ref={columnsRef}
        className="absolute inset-0 flex w-full h-full pointer-events-none"
      >
        {[0, 1, 2, 3, 4].map((colIndex) => (
          <div
            key={colIndex}
            className="w-1/5 h-full relative bg-[#F4F0E8] border-r border-[#1c1b18]/[0.06] last:border-r-0 will-change-transform"
          >
            <div className="preloader-paper-grain absolute inset-0 opacity-70" />
          </div>
        ))}
      </div>

      {/* ── CENTER CONTENT CONTAINER ── */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 pointer-events-none">
        
        {/* PHASE 1: नमस्ते / NAMASTE */}
        <div
          ref={greetingRef}
          style={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center will-change-transform"
        >
          <span
            className="preloader-devanagari text-4xl sm:text-5xl md:text-6xl font-normal text-[#1c1b18] tracking-normal mb-2 block"
            aria-hidden="true"
          >
            नमस्ते
          </span>
          <p
            className="preloader-serif text-xs sm:text-sm md:text-base font-semibold tracking-[0.42em] uppercase text-[#a86e3b] ml-1.5"
            aria-hidden="true"
          >
            NAMASTE
          </p>
        </div>

        {/* PHASE 2: {counter}% / DESIGNED. CODED. LOVED. BY NAREN ROY. */}
        <div
          ref={counterBoxRef}
          style={{ opacity: 0, display: "none" }}
          className="flex flex-col items-center justify-center text-center will-change-transform"
        >
          <div className="preloader-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#a86e3b] tracking-wider mb-2.5 tabular-nums">
            {counter}%
          </div>
          <p className="text-[10px] sm:text-xs md:text-[13px] font-mono sm:font-sans font-medium tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#2b2823] flex items-center flex-wrap justify-center gap-x-2 gap-y-1">
            <span>DESIGNED. CODED. LOVED. BY</span>
            <span className="text-[#a86e3b] underline underline-offset-4 decoration-[#a86e3b]/60 font-semibold">
              NAREN ROY.
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}