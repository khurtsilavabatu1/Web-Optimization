import sharp from "sharp";
import fs from "fs";
import path from "path";
import https from "https";

const IMAGES_DIR = "./images";
const FONTS_DIR = "./fonts";

// ფერადი gradient სურათების კონფიგურაცია
const imageConfigs = [
  {
    name: "hero",
    width: 1200,
    height: 600,
    colors: { r: 59, g: 130, b: 246 },  // ლურჯი
    responsive: true,
  },
  {
    name: "gallery-1",
    width: 800,
    height: 600,
    colors: { r: 239, g: 68, b: 68 },   // წითელი
  },
  {
    name: "gallery-2",
    width: 800,
    height: 600,
    colors: { r: 34, g: 197, b: 94 },   // მწვანე
  },
  {
    name: "gallery-3",
    width: 800,
    height: 600,
    colors: { r: 168, g: 85, b: 247 },  // იისფერი
  },
  {
    name: "gallery-4",
    width: 800,
    height: 600,
    colors: { r: 251, g: 146, b: 60 },  // ნარინჯისფერი
  },
];

function createGradientSvg(width, height, color) {
  const r2 = Math.min(255, color.r + 80);
  const g2 = Math.min(255, color.g + 80);
  const b2 = Math.min(255, color.b + 80);

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${color.r},${color.g},${color.b})" />
          <stop offset="100%" style="stop-color:rgb(${r2},${g2},${b2})" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="${width * 0.3}" cy="${height * 0.4}" r="${height * 0.2}" fill="rgba(255,255,255,0.15)" />
      <circle cx="${width * 0.7}" cy="${height * 0.6}" r="${height * 0.25}" fill="rgba(255,255,255,0.1)" />
      <rect x="${width * 0.1}" y="${height * 0.7}" width="${width * 0.3}" height="${height * 0.05}" rx="4" fill="rgba(255,255,255,0.2)" />
      <rect x="${width * 0.1}" y="${height * 0.78}" width="${width * 0.2}" height="${height * 0.05}" rx="4" fill="rgba(255,255,255,0.15)" />
    </svg>
  `);
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  return (bytes / 1024).toFixed(1) + " KB";
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function generateImages() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  console.log("=== სურათების გენერაცია ===\n");

  const results = [];

  for (const config of imageConfigs) {
    const svg = createGradientSvg(config.width, config.height, config.colors);
    const baseImage = sharp(svg).resize(config.width, config.height);

    // JPEG
    const jpegPath = path.join(IMAGES_DIR, `${config.name}.jpg`);
    await baseImage.clone().jpeg({ quality: 85 }).toFile(jpegPath);
    const jpegSize = fs.statSync(jpegPath).size;

    // WebP
    const webpPath = path.join(IMAGES_DIR, `${config.name}.webp`);
    await baseImage.clone().webp({ quality: 80 }).toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    // AVIF
    const avifPath = path.join(IMAGES_DIR, `${config.name}.avif`);
    await baseImage.clone().avif({ quality: 60 }).toFile(avifPath);
    const avifSize = fs.statSync(avifPath).size;

    const savings = ((1 - avifSize / jpegSize) * 100).toFixed(0);
    results.push({ name: config.name, jpegSize, webpSize, avifSize, savings });

    console.log(`${config.name}:`);
    console.log(`  JPEG: ${formatBytes(jpegSize)}`);
    console.log(`  WebP: ${formatBytes(webpSize)}  (${((1 - webpSize / jpegSize) * 100).toFixed(0)}% დაზოგვა)`);
    console.log(`  AVIF: ${formatBytes(avifSize)}  (${savings}% დაზოგვა)`);
    console.log();

    // Responsive ვერსიები hero-სთვის
    if (config.responsive) {
      const sizes = [400, 800, 1200];
      console.log(`  Responsive ვერსიები:`);
      for (const w of sizes) {
        const h = Math.round((config.height / config.width) * w);
        const responsiveSvg = createGradientSvg(w, h, config.colors);

        const rJpeg = path.join(IMAGES_DIR, `${config.name}-${w}w.jpg`);
        await sharp(responsiveSvg).resize(w, h).jpeg({ quality: 85 }).toFile(rJpeg);

        const rWebp = path.join(IMAGES_DIR, `${config.name}-${w}w.webp`);
        await sharp(responsiveSvg).resize(w, h).webp({ quality: 80 }).toFile(rWebp);

        const rAvif = path.join(IMAGES_DIR, `${config.name}-${w}w.avif`);
        await sharp(responsiveSvg).resize(w, h).avif({ quality: 60 }).toFile(rAvif);

        console.log(`    ${w}w — JPEG: ${formatBytes(fs.statSync(rJpeg).size)}, WebP: ${formatBytes(fs.statSync(rWebp).size)}, AVIF: ${formatBytes(fs.statSync(rAvif).size)}`);
      }
      console.log();
    }
  }

  // შედარების ცხრილი
  console.log("=== შედარების ცხრილი ===\n");
  console.log("| სურათი     | JPEG      | WebP      | AVIF      | დაზოგვა (AVIF) |");
  console.log("|------------|-----------|-----------|-----------|----------------|");
  for (const r of results) {
    console.log(
      `| ${r.name.padEnd(10)} | ${formatBytes(r.jpegSize).padEnd(9)} | ${formatBytes(r.webpSize).padEnd(9)} | ${formatBytes(r.avifSize).padEnd(9)} | ${r.savings}%${" ".repeat(13 - r.savings.length)}|`
    );
  }
  console.log();
}

async function downloadFont() {
  fs.mkdirSync(FONTS_DIR, { recursive: true });

  console.log("=== ფონტის ჩამოტვირთვა ===\n");

  // Google Fonts CSS-იდან WOFF2 URL-ის ამოღება
  const cssUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";

  const css = await new Promise((resolve, reject) => {
    https.get(cssUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });

  const woff2Urls = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g);

  if (!woff2Urls || woff2Urls.length === 0) {
    console.log("  Google Fonts-იდან URL ვერ მოიძებნა. ფონტი ხელით ჩამოტვირთეთ.");
    return;
  }

  let downloaded = 0;
  for (const match of woff2Urls) {
    const url = match.replace("url(", "").replace(")", "");
    const weightMatch = css.substring(0, css.indexOf(url)).match(/font-weight:\s*(\d+)/g);
    const weight = weightMatch ? weightMatch[weightMatch.length - 1].replace("font-weight: ", "") : "400";
    const filename = `inter-${weight}.woff2`;
    const dest = path.join(FONTS_DIR, filename);

    if (!fs.existsSync(dest)) {
      await downloadFile(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`  ${filename} — ${formatBytes(size)}`);
      downloaded++;
    }
  }

  if (downloaded === 0) {
    console.log("  ფონტები უკვე ჩამოტვირთულია.");
  }

  console.log();
}

async function main() {
  console.log("\n========================================");
  console.log("  Image & Font Optimization — Setup");
  console.log("========================================\n");

  await generateImages();
  await downloadFont();

  console.log("========================================");
  console.log("  Setup დასრულდა!");
  console.log("  გაუშვით: npx serve -l 3000");
  console.log("  გახსენით: http://localhost:3000");
  console.log("========================================\n");
}

main().catch(console.error);
