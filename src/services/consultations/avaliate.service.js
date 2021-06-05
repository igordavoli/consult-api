const { consultationsRepository } = require('../../repositories');

module.exports.avaliate = async (id, evaluation) => {
  const consultation = await consultationsRepository.getById(id);

  if (consultation.status !== 'concluded') {
    throw {
      status: 400,
      message: 'only-concluded-consultations-can-be-evaluated',
    };
  }

  Object.assign(consultation, evaluation)

  await consultationsRepository.update(consultation);
}