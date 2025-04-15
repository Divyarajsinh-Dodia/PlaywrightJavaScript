const fs = require('fs');
const path = require('path');

/**
 * Generates a JSON summary report from test results.
 * @param {Array<object>} results - Array of test result objects
 * @param {string} [outputFile] - Output file path
 */
function generateJsonReport(results, outputFile = 'test-results/summary.json') {
  const absPath = path.resolve(outputFile);
  if (!fs.existsSync(path.dirname(absPath))) {
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
  }
  fs.writeFileSync(absPath, JSON.stringify(results, null, 2), 'utf-8');
}

/**
 * Generates a simple HTML summary report from test results.
 * @param {Array<object>} results - Array of test result objects
 * @param {string} [outputFile] - Output file path
 */
function generateHtmlReport(results, outputFile = 'test-results/summary.html') {
  const absPath = path.resolve(outputFile);
  if (!fs.existsSync(path.dirname(absPath))) {
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
  }
  const html = `<!DOCTYPE html>
<html><head><meta charset='utf-8'><title>Test Summary</title>
<style>body{font-family:sans-serif;}table{border-collapse:collapse;}td,th{border:1px solid #ccc;padding:4px 8px;}</style>
</head><body>
<h1>Test Summary</h1>
<table><thead><tr><th>Test</th><th>Status</th><th>Duration (ms)</th><th>Error</th></tr></thead><tbody>
${results.map(r => `<tr><td>${r.name}</td><td>${r.status}</td><td>${r.duration || ''}</td><td>${r.error || ''}</td></tr>`).join('')}
</tbody></table>
</body></html>`;
  fs.writeFileSync(absPath, html, 'utf-8');
}

module.exports = { generateJsonReport, generateHtmlReport };