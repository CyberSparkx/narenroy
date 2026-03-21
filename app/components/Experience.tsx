"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Associate Developer",
    company: "Appycodes Technologies LLP",
    location: "India",
    duration: "Aug 2025 – Feb 2026",
    type: "Full-time",
    tags: ["React Native", "UI/UX", "Mobile"],
    description: [
      "Developed and maintained cross-platform mobile applications using React Native, delivering optimized UI and smooth performance for medical-domain applications.",
      "Designed and implemented a web-based Ad Manager system, improving internal advertisement management and application responsiveness.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Edunet Foundation",
    location: "India",
    duration: "Dec 2024 – Jan 2025",
    type: "Internship",
    tags: ["MERN Stack", "REST APIs", "Full Stack"],
    description: [],
  },
];

export default function Experience() {
  const container = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Heading clip-path reveal
      gsap.from(headingRef.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      // Counter / index labels
      gsap.from(".exp-index", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Cards slide up + fade
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Divider line draw
      gsap.from(".exp-divider", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.2,
        ease: "expo.inOut",
      });

      // Tags pop in
      gsap.from(".exp-tag", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
        },
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "back.out(1.7)",
      });

      // Bullet points stagger
      gsap.from(".exp-bullet", {
        scrollTrigger: {
          trigger: ".exp-card",
          start: "top 60%",
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.3,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full py-28 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #6ee7b7 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #818cf8 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <p className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-semibold mb-6 opacity-80">
          Work History
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-black text-white mb-20 leading-none tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Experience
        </h2>

        {/* Experience cards */}
        <div className="space-y-6">
          {experiences.map((job, index) => (
            <div key={index} className="exp-card group relative">
              {/* Top divider */}
              <div className="exp-divider h-px w-full bg-zinc-800 mb-6" />

              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Index */}
                <div className="exp-index col-span-1 hidden md:block">
                  <span className="text-xs font-mono text-zinc-600 tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                {/* Main content */}
                <div className="col-span-12 md:col-span-8">
                  {/* Role */}
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {job.role}
                  </h3>

                  {/* Company + location */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-zinc-400 font-medium text-base">
                      {job.company}
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-zinc-600 text-sm">{job.location}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="exp-tag inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-zinc-700 text-zinc-400 bg-zinc-900 hover:border-emerald-500 hover:text-emerald-400 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bullet descriptions */}
                  {job.description.length > 0 && (
                    <ul className="space-y-3">
                      {job.description.map((desc, i) => (
                        <li
                          key={i}
                          className="exp-bullet flex items-start gap-3 text-zinc-500 text-sm leading-relaxed"
                        >
                          <span className="mt-[6px] w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right meta */}
                <div className="col-span-12 md:col-span-3 md:text-right flex md:flex-col gap-3 md:gap-2 items-start md:items-end">
                  <span className="text-sm font-mono text-zinc-500 whitespace-nowrap">
                    {job.duration}
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                      job.type === "Full-time"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Hover accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out rounded-full" />
            </div>
          ))}

          {/* Bottom divider */}
          <div className="exp-divider h-px w-full bg-zinc-800 mt-6" />
        </div>

        {/* Footer note */}
        <p className="mt-10 text-zinc-700 text-xs font-mono tracking-widest uppercase">
          Currently open to new opportunities →
        </p>
      </div>

      {/* Google Fonts preload */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}