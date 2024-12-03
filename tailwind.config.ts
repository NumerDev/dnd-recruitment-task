import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#F9F5FF",
          2: "#E0D7F3",
          3: "#D6BBFB",
          4: "#9E77ED",
          5: "#7F56D9",
          6: "#6941C6",
          7: "#53389E",
        },
        secondary: {
          1: "#F2F4F7",
          2: "#F9FAFB",
          3: "#EBECEE",
          4: "#EAECF0",
          5: "#D0D5DD",
          6: "#98A2B3",
          7: "#667085",
          8: "#475467",
          9: "#344054",
          10: "#182230",
          11: "#101828",
        },
      },
      boxShadow: {
        default: "0px 1px 2px rgba(16, 24, 40, 0.05)", // secondary-1
        secondary:
          "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(152,162,179,0.14)", // secondary-1 / secondary-5
        primary:
          "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(158,119,237,0.24)", // secondary-1 / primary-4
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
