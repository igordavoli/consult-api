const yup = require('yup');

module.exports.signUp = async (signUpData) => {
  const schema = yup.object().shape({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    email: yup.string().required().email(),
    telephone: yup.string().required().length(11)
      .matches(/^[0-9]+$/, "Must be only digits"),
    password: yup.string().required().min(8),
  });

  await schema.validate(signUpData, {
    stripUnknown: true,
    abortEarly: false,
  });
};
