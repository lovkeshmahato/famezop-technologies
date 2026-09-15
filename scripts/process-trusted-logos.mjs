// One-off asset pipeline for the "Trusted by" logo strip. Re-run after
// adding/replacing a file in public/logos-raw (e.g. `node scripts/process-trusted-logos.mjs`
// from the repo root), then update the matching entry in lib/content/misc.ts
// with the printed width/height.
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "public", "logos-raw");
const OUT = path.join(__dirname, "..", "public", "logos");

const jobs = [
  { file: "1.webp", slug: "elite-cars", name: "The Elite Cars" },
  { file: "deals1-01-2.webp", slug: "deals-on-wheels", name: "Deals on Wheels Rent A Car" },
  { file: "drinkpurefruits-at-cann91-technologies.webp", slug: "drink-pure-fruits", name: "Drink Pure Fruits" },
  { file: "kingsorganicfarm-at-cann91-technologies.webp", slug: "kings-organic-farm", name: "King's Organic Farm" },
  { file: "The_Ister_foundation_3.webp", slug: "ister-foundation", name: "The Ister Foundation" },
  { file: "mk-logo-white-full.png", slug: "masterkey-rent-a-car", name: "Masterkey Rent A Car", recolor: true },
  { file: "images (1).jpeg", slug: "azizi-developments", name: "Azizi Developments" },
  { file: "logo-full.svg", slug: "smallcase", name: "smallcase" },
  { file: "Rage_Coffee_New_Logo_x200_2x-edited_x180@2x.avif", slug: "rage-coffee", name: "Rage Coffee" },
  { file: "cashkaro_logo_v1.svg", slug: "cashkaro", name: "CashKaro" },
  { file: "timg_4303.webp", slug: "masterkey-media", name: "Masterkey Media", recolor: true },
  { file: "Лого.png", slug: "royal-imperium", name: "Royal Imperium by Al Khalidiah Holding" },
  { file: "automark-at-cann91-technologies-removebg-preview.webp", slug: "automark-india", name: "Auto Mark India" },
];

const results = [];

for (const job of jobs) {
  const inputPath = `${SRC}/${job.file}`;
  let pipeline = sharp(inputPath, { density: 300 });
  const meta = await pipeline.metadata();

  // Trim uniform padding around the artwork so every logo fills its box
  // similarly (source files vary wildly in surrounding whitespace).
  let trimmed = sharp(inputPath, { density: 300 }).trim({ threshold: 12 });

  if (job.recolor) {
    // These sources are white-on-transparent artwork (designed for dark
    // backgrounds). Recolor white -> ink so they read correctly on the
    // site's light "trusted by" strip, preserving the alpha shape.
    const { data, info } = await trimmed.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 0x0a; // R - ink color #0A0A0B
      data[i + 1] = 0x0a; // G
      data[i + 2] = 0x0b; // B
      // alpha (data[i+3]) untouched -> keeps the original glyph shape
    }
    trimmed = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  }

  const resized = trimmed.resize({
    width: 480,
    height: 200,
    fit: "inside",
    withoutEnlargement: true,
  });

  const outPath = `${OUT}/${job.slug}.png`;
  const outInfo = await resized.png({ compressionLevel: 9 }).toFile(outPath);
  results.push({ ...job, width: outInfo.width, height: outInfo.height, sourceFormat: meta.format });
  console.log(`${job.slug}: ${outInfo.width}x${outInfo.height} (source: ${job.file}, ${meta.format})`);
}

console.log("\n--- content array ---");
console.log(JSON.stringify(results.map((r) => ({ name: r.name, src: `/logos/${r.slug}.png`, width: r.width, height: r.height })), null, 2));
