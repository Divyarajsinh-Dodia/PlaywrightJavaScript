/**
 * BasePage.js
 *
 * Abstract base class for Playwright page objects.
 * Provides common UI actions, error handling, and logging for all page objects.
 * Extend this class for each specific page in your application.
 */
const logger = require('../../utils/framework/logger');

/**
 * BasePage provides common page actions and error handling for UI tests.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL with error handling and logging.
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    try {
      await this.page.goto(url);
      logger.log(`Navigated to ${url}`);
    } catch (error) {
      logger.error(`Failed to navigate to ${url}: ${error.message}`);
      await this.takeScreenshot('goto-error');
      throw error;
    }
  }

  /**
   * Click an element with error handling and logging.
   * @param {string} selector - Selector for the element to click
   * @param {object} options - Playwright click options
   */
  async click(selector, options = {}) {
    try {
      await this.page.click(selector, options);
      logger.log(`Clicked on ${selector}`);
    } catch (error) {
      logger.error(`Failed to click on ${selector}: ${error.message}`);
      await this.takeScreenshot('click-error');
      throw error;
    }
  }

  /**
   * Fill an input with error handling and logging.
   * @param {string} selector - Selector for the input
   * @param {string} value - Value to fill
   * @param {object} options - Playwright fill options
   */
  async fill(selector, value, options = {}) {
    try {
      await this.page.fill(selector, value, options);
      logger.log(`Filled ${selector} with value`);
    } catch (error) {
      logger.error(`Failed to fill ${selector}: ${error.message}`);
      await this.takeScreenshot('fill-error');
      throw error;
    }
  }

  /**
   * Wait for a selector to appear with error handling and logging.
   * @param {string} selector - Selector to wait for
   * @param {object} options - Playwright waitForSelector options
   */
  async waitForSelector(selector, options = {}) {
    try {
      await this.page.waitForSelector(selector, options);
      logger.log(`Waited for selector ${selector}`);
    } catch (error) {
      logger.error(`Failed to wait for selector ${selector}: ${error.message}`);
      await this.takeScreenshot('waitForSelector-error');
      throw error;
    }
  }

  /**
   * Take a screenshot with a custom name.
   * @param {string} name - Name for the screenshot file
   */
  async takeScreenshot(name = 'screenshot') {
    await this.page.screenshot({ path: `${name}-${Date.now()}.png` });
  }
}

module.exports = BasePage;
