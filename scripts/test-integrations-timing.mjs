import { chromium } from "playwright";

const executablePath =
  "C:\\Users\\fabiolla.nascimento\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe";

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "no-preference",
});

await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await page.locator("main").waitFor({ state: "visible", timeout: 6000 });

const core = page.getByLabel(/CenterPlatform\.ai/);
await core.scrollIntoViewIfNeeded();
await page.waitForTimeout(100);

const pulse = page.locator('g[stroke="#FEB000"] path').first();
const samples = [];
const startedAt = Date.now();

for (let index = 0; index < 42; index += 1) {
  const [borderColor, dashOffset, opacity] = await Promise.all([
    core.evaluate((element) => getComputedStyle(element).borderColor),
    pulse.evaluate((element) => getComputedStyle(element).strokeDashoffset),
    pulse.evaluate((element) => getComputedStyle(element).opacity),
  ]);

  samples.push({
    time: Date.now() - startedAt,
    borderColor,
    dashOffset,
    opacity,
  });
  await page.waitForTimeout(100);
}

console.log(JSON.stringify(samples, null, 2));
await browser.close();
