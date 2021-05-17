const { professionalsRepository } = require('../../repositories');

module.exports.list = async (options) => {
  const query = {};
  query.where = [];

  if (options.name && options.name !== '') {
    query.where.push({ name: options.name });
  }

  query.where.push({ is_deleted: false });

  const { count, rows } = await professionalsRepository.list(query);

  return {
    metadata: { total: count },
    data: rows,
  };
};
