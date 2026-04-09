"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const REDIRECT_URL = "https://primehubagency.com/success-page-1";
const REDIRECT_DELAY = 3;

export default function ThankYouPage() {
  const firedRef = useRef(false);
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Client-side: fire Facebook Purchase pixel
    if (window.fbq) {
      window.fbq("track", "Purchase", { value: 29.0, currency: "USD" });
    }

    // Server-side: fire Meta Conversions API
    fetch("/api/meta-conversion", { method: "POST" }).catch(() => {});
  }, []);

  // Countdown + redirect
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = REDIRECT_URL;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-4 py-16 grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-lg w-full text-center">
        {/* Checkmark icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/10">
          <svg
            className="h-10 w-10 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">
          Thank You for Your Purchase!
        </h1>

        <p className="mx-auto mt-4 max-w-md font-sans text-base leading-relaxed text-muted">
          Your AI Receptionist is on the way. We&apos;ll get your
          system set up within 24 hours.
        </p>

        <p className="mt-6 font-sans text-sm text-subtle">
          Redirecting you in{" "}
          <span className="text-gold font-semibold">{countdown}</span>
          {countdown === 1 ? " second" : " seconds"}...
        </p>

        <div className="mt-4">
          <a
            href={REDIRECT_URL}
            className="inline-block w-full rounded-xl bg-gold px-8 py-4 font-sans text-base font-semibold text-background transition-all duration-300 hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
            }}
          >
            Continue Setup Now
          </a>
        </div>
      </div>
    </section>
  );
}
