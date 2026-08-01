import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GFS_Didot, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { MotionProvider } from "@/app/motion-provider";
import { Grain } from "@/components/grain";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgress } from "@/components/scroll-progress";

import "./globals.css";

const sans = IBM_Plex_Sans({ variable: "--font-sans", weight: ["400", "500", "600", "700"], subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", weight: ["400", "500", "600"], subsets: ["latin"] });
const serif = GFS_Didot({ variable: "--font-serif", weight: "400", subsets: ["greek", "latin"] });

export const metadata: Metadata = {
  title: "Artystic Odysseus: The Long Return",
  description: "An immersive Artystic theme about Odysseus, the cost of survival, and the long return to Ithaca.",
  icons: {
    icon: "/assets/artystic-logo.png",
    shortcut: "/assets/artystic-logo.png",
    apple: "/assets/artystic-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} scroll-smooth antialiased`}>
      <body>
        <MotionProvider>
          <LenisProvider>
            <ScrollProgress />
            <Grain />
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
