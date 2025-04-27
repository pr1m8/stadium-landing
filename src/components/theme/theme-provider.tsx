"use client";

import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { themes } from "@/lib/design/themes";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("theme-new-york-light");

  useEffect(() => {
    const html = document.documentElement;
    html.className = theme;

    const activeTheme = Object.values(themes).find(
      (t) => t.lightClass === theme || t.darkClass === theme,
    );

    if (activeTheme) {
      for (const [key, value] of Object.entries(activeTheme.colors)) {
        html.style.setProperty(`--${key}`, value);
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
