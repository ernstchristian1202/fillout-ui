import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        "dash": "#C0C0C0",
        "gray": "#9DA4B2",
        "gray-o15": "#9DA4B226",
        "gray-o35": "#9DA4B259",
        "dark-gray": "#677289",
        "blue": "#2F72E2",
        "orange": "#F59D0E",
        "border": "#E1E1E1",
        "workspace": "#444444",
      },
      boxShadow: {
        'navitem': '0px 1px 3px 0px rgba(0, 0, 0, 0.04), 0px 1px 1px 0px rgba(0, 0, 0, 0.02)',
      },
      letterSpacing: {
        tightest: '-0.015em',
      },
    },
  },
  plugins: [],
};
export default config;
