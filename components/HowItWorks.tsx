import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    number: "01",
    title: "Share Your Practice Details",
    description:
      "Your clinic name, phone, and primary goal. That\u2019s all we need.",
  },
  {
    number: "02",
    title: "We Create Your Concierge",
    description:
      "In seconds, your AI is trained on aesthetics services and your specific practice.",
  },
  {
    number: "03",
    title: "Experience It Live",
    description:
      "Call your concierge from your browser. Hear exactly how your clients will be greeted.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-28 relative section-glow-divider overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-20">
          <p className="font-sans text-sm uppercase tracking-[0.25em] text-gold mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Live in Under{" "}
            <span className="text-gold">60 Seconds</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <ScrollReveal key={step.number}>
              <div className="gold-glow-border rounded-2xl p-8 md:p-10 h-full transition-all duration-500">
                <span className="font-serif text-6xl font-bold text-gold/15">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
