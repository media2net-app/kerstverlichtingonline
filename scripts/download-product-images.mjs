import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '../public/products');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// All products with their Amazon URLs and expected image filenames
const products = [
  // Vlaggenmast
  { file: 'led-lichtketting-360.jpg', url: 'https://www.amazon.nl/s?k=led+lichtketting+vlaggenmast+360+leds' },
  { file: 'tidyard-732.jpg', url: 'https://www.amazon.nl/s?k=tidyard+kerstboomlichtsnoer+732+leds' },
  { file: 'ecd-germany-360.jpg', url: 'https://www.amazon.nl/s?k=ecd+germany+vlaggenmast+lichtketting+360' },
  { file: 'galaxy-960.jpg', url: 'https://www.amazon.nl/s?k=galaxy+led+dennenboom+600+cm+960+leds' },
  { file: 'lileno-400.jpg', url: 'https://www.amazon.nl/s?k=lileno+home+lichtsnoer+800+cm+400+leds' },
  { file: 'multistore-360.jpg', url: 'https://www.amazon.nl/s?k=multistore+2002+lichtsnoer+360+leds' },
  { file: 'vidaxl-spikes-570.jpg', url: 'https://www.amazon.nl/s?k=vidaxl+led+kerstboom+spikes+570+leds' },
  { file: 'ring-400.jpg', url: 'https://www.amazon.nl/s?k=lichtketting+kerstboom+ring+400+leds' },
  { file: 'salcar-280.jpg', url: 'https://www.amazon.nl/s?k=salcar+2m+kerstboomverlichting+280+leds' },
  { file: 'buudala-200.jpg', url: 'https://www.amazon.nl/s?k=buudala+kerstverlichting+200+leds' },
  { file: 'wishstar-40.jpg', url: 'https://www.amazon.nl/s?k=wishstar+sneeuwvlok+lichtsnoer+40+leds' },
  
  // Buiten
  { file: 'jtsiov-200.jpg', url: 'https://www.amazon.nl/s?k=JTSIOV+Kerstverlichting+Voor+Buiten+20+M+200+Led' },
  { file: 'ibaycon-568.jpg', url: 'https://www.amazon.nl/s?k=ibaycon+kerstverlichting+buiten+ster+568+ledlampen' },
  { file: 'anmossi-400.jpg', url: 'https://www.amazon.nl/s?k=Anmossi+Kerstverlichting+voor+Buiten+12m+400+LED' },
  { file: 'ibaycon-274.jpg', url: 'https://www.amazon.nl/s?k=ibaycon+kerstverlichting+buiten+ster+274+ledlampen' },
  { file: 'philzops-480.jpg', url: 'https://www.amazon.nl/s?k=PhilzOps+IJsregen+lichtsnoer+480+leds' },
  { file: 'ollny-400.jpg', url: 'https://www.amazon.nl/s?k=Ollny+2.5+m+kerstboomverlichting+400+led' },
  { file: 'anmossi-300.jpg', url: 'https://www.amazon.nl/s?k=Anmossi+Slimme+LED+Lichtsnoer+30m+300+LED' },
  { file: 'ishabao.jpg', url: 'https://www.amazon.nl/s?k=iShabao+Projector+Kerstmis+buiten' },
  
  // Notenkraker
  { file: 'notenkraker-60cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+60+cm' },
  { file: 'notenkraker-90cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+90+cm' },
  { file: 'notenkraker-set-2.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+set+2+stuks' },
  { file: 'notenkraker-120cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+120+cm' },
  { file: 'notenkraker-40cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+40+cm' },
  { file: 'notenkraker-80cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+80+cm' },
  { file: 'notenkraker-set-3.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+set+3+stuks' },
  { file: 'notenkraker-100cm.jpg', url: 'https://www.amazon.nl/s?k=lights4fun+led+notenkraker+100+cm' },
  
  // Kunstkerstboom
  { file: 'homcom-210cm.jpg', url: 'https://www.amazon.nl/s?k=HOMCOM+Kunstkerstboom+2.1+m' },
  { file: 'shatchi-120cm.jpg', url: 'https://www.amazon.nl/s?k=Shatchi+Kerstboom+120+cm' },
  { file: 'yitahome-183cm.jpg', url: 'https://www.amazon.nl/s?k=YITAHOME+183+cm+kunstmatige+kerstboom' },
  { file: 'premium-90cm.jpg', url: 'https://www.amazon.nl/s?k=Premium+kunstkerstboom+90cm+Pure+Living' },
  { file: 'salcar-180cm.jpg', url: 'https://www.amazon.nl/s?k=SALCAR+kunstkerstboom+180+cm+580' },
  { file: 'yitahome-182cm.jpg', url: 'https://www.amazon.nl/s?k=YITAHOME+Kunstkerstboom+182+cm+880' },
  { file: 'yitahome-182cm-sneeuw.jpg', url: 'https://www.amazon.nl/s?k=YITAHOME+Kunstkerstboom+182+cm+sneeuw' },
  { file: 'yitahome-182cm-smal.jpg', url: 'https://www.amazon.nl/s?k=YITAHOME+Kunstkerstboom+182+cm+smal' },
  { file: 'aufun-180cm.jpg', url: 'https://www.amazon.nl/s?k=Aufun+Kunstkerstboom+180+cm+350+leds' },
  { file: 'costway-180cm.jpg', url: 'https://www.amazon.nl/s?k=COSTWAY+180+cm+kunstkerstboom+1000' },
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
};

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    let data = '';
    
    protocol.get(url, { headers }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return fetchHtml(response.headers.location).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractImageUrl(html) {
  const $ = load(html);
  
  // Try multiple selectors for product images
  const selectors = [
    'img.s-image',
    'img[data-image-latency="s-product-image"]',
    '#landingImage',
    '#imgBlkFront',
    '#main-image',
    '.a-dynamic-image',
    'img[data-a-image-name="landingImage"]',
    '.s-result-item img',
  ];
  
  for (const selector of selectors) {
    const img = $(selector).first();
    let src = img.attr('src') || img.attr('data-src') || img.attr('data-a-dynamic-image');
    
    if (src) {
      // Handle data-a-dynamic-image JSON format
      if (src.startsWith('{')) {
        try {
          const parsed = JSON.parse(src);
          const keys = Object.keys(parsed);
          if (keys.length > 0) {
            src = parsed[keys[0]];
          }
        } catch (e) {
          // Not JSON, continue
        }
      }
      
      // Clean up the URL
      src = src.split(',')[0].replace(/^["']|["']$/g, '');
      
      // Get high-res version if available
      if (src.includes('._AC_')) {
        src = src.replace(/\._AC_[^_]+_/, '._AC_SX679_.');
      }
      
      if (src && src.startsWith('http')) {
        return src;
      }
    }
  }
  
  return null;
}

function downloadImage(imageUrl, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const fileStream = fs.createWriteStream(filepath);
    
    protocol.get(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.amazon.nl/',
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fileStream.close();
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        fileStream.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fileStream.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        reject(err);
      });
    }).on('error', (err) => {
      fileStream.close();
      reject(err);
    });
  });
}

