"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useGSAP(() => {
        if (loading) {
            const tl = gsap.timeline({
                onComplete: () => setLoading(false)
            });

            tl.to(".preloader-text", {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            })
                .to(".preloader-bar", {
                    width: "100%",
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=0.5")
                .to(".preloader-container", {
                    y: "-100%",
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.5
                });
        }
    }, { dependencies: [] });

    if (!loading) return null;

    return (
        <div className="preloader-container fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
            <div className="text-center mb-8 overflow-hidden">
                <h1 className="preloader-text text-4xl md:text-6xl font-bold translate-y-20 opacity-0 text-green-500">
                    SITE UNDER DEVELOPMENT
                </h1>
                <p className="preloader-text text-xl text-gray-400 mt-4 translate-y-20 opacity-0">
                    Crafting Digital Excellence
                </p>
            </div>

            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="preloader-bar w-0 h-full bg-green-500" />
            </div>
        </div>
    );
}
