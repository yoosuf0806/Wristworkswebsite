import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { guides, getGuide } from "@/lib/data/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/siteConfig";
import { absoluteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return buildMetadata({
    title: `${guide.title} | Wrist Works Journal`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ];

  // Article structured data.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  return (
    <>
      <BreadcrumbSchema crumbs={crumbs} />
      <JsonLd data={articleSchema} />
      <article className="mx-auto max-w-[760px] px-6 py-14 md:px-0">
        <Breadcrumbs crumbs={crumbs} />
        <div className="eyebrow mt-6">{guide.category} · {guide.readTime}</div>
        <h1 className="mt-3 font-serif text-[clamp(30px,4vw,48px)] font-normal leading-[1.12]">{guide.title}</h1>
        <div className="mt-8 space-y-5 text-[16px] leading-[1.9] text-muted2">
          {guide.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </>
  );
}
