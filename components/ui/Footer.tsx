import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig, footerNav, offices } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { LinkedInIcon, XIcon, GitHubIcon, InstagramIcon } from "./SocialIcons";

const socials = [
  { icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: XIcon, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: GitHubIcon, href: siteConfig.links.github, label: "GitHub" },
  { icon: InstagramIcon, href: siteConfig.links.instagram, label: "Instagram" },
];

const columns = [
  { title: "Services", items: footerNav.services },
  { title: "Industries", items: footerNav.industries },
  { title: "Company", items: footerNav.company },
  { title: "Legal", items: footerNav.legal },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-offwhite">
      <div className="container-content section-padding !py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-ink">
              Famezop <span className="text-blue">Technologies</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-body">
              Building future-ready software for businesses across Nepal, India, the UAE, and worldwide.
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium text-ink">Get occasional product & engineering updates</p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-blue hover:text-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-body">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-sm text-ink/75 transition-colors hover:text-blue">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-ink/10 pt-10 sm:grid-cols-3">
          {offices.map((office) => (
            <div key={office.country} className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
              <div>
                <p className="text-sm font-medium text-ink">
                  {office.city}, {office.country} {office.isHQ && <span className="text-xs text-blue">(HQ)</span>}
                </p>
                <p className="mt-1 text-xs text-gray-body">{office.address}</p>
                <p className="mt-1 text-xs text-gray-body">{office.phone}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-gray-body sm:flex-row">
          <p>© {new Date().getFullYear()} Famezop Technologies. All rights reserved.</p>
          <p>Kathmandu · Bengaluru · Dubai</p>
        </div>
      </div>
    </footer>
  );
}
