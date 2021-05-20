const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { constants } = require('../utils');
const { messages } = require('../helpers');
const { usersRepository, professionalsRepository } = require('../repositories');

module.exports = async (req, res, next) => {
  try {
    let token;

    if (req.headers && req.headers.authorization) {
      const [scheme, credentials] = req.headers.authorization.split(' ');

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

    const tokenUser = decoded.isProfessional
      ? await professionalsRepository.getById(decoded.id)
      : await usersRepository.getById(decoded.id);

    if (!tokenUser) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.notFound('valid-token'),
      };
    }

    req.session = {
      token,
      id: decoded.id,
      email: decoded.email,
    };
    req.tokenUser = tokenUser;

    return next();
  } catch (error) {
    console.error(error);

    return res.status(error.status).json(error.message);
  }
};
