const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

/**
 * Validates a config file against a JSON schema.
 * @param {string} configPath - Path to config file
 * @param {object} schema - JSON schema
 * @returns {{isValid: boolean, errors: Array<string>}}
 */
function validateConfig(configPath, schema) {
  const ajv = new Ajv({ allErrors: true });
  const config = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf-8'));
  const validate = ajv.compile(schema);
  const valid = validate(config);
  return {
    isValid: valid,
    errors: valid ? [] : (validate.errors || []).map(e => `${e.instancePath}: ${e.message}`)
  };
}

/**
 * Validates required environment variables are set.
 * @param {Array<string>} requiredVars
 * @returns {Array<string>} - List of missing variables
 */
function validateEnvVars(requiredVars) {
  return requiredVars.filter(v => !process.env[v]);
}

module.exports = { validateConfig, validateEnvVars };