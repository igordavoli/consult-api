const { StatusCodes } = require("http-status-codes");
const { usersService } = require("../services");
const { messages } = require("../helpers");
const yup = require("yup");

module.exports = {
  list: async (req, res) => {
    try {
      const { name } = req.query;
      const response = await usersService.list({ name });

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
  account: async (req, res) => {
    try {
      const paramsUserId = req.params.id;
      const tokenUserId = req.user.id;
      const isSameUser = paramsUserId === tokenUserId;

      if (!isSameUser) {
        throw {
          status: StatusCodes.UNAUTHORIZED,
          message: messages.unauthorized,
        };
      }

      res.status(StatusCodes.OK).json({ user: req.user })

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
      const paramsUserId = req.paramsUserId;

      user.id = paramsUserId;

      const schema = yup.object().shape({
        id: yup.string().required(),
        email: yup.string().required().email(),
        name: yup.string().required(),
        password: yup.string().required(),
        newPassword: yup.string(),
      });

      await schema.validate(user, {
        abortEarly: false,
        stripUnknown: true,
      });

      const updatedUser = await usersService.update(user);

      res.status(StatusCodes.CREATED).json(updatedUser);

    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  },

  async delete(req, res) {
    try {
      const password = req.body.password;
      const userId = req.paramsUserId;

      await usersService.deleteUser(userId, password);

      res.status(StatusCodes.NO_CONTENT).json({});

    } catch (error) {
      console.log(error);
      return res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error.message);
    }
  }


};

// toAdmin: async (req, res) => {
//   try {

//     const { isAdmin } = req.body;
//     const id = Number(req.params.id);

//     const userData = { id, isAdmin }
//     const schema = yup.object().shape({
//       id: yup.number().required(),
//       isAdmin: yup.boolean().required(),
//     })

//     await schema.validate(userData, {
//       abortEarly: false,
//       stripUnknown: true,
//     });

//     const adminUser = await usersService.toAdmin(userData);

//     res.status(StatusCodes.OK).json(adminUser);

//   } catch (error) {
//     console.log(error);
//     return res
//       .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(error.message);
//   }

// }