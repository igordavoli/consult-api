const { StatusCodes } = require('http-status-codes');
const { authService } = require('../services');
const validations = require('../validations')

module.exports = {
  signin: async (req, res) => {
    try {

      await validations.signIn(req.body)

      const { email, password } = req.body;

      const response = await authService.signin(email, password);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);

      return res
        .status(
          error.name === 'ValidationError' ?
            StatusCodes.UNPROCESSABLE_ENTITY :
            error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        )
        .json(error.message);
    }
  },

  signup: async (req, res) => {
    try {
      await validations.signUp(req.body)

      const userData = req.body;

      const { storedUser, token } = await authService.signup(userData);

      return res.status(StatusCodes.CREATED).json({
        storedUser,
        token,
      });
    } catch (error) {
      console.error(error);

      return res
        .status(
          error.name === 'ValidationError' ?
            StatusCodes.UNPROCESSABLE_ENTITY :
            error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        )
        .json(error.message);
    }
  },

  signinPro: async (req, res) => {
    try {
      await validations.signIn(req.body)

      const { email, password } = req.body;

      const response = await authService.signinPro(email, password);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error(error);

      return res
        .status(
          error.name === 'ValidationError' ?
            StatusCodes.UNPROCESSABLE_ENTITY :
            error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        )
        .json(error.message);
    }
  },

  signupPro: async (req, res) => {
    try {

      await validations.signUpPro(req.body)

      const userData = req.body;

      const { storedProfessional, token } = await authService.signupPro(userData);

      return res.status(StatusCodes.CREATED).json({
        storedProfessional,
        token,
      });
    } catch (error) {
      console.error(error);

      return res
        .status(
          error.name === 'ValidationError' ?
            StatusCodes.UNPROCESSABLE_ENTITY :
            error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        )
        .json(error.message);
    }
  },
};
