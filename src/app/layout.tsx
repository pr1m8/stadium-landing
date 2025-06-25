import React from "react";
import "@/app/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
  // Check if the current path is the staidium page
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isStaidiumPage = pathname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          min-h-screen bg-background text-foreground antialiased
          transition-colors duration-500 ease-in-out
          ${fonts.inter.variable} ${fonts.playfair.variable} ${fonts.robotoMono.variable} ${fonts.satoshi.variable} ${fonts.spaceGrotesk.variable}
        `}
      >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col items-center justify-start w-full">
              {children}
            </main>

            {!isStaidiumPage && <Footer />}
          </div>

          <Analytics />
          <SpeedInsights />
      </body>
    </html>
  );
}
