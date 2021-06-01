module.exports.messages = {
  notFound: (resource) => `${resource}-not-found`,
  alreadyExists: (param) => `${param}-already-registered`,
  notPossibleChange: (field, actualValue, value) => `not-possible-change-${field}-${actualValue}-to-${value}`,
  invalidFields: 'invalid-fields',
  invalidPassword: 'invalid-password',
  expiredToken: 'expired-token',
  invalidAuthFormat: 'invalid-authorization-format',
  authMissing: 'missing-authorization-header',
  internalError: 'internal-server-error',
  unauthorized: 'user-unauthorized',
};
