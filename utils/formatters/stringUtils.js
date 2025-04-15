module.exports = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  
  /**
   * Converts a string to a JSON object
   * @param {string} str - String to parse
   * @returns {object} Parsed JSON object
   * @throws {Error} If string is not valid JSON
   */
  toJSON: (str) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      throw new Error(`Failed to parse string as JSON: ${error.message}`);
    }
  },

  /**
   * Removes all whitespace from a string
   * @param {string} str - String to process
   * @returns {string} String without whitespace
   */
  removeWhitespace: (str) => str.replace(/\s+/g, '')
};
