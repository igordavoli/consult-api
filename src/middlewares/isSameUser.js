const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');

module.exports = async (req, res, next) => {
  try {

    const paramsId = req.params.id;
    const tokenId = req.tokenUser.id;
    const isSame = paramsId === tokenId;
    // console.log(req.tokenUser)
    // console.log(tokenId)
    console.log(paramsId)

    if (!isSame) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.unauthorized,
      };
    }

    req.paramsId = paramsId;

    return next();

  } catch (error) {
    console.error(error);

    return res.status(error.status).json(error.message);
  }
};
