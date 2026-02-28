"use client";

import { useEffect } from "react";
import { BOOKING_WIDGET_URL, FORM_EMBED_SCRIPT_URL } from "@/lib/constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Load the form embed script
  useEffect(() => {
    if (!isOpen) return;

    const existing = document.querySelector(
      `script[src="${FORM_EMBED_SCRIPT_URL}"]`
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = FORM_EMBED_SCRIPT_URL;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative z-10 mx-4 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-gold/20 bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-white">
            Book Your Setup Call
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-subtle transition-colors hover:text-white"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Calendar Widget */}
        <div className="overflow-y-auto" style={{ height: "calc(90vh - 72px)" }}>
          <iframe
            src={BOOKING_WIDGET_URL}
            style={{ width: "100%", height: "100%", border: "none" }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
