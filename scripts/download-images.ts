import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { scrapeAmazonListings } from "../src/lib/amazon";
import { ALL_SAMPLE_PRODUCTS } from "../src/lib/sample-products";
import { AMAZON_FLAGPOLE_URL, AMAZON_OUTDOOR_URL, AMAZON_NUTCRACKER_URL, AMAZON_CHRISTMAS_TREE_URL } from "../src/lib/constants";

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to download ${url}: ${response.statusText}`);
      return false;
    }
    const buffer = await response.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));
    console.log(`✓ Downloaded: ${filepath}`);
    return true;
  } catch (error) {
    console.log(`✗ Error downloading ${url}:`, error);
    return false;
  }
}

async function main() {
  console.log("Starting image download process...\n");

  // Get all products from scraping
  const allProducts = [...ALL_SAMPLE_PRODUCTS];
  
  // Try to scrape additional products from Amazon
  const urls = [
    AMAZON_FLAGPOLE_URL,
    AMAZON_OUTDOOR_URL,
    AMAZON_NUTCRACKER_URL,
    AMAZON_CHRISTMAS_TREE_URL,
  ];

  for (const url of urls) {
    try {
      console.log(`Scraping products from: ${url}`);
      const result = await scrapeAmazonListings(url, 20);
      allProducts.push(...result.products);
      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(`Failed to scrape ${url}:`, error);
    }
  }

  // Create products directory if it doesn't exist
  const productsDir = join(process.cwd(), "public", "products");
  
  // Download images for all products
  let downloaded = 0;
  let failed = 0;

  for (const product of allProducts) {
    if (!product.image) {
      console.log(`⚠ No image URL for product: ${product.title}`);
      failed++;
      continue;
    }

    // Skip if already local path
    if (product.image.startsWith("/products/")) {
      const filename = product.image.replace("/products/", "");
      const filepath = join(productsDir, filename);
      
      // Check if file already exists
      try {
        await readFile(filepath);
        console.log(`⊘ Already exists: ${filename}`);
        continue;
      } catch {
        // File doesn't exist, try to download from Amazon
        // Extract ASIN and try to get image from Amazon
        if (product.url && product.url.includes("/dp/")) {
          const asinMatch = product.url.match(/\/dp\/([A-Z0-9]+)/);
          if (asinMatch) {
            const asin = asinMatch[1];
            // Try common Amazon image URL patterns
            const imageUrls = [
              `https://m.media-amazon.com/images/I/${asin}.jpg`,
              `https://images-na.ssl-images-amazon.com/images/I/${asin}._AC_SL1500_.jpg`,
            ];
            
            let downloadedImage = false;
            for (const imageUrl of imageUrls) {
              if (await downloadImage(imageUrl, filepath)) {
                downloadedImage = true;
                downloaded++;
                break;
              }
            }
            
            if (!downloadedImage) {
              // Try scraping the product page for image
              try {
                const response = await fetch(product.url, {
                  headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                  },
                });
                const html = await response.text();
                const imageMatch = html.match(/data-old-src="([^"]*m\.media-amazon\.com[^"]*)"/);
                if (imageMatch) {
                  const imageUrl = imageMatch[1].replace(/&amp;/g, "&");
                  if (await downloadImage(imageUrl, filepath)) {
                    downloaded++;
                    downloadedImage = true;
                  }
                }
              } catch (error) {
                console.log(`✗ Could not scrape image for ${product.title}`);
              }
            }
            
            if (!downloadedImage) {
              failed++;
            }
          } else {
            failed++;
          }
        } else {
          failed++;
        }
      }
    } else if (product.image.startsWith("http")) {
      // Remote URL - download it
      const filename = `${product.asin}.jpg`;
      const filepath = join(productsDir, filename);
      
      if (await downloadImage(product.image, filepath)) {
        downloaded++;
      } else {
        failed++;
      }
    }

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Download complete!`);
  console.log(`  Downloaded: ${downloaded}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total: ${allProducts.length}`);
}

main().catch(console.error);

