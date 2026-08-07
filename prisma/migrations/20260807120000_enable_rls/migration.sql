-- Supabase auto-provisions a public PostgREST API in front of every table
-- in the `public` schema, regardless of whether the app uses supabase-js.
-- This app connects with Prisma over a direct Postgres connection, which
-- RLS does not affect — but without RLS, Lead/NewsletterSubscriber (and
-- Prisma's own migration history) would otherwise be readable/writable by
-- anyone holding the project's anon key via that REST API. Enabling RLS
-- with no policies fully locks these tables out of PostgREST while leaving
-- Prisma's direct connection untouched. Add a policy only if you actually
-- want client-side/supabase-js access to one of these tables.
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NewsletterSubscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
