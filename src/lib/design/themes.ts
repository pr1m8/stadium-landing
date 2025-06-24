// src/lib/design/themes.ts

export interface ThemeColors {
  background: string;
  foreground: string;
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
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
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
  staidium: {
    name: "Staidium",
    id: "staidium",
    lightClass: "theme-staidium-light",
    darkClass: "theme-staidium-dark",
    colors: {
      background: "0 0 0", // Black #000000
      foreground: "255 255 255", // White #ffffff
      primary: "255 255 255", // White #ffffff
      primaryForeground: "0 0 0", // Black on white buttons
      secondary: "255 0 0", // Red #ff0000
      secondaryForeground: "255 255 255", // White on red buttons
      muted: "30 30 30", // Dark gray #1e1e1e
      mutedForeground: "180 180 180", // Light gray #b4b4b4
      accent: "255 0 0", // Red #ff0000
      accentForeground: "255 255 255", // White on red
      destructive: "255 60 60", // Lighter red #ff3c3c
      border: "40 40 40", // Border dark gray #282828
      input: "30 30 30", // Input background dark gray
      ring: "255 0 0", // Focus ring red
      card: "15 15 15", // Card background very dark gray #0f0f0f
      cardForeground: "255 255 255", // Card text white
      popover: "15 15 15", // Popover background very dark gray
      popoverForeground: "255 255 255", // Popover text white
    },
    options: {
      font: "satoshi",
      radius: "medium",
      shadow: "soft",
      buttonShape: "rounded",
    },
  },
  "new-york": {
    name: "New York",
    id: "new-york",
    lightClass: "theme-new-york-light",
    darkClass: "theme-new-york-dark",
    colors: {
      background: "255 255 255",
      foreground: "17 24 39",
      primary: "17 24 39",
      primaryForeground: "249 250 251",
      secondary: "107 114 128",
      secondaryForeground: "255 255 255",
      muted: "156 163 175",
      mutedForeground: "55 65 81",
      accent: "59 130 246",
      accentForeground: "255 255 255",
      destructive: "255 0 0",
      border: "229 231 235",
      input: "229 231 235",
      ring: "147 197 253",
      card: "255 255 255",
      cardForeground: "17 24 39",
      popover: "255 255 255",
      popoverForeground: "17 24 39",
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
      background: "0 255 255",
      foreground: "17 24 39",
      primary: "255 105 180",
      primaryForeground: "17 24 39",
      secondary: "255 182 193",
      secondaryForeground: "17 24 39",
      muted: "107 114 128",
      mutedForeground: "17 24 39",
      accent: "255 0 255",
      accentForeground: "17 24 39",
      destructive: "255 69 0",
      border: "255 182 193",
      input: "255 182 193",
      ring: "0 255 255",
      card: "240 255 255",
      cardForeground: "17 24 39",
      popover: "0 255 255",
      popoverForeground: "17 24 39",
    },
    options: {
      font: "satoshi",
      radius: "full",
      shadow: "xl",
      buttonShape: "pill",
    },
  },
  tokyo: {
    name: "Tokyo",
    id: "tokyo",
    lightClass: "theme-tokyo-light",
    darkClass: "theme-tokyo-dark",
    colors: {
      background: "248 250 252",
      foreground: "17 24 39",
      primary: "255 0 128",
      primaryForeground: "255 255 255",
      secondary: "128 0 255",
      secondaryForeground: "255 255 255",
      muted: "229 231 235",
      mutedForeground: "55 65 81",
      accent: "255 165 0",
      accentForeground: "17 24 39",
      destructive: "255 69 0",
      border: "229 231 235",
      input: "229 231 235",
      ring: "255 0 128",
      card: "255 255 255",
      cardForeground: "17 24 39",
      popover: "255 255 255",
      popoverForeground: "17 24 39",
    },
    options: {
      font: "spaceGrotesk",
      radius: "large",
      shadow: "medium",
      buttonShape: "rounded",
    },
  },
  nordic: {
    name: "Nordic",
    id: "nordic",
    lightClass: "theme-nordic-light",
    darkClass: "theme-nordic-dark",
    colors: {
      background: "230 245 255",
      foreground: "30 41 59",
      primary: "30 64 175",
      primaryForeground: "255 255 255",
      secondary: "96 165 250",
      secondaryForeground: "30 41 59",
      muted: "191 219 254",
      mutedForeground: "30 41 59",
      accent: "96 165 250",
      accentForeground: "255 255 255",
      destructive: "220 38 38",
      border: "191 219 254",
      input: "191 219 254",
      ring: "59 130 246",
      card: "255 255 255",
      cardForeground: "30 41 59",
      popover: "255 255 255",
      popoverForeground: "30 41 59",
    },
    options: {
      font: "playfair",
      radius: "medium",
      shadow: "soft",
      buttonShape: "rounded",
    },
  },
  desert: {
    name: "Desert",
    id: "desert",
    lightClass: "theme-desert-light",
    darkClass: "theme-desert-dark",
    colors: {
      background: "250 240 230",
      foreground: "102 51 0",
      primary: "204 119 34",
      primaryForeground: "255 255 255",
      secondary: "255 221 153",
      secondaryForeground: "102 51 0",
      muted: "244 164 96",
      mutedForeground: "102 51 0",
      accent: "255 140 0",
      accentForeground: "255 255 255",
      destructive: "178 34 34",
      border: "222 184 135",
      input: "222 184 135",
      ring: "255 140 0",
      card: "250 240 230",
      cardForeground: "102 51 0",
      popover: "250 240 230",
      popoverForeground: "102 51 0",
    },
    options: {
      font: "satoshi",
      radius: "large",
      shadow: "medium",
      buttonShape: "pill",
    },
  },
  retro: {
    name: "Retro",
    id: "retro",
    lightClass: "theme-retro-light",
    darkClass: "theme-retro-dark",
    colors: {
      background: "255 250 240",
      foreground: "0 0 0",
      primary: "255 105 180",
      primaryForeground: "0 0 0",
      secondary: "255 182 193",
      secondaryForeground: "0 0 0",
      muted: "245 222 179",
      mutedForeground: "0 0 0",
      accent: "0 255 255",
      accentForeground: "0 0 0",
      destructive: "255 0 0",
      border: "255 192 203",
      input: "255 192 203",
      ring: "0 255 255",
      card: "255 250 240",
      cardForeground: "0 0 0",
      popover: "255 250 240",
      popoverForeground: "0 0 0",
    },
    options: {
      font: "robotoMono",
      radius: "small",
      shadow: "soft",
      buttonShape: "square",
    },
  },
  gotham: {
    name: "Gotham",
    id: "gotham",
    lightClass: "theme-gotham-light",
    darkClass: "theme-gotham-dark",
    colors: {
      background: "20 20 20",
      foreground: "230 230 230",
      primary: "50 50 50",
      primaryForeground: "230 230 230",
      secondary: "100 100 100",
      secondaryForeground: "230 230 230",
      muted: "80 80 80",
      mutedForeground: "230 230 230",
      accent: "96 165 250",
      accentForeground: "230 230 230",
      destructive: "255 0 0",
      border: "70 70 70",
      input: "70 70 70",
      ring: "96 165 250",
      card: "30 30 30",
      cardForeground: "230 230 230",
      popover: "30 30 30",
      popoverForeground: "230 230 230",
    },
    options: {
      font: "inter",
      radius: "medium",
      shadow: "hard",
      buttonShape: "rounded",
    },
  },
  ocean: {
    name: "Ocean",
    id: "ocean",
    lightClass: "theme-ocean-light",
    darkClass: "theme-ocean-dark",
    colors: {
      background: "224 242 254",
      foreground: "2 6 23",
      primary: "14 165 233",
      primaryForeground: "2 6 23",
      secondary: "56 189 248",
      secondaryForeground: "2 6 23",
      muted: "186 230 253",
      mutedForeground: "2 6 23",
      accent: "3 105 161",
      accentForeground: "224 242 254",
      destructive: "220 38 38",
      border: "186 230 253",
      input: "186 230 253",
      ring: "14 165 233",
      card: "224 242 254",
      cardForeground: "2 6 23",
      popover: "224 242 254",
      popoverForeground: "2 6 23",
    },
    options: {
      font: "spaceGrotesk",
      radius: "medium",
      shadow: "soft",
      buttonShape: "rounded",
    },
  },
};
