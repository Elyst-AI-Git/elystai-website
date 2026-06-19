"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import EnquiryForm from "./EnquiryForm";
import { PRICE, ORIGINAL_PRICE, INCLUDED, RAZORPAY_URL } from "./config";

/**
 * Price & Enrol — the conversion section. A single transparent pricing card
 * states the one-time price and everything included, then the enrol block:
 * primary "Pay & enrol now" → Razorpay, secondary "Enquire first" reveals the
 * on-site enquiry form inline (no Google Form, no leaving the page).
 */
export default function PriceEnrol() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <section id="enrol" className="scroll-mt-24" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <SectionMark>Price & enrol</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            One price. Everything included.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 overflow-hidden rounded-[24px] border border-border bg-white shadow-card"
        >
          <div className="bg-surface-dark px-8 py-10 text-center">
            <p className="text-fg-on-dark/70" style={{ fontSize: "var(--text-small)" }}>
              AI for Work · one-time
            </p>
            <div className="mt-2 flex items-baseline justify-center gap-3">
              <span
                className="font-display font-bold text-fg-on-dark/50 line-through"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1, textDecorationColor: "rgba(255,255,255,0.4)" }}
              >
                {ORIGINAL_PRICE}
              </span>
              <span className="font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-hero)", lineHeight: 1 }}>
                {PRICE}
              </span>
            </div>
            <p className="mt-3 inline-block rounded-full px-3 py-1 font-semibold" style={{ background: "var(--elyst-green)", color: "#053d2e", fontSize: "0.8rem" }}>
              Limited-time offer price
            </p>
          </div>

          <div className="px-8 py-8">
            <ul className="flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-emerald" />
                  <span className="text-fg-2" style={{ fontSize: "var(--text-small)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <BrandButton href={RAZORPAY_URL} tone="green" full>
                Pay &amp; enrol now · {PRICE}
              </BrandButton>
              {!showEnquiry && (
                <button
                  type="button"
                  onClick={() => setShowEnquiry(true)}
                  className="text-center font-medium text-emerald underline-offset-4 hover:underline"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  Enquire first
                </button>
              )}
            </div>

            {showEnquiry && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 border-t border-border pt-8">
                  <p className="mb-4 text-center text-fg-2" style={{ fontSize: "var(--text-small)" }}>
                    Not sure yet? Send us your question and we&rsquo;ll get back to you.
                  </p>
                  <EnquiryForm />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
