const { consultationsRepository } = require('../../repositories')

module.exports.avaliate = async (id, status) => {
  const consultation = await consultationsRepository.getById(id);

  await consultation.update({ status });

}