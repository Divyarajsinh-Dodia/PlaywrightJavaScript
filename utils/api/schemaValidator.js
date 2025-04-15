const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = {
  validateSchema: (data, schema) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      throw new Error('Schema validation failed: ' + JSON.stringify(validate.errors));
    }
    return true;
  }
};
