import { SITE_URL } from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Elyst AI",
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}/images/og/site.png`,
  description: "Elyst AI audits how your team works, builds the right AI system, and hands it over with training and documentation.",
  email: "info@elystai.com",
  telephone: "+91-9633288931",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
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

export const aboutPeopleSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#fathima-shirin-p`,
      name: "Fathima Shirin P",
      jobTitle: "Co-founder and CEO",
      description: "Co-founder and CEO. Discovery, solution mapping, training, adoption.",
      worksFor: { "@id": ORG_ID },
      sameAs: "https://www.linkedin.com/in/fathimashirin-p/",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#nihal-anas`,
      name: "Nihal Anas",
      jobTitle: "Co-founder and Chief AI Officer",
      description: "Co-founder and Chief AI Officer. Technical scoping, implementation, handover.",
      worksFor: { "@id": ORG_ID },
      sameAs: "https://www.linkedin.com/in/nihalanas/",
    },
  ],
};

export function breadcrumbSchema(name: string, path: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function serviceSchema({
  path,
  name,
  description,
  serviceType,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType,
    url: `${SITE_URL}${path}`,
    description,
    provider: { "@id": ORG_ID },
  };
}

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
    price: number;
    priceCurrency: string;
    startDate?: string;
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
