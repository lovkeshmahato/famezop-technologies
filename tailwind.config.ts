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
        // Fluid instead of a fixed breakpoint jump: previously this was a
        // flat 96px from the `lg` breakpoint (1024px) all the way up to any
        // wide desktop, so on real monitors each short phrase in the hero
        // wrapped to its own giant line. clamp() scales continuously with
        // viewport width and tops out at 4.5rem (72px) instead of 6rem.
        "hero-lg": ["clamp(2.25rem, 1.5rem + 3vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        card: "20px",
        control: "12px",
        // Nested control inside a `control`-radius shell with p-1.5 (6px)
        // padding — was a hand-computed rounded-[9px] magic number.
        "control-sm": "9px",
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
