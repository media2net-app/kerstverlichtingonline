import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { ShopCard } from "@/components/shop-card";
import { getBlogPostBySlug, getRelatedProducts } from "@/lib/blog-posts";
import { scrapeAmazonListings } from "@/lib/amazon";
import { SAMPLE_FEATURED_PRODUCTS } from "@/lib/sample-products";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f7f7f7]">
        <SiteHeader />
        <div className="px-6 py-16 text-center text-slate-700">
          <div className="mx-auto max-w-2xl rounded-3xl bg-white p-12 shadow-lg">
            <h1 className="text-3xl font-semibold text-slate-900">Artikel niet gevonden</h1>
            <p className="mt-4 text-slate-500">
              Het gevraagde blog artikel kon niet worden gevonden.
            </p>
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
              >
                Terug naar blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get all products for related products
  let allProducts: Awaited<ReturnType<typeof scrapeAmazonListings>>;
  try {
    allProducts = await scrapeAmazonListings(undefined, 50);
  } catch {
    allProducts = {
      products: SAMPLE_FEATURED_PRODUCTS,
      scrapedAt: new Date().toISOString(),
      source: "",
    };
  }

  const products =
    allProducts.products.length > 0
      ? allProducts.products
      : SAMPLE_FEATURED_PRODUCTS;

  const relatedProducts = getRelatedProducts(post, products);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="w-full px-6 py-10 lg:px-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Terug naar blog
        </Link>

        <article className="rounded-3xl bg-white p-8 shadow-lg sm:p-12">
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3 text-sm text-slate-500">
              <span>{new Date(post.date).toLocaleDateString("nl-NL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              {post.title}
            </h1>
          </div>

          {post.image && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, (min-width:769px) 80vw"
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none space-y-6">
            {post.content
              .trim()
              .split("\n\n")
              .map((block, blockIndex) => {
                const lines = block.split("\n").filter((l) => l.trim());
                const firstLine = lines[0]?.trim() || "";

                if (firstLine.startsWith("# ")) {
                  return (
                    <h1 key={blockIndex} className="text-3xl font-semibold text-slate-900">
                      {firstLine.substring(2)}
                    </h1>
                  );
                }
                if (firstLine.startsWith("## ")) {
                  return (
                    <h2 key={blockIndex} className="text-2xl font-semibold text-slate-900">
                      {firstLine.substring(3)}
                    </h2>
                  );
                }
                if (firstLine.startsWith("### ")) {
                  return (
                    <h3 key={blockIndex} className="text-xl font-semibold text-slate-900">
                      {firstLine.substring(4)}
                    </h3>
                  );
                }
                if (lines.every((l) => l.trim().startsWith("- "))) {
                  return (
                    <ul key={blockIndex} className="ml-6 list-disc space-y-2">
                      {lines.map((line, lineIndex) => (
                        <li key={lineIndex} className="text-slate-700">
                          {line.trim().substring(2)}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={blockIndex} className="leading-relaxed text-slate-700">
                    {block.trim()}
                  </p>
                );
              })}
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Gerelateerde producten</h2>
              <p className="mt-2 text-slate-600">
                Ontdek de producten die we in dit artikel bespreken
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ShopCard key={product.asin} product={product} />
              ))}
            </div>
          </div>
        </article>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-slate-800"
          >
            Meer blog artikelen
          </Link>
        </div>
      </main>
    </div>
  );
}

