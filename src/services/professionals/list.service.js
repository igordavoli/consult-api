const { QueryTypes } = require('sequelize');
const db = require('../../models')
const { professionalsRepository } = require('../../repositories');

module.exports.list = async (options) => {
  // const { city, remotely } = options;

  // query.include = [
  //   {
  //     association: 'consultations',
  //     attributes: {
  //       include: [
  //         [fn('count', col('was_good')), 'wasGood'],
  //         [fn('count', col('was_good')), 'wasBad'],
  //         [fn('count', col('was_good')), 'total']
  //       ]
  //     },
  //     group: 'id'
  //   },
  // ]

  if (city && city !== '') {
    query.where.push({ city });
  }

  if (remotely && remotely !== '') {
    query.where.push({ remotely });
  }

  // const { count, rows } = await professionalsRepository.list(query);
  const users = await db.sequelize.query(
    `SELECT * FROM "professionals" 
    WHERE ("is_deleted" = false AND "is_active" = true)`,
    {
      type: QueryTypes.SELECT,
      model: db.Professional,
      mapToModel: true,
    })

  return {
    metadata: { total: users.length },
    data: users,
  };
};
