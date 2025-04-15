module.exports = {
  maximize: async (page) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  }
};
