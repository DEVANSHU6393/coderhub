import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Coder Hub | Code. Collaborate. Conquer.",
    template: "%s | Coder Hub",
  },
  description: "The official computer science club of Bundelkhand University. Learn, Build, and Ship together with a community of passionate developers.",
  openGraph: {
    title: "Coder Hub | Code. Collaborate. Conquer.",
    description: "The premier computer science club of Bundelkhand University. Join us for workshops, hackathons, open source, and more.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Coder Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coder Hub | Code. Collaborate. Conquer.",
    description: "The premier computer science club of Bundelkhand University.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-slate-200 font-sans min-h-screen flex flex-col`}
      >
        <AnimatedBackground />
        <div className="aurora-bg" />
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
