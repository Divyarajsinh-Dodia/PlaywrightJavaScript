/**
 * Fail-fast utility for Playwright test runs.
 * Call this in your test.beforeEach or globalSetup to stop on first failure.
 * @param {import('@playwright/test').TestInfo} testInfo
 */
function failFast(testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Optionally, you can use process.exit(1) for hard stop
    throw new Error('Critical failure detected. Stopping further test execution.');
  }
}

module.exports = { failFast };