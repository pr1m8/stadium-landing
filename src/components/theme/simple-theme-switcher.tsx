"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./simple-theme-provider";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-black dark:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-black dark:text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}