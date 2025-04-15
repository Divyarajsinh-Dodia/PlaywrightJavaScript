/**
 * userFactory.js
 *
 * Utility for building complex user objects for tests using faker.
 * Allows overriding any field for custom test data.
 */
const { faker } = require('@faker-js/faker');

/**
 * Build a user object for testing.
 * @param {object} overrides - Fields to override in the generated user
 * @returns {object} - User object
 */
function buildUser(overrides = {}) {
  return {
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'user', 'editor']),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      zip: faker.location.zipCode(),
    },
    ...overrides
  };
}

module.exports = { buildUser };
