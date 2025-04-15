const fs = require('fs');
const path = require('path');

module.exports = {
  loadConfig: (env) => {
    const envPath = path.resolve(process.cwd(), `.env.${env}`);
    if (fs.existsSync(envPath)) {
      require('dotenv').config({ path: envPath });
    }
  }
};
