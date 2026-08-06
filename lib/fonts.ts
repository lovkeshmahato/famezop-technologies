import { Inter, Space_Grotesk } from "next/font/google";

/**
 * Brand spec calls for Clash Display / General Sans (Fontshare) on headings.
 * Those are licensed downloads, not available via next/font/google — to use
 * them, drop the woff2 files into /public/fonts and switch this to
 * next/font/local (see README "Swapping in Clash Display / General Sans").
 * Space Grotesk is the closest free geometric alternative in the meantime.
 */
export const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
