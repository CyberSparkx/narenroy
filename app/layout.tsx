import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import SmoothScroll from "./components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.narenroy.in"),
  title: "Naren Roy | Front End Developer",
  description: "Portfolio of Naren Roy - Front End Developer specializing in React, Next.js, and 3D web experiences.",
  keywords: ["Naren Roy", "Frontend Developer", "React Developer", "Next.js", "Web Developer", "Siliguri", "JavaScript", "TypeScript"],
  authors: [{ name: "Naren Roy" }],
  creator: "Naren Roy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.narenroy.in",
    title: "Naren Roy | Front End Developer",
    description: "Portfolio of Naren Roy - Front End Developer specializing in React, Next.js, and 3D web experiences.",
    siteName: "Naren Roy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naren Roy | Front End Developer",
    description: "Portfolio of Naren Roy - Front End Developer specializing in React, Next.js, and 3D web experiences.",
    creator: "@NarenRo26790356",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
