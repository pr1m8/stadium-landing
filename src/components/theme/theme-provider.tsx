// src/components/theme-provider.tsx

"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"
import { themes } from "@/lib/design/themes"

interface ThemeProviderProps {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="new-york-light" // set your initial dev theme
            enableSystem={false}
            themes={Object.values(themes).flatMap(t => [t.lightClass, t.darkClass])}
        >
            {children}
        </NextThemesProvider>
    )
}
