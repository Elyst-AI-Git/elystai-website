import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "The team behind Elyst AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="About"
      headline="Your AI implementation partner."
      supporting="The team helping businesses build practical AI systems they can own."
    />,
    size,
  );
}
