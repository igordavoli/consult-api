const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { encryptor, messages } = require('../../helpers');
const { constants } = require('../../utils');
const { usersRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.signin = async (email, password) => {
  const user = await usersRepository.get({ email });

  if (!user) {
    throw {
      status: StatusCodes.NOT_FOUND,
      name: 'LoginError',
      message: messages.notFound('user'),
      errors: ['email-not-exists'],
    };
  }

  const valid = await encryptor.comparePassword(password, user.password);

  if (!valid) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      name: 'AuthorizationError',
      message: messages.invalidPassword,
      errors: ['wrong-password'],
    };
  }

  const payload = {
    id: user.id,
    email: user.email,
    isProfessional: false,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    user,
    token,
  };
};
