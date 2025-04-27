// src/lib/design/themes.ts

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export interface ThemeOptions {
  font: "inter" | "playfair" | "robotoMono" | "satoshi" | "spaceGrotesk";
  radius: "none" | "small" | "medium" | "large" | "full";
  shadow: "none" | "soft" | "medium" | "hard" | "xl";
  buttonShape: "square" | "rounded" | "pill";
}

export interface Theme {
  name: string;
  id: string;
  lightClass: string;
  darkClass: string;
  colors: ThemeColors;
  options: ThemeOptions;
}

export const themes: Record<string, Theme> = {
  "new-york": {
    name: "New York",
    id: "new-york",
    lightClass: "theme-new-york-light",
    darkClass: "theme-new-york-dark",
    colors: {
      background: "#ffffff",
      foreground: "#111827",
      card: "#f9fafb",
      cardForeground: "#111827",
      popover: "#ffffff",
      popoverForeground: "#111827",
      primary: "#111827",
      primaryForeground: "#f9fafb",
      secondary: "#6b7280",
      secondaryForeground: "#111827",
      muted: "#9ca3af",
      mutedForeground: "#374151",
      accent: "#3b82f6",
      accentForeground: "#ffffff",
      destructive: "#ef4444",
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#3b82f6",
      sidebar: "#f9fafb",
      sidebarForeground: "#111827",
      sidebarPrimary: "#111827",
      sidebarPrimaryForeground: "#f9fafb",
      sidebarAccent: "#3b82f6",
      sidebarAccentForeground: "#ffffff",
      sidebarBorder: "#e5e7eb",
      sidebarRing: "#3b82f6",
      chart1: "#3b82f6",
      chart2: "#6366f1",
      chart3: "#ec4899",
      chart4: "#f59e0b",
      chart5: "#10b981",
    },
    options: {
      font: "inter",
      radius: "medium",
      shadow: "soft",
      buttonShape: "rounded",
    },
  },
  miami: {
    name: "Miami",
    id: "miami",
    lightClass: "theme-miami-light",
    darkClass: "theme-miami-dark",
    colors: {
      background: "#fff5f7",
      foreground: "#1f2937",
      card: "#fce7f3",
      cardForeground: "#1f2937",
      popover: "#fef2f2",
      popoverForeground: "#1f2937",
      primary: "#f472b6",
      primaryForeground: "#1f2937",
      secondary: "#60a5fa",
      secondaryForeground: "#1f2937",
      muted: "#fca5a5",
      mutedForeground: "#7c3aed",
      accent: "#34d399",
      accentForeground: "#065f46",
      destructive: "#ef4444",
      border: "#fda4af",
      input: "#fda4af",
      ring: "#f472b6",
      sidebar: "#fff1f2",
      sidebarForeground: "#1f2937",
      sidebarPrimary: "#f472b6",
      sidebarPrimaryForeground: "#1f2937",
      sidebarAccent: "#60a5fa",
      sidebarAccentForeground: "#1f2937",
      sidebarBorder: "#f9a8d4",
      sidebarRing: "#f472b6",
      chart1: "#fb7185",
      chart2: "#7dd3fc",
      chart3: "#86efac",
      chart4: "#fcd34d",
      chart5: "#f472b6",
    },
    options: {
      font: "playfair",
      radius: "large",
      shadow: "medium",
      buttonShape: "pill",
    },
  },
  tokyo: {
    name: "Tokyo",
    id: "tokyo",
    lightClass: "theme-tokyo-light",
    darkClass: "theme-tokyo-dark",
    colors: {
      background: "#f9fafb",
      foreground: "#111827",
      card: "#ffffff",
      cardForeground: "#111827",
      popover: "#ffffff",
      popoverForeground: "#111827",
      primary: "#8b5cf6",
      primaryForeground: "#ffffff",
      secondary: "#fbbf24",
      secondaryForeground: "#111827",
      muted: "#d1d5db",
      mutedForeground: "#6b7280",
      accent: "#10b981",
      accentForeground: "#ffffff",
      destructive: "#ef4444",
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#8b5cf6",
      sidebar: "#ffffff",
      sidebarForeground: "#111827",
      sidebarPrimary: "#8b5cf6",
      sidebarPrimaryForeground: "#ffffff",
      sidebarAccent: "#10b981",
      sidebarAccentForeground: "#ffffff",
      sidebarBorder: "#e5e7eb",
      sidebarRing: "#8b5cf6",
      chart1: "#8b5cf6",
      chart2: "#fbbf24",
      chart3: "#10b981",
      chart4: "#ec4899",
      chart5: "#3b82f6",
    },
    options: {
      font: "satoshi",
      radius: "small",
      shadow: "hard",
      buttonShape: "square",
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
