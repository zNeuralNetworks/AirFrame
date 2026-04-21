const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const baseUrl = process.env.AIRFRAME_URL || 'http://localhost:3000/';
const outputPath = path.resolve(__dirname, '..', 'output', 'playwright', 'airframe-constellation.png');

async function clickIfVisible(locator) {
  if (await locator.isVisible().catch(() => false)) {
    await locator.click();
    return true;
  }
  return false;
}

(async () => {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1436, height: 932 } });

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    await clickIfVisible(page.getByRole('button', { name: 'Start Training' }));
    await page.waitForTimeout(500);

    await clickIfVisible(page.getByRole('button', { name: 'Airframe Labs' }).first());
    await page.waitForTimeout(500);

    const galaxyButton = page.getByTitle('Galaxy View');
    if (!(await clickIfVisible(galaxyButton))) {
      throw new Error('Could not find Galaxy View button. Is the app on the Academy screen?');
    }

    await page.waitForTimeout(800);

    const headingCount = await page.locator('text=Knowledge Constellation').count();
    if (headingCount < 1) {
      throw new Error('Knowledge Constellation heading was not visible after switching to Galaxy View.');
    }

    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`Saved ${outputPath}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
