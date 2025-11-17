import Image from "next/image";
import Link from "next/link";
import { scrapeAmazonListings, scrapeProductReviews } from "@/lib/amazon";
import { SAMPLE_FEATURED_PRODUCTS } from "@/lib/sample-products";
import { createProductSlug } from "@/lib/slug";
import { SiteHeader } from "@/components/site-header";
import { ShopFilterPanel } from "@/components/shop-filter-panel";
import { ShopCard } from "@/components/shop-card";
import { ProductReviews } from "@/components/product-reviews";
import { AddToCartButton } from "@/components/add-to-cart-button";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const filterConfig = [
  { title: "Product type", options: ["Vlaggenmast bomen", "LED lichtmantels", "Cluster verlichting", "Accessoires"] },
  { title: "Merk", options: ["Fairybell", "Galaxy", "vidaXL", "iBaycon", "Tidyard"] },
  { title: "Kleur", options: ["Warm wit", "Kleurrijk", "Koel wit"] },
  { title: "Lengte", options: ["3 m", "5 m", "6 m", "8 m+"] },
  { title: "Beschikbaarheid", options: ["Op voorraad", "Pre-order"] },
];

const matchSlug = (title: string, slug: string, explicitSlug?: string) =>
  (explicitSlug ?? createProductSlug(title)) === slug;

async function getProduct(slug: string) {
  const fallback = SAMPLE_FEATURED_PRODUCTS.find((p) => matchSlug(p.title, slug, p.slug)) ?? null;
  try {
    const { products } = await scrapeAmazonListings(undefined, 50);
    const match = products.find((product) => matchSlug(product.title, slug, product.slug));
    return match ?? fallback;
  } catch {
    return fallback;
  }
}

async function getRelatedProducts(currentProductSlug: string, currentAsin: string) {
  try {
    const { products } = await scrapeAmazonListings(undefined, 50);
    // Filter out current product and get up to 5 related products
    const related = products
      .filter((p) => p.asin !== currentAsin && !matchSlug(p.title, currentProductSlug, p.slug))
      .slice(0, 5);
    
    // If we don't have enough scraped products, fill with samples (excluding current)
    if (related.length < 5) {
      const sampleRelated = SAMPLE_FEATURED_PRODUCTS
        .filter((p) => p.asin !== currentAsin && !matchSlug(p.title, currentProductSlug, p.slug))
        .slice(0, 5 - related.length);
      return [...related, ...sampleRelated].slice(0, 5);
    }
    
    return related;
  } catch {
    // Fallback to samples
    return SAMPLE_FEATURED_PRODUCTS
      .filter((p) => p.asin !== currentAsin && !matchSlug(p.title, currentProductSlug, p.slug))
      .slice(0, 5);
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <SiteHeader />
      <div className="px-6 py-16 text-center text-slate-700">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-12 shadow-lg">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Niet gevonden</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Dit product is momenteel niet beschikbaar.
          </h1>
          <p className="mt-4 text-slate-500">
            Ga terug naar ons assortiment en ontdek andere vlaggenmastverlichtingen.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Terug naar shop
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }

  const relatedProducts = await getRelatedProducts(slug, product.asin);
  
  // Scrape reviews if product has URL
  const reviews = product.url 
    ? await scrapeProductReviews(product.url, 5)
    : [];

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1600px] px-6 py-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            <ShopFilterPanel filters={filterConfig} />
          </div>

          {/* Center - Product Info */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-10">
              <div className="relative mb-8 h-[420px] overflow-hidden rounded-2xl bg-slate-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, (min-width:769px) 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    Geen afbeelding beschikbaar
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Vlaggenmast</p>
                  <h1 className="mt-3 text-4xl font-semibold text-slate-900">{product.title}</h1>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  {product.rating && <span>Beoordeling: {product.rating}</span>}
                  {product.reviews && <span>{product.reviews}</span>}
                  {product.delivery && <span>Levering: {product.delivery}</span>}
                </div>
                <p className="text-lg leading-relaxed text-slate-600">
                  Deze vlaggenmast kerstboom brengt dezelfde magie naar je tuin als de Amazon-versie,
                  maar dan met de persoonlijke service van kerstverlichtingonline.nl. Perfect voor
                  tuinen, bedrijfsterreinen en feestlocaties die een statement willen maken.
                </p>
                <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <li className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Aantal LEDs</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {product.title.match(/\d+\s*LED/)?.[0] ?? "1500 LEDs"}
                    </p>
                  </li>
                  <li className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Hoogte</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {product.title.match(/\d+(\,\d+)?\s*m/)?.[0] ?? "6 meter"}
                    </p>
                  </li>
                  <li className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Kleur</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {product.title.toLowerCase().includes("warm")
                        ? "Warm wit"
                        : product.title.toLowerCase().includes("kleur")
                          ? "Multicolor"
                          : "LED"}
                    </p>
                  </li>
                  <li className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Serie</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {product.badge ?? "Premium selectie"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Price & Actions */}
          <div className="lg:col-span-3">
            <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-lg lg:sticky lg:top-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Prijs</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">
                  {product.price ?? "Prijs op aanvraag"}
                </p>
                <p className="text-sm text-slate-500">Incl. btw en advies door kerstverlichtingonline.nl</p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p>✔ Inclusief advies over plaatsing en elektrische aansluiting</p>
                <p>✔ Optioneel installatiepakket en haringen</p>
                <p>✔ Voorraad geverifieerd bij Amazon leverancier</p>
              </div>
              <div className="space-y-3">
                <AddToCartButton product={product} className="w-full" />
                <Link
                  href="/#producten"
                  className="block rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-900 hover:bg-slate-50"
                >
                  Terug naar assortiment
                </Link>
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-slate-900 hover:bg-slate-50"
                  >
                    Bekijk bron op Amazon
                  </a>
                )}
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Levering & dropship</p>
                <p className="mt-2">
                  We plaatsen de bestelling bij Amazon zodra je bestelt via onze shop en volgen de
                  verzending tot bij jou thuis. Zo heb je één aanspreekpunt en snel overzicht.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* Reviews Section - Full Width */}
        {reviews.length > 0 && (
          <div className="lg:col-span-full">
            <ProductReviews reviews={reviews} />
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:col-span-full">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-slate-900">Gerelateerde producten</h2>
              <p className="mt-2 text-slate-600">Ontdek meer vlaggenmastverlichting</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {relatedProducts.map((relatedProduct) => (
                <ShopCard key={relatedProduct.asin} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

