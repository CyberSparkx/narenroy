"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",    href: "#about"      },
  { label: "Work",     href: "#experience" },
  { label: "Projects", href: "#projects"   },
  { label: "Contact",  href: "#contact"    },
];

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);
  const linksRef  = useRef<HTMLUListElement>(null);
  const ctaRef    = useRef<HTMLAnchorElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [navHidden, setNavHidden] = useState(true);
  const lastScrollY = useRef(0);

  /* ── Scroll: hide at top (hero has native nav), show on scroll down ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isScrolled = y > 80;
      setScrolled(isScrolled);
      setNavHidden(!isScrolled || (y > lastScrollY.current && y > 160));
      lastScrollY.current = y;
    };
    // Run once on mount to set initial state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close drawer on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Entrance animation ── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(logoRef.current, { y: -20, opacity: 0, duration: 0.6, delay: 0.4 })
      .from(
        linksRef.current?.querySelectorAll("li") ?? [],
        { y: -14, opacity: 0, stagger: 0.08, duration: 0.45 },
        "-=0.35"
      )
      .from(ctaRef.current, { y: -14, opacity: 0, duration: 0.45 }, "-=0.35");
  }, { scope: navRef });

  /* ── Mobile drawer animation ── */
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
    }
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .nav-pill-link { position: relative; }
        .nav-pill-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: white;
          border-radius: 99px;
          transition: width 0.25s ease;
        }
        .nav-pill-link:hover::after { width: 70%; }
        .resume-btn {
          background: rgba(255,255,255,0.16);
          border: 1.5px solid rgba(255,255,255,0.30);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .resume-btn:hover {
          background: rgba(255,255,255,0.28);
          transform: scale(1.05);
        }
        .resume-btn:active { transform: scale(0.96); }
      `}</style>

      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500 will-change-transform"
        style={{ transform: (!scrolled || navHidden) ? "translateY(-130%)" : "translateY(0)" }}
      >
        {/* ── Main floating bar ── */}
        <div
          className="mx-3 mt-3 sm:mx-5 sm:mt-4 md:mx-8 lg:mx-12 rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between gap-4 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(18, 18, 22, 0.85)"
              : "rgba(18, 18, 22, 0.65)",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          {/* ── Logo ── */}
          <div ref={logoRef} className="shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Naren Roy — home"
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black transition-transform duration-300 group-hover:scale-110 shrink-0"
                style={{
                  background: "rgba(255,255,255,0.20)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                }}
              >
                N
              </span>
              <span className="hidden sm:block text-white font-bold text-[15px] tracking-tight whitespace-nowrap">
                Naren Roy
              </span>
            </Link>
          </div>

          {/* ── Desktop nav links (hidden below md) ── */}
          <ul
            ref={linksRef}
            className="hidden md:flex items-center gap-6 lg:gap-8"
            role="list"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="nav-pill-link text-white/80 hover:text-white text-sm font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right: Resume + hamburger ── */}
          <div className="flex  md:pt-7 h-12 items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Resume button */}
            <a
              ref={ctaRef}
              href="/Naren_Roy_Resume.pdf"
              download="Naren_Roy_Resume.pdf"
              className="resume-btn hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white whitespace-nowrap"
            >
              <FileText className="w-4 h-4 shrink-0" />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-white transition-colors shrink-0"
              style={{
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X    className="w-4 h-4" />
                : <Menu className="w-4 h-4" />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          ref={drawerRef}
          className="md:hidden mx-3 sm:mx-5 mt-1 rounded-2xl overflow-hidden"
          style={{
            height: 0,
            opacity: 0,
            background: "rgba(18, 65, 200, 0.82)",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block px-6 py-3.5 text-white/85 hover:text-white hover:bg-white/10 text-sm font-semibold tracking-wide transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}

            {/* Mobile Resume download */}
            <li className="px-4 pt-2 pb-3 border-t border-white/10 mt-1">
              <a
                href="/Naren_Roy_Resume.pdf"
                download="Naren_Roy_Resume.pdf"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.28)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                <FileText className="w-4 h-4 shrink-0" />
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}