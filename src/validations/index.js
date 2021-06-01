const { signUp } = require('./signUp.validation');
const { signUpPro } = require('./signUpPro.validation');
const { token } = require('./token.validation');
const { signIn } = require('./signIn.validation');
const { updatePro } = require('./updatePro.validation');
const { changeStatus } = require('./changeStatus.validation');

module.exports = {
  signUp,
  signUpPro,
  token,
  signIn,
  updatePro,
  changeStatus,
};
