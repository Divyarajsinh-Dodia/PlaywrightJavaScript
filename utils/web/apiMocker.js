/**
 * Utility to mock API requests in Playwright tests.
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} urlPattern - URL or pattern to match
 * @param {object|function} mockResponse - Static response object or function returning response
 * @param {number} [status=200] - HTTP status code
 * @param {object} [headers] - Optional headers
 */
async function mockApi(page, urlPattern, mockResponse, status = 200, headers = { 'Content-Type': 'application/json' }) {
  await page.route(urlPattern, async route => {
    let body = typeof mockResponse === 'function' ? await mockResponse(route.request()) : mockResponse;
    if (typeof body !== 'string') body = JSON.stringify(body);
    await route.fulfill({
      status,
      headers,
      body
    });
  });
}

/**
 * Utility to mock API error responses.
 * @param {import('@playwright/test').Page} page
 * @param {string|RegExp} urlPattern
 * @param {number} status
 * @param {string|object} [body]
 */
async function mockApiError(page, urlPattern, status = 500, body = { error: 'Mocked error' }) {
  await page.route(urlPattern, async route => {
    await route.fulfill({
      status,
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });
  });
}

module.exports = { mockApi, mockApiError };