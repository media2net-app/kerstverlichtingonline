import Link from "next/link";
import { scrapeAmazonListings } from "@/lib/amazon";
import { ShopHero } from "@/components/shop-hero";
import { ShopSortBar } from "@/components/shop-sort-bar";
import { SiteHeader } from "@/components/site-header";
import { ProductGrid } from "@/components/product-grid";
import { CategoryNav } from "@/components/category-nav";
import { ALL_SAMPLE_PRODUCTS, SAMPLE_FEATURED_PRODUCTS } from "@/lib/sample-products";

export const revalidate = 1800;

const filterConfig = [
  { title: "Product type", options: ["Vlaggenmast bomen", "LED lichtmantels", "Cluster verlichting", "Accessoires"] },
  { title: "Merk", options: ["Fairybell", "Galaxy", "vidaXL", "iBaycon", "Tidyard"] },
  { title: "Kleur", options: ["Warm wit", "Kleurrijk", "Koel wit"] },
  { title: "Lengte", options: ["3 m", "5 m", "6 m", "8 m+"] },
  { title: "Beschikbaarheid", options: ["Op voorraad", "Pre-order"] },
];

export default async function Home() {
  let initialProducts: Awaited<ReturnType<typeof scrapeAmazonListings>>;
  try {
    initialProducts = await scrapeAmazonListings(undefined, 50);
  } catch {
    initialProducts = {
      products: [],
      scrapedAt: new Date().toISOString(),
      source: "",
    };
  }

  // Use scraped products if available, but use sample products if scraped ones don't have categories
  const scrapedProducts = initialProducts.products.length > 0 ? initialProducts.products : [];
  const hasCategorizedProducts = scrapedProducts.some((p) => p.category);
  
  const allProducts = hasCategorizedProducts && scrapedProducts.length > 0
    ? scrapedProducts
    : ALL_SAMPLE_PRODUCTS;

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="flex w-full flex-col gap-10 px-6 py-10 lg:px-12">
        <ShopHero />
        <CategoryNav />
        <ShopSortBar total={allProducts.length} />
        <ProductGrid products={allProducts} filterConfig={filterConfig} />
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-slate-800"
          >
            Bekijk alle {allProducts.length} producten
          </Link>
        </div>
      </main>
    </div>
  );
}
