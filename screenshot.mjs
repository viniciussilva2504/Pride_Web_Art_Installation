/**
 * Automated screenshot capture for README.md
 * Usage: node screenshot.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "screenshots");

const FLAGS = [
  { slug: "rainbow", label: "Rainbow Pride" },
  { slug: "trans", label: "Trans Pride" },
  { slug: "bisexual", label: "Bisexual Pride" },
  { slug: "pansexual", label: "Pansexual Pride" },
  { slug: "nonbinary", label: "Non-Binary Pride" },
  { slug: "lesbian", label: "Lesbian Pride" },
  { slug: "asexual", label: "Asexual Pride" },
  { slug: "genderqueer", label: "Genderqueer Pride" },
];

async function main() {
  mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const url = "file:///" + __dirname.replace(/\\/g, "/") + "/index.html";
  console.log("Opening:", url);
  await page.goto(url);

  // Wait for the initial render (particles fade in)
  await page.waitForTimeout(5000);

  for (let i = 0; i < FLAGS.length; i++) {
    await page.evaluate((idx) => window.__pride.setFlag(idx), i);

    // Wait for definition text and colours to converge
    await page.waitForTimeout(3000);

    const file = join(OUT, `${FLAGS[i].slug}.png`);
    await page.screenshot({ path: file });
    console.log(`  ✓ ${FLAGS[i].label} → screenshots/${FLAGS[i].slug}.png`);
  }

  // Also take a composite "preview" — first flag, good timing
  await page.evaluate(() => window.__pride.setFlag(0));
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(__dirname, "preview.png") });
  console.log("  ✓ preview.png (Rainbow — hero image)");

  await browser.close();
  console.log("\nDone. All screenshots saved.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
