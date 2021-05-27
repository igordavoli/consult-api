const { consultationsRepository } = require('../../repositories');

module.exports.list = async (id, options, isProfessional) => {
  const { firstName, lastName, status } = options;
  const query = {};

  const withProfessional = {
    where: [{ user_id: id }],
    include: {
      association: 'professional',
      attributes: ['id', 'firstName', 'lastName', 'email', 'crp', 'city'],
    },
    attributes: { exclude: ['wasGood', 'comment'] },
  }
  const withUser = {
    where: [{ professional_id: id }],
    include: {
      association: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'telephone'],
    },
  }

  if (isProfessional) {
    Object.assign(query, withUser)
  } else {
    Object.assign(query, withProfessional)
  }

  if (status && status !== '') {
    query.where.push({ status });
  }

  if (firstName && firstName !== '') {
    query.include.push({
      association,
      where: { firstName }
    });
  }

  if (lastName && lastName !== '') {
    query.include.push({
      association,
      where: { lastName }
    });
  }

  const { count, rows } = await consultationsRepository.list(query);

  return {
    metadata: { total: count },
    data: rows,
  };
};
