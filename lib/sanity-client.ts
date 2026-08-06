import { createClient, type ClientConfig } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

const config: ClientConfig = {
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder({ projectId: config.projectId!, dataset });

export function urlForImage(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}

/**
 * Fetch from Sanity with graceful fallback. When no Sanity project is
 * configured (local dev without credentials, or CI), callers pass a
 * `fallback` value so pages still render with realistic placeholder
 * content instead of failing the build.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
  revalidate = 60,
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
    return result ?? fallback;
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content:", error);
    return fallback;
  }
}
