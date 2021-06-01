const { list } = require('./list.service');
const { update } = require('./update.service');
const { toAdmin } = require('./toAdmin.service');
const { deleteUser } = require('./deleteUser.service');

module.exports = {
  list,
  update,
  toAdmin,
  deleteUser,
};
