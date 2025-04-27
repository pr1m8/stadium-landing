// src/lib/design/fonts.ts

import {
  Inter,
  Playfair_Display,
  Roboto_Mono,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";

// The CSS for Satoshi is served from the public directory
// It's loaded in the app/layout.tsx file via a <link> tag

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Satoshi font is loaded via CSS from public folder
// For Next.js font variable support, we create a placeholder
export const satoshi = {
  variable: "--font-satoshi",
};

export const fonts = {
  inter,
  playfair,
  robotoMono,
  satoshi,
  spaceGrotesk,
};

export type FontName = keyof typeof fonts;
