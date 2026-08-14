import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public");

function abstractSvg({ seed, label, dark = false }) {
  const bg = dark ? "#0A0A0B" : "#F6F8FB";
  const blue = "#0052FF";
  const soft = dark ? "#151A2E" : "#EAF0FF";
  // Simple deterministic pseudo-random from seed
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) % 9973;
  const rand = (n) => {
    s = (s * 9301 + 49297) % 233280;
    return (s / 233280) * n;
  };
  const circles = Array.from({ length: 5 })
    .map(() => {
      const cx = rand(800);
      const cy = rand(500);
      const r = 40 + rand(160);
      const opacity = (0.08 + rand(20) / 100).toFixed(2);
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${blue}" opacity="${opacity}" />`;
    })
    .join("\n    ");
  const lines = Array.from({ length: 4 })
    .map((_, i) => {
      const y = 100 + i * 90 + rand(30);
      return `<line x1="0" y1="${y.toFixed(0)}" x2="800" y2="${(y - 60 + rand(120)).toFixed(0)}" stroke="${blue}" stroke-opacity="0.12" stroke-width="1" />`;
    })
    .join("\n    ");

  return `<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="${bg}" />
  <rect width="800" height="500" fill="url(#grid-${seed.replace(/[^a-z0-9]/gi, "")})" opacity="0.5" />
  <defs>
    <pattern id="grid-${seed.replace(/[^a-z0-9]/gi, "")}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${soft}" stroke-width="1"/>
    </pattern>
  </defs>
  <g>
    ${lines}
    ${circles}
  </g>
  <rect x="40" y="400" width="${Math.min(720, 120 + label.length * 13)}" height="44" rx="10" fill="${dark ? "#FFFFFF" : "#0A0A0B"}" opacity="0.92" />
  <text x="60" y="428" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="${dark ? "#0A0A0B" : "#FFFFFF"}">${label}</text>
</svg>`;
}

const caseStudies = [
  "meropasal", "carecloud", "zaptrail", "eduneta", "finlynk", "haven",
];
for (const slug of caseStudies) {
  const svg = abstractSvg({ seed: slug, label: "Famezop Case Study", dark: false });
  writeFileSync(path.join(root, "images", "case-studies", `${slug}.svg`), svg);
}

// Default OG image (branded fallback)
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0A0B" />
  <defs>
    <pattern id="og-grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#151A2E" stroke-width="1"/>
    </pattern>
    <radialGradient id="og-glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#0052FF" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#0052FF" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og-grid)" />
  <rect width="1200" height="630" fill="url(#og-glow)" />
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Famezop</text>
  <text x="80" y="380" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#0052FF">Technologies</text>
  <text x="80" y="440" font-family="Arial, sans-serif" font-size="24" fill="#9AA5B8">Building future-ready software worldwide</text>
</svg>`;
writeFileSync(path.join(root, "og", "default.svg"), ogSvg);

// Simple wordmark logo
const logoSvg = `<svg width="240" height="60" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" y="10" rx="10" fill="#0052FF" />
  <text x="16" y="37" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">F</text>
  <text x="56" y="37" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#0A0A0B">Famezop</text>
</svg>`;
writeFileSync(path.join(root, "logo.svg"), logoSvg);

console.log("Generated placeholder SVGs.");
