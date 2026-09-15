import type { Metadata } from "next";
import { siteConfig, offices } from "./site";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  /**
   * Pass `false` for routes that ship their own `opengraph-image.tsx` file
   * convention — an explicit `openGraph.images`/`twitter.images` array here
   * would silently shadow that per-route generated image.
   */
  image?: string | false;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image === false ? undefined : image || siteConfig.ogImage;
  // Root layout's title template appends " | Famezop Technologies" to every
  // page title. Some callers (CMS metaTitle fields, the homepage) already
  // write the brand name into the full title themselves — templating those
  // again would render it twice in the <title> tag. `absolute` opts out of
  // the template for exactly those already-branded titles.
  const resolvedTitle = title.includes(siteConfig.name) ? { absolute: title } : title;

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function officePostalAddress(office: (typeof offices)[number]) {
  return {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.city,
    ...("addressRegion" in office ? { addressRegion: office.addressRegion } : {}),
    ...("postalCode" in office ? { postalCode: office.postalCode } : {}),
    addressCountry: office.countryCode,
  };
}

export function organizationJsonLd() {
  const hq = offices.find((office) => office.isHQ) || offices[0];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.links),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: ["NP", "IN", "AE", "Worldwide"],
      },
    ],
    address: officePostalAddress(hq),
    // Each office as its own department/location entry, per Google's
    // guidance for multi-location organizations.
    department: offices.map((office) => ({
      "@type": "Organization",
      name: `${siteConfig.name} — ${office.city}`,
      address: officePostalAddress(office),
      telephone: office.phone,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["Nepal", "India", "United Arab Emirates", "Worldwide"],
    url: `${siteConfig.url}/services/${service.slug}`,
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
}) {
  const url = `${siteConfig.url}/portfolio/${article.slug}`;
  const absoluteImage = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${siteConfig.url}${article.image}`
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: absoluteImage ? [absoluteImage] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const COUNTRY_CODES: Record<string, string> = { Nepal: "NP", India: "IN", UAE: "AE" };

// Job listings write location as free text for display, e.g.
// "Kathmandu, Nepal (Hybrid)" or "Remote (Nepal / India)". Google's
// JobPosting rich-result validation expects a real city/country in
// jobLocation.address (not the raw display string) and expects fully
// remote roles to use jobLocationType instead of a jobLocation at all.
function parseJobLocation(location: string) {
  if (/^remote/i.test(location)) {
    return { remote: true as const };
  }
  const match = location.match(/^([^,]+),\s*([^(]+?)\s*(?:\([^)]*\))?$/);
  if (!match) return { remote: false as const, locality: location, countryCode: undefined };
  const [, locality, countryName] = match;
  return {
    remote: false as const,
    locality: locality.trim(),
    countryCode: COUNTRY_CODES[countryName.trim()],
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: string;
  datePosted: string;
  validThrough?: string;
}) {
  const parsedLocation = parseJobLocation(job.location);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    ...(job.validThrough ? { validThrough: job.validThrough } : {}),
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: Object.values(siteConfig.links),
    },
    ...(parsedLocation.remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: parsedLocation.locality,
              ...(parsedLocation.countryCode ? { addressCountry: parsedLocation.countryCode } : {}),
            },
          },
        }),
    industry: job.department,
  };
}

export function jsonLdScript(data: Record<string, unknown>) {
  return { __html: JSON.stringify(data) };
}
