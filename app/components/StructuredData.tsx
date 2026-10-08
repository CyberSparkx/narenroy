export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.narenroy.in/#person",
        "name": "Naren Roy",
        "givenName": "Naren",
        "familyName": "Roy",
        "additionalName": "CyberSparkx",
        "gender": "Male",
        "url": "https://www.narenroy.in",
        "image": "https://www.narenroy.in/hero-naren.jpg",
        "jobTitle": "Full Stack & Creative Frontend Developer",
        "description":
          "Frontend Developer and Full Stack Engineer based in Siliguri, India. Specializing in high-performance React, Next.js, GSAP motion choreography, and interactive WebGL experiences.",
        "email": "mailto:narensarkar607@gmail.com",
        "telephone": "+917864066694",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Siliguri",
          "addressRegion": "West Bengal",
          "addressCountry": "IN",
        },
        "sameAs": [
          "https://github.com/CyberSparkx",
          "https://www.linkedin.com/in/naren-roy-4390a6238/",
          "https://twitter.com/NarenRo26790356",
        ],
        "knowsAbout": [
          "JavaScript",
          "TypeScript",
          "React.js",
          "Next.js",
          "React Native",
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST APIs",
          "WebGL",
          "Three.js",
          "GLSL Shaders",
          "GSAP Animation",
          "ScrollTrigger",
          "Tailwind CSS",
          "Creative Development",
          "Frontend Engineering",
          "Web Performance Optimization",
          "Web Accessibility (WCAG)",
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Siliguri Government Polytechnic",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.narenroy.in/#website",
        "url": "https://www.narenroy.in",
        "name": "Naren Roy Portfolio",
        "description":
          "Official portfolio of Naren Roy - Full Stack & Creative Frontend Developer.",
        "publisher": {
          "@id": "https://www.narenroy.in/#person",
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.narenroy.in/#webpage",
        "url": "https://www.narenroy.in",
        "name": "Naren Roy | Full Stack & Creative Frontend Developer",
        "isPartOf": {
          "@id": "https://www.narenroy.in/#website",
        },
        "about": {
          "@id": "https://www.narenroy.in/#person",
        },
        "mainEntity": {
          "@id": "https://www.narenroy.in/#person",
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.narenroy.in/hero-naren.jpg",
        },
        "description":
          "Official portfolio and personal website of Naren Roy, showcasing creative web experiences, WebGL shaders, kinetic GSAP motion, and full stack applications.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
