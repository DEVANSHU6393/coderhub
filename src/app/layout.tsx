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
  title: "Coder Hub | Learn. Build. Ship.",
  description: "The official website of the Coder Hub club, Bundelkhand University. Join us for coding workshops, hackathons, and more.",
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
