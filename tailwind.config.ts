import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray1: "rgb(255 255 255 / 9%)",
        gray2: "rgba(255, 255, 255, 0.16)",
        gray3: "rgb(179 179 179 / 25%)"
      },
      height: {
        100: "500px"
      }
    },
  },
  plugins: [],
};
export default config;
