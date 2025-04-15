/**
 * Selects an option from a dropdown by visible text or value.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector - Dropdown selector
 * @param {string} option - Visible text or value
 */
async function selectDropdown(page, selector, option) {
  const dropdown = page.locator(selector);
  // Try by value first
  const values = await dropdown.evaluateAll((els, val) => els.map(e => e.value), option);
  if (values.includes(option)) {
    await dropdown.selectOption(option);
    return;
  }
  // Fallback: select by visible text
  const options = await dropdown.locator('option').allTextContents();
  const idx = options.findIndex(text => text.trim() === option);
  if (idx !== -1) {
    const value = await dropdown.locator('option').nth(idx).getAttribute('value');
    await dropdown.selectOption(value);
  } else {
    throw new Error(`Option '${option}' not found in dropdown ${selector}`);
  }
}

/**
 * Closes a modal by clicking a close button or pressing Escape.
 * @param {import('@playwright/test').Page} page
 * @param {string} [closeSelector] - Optional close button selector
 */
async function closeModal(page, closeSelector) {
  if (closeSelector) {
    await page.click(closeSelector);
  } else {
    await page.keyboard.press('Escape');
  }
}

/**
 * Gets all rows from a table as array of objects (header: cell value).
 * @param {import('@playwright/test').Page} page
 * @param {string} tableSelector
 * @returns {Promise<Array<object>>}
 */
async function getTableRows(page, tableSelector) {
  const table = page.locator(tableSelector);
  const headers = await table.locator('thead tr th').allTextContents();
  const rows = await table.locator('tbody tr').all();
  return Promise.all(rows.map(async row => {
    const cells = await row.locator('td').allTextContents();
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = cells[i]; });
    return obj;
  }));
}

module.exports = { selectDropdown, closeModal, getTableRows };