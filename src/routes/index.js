const { auth } = require('./auth.routes');
const { users } = require('./users.routes');
const { professionals } = require('./professionals.routes');


module.exports = {
  auth,
  users,
  professionals,
};
