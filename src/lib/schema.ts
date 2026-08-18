import { SITE_URL } from "@/lib/seo";

export const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Sitewide Organization + LocalBusiness entity. Establishes "Elyst AI" as a
 * brand entity for search and answer engines. Address is locality-level
 * (Kozhikode, Kerala); add a street address + geo coordinates later to enrich
 * the local listing.
 */
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: "Elyst AI",
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}/images/og/site.png`,
  description:
    "We audit how your company work, identify ways which AI can elevate the business, build the right AI system, and train your team to run it.",
  foundingDate: "2026",
  email: "info@elystai.com",
  telephone: "+91-9633288931",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "GCC" },
  ],
  founder: [
    { "@type": "Person", name: "Fathima Shirin P", jobTitle: "Co-founder and CEO", sameAs: "https://www.linkedin.com/in/fathimashirin-p/" },
    { "@type": "Person", name: "Nihal Anas", jobTitle: "Co-founder and Chief AI Officer", sameAs: "https://www.linkedin.com/in/nihalanas/" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@elystai.com",
    telephone: "+91-9633288931",
    areaServed: ["IN", "AE", "SA", "QA", "KW", "OM", "BH"],
    availableLanguage: ["English", "Malayalam"],
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
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "GCC" },
    ],
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

/**
 * EducationalOccupationalProgram / Course for a program page. `offer` is
 * optional — pass it for a paid, dated cohort (e.g. /ai-for-work) to attach a
 * Course→hasCourseInstance→offers block, which is what lets Google show a
 * price/availability rich result instead of a bare Course card. Omit it for
 * an evergreen catalog page like /learn that has no single fixed price/date.
 */
export function courseSchema({
  path,
  name,
  description,
  offer,
}: {
  path: string;
  name: string;
  description: string;
  offer?: {
    price: number; // in the given currency's major unit (e.g. rupees, not paise)
    priceCurrency: string; // ISO 4217, e.g. "INR"
    startDate?: string; // ISO 8601 date, e.g. "2026-07-13"
  };
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID, "@type": "Organization", name: "Elyst AI" },
    inLanguage: ["en", "ml"],
    availableLanguage: ["English", "Malayalam"],
    ...(offer && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        ...(offer.startDate && { startDate: offer.startDate }),
        offers: {
          "@type": "Offer",
          price: offer.price,
          priceCurrency: offer.priceCurrency,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}${path}`,
        },
      },
    }),
  };
}
