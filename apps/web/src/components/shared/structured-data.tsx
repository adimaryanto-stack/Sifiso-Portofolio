import React from "react";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sifiso",
    "url": "https://sifiso.pro",
    "image": "https://sifiso.pro/og-image.jpg",
    "jobTitle": "Multidisciplinary Designer & Developer",
    "sameAs": [
      "https://twitter.com/sifiso",
      "https://github.com/sifiso",
      "https://linkedin.com/in/sifiso"
    ],
    "description": "Multidisciplinary designer specializing in high-performance digital experiences and 3D visualization."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
