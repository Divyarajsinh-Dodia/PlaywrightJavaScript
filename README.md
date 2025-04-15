# Playwright JavaScript Automation Framework

This project is a robust, scalable Playwright-based automation framework for UI, API, and E2E testing. It supports:
- Multi-environment configuration
- Allure reporting
- Video, screenshot, and trace artifact management
- Advanced utilities for data, network, and reporting
- CI/CD integration for GitHub Actions, AWS CodeBuild, Azure DevOps, and Google Cloud Build

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run all tests:**
   ```sh
   npx playwright test
   ```
3. **Generate and view Allure report:**
   ```sh
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

---

## Project Structure

- `src/` - Page objects and service classes (e.g., BasePage, BaseApiService)
- `tests/` - Test cases for UI, API, E2E, fixtures, and hooks
- `test-data/` - Static and dynamic test data (JSON, CSV, data generators)
- `utils/` - Utility functions and helpers for API, assertions, config, data generation, DB, error handling, file helpers, formatters, framework, performance, reporting, web, and security
- `screenshots/` - Screenshots from test runs, organized by date/time and test name
- `videos/` - Test run videos, organized by date/time and test name
- `trace/` - Playwright trace files, organized by date/time and test name
- `allure-results/` - Raw Allure results for reporting
- `allure-report/` - Generated Allure HTML report
- `logs/` - Log files for each test run
- `.env.*` - Environment-specific variables (development, staging, production)

---

## Environment Variables

Use `.env.development`, `.env.staging`, or `.env.production` to set environment-specific variables.  
**Never commit secrets**; set them in your CI/CD provider.

---

## Linting & Formatting

- Run lint: `npx eslint .`
- Run format: `npx prettier --write .`

---

## Scripts

- `npm test` - Run all tests
- `npm run allure:report` - Generate and open Allure report

---

## Example Test (UI)

```js
const { test, expect } = require('@playwright/test');
const BasePage = require('../../src/pages/BasePage');
const { takeScreenshot } = require('../../utils/framework/screenshotUtils');
const { mockRoute } = require('../../utils/web/networkHelper');

test('UI demo', async ({ page }, testInfo) => {
  const basePage = new BasePage(page);
  await mockRoute(page, /\/api\/user/, { id: 1, name: 'Mocked User' });
  await basePage.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
  await takeScreenshot(page, testInfo.title);
});
```

---

## Example Test (API)

```js
const { test, expect } = require('@playwright/test');
const BaseApiService = require('../../src/services/BaseApiService');
const { buildUser } = require('../../utils/data-generators/userFactory');

test('API demo', async () => {
  const api = new BaseApiService('https://jsonplaceholder.typicode.com');
  const testUser = buildUser();
  const response = await api.post('/users', testUser);
  expect(response.status()).toBe(201);
});
```

---

## Artifacts & Reporting

- **Screenshots:** `screenshots/<date_time>/<testName>.png`
- **Videos:** `videos/<date_time>/<testName>.webm`
- **Traces:** `trace/<date_time>/<testName>.zip`
- **Allure HTML Report:** Downloadable from CI/CD artifacts

---

## Sharding & Parallelism

**Sharding** allows you to split your test suite across multiple CI jobs for faster execution.

- To run 2 shards (split tests in half):
  ```sh
  npx playwright test --shard=1/2
  npx playwright test --shard=2/2
  ```
- You can configure this in your CI/CD for maximum speed.

---

## CI/CD Integration

### GitHub Actions: `.github/workflows/playwright.yml`
- Installs dependencies and browsers
- Runs tests
- Uploads all artifacts (screenshots, videos, traces, allure-results, allure-report)

### AWS CodeBuild: `buildspec.yml`
- Same as above, with artifact collection

### Azure DevOps: `azure-pipelines.yml`
- Same as above, with artifact publishing

### Google Cloud Build: `cloudbuild.yaml`
- Same as above, with artifact upload to GCS

---

## Utilities

- **screenshotUtils.js**: Save screenshots, videos, and traces in organized folders
- **userFactory.js**: Generate random user data for tests
- **networkHelper.js**: Mock and modify network requests
- **logger.js**: Structured logging
- **errorHandler.js**: Centralized error handling
- **allureHelpers.js**: Allure step/category/attachment helpers

---

## Advanced Features

- **Allure Reporting**: Rich HTML reports with steps, attachments, and environment info
- **Custom Fixtures**: Easily extend Playwright fixtures for authentication, setup, etc.
- **Global Setup/Teardown**: Seed DB, set up environment, and clean up after tests
- **Performance Metrics**: Collect web vitals in UI tests

---

## Troubleshooting

- **Artifacts not found?**  
  Ensure the relevant folders exist before publishing artifacts in CI.
- **Allure report not opening?**  
  Make sure you generate the report with `npx allure generate` before opening.
- **Environment variables not working?**  
  Set them in your CI/CD provider or in the correct `.env.*` file.

---

## Best Practices

- Keep tests independent and idempotent
- Use data factories for test data
- Use sharding and parallelism for speed in CI
- Always review Allure reports for failed runs
- Store secrets only in CI/CD, never in code

---

## Playwright Config Example

```js
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: [['list'], ['allure-playwright']],
  globalSetup: require.resolve('./tests/hooks/globalSetup.js'),
  globalTeardown: require.resolve('./tests/hooks/globalTeardown.js'),
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Desktop Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
};
```

---

## Contributing

- Fork the repo and create a feature branch
- Add/modify tests and utilities as needed
- Run all tests and ensure CI passes
- Submit a pull request with a clear description

---

For more details, see the code comments and utility documentation in each file.  
If you need more advanced examples or want to extend the framework, check the `utils/` and `tests/` folders for patterns and best practices.
