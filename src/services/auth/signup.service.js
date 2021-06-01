const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { messages } = require('../../helpers');
const { constants } = require('../../utils');
const { usersRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.signup = async (userData) => {
  const hasUserEmail = await usersRepository.get({ email: userData.email });

  if (hasUserEmail) {
    throw {
      status: StatusCodes.CONFLICT,
      message: messages.alreadyExists('email'),
    };
  }

  const storedUser = await usersRepository.create(userData);

  const payload = {
    id: storedUser.id,
    email: storedUser.email,
    isProfessional: false,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    storedUser,
    token,
  };
};
