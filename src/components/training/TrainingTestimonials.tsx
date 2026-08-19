const testimonials = [
  {
    quote: "The hands-on approach and showing how each tool actually works made the sessions very effective.",
    name: "Muhammed Sinan B",
    program: "AI Yathra",
  },
  {
    quote: "The session made Claude feel much easier to explore and actually use in day-to-day work.",
    name: "Adeela Thasneem",
    program: "Elyst AI Circle",
  },
  {
    quote: "It was an engaging session where we could clarify doubts, learn new things, and unlearn old ones.",
    name: "Shiju Roy",
    program: "Elyst AI Circle",
  },
] as const;

export default function TrainingTestimonials() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <figure key={testimonial.name} className="flex min-h-72 h-full flex-col rounded-md border border-border bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="font-display font-semibold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              0{index + 1}
            </span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <blockquote className="mt-6 flex-1 font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.25 }}>
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 border-t border-border pt-4">
            <strong className="block font-display text-fg" style={{ fontSize: "var(--text-small)" }}>
              {testimonial.name}
            </strong>
            <span className="text-fg-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-body)" }}>
              {testimonial.program}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
