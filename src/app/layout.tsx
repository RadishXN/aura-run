import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA RUN | Premium Minimalist Smart Treadmill",
  description: "Experience the pinnacle of home fitness. The ultimate luxury running machine featuring a 21.5\" smart curved console, dual-motor whisper drive, and CloudShock™ active deck absorption.",
  keywords: "smart treadmill, luxury fitness, home gym equipment, high-end running machine, folding treadmill, aesthetic gym",
  authors: [{ name: "AURA Fitness" }],
  openGraph: {
    title: "AURA RUN | Premium Minimalist Smart Treadmill",
    description: "Designed for limitless performance. The ultimate luxury smart treadmill for your modern home gym.",
    images: [{ url: "/treadmill_hero.png", width: 1200, height: 1200, alt: "AURA RUN Treadmill" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-zinc-100 select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
