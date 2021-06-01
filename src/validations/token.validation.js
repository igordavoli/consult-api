const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { constants } = require('../utils');
const { messages } = require('../helpers');

module.exports.token = async (headers) => {
  let token;

  if (headers && headers.authorization) {
    const [scheme, credentials] = headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.invalidAuthFormat,
      };
    }
  } else {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: messages.authMissing,
    };
  }

  const verify = promisify(jwt.verify);

  const decoded = await verify(token, constants.jwtToken);

  return { token, decoded };
};
