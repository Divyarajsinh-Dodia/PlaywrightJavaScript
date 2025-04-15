const fs = require('fs');
const path = require('path');

/**
 * Deletes a file if it exists.
 * @param {string} filePath
 */
function deleteFile(filePath) {
  const absPath = path.resolve(filePath);
  if (fs.existsSync(absPath)) {
    fs.unlinkSync(absPath);
  }
}

/**
 * Deletes all files in a directory (optionally filtered by extension).
 * @param {string} dirPath
 * @param {string} [ext] - Optional file extension filter (e.g. '.json')
 */
function cleanDirectory(dirPath, ext) {
  const absDir = path.resolve(dirPath);
  if (!fs.existsSync(absDir)) return;
  fs.readdirSync(absDir).forEach(file => {
    if (!ext || file.endsWith(ext)) {
      fs.unlinkSync(path.join(absDir, file));
    }
  });
}

/**
 * Resets a directory by deleting all files and recreating it.
 * @param {string} dirPath
 */
function resetDirectory(dirPath) {
  const absDir = path.resolve(dirPath);
  if (fs.existsSync(absDir)) {
    fs.rmSync(absDir, { recursive: true, force: true });
  }
  fs.mkdirSync(absDir, { recursive: true });
}

module.exports = { deleteFile, cleanDirectory, resetDirectory };