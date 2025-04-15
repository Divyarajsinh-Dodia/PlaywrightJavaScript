const SwaggerParser = require('swagger-parser');
const Ajv = require('ajv');

/**
 * Loads and validates an OpenAPI/Swagger schema file.
 * @param {string} schemaPath - Path to the OpenAPI/Swagger file (YAML or JSON)
 * @returns {Promise<object>} - Parsed and dereferenced schema
 */
async function loadOpenApiSchema(schemaPath) {
  return await SwaggerParser.dereference(schemaPath);
}

/**
 * Validates a response object against an OpenAPI schema definition.
 * @param {object} schema - Dereferenced OpenAPI schema
 * @param {string} path - API endpoint path (e.g. '/users/{id}')
 * @param {string} method - HTTP method (e.g. 'get', 'post')
 * @param {number} statusCode - Response status code
 * @param {object} responseBody - Actual response body
 * @returns {{isValid: boolean, errors: Array<string>}}
 */
function validateResponse(schema, path, method, statusCode, responseBody) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const pathObj = schema.paths[path];
  if (!pathObj) return { isValid: false, errors: [`Path ${path} not found in schema`] };
  const methodObj = pathObj[method.toLowerCase()];
  if (!methodObj) return { isValid: false, errors: [`Method ${method} not found for path ${path}`] };
  const respSchema = methodObj.responses?.[statusCode]?.content?.['application/json']?.schema;
  if (!respSchema) return { isValid: false, errors: [`No schema for status ${statusCode} at ${method.toUpperCase()} ${path}`] };
  const validate = ajv.compile(respSchema);
  const valid = validate(responseBody);
  return {
    isValid: valid,
    errors: valid ? [] : (validate.errors || []).map(e => `${e.instancePath}: ${e.message}`)
  };
}

module.exports = { loadOpenApiSchema, validateResponse };