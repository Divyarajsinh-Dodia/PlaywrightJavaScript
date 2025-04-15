const util = require('util');

/**
 * Deep equality assertion
 * @param {any} actual
 * @param {any} expected
 * @param {string} [message]
 */
function assertDeepEqual(actual, expected, message) {
  if (!util.isDeepStrictEqual(actual, expected)) {
    throw new Error(message || `Deep equality assertion failed.\nExpected: ${JSON.stringify(expected, null, 2)}\nActual: ${JSON.stringify(actual, null, 2)}`);
  }
}

/**
 * SoftAssertions collects assertion errors and throws at the end
 */
class SoftAssertions {
  constructor() {
    this.errors = [];
  }

  assert(fn) {
    try {
      fn();
    } catch (e) {
      this.errors.push(e);
    }
  }

  async assertAsync(fn) {
    try {
      await fn();
    } catch (e) {
      this.errors.push(e);
    }
  }

  throwIfAny() {
    if (this.errors.length > 0) {
      const messages = this.errors.map((e, i) => `#${i + 1}: ${e.message}`).join('\n');
      throw new Error(`Soft assertion failures:\n${messages}`);
    }
  }
}

module.exports = { assertDeepEqual, SoftAssertions };