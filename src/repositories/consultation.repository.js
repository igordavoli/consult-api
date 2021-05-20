const { Consultation } = require('../models');

module.exports = {
  list: (query) => Consultation.findAndCountAll(query),
  getById: (id) => Consultation.findByPk(id),
  get: (params) => Consultation.findOne({ where: params }),
  create: (params) => Consultation.create(params),
  update: (consultation) => consultation.save(),
  destroy: (id) => Consultation.destroy({ where: { id } }),
};
