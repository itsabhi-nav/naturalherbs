import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import JsonLd from "@/components/JsonLd";
import { siteGraph, SITE_URL, SITE_NAME, SEO_SUMMARY } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const KEYWORDS = [
  "herbal extracts manufacturer India",
  "botanical extracts supplier",
  "raw herbs exporter India",
  "ayurvedic herbs wholesale",
  "ashwagandha bulk supplier",
  "essential oils exporter India",
  "soapnut reetha wholesale",
  "soapnut liquid extract supplier",
  "henna powder exporter",
  "indigo natural dyes bulk",
  "organic soapnuts India",
  "herbal products international shipping",
  "cosmeceutical ingredients India",
  "NaturalHerbs Global",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, From Nature, For You`,
    template: `%s, ${SITE_NAME}`,
  },
  description: SEO_SUMMARY,
  keywords: KEYWORDS,
  authors: [{ name: "Rochya Singh", url: `${SITE_URL}/contact` }],
  creator: "NaturalHerbs",
  publisher: "NaturalHerbs",
  category: "Health & Wellness",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME}, From Nature, For You`,
    description: SEO_SUMMARY,
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}, From Nature, For You`,
    description: SEO_SUMMARY,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  appleWebApp: {
    capable: true,
    title: "NaturalHerbs",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#04100b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-bark text-cream font-sans antialiased">
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <JsonLd id="ld-site" data={siteGraph()} />
        <Preloader />
        <CursorGlow />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
