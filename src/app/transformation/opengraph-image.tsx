import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Elyst AI Transformation for growing businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="AI Transformation"
      headline="Change how your team works with AI."
      supporting="We find the work AI can do, build it, and train your people."
    />,
    size,
  );
}
