import Link from "next/link";
import { cn } from "@/lib/utils";

// Button / link primitive matching the design's uppercase CTA style.
type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  solid: "bg-white text-black hover:bg-[#cccccc]",
  outline: "border border-line2 text-white hover:bg-white hover:text-black hover:border-white",
  ghost: "text-white border-b border-[#555] hover:border-white pb-1",
};

interface Props {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({ children, href, variant = "solid", className, onClick, type = "button", disabled }: Props) {
  const base =
    "inline-flex items-center justify-center cap font-semibold transition-all duration-200";
  const pad = variant === "ghost" ? "" : "px-8 py-4";
  const classes = cn(base, pad, styles[variant], disabled && "opacity-50 pointer-events-none", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
