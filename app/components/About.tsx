"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".about-text", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 px-6 md:px-12 bg-gray-50 dark:bg-zinc-900 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl about-text bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                    {/* Placeholder for an image or 3D model */}
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center rounded-xl overflow-hidden">
                        <span className="text-9xl">👨‍💻</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 about-text">
                        About Me
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 leading-relaxed about-text">
                        {portfolioData.personalInfo.summary}
                    </p>
                </div>

            </div>
        </section>
    );
}
