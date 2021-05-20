const { auth } = require('./auth.routes');
const { users } = require('./users.routes');
const { professionals } = require('./professionals.routes');
const { consultations } = require('./consultations.routes');


module.exports = {
  auth,
  users,
  professionals,
  consultations,
};
