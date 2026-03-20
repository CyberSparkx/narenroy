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
    const duration = 2600; // ms — matches bar animation

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out curve
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

    // 1. Dots pulse in
    tl.from(dotsRef.current?.querySelectorAll(".dot") ?? [], {
      scale: 0, opacity: 0, duration: 0.4,
      stagger: 0.12, ease: "back.out(2)",
    })

    // 2. Name slides up
    .from(nameRef.current?.querySelectorAll(".char") ?? [], {
      y: 70, opacity: 0, duration: 0.7,
      stagger: 0.04, ease: "power4.out",
    }, "-=0.1")

    // 3. Role fades in
    .from(roleRef.current, {
      opacity: 0, y: 16, duration: 0.5, ease: "power3.out",
    }, "-=0.3")

    // 4. Bar fills
    .to(barRef.current, {
      width: "100%", duration: 2.6, ease: "power2.inOut",
    }, "-=0.4")

    // 5. Hold, then curtain exit
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

    // 6. Curtains split open and fly off
    .to(topCurtainRef.current, {
      y: "-100%", duration: 0.65, ease: "power4.out",
    })
    .to(botCurtainRef.current, {
      y: "100%", duration: 0.65, ease: "power4.out",
    }, "<")

    // 7. Done
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

      {/* Corner dots */}
      <div ref={dotsRef} className="absolute inset-6 pointer-events-none">
        {[
          "top-0 left-0", "top-0 right-0",
          "bottom-0 left-0", "bottom-0 right-0",
        ].map((pos, i) => (
          <div key={i} className={`dot absolute ${pos} w-1.5 h-1.5 rounded-full bg-[#3d8bff]`} />
        ))}
      </div>

      {/* Horizontal rule top */}
      <div
        className="absolute top-12 left-6 right-6 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Main content */}
      <div className="relative z-[5] flex flex-col items-center gap-10 select-none">

        {/* Name */}
        <div
          ref={nameRef}
          className="overflow-hidden flex gap-[0.05em]"
          style={{ fontFamily: "'Syne', sans-serif" }}
          aria-label="Naren Roy"
        >
          {nameChars.map((ch, i) =>
            ch === " "
              ? <span key={i} className="char w-[0.4em]" />
              : (
                <span
                  key={i}
                  className="char font-extrabold text-white"
                  style={{
                    fontSize: "clamp(2.8rem, 8vw, 7rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ch}
                </span>
              )
          )}
        </div>

        {/* Role */}
        <p
          ref={roleRef}
          className="text-white/40 tracking-[0.35em] uppercase text-xs md:text-sm"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Frontend Developer
        </p>

        {/* Progress bar + counter */}
        <div className="flex flex-col items-center gap-3 w-64 md:w-80">

          {/* Counter */}
          <div
            className="self-end text-white/20 text-xs tabular-nums"
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
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full blur-sm"
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

      {/* Bottom rule */}
      <div
        className="absolute bottom-12 left-6 right-6 flex items-center justify-between"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <span className="text-white/20 text-[10px] tracking-widest uppercase">Portfolio 2025</span>
        <span className="text-white/20 text-[10px] tracking-widest uppercase">Siliguri, IN</span>
      </div>
    </div>
  );
}