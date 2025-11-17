import { NextResponse } from "next/server";
import { ALL_SAMPLE_PRODUCTS } from "@/lib/sample-products";
import { scrapeAmazonListings } from "@/lib/amazon";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

function downloadImage(imageUrl: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith("https") ? https : http;
    const fileStream = fs.createWriteStream(filepath);

    protocol.get(
      imageUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
          Referer: "https://www.amazon.nl/",
        },
      },
      (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          fileStream.close();
          return downloadImage(response.headers.location!, filepath)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          fileStream.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          return reject(new Error(`HTTP ${response.statusCode}`));
        }

        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", (err) => {
          fileStream.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          reject(err);
        });
      }
    ).on("error", (err) => {
      fileStream.close();
      reject(err);
    });
  });
}

export async function GET() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  const results: string[] = [];

  // First, try to scrape products from Amazon to get real image URLs
  try {
    const scraped = await scrapeAmazonListings(undefined, 50);
    
    for (const product of scraped.products) {
      if (!product.image || !product.image.startsWith("http")) continue;
      
      const imagePath = product.image.replace(/^.*\/([^\/]+)$/, "$1");
      const filename = imagePath.split("?")[0].split(".")[0] + ".jpg";
      const filepath = path.join(PRODUCTS_DIR, filename);
      
      if (fs.existsSync(filepath)) {
        results.push(`✓ ${filename} already exists`);
        continue;
      }
      
      try {
        await downloadImage(product.image, filepath);
        results.push(`✓ Downloaded: ${filename}`);
      } catch (error) {
        results.push(`✗ Error downloading ${filename}: ${(error as Error).message}`);
      }
    }
  } catch (error) {
    results.push(`Error scraping: ${(error as Error).message}`);
  }

  // For sample products, create placeholders if images don't exist
  for (const product of ALL_SAMPLE_PRODUCTS) {
    if (!product.image) continue;
    
    const filename = product.image.replace("/products/", "");
    const filepath = path.join(PRODUCTS_DIR, filename);
    
    if (fs.existsSync(filepath)) {
      continue;
    }
    
    // Create a simple SVG placeholder
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
    Geen afbeelding
  </text>
</svg>`;
    
    const svgPath = filepath.replace(/\.(jpg|jpeg|png)$/i, ".svg");
    fs.writeFileSync(svgPath, svg);
    results.push(`Created placeholder: ${path.basename(svgPath)}`);
  }

  return NextResponse.json({ 
    message: "Download complete",
    results,
    total: results.length 
  });
}

