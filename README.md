# Famezop Technologies

Full-stack, SEO-optimized marketing website for Famezop Technologies — a
global software development company with offices in Nepal, India, and the
UAE. Built with Next.js 14 (App Router), Sanity CMS, Prisma + PostgreSQL,
and Resend.

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript, Server Actions
- **CMS:** Sanity.io — services, industries, case studies, testimonials, jobs, FAQs, team
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
industries, case studies, testimonials, jobs, 30+ FAQs) that's
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
| `NEXT_PUBLIC_SITE_URL` | Correct canonical URLs, sitemap, OG tags | Defaults to `https://famezoptechnologies.com` |
| `NEXT_PUBLIC_GA_ID` / `GOOGLE_SITE_VERIFICATION` | Analytics / Search Console | |

## Database (Prisma + Supabase)

Production database is Supabase project **`bltrzsdjknsbfqbcojdv`** in the
"Famezop Technologies" org (`ap-northeast-1`). The `Lead` and
`NewsletterSubscriber` tables (plus the `_prisma_migrations` history row for
`prisma/migrations/20260807000000_init`) are already created there — no
migration needs to be re-run for that project.

To connect to it:

1. Supabase Dashboard → this project → **Connect** button → copy the
   **Transaction pooler** string into `DATABASE_URL`, and the **Session
   pooler** string into `DIRECT_URL` (see `.env.example` for the exact
   query-param suffixes Prisma needs on each — `pgbouncer=true` on the
   transaction one).
2. `npm run prisma:studio` to browse data at `http://localhost:5555`.

**Row Level Security is enabled** on `Lead`, `NewsletterSubscriber`, and
`_prisma_migrations`, with no policies — Supabase auto-provisions a public
REST API (PostgREST) in front of every table regardless of whether the app
uses `supabase-js`, and these tables hold contact-form PII, so they're
locked out of that API entirely. Prisma's direct/pooler connection is
unaffected (RLS only governs PostgREST). Only add a policy if you actually
want client-side/supabase-js code to query one of these tables:

```sql
-- Example: allow the anon role to insert (but not read) newsletter signups
-- via supabase-js, if you ever want that path instead of the Server Action.
CREATE POLICY "Allow anon insert" ON "NewsletterSubscriber"
  FOR INSERT TO anon WITH CHECK (true);
```

To create a fresh Supabase project (e.g. for staging) instead of reusing the
one above, run `prisma migrate deploy` against it — `prisma/migrations/`
already has the full schema checked in.

Models live in `prisma/schema.prisma`. `lib/prisma.ts` exports a shared
client singleton; `lib/contact-service.ts` / `lib/newsletter-service.ts`
contain the actual write logic, shared by both the Server Actions
(`app/actions/*.ts`, used by the forms) and the REST route handlers
(`app/api/contact`, `app/api/newsletter`) so either integration path works.

## CMS (Sanity)

Content schemas live in `sanity/schemas/`: `service`, `industry`,
`caseStudy`, `testimonial`, `job`, `faq`, `teamMember` — each
with a `slug` and SEO fields (`metaTitle`, `metaDescription`, `ogImage`).

Project ID **`roe3ezhc`** (dataset `production`) is already wired into
`.env.example` / `.env.local` — nothing to create. CORS origins are set for
`http://localhost:3000`, `https://*.vercel.app`, `https://famezoptechnologies.com`,
and `https://www.famezoptechnologies.com`.

Content is already seeded and published: all 17 services, 16 industries, 34
FAQs, 6 testimonials, 6 job listings, and 6 team members. **Case
studies are intentionally left on fallback content** — those types have
image fields, and seeding them without real cover images (no image-upload
tool was available while wiring this up) would have looked worse than the
generated placeholder illustrations already in `lib/content/*.ts`. Add real
case studies (with real images) via `/studio` whenever you're
ready — they'll take over from fallback automatically once published.

Note: this sandbox's network policy blocks outbound requests to
`sanity.io` directly, so the live connection is untested from here; verify
it once you run `npm run dev` locally or deploy.

1. Set the same `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
   in your hosting provider's environment variables.
2. Visit `/studio` on your running site — that's the embedded Sanity Studio
   (`sanity.config.ts`), no separate deploy needed. Log in with whichever
   Sanity account owns project `roe3ezhc`.
3. Start adding content. Pages fetch via `lib/content/*.ts` (`fetchServices()`,
   `fetchCaseStudies()`, etc.) with `revalidate: 60` ISR, so new content goes
   live within a minute automatically.
4. Optional — for instant updates instead of waiting up to 60s: in Sanity
   project settings → API → Webhooks, add a webhook pointing at
   `https://your-site.com/api/revalidate` with the same secret as
   `SANITY_REVALIDATE_SECRET`.

Until a Sanity project is connected, every fetch function falls back to the
typed content in `lib/content/*.ts` — the site looks and behaves the same
either way.

## Email (Resend)

Account is connected; a `sending_access`-scoped API key ("Famezop Website")
is set in `.env.local` for local dev. Set the same `RESEND_API_KEY`,
`RESEND_FROM_EMAIL`, and `RESEND_NOTIFY_EMAIL` in your hosting provider's
environment variables — the key is a secret and isn't checked into the
repo. Templates are in `emails/templates.ts`.

**Domain `famezoptechnologies.com` is added and verified** in Resend
(sending + receiving both enabled), so `notifications@famezoptechnologies.com`
and `hello@famezoptechnologies.com` can send/receive real mail — nothing
further needed there.

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
  `Service`, `BreadcrumbList`, `FAQPage`, `JobPosting`) — see `lib/seo.ts`
- `app/sitemap.ts` and `app/robots.ts` are generated from live content
- Dynamic OG images for case studies via `next/og` (`opengraph-image.tsx` in each `[slug]` route)

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
