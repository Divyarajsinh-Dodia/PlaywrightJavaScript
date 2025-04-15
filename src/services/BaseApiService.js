const { request } = require('@playwright/test');

/**
 * BaseApiService provides HTTP methods and error handling for API tests.
 */
class BaseApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this._contextPromise = request.newContext();
  }

  async get(endpoint, headers = {}) {
    try {
      const ctx = await this._contextPromise;
      const response = await ctx.get(this.baseURL + endpoint, { headers });
      return response;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(endpoint, data = {}, headers = {}) {
    try {
      const ctx = await this._contextPromise;
      const response = await ctx.post(this.baseURL + endpoint, { data, headers });
      return response;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(endpoint, data = {}, headers = {}) {
    try {
      const ctx = await this._contextPromise;
      const response = await ctx.put(this.baseURL + endpoint, { data, headers });
      return response;
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async delete(endpoint, headers = {}) {
    try {
      const ctx = await this._contextPromise;
      const response = await ctx.delete(this.baseURL + endpoint, { headers });
      return response;
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }
}

module.exports = BaseApiService;
