/**
 * Retries an async function with exponential backoff.
 * @param {function} fn - The async function to retry
 * @param {object} [options]
 * @param {number} [options.retries=3] - Number of retries
 * @param {number} [options.initialDelay=500] - Initial delay in ms
 * @param {number} [options.factor=2] - Backoff factor
 * @returns {Promise<*>}
 */
async function retryWithExponentialBackoff(fn, options = {}) {
  const {
    retries = 3,
    initialDelay = 500,
    factor = 2
  } = options;
  let attempt = 0;
  let delay = initialDelay;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, delay));
      delay *= factor;
      attempt++;
    }
  }
}

module.exports = { retryWithExponentialBackoff };