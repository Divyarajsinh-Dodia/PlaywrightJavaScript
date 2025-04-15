module.exports = {
  attachScreenshot: (allure, name, buffer) => {
    allure.attachment(name, buffer, 'image/png');
  }
};

/**
 * Add Allure category for a test.
 * @param {object} allure
 * @param {string} category
 */
function addCategory(allure, category) {
  if (allure && typeof allure.label === 'function') {
    allure.label('category', category);
  }
}

module.exports = {
  ...module.exports,
  addCategory
};
