const yup = require('yup');

module.exports.signIn = async (loginData) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  });

  await schema.validate(loginData, {
    stripUnknown: true,
    abortEarly: false,
  });
};
