import { load } from "cheerio";
import { AMAZON_FLAGPOLE_URL } from "./constants";

export type ScrapedProduct = {
  asin: string;
  title: string;
  url: string;
  slug?: string;
  price?: string | null;
  badge?: string | null;
  rating?: string | null;
  reviews?: string | null;
  delivery?: string | null;
  image?: string | null;
  category?: string;
};

export type ProductReview = {
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
};

type ScrapeResult = {
  products: ScrapedProduct[];
  scrapedAt: string;
  source: string;
};

const BASE_URL = "https://www.amazon.nl";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  "Accept-Language": "nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7",
};

const normalizePrice = (whole?: string | null, fraction?: string | null) => {
  if (!whole) return null;
  const cleanWhole = whole.replace(/\D/g, "");
  const cleanFraction = (fraction ?? "00").replace(/\D/g, "").padEnd(2, "0");
  return `€${cleanWhole},${cleanFraction.slice(0, 2)}`;
};

function parseProductsFromHtml(html: string): ScrapedProduct[] {
  const $ = load(html);
  const products: ScrapedProduct[] = [];

  // Try multiple selectors to find products
  const productSelectors = [
    "div.s-main-slot div[data-component-type='s-search-result']",
    "div[data-component-type='s-search-result']",
    ".s-result-item[data-asin]",
  ];

  let foundElements = $();
  for (const selector of productSelectors) {
    foundElements = $(selector);
    if (foundElements.length > 0) break;
  }

  foundElements.each((_, element) => {
    const $el = $(element);
    const asin = $el.attr("data-asin") ?? crypto.randomUUID();
    
    // Try multiple title selectors
    const titleSelectors = [
      "h2 a span",
      "h2 span",
      ".s-title-instructions-style h2 a span",
      "a.a-link-normal h2 span",
    ];
    
    let title = "";
    for (const titleSelector of titleSelectors) {
      title = $el.find(titleSelector).first().text().trim();
      if (title) break;
    }
    
    if (!title) return;

    const relativeHref = $el.find("h2 a, a.a-link-normal").first().attr("href");
    const urlPath = relativeHref
      ? new URL(relativeHref, BASE_URL).toString()
      : AMAZON_FLAGPOLE_URL;

    const priceWhole = $el.find(".a-price-whole").first().text();
    const priceFraction = $el.find(".a-price-fraction").first().text();
    const price = normalizePrice(priceWhole, priceFraction);

    const badge = $el
      .find(".s-label-popover-default .a-badge-text, .a-badge-text")
      .first()
      .text()
      .trim();
    const rating = $el.find(".a-icon-alt").first().text().trim() || null;
    const reviews =
      $el
        .find("span[aria-label][dir='auto']")
        .filter((_, span) => $(span).attr("aria-label")?.includes("beoordelingen"))
        .first()
        .text()
        .trim() || null;
    const delivery =
      $el.find(".s-align-children-center span.a-color-base, .a-color-base").first().text().trim() ||
      null;
    const image =
      $el.find("img.s-image").attr("src") ||
      $el.find("img[data-image-latency='s-product-image']").attr("src") ||
      $el.find("img").first().attr("src") ||
      null;

    products.push({
      asin,
      title,
      url: urlPath,
      price,
      badge: badge || null,
      rating,
      reviews,
      delivery,
      image,
    });
  });

  return products;
}

async function getNextPageUrl(html: string): Promise<string | null> {
  const $ = load(html);
  const nextLink = $("a.s-pagination-next").attr("href");
  if (!nextLink) return null;
  
  try {
    const nextUrl = new URL(nextLink, BASE_URL);
    return nextUrl.toString();
  } catch {
    return null;
  }
}

export async function scrapeAmazonListings(url: string = AMAZON_FLAGPOLE_URL, maxProducts: number = 50) {
  const allProducts: ScrapedProduct[] = [];
  let currentUrl: string | null = url;
  const maxPages = 4; // Scrape max 4 pages to get ~50 products
  let pagesScraped = 0;

  while (allProducts.length < maxProducts && currentUrl && pagesScraped < maxPages) {
    try {
      const response = await fetch(currentUrl, {
        headers,
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        break;
      }

      const html = await response.text();
      const pageProducts = parseProductsFromHtml(html);
      
      if (pageProducts.length === 0) {
        break; // No more products found
      }

      allProducts.push(...pageProducts);
      pagesScraped++;
      
      if (pageProducts.length < 16) {
        break; // Last page likely reached
      }

      // Get next page URL from HTML
      currentUrl = await getNextPageUrl(html);
      
      // Small delay to avoid rate limiting
      if (currentUrl && pagesScraped < maxPages) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error scraping page ${pagesScraped + 1}:`, error);
      break;
    }
  }

  // Remove duplicates by ASIN
  const uniqueProducts = Array.from(
    new Map(allProducts.map(p => [p.asin, p])).values()
  ).slice(0, maxProducts);

  return {
    products: uniqueProducts,
    scrapedAt: new Date().toISOString(),
    source: url,
  } satisfies ScrapeResult;
}

export async function scrapeProductReviews(productUrl: string, maxReviews: number = 5): Promise<ProductReview[]> {
  try {
    const response = await fetch(productUrl, {
      headers,
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const $ = load(html);
    const reviews: ProductReview[] = [];

    // Try multiple selectors for reviews
    const reviewSelectors = [
      "#cm_cr-review_list .review",
      "[data-hook='review']",
      ".a-section.review",
    ];

    let reviewElements = $();
    for (const selector of reviewSelectors) {
      reviewElements = $(selector);
      if (reviewElements.length > 0) break;
    }

    reviewElements.slice(0, maxReviews).each((_, element) => {
      const $review = $(element);
      
      // Extract rating
      const ratingText = $review.find(".a-icon-alt, [data-hook='review-star-rating']").first().text();
      const ratingMatch = ratingText.match(/(\d+)/);
      const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5;

      // Extract author
      const author = $review.find(".a-profile-name, [data-hook='review-author']").first().text().trim() || "Anoniem";

      // Extract title
      const title = $review.find("[data-hook='review-title'] span, .review-title").first().text().trim() || "Geen titel";

      // Extract content
      const content = $review.find("[data-hook='review-body'] span, .review-text").first().text().trim() || "";

      // Extract date
      const dateText = $review.find("[data-hook='review-date']").first().text().trim();
      const date = dateText || "Onbekend";

      // Check if verified purchase
      const verifiedText = $review.find("[data-hook='avp-badge']").first().text().toLowerCase();
      const verified = verifiedText.includes("verifieerde") || verifiedText.includes("verified");

      if (content) {
        reviews.push({
          author,
          rating,
          title,
          content,
          date,
          verified,
        });
      }
    });

    return reviews;
  } catch (error) {
    console.error("Error scraping reviews:", error);
    return [];
  }
}

