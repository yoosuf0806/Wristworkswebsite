import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { AccountForm } from "@/components/account/AccountForm";

export const metadata: Metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your Wrist Works account to track orders and save your details.",
  path: "/account",
  noIndex: true,
});

// Account page — centered sign-in / create-account form. Wired to Supabase
// Auth when configured; guest checkout remains available either way.
export default function AccountPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <AccountForm />
    </div>
  );
}
