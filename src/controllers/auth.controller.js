const { StatusCodes } = require('http-status-codes');
const { authService } = require('../services');
const yup = require('yup');

module.exports = {
  signin: async (req, res) => {
    console.log(req.body)
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
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
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        name: yup.string().required(),
        password: yup.string().required(),
      });

      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      const { email, name, password } = req.body;

      const { storedUser, token } = await authService.signup(email, name, password);

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
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
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
    try {
      const schema = yup.object().shape({
        email: yup.string().required().email(),
        name: yup.string().required(),
        password: yup.string().required(),
        professionalField: yup.string().required()
      });

      await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      const { email, name, password, professionalField } = req.body;

      const { storedProfessional, token } = await authService.signupPro(
        email,
        name,
        password,
        professionalField
      );

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
