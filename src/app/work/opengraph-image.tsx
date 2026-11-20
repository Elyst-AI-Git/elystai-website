import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Elyst AI case studies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="Our works"
      headline="AI systems and AI training for real teams."
      supporting="Nalakath Holdings, Arvind Fashions, Kalyan Tourism and Autobahn Corp."
    />,
    size,
  );
}
