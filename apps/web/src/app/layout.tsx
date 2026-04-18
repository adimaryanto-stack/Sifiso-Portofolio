import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/shared/page-transition";
import { StructuredData } from "@/components/shared/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function generateMetadata(): Promise<Metadata> {
  let seoData = {
    title: "Sifiso — Modern Design & Development Portfolio",
    description: "Multidisciplinary designer specializing in high-performance digital experiences.",
    generator: "Next.js, Tailwind, Portfolio"
  };

  try {
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, "seo_metadata")).limit(1);
    if (results.length > 0) {
      seoData = results[0].value as any;
    }
  } catch (error) {
    console.error("Failed to fetch SEO settings for metadata", error);
  }

  return {
    title: {
      default: seoData.title,
      template: `%s | ${seoData.title.split("—")[0].trim()}`
    },
    description: seoData.description,
    keywords: seoData.generator.split(",").map((k: string) => k.trim()),
    authors: [{ name: "Sifiso" }],
    creator: "Sifiso",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://sifiso.pro",
      title: seoData.title,
      description: seoData.description,
      siteName: "Sifiso Portfolio",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: ["/og-image.jpg"],
      creator: "@sifiso",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-primary/30 noise-overlay">
        <StructuredData />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
