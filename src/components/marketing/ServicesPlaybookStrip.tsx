import Image from "next/image";
import { BrandButton } from "@/components/ui/brand-button";

function PlaybookCover() {
  return (
    <div
      className="relative mx-auto w-full max-w-[13rem] [transform:perspective(900px)_rotateY(-9deg)_rotateX(2deg)_rotateZ(2deg)] rounded-[3px] bg-[#f6f8f5] shadow-[12px_18px_30px_rgb(3_34_25/25%),0_3px_8px_rgb(3_34_25/18%)] sm:mx-0 sm:max-w-[14rem]"
    >
      <Image
        src="/images/playbook-cover.jpg"
        alt="The Elyst AI Playbook cover"
        width={1240}
        height={1754}
        sizes="(max-width: 639px) 208px, 224px"
        className="block h-auto w-full rounded-[3px]"
      />
    </div>
  );
}

export default function ServicesPlaybookStrip() {
  return (
    <section className="relative overflow-hidden bg-surface-accent-soft" aria-labelledby="services-playbook-heading">
      <div className="mx-auto grid max-w-7xl gap-8 px-[var(--section-px)] py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
          <PlaybookCover />
          <div>
            <h2
              id="services-playbook-heading"
              className="font-display font-semibold text-fg"
              style={{ fontSize: "var(--text-card)", lineHeight: 1.15 }}
            >
              Not ready to book a call?
            </h2>
            <p className="mt-2 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
              Start with one workflow. Our practical playbook helps you find where AI can help, test it in 30 days, and make it stick.
            </p>
          </div>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <BrandButton
            href="/playbook.pdf"
            download="elyst-ai-playbook.pdf"
            variant="metal"
            tone="emerald"
            className="min-h-12! px-6! text-[length:var(--text-small)]"
          >
            Download the playbook
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
