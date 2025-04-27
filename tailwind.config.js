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
        // Define font variables for theme selection
        satoshi: ["var(--font-satoshi)"],
        inter: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
        "roboto-mono": ["var(--font-roboto-mono)"],
        "space-grotesk": ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
