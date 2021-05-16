const { Professional } = require('../models');

module.exports = {
  list: (query) => Professional.findAndCountAll(query),
  getById: (id) => Professional.findByPk(id),
  get: (params) => Professional.findOne({ where: params }),
  create: (params) => Professional.create(params),
  update: (professional) => professional.save(),
  destroy: (id) => Professional.destroy({ where: { id } }),
};
