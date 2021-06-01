const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');
const { usersRepository, professionalsRepository } = require('../repositories');
const validations = require('../validations');

module.exports = async (req, res, next) => {
  try {
    const { token, decoded } = await validations.token(req.headers);

    const tokenUser = decoded.isProfessional
      ? await professionalsRepository.getById(decoded.id)
      : await usersRepository.getById(decoded.id);

    if (!tokenUser) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.notFound('valid-token'),
      };
    }

    req.session = {
      token,
      id: decoded.id,
      email: decoded.email,
      isProfessional: decoded.isProfessional,
    };

    req.tokenUser = tokenUser;

    return next();
  } catch (error) {
    console.error(error);

    return res.status(error.status).json(error.message);
  }
};
