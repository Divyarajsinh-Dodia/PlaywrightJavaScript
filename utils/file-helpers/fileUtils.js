const fs = require('fs');

module.exports = {
  readFile: (filePath) => fs.readFileSync(filePath, 'utf-8'),
  writeFile: (filePath, data) => fs.writeFileSync(filePath, data)
};
