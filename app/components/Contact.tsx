"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Mail, MapPin, Github, Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "GitHub",    handle: "@CyberSparkx",      url: "https://github.com/CyberSparkx",               Icon: Github    },
  { label: "LinkedIn",  handle: "naren-roy",          url: "https://linkedin.com/in/naren-roy-4390a6238/", Icon: Linkedin  },
  { label: "Instagram", handle: "@iamnarenroy",       url: "https://instagram.com/iamnarenroy/",           Icon: Instagram },
  { label: "Twitter",   handle: "@NarenRo26790356",   url: "https://x.com/NarenRo26790356",               Icon: Twitter   },
];

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [sent,    setSent]    = useState(false);

  useGSAP(() => {
    gsap.from(".contact-heading", {
      scrollTrigger: { trigger: ".contact-heading", start: "top 85%" },
      clipPath: "inset(0 100% 0 0)",
      opacity: 0, duration: 1.1, ease: "expo.out",
    });

    gsap.from(".contact-left > *", {
      scrollTrigger: { trigger: ".contact-left", start: "top 80%" },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });

    gsap.from(".contact-form", {
      scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
      y: 60, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2,
    });

    gsap.from(".form-field", {
      scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      y: 25, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4,
    });

    gsap.from(".deco-word", {
      scrollTrigger: { trigger: ".deco-text-wrap", start: "top 92%" },
      y: 80, opacity: 0, duration: 1.3, stagger: 0.18, ease: "expo.out",
    });
  }, { scope: container });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    gsap.from(".sent-msg", { y: 10, opacity: 0, duration: 0.5, ease: "back.out(2)" });
  };

  return (
    <section ref={container} className="relative w-full bg-[#0a0a0a] overflow-hidden pt-20 md:pt-28 pb-0">

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute top-20 left-0 w-[500px] h-[500px] opacity-[0.04] rounded-full"
        style={{ background: "radial-gradient(circle, #34d399 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute top-40 right-0 w-[400px] h-[400px] opacity-[0.03] rounded-full"
        style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">

        <p className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-semibold mb-5 opacity-80">
          Get In Touch
        </p>

        <h2
          className="contact-heading text-5xl sm:text-6xl md:text-7xl font-black text-white mb-12 md:mb-20 leading-none tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Let's Talk
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* ── Left ── */}
          <div className="contact-left flex flex-col gap-8">
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-sm">
              Interested in working together, have a project in mind, or just want to say hi? My inbox is always open.
            </p>

            <div className="space-y-3">
              <a href="mailto:narensarkar607@gmail.com"
                className="group flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300">
                  <Mail size={16} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </span>
                <span className="font-mono text-xs sm:text-sm break-all">narensarkar607@gmail.com</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>

              <div className="flex items-center gap-4 text-zinc-400">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <MapPin size={16} className="text-zinc-400" />
                </span>
                <span className="font-mono text-xs sm:text-sm">Siliguri, West Bengal, India</span>
              </div>
            </div>

            <div className="h-px bg-zinc-800 w-full" />

            {/* Socials — no animation, always visible */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-4">
                Find me on
              </p>

              <div className="space-y-1">
                {socials.map(({ label, handle, url, Icon }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-zinc-800 hover:border-zinc-700 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Icon size={15} className="text-zinc-400 group-hover:text-white transition-colors duration-300 shrink-0" />
                      <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-300">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 hidden sm:block">
                        {handle}
                      </span>
                      <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="contact-form">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div aria-hidden className="absolute top-0 right-0 w-32 h-32 opacity-20"
                style={{ background: "radial-gradient(circle at top right, #34d399, transparent 70%)" }} />

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "name",  label: "Name",  type: "text",  placeholder: "Your name"      },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id} className="form-field">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">{label}</label>
                      <input type={type} required placeholder={placeholder}
                        onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/60 border text-white text-sm placeholder-zinc-600 outline-none transition-all duration-300"
                        style={{
                          borderColor: focused === id ? "#34d399" : "#27272a",
                          boxShadow:   focused === id ? "0 0 0 3px #34d39918" : "none",
                        }}
                      />
                    </div>
                  ))}

                  <div className="form-field">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                    <textarea rows={5} required placeholder="Hello Naren, I'd like to..."
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/60 border text-white text-sm placeholder-zinc-600 outline-none transition-all duration-300 resize-none"
                      style={{
                        borderColor: focused === "message" ? "#34d399" : "#27272a",
                        boxShadow:   focused === "message" ? "0 0 0 3px #34d39918" : "none",
                      }}
                    />
                  </div>

                  <div className="form-field">
                    <button type="submit"
                      className="group w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase text-black transition-all duration-300 flex items-center justify-center gap-2"
                      style={{ background: "#34d399" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#6ee7b7")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#34d399")}
                    >
                      Send Message
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="sent-msg flex flex-col items-center justify-center py-20 gap-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Mail size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setSent(false)}
                    className="text-xs font-mono text-zinc-500 hover:text-white transition-colors mt-2 underline underline-offset-4">
                    Send another
                  </button>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 mt-5 px-1">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <p className="text-xs font-mono text-zinc-500">Currently open to new opportunities</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Big decorative NAREN ROY ── */}
      <div className="deco-text-wrap relative mt-20 md:mt-28 w-full overflow-hidden select-none pointer-events-none">
        <div aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #34d399, transparent)", filter: "blur(1px)", opacity: 0.4 }} />
        <div aria-hidden
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "30%", background: "radial-gradient(ellipse 80% 100% at 50% 100%, #34d39928 0%, transparent 70%)", filter: "blur(20px)" }} />

        <div className="flex items-end justify-center gap-[1.5vw] px-[0.5vw] pb-0">
          {["NAREN", "ROY"].map((word) => (
            <span
              key={word}
              className="deco-word block font-black leading-[0.85] tracking-tighter"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1rem, 10.5vw, 10rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px #2a2a2a",
                filter: "drop-shadow(0 0 18px #34d39930) drop-shadow(0 0 60px #34d39918)",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </section>
  );
}
