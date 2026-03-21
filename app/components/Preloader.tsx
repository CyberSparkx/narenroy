"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading]     = useState(true);
  const [counter, setCounter]     = useState(0);
  const [done, setDone]           = useState(false);

  const containerRef  = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const botCurtainRef = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLDivElement>(null);
  const roleRef       = useRef<HTMLDivElement>(null);
  const barRef        = useRef<HTMLDivElement>(null);
  const numRef        = useRef<HTMLSpanElement>(null);
  const dotsRef       = useRef<HTMLDivElement>(null);

  /* ── Animated counter 0 → 100 ── */
  useEffect(() => {
    if (!loading) return;
    let start: number | null = null;
    const duration = 2600;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.floor(eased * 100));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [loading]);

  /* ── GSAP sequence ── */
  useGSAP(() => {
    if (!loading) return;

    const tl = gsap.timeline();

    tl.from(dotsRef.current?.querySelectorAll(".dot") ?? [], {
      scale: 0, opacity: 0, duration: 0.4,
      stagger: 0.12, ease: "back.out(2)",
    })

    .from(nameRef.current?.querySelectorAll(".char") ?? [], {
      y: 70, opacity: 0, duration: 0.7,
      stagger: 0.04, ease: "power4.out",
    }, "-=0.1")

    .from(roleRef.current, {
      opacity: 0, y: 16, duration: 0.5, ease: "power3.out",
    }, "-=0.3")

    .to(barRef.current, {
      width: "100%", duration: 2.6, ease: "power2.inOut",
    }, "-=0.4")

    .to({}, { duration: 0.4 })

    .to([topCurtainRef.current, botCurtainRef.current], {
      scaleY: 1, duration: 0.55, ease: "power4.in", stagger: 0,
    })

    .to(nameRef.current, {
      opacity: 0, y: -30, duration: 0.3, ease: "power3.in",
    }, "<")

    .to(roleRef.current, {
      opacity: 0, duration: 0.2,
    }, "<")

    .to(topCurtainRef.current, {
      y: "-100%", duration: 0.65, ease: "power4.out",
    })
    .to(botCurtainRef.current, {
      y: "100%", duration: 0.65, ease: "power4.out",
    }, "<")

    .call(() => setDone(true));

  }, { dependencies: [] });

  if (done) return null;

  const nameChars = "NAREN ROY".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');

        .pre-grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
          z-index: 1;
        }

        .curtain-top {
          transform-origin: top center;
          transform: scaleY(0);
        }
        .curtain-bot {
          transform-origin: bottom center;
          transform: scaleY(0);
        }

        /* Responsive name font size — clamp handles everything */
        .preloader-name-char {
          font-size: clamp(2rem, 10vw, 7rem);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* Prevent layout blowout on very small screens */
        @media (max-width: 360px) {
          .preloader-name-char {
            font-size: clamp(1.6rem, 11vw, 2.4rem);
          }
        }

        /* Ensure bottom bar doesn't overlap on short screens */
        @media (max-height: 480px) {
          .preloader-bottom-bar {
            bottom: 6px !important;
          }
          .preloader-top-rule {
            top: 6px !important;
          }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="pre-grain absolute inset-0 pointer-events-none" />

      {/* Top curtain */}
      <div
        ref={topCurtainRef}
        className="curtain-top absolute top-0 left-0 right-0 h-1/2 z-10"
        style={{ background: "#3d8bff" }}
      />
      {/* Bottom curtain */}
      <div
        ref={botCurtainRef}
        className="curtain-bot absolute bottom-0 left-0 right-0 h-1/2 z-10"
        style={{ background: "#3d8bff" }}
      />

      {/* Corner dots — use safe inset so they don't clip on tiny screens */}
      <div ref={dotsRef} className="absolute inset-3 sm:inset-6 pointer-events-none">
        {[
          "top-0 left-0", "top-0 right-0",
          "bottom-0 left-0", "bottom-0 right-0",
        ].map((pos, i) => (
          <div
            key={i}
            className={`dot absolute ${pos} w-1.5 h-1.5 rounded-full bg-[#3d8bff]`}
          />
        ))}
      </div>

      {/* Horizontal rule top */}
      <div
        className="preloader-top-rule absolute top-10 sm:top-12 left-4 sm:left-6 right-4 sm:right-6 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Main content */}
      <div className="relative z-[5] flex flex-col items-center gap-6 sm:gap-10 select-none px-4 w-full max-w-[90vw] sm:max-w-none">

        {/* Name */}
        <div
          ref={nameRef}
          className="overflow-hidden flex flex-wrap justify-center gap-[0.05em]"
          style={{ fontFamily: "'Syne', sans-serif" }}
          aria-label="Naren Roy"
        >
          {nameChars.map((ch, i) =>
            ch === " "
              ? <span key={i} className="char w-[0.3em] sm:w-[0.4em]" />
              : (
                <span
                  key={i}
                  className="char preloader-name-char text-[0.01rem] md:text-[3rem] font-bold "
                >
                  {ch}
                </span>
              )
          )}
        </div>

        {/* Role */}
        <p
          ref={roleRef}
          className="text-white/40 tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[10px] sm:text-xs md:text-sm text-center"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Frontend Developer
        </p>

        {/* Progress bar + counter */}
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-[min(80vw,20rem)]">

          {/* Counter */}
          <div
            className="self-end text-white/20 text-[10px] sm:text-xs tabular-nums"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span ref={numRef}>{String(counter).padStart(3, "0")}</span>
            <span className="text-[#3d8bff]">%</span>
          </div>

          {/* Track */}
          <div
            className="relative w-full h-px overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {/* Fill */}
            <div
              ref={barRef}
              className="absolute left-0 top-0 h-full w-0 rounded-full"
              style={{ background: "#3d8bff" }}
            />
            {/* Glow */}
            <div
              className="absolute top-1/2 w-3 h-3 rounded-full blur-sm"
              style={{
                background: "#3d8bff",
                left: `${counter}%`,
                transform: "translateX(-50%) translateY(-50%)",
                transition: "left 0.08s linear",
                opacity: counter > 0 && counter < 100 ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom rule + labels */}
      <div
        className="preloader-bottom-bar absolute bottom-8 sm:bottom-12 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between gap-2"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <span className="text-white/20 text-[9px] sm:text-[10px] tracking-widest uppercase truncate">
          Portfolio 2025
        </span>
        <span className="text-white/20 text-[9px] sm:text-[10px] tracking-widest uppercase truncate text-right">
          Siliguri, IN
        </span>
      </div>
    </div>
  );
}