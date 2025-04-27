import React from "react";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import Footer from "@/components/nav/footer";
import { fonts } from "@/lib/design/fonts";

export const metadata = {
  title: "Will Astley | Portfolio",
  description: "Portfolio, Blog, and Projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          min-h-screen bg-background text-foreground antialiased
          transition-colors duration-500 ease-in-out
          ${fonts.inter.variable} ${fonts.playfair.variable} ${fonts.robotoMono.variable} ${fonts.satoshi.variable} ${fonts.spaceGrotesk.variable}
        `}
      >
        <ThemeProvider>
          {/* THEME SWITCHER ALWAYS VISIBLE */}
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <ThemeSwitcher />
          </div>

          {/* Your normal page structure */}
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col items-center justify-start w-full">
              {children}
            </main>

            <Footer />
          </div>

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
