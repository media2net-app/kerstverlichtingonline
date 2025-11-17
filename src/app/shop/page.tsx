import { scrapeAmazonListings } from "@/lib/amazon";
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

export default async function ShopPage() {
  let allProducts: Awaited<ReturnType<typeof scrapeAmazonListings>>;
  try {
    allProducts = await scrapeAmazonListings(undefined, 50);
  } catch {
    allProducts = {
      products: [],
      scrapedAt: new Date().toISOString(),
      source: "",
    };
  }

  // Use scraped products if available, but merge with sample products to ensure categories work
  // If scraped products don't have categories, use sample products instead
  const scrapedProducts = allProducts.products.length > 0 ? allProducts.products : [];
  const hasCategorizedProducts = scrapedProducts.some((p) => p.category);
  
  const products = hasCategorizedProducts && scrapedProducts.length > 0
    ? scrapedProducts
    : ALL_SAMPLE_PRODUCTS;

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <SiteHeader />
      <main className="flex w-full flex-col gap-10 px-6 py-10 lg:px-12">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">Shop</h1>
          <p className="mt-2 text-slate-600">
            Ontdek ons volledige assortiment kerstverlichting
          </p>
        </div>
        <CategoryNav />
        <ShopSortBar total={products.length} />
        <ProductGrid products={products} filterConfig={filterConfig} />
      </main>
    </div>
  );
}

