const yup = require('yup');

module.exports.signUpPro = async (signUpData) => {
  const schema = yup.object().shape({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    professionalField: yup.string().required(),
    crp: yup.string().required(),
    biography: yup.string().required().min(1).max(255),
    experience: yup.string().required().min(1).max(255),
  });

  await schema.validate(signUpData, {
    stripUnknown: true,
    abortEarly: false,
  });
};
