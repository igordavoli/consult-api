/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { usersService } = require('../services');
const validations = require('../validations');

module.exports = {
  list: async (req, res) => {
    try {
      const { name } = req.query;

      const response = await usersService.list({ name });

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
  account: async (req, res) => {
    try {
      const { tokenUser } = req;

      const { paramsId } = req;

      tokenUser.id = paramsId;

      return res.status(StatusCodes.OK).json(tokenUser);
    } catch (error) {
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { paramsId } = req;

      const { user } = req.body;

      user.id = paramsId;

      await validations.update(userData)

      const updatedUser = await usersService.update(user);

      return res.status(StatusCodes.OK).json(updatedUser);
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

      const userId = req.paramsId;

      await usersService.deleteUser(userId, password);

      return res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  toAdmin: async (req, res) => {
    try {
      const id = req.params.id;

      const adminUser = await usersService.toAdmin(id);

      res.status(StatusCodes.OK).json(adminUser);
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },
};

