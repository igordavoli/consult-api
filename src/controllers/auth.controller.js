const { StatusCodes } = require('http-status-codes');
const { authService } = require('../services');
const yup = require('yup');

module.exports = {
  signin: async (req, res) => {
    console.log(req)
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      });

      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      const { email, password } = req.body;

      console.log(email);
      console.log(password);

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
    console.log(req)
    try {
      const schema = yup.object().shape({
        firstName: yup.string().required().min(1),
        lastName: yup.string().required().min(1),
        email: yup.string().required().email(),
        telephone: yup.string().required().length(11)
          .matches(/^[0-9]+$/, "Must be only digits"),
        password: yup.string().required().min(8),
      });

      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

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
    console.log(req)
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      });

      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

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
    console.log(req)
    try {

      const userData = req.body;

      const schema = yup.object().shape({
        firstName: yup.string().required().min(1),
        lastName: yup.string().required().min(1),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        professionalField: yup.string().required(),
        biography: yup.string().required().min(1).max(255),
        experience: yup.string().required().min(1).max(255),
      });

      await schema.validate(userData, {
        stripUnknown: true,
        abortEarly: false,
      });

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
