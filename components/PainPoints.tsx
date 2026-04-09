import ScrollReveal from "./ScrollReveal";

const STATS = [
  {
    stat: "40%",
    headline: "of calls to aesthetics clinics go unanswered",
    detail:
      "Nearly half of incoming calls never get answered. Each one could be a $500 facial, a $2,000 filler package, or a $10,000 lifetime client \u2014 lost to a competitor in seconds.",
  },
  {
    stat: "80%",
    headline: "of callers won\u2019t leave a voicemail",
    detail:
      "Eight out of ten callers hang up and call the next clinic. By the time you call back, they\u2019ve already booked a consultation elsewhere.",
  },
  {
    stat: "$500",
    headline: "per month for a generic answering service",
    detail:
      "Traditional answering services cost $300\u2013500/month, put callers on hold, and know nothing about your treatments. Your clients deserve better.",
  },
  {
    stat: "24/7",
    headline: "seamless coverage, always on",
    detail:
      "Montivaro answers instantly, every time. It knows your services, books consultations, and delivers a polished first impression \u2014 nights, weekends, holidays.",
  },
];

export default function PainPoints() {
  return (
    <section className="px-4 py-28 relative section-glow-divider overflow-hidden">
      {/* Depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,20,0.8)_0%,rgba(10,10,10,1)_80%)]" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-20">
          <p className="font-sans text-sm uppercase tracking-[0.25em] text-gold mb-4">
            The Reality
          </p>
          <h2 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Every Missed Call Is a{" "}
            <span className="text-gold">Client Lost</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {STATS.map((item) => (
            <ScrollReveal key={item.stat}>
              <div className="group">
                <p className="font-serif text-7xl font-bold text-gold md:text-8xl">
                  {item.stat}
                </p>
                <p className="mt-4 font-sans text-xl font-medium text-white">
                  {item.headline}
                </p>
                <p className="mt-3 font-sans text-muted leading-relaxed">
                  {item.detail}
                </p>
                <div className="mt-6 h-px w-16 bg-gradient-to-r from-gold/40 to-transparent" style={{ boxShadow: "0 0 8px rgba(196, 168, 130, 0.15)" }} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
