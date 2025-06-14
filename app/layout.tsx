import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import CursorTrail from "@/components/effects/CursorTrail";
import AnimatedBackground from "@/components/effects/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hanrsyidin | Software Developer",
    template: "%s | Hanrsyidin",
  },
  
  description: "Ahmad Farhan Rasyidin's Portfolio: Software Developer | Web, Mobile, and Game Development Expert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedBackground />
        <CursorTrail />
        <Navbar />
        <main className="pt-[75px]">
          {children}
        </main>
      </body>
    </html>
  );
}
