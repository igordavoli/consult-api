const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { messages } = require('../../helpers');
const { constants } = require('../../utils');
const { professionalsRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.signupPro = async (userData) => {
  const hasEmail = await professionalsRepository.get({ email: userData.email });

  if (hasEmail) {
    throw {
      status: StatusCodes.CONFLICT,
      message: messages.alreadyExists('email'),
    };
  }

  const storedProfessional = await professionalsRepository.create(userData);

  const payload = {
    id: storedProfessional.id,
    email: storedProfessional.email,
    isProfessional: true,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    storedProfessional,
    token,
  };
};