async function processProduct(product, index, total) {
  const filepath = path.join(PRODUCTS_DIR, product.file);
  
  if (fs.existsSync(filepath)) {
    console.log(`[${index + 1}/${total}] ✓ ${product.file} already exists`);
    return;
  }
  
  try {
    console.log(`[${index + 1}/${total}] Fetching ${product.file}...`);
    console.log(`  URL: ${product.url.substring(0, 80)}...`);
    
    // Fetch the search results page
    const html = await fetchHtml(product.url);
    const imageUrl = extractImageUrl(html);
    
    if (imageUrl) {
      console.log(`  Found image: ${imageUrl.substring(0, 80)}...`);
      await downloadImage(imageUrl, filepath);
      console.log(`  ✓ Downloaded: ${product.file}`);
    } else {
      console.log(`  ✗ Could not find image URL`);
      // Create a simple placeholder
      const placeholder = Buffer.from(
        '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">Geen afbeelding</text></svg>'
      );
      fs.writeFileSync(filepath.replace('.jpg', '.svg'), placeholder);
      console.log(`  Created placeholder SVG`);
    }
    
    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
  }
}

async function main() {
  console.log(`Downloading images for ${products.length} products...\n`);
  
  for (let i = 0; i < products.length; i++) {
    await processProduct(products[i], i, products.length);
  }
  
  console.log('\n✓ Complete!');
}

main().catch(console.error);

