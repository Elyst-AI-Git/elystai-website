import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Elyst AI strategy, implementation, and custom AI development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="Elyst AI"
      headline="Change how your team works with AI."
      supporting="Strategy, custom AI systems, implementation, and team handover."
    />,
    size,
  );
}
