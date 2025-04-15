module.exports = {
  logMetric: (name, value) => {
    console.log(`[METRIC] ${name}: ${value}`);
  }
};

/**
 * Collects standard web performance metrics from the page.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<object>}
 */
async function collectWebVitals(page) {
  return await page.evaluate(() => {
    return new Promise(resolve => {
      new PerformanceObserver((entryList, observer) => {
        const entries = entryList.getEntries();
        const metrics = {};
        entries.forEach(entry => {
          metrics[entry.name] = entry.startTime;
        });
        observer.disconnect();
        resolve(metrics);
      }).observe({ type: 'navigation', buffered: true });
    });
  });
}

module.exports = {
  ...module.exports,
  collectWebVitals
};
