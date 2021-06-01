const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { encryptor, messages } = require('../../helpers');
const { constants } = require('../../utils');
const { professionalsRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.signinPro = async (email, password) => {
  const professional = await professionalsRepository.get({ email });

  if (!professional) {
    throw {
      status: StatusCodes.NOT_FOUND,
      name: 'LoginError',
      message: messages.notFound('user'),
      errors: ['email-not-exists'],
    };
  }

  const valid = await encryptor.comparePassword(password, professional.password);

  if (!valid) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      name: 'AuthorizationError',
      message: messages.invalidPassword,
      errors: ['wrong-password'],
    };
  }

  const payload = {
    id: professional.id,
    email: professional.email,
    isProfessional: true,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    professional,
    token,
  };
};
