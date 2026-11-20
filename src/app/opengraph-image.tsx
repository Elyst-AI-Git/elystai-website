import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Elyst AI: put AI to work in your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="Elyst AI"
      headline="Put AI to work in your business."
      supporting="We find the work AI can do for you, build it, and train your people to use it."
    />,
    size,
  );
}
