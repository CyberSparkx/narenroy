import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import SmoothScroll from "./components/SmoothScroll";
import StructuredData from "./components/StructuredData";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E6E2D7" },
    { media: "(prefers-color-scheme: dark)", color: "#141311" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.narenroy.in"),
  title: {
    default: "Naren Roy | Full Stack & Creative Frontend Developer",
    template: "%s | Naren Roy",
  },
  description:
    "Portfolio of Naren Roy — Full Stack and Creative Frontend Developer from Siliguri, India. Specializing in high-performance React, Next.js, 60fps kinetic GSAP animations, and interactive WebGL shaders.",
  keywords: [
    "Naren Roy",
    "Naren Roy Developer",
    "Naren Roy Portfolio",
    "Naren Roy Siliguri",
    "Creative Frontend Developer",
    "Full Stack Developer India",
    "Creative Developer India",
    "React Developer",
    "Next.js Developer",
    "WebGL Developer",
    "Three.js Developer",
    "GSAP ScrollTrigger Developer",
    "Frontend Engineer Siliguri",
    "CyberSparkx",
    "TypeScript",
    "JavaScript Developer",
    "MERN Stack Developer",
  ],
  authors: [{ name: "Naren Roy", url: "https://www.narenroy.in" }],
  creator: "Naren Roy",
  publisher: "Naren Roy",
  category: "technology",
  alternates: {
    canonical: "https://www.narenroy.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.narenroy.in",
    siteName: "Naren Roy Portfolio",
    title: "Naren Roy | Full Stack & Creative Frontend Developer",
    description:
      "Explore the portfolio of Naren Roy — Creative Frontend & Full Stack Developer. Engineering bespoke WebGL shaders, kinetic GSAP motion, and high-performance React & Next.js architectures.",
    images: [
      {
        url: "/hero-naren.jpg",
        width: 1200,
        height: 630,
        alt: "Naren Roy — Full Stack & Creative Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naren Roy | Full Stack & Creative Frontend Developer",
    description:
      "Creative Frontend and Full Stack Developer specializing in React, Next.js, kinetic GSAP motion, and WebGL experiences.",
    creator: "@NarenRo26790356",
    images: ["/hero-naren.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
