const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { load } = require('cheerio');

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

// Ensure products directory exists
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Import products
const { ALL_SAMPLE_PRODUCTS } = require('../src/lib/sample-products.ts');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, { headers }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchImageFromAmazon(productUrl) {
  try {
    const response = await fetch(productUrl, { headers });
    const html = await response.text();
    const $ = load(html);
    
    // Try multiple selectors for product image
    const imageSelectors = [
      '#landingImage',
      '#imgBlkFront',
      '#main-image',
      '.a-dynamic-image',
      'img[data-a-image-name="landingImage"]',
    ];
    
    for (const selector of imageSelectors) {
      const img = $(selector).first();
      const src = img.attr('src') || img.attr('data-src') || img.attr('data-a-dynamic-image');
      if (src) {
        // Extract the high-res image URL
        const imageUrl = src.split(',')[0].replace(/^"|"$/g, '');
        if (imageUrl && imageUrl.startsWith('http')) {
          return imageUrl;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching ${productUrl}:`, error.message);
    return null;
  }
}

async function downloadAllImages() {
  console.log(`Starting download of ${ALL_SAMPLE_PRODUCTS.length} product images...\n`);
  
  for (let i = 0; i < ALL_SAMPLE_PRODUCTS.length; i++) {
    const product = ALL_SAMPLE_PRODUCTS[i];
    const imagePath = product.image?.replace('/products/', '');
    
    if (!imagePath) {
      console.log(`[${i + 1}/${ALL_SAMPLE_PRODUCTS.length}] Skipping ${product.title} - no image path`);
      continue;
    }
    
    const filepath = path.join(PRODUCTS_DIR, imagePath);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`[${i + 1}/${ALL_SAMPLE_PRODUCTS.length}] ✓ ${imagePath} already exists`);
      continue;
    }
    
    try {
      console.log(`[${i + 1}/${ALL_SAMPLE_PRODUCTS.length}] Fetching image for: ${product.title.substring(0, 50)}...`);
      
      // Try to get image from Amazon product page
      const imageUrl = await fetchImageFromAmazon(product.url);
      
      if (imageUrl) {
        console.log(`  Downloading from: ${imageUrl.substring(0, 80)}...`);
        await downloadImage(imageUrl, filepath);
        console.log(`  ✓ Saved: ${imagePath}`);
      } else {
        console.log(`  ✗ Could not find image URL for ${product.title}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ✗ Error downloading ${imagePath}:`, error.message);
    }
  }
  
  console.log('\n✓ Download complete!');
}

// Run the script
downloadAllImages().catch(console.error);

