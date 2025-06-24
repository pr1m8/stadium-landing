import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { fonts } from "@/lib/design/fonts";

export default function StaidiumLayout({
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
        <ThemeProvider defaultTheme="staidium">
          {/* Your normal page structure */}
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col items-center justify-start w-full">
              {children}
            </main>
          </div>

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
