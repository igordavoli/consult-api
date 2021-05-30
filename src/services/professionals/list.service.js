const { fn } = require('sequelize');
const { professionalsRepository } = require('../../repositories');

module.exports.list = async (options) => {
  const { city, remotely } = options;

  const query = {};

  query.where = [
    { is_deleted: false },
    { is_active: true }
  ];

  query.include = [
    {
      association: 'consultations',
      attributes: ['wasGood']
    }
  ]

  if (city && city !== '') {
    query.where.push({ city });
  }

  if (remotely && remotely !== '') {
    query.where.push({ remotely });
  }

  const { count, rows } = await professionalsRepository.list(query);

  return {
    metadata: { total: count },
    data: rows,
  };
};
