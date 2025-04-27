import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/nav/footer"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Will Astley | Portfolio",
  description: "Portfolio, Blog, and Projects",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Vercel Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  )
}
