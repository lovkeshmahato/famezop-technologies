import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        offwhite: "#F6F8FB",
        ink: "#0A0A0B",
        blue: {
          DEFAULT: "#0052FF",
          soft: "#EAF0FF",
        },
        gray: {
          body: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-lg": ["6rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        card: "20px",
        control: "12px",
      },
      boxShadow: {
        soft: "0 24px 60px -24px rgba(10, 10, 11, 0.18)",
        "soft-sm": "0 12px 32px -16px rgba(10, 10, 11, 0.14)",
        glow: "0 0 0 1px rgba(0, 82, 255, 0.35), 0 20px 48px -20px rgba(0, 82, 255, 0.35)",
      },
      spacing: {
        section: "160px",
        "section-mobile": "80px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-marker": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.15", transform: "scale(2.4)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "pulse-marker": "pulse-marker 2.4s ease-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      transitionTimingFunction: {
        expressive: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
