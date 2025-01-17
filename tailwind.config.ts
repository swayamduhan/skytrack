import type { Config } from "tailwindcss";

export default {
  darkMode : ['class'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	fontFamily: {
  		conforto: [
  			'var(--font-conforto)'
  		],
  		satoshi: [
  			'var(--font-satoshi)'
  		]
  	},
  	extend: {}
  }
} satisfies Config;
