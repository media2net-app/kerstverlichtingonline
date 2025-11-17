"use client";

import { useState } from "react";
import { AMAZON_FLAGPOLE_URL } from "@/lib/constants";
import { ScrapedProduct } from "@/lib/amazon";
import { ProductCard } from "./product-card";
import { ScrapePanel } from "./scrape-panel";

type Props = {
  initialProducts: ScrapedProduct[];
  scrapedAt: string;
};

type Status = {
  type: "idle" | "info" | "success" | "error";
  message: string;
};

const defaultStatus: Status = {
  type: "idle",
  message: "Gebruik de scrape tool om het assortiment live te vernieuwen.",
};

export function ProductShowcase({ initialProducts, scrapedAt }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [lastUpdated, setLastUpdated] = useState(scrapedAt);
  const [status, setStatus] = useState<Status>(defaultStatus);
  const [loading, setLoading] = useState(false);

  const handleScrape = async (url?: string) => {
    setLoading(true);
    setStatus({ type: "info", message: "Scrapen gestart... Amazon laden." });
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Amazon gaf geen geldig antwoord.");
      }
      const data = (await response.json()) as {
        products: ScrapedProduct[];
        scrapedAt: string;
      };
      setProducts(data.products);
      setLastUpdated(data.scrapedAt);
      setStatus({
        type: "success",
        message: `Succes! ${data.products.length} resultaten bijgewerkt.`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          (error as Error).message ||
          "Scrapen mislukt. Controleer de URL of probeer het later opnieuw.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="producten" className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ScrapePanel
            loading={loading}
            onScrape={handleScrape}
            status={status}
            lastUpdated={lastUpdated}
            total={products.length}
            defaultUrl={AMAZON_FLAGPOLE_URL}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.asin} product={product} />
            ))}
            {products.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
                Geen producten gevonden. Scrape opnieuw of controleer de Amazon URL.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


