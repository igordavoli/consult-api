const { StatusCodes } = require('http-status-codes');
const { encryptor, messages } = require('../../helpers');
const { usersRepository } = require('../../repositories');

module.exports.deleteUser = async (id, password) => {
  const storedUser = await usersRepository.getById(id);

  if (!storedUser) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  const isValid = await encryptor.comparePassword(password, storedUser.password);

  if (!isValid) {
    throw {
      status: StatusCodes.UNAUTHORIZED,
      message: messages.invalidPassword,
    };
  }

  storedUser.isDeleted = true;

  await usersRepository.update(storedUser);
};
