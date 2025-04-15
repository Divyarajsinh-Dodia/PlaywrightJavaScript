/**
 * Utilities for network interception and mocking in Playwright.
 */
module.exports = {
  /**
   * Mock a network route with a static response.
   * @param {import('@playwright/test').Page} page
   * @param {string|RegExp} url
   * @param {object} response
   */
  mockRoute: async (page, url, response) => {
    await page.route(url, route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    }));
  },

  /**
   * Modify requests on the fly (e.g., add headers).
   * @param {import('@playwright/test').Page} page
   * @param {string|RegExp} url
   * @param {function} handler
   */
  modifyRequest: async (page, url, handler) => {
    await page.route(url, handler);
  }
};
