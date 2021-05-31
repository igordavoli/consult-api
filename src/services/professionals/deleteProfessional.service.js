const { StatusCodes } = require('http-status-codes');
const { encryptor, messages } = require('../../helpers');
const { professionalsRepository } = require('../../repositories');

module.exports.deleteProfessional = async (id, password) => {
  const storedUser = await professionalsRepository.getById(id);

  if (!storedUser) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  // const isValid = await encryptor.comparePassword(password, storedUser.password);

  // if (!isValid) {
  //   throw {
  //     status: StatusCodes.UNAUTHORIZED,
  //     message: messages.invalidPassword,
  //   };
  // }

  storedUser.isDeleted = true;

  await professionalsRepository.update(storedUser);
};
