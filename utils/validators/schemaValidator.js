const Ajv = require('ajv');
const addFormats = require('ajv-formats');

class SchemaValidator {
  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: false
    });
    addFormats(this.ajv);
  }

  /**
   * Validates data against a JSON schema
   * @param {Object} data - Data to validate
   * @param {Object} schema - JSON schema to validate against
   * @returns {{isValid: boolean, errors: Array<string>}} Validation result
   */
  validate(data, schema) {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);
    
    return {
      isValid,
      errors: isValid ? [] : this.formatErrors(validate.errors)
    };
  }

  /**
   * Validates an API response against a schema
   * @param {Object} response - API response object
   * @param {Object} schema - JSON schema to validate against
   * @param {Object} options - Validation options
   * @returns {{isValid: boolean, errors: Array<string>}} Validation result
   */
  validateResponse(response, schema, options = {}) {
    const { validateStatus = true } = options;
    const errors = [];

    // Validate status code if schema includes it
    if (validateStatus && schema.properties?.status) {
      const statusValid = this.validate(
        { status: response.status },
        { properties: { status: schema.properties.status } }
      );
      if (!statusValid.isValid) {
        errors.push(...statusValid.errors);
      }
    }

    // Validate response body
    const bodyValid = this.validate(response.data, schema);
    if (!bodyValid.isValid) {
      errors.push(...bodyValid.errors);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Formats validation errors into readable messages
   * @param {Array} errors - AJV error objects
   * @returns {Array<string>} Formatted error messages
   */
  formatErrors(errors) {
    return errors.map(error => {
      const path = error.instancePath || '/';
      switch (error.keyword) {
        case 'type':
          return `${path}: expected ${error.params.type}, got ${typeof error.data}`;
        case 'required':
          return `${path}: missing required property '${error.params.missingProperty}'`;
        case 'enum':
          return `${path}: value must be one of: ${error.params.allowedValues.join(', ')}`;
        case 'format':
          return `${path}: invalid ${error.params.format} format`;
        default:
          return `${path}: ${error.message}`;
      }
    });
  }

  /**
   * Adds a custom format for validation
   * @param {string} name - Format name
   * @param {RegExp|Function} format - Format definition
   */
  addFormat(name, format) {
    this.ajv.addFormat(name, format);
  }

  /**
   * Adds a custom keyword for validation
   * @param {string} name - Keyword name
   * @param {Object} definition - Keyword definition
   */
  addKeyword(name, definition) {
    this.ajv.addKeyword({
      keyword: name,
      ...definition
    });
  }
}

module.exports = new SchemaValidator();