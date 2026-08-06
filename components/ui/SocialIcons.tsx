import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.5 8.5h3v11h-3z" />
      <circle cx="6" cy="4.75" r="1.5" />
      <path d="M11 19.5v-11h3v1.6c.6-1.1 1.9-1.9 3.4-1.9 2.5 0 4.1 1.7 4.1 4.6v6.7h-3v-6.1c0-1.5-.6-2.4-1.9-2.4-1.2 0-2 .8-2.3 1.6-.1.3-.3.7-.3 1.2v5.7z" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4.5-1 4.5-4.5a3.5 3.5 0 00-1-2.5c.1-.2.4-1.5-.1-3 0 0-1-.3-3 1.2a10.7 10.7 0 00-5.6 0C7.3 5.2 6.3 5.5 6.3 5.5c-.5 1.5-.2 2.8-.1 3a3.5 3.5 0 00-1 2.5c0 3.5 2.5 4.3 4.5 4.5-.4.4-.5.9-.5 1.5V19" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
