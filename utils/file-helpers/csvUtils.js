const fs = require('fs');
const path = require('path');

/**
 * Reads CSV file and returns array of objects.
 * @param {string} filePath
 * @returns {Array<object>}
 */
function readCSV(filePath) {
  const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const [header, ...rows] = content.trim().split('\n');
  const keys = header.split(',');
  return rows.map(row => {
    const values = row.split(',');
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  });
}

module.exports = { readCSV };
