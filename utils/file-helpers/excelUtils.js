const ExcelJS = require('exceljs');
const path = require('path');

/**
 * Reads data from an Excel file and returns an array of objects (one per row).
 * @param {string} filePath - Path to the Excel file
 * @param {string} [sheetName] - Optional sheet name (defaults to first sheet)
 * @returns {Promise<Array<object>>}
 */
async function readExcel(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.resolve(filePath));
  const worksheet = sheetName ? workbook.getWorksheet(sheetName) : workbook.worksheets[0];
  if (!worksheet) throw new Error('Sheet not found');
  const rows = [];
  let headers = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      headers = row.values.slice(1); // skip first empty value
    } else {
      const rowObj = {};
      row.values.slice(1).forEach((cell, i) => {
        rowObj[headers[i]] = cell;
      });
      rows.push(rowObj);
    }
  });
  return rows;
}

/**
 * Writes an array of objects to an Excel file.
 * @param {string} filePath - Path to the Excel file
 * @param {Array<object>} data - Array of objects to write
 * @param {string} [sheetName] - Optional sheet name
 * @returns {Promise<void>}
 */
async function writeExcel(filePath, data, sheetName = 'Sheet1') {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  if (!data || !data.length) throw new Error('No data to write');
  worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
  data.forEach(row => worksheet.addRow(row));
  await workbook.xlsx.writeFile(path.resolve(filePath));
}

module.exports = { readExcel, writeExcel };