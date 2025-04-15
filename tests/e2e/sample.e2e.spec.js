const { test, expect } = require('@playwright/test');
const BasePage = require('../../src/pages/BasePage');
const BaseApiService = require('../../src/services/BaseApiService');
const { buildUser } = require('../../utils/data-generators/userFactory');
const { readCSV } = require('../../utils/file-helpers/csvUtils');
const logger = require('../../utils/framework/logger');
const errorHandler = require('../../utils/error-handling/errorHandler');
const { retry } = require('../../utils/framework/retryUtils');
const { allure } = require('allure-playwright');
const { collectWebVitals } = require('../../utils/performance/metricsHelper');

/**
 * @tags e2e regression
 */
test.describe('E2E Regression Suite', () => {
  test('Full E2E framework demo @e2e @regression', async ({ page }, testInfo) => {
    const basePage = new BasePage(page);
    const api = new BaseApiService('https://jsonplaceholder.typicode.com');
    const testUser = buildUser({ role: 'user' });
    try {
      logger.info('Starting E2E test');
      allure.label('feature', 'E2E Demo');
      allure.label('category', 'E2E');
      await allure.step('Create user via API (mocked)', async () => {
        // Simulate API call with retry
        const response = await retry(() => api.post('/users', testUser), 2);
        expect(response.status()).toBe(201);
        const data = await response.json();
        // Only check for presence of expected fields, not exact values
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('role');
        await allure.attachment('API Response', JSON.stringify(data, null, 2), 'application/json');
      });
      await allure.step('Navigate to homepage', async () => {
        await basePage.goto('https://playwright.dev');
      });
      await allure.step('Load test data from CSV', async () => {
        // Assume a CSV exists at test-data/static/users.csv
        // const users = readCSV('test-data/static/users.csv');
        // logger.info('Loaded users from CSV: ' + JSON.stringify(users));
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
