/**
 * requestBuilder.js
 *
 * Utility for building HTTP request objects for API tests.
 */
module.exports = {
  /**
   * Build a request object for API calls.
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method (default: 'GET')
   * @param {object} data - Request payload
   * @param {object} headers - Request headers
   * @returns {object} - Request object
   */
  buildRequest: (endpoint, method = 'GET', data = {}, headers = {}) => {
    return { endpoint, method, data, headers };
  }
};
