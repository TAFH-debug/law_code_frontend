import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: '#006FEE',
            secondary: '#DF2935',
          }
        },
        dark: {
          layout: {},
          colors: {
            primary: '#DF2935',
            secondary: '#006FEE',
          }
        },
      }
    })
  ],
}

module.exports = config;
