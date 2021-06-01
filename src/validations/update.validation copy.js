const yup = require('yup');

module.exports.update = async (updateData) => {
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
};
