const { consultationsRepository } = require('../../repositories')

module.exports.avaliate = async (id, evaluation) => {
  const consultation = await consultationsRepository.getById(id);

  Object.assign(consultation, evaluation)

  await consultationsRepository.update(consultation);
}