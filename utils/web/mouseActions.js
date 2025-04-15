module.exports = {
  click: async (page, x, y) => {
    await page.mouse.click(x, y);
  }
};
