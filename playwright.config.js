require('dotenv').config();
const { devices } = require('@playwright/test');

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
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  /*
  // Example: Conditional test execution by tag
  grep: process.env.TEST_TAG ? new RegExp(process.env.TEST_TAG) : undefined,
  */
};
