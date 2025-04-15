const fs = require('fs');
const path = require('path');

/**
 * Logs API requests and responses to a file for debugging.
 * @param {import('@playwright/test').Page} page
 * @param {string} [logFile] - Optional log file path
 */
function attachApiLogger(page, logFile = 'logs/api.log') {
  const absLogFile = path.resolve(logFile);
  if (!fs.existsSync(path.dirname(absLogFile))) {
    fs.mkdirSync(path.dirname(absLogFile), { recursive: true });
  }
  page.on('request', request => {
    const entry = `[REQUEST] ${request.method()} ${request.url()}\nHeaders: ${JSON.stringify(request.headers())}\nBody: ${request.postData() || ''}\n`;
    fs.appendFileSync(absLogFile, entry);
  });
  page.on('response', async response => {
    const req = response.request();
    let body = '';
    try { body = await response.text(); } catch {}
    const entry = `[RESPONSE] ${req.method()} ${req.url()}\nStatus: ${response.status()}\nHeaders: ${JSON.stringify(response.headers())}\nBody: ${body}\n`;
    fs.appendFileSync(absLogFile, entry);
  });
}

module.exports = { attachApiLogger };