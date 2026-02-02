"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MoveRight, Github, ExternalLink } from "lucide-react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const container = useRef(null);

    useGSAP(() => {
        const projects = gsap.utils.toArray(".project-card");

        projects.forEach((project: any, i) => {
            gsap.from(project, {
                scrollTrigger: {
                    trigger: project,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                y: 80,
                rotationX: -10,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: i * 0.1
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 px-6 md:px-12 bg-gray-100 dark:bg-zinc-950 transition-colors">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-right text-gray-900 dark:text-white">
                    Selected Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <div key={index} className="project-card group relative h-[400px] w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-zinc-800 hover:shadow-2xl hover:border-indigo-500 transition-all duration-500">

                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 transition-transform duration-500 group-hover:scale-110">
                                {/* Replace with actual image */}
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-transparent to-transparent dark:from-zinc-900 dark:via-transparent dark:to-transparent opacity-80" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-gray-100/90 via-gray-100/50 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/50">
                                <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{project.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">{project.description}</p>

                                <div className="flex gap-4">
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white hover:text-indigo-500 transition-colors"
                                        >
                                            {link.label === "GitHub" ? <Github size={16} /> : <ExternalLink size={16} />}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
