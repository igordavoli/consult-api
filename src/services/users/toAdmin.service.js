const { StatusCodes } = require("http-status-codes");
const { usersRepository } = require("../../repositories");

module.exports.toAdmin = async (user) => {
  const storedUser = await usersRepository.getById(user.id);

  if (!storedUser) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound("user"),
    };
  }

  storedUser.isAdmin = user.isAdmin;

  const adminUser = await usersRepository.update(storedUser);

  return adminUser;
}