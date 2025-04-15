/**
 * Utility for executing JavaScript in the browser context
 */

/**
 * Executes JavaScript code in the page context
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string|Function} script - JavaScript code or function to execute
 * @param {...*} args - Arguments to pass to the script
 * @returns {Promise<*>} Result of the script execution
 */
async function executeScript(page, script, ...args) {
  if (typeof script === 'function') {
    return await page.evaluate(script, ...args);
  }
  return await page.evaluate((...params) => {
    return eval(params[0]);
  }, script, ...args);
}

/**
 * Executes JavaScript code in all frames of the page
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string|Function} script - JavaScript code or function to execute
 * @param {...*} args - Arguments to pass to the script
 * @returns {Promise<Array<*>>} Results from each frame
 */
async function executeScriptInAllFrames(page, script, ...args) {
  const frames = page.frames();
  const results = [];
  
  for (const frame of frames) {
    try {
      const result = await frame.evaluate(
        typeof script === 'function' ? script : ((...params) => eval(params[0])),
        ...(typeof script === 'function' ? args : [script, ...args])
      );
      results.push({ frameUrl: frame.url(), result });
    } catch (error) {
      results.push({ frameUrl: frame.url(), error: error.message });
    }
  }
  
  return results;
}

/**
 * Executes async JavaScript code and waits for it to complete
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string|Function} script - Async JavaScript code or function to execute
 * @param {...*} args - Arguments to pass to the script
 * @returns {Promise<*>} Result of the async script execution
 */
async function executeAsyncScript(page, script, ...args) {
  if (typeof script === 'function') {
    return await page.evaluate(script, ...args);
  }
  return await page.evaluate(async (...params) => {
    return await eval(`(async () => { ${params[0]} })()`);
  }, script, ...args);
}

/**
 * Safely executes JavaScript code with error handling
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string|Function} script - JavaScript code or function to execute
 * @param {...*} args - Arguments to pass to the script
 * @returns {Promise<{success: boolean, result?: *, error?: string}>} Execution result
 */
async function executeSafeScript(page, script, ...args) {
  try {
    const result = await executeScript(page, script, ...args);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  executeScript,
  executeScriptInAllFrames,
  executeAsyncScript,
  executeSafeScript
};