# Famezop Technologies

Full-stack, SEO-optimized marketing website for Famezop Technologies — a
global software development company with offices in Nepal, India, and the
UAE. Built with Next.js 14 (App Router), Sanity CMS, Prisma + PostgreSQL,
and Resend.

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript, Server Actions
- **CMS:** Sanity.io — services, industries, case studies, blog, testimonials, jobs, FAQs, team
- **Database:** PostgreSQL via Prisma — contact leads and newsletter subscribers
- **Email:** Resend — lead notification + confirmation emails
- **Styling / motion:** Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis
- **Hosting assumption:** Vercel (ISR, edge caching, image optimization). If you deploy elsewhere, revisit `next.config.mjs` image config and the ISR `revalidate` values in `lib/content/*.ts`.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The site **runs and renders fully without any external services configured**
— `lib/content/*.ts` ships realistic fallback content (17 services, 16
industries, case studies, blog posts, testimonials, jobs, 30+ FAQs) that's
used whenever Sanity isn't configured, and the contact/newsletter forms log
to the console instead of failing when `RESEND_API_KEY` / `DATABASE_URL`
aren't set up yet. This makes local development and preview deploys work
immediately; wire up the services below for a fully "live" environment.

## Environment variables

See `.env.example` for the full list. Summary:

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Storing leads/newsletter subscribers | PostgreSQL connection string |
| `RESEND_API_KEY` | Sending real emails | Without it, emails are logged, not sent |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` | Live CMS content | Without it, fallback content renders instead |
| `SANITY_API_TOKEN` | Draft/preview content, Studio writes | |
| `SANITY_REVALIDATE_SECRET` | Instant CMS updates | Shared secret for the Sanity webhook → `/api/revalidate` |
| `NEXT_PUBLIC_SITE_URL` | Correct canonical URLs, sitemap, OG tags | Defaults to `https://www.famezop.com` |
| `NEXT_PUBLIC_GA_ID` / `GOOGLE_SITE_VERIFICATION` | Analytics / Search Console | |

## Database (Prisma)

```bash
# Local Postgres via Docker
docker run --name famezop-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

npm run prisma:migrate   # creates Lead + NewsletterSubscriber tables
npm run prisma:studio    # browse data at http://localhost:5555
```

Models live in `prisma/schema.prisma`. `lib/prisma.ts` exports a shared
client singleton; `lib/contact-service.ts` / `lib/newsletter-service.ts`
contain the actual write logic, shared by both the Server Actions
(`app/actions/*.ts`, used by the forms) and the REST route handlers
(`app/api/contact`, `app/api/newsletter`) so either integration path works.

## CMS (Sanity)

Content schemas live in `sanity/schemas/`: `service`, `industry`,
`caseStudy`, `blogPost`, `testimonial`, `job`, `faq`, `teamMember` — each
with a `slug` and SEO fields (`metaTitle`, `metaDescription`, `ogImage`).

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Visit `/studio` on your running site — that's the embedded Sanity Studio
   (`sanity.config.ts`), no separate deploy needed.
4. Start adding content. Pages fetch via `lib/content/*.ts` (`fetchServices()`,
   `fetchBlogPosts()`, etc.) with `revalidate: 60` ISR, so new content goes
   live within a minute automatically.
5. Optional — for instant updates instead of waiting up to 60s: in Sanity
   project settings → API → Webhooks, add a webhook pointing at
   `https://your-site.com/api/revalidate` with the same secret as
   `SANITY_REVALIDATE_SECRET`.

Until a Sanity project is connected, every fetch function falls back to the
typed content in `lib/content/*.ts` — the site looks and behaves the same
either way.

## Email (Resend)

Get an API key at [resend.com/api-keys](https://resend.com/api-keys), set
`RESEND_API_KEY`, `RESEND_FROM_EMAIL` (must be a verified sending domain),
and `RESEND_NOTIFY_EMAIL`. Templates are in `emails/templates.ts`.

## Swapping in Clash Display / General Sans

The brand spec calls for Clash Display / General Sans (Fontshare) on
headings. Those are licensed downloads rather than a Google Fonts package,
so `lib/fonts.ts` currently uses Space Grotesk (free, geometric, visually
close) as the working default. To swap:

1. Download the woff2 files from [fontshare.com](https://www.fontshare.com/fonts/clash-display) into `public/fonts/`.
2. In `lib/fonts.ts`, replace the `Space_Grotesk` import with `next/font/local` pointing at those files.

Nothing else needs to change — every heading already reads `font-heading`.

## SEO

- `generateMetadata` on every route, JSON-LD (`Organization` sitewide,
  `Service`, `Article`, `BreadcrumbList`, `FAQPage`, `JobPosting`) — see `lib/seo.ts`
- `app/sitemap.ts` and `app/robots.ts` are generated from live content
- `app/feed.xml/route.ts` — blog RSS feed
- Dynamic OG images for blog posts and case studies via `next/og` (`opengraph-image.tsx` in each `[slug]` route)

## Project structure

```
app/(marketing)/   Every public page (route group keeps /studio outside the marketing chrome)
app/api/           REST route handlers (contact, newsletter, revalidate)
app/actions/       Server Actions used by the forms
components/ui/     Buttons, cards, forms, nav, footer
components/sections/  Homepage section blocks
components/animations/  Lenis, scroll-reveal, counters, marquee, preloader — all with reduced-motion fallbacks
lib/content/       Typed content + Sanity fetch functions + fallback data
lib/               prisma.ts, resend.ts, sanity-client.ts, seo.ts, validations.ts
sanity/schemas/    Sanity Studio schema definitions
prisma/schema.prisma  Lead + NewsletterSubscriber models
```

## Deployment

Vercel is the default assumption (ISR + ` next/image` optimization work out
of the box). If deploying elsewhere:

- Confirm the host supports Next.js ISR/ App Router route handlers, or switch to `output: "export"`-incompatible static hosting won't work here since the site uses Server Actions and dynamic routes.
- `sharp` is required for image optimization in production — most hosts install it automatically via `npm install`.
- Set every variable from `.env.example` in the host's environment settings.
