const { consultationsRepository } = require('../../repositories');

module.exports.list = async (id, options, isProfessional) => {
  const { firstName, lastName, status } = options;
  const query = {};

  const withProfessionalData = {
    where: [{ user_id: id }],
    include: {
      association: 'professional',
      attributes: ['id', 'firstName', 'lastName', 'email', 'crp', 'city'],
    },

  }
  const withUserData = {
    where: [{ professional_id: id }],
    include: {
      association: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'telephone'],
    },
    attributes: { exclude: ['wasGood', 'comment'] },
  }

  if (isProfessional) {
    Object.assign(query, withUserData)
  } else {
    Object.assign(query, withProfessionalData)
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
