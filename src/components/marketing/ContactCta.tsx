import { BrandButton } from "@/components/ui/brand-button";

/**
 * The one call to action used across the site. Always reads "Get in touch"
 * and always goes to /contact.
 */
export default function ContactCta({
  label = "Get in touch",
  variant = "solid",
  tone = "emerald",
  className,
  full,
  onClick,
}: {
  label?: string;
  variant?: "metal" | "outline" | "solid";
  tone?: "emerald" | "light" | "green";
  className?: string;
  full?: boolean;
  onClick?: () => void;
}) {
  const solidClass =
    variant !== "solid"
      ? ""
      : tone === "light"
        ? "bg-[#eef0ee]! text-[#0a0a0a]! hover:bg-[#e3e6e2]!"
        : tone === "green"
          ? "bg-green! text-[#06140e]! hover:bg-[#00c973]!"
          : "bg-emerald! text-fg-on-dark! hover:bg-emerald-light!";

  return (
    <BrandButton
      href="/contact"
      variant={variant}
      tone={tone}
      className={[solidClass, className].filter(Boolean).join(" ")}
      full={full}
      onClick={onClick}
    >
      {label}
    </BrandButton>
  );
}
