const { test, expect, request } = require('@playwright/test');
const BaseApiService = require('../../src/services/BaseApiService');
const { buildUser } = require('../../utils/data-generators/userFactory');
const { validateStatus } = require('../../utils/api/responseValidator');
const { validateSchema } = require('../../utils/api/schemaValidator');
const { readCSV } = require('../../utils/file-helpers/csvUtils');
const logger = require('../../utils/framework/logger');
const errorHandler = require('../../utils/error-handling/errorHandler');
const { retry } = require('../../utils/framework/retryUtils');
const sanitizeData = require('../../utils/security/sanitizeData');
const { allure } = require('allure-playwright');

/**
 * @tags api regression
 */
test.describe('API Regression Suite', () => {
  test('Full API framework demo @api @regression', async ( { request }, testInfo ) => {
    const api = new BaseApiService('https://jsonplaceholder.typicode.com');
    const testUser = buildUser({ role: 'admin' });
    const userSchema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' }
      },
      required: ['id', 'name', 'email', 'role']
    };
    try {
      logger.info('Starting API test');
      allure.label('feature', 'User API');
      allure.label('category', 'API');
      await allure.step('Create user via API with retry', async () => {
        const response = await retry(() => api.post('/users', testUser), 2);
        validateStatus(response, 201);
        const data = await response.json();
        validateSchema(data, userSchema);
        await allure.attachment('API Response', JSON.stringify(sanitizeData(data), null, 2), 'application/json');
      });
      await allure.step('Load test data from CSV', async () => {
        // Assume a CSV exists at test-data/static/users.csv
        // const users = readCSV('test-data/static/users.csv');
        // logger.info('Loaded users from CSV: ' + JSON.stringify(users));
      });
    } catch (error) {
      await errorHandler.handleError(error, { testInfo, severity: 'fatal' });
      throw error;
    }
  });
});
