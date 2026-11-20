import { SITE_URL } from "@/lib/seo";
import { CONTACT, ONE_LINER } from "@/lib/site-content";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

const COUNTRIES = ["IN", "AE", "SA", "QA", "KW", "BH", "OM"] as const;

/** Where Elyst AI works: India and the GCC, with the in-person cities named. */
const AREA_SERVED: Node[] = [
  ...COUNTRIES.map((name) => ({ "@type": "Country", name })),
  { "@type": "State", name: "Kerala" },
  { "@type": "State", name: "Karnataka" },
  { "@type": "City", name: "Kochi" },
  { "@type": "City", name: "Bengaluru" },
  { "@type": "City", name: "Dubai" },
];

const founderId = (id: string) => `${SITE_URL}/about#${id}`;

/** Sitewide organization facts that are also visible in the site footer. */
export const organizationSchema: Node = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "Elyst AI",
  alternateName: "Elyst",
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: ONE_LINER,
  slogan: ONE_LINER,
  email: CONTACT.email,
  telephone: "+91-9633288931",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: "Kozhikode", addressRegion: "Kerala", addressCountry: "IN" },
  },
  founder: [{ "@id": founderId("nihal-anas") }, { "@id": founderId("fathima-shirin-p") }],
  areaServed: AREA_SERVED,
  knowsAbout: [
    "AI transformation",
    "AI implementation",
    "AI systems for business",
    "AI automation",
    "corporate AI training",
    "generative AI training",
    "AI adoption",
  ],
  knowsLanguage: ["en", "ml"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Elyst AI services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@id": `${SITE_URL}/transformation#service` } },
      { "@type": "Offer", itemOffered: { "@id": `${SITE_URL}/kickstart#service` } },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: "+91-9633288931",
    areaServed: [...COUNTRIES],
    availableLanguage: ["English", "Malayalam"],
  },
  sameAs: [CONTACT.linkedinHref, CONTACT.instagramHref],
};

export const websiteSchema: Node = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Elyst AI",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export function breadcrumbSchema(items: { name: string; path: string }[]): Node {
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

/** One WebPage node per page, linked to the site and the organization. */
export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): Node {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
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
}): Node {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    audience: { "@type": "BusinessAudience", audienceType: "Growing businesses and their teams" },
  };
}

/** AI Kickstart as a course: in person in three places, or online. */
export function kickstartCourseSchema(description: string): Node {
  const place = (name: string, locality: string, country: string) => ({
    "@type": "Place",
    name,
    address: { "@type": "PostalAddress", addressLocality: locality, addressCountry: country },
  });
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/kickstart#course`,
    name: "AI Kickstart",
    description,
    url: `${SITE_URL}/kickstart`,
    provider: { "@id": ORG_ID },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "onsite",
        location: [place("Kerala", "Kochi", "IN"), place("Bengaluru", "Bengaluru", "IN"), place("UAE", "Dubai", "AE")],
      },
      { "@type": "CourseInstance", courseMode: "online" },
    ],
  };
}

export function faqPageSchema(faqs: readonly { q: string; a: string }[], path: string): Node {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${path === "/" ? SITE_URL : `${SITE_URL}${path}`}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function personSchema({
  id,
  name,
  jobTitle,
  description,
  image,
  sameAs,
}: {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  sameAs: string[];
}): Node {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId(id),
    name,
    jobTitle,
    description,
    image: `${SITE_URL}${image}`,
    sameAs,
    worksFor: { "@id": ORG_ID },
    knowsAbout: ["AI transformation", "AI systems for business", "corporate AI training"],
  };
}

/** The four case studies as an ordered list, for the Works page. */
export function caseListSchema(items: readonly { path: string; name: string }[]): Node {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/work#list`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
    })),
  };
}

/** One @graph for a case study page: Article, FAQPage and BreadcrumbList. */
export function caseStudySchema({
  path,
  headline,
  description,
  image,
  keywords,
  category,
  categoryPath,
  client,
  country,
  faqs,
}: {
  path: string;
  headline: string;
  description: string;
  image: string;
  keywords: string;
  category: string;
  categoryPath: string;
  client: string;
  country: "IN" | "AE";
  faqs: readonly { q: string; a: string }[];
}): Node {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline,
        description,
        url,
        mainEntityOfPage: url,
        image,
        articleSection: "Case study",
        keywords,
        inLanguage: "en",
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: {
          "@type": "Service",
          serviceType: category,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: country },
        },
        mentions: { "@type": "Organization", name: client },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/work` },
          { "@type": "ListItem", position: 3, name: category, item: `${SITE_URL}${categoryPath}` },
          { "@type": "ListItem", position: 4, name: client, item: url },
        ],
      },
    ],
  };
}
