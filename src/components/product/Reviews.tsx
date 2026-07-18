import type { Review } from "@/types";
import { Rating } from "@/components/ui/Rating";

// Review list with per-review rating. Aggregate rating is shown in the product
// header and emitted in the Product schema markup.
export function Reviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-[13.5px] text-muted">
        No reviews yet — be the first to review this watch.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.id} className="border-t border-line pt-6">
          <Rating value={r.rating} />
          <p className="my-3 text-[14px] leading-[1.7] text-[#ddd]">&ldquo;{r.body}&rdquo;</p>
          <div className="text-[12px] uppercase tracking-[.14em] text-muted">
            {r.author}
            {r.city ? ` · ${r.city}` : ""}
            {r.source === "google" ? " · via Google" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
