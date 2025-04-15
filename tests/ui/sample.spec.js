const { test, expect } = require('@playwright/test');
const BasePage = require('../../src/pages/BasePage');
const logger = require('../../utils/framework/logger');
const errorHandler = require('../../utils/error-handling/errorHandler');
const { toBeVisible } = require('../../utils/assertions/customAssertions');
const { mockRoute } = require('../../utils/web/networkHelper');
const { takeScreenshot } = require('../../utils/framework/screenshotUtils');
const { collectWebVitals } = require('../../utils/performance/metricsHelper');
const { allure } = require('allure-playwright');

/**
 * @tags smoke ui
 */
test.describe('UI Smoke Suite', () => {
  test('Full UI framework demo @smoke @ui', async ({ page }, testInfo) => {
    const basePage = new BasePage(page);
    try {
      logger.info('Starting UI test');
      allure.label('feature', 'Homepage');
      allure.label('category', 'UI');
      await allure.step('Mock API for /api/user', async () => {
        await mockRoute(page, /\/api\/user/, { id: 1, name: 'Mocked User' });
      });
      await allure.step('Navigate to Playwright homepage', async () => {
        await basePage.goto('https://playwright.dev');
      });
      await allure.step('Check page title', async () => {
        await expect(page).toHaveTitle(/Playwright/);
      });
      await allure.step('Custom assertion: Get Started button visible', async () => {
        const btn = await page.locator('text=Get Started');
        await toBeVisible(btn);
      });
      await allure.step('Take screenshot', async () => {
        const screenshotPath = await takeScreenshot(page, testInfo.title);
        await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
        logger.info('Screenshot saved at: ' + screenshotPath);
      });
      await allure.step('Collect performance metrics', async () => {
        const metrics = await collectWebVitals(page);
        logger.info('Performance metrics: ' + JSON.stringify(metrics));
        await allure.attachment('Performance Metrics', JSON.stringify(metrics, null, 2), 'application/json');
      });
    } catch (error) {
      await errorHandler.handleError(error, { page, testInfo, severity: 'fatal' });
      throw error;
    }
  });
});
