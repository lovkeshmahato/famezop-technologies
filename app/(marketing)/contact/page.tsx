import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ContactForm } from "@/components/ui/ContactForm";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { offices, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Book a free consultation with Famezop Technologies. Offices in Kathmandu, Bengaluru, and Dubai — we reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [{ name: "Contact", path: "/contact" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Tell us what you're building — we'll follow up within one business day with next steps."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-card border border-ink/10 bg-white p-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 rounded-card border border-ink/10 bg-white p-5 transition-colors hover:border-blue/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-blue-soft text-blue">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs text-gray-body">Email us</p>
                  <p className="text-sm font-medium text-ink">{siteConfig.email}</p>
                </div>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-4 rounded-card border border-ink/10 bg-white p-5 transition-colors hover:border-blue/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-blue-soft text-blue">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs text-gray-body">Call us</p>
                  <p className="text-sm font-medium text-ink">{siteConfig.phone}</p>
                </div>
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-card border border-ink/10 bg-white p-5 transition-colors hover:border-blue/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-blue-soft text-blue">
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs text-gray-body">WhatsApp</p>
                  <p className="text-sm font-medium text-ink">Message us directly</p>
                </div>
              </a>
            </div>

            <div className="mt-8 space-y-4">
              {offices.map((office) => (
                <div key={office.country} className="rounded-card border border-ink/10 bg-offwhite p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {office.city}, {office.country} {office.isHQ && <span className="text-xs text-blue">(HQ)</span>}
                      </p>
                      <p className="mt-1 text-xs text-gray-body">{office.address}</p>
                      <p className="mt-1 text-xs text-gray-body">{office.phone}</p>
                    </div>
                  </div>
                  <iframe
                    title={`Map — ${office.city}, ${office.country}`}
                    className="mt-4 h-40 w-full rounded-control border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(office.address)}&output=embed`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
