module.exports = {
  pressKey: async (page, key) => {
    await page.keyboard.press(key);
  }
};
