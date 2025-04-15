module.exports = {
  getFrame: async (page, frameName) => {
    return await page.frame({ name: frameName });
  }
};
