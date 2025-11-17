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

// Product URLs from sample-products.ts - we'll scrape these to get images
const productUrls = [
  // Vlaggenmast - use existing images or scrape
  { file: 'led-lichtketting-360.jpg', search: 'led+lichtketting+vlaggenmast+360+leds' },
  { file: 'tidyard-732.jpg', search: 'tidyard+kerstboomlichtsnoer+732+leds' },
  { file: 'ecd-germany-360.jpg', search: 'ecd+germany+vlaggenmast+lichtketting+360' },
  { file: 'galaxy-960.jpg', search: 'galaxy+led+dennenboom+600+cm+960+leds' },
  { file: 'lileno-400.jpg', search: 'lileno+home+lichtsnoer+800+cm+400+leds' },
  { file: 'multistore-360.jpg', search: 'multistore+2002+lichtsnoer+360+leds' },
  { file: 'vidaxl-spikes-570.jpg', search: 'vidaxl+led+kerstboom+spikes+570+leds' },
  { file: 'ring-400.jpg', search: 'lichtketting+kerstboom+ring+400+leds' },
  { file: 'salcar-280.jpg', search: 'salcar+2m+kerstboomverlichting+280+leds' },
  { file: 'buudala-200.jpg', search: 'buudala+kerstverlichting+200+leds' },
  { file: 'wishstar-40.jpg', search: 'wishstar+sneeuwvlok+lichtsnoer+40+leds' },
  
  // Buiten
  { file: 'jtsiov-200.jpg', search: 'JTSIOV+Kerstverlichting+Voor+Buiten+20+M+200' },
  { file: 'ibaycon-568.jpg', search: 'ibaycon+kerstverlichting+buiten+ster+568' },
  { file: 'anmossi-400.jpg', search: 'Anmossi+Kerstverlichting+voor+Buiten+12m+400' },
  { file: 'ibaycon-274.jpg', search: 'ibaycon+kerstverlichting+buiten+ster+274' },
  { file: 'philzops-480.jpg', search: 'PhilzOps+IJsregen+lichtsnoer+480' },
  { file: 'ollny-400.jpg', search: 'Ollny+2.5+m+kerstboomverlichting+400' },
  { file: 'anmossi-300.jpg', search: 'Anmossi+Slimme+LED+Lichtsnoer+30m+300' },
  { file: 'ishabao.jpg', search: 'iShabao+Projector+Kerstmis+buiten' },
  
  // Notenkraker
  { file: 'notenkraker-60cm.jpg', search: 'lights4fun+led+notenkraker+60+cm' },
  { file: 'notenkraker-90cm.jpg', search: 'lights4fun+led+notenkraker+90+cm' },
  { file: 'notenkraker-set-2.jpg', search: 'lights4fun+led+notenkraker+set+2' },
  { file: 'notenkraker-120cm.jpg', search: 'lights4fun+led+notenkraker+120+cm' },
  { file: 'notenkraker-40cm.jpg', search: 'lights4fun+led+notenkraker+40+cm' },
  { file: 'notenkraker-80cm.jpg', search: 'lights4fun+led+notenkraker+80+cm' },
  { file: 'notenkraker-set-3.jpg', search: 'lights4fun+led+notenkraker+set+3' },
  { file: 'notenkraker-100cm.jpg', search: 'lights4fun+led+notenkraker+100+cm' },
  
  // Kunstkerstboom
  { file: 'homcom-210cm.jpg', search: 'HOMCOM+Kunstkerstboom+2.1+m' },
  { file: 'shatchi-120cm.jpg', search: 'Shatchi+Kerstboom+120+cm' },
  { file: 'yitahome-183cm.jpg', search: 'YITAHOME+183+cm+kunstmatige+kerstboom' },
  { file: 'premium-90cm.jpg', search: 'Premium+kunstkerstboom+90cm' },
  { file: 'salcar-180cm.jpg', search: 'SALCAR+kunstkerstboom+180+cm+580' },
  { file: 'yitahome-182cm.jpg', search: 'YITAHOME+Kunstkerstboom+182+cm+880' },
  { file: 'yitahome-182cm-sneeuw.jpg', search: 'YITAHOME+Kunstkerstboom+182+cm+sneeuw' },
  { file: 'yitahome-182cm-smal.jpg', search: 'YITAHOME+Kunstkerstboom+182+cm+smal' },
  { file: 'aufun-180cm.jpg', search: 'Aufun+Kunstkerstboom+180+cm+350' },
  { file: 'costway-180cm.jpg', search: 'COSTWAY+180+cm+kunstkerstboom+1000' },
];

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
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
  const selectors = [
    'img.s-image',
    'img[data-image-latency="s-product-image"]',
    '#landingImage',
    '.a-dynamic-image',
  ];
  
  for (const selector of selectors) {
    const img = $(selector).first();
    let src = img.attr('src') || img.attr('data-src') || img.attr('data-a-dynamic-image');
    
    if (src) {
      if (src.startsWith('{')) {
        try {
          const parsed = JSON.parse(src);
          const keys = Object.keys(parsed);
          if (keys.length > 0) src = parsed[keys[0]];
        } catch (e) {}
      }
      src = src.split(',')[0].replace(/^["']|["']$/g, '');
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
    }).on('error', reject);
  });
}

async function processProduct(product, index, total) {
  const filepath = path.join(PRODUCTS_DIR, product.file);
  
  if (fs.existsSync(filepath)) {
    console.log(`[${index + 1}/${total}] ✓ ${product.file} already exists`);
    return;
  }
  
  try {
    const searchUrl = `https://www.amazon.nl/s?k=${product.search}`;
    console.log(`[${index + 1}/${total}] Fetching ${product.file}...`);
    
    const html = await fetchHtml(searchUrl);
    const imageUrl = extractImageUrl(html);
    
    if (imageUrl) {
      await downloadImage(imageUrl, filepath);
      console.log(`  ✓ Downloaded: ${product.file}`);
    } else {
      console.log(`  ✗ Could not find image`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
  }
}

async function main() {
  console.log(`Downloading ${productUrls.length} product images...\n`);
  
  for (let i = 0; i < productUrls.length; i++) {
    await processProduct(productUrls[i], i, productUrls.length);
  }
  
  console.log('\n✓ Complete!');
}

main().catch(console.error);

