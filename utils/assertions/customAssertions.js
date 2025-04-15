module.exports = {
  toBeVisible: async (element) => {
    if (!(await element.isVisible())) {
      throw new Error('Element is not visible');
    }
  }
};
