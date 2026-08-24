import { SITE_URL } from "@/lib/seo";

export const ORG_ID = `${SITE_URL}/#organization`;

/** Sitewide organization facts that are also visible in the site footer. */
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Elyst AI",
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}/images/og/site.png`,
  description:
    "We understand how your company works, identify where AI can elevate the business, build the right AI system, and train your team to run it.",
  email: "info@elystai.com",
  telephone: "+91-9633288931",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@elystai.com",
    telephone: "+91-9633288931",
  },
  sameAs: [
    "https://www.linkedin.com/company/elystai/",
    "https://www.instagram.com/elyst.ai/",
  ],
};

export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Elyst AI",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID, "@type": "Organization", name: "Elyst AI" },
  };
}

export function personSchema({
  name,
  jobTitle,
  description,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    sameAs,
    worksFor: { "@id": ORG_ID },
  };
}
