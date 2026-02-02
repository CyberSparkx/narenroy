"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".experience-item", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 px-6 md:px-12 bg-white dark:bg-black transition-colors">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-gray-900 dark:text-white">
                    Experience
                </h2>

                <div className="space-y-12 border-l-2 border-gray-200 dark:border-zinc-800 pl-8 ml-4">
                    {portfolioData.experience.map((job, index) => (
                        <div key={index} className="experience-item relative">
                            {/* Dot */}
                            <div className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-black" />

                            <span className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2 block">{job.duration}</span>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                            <h4 className="text-lg text-gray-500 dark:text-gray-400 mb-4">{job.company}</h4>

                            {job.description.length > 0 && (
                                <ul className="list-disc leading-relaxed text-gray-600 dark:text-gray-300 pl-5 space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
