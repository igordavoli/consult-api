const { signin } = require('./signin.service');
const { signup } = require('./signup.service');
const { signinPro } = require('./signinPro.service');
const { signupPro } = require('./signupPro.service');

module.exports = {
  signin,
  signup,
  signinPro,
  signupPro,
};
