/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          satoshi: ["var(--font-satoshi)"],
          inter: ["var(--font-inter)"],
          playfair: ["var(--font-playfair)"],
          "roboto-mono": ["var(--font-roboto-mono)"],
          "space-grotesk": ["var(--font-space-grotesk)"],
        },
        colors: {
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
          primary: "hsl(var(--primary) / <alpha-value>)",
          primaryForeground: "hsl(var(--primary-foreground) / <alpha-value>)",
          secondary: "hsl(var(--secondary) / <alpha-value>)",
          secondaryForeground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          muted: "hsl(var(--muted) / <alpha-value>)",
          mutedForeground: "hsl(var(--muted-foreground) / <alpha-value>)",
          accent: "hsl(var(--accent) / <alpha-value>)",
          accentForeground: "hsl(var(--accent-foreground) / <alpha-value>)",
          destructive: "hsl(var(--destructive) / <alpha-value>)",
          border: "hsl(var(--border) / <alpha-value>)",
          input: "hsl(var(--input) / <alpha-value>)",
          ring: "hsl(var(--ring) / <alpha-value>)",
          card: "hsl(var(--card) / <alpha-value>)",
          cardForeground: "hsl(var(--card-foreground) / <alpha-value>)",
          popover: "hsl(var(--popover) / <alpha-value>)",
          popoverForeground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
      },
    },
    plugins: [],
  };
  