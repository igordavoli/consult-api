/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { professionalsService } = require('../services');
const validations = require('../validations');

module.exports = {
  list: async (req, res) => {
    try {
      const options = req.query;

      const response = await professionalsService.list(options);

      if (!response || response.data.length === 0) {
        return res.status(StatusCodes.OK).json({ metadata: { total: 0 }, data: [] });
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

      const { paramsId } = req;

      professional.id = paramsId;

      await validations.updatePro(professional)

      const updatedProfessional = await professionalsService.update(
        professional
      );

      return res.status(StatusCodes.OK).json(updatedProfessional);
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

      const { paramsId } = req;

      await professionalsService.deleteProfessional(paramsId, password);

      return res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  switchProfessionalStatus: async (req, res) => {
    const { paramsId } = req;

    const isActive = await professionalsService.switchStatus(paramsId);

    res.status(StatusCodes.OK).json({ isActive });
  },
};
