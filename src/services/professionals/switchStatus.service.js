const { StatusCodes } = require('http-status-codes');
const { encryptor, messages } = require('../../helpers');
const { professionalsRepository } = require('../../repositories');

module.exports.switchStatus = async (id) => {
  const storedProfessional = await professionalsRepository.getById(id);

  if (!storedProfessional) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  storedProfessional.isActive = !storedProfessional.isActive;

  await professionalsRepository.update(storedProfessional);

  return storedProfessional.isActive
};
