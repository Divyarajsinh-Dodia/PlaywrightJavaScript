const fs = require('fs');
const path = require('path');

/**
 * Loads configuration with hierarchy: base -> env -> local override
 * @param {string} configDir - Directory containing config files
 * @param {string} [env] - Environment name (e.g., 'dev', 'qa', 'prod')
 * @returns {object} - Merged config object
 */
function loadConfig(configDir = 'config', env = process.env.TEST_ENV || 'dev') {
  const basePath = path.resolve(configDir, 'base.json');
  const envPath = path.resolve(configDir, `${env}.json`);
  const localPath = path.resolve(configDir, 'local.json');
  let config = {};
  if (fs.existsSync(basePath)) config = { ...config, ...JSON.parse(fs.readFileSync(basePath, 'utf-8')) };
  if (fs.existsSync(envPath)) config = { ...config, ...JSON.parse(fs.readFileSync(envPath, 'utf-8')) };
  if (fs.existsSync(localPath)) config = { ...config, ...JSON.parse(fs.readFileSync(localPath, 'utf-8')) };
  return config;
}

module.exports = { loadConfig };