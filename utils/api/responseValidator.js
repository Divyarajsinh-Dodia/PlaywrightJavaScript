/**
 * responseValidator.js
 *
 * Utility for validating HTTP response status codes in tests.
 */
module.exports = {
  /**
   * Validate that the response status matches the expected status.
   * @param {object} response - Playwright response object
   * @param {number} expectedStatus - Expected HTTP status code
   * @throws {Error} If the status does not match
   */
  validateStatus: (response, expectedStatus) => {
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }
  }
};
