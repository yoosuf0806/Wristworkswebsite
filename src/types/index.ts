// App-level domain types. These mirror the Supabase tables but are the shapes
// the UI and data layer actually pass around (camelCase, computed fields).

export type Brand = "Casio" | "Edifice" | "Seiko" | "Citizen";

export type WatchCategory =
  | "mens-watches"
  | "womens-watches"
  | "digital-watches"
  | "analog-watches"
  | "dress-watches"
  | "dive-watches"
  | "unisex-watches";

// A single product image with SEO alt text (stored per image in Supabase).
export interface ProductImage {
  url: string;
  alt: string;
  position: number;
}

// A review left on a product.
export interface Review {
  id: string;
  productId: string;
  author: string;
  city?: string | null;
  rating: number; // 1–5
  body: string;
  approved: boolean;
  source?: "site" | "google" | null;
  createdAt: string;
}

// A single FAQ entry, scoped to a product, category/brand, or a static page.
export interface Faq {
  id: string;
  question: string;
  answer: string;
  scope: "global" | "product" | "category" | "page";
  scopeRef?: string | null; // product slug / category slug / page key
  position: number;
}

// SEO fields attached to products, categories, brands and static pages.
export interface SeoFields {
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  ogImage?: string | null;
}

// The core product entity.
export interface Product extends SeoFields {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  categories: WatchCategory[];
  reference?: string | null;
  description: string;
  specs?: Record<string, string> | null;
  price: number; // original price in LKR
  offerPrice?: number | null; // discounted price, if on sale
  stock: number;
  featured: boolean;
  newArrival: boolean;
  images: ProductImage[];
  ratingAverage: number;
  ratingCount: number;
  createdAt: string;
}

// Category / brand landing-page content — each editable from admin.
export interface CategoryContent extends SeoFields {
  slug: string;
  kind: "category" | "brand";
  title: string; // H1
  seoParagraph: string;
  intro?: string | null;
}

// Cart line item held in the client store.
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: Brand;
  image: string;
  imageAlt: string;
  price: number; // unit price actually charged (offer if present)
  qty: number;
}

// Discount code.
export interface DiscountCode {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minSubtotal?: number | null;
  active: boolean;
  expiresAt?: string | null;
  usageLimit?: number | null;
  usedCount: number;
}

// Customer record.
export interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  city?: string | null;
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  reference: string; // human-friendly order number
  customer: {
    name: string;
    phone: string;
    email?: string | null;
    address: string;
    city: string;
  };
  items: OrderItem[];
  subtotal: number;
  discountCode?: string | null;
  discountAmount: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "card" | "koko" | "bank";
  status: OrderStatus;
  createdAt: string;
}
