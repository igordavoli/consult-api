/* eslint-disable object-shorthand */
const { StatusCodes } = require('http-status-codes');
const { usersService } = require('../services');
const yup = require('yup');

module.exports = {
  list: async (req, res) => {
    try {
      const { name } = req.query;

      const response = await usersService.list({ name });

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
      const { user } = req.body;
      const { paramsId } = req;
      user.id = paramsId;

      const schema = yup.object().shape({
        email: yup.string().email(),
        firstName: yup.string().min(1),
        lastName: yup.string().min(1),
        // password: yup.string().required().min(8),
        // newPassword: yup.string().min(8),
      });

      await schema.validate(user, {
        abortEarly: false,
        stripUnknown: true,
      });

      const updatedUser = await usersService.update(user);

      return res.status(StatusCodes.CREATED).json(updatedUser);
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

