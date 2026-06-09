import { SITE_URL } from "@/lib/seo";

const ORG_ID = `${SITE_URL}/#organization`;

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
  image: `${SITE_URL}/og-image.png`,
  description:
    "Elyst AI builds an AI employee that changes how you run your business, and teaches people to use it through the Accelerator. Based in Kozhikode, Kerala, working across India and the GCC.",
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
    { "@type": "Person", name: "Fathima Shirin P", jobTitle: "CEO", sameAs: "https://www.linkedin.com/in/fathimashirin-p/" },
    { "@type": "Person", name: "Nihal Anas", jobTitle: "Chief AI Officer", sameAs: "https://www.linkedin.com/in/nihalanas/" },
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

/** EducationalOccupationalProgram / Course for a program page. */
export function courseSchema({
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
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID, "@type": "Organization", name: "Elyst AI" },
    inLanguage: ["en", "ml"],
    availableLanguage: ["English", "Malayalam"],
  };
}
