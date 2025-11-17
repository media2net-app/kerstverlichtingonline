import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeAmazonListings } from '../src/lib/amazon.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

// Map product titles to expected image filenames
const imageMapping = {
  'fairybell': 'fairybell.jpg',
  'ibaycon': 'ibaycon.jpg',
  'vidaxl': 'vidaxl.jpg',
  'led-lichtketting-360': 'led-lichtketting-360.jpg',
  'tidyard-732': 'tidyard-732.jpg',
  'ecd-germany-360': 'ecd-germany-360.jpg',
  'galaxy-960': 'galaxy-960.jpg',
  'lileno-400': 'lileno-400.jpg',
  'multistore-360': 'multistore-360.jpg',
  'vidaxl-spikes-570': 'vidaxl-spikes-570.jpg',
  'ring-400': 'ring-400.jpg',
  'salcar-280': 'salcar-280.jpg',
  'buudala-200': 'buudala-200.jpg',
  'wishstar-40': 'wishstar-40.jpg',
  'jtsiov-200': 'jtsiov-200.jpg',
  'ibaycon-568': 'ibaycon-568.jpg',
  'anmossi-400': 'anmossi-400.jpg',
  'ibaycon-274': 'ibaycon-274.jpg',
  'philzops-480': 'philzops-480.jpg',
  'ollny-400': 'ollny-400.jpg',
  'anmossi-300': 'anmossi-300.jpg',
  'ishabao': 'ishabao.jpg',
  'notenkraker-60cm': 'notenkraker-60cm.jpg',
  'notenkraker-90cm': 'notenkraker-90cm.jpg',
  'notenkraker-set-2': 'notenkraker-set-2.jpg',
  'notenkraker-120cm': 'notenkraker-120cm.jpg',
  'notenkraker-40cm': 'notenkraker-40cm.jpg',
  'notenkraker-80cm': 'notenkraker-80cm.jpg',
  'notenkraker-set-3': 'notenkraker-set-3.jpg',
  'notenkraker-100cm': 'notenkraker-100cm.jpg',
  'homcom-210cm': 'homcom-210cm.jpg',
  'shatchi-120cm': 'shatchi-120cm.jpg',
  'yitahome-183cm': 'yitahome-183cm.jpg',
  'premium-90cm': 'premium-90cm.jpg',
  'salcar-180cm': 'salcar-180cm.jpg',
  'yitahome-182cm': 'yitahome-182cm.jpg',
  'yitahome-182cm-sneeuw': 'yitahome-182cm-sneeuw.jpg',
  'yitahome-182cm-smal': 'yitahome-182cm-smal.jpg',
  'aufun-180cm': 'aufun-180cm.jpg',
  'costway-180cm': 'costway-180cm.jpg',
};

async function main() {
  console.log('Fetching products from Amazon...\n');
  
  try {
    const result = await scrapeAmazonListings(undefined, 50);
    const products = result.products;
    
    console.log(`Found ${products.length} products\n`);
    console.log('Available images in products folder:');
    const existingImages = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.jpg'));
    console.log(existingImages.slice(0, 10).join(', '), '...\n');
    
    // For each product, try to match and download
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product.image || !product.image.startsWith('http')) continue;
      
      // Try to find matching image name
      const titleLower = product.title.toLowerCase();
      let matchedKey = null;
      
      for (const [key, filename] of Object.entries(imageMapping)) {
        if (titleLower.includes(key.replace(/-/g, ' ')) || titleLower.includes(key)) {
          matchedKey = key;
          const targetPath = path.join(PRODUCTS_DIR, filename);
          
          if (fs.existsSync(targetPath)) {
            console.log(`[${i + 1}] ✓ ${filename} already exists`);
            continue;
          }
          
          // Download the image
          console.log(`[${i + 1}] Downloading ${filename}...`);
          try {
            const response = await fetch(product.image);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(targetPath, Buffer.from(buffer));
            console.log(`  ✓ Saved: ${filename}`);
          } catch (error) {
            console.log(`  ✗ Error: ${error.message}`);
          }
          break;
        }
      }
      
      if (!matchedKey) {
        console.log(`[${i + 1}] No match for: ${product.title.substring(0, 50)}...`);
      }
      
      // Delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

