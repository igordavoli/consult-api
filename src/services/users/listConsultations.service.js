const { consultationsRepository } = require('../../repositories');

module.exports.listConsultations = async (options) => {
  const { userId } = options;
  const query = {
    where: { user_id: userId },
    include: {
      association: 'professional',
      attributes: ['id', 'name']
    }
  };

  if (options.status && options.status !== '') {
    query.where.push({ name: options.status });
  }

  const { count, rows } = await consultationsRepository.list(query);

  return {
    metadata: { total: count },
    data: rows,
  };
};
