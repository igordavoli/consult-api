const { professionalsRepository } = require('../../repositories');

module.exports.list = async (options) => {
  const { city, remotely } = options;

  query = {
    where: [
      { is_active: true },
      { is_deleted: false },
    ]
  };

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