import React from "react";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { fonts } from "@/lib/design/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`
          min-h-screen bg-background text-foreground antialiased
          ${fonts.inter.variable} ${fonts.playfair.variable} ${fonts.robotoMono.variable} ${fonts.satoshi.variable} ${fonts.spaceGrotesk.variable}
        `}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col items-center justify-start w-full">
              {children}
            </main>
          </div>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
