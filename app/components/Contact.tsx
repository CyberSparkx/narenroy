"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".contact-info", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full py-20 px-6 md:px-12 bg-gray-50 dark:bg-zinc-950 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-start">

                <div className="contact-info space-y-8 max-w-lg">
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">Let's Talk</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Interested in working together or just want to say hi?
                        Drop me a line or give me a call.
                    </p>

                    <div className="space-y-4 pt-8">
                        <a href={`mailto:${portfolioData.personalInfo.email}`} className="flex items-center gap-4 text-lg hover:text-blue-500 transition-colors dark:text-gray-200">
                            <Mail className="w-6 h-6" />
                            {portfolioData.personalInfo.email}
                        </a>
                        <div className="flex items-center gap-4 text-lg dark:text-gray-200">
                            <MapPin className="w-6 h-6" />
                            {portfolioData.personalInfo.location}
                        </div>
                    </div>
                </div>

                {/* Simple Form Placeholder */}
                <form className="contact-info w-full max-w-md space-y-4 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg">
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
                        <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Message</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Hello..." />
                    </div>
                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                        Send Message
                    </button>
                </form>

            </div>
        </section>
    );
}
