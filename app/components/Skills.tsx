"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".skill-category", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 px-6 md:px-12 bg-white dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Technical Arsenal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Languages */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-blue-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.languages.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Frontend */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-pink-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Frontend</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.frontend.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-green-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Backend</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.backend.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Database */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-yellow-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.databases.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">Tools</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.tools.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Cloud */}
                    <div className="skill-category p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-teal-500 transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Cloud / DevOps</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolioData.skills.cloudDevOps.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-sm font-medium">{skill}</span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
