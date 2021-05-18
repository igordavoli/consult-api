const { StatusCodes } = require('http-status-codes');
const { usersRepository } = require('../../repositories');

module.exports.toAdmin = async (id) => {
  const storedUser = await usersRepository.getById(id);

  if (!storedUser) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  storedUser.isAdmin = !storedUser.isAdmin;

  const adminUser = await usersRepository.update(storedUser);

  return adminUser;
};
