import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, discountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

// Product card used in grids, related products and search. Uses next/image
// with the image's stored SEO alt text.
export function ProductCard({ product }: { product: Product }) {
  const onSale = !!product.offerPrice && product.offerPrice < product.price;
  const price = product.offerPrice ?? product.price;
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block border border-line bg-card transition-colors duration-200 hover:border-[#3a3a3a]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#e9e8e5]">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {onSale && (
          <div className="absolute right-3 top-3">
            <Badge>−{discountPercent(product.price, product.offerPrice)}%</Badge>
          </div>
        )}

        {/* Out-of-stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="border border-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.18em] text-white">
              Out of stock
            </span>
          </div>
        )}

        {/* Quick view on hover (in-stock only) */}
        {product.stock > 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="bg-white px-[22px] py-[11px] text-[10.5px] font-semibold uppercase tracking-[.16em] text-black">
              Quick view
            </span>
          </div>
        )}
      </div>
      <div className="px-5 pb-[22px] pt-[18px]">
        <div className="text-[10.5px] uppercase tracking-[.22em] text-muted">{product.brand}</div>
        <div className="mt-[7px] text-[14.5px] font-medium leading-[1.45] text-white">{product.name}</div>
        <div className="mt-[11px] flex items-baseline gap-[10px]">
          <span className="text-[15px] font-bold text-white">{formatPrice(price)}</span>
          {onSale && (
            <span className="text-[12.5px] text-[#666] line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
