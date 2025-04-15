const fs = require('fs');
const path = require('path');

/**
 * Splits an array of test files or cases into N shards for parallel execution.
 * @param {Array<string>} items - List of test files or test case names
 * @param {number} numShards - Number of shards
 * @returns {Array<Array<string>>} - Array of shards (each is an array of items)
 */
function shard(items, numShards) {
  const shards = Array.from({ length: numShards }, () => []);
  items.forEach((item, i) => {
    shards[i % numShards].push(item);
  });
  return shards;
}

/**
 * Loads all test files from a directory (recursively, .spec.js/.test.js)
 * @param {string} dir
 * @returns {Array<string>}
 */
function loadTestFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const abs = path.join(dir, file);
    if (fs.statSync(abs).isDirectory()) {
      files = files.concat(loadTestFiles(abs));
    } else if (file.endsWith('.spec.js') || file.endsWith('.test.js')) {
      files.push(abs);
    }
  });
  return files;
}

module.exports = { shard, loadTestFiles };