const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { encryptor, messages } = require('../../helpers');
const { constants } = require('../../utils');
const { professionalsRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.update = async (professional) => {
  const storedProfessional = await professionalsRepository.getById(professional.id);

  if (!storedProfessional) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('professional'),
    };
  }

  // const valid = await encryptor.comparePassword(professional.password, storedProfessional.password);

  // if (!valid) {
  //   throw {
  //     status: StatusCodes.UNAUTHORIZED,
  //     message: messages.invalidPassword,
  //   };
  // }

  Object.assign(storedProfessional, professional);

  // if (professional.newPassword) {
  //   storedProfessional.password = professional.newPassword;
  // }

  const updatedProfessional = await professionalsRepository.update(storedProfessional);

  const payload = {
    id: updatedProfessional.id,
    email: updatedProfessional.email,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    token,
    professional: updatedProfessional,
  };
};
