/**
 * Sanitize sensitive fields in an object for logging or reporting.
 * @param {object} data
 * @returns {object}
 */
module.exports = (data) => {
  const sensitiveFields = ['password', 'token', 'ssn', 'credit_card'];
  const sanitized = JSON.parse(JSON.stringify(data));
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '******';
    }
  });
  return sanitized;
};
