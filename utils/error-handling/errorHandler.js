const logger = require('../framework/logger');

/**
 * Centralized error handler for tests.
 * @param {Error} error
 * @param {object} context
 */
module.exports.handleError = async (error, context = {}) => {
  const { page, testInfo, severity = 'error' } = context;
  logger.error(`[${severity.toUpperCase()}] ${error.message}`);
  if (page && testInfo) {
    const screenshotPath = `error-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath });
    if (testInfo.attach) {
      await testInfo.attach('Screenshot on error', { path: screenshotPath, contentType: 'image/png' });
    }
  }
  if (severity === 'fatal') {
    throw error;
  }
};
