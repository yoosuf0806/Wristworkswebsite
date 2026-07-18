"use client";

// Global error boundary.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="eyebrow">Something went wrong</div>
      <h1 className="mt-3 font-serif text-[clamp(28px,4vw,44px)] font-normal">A gear came loose.</h1>
      <p className="mt-4 max-w-[420px] text-[15px] leading-[1.8] text-muted2">
        We hit an unexpected error. Try again, or message us on WhatsApp if it keeps happening.
      </p>
      <button onClick={reset} className="mt-8 border border-line2 px-8 py-4 text-[11.5px] font-semibold uppercase tracking-[.18em] hover:border-white">
        Try again
      </button>
    </div>
  );
}
