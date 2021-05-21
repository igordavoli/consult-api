const { list } = require('./list.service');
const { update } = require('./update.service');
const { toAdmin } = require('./toAdmin.service');
const { deleteUser } = require('./deleteUser.service');
const { createConsultation } = require('./createConsultation.service');
const { listConsultations } = require('./listConsultations.service');

module.exports = {
  list,
  update,
  toAdmin,
  deleteUser,
  createConsultation,
  listConsultations,
};
