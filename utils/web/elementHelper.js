module.exports = {
  getElement: async (page, selector) => {
    return await page.$(selector);
  }
};
