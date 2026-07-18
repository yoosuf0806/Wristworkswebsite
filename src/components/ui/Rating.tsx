import { cn } from "@/lib/utils";

// Star rating display. Shows five characters with the filled portion in white.
export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="tracking-[.3em] text-white text-[13px]" aria-hidden>
        {"★★★★★".slice(0, rounded)}
        <span className="text-[#444]">{"★★★★★".slice(rounded)}</span>
      </span>
      {typeof count === "number" && (
        <span className="text-[11.5px] text-muted">
          {value.toFixed(1)} · {count} {count === 1 ? "review" : "reviews"}
        </span>
      )}
    </div>
  );
}
