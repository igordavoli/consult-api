const { list } = require('./list.service');
const { update } = require('./update.service');
const { deleteProfessional } = require('./deleteProfessional.service');
const { switchStatus } = require('./switchStatus.service');

module.exports = {
  list,
  update,
  switchStatus,
  deleteProfessional,

};
