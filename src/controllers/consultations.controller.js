/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { consultationsService } = require('../services');
const yup = require('yup');

module.exports = {
  list: async (req, res) => {
    try {
      const options = req.query;
      const id = req.paramsId;
      const isProfessional = req.session.isProfessional;

      const response = await consultationsService.list(id, options, isProfessional)

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.OK).end({ metadata: { total: 0 }, data: [] });
      }

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  create: async (req, res) => {

    console.log(req)
    console.log(req.body)
    console.log(req.headers)

    try {
      const consultation = req.body;

      const userId = req.paramsId;

      const schema = yup.object().shape({
        professionalId: yup.string().required(),
        reason: yup.string().required(),
      });

      await schema.validate(consultation, {
        abortEarly: false,
        stripUnknown: true,
      });

      const storedConsultation = await consultationsService.create(
        consultation,
        userId,
      );

      res.status(StatusCodes.CREATED).json(storedConsultation);
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  confirm: async (req, res) => {
    try {
      const { consultationId } = req.params;

      const status = 'confirmed'

      await consultationsService.setStatus(consultationId, status);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  recuse: async (req, res) => {
    try {
      const { consultationId } = req.params;

      const status = 'recused'

      await consultationsService.setStatus(consultationId, status);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  cancelate: async (req, res) => {
    try {
      const { consultationId } = req.params;

      const status = 'canceled'

      console.log(consultationId)

      await consultationsService.setStatus(consultationId, status);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  conclude: async (req, res) => {
    try {
      const { consultationId } = req.params;

      const status = 'concluded'

      console.log(consultationId)

      await consultationsService.setStatus(consultationId, status);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  avaliate: async (req, res) => {
    try {
      const { consultationId } = req.params;

      const { evaluation } = req.body;

      console.log(consultationId)

      await consultationsService.avaliate(consultationId, evaluation);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
};
