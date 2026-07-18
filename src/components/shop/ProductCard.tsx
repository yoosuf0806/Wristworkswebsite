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
        {product.stock === 0 && (
          <div className="absolute left-3 top-3 bg-black/80 px-[9px] py-[5px] text-[10.5px] font-bold uppercase tracking-[.1em] text-white">
            Sold out
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
