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
  			sans: [
  				'var(--font-sans)'
  			],
  			mono: [
  				'var(--font-mono)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// background: 'hsl(var(--background))',
  			// foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			// primary: {
  			// 	DEFAULT: 'hsl(var(--primary))',
  			// 	foreground: 'hsl(var(--primary-foreground))'
  			// },
  			// secondary: {
  			// 	DEFAULT: 'hsl(var(--secondary))',
  			// 	foreground: 'hsl(var(--secondary-foreground))'
  			// },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  darkMode: "class",
  plugins: [
    heroui({
		"themes": {
		  "light": {
			"colors": {
			  "default": {
				"50": "#fafafa",
				"100": "#f2f2f3",
				"200": "#ebebec",
				"300": "#e3e3e6",
				"400": "#dcdcdf",
				"500": "#d4d4d8",
				"600": "#afafb2",
				"700": "#8a8a8c",
				"800": "#656567",
				"900": "#404041",
				"foreground": "#000",
				"DEFAULT": "#d4d4d8"
			  },
			  "primary": {
				"50": "#e8f1fb",
				"100": "#c7ddf6",
				"200": "#a6c9f1",
				"300": "#85b5ec",
				"400": "#64a1e6",
				"500": "#438de1",
				"600": "#3774ba",
				"700": "#2c5c92",
				"800": "#20436b",
				"900": "#142a44",
				"foreground": "#000",
				"DEFAULT": "#438de1"
			  },
			  "secondary": {
				"50": "#fbe4e4",
				"100": "#f6bdbd",
				"200": "#f19797",
				"300": "#ec7070",
				"400": "#e74a4a",
				"500": "#e22323",
				"600": "#ba1d1d",
				"700": "#931717",
				"800": "#6b1111",
				"900": "#440b0b",
				"foreground": "#fff",
				"DEFAULT": "#e22323"
			  },
			  "success": {
				"50": "#e7f8df",
				"100": "#c5edb3",
				"200": "#a3e386",
				"300": "#82d859",
				"400": "#60ce2d",
				"500": "#3ec300",
				"600": "#33a100",
				"700": "#287f00",
				"800": "#1d5d00",
				"900": "#133b00",
				"foreground": "#000",
				"DEFAULT": "#3ec300"
			  },
			  "warning": {
				"50": "#fffcdf",
				"100": "#fff8b3",
				"200": "#fff586",
				"300": "#fff159",
				"400": "#ffed2d",
				"500": "#ffe900",
				"600": "#d2c000",
				"700": "#a69700",
				"800": "#796f00",
				"900": "#4d4600",
				"foreground": "#000",
				"DEFAULT": "#ffe900"
			  },
			  "danger": {
				"50": "#efdfdf",
				"100": "#dab3b3",
				"200": "#c48686",
				"300": "#ae5959",
				"400": "#982d2d",
				"500": "#820000",
				"600": "#6b0000",
				"700": "#550000",
				"800": "#3e0000",
				"900": "#270000",
				"foreground": "#fff",
				"DEFAULT": "#820000"
			  },
			  "background": "#ffffff",
			  "foreground": "#000000",
			  "content1": {
				"DEFAULT": "#ffffff",
				"foreground": "#000"
			  },
			  "content2": {
				"DEFAULT": "#f4f4f5",
				"foreground": "#000"
			  },
			  "content3": {
				"DEFAULT": "#e4e4e7",
				"foreground": "#000"
			  },
			  "content4": {
				"DEFAULT": "#d4d4d8",
				"foreground": "#000"
			  },
			  "focus": "#006FEE",
			  "overlay": "#000000"
			}
		  },
		  "dark": {
			"colors": {
			  "default": {
				"50": "#0d0d0e",
				"100": "#19191c",
				"200": "#26262a",
				"300": "#323238",
				"400": "#3f3f46",
				"500": "#65656b",
				"600": "#8c8c90",
				"700": "#b2b2b5",
				"800": "#d9d9da",
				"900": "#ffffff",
				"foreground": "#fff",
				"DEFAULT": "#3f3f46"
			  },
			  "primary": {
				"50": "#440b0b",
				"100": "#6b1111",
				"200": "#931717",
				"300": "#ba1d1d",
				"400": "#e22323",
				"500": "#e74a4a",
				"600": "#ec7070",
				"700": "#f19797",
				"800": "#f6bdbd",
				"900": "#fbe4e4",
				"foreground": "#fff",
				"DEFAULT": "#e22323"
			  },
			  "secondary": {
				"50": "#142a44",
				"100": "#20436b",
				"200": "#2c5c92",
				"300": "#3774ba",
				"400": "#438de1",
				"500": "#64a1e6",
				"600": "#85b5ec",
				"700": "#a6c9f1",
				"800": "#c7ddf6",
				"900": "#e8f1fb",
				"foreground": "#000",
				"DEFAULT": "#438de1"
			  },
			  "success": {
				"50": "#133b00",
				"100": "#1d5d00",
				"200": "#287f00",
				"300": "#33a100",
				"400": "#3ec300",
				"500": "#60ce2d",
				"600": "#82d859",
				"700": "#a3e386",
				"800": "#c5edb3",
				"900": "#e7f8df",
				"foreground": "#000",
				"DEFAULT": "#3ec300"
			  },
			  "warning": {
				"50": "#4d4600",
				"100": "#796f00",
				"200": "#a69700",
				"300": "#d2c000",
				"400": "#ffe900",
				"500": "#ffed2d",
				"600": "#fff159",
				"700": "#fff586",
				"800": "#fff8b3",
				"900": "#fffcdf",
				"foreground": "#000",
				"DEFAULT": "#ffe900"
			  },
			  "danger": {
				"50": "#270000",
				"100": "#3e0000",
				"200": "#550000",
				"300": "#6b0000",
				"400": "#820000",
				"500": "#982d2d",
				"600": "#ae5959",
				"700": "#c48686",
				"800": "#dab3b3",
				"900": "#efdfdf",
				"foreground": "#fff",
				"DEFAULT": "#820000"
			  },
			  "background": "#000000",
			  "foreground": "#ffffff",
			  "content1": {
				"DEFAULT": "#18181b",
				"foreground": "#fff"
			  },
			  "content2": {
				"DEFAULT": "#27272a",
				"foreground": "#fff"
			  },
			  "content3": {
				"DEFAULT": "#3f3f46",
				"foreground": "#fff"
			  },
			  "content4": {
				"DEFAULT": "#52525b",
				"foreground": "#fff"
			  },
			  "focus": "#006FEE",
			  "overlay": "#ffffff"
			}
		  }
		},
		"layout": {
		  "disabledOpacity": "0.5"
		}
	  }), require("tailwindcss-animate")
  ],
}

module.exports = config;
