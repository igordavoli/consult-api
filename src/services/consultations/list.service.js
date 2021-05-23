const { consultationsRepository } = require('../../repositories');

module.exports.list = async (id, options, isProfessional) => {
  const { firstName, lastName, status } = options;
  const query = {};
  const attributes = ['id', 'firstName', 'lastName'];

  let association = '';


  if (isProfessional) {
    query.where = [{ professional_id: id }];
    association = 'user';
    attributes.push('telephone')
  } else {
    query.where = [{ user_id: id }];
    association = 'professional';
  }

  query.include = [{
    association,
    attributes,
  }]

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
