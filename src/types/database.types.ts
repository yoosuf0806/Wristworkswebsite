// Supabase database types. In production regenerate with:
//   npm run types   (supabase gen types typescript)
// This hand-authored version matches supabase/migrations and keeps the app
// type-safe before the CLI is wired up.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          brand: string;
          categories: string[];
          reference: string | null;
          description: string;
          specs: Json | null;
          price: number;
          offer_price: number | null;
          stock: number;
          featured: boolean;
          new_arrival: boolean;
          rating_average: number;
          rating_count: number;
          meta_title: string | null;
          meta_description: string | null;
          focus_keyword: string | null;
          og_image: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          slug: string;
          name: string;
          brand: string;
          price: number;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt: string;
          position: number;
        };
        Insert: Omit<Database["public"]["Tables"]["product_images"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["product_images"]["Row"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          slug: string;
          kind: string;
          title: string;
          intro: string | null;
          seo_paragraph: string;
          meta_title: string | null;
          meta_description: string | null;
          focus_keyword: string | null;
          og_image: string | null;
        };
        Insert: Database["public"]["Tables"]["categories"]["Row"];
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          author: string;
          city: string | null;
          rating: number;
          body: string;
          approved: boolean;
          source: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["reviews"]["Row"]> & {
          product_id: string;
          author: string;
          rating: number;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          scope: string;
          scope_ref: string | null;
          position: number;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & {
          question: string;
          answer: string;
          scope: string;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
        Relationships: [];
      };
      discount_codes: {
        Row: {
          id: string;
          code: string;
          type: string;
          value: number;
          min_subtotal: number | null;
          active: boolean;
          expires_at: string | null;
          usage_limit: number | null;
          used_count: number;
        };
        Insert: Partial<Database["public"]["Tables"]["discount_codes"]["Row"]> & {
          code: string;
          type: string;
          value: number;
        };
        Update: Partial<Database["public"]["Tables"]["discount_codes"]["Row"]>;
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string;
          city: string | null;
          orders_count: number;
          total_spent: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["customers"]["Row"]> & {
          name: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Row"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          reference: string;
          customer: Json;
          items: Json;
          subtotal: number;
          discount_code: string | null;
          discount_amount: number;
          shipping: number;
          total: number;
          payment_method: string;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["orders"]["Row"]> & {
          reference: string;
          customer: Json;
          items: Json;
          total: number;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Relationships: [];
      };
      page_seo: {
        Row: {
          page_key: string;
          h1: string | null;
          seo_paragraph: string | null;
          meta_title: string | null;
          meta_description: string | null;
          focus_keyword: string | null;
          og_image: string | null;
        };
        Insert: Database["public"]["Tables"]["page_seo"]["Row"];
        Update: Partial<Database["public"]["Tables"]["page_seo"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
