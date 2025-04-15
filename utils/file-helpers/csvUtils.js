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
  const keys = header.split(',').map(key => key.trim());
  return rows.map(row => {
    const values = parseCSVRow(row);
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  });
}

/**
 * Writes array of objects to CSV file
 * @param {string} filePath 
 * @param {Array<object>} data 
 * @param {Array<string>} [headers] - Optional custom headers. If not provided, will use object keys
 */
function writeCSV(filePath, data, headers = null) {
  if (!data || !data.length) {
    throw new Error('No data provided to write to CSV');
  }

  const keys = headers || Object.keys(data[0]);
  const csvContent = [
    keys.join(','),
    ...data.map(row => 
      keys.map(key => formatCSVValue(row[key])).join(',')
    )
  ].join('\n');

  fs.writeFileSync(path.resolve(filePath), csvContent, 'utf-8');
}

/**
 * Parse a CSV row handling quoted values
 * @param {string} row 
 * @returns {Array<string>}
 */
function parseCSVRow(row) {
  const values = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      if (insideQuotes && row[i + 1] === '"') {
        currentValue += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  values.push(currentValue.trim());
  return values;
}

/**
 * Format a value for CSV, adding quotes if needed
 * @param {any} value 
 * @returns {string}
 */
function formatCSVValue(value) {
  if (value === null || value === undefined) {
    return '';
  }
  
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

module.exports = { readCSV, writeCSV };
