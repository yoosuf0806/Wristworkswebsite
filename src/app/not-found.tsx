import Link from "next/link";

// Custom 404.
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="eyebrow">404</div>
      <h1 className="mt-3 font-serif text-[clamp(32px,5vw,56px)] font-normal">This page has slipped its strap.</h1>
      <p className="mt-4 max-w-[420px] text-[15px] leading-[1.8] text-muted2">
        The page you&apos;re after doesn&apos;t exist. Let&apos;s get you back to the watches.
      </p>
      <Link href="/" className="mt-8 bg-white px-8 py-4 text-[11.5px] font-semibold uppercase tracking-[.18em] text-black hover:bg-[#ccc]">
        Back to home
      </Link>
    </div>
  );
}
