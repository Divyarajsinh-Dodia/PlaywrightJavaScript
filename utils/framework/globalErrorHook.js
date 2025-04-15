const fs = require('fs');
const path = require('path');

/**
 * Registers a global error hook for Playwright tests to capture screenshots and logs on failure.
 * Call this in your test setup (e.g., in a globalSetup or test.beforeEach hook).
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {import('@playwright/test').Page} page
 */
async function captureOnFailure(testInfo, page) {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotDir = path.resolve('screenshots');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${testInfo.title.replace(/[^a-z0-9]/gi, '_')}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    // Optionally, capture console logs or network logs here
  }
}

module.exports = { captureOnFailure };