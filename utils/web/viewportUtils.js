/**
 * Utility functions for managing viewport size and state
 */

/**
 * Sets the viewport size of the page
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {number} width - Viewport width in pixels
 * @param {number} height - Viewport height in pixels
 */
async function setViewportSize(page, width, height) {
  await page.setViewportSize({ width, height });
}

/**
 * Sets the viewport to common device presets
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {'mobile'|'tablet'|'desktop'|'large-desktop'} preset - Device preset name
 */
async function setViewportPreset(page, preset) {
  const presets = {
    'mobile': { width: 375, height: 667 },
    'tablet': { width: 768, height: 1024 },
    'desktop': { width: 1920, height: 1080 },
    'large-desktop': { width: 2560, height: 1440 }
  };

  const viewport = presets[preset];
  if (!viewport) {
    throw new Error(`Unknown viewport preset: ${preset}`);
  }

  await page.setViewportSize(viewport);
}

/**
 * Gets the current viewport size
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<{width: number, height: number}>} Current viewport dimensions
 */
async function getViewportSize(page) {
  return await page.viewportSize();
}

module.exports = {
  setViewportSize,
  setViewportPreset,
  getViewportSize
};