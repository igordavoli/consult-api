const { StatusCodes } = require('http-status-codes');
const { consultationsService } = require('../services');
const { messages } = require('../helpers');
const yup = require('yup');

module.exports = {
  list: async (req, res) => {
    try {
      const { status } = req.query;

      const response = await professionalsService.list({ status });

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

  create: async (req, res) => {
    const { paramsId } = req;
    const { consultation } = req.body;

    consultation.userId = paramsId;

    const schema = yup.object().shape({
      userId: yup.string().required(),
      professionalId: yup.string().required(),
      reason: yup.string().required(),
    });

    await schema.validate(consultation, {
      abortEarly: false,
      stripUnknown: true,
    });

    const storedConsultation = await consultationsService.create(consultation);

    res.status(StatusCodes.CREATED).json(storedConsultation);
  }

}