const fs = require('fs');
const path = require('path');

/**
 * Cleans up files or directories after parallel test runs.
 * @param {Array<string>} paths - List of file or directory paths to clean
 */
function cleanupFiles(paths) {
  for (const p of paths) {
    const abs = path.resolve(p);
    if (fs.existsSync(abs)) {
      if (fs.statSync(abs).isDirectory()) {
        fs.rmSync(abs, { recursive: true, force: true });
      } else {
        fs.unlinkSync(abs);
      }
    }
  }
}

/**
 * Closes all browser contexts (for Playwright)
 * @param {Array<import('@playwright/test').BrowserContext>} contexts
 */
async function closeAllContexts(contexts) {
  for (const ctx of contexts) {
    try { await ctx.close(); } catch {}
  }
}

module.exports = { cleanupFiles, closeAllContexts };