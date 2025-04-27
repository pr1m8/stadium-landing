// src/components/theme-switcher.tsx

"use client"

import { useTheme } from "next-themes"
import { themes } from "@/lib/design/themes"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState, useEffect } from "react"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const toggleLightDark = () => {
        if (!theme) return
        if (theme.includes("dark")) {
            setTheme(theme.replace("dark", "light"))
        } else if (theme.includes("light")) {
            setTheme(theme.replace("light", "dark"))
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(themes).flatMap(([key, value]) => [
                        <SelectItem key={`${key}-light`} value={value.lightClass}>
                            {value.name} (Light)
                        </SelectItem>,
                        <SelectItem key={`${key}-dark`} value={value.darkClass}>
                            {value.name} (Dark)
                        </SelectItem>,
                    ])}
                </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={toggleLightDark}>
                Toggle Light / Dark
            </Button>
        </div>
    )
}
