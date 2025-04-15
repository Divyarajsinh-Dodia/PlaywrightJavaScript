/**
 * dataGenUtils.js
 *
 * Utility functions for generating random data for tests using faker.
 */
const { faker } = require('@faker-js/faker');

module.exports = {
  /**
   * Generate a random string of given length.
   * @param {number} length - Length of the string
   * @returns {string}
   */
  randomString: (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  /**
   * Generate a random user object for testing.
   * @param {object} overrides - Fields to override in the generated user
   * @returns {object}
   */
  generateUser: (overrides = {}) => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'user', 'editor']),
    ...overrides
  })
};
