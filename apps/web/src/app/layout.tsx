import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/shared/page-transition";
import { StructuredData } from "@/components/shared/structured-data";
import Script from "next/script";

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

interface SeoData {
  title: string;
  description: string;
  generator: string;
  googleSiteVerification?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  let seoData = {
    title: "Sifiso — Modern Design & Development Portfolio",
    description: "Multidisciplinary designer specializing in high-performance digital experiences.",
    generator: "Next.js, Tailwind, Portfolio",
    googleSiteVerification: ""
  };

  try {
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, "seo_metadata")).limit(1);
    if (results.length > 0) {
      const raw = results[0].value;
      const parsed = (typeof raw === 'string' ? JSON.parse(raw) : raw) as Partial<SeoData>;
      if (parsed?.title) seoData.title = parsed.title;
      if (parsed?.description) seoData.description = parsed.description;
      if (parsed?.generator) seoData.generator = parsed.generator;
      if (parsed?.googleSiteVerification) seoData.googleSiteVerification = parsed.googleSiteVerification;
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
          url: `/api/og?title=${encodeURIComponent(seoData.title.split("—")[0].trim())}&subtitle=${encodeURIComponent(seoData.description)}`,
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
      images: [`/api/og?title=${encodeURIComponent(seoData.title.split("—")[0].trim())}&subtitle=${encodeURIComponent(seoData.description)}`],
      creator: "@sifiso",
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: seoData.googleSiteVerification ? {
      google: seoData.googleSiteVerification,
    } : undefined,
  };
}

import { AnalyticsTracker } from "@/components/analytics-tracker";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let googleAnalyticsId = "";
  try {
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, "seo_metadata")).limit(1);
    if (results.length > 0) {
      const raw = results[0].value;
      const parsed = (typeof raw === 'string' ? JSON.parse(raw) : raw) as any;
      if (parsed?.googleAnalyticsId) {
        googleAnalyticsId = parsed.googleAnalyticsId;
      }
    }
  } catch (error) {
    console.error("Failed to fetch Google Analytics setting for layout", error);
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-primary/30 noise-overlay">
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        <StructuredData />
        <AnalyticsTracker />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
