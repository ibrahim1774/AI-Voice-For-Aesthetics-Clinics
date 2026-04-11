import IntakeForm from "./IntakeForm";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-4 md:py-12 aurora-bg overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(13,148,136,0.08)_0%,transparent_70%)]" />

      {/* Static ambient orb for depth */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "400px",
          background: "rgba(13, 148, 136, 0.04)",
          filter: "blur(60px)",
        }}
      />

      {/* Top edge glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        style={{ boxShadow: "0 0 15px rgba(13, 148, 136, 0.2)" }}
      />

      {/* Logo */}
      <div className="absolute top-4 left-5 z-20 md:top-6 md:left-8">
        <span className="font-serif text-lg font-bold text-foreground md:text-xl">
          Montivaro
        </span>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 mx-auto max-w-4xl w-full text-center">
        {/* Main headline */}
        <h1 className="font-serif text-xl font-bold leading-[1.2] text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          Aesthetics Clinics: Stop missing calls. Start booking consultations —{" "}
          <span className="text-gold">even at 2am.</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-2 max-w-xl font-sans text-xs leading-relaxed text-muted md:mt-3 md:text-sm">
          An AI receptionist that answers your phone, talks to clients, and books consultations while you&apos;re with a patient. Enter your info below and hear a live demo in about 20 seconds.
        </p>

        {/* Intake Form */}
        <div className="mt-3 md:mt-5">
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
