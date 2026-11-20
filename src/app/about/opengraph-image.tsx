import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "The team behind Elyst AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="About"
      headline="We started Elyst AI because businesses struggle to get value out of AI."
      supporting="The team helping businesses build practical AI systems they can own."
    />,
    size,
  );
}
