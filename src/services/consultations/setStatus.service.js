const { consultationsRepository } = require('../../repositories');
const validations = require('../../validations')

module.exports.setStatus = async (id, status) => {
  const consultation = await consultationsRepository.getById(id);

  validations.changeStatus(consultation.status, status);

  consultation.update({ status });
}