const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { encryptor, messages } = require('../../helpers');
const { constants } = require('../../utils');
const { usersRepository } = require('../../repositories');
const { promisify } = require('util');

module.exports.update = async (user) => {
  const storedUser = await usersRepository.getById(user.id);

  if (!storedUser) {
    throw {
      status: StatusCodes.NOT_FOUND,
      message: messages.notFound('user'),
    };
  }

  // const valid = await encryptor.comparePassword(user.password, storedUser.password);

  // if (!valid) {
  //   throw {
  //     status: StatusCodes.UNAUTHORIZED,
  //     message: messages.invalidPassword,
  //   };
  // }

  Object.assign(storedUser, user);

  // if (user.newPassword) {
  //   storedUser.password = user.newPassword;
  // }

  const updatedUser = await usersRepository.update(storedUser);

  const payload = {
    id: updatedUser.id,
    email: updatedUser.email,
  };

  const sign = promisify(jwt.sign);

  const token = await sign(payload, constants.jwtToken);

  return {
    token,
    user: updatedUser,
  };
};
