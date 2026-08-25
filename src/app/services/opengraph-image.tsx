import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Elyst AI implementation services for businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="Services"
      headline="Identify. Build. Handover."
      supporting="Custom AI systems built around the tools and work your team already runs."
    />,
    size,
  );
}
