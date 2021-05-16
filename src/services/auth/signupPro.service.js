const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { messages } = require('../../helpers');
const { constants } = require('../../utils');
const { professionalRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.signupPro = async (email, name, password) => {
  const hasEmail = await professionalRepository.get({ email });

  if (hasEmail) {
    throw {
      status: StatusCodes.CONFLICT,
      message: messages.alreadyExists('email'),
    };
  }

  const storedProfessional = await professionalRepository.create({
    email,
    name,
    password,
  });

  const payload = {
    id: storedProfessional.id,
    email: storedProfessional.email,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    storedProfessional,
    token,
  };
};
