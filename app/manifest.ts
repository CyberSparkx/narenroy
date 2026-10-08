import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Naren Roy | Full Stack & Creative Frontend Developer",
    short_name: "Naren Roy",
    description:
      "Portfolio of Naren Roy - Full Stack and Creative Frontend Developer specializing in React, Next.js, kinetic GSAP motion, and WebGL experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#E6E2D7",
    theme_color: "#1c1b18",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
