// src/app/layout.tsx

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "@/app/globals.css"
// Import Satoshi font CSS directly in globals.css instead of using a link tag

import { ThemeProvider } from "@/components/theme/theme-provider"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import Footer from "@/components/nav/footer"
import { fonts } from "@/lib/design/fonts"

export const metadata = {
  title: "Will Astley | Portfolio",
  description: "Portfolio, Blog, and Projects",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          min-h-screen bg-background text-foreground antialiased
          ${fonts.inter.variable} ${fonts.playfair.variable} ${fonts.robotoMono.variable} ${fonts.satoshi.variable} ${fonts.spaceGrotesk.variable}
        `}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            {/* Optional: Show ThemeSwitcher only during development */}
            {process.env.NODE_ENV === "development" && (
              <div className="fixed top-4 right-4 z-50">
                <ThemeSwitcher />
              </div>
            )}

            <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
              {children}
            </main>

            <Footer />
          </div>

          {/* Vercel Analytics and Speed Insights */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
