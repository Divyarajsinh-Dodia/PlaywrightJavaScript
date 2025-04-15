module.exports = {
  toBeVisible: async (element) => {
    if (!(await element.isVisible())) {
      throw new Error('Element is not visible');
    }
  },

  toBeHidden: async (element) => {
    if (await element.isVisible()) {
      throw new Error('Element is visible but expected to be hidden');
    }
  },

  toHaveText: async (element, expectedText) => {
    const actualText = await element.textContent();
    if (actualText.trim() !== expectedText) {
      throw new Error(`Expected text "${expectedText}" but found "${actualText.trim()}"`);
    }
  },

  toContainText: async (element, expectedText) => {
    const actualText = await element.textContent();
    if (!actualText.includes(expectedText)) {
      throw new Error(`Expected text to contain "${expectedText}" but found "${actualText}"`);
    }
  },

  toHaveValue: async (element, expectedValue) => {
    const actualValue = await element.inputValue();
    if (actualValue !== expectedValue) {
      throw new Error(`Expected value "${expectedValue}" but found "${actualValue}"`);
    }
  },

  toHaveAttribute: async (element, attributeName, expectedValue) => {
    const actualValue = await element.getAttribute(attributeName);
    if (actualValue !== expectedValue) {
      throw new Error(`Expected attribute "${attributeName}" to have value "${expectedValue}" but found "${actualValue}"`);
    }
  },

  toHaveCount: async (elements, expectedCount) => {
    const actualCount = await elements.count();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} elements but found ${actualCount}`);
    }
  },

  toBeEnabled: async (element) => {
    if (!(await element.isEnabled())) {
      throw new Error('Element is not enabled');
    }
  },

  toBeDisabled: async (element) => {
    if (await element.isEnabled()) {
      throw new Error('Element is enabled but expected to be disabled');
    }
  },

  toBeChecked: async (element) => {
    if (!(await element.isChecked())) {
      throw new Error('Element is not checked');
    }
  },

  toHaveClass: async (element, expectedClass) => {
    const classList = await element.getAttribute('class');
    if (!classList?.split(' ').includes(expectedClass)) {
      throw new Error(`Element does not have class "${expectedClass}"`);
    }
  }
};
