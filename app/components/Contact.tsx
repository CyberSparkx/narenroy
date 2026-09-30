"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ArrowUpRight,
  Check,
  Send,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@CyberSparkx",
    url: "https://github.com/CyberSparkx",
    Icon: Github,
    tag: "Open Source Codebases",
  },
  {
    label: "LinkedIn",
    handle: "naren-roy-4390a6238",
    url: "https://www.linkedin.com/in/naren-roy-4390a6238/",
    Icon: Linkedin,
    tag: "Professional Network",
  },
  {
    label: "Twitter / X",
    handle: "@NarenRo26790356",
    url: "https://x.com/NarenRo26790356",
    Icon: Twitter,
    tag: "Tech Thoughts & Motion",
  },
  {
    label: "Instagram",
    handle: "@iamnarenroy",
    url: "https://instagram.com/iamnarenroy/",
    Icon: Instagram,
    tag: "Personal & Design Life",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct mailto link fallback for instant connection
    const mailtoUrl = `mailto:narensarkar607@gmail.com?subject=${encodeURIComponent(
      formState.subject || `Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      window.location.href = mailtoUrl;
    }, 600);
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Line expansion
      tl.fromTo(
        ".contact-rule",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" }
      )
        // 2. Section tag
        .fromTo(
          ".contact-tag",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.5"
        )
        // 3. Headline & paragraph
        .fromTo(
          headlineRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.3"
        )
        .fromTo(
          ".contact-desc",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        // 4. Dossier columns stagger
        .fromTo(
          ".contact-col",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: "power2.out" },
          "-=0.3"
        )
        // 5. Watermark reveal
        .fromTo(
          ".contact-watermark",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#E6E2D7] text-[#1c1b18] select-none pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20"
      style={{
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Custom Styling & Grain Injections ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

        .contact-paper-grain {
          background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 0);
          background-size: 4px 4px;
        }

        .gold-ink-highlight {
          position: relative;
          display: inline-block;
          color: #1c1b18;
        }

        .gold-ink-highlight::before {
          content: "";
          position: absolute;
          left: -4px;
          right: -4px;
          bottom: 4px;
          height: 32%;
          background: rgba(245, 190, 11, 0.45);
          transform: rotate(-1.2deg);
          z-index: -1;
          border-radius: 2px;
          pointer-events: none;
        }

        .contact-watermark-text {
          font-family: 'Syne', sans-serif;
          color: rgba(28, 27, 24, 0.08);
          letter-spacing: -0.04em;
          user-select: none;
          transition: color 0.3s ease;
        }

        .contact-watermark-text:hover {
          color: rgba(28, 27, 24, 0.15);
        }
      `}</style>

      {/* ── Toast notification on copy ── */}
      {copiedText && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1b18] text-[#E6E2D7] text-xs font-semibold shadow-2xl border border-white/10 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-[#f5be0b]" />
          <span>{copiedText} copied to clipboard!</span>
        </div>
      )}

      {/* ── Texture Overlay ── */}
      <div className="absolute inset-0 w-full h-full contact-paper-grain opacity-25 mix-blend-multiply pointer-events-none z-10" />

      {/* ── Atmospheric Ambient Golden Glow (Painterly Depth) ── */}
      <div
        className="absolute top-1/4 right-10 w-[550px] h-[550px] opacity-15 pointer-events-none -mr-32 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[450px] opacity-15 pointer-events-none -ml-32 z-0"
        style={{
          background: "radial-gradient(circle, #f5be0b 0%, rgba(245,190,11,0.05) 60%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ── SECTION HEADER & EYEBROW ── */}
        <div className="flex flex-col gap-3 mb-12 sm:mb-16 md:mb-20">
          <div className="contact-tag flex items-center gap-3">
            <span className="contact-rule w-8 sm:w-12 h-[1.5px] bg-[#1c1b18]/70" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#47443c]">
              05 // DISPATCH — GET IN TOUCH
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              ref={headlineRef}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#1c1b18] leading-[1.12] max-w-3xl"
            >
              Let’s build something{" "}
              <span className="gold-ink-highlight">exceptional.</span>
            </h2>

            <p className="contact-desc text-sm sm:text-[15px] text-[#47443c] max-w-md leading-relaxed font-normal">
              Whether you need a bespoke freelance web application, 60fps kinetic motion architecture, or want to discuss full-stack engineering, my dispatch lines are open.
            </p>
          </div>
        </div>

        {/* ── TWO-COLUMN EDITORIAL COMMUNICATION SPREAD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">
          
          {/* ── LEFT COLUMN: DIRECT CHANNELS & SOCIAL DIRECTORY (lg:col-span-5) ── */}
          <div className="contact-col lg:col-span-5 flex flex-col gap-6">
            
            {/* Primary Action Card: Direct Email Plaque */}
            <div className="bg-[#FAF8F3] border border-[#1c1b18]/12 rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-sm hover:border-[#f5be0b] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8475] font-bold">
                  DIRECT TRANSMISSION
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#16a34a] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  INBOX OPEN
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#666052] font-medium">Email Address:</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:narensarkar607@gmail.com"
                    className="text-base sm:text-lg font-black text-[#1c1b18] hover:text-[#b45309] transition-colors break-all cursor-pointer font-mono"
                  >
                    narensarkar607@gmail.com
                  </a>
                  <button
                    onClick={() => handleCopy("narensarkar607@gmail.com", "Email address")}
                    className="p-2 rounded-lg bg-[#EAE6DC] hover:bg-[#1c1b18] hover:text-[#E6E2D7] text-[#1c1b18] transition-all shrink-0 cursor-pointer"
                    title="Copy Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="h-px bg-[#1c1b18]/8 w-full" />

              {/* Phone Channel */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E6E2D7] flex items-center justify-center text-[#1c1b18]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8a8475] block uppercase">Direct Dial</span>
                    <a
                      href="tel:+917864066694"
                      className="text-xs sm:text-sm font-bold text-[#1c1b18] hover:text-[#b45309] transition-colors font-mono"
                    >
                      +91 7864066694
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy("+91 7864066694", "Phone number")}
                  className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-[#EAE6DC] hover:bg-[#1c1b18] hover:text-[#E6E2D7] transition-all cursor-pointer"
                >
                  Copy
                </button>
              </div>

              {/* Geographic Coordinates */}
              <div className="flex items-center gap-3 pt-1 text-xs text-[#5c574c]">
                <MapPin className="w-3.5 h-3.5 text-[#8a8475] shrink-0" />
                <span>Siliguri, West Bengal, India (IST / UTC+5:30)</span>
              </div>
            </div>

            {/* Social Directory Ledger */}
            <div className="bg-[#FAF8F3] border border-[#1c1b18]/12 rounded-2xl p-6 sm:p-7 shadow-sm">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8a8475] font-bold block mb-4">
                DIGITAL ECOSYSTEM & PROFILES
              </span>

              <div className="flex flex-col divide-y divide-[#1c1b18]/8">
                {SOCIAL_LINKS.map(({ label, handle, url, Icon, tag }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 sm:py-3.5 flex items-center justify-between group cursor-pointer hover:pl-1 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAE6DC] group-hover:bg-[#f5be0b] group-hover:text-black flex items-center justify-center text-[#1c1b18] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#1c1b18] group-hover:text-[#b45309] transition-colors block">
                          {label}
                        </span>
                        <span className="text-[11px] text-[#787265] font-mono block">
                          {tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#8a8475] hidden sm:block">
                        {handle}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#8a8475] group-hover:text-[#b45309] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Resume Download Action */}
              <div className="mt-5 pt-4 border-t border-[#1c1b18]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#b45309]" />
                  <span className="text-xs font-bold text-[#1c1b18]">Official Curriculum Vitae</span>
                </div>
                <a
                  href="/Naren_Roy_Resume.pdf"
                  download="Naren_Roy_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full border border-[#1c1b18]/25 hover:border-black text-[11px] font-bold text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#E6E2D7] transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Download PDF</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: BESPOKE CONTACT DOSSIER FORM (lg:col-span-7) ── */}
          <div className="contact-col lg:col-span-7 bg-[#FAF8F3] border border-[#1c1b18]/12 rounded-3xl p-7 sm:p-10 md:p-12 shadow-sm relative overflow-hidden">
            
            {/* Subtle Top Accent Ribbon */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1b18]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f5be0b]" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#1c1b18]">
                  PROJECT INQUIRY & COLLABORATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8a8475] uppercase">
                DIRECT TO DISPATCH
              </span>
            </div>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c574c]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#EAE6DC]/70 border border-[#1c1b18]/12 text-[#1c1b18] text-sm placeholder-[#9c9588] outline-none focus:border-[#f5be0b] focus:ring-2 focus:ring-[#f5be0b]/20 transition-all font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c574c]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#EAE6DC]/70 border border-[#1c1b18]/12 text-[#1c1b18] text-sm placeholder-[#9c9588] outline-none focus:border-[#f5be0b] focus:ring-2 focus:ring-[#f5be0b]/20 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Row 2: Subject / Scope */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c574c]">
                    Project Subject / Scope *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Freelance Web Application / GSAP Motion / Full Stack Build"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#EAE6DC]/70 border border-[#1c1b18]/12 text-[#1c1b18] text-sm placeholder-[#9c9588] outline-none focus:border-[#f5be0b] focus:ring-2 focus:ring-[#f5be0b]/20 transition-all font-sans"
                  />
                </div>

                {/* Row 3: Message Body */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c574c]">
                    Message & Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, timeline, deliverables, and vision..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#EAE6DC]/70 border border-[#1c1b18]/12 text-[#1c1b18] text-sm placeholder-[#9c9588] outline-none focus:border-[#f5be0b] focus:ring-2 focus:ring-[#f5be0b]/20 transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-4 rounded-xl font-bold text-xs sm:text-sm tracking-widest uppercase bg-[#1c1b18] text-[#E6E2D7] hover:bg-[#b45309] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
                >
                  <Send className="w-4 h-4 text-[#f5be0b] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{isSubmitting ? "Dispatching Message..." : "Send Dispatch Message"}</span>
                </button>

                <p className="text-[11px] font-mono text-[#787265] text-center mt-1">
                  Expected response turnaround: within 24 hours (IST / UTC+5:30)
                </p>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#16a34a]/15 border border-[#16a34a]/30 flex items-center justify-center text-[#16a34a]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1c1b18]">
                  Dispatch Prepared!
                </h3>
                <p className="text-sm text-[#47443c] max-w-sm leading-relaxed">
                  Your mail client has been opened with your inquiry. I will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-mono font-bold text-[#1c1b18] hover:text-[#b45309] underline underline-offset-4 cursor-pointer"
                >
                  Draft Another Message
                </button>
              </div>
            )}

            {/* Live Availability Badge */}
            <div className="mt-8 pt-5 border-t border-[#1c1b18]/10 flex items-center gap-2.5 text-xs font-mono text-[#5c574c]">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
              <span className="font-semibold text-[#1c1b18]">CURRENT AVAILABILITY:</span>
              <span>Open for selective freelance contracts & innovative remote engineering.</span>
            </div>

          </div>

        </div>

        {/* ── MONUMENTAL BRAND WATERMARK & RETURN NAVIGATION ── */}
        <div className="contact-watermark relative mt-16 sm:mt-24 pt-10 border-t border-[#1c1b18]/12 w-full flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-5xl mx-auto px-4 select-none flex flex-col items-center">
            <svg
              viewBox="0 0 1360 150"
              className="w-full h-auto max-h-[140px] select-none pointer-events-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="NAREN ROY"
            >
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="'Syne', 'Plus Jakarta Sans', sans-serif"
                fontWeight="900"
                fontSize="106"
                letterSpacing="0.03em"
                fill="rgba(28, 27, 24, 0.08)"
                stroke="rgba(28, 27, 24, 0.22)"
                strokeWidth="1.5"
                className="transition-all duration-300 hover:fill-[rgba(28,27,24,0.14)] hover:stroke-[rgba(28,27,24,0.38)] cursor-default"
              >
                NAREN ROY
              </text>
            </svg>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs font-mono uppercase tracking-[0.22em] text-[#635d50]">
              <span>CREATIVE FRONTEND & MOTION</span>
              <span className="text-[#f5be0b]">✦</span>
              <span>SILIGURI, INDIA</span>
              <span className="text-[#f5be0b]">✦</span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="font-bold text-[#1c1b18] hover:text-[#b45309] transition-colors pointer-events-auto cursor-pointer"
              >
                RETURN TO TOP ↑
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
