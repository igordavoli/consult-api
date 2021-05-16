const { list } = require('./list.service');
const { update } = require('./update.service');
const { deleteProfessional } = require('./deleteProfessional.service');

module.exports = {
  list,
  update,
  deleteProfessional,
};
