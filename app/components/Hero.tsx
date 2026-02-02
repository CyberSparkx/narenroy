"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import CanvasLoader from "./CanvasLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Float, Stars } from "@react-three/drei";
import { MoveRight } from "lucide-react";

const HeroScene = () => {
    return (
        <group>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            {/* Geometric shapes with Green Accents */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[5, 2, -10]} scale={1.5}>
                    <icosahedronGeometry />
                    <meshStandardMaterial color="#22c55e" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.8}>
                <mesh position={[-6, -3, -15]} scale={2}>
                    <octahedronGeometry />
                    <meshStandardMaterial color="#4ade80" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
        </group>
    );
};

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const title = useRef<HTMLHeadingElement>(null);
    const subtitle = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(title.current, { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 })
            .from(subtitle.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-black text-white">

            {/* Background Canvas */}
            <div className="absolute inset-0 z-0 opacity-80">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <Suspense fallback={<CanvasLoader />}>
                        <HeroScene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-8 uppercase tracking-widest backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Open to Work
                </div>

                <h1 ref={title} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none">
                    NAREN ROY
                </h1>

                <p ref={subtitle} className="text-xl md:text-3xl text-gray-400 font-light max-w-2xl mx-auto">
                    Front End Developer crafting
                    <span className="text-green-400 font-semibold"> motion-driven </span>
                    digital experiences.
                </p>

                <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a href="#projects" className="group flex items-center gap-3 px-8 py-4 bg-green-500 text-black rounded-full font-bold text-lg hover:bg-green-400 transition-all hover:scale-105">
                        See Projects
                        <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>

        </section>
    );
}
