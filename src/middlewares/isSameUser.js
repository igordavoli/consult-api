const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');

module.exports = async (req, res, next) => {
  try {
    const paramsUserId = req.params.id;

    const tokenUserId = req.user.id;

    const isSameUser = paramsUserId === tokenUserId;

    if (!isSameUser) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.invalidPassword,
      };
    }

    req.paramsUserId = paramsUserId;

    return next();
  } catch (error) {
    console.error(error);

    return res.status(error.status).json(error.message);
  }
};
