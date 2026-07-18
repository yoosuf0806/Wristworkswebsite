/** @type {import('next').NextConfig} */
// Next.js config: remote image domains (Supabase storage), strict mode
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase storage bucket for product images
      { protocol: "https", hostname: "*.supabase.co" },
      // Placeholder image host used before real images are uploaded
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
