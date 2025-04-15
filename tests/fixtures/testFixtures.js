const { test: base } = require('@playwright/test');

/**
 * Example: Authenticated user fixture
 */
exports.test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#username', process.env.TEST_USERNAME || 'testuser');
    await page.fill('#password', process.env.TEST_PASSWORD || 'testpass');
    await page.click('#login-button');
    await page.waitForURL('/dashboard');
    await use(page);
    await page.goto('/logout');
  },
});
