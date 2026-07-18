import { cn } from "@/lib/utils";

// Small label badge (discount %, stock status).
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block bg-white px-[9px] py-[5px] text-[10.5px] font-bold uppercase tracking-[.1em] text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
