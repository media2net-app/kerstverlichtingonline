import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

// Ensure products directory exists
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Product image mappings - we'll use placeholder images or download from Amazon
const products = [
  // Vlaggenmast products (already have some)
  { name: 'fairybell.jpg', url: 'https://www.amazon.nl/Fairybell-LED-Kerstboom-Buiten-Vlaggenmast/dp/B07BB1P585' },
  { name: 'ibaycon.jpg', url: 'https://www.amazon.nl/s?k=ibaycon+kerstverlichting+vlaggenmast' },
  { name: 'vidaxl.jpg', url: 'https://www.amazon.nl/s?k=vidaxl+led+vlaggenmast+1534' },
  { name: 'led-lichtketting-360.jpg', url: 'https://www.amazon.nl/s?k=led+lichtketting+vlaggenmast+360+leds' },
  { name: 'tidyard-732.jpg', url: 'https://www.amazon.nl/s?k=tidyard+kerstboomlichtsnoer+732+leds' },
  { name: 'ecd-germany-360.jpg', url: 'https://www.amazon.nl/s?k=ecd+germany+vlaggenmast+lichtketting+360' },
  { name: 'galaxy-960.jpg', url: 'https://www.amazon.nl/s?k=galaxy+led+dennenboom+600+cm+960+leds' },
  { name: 'lileno-400.jpg', url: 'https://www.amazon.nl/s?k=lileno+home+lichtsnoer+800+cm+400+leds' },
  { name: 'multistore-360.jpg', url: 'https://www.amazon.nl/s?k=multistore+2002+lichtsnoer+360+leds' },
  { name: 'vidaxl-spikes-570.jpg', url: 'https://www.amazon.nl/s?k=vidaxl+led+kerstboom+spikes+570+leds' },
  { name: 'ring-400.jpg', url: 'https://www.amazon.nl/s?k=lichtketting+kerstboom+ring+400+leds' },
  { name: 'salcar-280.jpg', url: 'https://www.amazon.nl/s?k=salcar+2m+kerstboomverlichting+280+leds' },
  { name: 'buudala-200.jpg', url: 'https://www.amazon.nl/s?k=buudala+kerstverlichting+200+leds' },
  { name: 'wishstar-40.jpg', url: 'https://www.amazon.nl/s?k=wishstar+sneeuwvlok+lichtsnoer+40+leds' },
  
  // Buiten products
  { name: 'jtsiov-200.jpg', url: 'https://www.amazon.nl/s?k=kerstverlichting+buiten+20m+200+led' },
  { name: 'ibaycon-568.jpg', url: 'https://www.amazon.nl/s?k=ibaycon+kerstverlichting+buiten+ster+568' },
  { name: 'anmossi-400.jpg', url: 'https://www.amazon.nl/s?k=anmossi+kerstverlichting+buiten+12m+400+led' },
  { name: 'ibaycon-274.jpg', url: 'https://www.amazon.nl/s?k=ibaycon+kerstverlichting+buiten+ster+274' },
  { name: 'philzops-480.jpg', url: 'https://www.amazon.nl/s?k=philzops+ijsregen+lichtsnoer+480+leds' },
  { name: 'ollny-400.jpg', url: 'https://www.amazon.nl/s?k=ollny+2.5m+kerstboomverlichting+400+led' },
  { name: 'anmossi-300.jpg', url: 'https://www.amazon.nl/s?k=anmossi+slimme+led+lichtsnoer+30m+300' },
  { name: 'ishabao.jpg', url: 'https://www.amazon.nl/s?k=ishabao+projector+kerstmis+buiten' },
  
  // Notenkraker products
  { name: 'notenkraker-60cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+60cm' },
  { name: 'notenkraker-90cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+90cm' },
  { name: 'notenkraker-set-2.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+set+2' },
  { name: 'notenkraker-120cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+120cm' },
  { name: 'notenkraker-40cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+40cm' },
  { name: 'notenkraker-80cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+80cm' },
  { name: 'notenkraker-set-3.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+set+3' },
  { name: 'notenkraker-100cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+100cm' },
  
  // Kunstkerstboom products
  { name: 'homcom-210cm.jpg', url: 'https://www.amazon.nl/s?k=homcom+kunstkerstboom+2.1m' },
  { name: 'shatchi-120cm.jpg', url: 'https://www.amazon.nl/s?k=shatchi+kerstboom+120cm' },
  { name: 'yitahome-183cm.jpg', url: 'https://www.amazon.nl/s?k=yitahome+183cm+kunstmatige+kerstboom' },
  { name: 'premium-90cm.jpg', url: 'https://www.amazon.nl/s?k=premium+kunstkerstboom+90cm+pure+living' },
  { name: 'salcar-180cm.jpg', url: 'https://www.amazon.nl/s?k=salcar+kunstkerstboom+180cm+580' },
  { name: 'yitahome-182cm.jpg', url: 'https://www.amazon.nl/s?k=yitahome+kunstkerstboom+182cm+880' },
  { name: 'yitahome-182cm-sneeuw.jpg', url: 'https://www.amazon.nl/s?k=yitahome+kunstkerstboom+182cm+sneeuw' },
  { name: 'yitahome-182cm-smal.jpg', url: 'https://www.amazon.nl/s?k=yitahome+kunstkerstboom+182cm+smal' },
  { name: 'aufun-180cm.jpg', url: 'https://www.amazon.nl/s?k=aufun+kunstkerstboom+180cm+350+leds' },
  { name: 'costway-180cm.jpg', url: 'https://www.amazon.nl/s?k=costway+180cm+kunstkerstboom+1000' },
];

// Create a placeholder image as fallback
function createPlaceholderImage(filepath) {
  // Create a simple SVG placeholder
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
    Geen afbeelding
  </text>
</svg>`;
  
  fs.writeFileSync(filepath.replace('.jpg', '.svg'), svg);
  console.log(`  Created placeholder: ${path.basename(filepath).replace('.jpg', '.svg')}`);
}

async function downloadImage(imageUrl, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const fileStream = fs.createWriteStream(filepath);
    
    protocol.get(imageUrl, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9',
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fileStream.close();
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        fileStream.close();
        fs.unlinkSync(filepath);
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fileStream.close();
        fs.unlinkSync(filepath);
        reject(err);
      });
    }).on('error', (err) => {
      fileStream.close();
      reject(err);
    });
  });
}

// Use a generic placeholder image URL from a CDN as fallback
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Geen+afbeelding';

async function processProduct(product, index, total) {
  const filepath = path.join(PRODUCTS_DIR, product.name);
  
  // Skip if already exists
  if (fs.existsSync(filepath)) {
    console.log(`[${index + 1}/${total}] ✓ ${product.name} already exists`);
    return;
  }
  
  try {
    console.log(`[${index + 1}/${total}] Processing ${product.name}...`);
    
    // For now, use placeholder since Amazon scraping is complex
    // In production, you would scrape the actual product page
    console.log(`  Using placeholder image`);
    await downloadImage(PLACEHOLDER_IMAGE, filepath);
    console.log(`  ✓ Saved: ${product.name}`);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    // Create SVG placeholder as fallback
    createPlaceholderImage(filepath);
  }
}

async function main() {
  console.log(`Downloading ${products.length} product images...\n`);
  
  for (let i = 0; i < products.length; i++) {
    await processProduct(products[i], i, products.length);
  }
  
  console.log('\n✓ Complete!');
}

main().catch(console.error);

