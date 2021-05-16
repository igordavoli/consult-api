/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { professionalsService } = require('../services');
const { messages } = require('../helpers');
const yup = require('yup');

module.exports = {
  list: async (req, res) => {
    try {
      const { name } = req.query;

      const response = await professionalsService.list({ name });

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.NO_CONTENT).end();
      }

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  account: (req, res) => {
    try {
      const { tokenUser } = req;
      const { paramsId } = req;
      tokenUser.id = paramsId;

      return res.status(StatusCodes.OK).json({ professional: tokenUser });
    } catch (error) {
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { professional } = req.body;

      const { paramsProfessionalId } = req;

      professional.id = paramsProfessionalId;

      const schema = yup.object().shape({
        id: yup.string().required(),
        email: yup.string().required()
          .email(),
        name: yup.string().required(),
        password: yup.string().required(),
        newPassword: yup.string(),
      });

      await schema.validate(professional, {
        abortEarly: false,
        stripUnknown: true,
      });

      const updatedProfessional = await professionalsService.update(professional);

      return res.status(StatusCodes.CREATED).json(updatedProfessional);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { password } = req.body;

      const professionalId = req.paramsProfessionalId;

      await professionalsService.deleteProfessional(professionalId, password);

      return res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
};
