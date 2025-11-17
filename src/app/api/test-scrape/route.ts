import { scrapeAmazonListings } from "@/lib/amazon";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await scrapeAmazonListings(undefined, 50);
    
    return NextResponse.json({
      success: true,
      totalProducts: result.products.length,
      products: result.products.map((p) => ({
        asin: p.asin,
        title: p.title,
        price: p.price,
        rating: p.rating,
        reviews: p.reviews,
        badge: p.badge,
      })),
      scrapedAt: result.scrapedAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

